import { useState } from 'react';
import {
  FormControl,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';
import { Form } from 'reactstrap';

export default function SendMessageForm({ sendMessage }) {
  const [message, setMessage] = useState('');

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
      }}
    >
      <FormControl>
        <Flex flexDirection='row'>
          <Input
            placeholder='message...'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            bg='whiteAlpha.900'
          ></Input>
          <Button
            variant='solid'
            colorScheme='messenger'
            type='submit'
            disabled={!message}
          >
            Send
          </Button>
        </Flex>
      </FormControl>
    </Form>
  );
}
