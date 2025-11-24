   document.addEventListener('DOMContentLoaded', function (){
        courier_selection()
        citySearchSelection()
        areaSearchSelectionREDX()
   })


    closeButtonF()

    // shopping cart
    openModalF('shopping-cart-modal', '.shopping-cart-modal-open')





    // for quantity
    setupQuantityButtons()
    // update qty
    function updateQty() {
        const inputQuantity = document.getElementById('input-quantity')

        if (inputQuantity) {
            document.getElementById('plus-btn').addEventListener('click', function () {
                updateQuantity(inputQuantity, 'increment')
//                console.log('click')
            })
            document.getElementById('minus-btn').addEventListener('click', function () {
                updateQuantity(inputQuantity, 'decrement')
            })
        }
    }
    updateQty()


  async function showAddress(event, addressId){
//  console.log('-------- showAddress -----')
    const address = event.currentTarget
//    console.log('address  ----  ', address)

    response = await fetch('/update/delivery_address',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'address_id': addressId
        })
    })
    json_data = await response.json()



    resAddressId = json_data.result.data.address_id
//    console.log('resAddressId  ---- ', resAddressId)



  const allAddress = address.closest('#all-address')
//        console.log('allAddress  ----  ', allAddress)

   const allRadioButton = allAddress.querySelectorAll('input')
//   const allFullAddress = allAddress.querySelectorAll('.full-address')
//   if (allRadioButton && allFullAddress){
   if (allRadioButton){
        allRadioButton.forEach((ar)=>ar.checked = false)
        const radioButton = document.getElementById(`address_${resAddressId}`)
//        console.log("radioButton  ---- ", radioButton)
        radioButton.checked = true
//        allFullAddress.forEach((afa)=> afa.classList.remove('active'))

        const addressData = address.closest('#address-data')
//        const fullAddress = addressData.querySelector('.full-address')
//        fullAddress.classList.add('active')
   }

//   update address form

  const data = json_data.result.data
   const contact_id = document.getElementById('contact_id').value = data.address_id;
   const name = document.getElementById('name').value = data.name;
   const street = document.getElementById('street').value = data.street;
   const city = document.getElementById('city').value = data.city;
   const zip = document.getElementById('zip').value = data.zip;
   const phone = document.getElementById('phone').value = data.phone;
   const email = document.getElementById('email').value = data.email;

  }


function selectedPathaoLocation(){

    const selectedCity = document.getElementById('pathao-city')
    const selectedCityPathaoId = selectedCity.getAttribute('data-city-id')

        if (!selectedCityPathaoId){
            showToast("Please select a valid City from the dropdown", true)
        }

        const selectedZone = document.getElementById('pathao-zone')
        const selectedZonePathaoId = selectedZone.getAttribute("data-zone-id")

        if (!selectedZonePathaoId){
            showToast("Please select a valid Zone from the dropdown", true)
        }
        const selectedArea = document.getElementById('pathao-area')
        const selectedAreaPathaoId = selectedArea.getAttribute("data-area-id")

        if (!selectedAreaPathaoId){
            showToast("Please select a valid Area from the dropdown", true)
        }

        const address = document.getElementById("pathao-client-address")
        if (!address || !address.value){
            showToast("Please provide a valid Address", true)
        }
        if (address.value.length < 10 || address.value.length > 220){
            showToast("Address has to be between 10 - 220 characters long", true)
        }

        const location = {
            city: selectedCityPathaoId,
            zone: selectedZonePathaoId,
            area: selectedAreaPathaoId,
            address: address.value,
        }
        return location
}
function selectedREDXLocation(){
    const areaInputField = document.getElementById("redx-area")
    const addressInputField = document.getElementById("redx-client-address")
//    console.log("areaInputField   ---------==========  ", areaInputField)
//    console.log("addressInputField   ---------=========  ", addressInputField)

    if (!areaInputField || !areaInputField.value){
        showToast("Please select a valid area from the dropdown")
    }

    if (!addressInputField || !addressInputField.value){
        showToast("Please provide a valid address")
    }


    const location = {

        area_id: areaInputField.dataset.areaId,
        area_name: areaInputField.value,
        address: addressInputField.value,
    }

    return location
}

