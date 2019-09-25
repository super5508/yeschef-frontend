import Axios from '../common/AxiosMiddleware';

const doPopLoginWith = (provider) => {
    return window.firebaseAuth.signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...

        if (result.additionalUserInfo.isNewUser) {
            window.Intercom && window.Intercom('update', {
                email: user.email,
                name: user.displayName,
                firebase_user: true
            });

            var zapierData = {
                email: user.email,
                name: user.displayName,
                login_with: result.additionalUserInfo.providerId,
                referrer: document.referrer,
                firebase_user: true
            };

            for (var k in window.queryParams) {
                var kLower = k.toLocaleLowerCase();
                if (kLower.startsWith("utm")) {
                    zapierData[kLower] = window.queryParams[k];
                }
            }

            Axios.post("https://hooks.zapier.com/hooks/catch/3515015/vubj7o/", zapierData, function () {
            });

            window.firebaseAuth.currentUser.getIdToken().then(function (token) {
                zapierData.authToken = token;
                Axios.post("/user", zapierData, function () {
                });
            });
        }

        return user;
    }, function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        if (error.code == 'auth/popup-blocked') {
            window.firebaseAuth.signInWithRedirect(provider);
        }
        throw error;
    });
}


const doFacebookSignIn = () => {
    var provider = new window.firebase.auth.FacebookAuthProvider();
    return doPopLoginWith(provider);
}

const doGoogleSignIn = () => {
    var provider = new window.firebase.auth.GoogleAuthProvider();
    return doPopLoginWith(provider);
}

export default {
    doFacebookSignIn,
    doGoogleSignIn
}