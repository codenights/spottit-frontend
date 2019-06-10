import { useEffect, useState } from 'react'

import { DetailedSpot } from '../../domain/model/Spot'
import { useDependency } from '../../di'

export const useSpot = (
  id: string
): [DetailedSpot | null, (body: string) => void] => {
  const [spot, setSpot] = useState<DetailedSpot | null>(null)
  const getSpot = useDependency('getSpot')
  const addComment = useDependency('addComment')

  useEffect(() => {
    getSpot.execute(id).then(setSpot)
  }, [id, getSpot])

  const createComment = (body: string) => {
    if (!spot) {
      return
    }

    addComment
      .execute(spot.id, body)
      .then(() => getSpot.execute(id).then(setSpot))
  }

  return [spot, createComment]
}
