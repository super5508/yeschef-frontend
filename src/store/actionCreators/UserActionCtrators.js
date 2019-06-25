import ActionTypes from './../ActionTypes';

export const signin = (user) => ({
    type: ActionTypes.USER_SIGNIN,
    user: user
});

export const signout = () => ({
    type: ActionTypes.USER_SIGNOUT
});
