
/*  ===================================
    Developed by razzak 
    =================================== */
$(document).ready(function () {

  function render_products(products, response) {

    // Clear variables/containers
    $('#search_suggestion').empty();
    let products_html = '';

    // Render products html
    products.forEach((p, index) => {
      let product_html = `
        <li>
            <a class="my-d-flex my-align-center my-gap-4 my-p-1 my-border-bottom"
                href="/product/${p.id}">
                <div class="img w-20">
                    <img src="${p.image_128}"/>
                </div>

                <!-- detials -->
                <div class="details my-flex-column my-gap-1">
                    <h6 class="my-text-primary">${p.name}</h6>

                    ${p.search_status 
                      ? `<div class="my-d-flex my-m-1  my-gap-3">
                        <h5 class="">
                            ${p.search_status}
                        </h5>
                       </div>`
                      :
                      `<div class="my-d-flex my-m-1  my-gap-3">
                        <h5 class=""><span>${p.list_price}</span>
                            <span>৳</span> ${p.search_status}
                        </h5>
                        <del class=" my-fs-sm my-text-gray">
                            <span>${p.old_price}</span>
                            <span>৳</span>
                        </del>
                      </div>`
                    }


                </div>
            </a>
        </li>       
          `;
      products_html += product_html;
    })

    // Add new html to page
    $('#search_suggestion').html(products_html);
  }

  function render_no_products(msg) {
    $('#search_suggestion').empty();
    $('#search_suggestion').html('<li class="my-p-1">No products found</li>');
  }

  function handle_response(response) {

    $('#loader').hide();
    let result = response.result;

    if (response && result.status == 'success') {

      let data = response.result.data;
      let products = data.products;
      render_products(products, response);

    } else if (response && result.status == 'error') {
      let msg = result.message;
      render_no_products(msg);
    }
  }

  // Collect data and make call API
  function filter_api() {

    let data = { version: '1.0' }

    /* Url parameters */
    const params = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(params.entries());
    data['query_params'] = queryParams;

    // Collecting search 
    let search = $('#search').val();
    data['search'] = search;


    /* 
     * Call the filter API
     *
     */

    console.log('data2:', data);

    $.ajax({
      url: '/api/v1/product/search_suggestion',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (response) {
        handle_response(response);
      },
      error: function (xhr, status, error) {
        console.log('error', error);
      }
    })
  }

  /* Before api */
  let filter_api_timeout;
  function filter() {
    clearTimeout(filter_api_timeout)
    filter_api_timeout = setTimeout(() => {
      filter_api();
    }, 1000);
  }

  $('#search').keyup(function () {
    filter();
    let loader_html = `<li class="my-p-1">Loading</li>`;
    $('#search_suggestion').html(loader_html);
  })

  $('#search').focus(function () {
    $('#search_suggestion_c').show();
  })

  $('#search').blur(function () {
    setTimeout(() => {
      $('#search_suggestion_c').hide();
    }, 200)
  })







})













