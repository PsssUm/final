import React from 'react';
import { getHttpParams, getRequestUrl, getOpenedMails, addOpenedMails, removeOpenedMails, getFilters, getInboxFilter, getThemes, saveThemeIndex } from '../utils/Utils';
import InboxItem from '../items/InboxItem';
import JsonDropdown from '../dialogs/JsonDropdown';
import arrow_filter from '../images/drop_arrow.svg'
import arrow_filter_white from '../images/drop_arrow_white.svg'

var arrowRotate = {
    transform: 'rotate(180deg)',
    marginTop: '6px'
}
class Inbox extends React.Component {
    
	constructor(props){
        super(props)
        this.state = {
            inboxFull : [],
            inbox : [],
            isShowDotsDropdown : false,
            isShowFilters : false,
            isShowThemes : false,
            filters : getFilters(),
            filterIndex : 0,
            themes : getThemes(),
        }
        this.offset = 0
		this.getInbox("getSmall")
    }
    componentDidUpdate(prevProps){
        if (this.props != prevProps){
            this.offset = 0
            this.getInbox(this.props.jsonType)
        }
    }
	getInbox = (method) => {
        var params = {
            offset : this.offset,
            count : 20
        }
        console.log("params = " + JSON.stringify(params))
        fetch(getRequestUrl() + method, getHttpParams(params)).then((response) => response.json())
        .then((responseData) => {
            console.log("getInbox count = " + responseData.length)
            
            if (responseData && responseData.length > 0){
                const openedMails = getOpenedMails()
                if (openedMails != null && openedMails != undefined && openedMails.length > 0){
                    responseData.forEach(element => {
                        const foundMail = openedMails.filter(inb => inb.author.name == element.author.name && inb.dateTime == element.dateTime && inb.text == element.text && inb.title == element.title)
                        if (foundMail.length > 0){
                            element.isOpened = true
                        }
                    });
                }
                this.offset += 20
                this.setState({inbox : this.state.filterIndex != 0 ? responseData.filter(inb => getInboxFilter(inb, this.state.filterIndex)) : responseData, inboxFull : responseData})
            }
        })
    }
    setAllReaded = () => {
        fetch(getRequestUrl() + this.props.jsonType, getHttpParams()).then((response) => response.json())
        .then((responseData) => {
            if (responseData){
                const inboxes = this.state.inbox
                inboxes.forEach(element => {
                    element.isOpened = true
                });
                this.setState({inbox : inboxes, inboxFull : inboxes})
                addOpenedMails(responseData)
            }
        })
    }
    selectAll = (selectedCount) => {
        const inboxes = this.state.inbox
        if (selectedCount == this.state.inbox.length){
            inboxes.forEach(element => {
                element.isSelected = false
            });
        } else {
            inboxes.forEach(element => {
                element.isSelected = true
            });
        }
        this.setState({inbox : inboxes})
    }
    onDotsDropDown = (index) => {
        const inboxes = this.state.inbox
        const selectedInbox = this.state.inbox.filter(inb => inb.isSelected)
        inboxes.forEach(element => {
            const foundMail = selectedInbox.filter(inb => inb.author.name == element.author.name && inb.dateTime == element.dateTime && inb.text == element.text && inb.title == element.title)
            if (foundMail.length > 0){
                if (index == 0){
                    element.isOpened = false
                } else {
                    element.isOpened = true
                }
            }
        });
        if (index == 0){
            removeOpenedMails(selectedInbox)
        } else {
            addOpenedMails(selectedInbox)
        }
        
        this.selectAll(this.state.inbox.length)
    }
    toggleDots = () => {
        this.setState({isShowDotsDropdown : !this.state.isShowDotsDropdown})
    }
    toggleFilters = () => {
        this.setState({isShowFilters : !this.state.isShowFilters})
    }
    onItemSelect = (index) => {
        const inboxes = this.state.inbox
        inboxes[index].isSelected = !inboxes[index].isSelected
        this.setState({inbox : inboxes})
    }
    filterPicked = (index) => {
        const filtered = this.state.inboxFull.filter(inb => getInboxFilter(inb, index))
        const filters = getFilters()
        filters[0].isSelected = false
        filters[index].isSelected = true
        this.setState({inbox : filtered, filters : filters, filterIndex : index})
    }
    toggleThemes = () => {
        this.setState({isShowThemes : !this.state.isShowThemes})
    }
    themePicked = (index) => {
        saveThemeIndex(index)
        const themes = getThemes()
        themes[0].isSelected = false
        themes[index].isSelected = true
        this.setState({themes : themes})
        this.props.changeTheme(index)
        
    }
    onBack = () => {
        this.offset -= 40
        console.log("onBack this.offset = " + this.offset)
        this.getInbox(this.props.jsonType)
    }
    onNext = () => {
        console.log("onNext this.offset = " + this.offset)
        this.getInbox(this.props.jsonType)
    }
	render() {
        const theme = this.props.theme
        const selectedInbox = this.state.inbox.filter(inb => inb.isSelected)
        const filters = this.state.filters.filter(inb => inb.isSelected)
        const themes = this.state.themes.filter(inb => inb.isSelected)
        return (
            <div className={theme.inbox}>
                <div className="just_content">
                    <div className="relative">
                        <div onClick={this.toggleFilters} className={"button_choose_app choose_type new_border new_border_hover " + this.props.theme.filters_bg}>
                            <div className="just_content">
                                <p className={this.props.theme.button_choose_text}>{filters[0].text}</p>
                                <img style={this.state.isShowTypes ? arrowRotate : {}} className="choose_drop_arrow" src={this.props.theme.currentTheme == "mono" || this.props.theme.currentTheme == "dark" ? arrow_filter_white : arrow_filter}/>
                            </div>
                        </div>
                        {this.state.isShowFilters && <JsonDropdown theme={this.props.theme} style={{left : '6px', top : '12px', right : 'auto'}} onCloseFilters={this.toggleFilters} jsons={this.state.filters} changeJson={this.filterPicked}/>}
                    </div>

                    <div className="relative">
                        <div style={{marginRight : '0'}} onClick={this.toggleThemes} className={"button_choose_app choose_type new_border new_border_hover "  + this.props.theme.filters_bg}>
                            <div className="just_content">
                                <p className={this.props.theme.button_choose_text}>{themes[0].text}</p>
                                <img style={this.state.isShowThemes ? arrowRotate : {}} className="choose_drop_arrow" src={this.props.theme.currentTheme == "mono" || this.props.theme.currentTheme == "dark" ? arrow_filter_white : arrow_filter}/>
                            </div>
                        </div>
                        {this.state.isShowThemes && <JsonDropdown theme={this.props.theme}  style={{left : '6px', top : '12px', right : 'auto'}} onCloseFilters={this.toggleThemes} jsons={this.state.themes} changeJson={this.themePicked}/>}
                    </div>
                </div>
                

                {this.state.inbox.length > 0 && <div className={this.props.theme.inboxes_container}>
                     {this.state.inbox.map((item, index) => (
                         <div key={index}>
                            <InboxItem onItemSelect={this.onItemSelect} theme={this.props.theme} index={index} item={item} key={index}/>
                            {index < this.state.inbox.length-1 && <div style={item.isOpened ? {marginLeft : '0'} : {}} className={this.props.theme.line}></div>}
                        </div>
                    ))}
                </div>}
                <div className="select_all_cont">
                    <div onClick={() => this.selectAll(selectedInbox.length)} className="flex hover">
                        <svg className={this.props.theme.select_all_img} width="20" height="20" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 10c0 3.866-3.134 7-7 7-3.86599 0-7-3.134-7-7 0-3.86599 3.13401-7 7-7 3.866 0 7 3.13401 7 7zm1.5 0c0 4.6944-3.8056 8.5-8.5 8.5-4.69442 0-8.5-3.8056-8.5-8.5 0-4.69442 3.80558-8.5 8.5-8.5 4.6944 0 8.5 3.80558 8.5 8.5zm-5.1843-1.18431c.3124-.31242.3124-.81896 0-1.13138-.3124-.31241-.819-.31241-1.1314 0L9 10.8686 7.81569 9.68431c-.31242-.31242-.81896-.31242-1.13138 0-.31241.31242-.31241.81899 0 1.13139l1.75 1.75c.31242.3124.81896.3124 1.13138 0l3.75001-3.75001z"></path></svg>
                        <p className={this.props.theme.select_all_text}>{selectedInbox.length == 0 ? "Выделить все" : selectedInbox.length == this.state.inbox.length ? selectedInbox.length + " Снять выделение" : selectedInbox.length + " Выделить все"}</p>
                    </div>
                    {selectedInbox.length > 0 && <div onClick={this.toggleDots} className="dots">
                        <svg className={this.props.theme.select_all_img + " select_all_img_d"} width="20" height="20" viewBox="0 0 20 20"><path d="M15 8.5c.8284 0 1.5.67157 1.5 1.5 0 .8284-.6716 1.5-1.5 1.5s-1.5-.6716-1.5-1.5c0-.82843.6716-1.5 1.5-1.5zm-5 0c.8284 0 1.5.67157 1.5 1.5 0 .8284-.6716 1.5-1.5 1.5-.82843 0-1.5-.6716-1.5-1.5 0-.82843.67157-1.5 1.5-1.5zm-5 0c.82843 0 1.5.67157 1.5 1.5 0 .8284-.67157 1.5-1.5 1.5s-1.5-.6716-1.5-1.5c0-.82843.67157-1.5 1.5-1.5z"></path></svg>
                        {this.state.isShowDotsDropdown && <JsonDropdown theme={this.props.theme}  style={{top : '-10px', right : '0'}} onCloseFilters={this.toggleDots} jsons={[{text : "Пометить непрочитанными"}, {text : "Пометить прочитанными"}]} changeJson={this.onDotsDropDown}/>}
                    </div>}
                    <div onClick={this.setAllReaded} className="flex hover ml_16">
                        <svg className={this.props.theme.select_all_img} width="20" height="20" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M10 6.8002c-1.7673 0-3.19999 1.43268-3.19999 3.2 0 1.7673 1.43269 3.2 3.19999 3.2s3.2-1.4327 3.2-3.2c0-1.76732-1.4327-3.2-3.2-3.2zm-4.79999 3.2c0-2.65097 2.14904-4.8 4.79999-4.8 2.651 0 4.8 2.14903 4.8 4.8 0 2.651-2.149 4.8-4.8 4.8-2.65095 0-4.79999-2.149-4.79999-4.8z"></path></svg>
                        <p className={this.props.theme.select_all_text}>Отметить все прочитанными</p>
                    </div>
                    
                </div>
                <div className="just_end">
                    <div></div>
                    <div className="arrows_cont">
                        <div onClick={this.onBack} className={this.props.theme.arrows_bg}>
                            <svg className={this.props.theme.select_all_img} width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z" />
                            </svg>
                        </div> 
                        <div onClick={this.onNext} className={this.props.theme.arrows_bg}>
                            <svg className={this.props.theme.select_all_img} width="24" height="24" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z" />
                            </svg>
                        </div> 
                    </div>
                </div>
                
            </div>
	    )
	}
  }
  export default Inbox;