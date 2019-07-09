import Axios from 'axios';
let instance
if (process.env.NODE_ENV === 'production') {
    instance = Axios;
} else {
    console.log(Axios);
    instance = Axios.create({
        baseURL: 'https://us-central1-yeschef-7b155.cloudfunctions.net',
        timeout: 2000
    });
}
export default instance;