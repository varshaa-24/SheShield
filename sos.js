// =============================
// SheShield SOS System
// =============================

const startBtn = document.getElementById("startSOS");

const sosModal = document.getElementById("sosModal");
const countModal = document.getElementById("countModal");
const successModal = document.getElementById("successModal");

const confirmBtn = document.getElementById("confirmSOS");
const cancelBtn = document.getElementById("cancelSOS");
const closeSuccess = document.getElementById("closeSuccess");

const countNumber = document.getElementById("countNumber");

const siren = new Audio("assets/siren.mp3");
siren.loop = true;

// =============================
// Open SOS Popup
// =============================

startBtn.addEventListener("click", () => {

    sosModal.classList.add("active");

});

// =============================
// Cancel
// =============================

cancelBtn.addEventListener("click", () => {

    sosModal.classList.remove("active");

});

// =============================
// Confirm SOS
// =============================

confirmBtn.addEventListener("click", () => {

    sosModal.classList.remove("active");

    startCountdown();

});

// =============================
// Countdown
// =============================

function startCountdown() {

    countModal.classList.add("active");

    let count = 3;

    countNumber.innerHTML = count;

    const timer = setInterval(() => {

        count--;

        if (count > 0) {

            countNumber.innerHTML = count;

        } else {

            clearInterval(timer);

            countModal.classList.remove("active");

            startEmergency();

        }

    }, 1000);

}

// =============================
// Emergency
// =============================

function startEmergency() {

    if (navigator.vibrate) {

        navigator.vibrate([300,150,300,150,300]);

    }

    siren.play().catch(() => {});

    if (!navigator.geolocation) {

        showSuccess("Geolocation is not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        success,

        error,

        {
            enableHighAccuracy: true,
            timeout: 10000
        }

    );

}

// =============================
// Success
// =============================

function success(position) {

    siren.pause();
    siren.currentTime = 0;

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const mapsLink =
        `https://www.google.com/maps?q=${latitude},${longitude}`;

    const emergencyMessage =
`🚨 EMERGENCY SOS 🚨

I need help immediately.

📍 My Live Location:
${mapsLink}

Sent using SheShield
Siragadippom Naanga`;

    const history = {
        time: new Date().toLocaleString(),
        latitude,
        longitude
    };

    localStorage.setItem(
        "lastSOS",
        JSON.stringify(history)
    );

    showSuccess(
        "Your location has been detected successfully."
    );

    // Open Google Maps
    setTimeout(() => {
        window.open(mapsLink, "_blank");
    }, 1000);

    // Open WhatsApp with emergency message
    setTimeout(() => {
        openWhatsApp(emergencyMessage);
    }, 2000);

}

// =============================
// Error
// =============================

function error(err) {

    siren.pause();
    siren.currentTime = 0;

    let message = "Unknown Error";

    switch (err.code) {

        case err.PERMISSION_DENIED:
            message = "Location permission denied.";
            break;

        case err.POSITION_UNAVAILABLE:
            message = "Location unavailable.";
            break;

        case err.TIMEOUT:
            message = "Location request timed out.";
            break;

    }

    showSuccess(message);

}

// =============================
// Success Popup
// =============================

function showSuccess(message) {

    successModal.classList.add("active");

    successModal.querySelector("p").innerHTML = message;

}

// =============================
// Close Popup
// =============================

closeSuccess.addEventListener("click", () => {

    successModal.classList.remove("active");

});
function openWhatsApp(message){

    const contacts =
    JSON.parse(localStorage.getItem("trustedContacts")) || [];

    if(contacts.length===0){

        alert("No trusted contacts found.");

        return;

    }

    const phone = contacts[0].phone;

    const url =
`https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

    window.open(url,"_blank");

}