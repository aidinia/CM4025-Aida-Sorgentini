import React from 'react'
import {Route, Switch} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Home from './core/Home'
import Users from './user/Users'
import Register from './user/Signup'
import Login from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import AddPlant from './user/AddPlant'
import MyPlants from './user/Plants'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Menu from './core/Menu'
import Submenu from './core/Submenu'
import Ants2 from './assets/images/ants.gif'
import Ants3 from './assets/images/tenorants.gif'


const useStyles = makeStyles(theme => ({
  
    antStyle: {
        width:'100%',
        height:'100%', 
        backgroundRepeat: 'no-repeat',
        position:'absolute', 
        top:'0px', left:'0px', 
        zIndex:'10000', 
        display:'none', 
        opacity:'0.5', 
        backgroundImage:'url('+Ants3+')',
        backgroundSize: 'cover'
    }
   }))




const MainRouter = () => {
    const classes = useStyles()

 return (<div>
     <div className={classes.antStyle} id='ants'></div>
     <Menu/>
     <Submenu />
 <Switch>
 <Route exact path="/" component={Home}/>
 <Route exact path="/users/:userId" component={Users}/>
 <Route path="/signup" component={Register}/>
 <Route path="/user/:userId/addplant" component={AddPlant}/>
  <Route path="/signin" component={Login}/>
  <Route path="/user/:userId/myplants" component={MyPlants}/>
 <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
 <Route path="/user/:userId" component={Profile}/>

 </Switch>
 </div>)
}
export default MainRouter