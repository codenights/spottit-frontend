import styled from 'styled-components'
import { color } from '../Theme'

export const Heading1 = styled.p`
  font-weight: bold;
`

export const Heading2 = styled.p`
  font-weight: bold;
`

export const Heading3 = styled.p`
  font-weight: bold;
`

export const Heading4 = styled.p`
  font-weight: bold;
`

export const Heading5 = styled.p`
  font-weight: bold;
`

export const Heading6 = styled.p`
  font-weight: bold;
`

export const Wrapper = styled.div`
  ol,
  ul {
    list-style-position: inside;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  > * {
    margin-bottom: 10px;
  }

  pre code {
    display: block;
    width: 100%;
    overflow-x: auto;
    background: #f4f4f4;
    font-family: monospace;
    padding: 10px;
    border-left: 2px solid ${color('neutral70')};
  }
`
