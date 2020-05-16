window.addEventListener('load', ()=> {
    let long, lat;
    let tempDesc=document.querySelector('.temperature-description');
    let tempDeg=document.querySelector('.temperature-degree');
    let locTimezone=document.querySelector('.location-timezone');
    let degreeSec=document.querySelector('.degree-section');
    let tempSpan=document.querySelector('.deg');
    let x=document.getElementsByName('h1');


    if (navigator.geolocation) {    // checks if geolocation is enabled or not
        let iconVal="";
        navigator.geolocation.getCurrentPosition(position => {  // callback function if location is obtained
            long=position.coords.longitude;
            lat=position.coords.latitude;

            const proxy='https://cors-anywhere.herokuapp.com/';
            const api=`${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data=> {
                    console.log(data);
                    const {temperature, summary, icon}=data.currently;
                    locTimezone.textContent=data.timezone;
                    tempDeg.innerHTML=temperature+'&deg;';
                    tempDesc.textContent=summary;
                    iconVal=icon.replace('-', '_').toUpperCase();

                    setIcons(document.querySelector('.icon'));

                    degreeSec.addEventListener('click', ()=> {
                        if (tempSpan.textContent==='F') {
                            tempSpan.textContent='C';
                            tempDeg.innerHTML=String((temperature-32)*5/9)+'&deg;';
                        }else {
                            tempSpan.innerHTML='F';
                            tempDeg.innerHTML=temperature+'&deg;';
                        }
                    })
                })
        });

        function setIcons(iconId) {
            const skycon= new Skycons({color:"white"});
            skycon.play();
            return skycon.set(iconId, Skycons[iconVal]);
        }
    } else{
        x.textContent="Allow geolocation to use this site!!";
    }
});