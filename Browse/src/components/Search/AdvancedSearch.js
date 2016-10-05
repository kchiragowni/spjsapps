import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Link } from 'office-ui-fabric-react/lib/Link';

class AdvancedSearch extends React.Component {

  constructor() {
    super();
    this.state = {
      showDialog: false
    };
  }

  render() {
    const linkDivStyle = {
            marginTop: '5px',
            marginLeft: '-20px'
    };
    return (
        <div>
            <div className="ms-Grid-col ms-u-sm7 ms-u-md7 ms-u-lg7">
                <Button 
                    description="Opens the Advanced Search Dialog" 
                    buttonType= {ButtonType.normal}
                    onClick={this._showDialog.bind(this)}>Advanced Search</Button>
                <Dialog
                isOpen={this.state.showDialog}
                type={DialogType.normal}
                onDismiss={this._closeDialog.bind(this)}
                title="Advanced Search"
                subText="Find documents that have.."
                isBlocking={false}
                >
                <ChoiceGroup
                    options={ [
                    {
                        key: 'A',
                        text: 'Option A'
                    },
                    {
                        key: 'B',
                        text: 'Option B',
                        isChecked: true
                    },
                    {
                        key: 'C',
                        text: 'Option C',
                        isDisabled: true
                    }
                    ]}
                    onChanged={this._onChoiceChanged}
                />
                <DialogFooter>
                    <Button buttonType={ButtonType.primary} onClick={this._closeDialog.bind(this)}>Save</Button>
                    <Button onClick={this._closeDialog.bind(this)}>Cancel</Button>
                </DialogFooter>
                </Dialog>
            </div>
            <div className="ms-Grid-col ms-u-sm5 ms-u-md5 ms-u-lg5 ms-u-textAlignLeft" style={linkDivStyle}>
                <Link
                    href="http://dev.office.com/fabric/components/link">
                    <i className="ms-Icon ms-Icon--Help ms-font-xs" aria-hidden="true"></i> search tips 
                </Link>
            </div>
        </div>
    );
  }

  _showDialog() {
    this.setState( {showDialog: true } );
  }

  _closeDialog() {
    this.setState( {showDialog: false } );
  }

  _onChoiceChanged() {
    console.log( 'Choice option change' );
  }
}


export default AdvancedSearch;