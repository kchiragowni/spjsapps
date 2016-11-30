import React, { PropTypes } from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
//import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TagPicker } from 'office-ui-fabric-react/lib/Pickers';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Label } from 'office-ui-fabric-react/lib/Label';

class AdvancedSearch extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      categories: Object.assign({}, props.categories),
      showDialog: false,
      queryText: '',
      topicKey: '',
      bespokeKey: '',
      courseKey: '',
      levelKey:'',
      topicKeys: [],
      typeKeys:[],
      isBespokeVisible: false,
      isCourseVisible: false,
      isTopicVisible: false,
      isResourceLevelVisible: false,
      isResourceTypeVisible: false,
      /*eslint-disable no-undef*/
      thisSite: process.env.NODE_ENV === 'production' ? _spPageContextInfo.webAbsoluteUrl : ''
      /*enlint-enable no-undef*/
    };
    this._showDialog = this._showDialog.bind(this);
    this._getErrorMessage = this._getErrorMessage.bind(this);
    this._getFileParams = this._getFileParams.bind(this);
  }

  componentWillReceiveProps(nextPrpos) {
        this.setState({
            categories: nextPrpos.categories
        });
    }

  _onChangedKeyword(text){
    this.setState({
        queryText: text
    });  
  }

  _getErrorMessage(value){
      return value.length == 0 ? 'The length of the input value should be greater than 3' : ''; 
  }

  _onchangedTopic(object){
      this.setState({
          topicKey: object.text
      });
  }

  _onchangedBespoke(object){
      this.setState({
          bespokeKey: object.key
      });
  }

  _onChangedCourse(object){
      this.setState({
          courseKey: object.text
      });
  }

  _onChangedResourseLevel(object){
      this.setState({
          levelKey: object.key
      });
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

  _getFileParams(exts){
      let files = '';
      for(let [index, value] of exts.entries()) {
          if(index > 0)
            files += `%2C`;
          files += `%22equals(%5C%22${value}%5C%22)%22`;
      }
      return files;
  }

  _refinementFilter(refinerName, refinerTokens, operator, useKQL){
      return `%7B%22n%22%3A%22${refinerName}%22%2C%22t%22%3A%5B%22%5C%22${refinerTokens}%5C%22%22%5D%2C%22o%22%3A%22${operator}%22%2C%22k%22%3A${useKQL}%2C%22m%22%3Anull%7D`;
  }

  _performSearch(){
      let { resourceLevels, fileTypes, topicKey, queryText, thisSite, isTopicVisible, 
            isCourseVisible, isResourceTypeVisible, isResourceLevelVisible } = this.state;
      let queryEncode = `u=https://cambridgeassessment.sharepoint.com/sites/can&k=${queryText}&ql=2057`;
      let files = '';
      let levels = '';
      let queryParms = false;
      let topicRefinerFilter = '';
      let courseRefinerFilter = '';
      let resourceTypesRefinerFilter = '';
      let resourceLevelRefinerFilter = '';
      
      if(isTopicVisible && this.state.topicKey !== '') {
          queryParms = true;
          topicRefinerFilter += this._refinementFilter('RefinableString153', topicKey, 'or', false);
      }

      /*if(isCourseVisible && this.state.courseKey !== ''){
          queryText += `%20owstaxIdCourse%3A%5C%22${this.state.courseKey}%5C%22`;
      }*/

      if(isCourseVisible && courseKey !== '') {
          queryParms = true;
          if(isTopicVisible && this.state.topicKey !== '') {
            courseRefinerFilter += `%2C`;
          }
          courseRefinerFilter += this._refinementFilter('RefinableString152', courseKey, 'or', false); // `%7B%22n%22%3A%22RefinableString152%22%2C%22t%22%3A%5B%22%5C%22${this.state.courseKey}%5C%22%22%5D%2C%22o%22%3A%22or%22%2C%22k%22%3Afalse%2C%22m%22%3Anull%7D`;
      }      

      if(isResourceLevelVisible && resourceLevels) {
          queryParms = true;
          for(let [index, value] of resourceLevels.entries()) {
                if(index > 0 && index < resourceLevels.length)
                    levels += `%5C%22%22%2C%22%5C%22`;
                levels += `${value.name}`;
        }
        if((isTopicVisible && this.state.topicKey !== '') || (isResourceTypeVisible && fileTypes)) {
            resourceLevelRefinerFilter += `%2C`;
        }
        resourceLevelRefinerFilter += this._refinementFilter('RefinableString150', levels, 'or', false); // `%7B%22n%22%3A%22RefinableString150%22%2C%22t%22%3A%5B${levels}%5D%2C%22o%22%3A%22or%22%2C%22k%22%3Afalse%2C%22m%22%3Anull%7D`; 
      }
      const EmailExt = ['eml', 'msg', 'exch'];
      const ImageExt = ['bmp', 'jpeg', 'png', 'tiff', 'gif', 'ico', 'wpd', 'odg', 'rle', 'wmf', 'dib'];
      const PDFExt = ['pdf'];
      const WordExt = ['docx', 'doc', 'docm', 'dot', 'dotx', 'nws'];
      const PowerPointExt = ['odp', 'ppt', 'pptm', 'pptx', 'potm', 'potx', 'ppam', 'ppsm', 'ppsx'];
      const ExcelExt = ['odc', 'ods', 'xls', 'xlsb', 'xlsm', 'xlsx', 'xltm', 'xltx'];
      const WebPageExt = ['HTML', 'MHTML'];

      if(isResourceTypeVisible && fileTypes.length){
          for(let [index, value] of fileTypes.entries()) {
              if(index > 0 && index < fileTypes.length )
                files += `%2C`;
            switch(value.key) {
                case 'Email':
                        files += this._getFileParams(EmailExt);
                        break;
                case 'Image':
                        files += this._getFileParams(ImageExt);
                        break;
                case 'PDF':
                        files += this._getFileParams(PDFExt);
                        break;
                case 'Word':
                        files += this._getFileParams(WordExt); 
                        break;
                case 'PowerPoint':
                        files += this._getFileParams(PowerPointExt);
                        break;
                case 'Excel':
                        files += this._getFileParams(ExcelExt); 
                        break;
                case 'Web page':
                        files += this._getFileParams(WebPageExt);
                        break;
                default:
                        break;
            }          
        }
        if(isTopicVisible && this.state.topicKey !== '') {
            resourceTypesRefinerFilter += `%2C`;
        }
        resourceTypesRefinerFilter += `%7B%22n%22%3A%22FileType%22%2C%22t%22%3A%5B${files}%5D%2C%22o%22%3A%22or%22%2C%22k%22%3Afalse%2C%22m%22%3Anull%7D`; 
      }      
      if(queryParms) {
          queryEncode += `#Default=%7B%22k%22%3A%22${queryText}%22%2C%22r%22%3A%5B${topicRefinerFilter}${courseRefinerFilter}${resourceTypesRefinerFilter}${resourceLevelRefinerFilter}%5D%2C%22l%22%3A2057%7D`;      
      }
      window.location.href = `/sites/can/_layouts/15/osssearchresults.aspx?${queryEncode}`;
    }    

   _onFilterChanged(filterText, tagList) {
    let _resourceTypeTags = [
            'Email',
            'Excel',
            'Image',
            'PDF',
            'PowerPoint',
            'Visio',
            'Web page',            
            'Word'
            ].map(item => ({ key: item, name: item }));
    return filterText ? _resourceTypeTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0).filter(item => !this._listContainsTag(item, tagList)) : [];
  }  

  _onTopicFilterChanged(filterText, tagList) {
    let { categories } = this.state;
    let _topicsTags = categories.filter(category => category.Group.toLowerCase() === 'topic').map(category => ({ key: category.MetaID, name: category.Title }));
    return filterText ? _topicsTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0).filter(item => !this._listContainsTag(item, tagList)) : [];
  }

  _onTopicItemChanged(items) {
      this.setState({
          topics: items
      });
  }
  _onResourceLevelFilterChanged(filterText, tagList) {
    let { categories } = this.state;
    let _resourceLevelTags = categories.filter(category => category.Group.toLowerCase() === 'resource level').map(category => ({ key: category.MetaID, name: category.Title }));
    return filterText ? _resourceLevelTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0).filter(item => !this._listContainsTag(item, tagList)) : [];
  }

  _listContainsTag(tag, tagList) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }

  render() {
    const linkDivStyle = {
            marginTop: '5px',
            marginLeft: '-20px'
    };

    let { isTopicVisible: topicVisible, isBespokeVisible: bespokeVisible, 
            isCourseVisible: courseVisible, isResourceLevelVisible: resourceLevelVisible, 
            isResourceTypeVisible: resourceTypeVisible} = this.state;
    
    return (
        <div>
            <form autoComplete="off" autoCorrect="off">
                <div className="ms-Grid-col ms-u-sm8 ms-u-md8 ms-u-lg8">
                    <Button 
                        description="Opens the Advanced Search Dialog" 
                        buttonType= {ButtonType.normal}
                        onClick={(ev) => {
                            ev.preventDefault();
                            // clear basic search                              
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
                        isBlocking={true}
                        isDarkOverlay={true}
                        containerClassName="ms-dialogMainOverride"
                    >
                    <TextField
                        placeholder="Search with keywords" 
                        ariaLabel="Please enter text here" 
                        required={true}
                        onChanged={this._onChangedKeyword.bind(this)} 
                    />
                    <Toggle
                        checked={topicVisible}
                        label="Select Topic"
                        onChanged={isTopicVisible => this.setState({ isTopicVisible })}
                        onText="No"
                        offText="Yes" />
                    {(() => {
                        let { isTopicVisible } = this.state;
                        if (isTopicVisible) {
                            let { categories } = this.state;
                            let _topicOptions = categories.filter(category => category.Group.toLowerCase() === 'topic').map(category => ({ key: category.MetaID, text: category.Title }));
                            return (
                                <Dropdown
                                    options={_topicOptions}
                                    onChanged={this._onchangedTopic.bind(this)}
                                />
                            );
                        }
                    })()}                                      
                    <Label>Enter Resource type/s <i>(e.g. Word, PDF)</i></Label>
                    <Toggle
                        checked={resourceTypeVisible}
                        onChanged={isResourceTypeVisible => this.setState({ isResourceTypeVisible })}
                        onText="No"
                        offText="Yes" />
                     {(() => {
                        let { isResourceTypeVisible } = this.state;
                        if (isResourceTypeVisible) {
                            return (      
                                <FocusTrapZone isClickableOutsideFocusTrap={true} forceFocusInsideTrap={false}>
                                    <TagPicker
                                        onResolveSuggestions={this._onFilterChanged.bind(this)}
                                        getTextFromItem= {(item) => { return item.name; }}
                                        onChange={(items) => {this.setState({fileTypes: items})}}
                                        pickerSuggestionsProps={
                                            {
                                                suggestionsHeaderText: 'Suggested Tags',
                                                noResultsFoundText: 'No File type Tags Found'
                                            }
                                        }
                                    />
                                </FocusTrapZone>
                            );
                        }
                     }
                     )()}
                     <Label>Enter Resource level/s <i>(e.g. Discover, Mastery)</i></Label>                    
                    <Toggle
                        checked={resourceLevelVisible}
                        onChanged={isResourceLevelVisible => this.setState({ isResourceLevelVisible })}
                        onText="No"
                        offText="Yes" />
                     {(() => {
                        let { isResourceLevelVisible } = this.state;
                        if (isResourceLevelVisible) {
                            return (      
                                 <FocusTrapZone isClickableOutsideFocusTrap={true} forceFocusInsideTrap={false}>
                                    <TagPicker
                                        onResolveSuggestions={this._onResourceLevelFilterChanged.bind(this)}
                                        getTextFromItem= {(item) => { return item.name; }}
                                        onChange={(items) => {this.setState({resourceLevels: items})}}
                                        pickerSuggestionsProps={
                                            {
                                                suggestionsHeaderText: 'Suggested Tags',
                                                noResultsFoundText: 'No File type Tags Found',
                                                loadingText: 'Loading levels..'
                                            }
                                        }
                                    />
                                </FocusTrapZone>
                            );
                        }
                     }
                     )()}
                     <Toggle
                        checked={bespokeVisible}
                        label="Select Bespoke"
                        disabled={courseVisible}
                        onChanged={isBespokeVisible => this.setState({ isBespokeVisible })}
                        onText="No"
                        offText="Yes" />
                    {(() => {
                        let { isBespokeVisible } = this.state;
                        if (isBespokeVisible) {
                            let { categories } = this.state;
                            let _bespokeOptions = categories.filter(category => category.Group.toLowerCase() === 'bespoke').map(category => ({ key: category.MetaID, text: category.Title }));
                            return (
                                <Dropdown
                                    options={_bespokeOptions}
                                    onChanged={this._onchangedBespoke.bind(this)}
                                />
                            );
                        }
                    })()}
                    <Toggle
                        checked={courseVisible}
                        label="Select Course"
                        disabled={bespokeVisible}
                        onChanged={isCourseVisible => this.setState({ isCourseVisible })}
                        onText="No"
                        offText="Yes" />
                     {(() => {
                        let { isCourseVisible } = this.state;
                        if (isCourseVisible) {
                            let { categories } = this.state;
                            let _courseOptions = categories.filter(category => category.Group.toLowerCase() === 'course').map(category => ({ key: category.MetaID, text: category.Title }));
                            return (
                                <Dropdown
                                    label="Course:"
                                    options={ _courseOptions }
                                    onChanged={this._onChangedCourse.bind(this)}
                                />
                            )
                        }
                     })()}  
                    <DialogFooter>
                        <Button buttonType={ButtonType.primary} onClick={this._performSearch.bind(this)}>Search</Button>
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
            </form>
        </div>
    );
  }
}

AdvancedSearch.propTypes = {
    categories: PropTypes.array.isRequired
};

export default AdvancedSearch;
