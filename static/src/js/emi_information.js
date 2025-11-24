
    // For Question and ans
    document.querySelectorAll('.question').forEach(question => {
        question.addEventListener('click', function () {
            const ans = this.nextElementSibling;
            ans.classList.toggle('active')
            question.classList.toggle('active')
        });
    });