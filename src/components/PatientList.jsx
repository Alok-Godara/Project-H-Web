import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import DataServices from '../supabase/dataConfig.js';


const PatientList = () => {

  const navigate = useNavigate();

  const onPatientSelect = (patient) => {
    navigate(`/dashboard/patient/${patient.id}`);
  };
  
  const [searchTerm, setSearchTerm] = useState('');
  const [databaseResults, setDatabaseResults] = useState([]);
  const [isSearchingDatabase, setIsSearchingDatabase] = useState(false);
  const [allPatients, setAllPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load all patients on component mount
  useEffect(() => {
    const loadAllPatients = async () => {
      try {
        setIsLoading(true);
        const patients = await DataServices.getAllPatients();
        // Transform patient data to include computed fields like age
        const transformedPatients = patients.map(patient => 
          DataServices.transformPatientData(patient)
        );
        setAllPatients(transformedPatients);
      } catch (error) {
        console.error('Error loading patients:', error);
        setAllPatients([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllPatients();
  }, []);

  // Function to check if search term is a phone number (10 digits)
  const isPhoneNumber = (term) => /^\d{10}$/.test(term);
  
  // Function to check if search term is a complete email
  const isCompleteEmail = (term) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(term);

  // Function to search database when criteria is met
  const searchDatabase = async (term) => {
    if (!isPhoneNumber(term) && !isCompleteEmail(term)) {
      setDatabaseResults([]);
      return;
    }

    setIsSearchingDatabase(true);
    try {
      const results = await DataServices.searchPatients(term);
      // Transform search results too
      const transformedResults = results.map(patient => 
        DataServices.transformPatientData(patient)
      );
      setDatabaseResults(transformedResults);
    } catch (error) {
      console.error('Error searching patients:', error);
      setDatabaseResults([]);
    } finally {
      setIsSearchingDatabase(false);
    }
  };

  // Handle search term changes with debounce for database calls
  const handleSearchChange = async (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    // Search database if phone or email criteria is met
    if (isPhoneNumber(newSearchTerm) || isCompleteEmail(newSearchTerm)) {
      await searchDatabase(newSearchTerm);
    } else {
      setDatabaseResults([]);
      // For name/ID search, we could implement debouncing here if needed
      // For now, we'll filter locally from allPatients
    }
  };

  // Get displayed patients based on search criteria
  const getDisplayedPatients = () => {
    if (isPhoneNumber(searchTerm) || isCompleteEmail(searchTerm)) {
      return databaseResults;
    } else if (!searchTerm.trim()) {
      return allPatients;
    } else {
      // Filter locally for name/ID search
      return allPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  const displayedPatients = getDisplayedPatients();

  if (isLoading) {
    return (
      <div className="h-[600px] flex flex-col overflow-hidden rounded-2xl">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading patients...</p>
          </div>
        </div>
      </div>
    );
  }

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
            placeholder="Search patients by name, ID, phone (e.g., 5551234567), or email (e.g., name@domain.com)..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
          />
          {isSearchingDatabase && (
            <div className="absolute right-3 top-3">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* Patient Cards */}
  <div className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-hide">
        {displayedPatients.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500">
            {(isPhoneNumber(searchTerm) || isCompleteEmail(searchTerm)) 
              ? "No patients found with this phone number or email"
              : "No patients found matching your search"
            }
          </div>
        )}
        {displayedPatients.map((patient) => (
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
                {(patient.phone || patient.email) && (
                  <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                    {patient.phone && (
                      <>
                        <span className="font-mono">{patient.phone}</span>
                        {patient.email && <span className="text-gray-400">•</span>}
                      </>
                    )}
                    {patient.email && (
                      <span className="truncate">{patient.email}</span>
                    )}
                  </div>
                )}
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