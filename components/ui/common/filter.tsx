"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Label } from "../label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter({
  data,
  type,
}: {
  data: string[];
  type: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(type, value);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Label htmlFor={type} className="text-[16px]">
        {type}
      </Label>
      <div className="mt-4">
        <Select
          onValueChange={handleFilterChange}
          defaultValue={searchParams.get(type)?.toString()}
        >
          <SelectTrigger id={type}>
            <SelectValue placeholder={`Select a ${type}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a {type}</SelectLabel>
              {data.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
