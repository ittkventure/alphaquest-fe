import {
  AptosLogo,
  BlurLogo,
  ConduitLogo,
  LensLogo,
  StargateLogo,
  StepnLogo,
  ArbdogeLogo,
  FriendtechLogo,
  MiladyLogo,
  Pepelogo,
  TipcoinLogo,
  UnibotLogo
} from "@/assets/images";
import { TableObject } from "@/components/App/Table/TableRow";
import { DiscoverProjectItemTypes } from "@/components/Home/DiscoverProjectItem";

const initListSort = [
  {
    label: "# of KOLs followed",
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

const initListSortForWatchlist = [
  {
    label: "Watchlist most recent date added",
    value: "WATCHLIST_MOST_RECENT_DATE_ADDED",
  },
  {
    label: "# of KOLs followed",
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
    project: "Tipcoin",
    found: "Aug 30th 2023",
    dayAfter: "Leading the Social-Fi narrative on ETH",
    des: "35x return since the discovered date",
    follow: "294k+",
    whenFound: "28",
    logo: TipcoinLogo,
  },
  {
    project: "Friendtech",
    found: "Mar 14th 2023",
    dayAfter: "1 days after account created",
    des: "Leading Social-Fi project on Base, Generated $18M+ fee",
    follow: "147k+",
    whenFound: "51",
    logo: FriendtechLogo,
  },
  {
    project: "Unibot",
    found: "May 18th 2023",
    dayAfter: "1 days after account created",
    des: "14x return, Leading the Tele-Bot narrative",
    follow: "38.6k+",
    whenFound: "121",
    logo: UnibotLogo,
  },
  {
    project: "Pepe",
    found: "Apr 15th 2023",
    dayAfter: "11 days after account created",
    des: "Listed on Binance and hit $1 Billion MarketCap",
    follow: "526k+",
    whenFound: "107",
    logo: Pepelogo,
  },
  {
    project: "ArbDoge AI",
    found: "Apr 15th 2023",
    dayAfter: "Arbitrum + AI + Meme narratives",
    des: "300x return since the discovered date",
    follow: "212k+",
    whenFound: "2,301",
    logo: ArbdogeLogo,
  },
  {
    project: "Milady",
    found: "May 9th 2023",
    dayAfter: "3 days after account created",
    des: "70x return since the discovered date",
    follow: "63.5k+",
    whenFound: "6,739",
    logo: MiladyLogo,
  },
];

export {
  initListMonth,
  initListChain,
  initListCategory,
  listRowMock,
  initListSort,
  listDiscoverProjects,
  initListSortForWatchlist
};
