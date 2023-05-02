import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment, useContext, useState } from "react";
import AQForm from "../AQForm";
import Spinner from "../Spinner";
import * as yup from "yup";
import { passwordRegex } from "@/utils/regex";
import { toast } from "react-toastify";
import AQInput from "../AQForm/AQInput";
import { apiAuth } from "@/api-client";
import { AuthContext } from "@/contexts/useAuthContext";
import ProjectDetail from "../ProjectDetail";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface IProjectDetailModal {
  isOpen: boolean;
  userId: string;
  closeModal: () => void;
}

const ProjectDetailModal: FC<IProjectDetailModal> = ({
  isOpen,
  closeModal,
  userId,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={closeModal}>
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
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-ms bg-dark-800 p-6 text-left align-middle shadow-xl transition-all pt-10 relative">
                {userId ? (
                  <ProjectDetail userId={userId} />
                ) : (
                  <div className="w-full flex justify-center items-center">
                    <Spinner />
                  </div>
                )}

                <button onClick={closeModal}>
                  <XMarkIcon className="h-7 w-7 absolute top-4 right-4 hover:text-success-500 duration-300 transition-all" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectDetailModal;
