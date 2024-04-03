import ProjectMention from "@/components/Projects/ProjectMention";
import AppLayout from "@/layouts/AppLayout";
import { projectsMention } from "@/mocks";
import { NextPage } from "next";

interface Props {
  newest: boolean;
  chainQuery?: string;
  categoryQuery?: string;
}

const AppPage: NextPage<Props> = ({
  newest,
  chainQuery,
  categoryQuery,
}: Props) => {
 
  return (
    <AppLayout>
      <ProjectMention />
    </AppLayout>
  );
};

export default AppPage;

export async function getServerSideProps({ params, query }: any) {
  return {
    props: {
      chainQuery: query?.chain ?? null,
      categoryQuery: query?.category ?? null,
    }, // will be passed to the page component as props
  };
}
