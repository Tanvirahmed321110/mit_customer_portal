

// New Modal Here when click image
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".my-modal-new");
    const modalContent = document.querySelector(".image-modal-content");
    const modalImage = document.getElementById("modal-image");
    modalImage.style.width = 'fit-content'
    const closeModalBtn = document.querySelector(".my-modal-new .modal-close-btn");
    const overlay = document.querySelector(".overlay");

    document.querySelectorAll(".certification .item").forEach(item => {
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