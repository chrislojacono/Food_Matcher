import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Button } from '@chakra-ui/react';
import Chat from './Chat';
import UserData from '../../Helpers/Data/UserData';
import MessageData from '../../Helpers/Data/MessageData';

export default function ChatRoom2({ userId, sessionId }) {
  const [signalConnection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState();
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    UserData.GetSingleUser(userId).then((response) => {
      setUserName(response.firstName);
    });
    MessageData.GetSessionMessages(sessionId).then((response) => {
      setMessages(response);
    });
    setDidMount(true);
    return () => setDidMount(false);
  }, [userId, sessionId, userName]);

  const joinChat = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:44371/chat')
        .configureLogging(LogLevel.Information)
        .build();
      // eslint-disable-next-line
      connection.on('RecieveMessage', (userName, message) => {
        setMessages([...messages, { userName, message }]);
      });

      await connection.start();
      await connection.invoke('JoinRoom', { userName, sessionId });
      setConnection(connection);
    } catch (e) {
      console.warn(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await signalConnection.invoke('SendMessage', message, sessionId, userName);
    } catch (e) {
      console.warn(e);
    }
  };

  if (!didMount) {
    return null;
  }
  return (
    <div className='app mb-3'>
      <hr className='line' />
      {!signalConnection ? (
        <Button onClick={joinChat}>Join Chat Room</Button>
      ) : (
        <Chat messages={messages} sendMessage={sendMessage}/>
      )}
    </div>
  );
}
