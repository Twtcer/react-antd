export default (state = { list: [], page: 1, total: 0 }, action) => {
    switch (action.type) {
        case 'PRODUCT_LOADED':
            // console.log('action = ', action);
            // console.log('state = ', state);
            let data = {
                ...state,
                list: action.playload.products,
                page: action.playload.page,
                pages: action.playload.pages,
                total: action.playload.totalCount
            };
            console.log('state = ', data);
            return data;
        default:
            return state
    }
};