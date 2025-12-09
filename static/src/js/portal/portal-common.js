
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




// Portal Sidebar Toggle
function portalSidebarToggle() {
    const sidebarToggleBtn = document.getElementById("portal-sidebar-toggle-btn");
    const sidebarWrap = document.getElementById("portal-sidebar");
    const body = document.body;

    // Validation
    if (!sidebarToggleBtn || !sidebarWrap || !body) return;

    // Find the <i> inside the button
    const icon = sidebarToggleBtn.querySelector("i");
    if (!icon) return;

    // Click Event Here
    sidebarToggleBtn.addEventListener("click", function () {
        // Toggle sidebar active class
        sidebarWrap.classList.toggle("active");

        if (sidebarWrap.classList.contains("active")) {
            body.style.overflow = "hidden";
            icon.classList.remove("fa-angles-right");
            icon.classList.add("fa-xmark");
        } else {
            body.style.overflow = "";
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-angles-right");
        }
    });
}

// Initialize
portalSidebarToggle();
