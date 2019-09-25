import Axios from 'axios';
class ycAxios {
    axiosInstance = null;
    initPromise = null;
    constructor() {
        this.initPromise = new Promise((res, rej) => {
            if (process.env.NODE_ENV === 'production') {
                console.log("working with real BE");
                this.axiosInstance = Axios.create({
                    baseURL: 'https://diuuj59mdu49n.cloudfront.net',
                    timeout: 5000
                });
                res();
            } else {
                Axios.get("http://localhost:8080/hc").then(res => {
                    console.log("working with local BE");
                    this.axiosInstance = Axios.create({
                        baseURL: 'http://localhost:8080',
                        timeout: 5000
                    });
                    res();
                }).catch(err => {
                    console.log("working with real BE");
                    this.axiosInstance = Axios.create({
                        baseURL: 'https://diuuj59mdu49n.cloudfront.net',
                        timeout: 5000
                    });
                    res();
                })
            }
        });
    }

    get = async (...args) => {
        if (this.axiosInstance == null) {
            await this.initPromise;
            return this.get(...args);
        }
        args = await this.addAuthToken(args, 1);
        return this.axiosInstance.get(...args);
    }

    post = async (...args) => {
        if (this.axiosInstance == null) {
            await this.initPromise;
            return this.post(...args);
        }
        args = await this.addAuthToken(args, 2);
        return this.axiosInstance.post(...args);
    }

    async addAuthToken(args, configIndex) {
        const config = args[configIndex] || {};
        config.headers = config.headers || {};
        if (window.firebaseAuth && window.firebaseAuth.currentUser) {
            config.headers.authToken = await window.firebaseAuth.currentUser.getIdToken();
        }
        args[configIndex] = config;
        return args;
    }
}

export default new ycAxios();