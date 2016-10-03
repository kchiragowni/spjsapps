import React, { PropTypes } from 'react';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';

const ContractListRow = ({contract, areButtonsDisabled}) => {
    return(
        <tr className="ms-Table-row">
            <td>{contract.id}</td>
            <td>{contract.number}</td>
            <td>{contract.contractingOfficer}</td>
            <td>
                <Button disabled={areButtonsDisabled} buttonType={ButtonType.primary}>Create account</Button>
            </td>
        </tr>
    );
};

ContractListRow.propTypes = {
    contract: PropTypes.shape({
                id: PropTypes.number.isRequired,
                number: PropTypes.string.isRequired, 
                contractingOfficer: PropTypes.string.isRequired,
                startDate: PropTypes.string.isRequired,
                endDate: PropTypes.string.isRequired,
                ceilingValue: PropTypes.number.isRequired
            }).isRequired,
    areButtonsDisabled: PropTypes.bool
};

export default ContractListRow;
