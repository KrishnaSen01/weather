const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (city === "") {
    alert("City name cannot be empty!");
    return;
  }

  const response = await fetch(`/api/weather?city=${city}`);
  let data = await response.json();
  
  if(response.status === 500){
    alert("Internet Service Error!" || data.error);
  }
  else if (data.cod !== 200) {
    alert(data.message || "City Data Not Found!");
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
  else {
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/hr";

    const cloud = data.weather[0].main;
    weatherIcon.src = `images/${cloud.toLowerCase()}.png`;

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
