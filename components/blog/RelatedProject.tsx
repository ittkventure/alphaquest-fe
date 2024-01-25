import { fetchPageConfig, fetchRelatedList } from "@/apis/blog";
import RelatedItem from "../home/RelatedItem";
import { CryptoType } from "@/types/dashboard";
import { getRelatedCategoryTitle, getRelatedChainTitle } from "@/utils/action";
import Image from "next/image";
import Link from "next/link";

type RelatedProjectProps = {
  code: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function RelatedProject({
  code,
  searchParams,
}: RelatedProjectProps) {
  // chains
  const sizeChain =
    typeof searchParams?.sizeChain === "string"
      ? Number(searchParams.sizeChain)
      : 10;
  const chains = await fetchRelatedList(CryptoType.CHAIN, code, sizeChain);

  // categories
  const sizeCategory =
    typeof searchParams?.sizeCategory === "string"
      ? Number(searchParams.sizeCategory)
      : 10;
  const categories = await fetchRelatedList(
    CryptoType.CATEGORY,
    code,
    sizeCategory
  );

  // blogPage searchparam
  const pageProject =
    typeof searchParams?.pageProject === "string"
      ? Number(searchParams.pageProject)
      : 1;

  const pageConfig = await fetchPageConfig(code);

  return (
    <>
      <div className="mt-12 flex flex-col gap-6">
        <h2 className="lg:text-3xl text-2xl font-semibold">
          {pageConfig && getRelatedChainTitle(pageConfig)}
        </h2>
        <div className="flex flex-wrap gap-3">
          {chains?.items?.map((chain: CrytoProject) => (
            <RelatedItem {...chain} key={chain.code} />
          ))}
        </div>

        {sizeChain < chains?.totalCount && (
          <Link
            href={{
              pathname: `/blog/${code}`,
              query: {
                ...(sizeCategory ? { sizeCategory } : {}),
                ...(pageProject ? { pageProject } : {}),
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
      </div>
      <div className="mt-12 flex flex-col gap-6">
        <h2 className="lg:text-3xl text-2xl font-semibold">
          {pageConfig && getRelatedCategoryTitle(pageConfig)}
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories?.items?.map((category: CrytoProject) => (
            <RelatedItem {...category} key={category.code} />
          ))}
        </div>

        {sizeCategory < categories?.totalCount && (
          <Link
            href={{
              pathname: `/blog/${code}`,
              query: {
                ...(sizeChain ? { sizeChain } : {}),
                ...(pageProject ? { pageProject } : {}),
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
    </>
  );
}
