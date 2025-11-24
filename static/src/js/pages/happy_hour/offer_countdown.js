$(document).ready(function () {

    function offerCountdown() {

        let offer_end_datetime = $(`#offer_end_datetime`).val();
        if (!offer_end_datetime) { return }
        const offerEndTime = new Date(offer_end_datetime).getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = offerEndTime - now;

            if (distance <= 0) {
                clearInterval(timer);
                location.reload();
                return;
            }

            const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
            const hours = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0');
            const minutes = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0');
            const seconds = String(Math.floor((distance / 1000) % 60)).padStart(2, '0');

            $(`#offer_left_days`).text(days);
            $(`#offer_left_hours`).text(hours);
            $(`#offer_left_minutes`).text(minutes);
            $(`#offer_left_seconds`).text(seconds);
        }

        const timer = setInterval(updateCountdown, 1000);
        // updateCountdown();
    }

    offerCountdown();

    function offer_ends_in() {

        let offer_end_datetime = $(`#end_datetime_str`).val();
        if (!offer_end_datetime) { return }
        const offerEndTime = new Date(offer_end_datetime).getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = offerEndTime - now;

            if (distance <= 0) {
                clearInterval(timer);
                location.reload();
                return;
            }

            const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
            const hours = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0');
            const minutes = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0');
            const seconds = String(Math.floor((distance / 1000) % 60)).padStart(2, '0');

            let text = `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`
            $(`#offer_ends_in`).text(text);
        }

        const timer = setInterval(updateCountdown, 1000);
    }

    offer_ends_in();





})