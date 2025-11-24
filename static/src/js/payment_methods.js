
// shopping cart
openModalF('ssl-modal', '#ssl-modal-open-btn')


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