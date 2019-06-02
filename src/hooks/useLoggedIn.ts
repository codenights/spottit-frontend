import { useState, useEffect } from 'react'
import { useDependency } from '../di'

export const useLoggedIn = () => {
  const authService = useDependency('authService')
  const [isLoggedIn, setLoggedIn] = useState(authService.isLoggedIn())

  useEffect(() => authService.subscribe(setLoggedIn), [authService])

  return isLoggedIn
}
