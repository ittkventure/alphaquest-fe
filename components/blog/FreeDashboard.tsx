import DiscoverCard from "../home/DiscoverCard";
import { fetchPageConfig, fetchProjectByDashboard } from "@/apis/blog";
import NFTCard from "../home/NFTCard";
import ProjectPagination from "../layouts/ProjectPagination";

type FreeDashboardProps = {
  code: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function FreeDashboard({
  code,
  searchParams,
}: FreeDashboardProps) {

  const pageConfig = await fetchPageConfig(code);

  // dashboard list
  const pageProject =
    typeof searchParams?.pageProject === "string"
      ? Number(searchParams.pageProject)
      : 1;

  const data = await fetchProjectByDashboard(pageConfig?.code, pageProject);

  return (
    <>
      <div className="grid lg:grid-cols-3 grid-rows-1 gap-6 mt-8">
        {data?.items?.map((dashboard: Dashboard) => (
          <NFTCard {...dashboard} key={dashboard.name} />
        ))}
        <DiscoverCard />
      </div>
      <div className="flex justify-center mt-6 mb-20">
        <ProjectPagination
          total={data?.totalCount > 50 ? 50 : data?.totalCount}
          pageSize={8}
        />
      </div>
    </>
  );
}
