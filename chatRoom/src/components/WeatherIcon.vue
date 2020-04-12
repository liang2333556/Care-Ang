<template>
  <div>
    <div v-if="icon === 'clear-day'" ><img class="img" src="../assets/icons/weather/clear_day.svg"  width="30px" height="30px"></div>
    <div v-if="icon === 'clear-night'"><img class="img" src="../assets/icons/weather/clear_night.svg"width="30px" height="30px"></div>
    <div v-if="icon === 'cloudy'"><img class="img" src="../assets/icons/weather/cloudy.svg"width="30px" height="30px"></div>
    <div v-if="icon === 'partly-cloudy-day'"><img class="img" src="../assets/icons/weather/partly_cloudy_day.svg"width="30px" height="30px"></div>
    <div v-if="icon === 'partly-cloudy-night'"><img class="img"  src="../assets/icons/weather/partly_cloudy_night.svg"width="30px" height="30px"></div>
    <div v-if="icon === 'rain'"><img class="img" src="../assets/icons/weather/rain.svg"width="30px" height="30px"></div>
    <div v-if="icon === 'sleet'"><img class="img" src="../assets/icons/weather/sleet.svg"width="30px" height="30px"></div>
    <div v-if="icon === 'snow'"><img class="img" src="../assets/icons/weather/snow.svg"width="30px" height="30px"></div>
    <div v-if="icon === 'wind'"><img class="img" src="../assets/icons/weather/wind.svg"width="30px" height="30px"></div>
  </div>
</template>

<script>
  // import WeatherIconClearDay from '../assets/icons/weather/clear_day.svg'
  // import WeatherIconClearNight from '../assets/icons/weather/clear_night.svg'
  // import WeatherIconCloudy from '../assets/icons/weather/cloudy.svg'
  // import WeatherIconPartlyCloudyDay from '../assets/icons/weather/partly_cloudy_day.svg'
  // import WeatherIconPartlyCloudyNight from '../assets/icons/weather/partly_cloudy_night.svg'
  // import WeatherIconRain from '../assets/icons/weather/rain.svg'
  // import WeatherIconSleet from '../assets/icons/weather/sleet.svg'
  // import WeatherIconSnow from '../assets/icons/weather/snow.svg'
  // import WeatherIconWind from '../assets/icons/weather/wind.svg'

  export default {
    name: 'weatherIcon',
    props: ['icon'],
    components: {
      // WeatherIconClearDay,
      // WeatherIconClearNight,
      // WeatherIconCloudy,
      // WeatherIconPartlyCloudyDay,
      // WeatherIconPartlyCloudyNight,
      // WeatherIconRain,
      // WeatherIconSleet,
      // WeatherIconSnow,
      // WeatherIconWind
    }
  }
</script>
