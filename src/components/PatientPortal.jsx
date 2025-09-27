import { useState } from "react";
import Timeline from "./Timeline";
import PatientDocs from "./PatientDocs";
import DataServices from "../supabase/dataConfig";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "./Navigation";

const PatientPortal = () => {
  const { patientId } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    async function fetchPatientDetails(patientId) {
      try {
        const response = await DataServices.getTransformedPatientById(patientId);
        setPatient(response);
      } catch (err) {
        console.error("Error in useEffect:", err);
        setPatient(null);
      }
    }

    fetchPatientDetails(patientId);
  }, [patientId]);


  if (!patient) {
    return (
      <div className="flex items-center justify-center h-full text-lg">
        Loading patient data...
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="flex h-[calc(100vh-4rem)] mt-13">
        {/* Left Pane - Timeline (60%) */}
        <div className="w-[60%] border-r border-gray-200 overflow-y-auto">
          <Timeline
            patient={patient}
            selectedEvent={selectedEvent}
            onEventSelect={setSelectedEvent}
          />
        </div>

        {/* Right Pane - Details (40%) */}
        <div className={`w-[40%] ${selectedEvent ? 'overflow-hidden' : 'overflow-y-auto'}`}>
          <PatientDocs
            patient={patient}
            selectedEvent={selectedEvent}
            onEventClose={() => setSelectedEvent(null)}
          />
        </div>
      </div>
    </>
  );
};

export default PatientPortal;