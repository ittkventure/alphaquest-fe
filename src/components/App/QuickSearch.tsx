import { useMemo } from "react";
import Image from "next/image";
import { AlphaHunterIcon } from "@/assets/icons";
import { SearchItem } from "@/api-client/types/QuickSearch";
import { useQuery } from "react-query";
import { fetchQuickSearch } from "@/api-client/quick-search";
import { useRouter } from "next/router";

type QuickSearchProps = {
  searchString: string;
  closeQuickSearch: () => void;
  resetSearch: () => void;
  closeSearchMobile?: () => void;
};

export default function QuickSearch({
  searchString,
  closeQuickSearch,
  resetSearch,
  closeSearchMobile,
}: QuickSearchProps) {
  const router = useRouter();
  const { data: quickSearchData } = useQuery(
    ["getQuickSearch", searchString, 50],
    () => fetchQuickSearch(searchString, 50)
  );

  const projects = useMemo(() => {
    if (!quickSearchData) return;
    return quickSearchData?.project;
  }, [quickSearchData]);

  const narratives = useMemo(() => {
    if (!quickSearchData) return;
    return quickSearchData?.narratives;
  }, [quickSearchData]);

  const alphahunters = useMemo(() => {
    if (!quickSearchData) return;
    return quickSearchData["alpha-hunter"];
  }, [quickSearchData]);

  return (
    <div className="lg:absolute lg:right-0 lg:top-12 lg:p-4 lg:bg-[#292C35] lg:w-[480px] lg:h-[70vh] z-[1000] flex flex-col gap-4 text-white overflow-y-auto divide-y divide-[#52525B] max-lg:mt-4">
      {searchString && (
        <>
          {!!projects?.length && (
            <div className="flex flex-col gap-1">
              <span className="uppercase text-sm font-bold">Projects</span>
              {projects?.map((project: SearchItem) => (
                <div
                  className="flex justify-between p-[6px] items-center text-sm font-light cursor-pointer hover:bg-dark-300"
                  key={project?.key}
                  onClick={() => {
                    router.push(
                      project?.metadata
                        ? `/project/${JSON.parse(project?.metadata)?.username}`
                        : `/projects`
                    );
                    closeQuickSearch();
                    resetSearch();
                    closeSearchMobile && closeSearchMobile();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        project?.metadata
                          ? JSON.parse(project?.metadata)?.profileImageUrl
                          : AlphaHunterIcon
                      }
                      alt="quick search"
                      width={24}
                      height={24}
                      className="object-cover relative inline-block h-4 w-4 object-center rounded-full"
                    />
                    <span>{project?.displayName}</span>
                  </div>
                  <span>
                    {project?.sortOrder ? `#${project?.sortOrder}` : undefined}
                  </span>
                </div>
              ))}
            </div>
          )}
          {!!narratives?.length && (
            <div className="flex flex-col gap-1 pt-4">
              {narratives?.length && (
                <span className="uppercase text-sm font-bold">Narratives</span>
              )}
              {narratives?.map((narrative: SearchItem) => (
                <div
                  className="flex justify-between p-[6px] items-center text-sm font-light cursor-pointer hover:bg-dark-300"
                  key={narrative?.key}
                  onClick={() => {
                    router.push(
                      narrative?.key
                        ? `/narratives/${narrative?.key}`
                        : `/narratives`
                    );
                    closeQuickSearch();
                    resetSearch();
                    closeSearchMobile && closeSearchMobile();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={AlphaHunterIcon}
                      alt="quick search"
                      width={24}
                      height={24}
                      className="object-cover relative inline-block h-4 w-4 object-center rounded-full"
                    />
                    <span>{narrative?.displayName}</span>
                  </div>
                  <span>
                    {narrative?.sortOrder
                      ? `#${narrative?.sortOrder}`
                      : undefined}
                  </span>
                </div>
              ))}
            </div>
          )}
          {!!alphahunters?.length && (
            <div className="flex flex-col gap-1 pt-4">
              {alphahunters?.length && (
                <span className="uppercase text-sm font-bold">
                  Alpha Hunters
                </span>
              )}

              {alphahunters?.map((alpha: SearchItem) => (
                <div
                  className="flex justify-between p-[6px] items-center text-sm cursor-pointer hover:bg-dark-300"
                  key={alpha?.key}
                  onClick={() => {
                    router.push(
                      alpha?.metadata
                        ? `/alpha-hunter/${
                            JSON.parse(alpha?.metadata)?.username
                          }`
                        : `/alpha-hunters`
                    );
                    closeQuickSearch();
                    resetSearch();
                    closeSearchMobile && closeSearchMobile();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        alpha?.metadata
                          ? JSON.parse(alpha?.metadata)?.profileImageUrl
                          : AlphaHunterIcon
                      }
                      alt="quick search"
                      width={24}
                      height={24}
                      className="object-cover relative inline-block h-4 w-4 object-center rounded-full"
                    />
                    <span>{alpha?.displayName}</span>
                  </div>
                  <span>
                    {alpha?.sortOrder ? `#${alpha?.sortOrder}` : undefined}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
