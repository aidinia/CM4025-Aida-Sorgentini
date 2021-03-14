import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Logo from './../assets/images/png/004-calendar-1.png'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import Avatar from '@material-ui/core/Avatar'
import {Link, withRouter} from 'react-router-dom'
import { Height } from '@material-ui/icons'

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return {color: '#77BB93', fontWeight:"900"}
  else
    return {color: '#5f6553'}
}
const Menu = withRouter(({history}) => (

  <AppBar position="static">
    <Toolbar>
    <Link to="/">
    <img style={{height:"50px", color:"#5F6553"}}src={Logo}/>
      </Link>
      <Typography variant="h6" color="inherit">
        WaterMe
      </Typography>
      <div style={{ marginLeft:'70%'}}>
     
      
      {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up
            </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In
            </Button>
          </Link>
        </span>)
      }
     
      {
        auth.isAuthenticated() && (<span>
         
          <Button color="inherit" onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}>Sign out</Button>
        </span>)
      }
      </div>
    </Toolbar>
  </AppBar>
 
  
))

export default Menu

//icons <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div><div>Icons made by <a href="https://www.flaticon.com/authors/phatplus" title="phatplus">phatplus</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>