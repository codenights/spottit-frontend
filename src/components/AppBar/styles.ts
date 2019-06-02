import styled from 'styled-components/macro'

// As React-leaflet puts a z-index of 1000
// on the map, we need to place the AppBar above
// so that the shadow is visible
const Z_INDEX = 1500

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: ${Z_INDEX};

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
