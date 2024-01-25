import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col items-center gap-6 mb-14 mt-20">
      <Link href={"/"}>
        <Image
          src="/images/aq_logo.svg"
          alt="AQ logo"
          width={166}
          height={28}
          className="cursor-pointer"
        />
      </Link>
      <div className="flex gap-2 max-lg:flex-wrap max-lg:justify-center">
        <Link href={"https://twitter.com/alphaquestio"} target="_blank">
          <span className="cursor-pointer">Twitter</span>
        </Link>
        <span className="text-main">/</span>
        <Link href={"https://discord.com/invite/EsMqKqjKB2"} target="_blank">
          <span className="cursor-pointer">Discord</span>
        </Link>
        <span className="text-main">/</span>
        <Link href={"/privacy-policy"}>
          <span className="cursor-pointer">Privacy policy</span>
        </Link>
        <span className="text-main">/</span>
        <Link href={"/terms"}>
          <span className="cursor-pointer">Terms</span>
        </Link>
        <span className="text-main">/</span>
        <Link href={"https://t.me/alphaquestio"} target="_blank">
          <span className="cursor-pointer">Contact us</span>
        </Link>
        <span className="text-main">/</span>
        <Link href={"https://coinwire.com/"} target="_blank">
          <span className="cursor-pointer">CoinWire</span>
        </Link>
        <span className="text-main">/</span>
        <Link href={"https://chainplay.gg/"} target="_blank">
          <span className="cursor-pointer">Chainplay</span>
        </Link>
      </div>
    </div>
  );
}
