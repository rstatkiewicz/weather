window.addEventListener('load', () => {
            let long;
            let lat;
            let temperatureDescription = document.querySelector('.temperature-description');
            let temperatureDegree = document.querySelector('.temperature-degree');
            let locationTimezone = document.querySelector(".location-timezone");
            let temperatureSection = document.querySelector('.temperature');
            const temperatureSpan = document.querySelector('.temperature span');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    long = position.coords.longitude;
                    lat = position.coords.latitude;
                    const proxy = "https://cors-anywhere.herokuapp.com/";

                    const api = `${proxy}https://api.darksky.net/forecast/5c8fc54140eeef7d8d4e60821ded828e/${lat},${long}`;
                    fetch(api)
                        .then(response => {
                            return response.json();

                        })
                        .then(data => {
                            const { temperature, summary, icon } = data.currently;
                            //SET DOM Elements from the API
                            temperatureDegree.textContent = temperature;
                            temperatureDescription.textContent = summary;
                            locationTimezone.textContent = data.timezone;
                            //Set Icon
                            setIcons(icon, document.querySelector('.icon'));
                            //Change temperature to Celsius/Fahrenheit
                            temperatureSection.addEventListener('click', () => {
                                if (temperatureSpan.textContent === "F") {
                                    temperatureSpan.textContent = "C";
                                } else {
                                    temperatureSpan.textContent = "F";
                                }
                            });
                        });



                    function setIcons(icon, iconID) {
                        const skycons = new Skycons({ color: "white" });
                        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
                        skycons.play();
                        return skycons.set(iconID, Skycons[currentIcon]);
                    }
                })