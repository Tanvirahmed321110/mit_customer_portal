
document.addEventListener('DOMContentLoaded', function(){

        loadCart();
        })

function loadCart(){
        fetch("/get/cart/data", {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({})

        }).then( (response) => {

            if (!response.ok){
                throw new Error("HTTP error! Status: " + response.status);
            }
            json_data =  response.json()

            return json_data

        }).then(data=>{

        data = data.result.data
            renderCart(data.cart_data, data.lines, data.base_url)
        }).catch(error => {
            console.log("Error loading cart: " + error.message)
        })
}

function renderCart(cart_data, lines, base_url){
    const container = document.querySelector('.products-area-table')
     const cartIconDesktop = document.getElementById('cart-icon-desktop')
   cartIconDesktop.innerText = lines.length
   const cartIconMobile = document.getElementById('cart-icon-mobile')
   cartIconMobile.innerText = lines.length



    container.innerHTML=""

    const totalItems = document.createElement('p')
    totalItems.innerHTML = `
        You have (${lines.length}) items in your cart.
    `;
    container.appendChild(totalItems)


//    cart items dynamically added
    lines.forEach(line=>{

             const li = document.createElement('li')
    li.classList.add('my-d-flex', 'my-gap-4', 'item', 'my-border-bottom', 'my-flex-between', 'my-px-5', 'my-py-3')
        li.innerHTML = `

            <div>
                <a href="#">
                    <img class="w-15 my-border"
                     src="data:image/png;base64,${line.image}"
                     alt=""/>
                </a>
            </div>

            <div class="my-flex-column details my-gap-0">
                <a href="#">
                     <h5 class="text-hover-primary">${line.product_name}</h5>
                 </a>
                <p class="my-mt-0 ">

                    <i class="fa-solid fa-bangladeshi-taka-sign">
                            ${line.price_unit}
                    </i>

                    ${line.discount?  `<i class="fa-solid fa-bangladeshi-taka-sign my-text-gray my-fs-xs my-p-2" > <del>${line.actual_price}</del></i>`:""}

                </p>
                <div class="my-fs-sm my-mt-2 my-text-gray2">Discount-
                    <span> ${line.discount} </span>
                </div>
                 <div class="my-fs-sm my-mt-2 my-text-gray2">Tax-
                    <span> ${line.tax} </span>
                </div>
            </div>

            <div class="quantity-buttons-area my-align-center  my-flex-column my-gap-2">

                <div class="my-d-flex quantity-buttons my-align-center ">
                    <input type="button" value="-" class="minus-btn" onclick="increment_decrement_cart(event, ${line.product_id}, ${line.id})"/>
                    <input type="number" step="1" min="0" class="input-field"
                          value="${line.quantity}" onchange = "increment_decrement_cart(event, ${line.product_id}, ${line.id})"/>
                    <input type="button" value="+" class="plus-btn" onclick="increment_decrement_cart(event, ${line.product_id}, ${line.id})"/>
                </div>


            </div>

            <h5 class="line-subtotal" data-lineId="${line.id}">${line.subtotal}</h5>


            <button onclick='removeCartItem(event, ${line.id})' class="my-fs-md my-text-red">
                <i
                        class="fa-solid fa-trash-can"></i>
            </button>

    `;
        container.appendChild(li)

    })


//    cart right full summary dynamic

  const shoppingCart = document.querySelector('.shopping-cart-modal');

  const right = shoppingCart.querySelector('.right');
  if (right){
        right.remove();
  }

    const right_new = document.createElement('div')
    right_new.classList.add('right')
    right_new.innerHTML = `
                    <div class="my-bg-white my-p-4">
                <h4 class="my-fw-bolder">Price Detials</h4>
                <div>
                    <ul class="my-mt-4 my-flex-column my-gap-3">
                        <li class="my-flex-between">
                            <div class="my-fw-bold my-text-gray2">Subtotal</div>
                            <div id='cart-item-total' class="my-fw-bold my-text-gray2">
                                <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                                <span>${cart_data.cart_item_total}</span>
                            </div>
                        </li>
                        <li class="my-flex-between">
                            <div class="my-fw-bold my-text-gray2">Total discount</div>
                            <div id='total-discount' class="my-fw-bold my-text-gray2">
                                <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                                <span>${cart_data.total_discount}</span>
                            </div>
                        </li>
                        <li class="my-flex-between">
                            <div class="my-fw-bold my-text-gray2 ">Shipping</div>
                            <div class="my-fw-bold my-text-gray2">
                                <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                                00
                            </div>
                        </li>
                        <li class="my-flex-between">
                            <div class="my-fw-bold my-text-gray2">Total tax</div>
                            <div id='total-tax' class="my-fw-bold my-text-gray2">
                                <i class="fa-solid"></i>
                                <span>${cart_data.total_tax}</span> %
                            </div>
                        </li>
                        <li id='amount-total' class="my-flex-between my-border-top my-pt-2">
                            <h4>Total</h4>
                            <h4>
                                <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                                <span>${cart_data.amount_total}</span>
                            </h4>
                        </li>
                    </ul>
                </div>

                <div class="my-flex-column my-gap-2 my-mt-8">
                    <a class="my-btn my-primary-btn" href="/shop">Continue Shopping </a>
                    <a class="my-btn my-secendary-btn" href="/checkout">Checkout</a>
                </div>
            </div>

    `;

    shoppingCart.appendChild(right_new)

}




    closeButtonF()


