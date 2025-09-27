import img1 from './Images/1.jpg';
import img2 from './Images/2.jpg';
import img3 from './Images/3.jpg';

export const patients= [
  {
    id: 'PAT001',
    name: 'Emily Johnson',
    age: 34,
    sex: 'F',
    phone: '5551234567',
    email: 'emily.johnson@email.com',
    hasUnreadDocuments: true,
    allergies: [
      { allergen: 'Penicillin', reaction: 'Rash' },
      { allergen: 'Shellfish', reaction: 'Anaphylaxis' }
    ],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' }
    ],
    vitals: {
      bloodPressure: '128/82',
      heartRate: 72,
      temperature: 98.6,
      weight: 145
    },
    medicalHistory: [
      { condition: 'Type 2 Diabetes', diagnosedDate: '2020-03-15' },
      { condition: 'Hypertension', diagnosedDate: '2019-11-22' }
    ]
  },
  {
    id: 'PAT002',
    name: 'Michael Chen',
    age: 45,
    sex: 'M',
    phone: '5559876543',
    email: 'michael.chen@email.com',
    hasUnreadDocuments: false,
    allergies: [],
    medications: [
      { name: 'Atorvastatin', dosage: '20mg', frequency: 'Daily' }
    ],
    vitals: {
      bloodPressure: '118/76',
      heartRate: 68,
      temperature: 98.4,
      weight: 175
    },
    medicalHistory: [
      { condition: 'High Cholesterol', diagnosedDate: '2021-06-10' }
    ]
  },
  {
    id: 'PAT003',
    name: 'Sarah Williams',
    age: 28,
    sex: 'F',
    phone: '5555551234',
    email: 'sarah.williams@email.com',
    hasUnreadDocuments: true,
    allergies: [
      { allergen: 'Latex', reaction: 'Contact dermatitis' }
    ],
    medications: [],
    vitals: {
      bloodPressure: '110/70',
      heartRate: 75,
      temperature: 98.2,
      weight: 130
    },
    medicalHistory: []
  },
  {
    id: 'PAT004',
    name: 'Robert Davis',
    age: 62,
    sex: 'M',
    phone: '5554567890',
    email: 'robert.davis@email.com',
    hasUnreadDocuments: false,
    allergies: [
      { allergen: 'Aspirin', reaction: 'GI bleeding' }
    ],
    medications: [
      { name: 'Warfarin', dosage: '5mg', frequency: 'Daily' },
      { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily' }
    ],
    vitals: {
      bloodPressure: '135/85',
      heartRate: 65,
      temperature: 98.8,
      weight: 190
    },
    medicalHistory: [
      { condition: 'Atrial Fibrillation', diagnosedDate: '2018-09-12' },
      { condition: 'Coronary Artery Disease', diagnosedDate: '2017-04-28' }
    ]
  },
  {
    id: 'PAT005',
    name: 'Lisa Thompson',
    age: 39,
    sex: 'F',
    phone: '5556789012',
    email: 'lisa.thompson@email.com',
    hasUnreadDocuments: true,
    allergies: [],
    medications: [
      { name: 'Levothyroxine', dosage: '75mcg', frequency: 'Daily' }
    ],
    vitals: {
      bloodPressure: '122/78',
      heartRate: 70,
      temperature: 98.3,
      weight: 155
    },
    medicalHistory: [
      { condition: 'Hypothyroidism', diagnosedDate: '2019-02-14' }
    ]
  },
  {
    id: 'PAT006',
    name: 'David Wilson',
    age: 51,
    sex: 'M',
    phone: '5557890123',
    email: 'david.wilson@email.com',
    hasUnreadDocuments: false,
    allergies: [
      { allergen: 'Sulfa drugs', reaction: 'Stevens-Johnson syndrome' }
    ],
    medications: [
      { name: 'Albuterol', dosage: '90mcg', frequency: 'As needed' },
      { name: 'Fluticasone', dosage: '110mcg', frequency: 'Twice daily' }
    ],
    vitals: {
      bloodPressure: '125/80',
      heartRate: 74,
      temperature: 98.5,
      weight: 180
    },
    medicalHistory: [
      { condition: 'Asthma', diagnosedDate: '2015-08-03' }
    ]
  }
];

