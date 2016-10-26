/*eslint-disable no-undef*/
import pnp from 'sp-pnp-js';
import $ from 'jquery';

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

export function getQueryResultsSuggestions() {
    /*let queryText = {
        'QueryText': 'Validity'
    };*/
    return pnp.sp.search({
                //suggest: true,
                Querytext: 'Validity'
            })
            .then((results) => {
                return results;
            })
            .catch((error) => {
                throw error;
            });
}

export function getQuerySuggestions(query){
    let siteurl = _spPageContextInfo.webAbsoluteUrl;
    let addParams = "&fhithighlighting=false&fcapitalizefirstletters=false&fprefixmatchallterms=false";
       
    return $.ajax({
        url: siteurl + "/_api/search/suggest?querytext='"+ query +"'" + addParams,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: (data) => {
            if(data.d.suggest.Queries.results.length > 0){
                return data.d.suggest.Queries.results;
            }
        },
        error: (error) => {
            alert("Error: "+ JSON.stringify(error));
            throw error;
        }
    });
}

export function getAjax(url){
    return jQuery.ajax({
            url: url,
            type: "GET",
            headers: { "accept": "application/json;odata=verbose" }
        });
}
