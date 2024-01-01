import { EditAppointmentForm } from "@/components/ui/appointments/edit-form";
import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import { getAllDoctors, getAllPatients, getAppointmentById } from "@/lib/data";
import { Status } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function AppointmentEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const patientData = getAllPatients();
  const doctorData = getAllDoctors();
  const appointmentData = getAppointmentById(id);

  const [patients, doctors, appointment] = await Promise.all([
    patientData,
    doctorData,
    appointmentData,
  ]);

  if (!appointment || appointment.status !== Status.SCHEDULED) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Appointments", href: "/dashboard/appointments" },
          {
            label: "Edit Appointment",
            href: `/dashboard/appointments/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditAppointmentForm
        patients={patients}
        doctors={doctors}
        appointment={appointment}
      />
    </main>
  );
}
