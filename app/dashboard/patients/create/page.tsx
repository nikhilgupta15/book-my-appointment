import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import { CreatePatientForm } from "@/components/ui/patients/create-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Patient",
};

export default async function PatientCreatePage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Patients", href: "/dashboard/patients" },
          {
            label: "Create Patient",
            href: "/dashboard/patients/create",
            active: true,
          },
        ]}
      />
      <CreatePatientForm />
    </main>
  );
}
