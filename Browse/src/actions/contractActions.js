import * as types from '../constants/actionTypes';
import contractApi from '../api/mockContractApi';

export function loadContractsSuccess(contracts){
    return { type: types.LOAD_CONTRACTS_SUCCESS, contracts};
}

export function loadContracts() {
    return function(dispatch) {
        return contractApi.getAllContracts()
            .then(contracts => {
                dispatch(loadContractsSuccess(contracts));
            })
            .catch(error => {
                throw(error);
            });
    };
}
