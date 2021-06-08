import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import { Button } from '@chakra-ui/react';

export default function ChatRoom() {
  const [currentId, setCurrentId] = useState(1);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    connection.on('AddedTask', (task) => setTasks([...tasks, task]));
  });

  // eslint-disable-next-line
  const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:44371/notify', {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .build();

  connection.start();

  const addTask = () => {
    connection.invoke('AddTask', {
      id: currentId,
      desc: `Starting laundry task ${currentId}`,
      done: false,
    });
    // eslint-disable-next-line
    setCurrentId(currentId + 1);
  };
  return (
    <Button onClick={addTask} colorScheme='teal'>
      Add Task
    </Button>
  );
}
