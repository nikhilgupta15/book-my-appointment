"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  AppointmentFormType,
  CreateDoctorFormType,
  CreatePatientFormType,
  mailData,
} from "./definitions";
import { PrismaClient, Speciality, Status } from "@prisma/client";
import {
  getAvailableTimeSlotsByDoctorId,
  getDoctorById,
  getPatientById,
} from "./data";
import { convertTimeSlotHoursTo12HourFormat } from "./utils";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { AppointmentScheduledMail } from "../components/ui/common/appointment-email";

const prisma = new PrismaClient();

export async function createDoctor(data: CreateDoctorFormType) {
  try {
    let speciality: Speciality;
    switch (data.speciality) {
      case "GENERAL":
        speciality = Speciality.GENERAL;
        break;
      case "CARDIOLOGY":
        speciality = Speciality.CARDIOLOGY;
        break;
      case "ORTHOPEDICS":
        speciality = Speciality.ORTHOPEDICS;
        break;
      case "NEUROLOGY":
        speciality = Speciality.NEUROLOGY;
        break;
      case "ONCOLOGY":
        speciality = Speciality.ONCOLOGY;
        break;
      default:
        speciality = Speciality.GENERAL;
        break;
    }

    await prisma.doctor.create({
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
      error: "true",
      message: `${error}. Failed to Create Doctor.`,
    };
  }

  revalidatePath("/dashboard/doctors");
  redirect("/dashboard/doctors");
}

export async function createPatient(data: CreatePatientFormType) {
  try {
    await prisma.patient.create({
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
      error: true,
      message: `${error}. Failed to Create Patient.`,
    };
  }

  revalidatePath("/dashboard/patients");
  redirect("/dashboard/patients");
}

export async function createAppointment(data: AppointmentFormType) {
  try {
    const bookedTimeSlots = await getAvailableTimeSlotsByDoctorId(
      data.doctorId,
      data.appointmentDate
    );

    const timeSlotBooked = convertTimeSlotHoursTo12HourFormat(
      data.appointmentDate
        .toLocaleString("en-GB", { timeZone: "IST" })
        .split(" ")[1]
    );

    if (bookedTimeSlots.findIndex((t) => t === timeSlotBooked) !== -1) {
      throw new Error(
        "Time Slot not available. Already booked for another patient"
      );
    }

    await prisma.appointment.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: data.appointmentDate,
        doctorName: data.doctorName,
        patientName: data.patientName,
        description: data.description,
        status: Status.SCHEDULED,
      },
    });

    sendAppointmentEmail(
      data.patientId,
      data.doctorId,
      data.appointmentDate,
      data.description
    );
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: true,
      message: `${error}. Failed to Create Appointment.`,
    };
  }

  revalidatePath("/dashboard/appointments");
  redirect("/dashboard/appointments");
}

export async function updateDoctor(id: string, data: CreateDoctorFormType) {
  try {
    let speciality: Speciality;
    switch (data.speciality) {
      case "GENERAL":
        speciality = Speciality.GENERAL;
        break;
      case "CARDIOLOGY":
        speciality = Speciality.CARDIOLOGY;
        break;
      case "ORTHOPEDICS":
        speciality = Speciality.ORTHOPEDICS;
        break;
      case "NEUROLOGY":
        speciality = Speciality.NEUROLOGY;
        break;
      case "ONCOLOGY":
        speciality = Speciality.ONCOLOGY;
        break;
      default:
        speciality = Speciality.GENERAL;
        break;
    }

    await prisma.doctor.update({
      where: {
        id: id,
      },
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
      error: true,
      message: `${error}. Failed to Update Doctor.`,
    };
  }

  revalidatePath("/dashboard/doctors");
  redirect("/dashboard/doctors");
}

export async function updatePatient(id: string, data: CreatePatientFormType) {
  try {
    await prisma.patient.update({
      where: {
        id: id,
      },
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
      error: true,
      message: `${error}. Failed to Update Patient.`,
    };
  }

  revalidatePath("/dashboard/patients");
  redirect("/dashboard/patients");
}

export async function updateAppointment(id: string, data: AppointmentFormType) {
  try {
    const bookedTimeSlots = await getAvailableTimeSlotsByDoctorId(
      data.doctorId,
      data.appointmentDate
    );

    const timeSlotBooked = convertTimeSlotHoursTo12HourFormat(
      data.appointmentDate
        .toLocaleString("en-GB", { timeZone: "IST" })
        .split(" ")[1]
    );

    if (bookedTimeSlots.findIndex((t) => t === timeSlotBooked) !== -1) {
      throw new Error(
        "Time Slot not available. Already booked for another patient"
      );
    }

    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: data.appointmentDate,
        doctorName: data.doctorName,
        patientName: data.patientName,
        description: data.description,
        status: Status.SCHEDULED,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: true,
      message: `${error}. Failed to Update Appointment.`,
    };
  }

  revalidatePath("/dashboard/appointments");
  redirect("/dashboard/appointments");
}

export async function deleteDoctor(id: string) {
  try {
    await prisma.doctor.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`${error}. Failed to Delete Doctor.`);
    // return {
    //   error: true,
    //   message: "Database Error: Failed to Delete Doctor.",
    // };
  }
  revalidatePath("/dashboard/doctors");
}

export async function deletePatient(id: string) {
  try {
    await prisma.patient.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`${error}. Failed to Delete Patient.`);
    // return {
    //   error: true,
    //   message: "Database Error: Failed to Delete Patient.",
    // };
  }
  revalidatePath("/dashboard/patients");
}

export async function deleteAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`${error}. Failed to Delete Appointment.`);
    // return {
    //   error: true,
    //   message: "Database Error: Failed to Delete Appointment.",
    // };
  }
  revalidatePath("/dashboard/appointments");
}

export async function updateAppointmentStatus(id: string, status: Status) {
  try {
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      error: true,
      message: `${error}. Failed to Update Appointment Status.`,
    };
  }
  revalidatePath("/dashboard/appointments");
  redirect("/dashboard/appointments");
}

async function sendAppointmentEmail(
  patientId: string,
  doctorId: string,
  appointmentDate: Date,
  appointmentDescription: string
) {
  try {
    const [patientData, doctorData] = await Promise.all([
      getPatientById(patientId),
      getDoctorById(doctorId),
    ]);

    if (patientData?.email && doctorData?.email) {
      const emailHtml = render(
        AppointmentScheduledMail({
          appointmentDate,
          doctorData,
          patientData,
          appointmentDescription,
        })
      );

      let mailData: mailData = {
        to: doctorData.email,
        cc: patientData.email,
        subject: `New Appointment - ${patientData.name}`,
        html: emailHtml,
      };

      sendEmail(mailData);
    }
  } catch (error) {
    console.error("Email Error:", error);
    throw new Error(`${error}. Failed to send email`);
  }
}

async function sendEmail(mailData: mailData) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USERNAME,
      to: mailData.to,
      cc: mailData.cc,
      subject: mailData.subject,
      html: mailData.html,
    };
    new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`${error}. Failed to send email`);
  }
}
