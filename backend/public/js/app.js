
const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    postData('/users/login', { 
      email: document.getElementById('email').value, 
      password: document.getElementById('password').value })
      .then(data => {
          window.location.replace("/success")
      }).catch(err => {
          window.location.replace("/fail")
      })

})

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', 
      // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, 
      // gisame-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  