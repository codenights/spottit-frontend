import { useContext } from "react";

import { context } from "./Provider";

export const useDependencies = () => {
  const getContainer = useContext(context);

  if (!getContainer) {
    throw new Error("No DI container in context.");
  }

  return getContainer();
};
