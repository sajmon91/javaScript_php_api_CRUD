
window.addEventListener('DOMContentLoaded', () => {
  // show list of product on first load
  showProductsFirstPage();
});

function showProductsFirstPage(){
  const json_url = "http://localhost/javaScript_php_api_CRUD/api/product/read_paging.php";
  showProducts(json_url);
};


// function to show list of products
function showProducts(json_url){

  // get list of products from the API
  fetch(json_url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }else{
      throw new Error;
    }
  })
  .then(data => {
      // html for listing products
      readProductsTemplate(data, "");

      // change page title
      changePageTitle("Read Products");
  })
  .catch(error => {
    console.log(error);
  });

};



// when a 'read products' button was clicked
function readProducts(){
  document.querySelector('.read-products-button').addEventListener('click', showProductsFirstPage);
};



