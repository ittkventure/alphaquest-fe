import Link from "next/link";

export default function Pick({ pageTitle, slug }: BlogProject) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="relative cursor-pointer">
        <div className="lg:h-[88px] h-[106px] w-[100wh] py-5 px-6 linear-bg-gradient-pick" />
        {/* <span className="text-gray-400 lg:text-sm text-xs font-medium uppercase absolute top-4 left-6">
        {title}
      </span> */}
        <span className="lg:text-xl text-lg font-medium absolute left-6 bottom-6">
          {pageTitle}
        </span>
      </div>
    </Link>
  );
}
