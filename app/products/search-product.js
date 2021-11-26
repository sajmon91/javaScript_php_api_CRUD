
function searchForm (e) {
  e.preventDefault();
  
  // get search keywords
  const keywords = document.querySelector("[name='keywords']").value;

  // get data from the api based on search keywords
  fetch(`http://localhost/javaScript_php_api_CRUD/api/product/search.php?s=${keywords}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    }else{
      throw new Error;
    }
  })
  .then(data => {
      // template in products.js
      readProductsTemplate(data, keywords);

      // change page title
      changePageTitle(`Search products: ${keywords}`);
  })
  .catch(error => {
    console.log(error);
  })
};

