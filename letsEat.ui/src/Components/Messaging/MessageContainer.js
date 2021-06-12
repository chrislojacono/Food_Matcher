import React, { useEffect, useRef } from 'react';

export default function MessageContainer({ messages }) {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  return (
    <div className='message-container' ref={messageRef}>
      {messages.map((mes, index) => (
        <div key={index} className='user-message'>
          <h2 className='message bg-primary px-2'>{mes.message}</h2>
          <h2 className='from-user m-1'>{mes.userName}</h2>
        </div>
      ))}
    </div>
  );
}
