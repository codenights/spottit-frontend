import { useEffect, useState } from "react";

import { useDependencies } from "../../di";
import { GetSpot } from "../../domain/usecase/GetSpot";
import { Spot } from "../../domain/model/Spot";

export const useSpot = (id: string) => {
  const [spot, setSpot] = useState<Spot | null>(null);
  const container = useDependencies();
  const getSpot = container.resolve<GetSpot>("getSpot");

  useEffect(() => {
    getSpot.execute(id).then(setSpot);
  }, [id, getSpot]);

  return spot;
};
