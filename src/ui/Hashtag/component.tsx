import React from 'react'

import { HashtagWrapper, HashtagList } from './styles'

const getHueFromString = (str: string) => {
  var hash = 0

  if (str.length === 0) return hash
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  return hash % 360
}

export interface HashtagProps {
  children: string
}

export const Hashtag: React.FC<HashtagProps> = ({ children }) => {
  const hue = getHueFromString(children)
  const color = `hsl(${hue}, 50%, 65%)`

  return (
    <HashtagWrapper style={{ backgroundColor: color }}>
      {children}
    </HashtagWrapper>
  )
}

export const Hashtags: React.FC<{}> = ({ children }) => (
  <HashtagList>
    {React.Children.map(children, child => (
      <li>{child}</li>
    ))}
  </HashtagList>
)
