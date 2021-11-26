
function updateProduct () {
    // get product id
    const id = this.dataset.id;

    // read one record based on given product id
    fetch(`http://localhost/javaScript_php_api_CRUD/api/product/read_one.php?id=${id}`)
    .then(response => {
        if (response.ok) {
          return response.json();
        }else{
          throw new Error;
        }
    })
    .then(data => {
        // values use to fill out form
        let name = data.name;
        let price = data.price;
        let description = data.description;
        let category_id = data.category_id;
        let category_name = data.category_name;

        // load list of categories
        fetch('http://localhost/javaScript_php_api_CRUD/api/category/read.php')
        .then(response => {
            if (response.ok) {
            return response.json();
            }else{
            throw new Error;
            }
        })
        .then(res => {
            // build 'categories option' html
            // loop through returned list of data
            let categories_options_html = `<select name='category_id' class='form-control'>`;
            res.records.forEach(record => {
                // pre-select option is category id is the same
                if (record.id == category_id) {
                    categories_options_html += `<option value='${record.id}' selected>${record.name}</option>`; 
                }else{
                    categories_options_html += `<option value='${record.id}'>${record.name}</option>`; 
                }
            });
            categories_options_html += `</select>`;

            // store 'update product' html to this variable
            const update_product_html = `
            <div id='read-products' class='btn btn-primary float-end m-b-15px read-products-button'>
                <i class="bi bi-list-ul"></i> Read Products
            </div>

            <!-- build 'update product' form -->
            <form id='update-product-form' action='#' method='post' border='0'>
                <table class='table table-hover table-responsive table-bordered'>
            
                    <!-- name field -->
                    <tr>
                        <td>Name</td>
                        <td><input value="${name}" type='text' name='name' class='form-control' required /></td>
                    </tr>
            
                    <!-- price field -->
                    <tr>
                        <td>Price</td>
                        <td><input value="${price}" type='number' min='1' name='price' class='form-control' required /></td>
                    </tr>
            
                    <!-- description field -->
                    <tr>
                        <td>Description</td>
                        <td><textarea name='description' class='form-control' required>${description}</textarea></td>
                    </tr>
            
                    <!-- categories 'select' field -->
                    <tr>
                        <td>Category</td>
                        <td>${categories_options_html}</td>
                    </tr>
            
                    <tr>
            
                        <!-- hidden 'product id' to identify which record to update -->
                        <td><input value="${id}" name='id' type='hidden' /></td>
            
                        <!-- button to submit form -->
                        <td>
                            <button type='submit' class='btn btn-info text-white'>
                                <i class="bi bi-pencil-square"></i> Update Product
                            </button>
                        </td>
            
                    </tr>
            
                </table>
            </form>`;

            // inject html to 'page-content' of app
            document.querySelector('#page-content').innerHTML = update_product_html;

            // change page title
            changePageTitle("Update Product");

            // when a 'read products' button was clicked
            readProducts();

            // will run if 'update product' form was submitted
            let update_form = document.querySelector('#update-product-form');
            update_form.addEventListener('submit', (e) => {
                e.preventDefault();
                //get form form data
                const form_data = new FormData(update_form);
                const serialized = JSON.stringify(serialize(form_data));

                // submit form data to api
                fetch("http://localhost/javaScript_php_api_CRUD/api/product/update.php", {
                    method: 'PUT',
                    body: serialized,
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(response => {
                    if (response.ok){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Updated',
                            text: 'Product has been updated',
                            showConfirmButton: false,
                            timer: 2000
                          })
                        // product updated, go back to products list
                        showProductsFirstPage();
                    }else{
                        throw new Error;
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            });

        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(error => {
        console.log(error);
    })
    
};


