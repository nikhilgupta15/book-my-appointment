"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  AppointmentFormType,
  CreateDoctorFormType,
  CreatePatientFormType,
} from "./definitions";
import { PrismaClient, Speciality } from "@prisma/client";

const prisma = new PrismaClient();

export async function createDoctor(data: CreateDoctorFormType) {
  try {
    let speciality: Speciality;
    switch (data.speciality) {
      case "General":
        speciality = Speciality.GENERAL;
        break;
      case "Cardiology":
        speciality = Speciality.CARDIOLOGY;
        break;
      case "Orthopedics":
        speciality = Speciality.ORTHOPEDICS;
        break;
      case "Neurology":
        speciality = Speciality.NEUROLOGY;
        break;
      case "Oncology":
        speciality = Speciality.ONCOLOGY;
        break;
      default:
        speciality = Speciality.GENERAL;
        break;
    }

    const doctor = await prisma.doctor.create({
      data: {
        name: data.name,
        speciality: speciality,
        phone: data.phone,
        address: data.address,
        email: data.email,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Doctor.",
    };
  }

  revalidatePath("/dashboard/doctors");
  redirect("/dashboard/doctors");
}

export async function createPatient(data: CreatePatientFormType) {
  try {
    const patient = await prisma.patient.create({
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        email: data.email,
        birthday: data.dateOfBirth,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Patient.",
    };
  }

  revalidatePath("/dashboard/patients");
  redirect("/dashboard/patients");
}

export async function createAppointment(data: AppointmentFormType) {
  try {
    const appointment = await prisma.appointment.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: data.appointmentDate,
        doctorName: data.doctorName,
        patientName: data.patientName,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to Create Appointment.",
    };
  }

  revalidatePath("/dashboard/appointments");
  redirect("/dashboard/appointments");
}
