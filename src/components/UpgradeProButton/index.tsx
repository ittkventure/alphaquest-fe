import { UserPayType } from "@/api-client/types/AuthType";
import { CrownIcon } from "@/assets/icons";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import { AQ_BLOG_URL, getUserId } from "@/utils/auth";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useContext } from "react";

interface IUpgradeProButtonProps {
  length?: number;
}

const UpgradeProButton: FC<IUpgradeProButtonProps> = ({ length = 0 }) => {
  const { authState, accountExtendDetail, setTypePaymentAction } =
    useContext(AuthContext);
  const router = useRouter();

  const onClickPaymentTrial = () => {
    mixpanelTrack(event_name_enum.upgrade_to_pro, {
      url: router.pathname,
    });
    if (authState) {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      const userId = getUserId();
      router.push(`${AQ_BLOG_URL}/pricing?userId=${userId}&plan=pro`);
    } else {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/sign-up",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      router.push("/sign-up");
    }
  };

  return accountExtendDetail?.currentPlanKey === UserPayType.FREE ||
    !accountExtendDetail?.currentPlanKey ? (
    length >= 10 ? (
      <div className="fixed w-full h-[300px] bottom-0 left-0 bg-linear-backdrop z-10 pl-64 max-lg:pl-0">
        <div className="w-full h-[300px] flex flex-col justify-center items-center z-10 mt-10">
          <p className="mb-4">Upgrade account for full access</p>

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
            Upgrade to Pro
          </button>
        </div>
      </div>
    ) : null
  ) : (
    <div />
  );
};

export default UpgradeProButton;
