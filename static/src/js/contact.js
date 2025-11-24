document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('contact-form');
    const name = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    const email = form.querySelector('#email');
    const description = form.querySelector('#description');


    // When click submit form
    form.addEventListener('submit', function (e) {
        let is_valid = true;

        // check all required field
        is_valid = checkRequired([name, description]);

        // for phone
        if (phone.value.trim() === '') {
            showErrorMessage(phone, `${phone.name || phone.id} number field is required`);
            is_valid = false;
        } else if (!isValidBDPhone(phone.value)) {
            showErrorMessage(phone, "Invalid phone number");
            is_valid = false;
        } else {
            removeErrorMessage(phone);
        }

        // for email (only validate if not empty)
        if (email.value.trim() !== '') {
            if (!isValidEmail(email.value)) {
                showErrorMessage(email, "Email is not valid");
                is_valid = false;
            } else {
                removeErrorMessage(email);
            }
        }

        if (!is_valid) {
            e.preventDefault();
        }
    });
});
