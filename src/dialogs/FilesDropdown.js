import React from 'react';
import check_blue from '../images/check_blue.svg'
class FilesDropdown extends React.Component {
    constructor(props){
        super(props)
    }
    onFilePicked = (file, index) => {
        
        this.props.onCloseFilters()
    }
    onCloseFilters = () => {
        console.log("onClose")
        if (this.props.onCloseFilters){
            this.props.onCloseFilters()
        }
        
    }
    downloadFile = () => {
        var a = document.createElement("a"); //Create <a>
        a.href = this.props.file.preview; //Image Base64 Goes here
        a.download = this.props.file.filePath; //File name Here
        a.click()
    }
    render(){
            return (
            
                    <div style={{width : 'auto', top : '-40px', right : '160px', padding : '0'}} className={this.props.theme.apps_dropdown + " filter_dropdown choose_type_dropdown"}>
                        <div onClick={this.onCloseFilters} className="tooltip_bg"></div>
                        {/* {this.props.files.map((type, index) => (
                            <div onClick={() => this.onFilePicked(type, index)} className="flex apps_line" type={type} key={index}>
                                <p className="apps_drop_text choose_type_text">{type.text}</p>
                            </div>   
                        ))} */}
                         {/* <a download={this.props.file.filePath} href={this.props.file.preview}>Download</a> */}
                        <img style={{zIndex : '99'}} onClick={this.downloadFile} className="hover" src={this.props.file.preview}/>
                    </div>
             
            ); 
    }
}
export default FilesDropdown;
