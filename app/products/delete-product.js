
function deleteProduct () {
    // get product id
    const id = this.dataset.id;

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost/javaScript_php_api_CRUD/api/product/delete.php", {
            method: 'DELETE',
            body: JSON.stringify({ id: id }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => {
          if (response.ok){
            Swal.fire(
              'Deleted!',
              `Your product has been deleted.`,
              'success'
            )
            // re-load list of products
            showProductsFirstPage();
          }else{
            throw new Error;
          }
        })
        .catch((error) =>{
          console.log(error);
        })
      }
    })
};
