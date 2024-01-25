import Image from "next/image";

export default function CommentSwiper() {
  return (
    <div className="flex max-lg:flex-col gap-12 lg:mx-12">
      <div className="flex-1">
        <div className="border border-main px-8 pt-8 min-h-[230px] flex flex-col justify-between">
          <p className="text-lg max-lg:text-sm">
            This has been our secret weapon for identifying early-stage crypto
            projects since 2021. We’re thrilled to finally release this powerful
            tool to the public, offering everyone the opportunity to benefit
            from our in-house expertise and insights.
          </p>
          <div className="flex justify-end mb-4">
            <Image src="/images/quote.svg" alt="quote" width={39} height={39} />
          </div>
        </div>
        <div className="flex mt-[30px]">
          <div className="w-11 h-11 rounded-[50%] overflow-hidden">
            <Image src="/images/user1.jpg" width={44} height={44} alt="avt" />
          </div>
          <div className="ml-3 text-sm">
            <p className="font-semibold ">Tung Tran</p>
            <p className="text-[#A1A1AA]">Co-founder of TK Ventures</p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="border border-main px-8 pt-8 min-h-[230px] flex flex-col justify-between">
          <p className="text-lg max-lg:text-sm">
            AlphaQuest is my go-to resource for discovering promising crypto
            projects in their infancy. Their weekly newsletter keeps me updated
            and ready to capitalize on greatest alpha. Highly recommended!
          </p>
          <div className="flex justify-end mb-4">
            <Image src="/images/quote.svg" alt="quote" width={39} height={39} />
          </div>
        </div>
        <div className="flex mt-[30px]">
          <div className="w-11 h-11 rounded-[50%] overflow-hidden">
            <Image src="/images/user2.jpg" width={44} height={44} alt="avt" />
          </div>
          <div className="ml-3 text-sm">
            <p className="font-semibold ">James R</p>
            <p className="text-[#A1A1AA]">Crypto Degen</p>
          </div>
        </div>
      </div>
    </div>
  );
}
