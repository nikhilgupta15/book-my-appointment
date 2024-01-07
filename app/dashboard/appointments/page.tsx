import { CreateAppointment } from "@/components/ui/appointments/buttons";
import { AppointmentTable } from "@/components/ui/appointments/table";
import Filter from "@/components/ui/common/filter";
import { lusitana } from "@/components/ui/common/fonts";
import Pagination from "@/components/ui/common/pagination";
import Search from "@/components/ui/common/search";
import { AppointmentsTableSkeleton } from "@/components/ui/common/skeletons";
import { appointmentStatus, specialities } from "@/lib/constants";
import { getAppointmentsTotalPages } from "@/lib/data";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Appointments",
};

export default async function AppointmentsPage({
  searchParams,
}: {
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

  const totalPages = await getAppointmentsTotalPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Appointments</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Appointments..." />
        <CreateAppointment />
      </div>
      <div className="mt-8 grid sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <Filter data={[...specialities, "ALL"]} type="Department" />
        <Filter data={[...appointmentStatus, "ALL"]} type="Status" />
      </div>
      <div className="mt-8">
        <Suspense fallback={<AppointmentsTableSkeleton />}>
          <AppointmentTable
            query={query}
            currentPage={currentPage}
            departmentFilter={departmentFilter}
            statusFilter={statusFilter}
          />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
