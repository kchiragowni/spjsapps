/*eslint-disable no-undef*/
import pnp from 'sp-pnp-js';

export function getRequest(listTitle, columns) {
    return pnp.sp.web
            .lists.getByTitle(listTitle).items
            .select(columns ? columns : '' )
            .get(undefined, {
                headers: {
                    'Accept': 'application/json;odata=nometadata'
                }
            })
            .then((items) => {
                return items;
            })
            .catch((error) => {
                throw error;
            });
}

export function getSearchResult() {
    let queryText = {
        'QueryText': 'Validity'
    };
    return pnp.sp.search
            .execute(queryText)
            .get(undefined, {
                headers: {
                    'Accept': 'application/json;odata=nometadata'
                }
            })
            .then((results) => {
                return results;
            })
            .catch((error) => {
                throw error;
            });
}
