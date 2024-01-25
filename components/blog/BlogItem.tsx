import Link from "next/link";

export default function BlogItem({ slug, pageTitle }: BlogProject) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="bg-card p-8 flex flex-col justify-between h-full cursor-pointer">
        <span className="text-xl font-medium">{pageTitle}</span>
      </div>
    </Link>
  );
}
