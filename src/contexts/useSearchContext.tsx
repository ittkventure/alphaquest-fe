import { createContext, useState } from "react";

export interface ISearchContext {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export const SearchContext = createContext<ISearchContext>({
  keyword: "",
  setKeyword: (keyword: string) => {},
});

export const useSearchContext = (): ISearchContext => {
  const [keyword, setKeyword] = useState<string>("");

  return {
    keyword,
    setKeyword,
  };
};
