import { lusitana } from "@/components/ui/common/fonts";
import Search from "@/components/ui/common/search";
import { CreateDoctor } from "@/components/ui/doctors/buttons";
import { DoctorTable } from "@/components/ui/doctors/table";
import React, { Suspense } from "react";

export default function DoctorsPage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Doctors</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search doctors..." />
        <CreateDoctor />
      </div>
      <div className="mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <DoctorTable />
        </Suspense>
      </div>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
