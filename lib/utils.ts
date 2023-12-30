import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  console.log(timeSlot);
  const hoursIn12HourFormat =
    parseInt(timeSlot.split(":")[0]) > 12
      ? parseInt(timeSlot.split(":")[0]) - 12
      : parseInt(timeSlot.split(":")[0]);
  const AMorPM = parseInt(timeSlot.split(":")[0]) >= 12 ? "PM" : "AM";

  //console.log(`${hoursIn12HourFormat} ${AMorPM}`);

  return `${hoursIn12HourFormat} ${AMorPM}`;
}
