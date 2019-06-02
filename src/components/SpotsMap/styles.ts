import styled from 'styled-components/macro'
import { animated } from 'react-spring'

import { color, spacing } from '../../ui/Theme'
import { Map as BaseMap } from '../../ui/Map'

export const Wrapper = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`

export const Map = styled(BaseMap)`
  position: absolute;
  width: 100%;
  height: 100%;
`

export const SpotsList = styled(animated.ul)`
  position: absolute;
  z-index: 1100;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  height: 25%;
  display: flex;
  overflow-x: auto;
  padding: ${spacing('contentPadding')} 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  scroll-snap-type: x mandatory;
  background: #fff;

  > li {
    flex-shrink: 0;
    width: 80%;
    scroll-snap-align: start;
  }

  > li + li {
    margin-left: ${spacing('default')};
  }

  > li:last-child {
    width: 100%;
  }
`

export const SpotItem = styled.div`
  padding: 20px;
  cursor: pointer;

  > :first-child {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  > :nth-child(2) {
    color: ${color('neutral60')};
  }
`

export const SpotDetailsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  z-index: 1200;
  background: #fff;
`
