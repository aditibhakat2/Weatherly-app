const apiKey = "ae1435affb10416fa0c204740260904";

async function getWeather() {
  const location = document.getElementById("locationInput").value;

  if (!location) return alert("Enter a city!");

  const loader = document.getElementById("loader");

  loader.classList.remove("hidden");

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      alert("City not found!");
      loader.classList.add("hidden");
      return;
    }

    // Hide welcome message
    document.getElementById("welcomeMsg").style.display = "none";

    // Set data
    document.getElementById("cityName").innerText = data.location.name;
    document.getElementById("temp").innerText = `${data.current.temp_c}°C`;
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("humidity").innerText = `💧 ${data.current.humidity}%`;
    document.getElementById("wind").innerText = `🌬️ ${data.current.wind_kph} km/h`;

    document.getElementById("icon").src = "https:" + data.current.condition.icon;

    changeBackground(data.current.condition.text.toLowerCase());

    loader.classList.add("hidden");

  } catch (err) {
    console.error(err);
  }
}

/* Enter key support */
document.getElementById("locationInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

/* Background change */
function changeBackground(condition) {
  document.body.className = "";

  if (condition.includes("rain")) {
    document.body.classList.add("rain");
  } else if (condition.includes("cloud")) {
    document.body.classList.add("cloud");
  } else {
    document.body.classList.add("clear");
  }
}