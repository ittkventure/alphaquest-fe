import Image from "next/image";
import Link from "next/link";

export default function RelatedItem({ iconUrl, name, slug }: CrytoProject) {
  return (
    <>
      {name && (
        <Link
          href={{
            pathname: `/blog/${slug}`,
          }}
        >
          <div
            className={`${
              iconUrl ? "p-2" : "px-3 py-2"
            } bg-item rounded-full flex gap-2 cursor-pointer`}
          >
            {iconUrl && (
              <Image
                src={iconUrl}
                alt="Icon item"
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>{name}</span>
            <Image
              src="/icons/arrow-up-right.svg"
              width={24}
              height={24}
              alt="arrow up"
            />
          </div>
        </Link>
      )}
    </>
  );
}
