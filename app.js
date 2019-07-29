window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector(".location-timezone");
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
                    console.log(data);
                    const { temperature, summary } = data.currently;
                });
        });
    }
});