function selectSteadFastLocation(){
    const addressInputField = document.getElementById("steadfast-client-address")
    console.log("addressInputField   SteadFast ---------- ", addressInputField)
    if (!addressInputField || !addressInputField.value){
        showToast("Please provide a valid address")
    }
    const location = {
        address: addressInputField.value
    }
    return location

}

function courierSelection(){
    const selectedCourierService = document.querySelector("input[name='courier_services']:checked")

   let location = null
   if (selectedCourierService.value === "Pathao"){
      location = selectedPathaoLocation()
   }
   if (selectedCourierService.value === "REDX"){
        location = selectedREDXLocation()
   }
   if (selectedCourierService.value === "SteadFast"){
        location = selectSteadFastLocation()
   }

   return {selectedCourierService, location}
}

 async function confirmOrder(event){
    event.preventDefault()
    const form = document.getElementById('checkout-form')
    if (!form.checkValidity()){
        form.reportValidity()
        return
    }

//   const contact_id = document.getElementById('contact_id');
//   const name = document.getElementById('name');
//   const street = document.getElementById('street');
//   const city = document.getElementById('city');
//   const zip = document.getElementById('zip');
//   const phone = document.getElementById('phone');
//   const email = document.getElementById('email');

   const note = document.getElementById('note-from-user');

//   const onlinePaymentRadio = document.querySelector('#online-payment input[type="radio"]');
   const selectedPaymentMethod = document.querySelector("input[name='payment_method']:checked")

    const {selectedCourierService, location} = courierSelection()

        console.log("selectedCourierService   ----------  ", selectedCourierService)
        console.log("location   ----------  ", location)

    const response = await fetch("/confirm/order",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
              'paymentMethod': selectedPaymentMethod.value,
              'courier': selectedCourierService.value,
              'location': location,

//            'contact_id':contact_id.value,
//            'name': name.value,
//            'street': street.value,
//            'city': city.value,
//            'zip': zip.value,
//            'phone': phone.value,
//            'email': email.value,
//            'note': note.value,

        })
    })

    if (response.ok){
    const response_data = await response.json()
    console.log('order confirm response  -----  ', response_data)


    if (response_data.result.status){
        const payment_url = response_data.result.data.payment_url
        if (payment_url){
//            console.log('payment_url  -----  ', payment_url)
            window.location.href = payment_url
        }

        const redirect_url = response_data.result.data.redirect_url
        if (redirect_url){
            window.location.href = redirect_url
        }

    }
   }



 }

function add_new_address(event){
 reset_address_form()
 document.querySelectorAll("#address-data").forEach((a)=> a.style.display='none')
 document.getElementById('add-new-address').style.display='none'

}

function reset_address_form(){
      const contact_id = document.getElementById('contact_id').value=null;
   const name = document.getElementById('name').value=null;
   const street = document.getElementById('street').value=null;
   const city = document.getElementById('city').value=null;
   const zip = document.getElementById('zip').value=null;
   const phone = document.getElementById('phone').value=null;
   const email = document.getElementById('email').value=null;

}

 function diableEnableSubmit(event){
      const confirmOrderBtn = document.getElementById('order-confirm-btn')
      confirmOrderBtn.disabled = !event.currentTarget.checked
      confirmOrderBtn.classList.toggle('disable')
 }





//-------------------------------------------------------------
//---------------------- COURIER START ------------------------
//-------------------------------------------------------------




let pathao_cities = null
let pathao_locations = null

let redx_areas = null

