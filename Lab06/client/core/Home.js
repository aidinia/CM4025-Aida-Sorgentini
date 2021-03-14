import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import video from './../assets/watering.gif'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar'
import MyPlants from './../assets/images/svg/009-plant.svg'
import Calendar from './../assets/images/svg/002-calendar.svg'
import NewPlant from'./../assets/images/svg/001-plant-pot.svg'
// Styles
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '70%',
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 700
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#3f4771'
    } 
  }
}))

// Page
export default function Home(){
  const classes = useStyles()
    return (
      <Grid container className={classes.root} >
        <Grid item xs={12}>
          <Typography variant="body2" component="p" className={classes.credit} color="textSecondary"> Video by Akshay Mane from Pexels </Typography>

          <Grid container justify="center" style={{backgroundImage: 'url('+ video + ')', height:'600px', backgroundSize: 'cover'}}>
            
              <Grid key={0} item style={{minWidth:'30%', marginTop:'22%', minHeight:'20%'}}>
                <Card className={classes.card} elevation={4}>
                  <Avatar title=' My Plants' style={{height:'60px', width:'60px', margin:'20px auto', backgroundColor:'#d5f494'}}>               
                    <img style={{height:"40px", color:"#fff", margin:'10px auto'}} src={MyPlants}/>
                  </Avatar>
                  <Typography variant="h6" className={classes.credit} color="textSecondary" style={{textAlign:'center', border:'none', marginBottom:'10px'}}>Manage your colecction </Typography>
                  <Typography variant="body1"  className={classes.credit} color="textSecondary" style={{textAlign:'center', border:'none'}}> * Add and delete plants from your collections </Typography>
                  <Typography variant="body1"  className={classes.credit} color="textSecondary" style={{textAlign:'center', border:'none'}}> * Keep track of your plants conditions </Typography>
                  <Typography variant="body1"  className={classes.credit} color="textSecondary" style={{textAlign:'center', border:'none', marginBottom:'25px'}}> * Get recomendations</Typography>

                </Card>
              </Grid>

              <Grid key={0} item style={{minWidth:'30%', marginTop:'22%', minHeight:'20%'}}>
                <Card className={classes.card} elevation={4}>
                  <Avatar title=' My Plants' style={{height:'60px', width:'60px', margin:'20px auto', backgroundColor:'#d5f494'}}>               
                    <img style={{height:"40px", color:"#fff", margin:'10px auto'}} src={Calendar}/>
                  </Avatar>
                  <Typography variant="h6" component="p" className={classes.credit} color="textSecondary" style={{textAlign:'center',  border:'none', marginBottom:'10px'}}>Get reminders </Typography>
                  <Typography variant="body1"  className={classes.credit} color="textSecondary" style={{textAlign:'center', border:'none'}}> * Easily see your watering dates </Typography>
                  <Typography variant="body1"  className={classes.credit} color="textSecondary" style={{textAlign:'center', border:'none'}}> * Manage your calendar </Typography>
                  <Typography variant="body1"  className={classes.credit} color="textSecondary" style={{textAlign:'center', border:'none', marginBottom:'25px'}}> * Set up notifications to never miss a date</Typography>

                </Card>
              </Grid>

              <Grid key={0} item style={{minWidth:'30%', marginTop:'22%', minHeight:'20%'}}>
                <Card className={classes.card} elevation={4}>
                  <Avatar title=' My Plants' style={{height:'60px', width:'60px', margin:'20px auto', backgroundColor:'#d5f494'}}>               
                    <img style={{height:"40px", color:"#fff", margin:'10px auto'}} src={NewPlant}/>
                  </Avatar>
                  <Typography variant="h6" component="p" className={classes.credit} color="textSecondary" style={{textAlign:'center',border:'none', marginBottom:'10px'}}>Browse new spieces </Typography>
                  <Typography variant="body1"  className={classes.credit} color="textSecondary" style={{textAlign:'center', border:'none'}}> * Plants database </Typography>
                  <Typography variant="body1"  className={classes.credit} color="textSecondary" style={{textAlign:'center', border:'none'}}> * All the information about your plants </Typography>
                  <Typography variant="body1"  className={classes.credit} color="textSecondary" style={{textAlign:'center', border:'none', marginBottom:'25px'}}> * Find new plants to add in your collection</Typography>

                </Card>
              </Grid>
              
            </Grid>

          </Grid>
        </Grid>
        
    )
}

