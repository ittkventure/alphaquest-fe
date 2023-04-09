import { TableObject } from "@/components/App/Table/TableRow";

const initListSort = [
  {
    label: "score",
    value: "SCORE",
  },
  {
    label: "discovered date",
    value: "DISCOVERED_DATE",
  },
  {
    label: "twitter follow",
    value: "TWITTER_FOLLOWER",
  },
  {
    label: "twitter create date",
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

export {
  initListMonth,
  initListChain,
  initListCategory,
  listRowMock,
  initListSort,
};
