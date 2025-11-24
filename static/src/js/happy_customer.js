
// for mobile
document.getElementById('mobile-search-btn').addEventListener('click', function () {
    document.getElementById('mobile-search-input').classList.toggle('active')
})

// shopping cart
openModalF('shopping-cart-modal', '.shopping-cart-modal-open')




// New Modal Here
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".my-modal-new");
    const modalContent = document.querySelector(".image-modal-content");
    const modalImage = document.getElementById("modal-image");
    const closeModalBtn = document.querySelector(".my-modal-new .modal-close-btn");
    const overlay = document.querySelector(".overlay");

    document.querySelectorAll(".happy-client-item").forEach(item => {
        item.addEventListener("click", function () {
            const itemImg = item.querySelector("img"); // Item er vitorer image select kora
            if (itemImg) {
                modalImage.src = itemImg.getAttribute('src'); // Image src set kora
                modal.classList.add("active");
                overlay.classList.add("active");
            }
        });
    });

    // close modal
    function closeModal() {
        modal.classList.remove("active");
        overlay.classList.remove("active");
    }

    // Close modal when clicking on close button
    closeModalBtn.addEventListener("click", closeModal);

    // Close modal when clicking on overlay
    overlay.addEventListener("click", closeModal);

    // Close modal when clicking outside modal content
    modal.addEventListener("click", function (event) {
        if (!modalContent.contains(event.target)) {
            closeModal();
        }
    });
});


closeButtonF()

// shopping cart
openModalF('shopping-cart-modal', '.shopping-cart-modal-open')





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