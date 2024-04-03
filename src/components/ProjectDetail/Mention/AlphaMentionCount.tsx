import { getMentionDetailTab } from "@/api-client/mentioned/projects";
import Spinner from "@/components/Spinner";
import { useQuery } from "react-query";

type AlphaHunterMentionCountProps = {
  username: string;
};

export default function AlphaHunterMentionCount({
  username,
}: AlphaHunterMentionCountProps) {
  const { data, isLoading } = useQuery(["getAlphaMentionCount", username], () =>
    getMentionDetailTab(username)
  );
  return (
    <div className="grid grid-cols-2 gap-6 mt-5">
      <div className="border border-white rounded-lg border-opacity-10 p-4">
        <p>Alpha Hunters Mentioned</p>
        {isLoading ? (
          <Spinner customClassName="my-1" />
        ) : (
          <p className="text-xl max-lg:text-sm">
            {data?.data?.alphaHuntersMentionedCount}
          </p>
        )}
      </div>
    </div>
  );
}
