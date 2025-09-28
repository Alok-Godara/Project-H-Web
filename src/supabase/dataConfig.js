import { supabase } from './supabaseClient';

class DataServicesClass {

    // Search patients by phone or email
    async searchPatients(searchTerm) {
        if (!searchTerm) return [];

        // Check if searchTerm is a phone number (10 digits)
        const isPhoneNumber = /^\d{10}$/.test(searchTerm);
        
        // Check if searchTerm is a complete email (contains @ and a domain)
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(searchTerm);
        
        if (!isPhoneNumber && !isEmail) {
            return []; // Return empty array if not a valid phone or email
        }

        let query = supabase.from('patients').select('*');
        
        if (isPhoneNumber) {
            query = query.eq('phone', searchTerm);
        } else if (isEmail) {
            query = query.eq('email', searchTerm);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    }

    // Get all patients
    async getAllPatients() {
        const { data, error } = await supabase
            .from('patients')
            .select('*')
            .order('name', { ascending: true });
        
        if (error) throw error;
        return data || [];
    }

    // Get patient by ID
    async getPatientById(patientId) {
        const { data, error } = await supabase
            .from('patients')
            .select('*')
            .eq('id', patientId)
            .single();
        
        if (error) throw error;
        return data;
    }

    // Get medical events for a specific patient
    async getMedicalEventsForPatient(patientId) {
        const { data, error } = await supabase
            .from('medical_events')
            .select(`
                *,
                documents (
                    id,
                    file_url,
                    file_size,
                    is_processed
                )
            `)
            .eq('patient_id', patientId)
            .order('event_date', { ascending: false });
        
        if (error) throw error;
        return data || [];
    }

    // Get documents for a specific medical event
    async getDocumentsForEvent(eventId) {
        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .eq('medical_event_id', eventId);
        
        if (error) throw error;
        return data || [];
    }

    // Search patients by name or ID (local search)
    async searchPatientsByNameOrId(searchTerm) {
        if (!searchTerm) return [];

        const { data, error } = await supabase
            .from('patients')
            .select('*')
            .or(`name.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%`)
            .order('name', { ascending: true });
        
        if (error) throw error;
        return data || [];
    }

    // Get provider information
    async getProviderById(providerId) {
        const { data, error } = await supabase
            .from('providers')
            .select('*')
            .eq('id', providerId)
            .single();
        
        if (error) throw error;
        return data;
    }

    // Update provider profile information
    async updateProviderProfile(providerId, profileData) {
        try {
            // If email is being changed, update Supabase auth email as well
            if (profileData.email) {
                const currentProvider = await this.getProviderById(providerId);
                if (currentProvider && currentProvider.email !== profileData.email) {
                    console.log('Updating email in Supabase auth...');
                    const { error: emailUpdateError } = await supabase.auth.updateUser({
                        email: profileData.email
                    });
                    
                    if (emailUpdateError) {
                        console.error('Failed to update email in auth:', emailUpdateError);
                        // Continue with profile update even if auth email update fails
                    }
                }
            }

            // Update provider profile in database
            const { data, error } = await supabase
                .from('providers')
                .update({
                    name: profileData.name,
                    email: profileData.email,
                    phone: profileData.phone,
                    specialty: profileData.specialty,
                    license_number: profileData.licenseNumber,
                    updated_at: new Date().toISOString()
                })
                .eq('id', providerId)
                .select()
                .single();
            
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Provider profile update error:', error);
            throw error;
        }
    }

    // Update provider password (requires current password verification)
    async updateProviderPassword(providerId, currentPassword, newPassword) {
        try {
            // First verify the current password by attempting to sign in
            const provider = await this.getProviderById(providerId);
            if (!provider) {
                throw new Error('Provider not found');
            }

            // Use Supabase auth to verify current password
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: provider.email,
                password: currentPassword
            });

            if (signInError) {
                throw new Error('Current password is incorrect');
            }

            // Update the password in Supabase auth
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            // Update the password in providers table as well
            const { error: updateError } = await supabase
                .from('providers')
                .update({
                    password: newPassword,
                    updated_at: new Date().toISOString()
                })
                .eq('id', providerId);

            if (updateError) {
                console.warn('Failed to update password in providers table:', updateError);
            }

            return { success: true, user: data.user };
        } catch (error) {
            console.error('Password update error:', error);
            throw error;
        }
    }

    // Get provider profile with error handling and fallback
    async getProviderProfileSafely(providerId) {
        try {
            const provider = await this.getProviderById(providerId);
            return { provider, error: null };
        } catch (error) {
            console.error('Failed to fetch provider profile:', error);
            return { provider: null, error: error.message };
        }
    }

    // Provider-Patient Access Control Functions
    
    // Check provider access to a specific patient
    async checkProviderPatientAccess(providerId, patientId) {
        try {
            const { data, error } = await supabase
                .from('provider_patient_access')
                .select('*')
                .eq('provider_id', providerId)
                .eq('patient_id', patientId)
                .single();
            
            if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
                throw error;
            }
            
            return { access: data, error: null };
        } catch (error) {
            console.error('Error checking provider-patient access:', error);
            return { access: null, error: error.message };
        }
    }

    // Request access to a patient (insert new request)
    async requestPatientAccess(providerId, patientId) {
        try {
            // Log the access request attempt
            await this.logAccessRequest(providerId, patientId, 'request', 'attempting');
            
            const { data, error } = await supabase
                .from('provider_patient_access')
                .insert({
                    provider_id: providerId,
                    patient_id: patientId,
                    status: 'pending',
                    granted_at: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
                .select()
                .single();
            
            if (error) throw error;
            
            console.log('Access request created:', data);
            
            // Log successful request
            await this.logAccessRequest(providerId, patientId, 'request', 'success', 'Access request created successfully');
            
            return { success: true, data, error: null };
        } catch (error) {
            console.error('Error requesting patient access:', error);
            
            // Log failed request
            await this.logAccessRequest(providerId, patientId, 'request', 'failed', error.message);
            
            return { success: false, data: null, error: error.message };
        }
    }

    // Update existing access request (for "Request Again" functionality)
    async updatePatientAccessRequest(providerId, patientId) {
        try {
            // Log the re-request attempt
            await this.logAccessRequest(providerId, patientId, 'request_again', 'attempting');
            
            const { data, error } = await supabase
                .from('provider_patient_access')
                .update({
                    status: 'pending',
                    granted_at: null,
                    updated_at: new Date().toISOString()
                })
                .eq('provider_id', providerId)
                .eq('patient_id', patientId)
                .select()
                .single();
            
            if (error) throw error;
            
            console.log('Access request updated:', data);
            
            // Log successful re-request
            await this.logAccessRequest(providerId, patientId, 'request_again', 'success', 'Access re-request submitted successfully');
            
            return { success: true, data, error: null };
        } catch (error) {
            console.error('Error updating patient access request:', error);
            
            // Log failed re-request
            await this.logAccessRequest(providerId, patientId, 'request_again', 'failed', error.message);
            
            return { success: false, data: null, error: error.message };
        }
    }

    // Get all patients accessible to a provider (updated to use access control)
    async getAccessiblePatientsForProvider(providerId) {
        try {
            const { data, error } = await supabase
                .from('provider_patient_access')
                .select(`
                    patient_id,
                    status,
                    granted_at,
                    patients (*)
                `)
                .eq('provider_id', providerId)
                .eq('status', 'allowed');
            
            if (error) throw error;
            
            // Extract patient data and transform it
            const patients = data?.map(item => 
                this.transformPatientData(item.patients)
            ) || [];
            
            return { patients, error: null };
        } catch (error) {
            console.error('Error getting accessible patients:', error);
            return { patients: [], error: error.message };
        }
    }

    // Revoke patient access (for patient-side functionality)
    async revokePatientAccess(providerId, patientId) {
        try {
            // Log the revocation attempt
            await this.logAccessRequest(providerId, patientId, 'revoke', 'attempting', 'Patient revoking access');
            
            const { data, error } = await supabase
                .from('provider_patient_access')
                .update({
                    status: 'revoked',
                    granted_at: null,
                    updated_at: new Date().toISOString()
                })
                .eq('provider_id', providerId)
                .eq('patient_id', patientId)
                .select()
                .single();
            
            if (error) throw error;
            
            console.log('Access revoked:', data);
            
            // Log successful revocation
            await this.logAccessRequest(providerId, patientId, 'revoke', 'success', 'Access successfully revoked by patient');
            
            return { success: true, data, error: null };
        } catch (error) {
            console.error('Error revoking patient access:', error);
            
            // Log failed revocation
            await this.logAccessRequest(providerId, patientId, 'revoke', 'failed', error.message);
            
            return { success: false, data: null, error: error.message };
        }
    }

    // Grant patient access (for patient-side functionality)
    async grantPatientAccess(providerId, patientId) {
        try {
            // Log the grant attempt
            await this.logAccessRequest(providerId, patientId, 'grant', 'attempting', 'Patient granting access');
            
            const { data, error } = await supabase
                .from('provider_patient_access')
                .update({
                    status: 'allowed',
                    granted_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
                .eq('provider_id', providerId)
                .eq('patient_id', patientId)
                .select()
                .single();
            
            if (error) throw error;
            
            console.log('Access granted:', data);
            
            // Log successful grant
            await this.logAccessRequest(providerId, patientId, 'grant', 'success', 'Access successfully granted by patient');
            
            return { success: true, data, error: null };
        } catch (error) {
            console.error('Error granting patient access:', error);
            
            // Log failed grant
            await this.logAccessRequest(providerId, patientId, 'grant', 'failed', error.message);
            
            return { success: false, data: null, error: error.message };
        }
    }

    // Deny patient access request (for patient-side functionality)
    async denyPatientAccess(providerId, patientId) {
        try {
            // Log the deny attempt
            await this.logAccessRequest(providerId, patientId, 'deny', 'attempting', 'Patient denying access request');
            
            const { data, error } = await supabase
                .from('provider_patient_access')
                .update({
                    status: 'denied',
                    granted_at: null,
                    updated_at: new Date().toISOString()
                })
                .eq('provider_id', providerId)
                .eq('patient_id', patientId)
                .select()
                .single();
            
            if (error) throw error;
            
            console.log('Access denied:', data);
            
            // Log successful denial
            await this.logAccessRequest(providerId, patientId, 'deny', 'success', 'Access request successfully denied by patient');
            
            return { success: true, data, error: null };
        } catch (error) {
            console.error('Error denying patient access:', error);
            
            // Log failed denial
            await this.logAccessRequest(providerId, patientId, 'deny', 'failed', error.message);
            
            return { success: false, data: null, error: error.message };
        }
    }

    // Log access request attempts for auditability
    async logAccessRequest(providerId, patientId, action, status = null, notes = null) {
        try {
            const logEntry = {
                provider_id: providerId,
                patient_id: patientId,
                action: action, // 'request', 'request_again', 'view_attempt', 'revoke', 'grant', etc.
                status: status, // 'success', 'failed', 'pending', 'allowed', 'denied', 'revoked', etc.
                notes: notes,
                timestamp: new Date().toISOString(),
                ip_address: null, // Could be populated if needed
                user_agent: navigator?.userAgent || null
            };
            
            console.log('Access Request Log:', logEntry);
            
            // If you have an audit_log table, uncomment the following:
            /*
            const { error } = await supabase
                .from('access_audit_log')
                .insert([logEntry]);
            
            if (error) {
                console.error('Failed to log access request:', error);
            }
            */
            
            return logEntry;
        } catch (error) {
            console.error('Error logging access request:', error);
            return null;
        }
    }

    // Get patients accessible to a specific provider
    async getPatientsForProvider(providerId) {
        const { data, error } = await supabase
            .from('provider_patient_access')
            .select(`
                patients (*)
            `)
            .eq('provider_id', providerId)
            .eq('status', 'active');
        
        if (error) throw error;
        return data?.map(item => item.patients) || [];
    }

    // Transform medical events data to match frontend expected format
    transformMedicalEvents(events) {
        return events.map(event => ({
            id: event.id,
            patientId: event.patient_id,
            type: event.type || 'document',
            title: event.title || 'Medical Document',
            description: event.description || 'No description available',
            date: event.event_date || event.created_at,
            provider: event.provider_name || 'Unknown Provider',
            extractedData: [], // This would need to be populated based on processed document data
            documentContent: event.description || '',
            image: event.documents?.[0]?.file_url || null
        }));
    }

    // Transform patient data to include computed fields
    transformPatientData(patient) {
        if (!patient) return null;
        
        // Calculate age from date_of_birth
        const calculateAge = (dateOfBirth) => {
            if (!dateOfBirth) return null;
            const today = new Date();
            const birthDate = new Date(dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        };

        return {
            ...patient,
            age: calculateAge(patient.date_of_birth),
            // Add any other computed fields or data transformations here
            hasUnreadDocuments: false, // This would be computed based on actual document status
            // Transform medical history, allergies, medications if they exist as JSON fields
            allergies: patient.allergies || [],
            medications: patient.medications || [],
            medicalHistory: patient.medical_history || [],
            vitals: patient.vitals || {}
        };
    }

    // Get patient with transformed data
    async getTransformedPatientById(patientId) {
        const patient = await this.getPatientById(patientId);
        return this.transformPatientData(patient);
    }

    // Get medical events with transformed data
    async getTransformedMedicalEventsForPatient(patientId) {
        const events = await this.getMedicalEventsForPatient(patientId);
        return this.transformMedicalEvents(events);
    }

    // Get documents with images for a specific medical event
    async getEventDocuments(eventId) {
        const { data, error } = await supabase
            .from('documents')
            .select('id, file_url, file_size, is_processed')
            .eq('medical_event_id', eventId);
        
        if (error) throw error;
        return data || [];
    }

    // Format date as DD/MM/YYYY
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    }

    // Get complete Supabase storage URL for a file
    getStorageUrl(filePath) {
        if (!filePath) return null;
        
        // If it's already a complete URL, return as is
        if (filePath.startsWith('http')) {
            return filePath;
        }
        
        // Get the Supabase URL from the client
        const supabaseUrl = supabase.supabaseUrl;
        
        // Remove any leading slash and check if path already contains medical_data
        const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
        
        let finalUrl;
        // If the path already starts with medical_data/, don't add it again
        if (cleanPath.startsWith('medical_data/')) {
            finalUrl = `${supabaseUrl}/storage/v1/object/public/${cleanPath}`;
        } else {
            // If it doesn't contain medical_data/, add it
            finalUrl = `${supabaseUrl}/storage/v1/object/public/medical_data/${cleanPath}`;
        }
        
        console.log('URL Construction:');
        console.log('  Original filePath:', filePath);
        console.log('  Clean path:', cleanPath);
        console.log('  Final URL:', finalUrl);
        
        return finalUrl;
    }
}

const DataServices = new DataServicesClass();
export default DataServices;