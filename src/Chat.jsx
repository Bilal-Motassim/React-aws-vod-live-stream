import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [stompClient, setStompClient] = useState(null);



    useEffect(() => {
        const ws = new SockJS("http://localhost:8080/chat");


        const client = Stomp.over(ws);

        client.connect({},
            () => {
                client.subscribe("/topic/messages", (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    console.log(receivedMessage + "3123123");
                    setMessages((prev) => [...prev, receivedMessage]);
                });
            });

        setStompClient(client);

        return () => {
            client.disconnect();
        };
    }, []);


    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const SendMessage = () => {
        if (message.trim()) {
            const chatmessage = {
                from: "ana",
                text: message
            }
            stompClient.send("/app/chat", {}, JSON.stringify(chatmessage));
        }
    }

    return (
        <>
            <input value={message} onChange={handleMessage} type="text" />
            <Button onClick={SendMessage}>Send Message</Button>
            {messages.map((v, i) => {
                return (<>
                    <h2>{v.text}</h2>
                    <h2>{v.time}</h2>
                </>);

            })}
        </>
    );
}

export default Chat;