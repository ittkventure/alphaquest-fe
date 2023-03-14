import { EmptyWallet } from "@/assets/icons";
import { BlurBgImg, HomeBgImg } from "@/assets/images";
import AQForm from "@/components/AQForm";
import AQCheckbox from "@/components/AQForm/AQCheckbox";
import AQInput from "@/components/AQForm/AQInput";
import HomeLayout from "@/layouts/HomeLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SignUp = () => {
  const router = useRouter();

  const [checkedTerms, setCheckedTerms] = useState(false);
  const [checkedSub, setCheckedSub] = useState(false);

  const onSubmit = (data: any) => console.log(data);

  const onGoLogin = () => {
    router.push("/login");
  };

  return (
    <HomeLayout hiddenFooter>
      <div className="w-[100vw] mt-16 max-md:mt-6 flex justify-center items-center relative">
        <Image
          src={BlurBgImg}
          width={1360}
          height={1198}
          alt="home-bg"
          className="absolute z-[2] top-[-300px]  max-lg:top-[0px] object-fill max-md:hidden"
        />
        <div className="w-[520px] bg-dark-800 max-md:bg-transparent max-md:p-6 max-lg:p-8 p-10 z-[100]">
          <h1 className="font-workSansSemiBold text-[32px]">Sign up</h1>
          <AQForm defaultValues={{}} onSubmit={onSubmit}>
            <AQInput
              name="email"
              labelText="Email address"
              placeholder="Enter email"
              containerClassName="mt-5"
            />

            <AQCheckbox
              containerClassName="mt-5"
              name="terms"
              checked={checkedSub}
              onChange={() => setCheckedSub(!checkedSub)}
              content={
                <p className="ml-2">
                  I agree to the{" "}
                  <span className="underline">Terms & Conditions</span> and{" "}
                  <span className="underline">Privacy Policy</span>
                </p>
              }
            />

            <AQCheckbox
              containerClassName="mt-5"
              name="terms"
              checked={checkedTerms}
              onChange={() => setCheckedTerms(!checkedTerms)}
              content={
                <p className="ml-2">
                  Subscribe to receive company news and product updates from
                  AlphaQuest. You may unsubscribe at any time.
                </p>
              }
            />

            <button
              onClick={onGoLogin}
              className="w-full bg-success-500 flex justify-center items-center py-3 mt-5"
            >
              <p>Sign up</p>
            </button>

            <button className="w-full border border-primary-500 text-primary-500 flex justify-center items-center py-3 mt-5">
              <Image src={EmptyWallet} className="h-6 w-6" alt="wallet" />
              <p className="ml-2">Sign up with Wallet</p>
            </button>

            <p className="text-[16px] mt-5 text-center">
              Already have an account?
              <span
                className="text-success-500 cursor-pointer"
                onClick={onGoLogin}
              >
                {" "}
                Sign in
              </span>
            </p>
          </AQForm>
        </div>
      </div>
    </HomeLayout>
  );
};

export default SignUp;
