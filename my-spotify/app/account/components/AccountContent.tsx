"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser"; 
import Header from "@/components/Header";
import Image from "next/image";

const AccountContent = () => {
  const router = useRouter(); 
  const { isLoading, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);


  return ( 
   <div>
     <Header className="from-bg-neutral-900">
      <div className="">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative  h-32 w-32 lg:h-44 lg:w-44 2xl:w-60 2xl:h-60">
              <Image className="object-cover rounded-full"
                fill
                src="/images/profile.png"
                alt="Playlist"
              />
            </div>
            <div className="flex flex-col gap-y-3 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm pl-1">
               Hồ sơ
              </p>
              <h1 className=" text-white xs:text-3xl sm:text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl font-bold">
                Tài khoản
              </h1>
              <div className="flex gap-2 pl-2">
                <span className="text-sm font-semibold">0 danh sách phát công khai</span>
                <span className="text-sm font-semibold">- 0 đang theo dõi</span>
              </div>
            </div>
          </div>
        </div>
      </Header>
   </div>
  );
}
 
export default AccountContent;
