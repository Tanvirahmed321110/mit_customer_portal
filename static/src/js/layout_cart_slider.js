document.addEventListener('DOMContentLoaded', function (event) {
    LoadCartData(true)

})

/* ========================================================
    * Side bar cart
    ======================================================== */



function LoadCartData(JustUpdateCartCount = false) {
    console.log('--------  LoadCartData layout ------')

    fetch('/get/cart/data', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    }).then(response => {

        if (!response.ok) {
            throw new Error("HTTP error! Status: " + response.statusText)
        }
        const json_data = response.json()
        return json_data
    })
        .then(data => {

            cart = data.result.data
            render_cart(JustUpdateCartCount, cart.cart_data, cart.lines, cart.base_url)

        }).catch(error => {
            console.log("Error loading cart: " + error.message)
        })

}

function render_cart(JustUpdateCartCount, cart_data, lines, base_url) {
    console.log('--------  render cart  layout------')

    const totalCartItem = document.getElementById('total-cart-item')
    console.log('totalCartItem  ----  ', totalCartItem)
    totalCartItem.innerText = lines.length

    const cartIconDesktop = document.getElementById('cart-icon-desktop')
    cartIconDesktop.innerText = lines.length
    const cartIconMobile = document.getElementById('cart-icon-mobile')
    cartIconMobile.innerText = lines.length

    if (JustUpdateCartCount) {

        return
    }



    const container = document.getElementById('cart_items')

    container.innerHTML = ""

    lines.forEach((item, index) => {
        const itemDiv = document.createElement('div')
        itemDiv.classList.add('item', 'my-flex-between', 'my-gap-4')
        itemDiv.innerHTML = `
            <!--_______  single cart item  _______-->
            <div class="my-w-100">

                <div class="left my-d-flex my-align-start my-gap-4">
                    <!-- image -->
                    <div class="img">
                        <img src="data:image/png;base64,${item.image}" alt="card-1"/>
                    </div>

                    <!-- information -->
                    <div class="my-align-start my-gap-2 my-flex-column info">
                        <div>
                            <h6>
                                <a class="" href="./Pages/product.html">${item.product_name}</a>
                            </h6>
                        </div>

                        <!-- delete button -->
                        <button class="delete-btn my-text-red" data_id="${item.id}" onclick="removeCartItemLayout(event, ${item.id})">
                            <i class="fa-solid fa-trash-can"></i>
                            <span class="my-fs-xs">Delete</span>
                        </button>
                    </div>
                </div>

                <!-- right -->
                <div class="right my-flex-between my-gap-4">

                    <!-- quantity buttons -->
                    <div class="my-d-flex quantity-buttons my-mt-2">
                        <input type="button" value="-" class="minus-btn" onclick="increment_decrement_cart_layout(event, ${item.product_id}, ${item.id})"/>
                        <input type="number" step="1" class="input-field" value="${item.quantity}"/>
                        <input type="button" value="+" class="plus-btn" onclick="increment_decrement_cart_layout(event, ${item.product_id}, ${item.id})"/>
                    </div>

                    <!-- price -->
                    <div class="price my-flex-column my-gap-2">
                        <!-- new price -->
                        <div class="new-price my-fs-md my-align-center ">
                            <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                            <h6>${item.subtotal}</h6>
                        </div>

                        <!-- old price -->
                        <del class="old-price my-text-gray2 my-fs-xs my-align-center ">

                            ${item.discount ? `<i class="fa-solid fa-bangladeshi-taka-sign"></i> <p class="my-fs-xs my-text-gray2">${item.actual_price}` : ""}
                            </p>
                        </del>
                    </div>
                </div>
            </div> <!-- End item -->
            `;

        container.appendChild(itemDiv)
    })


}



async function increment_decrement_cart_layout(event, productId, cartItemId) {
    console.log('------ increment_decrement_cart_layout ------ ')

    const button = event.currentTarget
    const value = button.getAttribute('value')
    const container = button.closest('.quantity-buttons')
    if (value && container) {

        console.log('--------  value container ------ ')
    }
    let deleted_item = false

    const valueInputField = container.querySelector('.input-field')
    let final_quantity
    item_qty = parseInt(valueInputField.value)

    if (value === '-') {
        if (item_qty > 1) {
            final_quantity = item_qty - 1
        } else {
            removeCartItemLayout(event, cartItemId)
            deleted_item = true
        }
    }
    if (value === '+') {

        final_quantity = item_qty + 1

    }


    if (!deleted_item) {
        response = await saveCartToDatabaseLayout(productId, final_quantity, true)
        LoadCartData()

    }

}


function saveCartToDatabaseLayout(productId, quantity, set_quantity) {

    let response = fetch("/save/cart", {
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

        return data.result
    }).catch(error => {
        console.log(" ----- error ----")

    })

    return response
}



function removeCartItemLayout(event, cartItemId) {

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
        LoadCartData();
    })

}