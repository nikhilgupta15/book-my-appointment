import { deleteAppointment, updateAppointmentStatus } from "@/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../button";
import { Check, Ban } from "lucide-react";
import { Status } from "@prisma/client";

export function CreateAppointment() {
  return (
    <Link
      href="/dashboard/appointments/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Schedule Appointment</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateAppointment({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/appointments/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteAppointment({ id }: { id: string }) {
  return (
    <form action={deleteAppointment.bind(null, id)}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function MarkAsCompleteAppointment({ id }: { id: string }) {
  return (
    <Button
      type="button"
      className="bg-green-500 hover:bg-green-600"
      onClick={() => updateAppointmentStatus(id, Status.COMPLETED)}
    >
      <Check className="mr-2 h-4 w-4" /> Mark as Complete
    </Button>
  );
}

export function CancelAppointment({ id }: { id: string }) {
  return (
    <Button
      type="button"
      className="bg-red-500 hover:bg-red-600"
      onClick={() => updateAppointmentStatus(id, Status.CANCELLED)}
    >
      <Ban className="mr-2 h-4 w-4" /> Cancel
    </Button>
  );
}
