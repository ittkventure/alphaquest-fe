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

const changePasswordValidationSchema = yup.object({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .matches(
      passwordRegex,
      "Current passwords must have at least one non alphanumeric character., Passwords must have at least one digit ('0'-'9')., Passwords must have at least one uppercase ('A'-'Z')."
    ),
  newPassword: yup
    .string()
    .required("New password is required")
    .matches(
      passwordRegex,
      "New passwords must have at least one non alphanumeric character., Passwords must have at least one digit ('0'-'9')., Passwords must have at least one uppercase ('A'-'Z')."
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword")],
      "Confirm passwords not match with new passwords"
    ),
});

interface IChangePasswordModal {
  isOpen: boolean;
  closeModal: () => void;
}

const ChangePasswordModal: FC<IChangePasswordModal> = ({
  isOpen,
  closeModal,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authState } = useContext(AuthContext);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    if (!authState?.access_token) {
      toast.warning("Please login or register before payment!");
      setIsLoading(false);
      return;
    }
    try {
      await apiAuth.changePassword(
        authState?.access_token,
        data.currentPassword,
        data.newPassword
      );
      toast.success("Change password successfully!!!");
      closeModal();
      setIsLoading(false);
    } catch (error: any) {
      toast.error(
        `${error?.response?.data?.error?.message ?? error?.message}`,
        {}
      );
      setIsLoading(false);
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
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-workSansBold leading-6 text-success-500"
                >
                  Change your password
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Please enter your old password and your new password.
                  </p>
                </div>

                <AQForm
                  defaultValues={{}}
                  validationSchemaParams={changePasswordValidationSchema}
                  onSubmit={onSubmit}
                >
                  <AQInput
                    name="currentPassword"
                    labelText="Current password"
                    placeholder="Enter current password"
                    containerClassName="mt-5"
                    type="password"
                    disabled={isLoading}
                  />
                  <AQInput
                    name="newPassword"
                    labelText="New password"
                    placeholder="Enter new password"
                    containerClassName="mt-5"
                    type="password"
                    disabled={isLoading}
                  />
                  <AQInput
                    name="confirmPassword"
                    labelText="Confirm password"
                    placeholder="Enter confirm password"
                    containerClassName="mt-5"
                    type="password"
                    disabled={isLoading}
                  />
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                      disabled={isLoading}
                    >
                      {isLoading ? <Spinner /> : <p>No</p>}
                    </button>

                    <button
                      type="submit"
                      className="inline-flex ml-3 justify-center items-center rounded-md border border-transparent bg-success-500 hover:bg-success-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      disabled={isLoading}
                    >
                      {isLoading ? <Spinner /> : <p>Change you password</p>}
                    </button>
                  </div>
                </AQForm>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChangePasswordModal;
