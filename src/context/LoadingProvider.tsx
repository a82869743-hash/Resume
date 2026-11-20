import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = {
  loaded: boolean; // loader finished & curtain lifted
  setLoaded: (v: boolean) => void;
  sceneReady: boolean; // hero 3D scene mounted
  setSceneReady: (v: boolean) => void;
};

const LoadingContext = createContext<Ctx | null>(null);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loaded, setLoaded] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  return (
    <LoadingContext.Provider value={{ loaded, setLoaded, sceneReady, setSceneReady }}>
      {children}
    </LoadingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used inside LoadingProvider");
  return ctx;
};
