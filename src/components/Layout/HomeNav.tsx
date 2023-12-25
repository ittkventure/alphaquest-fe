import { UserPayType } from "@/api-client/types/AuthType";
import { CrownIcon } from "@/assets/icons";
import { LogoWithText } from "@/assets/images";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext, useState } from "react";
import AQAvatar from "../AQAvatar";

interface HomeNavTypes {
  isApp?: boolean;
}

const HomeNav: FC<HomeNavTypes> = ({ isApp }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const { setTypePaymentAction, authState, accountExtendDetail } =
    useContext(AuthContext);

  const onGoLogin = () => {
    setShowMenu(false);
    mixpanelTrack(event_name_enum.inbound, { url: "/login" });
    router.push("/login");
  };

  const onGoSignup = () => {
    setShowMenu(false);
    mixpanelTrack(event_name_enum.inbound, { url: "/sign-up" });
    router.push("/sign-up");
  };

  const onGoHome = () => {
    setShowMenu(false);
    {
      mixpanelTrack(event_name_enum.inbound, {
        url: isApp ? "/projects" : "/",
      });

      isApp ? router.push("/projects") : router.push("/");
    }
  };

  const onClickPaymentTrial = () => {
    setShowMenu(false);
    mixpanelTrack(event_name_enum.upgrade_to_pro, {
      url: router.pathname,
    });
    if (authState) {
      mixpanelTrack(event_name_enum.inbound, { url: "/pricing" });

      setTypePaymentAction ? setTypePaymentAction(TypePayment.TRIAL) : null;
      router.push("/pricing?action=open");
    } else {
      mixpanelTrack(event_name_enum.inbound, { url: "/sign-up" });

      setTypePaymentAction ? setTypePaymentAction(TypePayment.TRIAL) : null;
      router.push("/sign-up");
    }
  };

  const renderMobile = () => {
    return (
      <div className="hidden max-lg:block">
        <ul className="flex items-center justify-end text-sm max-lg:pb-2">
          {/* <li>
            {accountExtendDetail?.currentPlanKey === UserPayType.FREE &&
            authState?.access_token ? (
              <div>
                <button
                  onClick={onClickPaymentTrial}
                  className="px-3 py-2 bg-primary-500 font-workSansRegular text-[1rem] flex justify-center items-center"
                >
                  <Image
                    src={CrownIcon}
                    width={17}
                    height={14}
                    alt="crown-icon"
                    className="mr-2"
                  />
                  Start 7-day trial
                </button>
              </div>
            ) : null}
          </li> */}

          <li className="max-lg:flex-1">{authState ? <AQAvatar /> : null}</li>
          <li className="flex justify-center items-center">
            <button onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? (
                <XMarkIcon className="h-7 w-7 hover:text-success-500 transition-all duration-300" />
              ) : (
                <Bars3Icon className="h-7 w-7 hover:text-success-500 transition-all duration-300" />
              )}
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const renderDropMenu = () => {
    return (
      <div
        className={`w-full transition-all duration-300 z-[1000] bg-dark-900 fixed ${
          showMenu ? "h-[100vh] top-24 pb-10" : "h-[0px] top-[-100px]"
        }  hidden max-lg:block  overflow-hidden`}
      >
        <ul className="flex flex-col items-center text-base mt-3">
          <li className="max-lg:flex-1 text-primary-500 transition-all duration-300">
            <Link
              onClick={() => {
                mixpanelTrack(event_name_enum.inbound, { url: "/projects" });
              }}
              href="/narratives"
            >
              Narratives
            </Link>
          </li>
          <li className="max-lg:flex-1 mt-3 hover:text-success-500 transition-all duration-300">
            <Link
              onClick={() => {
                mixpanelTrack(event_name_enum.inbound, { url: "/projects" });
              }}
              href="/projects"
            >
              Projects
            </Link>
          </li>
          <li className="max-lg:flex-1 mt-3 hover:text-success-500 transition-all duration-300">
            <Link
              onClick={() => {
                mixpanelTrack(event_name_enum.inbound, { url: "/pricing" });
              }}
              href="/pricing"
            >
              Pricing
            </Link>
          </li>
          <li className="max-lg:flex-1 mt-3 hover:text-success-500 transition-all duration-300">
            <Link href="https://docs.alphaquest.io/">Docs</Link>
          </li>

          <li>
            {accountExtendDetail?.currentPlanKey === UserPayType.FREE &&
            authState?.access_token ? (
              <div>
                <button
                  onClick={onClickPaymentTrial}
                  className="px-3 py-2 bg-primary-500 font-workSansRegular text-[1rem] flex justify-center items-center max-lg:hidden"
                >
                  <Image
                    src={CrownIcon}
                    width={17}
                    height={14}
                    alt="crown-icon"
                    className="mr-2"
                  />
                  Start 7-day trial
                </button>
              </div>
            ) : null}
          </li>
          {!authState && (
            <li className="max-lg:flex-1 mt-3 w-full px-10">
              <button
                onClick={onGoSignup}
                className="py-2 px-6 w-full bg-success-500 text-white"
              >
                Sign up
              </button>
            </li>
          )}

          <li className="max-lg:flex-1 border-1 mt-3 border-white w-full px-10">
            {!authState && (
              <button
                onClick={onGoLogin}
                className="py-2 px-6  border border-[#00e3b4] w-full text-white"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      {renderDropMenu()}

      <div className="flex h-24 max-lg:bg-dark-900 justify-between items-center p-6 max-lg:mb-5 z-[100] fixed w-full">
        <button onClick={onGoHome} className="cursor-pointer">
          <Image src={LogoWithText} width={169} height={40} alt="logo" />
        </button>

        <div>
          {renderMobile()}

          <ul className="flex items-center max-lg:hidden text-sm mt-3 max-lg:border-b max-lg:border-b-secondary-600 max-lg:pb-2">
            <li className="max-lg:flex-1 mr-6  transition-all duration-300 text-primary-500 font-bold">
              <Link
                onClick={() => {
                  mixpanelTrack(event_name_enum.inbound, { url: "/projects" });
                }}
                href="/narratives"
              >
                Narratives
              </Link>
            </li>
            <li className="max-lg:flex-1 mr-6 hover:text-success-500 transition-all duration-300">
              <Link
                onClick={() => {
                  mixpanelTrack(event_name_enum.inbound, { url: "/projects" });
                }}
                href="/projects"
              >
                Projects
              </Link>
            </li>
            <li className="max-lg:flex-1 mr-6 hover:text-success-500 transition-all duration-300">
              <Link
                onClick={() => {
                  mixpanelTrack(event_name_enum.inbound, { url: "/pricing" });
                }}
                href="/pricing"
              >
                Pricing
              </Link>
            </li>
            <li className="max-lg:flex-1 mr-6 hover:text-success-500 transition-all duration-300">
              <Link href="https://docs.alphaquest.io/">Docs</Link>
            </li>

            <li>
              {accountExtendDetail?.currentPlanKey === UserPayType.FREE &&
              authState?.access_token ? (
                <div>
                  <button
                    onClick={onClickPaymentTrial}
                    className="px-3 py-2 bg-primary-500 font-workSansRegular text-[1rem] flex justify-center items-center max-lg:hidden"
                  >
                    <Image
                      src={CrownIcon}
                      width={17}
                      height={14}
                      alt="crown-icon"
                      className="mr-2"
                    />
                    Start 7-day trial
                  </button>
                </div>
              ) : null}
            </li>
            {!authState && (
              <li className="max-lg:flex-1 max-lg:hidden mr-2">
                <button
                  onClick={onGoSignup}
                  className="py-2 px-6 bg-success-500 text-white"
                >
                  Sign up
                </button>
              </li>
            )}

            <li className="max-lg:flex-1 border-1 border-white	 max-lg:hidden">
              {authState ? (
                <AQAvatar />
              ) : (
                <button
                  onClick={onGoLogin}
                  className="py-2 px-6  border border-[#00e3b4]  text-white"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomeNav;
