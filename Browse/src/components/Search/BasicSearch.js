import React, { PropTypes } from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { List } from 'office-ui-fabric-react/lib/List';
//import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
//import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
//import SearchExtended from './SearchExtended';
class BasicSearch extends React.Component {
    constructor(props){
        super(props);

        //this.onChange = this.onChange.bind(this);    
        this._onChange = this._onChange.bind(this);    
        this.state = {
            labelText: 'Search',
            suggestions: Object.assign({}, props.suggestions),
            query: ''
        };
    }
    _onChange(value) {        
        /*eslint-disable no-console*/
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

        if(value.length > 3) {
            this.props.getSuggestions();
        }
    }
    search(ele) {
        alert('onKeydown');
        //ele.preventDefault();
        if(ele.keyCode == 13) {
            alert(ele.value);        
        }
    }

    render() {

        let searchSuggestions = [
            {
                term: 'Cambridge Approach',
                key: 'cambridge-approach'                
            },
            {
                term: 'CII',
                key: 'cii'                
            },
            {
                term: 'Course Specification',
                key: 'course-specification'                
            }
        ];

        return (
            <div>
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                    }
                }>
                    <SearchBox 
                        labelText="Search resources"
                        onChange={
                            (newValue) => {
                                this._onChange(newValue);                           
                            }
                        }
                    />
                    <div className="query-suggestions">
                        <FocusZone direction={FocusZoneDirection.vertical}>
                            <List
                                className="query-suggestions-list"
                                items={searchSuggestions}
                                onRenderCell={(item, key) => (
                                    <div
                                        id={'item-' + key} 
                                        className="query-suggestions-list-item">
                                        { item.term }
                                    </div>
                                )}
                            />
                        </FocusZone>
                    </div>
                </form>
            </div>
        );
    }
}

BasicSearch.propTypes = {
    suggestions: PropTypes.array.isRequired,
    getSuggestions: PropTypes.func.isRequired
};

export default BasicSearch;
