
// product list html
function readProductsTemplate(data, keywords){
 let read_products_html = `
        <!-- search products form -->
        <hr>
        <form id='search-product-form' action='#' method='post'>
        <div class='input-group float-start w-30-pct'>
 
            <input type='text' value='${keywords}' name='keywords' class='form-control product-search-keywords' placeholder='Search products...' />
 
            <span class='input-group-btn'>
                <button type='submit' class='btn btn-success' type='button'>
                    <i class="bi bi-search"></i>
                </button>
            </span>
 
        </div>
        </form>

        <!-- when clicked, it will load the create product form -->
        <div id='create-product' class='btn btn-primary float-end m-b-15px create-product-button'>
            <i class="bi bi-plus-lg"></i> Create Product
        </div>

        <!-- start table -->
        <table class='table table-bordered table-hover'>
        
            <!-- creating table heading -->
            <tr>
                <th class='w-25-pct'>Name</th>
                <th class='w-10-pct'>Price</th>
                <th class='w-15-pct'>Category</th>
                <th class='w-25-pct text-align-center'>Action</th>
            </tr>`;

            // loop through returned list of data
            data.records.forEach(el => {
                // creating new table row per record
                read_products_html += `
                <tr>

                    <td>${el.name}</td>
                    <td>$${el.price}</td>
                    <td>${el.category_name}</td>

                    <!-- 'action' buttons -->
                    <td>
                        <!-- read product button -->
                        <button class='btn btn-primary m-r-10px read-one-product-button' data-id='${el.id}'>
                            <i class="bi bi-eye"></i> Read
                        </button>

                        <!-- edit button -->
                        <button class='btn btn-info m-r-10px update-product-button text-white' data-id='${el.id}'>
                            <i class="bi bi-pencil-square"></i> Edit
                        </button>

                        <!-- delete button -->
                        <button class='btn btn-danger delete-product-button' data-id='${el.id}'>
                            <i class="bi bi-x-lg"></i> Delete
                        </button>
                    </td>

                </tr>`;
            });

          // end table
          read_products_html += `</table>`;

          // pagination
        if(data.paging){
            read_products_html += "<ul class='pagination pull-left margin-zero padding-bottom-2em'>";
        
                // first page
                if(data.paging.first != ""){
                    read_products_html += `<li class='page-item'><a class='page-link' data-page='${data.paging.first}'>First Page</a></li>`;
                }
        
                // loop through pages
                data.paging.pages.forEach(function(page){
                    let active_page = page.current_page == "yes" ? "class='page-item active'" : "class='page-item'";
                    read_products_html += `<li ${active_page} ><a class='page-link' data-page=${page.url}>${page.page}</a></li>`;
                });
        
                // last page
                if(data.paging.last != ""){
                    read_products_html += `<li><a class='page-link' data-page='${data.paging.last}'>Last Page</a></li>`;
                }
            read_products_html += "</ul>";
        }

          // inject to 'page-content' of app
          document.querySelector('#page-content').innerHTML = read_products_html;

          // show html form when 'create product' button was clicked
          document.querySelector('.create-product-button').addEventListener('click', createProduct);

          // handle 'read one' button click
          document.querySelectorAll('.read-one-product-button').forEach(el => el.addEventListener('click', readOneProduct));

          // show html form when 'update product' button was clicked
          document.querySelectorAll('.update-product-button').forEach(el => el.addEventListener('click', updateProduct));

           // will run if the delete button was clicked
          document.querySelectorAll('.delete-product-button').forEach(el => el.addEventListener('click', deleteProduct));

          // when a 'search products' button was clicked
          document.querySelector('#search-product-form').addEventListener('submit', searchForm);

           // when a 'page' button was clicked
          document.querySelectorAll('.pagination li a').forEach(el => el.addEventListener('click', () => {
              // get json url
              let json_url = el.dataset.page;

              // show list of products
               showProducts(json_url);
          }));

};

