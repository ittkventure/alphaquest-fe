import { ProjectsFollowedLastXday } from "@/types/topAlpha";
import React, { FC } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
import Popup from "reactjs-popup";
import moment from "moment";

interface IProjectsFollowedRowProps {
  projectsFollowedLastXDays: Array<ProjectsFollowedLastXday>;
}

const ProjectsFollowedRow: FC<IProjectsFollowedRowProps> = ({
  projectsFollowedLastXDays,
}) => {
  console.log(
    projectsFollowedLastXDays.length,
    "projectsFollowedLastXDays.length"
  );

  return (
    <div className="relative flex items-center">
      <div className="absolute w-full pr-10">
        <div className="w-full border-2 border-dashed border-[#2D354D] " />
      </div>
      <div className="flex gap-3 justify-center items-center w-full pr-10">
        {projectsFollowedLastXDays.map((item) => {
          const id = uuidv4();
          if (item.projectsCount === 0)
            return (
              <div className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full" />
            );
          return (
            <>
              <Popup
                trigger={
                  <div className="relative cursor-pointer">
                    <img
                      src={item.projects[0]?.profileImageUrl}
                      alt=""
                      className="w-8 h-8 min-w-[32px] min-h-[32px] bg-white rounded-full"
                    />
                    <div className="absolute -top-1 -right-[2px] w-4 h-4 rounded-full bg-[#E25148] flex justify-center items-center">
                      <p className="text-[10px] font-workSansMedium">
                        +{item.projectsCount}
                      </p>
                    </div>
                  </div>
                }
                key={`top-alpha-hunter-by-discoveries-${id}`}
                arrowStyle={{ color: "#282E44" }}
                on={["hover", "focus"]}
                keepTooltipInside=".tooltipBoundary"
              >
                <div className="bg-[#282E44] pt-4 pb-2 max-h-[377px] overflow-y-scroll overflow-x-hidden">
                  {item.projects.map((project) => {
                    return (
                      <a
                        key={project.username}
                        href={`/project/${project.username}`}
                        target="_blank"
                      >
                        <div className="flex items-center gap-2 mb-3 bg-[#282E44] px-6">
                          <p>Followed</p>
                          <img
                            src={project.profileImageUrl}
                            alt=""
                            className="w-8 h-8 min-w-[32px] min-h-[32px] bg-white rounded-full"
                          />
                          <p className="font-workSansMedium">
                            {project.name} on{" "}
                            {moment(project.followingTime)
                              .utc()
                              .format("MM/DD/YYYY")}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </Popup>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsFollowedRow;
