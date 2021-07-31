

const credentials = new Array ()

const loginForm = document.getElementById('loginForm')

credentials[0] = document.getElementById('email')
credentials[1] = document.getElementById('password')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = credentials[0].value
    const password = credentials[1].value

    fetch('https://compx576.herokuapp.com/users/login?email=' + email +'?password=' + password).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                window.location.replace("https://compx576.herokuapp.com/success");
            }
        })
    })
})