import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getDoctorsByDepartment } from "@/lib/data";
import { Button } from "../button";
import Link from "next/link";

export async function DoctorsByDepartmentsCards() {
  const doctorsByDepartment = await getDoctorsByDepartment();

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {doctorsByDepartment.map(([key, value], index) => (
          <CarouselItem
            key={key}
            className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4"
          >
            <div className="p-1">
              <Card>
                <CardContent className="aspect-square p-4">
                  <div className="font-semibold text-center">{key}</div>
                  <div className="mt-8 text-6xl font-semibold text-center self-end">
                    {value}
                  </div>
                  <div className="mt-8 flex justify-center items-center">
                    <Link href={`/dashboard/doctors?Department=${key}`}>
                      <Button size={"sm"}>View All Doctors</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
