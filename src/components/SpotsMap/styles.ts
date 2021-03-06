import styled from 'styled-components/macro'
import { color, spacing } from '../../ui/Theme'

export const Wrapper = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;

  .map {
    position: absolute;
    width: 100%;
    height: 75%;
  }
`

export const SpotsList = styled.ul`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25%;
  display: flex;
  overflow-x: auto;
  padding: ${spacing('contentPadding')} 0;
  scroll-snap-type: x mandatory;

  > li {
    flex-shrink: 0;
    max-width: 80%;
    scroll-snap-align: start;
  }

  > li + li {
    margin-left: ${spacing('default')};
  }
`

// TODO: fix me with CSS pseudo elements?
export const Pusher = styled.li`
  flex-basis: 20%;
`

export const SpotItem = styled.div`
  padding: 20px;

  > :first-child {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  > :nth-child(2) {
    color: ${color('neutral60')};
  }
`
