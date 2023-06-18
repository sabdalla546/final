const products = [];
const cardItems=[];
const getHomeHTML=(element) =>{
  return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1 "  >
  <div class="product-item bg-light mb-4">
    <div class="product-img position-relative overflow-hidden">
      <img class="img-fluid w-100" src="${element.image}" alt="">
      <div class="product-action">
        <a class="btn btn-outline-dark btn-square add-to-card-item " id="${element.category_id}"><i class="fa fa-shopping-cart"></i></a>
        <a class="btn btn-outline-dark btn-square love-btn" href="#"><i class="far fa-heart"></i></a>
        <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-sync-alt"></i></a>
        <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-search"></i></a>
      </div>
    </div>
    <div class="text-center py-4">
      <a class="h6 text-decoration-none text-truncate" href="">Product Name Goes Here</a>
      <div class="d-flex align-items-center justify-content-center mt-2">
        <h5>${element.price - (element.price * element.discount)}</h5>
        <h6 class="text-muted ml-2"><del>$${element.price}</del></h6>
      </div>
      <div class="d-flex align-items-center justify-content-center mb-1">
        ${getRatingHTML(element.rating)}
      </div>
    </div>
  </div>
</div>`;
}
const getRatingHTML=(rating) =>{
    const rate = Math.floor(rating);
    const halfStar=!(rating %1 ===0);
    let content='';
    for(let i=0 ; i< rate ; i++){
      content+= ` <small class="fa fa-star text-primary mr-1"></small>`
    }
    if(halfStar===true){
      content+=`<small class="fa fa-star-half-alt text-primary mr-1"></small>`
    }
  return content;
}
const addProductToPage=(products)=>{
  let content='';
  products.forEach(element=>{
    content+=getHomeHTML(element);
  });
  //console.log(content)
  document.getElementById('add-products').innerHTML=content;
}
const addRecentProductToPage=(products)=>{
    const recentProducts=[];
    let content='';
    products.forEach(element=>{
      if(element.is_recent===true){
        //console.log(element)
        recentProducts.push(element);
      }
    });
    recentProducts.forEach(element=>{
      content+=getHomeHTML(element);
    })
    document.getElementById('add-recent-prodect').innerHTML=content;
}
(async function () {
  const response = await fetch("http://localhost:5000/api/categories/");
  const data=await response.json();
      let list = "";
      let categoryContent='';
      data.data.sort((a, b) => b.productCount - a.productCount);
      data.data.forEach((element) => {
        list =
          list +
          `<a data-id="${element._id}" onclick="getCities(${element._id})" href="products.php?cat_id=${element._id}" class="nav-item nav-link">${element.name}</a>`;
          
      });
      data.data.slice(0,4).forEach(element=>{
        categoryContent+=`
          <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
          <a class="text-decoration-none" href="">
            <div class="cat-item d-flex align-items-center mb-4">
              <div class="overflow-hidden" style="width: 100px; height: 100px">
                <img class="img-fluid" src=${element.image} alt="" />
              </div>
              <div class="flex-fill pl-3">
                <h6>${element.name}</h6>
                <small class="text-body">${element.productCount}</small>
              </div>
            </div>
          </a>
        </div>
          `
      })
      //console.log(d.data);
      document.getElementById("categories-menu").innerHTML = list;
      document.getElementById('add-category').innerHTML =categoryContent;
})();

(async function(){
  const response =await fetch('http://localhost:5000/api/products/');
      data=await response.json();
    
      data.data.slice(0,8).forEach(element=>{
      let itemData={
        id:element._id ,
        name:element.name,
        price:element.price,
        discount:element.discount,
        image:element.image,
        rating:element.rating,
        rating_count:element.rating_count,
        is_featured: element.is_featured,
        is_recent: element.is_recent,
        color: element.color,
        size: element.size,
        category_id:element.category_id,
      }
      products.push(itemData);
    });
   
  addProductToPage(products);
  addRecentProductToPage(products);
  addToLove();
  addToCardItems();
})();
function addToLove(){
    let lovCount=0;
    loveBtn=document.querySelectorAll('.love-btn');
    loveBtn.forEach(element=>{
      element.addEventListener('click',(e)=>{
        e.preventDefault();
        lovCount++;
        localStorage.setItem('loveCounter',JSON.stringify(lovCount));
      })
    })
    
}
console.log(products)

function addToCardItems(){
    const cardItem=document.querySelectorAll('.add-to-card-item');
    cardItem.forEach(el=>{
      el.addEventListener('click',(e)=>{
        e.preventDefault();
        products.forEach(element=>{
          if(element.category_id== el.getAttribute('id')){
            cardItems.push(element);
          }
          
        })
        localStorage.setItem('cardElements',JSON.stringify(cardItems));
      })
    })
    
}
//console.log(products);
/*
class Product {
  id;
  name;
  price;
  discount;
  image;
  rating;
  rating_count;
  constructor(obj) {
    this.id = obj._id;
    this.name = obj.name;
    this.price = obj.price;
    this.discount = obj.discount;
    this.rating = obj.rating;
    this.rating_count = obj.rating_count;
  }

  getPriceAfterDiscount() {
    return this.price - this.price * this.discount;
  }

  getRatingHTML() {
    return `<div class="d-flex align-items-center justify-content-center mb-1">
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small class="fa fa-star text-primary mr-1"></small>
    <small>(99)</small>
  </div>`;
  }

 

  getHTML() {
    return ``;
  }
}

class CartLine {
  product;
  quantity;
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.getPriceAfterDiscount() * this.quantity;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }
}

class Cart {
  cartlines;
  constructor(productsArray) {
    this.cartlines = [];
    //loop to add products into cartlines array
  }

  remove(productId) {}

  getTotal() {}

  getSubTotal() {}
}*/
//Cart
//CartLine
//Product
//Category
