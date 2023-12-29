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
