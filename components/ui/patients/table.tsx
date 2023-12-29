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
import Link from "next/link";

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
              {/* {format(new Date(doctor.dateOfBirth), "dd/MM/yyyy")} */}
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
