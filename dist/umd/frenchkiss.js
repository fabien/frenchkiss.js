/**
 * @license @atelierfabien/frenchkiss 0.2.2
 * Copyright (c) 2018-2020 Koala Interactive, Inc.
 * License: MIT
 */
var e,n;e=this,n=function(){"use strict";var e=/^\s*\w+\s*$/,n=/^\s*(\w+)\s*,\s*(select|plural)\s*,/i,t=JSON.stringify,r=function(e){return'(p["'+e+'"]||(p["'+e+'"]=="0"?0:"'+e+'" in p?"":v("'+e+'",k,l)))'};function o(e){for(var n={},o=function e(n,o){var f=[];var i=n.length;for(var u=0;u<i;++u){var s=n[u],c=s[0],a=s[1],l="";if(0===c&&a)l=t(a);else if(1===c)l=r(a.trim());else if(2===c){for(var p=s[2],v=s[3],h=s[4],d=v.length,g=0;g<d;++g)h?"="===v[g][0][0]?l+='p["'+p+'"]=='+t(v[g][0].substr(1)):(o[p]=1,l+='m["'+p+'"]=='+t(v[g][0])):l+='p["'+p+'"]=='+t(v[g][0]),l+="?"+e(v[g][1],o)+":";l="("+l+e(a,o)+")"}l&&f.push(l)}return f.join("+")||'""'}(f(e),n),i=Object.keys(n),u=i.length,s=[],c=0;c<u;++c)s[c]=i[c]+':f(p["'+i[c]+'"])';return Function("a","f","k","l","v","var p=a||{}"+(u?",m=f?{"+s+"}:{}":"")+";return "+o)}function f(t){for(var r=0,o="",f=t.length,u=[],s=0;s<f;++s){var c=t[s],a=void 0;"{"===c?r++||(a=[0,o]):"}"===c&&(--r||(a=e.test(o)?[1,o]:n.test(o)?i(o):[0,o])),a?(u.push(a),o=""):o+=c}return u.push([0,o]),u}function i(e){for(var t=e.match(n),r=t[1],o="p"===t[2][0].toLowerCase(),i=f(e.replace(n,"")),u=i.length,s=[],c=[0,""],a=0;a<u-1;){var l=i[a++][1].trim(),p=f(i[a++][1]);"other"===l?c=p:o&&"="===l[0]?s.unshift([l,p]):s.push([l,p])}return[2,c,r,s,o]}return function(e){e=Object.assign({},e);var n={},t={},r="",f="",i=function(e){return e},u=function(){return""},s=function(t,r){return n[r]&&n[r][t]||e[r]&&"string"==typeof e[r][t]&&(n[r][t]=o(e[r][t]))},c=function e(n,t,r){for(var o=Object.keys(t),f=o.length,i=0;i<f;++i){var u=o[i],s=r+u;"object"==typeof t[u]?(e(n,t[u],s+"."),delete n[u]):n[s]=t[u]+""}},a=function e(n,t,r,o){for(var f=Object.keys(r),i=f.length,u=0;u<i;++u){var s=f[u],c=o+s;"object"==typeof r[s]?e(n,t,r[s],c+"."):n[c]!==r[s]&&(delete t[c],n[c]=r[s]+"")}};return{cache:n,store:e,t:function(e,n,o){var c,a=o||r;return a&&(c=s(e,a))?c(n,t[a],e,a,u):(a=f)&&(c=s(e,a))?c(n,t[a],e,a,u):i(e,n,o||r)},onMissingKey:function(e){i=e},onMissingVariable:function(e){u=e},locale:function(e){return e&&(r=e),r},fallback:function(e){return e&&(f=e),f},set:function(t,r){c(r,r,""),n[t]={},e[t]=r},unset:function(t){delete n[t],delete e[t]},extend:function(t,r){e[t]||(e[t]={}),n[t]||(n[t]={}),a(e[t],n[t],r,"")},plural:function(e,n){t[e]=n}}}},"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self)["@atelierfabien/frenchkiss"]=n();
