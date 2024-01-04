import { GlobeAltIcon, HeartIcon } from "@heroicons/react/24/solid";
import { lusitana } from "../common/fonts";
import Image from "next/image";

export default function WebsiteLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center gap-4 leading-none text-white`}
    >
      <Image
        src={"/website-logo.png"}
        alt="website-logo"
        height={50}
        width={50}
        className="hidden md:block rounded-md"
      />
      <p className="text-[24px] md:text-[30px] h-full w-full">
        Book My Appointment
      </p>
    </div>
  );
}
