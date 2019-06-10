import React, { ComponentType } from 'react'
import BaseMarkdown from 'react-markdown'
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Wrapper,
} from './styles'

const heading = (props: any) => {
  let Element: ComponentType<any>

  switch (props.level) {
    case 1:
      Element = Heading1
      break
    case 2:
      Element = Heading2
      break
    case 3:
      Element = Heading3
      break
    case 4:
      Element = Heading4
      break
    case 5:
      Element = Heading5
      break
    case 6:
      Element = Heading6
      break
    default:
      throw new Error(`Invalid heading level "${props.level}"`)
  }

  return <Element>{props.children}</Element>
}

export interface MarkdownProps {
  children: string
}

export const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  return (
    <Wrapper>
      <BaseMarkdown source={children} renderers={{ heading }} />
    </Wrapper>
  )
}
