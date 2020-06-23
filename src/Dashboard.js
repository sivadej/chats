import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {CTX} from './Store';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px',
    padding: theme.spacing(3),
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  topicsWindow: {
    width: '30%',
    height: '300px',
    borderRight: '1px solid grey',
  },
  chatWindow: {
    width: '70%',
    height: '300px',
    padding: '20px',
  },
  chatBox: {
    width: '85%',
  },
  button: {
    width: '15%',
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  // context store
  const {allChats, sendChatAction} = useContext(CTX);
  const topics = Object.keys(allChats);

  // local state
  const [activeTopic, changeActiveTopic] = useState(topics[0]);
  const [textValue, changeTextValue] = useState('');

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant='h4' component='h4'>
          Chat App
        </Typography>
        <Typography variant='h5' component='h5'>
          {activeTopic}
        </Typography>

        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map((topic) => (
                <ListItem button key={topic} onClick={(e)=>changeActiveTopic(e.target.innerText)}>
                  <ListItemText primary={topic}></ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, idx) => (
              <div className={classes.flex} key={idx}>
                <Chip className={classes.chip} label={chat.from} />
                <Typography component='p' gutterBottom>{chat.msg}</Typography>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.flex}>
          <TextField
            label='Message'
            className={classes.chatBox}
            value={textValue}
            onChange={(e)=>changeTextValue(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={()=>{
              sendChatAction(textValue);
              changeTextValue('');
            }}
            className={classes.button}>
            SEND
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Dashboard;
