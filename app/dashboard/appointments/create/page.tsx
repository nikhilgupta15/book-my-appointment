import { CreateAppointmentForm } from "@/components/ui/appointments/create-form";
import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import { getAllDoctors, getAllPatients } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Appointment",
};

export default async function AppointmentCreatePage() {
  const patientData = getAllPatients();
  const doctorData = getAllDoctors();

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
