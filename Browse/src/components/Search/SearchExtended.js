/*eslint-disable no-unused-var*/
import React, {PropTypes} from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import classNames from 'classnames';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';

class SearchExtended extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            labelText: 'Search',
            hasFocus: false,
            value: ''
        };

        this._clearInput = this._clearInput.bind(this);
        this._onInputFocus = this._onInputFocus.bind(this);
        this._onInputBlur = this._onInputBlur.bind(this);
        this._inputPlaceholder = this._inputPlaceholder.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    _clearInput(){
        this.setState({
            value: ''
        });
        //this._onChange('');
        //e.stopPropagation();
        //e.preventDefault();
    }

    _onInputFocus () {
        this.setState({
            hasFocus: true
        });
    }

    _onInputBlur () {
        this.setState({
            hasFocus: false
        });
    }

    _inputPlaceholder () {
        if (!this.state.hasFocus && this.state.value == '') {
            return (
                <label 
                    className="ms-SearchBox-label" 
                    htmlFor="SearchBox1">
                    <i className="ms-SearchBox-icon ms-Icon ms-Icon--Search" />
                    <span className="ms-SearchBox-text">{this.state.labelText}</span>
                </label>
            );
        }
        return true;
    } 

    _onChange (e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
            let searchBoxClass = classNames({
                'ms-SearchBox': true,
                'is-active': this.state.hasFocus
                });

            return(
                <div>
                    <div className={searchBoxClass}>
                        {this._inputPlaceholder()}
                        <input
                            className="ms-SearchBox-field"
                            type="text"
                            value={this.state.value}
                            onChange={this._onChange}
                            onFocus={this._onInputFocus}
                            onBlur={this._onInputBlur}/>
                        <button
                            className="ms-SearchBox-closeButton"
                            type="button"
                            onMouseDown={this._clearInput}>                            
                            <i className="ms-Icon ms-Icon--Clear" />
                        </button>
                    </div>
                    <div>
                        auto complete goes here...
                    </div>
                </div>
            );
        }
    
}

SearchExtended.propyTypes = {
    value: PropTypes.string
};

export default SearchExtended;
