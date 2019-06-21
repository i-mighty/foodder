export const saveUser = user => ({
    type: 'SAVE_USER',
    payload: user
});

export const saveAdmin = user => ({
    type: 'SAVE_ADMIN',
    payload: user
});

export const deleteUser = user => ({
    type: 'DELETE_USER',
    payload: {}
});