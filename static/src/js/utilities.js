// Open Modal Function
function openModalF(modalId, btnSelector) {
    const modal = document.getElementById(modalId)
    const btns = document.querySelectorAll(btnSelector)


    if (modal && btns) {
        btns.forEach(btn => {
            btn.addEventListener('click', function () {
                modal.classList.add('active')
            })
        })
    }
}


// close button funciton
function closeButtonF() {

    const closeButtons = document.querySelectorAll('.modal-close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = btn.closest('.my-modal, .all-category'); // Selects the closest matching element

            if (modal) { // Check if a matching ancestor exists
                modal.classList.remove('active');
            }
        });
    });
}

document.addEventListener('click', function (event) {
    const closeButton = event.target.closest('.modal-close-btn');
    if (closeButton) {
        const modal = closeButton.closest('.my-modal, .all-category');
        if (modal) {
            modal.classList.remove('active');
        }
    }
});



// Sidebar toggle function
function toggleF(sidebarId, buttonId) {
    const sidebar = document.getElementById(sidebarId);
    const toggleBtn = document.getElementById(buttonId);
    const closeBtn = document.getElementById('close-mobile-sidebar')

    if (!sidebar || !toggleBtn) {
        console.error('Sidebar or Button not found. Check your IDs.');
        return;
    }

    // Add event listener to the button
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            toggleBtn.classList.toggle('active');

        });
    }

    if (closeBtn) {
        // close menu icon
        closeBtn.addEventListener('click', function () {
            if (sidebar.classList.contains('active')) {
                toggleBtn.classList.remove('active')
            }
            else {
                toggleBtn.classList.add('active')
            }
        })
    }
}




// function deleteAllF(deleteParent, deleteButtons, deleteItem) {
//     const parent = document.querySelector(deleteParent)
//     if (!parent) return;

//     const buttons = parent.querySelectorAll(deleteButtons)
//     const items = parent.querySelectorAll(deleteItem)


//     buttons.forEach((btn, index) => {
//         btn.addEventListener('click', function () {
//             if (items[index]) {
//                 items[index].remove()
//             }
//         })
//     })
// }







// Base function for updating quantity
function updateQuantity(inputField, operation) {
    let currentValue = parseInt(inputField.value) || 0;

    // Increment or decrement based on the operation
    if (operation === 'increment' && currentValue < 9) {
        inputField.value = currentValue + 1;
    } else if (operation === 'decrement' && currentValue > 1) {
        inputField.value = currentValue - 1;
    }
}




// setup quantity
function setupQuantityButtons() {
    const allCartItems = document.querySelectorAll('.shopping-cart-modal .item');

    allCartItems.forEach((item) => {
        const plusButton = item.querySelector('.plus-btn');
        const minusButton = item.querySelector('.minus-btn');
        const inputField = item.querySelector('.input-field');

        // Add event listener for the plus button
        plusButton.addEventListener('click', function () {
            updateQuantity(inputField, 'increment');
        });

        // Add event listener for the minus button
        minusButton.addEventListener('click', function () {
            updateQuantity(inputField, 'decrement');
        });
    });

}






// Search Dropdown
//function openSearchDropdown() {
//    const input = document.getElementById('search-input')
//    const dropdwon = document.getElementById('search-dropdown')
//
//
//    input.addEventListener('input', function () {
//        if (input.value.trim() !== '') {
//            dropdwon.classList.add('active');
//
//        } else {
//            dropdwon.classList.remove('active');
//        }
//    });
//
//    // Close dropdown when clicking outside
//    document.addEventListener('click', function (event) {
//        const isClickInside = dropdwon.contains(event.target) || input.contains(event.target);
//        if (!isClickInside) {
//            dropdwon.classList.remove('active'); // Close dropdown
//
//            if (dropdwon) {
//                dropdwon.classList.remove('active');
//            }
//        }
//    });
//}




// delete function
function deleteF(itemClass, btnsClass) {
    const buttons = document.querySelectorAll(btnsClass)
    buttons.forEach((btn) => {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            const item = btn.closest(itemClass);
            console.log(item)
            if (item) {
                item.remove();
            } else {
                console.warn("No parent item found for this button.");
            }
        });
    });
}

deleteF('.shopping-cart-modal .item', '.shopping-cart-modal .delete-btn')



// quick view
function quickViewF(buttons) {
    const btns = document.querySelectorAll(buttons)

    if (btns) {
        btns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                const modal = document.querySelector('.qucik-view-modal')

                console.log(modal)
                if (modal) {
                    modal.classList.add('active')
                }
            })
        })
    }
}
// quickViewF('.quick-view-btn');





// big image change
function bigImageChangeF(bigImg, smallImgsSelector) {
    const bigImage = document.getElementById(bigImg)
    const smallImgs = document.querySelectorAll(smallImgsSelector)

    activeF('.small-images img')

    if (bigImage && smallImgs) {
        smallImgs.forEach(img => {
            img.addEventListener('click', function () {
                bigImage.src = this.src
            })
        })
    }

}


