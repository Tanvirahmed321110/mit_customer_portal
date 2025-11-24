
//
//document.addEventListener('DOMContentLoaded', function () {
//
//});

//function addItemToLocalStorage(productId, quantity, name, price, image){
//        console.log('---- addItemToLocalStorage ----- ');
//        let cart = JSON.parse(localStorage.getItem('cart')) || [];
//        console.log('cart 1111  ---- ', cart);
//
//        const existingProduct = cart.find((p)=>p.id === productId);
//
//        let final_quantity;
//        if (existingProduct){
//            existingProduct.quantity += quantity;
//            final_quantity = existingProduct.quantity;
//
//            existingProduct.name = name;
//            existingProduct.price = price;
//            existingProduct.image = image;
//        }
//        else{
//            cart.push({
//            id: productId,
//            quantity: quantity,
//            name: name,
//            price: price,
//            image: image
//            });
//
//            final_quantity = quantity;
//        }
//       console.log('cart 2222 ---- ', cart);
//
//        localStorage.setItem("cart", JSON.stringify(cart));
//
//        saveCartToDatabase(productId, final_quantity);
//
//   return final_quantity;
//}





async function saveCartToDatabaseProductQuickView(productId, quantity, set_quantity){
 if(parseInt(quantity)<1){
   return null
 }

   let response =  await fetch("/save/cart",{
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
        return data.result.data
    }).catch(error =>{
             console.log(" ----- error ----")

    })
    return response
}

async function addToCartProductQuickView(event, qty=false){

   buyNowBtn = event.currentTarget
   const productId = buyNowBtn.getAttribute('data-proId')
   const proName = buyNowBtn.getAttribute("data-proName")
   const proPrice = buyNowBtn.getAttribute("data-proPrice")
   const proImage = buyNowBtn.getAttribute("data-proImage")
   console.log("input-quantity ----- ", `input-quantity-${productId}`)

   const inputQuantity = document.getElementById(`input-quantity-${productId}`)
   console.log("qty ----- ", qty)
   console.log("Product id ----- ", productId)
   console.log("proName ----- ", proName)
   console.log("inputQuantity 111 ----- ", inputQuantity)


    let response = qty? await saveCartToDatabaseProductQuickView(productId, parseInt(inputQuantity.value), true):await saveCartToDatabaseProductQuickView(productId, 1, false);
    if (!response){
    return
  }
    let final_quantity = response.final_quantity
  console.log('final_quantity  -----', final_quantity)



if(!qty){
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
   modalContainer.style.pointerEvents ='auto';

   const proQuantity = document.querySelectorAll(".product_info .pro_data")
   proQuantity[0].innerText = `${final_quantity}`;
   proQuantity[1].innerText = `${proPrice}`;

}else{
    const BtnAddToCart = document.getElementById(`btn_add_to_cart_${productId}`)
    BtnAddToCart.disabled = true
    BtnAddToCart.classList.add('disable')
    inputQuantity.value = final_quantity
       console.log("inputQuantity 2222 ----- ", inputQuantity)


//     const productCount = document.getElementById(`input-quantity-${productId}`)
    const minusBtn = document.getElementById(`minus-btn-${productId}`)
    const plusBtn = document.getElementById(`plus-btn-${productId}`)
//            productCount.value = response.quantity
            const incrementDecrementCart = (event) => incrementDecrementCartProductQuickView(event, response.product_id, response.order_line_id)
            minusBtn.onclick = incrementDecrementCart
            plusBtn.onclick = incrementDecrementCart
            inputQuantity.onchange = incrementDecrementCart
            console.log('minusBtn  ---- ',minusBtn)
            console.log('plusBtn  ---- ',plusBtn)
            console.log('inputQuantity  ---- ',inputQuantity)

}

   LoadCartData() // loads cart slider data and cart icon item count

}