function hideAddressInputFields(pathao=true, steadfast=true, redx=true){
    if (pathao){
       const pathaoAddressComponent = document.getElementById('pathao-address')
       if (pathaoAddressComponent && !pathaoAddressComponent.classList.contains("inactive")){
            pathaoAddressComponent.classList.add("inactive")
            pathaoAddressComponent.querySelectorAll('input').forEach((pathaoInput)=>{
                pathaoInput.disabled = true
            })
        }
    }

    if (steadfast){
        const steadfastAddressComponent = document.getElementById('steadfast-address')
        if (steadfastAddressComponent && !steadfastAddressComponent.classList.contains("inactive")){
            steadfastAddressComponent.classList.add("inactive")
            steadfastAddressComponent.querySelectorAll('input').forEach((steadfastInput)=>{
                steadfastInput.disabled = true
            })

        }
    }

    if (redx){
        const redxAddressComponent = document.getElementById('redx-address')
        if (redxAddressComponent && !redxAddressComponent.classList.contains("inactive")){
            redxAddressComponent.classList.add("inactive")
            redxAddressComponent.querySelectorAll('input').forEach((redxInput)=>{
            redxInput.disabled = true
            })

            }
    }

}

function showAddressInputFieldsForRelevantCourier(courier){
    if (courier === "Pathao"){
        const pathaoAddressComponent = document.getElementById('pathao-address')
        if (pathaoAddressComponent && pathaoAddressComponent.classList.contains("inactive")){
            pathaoAddressComponent.classList.remove("inactive")
            pathaoAddressComponent.querySelectorAll('input').forEach((pathaoInput)=>{
                pathaoInput.disabled = false
            })

        }
        hideAddressInputFields(false,true,true)
    }

    if (courier === "SteadFast"){
        const steadfastAddressComponent = document.getElementById('steadfast-address')
        if (steadfastAddressComponent && steadfastAddressComponent.classList.contains("inactive")){
            steadfastAddressComponent.classList.remove("inactive")
            steadfastAddressComponent.querySelectorAll('input').forEach((steadfastInput)=>{
                steadfastInput.disabled = false
            })
        }
        hideAddressInputFields(true,false,true)
    }

    if (courier === "REDX"){
        const redxAddressComponent = document.getElementById('redx-address')
        if (redxAddressComponent && redxAddressComponent.classList.contains("inactive")){
            redxAddressComponent.classList.remove("inactive")
            redxAddressComponent.querySelectorAll('input').forEach((redxInput)=>{
                redxInput.disabled = false
            })
        }
        hideAddressInputFields(true,true,false)
    }
}

function courier_selection(){
    const courierSelectionRadioBtns = document.querySelectorAll("input[name='courier_services']")
    courierSelectionRadioBtns.forEach((courierBtn)=>{
        courierBtn.addEventListener('change', async function(event){
            const selectedCourier = event.currentTarget

            if (selectedCourier.value === "Pathao"){
                const pathao_address = await get_pathao_location()
                pathao_cities = pathao_address.cities
                pathao_locations = pathao_address.locations
                showAddressInputFieldsForRelevantCourier("Pathao")
            }
            if (selectedCourier.value === "SteadFast"){

                showAddressInputFieldsForRelevantCourier("SteadFast")
            }
            if (selectedCourier.value === "REDX"){
                redx_areas = await get_redx_area()
//                areaSearchSelectionREDX()
//                console.log("redx_areas  fetch -----  ",redx_areas)
                showAddressInputFieldsForRelevantCourier("REDX")
            }
        })
    })

}

function get_pathao_location(){
    return fetch('/pathao/locations', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    }).then((response)=>{
        if (!response.ok){
            throw new Error("HTTP error! Status: ", response.status)
        }
        return response.json()
    }).then((data)=>{
        const status = data.result.status
        if (!status){
            showToast(data.result.error)
        }else{
            const res_data = data.result.data
//            console.log('res_data   ------- ',res_data)
            return res_data
        }
    }).catch((error)=>{
         showToast(error)
    })

}

