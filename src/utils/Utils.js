import qs from 'querystring'

export function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? undefined : decodeURIComponent(sParameterName[1]);
        }
    }
};

export const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = window.document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  };
export const setCookie = (name,value) => {
    var expires = "";
    var days = 9999
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    window.document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
export const getHttpParams = (params) => {
    var httpParams = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body: qs.stringify(params)
    }
    return httpParams;
};
export const getRequestUrl = () => {
    return "https://tik2top.com/api/";
};
export const getJsonsList = () => {
    return [{text : "Маленький JSON", isSelected : true}, {text : "Средний JSON", isSelected : false}, {text : "Большой JSON", isSelected : false}];
};
export const getFilters = () => {
    return [{text : "Все входящие", isSelected : true}, {text : "Важные", isSelected : false}, {text : "Финансовые", isSelected : false}, {text : "Конфиденциальные", isSelected : false}, {text : "С файлами", isSelected : false}];
};
export const addOpenedMails = (mails) => {
   
    var savedMails = getOpenedMails()
    if (savedMails == null || savedMails == undefined){
        savedMails = []
    }
    mails.forEach(mail => {
        savedMails.push(mail)
    });
    
    localStorage.setItem('openedArray', JSON.stringify(mails));
};
export const saveThemeIndex = (index) => {
    localStorage.setItem('themeIndex', index);
}
export const getThemeIndex = (index) => {
    var index = localStorage.getItem('themeIndex')
    if (index == null || index == undefined){
        index = 0
    } else {
        index = parseInt(index)
    }
    return index
}
export const removeOpenedMails = (mails) => {
   
    var savedMails = getOpenedMails()
    if (savedMails == null || savedMails == undefined){
        savedMails = []
    }
    mails.forEach(mail => {
        for (let index = 0; index < savedMails.length; index++) {
            const element = savedMails[index];
            if (mail.author.name == element.author.name && mail.dateTime == element.dateTime && mail.text == element.text && mail.title == element.title){
                savedMails.splice(index, 1)
            }
        }
    });
    
    
    
    localStorage.setItem('openedArray', JSON.stringify(savedMails));
};
export const getOpenedMails = () => {
    return JSON.parse(localStorage.getItem('openedArray'))
};
export const getThemes = () => {
    var themes = [{text : "Светлая тема", isSelected : true}, {text : "Темная тема", isSelected : false}, {text : "Монохромная тема", isSelected : false}, {text : "Doggy diggy dog", isSelected : false}, {text : "Smart lis", isSelected : false}];
    const index = getThemeIndex()
    if (index != 0){
        themes[0].isSelected = false
        themes[index].isSelected = true
    }
    return themes
};
export const getInboxFilter = (mail, index) => {
    if (index == 0) {
        return true
    } else if (index == 1){
        return mail.important
    } else if (index == 2){
        return mail.finance
    } else if (index == 3){
        return mail.confidence
    } else if (index == 4){
        return mail.file != undefined
    }
};
