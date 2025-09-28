import React from 'react';
import { X, User, AlertCircle, Clock, XCircle } from 'lucide-react';

const AccessRequestModal = ({ 
  isOpen, 
  onClose, 
  patient, 
  accessStatus, 
  onRequestAccess, 
  onRequestAgain,
  isLoading 
}) => {
  if (!isOpen || !patient) return null;

  const getModalContent = () => {
    switch (accessStatus) {
      case 'no_access':
        return {
          icon: <User className="w-12 h-12 text-blue-500" />,
          title: 'Request Patient Access',
          message: `You don't have access to ${patient.name}'s medical records. Would you like to request access?`,
          primaryButton: 'Request Access',
          primaryAction: () => onRequestAccess(patient.id),
          primaryColor: 'bg-blue-600 hover:bg-blue-700'
        };
      
      case 'denied':
        return {
          icon: <XCircle className="w-12 h-12 text-red-500" />,
          title: 'Access Denied',
          message: `Your previous request to access ${patient.name}'s medical records was denied. You can request access again if needed.`,
          primaryButton: 'Request Again',
          primaryAction: () => onRequestAgain(patient.id),
          primaryColor: 'bg-orange-600 hover:bg-orange-700'
        };
      
      case 'revoked':
        return {
          icon: <XCircle className="w-12 h-12 text-orange-500" />,
          title: 'Access Revoked',
          message: `The patient ${patient.name} has revoked your access to their medical records. You can submit a new request if needed.`,
          primaryButton: 'Request Again',
          primaryAction: () => onRequestAgain(patient.id),
          primaryColor: 'bg-orange-600 hover:bg-orange-700'
        };
      
      case 'pending':
        return {
          icon: <Clock className="w-12 h-12 text-yellow-500" />,
          title: 'Access Request Pending',
          message: `Your request to access ${patient.name}'s medical records is pending patient approval. Please wait for the patient to respond.`,
          primaryButton: null,
          primaryAction: null,
          primaryColor: null
        };
      
      default:
        return {
          icon: <AlertCircle className="w-12 h-12 text-gray-500" />,
          title: 'Access Status Unknown',
          message: 'Unable to determine access status. Please try again.',
          primaryButton: null,
          primaryAction: null,
          primaryColor: null
        };
    }
  };

  const { icon, title, message, primaryButton, primaryAction, primaryColor } = getModalContent();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            {icon}
          </div>
          
          {/* Patient Info */}
          <div className="mb-4 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-blue-700 font-semibold text-sm">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                <p className="text-sm text-gray-600">{patient.age}y, {patient.sex} • ID: {patient.id}</p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
            disabled={isLoading}
          >
            {accessStatus === 'pending' ? 'Understood' : 'Cancel'}
          </button>
          
          {primaryButton && primaryAction && (
            <button
              onClick={primaryAction}
              disabled={isLoading}
              className={`flex-1 px-4 py-3 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${primaryColor}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                primaryButton
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessRequestModal;