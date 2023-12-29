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

export async function PatientTable() {
  const patients = await getPatients();

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
        {patients.map((patient) => (
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
                href={`/dashboard/patients`}
                // href={`/dashboard/patients/${patient.id}/appointments`}
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
