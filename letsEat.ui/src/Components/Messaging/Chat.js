import React from 'react';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';

export default function Chat({ messages, sendMessage }) {
  return (
    <div>
      <div className='chat'>
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage}/>
      </div>
    </div>
  );
}
