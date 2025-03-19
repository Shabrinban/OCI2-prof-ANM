const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key

const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('city');
const weatherInfoDiv = document.getElementById('weatherInfo');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
});

async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.cod === '404') {
            alert('City not found!');
        } else {
            displayWeatherData(data);
        }
    } catch (error) {
        alert('Error fetching data!');
        console.error(error);
    }
}

function displayWeatherData(data) {
    const { name, main, weather, wind } = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];
    const { speed } = wind;

    weatherInfoDiv.style.display = 'block';
    weatherInfoDiv.innerHTML = `
        <h3>Weather in ${name}</h3>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" />
        <p>Temperature: ${temp}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${speed} m/s</p>
        <p>Description: ${description}</p>
    `;
}
