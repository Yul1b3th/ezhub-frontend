import{d as l}from"./chunk-GYU5LNTV.js";import{a}from"./chunk-7DV4EETS.js";import{c}from"./chunk-Q6J33HRF.js";import{ga as p,qa as s,ra as n,w as o}from"./chunk-XLW5XAEJ.js";var j=(()=>{let t=class t{constructor(e){this.placesService=e,this.http=n(c),this.baseUrl=a.baseUrl,this.getPublicProperties()}getPublicProperties(){return this.http.get(`${this.baseUrl}/public-properties`).pipe(o(e=>e.filter(r=>r.deletedAt===null)))}getPropertyById(e){return this.http.get(`${this.baseUrl}/public-properties/${e}`).pipe(o(r=>r))}};t.\u0275fac=function(r){return new(r||t)(s(l))},t.\u0275prov=p({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();export{j as a};