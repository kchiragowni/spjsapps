//eslint-disable no-unused-vars
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
        this.state = {
            contracts: {},
            selectionDetails: '',
            filterValue: 'Filter by contract number',
        };
        this.handleChange = this.handleChange.bind(this);
        this.onRenderItemColumn = this.onRenderItemColumn.bind(this);
        //this.getSelectionDetails = this.getSelectionDetails.bind(this);
        this.selection = new Selection({
            onSelectionChanged: () => this.setState({ selectionDetails: 'Selected ' })
        });
    }
    
    componentWillMount () {
        this.setState({
            contracts: Object.assign({}, this.props.contracts) 
        });
    }

    onRenderItemColumn (item, index, column) {
        if (column.isRowHeader) {
            return `header`;
        } else if (column.key === 'number') {
            return <Link data-selection-invoke={true}>{ item[column.key] }</Link>;
        }

        return item[column.key];
    }

    /*getSelectionDetails() {
        let selectionCount = this.selection.getSelectedCount();

        switch (selectionCount) {
        case 0:
            return 'No items selected';
        case 1:
            return '1 item selected: ' + (this.selection.getSelection()[0]).number;
        default:
            return `${ selectionCount } items selected`;
        }
    }*/

    handleChange (e) {
        let value = e.target.value;
        let { contracts } = this.props;
        this.setState(
        { 
            contracts: value ? contracts.filter(i => i.contractingOfficer.toLowerCase().indexOf(value) > -1) : contracts 
        });
    }    

    render() {
        let { contracts } = this.state;
        let { selectionDetails } = this.state;
        return (
            <div className="ms-Grid-row"> 
                <div>{selectionDetails}</div>               
                <div className="ms-TextField">
                    <input type="text" placeholder={this.state.filterValue} 
                        id="TextField0" className="ms-TextField-field" aria-describedby="TextFieldDescription1" 
                        aria-invalid="false" onChange={this.handleChange} />
                </div>
                <ContractList 
                    contracts={contracts}
                    selectedDetails={this.selection}
                    renderItemColumn={this.onRenderItemColumn} />
            </div>
        );
    }   
}

ContractsContainer.propTypes = {
    contracts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            number: PropTypes.string.isRequired, 
            contractingOfficer: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
            endDate: PropTypes.string.isRequired,
            ceilingValue: PropTypes.number.isRequired
        }).isRequired
    ).isRequired,
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
