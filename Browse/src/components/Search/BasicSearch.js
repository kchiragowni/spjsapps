import React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
//import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
//import SearchExtended from './SearchExtended';
class SearchComponent extends React.Component {
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);    
        this.search = this.search.bind(this);    
        this.state = {
            query: ''
        };
    }
    onChange(value) {
        
        console.log('Search box value changed to: ' + value);
        /*
        e.preventDefault();
        if (!e) e = window.event;
        let keyCode = e.keyCode || e.which;
        if (keyCode == '13'){
            // Enter pressed
            console.log('keypressed');
            return false;
        }*/
    }
    search(ele) {
        alert('onKeydown');
        //ele.preventDefault();
        if(ele.keyCode == 13) {
            alert(ele.value);        
        }
    }

    render() {
        return (
            <div 
                className="ms-SearchBoxSmall">
                <SearchBox 
                    labelText="Search resources"
                    onChange={
                        (newValue) => {
                            this.onChange(newValue);                           
                        }
                    }
                />
            </div>
        );
    }
}

export default SearchComponent;