// image zoom
document.addEventListener("DOMContentLoaded", function () {
    const bigImages = document.querySelectorAll('.big-image');

    if (bigImages) {
        bigImages.forEach(container => {
            const img = container.querySelector('img');

            container.addEventListener('mousemove', function (e) {
                const { left, top, width, height } = container.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;

                img.style.transformOrigin = `${x}% ${y}%`;
                img.style.transform = "scale(1.34)";
                container.style.border = '1px solid #f2f2f2';
            });

            container.addEventListener('mouseleave', function () {
                img.style.transform = "scale(1)";
                container.style.border = '1px solid transparent';
            });
        });
    }
});






document.addEventListener("DOMContentLoaded", function () {
    const upBtn = document.querySelector(".up-btn");

    if (upBtn) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 400) {
                upBtn.classList.add("active"); // Show button
            } else {
                upBtn.classList.remove("active"); // Hide button
            }
        });
    }
});




// funciton active
function activeF(selector) {
    const items = document.querySelectorAll(selector)

    if (items) {
        items.forEach(item => {
            item.addEventListener('click', function () {
                items.forEach(single => {
                    single.classList.remove('active')
                })
                item.classList.add('active')
            })
        })
    }
}







// doropdown
function dropdwonToggle(wrapperId) {
    const wrapper = document.getElementById(wrapperId)
    // const dropdowns = wrapper.querySelectorAll('.dropdwon')

    if (wrapper) {
        const btns = wrapper.querySelectorAll('.nav-btn')

        btns.forEach((btn, index) => {
            btn.addEventListener('click', function () {
                const dropdown = btn.querySelector('.dropdown');
                const icon = btn.querySelector('span')


                // Close all other dropdowns
                btns.forEach(otherBtn => {
                    const otherDropdown = otherBtn.querySelector('.dropdown')
                    const otherIcon = otherBtn.querySelector('span')

                    if (otherDropdown != dropdown) {
                        otherDropdown.classList.remove('active')
                        otherIcon.classList.remove('active')
                    }
                })

                if (dropdown) {
                    // Toggle the 'active' class on the dropdown
                    dropdown.classList.toggle('active');
                    icon.classList.toggle('active')
                }
            })
        })
    }
}


dropdwonToggle('category-sticky')









// Toggle category dropdowns and icon  for Mobile category
document.querySelectorAll('.open-btn').forEach(button => {
    button.addEventListener('click', function () {
        const dropdown = this.nextElementSibling; // The dropdown div
        const icon = this.querySelector('.plus-minus-btn i'); // The plus/minus icon

        // Close all other dropdowns and reset their icons
        document.querySelectorAll('.dropdown').forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('active'); // Close other dropdowns
                const otherIcon = otherDropdown.previousElementSibling.querySelector('.plus-minus-btn i');
                if (otherIcon) {
                    otherIcon.classList.remove('fa-minus'); // Change icon to plus
                    otherIcon.classList.add('fa-plus');
                }
            }
        });

        // Toggle the current dropdown
        dropdown.classList.toggle('active');

        // Toggle the icon for the current dropdown
        if (dropdown.classList.contains('active')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
});



// Toggle subcategory dropdowns and icon for Mobile category
document.querySelectorAll('.subcategory-btn').forEach(subcategory => {
    subcategory.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent navigation
        const nestedDropdown = this.nextElementSibling; // The nested dropdown div
        const icon = this.querySelector('.plus-minus-btn i'); // The plus/minus icon for nested dropdown

        // Close all other nested dropdowns and reset their icons
        document.querySelectorAll('.nested-dropdown').forEach(otherNestedDropdown => {
            if (otherNestedDropdown !== nestedDropdown) {
                otherNestedDropdown.classList.remove('active'); // Close other nested dropdowns
                const otherIcon = otherNestedDropdown.previousElementSibling.querySelector('.plus-minus-btn i');
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
            }
        });

        // Toggle the current nested dropdown
        nestedDropdown.classList.toggle('active');

        // Toggle the icon for the current nested dropdown
        if (nestedDropdown.classList.contains('active')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
});

toggleF('all-category', 'mobile-menu-icon');



const allCategoryClose = document.getElementById('all-category-close');
const mobileMenuIcon = document.getElementById('mobile-menu-icon');

// Listen for a click event on the 'all-category-close' button
if(allCategoryClose && mobileMenuIcon){
allCategoryClose.addEventListener('click', function () {
    // Remove the 'active' class from the mobile menu icon when the category close button is clicked
    mobileMenuIcon.classList.remove('active');
});

}




// Tab Function
function tabF(tabSelector, contentSelector) {

    document.querySelectorAll(tabSelector).forEach(tab => {
        tab.addEventListener('click', function () {
            document.querySelectorAll(tabSelector).forEach(t => t.classList.remove('active'));
            document.querySelectorAll(contentSelector).forEach(tc => tc.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(this.dataset.tab).classList.add('active');
        });
    });
}

// Example Usage




// when page reload then show modal
function pageReloadModal() {
    const modal = document.getElementById('page-reload-modal');

    if (!modal) return; // Exit if modal does not exist

    window.addEventListener("load", function () {
        setTimeout(() => {
            modal.classList.add('active');

            setTimeout(() => {
                modal.style.display = "none";
            }, 5000); // Hide after 5 seconds

        }, 2000); // Show after 2 seconds
    });
}

//pageReloadModal();


// for upcoming Modal
const upcomingModal = document.getElementById('upcoming-modal');

if (upcomingModal) {
    const upcomingLinks = document.querySelectorAll('.upcoming'); // get the a tags directly

    upcomingLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // stop page redirect
            upcomingModal.classList.add('active'); // show modal
        });
    });
}



