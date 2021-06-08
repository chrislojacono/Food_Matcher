import React from 'react';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { Button } from '@chakra-ui/react';

export default function ChatRoom() {
  // eslint-disable-next-line
  const connection = new HubConnectionBuilder().withUrl('https://localhost:44371/notify', {
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  }).build();

  connection.start();

  let currentId = 1;

  const addTask = () => {
    connection.invoke('AddTask', {
      id: currentId,
      desc: `Starting laundry task ${currentId}`,
      done: false,
    });
    // eslint-disable-next-line
    currentId++;
  };
  return (
    <Button onClick={addTask} colorScheme='teal'>
      Add Task
    </Button>
  );
}
