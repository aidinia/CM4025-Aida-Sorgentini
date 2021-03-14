import React, {useState, useEffect} from 'react'
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
import {read} from './api-user.js'
import {update} from './api-user.js'
import Water from './../assets/images/svg/005-drops.svg'
import Delete from './../assets/images/svg/delete.svg'
import {doNotPress} from './doNotPress'
import Warning from'./../assets/images/svg/warning.svg'
import auth from './../auth/auth-helper'
import EcoIcon from '@material-ui/icons/Eco';


// Styles
const useStyles = makeStyles(theme => ({
 root: theme.mixins.gutters({
 padding: theme.spacing(1),
 margin: theme.spacing(5)
 }),
 title: {
 margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
 color: '#5F6553'
 },
waterOk:{
  color: 'green'
},
waterMid:{
  color:'yellow'
},
waterNow:{
  color:'red'
}
}))


export default function Plants({ match }) {

    const classes = useStyles()
    const [plants, setPlants] = useState([])
    const [user, setUser] = useState([])
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()

    // Position of warning
    let position = {
      top : '100px',
      left :'25px',
      bottom : '',
      right : ''
    } 

    /** Helper function to sort plants by watering date */
    function sortByDate( a, b ) {
        if ( a.nextWater < b.nextWater ){
          return -1;
        }
        if ( a.nextWater > b.nextWater ){
          return 1;
        }
        return 0;
      }

/**Helper function to mark plant as watered and send informatino to api */
      function markAsWatered(plantNumber){
        plants[plantNumber].lastWater = new Date();
        let newWaterDate = new Date();
        newWaterDate.setTime(plants[plantNumber].lastWater.getTime() +  plants[plantNumber].waterRate * 24 * 60 * 60 * 1000);
        plants[plantNumber].nextWater = newWaterDate;

        user.plants = plants;
  
        update({
          userId: match.params.userId
        }, {t: jwt.token}, user).then((data) => {
          if (data.error) {
          } else {
          }
        })
        const allPlants = plants.sort(sortByDate);
        setPlants(allPlants);
        window.location.reload(false);

      }

      /** Helper function to delete plant and update api + Add deleted plant to the stats */
      function deletePlant(plantNumber){  

        
        plants.splice(plantNumber, 1);
        user.plants = plants;

        user.stats.death++;
        update({
          userId: match.params.userId
        }, {t: jwt.token}, user).then((data) => {
          if (data.error) {
          } else {
            window.location.reload(false);

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
     

    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      // Read user details from api
      read({
        userId: match.params.userId
      }, {t: jwt.token}, signal).then((data) => {
        if (data && data.error) {
          setRedirectToSignin(true)
        } else {

          setUser(data);
            const allPlants = data.plants.sort(sortByDate);
            setPlants(allPlants);

        }
      })

     return function cleanup(){
        abortController.abort()
      }


  
    }, [])

    setWarningPosition();
 return (   <div>
              <Paper className={classes.root} elevation={4}>
                <Typography variant="h6" className={classes.title}> My Plants </Typography>
                
                <List dense> {/** Plants list loop */}
                      { 
                        plants.map((item, i)=>{
                          const now = new Date();
                          const waterDate = new Date(item.nextWater);
                          let border = 'green';
                         
                          {/** Select border colour depending on how much time left to next water day */}
                          if(waterDate.getTime()/100000- now.getTime()/100000 > 7000){
                            border = 'solid 10px green';
                          }else if(waterDate.getTime()/100000- now.getTime()/100000 > 4000){
                            border = 'solid 10px yellow';
                          }else{
                            border = 'solid 10px red';
                          }
                        
                          return   <div>
                                      <Paper className={classes.root} elevation={4} style={{borderLeft: border}}>
                                        <ListItem key={15}>
                                          <ListItemAvatar>
                                              <Avatar>
                                                <EcoIcon/>
                                              </Avatar>
                                          </ListItemAvatar>
                                          <div>
                                          <Typography variant="h4" style={{width:'100%', margin:'0px', display:'block'}} className={classes.title}>{item.plantName}</Typography> 
                                          <Typography variant="body1" style={{width:'100%', margin:'0px', display:'block'}} className={classes.title}>{item.plantType}</Typography> 
                                          </div>
                                          <div style={{width:'50%', margin:'auto'}}>
                                            <ListItemText primary={'Next Water Day: '}/>
                                            <ListItemText style={{fontSize:'1.3em'}}primary={ waterDate.toDateString()}/>
                                          </div>
                                          <IconButton title={"Mark as watered today"}  onClick={() => {markAsWatered(i)}}>
                                            <img src={Water} style={{width:'25px'}} />
                                          </IconButton>
                                          <IconButton  title={"Delete plant from collection"}  onClick={() => {deletePlant(i)}} style={{color:"#77BB93"}}>
                                          <img src={Delete} style={{width:'25px'}} />

                                          </IconButton>

                                        </ListItem>
                                      </Paper>                                      
                                      <ListItemSecondaryAction>
                                            <IconButton>
                                            </IconButton>
                                      </ListItemSecondaryAction>
                                </div>
                            }) /** End of plants list loop */
                      }
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