const main = document.querySelector('main');
const loginContainer = document.querySelector('.login-container');
const username = document.querySelector('.username');

const login = document.querySelector('.login');
const signup = document.querySelector('.signup');
const logout = document.querySelector('.logout');
const err = document.querySelector('.err');

login.addEventListener('submit', e => {
  e.preventDefault();
  let email = document.querySelector('.email-login').value;
  let password = document.querySelector('.password-login').value;

  if (email && password) {
    err.innerHTML = '';
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      err.innerHTML = `${errorCode}: ${errorMessage}`;
    });
  } else {
    err.innerHTML = 'Please enter your credentials.';
  }
});

signup.addEventListener('submit', e => {
  e.preventDefault();
  let email = document.querySelector('.email-signup').value;
  let password = document.querySelector('.password-signup').value;

  if (email && password) {
    err.innerHTML = '';
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      err.innerHTML = `${errorCode}: ${errorMessage}`;
    });
  } else {
    err.innerHTML = 'Please enter your credentials.';
  }
});

logout.addEventListener('click', e => {
  e.preventDefault();
  firebase.auth().signOut().then(function () {
    main.style.display = 'none';
    loginContainer.style.display = 'flex';
  }).catch(function (error) {
    console.log(error)
  });
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    username.innerHTML = user.email;
    loginContainer.style.display = 'none';
    main.style.display = 'flex';
  } else {
    main.style.display = 'none';
    loginContainer.style.display = 'flex';
  }
});