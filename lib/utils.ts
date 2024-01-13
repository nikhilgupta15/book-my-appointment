import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { specialities } from "./constants";
import { Speciality, Status } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTimeSlotHoursTo24HourFormat(timeSlot: string) {
  const AMorPM = timeSlot.split(" ")[1] === "AM" ? "AM" : "PM";
  const hourIn12HourFormat = parseInt(timeSlot.split(" ")[0]);

  const hoursIn24HourFormat =
    AMorPM === "AM"
      ? hourIn12HourFormat === 12
        ? 0
        : hourIn12HourFormat
      : hourIn12HourFormat === 12
      ? 12
      : hourIn12HourFormat + 12;

  return hoursIn24HourFormat;
}

export function convertTimeSlotHoursTo12HourFormat(timeSlot: string) {
  //console.log(timeSlot);
  const hoursIn12HourFormat =
    parseInt(timeSlot.split(":")[0]) > 12
      ? parseInt(timeSlot.split(":")[0]) - 12
      : parseInt(timeSlot.split(":")[0]);
  const AMorPM = parseInt(timeSlot.split(":")[0]) >= 12 ? "PM" : "AM";

  //console.log(`${hoursIn12HourFormat} ${AMorPM}`);

  return `${hoursIn12HourFormat} ${AMorPM}`;
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export function convertSpecialityStringToEnumValue(speciality: string) {
  switch (speciality) {
    case "GENERAL":
      return Speciality.GENERAL;
    case "CARDIOLOGY":
      return Speciality.CARDIOLOGY;
    case "NEUROLOGY":
      return Speciality.NEUROLOGY;
    case "ONCOLOGY":
      return Speciality.ONCOLOGY;
    case "ORTHOPEDICS":
      return Speciality.ORTHOPEDICS;
    default:
      return Speciality.GENERAL;
  }
}

export function convertSpecialityEnumToStringValue(speciality: Speciality) {
  switch (speciality) {
    case Speciality.GENERAL:
      return "GENERAL";
    case Speciality.CARDIOLOGY:
      return "CARDIOLOGY";
    case Speciality.NEUROLOGY:
      return "NEUROLOGY";
    case Speciality.ONCOLOGY:
      return "ONCOLOGY";
    case Speciality.ORTHOPEDICS:
      return "ORTHOPEDICS";
    default:
      return "GENERAL";
  }
}

export function convertStatusStringToEnumValue(status: string) {
  switch (status) {
    case "CANCELLED":
      return Status.CANCELLED;
    case "COMPLETED":
      return Status.COMPLETED;
    case "SCHEDULED":
      return Status.SCHEDULED;
    default:
      return Status.SCHEDULED;
  }
}

export function convertStatusEnumToStringValue(status: Status) {
  switch (status) {
    case Status.CANCELLED:
      return "CANCELLED";
    case Status.COMPLETED:
      return "COMPLETED";
    case Status.SCHEDULED:
      return "SCHEDULED";
    default:
      return "SCHEDULED";
  }
}

export const formatDate = (date: Date) => {
  const dateInString = date.toLocaleDateString("en-US", {
    timeZone: "IST",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return dateInString + " IST";
};

export const formatDateForAppointmentEmails = (date: Date) => {
  const dateInString = date.toLocaleDateString("en-US", {
    timeZone: "IST",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    weekday: "long",
  });

  return dateInString + " IST";
};
