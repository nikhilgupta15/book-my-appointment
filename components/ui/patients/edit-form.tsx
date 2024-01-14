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
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Patient } from "@prisma/client";
import { updatePatient } from "@/lib/actions";
import { toast } from "../use-toast";
import { useRef } from "react";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, {
      message: "Name must be at least 1 characters.",
    }),
  phone: z
    .string({
      required_error: "Phone number is required.",
    })
    .length(10, {
      message: "Phone number must be 10 digits.",
    }),
  address: z
    .string({
      required_error: "Address is required.",
    })
    .min(1, {
      message: "Address must be at least 1 characters.",
    }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Invalid email address.",
    }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
});

export function EditPatientForm({
  patient,
  isEditable,
}: {
  patient: Patient;
  isEditable: boolean;
}) {
  const inputDateRef = useRef<HTMLInputElement>(null); // This is a reference to the input element which sets the date of birth.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: patient.name ? patient.name : "",
      phone: patient.phone ? patient.phone : "",
      address: patient.address ? patient.address : "",
      email: patient.email ? patient.email : "",
      dateOfBirth: patient.birthday ? new Date(patient.birthday) : new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const feedback = await updatePatient(patient.id, values);

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
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          disabled={!isEditable}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          disabled={!isEditable}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="XXXXXXXXXX" {...field} />
              </FormControl>
              <FormDescription>
                This is your primary contact number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          disabled={!isEditable}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your primary email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          disabled={!isEditable}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Modern Academy, Lucknow...." {...field} />
              </FormControl>
              <FormDescription>This is your primary address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of Birth*/}
        <FormField
          control={form.control}
          name="dateOfBirth"
          disabled={!isEditable}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  ref={inputDateRef}
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                  defaultValue={field.value.toISOString().split("T")[0]}
                  disabled={!isEditable}
                />
              </FormControl>
              <FormDescription>This is your date of birth</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isEditable && (
          <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
