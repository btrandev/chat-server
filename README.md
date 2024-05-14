# chat-server

## Main containers
- Chat server using WebSocket (socket.io)
    - chat-server:
        - ports: 
            - websocket: 8181
            - http: 4002
    - chat-server-2:
        - ports: 
            - websocket: 8282
            - http: 8002
- Mongodb to store room and chat messages
- Redis to pub/sub events across multiple chat servers

## Build containers
Run build.cmd (for Windows)

## Run unit tests
npm run test

## Run with Postman

### Run with Postman Desktop
1. Import collection and environment from files under ./postman folder
2. Run 0.Chat Server collection will login 6 users
3. You can create upto 6 different socket.io requests with above 6 authenticated users in step 2.
    - URL:
        - ws://localhost:8181
        - ws://localhost:8282
    - Add below header
        - Authorization   |   Bearer {{authToken$number}}
            -  $number is from 1 to 6
    - Listen below events
        - join
        - welcome
        - chat
        - deleteMessage
4. Start connecting to websocket server
5. Open Message tab and type "join" in event text box, then hit Send button.
    - Server will notify other users via "join" event
    - Server will return the chat messages if any via "welcome" event
6. Type "chat" in event text box, input a chat message, then hit Send button.
    - Server will notify other users via "chat" event, message body consists of sender, message and timestamp
    - {"sender": 1, "message": "Hello world!", "timestamp": 1715658334925}
7. Type "deleteMessage" in event text box, check the Ack check box, input the timestamp of message that is of the current user, then hit Send button
    - Server will return true if deletion succeeds
8. Monitoring responses in 2 socket requests and see their messages
9. Hit Disconnect button will notify to other user via "leave" event

### Run with Postman Agent (recommended)
- https://www.postman.com/downloads/postman-agent/
- Open shared Postman workspace: https://www.postman.com/btran24/workspace/chatserverdemo/overview. Fork all collections in shared workspace to yours, along with "qualgo_dev" environment.
1. Run Postman Agent, then you will go to your Postman workspace (Web)
2. Run Chat Server - Login collection to login all 6 users
3. Open 6 socket.io requests under Chat Server - Websocket and enable all events under Events tab
4. Start connecting to websocket server
5. Open Message tab and type "join" in event text box, then hit Send button.
    - Server will notify other users via "join" event
    - Server will return the chat messages if any via "welcome" event
6. Type "chat" in event text box, input a chat message, then hit Send button.
    - Server will notify other users via "chat" event, message body consists of sender, message and timestamp
    - {"sender": 1, "message": "Hello world!", "timestamp": 1715658334925}
7. Type "deleteMessage" in event text box, check the Ack check box, input the timestamp of message that is of the current user, then hit Send button
    - Server will return true if deletion succeeds
8. Monitoring responses in 2 socket requests and see their messages
9. Hit Disconnect button will notify to other user via "leave" event