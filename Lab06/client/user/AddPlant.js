import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider';
import {read} from './api-user.js'
import {update} from './api-user.js'
import auth from './../auth/auth-helper'
import {Redirect, Link} from 'react-router-dom'
import {doNotPress} from './doNotPress'
import Warning from'./../assets/images/svg/warning.svg'
import Avatar from '@material-ui/core/Avatar'
import { CalendarToday } from '@material-ui/icons'

// Styles
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "70%",
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: 'middle'
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  }
}))

export default function AddPlant({ match }) {
  const classes = useStyles()
  const abortController = new AbortController()
  const signal = abortController.signal
  const [user, setUser] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()

  const [values, setValues] = useState({
    name: '',
    password: '',
    plantType: '',
    plantLover: false,
    open: false,
    error: ''
  })

 // Position of warning
  let position = {
    top : '100px',
    left :'25px',
    bottom : '',
    right : ''
  } 

  /** Helper fucntion to add a new plant to collection and send information to API */
  const addPlant = () => {

    // Grab watering frequency and name
    const days = document.getElementById('daysSlider').childNodes[2].value;
    const newplantName = document.getElementById('searchPlant').value;

    // Check that plant name don't collide with exsisting plant in collection
    let repeated = false;

    user.plants.forEach(element => {
      if(element.plantName == newplantName){
        repeated = true;
      }
    });

      if(repeated || newplantName == ""){
        alert("This plant is already in your collection, try a different name");
      }else{
        // Create plant object
            const newPlant = {};
            newPlant.plantName = newplantName
            newPlant.plantType = document.getElementById('plantType').value;
            newPlant.waterRate = document.getElementById('daysSlider').childNodes[2].value;
            newPlant.lastWater = new Date();
            newPlant.nextWater = new Date();
            newPlant.nextWater.setTime(newPlant.lastWater.getTime() + days * 24 * 60 * 60 * 1000);
            newPlant.notification = document.getElementById('notify').checked;
            user.plants.push(newPlant);
          
            // Add plants to stats
            updateStatsAdd(newPlant.plantType);

          // Send information to db
            update({
              userId: match.params.userId
            }, {t: jwt.token}, user).then((data) => {
              if (data.error) {
              } else {
              }
            })
      }
      // Redirect to plant collection
      <Redirect to={'/user/' + match.params.userId+'/myPLants'}/>
  }

  /** Helper fucntion to update stats on plants */
  function updateStatsAdd(newplantName){
    // If the user doesn't have stats, create empty stats
    if(user.stats.plants == undefined){
      user.stats.plants = {};
    }
    // Check if the user already have this plant type or should be created
        let repeated = user.stats.plants[newplantName] == undefined;
        if(!repeated){   
          user.stats.plants[newplantName]++;        
        }else{        
          user.stats.plants[newplantName] = 1;        
        }      
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
  
/** Helper function to update the text value on slide change */
  function setDays(){
      const days = document.getElementById('daysSlider').childNodes[2].value;
      document.getElementById('days').innerHTML = 'Every ' + days + ' days.';

  }

// --------------------Not in function (future functionality)
/** Helper function to search plant on api */
  async function searchPlant (){

     const plantSearched = document.getElementById("searchPlant").value;
    try {
        let response = await fetch('https://trefle.io/api/v1/plants/search?token=' + tokenPlants +'&q=calathea', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + "o-Ws9k8hyeZqn5_pyOKgFPC1zgfz9qESr0qHxOwnNEw",
            'Content-Security-Policy': 'connect-src https://trefle.io/api'
          }
         
        })
        const json = await response.json();       
    } catch(err) {
        console.log(err);
    }

  } 


    read({
      userId: match.params.userId
      }, {t: jwt.token}, signal).then((data) => {
        if (data && data.error) {
          setRedirectToSignin(true)
        } else {
          setUser(data)
        }
    })
  
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
  
    setWarningPosition();  

    return (<div>
              <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>New Plant </Typography>

                    <TextField id="searchPlant" label="Plant Unique Name" className={classes.textField} margin="normal"/><br/>
                    <TextField id="plantType" type="text" label="Plant Type" className={classes.textField}  margin="normal"/><br/>

                    <Typography variant="h6"  className={classes.textField} style={{display:"inline-block", width:'20%'}}>   Watering rate:     </Typography>
                    <Typography variant="h6"  id='days' className={classes.textField} style={{display:"inline-block",width:'20%'}}>  Every 10 days</Typography>

                    <Slider  defaultValue={10} onMouseUp={setDays} id='daysSlider'  style={{width:"50%", margin:"15px auto", display:'block', color:"#77BB93"}} valueLabelDisplay="auto"  step={4} min={2} max={30}/>
                    
                    <Typography variant="h6"  className={classes.textField} style={{display:"inline-block"}}>    Receive Notifications:     </Typography>

                    <Checkbox  style={{color:"#77BB93"}} id="notify" label="plantLover"  />
                    <br/>             
                    {
                        values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}</Typography>)
                    }
                </CardContent>
                
                <CardActions>
                  <Button color="primary" variant="contained" onClick={addPlant} className={classes.submit}>Add</Button>
                </CardActions>
                
              </Card>
              
              {/** Do Not press warning */}
              <div id='norPress' style={{position:'fixed', bottom:position.bottom, right:position.right, left:position.left, top: position.top, zIndex:'200'}} onClick={() => {doPress()}}>
              <Avatar title=' My Plants' style={{height:'40px', width:'40px', margin:'10px auto', backgroundColor:'#e46057'}}>
                <img style={{height:"25px", color:"#fff", margin:'10px'}}src={Warning}/>
              </Avatar>          
              <Typography variant="body1">DO NOT PRESS </Typography>
              </div>
              
            </div>)
}