export const getProjectNameByPageConfig = (data: BlogProject) => {
  if (!data) return "";
  if (data?.hasRelatedChain) return `projects on ${data?.chain?.name}`;
  if (data?.hasRelatedCategory) return `${data?.category?.name} projects`;
  if (data?.hasRelatedMixed)
    return `${data?.category?.name} projects on ${data?.chain?.name}`;
};

export const getRelatedChainTitle = (data: BlogProject) => {
  if (!data) return "";
  if (data?.isCategoryPage)
    return `Related list of ${data?.category?.name} projects on other blockchains`;
  if (data?.isChainPage) return `Related list of projects on other blockchains`;
  if (data?.isMixedPage)
    return `Related list of ${data?.category?.name} projects on other blockchains`;
};

export const getRelatedCategoryTitle = (data: BlogProject) => {
  if (!data) return "";
  if (data?.isCategoryPage) return `Related list of projects`;
  if (data?.isChainPage) return `Related list on ${data?.chain?.name}`;
  if (data?.isMixedPage)
    return `Related list of projects on ${data?.chain?.name}`;
};

export const generateTitle = (title: string) => {
  if (!title) return;
  const temp = title?.split("List of ");
  const content = temp[1]?.split(" ");
  const number = content[0];
  const restContent = content.slice(1).join(" ");
  return !isNaN(Number(number))
    ? `${number} Best ${restContent}`
    : `Best ${content.join(" ")}`;
};
