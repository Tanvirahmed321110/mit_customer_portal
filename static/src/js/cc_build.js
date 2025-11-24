closeButtonF()

// shopping cart
openModalF('shopping-cart-modal', '.shopping-cart-modal-open')

document.addEventListener("DOMContentLoaded", () => {
   hideCCBuildComponent();
   chooseProduct();
   addMoreComponent();
   onChangeSelect();
   removeCCBuildComponent();
   removeAllCCBuildComponent();
   addToCartEvent();
});


function hideCCBuildComponent(){
            console.log('------------  hideCCBuildComponent ----------')


    const hideCheckbox = document.getElementById('hide');
            console.log('hideCheckbox  --------  ',hideCheckbox)


        if (hideCheckbox) {
            // Add change event listener
            hideCheckbox.addEventListener('change', function (event) {
                if (this.checked){
                    window.location.href=`/cc_build?huc=${this.checked}`
                }else{
                    window.location.href='/cc_build'
                }
            })
        }

}




function chooseProduct(){
    const chooseBtns = document.getElementsByClassName('choose-btn');

    if (chooseBtns.length > 0) {
        Array.from(chooseBtns).forEach(btn => {
            btn.addEventListener('click', function (event) {
                const btnClicked = event.currentTarget;
                const closestElement = btnClicked.closest('.select-product');
                const field = closestElement.querySelector('.field');
                const select = closestElement.querySelector('.component_select');
                const selectedValue = select.value;
                const intValue = parseInt(selectedValue, 10)
                if (isNaN(intValue)){
                return;
                }
//                console.log('selectedValue  --------  ',selectedValue)
    //            const selectedText = select.options[select.selectedIndex].text;

//                console.log('Selected ID:', selectedValue);
//                console.log('Selected field:', field.value);

                window.location.href = `/shop/${selectedValue}?context=cc_build&field=${field.value}`;

            });
        });
    }
}


function addMoreComponent(){
//            console.log('------------  addMoreComponent ----------')

   const addMoreBtn = document.querySelectorAll('.add-more-btn')
   if (addMoreBtn.length>0){
        Array.from(addMoreBtn).forEach(btn=>{
            btn.addEventListener('click', function (event){
//            console.log('------------  button clicked ----------')
                const clickedBtn = event.currentTarget;
//                const category = clickedBtn.getAttribute('data-category');
//                const field = clickedBtn.getAttribute('data-field');
                const ccBuildComponent = clickedBtn.getAttribute('data-cc_build_component');
//                console.log('ccBuildComponent   ------ ',ccBuildComponent)
                const component = document.getElementById(ccBuildComponent)
                console.log('component   ------ ',component)

                if (component){
                    if (component.classList.contains('none')){
                        component.classList.remove('none')
                    }
                }
                const component1 = document.getElementById(ccBuildComponent)

                console.log('component 1111  ------ ',component1)

//                window.location.href=`/shop/${category}?context=cc_build&field=${field}`
            })
        })
   }
}

function onChangeSelect(){
            console.log('------------  onChangeSelect ----------')

    const componentSelects = document.querySelectorAll('.component_select')
    if (componentSelects){
        componentSelects.forEach(select => {
            select.addEventListener('change', function(event){
            const clickedSelect = event.currentTarget;
            const uniqueIdentifier = clickedSelect.getAttribute('data-unique_identifier');
            const chooseBtn = document.getElementById(uniqueIdentifier)
            if (clickedSelect){
                const intValue = parseInt(clickedSelect.value, 10)
                if (isNaN(intValue)){
                     if (chooseBtn){
                        console.log('chooseBtn  -------- ', chooseBtn)
                        if (!chooseBtn.classList.contains('my-d-none')){
                            chooseBtn.classList.add('my-d-none')
                        }
                    }
                }else{
                    if (chooseBtn){
                    console.log('chooseBtn  -------- ', chooseBtn)
                        if (chooseBtn.classList.contains('my-d-none')){
                            chooseBtn.classList.remove('my-d-none')
                        }
                    }
                }

            }

            })
        })
    }
}

function removeCCBuildComponent(){
//console.log(' ----------  removeCCBuildComponent ------- ')
    const deleteBtn = document.querySelectorAll('.delete-btn')
    console.log(' deleteBtn ------- ', deleteBtn)


    if (deleteBtn.length>0){
        deleteBtn.forEach(btn => {
            btn.addEventListener('click', function (event){
                  const selectedBtn = event.currentTarget
                  const userCCBuildComponent  = selectedBtn.getAttribute('data-user_cc_build_component')
                  const categoryName = selectedBtn.getAttribute('data-category_name')

//                  console.log('userCCBuildComponent  ---------', userCCBuildComponent)
//                  console.log('categoryName  ---------', categoryName)
                  removeCCBuild(userCCBuildComponent, categoryName);

            })
        })
    }

}


function removeCCBuild(line_id, component_name){
       fetch('/remove/cc_build',{
           method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "line_id": line_id,
                    "component_name": component_name
                })
        }).then((response)=>{
              if(!response.ok){
                throw new Error("HTTP error! Status: " + response.status)
              }

              return response.json()

            }).then((data)=>{
            console.log('cc build   ------ ', data)
                const status = data.result.status
                if(status){
                 window.location.href="/cc_build"
                }else{
                    showToast(data.result.error)
                }

            }).catch((error)=>{
                console.error("Error loading cc build: " + error.message)
            })
}


function removeAllCCBuildComponent(){
//console.log(' ----------  removeAllCCBuildComponent ------- ')

    const deleteAllBtn = document.querySelector('.delete-all-btn')
    if (deleteAllBtn){
//    console.log(' ----------  deleteAllBtn ------- ')

        deleteAllBtn.addEventListener('click', function (event){
            removeAllCCBuild()
        })
    }

}

function removeAllCCBuild(){

    fetch('/remove/all/cc_build', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    }).then((response)=>{
        if (!response.ok){
            throw new Error('HTTP error! Status: ' + response.status)
        }
        return response.json()
    }).then((data)=>{
        const status = data.result.status
        if (status){
            window.location.href = "/cc_build"
        }else{
            showToast(data.result.error)
        }
    }).catch((error)=>{
        console.error("Error loading cc build: " + error.message)
    })
}

function addToCartEvent(){
console.log(' ----------  addToCartEvent ------- ')

    const addToCartBtn = document.querySelector('.add-to-cart-btn')
    if (addToCartBtn){

        addToCartBtn.addEventListener('click', function (event){
            addToCart()
        })
    }

}

function addToCart(){
    fetch("/add/cart/cc_build", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({})
    }).then((response)=>{
        if (!response.ok){throw new Error("HTTP error! Status: " + response.status)}
        return response.json()
    }).then((data)=>{
        const status = data.result.status
        if (status){
            window.location.href = "/cc_build"
        }else{
            showToast(data.result.error)
        }
    }).catch((error)=>{
        console.error("Error loading cc build: " + error.message)
    })
}

function takeScreenshot() {
    const SSElement = document.getElementById('screenshot')
    html2canvas(SSElement).then(canvas => {
        // download image
        let link = document.createElement("a");
        link.download = "MIT-CC-Build-Screenshot.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}

function showToast(message){
console.log('----- toast ------', message)
    const toast = document.createElement('div');

    toast.innerText = message;
    toast.style.position = 'fixed';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.bottom = '40px';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '4px';
    toast.style.background = 'red';
    toast.style.color = 'white';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '14px';
    document.body.appendChild(toast);
    setTimeout(()=> toast.remove(), 3000)
}
