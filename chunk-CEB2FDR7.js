import{a as L}from"./chunk-GSGDNTVC.js";import{Y as T,pa as E}from"./chunk-P7LCE7ML.js";import"./chunk-7DV4EETS.js";import"./chunk-Q6J33HRF.js";import{o as D}from"./chunk-OEVEVLY2.js";import{$a as g,Bb as r,Cb as _,Fb as S,Hb as v,Ja as a,Y as y,aa as p,ba as m,gb as f,jb as w,lb as C,mb as k,nb as i,ob as n,pb as d,qb as b,ra as h,tb as x,ub as u}from"./chunk-XLW5XAEJ.js";var M=(e,t)=>t.id,F=e=>["./",e],P=e=>["./edit/",e];function j(e,t){if(e&1){let o=b();i(0,"div",5)(1,"div",6)(2,"div",7)(3,"h2",8),r(4),n(),i(5,"p",9),r(6),n()(),i(7,"div",10)(8,"a",11),d(9,"img",12),r(10," View "),n(),i(11,"a",11),d(12,"img",13),r(13," Edit "),n(),i(14,"a",14),x("click",function(){let c=p(o).$implicit,V=u();return m(V.onDeleteRoom(c.id))}),d(15,"img",15),r(16," Delete "),n()()()()}if(e&2){let o=t.$implicit;a(4),_(o.name),a(2),_(o.details),a(2),f("routerLink",v(4,F,o.id)),a(3),f("routerLink",v(6,P,o.id))}}function O(e,t){e&1&&(i(0,"p",16),r(1,"There are no items."),n())}function R(e,t){if(e&1){let o=b();i(0,"div",17)(1,"div",18)(2,"h2",19),r(3," Are you sure you want to delete this room? "),n(),i(4,"div",20)(5,"button",21),x("click",function(){p(o);let l=u();return m(l.cancelDelete())}),r(6," Cancel "),n(),i(7,"button",14),x("click",function(){p(o);let l=u();return m(l.confirmDelete())}),r(8," Delete "),n()()()()}}var B=(()=>{let t=class t{constructor(){this.propertyService=h(L),this.deleteModalOpen=!1,this.propertyToDelete=null,this.propertyService.getProperties().subscribe(()=>{})}onDeleteRoom(s){this.deleteModalOpen=!0,this.propertyToDelete=s}confirmDelete(){this.propertyToDelete!==null&&this.propertyService.deletePropertybyIDJWT(this.propertyToDelete).subscribe(()=>{this.deleteModalOpen=!1,this.propertyToDelete=null,this.propertyService.getProperties().subscribe()},s=>{console.error("Error deleting property:",s)})}cancelDelete(){this.deleteModalOpen=!1,this.propertyToDelete=null}};t.\u0275fac=function(l){return new(l||t)},t.\u0275cmp=y({type:t,selectors:[["app-list"]],standalone:!0,features:[S],decls:9,vars:2,consts:[[1,"pt-4","pb-6"],["routerLink","./add",1,"btn","btn-primary","btn-normal"],["tabindex","-1","src","assets/icons/add.svg","width","20px","alt","Add Properties",1,"mr-1"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-10"],["class","fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]"],[1,"flex","flex-col"],[1,"flex","flex-col","bg-white","dark:bg-light","dark:text-white","rounded-lg","shadow-md","overflow-hidden","h-full","transition-all","hover:shadow-primary-hover"],[1,"p-4","flex-grow"],[1,"font-bold"],[1,"mt-2"],[1,"p-4","flex","justify-between"],[1,"btn","btn-secondary","btn-small",3,"routerLink"],["tabindex","-1","src","assets/icons/view.svg","width","20px","alt","View",1,"mr-[2px]"],["tabindex","-1","src","assets/icons/edit.svg","width","20px","alt","edit",1,"mr-[2px]"],[1,"btn","btn-delete","btn-small",3,"click"],["tabindex","-1","src","assets/icons/delete.svg","width","20px","alt","delete",1,"mr-[2px]"],[1,"text-lg","text-center"],[1,"fixed","inset-0","bg-black","bg-opacity-50","flex","items-center","justify-center","z-[1001]"],[1,"bg-white","rounded","p-5"],[1,"text-lg","font-bold","mb-4"],[1,"flex","justify-end","gap-4"],[1,"btn","btn-secondary","btn-small",3,"click"],["class","flex flex-col"],["class","text-lg text-center"]],template:function(l,c){l&1&&(i(0,"div",0)(1,"a",1),d(2,"img",2),r(3," Add Properties "),n()(),i(4,"div",3),C(5,j,17,8,"div",22,M,!1,O,2,0,"p",23),n(),g(8,R,9,0,"div",4)),l&2&&(a(5),k(c.propertyService.propertiesJWT()),a(3),w(8,c.deleteModalOpen?8:-1))},dependencies:[D,E,T]});let e=t;return e})();export{B as default};
