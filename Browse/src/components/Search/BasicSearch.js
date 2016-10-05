import React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
//import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';

const SearchComponent = () => {
    return (
        <div className="ms-Gridrow">
            <SearchBox 
                labelText= 'Search resource..'
                className="ms-SearchBoxSmall"
                onChange={
                    (newValue) => {
                        console.log('Search box value changed to: ' + newValue);
                    }
                }
            />
        </div>
    );
};

export default SearchComponent;