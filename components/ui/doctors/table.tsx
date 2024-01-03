import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDoctors } from "@/lib/data";
import Link from "next/link";
import { DeleteDoctor, UpdateDoctor } from "./buttons";
import { lusitana } from "../common/fonts";

export async function DoctorTable({
  query,
  currentPage,
  departmentFilter,
}: {
  query: string;
  currentPage: number;
  departmentFilter: string;
}) {
  const doctors = await getDoctors(query, currentPage, departmentFilter);

  return (
    <Table>
      {/* <TableCaption>A list of doctors</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Speciality</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Appointments</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.length > 0 &&
          doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{doctor.name}</TableCell>
              <TableCell>{doctor.speciality}</TableCell>
              <TableCell>{doctor.email}</TableCell>
              <TableCell>{doctor.phone}</TableCell>
              <TableCell>{doctor.address}</TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/doctors/${doctor.id}/appointments`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Appointments
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex justify-start gap-2">
                  <UpdateDoctor id={doctor.id} />
                  <DeleteDoctor id={doctor.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        {doctors.length === 0 && (
          <TableRow>
            <TableCell colSpan={7}>
              <div className="flex w-full items-center justify-center">
                <h1 className={`${lusitana.className} text-xl`}>
                  No Doctors Found
                </h1>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
