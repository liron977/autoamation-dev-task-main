var THEME_COMPONENTS=function(e,t,l,r,n){"use strict";const a=new r.ViewHelpers;return e.LoggedIn=()=>l.createElement(t.Box,{mr:"lg"}),e.SidebarFooter=()=>{const e=n.useSelector((e=>e.session)),{title:o,email:i,avatarUrl:c}=e,{tb:m}=r.useTranslation();return e?l.createElement(t.Box,{mt:"lg",mb:"md"},l.createElement(t.Box,{flex:!0,flexDirection:"row",alignItems:"center",px:"xl",mb:"lg"},l.createElement(t.Avatar,{src:c,alt:i,mr:"lg"},i.slice(0,1).toUpperCase()),l.createElement(t.Tooltip,{direction:"right",title:m("logout")},l.createElement(t.Box,{as:"a",href:a.logoutUrl()},l.createElement(t.Title,null,i),o&&l.createElement(t.SmallText,null,o))))):null},e}({},AdminJSDesignSystem,React,AdminJS,ReactRedux);