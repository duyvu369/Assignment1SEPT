(this["webpackJsonpsocialape-client"]=this["webpackJsonpsocialape-client"]||[]).push([[0],{25:function(e,t,a){},49:function(e,t,a){e.exports=a(79)},79:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(26),i=a.n(l),c=a(6),s=a(5),r=a(8),u=a(7),m=a(31),h=a(9),d=(a(25),a(2)),g=a.n(d),p=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"center"},o.a.createElement("h1",null,"Golden Wind")),o.a.createElement("p",{className:"intro"},"Establish in 1991 by Dr.Khoa Dang, Golden Wind Hospital has almost 3 decades of experiece in the healthcare sector. We have come a long way from a small local clinic to becoming the TOP 10 health center of Ho Chi Minh City at one of the best places of District 7. We have all well-trained and highly-experienced doctors, nurses and health specialists. We commit to provide our patients with the highest quality healthcare services and all will be treated equally."))}}]),a}(n.Component),f=a(3),E=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={email:"",password:"",confirmedPW:"",name:"",phone:"",msg:""},n.handleSubmit=n.handleSubmit.bind(Object(f.a)(n)),n.handleChange=n.handleChange.bind(Object(f.a)(n)),n}return Object(s.a)(a,[{key:"handleChange",value:function(e){this.setState({[e.target.name]:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this,a=this.state,n=a.email,o=a.password,l=a.confirmedPW,i=a.phone,c=a.name;this.setState({msg:"Please wait!"}),g.a.post("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/register",{name:c,email:n,password:o,confirmedPW:l,phone:i}).then((function(e){t.setState({msg:e.data.message})})).catch((function(e){console.log(e),t.setState({msg:"Something went wrong! please try again!"})})),e.preventDefault()}},{key:"render",value:function(){return o.a.createElement("div",{className:"wrapper fadeInDown"},o.a.createElement("div",{id:"formContent"},o.a.createElement("h2",{className:"active underlineHover"},"Register "),o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("input",{type:"email",name:"email",className:"fadeInsecond",placeholder:"Email",value:this.state.email,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"password",name:"password",className:"fadeInthird",placeholder:"Password",value:this.state.password,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"password",name:"confirmedPW",className:"fadeInfourth",placeholder:"Password confirmation",value:this.state.confirmedPW,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"text",name:"name",className:"fadeInfifth",placeholder:"Enter your full name",value:this.state.name,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"text",name:"phone",className:"fadeInsixth",placeholder:"Enter your phone number",value:this.state.phone,onChange:this.handleChange,required:!0}),o.a.createElement("button",{type:"submit"},"Register"),o.a.createElement("p",{className:"message"},this.state.msg))))}}]),a}(n.Component),b=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={email:"",password:"",token:"",msg:""},n.handleSubmit=n.handleSubmit.bind(Object(f.a)(n)),n.handleChange=n.handleChange.bind(Object(f.a)(n)),n}return Object(s.a)(a,[{key:"handleChange",value:function(e){this.setState({[e.target.name]:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this,a=this.state,n=a.email,o=a.password;g.a.post("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/login",{email:n,password:o}).then((function(e){t.setState({token:e.data.token,msg:e.data.message})})).catch((function(e){t.setState({msg:"Something wrong happened! Please try again later!"}),console.log("Login error",e.code)})),e.preventDefault()}},{key:"render",value:function(){return o.a.createElement("div",{className:"wrapper fadeInDown"},o.a.createElement("div",{id:"formContent"},o.a.createElement("h2",{className:"active underlineHover"},"Log in "),o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("input",{type:"email",name:"email",placeholder:"Email",value:this.state.email,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"password",name:"password",placeholder:"Password",value:this.state.password,onChange:this.handleChange,required:!0}),o.a.createElement("button",{type:"submit"},"Login"),o.a.createElement("p",{className:"message"},this.state.msg))))}}]),a}(n.Component),v=a(99),y=a(97),k=a(98),C=a(13),S=a.n(C),I=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).state={loggedIn:!1},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;g.a.get("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status").then((function(t){e.setState({loggedIn:t.data.loggedIn})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return this.state.loggedIn?o.a.createElement("div",null,o.a.createElement(v.a,null,o.a.createElement(y.a,{position:"sticky"},o.a.createElement(n.Fragment,null,o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/"},"Home"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/doctors"},"Doctors"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/account"},"Personal profile"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/book"},"Book"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/bookings"},"Appointment"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/login"},"Login"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/register"},"Register"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/staffRegister"},"Register as a hospital staff"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/feedback"},"Feedbacks"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/logout"},"Log out"))))):o.a.createElement("div",null,o.a.createElement(v.a,null,o.a.createElement(y.a,{position:"sticky"},o.a.createElement(n.Fragment,null,o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/"},"Home"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/doctors"},"Doctors"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/login"},"Login"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/register"},"Register"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/staffRegister"},"Register as a hospital staff"),o.a.createElement(k.a,{color:"inherit",component:S.a,to:"/feedback"},"Feedbacks")))))}}]),a}(n.Component),w=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={email:"",password:"",confirmedPW:"",name:"",phone:"",companyCode:null,position:null,msg:""},n.handleSubmit=n.handleSubmit.bind(Object(f.a)(n)),n.handleChange=n.handleChange.bind(Object(f.a)(n)),n}return Object(s.a)(a,[{key:"handleChange",value:function(e){this.setState({[e.target.name]:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this,a=this.state,n=a.email,o=a.password,l=a.confirmedPW,i=a.phone,c=a.name,s=a.companyCode,r=a.position;g.a.post("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/register",{name:c,email:n,password:o,confirmedPW:l,phone:i,companyCode:s,position:r}).then((function(e){201===e.status?t.setState({msg:"Your account has been created successfully!"}):console.log(e)})).catch((function(e){console.log(e),t.setState({msg:"Something went wrong! please try again!"})})),e.preventDefault()}},{key:"render",value:function(){return o.a.createElement("div",{class:"wrapper fadeInDown"},o.a.createElement("div",{id:"formContent"},o.a.createElement("h2",{class:"active underlineHover"},"Register "),o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("input",{type:"email",name:"email",class:"fadeInsecond",placeholder:"Email",value:this.state.email,onChange:this.handleChange,required:!0,autocomplete:"off"}),o.a.createElement("input",{type:"password",name:"password",class:"fadeInthird",placeholder:"Password",value:this.state.password,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"password",name:"confirmedPW",class:"fadeInfourth",placeholder:"Password confirmation",value:this.state.confirmedPW,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"text",name:"name",class:"fadeInfifth",placeholder:"Enter your full name",value:this.state.name,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"text",name:"phone",class:"fadeInsixth",placeholder:"Enter your phone number",value:this.state.phone,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"text",name:"companyCode",class:"fadeInseventh",placeholder:"Secret code",value:this.state.companyCode,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"text",name:"postion",class:"fadeIneighth",placeholder:"Your position",value:this.state.companyCode,onChange:this.handleChange,required:!0}),o.a.createElement("button",{type:"submit"},"Register"),o.a.createElement("p",{className:"message"},this.state.msg))))}}]),a}(n.Component),A=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={items:[],isLoaded:!1},n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Doctors").then((function(e){return e.json()})).then((function(t){e.setState({isLoaded:!0,items:t})}))}},{key:"render",value:function(){var e=this.state,t=e.isLoaded,a=e.items;return t?o.a.createElement("div",null,o.a.createElement("ul",null,o.a.createElement("h1",null,"OUR TEAM"),a.map((function(e){return o.a.createElement("div",{className:"card",key:e.dId},"  ",o.a.createElement("h1",null,"Dr ",e.name),o.a.createElement("img",{src:e.imgLink,width:"300px",height:"300px"}),o.a.createElement("p",null,"Expertise: ",e.expertise),o.a.createElement("p",null,"Background: ",e.background)," ")})))):o.a.createElement("div",null,"Loading .....")}}]),a}(n.Component),O=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).state={items:[],loggedIn:!1,token:"",position:"",date:"",status:"",doctor:"",doctorContact:"",bId:"",bookingStatus:"",msg:""},e.handleFilterByStatus=e.handleFilterByStatus.bind(Object(f.a)(e)),e.handleFilterByDate=e.handleFilterByDate.bind(Object(f.a)(e)),e.handleChange=e.handleChange.bind(Object(f.a)(e)),e.handleAssign=e.handleAssign.bind(Object(f.a)(e)),e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;g.a.get("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status").then((function(t){e.setState({loggedIn:t.data.loggedIn,token:t.data.token}),console.log(e.state),g.a.get("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Bookings",{headers:{Authorization:"".concat(e.state.token)}}).then((function(t){e.setState({items:t.data.appointmentList}),console.log(e.state),g.a.get("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/account",{headers:{Authorization:"".concat(e.state.token)}}).then((function(t){e.setState({position:t.data.accountInfo.position})})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}},{key:"handleChange",value:function(e){this.setState({[e.target.name]:e.target.value})}},{key:"handleFilterByDate",value:function(e){var t=this,a=this.state,n=a.token,o=a.date;g.a.post("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Bookings-by-date",{date:o},{headers:{Authorization:"".concat(n)}}).then((function(e){console.log(e.data),t.setState({items:e.data.bookingsList})})).catch((function(e){console.log(e),t.setState({msg:"Something went wrong! please try again!"})})),e.preventDefault()}},{key:"handleFilterByStatus",value:function(e){var t=this,a=this.state,n=a.token,o=a.status;g.a.post("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Bookings-by-status",{status:o},{headers:{Authorization:"".concat(n)}}).then((function(e){console.log(e.data),t.setState({items:e.data.bookingsList})})).catch((function(e){console.log(e),t.setState({msg:"Something went wrong! please try again!"})})),e.preventDefault()}},{key:"handleAssign",value:function(e){var t=this,a=this.state,n=a.bId,o=a.bookingStatus,l=a.doctor,i=a.doctorContact;g.a.put("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Booking",{doctor:l,doctorContact:i,status:o},{params:{bId:n},headers:{Authorization:"".concat(this.state.token)}}).then((function(e){t.setState({msg:e.data.message})})),e.preventDefault()}},{key:"render",value:function(){var e=this,t=this.state,a=t.loggedIn,n=t.items,l=t.position;return a&&0==n.length?o.a.createElement("div",null,o.a.createElement("h3",null,"Your booking history is empty!"),o.a.createElement("br",null),o.a.createElement("h3",null,"You can book an appointment in Book")):"Manager"===l?o.a.createElement("div",null,o.a.createElement("h3",null,"Your appointment history:"),o.a.createElement("form",{onSubmit:this.handleFilterByDate},"Filter by date:",o.a.createElement("input",{type:"text",name:"date",placeholder:"DD/MM/YYYY",value:this.state.date,onChange:this.handleChange})," ",o.a.createElement("button",{type:"submit"},"Search")),o.a.createElement("form",{onSubmit:this.handleFilterByStatus},"Filter by status:",o.a.createElement("input",{type:"text",name:"status",placeholder:"Accepted/Declined/Pending",value:this.state.status,onChange:this.handleChange})," ",o.a.createElement("button",{type:"submit"},"Search")),o.a.createElement("ul",null,o.a.createElement("h3",null,"Assign Form"),o.a.createElement("form",{onSubmit:this.handleAssign},"Appointment ID:",o.a.createElement("input",{type:"text",name:"bId",onChange:this.handleChange,required:!0}),o.a.createElement("br",null),"Status:",o.a.createElement("input",{type:"text",name:"bookingStatus",value:this.state.bookingStatus,onChange:this.handleChange,required:!0}),o.a.createElement("br",null),"Doctor:",o.a.createElement("input",{type:"text",name:"doctor",value:this.state.doctor,onChange:this.handleChange,required:!0}),o.a.createElement("br",null),"Doctor contact info:",o.a.createElement("input",{type:"text",name:"doctorContact",value:this.state.doctorContact,onChange:this.handleChange,required:!0}),o.a.createElement("button",{type:"submit"},"Assign")),n.map((function(e){return o.a.createElement("div",{className:"card",key:e.bId},o.a.createElement("h3",null,"Service: ",e.service),o.a.createElement("ul",null,o.a.createElement("li",null,"ID: ",e.bId),o.a.createElement("li",null,"Time: ",e.time," ",e.date),o.a.createElement("li",null,"Status: ",e.status),o.a.createElement("li",null,"Doctor: ",e.doctor),o.a.createElement("li",null,"Base fee: ",e.baseFee," VND"),o.a.createElement("li",null,"Doctor contact: ",e.doctorContact)))})),o.a.createElement("h3",null,this.state.msg))):o.a.createElement("div",null,n.map((function(t){return o.a.createElement("div",{className:"card",key:t.bId},o.a.createElement("h3",null,"Service: ",t.service),o.a.createElement("ul",null,o.a.createElement("li",null,"Time: ",t.time," ",t.date),o.a.createElement("li",null,"Status: ",t.status),o.a.createElement("li",null,"Doctor: ",t.doctor),o.a.createElement("li",null,"Base fee: ",t.baseFee," VND "),o.a.createElement("li",null,"Doctor contact: ",t.doctorContact)),o.a.createElement("h3",null,e.state.msg))})))}}]),a}(n.Component),j=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={time:"",service:"",msg:"",date:"",loggedIn:!1,token:""},n.handleSubmit=n.handleSubmit.bind(Object(f.a)(n)),n.handleChange=n.handleChange.bind(Object(f.a)(n)),n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;g.a.get("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status").then((function(t){e.setState({loggedIn:t.data.loggedIn,token:t.data.token})})).catch((function(e){console.log(e)}))}},{key:"handleChange",value:function(e){this.setState({[e.target.name]:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this,a=this.state,n=a.time,o=a.date,l=a.service;g.a.post("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Booking",{time:n,date:o,service:l},{headers:{Authorization:"".concat(this.state.token)}}).then((function(e){t.setState({msg:e.data.message})})).catch((function(e){console.log(e),t.setState({msg:"Something went wrong! please try again!"})})),e.preventDefault()}},{key:"render",value:function(){var e=this.state.loggedIn,t=this.state.token;return e&&""==t?o.a.createElement("div",null,o.a.createElement("h3",null,"Loading..... Please wait")):o.a.createElement("div",{className:"wrapper fadeInDown"},o.a.createElement("div",{id:"formContent"},o.a.createElement("h2",{className:"active underlineHover"},"Booking form "),o.a.createElement("br",null),o.a.createElement("h3",null,"Our services:"),o.a.createElement("ul",null,o.a.createElement("li",null,"General and specialty surgical services"),o.a.createElement("li",null,"X-ray/Radiology services"),o.a.createElement("li",null,"Physical therapy and rehabilitation services"),o.a.createElement("li",null,"Home nursing services"),o.a.createElement("li",null,"Mental health and drug treatment"),o.a.createElement("li",null,"Laboratory services"),o.a.createElement("li",null,"Blood services"),o.a.createElement("li",null,"Short-term hospitalization"),o.a.createElement("li",null,"Family planning services"),o.a.createElement("li",null,"Nutritional counselling")),o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("input",{type:"text",name:"service",className:"fadeInsecond",placeholder:"What service are you looking for?",value:this.state.service,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"text",name:"time",className:"fadeInthird",placeholder:"Time (6:30 to 23:00)",value:this.state.time,onChange:this.handleChange,required:!0}),o.a.createElement("input",{type:"text",name:"date",className:"fadeInfourth",placeholder:"Date (MM/DD/YYYY)",value:this.state.date,onChange:this.handleChange,required:!0}),o.a.createElement("button",{type:"submit"},"Submit"),o.a.createElement("p",{className:"message"},this.state.msg))))}}]),a}(n.Component),x=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).state={user:{},loggedIn:!1,token:"",email:"",name:"",phone:"",password:"",imgLink:"",position:"",expertise:"",background:"",msg:""},e.handleSubmit=e.handleSubmit.bind(Object(f.a)(e)),e.handleChange=e.handleChange.bind(Object(f.a)(e)),e.handleDelete=e.handleDelete.bind(Object(f.a)(e)),e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;g.a.get("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status").then((function(t){e.setState({loggedIn:t.data.loggedIn,token:t.data.token}),g.a.get("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/account",{headers:{Authorization:"".concat(e.state.token)}}).then((function(t){e.setState({user:t.data.accountInfo,password:t.data.accountInfo.password,expertise:t.data.accountInfo.expertise,imgLink:t.data.accountInfo.imgLink,background:t.data.accountInfo.background,position:t.data.accountInfo.position,phone:t.data.accountInfo.phone})})).catch((function(e){console.log(e)})).catch((function(e){console.log(e)}))}))}},{key:"handleChange",value:function(e){this.setState({[e.target.name]:e.target.value})}},{key:"handleDelete",value:function(e){var t=this;g.a.delete("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/account",{headers:{Authorization:"".concat(this.state.token)}}).then((function(e){t.setState({msg:e.data.message})})).catch((function(e){console.log(e)})),e.preventDefault()}},{key:"handleSubmit",value:function(e){var t=this,a=this.state.password,n=this.state.phone,o=this.state.expertise,l=this.state.background,i=this.state.imgLink,c=this.state.position;void 0===c||"Doctor"!==c?g.a.put("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/account",{password:a},{headers:{Authorization:"".concat(this.state.token)}}).then((function(e){t.setState({msg:e.data.message})})).catch((function(e){console.log(e),t.setState({msg:"Something went wrong! please try again!"})})):g.a.put("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/account",{password:a,phone:n,expertise:o,background:l,imgLink:i},{headers:{Authorization:"".concat(this.state.token)}}).then((function(e){201===e.status?t.setState({msg:"Updated successfully!"}):console.log(e)})).catch((function(e){console.log(e),t.setState({msg:"Something went wrong! please try again!"})})),e.preventDefault()}},{key:"render",value:function(){var e=this.state.loggedIn,t=this.state.position,a=this.state.user;return e?e&&0==Object.keys(a).length?o.a.createElement("div",null,o.a.createElement("h3",null,"Loading..... please wait!")):e&&"Doctor"===t&&0!=Object.keys(a).length?o.a.createElement("div",null,o.a.createElement("ul",null,o.a.createElement("h3",null,"Personal info:"),o.a.createElement("br",null),o.a.createElement("p",null,"Selfie:")," ",o.a.createElement("img",{src:a.imgLink,width:"400px",height:"400px"}),o.a.createElement("p",null,"Email: ",a.email),o.a.createElement("p",null,"Name: ",a.name),o.a.createElement("p",null,"Phone: ",a.phone),o.a.createElement("form",{onSubmit:this.handleSubmit},"Password: ",o.a.createElement("input",{type:"text",name:"password",value:this.state.password,onChange:this.handleChange,placeholder:a.password}),o.a.createElement("br",null),"Img Link:",o.a.createElement("input",{type:"text",name:"imgLink",value:this.state.imgLink,onChange:this.handleChange,placeholder:a.imgLink}),o.a.createElement("br",null),"Expertise:",o.a.createElement("input",{type:"text",name:"expertise",value:this.state.expertise,onChange:this.handleChange,placeholder:a.expertise}),o.a.createElement("br",null),"Background:",o.a.createElement("input",{type:"text",name:"background",value:this.state.background,onChange:this.handleChange,placeholder:a.background}),o.a.createElement("br",null),o.a.createElement("button",{type:"submit"},"UPDATE"),o.a.createElement(k.a,{onClick:this.handleDelete},"DELETE ACCOUNT"),o.a.createElement("p",{className:"message"},this.state.msg)))):o.a.createElement("div",null,o.a.createElement("ul",null,o.a.createElement("h3",null,"PERSONAL INFO"),o.a.createElement("p",null,"Email: ",a.email," "),o.a.createElement("p",null,"Name: ",a.name),o.a.createElement("p",null,"Phone: ",a.phone),o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("br",null),"Password: ",o.a.createElement("input",{type:"text",name:"password",value:this.state.password,onChange:this.handleChange,placeholder:a.password}),o.a.createElement("br",null),o.a.createElement("button",{type:"submit"},"UPDATE"),o.a.createElement(k.a,{onClick:this.handleDelete},"DELETE ACCOUNT"),o.a.createElement("p",{className:"message"},this.state.msg)))):o.a.createElement("div",null,o.a.createElement("h3",null,"You are required to logged in to use this feature!"))}}]),a}(n.Component),D=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).state={token:"",msg:""},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;g.a.get("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status").then((function(t){e.setState({loggedIn:t.data.loggedIn,token:t.data.token}),console.log(e.state),g.a.post("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/logout",{},{headers:{Authorization:"".concat(e.state.token)}}).then((function(t){e.setState({msg:t.data.message})})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this.state.msg;return o.a.createElement("div",null,o.a.createElement("h3",null,e))}}]),a}(n.Component),P=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).state={items:[],loggedIn:!1,token:"",context:"",rating:"",msg:""},e.handleChange=e.handleChange.bind(Object(f.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(f.a)(e)),e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;g.a.get("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status").then((function(t){e.setState({loggedIn:t.data.loggedIn,token:t.data.token}),console.log(e.state),g.a.get("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Feedbacks",{headers:{Authorization:"".concat(e.state.token)}}).then((function(t){e.setState({items:t.data.feedbacks})})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}},{key:"handleChange",value:function(e){this.setState({[e.target.name]:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this,a=this.state,n=a.token,o=a.context,l=a.rating;g.a.post("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/Feedback",{context:o,rating:l},{headers:{Authorization:"".concat(n)}}).then((function(e){console.log(e.data),t.setState({msg:e.data.message})})).catch((function(e){console.log(e),t.setState({msg:"Something went wrong! please try again!"})}))}},{key:"render",value:function(){var e=this.state,t=e.loggedIn,a=e.items,n=e.msg;return t?o.a.createElement("div",null,o.a.createElement("h3",null,"New feeback"),o.a.createElement("form",{onSubmit:this.handleSubmit},"Context",o.a.createElement("input",{type:"text",name:"context",placeholder:"Feedback detail!",value:this.state.context,onChange:this.handleChange,required:!0}),o.a.createElement("br",null),"Rating:",o.a.createElement("input",{type:"text",name:"rating",placeholder:"Please rate our service!",value:this.state.rating,onChange:this.handleChange,required:!0}),o.a.createElement("button",{type:"submit"},"Submit feedback")),"Feedbacks:",a.map((function(e){return o.a.createElement("div",{className:"card",key:e.fId},o.a.createElement("ul",null,o.a.createElement("li",null,"Context: ",e.context),o.a.createElement("li",null,"Rating: ",e.rating),o.a.createElement("li",null," Submitted by: ",e.name)))})),o.a.createElement("h3",null,n)):o.a.createElement("div",null,o.a.createElement("h3",null,"Feedbacks:"),a.map((function(e){return o.a.createElement("div",{className:"card",key:e.fId},o.a.createElement("ul",null,o.a.createElement("li",null,"Context: ",e.context),o.a.createElement("li",null,"Rating: ",e.rating),o.a.createElement("li",null," Submitted by: ",e.name)))})),o.a.createElement("h3",null,this.state.msg))}}]),a}(n.Component),N=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).state={loggedIn:!1},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;g.a.get("https://us-central1-online-clinic-booking-system.cloudfunctions.net/AyPiAI/status").then((function(t){e.setState({loggedIn:t.data.loggedIn})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return this.state.loggedIn?o.a.createElement("div",{className:"app"},o.a.createElement(m.a,null,o.a.createElement(I,null),o.a.createElement(h.Switch,null,o.a.createElement(h.Route,{exact:!0,path:"/",component:p}),o.a.createElement(h.Route,{exact:!0,path:"/login",component:b}),o.a.createElement(h.Route,{exact:!0,path:"/register",component:E}),o.a.createElement(h.Route,{exact:!0,path:"/account",component:x}),o.a.createElement(h.Route,{exact:!0,path:"/staffRegister",component:w}),o.a.createElement(h.Route,{exact:!0,path:"/doctors",component:A}),o.a.createElement(h.Route,{exact:!0,path:"/book",component:j}),o.a.createElement(h.Route,{exact:!0,path:"/bookings",component:O}),o.a.createElement(h.Route,{exact:!0,path:"/feedback",component:P}),o.a.createElement(h.Route,{exact:!0,path:"/logout",component:D})))):o.a.createElement("div",{className:"app"},o.a.createElement(m.a,null,o.a.createElement(I,null),o.a.createElement(h.Switch,null,o.a.createElement(h.Route,{exact:!0,path:"/",component:p}),o.a.createElement(h.Route,{exact:!0,path:"/login",component:b}),o.a.createElement(h.Route,{exact:!0,path:"/register",component:E}),o.a.createElement(h.Route,{exact:!0,path:"/staffRegister",component:w}),o.a.createElement(h.Route,{exact:!0,path:"/doctors",component:A}),o.a.createElement(h.Route,{exact:!0,path:"/feedback",component:P}))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[49,1,2]]]);
//# sourceMappingURL=main.41d5932a.chunk.js.map