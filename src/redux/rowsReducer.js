export const rows = (state = { isLoading: true, errMess: null, rows:[]}, action) => {
    switch (action.type) {
        case "ADD_ROWS":
            return {...state, isLoading: false, errMess: null, rows: action.payload};

        case "ROWS_LOADING":
            return {...state, isLoading: true, errMess: null, rows: []}

        case "ROWS_FAILED":
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};