$(document).ready(function () {

    function offer_timer(pid, data_is_offer) {

        if (data_is_offer == 'false') {return}
        console.log('AAA')

        let offer_end_datetime = $(`#offer_end_datetime${pid}`).val();
        const offerEndTime = new Date(offer_end_datetime).getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = offerEndTime - now;

            if (distance <= 0) {
                clearInterval(timer);
                return;
            }

            const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
            const hours = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0');
            const minutes = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0');
            const seconds = String(Math.floor((distance / 1000) % 60)).padStart(2, '0');

            $(`#days${pid}`).text(days);
            $(`#hours${pid}`).text(hours);
            $(`#minutes${pid}`).text(minutes);
            $(`#seconds${pid}`).text(seconds);
        }

        const timer = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    /* Open quick view modal */
    $(document).on('click', '.quick_view_btn', function (e) {
        let data_id = $(this).attr('data_id');
        let data_is_offer = $(this).attr('data_is_offer');
        console.log('data_id::', data_id);
        $(`#quick_view_modal_${data_id}`).addClass('active');
        offer_timer(data_id, data_is_offer);
    })


})







