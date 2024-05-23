 const ApiKey = "be65bebc5193fd5e60ee30de60b13e53";
 const ApiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metricq=";
const searchBox= document.querySelector(".search input");
const searchBtn  = document.querySelector(".search button")
const weatherImg = document.querySelector(".weather-icon");

 async function checkWeather(city){
let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be65bebc5193fd5e60ee30de60b13e53&units=metric`)
if (response.status == 404 ){
  document.querySelector(".error").style.display ="block"
  document.querySelector(".weather").style.display ="none"
    }
    else {
      let data = await response.json();
// const dataArray = Object.values(data)  object l array
console.log(data);
 document.querySelector(".city").innerHTML =data.name;
  document.querySelector(".temp").innerHTML = Math.round( data.main.temp )+"°C";
  document.querySelector(".humidity").innerHTML =data.main.humidity+"%";
  document.querySelector(".wind").innerHTML =data.wind.speed +" km/h";
  if(data.weather[0].main =="Clear"){
    weatherImg.src = "weather-app-img/images/clear.png";
  }
  else if(data.weather[0].main =="Rain"){
    weatherImg.src = "weather-app-img/images/rain.png";
  }
  else if(data.weather[0].main =="Clouds"){
    weatherImg.src = "weather-app-img/images/clouds.png";
  }
  else if(data.weather[0].main =="Drizzle"){
    weatherImg.src = "weather-app-img/images/drizzle.png";
  }
  else if(data.weather[0].main =="Mist"){
    weatherImg.src = "weather-app-img/images/mist.png";
  }
  else if(data.weather[0].main =="Snow"){
    weatherImg.src = "weather-app-img/images/snow.png";
  }
  document.querySelector(".error").style.display ="none"
  document.querySelector(".weather").style.display ="block"
  console.log(data[0])
 }
    }

 searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value)
    document.querySelector(".weather").style.display ="block"
     if(searchBox.value === ""){
       document.querySelector(".city-none").style.display ="block"
       document.querySelector(".weather").style.display ="none"

     }
     else{
      document.querySelector(".city-none").style.display ="none"
      document.querySelector(".error").style.display ="none"
     }
    }
  )
