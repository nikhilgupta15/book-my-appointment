import { AppointmentTableForDoctorsAndPatients } from "@/components/ui/common/appointment-table";
import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import Search from "@/components/ui/common/search";
import { getAppointmentsByPatientId, getPatientById } from "@/lib/data";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export default async function AppointmentsForPatientPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const patientData = getPatientById(id);
  const appointmentsData = getAppointmentsByPatientId(id);

  const [patient, appointments] = await Promise.all([
    patientData,
    appointmentsData,
  ]);

  if (!patient) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Patients", href: "/dashboard/patients" },
          {
            label: `${patient?.name}`,
            href: `/dashboard/patients`,
          },
          {
            label: "Appointments",
            href: `/dashboard/patients/${id}/appointments`,
            active: true,
          },
        ]}
      />
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search Appointments..." />
        </div>
        <div className="mt-8">
          <Suspense fallback={<div>Loading...</div>}>
            <AppointmentTableForDoctorsAndPatients
              appointments={appointments}
            />
          </Suspense>
        </div>
        {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
      </div>
    </main>
  );
}
