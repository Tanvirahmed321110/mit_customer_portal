
document.addEventListener("DOMContentLoaded", function(event){
            const blogSearchForm = document.getElementById('blogSearchForm')
            const blogSearchField = document.getElementById('blogSearch')

            console.log('blogSearchForm ------  ' , blogSearchForm)
            console.log('blogSearchField ------ '  , blogSearchField)
            blogSearchForm.addEventListener('submit',function(event){
                    event.preventDefault()
                    const blogSearch = blogSearchField.value.trim()
                    const params = new URLSearchParams()
                    params.set('blogSearch', blogSearch)

                    const newURL = window.location.origin + window.location.pathname + '?' + params.toString()
            window.location.href = newURL
            })
})
