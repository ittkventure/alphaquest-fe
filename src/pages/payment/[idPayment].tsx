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
            className={`text-center ${isLoading ? "text-blue-400" : "text-success-500"
              } font-workSansBold text-3xl`}
          >
            {isLoading
              ? "Payment processing, please wait..."
              : "You're Now a Pro Member! Here's What To Do Next"}
          </h1>

          {!isLoading &&
            <div className="mt-6">

              <div className="flex  items-center">
                <div className="mt-2 w-6 flex  items-center bg-success-500 rounded-full">
                  <p className="text-[#171B28] ml-2"> 1</p>
                </div>
                <p className="text-[#bec1c2] mt-2 ml-2 ">Verify your email: We've sent an email to your inbox.</p>
              </div>

              <div className="flex  items-center my-4">
                <div className="mt-2 w-6 flex  items-center bg-success-500 rounded-full">
                  <p className="text-[#171B28] ml-2"> 2</p>
                </div>
                <p className="text-[#bec1c2] mt-2 ml-2 "> <a href="https://t.me/+0d8skT2bV1YxNTU1" className=" font-extrabold text-success-500">Click here </a> to join our private telegram channel.</p>
              </div>

              <div className="flex  items-center">
                <div className="mt-2 w-6 flex  items-center bg-success-500 rounded-full">
                  <p className="text-[#171B28] ml-2"> 3</p>
                </div>
                <p className="text-[#bec1c2] mt-2 ml-2 "> Start trying our app by clicking the button below.</p>
              </div>


            </div>


          }

          <div className="flex justify-center mt-7">
            {isLoading ? (
              <Spinner />
            ) : (
              <></>
            )}
          </div>
          {!isLoading ? (
            <a
              href="/projects/trending"
              type="button"
              className="w-full border border-primary-500 text-primary-500 hover:border-success-600 hover:text-success-500 flex justify-center items-center py-3 mt-5"
            >
              Access Pro Dashboard
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