// shopping cart
openModalF('shopping-cart-modal', '.shopping-cart-modal-open')



    // for search
//    openSearchDropdown()



// shopping cart
openModalF('shopping-cart-modal', '.shopping-cart-modal-open')



// Select all EMI buttons
//document.querySelectorAll(".emi-btn").forEach(button => {
//    button.addEventListener("click", function () {
//        this.classList.toggle("active");
//    });
//
//});
// deleteF('.products-area-table li', '.products-area-table .delete-btn')



// for quantity
setupQuantityButtons()

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



function saveCartToDatabase(productId, quantity, set_quantity){

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

        return data.result
    }).catch(error =>{
             console.log(" ----- error ----")

    })

    return response
}

//function addToCart(event){
//    const qtyInput = event.currentTarget
//    const qtyValue = qtyInput.
//
//}



    async function increment_decrement_cart(event, productId, cartItemId){

        const button = event.currentTarget
       const value = button.getAttribute('value')
       const container = button.closest('.quantity-buttons')
        let deleted_item = false
       let final_quantity
       let valueInputField


        if(value === '-' || value === '+'){
                   console.log('-----------------   - +    ---------------')

        valueInputField = container.querySelector('.input-field')
       final_quantity
      item_qty =  parseInt(valueInputField.value)

       if (value === '-'){
        if (item_qty > 1){
            final_quantity = item_qty - 1
        }else{
            removeCartItem(event, cartItemId)
            deleted_item = true
        }

       }

       if (value === '+'){

       final_quantity = item_qty + 1

       }

       }else{
              console.log('-----------------   <>   ---------------')

            valueInputField = button
                      console.log('valueInputField -----  2222 ', valueInputField)

         final_quantity = parseInt(valueInputField.value)
         if (final_quantity === 0){
         removeCartItem(event, cartItemId)
         deleted_item = true

         }
       }

       if (!deleted_item){
       response = await saveCartToDatabase(productId, final_quantity, true)

       console.log('response  ----- ',response)

       data = response.data
       valueInputField.value = data.final_quantity

       const lineSubTotal = document.querySelector(`.line-subtotal[data-lineId='${cartItemId}']`)
       if (lineSubTotal){
            lineSubTotal.innerText = data.line_subtotal
       }

//       updating cart summary
            document.querySelector('#cart-item-total span').innerText = data.cart_item_total
            document.querySelector('#total-discount span').innerText = data.total_discount
            document.querySelector('#total-tax span').innerText = data.total_tax
            document.querySelector('#amount-total span').innerText = data.amount_total

       }

}


function removeCartItem(event, cartItemId){

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
          loadCart();
    })

}



