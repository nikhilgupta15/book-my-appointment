"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateDoctorFormType } from "./definitions";
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