function closeCartModal(event){
    modalContainer = document.querySelector(".modal_container")
    if (modalContainer){
        modalContainer.style.opacity = '0';
        modalContainer.style.pointerEvents = 'none';
    }
}




/* for quick view */

async function updateCartUIProductQuickView(event, productId){
console.log('----- updateCartUI ------', productId)
// const productId = document.getElementById("product_id").value;

    const response = await getCartProductProductQuickView(parseInt(productId))
    data = response.result.data

    const productCount = document.getElementById(`input-quantity-${productId}`)
    const minusBtn = document.getElementById(`minus-btn-${productId}`)
    const plusBtn = document.getElementById(`plus-btn-${productId}`)
    const BtnAddToCart = document.getElementById(`btn_add_to_cart_${productId}`)

            console.log('------------------------------------------------- getting everything    --------------------------------------------')

      console.log("productCount:", productCount);
        console.log("minusBtn:", minusBtn);
        console.log("plusBtn:", plusBtn);
        console.log("BtnAddToCart:", BtnAddToCart);



    if(!data){

        console.log('---------------------------------------------------------- no data --------------------------------------------------------')

        if (productCount && minusBtn && plusBtn && BtnAddToCart){

                productCount.value = 1
                const incrementDecrementCart = (event) => incrementDecrementCartProductQuickView(event, false, false)

                minusBtn.onclick = incrementDecrementCart
                plusBtn.onclick = incrementDecrementCart

                BtnAddToCart.disabled = false
                BtnAddToCart.classList.remove('disable')

        console.log("productCount:", productCount);
        console.log("minusBtn:", minusBtn);
        console.log("plusBtn:", plusBtn);
        console.log("BtnAddToCart:", BtnAddToCart);

        }
        return
    }

           console.log('------------------------------------------- data -------------------------------------------------------------------')




            productCount.value = data.quantity
            const incrementDecrementCart = (event) => incrementDecrementCartProductQuickView(event, data.product_id, data.line_id)
            productCount.onclick = incrementDecrementCart
            minusBtn.onclick = incrementDecrementCart
            plusBtn.onclick = incrementDecrementCart

            BtnAddToCart.disabled = true
            BtnAddToCart.classList.add('disable')


         console.log("productCount:", productCount);
        console.log("minusBtn:", minusBtn);
        console.log("plusBtn:", plusBtn);
        console.log("BtnAddToCart:", BtnAddToCart);




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


    async function incrementDecrementCartProductQuickView(event, productId, cartItemId){
    console.log(' ------- increment_decrement_cart  -------- ')
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
              removeCartItemProductQuickView(event, cartItemId)
              deleted_item = true

              const addToCartBtn = document.getElementById(`btn_add_to_cart_${productId}`)
              console.log('addToCartBtn  --- ',addToCartBtn)
              if(addToCartBtn){
                 addToCartBtn.disabled = false
                 addToCartBtn.classList.remove('disable')
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
         removeCartItemProductQuickView(event, cartItemId)
         deleted_item = true
          const addToCartBtn = document.getElementById(`btn_add_to_cart_${productId}`)
              console.log('addToCartBtn  --- ',addToCartBtn)
              if(addToCartBtn){
                  addToCartBtn.disabled = false
                 addToCartBtn.classList.remove('disable')
              }

         }

       }


      console.log('valueInputField----- ', valueInputField)
       if (!deleted_item && cartItemId){
       console.log(' ----saveCartToDatabase ----')
       const response = await saveCartToDatabaseProductQuickView(productId, final_quantity, true)
        if (response === null){
             return
           }

       console.log('response  ----- ',response)

       valueInputField.value = response.final_quantity

       const lineSubTotal = document.querySelector(`.line-subtotal[data-lineId='${cartItemId}']`)
       if (lineSubTotal){
            lineSubTotal.innerText = data.line_subtotal
       }
       }else{

            valueInputField.value = final_quantity
       }

//       LoadCartData(true)

}


function removeCartItemProductQuickView(event, cartItemId){

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

