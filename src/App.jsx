import React, { useState } from 'react'
import { gsap } from "gsap";
import { Axis3DIcon, Search, WavesHorizontal, Wind } from 'lucide-react';
import axios from "axios";
const App = () => {

  const [city, setcity] = useState("");
  const [temp, settemp] = useState("");
  const [cityName, setcityName] = useState("");
  const [speed, setspeed] = useState("");
  const [humidity, sethumidity] = useState("")
  const [description, setdescription] = useState("Enter a city to see the weather.")
  const [main, setmain] = useState("Mist")
  const formSubmited = (e) => {
    e.preventDefault()
    getData();
    setcityName(city)
    setcity("")

  }
  const getData = async () => {

    const name = city;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c10a5e86f3fffaaa5fd4e350081198a6&units=metric`)
      console.log(response)
      settemp(response.data.main.temp)
      setcityName(response.data.name)
      setspeed(response.data.wind.speed)
      sethumidity(response.data.main.humidity)
      setdescription(response.data.weather[0].description)
      setmain(response.data.weather[0].main)
    } catch (error) {
      console.log(error);
    }

  }

  const weatherIcons = {
    Clear: "src/clear.png",
    Clouds: "src/cloudy.png",
    Mist: "src/mist.png",
    Drizzle: "src/drizzle.png",
    Rain: "src/rain.png",
    Thunderstorm: "src/thunder.png",
    Snow: "src/assets/snow.png",

  };


  return (
    <div className='h-screen w-1/1  bg-white/30 backdrop-blur-md  justify-items-center content-center'>
      <div className='w-110 pt-4 pb-20 pl-8 pr-8 flex-col justify-items-center rounded-2xl ' style={{ background: 'linear-gradient(135deg,#00feba,#5b548a)' }}>

        <form action="" className=' flex gap-4 pb-15' onSubmit={(e) => { formSubmited(e) }}>
          <input type="text" placeholder='Enter city name' className='bg-white text-xl p-1.5
         w-80 rounded-3xl' value={city} onChange={(e) => {
              setcity(e.target.value)
            }} />
          <button className="getData" className='h-12 w-12 bg-white  border-2
       border-gray-400 rounded-4xl text-xl justify-items-center  ' ><Search /></button>
        </form>

        <div className='w-full h-45 justify-items-center ' >
          <h2 className='text-2xl text-white font-medium '>"{description}"</h2>
          <div className=' bg-cover translate-y-1'><img src={weatherIcons[main]} style={{ height: 130 }} /></div>
        </div>
        <h1 className='text-6xl font-medium text-white pb-3'>{temp}° c</h1>
        <h2 className='text-4xl text-white font-medium pb-3 capitalize'>{cityName}</h2>
        <div className='flex gap-2 translate-y-5'>
          <div><WavesHorizontal size={55} color='white' /></div>
          <span className='font-medium text-white' ><span className='text-3xl'>{humidity}% </span>Humadity</span>
          <div><Wind size={55} color='white' /></div>
          <span className='font-medium text-white' ><span className='text-3xl'>{speed} mps</span> Wind Spead</span>

        </div>

      </div>
    </div >
  )
}

export default App