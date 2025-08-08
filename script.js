document.getElementById("btn-submit").addEventListener("click", searchCity)

async function searchCity(event){
    event.preventDefault()

    const api_key = ""
    let api_url = ""

    const user_input = document.getElementById("input-city").value.split(", ")
    if (user_input.length > 1){
        api_url = `https://api.openweathermap.org/data/2.5/weather?q=${user_input[0]},${user_input[1]}&appid=${api_key}`;
    }
    else{
        api_url = `https://api.openweathermap.org/data/2.5/weather?q=${user_input}&appid=${api_key}`;
    }

    const response = await (await fetch(api_url)).json()
    const {name: city, main:{feels_like, humidity, temp}, sys:{country}, weather: [{description}]} = response
    
    displayInfo(city, country, temp, feels_like, humidity)
}

function displayInfo(city, country, temp, feels_like, humidity){
    const name_display = document.createElement("h1")
    name_display.textContent = `${city}, ${country}`

    const descr_display = document.createElement("h2")
    descr_display.textContent = `Ensolarado`

    const temp_info = document.createElement("div")
    temp_info.classList.add("temp-info")

    const sad = document.createElement("img")
    sad.src = "img/sun.png"
    temp_info.append(sad)

    const temp_display = document.createElement("h2")
    temp_display.textContent = `${(temp - 273.15).toFixed(1)}°C`
    temp_info.append(temp_display)

    const feels_display = document.createElement("h3")
    feels_display.textContent = `Sens. Tér.: ${(feels_like - 273.15).toFixed(1)}°C`
    temp_info.append(feels_display)

    const humidity_display = document.createElement("h2")
    humidity_display.textContent = `Humidade: ${humidity}%`

    const map = document.createElement("iframe")
    map.src = `https://www.google.com/maps?q=${encodeURIComponent(city + ", " + country)}&output=embed`

    const info_display = document.getElementsByClassName("info-display")[0]
    info_display.innerHTML = ""
    info_display.append(name_display)
    info_display.append(descr_display)
    info_display.append(temp_info)
    info_display.append(humidity_display)
    info_display.append(map)
}