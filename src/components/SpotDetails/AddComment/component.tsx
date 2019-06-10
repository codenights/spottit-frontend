import React, { useState } from 'react'

import { Button } from '../../../ui/Button'
import { ButtonWrapper, Wrapper } from './styles'

export interface AddCommentProps {
  onSave: (body: string) => Promise<void>
}

export const AddComment: React.FC<AddCommentProps> = ({ onSave }) => {
  const [body, setBody] = useState('')

  return (
    <Wrapper
      onSubmit={e => {
        e.preventDefault()
        onSave(body).then(() => setBody(''))
      }}
    >
      <textarea
        placeholder="Write something about this spot..."
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <ButtonWrapper>
        <Button type="submit">Send</Button>
      </ButtonWrapper>
    </Wrapper>
  )
}
