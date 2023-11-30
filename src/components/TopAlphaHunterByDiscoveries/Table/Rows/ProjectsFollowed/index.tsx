import { ProjectsFollowedLastXday } from "@/types/topAlpha";
import React, { FC, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Popup from "reactjs-popup";
import moment from "moment";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import { useRouter } from "next/router";
import { AuthContext, TypePayment } from "@/contexts/useAuthContext";
import Link from "next/link";
interface IProjectsFollowedRowProps {
  projectsFollowedLastXDays: Array<ProjectsFollowedLastXday>;
}

const ProjectsFollowedRow: FC<IProjectsFollowedRowProps> = ({
  projectsFollowedLastXDays,
}) => {
  const router = useRouter();
  const { setTypePaymentAction, authState } = useContext(AuthContext);

  const onClickPaymentTrial = () => {
    mixpanelTrack(event_name_enum.upgrade_to_pro, {
      url: router.pathname,
    });
    if (authState) {
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      mixpanelTrack(event_name_enum.inbound, {
        url: "/pricing",
      });
      router.push("/pricing?action=open");
    } else {
      mixpanelTrack(event_name_enum.inbound, {
        url: "/sign-up",
      });
      setTypePaymentAction ? setTypePaymentAction(TypePayment.PRO) : null;
      router.push("/sign-up");
    }
  };
  return (
    <div className="relative flex items-center">
      <div className="absolute w-full pr-10">
        <div className="w-full border-[0.5px] border-dashed border-[#2D354D] " />
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
                    {item.projectsCount > 1 && (
                      <div className="absolute -top-1 -right-[2px] w-4 h-4 rounded-full bg-[#E25148] flex justify-center items-center">
                        <p className="text-[10px] font-workSansMedium">
                          +{item.projectsCount - 1}
                        </p>
                      </div>
                    )}
                  </div>
                }
                key={`top-alpha-hunter-by-discoveries-${id}`}
                arrowStyle={{ color: "#282E44" }}
                on={["hover", "focus"]}
                keepTooltipInside=".tooltipBoundary"
              >
                <div className="bg-[#282E44] pt-4 pb-2 max-h-[377px] overflow-y-scroll overflow-x-hidden">
                  {item.projects.map((project) => {
                    if (project.username === "UNKNOWN")
                      return (
                        <div className="flex items-center gap-2 mb-3 bg-[#282E44] px-6">
                          <p>Followed</p>
                          <img
                            src={project.profileImageUrl}
                            alt=""
                            className="w-8 h-8 min-w-[32px] min-h-[32px] bg-white rounded-full"
                          />
                          <p className="font-workSansMedium">
                            <span
                              onClick={onClickPaymentTrial}
                              className="italic underline cursor-pointer"
                            >
                              {project.name === "UNKNOWN"
                                ? "Upgrade to Access"
                                : project.name}
                            </span>{" "}
                            on{" "}
                            {moment(project.followingTime)
                              .utc()
                              .format("MM/DD/YYYY")}
                          </p>
                        </div>
                      );
                    return (
                      <Link
                        key={project.username}
                        href={`/project/${project.username}`}
                        target={
                          project.username === "UNKNOWN" ? "_self" : "_blank"
                        }
                      >
                        <div className="flex items-center gap-2 mb-3 bg-[#282E44] px-6">
                          <p>Followed</p>
                          <img
                            src={project.profileImageUrl}
                            alt=""
                            className="w-8 h-8 min-w-[32px] min-h-[32px] bg-white rounded-full"
                          />
                          <p className="font-workSansMedium">
                            <span
                              onClick={onClickPaymentTrial}
                              className="italic underline cursor-pointer"
                            >
                              {project.name === "UNKNOWN"
                                ? "Upgrade to Access"
                                : project.name}
                            </span>{" "}
                            on{" "}
                            {moment(project.followingTime)
                              .utc()
                              .format("MM/DD/YYYY")}
                          </p>
                        </div>
                      </Link>
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
