closeButtonF()

// shopping cart
openModalF('shopping-cart-modal', '.shopping-cart-modal-open')

// compare product item
deleteF('.compare-product', '.compare-product .delete-btn')


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