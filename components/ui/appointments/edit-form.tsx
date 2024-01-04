"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Appointment, Doctor, Patient, Status } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateAppointment } from "@/lib/actions";
import { CancelAppointment, MarkAsCompleteAppointment } from "./buttons";
import { Input } from "../input";
import { useRef } from "react";
import { timeSlots } from "@/lib/constants";
import { parse } from "path";
import {
  convertTimeSlotHoursTo12HourFormat,
  convertTimeSlotHoursTo24HourFormat,
} from "@/lib/utils";
import { toast } from "../use-toast";

const formSchema = z.object({
  patientId: z.string({
    required_error: "Patient Name is required",
  }),
  doctorId: z.string({
    required_error: "Doctor Name is required",
  }),
  appointmentDate: z.date({
    required_error: "Appointment Date is required",
  }),
  description: z.string(),
  timeSlot: z.string({
    required_error: "Time Slot is required",
  }),
});

export function EditAppointmentForm({
  patients,
  doctors,
  appointment,
}: {
  patients: Patient[];
  doctors: Doctor[];
  appointment: Appointment;
}) {
  const inputDateRef = useRef<HTMLInputElement>(null); // This is a reference to the input element which sets the appointment date.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      description: appointment.description ? appointment.description : "",
      appointmentDate: appointment.date,
      timeSlot: convertTimeSlotHoursTo12HourFormat(
        appointment.date
          .toLocaleString("en-GB", { timeZone: "IST" })
          .split(" ")[1]
      ),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const patientName = patients.find(
      (patient) => patient.id === values.patientId
    )?.name;
    const doctorName = doctors.find(
      (doctor) => doctor.id === values.doctorId
    )?.name;

    const hoursIn24HourFormat = convertTimeSlotHoursTo24HourFormat(
      values.timeSlot
    );

    const appointmentData = {
      ...values,
      patientName: patientName ? patientName : "",
      doctorName: doctorName ? doctorName : "",
      appointmentDate: inputDateRef.current
        ? new Date(
            `${inputDateRef.current?.value} ${hoursIn24HourFormat}:00:00`
          )
        : new Date(),
    };

    console.log(appointmentData);

    const feedback = await updateAppointment(appointment.id, appointmentData);

    if (feedback && feedback.error) {
      toast({
        title: feedback.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Patient */}
        <FormField
          control={form.control}
          name="patientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Patient</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a patient</SelectLabel>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Doctor */}
        <FormField
          control={form.control}
          name="doctorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Doctor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a doctor</SelectLabel>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell in brief about your problem"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can mention about your symptoms, issues etc which can help
                the doctor to understand your problem better.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Appointment Date */}
        <FormField
          control={form.control}
          name="appointmentDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  defaultValue={field.value.toISOString().split("T")[0]}
                  ref={inputDateRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time Slot */}
        <FormField
          control={form.control}
          name="timeSlot"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose a time slot</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a time slot</SelectLabel>
                    {timeSlots.map((timeSlot) => (
                      <SelectItem key={timeSlot} value={timeSlot}>
                        {timeSlot}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-start items-center space-x-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
            Submit
          </Button>
          <MarkAsCompleteAppointment id={appointment.id} />
          <CancelAppointment id={appointment.id} />
        </div>
      </form>
    </Form>
  );
}
