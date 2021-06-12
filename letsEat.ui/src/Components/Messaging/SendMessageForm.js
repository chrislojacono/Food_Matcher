import { useState } from 'react';
import {
  FormControl,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';

export default function SendMessageForm({ sendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
    console.warn(message);
  };

  return (
    <FormControl>
      <Flex flexDirection='row'>
        <Input
          placeholder='message...'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          bg='whiteAlpha.900'
        ></Input>
        <Button
          colorScheme='blue'
          bg='blue.800'
          type='submit'
          onClick={handleSubmit}
          disabled={!message}
        >
          Send
        </Button>
      </Flex>
    </FormControl>
  );
}
