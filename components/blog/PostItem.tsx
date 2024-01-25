import Link from "next/link";

type PostItemProps = {
  title: string;
  content: string;
  time: string;
};

export default function PostItem({ title, content, time }: PostItemProps) {
  return (
    <Link href="/blog/read">
      <div className="bg-card p-8 flex flex-col justify-between h-full cursor-pointer">
        <div className="flex flex-col gap-3">
          <span className="text-gray-400 text-sm font-medium uppercase">
            {title}
          </span>
          <span className="text-xl font-medium">{content}</span>
        </div>
        <span className="text-gray-400 text-sm font-medium uppercase">
          {time}
        </span>
      </div>
    </Link>
  );
}
