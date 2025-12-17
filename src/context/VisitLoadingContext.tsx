import {
  createContext,
  useContext,
  useState,
} from "react";
import type {
  Dispatch,
  SetStateAction,
} from "react";

type VisitLoadingContextType = {
  visitLoading: boolean;
  setVisitLoading: Dispatch<SetStateAction<boolean>>;
};

const VisitLoadingContext = createContext<VisitLoadingContextType | undefined>(
  undefined
);

export function VisitLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visitLoading, setVisitLoading] = useState(false);

  return (
    <VisitLoadingContext.Provider
      value={{
        visitLoading,
        setVisitLoading,
      }}
    >
      {children}
    </VisitLoadingContext.Provider>
  );
}

export const useVisitLoading = () => {
  const context = useContext<VisitLoadingContextType | undefined>(
    VisitLoadingContext
  );
  if (context === undefined)
    throw new Error(
      "VisitLoading context was used outside of visitLoading provider"
    );
  return context;
};

