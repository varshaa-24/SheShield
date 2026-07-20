
const sosBtn = document.getElementById("sosBtn");
const floatingSOS = document.querySelector(".floatingSOS");
const topBtn = document.getElementById("topBtn");
const themeBtn = document.querySelector(".theme-btn");

const siren = new Audio("assets/siren.mp3");
siren.loop = true;=
sosBtn.addEventListener("click", activateSOS);
floatingSOS.addEventListener("click", activateSOS);

function activateSOS(){

    let confirmSOS = confirm(
        "🚨 Do you want to activate Emergency SOS?"
    );

    if(!confirmSOS) return;

    startCountdown();

}

function startCountdown(){

    let count = 3;

    sosBtn.innerHTML = "3";

    let timer = setInterval(()=>{

        count--;

        if(count>0){

            sosBtn.innerHTML = count;

        }

        else{

            clearInterval(timer);

            sosBtn.innerHTML="📍 Detecting...";

            startEmergency();

        }

    },1000);

}

function startEmergency(){

    if(navigator.vibrate){

        navigator.vibrate([300,150,300,150,300]);

    }

    siren.play();

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(

            success,

            error,

            {

                enableHighAccuracy:true,

                timeout:10000,

                maximumAge:0

            }

        );

    }

}

function success(position){

    let lat = position.coords.latitude;

    let lon = position.coords.longitude;

    setTimeout(()=>{

        siren.pause();

        siren.currentTime=0;

    },4000);

    alert(

`✅ SOS Activated Successfully!

Latitude : ${lat}

Longitude : ${lon}

Your location is ready.`

    );

    window.open(

`https://www.google.com/maps?q=${lat},${lon}`,

"_blank"

    );

    sosBtn.innerHTML="🚨 Emergency SOS";

}

function error(err){

    siren.pause();

    siren.currentTime=0;

    switch(err.code){

        case err.PERMISSION_DENIED:

            alert("Location Permission Denied.");

            break;

        case err.POSITION_UNAVAILABLE:

            alert("Location Unavailable.");

            break;

        case err.TIMEOUT:

            alert("Request Timed Out.");

            break;

        default:

            alert("Unknown Error.");

    }

    sosBtn.innerHTML="🚨 Emergency SOS";

}

// ==============================
// Scroll Button
// ==============================

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topBtn.style.display="block";

    }

    else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ==============================
// Dark Mode
// ==============================

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});

// ==============================
// Reveal Animation
// ==============================

const sections=document.querySelectorAll("section");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

sections.forEach(section=>{

section.style.opacity="0";

section.style.transform="translateY(60px)";

section.style.transition="1s";

observer.observe(section);

});