import { UserPayType } from "@/api-client/types/AuthType";
import { CrownIcon } from "@/assets/icons";
import Header from "@/components/App/Header";
import ProjectDetail from "@/components/ProjectDetail";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/contexts/useAuthContext";
import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import React, { FC, useContext } from "react";

interface Props {
  nameProject?: string;
}

const ProjectPage: FC<Props> = ({ nameProject }) => {
  const { accountExtendDetail } = useContext(AuthContext);
  return (
    <AppLayout>
      <div className="w-full">
        <div className="p-6">
          <Header title="Project" />
          <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
        </div>
        <div className="flex flex-col mx-2">
          <ProjectDetail userId={nameProject} isPaddingX isPage />
        </div>

        {accountExtendDetail?.currentPlanKey === UserPayType.PREMIUM ? (
          <></>
        ) : (
          <div
            className={`fixed bottom-0 w-screen h-[200px] max-lg:pr-0 pr-64 z-[999]`}
          >
            <div className="w-full h-[200px] flex flex-col justify-center items-center bg-linear-backdrop">
              <p className="mb-4">Upgrade account to see all</p>

              <button
                onClick={() => {}}
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
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ProjectPage;

export async function getServerSideProps({ params }: any) {
  return {
    props: {
      nameProject: params?.name,
    }, // will be passed to the page component as props
  };
}
