const products = [
  {
    title: 'Celular Motorola Moto One Macro',
    img: 'https://http2.mlstatic.com/D_NQ_NP_671655-MCO43438392203_092020-V.webp',
    price: 499900,
  },
  {
    title: 'Celular Motorola One Action Color Blanco',
    img: 'https://http2.mlstatic.com/D_NQ_NP_760318-MCO42908273986_072020-V.webp',
    price: 679900,
  },
  {
    title: 'Celular Motorola Moto G8 Plus 64gb',
    img: 'https://http2.mlstatic.com/D_NQ_NP_846737-MCO43497294331_092020-V.webp',
    price: 649900,
  },
  {
    title: 'Motorola Moto G8 Power 4g',
    img: 'https://http2.mlstatic.com/D_NQ_NP_725226-MCO42143648422_062020-V.webp',
    price: 699900,
  },
];

const productsList = document.querySelector('.productslist');


// creación de nuevos productos a partir de la lista
function renderProducts (list) {
  list.forEach(function (elem) {
    const newProduct = document.createElement('article');
    newProduct.classList.add('product');
  
    newProduct.innerHTML = `
    <img class="product__img" src="${elem.img}" alt="">
    <div class="product__info">
      <h3 class="product__title">${elem.title}</h3>
      <p class="product__price">$ ${elem.price}</p>
    </div>
    `;
  
    productsList.appendChild(newProduct);
  });
}


// render inicial con todos los productos
renderProducts(products);


const filterBtn = document.querySelector('.filterbtn');
filterBtn.addEventListener('click', function () {
  productsList.innerHTML = '';

  // función slice para tomar una sección de la lista
  // const filtered = products.slice(1, 3);

  // función filter para filtrar con una condición específica
  const filtered = products.filter(function (elem) {
    if(elem.price > 650000) {
      return true;
    } else {
      return false;
    }
  });

  // render solo con los productos filtrados
  renderProducts(filtered);
});
