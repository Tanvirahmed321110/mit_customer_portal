document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('pre-oder-form');
    const name = form.querySelector('#name');
    const product_info = form.querySelector('#product-info');
    const phone = form.querySelector('#phone');
    const email = form.querySelector('#email');
    const address = form.querySelector('#address');


    // for local storage set and remove
    setupFormPersistence(form, 'preOrderFormData');



    // When click submit form
    form.addEventListener('submit', function (e) {
        let is_valid = true;

        // check all required field
        is_valid = checkRequired([name, product_info, address]);

        // for phone
        if (phone.value.trim() === '') {
            showErrorMessage(phone, "number field is required");
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
