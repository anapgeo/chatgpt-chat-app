import { Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChatMessageDto } from "../../model/ChatMessageDto.js";
import './chat.css';
import SendIcon from '@mui/icons-material/Send';


export default function Chat(){
    
    const ENTER_KEY_CODE = 13;

    const scrollBottomRef = useRef(null);
    const webSocket = useRef(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const  chatMessage= new ChatMessageDto
    
    let newdata=""
    
    const  addMessage =  (message) => {
        let messageArray=[]
        console.log("ADD MESSAGE!")
        console.log("Message Array before:",messageArray)
        console.log("Message:", message)
        messageArray.push(message)
        console.log("Message Array after:",messageArray)
        
        setChatMessages(messageArray)
        console.log(chatMessages)
    }

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }
    

   
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
        
    }
    useEffect(() => {
        console.log("imageURL shows: ", chatMessages);
      }, [chatMessages])

    const handleEnterKey = async (event) => {
        if(event.keyCode === ENTER_KEY_CODE){
            
            console.log("The question was:", event.target.value)
            chatMessage.user="Me"
            chatMessage.message=event.target.value

           addMessage(chatMessage)
           await timeout(100)
           
           await fetch('http://localhost:5000/post',{
              method:'POST',
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(event.target.value)
            }).then(()=>{
                
              console.log("POST")
            })
            
           await fetch("/data").then((res) =>
                res.json().then((data) => {
                  console.log(data)  
                  newdata=data.data
                  console.log(newdata)
                  
                })
            ).then(()=>{
                chatMessage.user="ChatGPT"
                  chatMessage.message=newdata
                 addMessage(chatMessage)
                console.log("ANSWER")})
        }
    }

    
    

    const listChatMessages = chatMessages?.map((chatMessageDto, index) => 
        <ListItem key={index}>
            <ListItemText primary={`${chatMessageDto.user}: ${chatMessageDto.message}`}/>
        </ListItem>
    );

    return (
        <Fragment>
            <Container>
                <Paper elevation={5}>
                    <Box p={3}>
                        <Typography variant="h4" gutterBottom>
                            ChatGPT
                        </Typography>
                        <Divider />
                        <Grid container spacing={4} alignItems="center">
                            <Grid id="chat-window" xs={12} item>
                                <List id="chat-window-messages">
                                    {listChatMessages}
                                    <ListItem ref={scrollBottomRef}></ListItem>
                                </List>
                            </Grid>
                            
                            <Grid xs={9} item>
                                <FormControl fullWidth>
                                    <TextField onChange={handleMessageChange} onKeyDown={handleEnterKey}
                                        value={message}
                                        label="Type your message..."
                                        variant="outlined"/>
                                </FormControl>
                            </Grid>
                            <Grid xs={1} item>
                                <IconButton 
                                    aria-label="send"
                                    color="primary">
                                        <SendIcon />
                                </IconButton>
                            </Grid>
                            
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </Fragment>
    );
}