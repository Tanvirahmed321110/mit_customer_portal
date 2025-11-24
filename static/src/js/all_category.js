document.querySelectorAll('.show-cateogry-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const hideCategory = this.closest('li').nextElementSibling;
        const isActive = hideCategory.classList.toggle('active');

        // Toggle text and icon
        const icon = this.querySelector('.fa-caret-down');

        if (isActive) {
            btn.innerHTML = `<button
                            class="show-cateogry-btn  my-d-flex my-align-center my-gap-2 my-fs-sm">
                            Show Less
                            <span class="my-fs-xs"><i class="fa-solid fa-caret-down"></i></span>
                        </button>`
        } else {
            btn.innerHTML = `<button
                            class="show-cateogry-btn  my-d-flex my-align-center my-gap-2 my-fs-sm">
                            Show More
                            <span class="my-fs-xs"><i class="fa-solid fa-caret-down"></i></span>
                        </button>`
        }
    });
});
