import React from 'react';
import MessageContainer from './MessageContainer';

export default function Chat({ messages }) {
  return (
    <div>
      <div className='chat'>
        <MessageContainer messages={messages} />
      </div>
    </div>
  );
}
