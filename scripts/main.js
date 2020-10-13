var firebaseConfig = {
  apiKey: "AIzaSyCmSHBNjZ1NJWKvM-TzvF5BI5IN26ZXJJg",
  authDomain: "web-js-project.firebaseapp.com",
  databaseURL: "https://web-js-project.firebaseio.com",
  projectId: "web-js-project",
  storageBucket: "web-js-project.appspot.com",
  messagingSenderId: "998843852384",
  appId: "1:998843852384:web:1c882d575c8a2c84f68505",
  measurementId: "G-DKERXLDK2M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

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
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('article');
    newProduct.classList.add('product');
  
    newProduct.innerHTML = `
    <img class="product__img" src="${elem.img}" alt="">
    <div class="product__info">
      <h3 class="product__title">${elem.title}</h3>
      <p class="product__price">$ ${elem.price}</p>
      <button class="product__delete">Eliminar</button>
      <button class="product__edit">Editar</button>
    </div>
    `;
  
    productsList.appendChild(newProduct);
  });
  deleteProducts();
  updateProducts();
}

var objects = [];
function getProducts(){
  db.collection("products").get().then((querySnapshot) => {
    objects.splice(0,objects.length);
    querySnapshot.forEach((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        objects.push(obj);
        console.log(`${doc.id} => ${doc.data()}`);
    });
    renderProducts(objects);
  });
}

getProducts();
// render inicial con todos los productos
//renderProducts(products);


const filterBtn = document.querySelector('.filterbtn');
filterBtn.addEventListener('click', function () {
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



//Aqui es donde agregamos un producto
const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const newProduct = {
    title: form.title.value,
    img: form.image.value,
    price: form.price.value
  };

  db.collection("products").add(newProduct)
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

  //products.push(newProduct);

  getProducts();
  //renderProducts(products);
});

function deleteProducts(){
  var deleteBtns = document.querySelectorAll('.product__delete');
  deleteBtns.forEach(function (btn,index){
    btn.addEventListener('click',function(){

      db.collection("products").doc(objects[index].id).delete().then(function() {
        getProducts();
        console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });

    });
  });
}

function updateProducts(){
  /*db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });*/
}

