export const saveUser = user => ({
    type: 'SAVE_USER',
    payload: user
});

export const saveAdmin = admin => ({
    type: 'SAVE_ADMIN',
    payload: admin
});