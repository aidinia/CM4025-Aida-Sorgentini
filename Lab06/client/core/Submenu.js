import React, {useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Logo from './../assets/images/svg/004-calendar-1.svg'
import MyPlants from './../assets/images/svg/009-plant.svg'
import Settings from './../assets/images/svg/012-ecology-and-environment.svg'
import AddPlant from'./../assets/images/svg/icon plant.svg'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import Avatar from '@material-ui/core/Avatar'
import {Link, withRouter} from 'react-router-dom'
import { Height } from '@material-ui/icons'
import {read} from './../user/api-user.js'



const Submenu =  withRouter(({match}) => {  
 
// Only show the subMenu if the user is logged in
   return auth.isAuthenticated() && (
      <div>
        <Paper style={{width:'50%', margin:'16px auto', alignItems:'center',display: 'flex', justifyContent: 'center'}}>
          <div style={{display:'inline-block', margin:'27px auto'}}>
              <Avatar title=' My Plants' style={{height:'60px', width:'60px', margin:'10px auto', backgroundColor:'#d5f494'}}>
                <Link to={"/user/" + auth.isAuthenticated().user._id+"/myPLants"}>
                  <img style={{height:"40px", color:"#fff", margin:'10px auto'}} src={MyPlants}/>
                </Link>
              </Avatar>
              <Typography variant="h6">My Plants   </Typography>
          </div>

          <div style={{display:'inline-block', margin:'27px auto'}}>
            <Avatar title=' My Plants' style={{height:'60px', width:'60px', margin:'10px auto', backgroundColor:'#d5f494'}}>
              <Link to={"/user/" + auth.isAuthenticated().user._id +"/addplant"}>
                <img style={{height:"40px", color:"#fff", margin:'10px'}} src={AddPlant}/>
              </Link>
            </Avatar>
            <Typography variant="h6">Add Plant </Typography>
          </div>

          <div style={{display:'inline-block', margin:'27px auto'}}>
            <Avatar title=' My Plants' style={{height:'60px', width:'60px', margin:'10px auto', backgroundColor:'#d5f494'}}>
            <Link to={'/user/' + auth.isAuthenticated().user._id}>
            <img style={{height:"40px", color:"#fff", margin:'10px'}}src={Settings}/>
            </Link>
            </Avatar>  
            <Typography variant="h6">My Profile</Typography>
          </div>

      

        </Paper>
      </div>
      )


})
export default Submenu
