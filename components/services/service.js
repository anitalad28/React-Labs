class ProductService{
    getData(){
        let promise =  fetch("http://localhost:4070/api/products");
        return promise;
    }

    postData(prd){
        let promise = fetch("http://localhost:4070/api/products", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(prd)
        });
        return promise
    }

    deleteData(productId){
        let promise = fetch(`http://localhost:4070/api/products/${productId}`, {
            method: "DELETE",           
            headers:{
                "Content-Type":"application/json"
            },
        });
        return promise
    }

    updateData(prd, productId){
        let promise = fetch(`http://localhost:4070/api/products/${productId}`, {
            method: "PUT",           
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(prd)
        });
        return promise
    }
}

export default ProductService;