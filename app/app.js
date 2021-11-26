const app_div = document.querySelector('#app');

window.addEventListener('DOMContentLoaded', () => {
    // app html
    var app_html=`
      <div class='container'>

          <div class='page-header'>
              <h1 id='page-title'>Read Products</h1>
          </div>

          <!-- this is where the contents will be shown. -->
          <div id='page-content'></div>

      </div>`;

    app_div.innerHTML = app_html;
});



// change page title
function changePageTitle(page_title){

  // change page title
  document.querySelector('#page-title').textContent = page_title;

  // change title tag
  document.title = page_title;
};



 // serialize to object
 function serialize (data) {
    let obj = {};
    for (let [key, value] of data) {
      if (obj[key] !== undefined) {
        if (!Array.isArray(obj[key])) {
          obj[key] = [obj[key]];
        }
        obj[key].push(value);
      } else {
        obj[key] = value;
      }
    }
    return obj;
  };
  