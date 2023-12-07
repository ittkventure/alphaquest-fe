import { useState, useEffect } from "react";
import Image from "next/image";
import { AlphaHunterIcon } from "@/assets/icons";
import { filterDataSearch, getSearchDataByType } from "@/utils/quickSearch";
import { SEARCH_TYPE, SearchItem } from "@/api-client/types/QuickSearch";
import localforage from "localforage";

type QuickSearchProps = {
  searchString: string;
};

export default function QuickSearch({ searchString }: QuickSearchProps) {
  const [projects, setProjects] = useState<SearchItem[]>([]);
  const [alphahunters, setAlphaHunters] = useState<SearchItem[]>([]);
  const [narratives, setNarratives] = useState<SearchItem[]>([]);

  localforage.getItem("narratives", (err, value: any) => {
    const narratives = filterDataSearch(
      JSON.parse(value),
      ["displayName"],
      searchString
    );
    setNarratives(narratives);
  });
  localforage.getItem("projects", (err, value: any) => {
    const projects = filterDataSearch(
      JSON.parse(value),
      ["displayName"],
      searchString
    );
    setProjects(projects);
  });
  localforage.getItem("alphahunters", (err, value: any) => {
    const alphahunters = filterDataSearch(
      JSON.parse(value),
      ["displayName"],
      searchString
    );
    setAlphaHunters(alphahunters);
  });
  return (
    <div className="absolute right-0 top-12 p-4 bg-[#292C35] w-[480px] h-[70vh] z-10 flex flex-col gap-4 text-white overflow-y-auto">
      {searchString && (
        <>
          <div className="flex flex-col gap-4">
            <span className="uppercase text-xs font-medium">Projects</span>
            {/* {projects?.map((project: any) => (
          <div className="flex justify-between items-center text-sm font-light">
            <div className="flex items-center gap-3">
              <Image
                src={project?.metadata?.profileImageUrl || AlphaHunterIcon}
                alt="quick search"
                width={24}
                height={24}
                className="object-cover relative inline-block h-4 w-4 object-center rounded-full"
              />
              <span>{project?.displayName}</span>
            </div>
            <span>{`#${project?.sortOrder}`}</span>
          </div>
        ))} */}
          </div>
          <div className="h-px bg-[#52525B]" />
          <div className="flex flex-col gap-4">
            <span className="uppercase text-xs font-medium">Narratives</span>
            {narratives?.map((narrative: any) => (
              <div className="flex justify-between items-center text-sm font-light">
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
                <span>{`#${narrative?.sortOrder}`}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-[#52525B]" />
          <div className="flex flex-col gap-4">
            <span className="uppercase text-xs font-medium">Alpha Hunters</span>
            {alphahunters?.map((alpha: any) => (
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      JSON.parse(alpha?.metadata)?.profileImageUrl ||
                      AlphaHunterIcon
                    }
                    alt="quick search"
                    width={24}
                    height={24}
                    className="object-cover relative inline-block h-4 w-4 object-center rounded-full"
                  />
                  <span>{alpha?.displayName}</span>
                </div>
                <span>{`#${alpha?.sortOrder}`}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