const medicalEvents = [
  {
    id: 'EVENT001',
    patientId: 'PAT001',
    type: 'lab',
    title: 'Complete Blood Count',
    description: 'Routine blood work showing normal values across all parameters',
    date: '2024-01-15',
    provider: 'Johnson',
    extractedData: [
      { field: 'WBC Count', value: '6.5 K/uL' },
      { field: 'RBC Count', value: '4.2 M/uL' },
      { field: 'Hemoglobin', value: '13.5 g/dL' },
      { field: 'Hematocrit', value: '40.2%' },
      { field: 'Platelet Count', value: '285 K/uL' }
    ],
    documentContent: 'Complete Blood Count Results\n\nPatient: Emily Johnson\nDate: January 15, 2024\n\nResults:\nWBC: 6.5 K/uL (Normal: 4.0-11.0)\nRBC: 4.2 M/uL (Normal: 4.0-5.5)\nHemoglobin: 13.5 g/dL (Normal: 12.0-16.0)\nHematocrit: 40.2% (Normal: 36-46)\nPlatelet Count: 285 K/uL (Normal: 150-450)\n\nInterpretation: All values within normal limits.',
  image: img1
  },
  {
    id: 'EVENT002',
    patientId: 'PAT001',
    type: 'visit',
    title: 'Annual Physical Examination',
    description: 'Comprehensive annual exam with review of systems and medication adjustments',
    date: '2024-01-08',
    provider: 'Johnson',
    extractedData: [
      { field: 'Blood Pressure', value: '128/82 mmHg' },
      { field: 'Weight', value: '145 lbs' },
      { field: 'BMI', value: '24.2' },
      { field: 'Assessment', value: 'Stable diabetes, well-controlled hypertension' }
    ],
    documentContent: 'Annual Physical Examination\n\nPatient: Emily Johnson\nDate: January 8, 2024\n\nVitals:\nBP: 128/82 mmHg\nHR: 72 bpm\nTemp: 98.6°F\nWeight: 145 lbs\nBMI: 24.2\n\nReview of Systems: Negative for chest pain, shortness of breath, palpitations. Reports good energy levels.\n\nPhysical Exam: Normal heart sounds, clear lungs, abdomen soft and non-tender.\n\nAssessment: Type 2 diabetes mellitus - stable, well controlled. Hypertension - well controlled on current regimen.\n\nPlan: Continue current medications. Follow up in 6 months.',
  image: img2
  },
  {
    id: 'EVENT003',
    patientId: 'PAT001',
    type: 'lab',
    title: 'HbA1c Test',
    description: 'Diabetes monitoring showing good glycemic control',
    date: '2023-12-20',
    provider: 'Johnson',
    extractedData: [
      { field: 'HbA1c', value: '6.8%' },
      { field: 'Glucose', value: '142 mg/dL' },
      { field: 'Target Goal', value: '<7.0%' }
    ],
    documentContent: 'Hemoglobin A1c Results\n\nPatient: Emily Johnson\nDate: December 20, 2023\n\nResults:\nHbA1c: 6.8% (Target <7.0%)\nGlucose: 142 mg/dL\n\nInterpretation: Good glycemic control. Patient meeting target goals for diabetes management.',
  image: img3
  },
  {
    id: 'EVENT004',
    patientId: 'PAT002',
    type: 'lab',
    title: 'Lipid Panel',
    description: 'Cholesterol levels showing improvement with statin therapy',
    date: '2024-01-10',
    provider: 'Smith',
    extractedData: [
      { field: 'Total Cholesterol', value: '185 mg/dL' },
      { field: 'LDL Cholesterol', value: '105 mg/dL' },
      { field: 'HDL Cholesterol', value: '55 mg/dL' },
      { field: 'Triglycerides', value: '125 mg/dL' }
    ],
  image: img2
  },
  {
    id: 'EVENT005',
    patientId: 'PAT003',
    type: 'visit',
    title: 'Routine Gynecologic Exam',
    description: 'Annual well-woman visit with preventive care',
    date: '2024-01-12',
    provider: 'Brown',
    extractedData: [
      { field: 'Pap Smear', value: 'Normal' },
      { field: 'Breast Exam', value: 'Normal' },
      { field: 'Pelvic Exam', value: 'Normal' }
    ],
  image: img1
  }
];

export const getMedicalEventsForPatient = (patientId) => {
  return medicalEvents.filter(event => event.patientId === patientId);
};