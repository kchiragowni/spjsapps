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
    let columns = ['Title', 'Description', 'Group', 'ResourcesCount']; 
    return function (dispatch) {
        return services.getRequest('Navigation', columns)
            .then((categories) => {
                dispatch(loadCategoriesSuccess(categories));
            })
            .catch((error) => {
                throw error;
            });
    };
}

