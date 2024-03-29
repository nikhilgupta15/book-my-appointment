import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import { EditPatientForm } from "@/components/ui/patients/edit-form";
import { getPatientById } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const patient = await getPatientById(id);
  return {
    title: patient?.name,
  };
}

export default async function PatientEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const patient = await getPatientById(id);

  if (!patient) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Patients", href: "/dashboard/patients" },
          {
            label: "Edit Patient",
            href: `/dashboard/patients/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditPatientForm patient={patient} isEditable={true} />
    </main>
  );
}
