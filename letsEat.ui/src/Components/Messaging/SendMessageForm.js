import { useState } from 'react';
import { FormControl, Input, Button } from '@chakra-ui/react';

export default function SendMessageForm({ sendMessage }) {
   const [message, setMessage] = useState('');
   return (
       <FormControl onSubmit={(e) => {
           e.preventDefault();
           sendMessage(message);
           setMessage('');
       }}>
           <Input placeholder='message...' onChange={(e) => setMessage(e.target.value)} value={message}></Input>
                <Button varient='primary' type='submit' disabled={!message}>Send</Button>
       </FormControl>
   )
}