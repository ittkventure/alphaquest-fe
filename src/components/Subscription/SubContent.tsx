import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import Spinner from "../Spinner";
import classNames from "classnames";
import { BitcoinIcon, CreditCardIcon, Tick2Icon } from "@/assets/icons";
import Image from "next/image";
import { CoinbaseCommerceButton } from "@iofate/react-coinbase-commerce";

interface ISubContent {
  onPayment: (withoutTrial: boolean, isYear: boolean) => void;
  isLoading: boolean;
}

const SubContent: FC<ISubContent> = ({ onPayment, isLoading }) => {
  const router = useRouter();
  const [isYear, setIsYear] = useState(false);

  const renderContent = () => {
    if (isYear)
      return (
        <div className="flex justify-center items-center max-lg:flex-col mt-[102px] max-lg:mt-12 w-full px-36 max-lg:px-0 ">
          <div className="flex max-lg:flex-col justify-center max-w-[1350px]">
            <div className="relative mx-6 max-lg:mx-0 w-[576px] max-xl:w-full">
              <div className="rounded-[100%] w-52 h-52 custom-circle-bg absolute top-[-30px] right-[-30px]"></div>
              <div className="w-full p-10 max-lg:p-5 custom-card-sub backdrop-blur-md min-h-[432px]">
                <div className="flex justify-center font-workSansSemiBold items-center border-[0.5px] border-secondary-700 text-success-600 w-[55px] py-[2px] rounded-[20px]">
                  <p>FREE</p>
                </div>

                <div className="flex items-end my-6">
                  <p className="text-[40px] leading-[35px] font-workSansBold text-primary-500">
                    $0
                  </p>
                  <p className="text-xl">/month</p>
                </div>

                <div className="flex items-end my-6">
                  <p className="text-lg mr-2 line-through">$0</p>
                  <div className="flex">
                    <p className="text-lg text-primary-500">$0</p>
                    <p className="text-lg text-primary-500">/year</p>
                  </div>
                </div>

                <div className="flex items-center font-workSansLight">
                  <CheckIcon className="h-4 w-4 text-success-500" />
                  <p className="ml-2">
                    Access to a limited projects & trends database
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-6  max-lg:mx-0 w-[576px] max-xl:w-full max-xl:mt-10 ">
              <div className="rounded-[100%] w-52 h-52 custom-circle-bg absolute top-[-30px] right-[-30px]"></div>
              <div className="w-[100%] max-lg:p-5  p-10 border-[2px] custom-card-sub-border-linear backdrop-blur-md">
                <div className="flex">
                  <div className="flex font-workSansSemiBold justify-center items-center border-[0.5px] border-secondary-700 text-success-600 w-[60px] py-[2px] rounded-[20px]">
                    <p>PRO</p>
                  </div>

                  <div className="flex font-workSansSemiBold ml-2 justify-center items-center border-[0.5px] border-secondary-700 w-[80px] py-[2px] rounded-[20px]">
                    <p>Limited</p>
                  </div>
                </div>

                <div className="flex items-end my-6">
                  <p className="text-[40px] leading-[35px] font-workSansBold text-primary-500">
                    $82.5
                  </p>
                  <p className="text-xl">/month</p>
                </div>

                <div className="flex items-end my-6">
                  <p className="text-lg mr-2 line-through">$1,188</p>
                  <div className="flex">
                    <p className="text-lg text-primary-500">$990</p>
                    <p className="text-lg text-primary-500">/year</p>
                  </div>
                </div>

                <div className="flex items-center font-workSansLight">
                  <CheckIcon className="h-4 w-4 text-success-500" />
                  <p className="ml-2">Full projects & Trends database</p>
                </div>

                <div className="flex items-center font-workSansLight">
                  <CheckIcon className="h-4 w-4 text-success-500" />
                  <p className="ml-2">Personal Watchlist</p>
                </div>

                <div className="flex items-center font-workSansLight">
                  <CheckIcon className="h-4 w-4 text-success-500" />
                  <p className="ml-2">Weekly Newsletter</p>
                </div>

                <div className="mt-[43px] gap-6 max-lg:mt-5 max-lg:w-full max-lg:justify-center flex justify-end">
                  <div className="flex flex-col gap-[2px]">
                    <button
                      disabled={isLoading}
                      onClick={() => onPayment(true, isYear)}
                      className={`py-3 px-6 gap-2 bg-primary-500 flex items-center ${
                        isLoading ? "opacity-40" : ""
                      }`}
                    >
                      {isLoading ? (
                        <div className="mr-2">
                          <Spinner />
                        </div>
                      ) : null}
                      <Image src={CreditCardIcon} alt="" height={24} />
                      <p>Pay with card</p>
                    </button>
                    <div className="bg-success-500 bg-opacity-10 flex gap-[6px] justify-center items-center">
                      <Image src={Tick2Icon} alt="" height={8} width={10} />
                      <p className="text-center text-success-500 text-sm font-workSansRegular">
                        Easier for renewals
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <CoinbaseCommerceButton checkoutId="839fd09c-07b3-4c07-9596-8e267a210501">
                <div
                  onClick={() => {
                    // payment
                    mixpanelTrack(event_name_enum.inbound, {
                      url: "/projects/trending",
                    });
                  }}
                  className="absolute bottom-[87px] left-[20%] px-6 max-h-12 max-lg:text-sm max-lg:w-full gap-1 py-[10px] border text-primary-500 border-primary-500 font-workSansRegular text-[1.125rem] flex  justify-center items-center"
                >
                  {isLoading ? (
                    <div className="mr-1">
                      <Spinner />
                    </div>
                  ) : null}
                  <Image src={BitcoinIcon} alt="" height={24} />
                  Pay with crypto
                </div>
              </CoinbaseCommerceButton>
            </div>
          </div>
        </div>
      );
    return (
      <div className="flex justify-center items-center max-lg:flex-col mt-[102px] max-lg:mt-12 w-full px-36 max-lg:px-0 ">
        <div className="flex max-lg:flex-col justify-center max-w-[1350px]">
          <div className="relative mx-6 max-lg:mx-0 w-[576px] max-xl:w-full">
            <div className="rounded-[100%] w-52 h-52 custom-circle-bg absolute top-[-30px] right-[-30px]"></div>
            <div className="w-full p-10 max-lg:p-5 custom-card-sub backdrop-blur-md min-h-[380px]">
              <div className="flex justify-center font-workSansSemiBold items-center border-[0.5px] border-secondary-700 text-success-600 w-[55px] py-[2px] rounded-[20px]">
                <p>FREE</p>
              </div>

              <div className="flex items-end my-6">
                <p className="text-[40px] leading-[35px] font-workSansBold text-primary-500">
                  $0
                </p>
                <p className="text-xl">/month</p>
              </div>

              <div className="flex items-center font-workSansLight">
                <CheckIcon className="h-4 w-4 text-success-500" />
                <p className="ml-2">
                  Access to a limited projects & trends database
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-6 max-lg:mx-0 w-[576px] max-xl:w-full max-xl:mt-10 ">
            <div className="rounded-[100%] w-52 h-52 custom-circle-bg absolute top-[-30px] right-[-30px]"></div>
            <div className="w-[100%] max-lg:p-5  p-10 border-[2px] custom-card-sub-border-linear backdrop-blur-md">
              <div className="flex">
                <div className="flex font-workSansSemiBold justify-center items-center border-[0.5px] border-secondary-700 text-success-600 w-[60px] py-[2px] rounded-[20px]">
                  <p>PRO</p>
                </div>

                <div className="flex font-workSansSemiBold ml-2 justify-center items-center border-[0.5px] border-secondary-700 w-[80px] py-[2px] rounded-[20px]">
                  <p>Limited</p>
                </div>
              </div>

              <div className="flex items-end my-6">
                <p className="text-[40px] leading-[35px] font-workSansBold text-primary-500">
                  $99
                </p>
                <p className="text-xl">/month</p>
              </div>

              <div className="flex items-center font-workSansLight">
                <CheckIcon className="h-4 w-4 text-success-500" />
                <p className="ml-2">Full projects & Trends database</p>
              </div>

              <div className="flex items-center font-workSansLight">
                <CheckIcon className="h-4 w-4 text-success-500" />
                <p className="ml-2">Personal Watchlist</p>
              </div>

              <div className="flex items-center font-workSansLight">
                <CheckIcon className="h-4 w-4 text-success-500" />
                <p className="ml-2">Weekly Newsletter</p>
              </div>

              <div className="mt-[43px] gap-6 max-lg:mt-5 max-lg:w-full max-lg:justify-center flex justify-end">
                <div className="flex flex-col gap-[2px]">
                  <button
                    disabled={isLoading}
                    onClick={() => onPayment(true, isYear)}
                    className={`py-3 px-6 gap-2 bg-primary-500 flex items-center ${
                      isLoading ? "opacity-40" : ""
                    }`}
                  >
                    {isLoading ? (
                      <div className="mr-2">
                        <Spinner />
                      </div>
                    ) : null}
                    <Image src={CreditCardIcon} alt="" height={24} />

                    <p>Pay with card</p>
                  </button>
                  <div className="bg-success-500 bg-opacity-10 flex gap-[6px] justify-center items-center">
                    <Image src={Tick2Icon} alt="" height={8} width={10} />
                    <p className="text-center text-success-500 text-sm font-workSansRegular">
                      Easier for renewals
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <CoinbaseCommerceButton checkoutId="9d11254d-cc2d-471c-ab6d-78a2db1c25ae">
              <div
                onClick={() => {
                  mixpanelTrack(event_name_enum.inbound, {
                    url: "/projects/trending",
                  });
                }}
                className="absolute bottom-[87px] left-[20%] px-6 max-h-12 max-lg:text-sm max-lg:w-full gap-1 py-[10px] border text-primary-500 border-primary-500 font-workSansRegular text-[1.125rem] flex  justify-center items-center"
              >
                {isLoading ? (
                  <div className="mr-1">
                    <Spinner />
                  </div>
                ) : null}
                <Image src={BitcoinIcon} alt="" height={24} />
                Pay with crypto
              </div>
            </CoinbaseCommerceButton>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex w-full justify-center items-center mt-[102px]">
        <div className="flex p-[2px] border border-success-600 gap-[1px]">
          <div
            className={classNames(
              "px-10 py-1 hover:bg-success-600 cursor-pointer transition-all duration-300",
              {
                "bg-success-600": !isYear,
              }
            )}
            onClick={() => setIsYear(false)}
          >
            <p>Pay monthly</p>
          </div>
          <div
            className={classNames(
              "px-10 py-1 hover:bg-success-600 cursor-pointer transition-all duration-300",
              {
                "bg-success-600": isYear,
              }
            )}
            onClick={() => setIsYear(true)}
          >
            <p>Pay Annually - get 2 months free</p>
          </div>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default SubContent;
