$(document).ready(function () {

    // Showing upcoming modal
//    console.log('Layout calling');
    $(document).on('click', '.upcoming2', function () {
        $('#upcoming-modal').addClass('active');
    });

    /*
     * Mobile search
     * Mobile search
     */
    // $('#mobile-search-btn').click(function () {
    //     $('.mobile-search-input').toggleClass('active');
    //     // $('#search_suggestion_mobile').toggleClass('active');
    // })

    // $('.mobile-search-input').focus(function () {
    //     $('#search_suggestion_mobile').addClass('active').focus();
    // })

    // $('.mobile-search-input').blur(function () {
    //     let rb = setTimeout(() => {
    //         $('#search_suggestion_mobile').removeClass('active');
    //     }, 1000);
    // })
    // Click button → show input & focus
    // Toggle input on button click
    $('#mobile-search-btn').click(function (e) {
        e.stopPropagation(); // prevent document click
        $('.mobile-search-input').toggleClass('active'); // toggle active class
        $('#search_suggestion_mobile').toggleClass('active');

        // If input just became active, focus it
        if ($('.mobile-search-input').hasClass('active')) {
            $('.mobile-search-input').focus();
        }
    });

    // Click inside input → keep suggestions visible
    $('.mobile-search-input').click(function (e) {
        e.stopPropagation();
        $('#search_suggestion_mobile').addClass('active');
    });

    // Click anywhere outside → hide input & suggestions
    $(document).click(function () {
        $('.mobile-search-input').removeClass('active');
        $('#search_suggestion_mobile').removeClass('active');
    });

    function render_products(products, response) {

        // Clear variables/containers
        $('#mobile_search_products').empty();
        let products_html = '';

        // Render products html
        products.forEach((p, index) => {
            let product_html = `
            <!-- Item -->
            <li>
                <a class="my-d-flex my-align-center my-gap-4 my-p-1 my-border-bottom"
                    href="/product/${p.id}">
                    <div class="img w-20">
                        <img src="${p.image_128}"/>
                    </div>

                    <div class="details my-flex-column my-gap-1">
                        <h6 class="">
                        ${p.name} BBB
                        </h6>
                        <div class="my-d-flex my-m-1  my-gap-3">
                            <h5 class="price my-text-red my-fw-bold">${p.list_price}
                                <span>৳</span>
                            </h5>
                            <del class=" my-fs-sm my-text-red">
                                ${p.old_price}
                                <span>৳</span>
                            </del>
                        </div>
                    </div>
                </a>
            </li>
          `;
            products_html += product_html;
        })

        // Add new html to page
        $('#mobile_search_products').html(products_html);
    }

    function render_no_products(msg) {
        $('#mobile_search_products').empty();
        $('#mobile_search_products').html('<li class="my-p-1">No products found</li>');
    }

    function handle_response(response) {

        // $('#loader').hide();
        let result = response.result;

        if (response && result.status == 'success') {

            let data = response.result.data;
            let products = data.products;
            render_products(products, response);

        } else if (response && result.status == 'error') {
            let msg = result.message;
            render_no_products(msg);
        }
    }

    // Collect data and make call API
    function filter_api() {

        let data = { version: '1.0' }

        /* Url parameters */
        const params = new URLSearchParams(window.location.search);
        const queryParams = Object.fromEntries(params.entries());
        data['query_params'] = queryParams;

        // Collecting search
        let search = $('#mobile-search-input').val();
        data['search'] = search;


        /*
         * Call the filter API
         *
         */

        console.log('data2:', data);

        $.ajax({
            url: '/api/v1/product/search_suggestion',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                handle_response(response);
            },
            error: function (xhr, status, error) {
                console.log('error', error);
            }
        })
    }

    /* Before api */
    let filter_api_timeout;
    function filter() {
        clearTimeout(filter_api_timeout)
        filter_api_timeout = setTimeout(() => {
            filter_api();
        }, 1000);
    }

    $('.mobile-search-input').on('input', function () {
        clearTimeout(filter_api_timeout);

        // Show loader immediately for visual feedback
        $('#mobile_search_products').empty();
        $('#mobile_search_products').html('<li class="my-p-1">Searching...</li>');

        // Debounce filter call to wait for user to stop typing
        debounceTimer = setTimeout(() => {
            filter();
        }, 300); // 300ms delay is a good balance
        console.log('wk')
    });



    /* Open Quick view modal */
    // $('.quick_view_btn').click(function (e) {
    //     let data_id = $(this).attr('data_id');
    //     console.log('data_id::', data_id)
    //     $(`#quick_view_modal_${data_id}`).addClass('active')
    // })

    $(document).on('click', '.quick_view_small_image', function (e) {
        // $('#big-img').attr('src', $(this).attr('src'));
        // console.log('small-images img clicked');
        // console.log('small-images img src', $(this).attr('src'));
        // console.log('#big-img src', $('#big-img').attr('src'));

        let data_id = $(this).attr('data_id');
        console.log('data_id::', data_id)
        $(`#quick_view_big_image${data_id}`).attr('src', $(this).attr('src'))

    })

    /* Offer */
    function offer_timer(pid, data_is_offer) {

        if (data_is_offer == 'false') { return }
        console.log('AAA')

        let offer_end_date_time = $(`#offer_end_date_time${pid}`).val();
        const offerEndTime = new Date(offer_end_date_time).getTime();
        console.log('offer_end_date_time33', offer_end_date_time)

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

            $(`#offer_left_days${pid}`).text(days);
            $(`#offer_left_hours${pid}`).text(hours);
            $(`#offer_left_minutes${pid}`).text(minutes);
            $(`#offer_left_seconds${pid}`).text(seconds);
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

    openModalF('shopping-cart-modal', '.shopping-cart-modal-open')

    // Close popup
    // $('.close-btn').on('click', function () {
    //     // $(this).closest('.popup').removeClass('active');
    //     hidePopups();
    // });


    emiBtnStateFetchAndUpdateBtnState()
    EMIPayEnableDisableLayoutPage()

})


