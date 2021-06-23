import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';

export default function Chat({
  messages,
  sendMessage,
  closeConnection,
  clearMessages,
}) {
  return (
    <Flex direction='column' align='center' justify='center'>
      <div className='leave-room'>
      <Button onClick={closeConnection} colorScheme='yellow'>Leave Chat</Button>
      <Button onClick={clearMessages} mx={3} colorScheme='red'>Clear Messages</Button>
      </div>
      <div className='chat'>
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage}/>
      </div>
    </Flex>
  );
}
