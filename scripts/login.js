const login = document.querySelector('.login');

login.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = login.email.value;
  const password = login.password.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function () {

    window.location.href = 'index.html';

  })
  .catch(function(error) {
    // Handle Errors here.
    console.log(error)

    login.querySelector('.form__error').classList.remove('hidden');
    // ...
  });
});
