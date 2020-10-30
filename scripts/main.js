const db = firebase.firestore();
const productsRef = db.collection('products');

const productsList = document.querySelector('.productslist');

const loader = document.querySelector('.loader');

let selectedItem = null;

// creación de nuevos productos a partir de la lista
function renderProducts (list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('a');
    newProduct.classList.add('product');

    const url = `producto.html?${elem.id}-${elem.title}`;
    newProduct.setAttribute('href', url);

    newProduct.innerHTML = `
    <img class="product__img" src="${elem.img}" alt="">
    <div class="product__info">
      <h3 class="product__title">${elem.title}</h3>
      <p class="product__price">$ ${elem.price}</p>
      <button class="product__delete">Eliminar</button>
      <button class="product__edit">Editar</button>
    </div>
    `;

    // seleccionamos el botón "Eliminar" que se acaba de crear en este elemento
    const deleteBtn = newProduct.querySelector('.product__delete');
    deleteBtn.addEventListener('click',function(){
      loader.classList.add('loader--show');
      productsRef // referencia de la colección
      .doc(elem.id) // referencia de un documento específico en esa colección
      .delete() // elimine el documento asociado a esa referencia
      .then(function() {
        // debería entrar si todo sale bien
        console.log("Document successfully deleted!");
        getProducts(); // traiga los productos cuando estemos seguros de que ya eliminó el que le dijimos
      })
      .catch(function(error) {
        // debería entrar si ocurre algún error
        console.error("Error removing document: ", error);
      });
    });

    // seleccionar el botón de editar
    // al hacer click al botón de editar
    const editBtn = newProduct.querySelector('.product__edit');
    editBtn.addEventListener('click', function() {
      form.title.value = elem.title;
      form.image.value = elem.img;
      form.price.value = elem.price;
      selectedItem = elem;
    });

    productsList.appendChild(newProduct);
  });
}

function getProducts(){
  productsRef  // referencia de la colección
  .get() // pide todos los documentos de la colección
  .then((querySnapshot) => {
    const objects = [];
    querySnapshot.forEach((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        objects.push(obj);
        console.log(`${doc.id} => ${doc.data()}`);
    });
    renderProducts(objects);
    loader.classList.remove('loader--show');
  });
}

// render inicial con todos los productos
getProducts();


//Aqui es donde agregamos un producto
const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
 
  var storageRef = firebase.storage().ref();

  // Create a reference to 'mountains.jpg'
  var newImageRef = storageRef.child(`products/${Math.floor(Math.random()*123152194192)}.jpg`);

  var file = form.imageFile.files[0]; // use the Blob or File API
  newImageRef.put(file).then(function(snapshot) {
    console.log(snapshot)
    console.log('Uploaded a blob or file!');
  });

  const newProduct = {
    title: form.title.value,
    img: form.image.value,
    price: form.price.value,
  };

  loader.classList.add('loader--show');

  function handleThen (docRef) {
    // console.log("Document written with ID: ", docRef.id);
    getProducts();
    form.title.value = '';
    form.image.value = '';
    form.price.value = '';
    selectedItem = null;
  }

  function handleCatch (error) {
    console.error("Error adding document: ", error);
  }

  if(selectedItem) {
    // si existe selectedItem quiere decir que va a editar
    productsRef
    .doc(selectedItem.id) // seleccione el documento con ese id
    .set(newProduct) // sobreescriba la información existente
    .then(handleThen)
    .catch(handleCatch);

  } else {
    // si no existe es porque es un nuevo producto
    productsRef // referencia de la colección
    .add(newProduct) // cree un nuevo elemento en la colección
    .then(handleThen)
    .catch(handleCatch);
  }
});
