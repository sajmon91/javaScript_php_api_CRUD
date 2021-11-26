function createProduct(){
    // load list of categories
    fetch('http://localhost/javaScript_php_api_CRUD/api/category/read.php')
    .then(response => {
        if (response.ok) {
          return response.json();
        }else{
          throw new Error;
        }
    })
    .then(data => {
        // build categories option html
        // loop through returned list of data
        let categories_options_html = `<select name='category_id' class='form-control'>`;
        data.records.forEach(record => {
            categories_options_html += `<option value='${record.id}'>${record.name}</option>`;
        });
        categories_options_html += `</select>`;

        // html form here where product information will be entered
        var create_product_html = `
          
            <!-- 'read products' button to show list of products -->
            <div id='read-products' class='btn btn-primary float-end m-b-15px read-products-button'>
                <i class="bi bi-list-ul"></i> Read Products
            </div>

            <!-- 'create product' form -->
            <form id='create-product-form' action='#' method='post' border='0'>
                <table class='table table-hover table-responsive table-bordered'>
            
                    <!-- name field -->
                    <tr>
                        <td>Name</td>
                        <td><input type='text' name='name' class='form-control' required /></td>
                    </tr>
            
                    <!-- price field -->
                    <tr>
                        <td>Price</td>
                        <td><input type='number' min='1' name='price' class='form-control' required /></td>
                    </tr>
            
                    <!-- description field -->
                    <tr>
                        <td>Description</td>
                        <td><textarea name='description' class='form-control' required></textarea></td>
                    </tr>
            
                    <!-- categories 'select' field -->
                    <tr>
                        <td>Category</td>
                        <td>${categories_options_html}</td>
                    </tr>
            
                    <!-- button to submit form -->
                    <tr>
                        <td></td>
                        <td>
                            <button type='submit' class='btn btn-primary'>
                                <i class="bi bi-plus-lg"></i> Create Product
                            </button>
                        </td>
                    </tr>
            
                </table>
            </form>`;

        // inject html to 'page-content' of app
        document.querySelector('#page-content').innerHTML = create_product_html;

        // change page title
        changePageTitle("Create Product");

        // when a 'read products' button was clicked
        readProducts();

        // will run if create product form was submitted
        let create_form = document.querySelector('#create-product-form');
        create_form.addEventListener('submit', (e) => {
            e.preventDefault();
            //get form form data
            const form_data = new FormData(create_form);
            const serialized = JSON.stringify(serialize(form_data));
            
            // submit form data to api
            fetch("http://localhost/javaScript_php_api_CRUD/api/product/create.php", {
                method: 'POST',
                body: serialized,
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Created',
                        text: 'Product has been created',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    // product was created, go back to products list
                    showProductsFirstPage();
                }else{
                  throw new Error;
                }
            })
            .catch(error => {
                // show error to console
                console.log(error);
            })
        });
    })
    .catch(error => {
        // show error to console
        console.log(error);
    })
};


