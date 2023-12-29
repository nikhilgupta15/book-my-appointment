import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDoctors() {
  try {
    const data = await prisma.doctor.findMany();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch doctors data.");
  }
}

export async function getPatients() {
  try {
    const data = await prisma.patient.findMany();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch patients data.");
  }
}

export async function getAppointments() {
  try {
    const data = await prisma.appointment.findMany();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch appointments data.");
  }
}

export async function getPatientById(id: string) {
  try {
    const data = await prisma.patient.findUnique({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch patient data.");
  }
}
