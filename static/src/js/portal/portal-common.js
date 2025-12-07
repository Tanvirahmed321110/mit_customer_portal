
// Tab Function (data-tab version)
function newTabF() {
    const allTabArea = document.querySelectorAll(".tab-area");

    if (allTabArea) {
        allTabArea.forEach(tabArea => {

            const buttons = tabArea.querySelectorAll(".tab-buttons .item");
            const contents = tabArea.querySelectorAll(".tab-content");

            if (!buttons || !contents) { return }

            buttons.forEach(btn => {
                btn.addEventListener("click", () => {

                    const tabName = btn.getAttribute("data-tab");

                    // remove active from buttons & contents
                    buttons.forEach(b => b.classList.remove("active"));
                    contents.forEach(c => c.classList.remove("active"));

                    // activate clicked button
                    btn.classList.add("active");

                    // activate matched content
                    const target = tabArea.querySelector(`.tab-content[data-tab="${tabName}"]`);
                    if (target) target.classList.add("active");
                });
            });

        });
    }
}

newTabF();



// Report Menu Toggle
function reportMenuToggle() {
    const reportItem = document.querySelector(".report-item");

    if (reportItem) {
        reportItem.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    }
}
reportMenuToggle()