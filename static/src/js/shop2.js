$(document).ready(function () {

    //Global Variables
    shop = {
        clear_filter: false,
    }
    let page = 1;

    /* -----------------------------------------
     Price Range
    ----------------------------------------- */
    const minRange = document.getElementById('min-price');
    const maxRange = document.getElementById('max-price');
    const minInput = document.getElementById('min-price-value');
    const maxInput = document.getElementById('max-price-value');
    const sliderTrack = document.querySelector('.slider-track');

    function updateTrack() {
        const minPercent = (minRange.value / minRange.max) * 100;
        const maxPercent = (maxRange.value / maxRange.max) * 100;

        sliderTrack.style.background = `linear-gradient(to right, #e2e1e1ff ${minPercent}%, #7bb1f7ff ${minPercent}%, #bed5f3ff ${maxPercent}%, #e6e1e1ff ${maxPercent}%)`;
    }

    function syncInputs() {
        minInput.value = minRange.value;
        maxInput.value = maxRange.value;
    }

    function syncSliders() {
        console.log('syncSliders');
        minRange.value = minInput.value;
        maxRange.value = maxInput.value;
        updateTrack();
    }

    minRange.addEventListener('input', () => {
        if (parseInt(minRange.value) > parseInt(maxRange.value)) {
            minRange.value = maxRange.value;
        }
        syncInputs();
        updateTrack();
    });

    maxRange.addEventListener('input', () => {
        if (parseInt(maxRange.value) < parseInt(minRange.value)) {
            maxRange.value = minRange.value;
        }
        syncInputs();
        updateTrack();
    });

    minInput.addEventListener('input', syncSliders);
    maxInput.addEventListener('input', syncSliders);
    updateTrack();

    // On load
    function load() {
        shop.default_min_price = $('#min-price-value').val();
        shop.default_max_price = $('#max-price-value').val();
        console.log('shop', shop)
    }
    load();

    function render_products(products, response) {

        let products_count = response.result.data.products_count;
        $('#product_count').text(`${products_count} Products Found`);

        // Clear variables/containers
        $('.products').empty();
        let products_html = '';

        // Render products html
        products.forEach((p, index) => {

            let product_url = `/product/${p.id}`;
            let extra_images_html = '';

            p.media_ids.forEach((item) => {
                let extra_image_html = `<img
                        class="w-20 my-p-1 my-border"
                        src="/web/image/mit.extra_product_media/${item}/image_1920"
                        alt=""
                        loading="lazy"
                    />`;
                extra_images_html += extra_image_html;
            })

            let offer_html = ``;
            let offer_html2 = `
            <div id="offer_timer${p.id}" class="my-mt-6 my-border-bottom my-pb-5 discount-offer-timer my-d-flex">
                <div class="my-p-3 my-px-5 my-border  my-radius-sm">
                    <div class="my-text-center my-fw-medium title">
                        <div>Discount Offer Ends In</div>
                    </div>

                    <div class="my-flex-center my-mt-4 my-gap-4">
                        <input type="hidden" id="offer_end_datetime${p.id}" value="${p.offer_end_datetime}">

                        <div class="my-flex-column my-gap-half my-align-center">
                            <div class="my-d-flex my-gap-1">
                                <div id="days${p.id}" class="my-bg-red my-px-1 my-fw-bold my-py-half my-radius-xs my-text-white">00</div>
                            </div>
                            <div class="my-fs-xs my-text-gray">Days</div>
                        </div>

                        <div class="my-flex-column my-gap-half my-align-center">
                            <div class="my-d-flex my-gap-1">
                                <div id="hours${p.id}" class="my-bg-red my-px-1 my-fw-bold my-py-half my-radius-xs my-text-white">00</div>
                            </div>
                            <div class="my-fs-xs my-text-gray">Hours</div>
                        </div>

                        <div class="my-flex-column my-gap-half my-align-center">
                            <div class="my-d-flex my-gap-1">
                                <div id="minutes${p.id}" class="my-bg-red my-px-1 my-fw-bold my-py-half my-radius-xs my-text-white">58
                                </div>
                            </div>
                            <div class="my-fs-xs my-text-gray">Minutes</div>
                        </div>

                        <div class="my-flex-column my-gap-half my-align-center">
                            <div class="my-d-flex my-gap-1">
                                <div id="seconds${p.id}" class="my-bg-red my-px-1 my-fw-bold my-py-half my-radius-xs my-text-white">54
                                </div>
                            </div>
                            <div class="my-fs-xs my-text-gray">Seconds</div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            if (p.is_offer) {
                offer_html = offer_html2
            }



            const context = document.getElementById('context')
            const field = document.getElementById('field')
            let product_html = `
                <div class="product-cart-area  my-card">
                    <div class="product-cart">
                        <a href="${product_url}" class="images">
                            <img class="display-image" src="${p.image_256}" loading="lazy" alt="${p.name}">
                                <div class="my-my-2 ">
                                        ${p.shop_html_status}
                                </div>
                        </a>


                        ${(context.value !== 'pc_build' && context.value !== 'cc_build') ? `
                        <ul class="hide-icons my-flex-column my-gap-1">
                        <li onclick="updateCartUIProductQuickView(event, ${p.product_product.id})" class="hide-icon my-tooltip my-flex-center quick-view-btn quick_view_btn" data_id="${p.id}" data_is_offer="${p.is_offer}">
                                <i class="fa fa-eye"></i>
                                <div class="show-text">Quick View</div>
                            </li>
                            <li class="js_add_to_compare hide-icon my-tooltip my-flex-center" data_id="${p.id}">
                                <i class="fa fa-random"></i>
                                <div class="show-text">Compare Product</div>
                            </li>
                               <!--<li class="hide-icon my-tooltip my-flex-center">
                                <i class="fa fa-heart"></i>
                                <div class="show-text">Add to Love List</div>
                            </li>-->
                        </ul>
                            `: ""}




                        ${p.ribbon ? `<div class="base save my-fs-xs">${p.ribbon}</div>` : ''}
                        ${p.earn_point ? `<div t-if="p.earn_point" class="base save earn-point my-fs-xs">Earn Point: <span>${p.earn_point}</span></div>` : ''}

                        <div class="product-content">
                            <div class="my-mt-3 desc my-p-relative">
                                <a href="${product_url}" class="name">
                                    <h4 class="text-ellipsis">${p.name}</h4>
                                    <p class="my-mt-2  my-fs-xs">
                                        <span class="my-fw-medium">Product ID:</span>
                                        <span class="my-fw-bold">${p.default_code}</span>
                                    </p>
                                </a>
                            </div>

                            <div class="my-w-100">

                                <div class="my-mt-6 short-desc">
                                    ${p.quick_detail ? `<div class="my-mt-0">${p.quick_detail}</div>` : ''}
                                </div>

                                <div class="price my-mt-2 ">
                                    <div class="my-d-flex my-align-center my-w-100 my-gap-2">
                                        <h4 class="new-price my-fw-bolder my-text-center">
                                            ${p.is_status
                    ? `<span>${p.get_text_status}</span>`
                    :
                    `<span>${p.list_price}৳</span>`
                }
                                        </h4>
                                    </div>
                                </div>

                                <div class="add-to-cart my-d-flex  my-mt-3 my-w-100 ">

                                    ${p.is_status
                    ? `
                                                            ${p.get_status == 'pre_order'
                        ? `
                                                                        <a class="my-btn my-primary-btn my-w-100" href="/pre_order">Pre Order</a>
                                                                `
                        :
                        `<div class="my-bg-primary  my-p-2 my-text-center my-radius-sm my-text-white  my-fs-sm my-w-100" >
                                                ${p.get_text_status}</div>
                                            `
                    }

                                                            `
                    :
                    context.value === "pc_build"
                        ? `
                <button onclick='addToPCBuild(event, ${p.product_product.id})' class="my-btn my-primary-btn my-w-100">Add to PC</button>
            `
                        :
                        context.value === "cc_build"
                            ? `
                <button onclick="addToCCBuild(event, ${p.product_product.id}, '${field.value}')" class="my-btn my-primary-btn my-w-100">Add to CC</button>
            `
                            :

                            `
                <button
                    onclick="addToCartProductQuickView(event)"
                    class="my-btn my-primary-btn my-w-100"
                    data-proId="${p.product_product.id}"
                    data-proName="${p.product_product.name}"
                    data-proPrice="${p.product_product.price_unit}"
                    data-proImage="${p.product_product.image}">
                    <span>Buy Now</span>
                </button>
            `

                }


                                </div>

                            </div>

                        </div>
                    </div>
                </div
                ${p.quick_view_html}
            `;
            products_html += product_html;
        })

        // Add new html to page
        $('.products').html(products_html);
        console.log('render_products')
    }

    function render_no_products(msg) {
        $('#product_count').text(msg);

        // Clear variables/containers
        $('.products').empty();
        $('.pagination').hide();
    }

    function render_pagination(total_pages) {  // by GPT
        let items_html = '';
        let max_visible = 9;
        let half = Math.floor((max_visible - 1) / 2); // 4

        // Ensure page is within bounds
        page = Math.max(1, Math.min(page, total_pages));

        // Previous Button
        items_html += `
        <li>
            <a class="page ${page === 1 ? 'disable' : ''}" data_page="${page - 1}">
                <i class="fa-solid fa-chevron-left"></i>
            </a>
        </li>
        `;

        let start = 1;
        let end = total_pages;

        if (total_pages > max_visible) {
            if (page <= half + 1) {
                start = 1;
                end = max_visible - 2; // leave space for Prev and Next
            } else if (page >= total_pages - half) {
                start = total_pages - (max_visible - 3);
                end = total_pages;
            } else {
                start = page - half + 1;
                end = page + half - 1;
            }
        }

        for (let i = start; i <= end; i++) {
            items_html += `
            <li class="page ${i === page ? 'active' : ''}" data_page="${i}">
                <a>${i}</a>
            </li>
        `;
        }

        // Next Button
        items_html += `
        <li>
            <a class="page ${page === total_pages ? 'disable' : ''}" data_page="${page + 1}">
                 <i class="fa-solid fa-chevron-right"></i>
            </a>
        </li>
        `;

        $('.pagination').show();
        $('#pagination').empty().html(items_html);
        let pagi_info = `Showing Page ${page} of ${total_pages}`;
        $('#pagi_info').text(pagi_info);
        console.log('render_pagination')
    }

    function render_clear_filter() {

        let min_price = $('#min-price-value').val();
        let max_price = $('#max-price-value').val();
        shop.clear_filter = false;

        if (min_price != shop.default_min_price || max_price != shop.default_max_price) {
            shop.clear_filter = true;
            console.log('AAA');
        }

        if ($('input[type="checkbox"].status:checked').length > 0) {
            shop.clear_filter = true;
        }

        if ($('input[type="checkbox"].attr:checked').length > 0) {
            shop.clear_filter = true;
        }

        if (shop.clear_filter) {
            $('#clear_filter').removeClass('display-none')
        } else {
            $('#clear_filter').addClass('display-none')
        }
    }

    // Reset Filter
    function action_reset() {
        if (!shop.clear_filter) { return }
        $('#min-price-value').val(shop.default_min_price).trigger('input');
        $('#max-price-value').val(shop.default_max_price).trigger('input');
        syncSliders();

        $('.status').prop('checked', false);
        $('.attr').prop('checked', false);
    }

    // $('#max-price-value').change(function () {
    //     filter();
    // })

    $('#clear_filter').click(function () {
        action_reset();
    })

    function handle_response(response) {

        $("html, body").animate({ scrollTop: 0 });
        let result = response.result;

        if (response && result.status == 'success') {

            let data = response.result.data;
            let total_pages = response.result.data.total_pages;

            let products = data.products;
            console.log('data:', data)
            render_products(products, response);
            render_pagination(total_pages);
            render_clear_filter();

        } else if (response && result.status == 'error') {
            let msg = result.message;
            render_no_products(msg);
            console.log('Error/not found:', msg);
        }
        $('#loader').removeClass('active');
        console.log('handle_response--')
    }

    // Collect data and make call API
    function filter_api() {

        let data = { version: '1.0' }

        // ------------
        let category_id = $('#category_id').val()
        data['category_id'] = category_id;

        /* Url parameters */
        const params = new URLSearchParams(window.location.search);
        const queryParams = Object.fromEntries(params.entries());
        data['query_params'] = queryParams;
        console.log('queryParams', queryParams);

        // Price
        let min_price = $('#min-price-value').val();
        let max_price = $('#max-price-value').val();
        data['min_price'] = min_price;
        data['max_price'] = max_price;

        /* Stock Status */
        let checkedStatuses = $('.status:checked').map(function () {
            return $(this).attr('data_name');
        }).get();
        console.log('checkedStatuses', checkedStatuses);
        data['status'] = checkedStatuses;


        // Attributes
        let attributes = {};

        $('.attr:checked').each(function () {
            const ids = $(this).attr('data_id').split('_');
            const parent = ids[0];
            const child = parseInt(ids[1]);

            if (!attributes[parent]) {
                attributes[parent] = [];
            }

            attributes[parent].push(child);
        });
        data['attributes'] = attributes;
        console.log('attributes:', attributes);

        /* Sort */
        let sort_by = $('#sort_by').val()
        data['sort_by'] = sort_by;

        /* Page */
        data['page'] = page;
        data['test'] = '_test';

        /*
            Call the filter API
            Call the filter API
        */

        console.log('data2:', data);

        $.ajax({
            url: '/api/v1/shop',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                handle_response(response);
            },
            error: function (xhr, status, error) {
                console.log('status', status);
                console.log('error', error);
            }
        })
    }

    /* Before api */
    let filter_api_timeout;

    function filter() {
        $('.products').empty();
        $('#loader').addClass('active');
        clearTimeout(filter_api_timeout)
        filter_api_timeout = setTimeout(() => {
            filter_api();
        }, 1000);
        console.log('filter called')
    }

    function filter2() {
        $('.products').empty();
        // $('#loader').addClass('active');
        filter_api();
        console.log('filter2 called')
    }

    function onchange_attr() {
        // Reset variables
        page = 1;
    }

    // Attributes and price
    $('.attr').click(function () {
        filter();
        onchange_attr();
    });

    $('.price_range_point').mouseup(function () {
        filter();
    })

    $('.price_values').on('input', function () {
        filter();
    });

    $('.status').click(function () {
        filter();
    })

    $('#sort_by').change(function () {
        filter();
    })

    /* Pagination */
    $(document).on('click', '.page', function () {

        // Return when disable or active
        if ($(this).hasClass('disable') || $(this).hasClass('active')) {
            return;
        }

        let _page = $(this).attr('data_page');
        page = _page;
        // const url = new URL(window.location.href);
        // url.searchParams.set('page', page);
        // window.history.pushState({}, '', url);
        filter();
    });

    // Test
    // $('#product_count').click(function () {
    //     const url = new URL(window.location.href);
    //     url.searchParams.set('page', '2');
    //     window.history.pushState({}, '', url);

    // })

    filter2();

    // Clear filter

})







async function saveCartToDatabaseProductQuickView(productId, quantity, set_quantity) {
    if (parseInt(quantity) < 1) {
        return null
    }

    let response = await fetch("/save/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            set_quantity: set_quantity,
            product_id: productId,
            quantity: quantity
        })
    }).then(response => {
        if (!response.ok) {
            console.log(" ----- error ----")
        }
        return response.json()
    }).then(data => {
        return data.result.data
    }).catch(error => {
        console.log(" ----- error ----")

    })
    return response
}

async function addToCartProductQuickView(event, qty = false) {

    buyNowBtn = event.currentTarget
    const productId = buyNowBtn.getAttribute('data-proId')
    const proName = buyNowBtn.getAttribute("data-proName")
    const proPrice = buyNowBtn.getAttribute("data-proPrice")
    const proImage = buyNowBtn.getAttribute("data-proImage")
    //    console.log("input-quantity ----- ", `input-quantity-${productId}`)

    const inputQuantity = document.getElementById(`input-quantity-${productId}`)
    //    console.log("qty ----- ", qty)
    //    console.log("Product id ----- ", productId)
    //    console.log("proName ----- ", proName)
    //    console.log("inputQuantity 111 ----- ", inputQuantity)


    let response = qty ? await saveCartToDatabaseProductQuickView(productId, parseInt(inputQuantity.value), true) : await saveCartToDatabaseProductQuickView(productId, 1, false);
    if (!response) {
        return
    }
    let final_quantity = response.final_quantity
    //    console.log('final_quantity  -----', final_quantity)



    if (!qty) {
        //   const confirmationTextSpan = document.querySelector(".confirmation span");
        const confirmationTextP = document.querySelector(".confirmation p");
        //   confirmationTextSpan.innerText = `${proName}`;
        //   confirmationTextSpan.style.color = 'orange';

        confirmationTextP.innerHTML = `
   <span>${proName}</span> added to cart
   `;
        //   confirmationTextP.append(" added to cart");

        const modalContainer = document.querySelector(".modal_container");
        modalContainer.style.opacity = '1';
        modalContainer.style.pointerEvents = 'auto';

        const proQuantity = document.querySelectorAll(".product_info .pro_data")
        proQuantity[0].innerText = `${final_quantity}`;
        proQuantity[1].innerText = `${proPrice}`;

    } else {
        const BtnAddToCart = document.getElementById(`btn_add_to_cart_${productId}`)
        BtnAddToCart.disabled = true
        BtnAddToCart.classList.add('disable')
        inputQuantity.value = final_quantity
        //        console.log("inputQuantity 2222 ----- ", inputQuantity)


        //     const productCount = document.getElementById(`input-quantity-${productId}`)
        const minusBtn = document.getElementById(`minus-btn-${productId}`)
        const plusBtn = document.getElementById(`plus-btn-${productId}`)
        //            productCount.value = response.quantity
        const incrementDecrementCart = (event) => incrementDecrementCartProductQuickView(event, response.product_id, response.order_line_id)
        minusBtn.onclick = incrementDecrementCart
        plusBtn.onclick = incrementDecrementCart
        inputQuantity.onchange = incrementDecrementCart
        //        console.log('minusBtn  ---- ', minusBtn)
        //        console.log('plusBtn  ---- ', plusBtn)
        //        console.log('inputQuantity  ---- ', inputQuantity)

    }

    LoadCartData() // loads cart slider data and cart icon item count

}



function closeCartModal(event) {
    modalContainer = document.querySelector(".modal_container")
    if (modalContainer) {
        modalContainer.style.opacity = '0';
        modalContainer.style.pointerEvents = 'none';
    }
}




/* for quick view */

async function updateCartUIProductQuickView(event, productId) {
    //    console.log('----- updateCartUI ------', productId)
    // const productId = document.getElementById("product_id").value;

    const response = await getCartProductProductQuickView(parseInt(productId))
    data = response.result.data

    const productCount = document.getElementById(`input-quantity-${productId}`)
    const minusBtn = document.getElementById(`minus-btn-${productId}`)
    const plusBtn = document.getElementById(`plus-btn-${productId}`)
    const BtnAddToCart = document.getElementById(`btn_add_to_cart_${productId}`)

    //    console.log('------------------------------------------------- getting everything    --------------------------------------------')
    //
    //    console.log("productCount:", productCount);
    //    console.log("minusBtn:", minusBtn);
    //    console.log("plusBtn:", plusBtn);
    //    console.log("BtnAddToCart:", BtnAddToCart);



    if (!data) {

        //        console.log('---------------------------------------------------------- no data --------------------------------------------------------')

        if (productCount && minusBtn && plusBtn && BtnAddToCart) {

            productCount.value = 1
            const incrementDecrementCart = (event) => incrementDecrementCartProductQuickView(event, false, false)

            minusBtn.onclick = incrementDecrementCart
            plusBtn.onclick = incrementDecrementCart

            BtnAddToCart.disabled = false
            BtnAddToCart.classList.remove('disable')

            //            console.log("productCount:", productCount);
            //            console.log("minusBtn:", minusBtn);
            //            console.log("plusBtn:", plusBtn);
            //            console.log("BtnAddToCart:", BtnAddToCart);

        }
        return
    }

    //    console.log('------------------------------------------- data -------------------------------------------------------------------')




    productCount.value = data.quantity
    const incrementDecrementCart = (event) => incrementDecrementCartProductQuickView(event, data.product_id, data.line_id)
    productCount.onclick = incrementDecrementCart
    minusBtn.onclick = incrementDecrementCart
    plusBtn.onclick = incrementDecrementCart

    BtnAddToCart.disabled = true
    BtnAddToCart.classList.add('disable')


    //    console.log("productCount:", productCount);
    //    console.log("minusBtn:", minusBtn);
    //    console.log("plusBtn:", plusBtn);
    //    console.log("BtnAddToCart:", BtnAddToCart);




}

function getCartProductProductQuickView(productId) {
    return fetch('/get/cart/product', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            product_id: productId
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error! Status: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            return data; // return to caller
        })
        .catch(error => {
            console.error("Error fetching cart product:", error);
            return null;
        });
}


async function incrementDecrementCartProductQuickView(event, productId, cartItemId) {
    console.log(' ------- increment_decrement_cart  -------- ')
    console.log('cartItemId  ---- ', cartItemId)

    const button = event.currentTarget
    const value = button.getAttribute('value')

    let deleted_item = false
    let final_quantity
    let valueInputField


    if (value === '-' || value === '+') {
        console.log('-----------------   - +    ---------------')

        const container = button.closest('.quantity-buttons')

        valueInputField = container.querySelector('.input-field')
        console.log('valueInputField -----  11111 ', valueInputField)

        item_qty = parseInt(valueInputField.value)

        if (value === '-') {
            if (item_qty > 1) {
                final_quantity = item_qty - 1
            } else {
                if (cartItemId) {
                    removeCartItemProductQuickView(event, cartItemId)
                    deleted_item = true

                    const addToCartBtn = document.getElementById(`btn_add_to_cart_${productId}`)
                    console.log('addToCartBtn  --- ', addToCartBtn)
                    if (addToCartBtn) {
                        addToCartBtn.disabled = false
                        addToCartBtn.classList.remove('disable')
                    }

                }
                valueInputField.value = 0
                return
            }

        }

        if (value === '+') {
            final_quantity = item_qty + 1
        }
    } else {
        console.log('-----------------   <>    ---------------')

        valueInputField = button
        console.log('valueInputField -----  2222 ', valueInputField)

        final_quantity = parseInt(valueInputField.value)
        if (final_quantity === 0) {
            removeCartItemProductQuickView(event, cartItemId)
            deleted_item = true
            const addToCartBtn = document.getElementById(`btn_add_to_cart_${productId}`)
            console.log('addToCartBtn  --- ', addToCartBtn)
            if (addToCartBtn) {
                addToCartBtn.disabled = false
                addToCartBtn.classList.remove('disable')
            }

        }

    }


    console.log('valueInputField----- ', valueInputField)
    if (!deleted_item && cartItemId) {
        console.log(' ----saveCartToDatabase ----')
        const response = await saveCartToDatabaseProductQuickView(productId, final_quantity, true)
        if (response === null) {
            return
        }

        console.log('response  ----- ', response)

        valueInputField.value = response.final_quantity

        const lineSubTotal = document.querySelector(`.line-subtotal[data-lineId='${cartItemId}']`)
        if (lineSubTotal) {
            lineSubTotal.innerText = data.line_subtotal
        }
    } else {

        valueInputField.value = final_quantity
    }

    //       LoadCartData(true)

}


function removeCartItemProductQuickView(event, cartItemId) {

    const response = fetch('/remove/cart/item', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cartItemId: cartItemId
        })
    }).then(response => response.json()
    ).then(data => {
        LoadCartData(true);
    })

}



function addToPCBuild(event, proId) {

    fetch('/create/pc_build', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_id: proId
        })
    }).then((response) => {
        if (!response.ok) {
            console.error("Failed to add product to PC build ", response);
            return;
        }
        return response.json();
    }).then((data) => {

        const status = data.result.status

        if (status) {
            window.location.href = '/pc_build'
        } else {
            console.error(data.result.error)
        }

    })
}

function addToCCBuild(event, proId, field) {
    console.log('addToCCBuild   --------  ', proId)
    console.log('field   --------  ', field)
    fetch('/create/cc_build', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_id: proId,
            field: field,
        })
    }).then((response) => {
        if (!response.ok) {
            console.error("Failed to add product to PC build ", response);
            return;
        }
        return response.json();
    }).then((data) => {

        const status = data.result.status

        if (status) {
            window.location.href = '/cc_build'
        } else {
            console.error(data.result.error)
        }

    })

}