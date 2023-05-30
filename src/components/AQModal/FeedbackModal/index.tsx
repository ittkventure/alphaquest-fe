import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import WriteFeedback from "./WriteFeedback";
import ConfirmFeedback from "./ConfirmFeedback";
import SuccessCanceled from "./SuccessCanceled";
import { CancelContext, useCancelContext } from "@/contexts/useCancelContext";
import RootModal from "./RootModal";

interface IFeedbackModal {
  isOpen: boolean;
  closeModal: () => void;
}

const FeedbackModal: FC<IFeedbackModal> = ({ isOpen, closeModal }) => {
  const cancelContextValue = useCancelContext();

  return (
    <CancelContext.Provider value={cancelContextValue}>
      <RootModal isOpen={isOpen} closeModal={closeModal} />
    </CancelContext.Provider>
  );
};

export default FeedbackModal;