function get_redx_area(){
    return fetch("/redx/areas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({})
    }).then((response)=>{
        if (!response.ok){
            throw new Error("HTTP error! Status: ", response.status)
        }
        return response.json()

    }).then((data)=>{
        const status = data.result.status
        if (!status){
            showToast(data.result.error)
        }else{
            const res_data = data.result.data.areas
            return res_data
        }

    }).catch((error)=>{
        showToast(error)
    })
}

//  --------------------- REDX start -----------------------


function areaOptionClickEventREDX(optionArea, areaInputField, dropdownArea, area){
     const newOptionArea = optionArea.cloneNode(true)
     optionArea.parentNode.replaceChild(newOptionArea, optionArea)
     newOptionArea.addEventListener("click", function (){
                    areaInputField.value = area.redx_area_name
                    areaInputField.dataset.areaId = area.redx_area_id
                    dropdownArea.innerHTML = ""
                    dropdownArea.style.display = 'none'
            })
}
function areaInputFieldInputEventREDX(areaInputField, dropdownArea){

        areaInputField.addEventListener('input', function (event){
        const areas = redx_areas
        const queryArea = this.value.trim().toLowerCase()
//       console.log("queryArea --------------- ", queryArea)

        if (!queryArea){
            dropdownArea.style.display = "none"
            return
        }

        const matchesArea = areas
                    .filter((area)=>{
//                    console.log("area  -----  ",area)
                    return area.redx_area_name.toLowerCase().includes(queryArea)})
                    .sort((a, b)=>{
                        const aStarts = a.redx_area_name.toLowerCase().startsWith(queryArea)
                        const bStarts = b.redx_area_name.toLowerCase().startsWith(queryArea)

                        if (aStarts && !bStarts) return -1
                        if (!aStarts && bStarts) return 1

                        return a.redx_area_name.localeCompare(b.redx_area_name)
                    })
//        console.log("matchesArea   ----------  ", matchesArea)
        dropdownArea.innerHTML = ""
        if (matchesArea.length > 0){
        dropdownArea.style.display = "block"
             matchesArea.forEach((area)=>{
                const optionArea = document.createElement('div')
                optionArea.textContent = area.redx_area_name
                optionArea.style.padding = "5px"
                optionArea.style.cursor = "pointer"
                dropdownArea.appendChild(optionArea)
                areaOptionClickEventREDX(optionArea, areaInputField, dropdownArea, area)
//                areaOptionClickEvent(optionArea, areaInputField, dropdownArea, area, area.area_id_pathao)

            })
        }
    })
}

function areaInputFieldClickEventREDX(areaInputField, dropdownArea){

      areaInputField.addEventListener("click", function (event){
        console.log("-----------------   areaInputFieldClickEventREDX -----------------------")
        const areas = redx_areas
//      console.log("areas  select event ------  ", areas)
        const inputFieldValue = this.value.trim()
        if (inputFieldValue !== "") return
        dropdownArea.innerText = ""


        if (areas.length > 0){
        if (dropdownArea.style.display === "block"){
            dropdownArea.style.display = "none"
            return
        }
        else {
        dropdownArea.style.display = "block"
        }

            areas.forEach((area)=>{

            const optionArea = document.createElement("div")
            optionArea.textContent = area.redx_area_name
            optionArea.style.padding = "5px";
            optionArea.style.cursor = "pointer";
            dropdownArea.appendChild(optionArea)
               areaOptionClickEventREDX(optionArea, areaInputField, dropdownArea, area)
//            areaOptionClickEvent(optionArea, areaInputField, dropdownArea, area, area.area_id_pathao)
        })
        }


    })

}

