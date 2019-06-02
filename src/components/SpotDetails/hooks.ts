import { useEffect, useState, useRef } from 'react'
import { useSpring, useChain } from 'react-spring'

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

export const useAnimations = () => {
  const mapRef = useRef<any>()
  const map = useSpring({
    from: { opacity: 0, transform: 'scale(1.2)' },
    opacity: 1,
    transform: 'scale(1)',
    ref: mapRef,
  })

  const headerRef = useRef<any>()
  const header = useSpring({
    from: { opacity: 0, transform: 'translateY(-40px)' },
    opacity: 1,
    transform: 'translateY(0)',
    ref: headerRef,
  })

  const descriptionRef = useRef<any>()
  const description = useSpring({
    from: { opacity: 0, transform: 'translateY(40px)' },
    opacity: 1,
    transform: 'translateY(0)',
    ref: descriptionRef,
  })

  useChain([mapRef, headerRef, descriptionRef], [0, 0.4, 0.4])

  return {
    map,
    header,
    description,
  }
}
