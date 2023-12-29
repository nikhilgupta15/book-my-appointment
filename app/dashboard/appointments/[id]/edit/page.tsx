import { EditAppointmentForm } from "@/components/ui/appointments/edit-form";
import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import { getAppointmentById, getDoctors, getPatients } from "@/lib/data";

export default async function AppointmentEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const patientData = getPatients();
  const doctorData = getDoctors();
  const appointmentData = getAppointmentById(id);

  const [patients, doctors, appointment] = await Promise.all([
    patientData,
    doctorData,
    appointmentData,
  ]);

  if (!appointment) {
    return;
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
