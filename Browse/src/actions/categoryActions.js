import * as types from '../constants/actionTypes';
import categoryApi from '../api/mockCategoryApi';
import * as services from '../utlits/spBaseService';

export function loadCategoriesSuccess(categories){
    return { type: types.LOAD_CATEGORY_SUCCESS, categories};
}

export function loadCategories() {
    return function(dispatch) {
        return categoryApi.getAllCategories()
            .then(categories => {
                dispatch(loadCategoriesSuccess(categories));
            })
            .catch(error => {
                throw(error);
            });
    };
}

export function loadRemoteCategories(){ 
    let columns = ['Title']; 
    return function (dispatch) {
        return services.getRequest('Contracts', columns)
            .then((contracts) => {
                dispatch(loadCategoriesSuccess(contracts));
            })
            .catch((error) => {
                throw error;
            });
    };
}

