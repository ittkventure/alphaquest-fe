import { apiPayment } from "@/api-client";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import { CancelContext } from "@/contexts/useCancelContext";
import { Dialog } from "@headlessui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { FC, useContext, useState } from "react";
import { toast } from "react-toastify";

interface IConfirmFeedback {
  closeModal: () => void;
}

const ConfirmFeedback: FC<IConfirmFeedback> = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogOut, authState, getAccountExtendDetails, getCanCancel } =
    useContext(AuthContext);
  const { stepType, messageStep2, messageStep3, nextStep } =
    useContext(CancelContext);

  const onCancelSub = async () => {
    setIsLoading(true);
    try {
      if (authState?.access_token) {
        await apiPayment.cancelPayment(
          authState?.access_token,
          stepType,
          messageStep2,
          messageStep3
        );
        await getAccountExtendDetails();
        await getCanCancel();

        closeModal();
        nextStep(5);
      } else {
        toast.error("Error when cancel please try again");
      }

      setIsLoading(false);
    } catch (error: any) {
      if (error?.response?.data?.error?.message) {
        toast.error(error?.response?.data?.error?.message);
      } else {
        toast.error("Error when payment, please try again!");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-3xl font-workSansBold leading-6 mt-7  flex items-center"
      >
        <p className="">Just making sure</p>
      </Dialog.Title>
      <div className="mt-6">
        <p className="text-[16px] leading-5 text-white">
          You’ll lose access to your account at the end of your billing period
        </p>
      </div>
      <div className="mt-6">
        <div className="flex flex-col justify-between">
          <button
            onClick={onCancelSub}
            disabled={isLoading}
            className="flex items-center mb-6 justify-center bg-success-500 p-3 text-white hover:bg-success-600"
          >
            {isLoading ? (
              <div className="mr-2">
                <Spinner />
              </div>
            ) : (
              ""
            )}
            <p>I understand and want to cancel</p>
          </button>
          <button
            onClick={closeModal}
            className="flex border justify-center  border-success-500 hover:border-success-600 p-3 text-success-500"
          >
            <p>I do not want to cancel</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmFeedback;
