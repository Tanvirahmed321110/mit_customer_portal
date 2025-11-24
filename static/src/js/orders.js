

// Order cancel Modal Open
const cancelBtns = document.querySelectorAll(".order-cancel-btn");

if (cancelBtns) {
    cancelBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Find the modal inside the same parent div
            const modal = btn.closest("div").querySelector(".my-modal");
            modal.classList.add("active");
        });
    });
}

// Order cancel Modal Close
const closeBtns = document.querySelectorAll(".close-btn");

if (closeBtns) {
    closeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Find the closest modal and remove active class
            const modal = btn.closest(".my-modal");
            modal.classList.remove("active");
        });
    });
}







// For Tab indicator
function tabIndicatorF(buttonSelector, parentSelector) {
    document.addEventListener("DOMContentLoaded", () => {
        const buttons = document.querySelectorAll(buttonSelector);
        const parent = document.querySelector(parentSelector);

        if (!buttons.length || !parent) return; // If elements are missing, exit the function

        // নতুন বর্ডার ইন্ডিকেটর তৈরি করা
        const borderIndicator = document.createElement("div");
        borderIndicator.classList.add("border-indicator");
        parent.appendChild(borderIndicator);

        // ফাংশন: ইন্ডিকেটরের পজিশন আপডেট করবে
        function updateIndicator(btn) {
            const rect = btn.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();

            borderIndicator.style.width = `${rect.width}px`;
            borderIndicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
        }

        // প্রথমে active ক্লাস থাকা বাটনে ইন্ডিকেটর সেট করা
        const activeBtn = document.querySelector(`${buttonSelector}.active`) || buttons[0];
        updateIndicator(activeBtn);

        // প্রত্যেক বাটনের ওপর ইভেন্ট লিসেনার যুক্ত করা
        buttons.forEach(btn => {
            btn.addEventListener("mouseenter", () => updateIndicator(btn));

            // হোভার আউট করলে active ক্লাস থাকা বাটনে ফিরে যাবে
            btn.addEventListener("mouseleave", () => {
                const activeBtn = document.querySelector(`${buttonSelector}.active`) || buttons[0];
                updateIndicator(activeBtn);
            });

            // বাটন ক্লিক করলে active ক্লাস আপডেট হবে
            btn.addEventListener("click", () => {
                document.querySelector(`${buttonSelector}.active`)?.classList.remove("active");
                btn.classList.add("active");
                updateIndicator(btn);
            });
        });
    });
}

// ✅ Function Call Example
// tabIndicatorF(".order-top-btn", ".orders-area-tab-buttons");


// tabF('.order-top-btn', '.tab-content');
openModalF('review-modal', '.review-modal-open')

$(document).ready(function () {

    /* ----------------------------
     * Rating (multi-block)
    ---------------------------- */
    $(document).on('mouseenter', '.rating i', function () {
        const ratingBlock = $(this).closest('.rating');
        const hoverValue = $(this).data('value');
        fillStars(ratingBlock, hoverValue);
    });

    $(document).on('mouseleave', '.rating', function () {
        const ratingBlock = $(this);
        const currentRating = ratingBlock.data('current-rating') || 0;
        fillStars(ratingBlock, currentRating);
    });

    $(document).on('click', '.rating i', function () {
        const ratingBlock = $(this).closest('.rating');
        const clickedValue = $(this).data('value');

        ratingBlock.data('current-rating', clickedValue);
        fillStars(ratingBlock, clickedValue);

        console.log('rating2', clickedValue);

        // Update the hidden input with the same data_id
        const dataId = ratingBlock.attr('data_id');
        $(`input[data_id="${dataId}"]`).val(clickedValue);
    });

    function fillStars(ratingBlock, rating) {
        ratingBlock.find('i').each(function () {
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
        let id = $(this).attr('data_id');
        alert(id);
        $(`$review-modal-2`).addClass('active');
    })


})