import { apiAuth } from "@/api-client";
import { EmptyWallet } from "@/assets/icons";
import { BlurBgImg, HomeBgImg } from "@/assets/images";
import AQForm from "@/components/AQForm";
import AQCheckbox from "@/components/AQForm/AQCheckbox";
import AQInput from "@/components/AQForm/AQInput";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import HomeLayout from "@/layouts/HomeLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z])/i;

const signUpValidationSchema = yup.object({
  userName: yup.string().required("Username is required"),
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Passwords must have at least one non alphanumeric character., Passwords must have at least one digit ('0'-'9')., Passwords must have at least one uppercase ('A'-'Z')."
    ),
  terms: yup.string(),
  sub: yup.string(),
});

const SignUp = () => {
  const router = useRouter();

  const [checkedTerms, setCheckedTerms] = useState(false);
  const [checkedSub, setCheckedSub] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { handleLogged, authState } = useContext(AuthContext);

  useEffect(() => {
    setError("");
  }, [checkedTerms, checkedSub]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    if (!checkedTerms || !checkedSub) setError("Please confirm our terms");
    try {
      await apiAuth.signUp({
        userName: data.userName,
        emailAddress: data.email,
        password: data.password,
        appName: "AlphaQuest",
      });

      let res = await apiAuth.login({
        client_id: "AlphaQuest_App",
        grant_type: "password",
        username: data.userName,
        password: data.password,
        scope: "AlphaQuest",
      });
      router.push("/price");

      handleLogged(res);
    } catch (error: any) {
      toast.error(
        `${error?.response?.data?.error?.message ?? error?.message}`,
        {}
      );
      setIsLoading(false);
    }
  };

  const onGoLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (authState?.access_token && !isLoading) router.push("/");
  }, [authState?.access_token]);

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
          <AQForm
            defaultValues={{}}
            onSubmit={onSubmit}
            validationSchemaParams={signUpValidationSchema}
          >
            <AQInput
              name="userName"
              labelText="Username"
              placeholder="Enter username"
              containerClassName="mt-5"
            />
            <AQInput
              name="email"
              labelText="Email address"
              placeholder="Enter email"
              containerClassName="mt-5"
            />
            <AQInput
              name="password"
              labelText="Password"
              placeholder="Enter password"
              containerClassName="mt-5"
              type="password"
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
              name="sub"
              checked={checkedTerms}
              onChange={() => setCheckedTerms(!checkedTerms)}
              content={
                <p className="ml-2">
                  Subscribe to receive company news and product updates from
                  AlphaQuest. You may unsubscribe at any time.
                </p>
              }
            />
            {error ? (
              <button type="button">
                <p className="text-sm text-primary-500">{error}</p>
              </button>
            ) : (
              <button />
            )}
            <button
              type="submit"
              className={`w-full ${
                isLoading ? "opacity-70" : "opacity-100"
              } flex justify-center items-center py-3 mt-5 bg-success-500`}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : null}
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
