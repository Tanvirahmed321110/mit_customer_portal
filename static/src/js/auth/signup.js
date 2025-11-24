$(document).ready(function () {

    // Validate email number
    function validate_email(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    // Validate phone
    function validate_phone(phone_number) {
        // validate phone
        // +8801731001895 = 14
        let regexp_phone = /^[\s()+-]*([0-9][\s()+-]*){9,20}$/;
        let regexp_phone_result = regexp_phone.test(phone_number);
        return regexp_phone_result
    }

    console.log('AAA');
    let error = false;

    $('#signup_form').submit(function (e) {

        error = false;
        $('#parent_phone').removeClass('error');
        $('#parent_email').removeClass('error');

        let phone = $('#phone').val();
        if (!validate_phone(phone)) {
            error = true;
            $('#parent_phone').addClass('error');
        }

        let email = $('#email').val();
        if (email.length >= 1) {
            if (!validate_email(email)) {
                error = true;
                $('#parent_email').addClass('error');
            }
        }

        console.log('error', error);

        if (error) {
            e.preventDefault();
        }

    });



})