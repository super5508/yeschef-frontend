import ActionTypes from '../ActionTypes';
import Axios from '../../common/AxiosMiddleware';

export const signin = (user) => {
    return (dispatch) => {
        dispatch(updateUserProfile(user));
        window.firebaseAuth.currentUser.getIdToken().then(function (token) {
            Axios.get('/api/user/',
                { headers: { authToken: token } }
            ).then(usersMetaData => {
                dispatch(receivedMetadata(usersMetaData.data));
            }).catch(() => {

            })
        });
    }
};

export const receivedMetadata = (usersMetadata) => ({
    type: ActionTypes.USER_RECEIVE_METADATA,
    usersMetadata
});

export const updateUserProfile = (user) => ({
    type: ActionTypes.USER_UPDATE_PROFILE,
    user
});

export const signout = () => ({
    type: ActionTypes.USER_SIGNOUT
});


export const message = (message) => ({
    type: ActionTypes.MESSAGE_TYPE,
    message
});

