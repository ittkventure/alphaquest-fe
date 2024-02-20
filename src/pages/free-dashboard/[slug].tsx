import { fetchFreeDashboard } from "@/api-client/free-dashboard";
import AppContent from "@/components/AppAvax";
import Header from "@/components/AppAvax/Header";
import Spinner from "@/components/Spinner";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function DynamicFreeDashboard() {
  const { query } = useRouter();
  const slug = query?.slug || "";
  const { isLoading, data } = useQuery(["getFreeDashboard", slug], () =>
    fetchFreeDashboard(slug)
  );
  return (
    <AppLayout>
      {isLoading === false ? (
        <AppContent
          slug={slug}
          listItemsProps={data?.items}
          totalCountProps={data?.discoveredProjectCount}
          pageTitle={data?.pageTitle}
        />
      ) : (
        <div className="w-full">
          <div className="p-6">
            <Header />
            <div className="h-[1px] bg-white bg-opacity-20 my-4 max-lg:hidden" />
          </div>
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      )}
    </AppLayout>
  );
}
