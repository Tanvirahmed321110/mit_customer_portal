$(document).ready(function () {

    /* Compared list
     * Loaded with layout
     */

    function update_compare() {
        const compareProducts = localStorage.getItem('compare_products');
        let count = 0;
        if (compareProducts) {
            const productIds = compareProducts.split(',');
            count = productIds.length;
//            console.log('compare_products_count:', count);
        } else {
            console.log('compare_products_count:', 0);
        }
        $('#js_compare_count').text(count)
    }

    update_compare();

    // Add to compare list
    $(document).on('click', '.js_add_to_compare', function () {
        let data_id = $(this).attr('data_id'); // e.g., '72'
        console.log('data_id', data_id);

        // 1. Get the current list from localStorage or initialize an empty array
        let compareProductsString = localStorage.getItem('compare_products');
        let compareProductsArray = compareProductsString ? compareProductsString.split(',') : [];

        // 2. Check if the product is already in the list
        if (compareProductsArray.includes(data_id)) {
            console.log(`Product ID ${data_id} is already in the compare list.`);
            show_popup(`Product ID ${data_id} is already in the compare list.`)
            return; // Don't add if it's a duplicate
        }

        // 3. Check if the list has reached the maximum of 3
        const MAX_COMPARE_ITEMS = 3;
        if (compareProductsArray.length >= MAX_COMPARE_ITEMS) {
            console.log(`Cannot add product ID ${data_id}. Maximum of ${MAX_COMPARE_ITEMS} products reached.`);
            show_popup(`Cannot add product ID ${data_id}. Maximum of ${MAX_COMPARE_ITEMS} products reached.`)
            // Optionally, alert the user here
            // alert(`You can only compare up to ${MAX_COMPARE_ITEMS} products.`);
            return; // Don't add if the limit is reached
        }

        // 4. Add the new product ID
        compareProductsArray.push(data_id);
        show_popup(`Added to compared list`)

        // 5. Save the updated list back to localStorage as a comma-separated string
        localStorage.setItem('compare_products', compareProductsArray.join(','));
        console.log('Updated compare_products:', localStorage.getItem('compare_products'));
        update_compare();

    });

    function show_popup(html) {
        $('#popup').html(html);
        $('#popup').addClass('active');
        setTimeout(() => {
            $('.popup').each(function () {
                $(this).removeClass('active')
            })
        }, 5000);
    }

    function getDynamicBaseUrl() {
        const protocol = window.location.protocol; // e.g., "http:"
        const hostname = window.location.hostname; // e.g., "localhost"
        const port = window.location.port;         // e.g., "8018" or ""

        // The 'host' property automatically includes the port if it's non-default,
        // but let's build it explicitly for clarity and control.

        let baseUrl = `${protocol}//${hostname}`;

        // location.port is an empty string ("") if the port is default or not specified.
        if (port) {
            baseUrl += `:${port}`;
        }

        return baseUrl;
    }

    // Process compare ids and go to the compare page
    $('.js_compare').click(function () {
        let compare_products = localStorage.getItem('compare_products');
        if (compare_products) {

            // Example usage based on the current page's URL
            const dynamicUrl = getDynamicBaseUrl();
            window.location.href = dynamicUrl + '/compare/' + compare_products;

        } else {
            alert('Please add products to compare first.');
        }
    });

    // Delete item form compare
    $('.js_delete_compare').click(function () {
        let data_id = $(this).attr('data_id');
        let compare_products = localStorage.getItem('compare_products');

        if (compare_products) {
            let product_ids = compare_products.split(',');
            let updated_ids = product_ids.filter(id => id !== data_id);

            localStorage.setItem('compare_products', updated_ids.join(','));

            // Create the new dynamic URL
            let newUrl = 'http://localhost:8018/compare/' + updated_ids.join(',');

            // Redirect to the new URL instead of a simple reload
            window.location.href = newUrl;
        }
    });


})