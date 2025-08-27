import { useState } from "react";
import Timeline from "./Timeline";
import { getMedicalEventsForPatient } from "../data/mockData";
import PatientDocs from "./PatientDocs";
import { patients } from "../data/mockData";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const PatientPortal = () => {
  const { patientId } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const medicalEvents = getMedicalEventsForPatient(patientId);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    async function fetchPatientDetails(patientid) {
      try {
        const response = patients.find(
          (patient) => String(patient.id) === String(patientid)
        );
        console.log("Fetched patient:", response);
        setPatient(response);
      } catch (err) {
        console.error("Error in useEffect:", err);
      }
    }

    fetchPatientDetails(patientId);
  }, [patientId]);

  console.log(patient);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
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
  );
};

export default PatientPortal;
