import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css'
import {
  BrowserRouter as Router, Switch,
  Route
} from "react-router-dom";
import Navbar from './panels/Navbar';
import Inbox from './pages/Inbox';
import { ThemeHelper } from './utils/ThemeHelper';
import { getJsonsList, getThemeIndex } from './utils/Utils';

class Application extends React.Component {
   
  constructor(){
      super()
      var theme = this.getThemeByIndex(getThemeIndex())
      this.state = {
          activeView : 'auth',
          theme : theme,
          jsons : getJsonsList(),
          jsonType : 'getSmall'
      }
     
  }
  changeJson = (index) => {
    const jsons = getJsonsList()
    jsons[0].isSelected = false
    jsons[index].isSelected = true
    this.setState({jsons : jsons, jsonType : this.getJsonType(index)})
  }
  openView = (view) => {
    this.setState({activeView : view})
  }
  getJsonType = (index) => {
    if (index == 0){
      return 'getSmall'
    } else if (index == 1){
      return 'getMedium'
    } else {
      return 'getLarge'
    }
  } 
  componentDidMount(){
   
  }
  changeTheme = (index) => {
    this.setState({theme : this.getThemeByIndex(index)})
  }
  getThemeByIndex = (index) => {
    if (index == 0) {
      return new ThemeHelper('light')
    } else if (index == 1){
      return new ThemeHelper('dark')
    } else if (index == 2){
      return new ThemeHelper('mono')
    } else if (index == 3){
      return new ThemeHelper('doggy')
    } else if (index == 4){
      return new ThemeHelper('lis')
    }
  }
  getBGStyle = () => {
    if (this.state.theme.currentTheme == 'doggy'){
      return {backgroundImage: 'url(https://img.imgsmail.ru/pkgs/themes.outsource/1.15.0/t2068/images/bg/vk_all/1680x1050.jpg),url(https://img.imgsmail.ru/pkgs/themes.outsource/1.15.0/t2068/images/bg/vk_all/1920x1200.jpg)',
      backgroundSize: '1680px 1050px'}
    } else if (this.state.theme.currentTheme == 'lis'){
      return {backgroundImage: 'url(https://img.imgsmail.ru/pkgs/themes.outsource/1.15.0/t2061/images/bg/vk_all/1680x1050.jpg),url(https://img.imgsmail.ru/pkgs/themes.outsource/1.15.0/t2061/images/bg/vk_all/1680x1050.jpg)',
      backgroundSize: '1680px 1050px'}
    } else {
      return {}
    }
  }
  render() {
      return (
          <Router>
            <div style={this.getBGStyle()} className="app">
              <Navbar changeJson={this.changeJson} jsons={this.state.jsons} theme={this.state.theme}/>
              <Inbox  changeTheme={this.changeTheme} jsonType={this.state.jsonType} theme={this.state.theme}/>
            </div>
          </Router>
          
      );
  }
}
ReactDOM.render(<Application/>, document.getElementById('root'));
