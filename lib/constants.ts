export const timeSlots = [
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
];

export const specialities = [
  "GENERAL",
  "CARDIOLOGY",
  "ORTHOPEDICS",
  "NEUROLOGY",
  "ONCOLOGY",
];

export const appointmentStatus = ["SCHEDULED", "CANCELLED", "COMPLETED"];

export const ITEMS_PER_PAGE = 5;

export const SERVICE_ID: string = process.env.NEXT_SERVICE_ID || "";

export const TEMPLATE_ID_APPOINTMENT_DOCTOR: string =
  process.env.NEXT_TEMPLATE_ID_APPOINTMENT_DOCTOR || "";

export const TEMPLATE_ID_APPOINTMENT_PATIENT: string =
  process.env.NEXT_TEMPLATE_ID_APPOINTMENT_PATIENT || "";

export const PUBLIC_KEY: string = process.env.NEXT_PUBLIC_KEY || "";

export const PRIVATE_KEY: string = process.env.NEXT_PRIVATE_KEY || "";

export const baseURL: string =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://bookmyappointment.vercel.app";
