(this["webpackJsonptodo-list-frontend"]=this["webpackJsonptodo-list-frontend"]||[]).push([[0],{51:function(e,t,n){},70:function(e,t,n){},85:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),i=n(24),c=n.n(i),o=(n(51),n(23)),r=n(15),d=n(16),l=n(9),u=n(18),h=n(17),j=n(26),g=n(7),b=n(10),O=n.n(b),p=(n(70),n(89)),f=n(90),x=n(91),m=n(92),v=n(93),L=n(94),k=n(21),S=n(86),I=n(87),_=n(88),C=n(2),y=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={email:"",password:"",password_confirmation:"",registrationErrors:""},a.handleSubmit=a.handleSubmit.bind(Object(l.a)(a)),a.handleChange=a.handleChange.bind(Object(l.a)(a)),a}return Object(d.a)(n,[{key:"handleChange",value:function(e){this.setState(Object(k.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){var t=this,n=this.state,a=n.email,s=n.password,i=n.password_confirmation;O.a.post("https://todo-list-rails-api.herokuapp.com/registrations",{user:{email:a,password:s,password_confirmation:i}},{withCredentials:!0}).then((function(e){"created"===e.data.status&&t.props.handleSuccessfulAuth(e.data)})).catch((function(e){console.log("Registration Error: ",e)})),e.preventDefault()}},{key:"render",value:function(){return Object(C.jsx)("div",{children:Object(C.jsxs)(S.a,{onSubmit:this.handleSubmit,children:[Object(C.jsx)(I.a,{children:Object(C.jsx)(_.a,{type:"email",name:"email",placeholder:"Email",value:this.state.email,onChange:this.handleChange,required:!0})}),Object(C.jsx)(I.a,{children:Object(C.jsx)(_.a,{type:"password",name:"password",placeholder:"Password",value:this.state.password,onChange:this.handleChange,required:!0})}),Object(C.jsx)(I.a,{children:Object(C.jsx)(_.a,{type:"password",name:"password_confirmation",placeholder:"Password confirmation",value:this.state.password_confirmation,onChange:this.handleChange,required:!0})}),Object(C.jsx)(p.a,{color:"primary",type:"submit",children:"Register"})]})})}}]),n}(a.Component),w=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={email:"",password:"",loginErrors:""},a.handleSubmit=a.handleSubmit.bind(Object(l.a)(a)),a.handleChange=a.handleChange.bind(Object(l.a)(a)),a}return Object(d.a)(n,[{key:"handleChange",value:function(e){this.setState(Object(k.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){var t=this,n=this.state,a=n.email,s=n.password;O.a.post("https://todo-list-rails-api.herokuapp.com/sessions",{user:{email:a,password:s}},{withCredentials:!0}).then((function(e){e.data.logged_in?t.props.handleSuccessfulAuth(e.data):alert("User does not exist. Please Register first.")})).catch((function(e){console.log("Login Error: ",e)})),e.preventDefault()}},{key:"render",value:function(){return Object(C.jsx)("div",{children:Object(C.jsxs)(S.a,{onSubmit:this.handleSubmit,children:[Object(C.jsx)(I.a,{children:Object(C.jsx)(_.a,{type:"email",name:"email",placeholder:"Email",value:this.state.email,onChange:this.handleChange,required:!0})}),Object(C.jsx)(I.a,{children:Object(C.jsx)(_.a,{type:"password",name:"password",placeholder:"Password",value:this.state.password,onChange:this.handleChange,required:!0})}),Object(C.jsx)(p.a,{type:"submit",children:"Login"})]})})}}]),n}(a.Component),E=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).handleSuccessfulAuth=a.handleSuccessfulAuth.bind(Object(l.a)(a)),a.handleLogoutClick=a.handleLogoutClick.bind(Object(l.a)(a)),a}return Object(d.a)(n,[{key:"handleSuccessfulAuth",value:function(e){this.props.handleLogin(e),this.props.history.push("/dashboard")}},{key:"handleLogoutClick",value:function(){var e=this;O.a.delete("http://localhost:3001/logout",{withCredentials:!0}).then((function(t){e.props.handleLogout()})).catch((function(e){console.log("Logout Error",e)}))}},{key:"render",value:function(){var e=this;return Object(C.jsx)("div",{children:"LOGGED_IN"===this.props.loggedInStatus?Object(C.jsx)(p.a,{color:"danger",onClick:function(){return e.handleLogoutClick()},children:"Logout"}):Object(C.jsx)(f.a,{children:Object(C.jsxs)(x.a,{xs:"5",children:[Object(C.jsx)(m.a,{sm:"6",children:Object(C.jsxs)(v.a,{children:[Object(C.jsx)(L.a,{tag:"h5",children:"Registration"}),Object(C.jsx)(y,{handleSuccessfulAuth:this.handleSuccessfulAuth})]})}),Object(C.jsx)(m.a,{sm:"6",children:Object(C.jsxs)(v.a,{children:[Object(C.jsx)(L.a,{tag:"h5",children:"Login"}),Object(C.jsx)(w,{handleSuccessfulAuth:this.handleSuccessfulAuth})]})})]})})})}}]),n}(a.Component),N=n(95),G=n(96),D=n(97),T=n(98),A=n(99),H=function(e){return Object(C.jsx)("div",{children:Object(C.jsxs)(N.a,{color:"light",light:!0,expand:"md",children:[Object(C.jsx)(G.a,{href:"/",children:"To-do List"}),Object(C.jsxs)(D.a,{className:"mr-auto",navbar:!0,children:[e.isLoggedIn?Object(C.jsx)(T.a,{children:Object(C.jsx)(A.a,{href:"/dashboard",children:"Dashboard"})}):null,Object(C.jsx)(T.a,{children:Object(C.jsx)(A.a,{target:"_blank",href:"https://github.com/kishan-aghera/todo-list-frontend",children:"Frontend React App Github"})}),Object(C.jsx)(T.a,{children:Object(C.jsx)(A.a,{target:"_blank",href:"https://github.com/kishan-aghera/todo-list-backend",children:"Backend Rails API Github"})})]})]})})},F=n(32),P=n(19),R=n(101),q=function(){return Object(C.jsx)(f.a,{children:Object(C.jsxs)(R.a,{color:"danger",children:["Please Login and then you can use this feature.",Object(C.jsx)("br",{}),"You can get Login or Register by visiting the following link.",Object(C.jsx)("br",{}),Object(C.jsx)(j.b,{to:"/",children:"Home"})]})})},B=function(e){var t=Object(a.useState)(""),n=Object(P.a)(t,2),s=n[0],i=n[1];return Object(a.useEffect)((function(){i(e.existingName)}),[e.existingName]),Object(C.jsx)(a.Fragment,{children:e.isLoggedIn&&e.user_id?Object(C.jsxs)("form",{onSubmit:e.isEdit?function(t){t.preventDefault(),e.updateTaskHandler(s),i("")}:function(t){t.preventDefault(),e.addNewTaskHandler(s),i("")},children:[Object(C.jsx)("input",{type:"text",value:s,placeholder:"Task Name",onChange:function(e){i(e.target.value)},required:!0}),Object(C.jsx)(p.a,{color:"info",type:"submit",children:e.isEdit?"Update Task":"Add Task"})]}):Object(C.jsx)(q,{})})},U=n(100);function J(e){var t={padding:"7px",margin:"7px 0"};return Object(C.jsx)(f.a,{children:Object(C.jsx)(v.a,{children:Object(C.jsxs)(x.a,{children:[Object(C.jsx)(m.a,{xs:"6",children:Object(C.jsx)(U.a,{tag:"h5",style:t,children:e.name})}),Object(C.jsx)(m.a,{children:Object(C.jsx)(p.a,{color:"secondary",style:t,onClick:function(){return e.updateHandler(e.id,e.name,e.user_id,e.i)},children:"Update"})}),Object(C.jsx)(m.a,{children:Object(C.jsx)(p.a,{color:"danger",style:t,onClick:function(){return e.deleteHandler(e.id,e.i)},children:"Delete"})})]})})})}var M=function(e){var t=Object(a.useState)([]),n=Object(P.a)(t,2),s=n[0],i=n[1],c=Object(a.useState)(!1),o=Object(P.a)(c,2),r=o[0],d=o[1],l=Object(a.useState)(0),u=Object(P.a)(l,2),h=u[0],j=u[1],g=Object(a.useState)(""),b=Object(P.a)(g,2),x=b[0],m=b[1],v=Object(a.useState)(!0),L=Object(P.a)(v,2),k=L[0],S=L[1],I=function(){return Object(C.jsx)(R.a,{color:"danger",children:"No Tasks Found!"})};Object(a.useEffect)((function(){O.a.get("https://todo-list-rails-api.herokuapp.com/users/".concat(e.user_id,"/tasks")).then((function(t){if(404===t.data.status&&e.isLoggedIn)S(!0),I();else{S(!1);var n=Array.from(t.data).map((function(e){return{id:e.id,name:e.name,user_id:e.user_id}}));i(n)}}))}),[r,k,e.user_id,e.isLoggedIn]);var _=function(e,t){d(!0),j(+e),m(t)},y=function(t,n){O.a.delete("https://todo-list-rails-api.herokuapp.com/users/".concat(e.user_id,"/tasks/").concat(t)).then((function(){i((function(e){if(0!==e.length){S(!1);var t=Object(F.a)(e);return t.splice(n,1),0===t.length?(S(!0),[]):(S(!1),t)}return S(!0),[]}))}))},w=0!==s.length?s.map((function(t,n){return Object(C.jsx)("div",{children:Object(C.jsx)(J,{id:t.id,i:n,name:t.name,updateHandler:_,deleteHandler:y,user_id:e.user_id},t.id)},t.id)})):k?I():null;return Object(C.jsx)(a.Fragment,{children:e.isLoggedIn?Object(C.jsxs)(f.a,{children:[Object(C.jsx)("div",{children:e.isLoggedIn&&e.user_id&&Object(C.jsx)(p.a,{color:"danger",onClick:function(){O.a.delete("https://todo-list-rails-api.herokuapp.com/logout",{withCredentials:!0}).then((function(){e.handleLogout(),e.history.push("/")})).catch((function(e){console.log("Logout Error",e)}))},children:"Logout"})}),Object(C.jsx)("div",{children:Object(C.jsx)(B,{id:h,existingName:x,isEdit:r,user_id:e.user_id,isLoggedIn:e.isLoggedIn,tasks:s,addNewTaskHandler:function(t){var n={name:t};O.a.post("https://todo-list-rails-api.herokuapp.com/users/".concat(e.user_id,"/tasks"),n).then((function(e){var t=[].concat(Object(F.a)(s),[e.data]);i(t)})).catch((function(e){console.log("Adding new Task error: ",e)}))},updateTaskHandler:function(t){var n={name:t};O.a.put("https://todo-list-rails-api.herokuapp.com/users/".concat(e.user_id,"/tasks/").concat(h),n).then((function(){d(!1)}))}})}),Object(C.jsx)("br",{}),w]}):Object(C.jsx)(q,{})})},Y=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;return Object(r.a)(this,n),(e=t.call(this)).state={loggedInStatus:"NOT_LOGGED_IN",user:{},isLoggedIn:!1},e.handleLogin=e.handleLogin.bind(Object(l.a)(e)),e.handleLogout=e.handleLogout.bind(Object(l.a)(e)),e}return Object(d.a)(n,[{key:"checkLoginStatus",value:function(){var e=this;O.a.get("http://localhost:3001/logged_in",{withCredentials:!0}).then((function(t){t.data.logged_in&&"NOT_LOGGED_IN"===e.state.loggedInStatus?e.setState({loggedInStatus:"LOGGED_IN",user:t.data.user,isLoggedIn:!0}):!t.data.logged_in&"LOGGED_IN"===e.state.loggedInStatus&&e.setState({loggedInStatus:"NOT_LOGGED_IN",user:{},isLoggedIn:!1})})).catch((function(e){console.log("check login error",e)}))}},{key:"componentDidMount",value:function(){this.checkLoginStatus()}},{key:"handleLogin",value:function(e){this.setState({loggedInStatus:"LOGGED_IN",user:e.user,isLoggedIn:!0})}},{key:"handleLogout",value:function(){this.setState({loggedInStatus:"NOT_LOGGED_IN",user:{},isLoggedIn:!1})}},{key:"render",value:function(){var e=this;return Object(C.jsxs)("div",{className:"App",children:[Object(C.jsx)(H,{isLoggedIn:this.state.isLoggedIn}),Object(C.jsx)("br",{}),Object(C.jsx)(j.a,{children:Object(C.jsxs)(g.c,{children:[Object(C.jsx)(g.a,{exact:!0,path:"/",render:function(t){return Object(C.jsx)(E,Object(o.a)(Object(o.a)({},t),{},{handleLogin:e.handleLogin,handleLogout:e.handleLogout,loggedInStatus:e.state.loggedInStatus}))}}),Object(C.jsx)(g.a,{exact:!0,path:"/dashboard",render:function(t){return Object(C.jsx)(M,Object(o.a)(Object(o.a)({},t),{},{loggedInStatus:e.state.loggedInStatus,handleLogout:e.handleLogout,user_id:e.state.user.id,isLoggedIn:e.state.isLoggedIn}))}})]})})]})}}]),n}(a.Component),z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,102)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),s(e),i(e),c(e)}))};n(84);c.a.render(Object(C.jsx)(s.a.StrictMode,{children:Object(C.jsx)(Y,{})}),document.getElementById("root")),z()}},[[85,1,2]]]);
//# sourceMappingURL=main.f10b3f22.chunk.js.map