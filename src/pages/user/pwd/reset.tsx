import ApiAuth from "@/api-client/auth";
import { BlurBgImg } from "@/assets/images";
import AQForm from "@/components/AQForm";
import AQInput from "@/components/AQForm/AQInput";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import HomeLayout from "@/layouts/HomeLayout";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { passwordRegex } from "@/utils/regex";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

const resetPasswordValidationSchema = yup.object({
  password: yup
    .string()
    .required("New password is required")
    .matches(
      passwordRegex,
      "New passwords must have at least one non alphanumeric character., Passwords must have at least one digit ('0'-'9')., Passwords must have at least one uppercase ('A'-'Z')."
    )
    .notOneOf(
      [yup.ref("currentPassword")],
      "New passwords must be different with current password"
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Confirm passwords not match with new passwords"
    ),
});

const ResetPassword = () => {
  const router = useRouter();
  const { email, token } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const { authState } = useContext(AuthContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const authApi = new ApiAuth();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      if (!email || !token) return;
      const res = await authApi.confirmResetPassword(
        email as string,
        token as string,
        data.password,
        data.confirmPassword
      );
      if (!res.succeeded) {
        setIsLoading(false);
        toast.error(
          `${res?.errors?.length > 0 ? res?.errors[0].description : null}`,
          {}
        );
      } else {
        setIsLoading(false);
        setIsSuccess(true);
      }
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
        <div className="mt-5">
          <p>You change password successfully, please login</p>
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
        validationSchemaParams={resetPasswordValidationSchema}
      >
        <AQInput
          name="password"
          labelText="New password"
          placeholder="Enter new password"
          containerClassName="mt-5"
          type={"password"}
        />

        <AQInput
          name="confirmPassword"
          labelText="Confirm password"
          placeholder="Enter confirm password"
          containerClassName="mt-5"
          type={"password"}
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
          <h1 className="font-workSansSemiBold text-[20px]">
            Change password for{" "}
            <span className="text-success-500">{email}</span>{" "}
            {isSuccess ? "successfully" : null}
          </h1>
          {renderContent()}
        </div>
      </div>
    </HomeLayout>
  );
};

export default ResetPassword;
