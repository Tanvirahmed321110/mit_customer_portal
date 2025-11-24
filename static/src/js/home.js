

activeF('.bank-list .bank-name')
// emi price modal
openModalF('emi-price-modal', '#emi-modal-open-btn')


// shopping cart
openModalF('shopping-cart-modal', '.shopping-cart-modal-open')


// For Testimonial Slider
var swiper = new Swiper(".testimonial", {
    slidesPerView: 2,
    spaceBetween: 0,
    loop: true,
    speed: 1200,
    autoplay: {  // Correct autoplay setting
        delay: 2000, // 3 seconds delay
        disableOnInteraction: false, // Keeps autoplay after interaction
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: { // Ensures mobile screens show 1 slide
            slidesPerView: 1,
        },
        556: {
            slidesPerView: 1,
        },
        900: {
            slidesPerView: 3,
        },
        1080: {
            slidesPerView: 4,
        }
    }
});



// big image change
bigImageChangeF('big-img', '.small-images img')


// big image zoom in when hover
document.addEventListener("DOMContentLoaded", function () {
    const bigImage = document.getElementById('big-img');

    if(bigImage){
        bigImage.addEventListener('mousemove', function (e) {
        const { left, top, width, height } = bigImage.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        bigImage.style.transformOrigin = `${x}% ${y}%`;
        bigImage.style.transform = "scale(1.4)"; // Zoom level
    });

    bigImage.addEventListener('mouseleave', function () {
        bigImage.style.transform = "scale(1)"; // Reset zoom
    });
    }
});





// Hero Slider
document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".slider-banner", {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
});









// Quick View
// quickViewF('.quick-view-btn')


// Counter animation
function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const duration = 2000; // Animation duration in milliseconds
    const steps = 100; // Total number of animation steps
    const increment = target / steps; // Increment per step
    let current = 0;
    const interval = duration / steps; // Time between each increment

    const updateCount = () => {
        current += increment;
        if (current < target) {
            counter.innerText = Math.floor(current); // Update counter text
            setTimeout(updateCount, interval);
        } else {
            counter.innerText = target; // Ensure it ends exactly at the target
        }
    };

    updateCount();
}


// Observer to trigger the counter when visible
const counters = document.querySelectorAll(".counter");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset counter and start animation
                entry.target.innerText = "0";
                animateCounter(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

counters.forEach(counter => observer.observe(counter));






// update qty
function updateQty() {
    const inputQuantity = document.getElementById('input-quantity')

    if (inputQuantity) {
        document.getElementById('plus-btn').addEventListener('click', function () {
            updateQuantity(inputQuantity, 'increment')
            console.log('click')
        })
        document.getElementById('minus-btn').addEventListener('click', function () {
            updateQuantity(inputQuantity, 'decrement')
        })
    }
}
updateQty()


// active class for varient ram
activeF('.varient-items .item')




// Our Brand Slider Start Here
var swiper = new Swiper(".partners-slider", {
    slidesPerView: "auto", // Automatically adjust slide width
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 0, // No delay, continuous movement
        disableOnInteraction: false,
    },
    speed: 3000, // Adjust to control smoothness
    freeMode: true, // Enables continuous smooth scrolling
    freeModeMomentum: true, // Adds inertia effect
    breakpoints: {
        1024: { slidesPerView: 5 },
        768: { slidesPerView: 3 },
        480: { slidesPerView: 2 },
    },
});

// Razzak
$(document).ready(function () {

    $('.quick_view_btn').click(function (e) {
        let data_id = $(this).attr('data_id');
        console.log('data_id::', data_id)
        $(`#quick_view_modal_${data_id}`).addClass('active')
    })

    // Hide global search on home
    $('#mobile-search-btn').hide();



})
