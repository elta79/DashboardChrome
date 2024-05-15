// background image api

const weatherAPIKey = '1d473472092c5f97528301c4332a0cd4'
const apiNinjaKey = 'vTEw6WgGoJY0qsHM33LbEw==P5ndNB9hEGrcTX3v'


fetch("https://api.unsplash.com/photos/random?client_id=Kwlcl4AbqcwhEZlBh7Q-c40_5LraCrubdQid_jWQl64&orientation=landscape&query=nature")
    .then(res => {
        if(!res.ok){
            throw new Error('Network response not okay - unsplash api')
        }
        return res.json()
    })
    .then(data => {        
        document.body.style.backgroundImage = `url(${data.urls.full})`
    })
    .catch(error => {
        console.error('Problem with fetch operation', error)
    })


// geolocation api & local weather api
if("geolocation" in navigator){
    console.log("Geo works")
    
}else{
    console.log("NO GEO")
}
navigator.geolocation.getCurrentPosition((position)=>{
    // console.log(position)
    // console.log('lat', position.coords.latitude)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherAPIKey}&units=imperial`)
    .then (res => {
        if (!res.ok){
            throw new Error('Network response not okay - weather api')
        }
        return res.json()
    })
    .then (data => {
        
        document.getElementById("location").innerText = `${data.name}`
        
        const icon = data.weather[0].icon
        document.getElementById("weather-icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">` 
        
        document.getElementById("temp").innerText = `${Math.floor(data.main.temp)}º`
        
        document.getElementById("weather-description").innerText = `${data.weather[0].description}`
    })
    .catch(error => {
        console.error('Problem with fetch operation', error)
    })
})

// facts API
fetch('https://api.api-ninjas.com/v1/facts', {
    method: 'GET',
    headers: {
        'X-Api-Key': `${apiNinjaKey}`
    }
})
    .then (res => {
        if (!res.ok){
            throw new Error('Network response not okay - facts api')
        }
        return res.json()
    })
    .then (data => {
        console.log(data)
        document.getElementById("facts").innerText = `${data[0].fact}`
    })
    .catch(error => {
        console.error('Problem with fetch operation', error)
    })




// current Time

function updateTime(){
    let time = new Date()
    let am_pm = time.toLocaleTimeString('en-US', {timeStyle: 'short'})
    document.getElementById("time").textContent = `${am_pm}`
    console.log(am_pm)
}


setInterval(updateTime, 1000)


// riddle API
fetch('https://api.api-ninjas.com/v1/riddles', {
    method: 'GET',
    headers: {
        'X-Api-Key': `${apiNinjaKey}`
    }
})
.then(res =>{
    if(!res.ok){
        throw new Error('Network response not okay - riddles api')
    }
    return res.json()
})
.then(data => {
    const riddleBtn = document.getElementById('riddle-button')
    const riddle = document.getElementById('riddle')
    riddle.textContent = `${data[0].question}`
    riddleBtn.addEventListener("click", ()=>{
        if(riddleBtn.innerText === 'Give up?') {
            riddle.textContent = `${data[0].answer}`
            riddleBtn.innerText = 'Again?'
        }else{
            riddle.textContent = `${data[0].question}`
            riddleBtn.innerText = 'Give up?'
        }  
    })
})
.catch(error => {
    console.error('Problem with fetch operation', error)
})

