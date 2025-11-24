// emi price modal
//activeF('.bank-list .bank-name')
//// emi price modal
//openModalF('emi-price-modal', '#emi-modal-open-btn')
//
//// shopping cart
//openModalF('shopping-cart-modal', '.shopping-cart-modal-open')


// big image change
//bigImageChangeF('big-img', '.small-images img')


// active class for varient ram
//activeF('.varient-items .item')


// Quick View
// quickViewF('.quick-view-btn')



// big image zoom in when hover
//document.addEventListener("DOMContentLoaded", function () {
//    const bigImage = document.getElementById('big-img');
//
//    bigImage.addEventListener('mousemove', function (e) {
//        const { left, top, width, height } = bigImage.getBoundingClientRect();
//        const x = ((e.clientX - left) / width) * 100;
//        const y = ((e.clientY - top) / height) * 100;
//
//        bigImage.style.transformOrigin = `${x}% ${y}%`;
//        bigImage.style.transform = "scale(1.4)"; // Zoom level
//    });
//
//    bigImage.addEventListener('mouseleave', function () {
//        bigImage.style.transform = "scale(1)"; // Reset zoom
//    });
//});

activeF('.small-images img')







toggleF('all-category', 'mobile-menu-icon');

// For Question and Ans Validation form
const Questionform = document.getElementById('question-form')
if (Questionform) {
    const input = document.getElementById('question-input')

    Questionform.addEventListener('submit', function (e) {
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



// for review validation
const reviewnform = document.getElementById('review-form')

if (reviewnform) {
    const input = document.getElementById('review-input')

    reviewnform.addEventListener('submit', function (e) {
        const inputValue = input.value.trim();

        if (inputValue === '') {
            e.preventDefault()
            showErrorMessage(input, 'Empty String Not Allow, Please Write Something')
            console.log('reviewnform 2')
        }
        else if (inputValue.length >= 100) {
            e.preventDefault()
            showErrorMessage(input, 'Please write maximum 100 letters only');
            console.log('reviewnform')
        }
        else {
            removeErrorMessage(input)
        }
    })
}






/* ----------------------------
 * Rating
---------------------------- */

let currentRating = 0;

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

/* Offer Coundown */

$(document).ready(function () {

    let offer_end_datetime = $('#offer_end_datetime').val();
    console.log('offer_end_datetime:', offer_end_datetime);
    const offerEndTime = new Date(offer_end_datetime).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = offerEndTime - now;

        if (distance <= 0) {
            $("#countdown").html("00 Days 00 Hours 00 Minutes 00 Seconds");
            clearInterval(timer);
            return;
        }

        const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
        const hours = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((distance / 1000) % 60)).padStart(2, '0');

        $("#days").text(days);
        $("#hours").text(hours);
        $("#minutes").text(minutes);
        $("#seconds").text(seconds);
    }

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Tab clicks
    var headerHeight = $("header").outerHeight();
    $("#tab-description").on("click", function () {
        $('html, body').animate({
            scrollTop: $("#description").offset().top - headerHeight
        }, 100);
    });

    $("#tab-video").on("click", function () {
        $('html, body').animate({
            scrollTop: $("#video").offset().top - headerHeight
        }, 100);
    });

    $("#tab-questions").on("click", function () {
        $('html, body').animate({
            scrollTop: $("#questions").offset().top - headerHeight
        }, 100);
    });

    $("#tab-review").on("click", function () {
        $('html, body').animate({
            scrollTop: $("#review").offset().top - headerHeight
        }, 100);
    });

    /* Add or remove from favorite
     * Add or remove from favorite
     */

    function handle_response(res) {

        result = res.result;

        if (result.status == 'success' && result.code == 'ADDED') {
            $('#fav_toggle_icon').removeClass('fa-regular')
            $('#fav_toggle_icon').addClass('fa-solid')

        } else if (result.status == 'success' && result.code == 'REMOVED') {
            $('#fav_toggle_icon').removeClass('fa-solid')
            $('#fav_toggle_icon').addClass('fa-regular')
        }
    }

    function favorite_product_toggle() {

        let data = {
            product_id: $('#product_id').val()
        }

        $.ajax({
            url: '/api/v1/favorite/product/toggle',
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

    let fav_timeout;
    function validate_fav_toggle() {
        clearTimeout(fav_timeout)
        fav_timeout = setTimeout(() => {
            favorite_product_toggle();
        }, 1000);
    }

    $('.fav_toggle').on('click', function () {

        let js_data_str = $('#js_data').val();
        let js_data = JSON.parse(js_data_str)

        let partner_id = js_data.partner_id
        if (partner_id == null) {
            location.assign('/web/login')

        } else {
            validate_fav_toggle();
        }
    });
    /* End fav */


    openModalF('emi-price-modal', '#emi-modal-open-btn2')

}) // End Ready




function saveCartToDatabaseProduct(productId, quantity, set_quantity){
 if(parseInt(quantity)<1){
   return null
 }

   let response =  fetch("/save/cart",{
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
    if(!response.ok){
        console.log(" ----- error ----")
    }
     return response.json()
    }).then(data => {
            LoadCartData(true)

        return data.result
    }).catch(error =>{
             console.log(" ----- error ----")

    })

    return response
}

async function addToCartProduct(event, productId){


console.log('  add to Cart Product ')
      const qtyValue = document.getElementById('input-quantity')
         console.log('qtyValue ------ ',qtyValue.value)



   let response = await saveCartToDatabaseProduct(productId, parseInt(qtyValue.value), true);
   if (response === null){
     return
   }
   console.log('response ------ ',response)
   console.log('final_quantity ------ ',response.data.final_quantity)

   qtyValue.value = response.data.final_quantity

   const minusBtn = document.getElementById('minus-btn')
   minusBtn.onclick = (event) => increment_decrement_cart_product(event, productId, response.data.order_line_id)
   qtyValue.onchange= (event) => increment_decrement_cart_product(event, productId, response.data.order_line_id)
   const plusBtn = document.getElementById('plus-btn')
      plusBtn.onclick = (event) => increment_decrement_cart_product(event, productId, response.data.order_line_id)

      const addToCartBtn = document.getElementById('btn_add_to_cart')
//      console.log('addToCartBtn  --- ',addToCartBtn)
    if(addToCartBtn){
          addToCartBtn.style.display = 'none'
    }


}

    async function similarProductAddToCart(productId, qty, set){

       let response = await saveCartToDatabaseProduct(productId, parseInt(qty), set);
       console.log('add_cart_${productId}  ---  ',`add_cart_${productId}`)
       const cartBtn = document.getElementById(`add_cart_${productId}`)
       cartBtn.disabled = true
       cartBtn.classList.add('disable')
//        LoadCartData(true)

    }

    async function increment_decrement_cart_product(event, productId, cartItemId){
    console.log('cartItemId  ---- ', cartItemId)

        const button = event.currentTarget
       const value = button.getAttribute('value')

       let deleted_item = false
       let final_quantity
       let valueInputField


       if(value === '-' || value === '+'){
       console.log('-----------------   - +    ---------------')

       const container = button.closest('.quantity-buttons')

        valueInputField = container.querySelector('.input-field')
             console.log('valueInputField -----  11111 ', valueInputField)

      item_qty =  parseInt(valueInputField.value)

       if (value === '-'){
        if (item_qty > 1){
            final_quantity = item_qty - 1
        }else{
          if(cartItemId){
              removeCartItemProduct(event, cartItemId)
              deleted_item = true

              const addToCartBtn = document.getElementById('btn_add_to_cart')
              console.log('addToCartBtn  --- ',addToCartBtn)
              if(addToCartBtn){
                 addToCartBtn.style.display = 'block'
              }

          }
          valueInputField.value = 0
          return
        }

       }

       if (value === '+'){
        final_quantity = item_qty + 1
       }
       }else{
              console.log('-----------------   <>    ---------------')

         valueInputField = button
                      console.log('valueInputField -----  2222 ', valueInputField)

         final_quantity = parseInt(valueInputField.value)
         if (final_quantity === 0){
         removeCartItemProduct(event, cartItemId)
         deleted_item = true
          const addToCartBtn = document.getElementById('btn_add_to_cart')
              console.log('addToCartBtn  --- ',addToCartBtn)
              if(addToCartBtn){
                 addToCartBtn.style.display = 'block'
              }

         }

       }


      console.log('valueInputField----- ', valueInputField)
       if (!deleted_item && cartItemId){
       console.log(' ----saveCartToDatabaseProduct ----')
       const response = await saveCartToDatabaseProduct(productId, final_quantity, true)
        if (response === null){
             return
           }

       console.log('response  ----- ',response)

       data = response.data
       valueInputField.value = data.final_quantity

       const lineSubTotal = document.querySelector(`.line-subtotal[data-lineId='${cartItemId}']`)
       if (lineSubTotal){
            lineSubTotal.innerText = data.line_subtotal
       }
       }else{
              console.log(' ----saveCartToDatabaseProduct ----')

            valueInputField.value = final_quantity
       }

//       LoadCartData(true)

}

function removeCartItemProduct(event, cartItemId){

    const response = fetch('/remove/cart/item',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    cartItemId: cartItemId
                })
    }).then(response=> response.json()
    ).then(data=>{
          LoadCartData(true);
    })

}