import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read, update} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import {doNotPress} from './doNotPress'
import Warning from'./../assets/images/svg/warning.svg'
import Stats from'./../assets/images/svg/analytics.svg'

// Styles
const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}))

export default function Profile({ match }) {
  const classes = useStyles()
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()
 
  // Position of warning
  let position = {
    top : '100px',
    left :'25px',
    bottom : '',
    right : ''
  } 

/** Helper function to update stats of user actions after pressing on warning */
  async function doPress(){

   const actions = await doNotPress(user);

   user.stats.button.actions.push(actions);
   user.stats.button.click++;
  
    update({
      userId: match.params.userId
    }, {t: jwt.token}, user).then((data) => {
      if (data.error) {
      } else {
      }
    })
  }

/** Helper function to relocate the warning position depending on user selection of plantLover on signUp */
function setWarningPosition(){
    if(user.plantLover){
      position.top = '';
      position.left = '';
      position.bottom = "25px";
      position.right = '25px';
      }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }


  }, [match.params.userId])
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }

    setWarningPosition();
    return (<div>
         {/** Stats link */}
         {
         !user.mugggle && (
            <div style={{width:'10%'}}  onClick={() => {resetStats()}}>
              <Link to={"/users/" + auth.isAuthenticated().user._id}>
                <Avatar title='Reset all users stats' style={{height:'60px', width:'60px', margin:'auto', backgroundColor:'#d5f494'}}>
                  <img src={Stats} style={{width:'25px'}} />
                  </Avatar>
              </Link>        
              <Typography variant="h6" style={{margin:'auto', textAlign:'center'}}> Stats </Typography>
           </div>)
           }
              <Paper className={classes.root} elevation={4}>
                <Typography variant="h6" className={classes.title}>Profile </Typography>
                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Person/>
                      </Avatar>
                    </ListItemAvatar>
                    
                    <ListItemText primary={user.name} secondary={user.email}/> 
                    {
                      auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
                        (<ListItemSecondaryAction>
                          <Link to={"/user/edit/" + user._id}>
                            <IconButton aria-label="Edit"  color="primary">
                              <Edit/>
                            </IconButton>
                          </Link>
                          <DeleteUser  userId={user._id}/>
                        </ListItemSecondaryAction>)
                    }

                  </ListItem>
                  <Divider/>
                  
                  <ListItem>
                    <ListItemText primary={"Joined: " + (new Date(user.created)).toDateString()}/>
                  </ListItem>

                </List>
              </Paper>

              {/** Do Not press warning */}
              <div id='norPress' style={{position:'fixed', bottom:position.bottom, right:position.right, left:position.left, top: position.top, zIndex:'200'}} onClick={() => {doPress()}}>
              <Avatar title=' My Plants' style={{height:'40px', width:'40px', margin:'10px auto', backgroundColor:'#e46057'}}>
                <img style={{height:"25px", color:"#fff", margin:'10px'}}src={Warning}/>
              </Avatar>          
              <Typography variant="body1">DO NOT PRESS </Typography>
              </div>
      </div>
    )
  }