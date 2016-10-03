/*eslint-disable no-unused-vars*/
import React, { PropTypes } from 'react';
//import ContractListRow from './ContractListRow';
import { DetailsList, Selection } from 'office-ui-fabric-react/lib/DetailsList';
const ContractList = ({contracts, renderItemColumn, selectedDetails}) => {
    return ( 
        <DetailsList
            items={contracts}
            setKey={(contract) => contract.id}
            selection={selectedDetails}
            onItemInvoked={(contract) => alert(`Item invoked: ${contract.number}`)}
            onRenderItemColumn={renderItemColumn}
        />
    );
};

ContractList.propTypes = {
    contracts: PropTypes.array.isRequired,
    renderItemColumn: PropTypes.func,
    selectedDetails: PropTypes.object
};

export default ContractList;
