import ApiAuth from "@/api-client/auth";
import { EmptyWallet } from "@/assets/icons";
import { BlurBgImg } from "@/assets/images";
import AQForm from "@/components/AQForm";
import AQInput from "@/components/AQForm/AQInput";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import HomeLayout from "@/layouts/HomeLayout";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

const forgotPasswordValidationSchema = yup.object({
  email: yup.string().email().required("Required"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const { authState } = useContext(AuthContext);
  const authApi = new ApiAuth();

  useEffect(() => {
    if (authState?.access_token) {
      mixpanelTrack(event_name_enum.inbound, { url: "/account-details" });

      router.push("/account-details");
    }
  }, [authState?.access_token]);

  useEffect(() => {
    if (authState) router.back();
  }, [authState, router]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      let res = await authApi.resetPassword(data.email);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error: any) {
      toast.error(
        `${error?.response?.data?.error_description ?? error?.message}`,
        {}
      );
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isSuccess)
      return (
        <div>
          <p>
            Check your email for a link to reset your password. If it doesn’t
            appear within a few minutes, check your spam folder.
          </p>
          <button
            onClick={() => {
              mixpanelTrack(event_name_enum.inbound, { url: "/login" });

              router.push("/login");
            }}
            type="button"
            className={`w-full flex justify-center items-center py-3 mt-5 bg-success-600 hover:bg-emerald-700`}
          >
            <p>Return to login</p>
          </button>
        </div>
      );
    return (
      <AQForm
        defaultValues={{}}
        onSubmit={onSubmit}
        validationSchemaParams={forgotPasswordValidationSchema}
      >
        <AQInput
          name="email"
          labelText="Email"
          placeholder="Enter email"
          containerClassName="mt-5"
        />

        <button
          type="submit"
          className={`w-full ${
            isLoading ? "opacity-70" : "opacity-100"
          } flex justify-center items-center py-3 mt-5 bg-success-500 hover:bg-success-600`}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : null}
          <p>Reset password</p>
        </button>
      </AQForm>
    );
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
          <h1 className="font-workSansSemiBold text-[32px]">
            {isSuccess ? "Reset your password" : "Forgot password"}
          </h1>
          {renderContent()}
        </div>
      </div>
    </HomeLayout>
  );
};

export default ForgotPassword;
