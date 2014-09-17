/*
	Copyright (c) 2004-2008, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

(function(){var _1=null;if((_1||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){var _2="",_3="",_4="",_5={},_6={};_1=_1||djConfig.scopeMap;for(var i=0;i<_1.length;i++){var _8=_1[i];_2+="var "+_8[0]+" = {}; "+_8[1]+" = "+_8[0]+";"+_8[1]+"._scopeName = '"+_8[1]+"';";_3+=(i==0?"":",")+_8[0];_4+=(i==0?"":",")+_8[1];_5[_8[0]]=_8[1];_6[_8[1]]=_8[0];}eval(_2+"dojo._scopeArgs = ["+_4+"];");dojo._scopePrefixArgs=_3;dojo._scopePrefix="(function("+_3+"){";dojo._scopeSuffix="})("+_4+")";dojo._scopeMap=_5;dojo._scopeMapRev=_6;}(function(){if(!this["console"]){this.console={};}var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];var i=0,tn;while((tn=cn[i++])){if(!console[tn]){(function(){var _c=tn+"";console[_c]=("log" in console)?function(){var a=Array.apply({},arguments);a.unshift(_c+":");console["log"](a.join(" "));}:function(){};})();}}if(typeof dojo=="undefined"){this.dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};}var d=dojo;if(typeof dijit=="undefined"){this.dijit={_scopeName:"dijit"};}if(typeof dojox=="undefined"){this.dojox={_scopeName:"dojox"};}if(!d._scopeArgs){d._scopeArgs=[dojo,dijit,dojox];}d.global=this;d.config={isDebug:false,debugAtAllCosts:false};if(typeof djConfig!="undefined"){for(var _f in djConfig){d.config[_f]=djConfig[_f];}}var _10=["Browser","Rhino","Spidermonkey","Mobile"];var t;while((t=_10.shift())){d["is"+t]=false;}dojo.locale=d.config.locale;var rev="$Rev: 15997 $".match(/\d+/);dojo.version={major:0,minor:0,patch:0,flag:"dev",revision:rev?+rev[0]:999999,toString:function(){with(d.version){return major+"."+minor+"."+patch+flag+" ("+revision+")";}}};if(typeof OpenAjax!="undefined"){OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());}dojo._mixin=function(obj,_14){var _15={};for(var x in _14){if(_15[x]===undefined||_15[x]!=_14[x]){obj[x]=_14[x];}}if(d["isIE"]&&_14){var p=_14.toString;if(typeof p=="function"&&p!=obj.toString&&p!=_15.toString&&p!="\nfunction toString() {\n    [native code]\n}\n"){obj.toString=_14.toString;}}return obj;};dojo.mixin=function(obj,_19){for(var i=1,l=arguments.length;i<l;i++){d._mixin(obj,arguments[i]);}return obj;};dojo._getProp=function(_1c,_1d,_1e){var obj=_1e||d.global;for(var i=0,p;obj&&(p=_1c[i]);i++){if(i==0&&this._scopeMap[p]){p=this._scopeMap[p];}obj=(p in obj?obj[p]:(_1d?obj[p]={}:undefined));}return obj;};dojo.setObject=function(_22,_23,_24){var _25=_22.split("."),p=_25.pop(),obj=d._getProp(_25,true,_24);return obj&&p?(obj[p]=_23):undefined;};dojo.getObject=function(_28,_29,_2a){return d._getProp(_28.split("."),_29,_2a);};dojo.exists=function(_2b,obj){return !!d.getObject(_2b,false,obj);};dojo["eval"]=function(_2d){return d.global.eval?d.global.eval(_2d):eval(_2d);};d.deprecated=d.experimental=function(){};})();(function(){var d=dojo;d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_2f){var mp=this._modulePrefixes;return !!(mp[_2f]&&mp[_2f].value);},_getModulePrefix:function(_31){var mp=this._modulePrefixes;if(this._moduleHasPrefix(_31)){return mp[_31].value;}return _31;},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});dojo._loadPath=function(_33,_34,cb){var uri=((_33.charAt(0)=="/"||_33.match(/^\w+:/))?"":this.baseUrl)+_33;try{return !_34?this._loadUri(uri,cb):this._loadUriAndCheck(uri,_34,cb);}catch(e){console.error(e);return false;}};dojo._loadUri=function(uri,cb){if(this._loadedUrls[uri]){return true;}var _39=this._getText(uri,true);if(!_39){return false;}this._loadedUrls[uri]=true;this._loadedUrls.push(uri);if(cb){_39="("+_39+")";}else{_39=this._scopePrefix+_39+this._scopeSuffix;}if(d.isMoz){_39+="\r\n//@ sourceURL="+uri;}var _3a=d["eval"](_39);if(cb){cb(_3a);}return true;};dojo._loadUriAndCheck=function(uri,_3c,cb){var ok=false;try{ok=this._loadUri(uri,cb);}catch(e){console.error("failed loading "+uri+" with error: "+e);}return !!(ok&&this._loadedModules[_3c]);};dojo.loaded=function(){this._loadNotifying=true;this._postLoad=true;var mll=d._loaders;this._loaders=[];for(var x=0;x<mll.length;x++){mll[x]();}this._loadNotifying=false;if(d._postLoad&&d._inFlightCount==0&&mll.length){d._callLoaded();}};dojo.unloaded=function(){var mll=this._unloaders;while(mll.length){(mll.pop())();}};d._onto=function(arr,obj,fn){if(!fn){arr.push(obj);}else{if(fn){var _45=(typeof fn=="string")?obj[fn]:fn;arr.push(function(){_45.call(obj);});}}};dojo.addOnLoad=function(obj,_47){d._onto(d._loaders,obj,_47);if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){d._callLoaded();}};var dca=d.config.addOnLoad;if(dca){d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);}dojo.addOnUnload=function(obj,_4a){d._onto(d._unloaders,obj,_4a);};dojo._modulesLoaded=function(){if(d._postLoad){return;}if(d._inFlightCount>0){console.warn("files still in flight!");return;}d._callLoaded();};dojo._callLoaded=function(){if(typeof setTimeout=="object"||(dojo.config.useXDomain&&d.isOpera)){if(dojo.isAIR){setTimeout(function(){dojo.loaded();},0);}else{setTimeout(dojo._scopeName+".loaded();",0);}}else{d.loaded();}};dojo._getModuleSymbols=function(_4b){var _4c=_4b.split(".");for(var i=_4c.length;i>0;i--){var _4e=_4c.slice(0,i).join(".");if((i==1)&&!this._moduleHasPrefix(_4e)){_4c[0]="../"+_4c[0];}else{var _4f=this._getModulePrefix(_4e);if(_4f!=_4e){_4c.splice(0,i,_4f);break;}}}return _4c;};dojo._global_omit_module_check=false;dojo.loadInit=function(_50){_50();};dojo._loadModule=dojo.require=function(_51,_52){_52=this._global_omit_module_check||_52;var _53=this._loadedModules[_51];if(_53){return _53;}var _54=this._getModuleSymbols(_51).join("/")+".js";var _55=(!_52)?_51:null;var ok=this._loadPath(_54,_55);if(!ok&&!_52){throw new Error("Could not load '"+_51+"'; last tried '"+_54+"'");}if(!_52&&!this._isXDomain){_53=this._loadedModules[_51];if(!_53){throw new Error("symbol '"+_51+"' is not defined after loading '"+_54+"'");}}return _53;};dojo.provide=function(_57){_57=_57+"";return (d._loadedModules[_57]=d.getObject(_57,true));};dojo.platformRequire=function(_58){var _59=_58.common||[];var _5a=_59.concat(_58[d._name]||_58["default"]||[]);for(var x=0;x<_5a.length;x++){var _5c=_5a[x];if(_5c.constructor==Array){d._loadModule.apply(d,_5c);}else{d._loadModule(_5c);}}};dojo.requireIf=function(_5d,_5e){if(_5d===true){var _5f=[];for(var i=1;i<arguments.length;i++){_5f.push(arguments[i]);}d.require.apply(d,_5f);}};dojo.requireAfterIf=d.requireIf;dojo.registerModulePath=function(_61,_62){d._modulePrefixes[_61]={name:_61,value:_62};};dojo.requireLocalization=function(_63,_64,_65,_66){d.require("dojo.i18n");d.i18n._requireLocalization.apply(d.hostenv,arguments);};var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");var ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");dojo._Url=function(){var n=null;var _a=arguments;var uri=[_a[0]];for(var i=1;i<_a.length;i++){if(!_a[i]){continue;}var _6d=new d._Url(_a[i]+"");var _6e=new d._Url(uri[0]+"");if(_6d.path==""&&!_6d.scheme&&!_6d.authority&&!_6d.query){if(_6d.fragment!=n){_6e.fragment=_6d.fragment;}_6d=_6e;}else{if(!_6d.scheme){_6d.scheme=_6e.scheme;if(!_6d.authority){_6d.authority=_6e.authority;if(_6d.path.charAt(0)!="/"){var _6f=_6e.path.substring(0,_6e.path.lastIndexOf("/")+1)+_6d.path;var _70=_6f.split("/");for(var j=0;j<_70.length;j++){if(_70[j]=="."){if(j==_70.length-1){_70[j]="";}else{_70.splice(j,1);j--;}}else{if(j>0&&!(j==1&&_70[0]=="")&&_70[j]==".."&&_70[j-1]!=".."){if(j==(_70.length-1)){_70.splice(j,1);_70[j-1]="";}else{_70.splice(j-1,2);j-=2;}}}}_6d.path=_70.join("/");}}}}uri=[];if(_6d.scheme){uri.push(_6d.scheme,":");}if(_6d.authority){uri.push("//",_6d.authority);}uri.push(_6d.path);if(_6d.query){uri.push("?",_6d.query);}if(_6d.fragment){uri.push("#",_6d.fragment);}}this.uri=uri.join("");var r=this.uri.match(ore);this.scheme=r[2]||(r[1]?"":n);this.authority=r[4]||(r[3]?"":n);this.path=r[5];this.query=r[7]||(r[6]?"":n);this.fragment=r[9]||(r[8]?"":n);if(this.authority!=n){r=this.authority.match(ire);this.user=r[3]||n;this.password=r[4]||n;this.host=r[6]||r[7];this.port=r[9]||n;}};dojo._Url.prototype.toString=function(){return this.uri;};dojo.moduleUrl=function(_73,url){var loc=d._getModuleSymbols(_73).join("/");if(!loc){return null;}if(loc.lastIndexOf("/")!=loc.length-1){loc+="/";}var _76=loc.indexOf(":");if(loc.charAt(0)!="/"&&(_76==-1||_76>loc.indexOf("/"))){loc=d.baseUrl+loc;}return new d._Url(loc,url);};})();if(dojo.config["baseUrl"]){dojo.baseUrl=dojo.config["baseUrl"];}else{dojo.baseUrl="./";}dojo.locale=dojo.locale||String(java.util.Locale.getDefault().toString().replace("_","-").toLowerCase());dojo._name="rhino";dojo.isRhino=true;if(typeof print=="function"){console.debug=print;}if(typeof dojo["byId"]=="undefined"){dojo.byId=function(id,doc){if(id&&(typeof id=="string"||id instanceof String)){if(!doc){doc=document;}return doc.getElementById(id);}return id;};}dojo._loadUri=function(uri,cb){try{var _7b=(new java.io.File(uri)).exists();if(!_7b){try{var _7c=(new java.net.URL(uri)).openStream();_7c.close();}catch(e){return false;}}if(cb){var _7d=(_7b?readText:readUri)(uri,"UTF-8");cb(eval("("+_7d+")"));}else{load(uri);}return true;}catch(e){console.debug("rhino load('"+uri+"') failed. Exception: "+e);return false;}};dojo.exit=function(_7e){quit(_7e);};dojo._rhinoCurrentScriptViaJava=function(_7f){var _80=Packages.org.mozilla.javascript.Context.getCurrentContext().getOptimizationLevel();var caw=new java.io.CharArrayWriter();var pw=new java.io.PrintWriter(caw);var exc=new java.lang.Exception();var s=caw.toString();var _85=s.match(/[^\(]*\.js\)/gi);if(!_85){throw Error("cannot parse printStackTrace output: "+s);}var _86=((typeof _7f!="undefined")&&(_7f))?_85[_7f+1]:_85[_85.length-1];_86=_85[3];if(!_86){_86=_85[1];}if(!_86){throw Error("could not find js file in printStackTrace output: "+s);}return _86;};function readText(_87,_88){_88=_88||"utf-8";var jf=new java.io.File(_87);var is=new java.io.FileInputStream(jf);return dj_readInputStream(is,_88);};function readUri(uri,_8c){var _8d=(new java.net.URL(uri)).openConnection();_8c=_8c||_8d.getContentEncoding()||"utf-8";var is=_8d.getInputStream();return dj_readInputStream(is,_8c);};function dj_readInputStream(is,_90){var _91=new java.io.BufferedReader(new java.io.InputStreamReader(is,_90));try{var sb=new java.lang.StringBuffer();var _93="";while((_93=_91.readLine())!==null){sb.append(_93);sb.append(java.lang.System.getProperty("line.separator"));}return sb.toString();}finally{_91.close();}};if((!dojo.config.libraryScriptUri)||(!dojo.config.libraryScriptUri.length)){try{dojo.config.libraryScriptUri=dojo._rhinoCurrentScriptViaJava(1);}catch(e){if(dojo.config["isDebug"]){print("\n");print("we have no idea where Dojo is located.");print("Please try loading rhino in a non-interpreted mode or set a");print("\n\tdjConfig.libraryScriptUri\n");print("Setting the dojo path to './'");print("This is probably wrong!");print("\n");print("Dojo will try to load anyway");}dojo.config.libraryScriptUri="./";}}dojo.doc=typeof (document)!="undefined"?document:null;dojo.body=function(){return document.body;};try{setTimeout;clearTimeout;}catch(e){dojo._timeouts=[];function clearTimeout(idx){if(!dojo._timeouts[idx]){return;}dojo._timeouts[idx].stop();};function setTimeout(_95,_96){var def={sleepTime:_96,hasSlept:false,run:function(){if(!this.hasSlept){this.hasSlept=true;java.lang.Thread.currentThread().sleep(this.sleepTime);}try{_95();}catch(e){console.debug("Error running setTimeout thread:"+e);}}};var _98=new java.lang.Runnable(def);var _99=new java.lang.Thread(_98);_99.start();return dojo._timeouts.push(_99)-1;};}if(dojo.config["modulePaths"]){for(var _9a in dojo.config["modulePaths"]){dojo.registerModulePath(_9a,dojo.config["modulePaths"][_9a]);}}if(!dojo._hasResource["dojo._base.lang"]){dojo._hasResource["dojo._base.lang"]=true;dojo.provide("dojo._base.lang");dojo.isString=function(it){return !!arguments.length&&it!=null&&(typeof it=="string"||it instanceof String);};dojo.isArray=function(it){return it&&(it instanceof Array||typeof it=="array");};dojo.isFunction=(function(){var _9d=function(it){return it&&(typeof it=="function"||it instanceof Function);};return dojo.isSafari?function(it){if(typeof it=="function"&&it=="[object NodeList]"){return false;}return _9d(it);}:_9d;})();dojo.isObject=function(it){return it!==undefined&&(it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));};dojo.isArrayLike=function(it){var d=dojo;return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));};dojo.isAlien=function(it){return it&&!dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));};dojo.extend=function(_a4,_a5){for(var i=1,l=arguments.length;i<l;i++){dojo._mixin(_a4.prototype,arguments[i]);}return _a4;};dojo._hitchArgs=function(_a8,_a9){var pre=dojo._toArray(arguments,2);var _ab=dojo.isString(_a9);return function(){var _ac=dojo._toArray(arguments);var f=_ab?(_a8||dojo.global)[_a9]:_a9;return f&&f.apply(_a8||this,pre.concat(_ac));};};dojo.hitch=function(_ae,_af){if(arguments.length>2){return dojo._hitchArgs.apply(dojo,arguments);}if(!_af){_af=_ae;_ae=null;}if(dojo.isString(_af)){_ae=_ae||dojo.global;if(!_ae[_af]){throw (["dojo.hitch: scope[\"",_af,"\"] is null (scope=\"",_ae,"\")"].join(""));}return function(){return _ae[_af].apply(_ae,arguments||[]);};}return !_ae?_af:function(){return _af.apply(_ae,arguments||[]);};};dojo.delegate=dojo._delegate=(function(){function TMP(){};return function(obj,_b1){TMP.prototype=obj;var tmp=new TMP();if(_b1){dojo._mixin(tmp,_b1);}return tmp;};})();(function(){var _b3=function(obj,_b5,_b6){return (_b6||[]).concat(Array.prototype.slice.call(obj,_b5||0));};var _b7=function(obj,_b9,_ba){var arr=_ba||[];for(var x=_b9||0;x<obj.length;x++){arr.push(obj[x]);}return arr;};dojo._toArray=(!dojo.isIE)?_b3:function(obj){return ((obj.item)?_b7:_b3).apply(this,arguments);};})();dojo.partial=function(_be){var arr=[null];return dojo.hitch.apply(dojo,arr.concat(dojo._toArray(arguments)));};dojo.clone=function(o){if(!o){return o;}if(dojo.isArray(o)){var r=[];for(var i=0;i<o.length;++i){r.push(dojo.clone(o[i]));}return r;}if(!dojo.isObject(o)){return o;}if(o.nodeType&&o.cloneNode){return o.cloneNode(true);}if(o instanceof Date){return new Date(o.getTime());}var r=new o.constructor();for(var i in o){if(!(i in r)||r[i]!=o[i]){r[i]=dojo.clone(o[i]);}}return r;};dojo.trim=function(str){return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");};}if(!dojo._hasResource["dojo._base.declare"]){dojo._hasResource["dojo._base.declare"]=true;dojo.provide("dojo._base.declare");dojo.declare=function(_c4,_c5,_c6){var dd=arguments.callee,_c8;if(dojo.isArray(_c5)){_c8=_c5;_c5=_c8.shift();}if(_c8){dojo.forEach(_c8,function(m){if(!m){throw (_c4+": mixin #"+i+" is null");}_c5=dd._delegate(_c5,m);});}var _ca=dd._delegate(_c5);_c6=_c6||{};_ca.extend(_c6);dojo.extend(_ca,{declaredClass:_c4,_constructor:_c6.constructor});_ca.prototype.constructor=_ca;return dojo.setObject(_c4,_ca);};dojo.mixin(dojo.declare,{_delegate:function(_cb,_cc){var bp=(_cb||0).prototype,mp=(_cc||0).prototype,dd=dojo.declare;var _d0=dd._makeCtor();dojo.mixin(_d0,{superclass:bp,mixin:mp,extend:dd._extend});if(_cb){_d0.prototype=dojo._delegate(bp);}dojo.extend(_d0,dd._core,mp||0,{_constructor:null,preamble:null});_d0.prototype.constructor=_d0;_d0.prototype.declaredClass=(bp||0).declaredClass+"_"+(mp||0).declaredClass;return _d0;},_extend:function(_d1){var i,fn;for(i in _d1){if(dojo.isFunction(fn=_d1[i])&&!0[i]){fn.nom=i;fn.ctor=this;}}dojo.extend(this,_d1);},_makeCtor:function(){return function(){this._construct(arguments);};},_core:{_construct:function(_d4){var c=_d4.callee,s=c.superclass,ct=s&&s.constructor,m=c.mixin,mct=m&&m.constructor,a=_d4,ii,fn;if(a[0]){if(((fn=a[0].preamble))){a=fn.apply(this,a)||a;}}if((fn=c.prototype.preamble)){a=fn.apply(this,a)||a;}if(ct&&ct.apply){ct.apply(this,a);}if(mct&&mct.apply){mct.apply(this,a);}if((ii=c.prototype._constructor)){ii.apply(this,_d4);}if(this.constructor.prototype==c.prototype&&(ct=this.postscript)){ct.apply(this,_d4);}},_findMixin:function(_dd){var c=this.constructor,p,m;while(c){p=c.superclass;m=c.mixin;if(m==_dd||(m instanceof _dd.constructor)){return p;}if(m&&m._findMixin&&(m=m._findMixin(_dd))){return m;}c=p&&p.constructor;}},_findMethod:function(_e1,_e2,_e3,has){var p=_e3,c,m,f;do{c=p.constructor;m=c.mixin;if(m&&(m=this._findMethod(_e1,_e2,m,has))){return m;}if((f=p[_e1])&&(has==(f==_e2))){return p;}p=c.superclass;}while(p);return !has&&(p=this._findMixin(_e3))&&this._findMethod(_e1,_e2,p,has);},inherited:function(_e9,_ea,_eb){var a=arguments;if(!dojo.isString(a[0])){_eb=_ea;_ea=_e9;_e9=_ea.callee.nom;}a=_eb||_ea;var c=_ea.callee,p=this.constructor.prototype,fn,mp;if(this[_e9]!=c||p[_e9]==c){mp=(c.ctor||0).superclass||this._findMethod(_e9,c,p,true);if(!mp){throw (this.declaredClass+": inherited method \""+_e9+"\" mismatch");}p=this._findMethod(_e9,c,mp,false);}fn=p&&p[_e9];if(!fn){throw (mp.declaredClass+": inherited method \""+_e9+"\" not found");}return fn.apply(this,a);}}});}if(!dojo._hasResource["dojo._base.connect"]){dojo._hasResource["dojo._base.connect"]=true;dojo.provide("dojo._base.connect");dojo._listener={getDispatcher:function(){return function(){var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;var r=t&&t.apply(this,arguments);var lls;if(!dojo.isRhino){}else{lls=[];for(var i in ls){lls[i]=ls[i];}}for(var i in lls){if(!(i in ap)){lls[i].apply(this,arguments);}}return r;};},add:function(_f8,_f9,_fa){_f8=_f8||dojo.global;var f=_f8[_f9];if(!f||!f._listeners){var d=dojo._listener.getDispatcher();d.target=f;d._listeners=[];f=_f8[_f9]=d;}return f._listeners.push(_fa);},remove:function(_fd,_fe,_ff){var f=(_fd||dojo.global)[_fe];if(f&&f._listeners&&_ff--){delete f._listeners[_ff];}}};dojo.connect=function(obj,_102,_103,_104,_105){var a=arguments,args=[],i=0;args.push(dojo.isString(a[0])?null:a[i++],a[i++]);var a1=a[i+1];args.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);for(var l=a.length;i<l;i++){args.push(a[i]);}return dojo._connect.apply(this,args);};dojo._connect=function(obj,_10b,_10c,_10d){var l=dojo._listener,h=l.add(obj,_10b,dojo.hitch(_10c,_10d));return [obj,_10b,h,l];};dojo.disconnect=function(_110){if(_110&&_110[0]!==undefined){dojo._disconnect.apply(this,_110);delete _110[0];}};dojo._disconnect=function(obj,_112,_113,_114){_114.remove(obj,_112,_113);};dojo._topics={};dojo.subscribe=function(_115,_116,_117){return [_115,dojo._listener.add(dojo._topics,_115,dojo.hitch(_116,_117))];};dojo.unsubscribe=function(_118){if(_118){dojo._listener.remove(dojo._topics,_118[0],_118[1]);}};dojo.publish=function(_119,args){var f=dojo._topics[_119];if(f){f.apply(this,args||[]);}};dojo.connectPublisher=function(_11c,obj,_11e){var pf=function(){dojo.publish(_11c,arguments);};return (_11e)?dojo.connect(obj,_11e,pf):dojo.connect(obj,pf);};}if(!dojo._hasResource["dojo._base.Deferred"]){dojo._hasResource["dojo._base.Deferred"]=true;dojo.provide("dojo._base.Deferred");dojo.Deferred=function(_120){this.chain=[];this.id=this._nextId();this.fired=-1;this.paused=0;this.results=[null,null];this.canceller=_120;this.silentlyCancelled=false;};dojo.extend(dojo.Deferred,{_nextId:(function(){var n=1;return function(){return n++;};})(),cancel:function(){var err;if(this.fired==-1){if(this.canceller){err=this.canceller(this);}else{this.silentlyCancelled=true;}if(this.fired==-1){if(!(err instanceof Error)){var res=err;err=new Error("Deferred Cancelled");err.dojoType="cancel";err.cancelResult=res;}this.errback(err);}}else{if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){this.results[0].cancel();}}},_resback:function(res){this.fired=((res instanceof Error)?1:0);this.results[this.fired]=res;this._fire();},_check:function(){if(this.fired!=-1){if(!this.silentlyCancelled){throw new Error("already called!");}this.silentlyCancelled=false;return;}},callback:function(res){this._check();this._resback(res);},errback:function(res){this._check();if(!(res instanceof Error)){res=new Error(res);}this._resback(res);},addBoth:function(cb,cbfn){var _129=dojo.hitch.apply(dojo,arguments);return this.addCallbacks(_129,_129);},addCallback:function(cb,cbfn){return this.addCallbacks(dojo.hitch.apply(dojo,arguments));},addErrback:function(cb,cbfn){return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));},addCallbacks:function(cb,eb){this.chain.push([cb,eb]);if(this.fired>=0){this._fire();}return this;},_fire:function(){var _130=this.chain;var _131=this.fired;var res=this.results[_131];var self=this;var cb=null;while((_130.length>0)&&(this.paused==0)){var f=_130.shift()[_131];if(!f){continue;}var func=function(){var ret=f(res);if(typeof ret!="undefined"){res=ret;}_131=((res instanceof Error)?1:0);if(res instanceof dojo.Deferred){cb=function(res){self._resback(res);self.paused--;if((self.paused==0)&&(self.fired>=0)){self._fire();}};this.paused++;}};if(dojo.config.isDebug){func.call(this);}else{try{func.call(this);}catch(err){_131=1;res=err;}}}this.fired=_131;this.results[_131]=res;if((cb)&&(this.paused)){res.addBoth(cb);}}});}if(!dojo._hasResource["dojo._base.json"]){dojo._hasResource["dojo._base.json"]=true;dojo.provide("dojo._base.json");dojo.fromJson=function(json){return eval("("+json+")");};dojo._escapeString=function(str){return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");};dojo.toJsonIndentStr="\t";dojo.toJson=function(it,_13c,_13d){if(it===undefined){return "undefined";}var _13e=typeof it;if(_13e=="number"||_13e=="boolean"){return it+"";}if(it===null){return "null";}if(dojo.isString(it)){return dojo._escapeString(it);}var _13f=arguments.callee;var _140;_13d=_13d||"";var _141=_13c?_13d+dojo.toJsonIndentStr:"";var tf=it.__json__||it.json;if(dojo.isFunction(tf)){_140=tf.call(it);if(it!==_140){return _13f(_140,_13c,_141);}}if(it.nodeType&&it.cloneNode){throw new Error("Can't serialize DOM nodes");}var sep=_13c?" ":"";var _144=_13c?"\n":"";if(dojo.isArray(it)){var res=dojo.map(it,function(obj){var val=_13f(obj,_13c,_141);if(typeof val!="string"){val="undefined";}return _144+_141+val;});return "["+res.join(","+sep)+_144+_13d+"]";}if(_13e=="function"){return null;}var _148=[],key;for(key in it){var _14a,val;if(typeof key=="number"){_14a="\""+key+"\"";}else{if(typeof key=="string"){_14a=dojo._escapeString(key);}else{continue;}}val=_13f(it[key],_13c,_141);if(typeof val!="string"){continue;}_148.push(_144+_141+_14a+":"+sep+val);}return "{"+_148.join(","+sep)+_144+_13d+"}";};}if(!dojo._hasResource["dojo._base.array"]){dojo._hasResource["dojo._base.array"]=true;dojo.provide("dojo._base.array");(function(){var _14c=function(arr,obj,cb){return [dojo.isString(arr)?arr.split(""):arr,obj||dojo.global,dojo.isString(cb)?new Function("item","index","array",cb):cb];};dojo.mixin(dojo,{indexOf:function(_150,_151,_152,_153){var step=1,end=_150.length||0,i=0;if(_153){i=end-1;step=end=-1;}if(_152!=undefined){i=_152;}if((_153&&i>end)||i<end){for(;i!=end;i+=step){if(_150[i]==_151){return i;}}}return -1;},lastIndexOf:function(_156,_157,_158){return dojo.indexOf(_156,_157,_158,true);},forEach:function(arr,_15a,_15b){if(!arr||!arr.length){return;}var _p=_14c(arr,_15b,_15a);arr=_p[0];for(var i=0,l=arr.length;i<l;++i){_p[2].call(_p[1],arr[i],i,arr);}},_everyOrSome:function(_15f,arr,_161,_162){var _p=_14c(arr,_162,_161);arr=_p[0];for(var i=0,l=arr.length;i<l;++i){var _166=!!_p[2].call(_p[1],arr[i],i,arr);if(_15f^_166){return _166;}}return _15f;},every:function(arr,_168,_169){return this._everyOrSome(true,arr,_168,_169);},some:function(arr,_16b,_16c){return this._everyOrSome(false,arr,_16b,_16c);},map:function(arr,_16e,_16f){var _p=_14c(arr,_16f,_16e);arr=_p[0];var _171=(arguments[3]?(new arguments[3]()):[]);for(var i=0,l=arr.length;i<l;++i){_171.push(_p[2].call(_p[1],arr[i],i,arr));}return _171;},filter:function(arr,_175,_176){var _p=_14c(arr,_176,_175);arr=_p[0];var _178=[];for(var i=0,l=arr.length;i<l;++i){if(_p[2].call(_p[1],arr[i],i,arr)){_178.push(arr[i]);}}return _178;}});})();}if(!dojo._hasResource["dojo._base.Color"]){dojo._hasResource["dojo._base.Color"]=true;dojo.provide("dojo._base.Color");dojo.Color=function(_17b){if(_17b){this.setColor(_17b);}};dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){var t=this;t.r=r;t.g=g;t.b=b;t.a=a;},setColor:function(_181){var d=dojo;if(d.isString(_181)){d.colorFromString(_181,this);}else{if(d.isArray(_181)){d.colorFromArray(_181,this);}else{this._set(_181.r,_181.g,_181.b,_181.a);if(!(_181 instanceof d.Color)){this.sanitize();}}}return this;},sanitize:function(){return this;},toRgb:function(){var t=this;return [t.r,t.g,t.b];},toRgba:function(){var t=this;return [t.r,t.g,t.b,t.a];},toHex:function(){var arr=dojo.map(["r","g","b"],function(x){var s=this[x].toString(16);return s.length<2?"0"+s:s;},this);return "#"+arr.join("");},toCss:function(_188){var t=this,rgb=t.r+", "+t.g+", "+t.b;return (_188?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";},toString:function(){return this.toCss(true);}});dojo.blendColors=function(_18b,end,_18d,obj){var d=dojo,t=obj||new dojo.Color();d.forEach(["r","g","b","a"],function(x){t[x]=_18b[x]+(end[x]-_18b[x])*_18d;if(x!="a"){t[x]=Math.round(t[x]);}});return t.sanitize();};dojo.colorFromRgb=function(_192,obj){var m=_192.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);};dojo.colorFromHex=function(_195,obj){var d=dojo,t=obj||new d.Color(),bits=(_195.length==4)?4:8,mask=(1<<bits)-1;_195=Number("0x"+_195.substr(1));if(isNaN(_195)){return null;}d.forEach(["b","g","r"],function(x){var c=_195&mask;_195>>=bits;t[x]=bits==4?17*c:c;});t.a=1;return t;};dojo.colorFromArray=function(a,obj){var t=obj||new dojo.Color();t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));if(isNaN(t.a)){t.a=1;}return t.sanitize();};dojo.colorFromString=function(str,obj){var a=dojo.Color.named[str];return a&&dojo.colorFromArray(a,obj)||dojo.colorFromRgb(str,obj)||dojo.colorFromHex(str,obj);};}if(!dojo._hasResource["dojo._base"]){dojo._hasResource["dojo._base"]=true;dojo.provide("dojo._base");dojo.requireIf(dojo.isBrowser,"dojo._base.browser");}if(dojo.config.afterOnLoad&&dojo.isBrowser){window.setTimeout(dojo._fakeLoadInit,1000);}})();
