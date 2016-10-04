/*eslint-disable no-unused-vars*/
/*eslint-disable no-console*/
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contractActions from '../actions/contractActions'; 
import ContractList from '../components/ContractList';
/* office ui fabric */
import { Selection } from 'office-ui-fabric-react/lib/DetailsList';
//import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Link } from 'office-ui-fabric-react/lib/Link';


class ContractsContainer extends React.Component {
    //private selection: Selection;
    constructor(props, context) {
        super(props, context);
        let _items = Object.assign({}, props.contracts);
       
        this._handleChange = this._handleChange.bind(this);
        this._getSelectionDetails = this._getSelectionDetails.bind(this);
        this._selection = new Selection({
            onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
        });

        this.state = {
            contracts: _items,
            selectionDetails: this._getSelectionDetails(),
            filterValue: 'Filter by contract number',
        };
    }

    _onRenderItemColumn (item, index, column) {
        if (column.isRowHeader) {
            return `Header`;
        } else if (column.key === 'Title') {
            return <Link data-selection-invoke={true}>{ item[column.key] }</Link>;
        } else {
            return item[column.key];
        }
    }

    _getSelectionDetails() {
        let selectionCount = this._selection.getSelectedCount();

        switch (selectionCount) {
        case 0:
            return 'No items selected';
        case 1:
            return '1 item selected: ' + (this._selection.getSelection()[0]).Title;
        default:
            return `${ selectionCount } items selected`;
        }
    }

    _handleChange (e) {
        e.preventDefault();
        let value = e.target.value;
        let { contracts } = this.props;
        this.setState(
        { 
            contracts: value ? contracts.filter(i => i.Title.toLowerCase().indexOf(value) > -1) : contracts 
        });
    }    

    render() {
        let { contracts } = this.props;
        let { selectionDetails } = this.state;
        return (
            <div className="ms-Grid-row"> 
                <div>{selectionDetails}</div>               
                <div className="ms-TextField">
                    <input type="text" placeholder={this.state.filterValue} 
                        id="TextField0" className="ms-TextField-field" aria-describedby="TextFieldDescription1" 
                        aria-invalid="false" onChange={this._handleChange} />
                </div>                
                    <ContractList 
                        contracts={contracts}
                        selectedDetails={this._selection}
                        renderItemColumn={this._onRenderItemColumn.bind(this)} />
            </div>
        );
    }   
}

ContractsContainer.propTypes = {
    contracts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        contracts: state.contracts
    };    
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(contractActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractsContainer);
