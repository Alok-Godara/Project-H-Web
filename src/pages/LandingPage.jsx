import React from 'react';
import { Activity, Shield, Users, FileText, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = ({ onLogin, onSignup }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white" size={20} />
            </div>
            <span className="text-xl font-semibold text-gray-900">MedPortal</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onLogin}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onSignup}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Streamline Your
              <span className="text-blue-600"> Medical Practice</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              MedPortal revolutionizes patient management with intelligent document processing, 
              comprehensive medical timelines, and seamless provider workflows.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={onSignup}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold text-lg transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Start Free Trial</span>
                <ArrowRight size={20} />
              </button>
              <button
                onClick={onLogin}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-300 hover:text-blue-600 font-semibold text-lg transition-all duration-200"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for modern healthcare
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed specifically for healthcare providers to manage patients efficiently and securely.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Patient Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive patient profiles with medical history, medications, allergies, and vitals all in one place.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <FileText className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Document Processing</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered extraction of key medical data from unstructured documents and reports.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">HIPAA Compliant</h3>
              <p className="text-gray-600 leading-relaxed">
                Enterprise-grade security with end-to-end encryption and comprehensive audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Reduce administrative burden by 60%
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Focus on what matters most - your patients. Our intelligent platform handles the paperwork, 
                organizes medical records, and provides instant access to critical patient information.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Automated document processing and data extraction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Chronological medical timeline for each patient</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Real-time collaboration with healthcare teams</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Mobile-responsive design for on-the-go access</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Active Patients</span>
                    <span className="text-2xl font-bold">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Documents Processed</span>
                    <span className="text-2xl font-bold">15,832</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Time Saved (hours)</span>
                    <span className="text-2xl font-bold">2,156</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to transform your practice?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of healthcare providers who trust MedPortal for their patient management needs.
          </p>
          <button
            onClick={onSignup}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold text-lg transition-all duration-200 flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl"
          >
            <span>Get Started Today</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white" size={20} />
            </div>
            <span className="text-xl font-semibold text-gray-900">MedPortal</span>
          </div>
          <p className="text-gray-600">
            © 2024 MedPortal. All rights reserved. HIPAA compliant healthcare technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;