//EMI button
function EMIPayEnableDisableLayoutPage(){

   const EMIBtns = document.querySelectorAll('.emi-btn')
//   console.log('emi btn   ------------ ',EMIBtns)
   EMIBtns.forEach((EMIBtn)=>{
       EMIBtn.addEventListener('click', function (event){
        const btn = event.currentTarget
//        console.log('emi btn   clicked------------ ',btn)
//        console.log("classList   before--------  ",btn.classList.contains('active'))

        fetch('/emi_value_update', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "EMI": !btn.classList.contains('active')
            })
        }).then((response)=>{
            if(!response.ok){
                throw new Error('HTTP error! Status: ' + response.status)
            }
            return response.json()
        }).then((data)=>{
            const status = data.result.status
            if(status){
                const AllEMIBtns = document.querySelectorAll('.emi-btn')
//                console.log('AllEMIBtns ----- ', AllEMIBtns)
                AllEMIBtns.forEach((emiBtn)=>{
                    emiBtn.classList.toggle('active')
//                    console.log('emiBtn classList', emiBtn.classList)
                })
//                EMIBtn.classList.toggle('active')
//                console.log('classList  after ------------------ ',btn.classList.contains('active'))

            }
        })

   })

   })

}

function emiBtnStateFetchAndUpdateBtnState(){
//console.log('------ emiBtnStateFetchAndUpdateBtnState-------')
    fetch('/emi/state', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    }).then((response)=>{
        if(!response.ok){
            throw new Error("HTTP error! Status:" + response.status)
        }
        return response.json()
    }).then((data)=>{
//    console.log("data  ------- ", data)
      const res = data.result.data
      const status = data.result.status
      const EMIState = res.emi_state
//      console.log("status ---- ", status)
//      console.log("EMIState ---- ", EMIState)
      if(status){
            const EMIBtns = document.querySelectorAll('.emi-btn')
//            console.log("EMIBtns  ----  ", EMIBtns)
            if(EMIBtns){
                EMIBtns.forEach((EMIBtn)=>{
//                    console.log("EMIBtn  ----  ", EMIBtn)
                    if(EMIState){
                        if(!EMIBtn.classList.contains('active')){
                            EMIBtn.classList.add('active')
                        }
                    }else{
                        if(EMIBtn.classList.contains('active')){
                                EMIBtn.classList.remove('active')
                            }
                    }
                })

            }
      }
    })
}