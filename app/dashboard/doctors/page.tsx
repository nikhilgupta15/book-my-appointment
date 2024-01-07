import Filter from "@/components/ui/common/filter";
import { lusitana } from "@/components/ui/common/fonts";
import Pagination from "@/components/ui/common/pagination";
import Search from "@/components/ui/common/search";
import { DoctorsTableSkeleton } from "@/components/ui/common/skeletons";
import { CreateDoctor } from "@/components/ui/doctors/buttons";
import { DoctorTable } from "@/components/ui/doctors/table";
import { specialities } from "@/lib/constants";
import { getDoctorsTotalPages } from "@/lib/data";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Doctors",
};

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    page?: string;
    Department?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const departmentFilter =
    searchParams?.Department === "All" ? "" : searchParams.Department || "";

  const totalPages = await getDoctorsTotalPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Doctors</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search doctors..." />
        <CreateDoctor />
      </div>
      <div className="mt-8 grid sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <Filter data={[...specialities, "ALL"]} type="Department" />
      </div>
      <div className="mt-8">
        <Suspense fallback={<DoctorsTableSkeleton />}>
          <DoctorTable
            query={query}
            currentPage={currentPage}
            departmentFilter={departmentFilter}
          />
        </Suspense>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
