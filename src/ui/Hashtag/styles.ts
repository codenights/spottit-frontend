import styled from 'styled-components'
import { color } from '../Theme'

export const HashtagWrapper = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;

  color: ${color('neutral90')};
`

export const HashtagList = styled.ul`
  display: flex;

  > li {
    margin-right: 10px;
  }
`
