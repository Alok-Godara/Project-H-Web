
import {
  X,
  Heart,
  Pill,
  Activity,
  AlertTriangle,
  FileText,
  Download,
  ZoomIn,
  ZoomOut,
} from "lucide-react";



import { useState } from "react";

const PatientDocs = ({ patient, selectedEvent, onEventClose }) => {
  const [zoom, setZoom] = useState(1);

  const handleEventClose = () => {
    onEventClose();
    setZoom(1);
  };

  if (selectedEvent) {
    return (
      <div className="h-full bg-white flex flex-col">
        {/* Document Header */}
        {selectedEvent.image && (
          <div className="relative w-full flex items-center justify-center border-0" style={{height: '90vh'}}>
            <img 
              src={selectedEvent.image} 
              alt="Event" 
              className="max-w-full max-h-full object-contain rounded-lg border border-gray-200 transition-transform duration-200"
              style={{ width: '100%', height: '100%', transform: `scale(${zoom})` }}
            />
            <button
              onClick={handleEventClose}
              className="fixed top-20 right-4 p-2 bg-white bg-opacity-80 text-gray-400 hover:text-gray-600 rounded-full shadow hover:bg-gray-100 transition-colors z-10"
              style={{ lineHeight: 0 }}
            >
              <X size={20} color="crimson" />
            </button>
            {/* Zoom Controls Vertical */}
            <div className="fixed bottom-8 right-4 flex flex-col space-y-2 z-10">
              <button
                onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
                className="p-2 bg-white bg-opacity-80 text-gray-400 hover:text-gray-600 rounded-full shadow hover:bg-gray-100 transition-colors"
                title="Zoom Out"
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
                className="p-2 bg-white bg-opacity-80 text-gray-400 hover:text-gray-600 rounded-full shadow hover:bg-gray-100 transition-colors"
                title="Zoom In"
              >
                <ZoomOut size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
    // return (
    //   <div className="h-full bg-white flex flex-col">
    //     {/* Document Header */}
    //     <div className="p-6 border-b border-gray-200">
    //       <div className="flex items-center justify-between mb-4">
    //         <h3 className="text-lg font-semibold text-gray-900">
    //           Document Details
    //         </h3>
    //         <button
    //           onClick={handleEventClose}
    //           className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
    //         >
    //           <X size={20} />
    //         </button>
    //       </div>

    //       <div className="space-y-2">
    //         <h4 className="font-medium text-gray-900">{selectedEvent.title}</h4>
    //         <p className="text-sm text-gray-600">{selectedEvent.description}</p>
    //         <div className="flex items-center space-x-4 text-xs text-gray-500">
    //           <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
    //           {selectedEvent.provider && (
    //             <span>Dr. {selectedEvent.provider}</span>
    //           )}
    //         </div>
    //       </div>
    //     </div>

    //     {/* Document Content */}
    //     <div className="flex-1 overflow-y-auto p-6">
    //       {/* Extracted Data */}
    //       <div className="mb-6">
    //         <h4 className="font-medium text-gray-900 mb-3">
    //           Extracted Information
    //         </h4>
    //         <div className="bg-gray-50 rounded-lg p-4 space-y-3">
    //           {selectedEvent.extractedData?.map((item, index) => (
    //             <div
    //               key={index}
    //               className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
    //             >
    //               <span className="text-sm font-medium text-gray-700">
    //                 {item.field}
    //               </span>
    //               <span className="text-sm text-gray-900">{item.value}</span>
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Document Viewer */}
    //       <div className="mb-6">
    //         <div className="flex items-center justify-between mb-3">
    //           <h4 className="font-medium text-gray-900">Full Document</h4>
    //           <button className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
    //             <Download size={16} />
    //             <span>Download</span>
    //           </button>
    //         </div>

    //         <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[300px]">
    //           <div className="text-sm text-gray-600">
    //             {selectedEvent.documentContent ||
    //               "Document content would be displayed here..."}
    //           </div>
    //         </div>
    //       </div>

    //       {/* Related Documents */}
    //       {selectedEvent.relatedDocuments &&
    //         selectedEvent.relatedDocuments.length > 0 && (
    //           <div>
    //             <h4 className="font-medium text-gray-900 mb-3">
    //               Related Documents
    //             </h4>
    //             <div className="space-y-2">
    //               {selectedEvent.relatedDocuments.map((doc, index) => (
    //                 <div
    //                   key={index}
    //                   className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
    //                 >
    //                   <FileText size={16} className="text-gray-500" />
    //                   <div className="flex-1">
    //                     <p className="text-sm font-medium text-gray-900">
    //                       {doc.title}
    //                     </p>
    //                     <p className="text-xs text-gray-500">{doc.date}</p>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         )}
    //     </div>
    //   </div>
    // );
  }

  // Default Patient Summary View
  return (
    <div className="h-full bg-white p-6 overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Patient Summary
        </h3>
        <p className="text-gray-600">
          Overview of {patient.name}'s medical information
        </p>
      </div>

      {/* Patient Info Card */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium text-lg">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {patient.name}
            </h4>
            <p className="text-gray-600">
              {patient.age} years old, {patient.sex}
            </p>
            <p className="text-sm text-gray-500 font-mono">ID: {patient.id}</p>
          </div>
        </div>
      </div>

      {/* Allergies */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <AlertTriangle className="text-red-500" size={20} />
          <h4 className="font-medium text-gray-900">Allergies</h4>
        </div>
        <div className="space-y-2">
          {patient.allergies?.length ? (
            patient.allergies.map((allergy, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <span className="text-red-800 font-medium">
                  {allergy.allergen}
                </span>
                <span className="text-sm text-red-600">{allergy.reaction}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No known allergies</p>
          )}
        </div>
      </div>

      {/* Current Medications */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Pill className="text-blue-500" size={20} />
          <h4 className="font-medium text-gray-900">Current Medications</h4>
        </div>
        <div className="space-y-2">
          {patient.medications?.length ? (
            patient.medications.map((med, index) => (
              <div
                key={index}
                className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-blue-900">{med.name}</p>
                    <p className="text-sm text-blue-700">{med.dosage}</p>
                  </div>
                  <span className="text-xs text-blue-600">{med.frequency}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No current medications</p>
          )}
        </div>
      </div>

      {/* Vitals */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Activity className="text-green-500" size={20} />
          <h4 className="font-medium text-gray-900">Latest Vitals</h4>
        </div>
        {patient.vitals ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-sm text-green-700">Blood Pressure</p>
              <p className="font-semibold text-green-900">
                {patient.vitals.bloodPressure}
              </p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-sm text-green-700">Heart Rate</p>
              <p className="font-semibold text-green-900">
                {patient.vitals.heartRate} bpm
              </p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-sm text-green-700">Temperature</p>
              <p className="font-semibold text-green-900">
                {patient.vitals.temperature}°F
              </p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-sm text-green-700">Weight</p>
              <p className="font-semibold text-green-900">
                {patient.vitals.weight} lbs
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">No recent vitals recorded</p>
        )}
      </div>

      {/* Medical History */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Heart className="text-purple-500" size={20} />
          <h4 className="font-medium text-gray-900">Medical History</h4>
        </div>
        <div className="space-y-2">
          {patient.medicalHistory?.length ? (
            patient.medicalHistory.map((condition, index) => (
              <div
                key={index}
                className="p-3 bg-purple-50 border border-purple-200 rounded-lg"
              >
                <p className="font-medium text-purple-900">
                  {condition.condition}
                </p>
                <p className="text-sm text-purple-700">
                  Diagnosed: {condition.diagnosedDate}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No significant medical history
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDocs;