function areaSearchSelectionREDX(){
    const areaInputField = document.getElementById('redx-area')
    const dropdownArea = document.getElementById('redx-area-dropdown')
     if (!areaInputField || !dropdownArea) return;
//     console.log("areaInputField  ====================== ", areaInputField)
//     console.log("dropdownArea  ================== ", dropdownArea)
//     console.log("redx_areas  ================== ", redx_areas)

    if (areaInputField){
         const newAreaInputField = areaInputField.cloneNode(true)
         areaInputField.parentNode.replaceChild(newAreaInputField, areaInputField)
        areaInputFieldInputEventREDX(newAreaInputField, dropdownArea)
        areaInputFieldClickEventREDX(newAreaInputField, dropdownArea)
    }
}
//  --------------------- REDX end -------------------------


//  --------------------- pathao start -------------------------

function showZoneAreaInputField(zone=true, area=true){
    if (zone){
        const zoneInputField = document.getElementById('pathao-zone')
        const zoneInputFieldLabel = document.querySelector("label[for='pathao-zone']")
        if (!zoneInputField || !zoneInputFieldLabel) return
        if(zoneInputField.classList.contains("inactive")){
            zoneInputField.classList.remove("inactive")
            zoneInputField.disabled = false

         }
        if(zoneInputFieldLabel.classList.contains("inactive")){
            zoneInputFieldLabel.classList.remove("inactive")
        }
    }

    if (area){
        const areaInputField = document.getElementById('pathao-area')
        const areaInputFieldLabel = document.querySelector("label[for='pathao-area']")
        if (!areaInputField) return
        if(areaInputField.classList.contains("inactive")){
            areaInputField.classList.remove("inactive")
            areaInputField.classList.remove("inactive")
            areaInputField.disabled = false
         }
        if(areaInputFieldLabel.classList.contains("inactive")){
            areaInputFieldLabel.classList.remove("inactive")
        }
    }
}
function removeZoneAreaInputField(zone=true, area=true){
    if (zone){
        const zoneInputField = document.getElementById('pathao-zone')
        const zoneInputFieldLabel = document.querySelector("label[for='pathao-zone']")
        if (!zoneInputField || !zoneInputFieldLabel) return
        if(!zoneInputField.classList.contains("inactive")){
            zoneInputField.classList.add("inactive")
            zoneInputField.disabled = true
         }
         if(!zoneInputFieldLabel.classList.contains("inactive")){
            zoneInputFieldLabel.classList.add("inactive")
         }
    }

    if (area){
        const areaInputField = document.getElementById('pathao-area')
        const areaInputFieldLabel = document.querySelector("label[for='pathao-area']")
        if (!areaInputField) return
        if(!areaInputField.classList.contains("inactive")){
            areaInputField.classList.add("inactive")
            areaInputField.disabled = true
         }
         if(!areaInputFieldLabel.classList.contains("inactive")){
            areaInputFieldLabel.classList.add("inactive")
         }
    }
}

function clearZoneAreaInputField(zone=true,area=true){
    if (zone){
        const zoneInputField = document.getElementById('pathao-zone')
        if (!zoneInputField) return
            zoneInputField.value = ""
    }
    if (area){
        const areaInputField = document.getElementById('pathao-area')
        if (!areaInputField) return
        areaInputField.value = ""
    }

}


function cityOptionClickEvent(optionCity, cityInputField, dropdownCity, city){
//    console.log("----------------  cityOptionClickEvent -----------------")
         const newOptionCity = optionCity.cloneNode(true)


//        console.log('---------  click event added ----------------')
        optionCity.parentNode.replaceChild(newOptionCity, optionCity)
        newOptionCity.addEventListener("click", function (){
                    cityInputField.value = city
                    cityInputField.dataset.cityId = pathao_locations[city].city_id_pathao

                    dropdownCity.innerHTML = ""
                    dropdownCity.style.display = 'none'
                    clearZoneAreaInputField()
                    zoneSearchSelection(city)
                })

}

