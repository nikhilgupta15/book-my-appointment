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
import { getPatients } from "@/lib/data";
import { format } from "date-fns";
import Link from "next/link";
import { DeletePatient, UpdatePatient } from "./buttons";
import { lusitana } from "../common/fonts";

export async function PatientTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const patients = await getPatients(query, currentPage);

  return (
    <Table>
      {/* <TableCaption>A list of doctors</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Date Of Birth</TableHead>
          <TableHead>Appointments</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.length > 0 &&
          patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.address}</TableCell>
              <TableCell>
                {format(new Date(patient.birthday), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/patients/${patient.id}/appointments`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Appointments
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex justify-start gap-2">
                  <UpdatePatient id={patient.id} />
                  <DeletePatient id={patient.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        {patients.length === 0 && (
          <TableRow>
            <TableCell colSpan={7}>
              <div className="flex w-full items-center justify-center">
                <h1 className={`${lusitana.className} text-xl`}>
                  No Patients Found
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
