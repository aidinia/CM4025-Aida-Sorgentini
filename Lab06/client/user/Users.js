import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import {list, update} from './api-user.js'
import auth from './../auth/auth-helper'
import {Redirect, Link} from 'react-router-dom'
import spark from './../assets/images/sparks.gif'
import reset from './../assets/images/svg/loading.svg'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Styles
const useStyles = makeStyles(theme => ({
 root: theme.mixins.gutters({
 padding: theme.spacing(1),
 margin: theme.spacing(5)
 }),
 title: {
 margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
 color: theme.palette.openTitle,
 margin:'auto',
 textAlign:'center'
 },
 titleNO: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: "#c2f35c",
    margin:'auto',
    textAlign:'center'
    },
}))

export default function Users({match}) {
    const classes = useStyles()
    const [users, setUsers] = useState([])
    const [toHome, setRedirectToHome] = useState(false)
    const jwt = auth.isAuthenticated()
    
    // Formated stats to display
    let stats =  {
        // Amount of times user clicked on warning sign
        loveClicks : 0, 
        hateClicks : 0,
        // Plants owned by every user
        lovePlants : {},
        hatePlants : {},
        // Amount of plats killed by users
        loveDeaths : 0,
        hateDeaths : 0,
        // Actions taken after press on warning sign
        loveActions: [],
        hateActions:[]
    }

// Amount of users on each group, taken from registration "Are you a plant lover"
    let lover = 1;
    let hater = 1;
    
    
    /** Helper function to sort plants by most owned */
    function sortPlants(allPlants){
        var sortable = [];
        for (var eachPlantType in allPlants) {
            sortable.push([eachPlantType, allPlants[eachPlantType]]);
        }

       return sortable.sort(function(a, b) {
            return  b[1] -a[1];
        });

    }

    /** Helper function to loop through users and group stats on required format for display */
    function Stats(users){
        // Loop through users
        users.forEach(user => {

            // If User is plant Lover add stats to plant lover side else to plant hater
            if(user.plantLover){
                 lover++;
                 stats.loveClicks+= user.stats.button.click;
                 stats.loveDeaths+= user.stats.death;

                 // Loop through user plant collection and increase plant amount on stats or create new 
                 for(let plant in user.stats.plants){
                     let plantName = plant.toLowerCase();                
                    stats.lovePlants[plantName] == undefined? stats.lovePlants[plantName] = 1 : stats.lovePlants[plantName]++
                 }
                 // Add actions as a whole
                 stats.loveActions.push(user.stats.button.actions);
            }else{
                hater++;
                stats.hateClicks+= user.stats.button.click;
                stats.hateDeaths+= user.stats.death;
                
                for(let plant in user.stats.plants){
                    let plantName = plant.toLowerCase();
                    stats.hatePlants[plantName] == undefined? stats.hatePlants[plantName] = 1 : stats.hatePlants[plantName]++
                }
                stats.hateActions.push(user.stats.button.actions);
            }
        });

        // Update user in % to calculate page width division 
        stats.lovWidth = (lover*100/(lover+hater)).toFixed(2);
        stats.hateWidth = (hater*100/(lover+hater)).toFixed(2);
     }

     /** Helper functino to reset all stats to 0 */
     function resetStats(){

        users.forEach(user => {
             
            user.stats = {
                plants: {
                    Aloe:0
                },
                button:{
                    click:0,
                    actions:[]
                },
                death:0
             }

             update({
                userId: match.params.userId
              }, {t: jwt.token}, user).then((data) => {
                if (data.error) {
                } else {
                }
              })

         });


     }

     
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        list({userId: match.params.userId}, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                setRedirectToHome(true)
            } else {               
                setUsers(data);
            }
        })

        return function cleanup(){
            abortController.abort()
        }
        

    }, [])

    Stats(users);
  if (toHome) {
      return <Redirect to='/'/>
    }
 return (
    <div>
        {/** Reset stats icon */}
       <div style={{width:'10%'}}  onClick={() => {resetStats()}}>
             <Avatar title='Reset all users stats' style={{height:'60px', width:'60px', margin:'auto', backgroundColor:'#d5f494'}}>
            
            <img src={reset} style={{width:'25px'}} />
            </Avatar>
          <Typography variant="h6" style={{margin:'auto', textAlign:'center'}}> Reset stats </Typography>
       </div>
        <Typography variant="h2" className={classes.title} style={{margin:'auto',width: stats.lovWidth+'%', float:'left', textAlign:'center'}}> Plant Lovers </Typography>
        <Typography variant="h2" className={classes.title} style={{margin:'auto', width:  stats.hateWidth+'%', float:'left',textAlign:'center'}}> Plant Haters</Typography>
            
        <table style={{width:'100%'}}>
            <tbody>
                <tr>
            {/**-------------------------------------------Plants lover stats */}
            <th id='plantLover' style={{height:'100%', width: stats.lovWidth+'%', backgroundColor:'#c2f35c', backgroundImage: 'url('+spark+')'}}>
                <Typography variant="h2" className={classes.title} style={{margin:'auto',textAlign:'center'}}> {stats.lovWidth }% </Typography>
                <Typography variant="h4" className={  classes.title} >  Dead plants: {stats.loveDeaths} </Typography>     
                <Typography variant="h4" className={  classes.title} style={{margin:'10px'}}>  Popular Plants: </Typography>
                {   
                    sortPlants(stats.lovePlants).map((item, i)=>{
                        return <Typography variant="h4" className={ classes.title} > {item[0]} {item[1]} </Typography>
                    })
                }

                <Typography variant="h4" className={ classes.title} style={{margin:'10px'}}> Clicks on "Do not click": {stats.loveClicks} </Typography>
                <Typography variant="h4" className={  classes.title} > Actions on ants:</Typography>
                {               
                    stats.loveActions.map((item, i)=>{
                        return <Typography variant="body1" style={{margin:'10px'}} className={ classes.title} >{item}</Typography>
                    })
                }
            </th>
            
            
            {/**-------------------------------------------Plants hater stats */}
            <th id='plantHater' style={{ height:'100%',   width:  stats.hateWidth+'%', backgroundColor:'#5f6553',backgroundImage: 'url('+spark+')'}}>
                <Typography variant="h2" className={classes.titleNO} style={{margin:'auto',textAlign:'center'}}> { stats.hateWidth}% </Typography>
                <Typography variant="h4" className={  classes.titleNO} >  Dead plants: {stats.hateDeaths} </Typography>
                <Typography variant="h4" className={  classes.titleNO} style={{marginTop:'10px'}}>  Popular Plants: </Typography>
                {
                    sortPlants(stats.hatePlants).map((item, i)=>{
                        return <Typography variant="h4" className={classes.titleNO} > {item[0]} {item[1]} </Typography>
                    })
                }
                <Typography variant="h4" className={ classes.titleNO}> Clicks on "Do not click": {stats.hateClicks}</Typography>
                <Typography variant="h4" className={ classes.titleNO}> Actions on ants:</Typography>
                {
                    stats.hateActions.map((item, i)=>{
                        return <Typography variant="body1" style={{margin:'10px'}} className={ classes.titleNO} >{item}</Typography>
                    })
                }
            </th>
            </tr>
            </tbody>
        </table>
         {/**-------------------------------------------User list*/}
        <div>
            {
            users.map((user, i) => {
                var colour = user.plantLover? '#c2f35c':'#5f6553';
              var plants = [];
             for(const plant in user.stats.plants){
                  plants.push(plant);
              }

                    return     <Accordion>
                                    <AccordionSummary style={{borderLeft:'solid 4px' + colour}} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                                        <ListItemText primary={'User name: ' + user.name}/>                                       
                                        <ListItemText primary={'Stats'}/>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Created: {user.created} {<br/>}
                                            Plants: {plants} {<br/>}
                                            Death : {user.stats.death}{<br/>}
                                            Clicked: {user.stats.button.click}
                                        </Typography>
                                    </AccordionDetails>
                        </Accordion>
                  

               })
             }</div>

    </div>
 )
}


