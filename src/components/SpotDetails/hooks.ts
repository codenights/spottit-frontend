import { useEffect, useState } from 'react'

import { DetailedSpot } from '../../domain/model/Spot'
import { useDependency } from '../../di'
import { useLoggedIn } from '../../hooks/useLoggedIn'

export const usePresenter = (id: string) => {
  const addComment = useDependency('addComment')
  const getSpot = useDependency('getSpot')

  const [spot, setSpot] = useState<DetailedSpot | null>(null)
  const showAddComment = useLoggedIn()

  useEffect(() => {
    getSpot.execute(id).then(setSpot)
  }, [id, getSpot])

  const createComment = (body: string): Promise<void> => {
    if (!spot) {
      return Promise.resolve()
    }

    return addComment
      .execute(spot.id, body)
      .then(() => getSpot.execute(id).then(setSpot))
  }

  return { spot, createComment, showAddComment }
}
