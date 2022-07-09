import React from 'react';
import icon from '../images/logo_vk.svg'
import JsonDropdown from '../dialogs/JsonDropdown';
import arrow_filter from '../images/drop_arrow.svg'
import arrow_filter_white from '../images/drop_arrow_white.svg'

import logo_vk_v2 from '../images/logo_vk_v2.svg'
var arrowRotate = {
    transform: 'rotate(180deg)',
    marginTop: '6px'
}
class Navbar extends React.Component {
    
	constructor(props){
		super(props)
		this.state = {
            isShowJsons : false
        }
    }
    
	toogleJsons = () => {
        this.setState({isShowJsons : !this.state.isShowJsons})
    }
	render() {
        const theme = this.props.theme
        const filtJsons = this.props.jsons.filter(json => json.isSelected)
        return (
            <div className={theme.header}>
                <img className="logo" src={this.props.theme.currentTheme == "mono" ? "" : this.props.theme.currentTheme == "dark" ? logo_vk_v2 : icon}/>
                <div className="just_cont">
                        <p className={theme.inbox_title}>Входящие</p>
                        <div onClick={this.toogleJsons} className="button_choose_app choose_type new_border new_border_hover">
                            <div className="just_content">
                                <p className={this.props.theme.button_choose_text}>{filtJsons[0].text}</p>
                                <img style={this.state.isShowTypes ? arrowRotate : {}} className="choose_drop_arrow" src={this.props.theme.currentTheme == "mono" || this.props.theme.currentTheme == "dark" ? arrow_filter_white : arrow_filter}/>
                            </div>
                        </div>
                        {this.state.isShowJsons && <JsonDropdown theme={this.props.theme} onCloseFilters={this.toogleJsons} jsons={this.props.jsons} changeJson={this.props.changeJson}/>}
                </div>
                
            </div>
	    )
	}
  }
  export default Navbar;