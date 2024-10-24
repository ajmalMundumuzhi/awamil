document.addEventListener('DOMContentLoaded',()=>{
    const submit=document.getElementById('submit')
    const emailInput=document.getElementById('emailInput')
    const passwordInput=document.getElementById('passwordInput')
    const errorInput=document.getElementById('error')

    submit.addEventListener('click',(event)=>{
        event.preventDefault();
        const data = {
            mail : emailInput.value,
            password : passwordInput.value
        }
        axios.post('/auth/signup',data)
        .then((response)=>{
            console.log(response.data)

            if(response.data.success){
                window.location.href='/auth/login'
            }
            else{
                errorInput.type = 'text'
                errorInput.value = response.data.data || 'Invalid data check your details'
            }
        })
        .catch((error)=>{
            console.error(error.response)

            if(error.response && error.response.status == 422){
                errorInput.type = 'text'
                errorInput.value = error.response.data.message
            }
            else{
                console.error("An unexpected error occured :",error.response || error)
                errorInput.value = 'An unexpected error occured please try again later'
            }
        })
    })
})