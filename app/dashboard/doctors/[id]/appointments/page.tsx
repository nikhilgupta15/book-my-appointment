import { AppointmentTableForDoctorsAndPatients } from "@/components/ui/common/appointment-table";
import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import Filter from "@/components/ui/common/filter";
import Pagination from "@/components/ui/common/pagination";
import Search from "@/components/ui/common/search";
import { AppointmentsTableSkeleton } from "@/components/ui/common/skeletons";
import { appointmentStatus, specialities } from "@/lib/constants";
import {
  getAppointmentsByDoctorId,
  getAppointmentsByDoctorIdTotalPages,
  getDoctorById,
} from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const doctor = await getDoctorById(id);
  return {
    title: `Appointments | Dr. ${doctor?.name}`,
  };
}

export default async function AppointmentsForDoctorPage({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    query?: string;
    page?: string;
    Department?: string;
    Status?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const departmentFilter =
    searchParams?.Department === "All" ? "" : searchParams.Department || "";
  const statusFilter =
    searchParams?.Status === "All" ? "" : searchParams.Status || "";

  const doctorData = getDoctorById(id);
  const appointmentsData = getAppointmentsByDoctorId(
    id,
    query,
    currentPage,
    departmentFilter,
    statusFilter
  );
  const appointmentTotalPagesData = getAppointmentsByDoctorIdTotalPages(
    id,
    query
  );

  const [doctor, appointments, totalPages] = await Promise.all([
    doctorData,
    appointmentsData,
    appointmentTotalPagesData,
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
        <div className="mt-8 grid sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <Filter data={[...specialities, "ALL"]} type="Department" />
          <Filter data={[...appointmentStatus, "ALL"]} type="Status" />
        </div>
        <div className="mt-8">
          <Suspense fallback={<AppointmentsTableSkeleton />}>
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
