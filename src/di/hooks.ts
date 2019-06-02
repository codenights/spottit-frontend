import { useContext } from 'react'

import { context } from './Provider'
import { DependencyKey, GetDependencyType } from './types'

export const useDependencies = () => {
  const getContainer = useContext(context)

  if (!getContainer) {
    throw new Error('No DI container in context.')
  }

  return getContainer()
}

export const useDependency = <T extends DependencyKey>(
  dependencyName: T
): GetDependencyType<T> => {
  const container = useDependencies()
  const dependency = container.resolve<GetDependencyType<T>>(dependencyName)

  return dependency
}
