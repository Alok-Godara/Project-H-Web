import { useState } from "react";
import Timeline from "./Timeline";
import { getMedicalEventsForPatient } from "../data/mockData";
import PatientDocs from "./PatientDocs";
import { patients } from "../data/mockData";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "./Navigation";

const PatientPortal = () => {
  const { patientId } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const medicalEvents = getMedicalEventsForPatient(patientId);
  const [patient, setPatient] = useState(null);

  // console.log("PatientPortal mounted, patientId:", patientId);
  // console.log("Patient ID from URL:", patientId);
  // console.log("Patient details:", patients);

  useEffect(() => {
    async function fetchPatientDetails(patientId) {
      try {
        const response = patients.find(
          (patient) => String(patient.id) === String(patientId)
        );
        setPatient(response);
      } catch (err) {
        console.error("Error in useEffect:", err);
      }
    }

    fetchPatientDetails(patientId);
  }, [patientId]);

  console.log(patient);

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
        <div className="w-[60%] border-r border-gray-200">
          <Timeline
            patient={patient}
            events={medicalEvents}
            onEventSelect={setSelectedEvent}
            selectedEvent={selectedEvent}
          />
        </div>

        {/* Right Pane - Details (40%) */}
        <div className="w-[40%]">
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
