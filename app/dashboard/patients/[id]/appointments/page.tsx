import { AppointmentTableForDoctorsAndPatients } from "@/components/ui/common/appointment-table";
import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import Pagination from "@/components/ui/common/pagination";
import Search from "@/components/ui/common/search";
import {
  getAppointmentsByPatientId,
  getAppointmentsByPatientIdTotalPages,
  getPatientById,
} from "@/lib/data";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export default async function AppointmentsForPatientPage({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const patientData = getPatientById(id);
  const appointmentsData = getAppointmentsByPatientId(id, query, currentPage);
  const appointmentTotalPagesData = getAppointmentsByPatientIdTotalPages(
    id,
    query
  );

  const [patient, appointments, totalPages] = await Promise.all([
    patientData,
    appointmentsData,
    appointmentTotalPagesData,
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
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
