function removePCBuildComponent(event, categ_code, product_id){
console.log('categ_code  -----------  ',categ_code)
console.log('product_id  -----------  ',product_id)

    fetch('/remove/pc_build',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            categ_code: categ_code,
            product_id: product_id
        })
    }).then((response)=>{
           if(!response.ok){
                throw new Error("HTTP error! Status: " + response.status)
           }
           return response.json()

    }).then((data)=>{
    console.log('remove pc build   ------  ',data)
        const status = data.result.status
        if(status){
            window.location.href = '/pc_build'
        }
    }).catch(error => {
            console.error("Error loading cart: " + error.message)
        })


}


function addToCart(){
    fetch('/add/cart/pc_build', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    }).then((response)=>{
      if(!response.ok){
        throw new Error("HTTP error! Status: " + response.status)
      }

      return response.json()

    }).then((data)=>{
    console.log('data add to cart  ------ ', data)
        const status = data.result.status
        if(status){
         window.location.href="/pc_build"
        }else{
            showToast(data.result.error)
        }

    }).catch((error)=>{
        console.error("Error loading cart: " + error.message)
    })

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


function hide_unconfigured_Components(event){
    const ckBx = document.getElementById('hide').checked
    console.log('ckbx  ----  ',ckBx.checked)
    if (ckBx){
        window.location.href = `/pc_build?huc=${ckBx.checked}`
    }else{
        window.location.href = "/pc_build"
    }

}

function deleteAllPCComponent(event){

    fetch('/delete/all/pc_build', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        }).then((response)=>{
          if(!response.ok){
            throw new Error("HTTP error! Status: " + response.status)
          }

          return response.json()

        }).then((data)=>{
        console.log('data add to cart  ------ ', data)
            const status = data.result.status
            if(status){
             window.location.href="/pc_build"
            }else{
                showToast(data.result.error)
            }

        }).catch((error)=>{
            console.error("Error loading cart: " + error.message)
        })


}

function takeScreenshot() {
    const SSElement = document.getElementById('screenshot')
    html2canvas(SSElement).then(canvas => {
        // download image
        let link = document.createElement("a");
        link.download = "MIT-PC-Build-Screenshot.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}