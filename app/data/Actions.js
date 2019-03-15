export const saveUser = user => ({
    type: 'SAVE_USER',
    payload: user
});

export const deleteUser = user => ({
    type: 'DELETE_USER',
    payload: {}
});