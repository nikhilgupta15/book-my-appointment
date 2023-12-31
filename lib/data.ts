import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDoctors(query: string, page: number) {
  try {
    const data = await prisma.doctor.findMany({
      orderBy: {
        id: "asc",
      },
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
          {
            phone: {
              contains: query,
            },
          },
          {
            address: {
              contains: query,
            },
          },
        ],
      },
      skip: (page - 1) * 6,
      take: 6,
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch doctors data.");
  }
}
export async function getPatients(query: string, page: number) {
  try {
    const data = await prisma.patient.findMany({
      orderBy: {
        id: "asc",
      },
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
          {
            phone: {
              contains: query,
            },
          },
          {
            address: {
              contains: query,
            },
          },
        ],
      },
      skip: (page - 1) * 6,
      take: 6,
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch patients data.");
  }
}

export async function getAppointments(query: string, page: number) {
  try {
    const data = await prisma.appointment.findMany({
      orderBy: {
        id: "asc",
      },
      where: {
        OR: [
          {
            id: {
              contains: query,
            },
          },
          {
            patientName: {
              contains: query,
            },
          },
          {
            doctorName: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
      skip: (page - 1) * 6,
      take: 6,
    });
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

export async function getDoctorById(id: string) {
  try {
    const data = await prisma.doctor.findUnique({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch doctor data.");
  }
}

export async function getAppointmentById(id: string) {
  try {
    const data = await prisma.appointment.findUnique({
      where: {
        id: id,
      },
    });
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch appointment data.");
  }
}

export async function getAppointmentsByDoctorId(
  doctorId: string,
  query: string,
  page: number
) {
  try {
    const appointment = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
        AND: [
          {
            OR: [
              {
                id: {
                  contains: query,
                },
              },
              {
                patientName: {
                  contains: query,
                },
              },
              {
                doctorName: {
                  contains: query,
                },
              },
              {
                description: {
                  contains: query,
                },
              },
            ],
          },
        ],
      },
      skip: (page - 1) * 6,
      take: 6,
    });
    return appointment;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch appointment data.");
  }
}

export async function getAppointmentsByPatientId(
  patientId: string,
  query: string,
  page: number
) {
  try {
    const appointment = await prisma.appointment.findMany({
      where: {
        patientId: patientId,
        AND: [
          {
            OR: [
              {
                id: {
                  contains: query,
                },
              },
              {
                patientName: {
                  contains: query,
                },
              },
              {
                doctorName: {
                  contains: query,
                },
              },
              {
                description: {
                  contains: query,
                },
              },
            ],
          },
        ],
      },
      skip: (page - 1) * 6,
      take: 6,
    });
    return appointment;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch appointment data.");
  }
}

export async function getPatientsTotalPages(query: string) {
  try {
    const data = await prisma.patient.findMany({
      orderBy: {
        id: "asc",
      },
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
          {
            phone: {
              contains: query,
            },
          },
          {
            address: {
              contains: query,
            },
          },
        ],
      },
    });
    return Math.ceil(data.length / 6);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch patients data.");
  }
}

export async function getDoctorsTotalPages(query: string) {
  try {
    const data = await prisma.doctor.findMany({
      orderBy: {
        id: "asc",
      },
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
          {
            phone: {
              contains: query,
            },
          },
          {
            address: {
              contains: query,
            },
          },
        ],
      },
    });
    return Math.ceil(data.length / 6);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch doctors data.");
  }
}

export async function getAppointmentsTotalPages(query: string) {
  try {
    const data = await prisma.appointment.findMany({
      orderBy: {
        id: "asc",
      },
      where: {
        OR: [
          {
            id: {
              contains: query,
            },
          },
          {
            patientName: {
              contains: query,
            },
          },
          {
            doctorName: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
    });
    return Math.ceil(data.length / 6);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch appointments data.");
  }
}

export async function getAppointmentsByDoctorIdTotalPages(
  doctorId: string,
  query: string
) {
  try {
    const appointment = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
        AND: [
          {
            OR: [
              {
                id: {
                  contains: query,
                },
              },
              {
                patientName: {
                  contains: query,
                },
              },
              {
                doctorName: {
                  contains: query,
                },
              },
              {
                description: {
                  contains: query,
                },
              },
            ],
          },
        ],
      },
    });
    return Math.ceil(appointment.length / 6);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch appointment data.");
  }
}

export async function getAppointmentsByPatientIdTotalPages(
  patientId: string,
  query: string
) {
  try {
    const appointment = await prisma.appointment.findMany({
      where: {
        patientId: patientId,
        AND: [
          {
            OR: [
              {
                id: {
                  contains: query,
                },
              },
              {
                patientName: {
                  contains: query,
                },
              },
              {
                doctorName: {
                  contains: query,
                },
              },
              {
                description: {
                  contains: query,
                },
              },
            ],
          },
        ],
      },
    });
    return Math.ceil(appointment.length / 6);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch appointment data.");
  }
}
