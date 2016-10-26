import React, { PropTypes } from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { List } from 'office-ui-fabric-react/lib/List';
//import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
//import { Pivot, PivotItem, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
//import SearchExtended from './SearchExtended';
import classNames from 'classnames';
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

    componentWillReceiveProps(nextPrpos) {
        this.setState({
            suggestions: nextPrpos.suggestions
        });
    }

    _onChange(value) {        
        /*eslint-disable no-console*/
        //console.log('Search box value changed to: ' + value);
        /*
        e.preventDefault();
        if (!e) e = window.event;
        let keyCode = e.keyCode || e.which;
        if (keyCode == '13'){
            // Enter pressed
            console.log('keypressed');
            return false;
        }*/

        this.setState({
            query: value
        });

        if(value.length > 3) {
            this.props.getSuggestions(value);
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
        let {suggestions} = this.state;
        let suggestonsBoxClass = classNames({
            'query-suggestions': true,
            'visible' : suggestions.length !== undefined,
        });

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
                        value={this.state.query}
                    />
                    <div className={suggestonsBoxClass}>
                        <FocusZone direction={FocusZoneDirection.vertical}>
                            <List
                                className="query-suggestions-list"
                                items={suggestions}
                                onRenderCell={(item, key) => (
                                    <div
                                        id={'item-' + key} 
                                        className="query-suggestions-list-item"
                                        onClick={(e) => {
                                            //console.log(item.Query);
                                            e.preventDefault();
                                            this.setState({
                                                query: item.Query,
                                                suggestions: {}
                                            });
                                        }}>
                                        { item.Query }
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
