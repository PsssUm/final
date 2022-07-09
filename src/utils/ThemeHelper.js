export const getCookie = (name) => {

}
export class ThemeHelper {
    static header = "header header_light"
    static inbox = "inbox inbox_light"
    static inbox_title = "inbox_title"
    static inbox_item = "inbox_item"
    static line = "line"
    static currentTheme = "light"
    static inboxes_container = ""
    static select_all_text = ""
    static inbox_name = ""
    static inbox_item_title = ""
    static inbox_text = ""
    static button_choose_text = ""
    static filters_bg = ""
    static apps_dropdown = ""
    static apps_line = ""
    static apps_drop_text = ""
    static select_all_img = ""
    static dot = ""
    static arrows_bg = ""
    constructor(theme) {
        this.currentTheme = theme
      switch (theme) {
            case "light":
                this.header = "header header_light"
                this.inbox = "inbox inbox_light"
                this.inbox_title = "inbox_title"
                this.inbox_item = "inbox_item"
                this.line = "line"
                this.inboxes_container = "inboxes_container"
                this.select_all_text = "select_all_text"
                this.inbox_name = "inbox_name"
                this.inbox_item_title = "inbox_item_title"
                this.inbox_text = "inbox_item_title"
                this.button_choose_text = "button_choose_text"
                this.filters_bg = "filters_bg"
                this.apps_dropdown = "apps_dropdown"
                this.apps_line = "apps_line"
                this.apps_drop_text = "apps_drop_text"
                this.select_all_img = "select_all_img"
                this.dot = "dot"
                this.arrows_bg = "arrows_bg"
                break;
            case "dark":
                this.header = "header header_dark"
                this.inbox = "inbox inbox_dark"
                this.inbox_title = "inbox_title inbox_title_dark"
                this.inbox_item = "inbox_item header_dark"
                this.line = "line line_dark"
                this.inboxes_container = "inboxes_container header_dark inboxes_container_dark"
                this.select_all_text = "select_all_text text_dark"
                this.inbox_name = "inbox_name text_dark"
                this.inbox_item_title = "inbox_item_title text_dark"
                this.inbox_text = "inbox_text text_dark"
                this.button_choose_text = "button_choose_text text_dark"
                this.filters_bg = "filters_bg filters_bg_dark"
                this.apps_dropdown = "apps_dropdown apps_dropdown_dark"
                this.apps_line = "apps_line_dark"
                this.apps_drop_text = "apps_drop_text apps_drop_text_dark"
                this.select_all_img = "select_all_img"
                this.dot = "dot"
                this.arrows_bg = "arrows_bg"
                break;
            case "mono":
                this.header = "header header_dark"
                this.inbox = "inbox inbox_dark"
                this.inbox_title = "inbox_title inbox_title_dark"
                this.inbox_item = "inbox_item header_dark"
                this.line = "line line_dark"
                this.inboxes_container = "inboxes_container header_dark inboxes_container_dark"
                this.select_all_text = "select_all_text text_dark"
                this.inbox_name = "inbox_name text_dark"
                this.inbox_item_title = "inbox_item_title text_dark"
                this.inbox_text = "inbox_text text_dark"
                this.button_choose_text = "button_choose_text text_dark"
                this.filters_bg = "filters_bg filters_bg_dark"
                this.apps_dropdown = "apps_dropdown apps_dropdown_dark"
                this.apps_line = "apps_line_dark"
                this.apps_drop_text = "apps_drop_text apps_drop_text_dark"
                this.select_all_img = "select_all_img select_all_img_mono"
                this.dot = "dot dot_mono"
                this.arrows_bg = "arrows_bg_mono"
                break;

                case "doggy":
                this.header = "header header_light"
                this.inbox = "inbox inbox_doggy"
                this.inbox_title = "inbox_title"
                this.inbox_item = "inbox_item"
                this.line = "line"
                this.inboxes_container = "inboxes_container"
                this.select_all_text = "select_all_text"
                this.inbox_name = "inbox_name"
                this.inbox_item_title = "inbox_item_title"
                this.inbox_text = "inbox_item_title"
                this.button_choose_text = "button_choose_text"
                this.filters_bg = "filters_bg"
                this.apps_dropdown = "apps_dropdown"
                this.apps_line = "apps_line"
                this.apps_drop_text = "apps_drop_text"
                this.select_all_img = "select_all_img"
                this.dot = "dot"
                this.arrows_bg = "arrows_bg"
                break;

                case "lis":
                this.header = "header header_light"
                this.inbox = "inbox inbox_doggy"
                this.inbox_title = "inbox_title"
                this.inbox_item = "inbox_item"
                this.line = "line"
                this.inboxes_container = "inboxes_container"
                this.select_all_text = "select_all_text"
                this.inbox_name = "inbox_name"
                this.inbox_item_title = "inbox_item_title"
                this.inbox_text = "inbox_item_title"
                this.button_choose_text = "button_choose_text"
                this.filters_bg = "filters_bg"
                this.apps_dropdown = "apps_dropdown"
                this.apps_line = "apps_line"
                this.apps_drop_text = "apps_drop_text"
                this.select_all_img = "select_all_img"
                this.dot = "dot"
                this.arrows_bg = "arrows_bg"
                break;
          default:
              break;
      }
    }
}