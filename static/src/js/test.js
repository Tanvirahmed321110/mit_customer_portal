let pathao_cities = null
let pathao_locations = null

function hideAddressInputFields(pathao=true, steadfast=true, redx=true){
    if (pathao){
       const pathaoAddressComponent = document.getElementById('pathao-address')
       if (pathaoAddressComponent && !pathaoAddressComponent.classList.contains("inactive")){
            pathaoAddressComponent.classList.add("inactive")
            pathaoAddressComponent.disabled = true
        }
    }

    if (steadfast){
        const steadfastAddressComponent = document.getElementById('steadfast-address')
        if (steadfastAddressComponent && !steadfastAddressComponent.classList.contains("inactive")){
            steadfastAddressComponent.classList.add("inactive")
            steadfastAddressComponent.disabled = true
        }
    }

    if (redx){
        const redxAddressComponent = document.getElementById('redx-address')
        if (redxAddressComponent && !redxAddressComponent.classList.contains("inactive")){
                redxAddressComponent.classList.add("inactive")
                redxAddressComponent.disabled = true
            }
    }

}
function showAddressInputFieldsForRelevantCourier(courier){
    if (courier === "Pathao"){
        const pathaoAddressComponent = document.getElementById('pathao-address')
        if (pathaoAddressComponent && pathaoAddressComponent.classList.contains("inactive")){
            pathaoAddressComponent.classList.remove("inactive")
            pathaoAddressComponent.disabled = false

        }
        hideAddressInputFields(false,true,true)
    }

    if (courier === "SteadFast"){
        const steadfastAddressComponent = document.getElementById('steadfast-address')
        if (steadfastAddressComponent && steadfastAddressComponent.classList.contains("inactive")){
            steadfastAddressComponent.classList.remove("inactive")
            steadfastAddressComponent.disabled = false
        }
        hideAddressInputFields(true,false,true)
    }

    if (courier === "REDX"){
        const redxAddressComponent = document.getElementById('redx-address')
        if (redxAddressComponent && redxAddressComponent.classList.contains("inactive")){
            redxAddressComponent.classList.remove("inactive")
            redxAddressComponent.disabled = false
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
            console.log('res_data   ------- ',res_data)
            return res_data
        }
    }).catch((error)=>{
         showToast(error)
    })

}

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
//     console.log("dropdownCity  -------- ", dropdownCity)

//    console.log("cityInputField  -------- ", cityInputField)
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
        console.log("zoneInputField  ---------- ", zoneInputField)


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
    console.log("zones  -------- ",zones)
    if (zones.length>0){
        const newzOneInputField = zoneInputField.cloneNode(true)
        zoneInputField.parentNode.replaceChild(newzOneInputField, zoneInputField)
        console.log("zoneInputField parent -------------- ", zoneInputField.parentNode)
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
        console.log("--------------- areaInputFieldInputEvent ---------------")
        console.log("areas ---------------  ", areas)
        areaInputField.addEventListener('input', function (event){
        const queryArea = this.value.trim().toLowerCase()
       console.log("queryArea --------------- ", queryArea)

        if (!queryArea){
            dropdownArea.style.display = "none"
            return
        }

        const matchesArea = areas
                    .filter((area)=>{
                    console.log("area  -----  ",area)
                    return area.name.toLowerCase().includes(queryArea)})
                    .sort((a, b)=>{
                        const aStarts = a.name.toLowerCase().startsWith(queryArea)
                        const bStarts = b.name.toLowerCase().startsWith(queryArea)

                        if (aStarts && !bStarts) return -1
                        if (!aStarts && bStarts) return 1

                        return a.name.localeCompare(b.name)
                    })
        console.log("matchesArea   ----------  ", matchesArea)
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
    console.log("city  ----- ", city)
    console.log("zone  ----- ", zone)
    const areas = pathao_locations[city].zones[zone].areas
    console.log("areas  ----- ", areas)
    if (areas.length>0){
        console.log("----------  areas  ----- ")
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