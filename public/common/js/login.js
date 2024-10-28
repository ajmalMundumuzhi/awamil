document.addEventListener('DOMContentLoaded',()=>{
    const submit=document.getElementById('submit')
    const emailInput=document.getElementById('emailInput')
    const passwordInput=document.getElementById('passwordInput')
    const errorInput=document.getElementById('error')
    
    submit.addEventListener('click',(event)=>{
        event.preventDefault();
        const data={
            mail : emailInput.value,
            password : passwordInput.value
        }
        axios.post('/auth/login',data)
        .then((response)=>{
            console.log(response.data.user);
            localStorage.setItem('token',response.data.token)
            
            if(response.data.user === 'admin'){
                window.location.href='/admin'
            }
            else{
                window.location.href='/auth/login'
            }

        })
        .catch((error) => {
            console.error(error.response);
            if (error.response && error.response.status === 401) {
                errorInput.type = 'text'; 
                errorInput.value = error.response.data.data || 'Invalid credentials. Please try again.';
            } else {
                console.error('An unexpected error occurred:', error.response || error);
                errorInput.type = 'text';
                errorInput.value = 'An unexpected error occurred. Please try again later.';
            }
        });
    })
})