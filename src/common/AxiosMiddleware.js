import Axios from 'axios';
let instance
if (process.env.NODE_ENV === 'production') {
    instance = Axios;
} else {
    Axios.get("http://localhost:8080/hc").then(res => {
        instance = Axios.create({
            baseURL: 'http://localhost:8080',
            timeout: 5000
        });
    }).catch(err => {
        instance = Axios.create({
            baseURL: 'http://yc-be-1744308311.us-east-1.elb.amazonaws.com',
            timeout: 5000
        });
    })

}
export default instance;