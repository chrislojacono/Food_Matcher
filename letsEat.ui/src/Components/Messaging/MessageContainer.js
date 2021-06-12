import React from 'react';

export default function MessageContainer({ messages }) {
  return (
    <div className='message-container'>
      {messages.map((mes, index) => (
        <div key={index} className='user-message'>
          <h2 className='message bg-primary px-2'>{mes.message}</h2>
          <h2 className='from-user'>{mes.userName}</h2>
        </div>
      ))}
    </div>
  );
}
