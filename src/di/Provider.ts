import { createContext } from 'react'
import { AwilixContainer } from 'awilix'

export const context = createContext<(() => AwilixContainer) | null>(null)
