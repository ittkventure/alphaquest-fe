import Image from "next/image";

export default function AlternativeData() {
  return (
    <div>
      <div className="lg:text-3xl text-2xl font-medium mb-10">
        How Hedge Funds Use Alternative Data
      </div>
      <div className="flex gap-3 items-center">
        <Image src="/images/avatar.svg" alt="avt" width={44} height={44} />
        <div className="flex flex-col gap-[6px] text-base font-normal">
          <span>by Josh Howarth</span>
          <span className="text-[rgba(255,255,255,0.5)]">December 8, 2023</span>
        </div>
      </div>
      <div className="leading-8 mt-10 text-lg flex flex-col">
        <span>{`Ecommerce sellers rely on Amazon to reach a massive audience of over 310
        million active customers. That makes keeping up with the platform’s best
        sellers and new trends extremely important.`}</span>
        <span>{`Using the Exploding Topics
        proprietary algorithm, we can find trending products that are performing
        well on Amazon before they become mainstream. Every product we’ve
        included is rated as an Amazon bestseller and displays upward growth.`}</span>
        <span>{`With that, here are 25 of the best-selling products on Amazon today.`}</span>
      </div>
      <div className="leading-8 mt-10 text-lg flex flex-col">
        <span>{`Companies and consumers produce a large amount of data as they go about their business: transaction receipts, customer logs, and location data are a few examples.`}</span>
        <span>{`This “data exhaust”, often called alternative data, is now being used to give investors an edge in optimizing their investment strategies. In the fiercely competitive world of hedge funds, alternative data emerges as the key to achieving that much-needed edge. Let’s dive in.`}</span>
      </div>
      <div className="text-2xl font-medium mt-[60px]">
        Alternative Data And Alpha Generation
      </div>
      <div className="leading-8 mt-6 text-lg flex flex-col gap-10">
        <span>{`Generating returns that are higher than the market (also known as alpha) consistently is no easy feat.`}</span>
        <span>{`If clients are going to pay high fees, they want near certainty that the hedge fund is going to outperform a passive benchmark. Otherwise, what’s the point?`}</span>
        <span>{`This pursuit of superior returns, therefore, is the driving force of hedge fund strategies. This means research departments staffed with PhDs, quantitative analysts (quants), cutting-edge tech and in-house tools.`}</span>
      </div>
      <div className="bg-card py-10 lg:px-14 px-2 flex flex-col gap-6 items-center border-[2px] custom-card-sub-border-linear my-[60px]">
        <div className="lg:text-3xl text-2xl font-semibold text-center">
          <span>Find Trending Narratives and Projects before the take off</span>
        </div>
        <div className="text-center">
          <span>
            Be the first to uncover the next big thing in crypto with out
            powerful crypto research tool
          </span>
        </div>
        <button className="px-6 py-3 bg-btn w-40">Start for Free</button>
      </div>
      <div className="text-2xl font-medium">
        Alternative Data And Alpha Generation
      </div>
      <div className="leading-8 mt-6 text-lg flex flex-col gap-10">
        <span>{`Generating returns that are higher than the market (also known as alpha) consistently is no easy feat.`}</span>
        <span>{`If clients are going to pay high fees, they want near certainty that the hedge fund is going to outperform a passive benchmark. Otherwise, what’s the point?`}</span>
        <span>{`This pursuit of superior returns, therefore, is the driving force of hedge fund strategies. This means research departments staffed with PhDs, quantitative analysts (quants), cutting-edge tech and in-house tools.`}</span>
      </div>
      <div className="border-t border-item my-[60px]" />
      <div>
        <div className="lg:text-3xl text-2xl font-semibold mb-6">You may also like</div>
        <ul className="flex flex-col gap-4 list-disc pl-4">
          <li>10 Critical Fintech Trends</li>
          <li>20 Trending Personal Finance Startups</li>
          <li>15 Digital Payment Startups</li>
        </ul>
      </div>
    </div>
  );
}