function cityInputFieldInputEvent(cityInputField, dropdownCity){
//    console.log("----------------  cityInputFieldInputEvent -----------------")
//         const newCityInputField = cityInputField.cloneNode(true)
//         cityInputField.parentNode.replaceChild(newCityInputField, cityInputField)
         cityInputField.addEventListener("input", function (event){
        const queryCity = this.value.trim().toLowerCase()
        if (!queryCity) {
            dropdownCity.style.display = 'none'
            return
        }

          let matchesCity = pathao_cities
                    .filter(city => city.toLowerCase().includes(queryCity))
                    .sort((a, b) => {
                        const aStarts = a.toLowerCase().startsWith(queryCity);
                        const bStarts = b.toLowerCase().startsWith(queryCity);

                        // Prioritize prefix matchesCity, then alphabetical order
                        if (aStarts && !bStarts) return -1;
                        if (!aStarts && bStarts) return 1;
                        return a.localeCompare(b);
                    });

        dropdownCity.innerHTML = ""

        if (matchesCity.length > 0){
        dropdownCity.style.display = 'block'
              matchesCity.forEach((city)=>{
                const optionCity = document.createElement("div")
                optionCity.textContent = city
                 optionCity.style.padding = "5px";
                optionCity.style.cursor = "pointer";

                dropdownCity.appendChild(optionCity)
                 cityOptionClickEvent(optionCity, cityInputField, dropdownCity, city)


            })
        }


    })

}

function cityInputFieldClickEvent(cityInputField, dropdownCity){

//    const newCityInputField = cityInputField.cloneNode(true)
//    cityInputField.parentNode.replaceChild(newCityInputField, cityInputField)
    cityInputField.addEventListener("click", function(){

        const inputFieldValue = this.value.trim()
//        console.log("inputFieldValue  before ------  ",inputFieldValue)
        if (inputFieldValue !== "") return
        dropdownCity.innerText = ""
        if (pathao_cities.length > 0){
        if (dropdownCity.style.display === "block"){
            dropdownCity.style.display = "none"
            return
        }
        else {
        dropdownCity.style.display = "block"
        }

            pathao_cities.forEach((city)=>{
            const optionCity = document.createElement("div")
            optionCity.textContent = city
            optionCity.style.padding = "5px";
            optionCity.style.cursor = "pointer";

            dropdownCity.appendChild(optionCity)
                        cityOptionClickEvent(optionCity, cityInputField, dropdownCity, city)

        })
        }


    })
}
function citySearchSelection(){
    const cityInputField = document.getElementById('pathao-city')
    const dropdownCity = document.getElementById('pathao-city-dropdown')
     if (!cityInputField || !dropdownCity) return;
//     console.log("dropdownCity  -----===============--- ", dropdownCity)
//    console.log("cityInputField  -----==============--- ", cityInputField)
//    console.log("pathao_cities  -----==============--- ", pathao_cities)
//    let pathao_cities = null
//let pathao_locations = null
    if (cityInputField){
         const newCityInputField = cityInputField.cloneNode(true)
         cityInputField.parentNode.replaceChild(newCityInputField, cityInputField)
        cityInputFieldInputEvent(newCityInputField, dropdownCity)
        cityInputFieldClickEvent(newCityInputField, dropdownCity)
    }
}


function zoneOptionClickEvent(optionZone, zoneInputField, dropdownZone, city, zone){
     const newOptionZone = optionZone.cloneNode(true)
     optionZone.parentNode.replaceChild(newOptionZone, optionZone)
     newOptionZone.addEventListener("click", function (){
                    zoneInputField.value = zone
                    zoneInputField.dataset.zoneId = pathao_locations[city].zones[zone].zone_id_pathao
                    dropdownZone.innerHTML = ""
                    dropdownZone.style.display = 'none'
                    clearZoneAreaInputField(false, true)
                    areaSearchSelection(city, zone)
            })
}

