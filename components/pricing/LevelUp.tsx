import Image from "next/image";

export default function LevelUp() {
  return (
    <div className="relative">
      <div className="absolute lg:top-[-2.5rem] 2xl:right-[-2.5rem] lg:right-[-10.5rem] right-[-1rem] top-[-3.5rem] z-0">
        <Image
          src="/images/nft_elipse.svg"
          alt="NFT elipse"
          width={198}
          height={198}
        />
      </div>
    <div className="lg:w-[392px] w-full h-[420px] p-10 flex flex-col border-2 custom-card-sub-border-linear gap-8 backdrop-blur-sm">
      <Image src="/images/hand.svg" alt="hand img" width={56} height={56} />
      <div className="flex flex-col gap-2 lg:text-3xl text-2xl font-semibold">
        <span>Level Up Your</span>
        <span>Cryto Game Today</span>
      </div>
      <span className="text-sm font-normal">
        Join us today and stay ahead of the market
      </span>
      <button className="bg-btn px-6 py-3 lg:w-1/2 w-2/3">Start for Free</button>
    </div>
    </div>
  );
}
