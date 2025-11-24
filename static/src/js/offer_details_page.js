$(document).ready(function () {
    let offer_end_datetime = $('#offer_end_datetime').val();
    console.log('offer_end_datetime:', offer_end_datetime);
    const offerEndTime = new Date(offer_end_datetime).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = offerEndTime - now;

        if (distance <= 0) {
            $("#countdown").html("00 Days 00 Hours 00 Minutes 00 Seconds");
            clearInterval(timer);
            return;
        }

        const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
        const hours = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((distance / 1000) % 60)).padStart(2, '0');

        $("#days").text(days);
        $("#hours").text(hours);
        $("#minutes").text(minutes);
        $("#seconds").text(seconds);
    }

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
})