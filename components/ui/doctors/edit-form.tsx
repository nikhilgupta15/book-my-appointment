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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateDoctor } from "@/lib/actions";
import { Doctor } from "@prisma/client";
import { specialities } from "@/lib/constants";
import { toast } from "../use-toast";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, {
      message: "Name must be at least 1 characters.",
    }),
  speciality: z.string({
    required_error: "Department is required.",
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
});

export function EditDoctorForm({
  doctor,
  isEditable,
}: {
  doctor: Doctor;
  isEditable: boolean;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: doctor.name ? doctor.name : "",
      phone: doctor.phone ? doctor.phone : "",
      address: doctor.address ? doctor.address : "",
      email: doctor.email ? doctor.email : "",
      speciality: doctor.speciality ? doctor.speciality : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const feedback = await updateDoctor(doctor.id, values);

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
              <FormDescription>
                This is the address of your clinic
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="speciality"
          disabled={!isEditable}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!isEditable}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" {...field} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Department</SelectLabel>
                    {specialities.map((speciality) => (
                      <SelectItem
                        key={speciality}
                        value={speciality}
                        disabled={!isEditable}
                      >
                        {speciality}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription>
                This is the department to which you belong to
              </FormDescription>
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
