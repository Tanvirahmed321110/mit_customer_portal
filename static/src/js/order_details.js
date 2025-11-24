$(document).ready(function () {

    /* ----------------------------
     * Rating
    ---------------------------- */

    let currentRating = 1;

    $('#star-rating i').on('mouseenter', function () {
        const hoverValue = $(this).data('value');
        fillStars(hoverValue);
    });

    $('#star-rating').on('mouseleave', function () {
        fillStars(currentRating);
    });

    $('#star-rating i').on('click', function () {
        currentRating = $(this).data('value');
        fillStars(currentRating);

        console.log('rating2', currentRating);
        $('#star').val(currentRating);
    });

    function fillStars(rating) {
        $('#star-rating i').each(function () {
            const starValue = $(this).data('value');
            if (starValue <= rating) {
                $(this)
                    .removeClass('fa-regular')
                    .addClass('fa-solid filled');
            } else {
                $(this)
                    .removeClass('fa-solid filled')
                    .addClass('fa-regular');
            }
        });
    }

    $('.btn_write_review').click(function () {
        let data_product_id = $(this).attr('data_product_id');
        console.log('data_product_id', data_product_id);
        $('#modal_review').addClass('active');
        $('#review_product_id').val(data_product_id);
    })



    // for review validation
    const reviewnform = document.getElementById('review-form')

    if (reviewnform) {
        const input = document.getElementById('review-input')

        reviewnform.addEventListener('submit', function (e) {
            const inputValue = input.value.trim();

            if (inputValue === '') {
                e.preventDefault()
                showErrorMessage(input, 'Empty String Not Allow, Please Write Something')
            }
            else if (inputValue.length >= 100) {
                e.preventDefault()
                showErrorMessage(input, 'Please write maximum 100 letters only');
            }
            else {
                removeErrorMessage(input)
            }
        })
    }

})