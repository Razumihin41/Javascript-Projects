const url = "https://api.openweathermap.org/data/2.5/";
const key = "d4704f83b481ed0d67dd1394c7002d1e";


const setKeyPress = (e) => {
    if(e.keyCode == "13") {
        getResult(searchBar.value)
        searchBar.value = ""
    }
};
const setClick = () => {
    getResult(searchBar.value)
    searchBar.value = ""
};
const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
    fetch(query)
    .then(weather => {
        return weather.json()
    })
    .then(displayResult)
}

const displayResult = (result) => {
    const city = document.querySelector(".city");
    const temp = document.querySelector(".temp");
    const desc = document.querySelector(".desc");
    const minmax = document.querySelector(".minmax")
    console.log(result)
    city.innerHTML = `${result.name}, ${result.sys.country}`
    temp.innerHTML = `${Math.round(result.main.temp)} °C`
    desc.innerHTML = result.weather[0].description
    minmax.innerHTML = `${Math.round(result.main.temp_min)} °C / ${Math.round(result.main.temp_max)} °C`
}

const searchBar = document.querySelector("#searchBar");
const clickBtn = document.querySelector(".btn");
searchBar.addEventListener('keypress', setKeyPress);
clickBtn.addEventListener('click', setClick);