function zoneInputFieldInputEvent(zoneInputField, dropdownZone, city, zones){

        zoneInputField.addEventListener('input', function (event){
    const queryZone = this.value.trim().toLowerCase()
    if (!queryZone){
        dropdownZone.style.display = "none"
        return
    }


//        console.log("zones   ----------  ", zones)
        const matchesZone = zones
                    .filter((zone)=>{return zone.toLowerCase().includes(queryZone)})
                    .sort((a, b)=>{
                        const aStarts = a.toLowerCase().startsWith(queryZone)
                        const bStarts = b.toLowerCase().startsWith(queryZone)

                        if (aStarts && !bStarts) return -1
                        if (!aStarts && bStarts) return 1

                        return a.localeCompare(b)
                    })
//        console.log("matchesZone   before ----------  ", matchesZone)
        dropdownZone.innerHTML = ""
        if (matchesZone.length > 0){
        dropdownZone.style.display = "block"
             matchesZone.forEach((zone)=>{
                const optionZone = document.createElement('div')
                optionZone.textContent = zone
                optionZone.style.padding = "5px"
                optionZone.style.cursor = "pointer"
                dropdownZone.appendChild(optionZone)
                zoneOptionClickEvent(optionZone, zoneInputField, dropdownZone, city, zone)

            })
        }
//        console.log("matchesZone   after ----------  ", matchesZone)

    }
)

}

function zoneInputFieldClickEvent(zoneInputField, dropdownZone, city, zones){
//       console.log("--------------- zoneInputFieldClickEvent --------------")
//        console.log("zoneInputField  ---------- ", zoneInputField)


        zoneInputField.addEventListener("click", function (event){

        const inputFieldValue = this.value.trim()
//        console.log("inputFieldValue zone click ------  ",inputFieldValue)
        if (inputFieldValue !== "") return
        dropdownZone.innerText = ""

//        console.log("zones ------  ",zones)

        if (zones.length > 0){
        if (dropdownZone.style.display === "block"){
            dropdownZone.style.display = "none"
            return
        }
        else {
        dropdownZone.style.display = "block"
        }

            zones.forEach((zone)=>{
            const optionZone = document.createElement("div")
            optionZone.textContent = zone
            optionZone.style.padding = "5px";
            optionZone.style.cursor = "pointer";
            dropdownZone.appendChild(optionZone)
            zoneOptionClickEvent(optionZone, zoneInputField, dropdownZone, city, zone)

        })
        }


    }
)
}

function zoneSearchSelection(city){
    const zoneInputField = document.getElementById("pathao-zone")
    const dropdownZone = document.getElementById("pathao-zone-dropdown")
//    console.log("zoneInputField --------- ", zoneInputField)
//    console.log("dropdownZone -------- ", dropdownZone)
    if (!zoneInputField || !dropdownZone) return
    const zones = Object.keys(pathao_locations[city].zones)
//    console.log("zones  -------- ",zones)
    if (zones.length>0){
        const newzOneInputField = zoneInputField.cloneNode(true)
        zoneInputField.parentNode.replaceChild(newzOneInputField, zoneInputField)
//        console.log("zoneInputField parent -------------- ", zoneInputField.parentNode)
        zoneInputFieldInputEvent(newzOneInputField, dropdownZone, city, zones)
        zoneInputFieldClickEvent(newzOneInputField, dropdownZone, city, zones)
    }


}

