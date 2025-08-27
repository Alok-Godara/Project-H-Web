import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';


const PatientList = () => {

  const navigate = useNavigate();

  const onPatientSelect = (patient) => {
    navigate(`/patient/${patient.id}`);
  };
  
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    {
      id: 'P001',
      name: 'John Doe',
      age: 34,
      sex: 'M',
      profileImage: '',
      hasUnreadDocuments: true,
    },
    {
      id: 'P002',
      name: 'Jane Smith',
      age: 28,
      sex: 'F',
      profileImage: '',
      hasUnreadDocuments: false,
    },
    {
      id: 'P003',
      name: 'Michael Johnson',
      age: 45,
      sex: 'M',
      profileImage: '',
      hasUnreadDocuments: true,
    },
    {
      id: 'P004',
      name: 'Emily Brown',
      age: 52,
      sex: 'F',
      profileImage: '',
      hasUnreadDocuments: false,
    },
    {
      id: 'P005',
      name: 'David Lee',
      age: 39,
      sex: 'M',
      profileImage: '',
      hasUnreadDocuments: false,
    },
    {
      id: 'P006',
      name: 'Sophia Martinez',
      age: 31,
      sex: 'F',
      profileImage: '',
      hasUnreadDocuments: true,
    },
    {
      id: 'P007',
      name: 'William Kim',
      age: 60,
      sex: 'M',
      profileImage: '',
      hasUnreadDocuments: false,
    },
    {
      id: 'P008',
      name: 'Olivia Wilson',
      age: 25,
      sex: 'F',
      profileImage: '',
      hasUnreadDocuments: false,
    },
    {
      id: 'P009',
      name: 'James Patel',
      age: 50,
      sex: 'M',
      profileImage: '',
      hasUnreadDocuments: true,
    },
    {
      id: 'P010',
      name: 'Ava Chen',
      age: 42,
      sex: 'F',
      profileImage: '',
      hasUnreadDocuments: false,
    },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[600px] flex flex-col overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Patient</h2>
          <p className="text-gray-600">Select a patient to view their complete medical history</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Patient Cards */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => onPatientSelect(patient)}
            className="p-4 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl hover:border-blue-300 hover:shadow-lg hover:bg-white/90 cursor-pointer transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              {/* Profile Image/Initials */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200">
                {patient.profileImage ? (
                  <img 
                    src={patient.profileImage} 
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-blue-700 font-semibold group-hover:text-blue-800">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>

              {/* Patient Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {patient.name}
                </h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-gray-600 font-medium">
                    {patient.age}y, {patient.sex}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 font-mono text-sm">
                    {patient.id}
                  </span>
                </div>
              </div>

              {/* Unread indicator */}
              {patient.hasUnreadDocuments && (
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;