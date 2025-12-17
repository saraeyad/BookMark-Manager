import {
  createContext,
  useContext,
  useState,
} from "react";
import type {
  Dispatch,
  SetStateAction,
} from "react";

type TagsContextType = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
};

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export function TagsProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <TagsContext.Provider
      value={{
        tags,
        setTags,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
}

export const useTags = () => {
  const context = useContext<TagsContextType | undefined>(TagsContext);
  if (context === undefined)
    throw new Error("Tags context was used outside of tags provider");
  return context;
};

