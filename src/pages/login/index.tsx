import { EmptyWallet } from "@/assets/icons";
import { BlurBgImg, HomeBgImg } from "@/assets/images";
import AQForm from "@/components/AQForm";
import AQInput from "@/components/AQForm/AQInput";
import HomeLayout from "@/layouts/HomeLayout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login = () => {
  const onSubmit = (data: any) => console.log(data);

  return (
    <HomeLayout hiddenFooter>
      <div className="w-[100vw] mt-8 flex justify-center items-center relative">
        <Image
          src={BlurBgImg}
          width={1360}
          height={1198}
          alt="home-bg"
          className="absolute z-[2] top-[-300px]  max-lg:top-[0px] object-fill max-md:hidden"
        />
        <div className="w-[520px] bg-dark-800 max-md:bg-transparent max-md:p-6 max-lg:p-8 p-10 z-[100]">
          <h1 className="font-workSansSemiBold text-[32px]">Log in</h1>
          <AQForm defaultValues={{}} onSubmit={onSubmit}>
            <div className="mt-5">
              <AQInput
                name="email"
                labelText="Email address"
                placeholder="Enter email"
              />
            </div>
            <div className="mt-5">
              <AQInput
                name="password"
                labelText="Password"
                type="password"
                placeholder="Enter password"
              />
            </div>

            <button className="w-full bg-success-500 flex justify-center items-center py-3 mt-5">
              <p>Log in</p>
            </button>

            <Link href={"#"}>
              <p className="text-success-500 text-[16px] mt-5">
                Forgot password?
              </p>
            </Link>

            <button className="w-full border border-primary-500 text-primary-500 flex justify-center items-center py-3 mt-5">
              <Image src={EmptyWallet} className="h-6 w-6" alt="wallet" />
              <p className="ml-2">Log in with Wallet</p>
            </button>

            <p className="text-[16px] mt-5 text-center">
              No account?
              <span className="text-success-500"> Sign up for free</span>
            </p>
          </AQForm>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Login;
