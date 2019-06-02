import { useEffect, useState } from 'react'

import { Location } from '../../domain/model/Location'
import { Spot } from '../../domain/model/Spot'
import { useDependency } from '../../di'

export const useSpots = (center: Location | null) => {
  const searchSpots = useDependency('searchSpots')

  const [results, setResults] = useState<Spot[]>([])

  useEffect(() => {
    if (!center) {
      return
    }

    searchSpots.execute(center).then(setResults)
  }, [center, searchSpots])

  return results
}
