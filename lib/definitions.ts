export type Patient = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthday: Date;
  appointments: Appointment[];
};

type Speciality =
  | "General"
  | "Cardiology"
  | "Orthopedics"
  | "Neurology"
  | "Oncology";

export type Doctor = {
  id: number;
  name: string;
  speciality: Speciality;
  phone: string;
  address: string;
  appointments: Appointment[];
};

export type Appointment = {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateDoctorFormType = {
  name: string;
  speciality: string;
  phone: string;
  address: string;
  email: string;
};

export type CreatePatientFormType = {
  name: string;
  phone: string;
  address: string;
  email: string;
  dateOfBirth: Date;
};

export type AppointmentFormType = {
  patientId: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  appointmentDate: Date;
  description: string;
};

export type emailTemplateParams = {
  To: string;

  patientName?: string;
  patientEmail?: string;
  patientBirthday?: string;
  patientMobile?: string;
  patientUrl?: string;

  doctorName?: string;
  doctorEmail?: string;
  doctorPhone?: string;
  doctorAddress?: string;
  doctorUrl?: string;

  appointmentDate?: string;
  appointmentDescription?: string;
};
