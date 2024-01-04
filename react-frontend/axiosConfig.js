// First we need to import axios.js
import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'http://localhost:3000/graphql',
    method: "post"
});

instance.defaults.timeout = 2500;

// Where you would set stuff like your 'Authorization' header, etc ...
if(localStorage.getItem('token'))
{
    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}



export default instance;