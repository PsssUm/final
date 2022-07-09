import React from 'react';
import circle from '../images/circle.png'
import selected from '../images/selected.svg'
import selected_mono from '../images/selected_mono.svg'
import circle_select_mono from '../images/circle_select_mono.svg'
import circle_select from '../images/circle_select.svg'
import FilesDropdown from '../dialogs/FilesDropdown';
class InboxItem extends React.Component {
    
	constructor(props){
		super(props)
		this.state = {
            isShowFiles : false
        }
    }
    onSelect = () => {
        console.log("onItemSelect this.props.index = " + this.props.index)
        this.props.onItemSelect(this.props.index)
    }
	toggleFiles = () => {
        this.setState({isShowFiles : !this.state.isShowFiles})
    }
   
	render() {
        const theme = this.props.theme
        const isOpened = this.props.item.isOpened
        return (
            <div className={theme.inbox_item}>
                {!isOpened && <div className={this.props.theme.dot} src={circle}/>}
                <img onClick={this.onSelect} className="hover circle_select" src={this.props.item.isSelected ? this.props.theme.currentTheme == "mono" ? selected_mono : selected : this.props.theme.currentTheme == "mono" ? circle_select_mono : circle_select}/>
                <p className={isOpened ? this.props.theme.inbox_name : this.props.theme.inbox_name + " inbox_name_not_opened"}>{this.props.item.author.name}</p>
                <p className={isOpened ? this.props.theme.inbox_item_title : this.props.theme.inbox_item_title + " inbox_name_not_opened"}>{this.props.item.title}</p>
                <div className="just_cont">
                    <p className={this.props.theme.inbox_text}>{this.props.item.text}</p>
                    <div className="time_container">
                        {this.props.item.file && <div onClick={this.toggleFiles} className="file_bg"> <svg style={{margin : '6px 0 0 6px', fill : this.props.theme.currentTheme == "dark" ||  this.props.theme.currentTheme == "mono" ? "white" : "black"}} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="base-0-2-1" ie-style=""><path fill-rule="evenodd" clip-rule="evenodd" d="M14.9502 3.80108c-1.0653-1.06811-2.7917-1.06811-3.857 0L5.55919 9.34953c-1.74559 1.75017-1.74559 4.58847 0 6.33867 1.7445 1.7491 4.57211 1.7491 6.31661 0l.0025-.0026 2.8799-2.8595c.294-.2918.7688-.2901 1.0607.0038.2918.2939.2901.7688-.0038 1.0606l-2.8773 2.857-.0013.0013c-2.3307 2.3354-6.1092 2.3349-8.43936-.0013-2.32952-2.3356-2.32952-6.1216 0-8.45724l5.53396-5.54845c1.6514-1.65575 4.3297-1.65575 5.9811 0 1.6504 1.65465 1.6504 4.33657 0 5.99123l-5.5339 5.54846c-.97226.9748-2.54938.9748-3.52161 0-.97116-.9737-.97116-2.5516 0-3.5253l.00239-.0024 3.10232-3.08243c.2939-.29195.7688-.29042 1.0607.00341.292.29383.2904.7687-.0034 1.06065L8.01873 11.8155l-.00102.001c-.38619.3883-.38586 1.0178.00102 1.4057.38613.3872 1.01137.3872 1.3975 0l5.53397-5.54844c1.0664-1.06918 1.0664-2.80349 0-3.87268z"></path></svg></div>}
                        <p style={{minWidth : '70px', textAlign : 'end'}} className={this.props.theme.inbox_text}>{this.props.item.dateTime}</p>
                    </div>
                    
                </div>
                {this.state.isShowFiles && <FilesDropdown theme={this.props.theme}  onCloseFilters={this.toggleFiles} file={this.props.item.file}/>}
            </div>
	    )
	}
  }
  export default InboxItem;