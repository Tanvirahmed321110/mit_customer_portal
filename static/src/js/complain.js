document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('complain-form');
    const name = form.querySelector('#name')
    const email = form.querySelector('#email')
    const phone = form.querySelector('#phone')
    const product_model = form.querySelector('#product-model')
    const details = form.querySelector('#details')

    //======  show error message  ======
    function showErrorMessage(input, message) {
        if (input, message) {
            const inputControl = input.parentElement
            const errorTag = inputControl.querySelector('.error-text')

            if (errorTag) {
                inputControl.className = 'my-input-control error'
                errorTag.innerText = message;
                console.log(errorTag)
            }
        }
    }

    //======  remove error message  ======
    function removeErrorMessage(input) {
        if (input) {
            const inputControl = input.parentElement
            inputControl.className = 'my-input-control'
        }
    }

    //=======  Check Required  Fields  =======
    function checkRequired(inputs) {
        let isValid = true;
        if (inputs) {
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    showErrorMessage(input, `${input.name} field is required`)
                    isValid = false
                }
                else {
                    removeErrorMessage(input)
                }
            })
        }
        return isValid;
    }



    //=======  Phone validation  =======
    function isValidBDPhone(phone) {
        if (phone) {
            const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;
            return bdPhoneRegex.test(phone.trim());
        }
    }

    //=======  Email validation  =======
    function isValidEmail(emailString) {
        if (emailString) {
            const re = /\S+@\S+\.\S+/;
            return re.test(emailString.trim());
        }
    }



    // When click submit form
    form.addEventListener('submit', function (e) {
        let is_valid = true

        // for name
        // if (name.value.trim() == '') {
        //     showErrorMessage(name, `${name.name}  field is required`)
        //     is_valid = false
        // }
        // else {
        //     removeErrorMessage(name)
        // }


        is_valid = checkRequired([name, phone, product_model, details])

        // for phone
        if (!isValidBDPhone(phone.value)) { // Check if phone is valid
            showErrorMessage(phone, "Invalid  phone number");
            is_valid = false;
        }
        else {
            removeErrorMessage(phone);
        }

        // // for email
        if (email.value.trim() !== '') {  // Only validate if not empty
            if (!isValidEmail(email.value)) {
                showErrorMessage(email, "Email is not valid");
                is_valid = false;
            } else {
                removeErrorMessage(email);
            }
        }

        // for product model
        // if (product_model.value.trim() == '') {
        //     showErrorMessage(product_model, `${product_model.name}  field is required`)
        //     is_valid = false
        // }
        // else {
        //     removeErrorMessage(product_model)
        // }


        // for product details
        // if (details.value.trim() == '') {
        //     showErrorMessage(details, `${details.name}  field is required`)
        //     is_valid = false
        // }
        // else {
        //     removeErrorMessage(details)
        // }



        // final check full form when error
        if (!is_valid) {
            e.preventDefault()
        }
    })




    //const register_form = document.getElementById('form')
    //            const name = register_form.querySelector('#name')
    //            const email = register_form.querySelector('#email')
    //            const phone = register_form.querySelector('#phone')
    //            const password = register_form.querySelector('#password')
    //            const confrim_password = register_form.querySelector('#confirm_password')
    //            const submited_message = register_form.querySelector('.submited-message')
    //
    //            //=======  Email validation  =======
    //            function isValidEmail(email) {
    //                const re = /\S+@\S+\.\S+/;
    //
    //                if (re.test(email.value.trim())) {
    //                    remove_error_message(email)
    //                }
    //                else {
    //                    show_error_message(email, "Email is not valid")
    //                }
    //            }
    //
    //            //=======  Phone validation  =======
    //            function isValidBDPhone(phone) {
    //                const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;
    //                return bdPhoneRegex.test(phone.trim());
    //            }
    //
    //
    //            //=======  Show Error Message Function  =======
    //            function show_error_message(input, message) {
    //                const form_control = input.parentElement
    //                const small_tag = form_control.querySelector('small')
    //
    //                form_control.className = 'form-control error'
    //                small_tag.innerText = message
    //            }
    //
    //            //=======  Remove error  =======
    //            function remove_error_message(input) {
    //                const form_control = input.parentElement;
    //                form_control.className = 'form-control success'
    //            }
    //
    //
    //            //======  check input length  =======
    //            function checkInputLength(input, min, max) {
    //                if (input.value.length < min) {
    //                    show_error_message(input, `${ input.id } min length ${ min }`)
    //                }
    //                else if (input.value.length > max) {
    //                    show_error_message(input, `${ input.id } min length ${ max }`)
    //                }
    //                else {
    //                    remove_error_message(input)
    //                }
    //            }
    //
    //            //======  check required input  =======
    //            // function checkRequired() {
    //            //     const requiredInputs = document.querySelectorAll('input[required]')
    //            //     console.log(requiredInputs)
    //
    //            //     requiredInputs.forEach(input => {
    //            //         console.log(input)
    //            //         if (input.value.trim() === '') {
    //            //             show_error_message(input, `${ input.name } is required`)
    //            //             console.log(input)
    //            //         }
    //            //     })
    //            // }
    //
    //
    //
    //            register_form.addEventListener('submit', function (e) {
    //                e.preventDefault()
    //                let is_valid = true
    //
    //
    //
    //                // for name
    //                if (name.value === '') {
    //                    show_error_message(name, 'name field requried')
    //                    is_valid = false
    //                }
    //                else {
    //                    remove_error_message(name)
    //                }
    //
    //                // for email
    //                // if (email.value === '') {
    //                //     show_error_message(email, 'email field requried')
    //                // }
    //                // else if (!isValidEmail(email.value)) {
    //                //     show_error_message(email, 'Invalid email')
    //                // }
    //                // else {
    //                //     remove_error_message(email)
    //                // }
    //
    //                // for phone
    //                if (phone.value === '') {
    //                    show_error_message(phone, 'phone field requried')
    //                    is_valid = false
    //                }
    //                else {
    //                    remove_error_message(phone)
    //                }
    //
    //                // // for password
    //                if (password.value === '') {
    //                    show_error_message(password, 'password field requried')
    //                    is_valid = false
    //                }
    //                else {
    //                    remove_error_message(password)
    //                }
    //
    //                // for confirm password
    //                if (confrim_password.value === '' || password.value != confrim_password.value) {
    //                    show_error_message(confrim_password, 'Confrim Password Not Match')
    //                    is_valid = false
    //                }
    //                else {
    //                    remove_error_message(confrim_password)
    //                }
    //
    //
    //                checkInputLength(password, 4, 14)
    //                if (!isValidEmail(email)) isValid = false
    //                // checkRequired())
    //
    //                if (is_valid) {
    //                    submited_message.classList.add('active');
    //                    console.log(isValid)
    //                }
    //                else {
    //                    submited_message.classList.remove('active')
    //                    console.log(isValid)
    //                }
    //            })

});