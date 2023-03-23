import Image from "next/image";
import Link from "next/link";
import React from "react";

const AQAvatar = () => {
  return (
    <Link href={"/account-details"}>
      <div className="ml-6 max-lg:ml-3 mr-6 flex items-center">
        <div className="w-10 h-10 rounded-[50%] border border-white overflow-hidden relative ">
          <Image
            src={
              "https://i.pinimg.com/736x/0c/01/62/0c01627379bbe834af8150c606d65f1b.jpg"
            }
            width={40}
            height={40}
            alt="avt"
            className="object-cover"
          />
        </div>
        <p className="pl-2 text-[16px] max-lg:hidden">Melinda</p>
      </div>
    </Link>
  );
};

export default AQAvatar;
