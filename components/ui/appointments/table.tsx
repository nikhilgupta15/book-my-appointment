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
import { Badge } from "@/components/ui/badge";
import { Status } from "@prisma/client";
import { lusitana } from "../common/fonts";
import { formatDate } from "@/lib/utils";

export async function AppointmentTable({
  query,
  currentPage,
  departmentFilter,
  statusFilter,
}: {
  query: string;
  currentPage: number;
  departmentFilter: string;
  statusFilter: string;
}) {
  const appointments = await getAppointments(
    query,
    currentPage,
    departmentFilter,
    statusFilter
  );

  ``;
  return (
    <Table>
      {/* <TableCaption>A list of doctors</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>Appointment Id</TableHead>
          <TableHead>Patient Name</TableHead>
          <TableHead>Doctor Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Date and Time</TableHead>
          {/* <TableHead>Description</TableHead> */}
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.length > 0 &&
          appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.id}</TableCell>
              <TableCell>{appointment.patientName}</TableCell>
              <TableCell>{appointment.doctorName}</TableCell>
              <TableCell>{appointment.doctor.speciality}</TableCell>
              <TableCell>{formatDate(appointment.date)}</TableCell>
              {/* <TableCell>{appointment.description}</TableCell> */}
              <TableCell>
                <Badge className={setBadgeColor(appointment.status)}>
                  {appointment.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex justify-start gap-2">
                  {appointment.status === Status.SCHEDULED ? (
                    <UpdateAppointment id={appointment.id} />
                  ) : null}
                  <DeleteAppointment id={appointment.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        {appointments.length === 0 && (
          <TableRow>
            <TableCell colSpan={7}>
              <div className="flex w-full items-center justify-center">
                <h1 className={`${lusitana.className} text-xl`}>
                  No Appointments Found
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

function setBadgeColor(status: Status) {
  switch (status) {
    case Status.SCHEDULED:
      return "bg-yellow-500 hover:bg-yellow-600";
    case Status.COMPLETED:
      return "bg-green-500 hover:bg-green-600";
    case Status.CANCELLED:
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
}
