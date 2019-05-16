import { useEffect, useState } from "react";

import { useDependencies } from "../../di";
import { SearchSpots } from "../../domain/usecase/SearchSpots";
import { Location } from "../../domain/model/Location";
import { Spot } from "../../domain/model/Spot";

export const useSpots = (center: Location | null) => {
  const container = useDependencies();
  const searchSpots = container.resolve<SearchSpots>("searchSpots");

  const [results, setResults] = useState<Spot[]>([]);

  useEffect(() => {
    if (!center) {
      return;
    }

    searchSpots.execute(center).then(setResults);
  }, [center, searchSpots]);

  return results;
};
