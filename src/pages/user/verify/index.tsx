import { apiAuth } from "@/api-client";
import { BlurBgImg } from "@/assets/images";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import HomeLayout from "@/layouts/HomeLayout";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Verify = () => {
  const router = useRouter();
  const { vr } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const { handleLogged, authState } = useContext(AuthContext);

  useEffect(() => {
    if (vr) onConfirmMail();
  }, [vr, authState?.access_token]);

  const onConfirmMail = async () => {
    try {
      setIsLoading(true);
      console.log(vr);
      await apiAuth.confirmEmail(
        vr ? vr.toString() : "",
        authState?.access_token ?? ""
      );
      setIsLoading(false);
    } catch (error: any) {
      toast.error(
        `${error?.response?.data?.error_description ?? error?.message}`,
        {}
      );
    }
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
          <h1
            className={`text-center ${
              isLoading ? "text-blue-400" : "text-success-500"
            } font-workSansBold text-3xl`}
          >
            {isLoading
              ? "Your Account is verifying, please wait..."
              : "Your account has been verified"}
          </h1>

          <div className="flex justify-center mt-7">
            {isLoading ? (
              <Spinner />
            ) : (
              <CheckBadgeIcon className="h-[100px] w-[100px] text-success-500" />
            )}
          </div>
          {!isLoading ? (
            <a
              href="/projects"
              type="button"
              className="w-full border border-primary-500 text-primary-500 hover:border-success-600 hover:text-success-500 flex justify-center items-center py-3 mt-5"
            >
              Go Dashboard
            </a>
          ) : null}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Verify;
