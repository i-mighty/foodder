const initialState = {
    name: '',
    phoneNumber: ''
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case 'SAVE_USER':
            return action.payload; 
        default:
            return state;
    }
}