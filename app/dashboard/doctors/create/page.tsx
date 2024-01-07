import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import { CreateDoctorForm } from "@/components/ui/doctors/create-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Doctor",
};

export default async function DoctorCreatePage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Doctors", href: "/dashboard/doctors" },
          {
            label: "Create Doctor",
            href: "/dashboard/doctors/create",
            active: true,
          },
        ]}
      />
      <CreateDoctorForm />
    </main>
  );
}
