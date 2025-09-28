import React, { useState } from 'react';
import { Shield, ShieldCheck, ShieldX, User, Stethoscope } from 'lucide-react';
import DataServices from '../supabase/dataConfig';
import Toast from './Toast';

const PatientAccessManagement = ({ patientId, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  
  // Mock provider for demo purposes - in real app, this would come from database
  const mockProvider = {
    id: 'provider-1', // This should match your actual provider ID
    name: 'Dr. John Smith',
    specialty: 'Cardiology'
  };
  
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
  };
  
  const hideToast = () => {
    setToast({ show: false, message: '', type: 'info' });
  };

  const handleGrantAccess = async () => {
    setIsLoading(true);
    try {
      const { success, error } = await DataServices.grantPatientAccess(mockProvider.id, patientId);
      
      if (success) {
        showToast('Access granted successfully!', 'success');
      } else {
        showToast(error || 'Failed to grant access', 'error');
      }
    } catch (error) {
      console.error('Error granting access:', error);
      showToast('Error granting access', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeAccess = async () => {
    setIsLoading(true);
    try {
      const { success, error } = await DataServices.revokePatientAccess(mockProvider.id, patientId);
      
      if (success) {
        showToast('Access revoked successfully!', 'success');
      } else {
        showToast(error || 'Failed to revoke access', 'error');
      }
    } catch (error) {
      console.error('Error revoking access:', error);
      showToast('Error revoking access', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDenyAccess = async () => {
    setIsLoading(true);
    try {
      const { success, error } = await DataServices.denyPatientAccess(mockProvider.id, patientId);
      
      if (success) {
        showToast('Access request denied successfully!', 'success');
      } else {
        showToast(error || 'Failed to deny access', 'error');
      }
    } catch (error) {
      console.error('Error denying access:', error);
      showToast('Error denying access', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Shield className="text-blue-600" size={20} />
            <span>Access Management (Patient View)</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">Manage provider access to your medical records</p>
        </div>

        <div className="p-6">
          {/* Provider Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <Stethoscope className="text-blue-700" size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{mockProvider.name}</h4>
                <p className="text-sm text-gray-600">{mockProvider.specialty}</p>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                <User className="text-green-700" size={16} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Patient ID: {patientId}</h4>
                <p className="text-sm text-gray-600">Managing access permissions</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-6">
            <strong>Patient Actions (Testing):</strong><br/>
            • <span className="text-green-600 font-medium">Grant</span>: Allow provider access (status: 'allowed')<br/>
            • <span className="text-red-600 font-medium">Deny</span>: Reject access request (status: 'denied')<br/>
            • <span className="text-orange-600 font-medium">Revoke</span>: Remove previously granted access (status: 'revoked')
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="col-span-2 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
          >
            Close
          </button>
          
          <button
            onClick={handleGrantAccess}
            disabled={isLoading}
            className="px-4 py-3 text-white bg-green-600 hover:bg-green-700 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <ShieldCheck size={16} />
            <span>Grant</span>
          </button>
          
          <button
            onClick={handleDenyAccess}
            disabled={isLoading}
            className="px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <ShieldX size={16} />
            <span>Deny</span>
          </button>
          
          <button
            onClick={handleRevokeAccess}
            disabled={isLoading}
            className="col-span-2 px-4 py-3 text-white bg-orange-600 hover:bg-orange-700 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <ShieldX size={16} />
            <span>Revoke Previously Granted Access</span>
          </button>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={hideToast}
        position="top-right"
      />
    </div>
  );
};

export default PatientAccessManagement;