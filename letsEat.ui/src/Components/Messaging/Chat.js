import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';

export default function Chat({ messages, sendMessage, closeConnection }) {
  return (
    <Flex direction='column' align='center' justify='center'>
      <div className='leave-room'>
      <Button onClick={closeConnection} colorScheme='red'>Leave Chat</Button>
      </div>
      <div className='chat'>
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage}/>
      </div>
    </Flex>
  );
}
