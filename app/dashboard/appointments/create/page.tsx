import { CreateAppointmentForm } from "@/components/ui/appointments/create-form";
import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import { getDoctors, getPatients } from "@/lib/data";

export default async function AppointmentCreatePage() {
  const patientData = getPatients("", 1);
  const doctorData = getDoctors("", 1);

  const [patients, doctors] = await Promise.all([patientData, doctorData]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Appointments", href: "/dashboard/appointments" },
          {
            label: "Schedule Appointment",
            href: "/dashboard/appointments/create",
            active: true,
          },
        ]}
      />
      <CreateAppointmentForm patients={patients} doctors={doctors} />
    </main>
  );
}
