const cartItemList=JSON.parse(localStorage.getItem('cardElements'));
console.log(cartItemList);
/*
const renderCardItem=(element)=>{
    return `
    <tr>
    <td class="align-middle">
      <img src="${element.image}" alt="" style="width: 50px" />
      ${element.name}
    </td>
    <td class="align-middle">${element.price - (element.price * element.discount)}$</td>
    <td class="align-middle">
      <div
        class="input-group quantity mx-auto"
        style="width: 100px"
      >
        <div class="input-group-btn">
          <button
            type="button"
            class="decBtn btn btn-sm btn-primary btn-minus"
          >
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <input
          type="text"
          class="quantityVal form-control form-control-sm bg-secondary border-0 text-center"
          value="100"
        />
        <div class="input-group-btn">
          <button
            type="button"
            class="incBtn btn btn-sm btn-primary btn-plus"
          >
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </td>
    <td class="align-middle">$100</td>
    <td class="align-middle">
      <button class="btn btn-sm btn-danger" type="button">
        <i class="fa fa-times"></i>
      </button>
    </td>
  </tr>
    `
}

(function addCartItemsToPage(){
    let content ='';
    cartItemList.forEach(element => {
        content+= renderCardItem(element);
    });
    document.getElementById("add-pro-item").innerHTML=content;
})(); */