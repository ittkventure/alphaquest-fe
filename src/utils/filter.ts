export type FilterBar = {
  projectCount: number;
  code: string;
  name: string;
  type: string;
};

export function convertOptionsFilterData(data: FilterBar[]) {
  return data?.map((d: FilterBar) => {
    return {
      code: d.code,
      name: `${d.name} (${d.projectCount})`,
    };
  });
}
