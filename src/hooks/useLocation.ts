import { useState, useEffect } from 'react'

import { Location } from '../domain/model/Location'

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position =>
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    )
    const watcherId = navigator.geolocation.watchPosition(position =>
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    )

    return () => navigator.geolocation.clearWatch(watcherId)
  }, [])

  return location
}
