import { lusitana } from "@/components/ui/common/fonts";
import Pagination from "@/components/ui/common/pagination";
import Search from "@/components/ui/common/search";
import { PatientsTableSkeleton } from "@/components/ui/common/skeletons";
import { CreatePatient } from "@/components/ui/patients/buttons";
import { PatientTable } from "@/components/ui/patients/table";
import { getPatientsTotalPages } from "@/lib/data";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Patients",
};

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getPatientsTotalPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Patients</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search patients..." />
        <CreatePatient />
      </div>
      <div className="mt-8">
        <Suspense fallback={<PatientsTableSkeleton />}>
          <PatientTable query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
