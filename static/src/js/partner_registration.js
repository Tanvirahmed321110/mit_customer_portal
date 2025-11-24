document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('partner-registration-form');
    const companyName = form.querySelector('#company-name');
    const fullAddress = form.querySelector('#full-address');
    const proprietorName = form.querySelector('#proprietor-name');
    const vatNo = form.querySelector('#vat-no');
    const phone = form.querySelector('#phone-no');
    const email = form.querySelector('#email');
    const bankName = form.querySelector('#bank-name');
    const BankAccount = form.querySelector('#bank-account');




    // When click submit form
    form.addEventListener('submit', function (e) {
        let is_valid = true;

        // check all required field
        is_valid = checkRequired([companyName, fullAddress, proprietorName, vatNo, bankName, BankAccount]);

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
