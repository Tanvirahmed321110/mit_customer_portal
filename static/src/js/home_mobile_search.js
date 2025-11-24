$(document).ready(function () {
  /*  ===================================
      Developed by razzak 
      =================================== */

  // Click inside input → keep suggestions visible
  $('.mobile-search-input2').click(function (e) {
    e.stopPropagation();
    $('#search_suggestion_mobile2').addClass('active');
  });

  // Click anywhere outside → hide input & suggestions
  $(document).click(function () {
    $('.mobile-search-input2').removeClass('active');
    $('#search_suggestion_mobile2').removeClass('active');
  });

  function render_products(products, response) {

    // Clear variables/containers
    $('#mobile_search_products2').empty();
    let products_html = '';

    // Render products html
    products.forEach((p, index) => {
      let product_html = `
            <!-- Item -->
            <li>
                <a class="my-d-flex my-align-center my-gap-4 my-p-1 my-border-bottom"
                    href="/product/${p.id}">
                    <div class="img w-20">
                        <img src="${p.image_128}"/>
                    </div>

                    <div class="details my-flex-column my-gap-1">
                        <h6 class="">
                        ${p.name} BBB
                        </h6>
                        <div class="my-d-flex my-m-1  my-gap-3">
                            <h5 class="price my-text-red my-fw-bold">${p.list_price}
                                <span>৳</span>
                            </h5>
                            <del class=" my-fs-sm my-text-red">
                                ${p.old_price}
                                <span>৳</span>
                            </del>
                        </div>
                    </div>
                </a>
            </li>
          `;
      products_html += product_html;
    })

    // Add new html to page
    $('#mobile_search_products2').html(products_html);
  }

  function render_no_products(msg) {
    $('#mobile_search_products2').empty();
    $('#mobile_search_products2').html('<li class="my-p-1">No products found</li>');
  }

  function handle_response(response) {

    // $('#loader').hide();
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
    let search = $('#mobile-search-input2').val();
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
    }, 300);
  }

  $('.mobile-search-input2').on('input', function () {
    clearTimeout(filter_api_timeout);

    // Show loader immediately for visual feedback
    $('#mobile_search_products2').empty();
    $('#mobile_search_products2').html('<li class="my-p-1">Searching...</li>');

    // Debounce filter call to wait for user to stop typing
    // debounceTimer = setTimeout(() => {
    //   filter();
    // }, 300); // 300ms delay is a good balance
    filter();
    console.log('home mob search')
  });

  $('#mobile-search-input2').focus(function () {
    filter();
    $('#search_suggestion_mobile2').addClass('display-block')

  })

  $('#mobile-search-input2').blur(function () {
    setTimeout(() => {
      $('#search_suggestion_mobile2').removeClass('display-block')
    }, 300)
  })







})













