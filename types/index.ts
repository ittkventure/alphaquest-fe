type BaseResponse<T> = {
  items: T[];
  totalCount: number;
};

type CrytoProject = {
  code: string;
  slug: string;
  name: string;
  iconUrl: string;
  refId: string;
};

type BlogProject = {
  code: string;
  slug: string;
  pageTitle: string;
  pageDescription: string;
  hasRelatedChain: boolean;
  hasRelatedCategory: boolean;
  hasRelatedMixed: boolean;
  chain?: {
    code?: string;
    name?: string;
    iconUrl?: string;
    refId: string;
  };
  category?: {
    code?: string;
    name?: string;
    iconUrl?: string;
    refId: string;
  };
  isChainPage: boolean;
  isCategoryPage: boolean;
  isMixedPage: boolean;
};

type Dashboard = {
  name: string;
  description: string;
  profileImageUrl: string;
  chain: {
    code: string;
    name: string;
    type?: string;
  };
  category: {
    code: string;
    name: string;
    type?: string;
  };
  urls: {
    type?: string;
    url?: string;
  }[];
};
