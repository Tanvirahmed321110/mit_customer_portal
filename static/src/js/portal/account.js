
const avatarInput = document.getElementById('avatarInput');
const avatarImg = document.getElementById('avatarImg');
const avatarPlaceholder = document.getElementById('avatarPlaceholder');
const chooseBtn = document.getElementById('chooseBtn');
const resetBtn = document.getElementById('resetBtn');
const form = document.getElementById('contactForm');


// Click on the visible button triggers the file input
chooseBtn.addEventListener('click', () => avatarInput.click());


// Preview selected image
avatarInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;


    // basic size validation (3MB)
    if (file.size > 3 * 1024 * 1024) {
        alert('Image too large. Max 3MB.');
        avatarInput.value = '';
        return;
    }


    const reader = new FileReader();
    reader.onload = function (ev) {
        avatarImg.src = ev.target.result;
        avatarImg.style.display = 'block';
        avatarPlaceholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
});


// Reset form including avatar
resetBtn.addEventListener('click', () => {
    form.reset();
    avatarImg.style.display = 'none';
    avatarImg.src = '';
    avatarPlaceholder.style.display = 'flex';
});


// Simple client-side validation on submit
form.addEventListener('submit', (e) => {
    // example: require full name and email
    const name = document.getElementById('fullName');
    const email = document.getElementById('email');
    let ok = true;


    [name, email].forEach(el => el.classList.remove('error'));


    if (!name.value.trim()) { ok = false; name.classList.add('error'); }
    if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) { ok = false; email.classList.add('error'); }


    if (!ok) {
        e.preventDefault();
        alert('Please fill required fields correctly.');
    } else {
        // proceed — you can add AJAX submission here
        e.preventDefault();
        alert('Form submitted (demo).');
    }
});
