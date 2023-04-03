import React, { FC, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import HomeLayout from "@/layouts/HomeLayout";
import { NextPage } from "next";
import { apiPayment } from "@/api-client";
import { AuthContext } from "@/contexts/useAuthContext";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { BlurBgImg } from "@/assets/images";
import { toast } from "react-toastify";

interface IPaymentProcess {
  idPayment: string;
}

const PaymentProcess: FC<IPaymentProcess> = ({ idPayment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { authState, getAccountExtendDetails } = useContext(AuthContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getData(intervalId);
    }, 5000);
    getData(intervalId);

    return () => clearInterval(intervalId);
  }, [idPayment, authState?.access_token]);

  const getData = async (clearId?: NodeJS.Timer) => {
    setIsLoading(true);
    try {
      if (idPayment && authState?.access_token) {
        const data = await apiPayment.checkPaymentOrderStatus(
          idPayment,
          authState?.access_token
        );

        if (data === true) {
          clearInterval(clearId);
          getAccountExtendDetails();
          setIsLoading(false);
        }
      }
    } catch (error) {
      toast.error("Error when payment, please try again!");
    }
  };

  return (
    <HomeLayout>
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
              ? "Payment processing, please wait..."
              : "Congratulations on becoming a premium member"}
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
              href="/"
              type="button"
              className="w-full border border-primary-500 text-primary-500 hover:border-success-600 hover:text-success-500 flex justify-center items-center py-3 mt-5"
            >
              Go Home
            </a>
          ) : null}
        </div>
      </div>
    </HomeLayout>
  );
};

export default PaymentProcess;

export async function getServerSideProps({ params }: any) {
  return {
    props: {
      idPayment: params.idPayment,
    }, // will be passed to the page component as props
  };
}
