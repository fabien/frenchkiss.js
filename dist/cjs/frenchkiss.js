/**
 * @license @atelierfabien/frenchkiss 0.3.0
 * Copyright (c) 2018-2020 Koala Interactive, Inc.
 * License: MIT
 */
"use strict";var t=/^\s*\w+\s*$/,n=/^\s*(\w+)\s*,\s*(select|plural)\s*,/i,e=JSON.stringify,r=function(t){return'(p["'+t+'"]||(p["'+t+'"]=="0"?0:"'+t+'" in p?"":v("'+t+'",k,l)))'};function u(t){for(var n={},u=function t(n,u){var o=[];var i=n.length;for(var f=0;f<i;++f){var s=n[f],c=s[0],a=s[1],l="";if(0===c&&a)l=e(a);else if(1===c)l=r(a.trim());else if(2===c){for(var v=s[2],p=s[3],h=s[4],g=p.length,b=0;b<g;++b)h?"="===p[b][0][0]?l+='p["'+v+'"]=='+e(p[b][0].substr(1)):(u[v]=1,l+='m["'+v+'"]=='+e(p[b][0])):l+='p["'+v+'"]=='+e(p[b][0]),l+="?"+t(p[b][1],u)+":";l="("+l+t(a,u)+")"}l&&o.push(l)}return o.join("+")||'""'}(o(t),n),i=Object.keys(n),f=i.length,s=[],c=0;c<f;++c)s[c]=i[c]+':f(p["'+i[c]+'"])';return Function("a","f","k","l","v","var p=a||{}"+(f?",m=f?{"+s+"}:{}":"")+";return "+u)}function o(e){for(var r=0,u="",o=e.length,f=[],s=0;s<o;++s){var c=e[s],a=void 0;"{"===c?r++||(a=[0,u]):"}"===c&&(--r||(a=t.test(u)?[1,u]:n.test(u)?i(u):[0,u])),a?(f.push(a),u=""):u+=c}return f.push([0,u]),f}function i(t){for(var e=t.match(n),r=e[1],u="p"===e[2][0].toLowerCase(),i=o(t.replace(n,"")),f=i.length,s=[],c=[0,""],a=0;a<f-1;){var l=i[a++][1].trim(),v=o(i[a++][1]);"other"===l?c=v:u&&"="===l[0]?s.unshift([l,v]):s.push([l,v])}return[2,c,r,s,u]}module.exports=function(t){t=Object.assign({},t);var n={},e={},r="",o="",i=function(t){return t},f=function(){return""},s=function(e,r){return n[r]&&n[r][e]||t[r]&&"string"==typeof t[r][e]&&(n[r][e]=u(t[r][e]))},c=function t(n,e,r){for(var u=Object.keys(e),o=u.length,i=0;i<o;++i){var f=u[i],s=r+f;"object"==typeof e[f]?(t(n,e[f],s+"."),delete n[f]):n[s]=e[f]+""}},a=function t(n,e,r,u){for(var o=Object.keys(r),i=o.length,f=0;f<i;++f){var s=o[f],c=u+s;"object"==typeof r[s]?t(n,e,r[s],c+"."):n[c]!==r[s]&&(delete e[c],n[c]=r[s]+"")}};return{cache:n,store:t,t:function(t,n,u){var c,a=u||r;return a&&(c=s(t,a))?c(n,e[a],t,a,f):(a=o)&&(c=s(t,a))?c(n,e[a],t,a,f):i(t,n,u||r)},onMissingKey:function(t){i=t},onMissingVariable:function(t){f=t},locale:function(t){return t&&(r=t),r},fallback:function(t){return t&&(o=t),o},set:function(e,r){c(r,r,""),n[e]={},t[e]=r},unset:function(e){delete n[e],delete t[e]},extend:function(e,r){t[e]||(t[e]={}),n[e]||(n[e]={}),a(t[e],n[e],r,"")},plural:function(t,n){e[t]=n}}};