function areaOptionClickEvent(optionArea, areaInputField, dropdownArea, area, area_id_pathao){
     const newOptionArea = optionArea.cloneNode(true)
     optionArea.parentNode.replaceChild(newOptionArea, optionArea)
     newOptionArea.addEventListener("click", function (){
                    areaInputField.value = area.name
                    areaInputField.dataset.areaId = area_id_pathao
                    dropdownArea.innerHTML = ""
                    dropdownArea.style.display = 'none'
            })
}
function areaInputFieldInputEvent(areaInputField, dropdownArea, areas){
//        console.log("--------------- areaInputFieldInputEvent ---------------")
//        console.log("areas ---------------  ", areas)
        areaInputField.addEventListener('input', function (event){
        const queryArea = this.value.trim().toLowerCase()
//       console.log("queryArea --------------- ", queryArea)

        if (!queryArea){
            dropdownArea.style.display = "none"
            return
        }

        const matchesArea = areas
                    .filter((area)=>{
//                    console.log("area  -----  ",area)
                    return area.name.toLowerCase().includes(queryArea)})
                    .sort((a, b)=>{
                        const aStarts = a.name.toLowerCase().startsWith(queryArea)
                        const bStarts = b.name.toLowerCase().startsWith(queryArea)

                        if (aStarts && !bStarts) return -1
                        if (!aStarts && bStarts) return 1

                        return a.name.localeCompare(b.name)
                    })
//        console.log("matchesArea   ----------  ", matchesArea)
        dropdownArea.innerHTML = ""
        if (matchesArea.length > 0){
        dropdownArea.style.display = "block"
             matchesArea.forEach((area)=>{
                const optionArea = document.createElement('div')
                optionArea.textContent = area.name
                optionArea.style.padding = "5px"
                optionArea.style.cursor = "pointer"
                dropdownArea.appendChild(optionArea)
                areaOptionClickEvent(optionArea, areaInputField, dropdownArea, area, area.area_id_pathao)

            })
        }
    })
}

function areaInputFieldClickEvent(areaInputField, dropdownArea, areas){

      areaInputField.addEventListener("click", function (event){

        const inputFieldValue = this.value.trim()
        if (inputFieldValue !== "") return
        dropdownArea.innerText = ""


        if (areas.length > 0){
        if (dropdownArea.style.display === "block"){
            dropdownArea.style.display = "none"
            return
        }
        else {
        dropdownArea.style.display = "block"
        }

            areas.forEach((area)=>{
            const optionArea = document.createElement("div")
            optionArea.textContent = area.name
            optionArea.style.padding = "5px";
            optionArea.style.cursor = "pointer";
            dropdownArea.appendChild(optionArea)

            areaOptionClickEvent(optionArea, areaInputField, dropdownArea, area, area.area_id_pathao)
        })
        }


    })
}

function areaSearchSelection(city, zone){
    const areaInputField = document.getElementById("pathao-area")
    const dropdownArea = document.getElementById("pathao-area-dropdown")
    if (!areaInputField || !dropdownArea) return
//    console.log("city  ----- ", city)
//    console.log("zone  ----- ", zone)
    const areas = pathao_locations[city].zones[zone].areas
//    console.log("areas  ----- ", areas)
    if (areas.length>0){
//        console.log("----------  areas  ----- ")
        showZoneAreaInputField(false, true)
        const newzAreaInputField = areaInputField.cloneNode(true)
        areaInputField.parentNode.replaceChild(newzAreaInputField, areaInputField)
        areaInputFieldInputEvent(newzAreaInputField, dropdownArea, areas)
        areaInputFieldClickEvent(newzAreaInputField, dropdownArea, areas)
    }
    else{
        removeZoneAreaInputField(false, true)
    }

}

//  --------------------- pathao end -------------------------


//-------------------------------------------------------------
//---------------------- COURIER END  -------------------------
//-------------------------------------------------------------


function showToast(message, middle){
//console.log('----- toast ------', message)
    const toast = document.createElement('div');

    toast.innerText = message;
    toast.style.position = 'fixed';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    if (middle){
        toast.style.bottom = '50%';
        toast.style.transform = 'translateY(-50%)'
    }else{toast.style.bottom = '40px';}

    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '4px';
    toast.style.background = 'red';
    toast.style.color = 'white';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '14px';
    document.body.appendChild(toast);
    setTimeout(()=> toast.remove(), 3000)
}