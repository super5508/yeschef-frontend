import ActionTypes from '../ActionTypes';

export const gotoHome = () => ({
    type: ActionTypes.UPDATE_SELECTED,
    selected:'home'
});

export const gotoFeedback = () => ({
    type: ActionTypes.UPDATE_SELECTED,
    selected:'feedback'
});

export const gotoMyProfile = () => ({
    type: ActionTypes.UPDATE_SELECTED,
    selected:'myProfile'
});

export const hideMainMenu = () => ({
    type: ActionTypes.HIDE_MAIN_MENU
});

export const showMainMenu = () => ({
    type: ActionTypes.SHOW_MAIN_MENU
});
