import { getMentionDetailTab } from "@/api-client/mentioned/projects";
import { useQuery } from "react-query";

type Props = {
  username: string;
};

export default function AlphaMentionCount({ username }: Props) {
  const { data: alphaMentionCount } = useQuery(
    ["getAlphaMentionCount", username],
    () => getMentionDetailTab(username)
  );
  return (
    <div className="grid grid-cols-2 gap-6 mt-5 max-[1450px]:px-4 w-full">
      <div className="border border-white border-opacity-10 p-4 rounded-lg">
        <p>Total Projects Mentioned</p>

        <p className="text-xl max-lg:text-sm">
          {" "}
          {alphaMentionCount?.data?.alphaHuntersMentionedCount ?? 0}
        </p>
      </div>
    </div>
  );
}
