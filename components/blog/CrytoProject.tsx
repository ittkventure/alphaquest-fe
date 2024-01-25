import Image from "next/image";
import RelatedItem from "../home/RelatedItem";
import { fetchCryptoCategories, fetchCryptoChains } from "@/apis/blog";
import Link from "next/link";

export default async function CrytoProject({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // chains
  const sizeChain =
    typeof searchParams?.sizeChain === "string"
      ? Number(searchParams.sizeChain)
      : 10;
  const chains = await fetchCryptoChains(sizeChain);

  // categories
  const sizeCategory =
    typeof searchParams?.sizeCategory === "string"
      ? Number(searchParams.sizeCategory)
      : 10;
  const categories = await fetchCryptoCategories(sizeCategory);

  // blogPage searchparam
  const pageBlog =
    typeof searchParams?.pageBlog === "string"
      ? Number(searchParams.pageBlog)
      : 1;

  return (
    <div className="mt-20">
      <div className="flex gap-3 items-center">
        <Image src="/icons/menu.svg" alt="menu icon" width={32} height={32} />
        <span className="lg:text-3xl text-2xl font-semibold">
          List of Crypto Projects
        </span>
      </div>
      <div className="lg:mt-20 mt-12 mb-6 flex gap-4 items-center">
        <div className="w-12 h-[1px] bg-white" />
        <span className="font-medium text-xl">By Blockchain</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {chains?.items?.map((chain: CrytoProject) => (
          <RelatedItem {...chain} key={chain.code} />
        ))}
      </div>

      {sizeChain < chains?.totalCount && (
        <Link
          href={{
            pathname: "/blog",
            query: {
              ...(sizeCategory ? { sizeCategory } : {}),
              ...(pageBlog ? { pageBlog } : {}),
              sizeChain: sizeChain + 10,
            },
          }}
        >
          <div className="text-main flex gap-1 items-center mt-3 cursor-pointer">
            <span className="text-[18px]">See more</span>
            <Image
              src="/icons/arrow-down.svg"
              alt="ar down icon"
              height={24}
              width={24}
            />
          </div>
        </Link>
      )}

      <div className="mt-12 mb-6 flex gap-4 items-center">
        <div className="w-12 h-[1px] bg-white" />
        <span className="font-medium text-xl">By Category</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories?.items?.map((category: CrytoProject) => (
          <RelatedItem {...category} key={category.code} />
        ))}
      </div>

      {sizeCategory < categories?.totalCount && (
        <Link
          href={{
            pathname: "/blog",
            query: {
              ...(sizeChain ? { sizeChain } : {}),
              ...(pageBlog ? { pageBlog } : {}),
              sizeCategory: sizeCategory + 10,
            },
          }}
        >
          <div className="text-main flex gap-1 items-center mt-3 cursor-pointer">
            <span className="text-[18px]">See more</span>
            <Image
              src="/icons/arrow-down.svg"
              alt="ar down icon"
              height={24}
              width={24}
            />
          </div>
        </Link>
      )}
    </div>
  );
}
