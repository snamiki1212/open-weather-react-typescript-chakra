// options
export const DEFAULT_CITY_NAME = "vancouver";
const API_KEY = "b2b86779f50b9bf6a8c0808905029f25";

// APIs
const PREFIX_URL = "https://api.openweathermap.org/data/2.5";
const SUFFIX_URL = `&appid=${API_KEY}`;
const getWeatherUrl = (cityName) =>
  PREFIX_URL + `/weather?q=${cityName}` + SUFFIX_URL;

// Weather Object
const selectWeatherMain = (weatherObj) => weatherObj.weather[0].main;
const selectWeatherDescription = (weatherObj) =>
  weatherObj.weather[0].description;
const selectFeelsLike = (weatherObj) => weatherObj.main?.feels_like;
const selectCityName = (weatherObj) => weatherObj.name;

// fetcher
export const searchWeather = async (cityName) => {
  console.log(">> start search weather. | city name:", cityName);
  const url = getWeatherUrl(cityName);

  try {
    const res = await fetch(url);
    if (res.status === 404) {
      alert("maybe, city not found");
      return;
    }
    if (res.status !== 200) {
      throw new Error(res.body);
    }

    // weather obj parser
    const weatherObj = await res.json();
    const cityName = selectCityName(weatherObj);
    const weatherMain = selectWeatherMain(weatherObj);
    const weatherDescription = selectWeatherDescription(weatherObj);
    const feelsLike = selectFeelsLike(weatherObj);

    return {
      cityName,
      weatherMain,
      weatherDescription,
      feelsLike,
    };
  } catch (err) {
    console.error("SOMETHING ERROR HAPPEN: ", err);
  }
};