// search bar for mobile
//function mobileSearchF(btnId, searchBarId) {
//    const searchInput = document.getElementById(searchBarId);
//    const btn = document.getElementById(btnId);
//
//    if (!searchInput || !btn) {
//        console.warn('Element not found:', { btn, searchInput });
//        return;
//    }
//
//    btn.addEventListener('click', function () {
//        searchInput.classList.toggle('active');
//    });
//}



// Load functions
// closeButtonF()
activeF('.bank-list .bank-name')

//mobileSearchF('mobile-search-btn', 'mobile-search-input')


// Full Page Loader
document.addEventListener("DOMContentLoaded", () => {
   window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if(loader){
        loader.classList.remove("active");
    }
    });
});





// ======================  For Validation Function  ===================
//======  show error message  ======
function showErrorMessage(input, message) {
    if (input && message) {
        const inputControl = input.parentElement;
        const errorTag = inputControl.querySelector('.error-text');

        if (errorTag) {
            inputControl.className = 'my-input-control error';
            errorTag.innerText = message;
        }
    }
}

//======  remove error message  ======
function removeErrorMessage(input) {
    if (input) {
        const inputControl = input.parentElement;
        inputControl.className = 'my-input-control';
    }
}

//=======  Check Required  Fields  =======
function checkRequired(inputs) {
    let isValid = true;
    if (inputs) {
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                showErrorMessage(input, `${input.name || input.id} field is required`);
                isValid = false;
            } else {
                removeErrorMessage(input);
            }
        });
    }
    return isValid;
}

//=======  Phone validation  =======
function isValidBDPhone(phone) {
    if (phone) {
        const bdPhoneRegex = /^(?:\+8801|8801|01)[3-9]\d{8}$/;
        return bdPhoneRegex.test(phone.trim());
    }
    return false;
}

//=======  Email validation  =======
function isValidEmail(emailString) {
    if (emailString) {
        const re = /\S+@\S+\.\S+/;
        return re.test(emailString.trim());
    }
    return false;
}


// ========  Form persistence setup  =========
function setupFormPersistence(formElement, storageKey) {
    if (!formElement) return;
    const key = storageKey || `form_${formElement.id || formElement.name}`;

    const getKeyForInput = (input) => input.name || input.id || input.dataset.persistKey;

    // Load saved data (handles text, checkbox, radio, selects)
    const saved = localStorage.getItem(key);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.keys(data).forEach(k => {
                // try [name="k"] first, then id="#k"
                const el = formElement.querySelector(`[name="${k}"]`) || formElement.querySelector(`#${k}`);
                if (!el) return;
                if (el.type === 'checkbox') {
                    el.checked = !!data[k];
                } else if (el.type === 'radio') {
                    const radio = formElement.querySelector(`input[type="radio"][name="${k}"][value="${data[k]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    el.value = data[k];
                }
            });
        } catch (err) {
            console.error('Failed to parse saved form data', err);
        }
    }

    function saveNow() {
        const data = {};
        formElement.querySelectorAll('input, textarea, select').forEach(input => {
            const k = getKeyForInput(input);
            if (!k) return;
            if (input.type === 'checkbox') {
                data[k] = input.checked;
            } else if (input.type === 'radio') {
                // only save value for checked radio
                if (input.checked) data[k] = input.value;
            } else {
                data[k] = input.value;
            }
        });
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Save on typing and on change (covers selects, checkboxes, etc.)
    formElement.addEventListener('input', saveNow);
    formElement.addEventListener('change', saveNow);

    // Clear storage after submit only if submission is NOT prevented by other listeners
    formElement.addEventListener('submit', (e) => {
        // run after other listeners finish (so validation can call preventDefault)
        setTimeout(() => {
            if (!e.defaultPrevented) {
                localStorage.removeItem(key);
            }
        }, 0);
    });

    // expose helpers if needed
    return {
        save: saveNow,
        clear: () => localStorage.removeItem(key)
    };
}