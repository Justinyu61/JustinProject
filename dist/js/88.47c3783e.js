"use strict";(self["webpackChunkjustin_project"]=self["webpackChunkjustin_project"]||[]).push([[88],{1088:function(a,s,t){t.r(s),t.d(s,{default:function(){return $}});var n=t(3396);const e={class:"container-fluid"};function o(a,s,t,o,r,l){const i=(0,n.up)("Navbar"),c=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(i),(0,n._)("div",e,[(0,n.Wm)(c)])],64)}var r=t(9242);const l={class:"navbar navbar-expand-lg navbar-light bg-light"},i=(0,n._)("a",{class:"navbar-brand",href:"#"},"Navbar",-1),c=(0,n._)("button",{class:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,n._)("span",{class:"navbar-toggler-icon"})],-1),u={class:"collapse navbar-collapse",id:"navbarNav"},v={class:"navbar-nav"},h=(0,n.uE)('<li class="nav-item"><a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a></li><li class="nav-item"><a class="nav-link" href="#">Features</a></li><li class="nav-item"><a class="nav-link" href="#">Pricing</a></li>',3),p={class:"nav-item"};function g(a,s,t,e,o,g){return(0,n.wg)(),(0,n.iD)("nav",l,[i,c,(0,n._)("div",u,[(0,n._)("ul",v,[h,(0,n._)("li",p,[(0,n._)("a",{class:"nav-link",href:"#",onClick:s[0]||(s[0]=(0,r.iM)(((...a)=>g.logout&&g.logout(...a)),["prevent"]))},"Logout")])])])])}var b={name:"Navbar-view",methods:{logout(){const a="https://vue3-course-api.hexschool.io/logout";this.$http.post(a,this.user).then((a=>{a.data.success&&(console.log(a),this.$router.push("/login"))}))}}},d=t(89);const f=(0,d.Z)(b,[["render",g]]);var m=f,k={name:"Dashboard-view",components:{Navbar:m},created(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=a;const s="https://vue3-course-api.hexschool.io/api/user/check";this.$http.post(s,this.user).then((a=>{a.data.success||this.$router.push("/login")}))}};const _=(0,d.Z)(k,[["render",o]]);var $=_}}]);
//# sourceMappingURL=88.47c3783e.js.map