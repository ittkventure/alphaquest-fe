import ApiAuth from "@/api-client/auth";
import { EmptyWallet } from "@/assets/icons";
import { BlurBgImg } from "@/assets/images";
import AQForm from "@/components/AQForm";
import AQInput from "@/components/AQForm/AQInput";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import HomeLayout from "@/layouts/HomeLayout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import * as yup from "yup";

const loginValidationSchema = yup.object({
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { handleLogged, authState } = useContext(AuthContext);
  const authApi = new ApiAuth();

  useEffect(() => {
    if (authState) router.back();
  }, [authState, router]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      let res = await authApi.login({
        client_id: "AlphaQuest_App",
        grant_type: "password",
        username: data.username,
        password: data.password,
        scope: "AlphaQuest",
      });
      handleLogged(res);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(
        `${error?.response?.data?.error_description ?? error?.message}`,
        {}
      );
      setIsLoading(false);
    }
  };

  const onGoSignUp = () => {
    router.push("/sign-up");
  };

  const onGoAccountDetails = () => {
    router.push("/account-details");
  };

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
          <AQForm
            defaultValues={{}}
            onSubmit={onSubmit}
            validationSchemaParams={loginValidationSchema}
          >
            <AQInput
              name="username"
              labelText="Username"
              placeholder="Enter username"
              containerClassName="mt-5"
            />
            <AQInput
              name="password"
              labelText="Password"
              type="password"
              placeholder="Enter password"
              containerClassName="mt-5"
            />

            <button
              type="submit"
              className={`w-full ${
                isLoading ? "opacity-70" : "opacity-100"
              } flex justify-center items-center py-3 mt-5 bg-success-500`}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : null}
              <p>Log in</p>
            </button>

            <Link href={"#"}>
              <p className="text-success-500 text-[16px] mt-5">
                Forgot password?
              </p>
            </Link>

            {/* <button
              type="button"
              className="w-full border border-primary-500 text-primary-500 flex justify-center items-center py-3 mt-5"
            >
              <Image src={EmptyWallet} className="h-6 w-6" alt="wallet" />
              <p className="ml-2">Log in with Wallet</p>
            </button> */}

            <p className="text-[16px] mt-5 text-center">
              No account?
              <span
                className="text-success-500 cursor-pointer"
                onClick={onGoSignUp}
              >
                {" "}
                Sign up for free
              </span>
            </p>
          </AQForm>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Login;
