document.addEventListener('DOMContentLoaded', function () {

    // document.addEventListener("DOMContentLoaded", function () {
    //     new Swiper(".related-products", {
    //         slidesPerView: 1,  // Default: Show 1 slide on small screens
    //         spaceBetween: 20,  // Space between slides
    //         loop: true,
    //         autoplay: {
    //             delay: 3000,   // Auto-slide every 3 seconds
    //             disableOnInteraction: false,
    //         },
    //         breakpoints: {
    //             768: { slidesPerView: 2 },  // Tablets (768px and above)
    //             1024: { slidesPerView: 3 }  // Desktops (1024px and above)
    //         }
    //     });
    // });



    // Quick View
    // quickViewF('.quick-view-btn')




    const listBtn = document.getElementById('list-btn')
    const gridBtn = document.getElementById('grid-btn')
    console.log(listBtn)
    if (listBtn && gridBtn) {
        const wrapper = document.getElementById('grid-list-products')

        listBtn.addEventListener('click', function () {
            if (wrapper) {
                wrapper.classList.add('list-view')
            }
        })

        gridBtn.addEventListener('click', function () {
            if (wrapper) {
                wrapper.classList.remove('list-view')
            }
        })

    }




    // sidebar
    toggleF('shop-page-sidebar', 'mobile-filter-btn');
    const sidebar = document.getElementById('shop-page-sidebar');
    if (sidebar) {
        const closeBtn = sidebar.querySelector('.sidebar-close-btn');
        const body = document.querySelector('body');

        function toggleBodyScroll() {
            if (sidebar.classList.contains('active')) {
                body.style.overflow = 'hidden'; // Hide scrollbar
            } else {
                body.style.overflow = ''; // Restore scrollbar
            }
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                sidebar.classList.remove('active');
                toggleBodyScroll(); // Update scrollbar state
            });
        }

        // Observe class changes dynamically
        const observer = new MutationObserver(toggleBodyScroll);
        observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
    }




    // for hide and show content
    document.querySelectorAll(".item-btn").forEach(button => {
        button.addEventListener("click", function () {
            const item = this.closest(".item");
            item.classList.toggle("active");
        });
    });


    // // Price Range
    // const minRange = document.getElementById('min-price');
    // const maxRange = document.getElementById('max-price');
    // const minInput = document.getElementById('min-price-value');
    // const maxInput = document.getElementById('max-price-value');
    // const sliderTrack = document.querySelector('.slider-track');

    // function updateTrack() {
    //     const minPercent = (minRange.value / minRange.max) * 100;
    //     const maxPercent = (maxRange.value / maxRange.max) * 100;

    //     sliderTrack.style.background = `linear-gradient(to right, #e2e1e1ff ${minPercent}%, #7bb1f7ff ${minPercent}%, #bed5f3ff ${maxPercent}%, #e6e1e1ff ${maxPercent}%)`;
    // }

    // function syncInputs() {
    //     minInput.value = minRange.value;
    //     maxInput.value = maxRange.value;
    // }

    // function syncSliders() {
    //     console.log('syncSliders');
    //     minRange.value = minInput.value;
    //     maxRange.value = maxInput.value;
    //     updateTrack();
    // }

    // minRange.addEventListener('input', () => {
    //     if (parseInt(minRange.value) > parseInt(maxRange.value)) {
    //         minRange.value = maxRange.value;
    //     }
    //     syncInputs();
    //     updateTrack();
    // });

    // maxRange.addEventListener('input', () => {
    //     if (parseInt(maxRange.value) < parseInt(minRange.value)) {
    //         maxRange.value = minRange.value;
    //     }
    //     syncInputs();
    //     updateTrack();
    // });

    // minInput.addEventListener('input', syncSliders);
    // maxInput.addEventListener('input', syncSliders);

    // updateTrack();




    // Tabs grid and list view
    function setupTabs(tabBtnSelector, tabContentSelector) {
        document.querySelectorAll(tabBtnSelector).forEach(button => {
            button.addEventListener('click', () => {

                // Remove active class from all buttons
                document.querySelectorAll(tabBtnSelector).forEach(btn => {
                    btn.classList.remove('active');
                });

                // Add active class to clicked button
                button.classList.add('active');

                // Remove active class from all tab contents
                document.querySelectorAll(tabContentSelector).forEach(content => {
                    content.classList.remove('active');
                });

                // Get the tab ID from the button
                const tabId = button.getAttribute('data-tab');
                const selectedTabContent = document.getElementById(tabId);

                // Add active class to the corresponding tab content
                if (selectedTabContent) {
                    selectedTabContent.classList.add('active');
                }
            });
        });
    }

    setupTabs('.grid-btn', '.shop-content .products');
});