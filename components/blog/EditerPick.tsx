import Image from "next/image";
import Pick from "./Pick";
import FindTrending from "./FindTrending";
import { fetchEditorPick } from "@/apis/blog";

export default async function EditerPick() {
  const data = await fetchEditorPick();
  return (
    <div>
      <div className="flex gap-3 items-center mb-8">
        <Image
          src="/icons/star-circle.svg"
          width={32}
          height={32}
          alt="star circle"
        />
        <div className="font-semibold lg:text-3xl text-2xl">{`Editor’s Pick`}</div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-5 lg:col-span-2">
          {data?.map((pick: BlogProject) => (
            <Pick {...pick} key={pick?.code} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <FindTrending />
        </div>
      </div>
    </div>
  );
}
