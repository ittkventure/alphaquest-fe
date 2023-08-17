import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment, memo, useEffect } from "react";
import Spinner from "../Spinner";
import ProjectDetail from "../ProjectDetail";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";

interface IProjectDetailModal {
  isOpen: boolean;
  userId: string;
  closeModal: () => void;
  onChangeHeart?: () => void;
}

const ProjectDetailModal: FC<IProjectDetailModal> = ({
  isOpen,
  closeModal,
  userId,
  onChangeHeart,
}) => {
  useEffect(() => {
    if (isOpen) {
      mixpanelTrack(event_name_enum.open_project_detail, {
        url: "/",
        type: "open-modal",
        name: "project-detail",
      });
    }
  }, [isOpen]);

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
          <div className="fixed inset-0 bg-black bg-opacity-70" />
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
              <Dialog.Panel className="w-full pb-10 max-w-6xl transform overflow-y-scroll rounded-ms bg-dark-800  text-left align-middle shadow-xl transition-all pt-10 relative">
                {userId ? (
                  <ProjectDetail
                    onChangeHeart={onChangeHeart}
                    userId={userId}
                  />
                ) : (
                  <div className="w-full flex justify-center items-center">
                    <Spinner />
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>

            <button
              className="h-10 w-10 border-[2px] rounded-[50%] absolute top-6 right-6 flex justify-center items-center hover:text-success-500 hover:border-success-500 duration-100 transition-all"
              onClick={closeModal}
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default memo(ProjectDetailModal);
