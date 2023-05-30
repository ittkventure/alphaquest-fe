import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useContext, useEffect } from "react";
import SuccessCanceled from "./SuccessCanceled";
import { CancelContext } from "@/contexts/useCancelContext";
import HelpStep from "./HelpStep";
import SelectFeedback from "./SelectFeedback";
import WriteFeedback from "./WriteFeedback";
import ConfirmFeedback from "./ConfirmFeedback";
interface IRootModal {
  isOpen: boolean;
  closeModal: () => void;
}

const RootModal: FC<IRootModal> = ({ isOpen, closeModal }) => {
  const { step, resetStep } = useContext(CancelContext);

  useEffect(() => {
    if (isOpen) {
      resetStep();
    }
  }, [isOpen]);

  const renderModalFollowStep = () => {
    switch (step) {
      case 1:
        return <SelectFeedback />;
      case 2:
        return <HelpStep />;
      case 3:
        return <WriteFeedback />;
      case 4:
        return <ConfirmFeedback closeModal={closeModal} />;
      case 5:
        return <SuccessCanceled closeModal={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-ms bg-dark-800 p-6 text-left align-middle shadow-xl transition-all">
                <button
                  onClick={closeModal}
                  className="absolute right-[22px] top-[22px] hover:text-success-500 transition-all duration-200"
                >
                  <XMarkIcon className="h-7 w-7" />
                </button>

                {renderModalFollowStep()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RootModal;
