"use strict";!function(t){if(!t.fetch){var s={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(s.arrayBuffer)var e=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],r=function(t){return t&&DataView.prototype.isPrototypeOf(t)},o=ArrayBuffer.isView||function(t){return t&&-1<e.indexOf(Object.prototype.toString.call(t))};f.prototype.append=function(t,e){t=a(t),e=h(e);var r=this.map[t];this.map[t]=r?r+","+e:e},f.prototype.delete=function(t){delete this.map[a(t)]},f.prototype.get=function(t){return t=a(t),this.has(t)?this.map[t]:null},f.prototype.has=function(t){return this.map.hasOwnProperty(a(t))},f.prototype.set=function(t,e){this.map[a(t)]=h(e)},f.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},f.prototype.keys=function(){var r=[];return this.forEach(function(t,e){r.push(e)}),u(r)},f.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),u(e)},f.prototype.entries=function(){var r=[];return this.forEach(function(t,e){r.push([e,t])}),u(r)},s.iterable&&(f.prototype[Symbol.iterator]=f.prototype.entries);var i=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];b.prototype.clone=function(){return new b(this,{body:this._bodyInit})},c.call(b.prototype),c.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new f(this.headers),url:this.url})},w.error=function(){var t=new w(null,{status:0,statusText:""});return t.type="error",t};var n=[301,302,303,307,308];w.redirect=function(t,e){if(-1===n.indexOf(e))throw new RangeError("Invalid status code");return new w(null,{status:e,headers:{location:t}})},t.Headers=f,t.Request=b,t.Response=w,t.fetch=function(r,n){return new Promise(function(o,t){var e=new b(r,n),i=new XMLHttpRequest;i.onload=function(){var t,n,e={status:i.status,statusText:i.statusText,headers:(t=i.getAllResponseHeaders()||"",n=new f,t.split(/\r?\n/).forEach(function(t){var e=t.split(":"),r=e.shift().trim();if(r){var o=e.join(":").trim();n.append(r,o)}}),n)};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var r="response"in i?i.response:i.responseText;o(new w(r,e))},i.onerror=function(){t(new TypeError("Network request failed"))},i.ontimeout=function(){t(new TypeError("Network request failed"))},i.open(e.method,e.url,!0),"include"===e.credentials&&(i.withCredentials=!0),"responseType"in i&&s.blob&&(i.responseType="blob"),e.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send(void 0===e._bodyInit?null:e._bodyInit)})},t.fetch.polyfill=!0}function a(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function h(t){return"string"!=typeof t&&(t=String(t)),t}function u(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return s.iterable&&(t[Symbol.iterator]=function(){return t}),t}function f(e){this.map={},e instanceof f?e.forEach(function(t,e){this.append(e,t)},this):Array.isArray(e)?e.forEach(function(t){this.append(t[0],t[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function d(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function y(r){return new Promise(function(t,e){r.onload=function(){t(r.result)},r.onerror=function(){e(r.error)}})}function l(t){var e=new FileReader,r=y(e);return e.readAsArrayBuffer(t),r}function p(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function c(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t)if("string"==typeof t)this._bodyText=t;else if(s.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(s.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(s.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(s.arrayBuffer&&s.blob&&r(t))this._bodyArrayBuffer=p(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!s.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!o(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=p(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):s.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},s.blob&&(this.blob=function(){var t=d(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?d(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(l)}),this.text=function(){var t,e,r,o=d(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=y(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},s.formData&&(this.formData=function(){return this.text().then(m)}),this.json=function(){return this.text().then(JSON.parse)},this}function b(t,e){var r,o,n=(e=e||{}).body;if(t instanceof b){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new f(t.headers)),this.method=t.method,this.mode=t.mode,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new f(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),-1<i.indexOf(o)?o:r),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function m(t){var n=new FormData;return t.trim().split("&").forEach(function(t){if(t){var e=t.split("="),r=e.shift().replace(/\+/g," "),o=e.join("=").replace(/\+/g," ");n.append(decodeURIComponent(r),decodeURIComponent(o))}}),n}function w(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new f(e.headers),this.url=e.url||"",this._initBody(t)}}("undefined"!=typeof self?self:void 0);
"use strict";!function(t){if(!t.fetch){var s={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(s.arrayBuffer)var e=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],r=function(t){return t&&DataView.prototype.isPrototypeOf(t)},o=ArrayBuffer.isView||function(t){return t&&-1<e.indexOf(Object.prototype.toString.call(t))};f.prototype.append=function(t,e){t=a(t),e=h(e);var r=this.map[t];this.map[t]=r?r+","+e:e},f.prototype.delete=function(t){delete this.map[a(t)]},f.prototype.get=function(t){return t=a(t),this.has(t)?this.map[t]:null},f.prototype.has=function(t){return this.map.hasOwnProperty(a(t))},f.prototype.set=function(t,e){this.map[a(t)]=h(e)},f.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},f.prototype.keys=function(){var r=[];return this.forEach(function(t,e){r.push(e)}),u(r)},f.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),u(e)},f.prototype.entries=function(){var r=[];return this.forEach(function(t,e){r.push([e,t])}),u(r)},s.iterable&&(f.prototype[Symbol.iterator]=f.prototype.entries);var i=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];b.prototype.clone=function(){return new b(this,{body:this._bodyInit})},c.call(b.prototype),c.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new f(this.headers),url:this.url})},w.error=function(){var t=new w(null,{status:0,statusText:""});return t.type="error",t};var n=[301,302,303,307,308];w.redirect=function(t,e){if(-1===n.indexOf(e))throw new RangeError("Invalid status code");return new w(null,{status:e,headers:{location:t}})},t.Headers=f,t.Request=b,t.Response=w,t.fetch=function(r,n){return new Promise(function(o,t){var e=new b(r,n),i=new XMLHttpRequest;i.onload=function(){var t,n,e={status:i.status,statusText:i.statusText,headers:(t=i.getAllResponseHeaders()||"",n=new f,t.split(/\r?\n/).forEach(function(t){var e=t.split(":"),r=e.shift().trim();if(r){var o=e.join(":").trim();n.append(r,o)}}),n)};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var r="response"in i?i.response:i.responseText;o(new w(r,e))},i.onerror=function(){t(new TypeError("Network request failed"))},i.ontimeout=function(){t(new TypeError("Network request failed"))},i.open(e.method,e.url,!0),"include"===e.credentials&&(i.withCredentials=!0),"responseType"in i&&s.blob&&(i.responseType="blob"),e.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send(void 0===e._bodyInit?null:e._bodyInit)})},t.fetch.polyfill=!0}function a(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function h(t){return"string"!=typeof t&&(t=String(t)),t}function u(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return s.iterable&&(t[Symbol.iterator]=function(){return t}),t}function f(e){this.map={},e instanceof f?e.forEach(function(t,e){this.append(e,t)},this):Array.isArray(e)?e.forEach(function(t){this.append(t[0],t[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function d(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function y(r){return new Promise(function(t,e){r.onload=function(){t(r.result)},r.onerror=function(){e(r.error)}})}function l(t){var e=new FileReader,r=y(e);return e.readAsArrayBuffer(t),r}function p(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function c(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t)if("string"==typeof t)this._bodyText=t;else if(s.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(s.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(s.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(s.arrayBuffer&&s.blob&&r(t))this._bodyArrayBuffer=p(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!s.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!o(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=p(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):s.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},s.blob&&(this.blob=function(){var t=d(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?d(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(l)}),this.text=function(){var t,e,r,o=d(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=y(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},s.formData&&(this.formData=function(){return this.text().then(m)}),this.json=function(){return this.text().then(JSON.parse)},this}function b(t,e){var r,o,n=(e=e||{}).body;if(t instanceof b){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new f(t.headers)),this.method=t.method,this.mode=t.mode,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new f(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),-1<i.indexOf(o)?o:r),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function m(t){var n=new FormData;return t.trim().split("&").forEach(function(t){if(t){var e=t.split("="),r=e.shift().replace(/\+/g," "),o=e.join("=").replace(/\+/g," ");n.append(decodeURIComponent(r),decodeURIComponent(o))}}),n}function w(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new f(e.headers),this.url=e.url||"",this._initBody(t)}}("undefined"!=typeof self?self:void 0);
"use strict";!function(){function u(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function i(n,o,r){var i,e=new Promise(function(e,t){u(i=n[o].apply(n,r)).then(e,t)});return e.request=i,e}function e(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function t(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return i(this[n],e,arguments)})})}function n(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function o(e,o,t,n){n.forEach(function(n){n in t.prototype&&(e.prototype[n]=function(){return e=this[o],(t=i(e,n,arguments)).then(function(e){if(e)return new c(e,t.request)});var e,t})})}function r(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function a(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function p(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new a(n)}function f(e){this._db=e}e(r,"_index",["name","keyPath","multiEntry","unique"]),t(r,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),o(r,"_index",IDBIndex,["openCursor","openKeyCursor"]),e(c,"_cursor",["direction","key","primaryKey","value"]),t(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(c.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),u(t._request).then(function(e){if(e)return new c(e,t._request)})})})}),s.prototype.createIndex=function(){return new r(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new r(this._store.index.apply(this._store,arguments))},e(s,"_store",["name","keyPath","indexNames","autoIncrement"]),t(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),o(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),n(s,"_store",IDBObjectStore,["deleteIndex"]),a.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},e(a,"_tx",["objectStoreNames","mode"]),n(a,"_tx",IDBTransaction,["abort"]),p.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},e(p,"_db",["name","version","objectStoreNames"]),n(p,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new a(this._db.transaction.apply(this._db,arguments))},e(f,"_db",["name","version","objectStoreNames"]),n(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(i){[s,r].forEach(function(e){e.prototype[i.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),n=t[t.length-1],o=this._store||this._index,r=o[i].apply(o,t.slice(0,-1));r.onsuccess=function(){n(r.result)}}})}),[r,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var o=this,r=[];return new Promise(function(t){o.iterateCursor(e,function(e){e?(r.push(e.value),void 0===n||r.length!=n?e.continue():t(r)):t(r)})})})});var d={open:function(e,t,n){var o=i(indexedDB,"open",[e,t]),r=o.request;return r.onupgradeneeded=function(e){n&&n(new p(r.result,e.oldVersion,r.transaction))},o.then(function(e){return new f(e)})},delete:function(e){return i(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof module?(module.exports=d,module.exports.default=module.exports):self.idb=d}();
"use strict";!function(){function u(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function i(n,o,r){var i,e=new Promise(function(e,t){u(i=n[o].apply(n,r)).then(e,t)});return e.request=i,e}function e(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function t(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return i(this[n],e,arguments)})})}function n(t,n,o,e){e.forEach(function(e){e in o.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function o(e,o,t,n){n.forEach(function(n){n in t.prototype&&(e.prototype[n]=function(){return e=this[o],(t=i(e,n,arguments)).then(function(e){if(e)return new c(e,t.request)});var e,t})})}function r(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function a(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function p(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new a(n)}function f(e){this._db=e}e(r,"_index",["name","keyPath","multiEntry","unique"]),t(r,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),o(r,"_index",IDBIndex,["openCursor","openKeyCursor"]),e(c,"_cursor",["direction","key","primaryKey","value"]),t(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(c.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),u(t._request).then(function(e){if(e)return new c(e,t._request)})})})}),s.prototype.createIndex=function(){return new r(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new r(this._store.index.apply(this._store,arguments))},e(s,"_store",["name","keyPath","indexNames","autoIncrement"]),t(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),o(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),n(s,"_store",IDBObjectStore,["deleteIndex"]),a.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},e(a,"_tx",["objectStoreNames","mode"]),n(a,"_tx",IDBTransaction,["abort"]),p.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},e(p,"_db",["name","version","objectStoreNames"]),n(p,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new a(this._db.transaction.apply(this._db,arguments))},e(f,"_db",["name","version","objectStoreNames"]),n(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(i){[s,r].forEach(function(e){e.prototype[i.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),n=t[t.length-1],o=this._store||this._index,r=o[i].apply(o,t.slice(0,-1));r.onsuccess=function(){n(r.result)}}})}),[r,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var o=this,r=[];return new Promise(function(t){o.iterateCursor(e,function(e){e?(r.push(e.value),void 0===n||r.length!=n?e.continue():t(r)):t(r)})})})});var d={open:function(e,t,n){var o=i(indexedDB,"open",[e,t]),r=o.request;return r.onupgradeneeded=function(e){n&&n(new p(r.result,e.oldVersion,r.transaction))},o.then(function(e){return new f(e)})},delete:function(e){return i(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof module?(module.exports=d,module.exports.default=module.exports):self.idb=d}();
"use strict";var _createClass=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var dbPromise=window.idb.open("restaurant-db",1,function(e){e.objectStoreNames.contains("restaurants")||e.createObjectStore("restaurants",{keyPath:"id"}),e.objectStoreNames.contains("reviews")||e.createObjectStore("reviews",{keyPath:"id"})}),DBHelper=function(){function i(){_classCallCheck(this,i)}return _createClass(i,null,[{key:"fetchRestaurants",value:function(t){fetch(i.DATABASE_URL+"/restaurants").then(function(e){return e.json()}).then(function(r){dbPromise.then(function(e){var t=e.transaction("restaurants","readwrite"),n=t.objectStore("restaurants");return r.map(function(e){n.put(e)}),t.complete}),t(null,r)}).catch(function(e){dbPromise.then(function(e){e.transaction("restaurants","readwrite").objectStore("restaurants").getAll().then(function(e){t(null,e)})})})}},{key:"fetchRestaurantReviews",value:function(){fetch(i.DATABASE_URL+"/reviews/").then(function(e){return e.json()}).then(function(r){dbPromise.then(function(e){var t=e.transaction("reviews","readwrite"),n=t.objectStore("reviews");return r.map(function(e){n.put(e)}),t.complete})}).catch(function(e){})}},{key:"fetchReviewsByRestaurantId",value:function(e,t){console.log("fetching for ",e),fetch(i.DATABASE_URL+"/reviews/?restaurant_id="+e).then(function(e){return console.log("this is the response",e),e.json()}).then(function(e){t(null,e)}).catch(function(e){t(e,void 0)})}},{key:"fetchReviewsByRestaurantIdFromIDB",value:function(n,r){dbPromise.then(function(e){e.transaction("reviews","readwrite").objectStore("reviews").getAll().then(function(e){var t=e.filter(function(e){return e.restaurant_id=n});r(null,t)})})}},{key:"fetchRestaurantById",value:function(t,n){fetch(i.DATABASE_URL+"/restaurants/"+t).then(function(e){return e.json()}).then(function(e){n(null,e)}).catch(function(e){dbPromise.then(function(e){e.transaction("restaurants","readwrite").objectStore("restaurants").get(Number(t)).then(function(e){n(null,e)})})})}},{key:"fetchRestaurantByCuisine",value:function(r,u){i.fetchRestaurants(function(e,t){if(e)u(e,null);else{var n=t.filter(function(e){return e.cuisine_type==r});u(null,n)}})}},{key:"fetchRestaurantByNeighborhood",value:function(r,u){i.fetchRestaurants(function(e,t){if(e)u(e,null);else{var n=t.filter(function(e){return e.neighborhood==r});u(null,n)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(r,u,a){i.fetchRestaurants(function(e,t){if(e)a(e,null);else{var n=t;"all"!=r&&(n=n.filter(function(e){return e.cuisine_type==r})),"all"!=u&&(n=n.filter(function(e){return e.neighborhood==u})),a(null,n)}})}},{key:"fetchNeighborhoods",value:function(u){i.fetchRestaurants(function(e,n){if(e)u(e,null);else{var r=n.map(function(e,t){return n[t].neighborhood}),t=r.filter(function(e,t){return r.indexOf(e)==t});u(null,t)}})}},{key:"fetchCuisines",value:function(u){i.fetchRestaurants(function(e,n){if(e)u(e,null);else{var r=n.map(function(e,t){return n[t].cuisine_type}),t=r.filter(function(e,t){return r.indexOf(e)==t});u(null,t)}})}},{key:"urlForRestaurant",value:function(e){return"./restaurants?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return"img/"+e.id+"-desktop.jpg"}},{key:"imageUrlForRestaurantMobile",value:function(e){return"img/"+e.id+"-mobile.jpg"}},{key:"mapMarkerForRestaurant",value:function(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:i.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"http://localhost:1337"}}]),i}();
"use strict";var _createClass=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var dbPromise=window.idb.open("restaurant-db",1,function(e){e.objectStoreNames.contains("restaurants")||e.createObjectStore("restaurants",{keyPath:"id"}),e.objectStoreNames.contains("reviews")||e.createObjectStore("reviews",{keyPath:"id"})}),DBHelper=function(){function i(){_classCallCheck(this,i)}return _createClass(i,null,[{key:"fetchRestaurants",value:function(t){fetch(i.DATABASE_URL+"/restaurants").then(function(e){return e.json()}).then(function(r){dbPromise.then(function(e){var t=e.transaction("restaurants","readwrite"),n=t.objectStore("restaurants");return r.map(function(e){n.put(e)}),t.complete}),t(null,r)}).catch(function(e){dbPromise.then(function(e){e.transaction("restaurants","readwrite").objectStore("restaurants").getAll().then(function(e){t(null,e)})})})}},{key:"fetchRestaurantReviews",value:function(){fetch(i.DATABASE_URL+"/reviews/").then(function(e){return e.json()}).then(function(r){dbPromise.then(function(e){var t=e.transaction("reviews","readwrite"),n=t.objectStore("reviews");return r.map(function(e){n.put(e)}),t.complete})}).catch(function(e){})}},{key:"fetchReviewsByRestaurantId",value:function(e,t){console.log("fetching for ",e),fetch(i.DATABASE_URL+"/reviews/?restaurant_id="+e).then(function(e){return console.log("this is the response",e),e.json()}).then(function(e){t(null,e)}).catch(function(e){t(e,void 0)})}},{key:"fetchReviewsByRestaurantIdFromIDB",value:function(n,r){dbPromise.then(function(e){e.transaction("reviews","readwrite").objectStore("reviews").getAll().then(function(e){var t=e.filter(function(e){return e.restaurant_id=n});r(null,t)})})}},{key:"fetchRestaurantById",value:function(t,n){fetch(i.DATABASE_URL+"/restaurants/"+t).then(function(e){return e.json()}).then(function(e){n(null,e)}).catch(function(e){dbPromise.then(function(e){e.transaction("restaurants","readwrite").objectStore("restaurants").get(Number(t)).then(function(e){n(null,e)})})})}},{key:"fetchRestaurantByCuisine",value:function(r,u){i.fetchRestaurants(function(e,t){if(e)u(e,null);else{var n=t.filter(function(e){return e.cuisine_type==r});u(null,n)}})}},{key:"fetchRestaurantByNeighborhood",value:function(r,u){i.fetchRestaurants(function(e,t){if(e)u(e,null);else{var n=t.filter(function(e){return e.neighborhood==r});u(null,n)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(r,u,a){i.fetchRestaurants(function(e,t){if(e)a(e,null);else{var n=t;"all"!=r&&(n=n.filter(function(e){return e.cuisine_type==r})),"all"!=u&&(n=n.filter(function(e){return e.neighborhood==u})),a(null,n)}})}},{key:"fetchNeighborhoods",value:function(u){i.fetchRestaurants(function(e,n){if(e)u(e,null);else{var r=n.map(function(e,t){return n[t].neighborhood}),t=r.filter(function(e,t){return r.indexOf(e)==t});u(null,t)}})}},{key:"fetchCuisines",value:function(u){i.fetchRestaurants(function(e,n){if(e)u(e,null);else{var r=n.map(function(e,t){return n[t].cuisine_type}),t=r.filter(function(e,t){return r.indexOf(e)==t});u(null,t)}})}},{key:"urlForRestaurant",value:function(e){return"./restaurants?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return"img/"+e.id+"-desktop.jpg"}},{key:"imageUrlForRestaurantMobile",value:function(e){return"img/"+e.id+"-mobile.jpg"}},{key:"mapMarkerForRestaurant",value:function(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:i.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"http://localhost:1337"}}]),i}();
"use strict";var map,restaurant=void 0;window.onload=function(){};var SAMPLE_REVIEW={comments:"Five star food, two star atmosphere. I would definitely get takeout from this place - but dont think I have the energy to deal with the hipster ridiculousness again. By the time we left the wait was two hours long.",createdAt:1504095567183,id:4,name:"Steph",rating:4,restaurant_id:2,updatedAt:1504095567183};function fetchRestaurantFromURL(n){if(self.restaurant)n(null,self.restaurant);else{var e=getParameterByName("id");if(e)DBHelper.fetchRestaurantById(e,function(e,t){(self.restaurant=t)?(fillRestaurantHTML(),n(null,t)):console.error(e)});else{n("No restaurant id in URL",null)}}}function fillRestaurantHTML(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant;document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;var t=document.getElementById("restaurant-img");t.className="restaurant-img",t.alt="Restaurant of "+e.name+" with cuisine type of "+e.cuisine_type,t.src=DBHelper.imageUrlForRestaurant(e),document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,e.operating_hours&&fillRestaurantHoursHTML(),fetchRestaurantReviews()}function fillRestaurantHoursHTML(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.operating_hours,t=document.getElementById("restaurant-hours");for(var n in e){var a=document.createElement("tr"),r=document.createElement("th");r.innerHTML=n,a.appendChild(r);var i=document.createElement("td");i.innerHTML=e[n],a.appendChild(i),t.appendChild(a)}}function fetchRestaurantReviews(){var n=getParameterByName("id");DBHelper.fetchReviewsByRestaurantId(n,function(e,t){e?(console.log("there has been an error",e),DBHelper.fetchReviewsByRestaurantIdFromIDB(n,function(e){fillReviewsHTML(e)})):fillReviewsHTML(t)})}function fillReviewsHTML(e){console.log("filling up the revievews html ",e);var t=document.getElementById("reviews-container"),n=document.createElement("h3");if(n.innerHTML="Reviews",t.appendChild(n),!e){var a=document.createElement("p");return a.innerHTML="No reviews yet!",void t.appendChild(a)}var r=document.getElementById("reviews-list");e.forEach(function(e){r.appendChild(createReviewHTML(e))}),t.appendChild(r);var i=document.createElement("div");i.id="review-add";var o=document.createElement("a");o.innerHTML="Add a Review";var l=document.createElement("button");l.id="addReview",l.appendChild(o),l.addEventListener("click",function(){console.log("clicked")});var d=document.createElement("div");d.className="addReviewFormContainer",d.innerHTML=createForm(),i.appendChild(l),i.appendChild(d),t.appendChild(i)}function createForm(){return'  <form>\n\n    <div id="add-review-container">\n  \n      <div class="header">\n        <input  type="text" name="name" placeholder=\'Your Name\' id="reviewerName">\n        <span id="add-review-close"> X </span>\n      </div>\n  \n      <div class="body">\n      <div class="rating-div">\n        <label for="rating">Rating :</label>\n        <select name="rating" id="reviewerRating">\n          <option value="1">1</option>\n          <option value="2">2</option>\n          <option value="3">3</option>\n          <option value="4">4</option>\n          <option value="5">5</option>\n        </select>\n      </div>\n        <textarea name="comments"  placeholder=\'Write a review\' id="reviewerComments" cols="30" rows="10" maxlength="150"></textarea>\n      </div>\n      \n      <button id="formSubmittion">Submit Review</button>\n  \n    </div>\n  \n  </form>'}function createReviewHTML(e){var t=document.createElement("li"),n=document.createElement("div");n.className="review-header";var a=document.createElement("p");a.innerHTML=e.name,a.className="review-name",n.appendChild(a);var r=document.createElement("p");r.className="review-date";var i=new Date(e.updatedAt);r.innerHTML=i.getDay()+" / "+i.getMonth()+" / "+i.getFullYear(),n.appendChild(r),t.appendChild(n);var o=document.createElement("p");o.innerHTML="Rating: "+e.rating,o.className="review-rating",t.appendChild(o);var l=document.createElement("p");return l.innerHTML=e.comments,l.className="review-text",t.appendChild(l),t}function fillBreadcrumb(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant,t=document.getElementById("breadcrumb"),n=document.createElement("li");n.innerHTML=e.name,n.setAttribute("aria-current","page"),t.appendChild(n)}function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}window.initMap=function(){fetchRestaurantFromURL(function(e,t){e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:t.latlng,scrollwheel:!1}),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.map))})};