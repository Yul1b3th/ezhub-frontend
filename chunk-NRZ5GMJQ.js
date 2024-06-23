import{a as D}from"./chunk-7XM6POU6.js";import{b as O,c as v,d as F,e as M,f as P,h as N,i as U,n as k,o as L}from"./chunk-ACG7GV2X.js";import{a as E,b as C}from"./chunk-734SZ5UB.js";import{X as S}from"./chunk-P7LCE7ML.js";import"./chunk-7DV4EETS.js";import"./chunk-Q6J33HRF.js";import{o as y}from"./chunk-OEVEVLY2.js";import{$a as w,Bb as l,Fb as _,Ja as s,Y as x,gb as p,jb as b,nb as i,ob as o,pb as f,ra as u,tb as c,ub as h}from"./chunk-XLW5XAEJ.js";function T(n,a){if(n&1&&(i(0,"div",16),f(1,"p",17),o()),n&2){let g=h(),r;s(),p("errors",(r=g.loginForm.get("usernameOrEmail"))==null?null:r.errors)("fieldName","Username or Email")}}function V(n,a){if(n&1&&(i(0,"div",16),f(1,"p",17),o()),n&2){let g=h(),r;s(),p("errors",(r=g.loginForm.get("password"))==null?null:r.errors)("fieldName","password")}}var Z=(()=>{let a=class a{constructor(){this.authService=u(C),this.fb=u(k),this.router=u(S),this.loginForm=this.fb.group({usernameOrEmail:["",v.required],password:["",v.required]}),this.formSubmitted=!1}onSubmit(){if(this.formSubmitted=!0,this.loginForm.valid){let{usernameOrEmail:r,password:t}=this.loginForm.value;this.authService.login(r,t).subscribe({next:()=>{if(this.authService.authStatus()===E.authenticated){let e=localStorage.getItem("state-url");if(e){this.router.navigateByUrl(e),localStorage.removeItem("state-url");return}}this.router.navigateByUrl("/")},error:e=>{e==="Username or Email is wrong"?this.loginForm.get("usernameOrEmail")?.setErrors({usernameOrEmailWrong:!0}):e==="Password is wrong"?this.loginForm.get("password")?.setErrors({passwordWrong:!0}):console.error(e)}})}}cleanUsername(r){let t=r.target;t.value=t.value.replace(/\s/g,""),this.loginForm.get("usernameOrEmail")?.setValue(t.value)}cleanPassword(r){let t=r.target;t.value=t.value.replace(/\s/g,""),this.loginForm.get("password")?.setValue(t.value)}};a.\u0275fac=function(t){return new(t||a)},a.\u0275cmp=x({type:a,selectors:[["app-login"]],standalone:!0,features:[_],decls:25,vars:3,consts:[[1,"container","mx-auto","px-5","my-10"],[1,"form"],[3,"formGroup","ngSubmit"],[1,"font-bold","text-lg","mb-3"],[1,"mb-4"],[1,"mb-2"],["for","usernameOrEmail"],["formControlName","usernameOrEmail","id","usernameOrEmail","type","text","placeholder","Username or Email",3,"input"],["class","w-full bg-red-100 px-2 py-[0.4rem] rounded-md border border-red-500 text-sm text-red-500"],[1,"mb-6"],["for","password"],["formControlName","password","id","password","type","password","placeholder","******************",3,"input"],[1,"flex","items-center","justify-between"],["type","submit",1,"btn","btn-normal","btn-primary"],[1,"register"],["href","/sign-up"],[1,"w-full","bg-red-100","px-2","py-[0.4rem]","rounded-md","border","border-red-500","text-sm","text-red-500"],["customLabel","",3,"errors","fieldName"]],template:function(t,e){if(t&1&&(i(0,"div",0)(1,"div",1)(2,"form",2),c("ngSubmit",function(){return e.onSubmit()}),i(3,"p",3),l(4,"Sign in to EZHub"),o(),i(5,"div",4)(6,"div",5)(7,"label",6),l(8," Username or Email "),o(),i(9,"input",7),c("input",function(m){return e.cleanUsername(m)}),o()(),w(10,T,2,2,"div",8),o(),i(11,"div",9)(12,"div",5)(13,"label",10),l(14," Password "),o(),i(15,"input",11),c("input",function(m){return e.cleanPassword(m)}),o()(),w(16,V,2,2,"div",8),o(),i(17,"div",12)(18,"button",13),l(19," Sign In "),o()()()(),i(20,"div",14)(21,"p",5),l(22,"Don't you have an account?"),o(),i(23,"a",15),l(24,"Create an account"),o()()()),t&2){let d,m;s(2),p("formGroup",e.loginForm),s(8),b(10,e.formSubmitted&&((d=e.loginForm.get("usernameOrEmail"))!=null&&d.errors)?10:-1),s(6),b(16,e.formSubmitted&&((m=e.loginForm.get("password"))!=null&&m.errors)?16:-1)}},dependencies:[y,L,P,O,F,M,N,U,D],styles:[".form[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;margin-bottom:1rem;width:100%;max-width:24rem;border-radius:.25rem;border-width:1px;--tw-border-opacity: 1;border-color:rgb(228 228 231 / var(--tw-border-opacity));--tw-bg-opacity: 1;background-color:rgb(250 250 250 / var(--tw-bg-opacity));padding:1.25rem;--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}[_ngcontent-%COMP%]:is(.dark   .form)[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:hsl(0 0% 25% / var(--tw-bg-opacity))}.register[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;margin-bottom:1rem;width:100%;max-width:24rem;border-radius:.25rem;border-width:1px;--tw-border-opacity: 1;border-color:rgb(228 228 231 / var(--tw-border-opacity));padding:1.25rem;--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}a[_ngcontent-%COMP%]{font-weight:500;--tw-text-opacity: 1;color:hsl(176.809 94% 20% / var(--tw-text-opacity))}a[_ngcontent-%COMP%]:hover{text-decoration-line:underline}label[_ngcontent-%COMP%]{margin-bottom:.5rem;display:block;font-weight:700}input[_ngcontent-%COMP%]{display:block;width:100%;border-radius:.375rem;border-width:1px;--tw-border-opacity: 1;border-color:rgb(228 228 231 / var(--tw-border-opacity));padding:.5rem .75rem;line-height:1.25rem;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}input[_ngcontent-%COMP%]:focus{--tw-border-opacity: 1;border-color:hsl(161.647 70% 52% / var(--tw-border-opacity));--tw-shadow: 0 0 2px 3px hsla(161.647, 70%, 52%, .3);--tw-shadow-colored: 0 0 2px 3px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);outline:2px solid transparent;outline-offset:2px}[_ngcontent-%COMP%]:is(.dark   input)[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:hsl(0 0% 25% / var(--tw-text-opacity))}"]});let n=a;return n})();export{Z as default};
