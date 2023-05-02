import Header from "@/components/App/Header";
import ProjectDetail from "@/components/ProjectDetail";
import Spinner from "@/components/Spinner";
import AppLayout from "@/layouts/AppLayout";
import React, { FC } from "react";

interface Props {
  nameProject?: string;
}

const ProjectPage: FC<Props> = ({ nameProject }) => {
  return (
    <AppLayout>
      <div className="w-full">
        <div className="p-6">
          <Header title="Project" />
          <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
        </div>
        <div className="flex flex-col mx-2">
          <ProjectDetail userId={nameProject} />
        </div>
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
