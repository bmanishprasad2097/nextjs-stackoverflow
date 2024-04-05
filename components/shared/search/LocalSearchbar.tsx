"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CustomInput {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeHolder: string;
  otherClasses: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeHolder,
  otherClasses,
}: CustomInput) => {
  // Navigation Hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  
  return (
    <>
      <div
        className={`background-light800_darkgradient flex min-h-[56px] grow  items-center gap-4 rounded-[10px] px-4 ${otherClasses} 
        
        `}
        // {${
        //   iconPosition === "right" && "flex-row-reverse"
        // }}
      >
        {iconPosition === "left" && (
          <Image
            src={imgSrc}
            alt="seacrhIcon"
            width={28}
            height={28}
            className="cursor-pointer"
          />
        )}
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeHolder}
          className="text-dark400_light700 paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        />
        {iconPosition === "right" && (
          <Image
            src="/assets/icons/search.svg"
            alt="seacrhIcon"
            width={28}
            height={28}
            className="cursor-pointer"
          />
        )}
      </div>
    </>
  );
};

export default LocalSearchbar;