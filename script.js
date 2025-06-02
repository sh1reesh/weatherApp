// const apiKey = '45519557dab67719841a7f21bff85f20'; // Replace with your actual OpenWeather API key

// function getWeather() {
//   const city = document.getElementById('cityInput').value.trim();
//   if (!city) return alert("Please enter a city name.");

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//   fetch(url)
//     .then(response => {
//       if (!response.ok) throw new Error("City not found");
//       return response.json();
//     })
//     .then(data => {
//       document.getElementById('weatherBox').classList.remove('hidden');
//       document.getElementById('cityName').textContent = data.name;
//       document.getElementById('description').textContent = data.weather[0].description;
//       document.getElementById('temperature').textContent = `${data.main.temp} °C`;

//       const iconCode = data.weather[0].icon;
//       document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

//       const mainWeather = data.weather[0].main.toLowerCase();
//       let backgroundUrl = '';
//       if (mainWeather.includes('cloud')) {
//         backgroundUrl = 'https://i.imgur.com/DO0YzsY.jpg';
//       } else if (mainWeather.includes('rain')) {
//         backgroundUrl = 'https://i.imgur.com/UwDg2aK.jpg';
//       } else if (mainWeather.includes('clear')) {
//         backgroundUrl = 'https://i.imgur.com/rL7sVM5.jpg';
//       } else {
//         backgroundUrl = 'https://i.imgur.com/xS6pYyT.jpg';
//       }
//       document.body.style.backgroundImage = `url('${backgroundUrl}')`;
//     })
//     .catch(error => {
//       alert("Error: " + error.message);
//     });
// }

function getWeather() {
    const apiKey = '45519557dab67719841a7f21bff85f20';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}