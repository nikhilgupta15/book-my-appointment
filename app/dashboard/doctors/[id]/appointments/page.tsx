import { AppointmentTableForDoctorsAndPatients } from "@/components/ui/common/appointment-table";
import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import Search from "@/components/ui/common/search";
import { getAppointmentsByDoctorId, getDoctorById } from "@/lib/data";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export default async function AppointmentsForDoctorPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const doctorData = getDoctorById(id);
  const appointmentsData = getAppointmentsByDoctorId(id);

  const [doctor, appointments] = await Promise.all([
    doctorData,
    appointmentsData,
  ]);

  if (!doctor) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Doctors", href: "/dashboard/doctors" },
          {
            label: `${doctor?.name}`,
            href: `/dashboard/doctors`,
          },
          {
            label: "Appointments",
            href: `/dashboard/doctors/${id}/appointments`,
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
