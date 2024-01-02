import { getPatientsByDepartment } from "@/lib/data";
import { lusitana } from "../../components/ui/common/fonts";
import { Suspense } from "react";
import { PatientsByDepartmentsCards } from "@/components/ui/dashboard/patient-by-department-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoctorsByDepartmentsCards } from "@/components/ui/dashboard/doctor-by-department-cards";
import { AppointmentsByStatusCards } from "@/components/ui/dashboard/appointments-by-status-cards";

export default async function Dashboard() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-4xl`}>
        Dashboard
      </h1>
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div> */}
      <Tabs defaultValue="patients" className="w-full">
        <TabsList>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="doctors">Doctors</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="patients">
          <div>
            <p className={`${lusitana.className} mt-4 mb-4 font-semibold`}>
              Get a comprehensive overview of patients with upcoming
              appointments organized by department.
            </p>
            <PatientsByDepartmentsCards />
          </div>
        </TabsContent>
        <TabsContent value="doctors">
          <div>
            <p className={`${lusitana.className} mt-4 mb-4 font-semibold`}>
              Get a comprehensive overview of doctors organized by department.
            </p>
            <DoctorsByDepartmentsCards />
          </div>
        </TabsContent>
        <TabsContent value="appointments">
          <div>
            <p className={`${lusitana.className} mt-4 mb-4 font-semibold`}>
              Get a comprehensive overview of appointments organized by status.
            </p>
            <AppointmentsByStatusCards />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
