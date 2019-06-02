import React from 'react'
import { animated } from 'react-spring'

import { DetailedSpot } from '../../domain/model/Spot'
import { Map } from '../../ui/Map'
import { AuthoredBy, Wrapper, Markdown, Header, SpotInfo, Body } from './styles'
import { useAnimations } from './hooks'

export interface SpotDetailsProps {
  spot: DetailedSpot
}

export const SpotDetails: React.FC<SpotDetailsProps> = ({ spot }) => {
  const animations = useAnimations()

  return (
    <Wrapper>
      <Header>
        <animated.div style={animations.map}>
          <Map
            isFixed={true}
            center={spot.location}
            zoomLevel={17}
            style={{ height: '250px' }}
          />
        </animated.div>
        <SpotInfo style={animations.header}>
          <p>{spot.name}</p>
          {spot.location.address && <p>{spot.location.address}</p>}
        </SpotInfo>
      </Header>

      <Body style={animations.description}>
        <AuthoredBy>
          Added by <span>{spot.author.username}</span>
        </AuthoredBy>
        {spot.description && <Markdown source={spot.description} />}
      </Body>
    </Wrapper>
  )
}
