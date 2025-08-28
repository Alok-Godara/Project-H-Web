import React, {useState } from 'react';
import { User, Mail, Phone, Stethoscope, FileText, Save, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ProviderProfile = () => {

const onSave = () => {
    // Handle save logic
  };

  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  // const [provider, setProvider] = useState("")
  // Get the logged-in provider details from auth slice
  const provider = useSelector(state => state.auth.user);

  // useEffect(() => {
  //   setProvider(provider)
  // },[])

  console.log(provider);

  const [formData, setFormData] = useState({
    name: provider.name,
    email: provider.email,
    specialty: provider.specialty,
    licenseNumber: provider.licenseNumber,
    phone: provider.phone,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const specialties = [
    'Internal Medicine',
    'Family Medicine',
    'Cardiology',
    'Dermatology',
    'Emergency Medicine',
    'Endocrinology',
    'Gastroenterology',
    'Neurology',
    'Oncology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Surgery',
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.specialty) {
      newErrors.specialty = 'Specialty is required';
    }
    
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    // Password validation (only if changing password)
    if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to change password';
      }
      
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'New password must be at least 8 characters';
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setSuccessMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedProvider = {
        ...provider,
        name: formData.name,
        email: formData.email,
        specialty: formData.specialty,
        licenseNumber: formData.licenseNumber,
        phone: formData.phone
      };
      
      onSave(updatedProvider);
      setSuccessMessage('Profile updated successfully!');
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
    } catch (error) {
      setErrors({ general: 'Failed to update profile. Please try again.', error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      {/* Medical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Profile</h1>
              <p className="text-gray-600">Manage your professional information and account settings</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-8">
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-medium">{successMessage}</p>
              </div>
            )}

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm font-medium">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Dr. John Smith"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="doctor@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.phone ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Specialty
                    </label>
                    <div className="relative">
                      <Stethoscope className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        id="specialty"
                        list="specialty-list"
                        value={formData.specialty}
                        onChange={(e) => handleInputChange('specialty', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white ${
                          errors.specialty ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Select or type your specialty"
                        autoComplete="off"
                      />
                      <datalist id="specialty-list">
                        {specialties.map((specialty) => (
                          <option key={specialty} value={specialty} />
                        ))}
                      </datalist>
                    </div>
                    {errors.specialty && (
                      <p className="mt-1 text-sm text-red-600">{errors.specialty}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    License Number
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      id="licenseNumber"
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.licenseNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="MD12345"
                    />
                  </div>
                  {errors.licenseNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
                  )}
                </div>
              </div>

              {/* Password Change Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                <p className="text-sm text-gray-600 mb-4">Leave blank if you don't want to change your password</p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        id="currentPassword"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={formData.currentPassword}
                        onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                        className={`w-full pl-4 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.currentPassword ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
                          className={`w-full pl-4 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.newPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.newPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full pl-4 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;