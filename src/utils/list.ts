import {
  AptosLogo,
  BlurLogo,
  ConduitLogo,
  LensLogo,
  StargateLogo,
  StepnLogo,
} from "@/assets/images";
import { TableObject } from "@/components/App/Table/TableRow";
import { DiscoverProjectItemTypes } from "@/components/Home/DiscoverProjectItem";

const initListSort = [
  {
    label: "Score",
    value: "SCORE",
  },
  {
    label: "Discovered Date",
    value: "DISCOVERED_DATE",
  },
  {
    label: "Twitter Follow",
    value: "TWITTER_FOLLOWER",
  },
  {
    label: "Twitter Create Date",
    value: "TWITTER_CREATED_DATE",
  },
];

const initListMonth = [
  {
    label: "1d",
    value: "1D",
  },
  {
    label: "3d",
    value: "3D",
  },
  {
    label: "7d",
    value: "7D",
  },
  {
    label: "30d",
    value: "30D",
  },
  {
    label: "ALL",
    value: "ALL",
  },
];

const initListChain = [
  {
    label: "Ethereum",
    value: 0,
  },
  {
    label: "Polygon",
    value: 1,
  },
  {
    label: "Avalanche",
    value: 2,
  },
  {
    label: "BSC - BNB",
    value: 3,
  },
];

const initListCategory = [
  {
    label: "Defi",
    value: 0,
  },
  {
    label: "Gamefi",
    value: 1,
  },
  {
    label: "Metaverse",
    value: 2,
  },
  {
    label: "Meme coin",
    value: 3,
  },
];

const listRowMock: TableObject[] = [
  {
    index: 1,
    avatar: "https://i.pravatar.cc/300",
    name: "Monad",
    des: "Accelerating the EVM ecosystem for world adoption. Follow along for updates. We’re hiring - DMs open.",
    time: "1 year ago · Starknet · Metaverse",
    heart: 465,
  },
  {
    index: 2,
    avatar: "https://i.pravatar.cc/300",
    name: "Monaco Protocol",
    des: "We do policy and advocacy work to help DeFi flourish.",
    time: "1 year ago · Starknet · Metaverse",
    heart: 324,
  },
  {
    index: 3,
    avatar: "https://i.pravatar.cc/300",
    name: "Monad",
    des: "Accelerating the EVM ecosystem for world adoption. Follow along for updates. We’re hiring - DMs open.",
    time: "1 year ago · Starknet · Metaverse",
    heart: 432,
  },
  {
    index: 4,
    avatar: "https://i.pravatar.cc/300",
    name: "Scroll Tech",
    des: "We do policy and advocacy work to help DeFi flourish.",
    time: "1 year ago · Starknet · Metaverse",
    heart: 654,
  },
  {
    index: 5,
    avatar: "https://i.pravatar.cc/300",
    name: "RISC Zero",
    des: "We do policy and advocacy work to help DeFi flourish.",
    time: "1 year ago · Starknet · Metaverse",
    heart: 1234,
  },
  {
    index: 6,
    avatar: "https://i.pravatar.cc/300",
    name: "Monad",
    des: "Accelerating the EVM ecosystem for world adoption. Follow along for updates. We’re hiring - DMs open.",
    time: "1 year ago · Starknet · Metaverse",
    heart: 66,
  },
  {
    index: 7,
    avatar: "https://i.pravatar.cc/300",
    name: "Monad",
    des: "Accelerating the EVM ecosystem for world adoption. Follow along for updates. We’re hiring - DMs open.",
    time: "1 year ago · Starknet · Metaverse",
    heart: 341,
  },
  {
    index: 8,
    avatar: "https://i.pravatar.cc/300",
    name: "Monad",
    des: "We do policy and advocacy work to help DeFi flourish.",
    time: "1 year ago · Starknet · Metaverse",
    heart: 12,
  },
];

const listDiscoverProjects: Array<DiscoverProjectItemTypes> = [
  {
    project: "Aptos",
    found: "Feb 9th 2022",
    dayAfter: "4 days after account created",
    des: "Retroactive up to 50k",
    follow: "380k+",
    whenFound: "703",
    logo: AptosLogo,
  },
  {
    project: "Blur",
    found: "Feb 07th 2022",
    dayAfter: "4 days after account created",
    des: "Retroactive up to 1M",
    follow: "240k+",
    whenFound: "112",
    logo: BlurLogo,
  },
  {
    project: "Stargate Finance",
    found: "Nov 01st 2021",
    dayAfter: "4 days after account created",
    des: "6x Return",
    follow: "139k+",
    whenFound: "1401",
    logo: StargateLogo,
  },
  {
    project: "Stepn",
    found: "Oct 01st 2021",
    dayAfter: "4 days after account created",
    des: "40x Return",
    follow: "571k+",
    whenFound: "720",
    logo: StepnLogo,
  },
  {
    project: "Lens Protocol",
    found: "Jan 22nd 2022",
    dayAfter: "4 days after account created",
    des: "NFT worth $100",
    follow: "296k+",
    whenFound: "2359",
    logo: LensLogo,
  },
  {
    project: "Conduitxyz",
    found: "Feb 02nd 2023",
    dayAfter: "4 days after account created",
    des: "Fundraising announcement publish on 28th March 2023",
    follow: "2k+",
    whenFound: "489",
    logo: ConduitLogo,
  },
];

export {
  initListMonth,
  initListChain,
  initListCategory,
  listRowMock,
  initListSort,
  listDiscoverProjects,
};
