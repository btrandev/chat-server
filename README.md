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
Build docker image
- docker build . -t chat-server:local

Build and run containers
- docker-compose -d

## Run unit tests
npm run test

## Run with Postman
1. Import collection and environment from files under ./postman folder
2. Run 0.Chat Server collection will login 2 users
3. Add first new socket.io request following below settings
    - URL:
        - ws://localhost:8181
    - Add below header
        - Authorization   |   Bearer {{authToken1}}
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
8. Add second socket.io request following below settings
    - URL:
        - ws://localhost:8282
    - Add below header
        - Authorization   |   Bearer {{authToken2}}
    - Listen below events
        - join
        - welcome
        - chat
        - deleteMessage
9. Repeat step 4 to step 7 to test the second socket.io request
10. Monitoring responses in 2 socket requests and see their messages
11. Hit Disconnect button will notify to other user via "leave" event
