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
            query: '',
            thisSite: 'https%3A%2F%2Fcambridgeassessment%2Esharepoint%2Ecom%2Fsites%2Fcan'
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
            this.props.queryUpate(this.state.query);
        } else {
            this.setState({
                suggestions: undefined
            });
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
            'visible' : suggestions !== undefined && suggestions.length > 0,
        });

        return (
            <div>
                <form  autoComplete="off" onSubmit={
                    (e) => {
                        e.preventDefault();
                        window.location.href = `/sites/can/_layouts/15/osssearchresults.aspx?u=${this.state.thisSite}&k=${this.state.query}`;   
                    }
                }>
                    <SearchBox
                        labelText="Search resource"
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
                                            this.props.queryUpate(item.Query);
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
    getSuggestions: PropTypes.func.isRequired,
    queryUpate: PropTypes.func.isRequired
};

export default BasicSearch;
