$(document).ready(function () {

    //Global Variables
    let data = { version: 1.0 }
    let global_brand_id = null;

    function render_ui(response) {
        let total_products_count = response.result.data.total_products_count;
        let brand_name = response.result.data.brand_name;
        $('#total_products_count').html(total_products_count)
        $('#store_name').html(brand_name)
    }

    function render_products(response) {
        let products_html = response.result.data.products_html;
        $('.products').html(products_html);
    }

    function render_no_products(msg) {
        $('#product_count').text(msg);

        // Clear variables/containers
        $('.products').empty();
        $('.pagination').hide();
    }

    function render_pagination(response) {
        let pagi_html = response.result.data.pagination_html;
        $('#wrap_pagination').empty().html(pagi_html);
    }

    function handle_response(response) {

        $("html, body").animate({ scrollTop: 0 });
        let result = response.result;

        if (response && result.status == 'success') {

            let data = response.result.data;
            let total_pages = response.result.data.total_pages;

            let products = data.products;
            render_ui(response);
            render_products(response);
            render_pagination(response);

        } else if (response && result.status == 'error') {
            let msg = result.message;
            render_no_products(msg);
            console.log('Error/not found:', msg);
        }
        // $('#loader').removeClass('active');
        console.log('handle_response--')
        $('#loader').hide();
    }

    // Collect data and make call API
    function filter_api(brand_id) {

        data['brand_id'] = brand_id;
        const params = new URLSearchParams(window.location.search);
        const queryParams = Object.fromEntries(params.entries());
        data['query_params'] = queryParams;
        console.log('data:', data);

        $.ajax({
            url: '/api/v1/store_filter',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                handle_response(response);
            },
            error: function (xhr, status, error) { }
        })
    }

    /* Before api */
    let filter_api_timeout;
    function filter(brand_id) {
        $('#loader').show();
        // $('.products').empty();
        // $('#loader').addClass('active');
        clearTimeout(filter_api_timeout)
        filter_api_timeout = setTimeout(() => {
            filter_api(brand_id);
        }, 100);
    }

    // =========================================================
    // =========================================================

    // On change brand
    $(document).on('change', '.brand', function () {
        const brand_id_str = $(this).attr('data_id');
        if (brand_id_str) {
            const brand_id = parseInt(brand_id_str);
            global_brand_id = brand_id;
            data['page'] = 1;

            const radio_id = $(this).attr('id');

            if (radio_id) {
                const label_text = $(`label[for='${radio_id}']`).text().trim();
                $('#store_name').text(label_text);
            }

            filter(brand_id);
        }
    });

    $(document).on('click', '.page', function () {
        const pageStr = $(this).attr('data_page');
        if (pageStr) {
            console.log('pageStr', pageStr);
            data['page'] = parseInt(pageStr);
        }
        filter(global_brand_id);
    });

    $('#sort_by').change(function () {
        let order = $(this).val();
        data['order'] = order;
        filter(global_brand_id);
    })

    const url = new URL(window.location.href);
    const brandIdString = url.searchParams.get('brand_id');

    if (brandIdString !== null && !isNaN(brandIdString)) {
        global_brand_id = parseInt(brandIdString, 10);
        filter(global_brand_id)

        const $brandElement = $(`#brand-${global_brand_id}`);
        $brandElement.attr('checked', true);
    } else {
        console.log('The brand_id is not a valid number or is missing.');
    }

})