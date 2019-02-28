const initialState = {
    name: '',
    email:''
};

export default function admin(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_ADMIN':
            return action.payload;
        default:
            return state;
    }
}