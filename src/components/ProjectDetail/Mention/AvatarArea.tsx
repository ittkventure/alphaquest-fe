import { TwitterBlueIcon } from "@/assets/icons";
import { event_name_enum, mixpanelTrack } from "@/utils/mixpanel";
import Image from "next/image";
import { useRouter } from "next/router";
import { AlphaMentionProject } from "@/types/mention";

type AvatarAreaProps = {
  item: AlphaMentionProject;
  isMentioned?: boolean;
};

export default function AvatarArea({ item, isMentioned }: AvatarAreaProps) {
  const router = useRouter();

  const renderDes = () => {
    if (item.name === "UNKNOWN") return <div />;
    return item?.attributes?.map((attribute, index) => {
      return (
        <a
          key={attribute?.code}
          href={
            attribute?.type === "CHAIN"
              ? `/projects?chain=${attribute?.code}`
              : `/projects?category=${attribute?.code}`
          }
          onClick={() => {
            mixpanelTrack(event_name_enum.on_filter_chain, {
              url: router.pathname,
              name: attribute?.name,
              code: attribute?.code,
            });
          }}
        >
          <p className="font-workSansRegular text-sm max-lg:text-xs text-secondary-500 z-50 mr-1 ">
            {attribute
              ? ` ${index === 0 ? "" : "·"} ${attribute.name} ${" "}`
              : ""}
          </p>
        </a>
      );
    });
  };

  return (
    <a
      href={
        item?.userId
          ? `${
              isMentioned
                ? `/alpha-hunter/${item?.username}?mentioned`
                : `/alpha-hunter/${item?.username}`
            }`
          : "#"
      }
      target={item?.userId ?? "_blank"}
    >
      <div className="w-full flex items-center ">
        {item.name === "UNKNOWN" ? (
          <div className="w-10 h-10 rounded-full mr-3 animate-pulse bg-slate-600" />
        ) : (
          <img
            src={item.profileImageUrl}
            alt=""
            className="w-10 h-10 rounded-full mr-3"
          />
        )}
        <div>
          {item.name === "UNKNOWN" ? (
            <div className="w-[100px] h-3 animate-pulse bg-slate-600 rounded-full" />
          ) : (
            <div className="flex items-center gap-2">
              <p className="font-workSansMedium">{item.name}</p>
              <a href={item.profileUrl}>
                <Image
                  src={TwitterBlueIcon}
                  width={16}
                  height={16}
                  alt="Verified"
                />
              </a>
            </div>
          )}

          <div className="flex item-center flex-wrap">{renderDes()}</div>
        </div>
      </div>
    </a>
  );
}
