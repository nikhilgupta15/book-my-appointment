import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import { EditDoctorForm } from "@/components/ui/doctors/edit-form";
import { getDoctorById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function DoctorEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const doctor = await getDoctorById(id);

  if (!doctor) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Doctors", href: "/dashboard/doctors" },
          {
            label: "Edit Doctor",
            href: `/dashboard/doctors/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditDoctorForm doctor={doctor} />
    </main>
  );
}
