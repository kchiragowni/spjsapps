import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {Dropdown} from 'office-ui-fabric-react/lib/Dropdown';

class AdvancedSearch extends React.Component {

  constructor() {
    super();
    this._showDialog = this._showDialog.bind(this);
    this.state = {
      showDialog: false,
      searchText: '',
      courseKey:'',
      levelKey:'',
      typeKey:''
    };
  }

  _onChanged(option){
    this.setState({
        courseKey: option.key
    });
    //alert(option.key);
  }

  render() {
    const linkDivStyle = {
            marginTop: '5px',
            marginLeft: '-20px'
    };
    return (
        <div>
            <div className="ms-Grid-col ms-u-sm8 ms-u-md8 ms-u-lg8">
                <Button 
                    description="Opens the Advanced Search Dialog" 
                    buttonType= {ButtonType.normal}
                    onClick={(ev) => {
                        ev.preventDefault();
                        this._showDialog();}}
                    onLayerMounted={( )=> {return true;}}
                    >
                    Advanced Search
                </Button>
                <Dialog
                    isOpen={this.state.showDialog}
                    type={DialogType.normal}
                    onDismiss={this._closeDialog.bind(this)}
                    title="Advanced Search"
                    subText="Find resources that have.."
                    isBlocking={false}
                    isDarkOverlay={true}
                >
                <TextField 
                    placeholder='Search with keywords' 
                    ariaLabel='Please enter text here' 
                    required={true} 
                    onChanged={this._onChanged} />
                
                <Dropdown
                    id='owstaxIdCourse'
                    label='Course:'
                    options={
                        [
                            { key: '941cf3fa-f7f9-40c7-b2c2-9e66eba01c58', text: 'Certificate in the Principles and Practice of Assessment' },
                            { key: '2c75d6f8-7633-423a-9db2-fbea994e61c3', text: 'Concepts and Contexts of assessment' },
                            { key: 'c4a9a7e6-8664-4c82-a6d9-7d7ff089bee3', text: 'Connecting with Assessment' },
                            { key: '16f83ef7-3e82-4807-ac2c-d776cdd11a8c', text: 'Introduction to Assessment online' },
                            { key: '50b49aae-adf2-49db-b8c4-2c61a479ba2f', text: 'PGCEA' },                        
                        ]
                    }
                    onChanged={this._onChanged.bind(this)}
                />

                 <Dropdown
                    label='Resource level:'
                    options={
                        [
                            { key: '10ef57a1-05c7-4b3f-9db0-314f312574b8', text: 'Discovery' },
                            { key: '00fb0ca2-7a0b-42c0-ae0a-63016ec8fcab', text: 'Mastery' },
                            { key: '972dd0d7-3bd1-4bda-8877-6ce5eda73799', text: 'Professional' }                  
                        ]
                    }
                    onChanged={this._onChanged.bind(this)}
                />

                <ChoiceGroup
                    label='Resourse type'
                    options={ [
                    {
                        key: 'pdf',
                        text: 'PDF'
                    },
                    {
                        key: 'word-docs',
                        text: 'Word Documents',
                        isChecked: true
                    },
                    {
                        key: 'pptx',
                        text: 'Powerpoint presentation',
                        isDisabled: true
                    }
                    ]}
                    onChanged={this._onChoiceChanged}
                />
                <DialogFooter>
                    <Button buttonType={ButtonType.primary} onClick={this._closeDialog.bind(this)}>Search</Button>
                    <Button buttonType={ButtonType} onClick={this._closeDialog.bind(this)}>Save</Button>
                    <Button onClick={this._closeDialog.bind(this)}>Cancel</Button>
                </DialogFooter>
                </Dialog>
            </div>
            <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4 ms-u-textAlignLeft" style={linkDivStyle}>
                <Link
                    href="/sites/can/SitePages/Search-Tips.aspx">
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