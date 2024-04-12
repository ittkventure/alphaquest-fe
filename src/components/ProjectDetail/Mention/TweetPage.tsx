import SkeletonLoading from "@/components/App/Table/SkeletonLoading";
import { useState } from "react";
import { Tweet } from "react-twitter-widgets";

type Props = {
  id: string;
};

export default function TweetPage({ id }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <SkeletonLoading numberOfRow={3} />
        </div>
      ) : (
        <>
          <Tweet tweetId={id} options={{ theme: "dark" }} />
        </>
      )}
    </div>
  );
}
