import React from 'react';
import check_blue from '../images/check_blue.svg'
import check_white from '../images/check_white.svg'
class JsonDropdown extends React.Component {
    constructor(props){
        super(props)
    }
    onJsonPicked = (type, index) => {
        this.props.changeJson(index)
        this.props.onCloseFilters()
    }
    onCloseFilters = () => {
        console.log("onClose")
        if (this.props.onCloseFilters){
            this.props.onCloseFilters()
        }
        
    }
    render(){
      
            return (
            
                    <div style={this.props.style} className={this.props.theme.apps_dropdown + " filter_dropdown choose_type_dropdown"}>
                        <div onClick={this.onCloseFilters} className="tooltip_bg"></div>
                        {this.props.jsons.map((type, index) => (
                            <div style={type.isSelected ? {background: this.props.theme.currentTheme == "dark" || this.props.theme.currentTheme == "mono" ? 'rgba(237, 238, 240, 0.7)' : '#EAF4FA'} : {}} onClick={() => this.onJsonPicked(type, index)} className={"flex " + this.props.theme.apps_line} type={type} key={index}>
                                <p className={this.props.theme.apps_drop_text + " choose_type_text"}>{type.text}</p>
                                <img style={type.isSelected ? {display : 'block'} : {display : 'none'}} src={this.props.theme.currentTheme == "mono" ? check_white : check_blue}/>
                            </div>   
                        ))}
                        
                    </div>
             
            ); 
        
        
    }
}
export default JsonDropdown;
