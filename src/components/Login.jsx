import React from 'react'
import axios from 'axios';
import { useState } from 'react';
export const Login = () => {
   const [source ,setsource] = useState('');
   const [registered,setregistered] = useState(true)
    var latitude = 0;
    var longitude = 0;
    var clicked = false ; 
    function getLocation() {
        if (navigator.geolocation) {
          clicked = true;
          navigator.geolocation.getCurrentPosition(showPosition);
        } 
        else{
            console.log(`error with geo`);
        }
      }
    

      async function showPosition(position) {
        latitude= position.coords.latitude ; 
         longitude= position.coords.longitude;
      }

      async function handler(e){
        e.preventDefault();
        let data = {latitude : latitude, longitude:longitude , city:e.target.city.value , apikey : e.target.apikey.value};
        if(e.target.city.value == ""){
          alert("please enter a valid city")
        }
        else{
        const qt = await fetch(
          "https://weatherapi-server-o727.onrender.com/weather" , {
            method: "POST", 
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            body : JSON.stringify(data)
          })
          .then(response => response.json())
          .then(function(data) {
            console.log(data)
            setsource(data);
            setregistered(false);
        })
      }
    }

  
  return (
    <>
    {registered ?
      <div className='box'>
      <form className ="container" onSubmit={handler} >
            <div className="inputs">
            <input type= "text" placeholder = 'enter your APIKEY' id='APIKEY' name="apikey"></input><br></br>
            <input type= "text" placeholder = 'enter the city' id='city' name="city"></input><br></br>
            <button type='submit'>Submit Details</button>
            </div>
            </form>
            
            </div>
           : <div><h1>image based on current weather at the choosen location</h1><img src={source} alt='image'></img></div>}
    </>
  )
}
