import { CreateAppointment } from "@/components/ui/appointments/buttons";
import { AppointmentTable } from "@/components/ui/appointments/table";
import { lusitana } from "@/components/ui/common/fonts";
import Pagination from "@/components/ui/common/pagination";
import Search from "@/components/ui/common/search";
import { getAppointmentsTotalPages } from "@/lib/data";
import React, { Suspense } from "react";

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

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
      <div className="mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <AppointmentTable query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
