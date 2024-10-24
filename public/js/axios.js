// const { default: axios } = require("axios");

axios.get('https://reqres.in/api/users?page=2')

.then((res) => console.log(res))
.catch((err) => console.log(err))