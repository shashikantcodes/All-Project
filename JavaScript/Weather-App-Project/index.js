const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const UserContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const SearchForm = document.querySelector("[data-searchForm]");
const LoadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const errorContainer = document.querySelector(".error-container");

// Initially variables need??
let oldTab = userTab;
const API_KEY = "168771779c71f3d64106d8a88376808a";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if (newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if (!SearchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");  // ✅ यहाँ जोड़ा
            SearchForm.classList.add("active");
        } else {
            SearchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");  // ✅ यहाँ जोड़ा
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => switchTab(userTab));
searchTab.addEventListener("click", () => switchTab(searchTab));

// Check if coordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantAccessContainer.classList.add("active");
    } else {
        grantAccessContainer.classList.remove("active");  // ✅ यहाँ जोड़ा
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    grantAccessContainer.classList.remove("active");  // ✅ यहाँ जोड़ा
    LoadingScreen.classList.add("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        LoadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        LoadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");

        grantAccessContainer.classList.add("active"); // ✅ अगर error हो तो फिर से दिखाएगा
    }
}

function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryicon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const WeatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-clouidiness]");

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

    desc.innerText = weatherInfo?.weather?.[0]?.description;
    WeatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;
}

// Grant Location वाले बटन को फेच करना
const grantAccessButton = document.querySelector("[data-grantAccess]");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("You are not in location");
    }
}

// ✅ `showPosition()` को सही किया
function showPosition(position) {  
    const userCoordinates = {
        lat: position.coords.latitude,  // ✅ अब position सही से मिल रही
        lon: position.coords.longitude, 
    };

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    grantAccessContainer.classList.remove("active");  // ✅ अब UI अपडेट होगा
    fetchUserWeatherInfo(userCoordinates);
}

grantAccessButton.addEventListener("click", getLocation);

// Form को फेच करना
const searchInput = document.querySelector("[data-searchInput]");

SearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if (cityName === "") return;
    else {
        fetchSearchWeatherInfo(cityName);
    }
});

async function fetchSearchWeatherInfo(city) {
    LoadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        LoadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {
        console.error("Weather API Error:", error);
        LoadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");

        grantAccessContainer.classList.add("active"); // ✅ एरर पर फिर से दिखाएगा

        if (error.message.includes("404")) {
            errorContainer.innerText = "❌ शहर नहीं मिला! कृपया सही नाम डालें।";
        } else if (error.message.includes("401")) {
            errorContainer.innerText = "🔑 API Key गलत है! कृपया सही API Key इस्तेमाल करें।";
        } else {
            errorContainer.innerText = "⚠️ कुछ गड़बड़ हो गई! कृपया फिर से कोशिश करें।";
        }
    }
}
