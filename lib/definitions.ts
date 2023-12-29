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
  patient: Patient;
  patientId: number;
  doctor: Doctor;
  doctorId: number;
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
