import { CryptoType } from "@/types/dashboard";

export async function fetchEditorPick() {
  const res = await fetch(
    "https://api.alphaquest.io/api/app/blog/editor-pick-list"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchCryptoChains(size: number) {
  const res = await fetch(
    `https://api.alphaquest.io/api/app/blog/of-crypto-projects?type=CHAIN&pageNumber=1&pageSize=${size}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<BaseResponse<CrytoProject>>;
}

export async function fetchCryptoCategories(size: number) {
  const res = await fetch(
    `https://api.alphaquest.io/api/app/blog/of-crypto-projects?type=CATEGORY&pageNumber=1&pageSize=${size}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<BaseResponse<CrytoProject>>;
}

export async function fetchAllList(page: number) {
  const res = await fetch(
    `https://api.alphaquest.io/api/app/blog/list?pageNumber=${page}&pageSize=9`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<BaseResponse<BlogProject>>;
}

export async function fetchPageConfig(code: string) {
  const res = await fetch(
    `https://api.alphaquest.io/api/app/blog/page-config-by-slug?slug=${code}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<BlogProject>;
}

export async function fetchProjectByDashboard(code: string, page: number) {
  const res = await fetch(
    `https://api.alphaquest.io/api/app/blog/project?code=${code}&pageNumber=${page}&pageSize=8`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<BaseResponse<Dashboard>>;
}

export async function fetchRelatedList(
  cryptoType: CryptoType,
  code: string,
  size: number
) {
  const res = await fetch(
    `https://api.alphaquest.io/api/app/blog/related-list-by-slug?type=${cryptoType}&slug=${code}&pageNumber=1&pageSize=${size}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<BaseResponse<CrytoProject>>;
}
