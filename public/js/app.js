

const credentials = new Array ()

const loginForm = document.getElementById('loginForm')

credentials[0] = document.getElementById('email')
credentials[1] = document.getElementById('password')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = credentials[0].value
    const password = credentials[1].value

    postData('https://compx576.herokuapp.com/users/login', { email: email, password: password })
    .then(data => {
        if (data.error) {
            window.location.replace("https://compx576.herokuapp.com/fail")
        } else {
            window.location.replace("https://compx576.herokuapp.com/success")
        }
    });

    // fetch('https://compx576.herokuapp.com/users/login?email=' + email +'?password=' + password).then((response) => {
    //     method: "POST"
    //     response.json().then((data) => {
    //         if (data.error) {
    //             console.log(data.error)
    //         } else {
    //             window.location.replace("https://compx576.herokuapp.com/success");
    //         }
    //     })
    // })
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
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  