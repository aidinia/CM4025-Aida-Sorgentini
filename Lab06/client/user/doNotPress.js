import auth from './../auth/auth-helper'
import React, {useState} from 'react'
import $ from 'jquery'; 
import {update} from './../user/api-user.js'



/** Helper function to gather user actions while video is on */

function  doNotPress(){
    return new Promise(resolve => {
      let actions = [];
      const ants = document.getElementById("ants");
      // Add trackers on handlers
      ants.onmousedown = function(e){
        const button = e.button == 0 ? " Right " : " Left "
        actions.push(button + "click. ");
      }

      window.onkeyup = function(event){
        // Format key to letter
        const key = event.which > 64 && event.which < 123 ? String.fromCharCode(event.which): event.which;
        actions.push(" Keyboard " +  key + ' key. ');
      } 

      // Display video for 5 seconds
      $(ants).fadeIn('slow', function () {
        $(this).delay(5000).fadeOut('slow', function(){ 

          // return after the video is finished  
          resolve(actions);
        });
      });
    });
}

export {
    doNotPress
}
