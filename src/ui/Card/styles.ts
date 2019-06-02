import styled from 'styled-components/macro'

import { color, spacing } from '../Theme'

export const Card = styled.div`
  padding: ${spacing('contentPadding')};
  border-radius: 2px;

  background: #fff;
  box-shadow: 0 1px 3px ${color('neutral20')};
`
