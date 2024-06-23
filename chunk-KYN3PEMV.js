import{b as q}from"./chunk-734SZ5UB.js";import{a as J}from"./chunk-6L5XN4ZG.js";import{J as H,Y as N,pa as Q}from"./chunk-P7LCE7ML.js";import{a as $}from"./chunk-TEHB7NO6.js";import{a as Y}from"./chunk-GYU5LNTV.js";import"./chunk-7DV4EETS.js";import"./chunk-Q6J33HRF.js";import{k as P,m as A,n as O,o as j}from"./chunk-OEVEVLY2.js";import{$a as c,Bb as o,C as T,Cb as x,Db as m,E as M,Fb as L,Hb as g,Ib as f,Ja as a,Jb as v,P as h,R as k,Y as F,e as V,gb as _,jb as d,kb as S,lb as E,mb as b,nb as e,ob as i,pb as C,q as I,ra as s,ub as u,xb as R,yb as z,zb as B}from"./chunk-XLW5XAEJ.js";var D=V(Y());var G=["map"];function K(t,l){if(t&1&&C(0,"img",15),t&2){let n=l.$implicit,p=u(2);_("srcset","assets/img/bedrooms/"+n.trim())("alt",p.roomData.name)}}function W(t,l){t&1&&C(0,"p",16)}function X(t,l){t&1&&(e(0,"p",8),o(1,"Utilities Included"),i())}function Z(t,l){t&1&&(e(0,"p",8),o(1,"Deposit required"),i())}function tt(t,l){if(t&1&&(e(0,"p",8),o(1),i()),t&2){let n=l.$implicit;a(),x(n)}}function et(t,l){if(t&1&&(e(0,"li",19),o(1),i()),t&2){let n=l.$implicit;a(),m(" ",n.name," ")}}function it(t,l){if(t&1&&(e(0,"p"),o(1,"Amenities"),i(),e(2,"ul",17),c(3,et,2,1,"li",18),i()),t&2){let n=u(2);a(3),_("ngForOf",n.amenities)}}function nt(t,l){t&1&&(e(0,"li",19),o(1,"Smoking allowed"),i())}function ot(t,l){t&1&&(e(0,"li",19),o(1,"No smoking allowed"),i())}function at(t,l){t&1&&(e(0,"li",19),o(1,"Pets allowed"),i())}function lt(t,l){t&1&&(e(0,"li",19),o(1,"No pets allowed"),i())}function rt(t,l){t&1&&(e(0,"li",19),o(1,"Couples Allowed"),i())}function mt(t,l){t&1&&(e(0,"li",19),o(1,"No couples allowed"),i())}function pt(t,l){if(t&1&&(e(0,"h2",5),o(1,"Home features"),i(),e(2,"p",8),o(3),e(4,"sup"),o(5,"2"),i()(),e(6,"p",8),o(7),i(),e(8,"p",8),o(9),i(),e(10,"p",8),o(11),i(),e(12,"p"),o(13,"House rules"),i(),e(14,"ul",17),c(15,nt,2,0,"li",20)(16,ot,2,0)(17,at,2,0,"li",20)(18,lt,2,0)(19,rt,2,0,"li",20)(20,mt,2,0),i()),t&2){let n=u(2);a(3),m(" Home size: ",n.propertyData.property_size," m"),a(4),m("Bedrooms: ",n.propertyData.bedrooms,""),a(2),m("Bathrooms: ",n.propertyData.bathrooms,""),a(2),m("Occupant count: ",n.propertyData.occupantCount,""),a(4),d(15,n.propertyData.smoking_allowed?15:16),a(2),d(17,n.propertyData.pets_allowed?17:18),a(2),d(19,n.propertyData.couples_allowed?19:20)}}function dt(t,l){t&1&&(e(0,"p"),o(1,"Loading..."),i())}var U=t=>["/rooms/contact",t];function ct(t,l){if(t&1&&(e(0,"div",2)(1,"div",3)(2,"div"),E(3,K,1,2,"img",21,S,!1,W,1,0,"p",22),i(),e(6,"div",4)(7,"h2",5),o(8,"Room features"),i(),e(9,"h3",6),o(10),i(),e(11,"p",7),o(12),f(13,"date"),i(),e(14,"p",7),o(15),e(16,"sup"),o(17,"2"),i()(),e(18,"p",7),o(19),f(20,"number"),i(),e(21,"p",8),o(22),i(),e(23,"p",8),o(24),i(),c(25,X,2,0,"p",9)(26,Z,2,0,"p",9),E(27,tt,2,1,"p",9,S),c(29,it,4,1),i(),e(30,"div",4),c(31,pt,21,7)(32,dt,2,0),i(),C(33,"div",10,11),e(35,"div",12)(36,"a",13),o(37,"Contact"),i()()(),e(38,"div",14)(39,"h2",5),o(40),i(),e(41,"p",8),o(42),f(43,"date"),i(),e(44,"p",8),o(45),e(46,"sup"),o(47,"2"),i()(),e(48,"p",8),o(49),f(50,"number"),i(),e(51,"p",8),o(52),i(),e(53,"p",8),o(54),i(),e(55,"a",13),o(56,"Contact"),i()()()),t&2){let n=u();a(3),b(n.roomData.photos.split(",")),a(7),x(n.roomData.name),a(2),m(" Available from: ",v(13,19,n.roomData.available_from,"yyyy-MM-dd")," "),a(3),m(" Room size: ",n.roomData.room_size," m"),a(4),m(" Room price: ",v(20,22,n.roomData.precio,"1.0-0")," "),a(3),x(n.roomData.details),a(2),m("Bed Type ",n.roomData.bed_type,""),a(),d(25,n.roomData.utilities_included?25:-1),a(),d(26,n.roomData.deposit_required?26:-1),a(),b(n.roomData.services_included.split(",")),a(2),d(29,n.roomData&&n.amenities?29:-1),a(2),d(31,n.propertyData?31:32),a(5),_("routerLink",g(31,U,n.roomData.id)),a(4),x(n.roomData.name),a(2),m(" Available from: ",v(43,25,n.roomData.available_from,"yyyy-MM-dd")," "),a(3),m("Room size: ",n.roomData.room_size," m"),a(4),m("Room price: ",v(50,28,n.roomData.precio,"1.0-0")," \u20AC"),a(3),m("City: ",n.propertyData==null?null:n.propertyData.city,""),a(2),m("Postal code: ",n.propertyData==null?null:n.propertyData.postalCode,""),a(),_("routerLink",g(33,U,n.roomData.id))}}function st(t,l){t&1&&(e(0,"p"),o(1,"Loading..."),i())}var gt=(()=>{let l=class l{constructor(){this.authService=s(q),this.route=s(H),this.propertyService=s($),this.roomService=s(J),this.lngLat=[2.187975058256683,41.392281189125214]}ngOnInit(){this.loadData()}ngOnDestroy(){this.subscription&&this.subscription.unsubscribe()}loadData(){this.subscription=this.route.params.pipe(h(({id:p})=>this.roomService.getRoomById(p).pipe(k(r=>{this.roomData=r}),h(r=>T({property:this.propertyService.getPropertyById(r.propertyId),amenities:this.roomService.getRoomAmenities(r.id)})))),M(p=>(console.error("Error loading data",p),I))).subscribe(({property:p,amenities:r})=>{this.propertyData=p,this.amenities=r,this.initializeMap()})}initializeMap(){if(!this.divMap)throw"El elemento HTML no fue encontrado";if(this.propertyData&&this.propertyData.latitude&&this.propertyData.longitude){let p=parseFloat(this.propertyData.latitude),r=parseFloat(this.propertyData.longitude);this.map=new D.Map({container:this.divMap?.nativeElement,style:"mapbox://styles/mapbox/streets-v12",center:[r,p],zoom:13}),new D.Marker({color:"#30daa6"}).setLngLat([r,p]).addTo(this.map)}}};l.\u0275fac=function(r){return new(r||l)},l.\u0275cmp=F({type:l,selectors:[["app-details"]],viewQuery:function(r,y){if(r&1&&R(G,5),r&2){let w;z(w=B())&&(y.divMap=w.first)}},standalone:!0,features:[L],decls:3,vars:1,consts:[[1,"container","mx-auto","px-5","my-10"],["class","flex items-start flex-wrap md:flex-nowrap gap-5"],[1,"flex","items-start","flex-wrap","md:flex-nowrap","gap-5"],[1,"w-full","md:w-[70%]","justify-center"],[1,"mt-5","bg-zinc-50","dark:bg-light","border","border-zinc-200","p-5","shadow-sm"],[1,"font-bold","mb-3"],[1,"font-bold","mb-3","md:hidden"],[1,"mb-4","md:hidden"],[1,"mb-4"],["class","mb-4"],["id","map",1,"w-full","h-[40vh]","mt-5"],["map",""],[1,"my-5","md:hidden"],[1,"btn","btn-primary","btn-normal",3,"routerLink"],[1,"hidden","md:w-[30%]","md:block","p-5","border-slate-300","shadow","sticky","bottom-0","md:top-[8rem]"],[1,"w-full","h-[30vh]","object-cover",3,"srcset","alt"],[1,"text-center"],[1,"list-disc"],["class","ml-5",4,"ngFor","ngForOf"],[1,"ml-5"],["class","ml-5"],["class","w-full h-[30vh] object-cover",3,"srcset","alt"],["class","text-center"]],template:function(r,y){r&1&&(e(0,"div",0),c(1,ct,57,35,"div",1)(2,st,2,0),i()),r&2&&(a(),d(1,y.roomData?1:2))},dependencies:[j,P,O,A,Q,N]});let t=l;return t})();export{gt as default};