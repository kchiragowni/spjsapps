import React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
//import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';

const SearchComponent = () => {
    return (
        <div 
            className="ms-Gridrow">
            <SearchBox 
                labelText= "Search resource.."
            />
        </div>
    );
};

export default SearchComponent;