import { useEffect, useState } from 'react'

import { DetailedSpot } from '../../domain/model/Spot'
import { useDependency } from '../../di'

export const useSpot = (id: string) => {
  const [spot, setSpot] = useState<DetailedSpot | null>(null)
  const getSpot = useDependency('getSpot')

  useEffect(() => {
    getSpot.execute(id).then(setSpot)
  }, [id, getSpot])

  return spot
}
