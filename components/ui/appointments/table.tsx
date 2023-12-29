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
import { getAppointments } from "@/lib/data";
import { format } from "date-fns";
import { DeleteAppointment, UpdateAppointment } from "./buttons";

export async function AppointmentTable() {
  const appointments = await getAppointments();

  return (
    <Table>
      {/* <TableCaption>A list of doctors</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Appointment Id</TableHead>
          <TableHead>Patient Name</TableHead>
          <TableHead>Doctor Name</TableHead>
          <TableHead>Date and Time</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.id}</TableCell>
            <TableCell>{appointment.patientName}</TableCell>
            <TableCell>{appointment.doctorName}</TableCell>
            <TableCell>
              {format(new Date(appointment.date), "dd/MM/yyyy HH:mm")}
            </TableCell>
            <TableCell>
              <div className="flex justify-start gap-2">
                <UpdateAppointment id={appointment.id} />
                <DeleteAppointment id={appointment.id} />
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