
function readOneProduct (){
    // get product id
    const id = this.dataset.id;

    // read product record based on given ID
    fetch(`http://localhost/javaScript_php_api_CRUD/api/product/read_one.php?id=${id}`)
    .then(response => {
        if (response.ok) {
          return response.json();
        }else{
          throw new Error;
        }
    })
    .then(data => {
        // start html
        const read_one_product_html = `
        
            <!-- 'read products' button to show list of products -->
            <div id='read-products' class='btn btn-primary float-end m-b-15px read-products-button'>
                <i class="bi bi-list-ul"></i> Read Products
            </div>

            <!-- product data  -->
            <table class='table table-bordered table-hover'>
            
                <!-- product name -->
                <tr>
                    <td class='w-30-pct'>Name</td>
                    <td class='w-70-pct'>${data.name}</td>
                </tr>
            
                <!-- product price -->
                <tr>
                    <td>Price</td>
                    <td>$${data.price}</td>
                </tr>
            
                <!-- product description -->
                <tr>
                    <td>Description</td>
                    <td>${data.description}</td>
                </tr>
            
                <!-- product category name -->
                <tr>
                    <td>Category</td>
                    <td>${data.category_name}</td>
                </tr>
            
            </table>`;

        // inject html to 'page-content' of  app
        document.querySelector('#page-content').innerHTML = read_one_product_html;

        // change page title
        changePageTitle("Read Product");

        // when a 'read products' button was clicked
        readProducts();
    })
    .catch(error => {
        console.log(error);
    })
};
