$(document).ready(function(){
		
	var key = "fe642b990e8815e6643f09e89cb7ecc6";
	var target = "http://api.openweathermap.org/data/2.5/weather";
	
	
	//	Get users location
	if ("geolocation" in navigator) {
  /* geolocation is available */
		navigator.geolocation.getCurrentPosition(function(position) {
			//	Call to get wehather for the user
			var url = target + "?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + key + "&units=metric";
			$.ajax({
				url: url,
				type: "GET",
				dataType: "json",
				success: function(data){
					showWeather(data);
				},
				error: function(data){
					
				}
			});	
			
		});
	} else {
		console.log("Nah");
		/* geolocation IS NOT available */
	}
	
	
	function showWeather(data){
		//	Get important weather data
		console.log(data);
		var city = data.name;
		var curTemp = data.main.temp;
		var minTemp = data.main.temp_min;
		var maxTemp = data.main.temp_max;
		var humidity = data.main.humidity;
		var sunrise = data.sys.sunrise;
		var sunset = data.sys.sunset;
		var sunRiseDate = new Date(sunrise);
		var sunSetDate = new Date(sunset);
		
		var weather = data.weather[0].description;
		var weatherID = data.weather[0].id;
		var windSpeed = data.wind.speed;
		
		document.getElementById("weather-city").innerHTML = city;
		document.getElementById("weather-current-temperature").innerHTML = curTemp + "c";
		document.getElementById("weather-min-temperature").innerHTML = "Min " + minTemp + "c";
		document.getElementById("weather-max-temperature").innerHTML = "Max " + maxTemp + "c";
		document.getElementById("weather-description").innerHTML = weather;
		document.getElementById("weather-wind").innerHTML = "Wind " + windSpeed + " mps";
		document.getElementById("weather-humidity").innerHTML = "Humidity " + humidity + "%";
		document.getElementById("weather-sunrise").innerHTML = "Sunrise " + sunRiseDate.toLocaleTimeString();
		document.getElementById("weather-sunset").innerHTML = "Sunset " + sunSetDate.toLocaleTimeString();
		
		if(weatherID >= 200 && weatherID <= 232){
			//Thunder
			document.getElementById("weather-icon").setAttribute("class", "wi wi-storm-showers");
		}else if((weatherID >= 300 && weatherID <= 321) || (weatherID >= 500 && weatherID <= 531)){
			//rain
			document.getElementById("weather-icon").setAttribute("class", "wi wi-rain icon");
		}else if(weatherID >= 600 && weatherID <= 622){
			//Snow
			document.getElementById("weather-icon").setAttribute("class", "wi wi-day-snow icon");
		}else if(weatherID >= 701 && weatherID <= 781){
			//Foggy
			document.getElementById("weather-icon").setAttribute("class", "wi wi-fog icon");
		}else if(weatherID >= 801 && weatherID <= 804){
			//cloudy
			document.getElementById("weather-icon").setAttribute("class", "wi wi-cloudy icon");
		}else{
			//	Clear
			document.getElementById("weather-icon").setAttribute("class", "wi wi-day-sunny icon");
		}
		
		
		//	Display data
		
		
		
		
	}
	
	
	
	
});