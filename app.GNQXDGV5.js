var Ae=Object.freeze({PX:"px",NX:"nx",PY:"py",NY:"ny",PZ:"pz",NZ:"nz"}),Kd=Object.freeze({[Ae.PX]:{x:1,y:0,z:0},[Ae.NX]:{x:-1,y:0,z:0},[Ae.PY]:{x:0,y:1,z:0},[Ae.NY]:{x:0,y:-1,z:0},[Ae.PZ]:{x:0,y:0,z:1},[Ae.NZ]:{x:0,y:0,z:-1}}),XS=Object.freeze({WHITE:"U",YELLOW:"D",GREEN:"F",BLUE:"B",RED:"R",ORANGE:"L"}),Ys=class i{constructor(e,t,n){this.position={x:e,y:t,z:n},this.faces={[Ae.PX]:null,[Ae.NX]:null,[Ae.PY]:null,[Ae.NY]:null,[Ae.PZ]:null,[Ae.NZ]:null}}getId(){return`cubie_${this.position.x}_${this.position.y}_${this.position.z}`}setFaceColor(e,t){this.faces[e]=t}applyMatrix(e){let t=this.position,n=El(e,t);this.position={x:jo(n.x),y:jo(n.y),z:jo(n.z)};let s={[Ae.PX]:null,[Ae.NX]:null,[Ae.PY]:null,[Ae.NY]:null,[Ae.PZ]:null,[Ae.NZ]:null};for(let r of Object.keys(this.faces)){let a=this.faces[r];if(a===null)continue;let o=Kd[r],c=El(e,o),l=Qd(c);s[l]=a}this.faces=s}clone(){let e=new i(this.position.x,this.position.y,this.position.z);return e.faces={...this.faces},e}};function El(i,e){return{x:i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,y:i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,z:i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z}}function Qd(i){let e=Math.round(i.x),t=Math.round(i.y),n=Math.round(i.z);return e===1?Ae.PX:e===-1?Ae.NX:t===1?Ae.PY:t===-1?Ae.NY:n===1?Ae.PZ:n===-1?Ae.NZ:Math.abs(i.x)>=Math.abs(i.y)&&Math.abs(i.x)>=Math.abs(i.z)?i.x>0?Ae.PX:Ae.NX:Math.abs(i.y)>=Math.abs(i.x)&&Math.abs(i.y)>=Math.abs(i.z)?i.y>0?Ae.PY:Ae.NY:i.z>0?Ae.PZ:Ae.NZ}function jo(i){return Math.round(i*2)/2}var fn=class i{constructor(){if(new.target===i)throw new Error("[PuzzleState] Clase abstracta: no se puede instanciar directamente. Use CubeState, PyraminxState u otra subclase concreta.")}applyMove(){throw new Error("PuzzleState.applyMove no implementado")}applyInverse(){throw new Error("PuzzleState.applyInverse no implementado")}getFaceletString(){throw new Error("PuzzleState.getFaceletString no implementado")}reset(){throw new Error("PuzzleState.reset no implementado")}isSolved(){throw new Error("PuzzleState.isSolved no implementado")}clone(){throw new Error("PuzzleState.clone no implementado")}getType(){return"unknown"}getLabel(){return this.getType()}getMoveNotation(){return[]}getAnglePerMove(){return Math.PI/2}getMoveSuffixes(){return["","'","2"]}getScrambleSuffixes(){return this.getMoveSuffixes()}getScrambleLength(){return 20}looksSolved(){return this.isSolved()}getFaceColour(){return null}pickLayerPieces(){return[]}getRotationAxis(){return{axis:"y",sign:1}}getPieces(){return[]}applyMoves(e){for(let t of e)this.applyMove(t)}};var kt=Object.freeze({U:"#f5f5f5",D:"#ffd500",F:"#009b48",B:"#0046ad",R:"#b71234",L:"#ff5800"}),ep=Object.freeze({[kt.U]:"U",[kt.D]:"D",[kt.F]:"F",[kt.B]:"B",[kt.R]:"R",[kt.L]:"L"}),tp=Object.freeze({U:[[0,0,-1],[0,1,0],[1,0,0]],D:[[0,0,1],[0,1,0],[-1,0,0]],R:[[1,0,0],[0,0,1],[0,-1,0]],L:[[1,0,0],[0,0,-1],[0,1,0]],F:[[0,1,0],[-1,0,0],[0,0,1]],B:[[0,-1,0],[1,0,0],[0,0,1]]}),np=Object.freeze({U:[[-1,0,0],[0,1,0],[0,0,-1]],D:[[-1,0,0],[0,1,0],[0,0,-1]],R:[[1,0,0],[0,-1,0],[0,0,-1]],L:[[1,0,0],[0,-1,0],[0,0,-1]],F:[[-1,0,0],[0,-1,0],[0,0,1]],B:[[-1,0,0],[0,-1,0],[0,0,1]]}),ip=Object.freeze({U:[[0,0,1],[0,1,0],[-1,0,0]],D:[[0,0,-1],[0,1,0],[1,0,0]],R:[[1,0,0],[0,0,-1],[0,1,0]],L:[[1,0,0],[0,0,1],[0,-1,0]],F:[[0,-1,0],[1,0,0],[0,0,1]],B:[[0,1,0],[-1,0,0],[0,0,1]]}),sp=Object.freeze([[1,0,0],[0,1,0],[0,0,1]]),rp=Object.freeze({M:"R",E:"U",S:"F"}),op=Object.freeze({U:{axis:"y",sign:-1},D:{axis:"y",sign:1},R:{axis:"x",sign:-1},L:{axis:"x",sign:1},F:{axis:"z",sign:-1},B:{axis:"z",sign:1}}),Rt=class i extends fn{constructor(e=3){super(),this.setSize(e)}getFaceColour(e){let t=String(e).match(/^([MES])/)?.[1],n=t?rp[t]:this.parseMove(e)?.face??e;return kt[n]??null}looksSolved(){let e=(this.n-1)/2;return[["py","y",e],["ny","y",-e],["px","x",e],["nx","x",-e],["pz","z",e],["nz","z",-e]].every(([n,s,r])=>{let a=new Set;for(let o of this.getPieces())Math.abs(o.position[s]-r)>1e-6||a.add(o.faces[n]);return a.size===1})}getType(){return"cube"}getLabel(){return`${this.n}\xD7${this.n}`}getMoveNotation(){let e=["U","D","R","L","F","B"],t=this.n%2===1&&this.n>=3?["M","E","S"]:[];return this.n<4?[...e,...t]:[...e,...e.map(n=>n.toLowerCase()),...e.map(n=>`(${n}${n.toLowerCase()})`),...t]}getAnglePerMove(){return Math.PI/2}getPieces(){return this.cubies}getRotationAxis(e){return op[e]||{axis:"y",sign:1}}pickLayerPieces(e){let t=this.parseMove(e)||this.parseMove(e+""),n=t?this.getLayerInfo(t.face,t.layers):this.getLayerInfo(e);return this.cubies.filter(s=>this._cubieInLayer(s,n.axis,n.values))}setSize(e){if(!Number.isInteger(e)||e<2)throw new Error(`[CubeState] Dimensi\xF3n no soportada: ${e}`);this.n=e,this.cubies=[],this._buildSolved()}_buildSolved(){this.cubies=[];let e=this._axisValues();for(let t of e)for(let n of e)for(let s of e){let r=new Ys(t,n,s);this._paintOuterFaces(r),this.cubies.push(r)}}_paintOuterFaces(e){let t=this._maxCoord(),n=this._minCoord(),{x:s,y:r,z:a}=e.position;s===t&&e.setFaceColor(Ae.PX,kt.R),s===n&&e.setFaceColor(Ae.NX,kt.L),r===t&&e.setFaceColor(Ae.PY,kt.U),r===n&&e.setFaceColor(Ae.NY,kt.D),a===t&&e.setFaceColor(Ae.PZ,kt.F),a===n&&e.setFaceColor(Ae.NZ,kt.B)}_maxCoord(){return(this.n-1)/2}_minCoord(){return-(this.n-1)/2}_axisValues(){let e=[],n=-((this.n-1)/2)*1;for(let s=0;s<this.n;s++)e.push(n+s*1);return e}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let n=this.getLayerInfo(t.face,t.layers),s=this._resolveMatrix(t.face,t.times);for(let r of this.cubies)this._cubieInLayer(r,n.axis,n.values)&&r.applyMatrix(s);return!0}applyInverse(e){let t=this.parseMove(e);if(!t)return!1;let n=t.times===2?2:t.times===1?3:1,s=this._resolveMatrix(t.face,n),r=this.getLayerInfo(t.face,t.layers);for(let a of this.cubies)this._cubieInLayer(a,r.axis,r.values)&&a.applyMatrix(s);return!0}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.trim().match(/^([MES])(2|'|)$/);if(t){if(this.n%2===0)return null;let c={M:"L",E:"D",S:"F"}[t[1]],l=1;return t[2]==="'"?l=3:t[2]==="2"&&(l=2),{face:c,times:l,layers:"middle"}}let n=e.trim().match(/^(?:\(([UDRLFB])([udrlfb])\)|([UDRLFB])|([udrlfb]))(2|'|)$/);if(!n)return null;let s,r;if(n[1]){if(n[1].toLowerCase()!==n[2])return null;s=n[1],r="both"}else n[3]?(s=n[3],r="outer"):(s=n[4].toUpperCase(),r="inner");if(r!=="outer"&&this.n<4)return null;let a=n[5],o=1;return a==="'"?o=3:a==="2"&&(o=2),{face:s,times:o,layers:r}}getLayerInfo(e,t="outer"){let n=this._maxCoord(),s=this._minCoord(),r={U:"y",D:"y",R:"x",L:"x",F:"z",B:"z"},a={U:!0,D:!1,R:!0,L:!1,F:!0,B:!1},o=r[e];if(!o)return{axis:"y",value:0,values:[0]};let c=a[e]?n:s,l=a[e]?n-1:s+1,u=t==="outer"?[c]:t==="inner"?[l]:t==="middle"?[0]:[c,l];return{axis:o,value:u[0],values:u}}_resolveMatrix(e,t){return t===1?tp[e]:t===2?np[e]:t===3?ip[e]:sp}_cubieInLayer(e,t,n){return(Array.isArray(n)?n:[n]).some(r=>Math.abs(e.position[t]-r)<.01)}clone(){let e=new i(this.n);return e.cubies=this.cubies.map(t=>t.clone()),e}static fromMoves(e,t){let n=new i(e);return n.applyMoves(t),n}getFaceletString(){let e=this._axisValues(),t=this._maxCoord(),n=new Map;for(let a of this.cubies)n.set(this._key(a.position),a);let s=(a,o,c,l)=>{let u=n.get(this._key({x:a,y:o,z:c}));if(!u)return"?";let h=u.faces[l];return h&&ep[h]||"?"},r="";for(let a of[...e].reverse())for(let o of e)r+=s(o,t,a,Ae.PY);for(let a of e)for(let o of e)r+=s(t,a,o,Ae.PX);for(let a of e)for(let o of e)r+=s(o,a,t,Ae.PZ);for(let a of e)for(let o of e)r+=s(o,-t,a,Ae.NY);for(let a of e)for(let o of[...e].reverse())r+=s(-t,a,o,Ae.NX);for(let a of e)for(let o of[...e].reverse())r+=s(o,a,-t,Ae.NZ);return r}isSolved(){return this.getFaceletString()===this._solvedFaceletString()}_solvedFaceletString(){let e=this.n*this.n;return"U".repeat(e)+"R".repeat(e)+"F".repeat(e)+"D".repeat(e)+"L".repeat(e)+"B".repeat(e)}_key(e){return`${e.x.toFixed(2)},${e.y.toFixed(2)},${e.z.toFixed(2)}`}};var Ei=Math.SQRT2,Zs=Math.sqrt(6),$s=1/3,Ct=Object.freeze({U:{x:0,y:1,z:0},L:{x:-2*Ei/3,y:-$s,z:0},R:{x:Ei/3,y:-$s,z:Zs/3},B:{x:Ei/3,y:-$s,z:-Zs/3}}),Zt=Object.freeze({U:{x:0,y:-$s,z:0},L:{x:2*Ei/9,y:1/9,z:0},R:{x:-Ei/9,y:1/9,z:-Zs/9},B:{x:-Ei/9,y:1/9,z:Zs/9}}),ap=Object.freeze({U:{x:Zt.U.x*3,y:Zt.U.y*3,z:Zt.U.z*3},L:{x:Zt.L.x*3,y:Zt.L.y*3,z:Zt.L.z*3},R:{x:Zt.R.x*3,y:Zt.R.y*3,z:Zt.R.z*3},B:{x:Zt.B.x*3,y:Zt.B.y*3,z:Zt.B.z*3}}),ms=Object.freeze({U:{x:Ct.U.x,y:Ct.U.y,z:Ct.U.z},L:{x:Ct.L.x,y:Ct.L.y,z:Ct.L.z},R:{x:Ct.R.x,y:Ct.R.y,z:Ct.R.z},B:{x:Ct.B.x,y:Ct.B.y,z:Ct.B.z}}),js=Object.freeze({U:"#009b48",L:"#ffd500",R:"#0046ad",B:"#b71234"}),cp=1/9,lp=1e-6,up=5/9,hp=Object.freeze({U:["L","R","B"],L:["U","R","B"],R:["U","L","B"],B:["U","L","R"]}),Ko=["U","L","R","B"];function Jo(i,e){let t=Ko.indexOf(i),n=Ko.indexOf(e);return(t<n?i+e:e+i)+"_edge"}function fp(i,e){let t=i.x,n=i.y,s=i.z,r=Math.cos(e),a=Math.sin(e),o=1-r;return[[o*t*t+r,o*t*n-a*s,o*t*s+a*n],[o*t*n+a*s,o*n*n+r,o*n*s-a*t],[o*t*s-a*n,o*n*s+a*t,o*s*s+r]]}function wl(i,e){return{x:i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,y:i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,z:i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z}}function dp(i,e,t,n,s){return{x:i.x+(e.x-i.x)*n/3+(t.x-i.x)*s/3,y:i.y+(e.y-i.y)*n/3+(t.y-i.y)*s/3,z:i.z+(e.z-i.z)*n/3+(t.z-i.z)*s/3}}var wi=class i extends fn{constructor(){super(),this._buildSolved()}getType(){return"pyraminx"}getLabel(){return"Pyraminx"}getMoveNotation(){return["U","L","R","B","u","l","r","b"]}getAnglePerMove(){return 2*Math.PI/3}getScrambleSuffixes(){return["","'"]}getRotationAxis(e){return ms[e]||ms.U}getPieces(){return this.pieces}getFaceColour(e){let t=this.parseMove(e)?.face??e;return ms[t]?Ko.filter(n=>n!==t).map(n=>js[n]):null}pickLayerPieces(e){let t=this.parseMove(e),n=t?.face??e,s=ms[n];if(!s)return[];let r=t?.layers==="tip"?up:cp;return this.pieces.filter(a=>a.stickers.every(o=>o.vertices.every(c=>c.x*s.x+c.y*s.y+c.z*s.z>r-lp)))}_buildSolved(){this.pieces=[],this._byName=new Map;let e=new Map,t=(n,s)=>{let r=e.get(s);return r||(r={kind:n,name:s,stickers:[]},e.set(s,r)),r.stickers};for(let[n,[s,r,a]]of Object.entries(hp)){let o=Ct[s],c=Ct[r],l=Ct[a],u=(h,f)=>dp(o,c,l,h,f);t("tip",`${s}_tip`).push({face:n,vertices:[u(0,0),u(1,0),u(0,1)]}),t("tip",`${r}_tip`).push({face:n,vertices:[u(3,0),u(2,0),u(2,1)]}),t("tip",`${a}_tip`).push({face:n,vertices:[u(0,3),u(0,2),u(1,2)]}),t("center",`${s}_center`).push({face:n,vertices:[u(1,0),u(0,1),u(1,1)]}),t("center",`${r}_center`).push({face:n,vertices:[u(2,0),u(1,1),u(2,1)]}),t("center",`${a}_center`).push({face:n,vertices:[u(1,1),u(0,2),u(1,2)]}),t("edge",Jo(s,r)).push({face:n,vertices:[u(1,0),u(2,0),u(1,1)]}),t("edge",Jo(s,a)).push({face:n,vertices:[u(0,1),u(1,1),u(0,2)]}),t("edge",Jo(r,a)).push({face:n,vertices:[u(2,1),u(1,2),u(1,1)]})}for(let{kind:n,name:s,stickers:r}of e.values())this._addPiece(n,s,r)}_addPiece(e,t,n){let s=0,r=0,a=0,o=0;for(let l of n)for(let u of l.vertices)r+=u.x,a+=u.y,o+=u.z,s++;let c={kind:e,name:t,position:{x:r/s,y:a/s,z:o/s},stickers:n.map(l=>({color:js[l.face],face:l.face,vertices:l.vertices}))};this.pieces.push(c),this._byName.set(t,c)}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.match(/^([ULRBulrb])(2|'|)$/);if(!t)return null;let n=t[1],s=n.toUpperCase(),r=n===s?"big":"tip",a=t[2],o=1;return a==="'"?o=-1:a==="2"&&(o=2),{face:s,times:o,layers:r}}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let{face:n,times:s}=t,r=ms[n],a=this.pickLayerPieces(e),o=s*2*Math.PI/3,c=fp(r,o);for(let l of a){l.position=wl(c,l.position);for(let u of l.stickers)u.vertices=u.vertices.map(h=>wl(c,h))}return!0}applyInverse(e){let t=this.parseMove(e);if(!t)return!1;let n=t.times===1?-1:1,s=t.layers==="tip"?t.face.toLowerCase():t.face;return this.applyMove(s+(n===-1?"'":""))}getFaceletString(){return"UUUUUUULLLLLLLRRRRRRRBBBBBBB"}_faceOf(e){let t=e.vertices,n=(t[0].x+t[1].x+t[2].x)/3,s=(t[0].y+t[1].y+t[2].y)/3,r=(t[0].z+t[1].z+t[2].z)/3,a="U",o=-1/0;for(let[c,l]of Object.entries(ap)){let u=n*l.x+s*l.y+r*l.z;u>o&&(o=u,a=c)}return a}isSolved(){let e={U:null,L:null,R:null,B:null};for(let t of this.pieces)for(let n of t.stickers){let s=this._faceOf(n);if(e[s]===null)e[s]=n.color;else if(e[s]!==n.color)return!1}return!0}clone(){let e=new i;e.pieces=this.pieces.map(t=>({kind:t.kind,name:t.name,position:{...t.position},stickers:t.stickers.map(n=>({color:n.color,face:n.face,vertices:n.vertices.map(s=>({...s}))}))})),e._byName=new Map;for(let t of e.pieces)e._byName.set(t.name,t);return e}};var ti=(1+Math.sqrt(5))/2,Vt=(i,e,t)=>({x:i,y:e,z:t}),pp=(i,e)=>Vt(i.x+e.x,i.y+e.y,i.z+e.z),vn=(i,e)=>Vt(i.x-e.x,i.y-e.y,i.z-e.z),Js=(i,e)=>Vt(i.x*e,i.y*e,i.z*e),Ht=(i,e)=>i.x*e.x+i.y*e.y+i.z*e.z,ta=(i,e)=>Vt(i.y*e.z-i.z*e.y,i.z*e.x-i.x*e.z,i.x*e.y-i.y*e.x),Ks=i=>Math.hypot(i.x,i.y,i.z),na=i=>{let e=Ks(i)||1;return Vt(i.x/e,i.y/e,i.z/e)},gs=(i,e,t)=>pp(i,Js(vn(e,i),t));function ea(i,e){let{x:t,y:n,z:s}=i,r=Math.cos(e),a=Math.sin(e),o=1-r;return[[o*t*t+r,o*t*n-a*s,o*t*s+a*n],[o*t*n+a*s,o*n*n+r,o*n*s-a*t],[o*t*s-a*n,o*n*s+a*t,o*s*s+r]]}var Ai=(i,e)=>Vt(i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z);function mp(){let i=[];for(let n of[1,-1])for(let s of[1,-1])for(let r of[1,-1])i.push(Vt(n,s,r));for(let n of[1,-1])for(let s of[1,-1])i.push(Vt(0,n/ti,s*ti));for(let n of[1,-1])for(let s of[1,-1])i.push(Vt(n/ti,s*ti,0));for(let n of[1,-1])for(let s of[1,-1])i.push(Vt(n*ti,0,s/ti));let e=i.map(n=>Js(n,1/Ks(n))),t=[];for(let n=0;n<e.length;n++)for(let s=n+1;s<e.length;s++)for(let r=s+1;r<e.length;r++){let a=ta(vn(e[s],e[n]),vn(e[r],e[n]));if(!(Ks(a)<1e-9))for(let o of[1,-1]){let c=na(Js(a,o)),l=Ht(c,e[n]);l<=0||e.every(u=>Ht(c,u)<=l+1e-9)&&(t.some(u=>Ht(u.normal,c)>1-1e-9)||t.push({normal:c,d:l,verts:e.filter(u=>Math.abs(Ht(c,u)-l)<1e-9)}))}}return{verts:e,faces:t}}function gp(i,e,t){let n=na(vn(i[0],t)),s=ta(e,n);return[...i].sort((r,a)=>{let o=Math.atan2(Ht(vn(r,t),s),Ht(vn(r,t),n)),c=Math.atan2(Ht(vn(a,t),s),Ht(vn(a,t),n));return o-c})}var Qo=mp(),_p=(()=>{let i=Qo.faces.reduce((l,u)=>u.normal.y>l.normal.y?u:l,Qo.faces[0]),e=Vt(0,1,0),t;if(Ht(i.normal,e)>1-1e-12)t=[[1,0,0],[0,1,0],[0,0,1]];else{let l=na(ta(i.normal,e)),u=Math.acos(Math.max(-1,Math.min(1,Ht(i.normal,e))));t=ea(l,u)}let n=l=>({...l,normal:Ai(t,l.normal),verts:l.verts.map(u=>Ai(t,u))}),s=Qo.faces.map(n),r=s.reduce((l,u)=>u.normal.y>l.normal.y?u:l,s[0]),a=s.filter(l=>Math.abs(Ht(l.normal,r.normal)-1/Math.sqrt(5))<1e-6),o=a.reduce((l,u)=>u.normal.z>l.normal.z?u:l,a[0]),c=ea(Vt(0,1,0),-Math.atan2(o.normal.x,o.normal.z));return s.map(l=>({normal:Ai(c,l.normal),d:l.d,verts:l.verts.map(u=>Ai(c,u))}))})(),Je=Object.freeze(["U","F","R","BR","BL","L","D","DF","DR","DBR","DBL","DL"]),eb=Object.freeze({B:"DR"}),_s=(()=>{let i=o=>{let c=Math.atan2(o.normal.x,o.normal.z);return c<-1e-9?c+2*Math.PI:c},e=[..._p].sort((o,c)=>c.normal.y-o.normal.y),t=e[0],n=e[e.length-1],s=e.slice(1,6).sort((o,c)=>i(o)-i(c)),r=e.slice(6,11).sort((o,c)=>i(o)-i(c)),a={};a.U=t,a.D=n,["F","R","BR","BL","L"].forEach((o,c)=>{a[o]=s[c]}),["DF","DR","DBR","DBL","DL"].forEach((o,c)=>{a[o]=r[c]});for(let o of Je){let c=a[o];c.center=Js(c.normal,c.d),c.ring=gp(c.verts,c.normal,c.center)}return Object.freeze(a)})(),mt=Object.freeze(Object.fromEntries(Je.map(i=>[i,_s[i].normal]))),xp=_s.U.d,Rl=1-Math.sqrt(5)/(3*ti),yp=(()=>{let i=1/Math.sqrt(5),e=Math.sqrt(1-i*i),t=_s.U,n=Ks(vn(gs(t.ring[0],t.ring[1],.5),t.center));return Rl*n*e+xp*i})(),vp=1e-6,Al=Object.freeze({U:"#ffffff",F:"#009b48",R:"#b71234",BR:"#0046ad",BL:"#ffd500",L:"#ff5800",D:"#8a8a8a",DF:"#7ad3ff",DR:"#ff9ec7",DBR:"#6b3fa0",DBL:"#c9f24a",DL:"#f2e3c0"}),Mp=new RegExp(`^(${[...Je].sort((i,e)=>e.length-i.length).join("|")})(\\+\\+|--|2'|2|')?$`),Tl=2*Math.PI/5,ni=class i extends fn{constructor(){super(),this._buildSolved()}getType(){return"megaminx"}getFaceColour(e){return Al[e]??null}getLabel(){return"Megaminx"}getMoveNotation(){return[...Je]}getAnglePerMove(){return Tl}getMoveSuffixes(){return["","'","2","2'"]}getScrambleLength(){return 40}getRotationAxis(e){return mt[e]||mt.U}getPieces(){return this.pieces}pickLayerPieces(e){let t=this.parseMove(e)?.face??e,n=mt[t];return n?this.pieces.filter(s=>s.stickers.every(r=>r.vertices.every(a=>Ht(a,n)>yp-vp))):[]}_buildSolved(){this.pieces=[],this._byName=new Map;let e=new Map,t=(r,a)=>{let o=e.get(a);return o||(o={kind:r,name:a,stickers:[]},e.set(a,o)),o.stickers},n=r=>`${r.x.toFixed(6)}|${r.y.toFixed(6)}|${r.z.toFixed(6)}`,s=new Map;for(let r of Je)for(let a of _s[r].ring)s.has(n(a))||s.set(n(a),`corner${s.size}`);for(let r of Je){let{center:a,ring:o}=_s[r],c=o.map(l=>gs(a,l,Rl));t("center",`${r}_center`).push({face:r,vertices:c});for(let l=0;l<5;l++){let u=(l+1)%5,h=(l+4)%5,f=gs(o[l],o[u],1/3),d=gs(o[l],o[u],2/3),g=s.get(n(o[l]));t("corner",g).push({face:r,vertices:[c[l],gs(o[h],o[l],2/3),o[l],f]});let _=Sp(o[l],o[u],s,n);t("edge",_).push({face:r,vertices:[c[l],f,d,c[u]]})}}for(let{kind:r,name:a,stickers:o}of e.values())this._addPiece(r,a,o)}_addPiece(e,t,n){let s=0,r=0,a=0,o=0;for(let l of n)for(let u of l.vertices)r+=u.x,a+=u.y,o+=u.z,s++;let c={kind:e,name:t,position:Vt(r/s,a/s,o/s),stickers:n.map(l=>({color:Al[l.face],face:l.face,vertices:l.vertices}))};this.pieces.push(c),this._byName.set(t,c)}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.trim().match(Mp);if(!t)return null;let n=t[1];switch(t[2]){case void 0:case"":return{face:n,times:1};case"'":return{face:n,times:-1};case"2":case"++":return{face:n,times:2};case"2'":case"--":return{face:n,times:-2};default:return null}}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let{face:n,times:s}=t,r=this.pickLayerPieces(n),a=ea(mt[n],s*Tl);for(let o of r){o.position=Ai(a,o.position);for(let c of o.stickers)c.vertices=c.vertices.map(l=>Ai(a,l))}return!0}applyInverse(e){let t=this.parseMove(e);if(!t)return!1;let n={1:"'","-1":"",2:"2'","-2":"2"}[String(t.times)];return this.applyMove(t.face+n)}getFaceletString(){return Je.map(e=>e.repeat(11)).join("")}isSolved(){let e={};for(let t of this.pieces)for(let n of t.stickers){let s=this._faceOf(n);if(!s)return!1;if(e[s]===void 0)e[s]=n.color;else if(e[s]!==n.color)return!1}return!0}_faceOf(e){let t=null,n=-1/0;for(let s of Je){let r=mt[s],a=0;for(let o of e.vertices)a+=Ht(o,r);a/=e.vertices.length,a>n&&(n=a,t=s)}return t}clone(){let e=new i;e.pieces=this.pieces.map(t=>({kind:t.kind,name:t.name,position:{...t.position},stickers:t.stickers.map(n=>({color:n.color,face:n.face,vertices:n.vertices.map(s=>({...s}))}))})),e._byName=new Map;for(let t of e.pieces)e._byName.set(t.name,t);return e}};function Sp(i,e,t,n){let s=t.get(n(i)),r=t.get(n(e));return[s,r].sort().join("-")}var Ze=(i,e,t)=>({x:i,y:e,z:t});function bp(i,e){let{x:t,y:n,z:s}=i,r=Math.cos(e),a=Math.sin(e),o=1-r;return[[o*t*t+r,o*t*n-a*s,o*t*s+a*n],[o*t*n+a*s,o*n*n+r,o*n*s-a*t],[o*t*s-a*n,o*n*s+a*t,o*s*s+r]]}var Cl=(i,e)=>Ze(i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z),he=.5,Pl=Object.freeze({U:"#ffffff",D:"#ffd500",F:"#009b48",B:"#0046ad",R:"#b71234",L:"#ff5800"}),xs=Object.freeze({U:Ze(0,1,0),D:Ze(0,-1,0),F:Ze(0,0,1),B:Ze(0,0,-1),R:Ze(1,0,0),L:Ze(-1,0,0)}),Ll=Object.freeze(["F","B","R","L"]);function Ep(i,e){let{x:t,y:n,z:s}=i;switch(e){case"U":return[Ze(t-he,n+he,s-he),Ze(t+he,n+he,s-he),Ze(t+he,n+he,s+he),Ze(t-he,n+he,s+he)];case"D":return[Ze(t-he,n-he,s-he),Ze(t-he,n-he,s+he),Ze(t+he,n-he,s+he),Ze(t+he,n-he,s-he)];case"F":return[Ze(t-he,n-he,s+he),Ze(t+he,n-he,s+he),Ze(t+he,n+he,s+he),Ze(t-he,n+he,s+he)];case"B":return[Ze(t+he,n-he,s-he),Ze(t-he,n-he,s-he),Ze(t-he,n+he,s-he),Ze(t+he,n+he,s-he)];case"R":return[Ze(t+he,n-he,s+he),Ze(t+he,n-he,s-he),Ze(t+he,n+he,s-he),Ze(t+he,n+he,s+he)];case"L":return[Ze(t-he,n-he,s-he),Ze(t-he,n-he,s+he),Ze(t-he,n+he,s+he),Ze(t-he,n+he,s-he)];default:return[]}}var Qs=class i extends fn{constructor(e=3,t=e,n="2"){super(),this.width=e,this.depth=t,this.suffix=n,this._buildSolved()}getType(){return`cuboid${this.width}${this.depth}1`}getLabel(){return`${this.width}\xD7${this.depth}\xD71`}getMoveNotation(){return[...Ll]}getFaceColour(e){let t=this.parseMove(e)?.face??e;return Pl[t]??null}getAnglePerMove(){return Math.PI}getMoveSuffixes(){return[this.suffix]}getScrambleLength(){return Math.max(6,this.width*this.depth)}getRotationAxis(e){return xs[e]||xs.F}getPieces(){return this.pieces}getBoundingRadius(){return Math.hypot(this.width/2,he,this.depth/2)}_extentAlong(e){return e.x!==0?(this.width-1)/2:e.z!==0?(this.depth-1)/2:0}pickLayerPieces(e){let t=this.parseMove(e)?.face??e,n=xs[t];if(!n||!Ll.includes(t))return[];let s=this._extentAlong(n);return this.pieces.filter(r=>r.position.x*n.x+r.position.y*n.y+r.position.z*n.z>s-.5)}_buildSolved(){this.pieces=[],this._byName=new Map;let e=(this.width-1)/2,t=(this.depth-1)/2;for(let n=0;n<this.width;n++)for(let s=0;s<this.depth;s++){let r=Ze(n-e,0,s-t),a=[];n===0&&a.push("L"),n===this.width-1&&a.push("R"),s===0&&a.push("B"),s===this.depth-1&&a.push("F");let o=a.length===2?"corner":a.length===1?"edge":"center",c=["U","D",...a];this._addPiece(o,`${n}${s}`,r,c.map(l=>({face:l,vertices:Ep(r,l)})))}}_addPiece(e,t,n,s){let r={kind:e,name:t,position:{...n},stickers:s.map(a=>({color:Pl[a.face],face:a.face,vertices:a.vertices}))};this.pieces.push(r),this._byName.set(t,r)}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.trim().match(/^([FBRL])(2|')?$/);return t?{face:t[1],times:1}:null}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let n=xs[t.face],s=this.pickLayerPieces(t.face),r=bp(n,Math.PI);for(let a of s){a.position=Cl(r,a.position);for(let o of a.stickers)o.vertices=o.vertices.map(c=>Cl(r,c))}return!0}applyInverse(e){return this.applyMove(e)}getFaceletString(){let e=t=>{let n=Math.round(t*1e3)/1e3;return(n===0?0:n).toFixed(3)};return this.pieces.flatMap(t=>t.stickers.map(n=>({key:this._centroid(n).map(e).join(","),color:n.face}))).sort((t,n)=>t.key<n.key?-1:t.key>n.key?1:0).map(t=>t.color).join("")}isSolved(){let e={};for(let t of this.pieces)for(let n of t.stickers){let s=this._faceOf(n);if(e[s]===void 0)e[s]=n.color;else if(e[s]!==n.color)return!1}return!0}_centroid(e){let t=0,n=0,s=0;for(let a of e.vertices)t+=a.x,n+=a.y,s+=a.z;let r=e.vertices.length;return[t/r,n/r,s/r]}_faceOf(e){let[t,n,s]=e.vertices,r=n.x-t.x,a=n.y-t.y,o=n.z-t.z,c=s.x-t.x,l=s.y-t.y,u=s.z-t.z,h=a*u-o*l,f=o*c-r*u,d=r*l-a*c,[g,_,m]=this._centroid(e);h*g+f*_+d*m<0&&(h=-h,f=-f,d=-d);let p="U",b=-1/0;for(let[y,T]of Object.entries(xs)){let L=h*T.x+f*T.y+d*T.z;L>b&&(b=L,p=y)}return p}clone(){let e=new i(this.width,this.depth,this.suffix);e.pieces=this.pieces.map(t=>({kind:t.kind,name:t.name,position:{...t.position},stickers:t.stickers.map(n=>({color:n.color,face:n.face,vertices:n.vertices.map(s=>({...s}))}))})),e._byName=new Map;for(let t of e.pieces)e._byName.set(t.name,t);return e}},Il=()=>new Qs(2,2,""),Ul=()=>new Qs(3,3,"2");var Dl=.001,Nl=i=>[i.x,i.y,i.z].map(e=>(Math.round(e/Dl)*Dl).toFixed(3)).join(",");function Ol(i,e,t){let n=Math.cos(t),s=Math.sin(t),r=e.x*i.x+e.y*i.y+e.z*i.z;return{x:i.x*n+(e.y*i.z-e.z*i.y)*s+e.x*r*(1-n),y:i.y*n+(e.z*i.x-e.x*i.z)*s+e.y*r*(1-n),z:i.z*n+(e.x*i.y-e.y*i.x)*s+e.z*r*(1-n)}}function ia(i,e){let t=i.parseMove?.(e)?.face??e,n=i.getRotationAxis?.(t);if(!n)return null;if(typeof n.axis=="string")return{x:+(n.axis==="x"),y:+(n.axis==="y"),z:+(n.axis==="z"),sign:n.sign};let s=Math.hypot(n.x,n.y,n.z)||1;return{x:n.x/s,y:n.y/s,z:n.z/s,sign:1}}function zl(i,e,t){let n=ia(i,e),s=i.getPieces?.()??[];if(!n||!s.length||!t)return null;let r=2*Math.PI/t,a=i.getMoveNotation(),o=new Map;for(let l of a){let u=i.pickLayerPieces(l);!u.length||u.length===s.length||o.set(l,new Set(u.map(h=>Nl(h.position))))}let c={};for(let[l,u]of o){let h=new Set([...i.pickLayerPieces(l)].map(b=>Nl(Ol(b.position,n,r)))),f=null;for(let[b,y]of o)if(y.size===h.size&&[...h].every(T=>y.has(T))){f=b;break}if(!f)continue;let d=ia(i,l),g=ia(i,f),_=Ol({x:d.x*d.sign,y:d.y*d.sign,z:d.z*d.sign},n,r),m={x:g.x*g.sign,y:g.y*g.sign,z:g.z*g.sign},p=_.x*m.x+_.y*m.y+_.z*m.z;c[l]=[f,p<0]}return c}var wp={U:["U",!1],D:["D",!1],E:["E",!1],F:["R",!1],R:["B",!1],B:["L",!1],L:["F",!1],M:["S",!1],S:["M",!0]};function sa(i){return i.startsWith("2")?"2":i==="'"?"":"'"}function Fl(i,e){let t=i,n=!1;for(let s=0;s<e;s++){let r=wp[t];if(!r)return null;t=r[0],n=n!==r[1]}return[t,n]}function Ap(i,e,t=null){if(!e)return i;if(t){let u=i.match(/^(.*?)(2'|'|2)?$/),h=u[1],f=u[2]??"",d=!1;for(let g=0;g<e;g++){let _=t[h];if(!_)return i;h=_[0],d=d!==_[1]}return h+(d?sa(f):f)}let n=i.match(/^\(([A-Za-z])([A-Za-z])\)(.*)$/);if(n){let u=Fl(n[1].toUpperCase(),e);if(!u)return i;let[h,f]=u,d=f?sa(n[3]):n[3];return`(${h}${h.toLowerCase()})${d}`}let s=i.match(/^([A-Za-z])(.*)$/);if(!s)return i;let r=s[1]===s[1].toLowerCase(),a=Fl(s[1].toUpperCase(),e);if(!a)return i;let[o,c]=a,l=c?sa(s[2]):s[2];return(r?o.toLowerCase():o)+l}function Ti(i,e,t=null){return e?i.trim().split(/\s+/).map(n=>Ap(n,e,t)).join(" "):i}var xt={PX:"px",NX:"nx",PY:"py",NY:"ny",PZ:"pz",NZ:"nz"},at=[{face:"F",dir:{x:0,y:0,z:1},key:xt.PZ},{face:"R",dir:{x:1,y:0,z:0},key:xt.PX},{face:"B",dir:{x:0,y:0,z:-1},key:xt.NZ},{face:"L",dir:{x:-1,y:0,z:0},key:xt.NX}],Gt=(i,e,t,n)=>i.getPieces().find(s=>s.position.x===e&&s.position.y===t&&s.position.z===n),Tp=i=>({U:Gt(i,0,1,0).faces[xt.PY],D:Gt(i,0,-1,0).faces[xt.NY],F:Gt(i,0,0,1).faces[xt.PZ],B:Gt(i,0,0,-1).faces[xt.NZ],R:Gt(i,1,0,0).faces[xt.PX],L:Gt(i,-1,0,0).faces[xt.NX]}),Gl=i=>Object.values(i.faces).filter(Boolean),Wl=(i,e)=>i.length===e.length&&i.every(t=>e.includes(t)),er=(i,e)=>i.getPieces().find(t=>Wl(Gl(t),e));function jt(i,e,t){if(e)for(let n of e.trim().split(/\s+/))n&&(i.applyMove(n),t.push(n))}var Rp=["M","M'","M2","E","E'","E2","S","S'","S2"],Cp=[[0,1,0],[0,-1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1]];function Bl(i,e){return Cp.every(([t,n,s])=>{let r=Gt(i,t,n,s),a=Gt(e,t,n,s);return r&&a&&Object.keys(a.faces).every(o=>r.faces[o]===a.faces[o])})}function Pp(i,e){let t=i.clone();if(t.reset(),Bl(i,t))return!0;let n=ql(i,Rp,s=>Bl(s,t),3);if(!n)return!1;for(let s of n)jt(i,s,e);return!0}var Lp=["U","D","R","L","F","B"],Ip=["","'","2"],Up={U:"D",D:"U",R:"L",L:"R",F:"B",B:"F"};function Dp(i,e,t){let n=Gt(i,t.dir.x,-1,t.dir.z);return!!n&&n.faces[xt.NY]===e.D&&n.faces[t.key]===e[t.face]}function Np(i,e,t){let n=[],s=(r,a)=>{if(e(i))return!0;if(r===0)return!1;for(let o of Lp)if(!(o===a||Up[o]===a))for(let c of Ip){let l=o+c;if(i.applyMove(l),n.push(l),s(r-1,o))return!0;n.pop(),i.applyInverse(l)}return!1};for(let r=0;r<=t;r++){if(s(r,null)){let a=n.slice();for(let o=a.length-1;o>=0;o--)i.applyInverse(a[o]);return a}n.length=0}return null}function Op(i,e,t){let n=[];for(let s of at){n.push(s);let a=Np(i,o=>n.every(c=>Dp(o,e,c)),7);if(!a)return!1;jt(i,a.join(" "),t)}return!0}var Fp="R U R'",zp="R U R' U'";function la(i){let e=at[i].dir,t=at[(i+1)%4].dir;return{x:e.x+t.x,y:-1,z:e.z+t.z}}function ra(i,e,t){let n=la(t),s=Gt(i,n.x,n.y,n.z);if(!s)return!1;let r=at[t],a=at[(t+1)%4];return s.faces[xt.NY]===e.D&&s.faces[r.key]===e[r.face]&&s.faces[a.key]===e[a.face]}function Bp(i,e,t,n){for(let s=0;s<4;s++){let r=at[s],a=at[(s+1)%4],o=[e.D,e[r.face],e[a.face]],c=la(s),l=Ti(zp,s,t),u=er(i,o);if(u&&u.position.y===-1&&!ra(i,e,s)){let f=at.findIndex((d,g)=>{let _=la(g);return _.x===u.position.x&&_.z===u.position.z});jt(i,Ti(Fp,f,t),n)}let h=ra(i,e,s);for(let f=0;f<4&&!h;f++){let d=er(i,o);if(d.position.y===1&&d.position.x===c.x&&d.position.z===c.z)for(let _=0;_<6&&!h;_++)jt(i,l,n),h=ra(i,e,s);h||jt(i,"U",n)}if(!h)return!1}return!0}var kl="U R U' R' U' F' U F",kp="U' L' U L U F U' F'";function Xl(i){let e=at[i].dir,t=at[(i+1)%4].dir;return{x:e.x+t.x,y:0,z:e.z+t.z}}function Vl(i,e,t){let n=Xl(t),s=Gt(i,n.x,n.y,n.z);if(!s)return!1;let r=at[t],a=at[(t+1)%4];return s.faces[r.key]===e[r.face]&&s.faces[a.key]===e[a.face]}function Vp(i){return i.position.y!==0?-1:at.findIndex((e,t)=>{let n=Xl(t);return n.x===i.position.x&&n.z===i.position.z})}function Hp(i,e,t,n){for(let s=0;s<4;s++){if(Vl(i,e,s))continue;let r=at[s],a=at[(s+1)%4],o=[e[r.face],e[a.face]],c=Vp(er(i,o));c>=0&&jt(i,Ti(kl,c,t),n);let l=!1;for(let u=0;u<4&&!l;u++){let h=er(i,o),f=h.faces[xt.PY],d=[{side:r,front:e[r.face],up:e[a.face],alg:kl,times:s},{side:a,front:e[a.face],up:e[r.face],alg:kp,times:(s+1)%4}];for(let g of d)if(h.position.y===1&&h.position.x===g.side.dir.x&&h.position.z===g.side.dir.z&&h.faces[g.side.key]===g.front&&f===g.up){jt(i,Ti(g.alg,g.times,t),n),l=Vl(i,e,s);break}l||jt(i,"U",n)}if(!l)return!1}return!0}var Gp="F R U R' U' F'",Wp="F U R U' R' F'",oa="U R U' L' U R' U' L",Xp="R' D' R D",qp="R U' R U R U R U' R' U' R2",Yp="R U R' U' R' F R2 U' R' U' R U R' F'",aa=["","U","U2","U'"];function ql(i,e,t,n=3){let s=(r,a)=>{if(t(r))return[];if(!a)return null;for(let o of e){let c=r.clone();jt(c,o,[]);let l=s(c,a-1);if(l)return[o,...l]}return null};for(let r=0;r<=n;r++){let a=s(i,r);if(a)return a}return null}function ca(i,e,t,n,s=3){let r=ql(i,e,t,s);if(!r)return!1;for(let a of r)jt(i,a,n);return!0}var Yl=(i,e)=>Gt(i,e.dir.x,1,e.dir.z),ua=(i,e)=>{let t=at[e].dir,n=at[(e+1)%4].dir;return Gt(i,t.x+n.x,1,t.z+n.z)},$p=(i,e)=>at.filter(t=>Yl(i,t)?.faces[xt.PY]===e.U).length;function Hl(i,e){let t=0;for(let n=0;n<4;n++){let s=ua(i,n);if(!s)continue;let r=at[n],a=at[(n+1)%4];Wl(Gl(s),[e.U,e[r.face],e[a.face]])&&t++}return t}var Zp=(i,e)=>[0,1,2,3].filter(t=>ua(i,t)?.faces[xt.PY]===e.U).length;function jp(i,e){let t=0;for(let n of at){let s=Yl(i,n);s&&s.faces[xt.PY]===e.U&&s.faces[n.key]===e[n.face]&&t++}return t}function Jp(i,e,t,n){let s=aa.flatMap(o=>[`${o} ${Gp}`,`${o} ${Wp}`]);if(!ca(i,s,o=>$p(o,e)===4,n))return"cruz superior";let r=aa.flatMap(o=>[`${o} ${oa}`,`${o} ${oa} ${oa}`,`${o} ${Yp}`]).concat(aa.slice(1));if(!ca(i,r,o=>Hl(o,e)===4,n))return"colocar esquinas";if(Zp(i,e)<4)for(let o=0;o<4;o++){let c=0;for(;ua(i,0)?.faces[xt.PY]!==e.U;)if(jt(i,Xp,n),++c>5)return"orientar esquinas";if(c%2)return"orientar esquinas \xB7 giros impares";jt(i,"U",n)}if(Hl(i,e)<4)return"orientar esquinas \xB7 capa descolocada";let a=[];for(let o=0;o<4;o++){let c=Ti(qp,o,t);a.push(c,`${c} ${c}`)}return ca(i,a,o=>jp(o,e)===4,n)?null:"permutar aristas"}function Ri(i,{aviso:e=null}={}){if(i.n!==3)return null;let t=i.clone(),n=[],s=[],r=(c,l)=>{e?.(c);let u=n.length,h=l();return s.push({nombre:c,desde:u,hasta:n.length}),h};if(r("centres",()=>!Pp(t,n)))return null;let a=Tp(t),o=zl(t,"U",4);return r("bottom cross",()=>!Op(t,a,n))||r("bottom corners",()=>!Bp(t,a,o,n))||r("middle layer",()=>!Hp(t,a,o,n))||r("last layer",()=>Jp(t,a,o,n))?null:{moves:n,solved:t.isSolved(),state:t,etapas:s}}var ys=(i,e)=>i.x*e.x+i.y*e.y+i.z*e.z,Kp=(i,e)=>({x:i.x-e.x,y:i.y-e.y,z:i.z-e.z}),Qp=(i,e)=>({x:i.y*e.z-i.z*e.y,y:i.z*e.x-i.x*e.z,z:i.x*e.y-i.y*e.x}),em=(i,e)=>({x:i.x*e,y:i.y*e,z:i.z*e}),tm=i=>{let e=Math.hypot(i.x,i.y,i.z)||1;return{x:i.x/e,y:i.y/e,z:i.z/e}},nm=1/Math.sqrt(5);var nn=(i,e)=>i!==e&&Math.abs(ys(mt[i],mt[e])-nm)<1e-6,ii=i=>Je.filter(e=>nn(i,e)),ha=i=>Je.find(e=>ys(mt[i],mt[e])<-1+1e-6);function im(i){let e=null,t=-1/0;for(let n of Je){let s=ys(mt[n],i);s>t&&(t=s,e=n)}return e}function $l(i,e){let t=tm(Kp(e,em(i,ys(e,i))));return[t,Qp(i,t),i]}function sm(i,e,t){let n=i.map(s=>ys(s,t));return{x:n[0]*e[0].x+n[1]*e[1].x+n[2]*e[2].x,y:n[0]*e[0].y+n[1]*e[1].y+n[2]*e[2].y,z:n[0]*e[0].z+n[1]*e[1].z+n[2]*e[2].z}}function Zl(i,e){if(!mt[i]||!mt[e]||!nn(i,e))return null;let t=$l(mt.U,mt.F),n=$l(mt[i],mt[e]),s={};for(let r of Je)s[r]=im(sm(t,n,mt[r]));return s}var jl=new Map(Je.map((i,e)=>[i,e])),tr=(i,e)=>jl.get(i)-jl.get(e),nr=i=>[...i].sort(tr).join("-"),Mn=(()=>{let i=[];for(let e=0;e<Je.length;e++)for(let t=e+1;t<Je.length;t++)nn(Je[e],Je[t])&&i.push([Je[e],Je[t]]);return i})(),Sn=(()=>{let i=[];for(let e=0;e<Je.length;e++)for(let t=e+1;t<Je.length;t++)for(let n=t+1;n<Je.length;n++){let[s,r,a]=[Je[e],Je[t],Je[n]];nn(s,r)&&nn(r,a)&&nn(s,a)&&i.push([s,r,a])}return i})(),rm=new Map(Mn.map((i,e)=>[nr(i),e])),om=new Map(Sn.map((i,e)=>[nr(i),e])),fa=i=>rm.get(nr(i)),vs=i=>om.get(nr(i)),am=(()=>{let i={};for(let e of Je){let t=ii(e),n=new ni,s=new Map;for(let o of n.getPieces())o.kind==="edge"&&s.set(o.name,o.stickers.map(c=>c.face));n.applyMove(e);let r=new Map;for(let o of n.getPieces()){if(o.kind!=="edge")continue;let c=s.get(o.name);if(!c.includes(e))continue;let l=o.stickers.map(u=>n._faceOf(u));r.set(c.find(u=>u!==e),l.find(u=>u!==e))}let a=[t[0]];for(let o=1;o<5;o++)a.push(r.get(a[o-1]));i[e]=a}return Object.freeze(i)})();function Jl(i,e,t){if(e===i)return i;let n=am[i],s=n.indexOf(e);return s<0?e:n[((s+t)%5+5)%5]}var ir=["","'","2","2'"],cm={"":1,"'":-1,2:2,"2'":-2},sr=Je.flatMap(i=>ir.map(e=>i+e));function da(i){let e=i.match(/^[A-Z]+/)[0];return e+{"":"'","'":"",2:"2'","2'":"2"}[i.slice(e.length)]}function lm(i,e){let t=[],n=[];for(let[s,r,a]of[[Mn,fa,t],[Sn,vs,n]])for(let o=0;o<s.length;o++){let c=s[o];if(!c.includes(i))continue;let l=c.map(f=>Jl(i,f,e)),u=r(l),h=[...l].sort(tr);a.push({from:o,to:u,orient:c.map(f=>h.indexOf(Jl(i,f,e)))})}return{edges:t,corners:n}}var Kl=(i,e)=>({from:Int8Array.from(i.map(t=>t.from)),to:Int8Array.from(i.map(t=>t.to)),orient:Int8Array.from(i.flatMap(t=>t.orient)),ancho:e,n:i.length}),um=(()=>{let i=new Map;for(let e of Je)for(let t of ir){let n=lm(e,cm[t]);i.set(e+t,{edges:Kl(n.edges,2),corners:Kl(n.corners,3)})}return i})(),Ql=new Int8Array(16),eu=new Int8Array(16);function rr(){return{ep:Mn.map((i,e)=>e),eo:Mn.map(()=>0),cp:Sn.map((i,e)=>e),co:Sn.map(()=>0)}}var or=i=>({ep:[...i.ep],eo:[...i.eo],cp:[...i.cp],co:[...i.co]});function bn(i,e){let t=um.get(e);if(!t)return!1;for(let[n,s,r]of[[i.ep,i.eo,t.edges],[i.cp,i.co,t.corners]]){for(let a=0;a<r.n;a++)Ql[a]=n[r.from[a]],eu[a]=s[r.from[a]];for(let a=0;a<r.n;a++)n[r.to[a]]=Ql[a],s[r.to[a]]=r.orient[a*r.ancho+eu[a]]}return!0}var hm=(()=>{let i=new ni,e=new Map;for(let t of i.getPieces())t.kind!=="center"&&e.set(t.name,t.stickers.map(n=>n.face).sort(tr));return e})();function tu(i){let e=rr();for(let t of i.getPieces()){if(t.kind==="center")continue;let n=hm.get(t.name),s=t.stickers.map(o=>({marca:o.face,cara:i._faceOf(o)})),r=s.map(o=>o.cara).sort(tr),a=s.find(o=>o.marca===n[0]).cara;if(t.kind==="edge"){let o=fa(r);e.ep[o]=fa(n),e.eo[o]=r.indexOf(a)}else{let o=vs(r);e.cp[o]=vs(n),e.co[o]=r.indexOf(a)}}return e}var nu=i=>Mn[i],iu=i=>Sn[i];var si="U",dm=(i,e)=>e.kind==="edge"?i.ep[e.i]===e.i&&i.eo[e.i]===0:i.cp[e.i]===e.i&&i.co[e.i]===0,ru=(i,e)=>(e.kind==="edge"?i.ep:i.cp).indexOf(e.i),su=(i,e)=>i==="edge"?nu(e):iu(e),cr=new Map(sr.map(i=>[i,i.match(/^[A-Z]+/)[0]])),_a=i=>i.flatMap(e=>ir.map(t=>e+t));function lr(i,e,t,n,s,r,a){if(a(i,r))return!0;if(n===0)return!1;for(let o=0;o<e.length;o++){if(t[o]===s)continue;bn(i,e[o]),r.push(e[o]);let c=lr(i,e,t,n-1,t[o],r,a);if(r.pop(),bn(i,da(e[o])),c)return!0}return!1}function pm(i,e,t,n){let s=e.map(o=>cr.get(o)),r=null,a=(o,c)=>t(o)&&(r=[...c],!0);for(let o=0;o<=n&&!r;o++)lr(i,e,s,o,null,[],a);return r}function ou(i){let e=new Int8Array(Mn.length).fill(-1),t=new Int8Array(Sn.length).fill(-1),n=0;for(let r of i)(r.kind==="edge"?e:t)[r.i]=n++;let s=new Array(2*n);return r=>{for(let a=0;a<r.ep.length;a++){let o=e[r.ep[a]];o>=0&&(s[2*o]=a,s[2*o+1]=r.eo[a])}for(let a=0;a<r.cp.length;a++){let o=t[r.cp[a]];o>=0&&(s[2*o]=a,s[2*o+1]=r.co[a])}return String.fromCharCode.apply(null,s)}}function pa(i,e,t,n=3,s=3){let r=ou(t),a=e.map(f=>cr.get(f)),o=new Map,c=rr(),l=(f,d)=>{let g=r(f);return o.has(g)||o.set(g,[...d]),!1};for(let f=0;f<=n;f++)lr(c,e,a,f,null,[],l);let u=null,h=(f,d)=>{let g=o.get(r(f));return g?(u=[...d,...g.slice().reverse().map(da)],!0):!1};for(let f=0;f<=s&&!u;f++)lr(i,e,a,f,null,[],h);return u}var au=[{caras:null,atras:0,alante:2},{caras:null,atras:3,alante:3},{caras:"hueco",atras:4,alante:4},{caras:"cuna",atras:4,alante:5},{caras:"region",atras:4,alante:4},{caras:"cuna",atras:5,alante:6},{caras:"hueco",atras:4,alante:5},{caras:"region",atras:4,alante:5},{caras:"hueco",atras:5,alante:5}],ar=new Map,ma=new Map;function mm(i){if(!ma.has(i)){let e=ii(i),t=[];for(let n of e)for(let s of e)n<s&&nn(n,s)&&t.push([i,n,s]);ma.set(i,t)}return ma.get(i)}function gm(i,e,t,n,s){let r=[e,...t],a=s+"|"+r.map(d=>d.kind[0]+d.i).join(",")+"|"+ou(r)(i);if(ar.has(a))return ar.get(a);let o=d=>(ar.set(a,d),d),{caras:c,atras:l,alante:u}=au[s];if(!c)return o(l?pa(i,sr,r,l,u):pm(i,sr,g=>r.every(_=>dm(g,_)),u));if(c==="cuna"){for(let d of mm(n)){let g=pa(i,_a(d),r,l,u);if(g)return o(g)}return o(null)}let h=ru(i,e),f=c==="region"?[n,...ii(n)]:[...new Set([n,...su(e.kind,e.i),...su(e.kind,h)])];return o(pa(i,_a(f),r,l,u))}async function _m(i,e,t,n,s,r,a){let o=[...t],c=[];for(let l=0;l<e.length;l++){let u=e.filter(f=>!o.some(d=>d.kind===f.kind&&d.i===f.i));if(!l&&s&&(u=[s]),r&&u.every(f=>ru(i,f)===f.i))return c;let h=null;for(let f=0;f<au.length&&!h;f++)for(let d of u){a&&await a();let g=gm(i,d,o,n,f);if(g&&(!h||g.length<h.secuencia.length)&&(h={meta:d,secuencia:g},!g.length))break}if(!h)return r?c:null;for(let f of h.secuencia)bn(i,f);c.push(...h.secuencia),o.push(h.meta)}return c}async function xm(i,e,t,n,s=!1,r=null){let a=or(i);ar.clear();for(let o of[null,...e]){let c=or(a),l=await _m(c,e,t,n,o,s,r);if(l)return Object.assign(i,c),l}return null}function ym(i=si){let e=ha(i);return Zl(e,ii(e)[0])}function vm(i,e){let t=[],n=[[]];for(let s=0;s<e;s++){let r=[];for(let a of n)for(let o of i){if(a.length&&cr.get(a[a.length-1])===cr.get(o))continue;let c=[...a,o];r.push(c),t.push(c)}n=r}return t}var ga=new Map;function Mm(i){if(ga.has(i))return ga.get(i);let e=ii(i),t=e[0],n=e.find(c=>c!==t&&nn(c,t)),s=vs([i,t,n]),r=Mn.map((c,l)=>[c,l]).filter(([c])=>c.includes(i)).map(([,c])=>c),a=Sn.map((c,l)=>[c,l]).filter(([c])=>c.includes(i)).map(([,c])=>c),o=null;for(let c of vm(_a([t,n]),4)){let l=rr();for(let u=1;u<=6&&!o;u++){for(let f of c)bn(l,f);r.every(f=>l.ep[f]===f&&l.eo[f]===0)&&a.every(f=>l.cp[f]===f&&(f===s||l.co[f]===0))&&l.co[s]&&(o={hueco:s,alg:Array.from({length:u},()=>c).flat()})}if(o)break}return ga.set(i,o),o}function Sm(i,e=si){let t=Mm(e);if(!t)return null;let n=[];for(let s=0;s<5;s++){let r=null;for(let a=0;a<3&&r===null;a++){let o=or(i);for(let l=0;l<a;l++)for(let u of t.alg)bn(o,u);let c=o.cp[t.hueco];for(let l=s;l<5;l++)bn(o,e);o.co[o.cp.indexOf(c)]===0&&(r=a)}if(r===null)return null;for(let a=0;a<r;a++)for(let o of t.alg)bn(i,o),n.push(o);bn(i,e),n.push(e)}return n}var bm=(i,e)=>i===e?0:nn(i,e)?1:i===ha(e)?3:2;function Em(i,e,t){let n=i==="edge"?Mn:Sn,s=[...e].sort().join(""),r=[];for(let a=0;a<n.length;a++)n[a].map(o=>bm(o,t)).sort().join("")===s&&r.push({kind:i,i:a});return r}var xa=(i=si)=>{let e=ym(i).U;return[{nombre:"estrella",rotulo:"first star",kind:"edge",alturas:[0,1],desde:i},{nombre:"esquinas de la 1\xAA capa",rotulo:"first layer corners",kind:"corner",alturas:[0,1,1],desde:i},{nombre:"aristas de la 2\xAA fila",rotulo:"second row of edges",kind:"edge",alturas:[1,1],desde:i},{nombre:"esquinas de la 3\xAA fila",rotulo:"third row of corners",kind:"corner",alturas:[1,1,2],desde:e},{nombre:"aristas junto a esquina",rotulo:"edges next to corners",kind:"edge",alturas:[1,2],desde:e},{nombre:"esquinas pen\xFAltimas",rotulo:"next-to-last corners",kind:"corner",alturas:[1,2,2],desde:e},{nombre:"aristas pen\xFAltimas",rotulo:"next-to-last edges",kind:"edge",alturas:[2,2],desde:e},{nombre:"aristas de la \xFAltima capa",rotulo:"last layer edges",kind:"edge",alturas:[2,3],desde:e},{nombre:"esquinas de la \xFAltima capa",rotulo:"last layer corners",kind:"corner",alturas:[2,2,3],desde:e,parcial:!0},{nombre:"girar las \xFAltimas esquinas",rotulo:"twisting the corners",kind:"corner",alturas:[2,2,3],desde:e,giro:!0}].map(t=>({...t,piezas:Em(t.kind,t.alturas,i)}))};var wm=(i,e=si)=>xa(e)[i-1].rotulo,cu=xa().length;async function Am(i,e,t=si,n=null){let s=xa(t),r=s[e-1];if(r.giro)return Sm(i,r.desde);let a=[];for(let o of s.slice(0,e-1))for(let c of o.piezas)a.some(l=>l.kind===c.kind&&l.i===c.i)||a.push(c);return xm(i,r.piezas,a,r.desde,r.parcial,n)}async function Tm(i,e=cu,t=si,{aviso:n,respira:s}={}){let r=[];for(let a=1;a<=e;a++){n&&await n(a,wm(a,t),r.length);let o=await Am(i,a,t,s);if(!o)return null;r.push(...o)}return r}var lu=(i,e=si,t)=>Tm(i,cu,e,t);var yt=Object.freeze(["U","L","R","B"]),ur=Object.freeze(yt.flatMap(i=>[i,i+"'"])),Rm=Object.freeze(yt.flatMap(i=>[i.toLowerCase(),i.toLowerCase()+"'"])),kn=Object.freeze((()=>{let i=[];for(let e=0;e<yt.length;e++)for(let t=e+1;t<yt.length;t++)i.push([yt[e],yt[t]]);return i})()),Cm=new Map(kn.map((i,e)=>[i.join(""),e])),ya=new Map(yt.map((i,e)=>[i,e])),Pm=(i,e)=>ya.get(i)-ya.get(e),uu=i=>Cm.get([...i].sort(Pm).join("")),Lm=new Map(Object.entries(js).map(([i,e])=>[e,i])),Im=i=>yt.filter(e=>e!==i);function va(i){let e={ep:new Int8Array(kn.length),eo:new Int8Array(kn.length),co:new Int8Array(yt.length),to:new Int8Array(yt.length)};for(let t of i.getPieces()){let n=t.stickers.map(r=>i._faceOf(r)),s=t.stickers.map(r=>Lm.get(r.color));if(t.kind==="edge"){let r=uu(n),a=uu(s),[o]=kn[r],[c]=kn[a],l=n.indexOf(o);e.ep[r]=a,e.eo[r]=s[l]===c?0:1}else{let r=t.name[0],a=Im(r),o=n.indexOf(a[0]),c=(a.indexOf(s[o])-0+3)%3;(t.kind==="tip"?e.to:e.co)[ya.get(r)]=c}}return e}var hu=()=>({ep:Int8Array.from([0,1,2,3,4,5]),eo:new Int8Array(6),co:new Int8Array(4),to:new Int8Array(4)}),Um=new Map([...ur,...Rm].map(i=>{let e=new wi;return e.applyMove(i),[i,va(e)]})),Ma=i=>i.endsWith("'")?i.slice(0,-1):i+"'",fu=i=>i[0].toUpperCase();function En(i,e){let t=Um.get(e);if(!t)return!1;let n=i.ep.slice(),s=i.eo.slice();for(let r=0;r<n.length;r++){let a=t.ep[r];i.ep[r]=n[a],i.eo[r]=s[a]+t.eo[r]&1}for(let r=0;r<yt.length;r++)i.co[r]=(i.co[r]+t.co[r])%3,i.to[r]=(i.to[r]+t.to[r])%3;return!0}var hr=i=>({ep:i.ep.slice(),eo:i.eo.slice(),co:i.co.slice(),to:i.to.slice()}),Sa=i=>i.co.every(e=>e===0),Dm=i=>i.ep.every((e,t)=>e===t)&&i.eo.every(e=>e===0),du=i=>Sa(i)&&Dm(i)&&i.to.every(e=>e===0);var Om="U",_u=kn.map((i,e)=>[i,e]).filter(([i])=>i.includes(Om)).map(([,i])=>i),Fm=kn.map((i,e)=>e).filter(i=>!_u.includes(i)),pu=new Map(ur.map(i=>[i,fu(i)]));function fr(i,e,t,n,s){if(s(i,n))return!0;if(e===0)return!1;for(let r of ur){if(pu.get(r)===t)continue;En(i,r),n.push(r);let a=fr(i,e-1,pu.get(r),n,s);if(n.pop(),En(i,Ma(r)),a)return!0}return!1}function zm(i){let e=new Array(2*i.length+yt.length);return t=>{for(let n=0;n<i.length;n++){let s=t.ep.indexOf(i[n]);e[2*n]=s,e[2*n+1]=t.eo[s]}for(let n=0;n<t.co.length;n++)e[2*i.length+n]=t.co[n];return String.fromCharCode.apply(null,e)}}function Bm(i,e,t=3,n=4){let s=zm(e),r=new Map,a=hu(),o=(u,h)=>{let f=s(u);return r.has(f)||r.set(f,[...h]),!1};for(let u=0;u<=t;u++)fr(a,u,null,[],o);let c=null,l=(u,h)=>{let f=r.get(s(u));return f?(c=[...h,...f.slice().reverse().map(Ma)],!0):!1};for(let u=0;u<=n&&!c;u++)fr(i,u,null,[],l);return c}var km=[{atras:0,alante:3},{atras:3,alante:3},{atras:4,alante:4},{atras:5,alante:5},{atras:6,alante:6}];function mu(i,e){for(let{atras:t,alante:n}of km){let s=t===0?Vm(i,e,n):Bm(i,e,t,n);if(s)return s}return null}function Vm(i,e,t){let n=a=>Sa(a)&&e.every(o=>a.ep[o]===o&&a.eo[o]===0),s=null,r=(a,o)=>n(a)&&(s=[...o],!0);for(let a=0;a<=t&&!s;a++)fr(i,a,null,[],r);return s}function Hm(i){let e=[];for(let t=0;t<yt.length;t++){if(i.co[t]===0)continue;let n=yt[t];for(let s of[n,n+"'"]){let r=hr(i);if(En(r,s),r.co[t]===0){En(i,s),e.push(s);break}}if(i.co[t]!==0)return null}return e}function gu(i,e,t){let n=[],s=[];if(!t){let r=mu(i,e);if(!r)return null;for(let a of r)En(i,a);return r}for(;s.length<e.length;){let r=null;for(let a of e){if(s.includes(a))continue;let o=mu(i,[...s,a]);if(o&&(!r||o.length<r.secuencia.length)&&(r={hueco:a,secuencia:o},!o.length))break}if(!r)return null;for(let a of r.secuencia)En(i,a);n.push(...r.secuencia),s.push(r.hueco)}return n}function Gm(i){let e=[];for(let t=0;t<yt.length;t++){if(i.to[t]===0)continue;let n=yt[t].toLowerCase();for(let s of[n,n+"'"]){let r=hr(i);if(En(r,s),r.to[t]===0){En(i,s),e.push(s);break}}if(i.to[t]!==0)return null}return e}var Wm=Object.freeze([{nombre:"centros",rotulo:"centres",correr:i=>Hm(i)},{nombre:"capa de abajo",rotulo:"bottom layer",correr:i=>gu(i,_u,!0)},{nombre:"pir\xE1mide peque\xF1a",rotulo:"small pyramid",correr:i=>gu(i,Fm,!1)},{nombre:"puntas",rotulo:"tips",correr:i=>Gm(i)}]);function xu(i,{aviso:e=null}={}){let t=i?.getPieces?va(i):hr(i),n=[];for(let s of Wm){e&&e(s.rotulo,n.length);let r=s.correr(t);if(!r)return null;n.push(...r)}return du(t)?n:null}var Mu=["","'","2"],yu=["U","D","R","L","F","B"].flatMap(i=>Mu.map(e=>i+e)),Xm=i=>["r","l","u","d","f","b",...i%2?["M","E","S"]:[]].flatMap(e=>Mu.map(t=>e+t)),Ms=i=>i.endsWith("2")?i:i.endsWith("'")?i.slice(0,-1):`${i}'`,qm=i=>i.trim().split(/\s+/).filter(Boolean).reverse().map(Ms).join(" "),dr=i=>`${i.x.toFixed(1)},${i.y.toFixed(1)},${i.z.toFixed(1)}`;function wa(i,e,t){for(let n of(e??"").trim().split(/\s+/))n&&(i.applyMove(n),t?.push(n))}var Aa=(i,e)=>[i.x,i.y,i.z].filter(t=>Math.abs(Math.abs(t)-e)<1e-6).length===1;function Su(i,e){return Math.abs(i.y-e)<1e-6?"py":Math.abs(i.y+e)<1e-6?"ny":Math.abs(i.x-e)<1e-6?"px":Math.abs(i.x+e)<1e-6?"nx":Math.abs(i.z-e)<1e-6?"pz":"nz"}function vu(i,e){let t=new Rt(i),n=(i-1)/2,r=t.getPieces().map(o=>({piece:o,from:{...o.position}}));wa(t,e);let a=new Map;for(let{piece:o,from:c}of r)Aa(c,n)&&a.set(dr(c),dr(o.position));return a}var ba=new Map;function Ym(i){if(ba.has(i))return ba.get(i);let e=Xm(i),t=[];for(let c of e)for(let l of yu)for(let u of e){let h=`${c} ${l} ${u} ${Ms(l)} ${Ms(c)} ${l} ${Ms(u)} ${Ms(l)}`,d=[...vu(i,h)].filter(([g,_])=>g!==_);d.length===3&&t.push({alg:h,moved:d})}let n=[];for(let c of["",...e,...yu]){let l=c?vu(i,c):null,u=l?new Map([...l].map(([h,f])=>[f,h])):null;for(let h of t)n.push({alg:c?`${c} ${h.alg} ${qm(c)}`:h.alg,moved:u?h.moved.map(([f,d])=>[u.get(f),u.get(d)]):h.moved})}let s=(i-1)/2,r=new Map,a=(c,l,u)=>{let h=bu(l.moved[0][0],s);r.has(h)||r.set(h,{clave:h,base:[],macros:[],places:new Set}),r.get(h)[u].push(l);for(let[f,d]of l.moved)r.get(h).places.add(f),r.get(h).places.add(d)};for(let c of t)a(null,c,"base");for(let c of n)a(null,c,"macros");let o={base:t,macros:n,target:$m(i),orbits:[...r.values()]};return ba.set(i,o),o}var bu=(i,e)=>i.split(",").map(Number).filter(t=>Math.abs(Math.abs(t)-e)>1e-6).map(t=>Math.abs(t)).sort().join("|");function $m(i){let e=new Rt(i),t=(i-1)/2,n=new Map;for(let s of e.getPieces())Aa(s.position,t)&&n.set(dr(s.position),s.faces[Su(s.position,t)]);return n}var Eu=(i,e)=>{let t=new Map;for(let n of i.getPieces())Aa(n.position,e)&&t.set(dr(n.position),n.faces[Su(n.position,e)]);return t};function Ea(i,e,t){let n=0;for(let[s,r]of e)n+=(i.get(s)===t.get(r)?1:0)-(i.get(r)===t.get(r)?1:0);return n}var Zm=(i,e)=>{let t=new Map(i);for(let[n,s]of e)t.set(s,i.get(n));return t};function Ss(i,e,t=60){if(i.n!==4&&i.n!==5)return!1;let n=(i.n-1)/2,{target:s,orbits:r}=Ym(i.n);if(!jm(i,e,n,s))return!1;for(let a of r)if(!Jm(i,e,n,s,a,t))return!1;return!0}function jm(i,e,t,n){if(i.n%2===0)return!0;let s=()=>[...Eu(i,t)].every(([l,u])=>bu(l,t)!=="0|0"||u===n.get(l));if(s())return!0;let r=["M","M'","M2","E","E'","E2","S","S'","S2"],a=[],o=c=>{if(s())return!0;if(c===0)return!1;for(let l of r){if(i.applyMove(l),a.push(l),o(c-1))return!0;a.pop(),i.applyInverse(l)}return!1};for(let c=1;c<=3;c++){if(o(c))return e?.push(...a),!0;a.length=0}return!1}function Jm(i,e,t,n,{base:s,macros:r,places:a},o){let c=l=>[...a].every(u=>l.get(u)===n.get(u));for(let l=0;l<o;l++){let u=Eu(i,t);if(c(u))return!0;let h=null;for(let d of r){let g=Ea(u,d.moved,n);if((!h||g>h.g)&&(h={g,alg:d.alg},g===3))break}if(h&&h.g>0){wa(i,h.alg,e);continue}let f=null;for(let d of s){let g=Zm(u,d.moved),_=Ea(u,d.moved,n);for(let m of r){let p=_+Ea(g,m.moved,n);if((!f||p>f.g)&&(f={g:p,alg:`${d.alg} ${m.alg}`},p>=4))break}if(f&&f.g>=4)break}if(!f||f.g<=0)return!1;wa(i,f.alg,e)}return!1}var Au=["","'","2"],pr=["U","D","R","L","F","B"].flatMap(i=>Au.map(e=>i+e)),Tu={x:["nx","px"],y:["ny","py"],z:["nz","pz"]},Ru=i=>i.endsWith("2")?i:i.endsWith("'")?i.slice(0,-1):`${i}'`,mr=i=>(i??"").trim().split(/\s+/).filter(Boolean),Cu=i=>mr(i).reverse().map(Ru).join(" ");function Wt(i,e,t){for(let n of mr(e))i.applyMove(n),t?.push(n)}var Pu=(i,e)=>{let t=mr(e);for(let n=t.length-1;n>=0;n--)i.applyInverse(t[n])},Ci=i=>(i.n-1)/2,ri=(i,e)=>Math.abs(Math.abs(i)-e)<1e-6,wn=(i,e)=>[i.x,i.y,i.z].filter(t=>ri(t,e)).length===2;function gr(i,e){let t=[];for(let n of["x","y","z"]){let s=i.position[n];if(!ri(s,e))continue;let r=Tu[n][s>0?1:0];t.push([r,i.faces[r]])}return t}var Lu=(i,e)=>["x","y","z"].map(t=>ri(i.position[t],e)?Math.sign(i.position[t]):0).join(",");function _r(i){let e=Ci(i),t=new Map;for(let n of Iu(i)){let s=Lu(n,e);t.has(s)||t.set(s,[]),t.get(s).push(n)}return t}var wu=new WeakMap;function Iu(i){let e=wu.get(i);if(e)return e;let t=Ci(i),n=i.getPieces().filter(s=>wn(s.position,t));return wu.set(i,n),n}var Pa=(i,e)=>gr(i,e).map(([t,n])=>`${t}${n}`).sort().join("|"),La=(i,e)=>i.every(t=>Pa(t,e)===Pa(i[0],e));function Ta(i){let e=Ci(i),t=new Map;for(let s of Iu(i)){let r=Lu(s,e),a=t.get(r);a||t.set(r,a=[]),a.push(Pa(s,e))}let n=0;for(let s of t.values()){let r=0;for(let a of s){let o=0;for(let c of s)c===a&&o++;o>r&&(r=o)}n+=r-1}return n}var xr=i=>{let e=Ci(i),t=0;for(let n of _r(i).values())La(n,e)&&t++;return t},Ra=new Map;function Ia(i,e,t){let n=`${t}:${i}`;if(Ra.has(n))return Ra.get(n);let s=[""];for(let a=0;a<i;a++){let o=[];for(let c of s){let l=mr(c).at(-1)?.[0];for(let u of pr)u[0]!==l&&o.push(c?`${c} ${u}`:u)}s=o}let r=[];for(let a of s)for(let o of e)r.push(a?`${a} ${o} ${Cu(a)}`:o);return Ra.set(n,r),r}var Ca=new Map;function Uu(i,e){if(Ca.has(i))return Ca.get(i);let t=(i-1)/2,n=["r","l","u","d","f","b",...i%2?["M","E","S"]:[]].flatMap(d=>Au.map(g=>d+g)),s=[];for(let d of pr)for(let g of pr)if(d[0]!==g[0])for(let _ of pr)g[0]!==_[0]&&s.push(`${d} ${g} ${_}`);let r=new e(i),a=d=>[d.x,d.y,d.z].filter(g=>ri(g,t)).length===1;r.cubies=r.cubies.filter(d=>wn(d.position,t)||a(d.position));let o=d=>`${d.position.x},${d.position.y},${d.position.z}`,c=r.cubies.map(d=>({arista:wn(d.position,t),sitio:o(d)})),l=d=>{for(let g of["x","y","z"]){let _=d.position[g];if(ri(_,t))return d.faces[Tu[g][_>0?1:0]]}return null},u=new Map;for(let d of r.cubies)wn(d.position,t)||u.set(o(d),l(d));let h=()=>{for(let d of r.cubies)if(!wn(d.position,t)&&u.get(o(d))!==l(d))return!1;return!0},f=[];for(let d of n)for(let g of s){let _=`${d} ${g} ${Ru(d)} ${Cu(g)}`;Wt(r,_);let m=0;for(let b=0;b<r.cubies.length&&m<=3;b++)c[b].arista&&o(r.cubies[b])!==c[b].sitio&&m++;let p=m===3&&h();Pu(r,_),p&&f.push(_)}return Ca.set(i,f),f}function yr(i,e,{niveles:t,limit:n=80,paciencia:s=3}){let r=12*(_r(i).values().next().value.length-1),a=1,o=h=>(a=a*1103515245+12345&2147483647)%h,c=i.clone();c.cubies=c.cubies.filter(h=>wn(h.position,Ci(i)));let l=h=>{Wt(c,h),Wt(i,h,e)},u=0;for(let h=0;h<n;h++){let f=Ta(c);if(f===r)return!0;let d=null,g=t.map(()=>[]);for(let m=0;m<t.length&&!d;m++){let{depth:p,bases:b,marca:y,sacude:T}=t[m];for(let L of Ia(p,b,y)){Wt(c,L);let C=Ta(c);if(Pu(c,L),C>f&&(!d||C>d.after)?d={after:C,alg:L}:C===f&&T&&g[m].push(L),d&&d.after===r)break}}if(d){l(d.alg),u=0;continue}let _=g.map((m,p)=>({algs:m,rango:t[p].sacude??1/0})).filter(m=>m.algs.length).sort((m,p)=>m.rango-p.rango).flatMap(m=>m.algs);if(!_.length||++u>s)return!1;l(_[o(_.length)])}return Ta(c)===r}function vr(i,e){let t=Ci(i),n=new e(3),s=r=>ri(r,t)?Math.sign(r):0;for(let r of i.getPieces()){let{x:a,y:o,z:c}=r.position;if(![a,o,c].every(h=>ri(h,t))&&!wn(r.position,t))continue;let u=n.getPieces().find(h=>h.position.x===s(a)&&h.position.y===s(o)&&h.position.z===s(c));if(!u)return null;for(let[h,f]of gr(r,t)){if(!f)return null;u.setFaceColor(h,f)}}return n}var Mr=i=>i.filter(e=>/^[UDRLFB](2|'|)$/.test(e));var Ou="u R F' U R' F u'",Sr=Object.freeze(["(Rr)' U' R' U (Rr)","(Ll) U L U' (Ll)'",Ou,"(Rr) U R U' (Rr)'","(Ll)' U' L U (Ll)"]),Km=Object.freeze([{depth:0,bases:Sr,marca:"juntar4"},{depth:1,bases:Sr,marca:"juntar4",sacude:1},{depth:2,bases:Sr,marca:"juntar4"},{depth:3,bases:Sr,marca:"juntar4"},{depth:4,bases:[Ou],marca:"ultimas4"}]),Du="(Rr)2 B2 U2 (Ll) U2 (Rr)' U2 (Rr) U2 F2 (Rr) F2 (Ll)' B2 (Rr)2",Nu="r2 U2 r2 (Uu)2 r2 u2",Qm=Object.freeze(["",Du,Nu,`${Du} ${Nu}`]),eg=(i,e)=>yr(i,e,{niveles:Km}),tg=i=>vr(i,Rt);function Fu(i,{aviso:e=null}={}){if(i.n!==4)return null;let t=i.clone(),n=[],s=[],r=a=>s.push({nombre:a,desde:s.at(-1)?.hasta??0,hasta:n.length});if(e?.("centres"),!Ss(t,n)||(r("centres"),e?.("edge pairing"),!eg(t,n)))return null;r("edge pairing"),e?.("the 3\xD73\xD73");for(let a of Qm){let o=t.clone();if(Wt(o,a),xr(o)!==12)continue;let c=tg(o),l=c&&Ri(c);if(!l?.solved)continue;let u=Mr(l.moves);if(u.length!==l.moves.length)return null;Wt(t,a,n),a&&r("parity"),Wt(t,u.join(" "),n);let h=s.at(-1)?.hasta??0;for(let f of l.etapas??[])s.push({nombre:f.nombre,desde:h+f.desde,hasta:h+f.hasta});return{moves:n,solved:t.isSolved(),state:t,etapas:s}}return null}var br=Object.freeze(["(Ll) U L U' (Ll)'","(Rr)' U' R' U (Rr)","(Ll)' U' L U (Ll)","(Rr) U R U' (Rr)'","l U L U' l'","r' U' R' U r","M U L U' M'","M' U' R' U M"]),ng=Object.freeze(["(Ll) U L U' F' U' F U (Ll)'","(Rr)' U' R' U F U F' U' (Rr)","u R F' U R' F u'","l U L U' F' U' F U l'","r' U' R' U F U F' U' r","M U L U' F' U' F U M'","M' U' R' U F U F' U' M"]),zu="(Rr)2 B2 U2 (Ll) U2 (Rr)' U2 (Rr) U2 F2 (Rr) F2 (Ll)' B2 (Rr)2",ig=null,sg=()=>ig??(ig=[{depth:0,bases:br,marca:"juntar5"},{depth:1,bases:br,marca:"juntar5",sacude:2},{depth:2,bases:br,marca:"juntar5"},{depth:0,bases:Uu(5,Rt),marca:"ciclos5"},{depth:3,bases:br,marca:"juntar5"},{depth:3,bases:ng,marca:"ultimas5"},{depth:2,bases:[zu],marca:"orientar5",sacude:1}]),rg=Object.freeze(["",zu]),og=(i,e)=>yr(i,e,{niveles:sg()});function ag(i,e,t){let n=["r","u","f","r'","u'","f'"];for(let s=0;s<=n.length;s++){if(og(i,e))return!0;if(s===n.length||(t?.("wing parity"),Wt(i,n[s],e),!Ss(i,e)))return!1}return!1}var cg=i=>vr(i,Rt);function Bu(i,{aviso:e=null}={}){if(i.n!==5)return null;let t=i.clone(),n=[],s=[],r=a=>s.push({nombre:a,desde:s.at(-1)?.hasta??0,hasta:n.length});if(e?.("centres"),!Ss(t,n)||(r("centres"),e?.("edge pairing"),!ag(t,n,e)))return null;r("edge pairing"),e?.("the 3\xD73\xD73");for(let a of rg){let o=t.clone();if(Wt(o,a),xr(o)!==12)continue;let c=cg(o),l=c&&Ri(c);if(!l?.solved)continue;let u=Mr(l.moves);if(u.length!==l.moves.length)return null;Wt(t,a,n),a&&r("parity"),Wt(t,u.join(" "),n);let h=s.at(-1)?.hasta??0;for(let f of l.etapas??[])s.push({nombre:f.nombre,desde:h+f.desde,hasta:h+f.hasta});return{moves:n,solved:t.isSolved(),state:t,etapas:s}}return null}var lg=Math.PI;function ug(i){return i===1?1:i===2?2:i===3?-1:0}function Er(i,e,t=1){let n=i.getRotationAxis(e.face);if(n&&typeof n.axis=="string"){let r=ug(e.times);return{axis:n.axis,angle:t*n.sign*r*(lg/2)}}let s=i.getAnglePerMove();return{axis:{x:n.x,y:n.y,z:n.z},angle:t*e.times*s}}var Si={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},bi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hg=0,ku=1,fg=2;var df=1,dg=2,Ln=3,en=0,Ft=1,In=2;var $n=0,Ki=1,Vu=2,Hu=3,Gu=4,pg=5,hi=100,mg=101,gg=102,Wu=103,Xu=104,_g=200,xg=201,yg=202,vg=203,uc=204,hc=205,Mg=206,Sg=207,bg=208,Eg=209,wg=210,Ag=211,Tg=212,Rg=213,Cg=214,Pg=0,Lg=1,Ig=2,Jr=3,Ug=4,Dg=5,Ng=6,Og=7,pf=0,Fg=1,zg=2,Zn=0,Bg=1,kg=2,Vg=3,Hg=4,Gg=5,Wg=6;var mf=300,ts=301,ns=302,fc=303,dc=304,wo=306,pc=1e3,cn=1001,mc=1002,It=1003,qu=1004;var Ua=1005;var Kt=1006,Xg=1007;var Ds=1008;var jn=1009,qg=1010,Yg=1011,$c=1012,gf=1013,qn=1014,Yn=1015,Ns=1016,_f=1017,xf=1018,pi=1020,$g=1021,ln=1023,Zg=1024,jg=1025,mi=1026,is=1027,Jg=1028,yf=1029,Kg=1030,vf=1031,Mf=1033,Da=33776,Na=33777,Oa=33778,Fa=33779,Yu=35840,$u=35841,Zu=35842,ju=35843,Sf=36196,Ju=37492,Ku=37496,Qu=37808,eh=37809,th=37810,nh=37811,ih=37812,sh=37813,rh=37814,oh=37815,ah=37816,ch=37817,lh=37818,uh=37819,hh=37820,fh=37821,za=36492,dh=36494,ph=36495,Qg=36283,mh=36284,gh=36285,_h=36286;var Kr=2300,Qr=2301,Ba=2302,xh=2400,yh=2401,vh=2402;var bf=3e3,gi=3001,e_=3200,t_=3201,Ef=0,n_=1,Qt="",vt="srgb",On="srgb-linear",Zc="display-p3",Ao="display-p3-linear",eo="linear",nt="srgb",to="rec709",no="p3";var Pi=7680;var Mh=519,i_=512,s_=513,r_=514,wf=515,o_=516,a_=517,c_=518,l_=519,gc=35044;var Sh="300 es",_c=1035,Un=2e3,io=2001,mn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},St=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],bh=1234567,Ps=Math.PI/180,Os=180/Math.PI;function Dn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(St[i&255]+St[i>>8&255]+St[i>>16&255]+St[i>>24&255]+"-"+St[e&255]+St[e>>8&255]+"-"+St[e>>16&15|64]+St[e>>24&255]+"-"+St[t&63|128]+St[t>>8&255]+"-"+St[t>>16&255]+St[t>>24&255]+St[n&255]+St[n>>8&255]+St[n>>16&255]+St[n>>24&255]).toLowerCase()}function Et(i,e,t){return Math.max(e,Math.min(t,i))}function jc(i,e){return(i%e+e)%e}function u_(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function h_(i,e,t){return i!==e?(t-i)/(e-i):0}function Ls(i,e,t){return(1-t)*i+t*e}function f_(i,e,t,n){return Ls(i,e,1-Math.exp(-t*n))}function d_(i,e=1){return e-Math.abs(jc(i,e*2)-e)}function p_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function m_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function g_(i,e){return i+Math.floor(Math.random()*(e-i+1))}function __(i,e){return i+Math.random()*(e-i)}function x_(i){return i*(.5-Math.random())}function y_(i){i!==void 0&&(bh=i);let e=bh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function v_(i){return i*Ps}function M_(i){return i*Os}function xc(i){return(i&i-1)===0&&i!==0}function S_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function so(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function b_(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),f=a((e-n)/2),d=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*h,c*f,o*l);break;case"YZY":i.set(c*f,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*f,o*u,o*l);break;case"XZX":i.set(o*u,c*g,c*d,o*l);break;case"YXY":i.set(c*d,o*u,c*g,o*l);break;case"ZYZ":i.set(c*g,c*d,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function pn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ke(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Af={DEG2RAD:Ps,RAD2DEG:Os,generateUUID:Dn,clamp:Et,euclideanModulo:jc,mapLinear:u_,inverseLerp:h_,lerp:Ls,damp:f_,pingpong:d_,smoothstep:p_,smootherstep:m_,randInt:g_,randFloat:__,randFloatSpread:x_,seededRandom:y_,degToRad:v_,radToDeg:M_,isPowerOfTwo:xc,ceilPowerOfTwo:S_,floorPowerOfTwo:so,setQuaternionFromProperEuler:b_,normalize:Ke,denormalize:pn},be=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},We=class i{constructor(e,t,n,s,r,a,o,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],b=s[1],y=s[4],T=s[7],L=s[2],C=s[5],A=s[8];return r[0]=a*_+o*b+c*L,r[3]=a*m+o*y+c*C,r[6]=a*p+o*T+c*A,r[1]=l*_+u*b+h*L,r[4]=l*m+u*y+h*C,r[7]=l*p+u*T+h*A,r[2]=f*_+d*b+g*L,r[5]=f*m+d*y+g*C,r[8]=f*p+d*T+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,f=o*c-u*r,d=l*r-a*c,g=t*h+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=h*_,e[1]=(s*l-u*n)*_,e[2]=(o*n-s*a)*_,e[3]=f*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ka.makeScale(e,t)),this}rotate(e){return this.premultiply(ka.makeRotation(-e)),this}translate(e,t){return this.premultiply(ka.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ka=new We;function Tf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ro(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function E_(){let i=ro("canvas");return i.style.display="block",i}var Eh={};function Is(i){i in Eh||(Eh[i]=!0,console.warn(i))}var wh=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ah=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),wr={[On]:{transfer:eo,primaries:to,toReference:i=>i,fromReference:i=>i},[vt]:{transfer:nt,primaries:to,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ao]:{transfer:eo,primaries:no,toReference:i=>i.applyMatrix3(Ah),fromReference:i=>i.applyMatrix3(wh)},[Zc]:{transfer:nt,primaries:no,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Ah),fromReference:i=>i.applyMatrix3(wh).convertLinearToSRGB()}},w_=new Set([On,Ao]),Qe={enabled:!0,_workingColorSpace:On,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!w_.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=wr[e].toReference,s=wr[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return wr[i].primaries},getTransfer:function(i){return i===Qt?eo:wr[i].transfer}};function Qi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Va(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Li,oo=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Li===void 0&&(Li=ro("canvas")),Li.width=e.width,Li.height=e.height;let n=Li.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Li}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ro("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Qi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Qi(t[n]/255)*255):t[n]=Qi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},A_=0,ao=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:A_++}),this.uuid=Dn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ha(s[a].image)):r.push(Ha(s[a]))}else r=Ha(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ha(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?oo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var T_=0,tn=class i extends mn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=cn,s=cn,r=Kt,a=Ds,o=ln,c=jn,l=i.DEFAULT_ANISOTROPY,u=Qt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:T_++}),this.uuid=Dn(),this.name="",this.source=new ao(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Is("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===gi?vt:Qt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case pc:e.x=e.x-Math.floor(e.x);break;case cn:e.x=e.x<0?0:1;break;case mc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case pc:e.y=e.y-Math.floor(e.y);break;case cn:e.y=e.y<0?0:1;break;case mc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Is("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===vt?gi:bf}set encoding(e){Is("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===gi?vt:Qt}};tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=mf;tn.DEFAULT_ANISOTROPY=1;var _t=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,T=(d+1)/2,L=(p+1)/2,C=(u+f)/4,A=(h+_)/4,Y=(g+m)/4;return y>T&&y>L?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=C/n,r=A/n):T>L?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=C/s,r=Y/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=A/r,s=Y/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(h-_)/b,this.z=(f-u)/b,this.w=Math.acos((l+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},yc=class extends mn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);let s={width:e,height:t,depth:1};n.encoding!==void 0&&(Is("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===gi?vt:Qt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new tn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new ao(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Fn=class extends yc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},co=class extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var vc=class extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var zt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3],f=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==f||l!==d||u!==g){let m=1-o,p=c*f+l*d+u*g+h*_,b=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let L=Math.sqrt(y),C=Math.atan2(L,p*b);m=Math.sin(m*C)/L,o=Math.sin(o*C)/L}let T=o*b;if(c=c*m+f*T,l=l*m+d*T,u=u*m+g*T,h=h*m+_*T,m===1-o){let L=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=L,l*=L,u*=L,h*=L}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return e[t]=o*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-o*d,e[t+2]=l*g+u*d+o*f-c*h,e[t+3]=u*g-o*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>h){let d=2*Math.sqrt(1+n-o-h);this._w=(u-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>h){let d=2*Math.sqrt(1+o-n-h);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+u)/d}else{let d=2*Math.sqrt(1+h-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Et(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Th.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Th.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ga.copy(this).projectOnVector(e),this.sub(Ga)}reflect(e){return this.sub(Ga.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ga=new U,Th=new zt,zn=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,sn):sn.fromBufferAttribute(r,a),sn.applyMatrix4(e.matrixWorld),this.expandByPoint(sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ar.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ar.copy(n.boundingBox)),Ar.applyMatrix4(e.matrixWorld),this.union(Ar)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,sn),sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bs),Tr.subVectors(this.max,bs),Ii.subVectors(e.a,bs),Ui.subVectors(e.b,bs),Di.subVectors(e.c,bs),Vn.subVectors(Ui,Ii),Hn.subVectors(Di,Ui),oi.subVectors(Ii,Di);let t=[0,-Vn.z,Vn.y,0,-Hn.z,Hn.y,0,-oi.z,oi.y,Vn.z,0,-Vn.x,Hn.z,0,-Hn.x,oi.z,0,-oi.x,-Vn.y,Vn.x,0,-Hn.y,Hn.x,0,-oi.y,oi.x,0];return!Wa(t,Ii,Ui,Di,Tr)||(t=[1,0,0,0,1,0,0,0,1],!Wa(t,Ii,Ui,Di,Tr))?!1:(Rr.crossVectors(Vn,Hn),t=[Rr.x,Rr.y,Rr.z],Wa(t,Ii,Ui,Di,Tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(An),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},An=[new U,new U,new U,new U,new U,new U,new U,new U],sn=new U,Ar=new zn,Ii=new U,Ui=new U,Di=new U,Vn=new U,Hn=new U,oi=new U,bs=new U,Tr=new U,Rr=new U,ai=new U;function Wa(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ai.fromArray(i,r);let o=s.x*Math.abs(ai.x)+s.y*Math.abs(ai.y)+s.z*Math.abs(ai.z),c=e.dot(ai),l=t.dot(ai),u=n.dot(ai);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var R_=new zn,Es=new U,Xa=new U,_i=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):R_.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Es.subVectors(e,this.center);let t=Es.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Es,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Es.copy(e.center).add(Xa)),this.expandByPoint(Es.copy(e.center).sub(Xa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Tn=new U,qa=new U,Cr=new U,Gn=new U,Ya=new U,Pr=new U,$a=new U,ss=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Tn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Tn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Tn.copy(this.origin).addScaledVector(this.direction,t),Tn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){qa.copy(e).add(t).multiplyScalar(.5),Cr.copy(t).sub(e).normalize(),Gn.copy(this.origin).sub(qa);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Cr),o=Gn.dot(this.direction),c=-Gn.dot(Cr),l=Gn.lengthSq(),u=Math.abs(1-a*a),h,f,d,g;if(u>0)if(h=a*c-o,f=a*o-c,g=r*u,h>=0)if(f>=-g)if(f<=g){let _=1/u;h*=_,f*=_,d=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(qa).addScaledVector(Cr,f),d}intersectSphere(e,t){Tn.subVectors(e.center,this.origin);let n=Tn.dot(this.direction),s=Tn.dot(Tn)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Tn)!==null}intersectTriangle(e,t,n,s,r){Ya.subVectors(t,e),Pr.subVectors(n,e),$a.crossVectors(Ya,Pr);let a=this.direction.dot($a),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Gn.subVectors(this.origin,e);let c=o*this.direction.dot(Pr.crossVectors(Gn,Pr));if(c<0)return null;let l=o*this.direction.dot(Ya.cross(Gn));if(l<0||c+l>a)return null;let u=-o*Gn.dot($a);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},lt=class i{constructor(e,t,n,s,r,a,o,c,l,u,h,f,d,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,h,f,d,g,_,m)}set(e,t,n,s,r,a,o,c,l,u,h,f,d,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Ni.setFromMatrixColumn(e,0).length(),r=1/Ni.setFromMatrixColumn(e,1).length(),a=1/Ni.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let f=a*u,d=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-_*l,t[9]=-o*c,t[2]=_-f*l,t[6]=g+d*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*u,d=c*h,g=l*u,_=l*h;t[0]=f+_*o,t[4]=g*o-d,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=_+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*u,d=c*h,g=l*u,_=l*h;t[0]=f-_*o,t[4]=-a*h,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=_-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*u,d=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+_,t[1]=c*h,t[5]=_*l+f,t[9]=d*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=_-f*h,t[8]=g*h+d,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-_*h}else if(e.order==="XZY"){let f=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+_,t[5]=a*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=o*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(C_,e,P_)}lookAt(e,t,n){let s=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Wn.crossVectors(n,Xt),Wn.lengthSq()===0&&(Math.abs(n.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Wn.crossVectors(n,Xt)),Wn.normalize(),Lr.crossVectors(Xt,Wn),s[0]=Wn.x,s[4]=Lr.x,s[8]=Xt.x,s[1]=Wn.y,s[5]=Lr.y,s[9]=Xt.y,s[2]=Wn.z,s[6]=Lr.z,s[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],y=n[7],T=n[11],L=n[15],C=s[0],A=s[4],Y=s[8],M=s[12],E=s[1],V=s[5],$=s[9],ae=s[13],I=s[2],N=s[6],G=s[10],X=s[14],q=s[3],W=s[7],Q=s[11],ne=s[15];return r[0]=a*C+o*E+c*I+l*q,r[4]=a*A+o*V+c*N+l*W,r[8]=a*Y+o*$+c*G+l*Q,r[12]=a*M+o*ae+c*X+l*ne,r[1]=u*C+h*E+f*I+d*q,r[5]=u*A+h*V+f*N+d*W,r[9]=u*Y+h*$+f*G+d*Q,r[13]=u*M+h*ae+f*X+d*ne,r[2]=g*C+_*E+m*I+p*q,r[6]=g*A+_*V+m*N+p*W,r[10]=g*Y+_*$+m*G+p*Q,r[14]=g*M+_*ae+m*X+p*ne,r[3]=b*C+y*E+T*I+L*q,r[7]=b*A+y*V+T*N+L*W,r[11]=b*Y+y*$+T*G+L*Q,r[15]=b*M+y*ae+T*X+L*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*h-s*l*h-r*o*f+n*l*f+s*o*d-n*c*d)+_*(+t*c*d-t*l*f+r*a*f-s*a*d+s*l*u-r*c*u)+m*(+t*l*h-t*o*d-r*a*h+n*a*d+r*o*u-n*l*u)+p*(-s*o*u-t*c*h+t*o*f+s*a*h-n*a*f+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=h*m*l-_*f*l+_*c*d-o*m*d-h*c*p+o*f*p,y=g*f*l-u*m*l-g*c*d+a*m*d+u*c*p-a*f*p,T=u*_*l-g*h*l+g*o*d-a*_*d-u*o*p+a*h*p,L=g*h*c-u*_*c-g*o*f+a*_*f+u*o*m-a*h*m,C=t*b+n*y+s*T+r*L;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/C;return e[0]=b*A,e[1]=(_*f*r-h*m*r-_*s*d+n*m*d+h*s*p-n*f*p)*A,e[2]=(o*m*r-_*c*r+_*s*l-n*m*l-o*s*p+n*c*p)*A,e[3]=(h*c*r-o*f*r-h*s*l+n*f*l+o*s*d-n*c*d)*A,e[4]=y*A,e[5]=(u*m*r-g*f*r+g*s*d-t*m*d-u*s*p+t*f*p)*A,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*p-t*c*p)*A,e[7]=(a*f*r-u*c*r+u*s*l-t*f*l-a*s*d+t*c*d)*A,e[8]=T*A,e[9]=(g*h*r-u*_*r-g*n*d+t*_*d+u*n*p-t*h*p)*A,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*p+t*o*p)*A,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*d-t*o*d)*A,e[12]=L*A,e[13]=(u*_*s-g*h*s+g*n*f-t*_*f-u*n*m+t*h*m)*A,e[14]=(g*o*s-a*_*s-g*n*c+t*_*c+a*n*m-t*o*m)*A,e[15]=(a*h*s-u*o*s+u*n*c-t*h*c-a*n*f+t*o*f)*A,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,f=r*l,d=r*u,g=r*h,_=a*u,m=a*h,p=o*h,b=c*l,y=c*u,T=c*h,L=n.x,C=n.y,A=n.z;return s[0]=(1-(_+p))*L,s[1]=(d+T)*L,s[2]=(g-y)*L,s[3]=0,s[4]=(d-T)*C,s[5]=(1-(f+p))*C,s[6]=(m+b)*C,s[7]=0,s[8]=(g+y)*A,s[9]=(m-b)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Ni.set(s[0],s[1],s[2]).length(),a=Ni.set(s[4],s[5],s[6]).length(),o=Ni.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],rn.copy(this);let l=1/r,u=1/a,h=1/o;return rn.elements[0]*=l,rn.elements[1]*=l,rn.elements[2]*=l,rn.elements[4]*=u,rn.elements[5]*=u,rn.elements[6]*=u,rn.elements[8]*=h,rn.elements[9]*=h,rn.elements[10]*=h,t.setFromRotationMatrix(rn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Un){let c=this.elements,l=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),f=(n+s)/(n-s),d,g;if(o===Un)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===io)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Un){let c=this.elements,l=1/(t-e),u=1/(n-s),h=1/(a-r),f=(t+e)*l,d=(n+s)*u,g,_;if(o===Un)g=(a+r)*h,_=-2*h;else if(o===io)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ni=new U,rn=new lt,C_=new U(0,0,0),P_=new U(1,1,1),Wn=new U,Lr=new U,Xt=new U,Rh=new lt,Ch=new zt,lo=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Et(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Et(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Et(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ch.setFromEuler(this),this.setFromQuaternion(Ch,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};lo.DEFAULT_ORDER="XYZ";var Fs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},L_=0,Ph=new U,Oi=new zt,Rn=new lt,Ir=new U,ws=new U,I_=new U,U_=new zt,Lh=new U(1,0,0),Ih=new U(0,1,0),Uh=new U(0,0,1),D_={type:"added"},N_={type:"removed"},wt=class i extends mn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:L_++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new U,t=new lo,n=new zt,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new lt},normalMatrix:{value:new We}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.premultiply(Oi),this}rotateX(e){return this.rotateOnAxis(Lh,e)}rotateY(e){return this.rotateOnAxis(Ih,e)}rotateZ(e){return this.rotateOnAxis(Uh,e)}translateOnAxis(e,t){return Ph.copy(e).applyQuaternion(this.quaternion),this.position.add(Ph.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Lh,e)}translateY(e){return this.translateOnAxis(Ih,e)}translateZ(e){return this.translateOnAxis(Uh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ir.copy(e):Ir.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(ws,Ir,this.up):Rn.lookAt(Ir,ws,this.up),this.quaternion.setFromRotationMatrix(Rn),s&&(Rn.extractRotation(s.matrixWorld),Oi.setFromRotationMatrix(Rn),this.quaternion.premultiply(Oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(D_)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(N_)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,e,I_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ws,U_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++){let o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};wt.DEFAULT_UP=new U(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var on=new U,Cn=new U,Za=new U,Pn=new U,Fi=new U,zi=new U,Dh=new U,ja=new U,Ja=new U,Ka=new U,Ur=!1,di=class i{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),on.subVectors(e,t),s.cross(on);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){on.subVectors(s,t),Cn.subVectors(n,t),Za.subVectors(e,t);let a=on.dot(on),o=on.dot(Cn),c=on.dot(Za),l=Cn.dot(Cn),u=Cn.dot(Za),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;let f=1/h,d=(l*c-o*u)*f,g=(a*u-o*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getUV(e,t,n,s,r,a,o,c){return Ur===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ur=!0),this.getInterpolation(e,t,n,s,r,a,o,c)}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Pn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Pn.x),c.addScaledVector(a,Pn.y),c.addScaledVector(o,Pn.z),c)}static isFrontFacing(e,t,n,s){return on.subVectors(n,t),Cn.subVectors(e,t),on.cross(Cn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return on.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),on.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return Ur===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ur=!0),i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Fi.subVectors(s,n),zi.subVectors(r,n),ja.subVectors(e,n);let c=Fi.dot(ja),l=zi.dot(ja);if(c<=0&&l<=0)return t.copy(n);Ja.subVectors(e,s);let u=Fi.dot(Ja),h=zi.dot(Ja);if(u>=0&&h<=u)return t.copy(s);let f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Fi,a);Ka.subVectors(e,r);let d=Fi.dot(Ka),g=zi.dot(Ka);if(g>=0&&d<=g)return t.copy(r);let _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(zi,o);let m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Dh.subVectors(r,s),o=(h-u)/(h-u+(d-g)),t.copy(s).addScaledVector(Dh,o);let p=1/(m+_+f);return a=_*p,o=f*p,t.copy(n).addScaledVector(Fi,a).addScaledVector(zi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Rf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},Dr={h:0,s:0,l:0};function Qa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ve=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Qe.workingColorSpace){if(e=jc(e,1),t=Et(t,0,1),n=Et(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Qa(a,r,e+1/3),this.g=Qa(a,r,e),this.b=Qa(a,r,e-1/3)}return Qe.toWorkingColorSpace(this,s),this}setStyle(e,t=vt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vt){let n=Rf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qi(e.r),this.g=Qi(e.g),this.b=Qi(e.b),this}copyLinearToSRGB(e){return this.r=Va(e.r),this.g=Va(e.g),this.b=Va(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vt){return Qe.fromWorkingColorSpace(bt.copy(this),e),Math.round(Et(bt.r*255,0,255))*65536+Math.round(Et(bt.g*255,0,255))*256+Math.round(Et(bt.b*255,0,255))}getHexString(e=vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(bt.copy(this),t);let n=bt.r,s=bt.g,r=bt.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(bt.copy(this),t),e.r=bt.r,e.g=bt.g,e.b=bt.b,e}getStyle(e=vt){Qe.fromWorkingColorSpace(bt.copy(this),e);let t=bt.r,n=bt.g,s=bt.b;return e!==vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Xn),this.setHSL(Xn.h+e,Xn.s+t,Xn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xn),e.getHSL(Dr);let n=Ls(Xn.h,Dr.h,t),s=Ls(Xn.s,Dr.s,t),r=Ls(Xn.l,Dr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},bt=new Ve;Ve.NAMES=Rf;var O_=0,Jn=class extends mn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=Dn(),this.name="",this.type="Material",this.blending=Ki,this.side=en,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uc,this.blendDst=hc,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=Jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pi,this.stencilZFail=Pi,this.stencilZPass=Pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(n.blending=this.blending),this.side!==en&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==uc&&(n.blendSrc=this.blendSrc),this.blendDst!==hc&&(n.blendDst=this.blendDst),this.blendEquation!==hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Jr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},uo=class extends Jn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=pf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var ct=new U,Nr=new be,Dt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=gc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Nr.fromBufferAttribute(this,t),Nr.applyMatrix3(e),this.setXY(t,Nr.x,Nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix3(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ke(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array),r=Ke(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gc&&(e.usage=this.usage),e}};var ho=class extends Dt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var fo=class extends Dt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Nn=class extends Dt{constructor(e,t,n){super(new Float32Array(e),t,n)}};var F_=0,Jt=new lt,ec=new wt,Bi=new U,qt=new zn,As=new zn,gt=new U,gn=class i extends mn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:F_++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tf(e)?fo:ho)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Jt.makeRotationFromQuaternion(e),this.applyMatrix4(Jt),this}rotateX(e){return Jt.makeRotationX(e),this.applyMatrix4(Jt),this}rotateY(e){return Jt.makeRotationY(e),this.applyMatrix4(Jt),this}rotateZ(e){return Jt.makeRotationZ(e),this.applyMatrix4(Jt),this}translate(e,t,n){return Jt.makeTranslation(e,t,n),this.applyMatrix4(Jt),this}scale(e,t,n){return Jt.makeScale(e,t,n),this.applyMatrix4(Jt),this}lookAt(e){return ec.lookAt(e),ec.updateMatrix(),this.applyMatrix4(ec.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){let t=[];for(let n=0,s=e.length;n<s;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Nn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _i);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];As.setFromBufferAttribute(o),this.morphTargetsRelative?(gt.addVectors(qt.min,As.min),qt.expandByPoint(gt),gt.addVectors(qt.max,As.max),qt.expandByPoint(gt)):(qt.expandByPoint(As.min),qt.expandByPoint(As.max))}qt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)gt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(gt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)gt.fromBufferAttribute(o,l),c&&(Bi.fromBufferAttribute(e,l),gt.add(Bi)),s=Math.max(s,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Dt(new Float32Array(4*o),4));let c=this.getAttribute("tangent").array,l=[],u=[];for(let E=0;E<o;E++)l[E]=new U,u[E]=new U;let h=new U,f=new U,d=new U,g=new be,_=new be,m=new be,p=new U,b=new U;function y(E,V,$){h.fromArray(s,E*3),f.fromArray(s,V*3),d.fromArray(s,$*3),g.fromArray(a,E*2),_.fromArray(a,V*2),m.fromArray(a,$*2),f.sub(h),d.sub(h),_.sub(g),m.sub(g);let ae=1/(_.x*m.y-m.x*_.y);isFinite(ae)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(d,-_.y).multiplyScalar(ae),b.copy(d).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar(ae),l[E].add(p),l[V].add(p),l[$].add(p),u[E].add(b),u[V].add(b),u[$].add(b))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let E=0,V=T.length;E<V;++E){let $=T[E],ae=$.start,I=$.count;for(let N=ae,G=ae+I;N<G;N+=3)y(n[N+0],n[N+1],n[N+2])}let L=new U,C=new U,A=new U,Y=new U;function M(E){A.fromArray(r,E*3),Y.copy(A);let V=l[E];L.copy(V),L.sub(A.multiplyScalar(A.dot(V))).normalize(),C.crossVectors(Y,V);let ae=C.dot(u[E])<0?-1:1;c[E*4]=L.x,c[E*4+1]=L.y,c[E*4+2]=L.z,c[E*4+3]=ae}for(let E=0,V=T.length;E<V;++E){let $=T[E],ae=$.start,I=$.count;for(let N=ae,G=ae+I;N<G;N+=3)M(n[N+0]),M(n[N+1]),M(n[N+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Dt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new U,r=new U,a=new U,o=new U,c=new U,l=new U,u=new U,h=new U;if(e)for(let f=0,d=e.count;f<d;f+=3){let g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u),d=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new Dt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){let f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){let d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Nh=new lt,ci=new ss,Or=new _i,Oh=new U,ki=new U,Vi=new U,Hi=new U,tc=new U,Fr=new U,zr=new be,Br=new be,kr=new be,Fh=new U,zh=new U,Bh=new U,Vr=new U,Hr=new U,Ot=class extends wt{constructor(e=new gn,t=new uo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Fr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],h=r[c];u!==0&&(tc.fromBufferAttribute(h,e),a?Fr.addScaledVector(tc,u):Fr.addScaledVector(tc.sub(t),u))}t.add(Fr)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(r),ci.copy(e.ray).recast(e.near),!(Or.containsPoint(ci.origin)===!1&&(ci.intersectSphere(Or,Oh)===null||ci.origin.distanceToSquared(Oh)>(e.far-e.near)**2))&&(Nh.copy(r).invert(),ci.copy(e.ray).applyMatrix4(Nh),!(n.boundingBox!==null&&ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ci)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),y=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let T=b,L=y;T<L;T+=3){let C=o.getX(T),A=o.getX(T+1),Y=o.getX(T+2);s=Gr(this,p,e,n,l,u,h,C,A,Y),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let b=o.getX(m),y=o.getX(m+1),T=o.getX(m+2);s=Gr(this,a,e,n,l,u,h,b,y,T),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let T=b,L=y;T<L;T+=3){let C=T,A=T+1,Y=T+2;s=Gr(this,p,e,n,l,u,h,C,A,Y),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let b=m,y=m+1,T=m+2;s=Gr(this,a,e,n,l,u,h,b,y,T),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function z_(i,e,t,n,s,r,a,o){let c;if(e.side===Ft?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===en,o),c===null)return null;Hr.copy(o),Hr.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Hr);return l<t.near||l>t.far?null:{distance:l,point:Hr.clone(),object:i}}function Gr(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,ki),i.getVertexPosition(c,Vi),i.getVertexPosition(l,Hi);let u=z_(i,e,t,n,ki,Vi,Hi,Vr);if(u){s&&(zr.fromBufferAttribute(s,o),Br.fromBufferAttribute(s,c),kr.fromBufferAttribute(s,l),u.uv=di.getInterpolation(Vr,ki,Vi,Hi,zr,Br,kr,new be)),r&&(zr.fromBufferAttribute(r,o),Br.fromBufferAttribute(r,c),kr.fromBufferAttribute(r,l),u.uv1=di.getInterpolation(Vr,ki,Vi,Hi,zr,Br,kr,new be),u.uv2=u.uv1),a&&(Fh.fromBufferAttribute(a,o),zh.fromBufferAttribute(a,c),Bh.fromBufferAttribute(a,l),u.normal=di.getInterpolation(Vr,ki,Vi,Hi,Fh,zh,Bh,new U),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:c,c:l,normal:new U,materialIndex:0};di.getNormal(ki,Vi,Hi,h.normal),u.face=h}return u}var xi=class i extends gn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],h=[],f=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Nn(l,3)),this.setAttribute("normal",new Nn(u,3)),this.setAttribute("uv",new Nn(h,2));function g(_,m,p,b,y,T,L,C,A,Y,M){let E=T/A,V=L/Y,$=T/2,ae=L/2,I=C/2,N=A+1,G=Y+1,X=0,q=0,W=new U;for(let Q=0;Q<G;Q++){let ne=Q*V-ae;for(let de=0;de<N;de++){let H=de*E-$;W[_]=H*b,W[m]=ne*y,W[p]=I,l.push(W.x,W.y,W.z),W[_]=0,W[m]=0,W[p]=C>0?1:-1,u.push(W.x,W.y,W.z),h.push(de/A),h.push(1-Q/Y),X+=1}}for(let Q=0;Q<Y;Q++)for(let ne=0;ne<A;ne++){let de=f+ne+N*Q,H=f+ne+N*(Q+1),j=f+(ne+1)+N*(Q+1),fe=f+(ne+1)+N*Q;c.push(de,H,fe),c.push(H,j,fe),q+=6}o.addGroup(d,q,M),d+=q,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function rs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Lt(i){let e={};for(let t=0;t<i.length;t++){let n=rs(i[t]);for(let s in n)e[s]=n[s]}return e}function B_(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Cf(i){return i.getRenderTarget()===null?i.outputColorSpace:Qe.workingColorSpace}var k_={clone:rs,merge:Lt},V_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,H_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Bn=class extends Jn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=V_,this.fragmentShader=H_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rs(e.uniforms),this.uniformsGroups=B_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},po=class extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=Un}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ut=class extends po{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Os*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Os*2*Math.atan(Math.tan(Ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ps*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Gi=-90,Wi=1,Mc=class extends wt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ut(Gi,Wi,e,t);s.layers=this.layers,this.add(s);let r=new Ut(Gi,Wi,e,t);r.layers=this.layers,this.add(r);let a=new Ut(Gi,Wi,e,t);a.layers=this.layers,this.add(a);let o=new Ut(Gi,Wi,e,t);o.layers=this.layers,this.add(o);let c=new Ut(Gi,Wi,e,t);c.layers=this.layers,this.add(c);let l=new Ut(Gi,Wi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===io)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},mo=class extends tn{constructor(e,t,n,s,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:ts,super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Sc=class extends Fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Is("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===gi?vt:Qt),this.texture=new mo(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Kt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new xi(5,5,5),r=new Bn({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ft,blending:$n});r.uniforms.tEquirect.value=t;let a=new Ot(s,r),o=t.minFilter;return t.minFilter===Ds&&(t.minFilter=Kt),new Mc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},nc=new U,G_=new U,W_=new We,an=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=nc.subVectors(n,t).cross(G_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(nc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||W_.getNormalMatrix(e),s=this.coplanarPoint(nc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},li=new _i,Wr=new U,zs=class{constructor(e=new an,t=new an,n=new an,s=new an,r=new an,a=new an){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Un){let n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],h=s[6],f=s[7],d=s[8],g=s[9],_=s[10],m=s[11],p=s[12],b=s[13],y=s[14],T=s[15];if(n[0].setComponents(c-r,f-l,m-d,T-p).normalize(),n[1].setComponents(c+r,f+l,m+d,T+p).normalize(),n[2].setComponents(c+a,f+u,m+g,T+b).normalize(),n[3].setComponents(c-a,f-u,m-g,T-b).normalize(),n[4].setComponents(c-o,f-h,m-_,T-y).normalize(),t===Un)n[5].setComponents(c+o,f+h,m+_,T+y).normalize();else if(t===io)n[5].setComponents(o,h,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(e){return li.center.set(0,0,0),li.radius=.7071067811865476,li.applyMatrix4(e.matrixWorld),this.intersectsSphere(li)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Wr.x=s.normal.x>0?e.max.x:e.min.x,Wr.y=s.normal.y>0?e.max.y:e.min.y,Wr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Wr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Pf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function X_(i,e){let t=e.isWebGL2,n=new WeakMap;function s(l,u){let h=l.array,f=l.usage,d=h.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,h,f),l.onUploadCallback();let _;if(h instanceof Float32Array)_=i.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=i.SHORT;else if(h instanceof Uint32Array)_=i.UNSIGNED_INT;else if(h instanceof Int32Array)_=i.INT;else if(h instanceof Int8Array)_=i.BYTE;else if(h instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:d}}function r(l,u,h){let f=u.array,d=u._updateRange,g=u.updateRanges;if(i.bindBuffer(h,l),d.count===-1&&g.length===0&&i.bufferSubData(h,0,f),g.length!==0){for(let _=0,m=g.length;_<m;_++){let p=g[_];t?i.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):i.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}d.count!==-1&&(t?i.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):i.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);u&&(i.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);if(h===void 0)n.set(l,s(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,u),h.version=l.version}}return{get:a,remove:o,update:c}}var Bs=class i extends gn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=e/o,f=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let b=p*f-a;for(let y=0;y<l;y++){let T=y*h-r;g.push(T,-b,0),_.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<o;b++){let y=b+l*p,T=b+l*(p+1),L=b+1+l*(p+1),C=b+1+l*p;d.push(y,T,C),d.push(T,L,C)}this.setIndex(d),this.setAttribute("position",new Nn(g,3)),this.setAttribute("normal",new Nn(_,3)),this.setAttribute("uv",new Nn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},q_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Y_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Z_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,j_=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,J_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,K_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Q_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,e0=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,t0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,n0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,i0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,s0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,r0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,o0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,a0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,h0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,f0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,d0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,p0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,m0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,g0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,x0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,y0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,v0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,M0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,S0="gl_FragColor = linearToOutputTexel( gl_FragColor );",b0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,E0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,w0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,A0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,T0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,R0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,C0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,P0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,L0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,I0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,U0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,D0=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,N0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,O0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,F0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,z0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,B0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,k0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,V0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,H0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,G0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,W0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,X0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,q0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Y0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Z0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,j0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,J0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,K0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Q0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ex=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,nx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ix=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rx=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ox=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,ax=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,cx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,lx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ux=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,px=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,mx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_x=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Mx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ex=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ax=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Rx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Cx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Px=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Lx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ix=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ux=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Nx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ox=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,kx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Vx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Wx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Xx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$x=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Qx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ey=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ty=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ny=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ry=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,oy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ay=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ly=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,uy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,py=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,my=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,gy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_y=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,vy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,My=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,by=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ey=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:q_,alphahash_pars_fragment:Y_,alphamap_fragment:$_,alphamap_pars_fragment:Z_,alphatest_fragment:j_,alphatest_pars_fragment:J_,aomap_fragment:K_,aomap_pars_fragment:Q_,batching_pars_vertex:e0,batching_vertex:t0,begin_vertex:n0,beginnormal_vertex:i0,bsdfs:s0,iridescence_fragment:r0,bumpmap_pars_fragment:o0,clipping_planes_fragment:a0,clipping_planes_pars_fragment:c0,clipping_planes_pars_vertex:l0,clipping_planes_vertex:u0,color_fragment:h0,color_pars_fragment:f0,color_pars_vertex:d0,color_vertex:p0,common:m0,cube_uv_reflection_fragment:g0,defaultnormal_vertex:_0,displacementmap_pars_vertex:x0,displacementmap_vertex:y0,emissivemap_fragment:v0,emissivemap_pars_fragment:M0,colorspace_fragment:S0,colorspace_pars_fragment:b0,envmap_fragment:E0,envmap_common_pars_fragment:w0,envmap_pars_fragment:A0,envmap_pars_vertex:T0,envmap_physical_pars_fragment:B0,envmap_vertex:R0,fog_vertex:C0,fog_pars_vertex:P0,fog_fragment:L0,fog_pars_fragment:I0,gradientmap_pars_fragment:U0,lightmap_fragment:D0,lightmap_pars_fragment:N0,lights_lambert_fragment:O0,lights_lambert_pars_fragment:F0,lights_pars_begin:z0,lights_toon_fragment:k0,lights_toon_pars_fragment:V0,lights_phong_fragment:H0,lights_phong_pars_fragment:G0,lights_physical_fragment:W0,lights_physical_pars_fragment:X0,lights_fragment_begin:q0,lights_fragment_maps:Y0,lights_fragment_end:$0,logdepthbuf_fragment:Z0,logdepthbuf_pars_fragment:j0,logdepthbuf_pars_vertex:J0,logdepthbuf_vertex:K0,map_fragment:Q0,map_pars_fragment:ex,map_particle_fragment:tx,map_particle_pars_fragment:nx,metalnessmap_fragment:ix,metalnessmap_pars_fragment:sx,morphcolor_vertex:rx,morphnormal_vertex:ox,morphtarget_pars_vertex:ax,morphtarget_vertex:cx,normal_fragment_begin:lx,normal_fragment_maps:ux,normal_pars_fragment:hx,normal_pars_vertex:fx,normal_vertex:dx,normalmap_pars_fragment:px,clearcoat_normal_fragment_begin:mx,clearcoat_normal_fragment_maps:gx,clearcoat_pars_fragment:_x,iridescence_pars_fragment:xx,opaque_fragment:yx,packing:vx,premultiplied_alpha_fragment:Mx,project_vertex:Sx,dithering_fragment:bx,dithering_pars_fragment:Ex,roughnessmap_fragment:wx,roughnessmap_pars_fragment:Ax,shadowmap_pars_fragment:Tx,shadowmap_pars_vertex:Rx,shadowmap_vertex:Cx,shadowmask_pars_fragment:Px,skinbase_vertex:Lx,skinning_pars_vertex:Ix,skinning_vertex:Ux,skinnormal_vertex:Dx,specularmap_fragment:Nx,specularmap_pars_fragment:Ox,tonemapping_fragment:Fx,tonemapping_pars_fragment:zx,transmission_fragment:Bx,transmission_pars_fragment:kx,uv_pars_fragment:Vx,uv_pars_vertex:Hx,uv_vertex:Gx,worldpos_vertex:Wx,background_vert:Xx,background_frag:qx,backgroundCube_vert:Yx,backgroundCube_frag:$x,cube_vert:Zx,cube_frag:jx,depth_vert:Jx,depth_frag:Kx,distanceRGBA_vert:Qx,distanceRGBA_frag:ey,equirect_vert:ty,equirect_frag:ny,linedashed_vert:iy,linedashed_frag:sy,meshbasic_vert:ry,meshbasic_frag:oy,meshlambert_vert:ay,meshlambert_frag:cy,meshmatcap_vert:ly,meshmatcap_frag:uy,meshnormal_vert:hy,meshnormal_frag:fy,meshphong_vert:dy,meshphong_frag:py,meshphysical_vert:my,meshphysical_frag:gy,meshtoon_vert:_y,meshtoon_frag:xy,points_vert:yy,points_frag:vy,shadow_vert:My,shadow_frag:Sy,sprite_vert:by,sprite_frag:Ey},le={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},dn={basic:{uniforms:Lt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Lt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Ve(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Lt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Lt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Lt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new Ve(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Lt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Lt([le.points,le.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Lt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Lt([le.common,le.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Lt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Lt([le.sprite,le.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Lt([le.common,le.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Lt([le.lights,le.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};dn.physical={uniforms:Lt([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};var Xr={r:0,b:0,g:0};function wy(i,e,t,n,s,r,a){let o=new Ve(0),c=r===!0?0:1,l,u,h=null,f=0,d=null;function g(m,p){let b=!1,y=p.isScene===!0?p.background:null;y&&y.isTexture&&(y=(p.backgroundBlurriness>0?t:e).get(y)),y===null?_(o,c):y&&y.isColor&&(_(y,1),b=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||b)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),y&&(y.isCubeTexture||y.mapping===wo)?(u===void 0&&(u=new Ot(new xi(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:rs(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=Qe.getTransfer(y.colorSpace)!==nt,(h!==y||f!==y.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=y,f=y.version,d=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Ot(new Bs(2,2),new Bn({name:"BackgroundMaterial",uniforms:rs(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(y.colorSpace)!==nt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,f=y.version,d=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,p){m.getRGB(Xr,Cf(i)),n.buffers.color.setClear(Xr.r,Xr.g,Xr.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),c=p,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(o,c)},render:g}}function Ay(i,e,t,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=m(null),l=c,u=!1;function h(I,N,G,X,q){let W=!1;if(a){let Q=_(X,G,N);l!==Q&&(l=Q,d(l.object)),W=p(I,X,G,q),W&&b(I,X,G,q)}else{let Q=N.wireframe===!0;(l.geometry!==X.id||l.program!==G.id||l.wireframe!==Q)&&(l.geometry=X.id,l.program=G.id,l.wireframe=Q,W=!0)}q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(W||u)&&(u=!1,Y(I,N,G,X),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function d(I){return n.isWebGL2?i.bindVertexArray(I):r.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?i.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function _(I,N,G){let X=G.wireframe===!0,q=o[I.id];q===void 0&&(q={},o[I.id]=q);let W=q[N.id];W===void 0&&(W={},q[N.id]=W);let Q=W[X];return Q===void 0&&(Q=m(f()),W[X]=Q),Q}function m(I){let N=[],G=[],X=[];for(let q=0;q<s;q++)N[q]=0,G[q]=0,X[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:G,attributeDivisors:X,object:I,attributes:{},index:null}}function p(I,N,G,X){let q=l.attributes,W=N.attributes,Q=0,ne=G.getAttributes();for(let de in ne)if(ne[de].location>=0){let j=q[de],fe=W[de];if(fe===void 0&&(de==="instanceMatrix"&&I.instanceMatrix&&(fe=I.instanceMatrix),de==="instanceColor"&&I.instanceColor&&(fe=I.instanceColor)),j===void 0||j.attribute!==fe||fe&&j.data!==fe.data)return!0;Q++}return l.attributesNum!==Q||l.index!==X}function b(I,N,G,X){let q={},W=N.attributes,Q=0,ne=G.getAttributes();for(let de in ne)if(ne[de].location>=0){let j=W[de];j===void 0&&(de==="instanceMatrix"&&I.instanceMatrix&&(j=I.instanceMatrix),de==="instanceColor"&&I.instanceColor&&(j=I.instanceColor));let fe={};fe.attribute=j,j&&j.data&&(fe.data=j.data),q[de]=fe,Q++}l.attributes=q,l.attributesNum=Q,l.index=X}function y(){let I=l.newAttributes;for(let N=0,G=I.length;N<G;N++)I[N]=0}function T(I){L(I,0)}function L(I,N){let G=l.newAttributes,X=l.enabledAttributes,q=l.attributeDivisors;G[I]=1,X[I]===0&&(i.enableVertexAttribArray(I),X[I]=1),q[I]!==N&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,N),q[I]=N)}function C(){let I=l.newAttributes,N=l.enabledAttributes;for(let G=0,X=N.length;G<X;G++)N[G]!==I[G]&&(i.disableVertexAttribArray(G),N[G]=0)}function A(I,N,G,X,q,W,Q){Q===!0?i.vertexAttribIPointer(I,N,G,q,W):i.vertexAttribPointer(I,N,G,X,q,W)}function Y(I,N,G,X){if(n.isWebGL2===!1&&(I.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();let q=X.attributes,W=G.getAttributes(),Q=N.defaultAttributeValues;for(let ne in W){let de=W[ne];if(de.location>=0){let H=q[ne];if(H===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(H=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(H=I.instanceColor)),H!==void 0){let j=H.normalized,fe=H.itemSize,ve=t.get(H);if(ve===void 0)continue;let xe=ve.buffer,Ie=ve.type,Ue=ve.bytesPerElement,Te=n.isWebGL2===!0&&(Ie===i.INT||Ie===i.UNSIGNED_INT||H.gpuType===gf);if(H.isInterleavedBufferAttribute){let Xe=H.data,O=Xe.stride,ft=H.offset;if(Xe.isInstancedInterleavedBuffer){for(let Ee=0;Ee<de.locationSize;Ee++)L(de.location+Ee,Xe.meshPerAttribute);I.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Xe.meshPerAttribute*Xe.count)}else for(let Ee=0;Ee<de.locationSize;Ee++)T(de.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Ee=0;Ee<de.locationSize;Ee++)A(de.location+Ee,fe/de.locationSize,Ie,j,O*Ue,(ft+fe/de.locationSize*Ee)*Ue,Te)}else{if(H.isInstancedBufferAttribute){for(let Xe=0;Xe<de.locationSize;Xe++)L(de.location+Xe,H.meshPerAttribute);I.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let Xe=0;Xe<de.locationSize;Xe++)T(de.location+Xe);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Xe=0;Xe<de.locationSize;Xe++)A(de.location+Xe,fe/de.locationSize,Ie,j,fe*Ue,fe/de.locationSize*Xe*Ue,Te)}}else if(Q!==void 0){let j=Q[ne];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(de.location,j);break;case 3:i.vertexAttrib3fv(de.location,j);break;case 4:i.vertexAttrib4fv(de.location,j);break;default:i.vertexAttrib1fv(de.location,j)}}}}C()}function M(){$();for(let I in o){let N=o[I];for(let G in N){let X=N[G];for(let q in X)g(X[q].object),delete X[q];delete N[G]}delete o[I]}}function E(I){if(o[I.id]===void 0)return;let N=o[I.id];for(let G in N){let X=N[G];for(let q in X)g(X[q].object),delete X[q];delete N[G]}delete o[I.id]}function V(I){for(let N in o){let G=o[N];if(G[I.id]===void 0)continue;let X=G[I.id];for(let q in X)g(X[q].object),delete X[q];delete G[I.id]}}function $(){ae(),u=!0,l!==c&&(l=c,d(l.object))}function ae(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:$,resetDefaultState:ae,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:V,initAttributes:y,enableAttribute:T,disableUnusedAttributes:C}}function Ty(i,e,t,n){let s=n.isWebGL2,r;function a(u){r=u}function o(u,h){i.drawArrays(r,u,h),t.update(h,r,1)}function c(u,h,f){if(f===0)return;let d,g;if(s)d=i,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,u,h,f),t.update(h,r,f)}function l(u,h,f){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(u[g],h[g]);else{d.multiDrawArraysWEBGL(r,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function Ry(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",o=t.precision!==void 0?t.precision:"highp",c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);let l=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,T=a||e.has("OES_texture_float"),L=y&&T,C=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:b,vertexTextures:y,floatFragmentTextures:T,floatVertexTextures:L,maxSamples:C}}function Cy(i){let e=this,t=null,n=0,s=!1,r=!1,a=new an,o=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let d=h.length!==0||f||n!==0||s;return s=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){let g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{let b=r?0:n,y=b*4,T=p.clippingState||null;c.value=T,T=u(g,f,y,d);for(let L=0;L!==y;++L)T[L]=t[L];p.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){let _=h!==null?h.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=d+_*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,T=d;y!==_;++y,T+=4)a.copy(h[y]).applyMatrix4(b,o),a.normal.toArray(m,T),m[T+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Py(i){let e=new WeakMap;function t(a,o){return o===fc?a.mapping=ts:o===dc&&(a.mapping=ns),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===fc||o===dc)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new Sc(c.height/2);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var go=class extends po{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ji=4,kh=[.125,.215,.35,.446,.526,.582],fi=20,ic=new go,Vh=new Ve,sc=null,rc=0,oc=0,ui=(1+Math.sqrt(5))/2,Xi=1/ui,Hh=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,ui,Xi),new U(0,ui,-Xi),new U(Xi,0,ui),new U(-Xi,0,ui),new U(ui,Xi,0),new U(-ui,Xi,0)],_o=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(sc,rc,oc),e.scissorTest=!1,qr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ts||e.mapping===ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:Ns,format:ln,colorSpace:On,depthBuffer:!1},s=Gh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gh(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ly(r)),this._blurMaterial=Iy(r,e,t)}return s}_compileMaterial(e){let t=new Ot(this._lodPlanes[0],e);this._renderer.compile(t,ic)}_sceneToCubeUV(e,t,n,s){let o=new Ut(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Vh),u.toneMapping=Zn,u.autoClear=!1;let d=new uo({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1}),g=new Ot(new xi,d),_=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(Vh),_=!0);for(let p=0;p<6;p++){let b=p%3;b===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):b===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));let y=this._cubeSize;qr(s,b*y,p>2?y:0,y,y),u.setRenderTarget(s),_&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===ts||e.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ot(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;qr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,ic)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Hh[(s-1)%Hh.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Ot(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*fi-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):fi;m>fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${fi}`);let p=[],b=0;for(let A=0;A<fi;++A){let Y=A/_,M=Math.exp(-Y*Y/2);p.push(M),A===0?b+=M:A<m&&(b+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;let T=this._sizeLods[s],L=3*T*(s>y-ji?s-y+ji:0),C=4*(this._cubeSize-T);qr(t,L,C,3*T,2*T),c.setRenderTarget(t),c.render(h,ic)}};function Ly(i){let e=[],t=[],n=[],s=i,r=i-ji+1+kh.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let c=1/o;a>i-ji?c=kh[a-i+ji-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*d),y=new Float32Array(m*g*d),T=new Float32Array(p*g*d);for(let C=0;C<d;C++){let A=C%3*2/3-1,Y=C>2?0:-1,M=[A,Y,0,A+2/3,Y,0,A+2/3,Y+1,0,A,Y,0,A+2/3,Y+1,0,A,Y+1,0];b.set(M,_*g*C),y.set(f,m*g*C);let E=[C,C,C,C,C,C];T.set(E,p*g*C)}let L=new gn;L.setAttribute("position",new Dt(b,_)),L.setAttribute("uv",new Dt(y,m)),L.setAttribute("faceIndex",new Dt(T,p)),e.push(L),s>ji&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Gh(i,e,t){let n=new Fn(i,e,t);return n.texture.mapping=wo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function qr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Iy(i,e,t){let n=new Float32Array(fi),s=new U(0,1,0);return new Bn({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Wh(){return new Bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Xh(){return new Bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Jc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Uy(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===fc||c===dc,u=c===ts||c===ns;if(l||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new _o(i)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{let h=o.image;if(l&&h&&h.height>0||u&&h&&s(h)){t===null&&(t=new _o(i));let f=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let c=0,l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Dy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ny(i,e,t,n){let s={},r=new WeakMap;function a(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}f.removeEventListener("dispose",a),delete s[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(h){let f=h.attributes;for(let g in f)e.update(f[g],i.ARRAY_BUFFER);let d=h.morphAttributes;for(let g in d){let _=d[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(h){let f=[],d=h.index,g=h.attributes.position,_=0;if(d!==null){let b=d.array;_=d.version;for(let y=0,T=b.length;y<T;y+=3){let L=b[y+0],C=b[y+1],A=b[y+2];f.push(L,C,C,A,A,L)}}else if(g!==void 0){let b=g.array;_=g.version;for(let y=0,T=b.length/3-1;y<T;y+=3){let L=y+0,C=y+1,A=y+2;f.push(L,C,C,A,A,L)}}else return;let m=new(Tf(f)?fo:ho)(f,1);m.version=_;let p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){let f=r.get(h);if(f){let d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function Oy(i,e,t,n){let s=n.isWebGL2,r;function a(d){r=d}let o,c;function l(d){o=d.type,c=d.bytesPerElement}function u(d,g){i.drawElements(r,g,o,d*c),t.update(g,r,1)}function h(d,g,_){if(_===0)return;let m,p;if(s)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,o,d*c,_),t.update(g,r,_)}function f(d,g,_){if(_===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(d[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,o,d,0,_);let p=0;for(let b=0;b<_;b++)p+=g[b];t.update(p,r,1)}}this.setMode=a,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function Fy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function zy(i,e){return i[0]-e[0]}function By(i,e){return Math.abs(e[1])-Math.abs(i[1])}function ky(i,e,t){let n={},s=new Float32Array(8),r=new WeakMap,a=new _t,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,u,h){let f=l.morphTargetInfluences;if(e.isWebGL2===!0){let d=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=d!==void 0?d.length:0,_=r.get(u);if(_===void 0||_.count!==g){let I=function(){$.dispose(),r.delete(u),u.removeEventListener("dispose",I)};_!==void 0&&_.texture.dispose();let b=u.morphAttributes.position!==void 0,y=u.morphAttributes.normal!==void 0,T=u.morphAttributes.color!==void 0,L=u.morphAttributes.position||[],C=u.morphAttributes.normal||[],A=u.morphAttributes.color||[],Y=0;b===!0&&(Y=1),y===!0&&(Y=2),T===!0&&(Y=3);let M=u.attributes.position.count*Y,E=1;M>e.maxTextureSize&&(E=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let V=new Float32Array(M*E*4*g),$=new co(V,M,E,g);$.type=Yn,$.needsUpdate=!0;let ae=Y*4;for(let N=0;N<g;N++){let G=L[N],X=C[N],q=A[N],W=M*E*4*N;for(let Q=0;Q<G.count;Q++){let ne=Q*ae;b===!0&&(a.fromBufferAttribute(G,Q),V[W+ne+0]=a.x,V[W+ne+1]=a.y,V[W+ne+2]=a.z,V[W+ne+3]=0),y===!0&&(a.fromBufferAttribute(X,Q),V[W+ne+4]=a.x,V[W+ne+5]=a.y,V[W+ne+6]=a.z,V[W+ne+7]=0),T===!0&&(a.fromBufferAttribute(q,Q),V[W+ne+8]=a.x,V[W+ne+9]=a.y,V[W+ne+10]=a.z,V[W+ne+11]=q.itemSize===4?a.w:1)}}_={count:g,texture:$,size:new be(M,E)},r.set(u,_),u.addEventListener("dispose",I)}let m=0;for(let b=0;b<f.length;b++)m+=f[b];let p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",p),h.getUniforms().setValue(i,"morphTargetInfluences",f),h.getUniforms().setValue(i,"morphTargetsTexture",_.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{let d=f===void 0?0:f.length,g=n[u.id];if(g===void 0||g.length!==d){g=[];for(let y=0;y<d;y++)g[y]=[y,0];n[u.id]=g}for(let y=0;y<d;y++){let T=g[y];T[0]=y,T[1]=f[y]}g.sort(By);for(let y=0;y<8;y++)y<d&&g[y][1]?(o[y][0]=g[y][0],o[y][1]=g[y][1]):(o[y][0]=Number.MAX_SAFE_INTEGER,o[y][1]=0);o.sort(zy);let _=u.morphAttributes.position,m=u.morphAttributes.normal,p=0;for(let y=0;y<8;y++){let T=o[y],L=T[0],C=T[1];L!==Number.MAX_SAFE_INTEGER&&C?(_&&u.getAttribute("morphTarget"+y)!==_[L]&&u.setAttribute("morphTarget"+y,_[L]),m&&u.getAttribute("morphNormal"+y)!==m[L]&&u.setAttribute("morphNormal"+y,m[L]),s[y]=C,p+=C):(_&&u.hasAttribute("morphTarget"+y)===!0&&u.deleteAttribute("morphTarget"+y),m&&u.hasAttribute("morphNormal"+y)===!0&&u.deleteAttribute("morphNormal"+y),s[y]=0)}let b=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(i,"morphTargetBaseInfluence",b),h.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function Vy(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return h}function a(){s=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}var xo=class extends tn{constructor(e,t,n,s,r,a,o,c,l,u){if(u=u!==void 0?u:mi,u!==mi&&u!==is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===mi&&(n=qn),n===void 0&&u===is&&(n=pi),super(null,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:It,this.minFilter=c!==void 0?c:It,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Lf=new tn,If=new xo(1,1);If.compareFunction=wf;var Uf=new co,Df=new vc,Nf=new mo,qh=[],Yh=[],$h=new Float32Array(16),Zh=new Float32Array(9),jh=new Float32Array(4);function cs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=qh[s];if(r===void 0&&(r=new Float32Array(s),qh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ht(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function To(i,e){let t=Yh[e];t===void 0&&(t=new Int32Array(e),Yh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Hy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Gy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;i.uniform2fv(this.addr,e),ht(t,e)}}function Wy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ut(t,e))return;i.uniform3fv(this.addr,e),ht(t,e)}}function Xy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;i.uniform4fv(this.addr,e),ht(t,e)}}function qy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ht(t,e)}else{if(ut(t,n))return;jh.set(n),i.uniformMatrix2fv(this.addr,!1,jh),ht(t,n)}}function Yy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ht(t,e)}else{if(ut(t,n))return;Zh.set(n),i.uniformMatrix3fv(this.addr,!1,Zh),ht(t,n)}}function $y(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ht(t,e)}else{if(ut(t,n))return;$h.set(n),i.uniformMatrix4fv(this.addr,!1,$h),ht(t,n)}}function Zy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;i.uniform2iv(this.addr,e),ht(t,e)}}function Jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;i.uniform3iv(this.addr,e),ht(t,e)}}function Ky(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;i.uniform4iv(this.addr,e),ht(t,e)}}function Qy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ev(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;i.uniform2uiv(this.addr,e),ht(t,e)}}function tv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;i.uniform3uiv(this.addr,e),ht(t,e)}}function nv(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;i.uniform4uiv(this.addr,e),ht(t,e)}}function iv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?If:Lf;t.setTexture2D(e||r,s)}function sv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Df,s)}function rv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Nf,s)}function ov(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Uf,s)}function av(i){switch(i){case 5126:return Hy;case 35664:return Gy;case 35665:return Wy;case 35666:return Xy;case 35674:return qy;case 35675:return Yy;case 35676:return $y;case 5124:case 35670:return Zy;case 35667:case 35671:return jy;case 35668:case 35672:return Jy;case 35669:case 35673:return Ky;case 5125:return Qy;case 36294:return ev;case 36295:return tv;case 36296:return nv;case 35678:case 36198:case 36298:case 36306:case 35682:return iv;case 35679:case 36299:case 36307:return sv;case 35680:case 36300:case 36308:case 36293:return rv;case 36289:case 36303:case 36311:case 36292:return ov}}function cv(i,e){i.uniform1fv(this.addr,e)}function lv(i,e){let t=cs(e,this.size,2);i.uniform2fv(this.addr,t)}function uv(i,e){let t=cs(e,this.size,3);i.uniform3fv(this.addr,t)}function hv(i,e){let t=cs(e,this.size,4);i.uniform4fv(this.addr,t)}function fv(i,e){let t=cs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function dv(i,e){let t=cs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function pv(i,e){let t=cs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function mv(i,e){i.uniform1iv(this.addr,e)}function gv(i,e){i.uniform2iv(this.addr,e)}function _v(i,e){i.uniform3iv(this.addr,e)}function xv(i,e){i.uniform4iv(this.addr,e)}function yv(i,e){i.uniform1uiv(this.addr,e)}function vv(i,e){i.uniform2uiv(this.addr,e)}function Mv(i,e){i.uniform3uiv(this.addr,e)}function Sv(i,e){i.uniform4uiv(this.addr,e)}function bv(i,e,t){let n=this.cache,s=e.length,r=To(t,s);ut(n,r)||(i.uniform1iv(this.addr,r),ht(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Lf,r[a])}function Ev(i,e,t){let n=this.cache,s=e.length,r=To(t,s);ut(n,r)||(i.uniform1iv(this.addr,r),ht(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Df,r[a])}function wv(i,e,t){let n=this.cache,s=e.length,r=To(t,s);ut(n,r)||(i.uniform1iv(this.addr,r),ht(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Nf,r[a])}function Av(i,e,t){let n=this.cache,s=e.length,r=To(t,s);ut(n,r)||(i.uniform1iv(this.addr,r),ht(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Uf,r[a])}function Tv(i){switch(i){case 5126:return cv;case 35664:return lv;case 35665:return uv;case 35666:return hv;case 35674:return fv;case 35675:return dv;case 35676:return pv;case 5124:case 35670:return mv;case 35667:case 35671:return gv;case 35668:case 35672:return _v;case 35669:case 35673:return xv;case 5125:return yv;case 36294:return vv;case 36295:return Mv;case 36296:return Sv;case 35678:case 36198:case 36298:case 36306:case 35682:return bv;case 35679:case 36299:case 36307:return Ev;case 35680:case 36300:case 36308:case 36293:return wv;case 36289:case 36303:case 36311:case 36292:return Av}}var bc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=av(t.type)}},Ec=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Tv(t.type)}},wc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},ac=/(\w+)(\])?(\[|\.)?/g;function Jh(i,e){i.seq.push(e),i.map[e.id]=e}function Rv(i,e,t){let n=i.name,s=n.length;for(ac.lastIndex=0;;){let r=ac.exec(n),a=ac.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Jh(t,l===void 0?new bc(o,i,e):new Ec(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new wc(o),Jh(t,h)),t=h}}}var es=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Rv(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Kh(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Cv=37297,Pv=0;function Lv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Iv(i){let e=Qe.getPrimaries(Qe.workingColorSpace),t=Qe.getPrimaries(i),n;switch(e===t?n="":e===no&&t===to?n="LinearDisplayP3ToLinearSRGB":e===to&&t===no&&(n="LinearSRGBToLinearDisplayP3"),i){case On:case Ao:return[n,"LinearTransferOETF"];case vt:case Zc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Qh(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Lv(i.getShaderSource(e),a)}else return s}function Uv(i,e){let t=Iv(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Dv(i,e){let t;switch(e){case Bg:t="Linear";break;case kg:t="Reinhard";break;case Vg:t="OptimizedCineon";break;case Hg:t="ACESFilmic";break;case Wg:t="AgX";break;case Gg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Nv(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ji).join(`
`)}function Ov(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ji).join(`
`)}function Fv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function zv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ji(i){return i!==""}function ef(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Bv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ac(i){return i.replace(Bv,Vv)}var kv=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Vv(i,e){let t=ze[e];if(t===void 0){let n=kv.get(e);if(n!==void 0)t=ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ac(t)}var Hv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nf(i){return i.replace(Hv,Gv)}function Gv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sf(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Wv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===df?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===dg?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ln&&(e="SHADOWMAP_TYPE_VSM"),e}function Xv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ts:case ns:e="ENVMAP_TYPE_CUBE";break;case wo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function qv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ns:e="ENVMAP_MODE_REFRACTION";break}return e}function Yv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case pf:e="ENVMAP_BLENDING_MULTIPLY";break;case Fg:e="ENVMAP_BLENDING_MIX";break;case zg:e="ENVMAP_BLENDING_ADD";break}return e}function $v(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Zv(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Wv(t),l=Xv(t),u=qv(t),h=Yv(t),f=$v(t),d=t.isWebGL2?"":Nv(t),g=Ov(t),_=Fv(r),m=s.createProgram(),p,b,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ji).join(`
`),p.length>0&&(p+=`
`),b=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ji).join(`
`),b.length>0&&(b+=`
`)):(p=[sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),b=[d,sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Zn?"#define TONE_MAPPING":"",t.toneMapping!==Zn?ze.tonemapping_pars_fragment:"",t.toneMapping!==Zn?Dv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,Uv("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ji).join(`
`)),a=Ac(a),a=ef(a,t),a=tf(a,t),o=Ac(o),o=ef(o,t),o=tf(o,t),a=nf(a),o=nf(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Sh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);let T=y+p+a,L=y+b+o,C=Kh(s,s.VERTEX_SHADER,T),A=Kh(s,s.FRAGMENT_SHADER,L);s.attachShader(m,C),s.attachShader(m,A),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function Y($){if(i.debug.checkShaderErrors){let ae=s.getProgramInfoLog(m).trim(),I=s.getShaderInfoLog(C).trim(),N=s.getShaderInfoLog(A).trim(),G=!0,X=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,C,A);else{let q=Qh(s,C,"vertex"),W=Qh(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+ae+`
`+q+`
`+W)}else ae!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ae):(I===""||N==="")&&(X=!1);X&&($.diagnostics={runnable:G,programLog:ae,vertexShader:{log:I,prefix:p},fragmentShader:{log:N,prefix:b}})}s.deleteShader(C),s.deleteShader(A),M=new es(s,m),E=zv(s,m)}let M;this.getUniforms=function(){return M===void 0&&Y(this),M};let E;this.getAttributes=function(){return E===void 0&&Y(this),E};let V=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=s.getProgramParameter(m,Cv)),V},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Pv++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=C,this.fragmentShader=A,this}var jv=0,Tc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Rc(e),t.set(e,n)),n}},Rc=class{constructor(e){this.id=jv++,this.code=e,this.usedTimes=0}};function Jv(i,e,t,n,s,r,a){let o=new Fs,c=new Tc,l=[],u=s.isWebGL2,h=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,E,V,$,ae){let I=$.fog,N=ae.geometry,G=M.isMeshStandardMaterial?$.environment:null,X=(M.isMeshStandardMaterial?t:e).get(M.envMap||G),q=X&&X.mapping===wo?X.image.height:null,W=g[M.type];M.precision!==null&&(d=s.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));let Q=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ne=Q!==void 0?Q.length:0,de=0;N.morphAttributes.position!==void 0&&(de=1),N.morphAttributes.normal!==void 0&&(de=2),N.morphAttributes.color!==void 0&&(de=3);let H,j,fe,ve;if(W){let At=dn[W];H=At.vertexShader,j=At.fragmentShader}else H=M.vertexShader,j=M.fragmentShader,c.update(M),fe=c.getVertexShaderID(M),ve=c.getFragmentShaderID(M);let xe=i.getRenderTarget(),Ie=ae.isInstancedMesh===!0,Ue=ae.isBatchedMesh===!0,Te=!!M.map,Xe=!!M.matcap,O=!!X,ft=!!M.aoMap,Ee=!!M.lightMap,Pe=!!M.bumpMap,ge=!!M.normalMap,tt=!!M.displacementMap,De=!!M.emissiveMap,S=!!M.metalnessMap,x=!!M.roughnessMap,F=M.anisotropy>0,te=M.clearcoat>0,K=M.iridescence>0,ee=M.sheen>0,_e=M.transmission>0,ue=F&&!!M.anisotropyMap,me=te&&!!M.clearcoatMap,Re=te&&!!M.clearcoatNormalMap,Oe=te&&!!M.clearcoatRoughnessMap,J=K&&!!M.iridescenceMap,qe=K&&!!M.iridescenceThicknessMap,w=ee&&!!M.sheenColorMap,Z=ee&&!!M.sheenRoughnessMap,ce=!!M.specularMap,ie=!!M.specularColorMap,ye=!!M.specularIntensityMap,He=_e&&!!M.transmissionMap,Ye=_e&&!!M.thicknessMap,Be=!!M.gradientMap,oe=!!M.alphaMap,R=M.alphaTest>0,se=!!M.alphaHash,re=!!M.extensions,we=!!N.attributes.uv1,Me=!!N.attributes.uv2,$e=!!N.attributes.uv3,je=Zn;return M.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(je=i.toneMapping),{isWebGL2:u,shaderID:W,shaderType:M.type,shaderName:M.name,vertexShader:H,fragmentShader:j,defines:M.defines,customVertexShaderID:fe,customFragmentShaderID:ve,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:Ue,instancing:Ie,instancingColor:Ie&&ae.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:On,map:Te,matcap:Xe,envMap:O,envMapMode:O&&X.mapping,envMapCubeUVHeight:q,aoMap:ft,lightMap:Ee,bumpMap:Pe,normalMap:ge,displacementMap:f&&tt,emissiveMap:De,normalMapObjectSpace:ge&&M.normalMapType===n_,normalMapTangentSpace:ge&&M.normalMapType===Ef,metalnessMap:S,roughnessMap:x,anisotropy:F,anisotropyMap:ue,clearcoat:te,clearcoatMap:me,clearcoatNormalMap:Re,clearcoatRoughnessMap:Oe,iridescence:K,iridescenceMap:J,iridescenceThicknessMap:qe,sheen:ee,sheenColorMap:w,sheenRoughnessMap:Z,specularMap:ce,specularColorMap:ie,specularIntensityMap:ye,transmission:_e,transmissionMap:He,thicknessMap:Ye,gradientMap:Be,opaque:M.transparent===!1&&M.blending===Ki,alphaMap:oe,alphaTest:R,alphaHash:se,combine:M.combine,mapUv:Te&&_(M.map.channel),aoMapUv:ft&&_(M.aoMap.channel),lightMapUv:Ee&&_(M.lightMap.channel),bumpMapUv:Pe&&_(M.bumpMap.channel),normalMapUv:ge&&_(M.normalMap.channel),displacementMapUv:tt&&_(M.displacementMap.channel),emissiveMapUv:De&&_(M.emissiveMap.channel),metalnessMapUv:S&&_(M.metalnessMap.channel),roughnessMapUv:x&&_(M.roughnessMap.channel),anisotropyMapUv:ue&&_(M.anisotropyMap.channel),clearcoatMapUv:me&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Re&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:qe&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:w&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Z&&_(M.sheenRoughnessMap.channel),specularMapUv:ce&&_(M.specularMap.channel),specularColorMapUv:ie&&_(M.specularColorMap.channel),specularIntensityMapUv:ye&&_(M.specularIntensityMap.channel),transmissionMapUv:He&&_(M.transmissionMap.channel),thicknessMapUv:Ye&&_(M.thicknessMap.channel),alphaMapUv:oe&&_(M.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ge||F),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:Me,vertexUv3s:$e,pointsUvs:ae.isPoints===!0&&!!N.attributes.uv&&(Te||oe),fog:!!I,useFog:M.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:ae.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:de,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&V.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Te&&M.map.isVideoTexture===!0&&Qe.getTransfer(M.map.colorSpace)===nt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===In,flipSided:M.side===Ft,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:re&&M.extensions.derivatives===!0,extensionFragDepth:re&&M.extensions.fragDepth===!0,extensionDrawBuffers:re&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:re&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){let E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(let V in M.defines)E.push(V),E.push(M.defines[V]);return M.isRawShaderMaterial===!1&&(b(E,M),y(E,M),E.push(i.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function b(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function y(M,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),M.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function T(M){let E=g[M.type],V;if(E){let $=dn[E];V=k_.clone($.uniforms)}else V=M.uniforms;return V}function L(M,E){let V;for(let $=0,ae=l.length;$<ae;$++){let I=l[$];if(I.cacheKey===E){V=I,++V.usedTimes;break}}return V===void 0&&(V=new Zv(i,E,M,r),l.push(V)),V}function C(M){if(--M.usedTimes===0){let E=l.indexOf(M);l[E]=l[l.length-1],l.pop(),M.destroy()}}function A(M){c.remove(M)}function Y(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:T,acquireProgram:L,releaseProgram:C,releaseShaderCache:A,programs:l,dispose:Y}}function Kv(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function Qv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function rf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function of(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,f,d,g,_,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function o(h,f,d,g,_,m){let p=a(h,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):t.push(p)}function c(h,f,d,g,_,m){let p=a(h,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||Qv),n.length>1&&n.sort(f||rf),s.length>1&&s.sort(f||rf)}function u(){for(let h=e,f=i.length;h<f;h++){let d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function eM(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new of,i.set(n,[a])):s>=r.length?(a=new of,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function tM(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Ve};break;case"SpotLight":t={position:new U,direction:new U,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function nM(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var iM=0;function sM(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function rM(i,e){let t=new tM,n=nM(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new U);let r=new U,a=new lt,o=new lt;function c(u,h){let f=0,d=0,g=0;for(let $=0;$<9;$++)s.probe[$].set(0,0,0);let _=0,m=0,p=0,b=0,y=0,T=0,L=0,C=0,A=0,Y=0,M=0;u.sort(sM);let E=h===!0?Math.PI:1;for(let $=0,ae=u.length;$<ae;$++){let I=u[$],N=I.color,G=I.intensity,X=I.distance,q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)f+=N.r*G*E,d+=N.g*G*E,g+=N.b*G*E;else if(I.isLightProbe){for(let W=0;W<9;W++)s.probe[W].addScaledVector(I.sh.coefficients[W],G);M++}else if(I.isDirectionalLight){let W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity*E),I.castShadow){let Q=I.shadow,ne=n.get(I);ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,s.directionalShadow[_]=ne,s.directionalShadowMap[_]=q,s.directionalShadowMatrix[_]=I.shadow.matrix,T++}s.directional[_]=W,_++}else if(I.isSpotLight){let W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(N).multiplyScalar(G*E),W.distance=X,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,s.spot[p]=W;let Q=I.shadow;if(I.map&&(s.spotLightMap[A]=I.map,A++,Q.updateMatrices(I),I.castShadow&&Y++),s.spotLightMatrix[p]=Q.matrix,I.castShadow){let ne=n.get(I);ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,s.spotShadow[p]=ne,s.spotShadowMap[p]=q,C++}p++}else if(I.isRectAreaLight){let W=t.get(I);W.color.copy(N).multiplyScalar(G),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),s.rectArea[b]=W,b++}else if(I.isPointLight){let W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity*E),W.distance=I.distance,W.decay=I.decay,I.castShadow){let Q=I.shadow,ne=n.get(I);ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,ne.shadowCameraNear=Q.camera.near,ne.shadowCameraFar=Q.camera.far,s.pointShadow[m]=ne,s.pointShadowMap[m]=q,s.pointShadowMatrix[m]=I.shadow.matrix,L++}s.point[m]=W,m++}else if(I.isHemisphereLight){let W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(G*E),W.groundColor.copy(I.groundColor).multiplyScalar(G*E),s.hemi[y]=W,y++}}b>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=le.LTC_FLOAT_1,s.rectAreaLTC2=le.LTC_FLOAT_2):(s.rectAreaLTC1=le.LTC_HALF_1,s.rectAreaLTC2=le.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=le.LTC_FLOAT_1,s.rectAreaLTC2=le.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=le.LTC_HALF_1,s.rectAreaLTC2=le.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=d,s.ambient[2]=g;let V=s.hash;(V.directionalLength!==_||V.pointLength!==m||V.spotLength!==p||V.rectAreaLength!==b||V.hemiLength!==y||V.numDirectionalShadows!==T||V.numPointShadows!==L||V.numSpotShadows!==C||V.numSpotMaps!==A||V.numLightProbes!==M)&&(s.directional.length=_,s.spot.length=p,s.rectArea.length=b,s.point.length=m,s.hemi.length=y,s.directionalShadow.length=T,s.directionalShadowMap.length=T,s.pointShadow.length=L,s.pointShadowMap.length=L,s.spotShadow.length=C,s.spotShadowMap.length=C,s.directionalShadowMatrix.length=T,s.pointShadowMatrix.length=L,s.spotLightMatrix.length=C+A-Y,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=Y,s.numLightProbes=M,V.directionalLength=_,V.pointLength=m,V.spotLength=p,V.rectAreaLength=b,V.hemiLength=y,V.numDirectionalShadows=T,V.numPointShadows=L,V.numSpotShadows=C,V.numSpotMaps=A,V.numLightProbes=M,s.version=iM++)}function l(u,h){let f=0,d=0,g=0,_=0,m=0,p=h.matrixWorldInverse;for(let b=0,y=u.length;b<y;b++){let T=u[b];if(T.isDirectionalLight){let L=s.directional[f];L.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),f++}else if(T.isSpotLight){let L=s.spot[g];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),L.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),g++}else if(T.isRectAreaLight){let L=s.rectArea[_];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),o.identity(),a.copy(T.matrixWorld),a.premultiply(p),o.extractRotation(a),L.halfWidth.set(T.width*.5,0,0),L.halfHeight.set(0,T.height*.5,0),L.halfWidth.applyMatrix4(o),L.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){let L=s.point[d];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),d++}else if(T.isHemisphereLight){let L=s.hemi[m];L.direction.setFromMatrixPosition(T.matrixWorld),L.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:s}}function af(i,e){let t=new rM(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(h){n.push(h)}function o(h){s.push(h)}function c(h){t.setup(n,h)}function l(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function oM(i,e){let t=new WeakMap;function n(r,a=0){let o=t.get(r),c;return o===void 0?(c=new af(i,e),t.set(r,[c])):a>=o.length?(c=new af(i,e),o.push(c)):c=o[a],c}function s(){t=new WeakMap}return{get:n,dispose:s}}var Cc=class extends Jn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=e_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Pc=class extends Jn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},aM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function lM(i,e,t){let n=new zs,s=new be,r=new be,a=new _t,o=new Cc({depthPacking:t_}),c=new Pc,l={},u=t.maxTextureSize,h={[en]:Ft,[Ft]:en,[In]:In},f=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:aM,fragmentShader:cM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new gn;g.setAttribute("position",new Dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ot(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=df;let p=this.type;this.render=function(C,A,Y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let M=i.getRenderTarget(),E=i.getActiveCubeFace(),V=i.getActiveMipmapLevel(),$=i.state;$.setBlending($n),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);let ae=p!==Ln&&this.type===Ln,I=p===Ln&&this.type!==Ln;for(let N=0,G=C.length;N<G;N++){let X=C[N],q=X.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let W=q.getFrameExtents();if(s.multiply(W),r.copy(q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/W.x),s.x=r.x*W.x,q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/W.y),s.y=r.y*W.y,q.mapSize.y=r.y)),q.map===null||ae===!0||I===!0){let ne=this.type!==Ln?{minFilter:It,magFilter:It}:{};q.map!==null&&q.map.dispose(),q.map=new Fn(s.x,s.y,ne),q.map.texture.name=X.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();let Q=q.getViewportCount();for(let ne=0;ne<Q;ne++){let de=q.getViewport(ne);a.set(r.x*de.x,r.y*de.y,r.x*de.z,r.y*de.w),$.viewport(a),q.updateMatrices(X,ne),n=q.getFrustum(),T(A,Y,q.camera,X,this.type)}q.isPointLightShadow!==!0&&this.type===Ln&&b(q,Y),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,E,V)};function b(C,A){let Y=e.update(_);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Fn(s.x,s.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(A,null,Y,f,_,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(A,null,Y,d,_,null)}function y(C,A,Y,M){let E=null,V=Y.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(V!==void 0)E=V;else if(E=Y.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let $=E.uuid,ae=A.uuid,I=l[$];I===void 0&&(I={},l[$]=I);let N=I[ae];N===void 0&&(N=E.clone(),I[ae]=N,A.addEventListener("dispose",L)),E=N}if(E.visible=A.visible,E.wireframe=A.wireframe,M===Ln?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:h[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,Y.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let $=i.properties.get(E);$.light=Y}return E}function T(C,A,Y,M,E){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&E===Ln)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,C.matrixWorld);let ae=e.update(C),I=C.material;if(Array.isArray(I)){let N=ae.groups;for(let G=0,X=N.length;G<X;G++){let q=N[G],W=I[q.materialIndex];if(W&&W.visible){let Q=y(C,W,M,E);C.onBeforeShadow(i,C,A,Y,ae,Q,q),i.renderBufferDirect(Y,null,ae,Q,C,q),C.onAfterShadow(i,C,A,Y,ae,Q,q)}}}else if(I.visible){let N=y(C,I,M,E);C.onBeforeShadow(i,C,A,Y,ae,N,null),i.renderBufferDirect(Y,null,ae,N,C,null),C.onAfterShadow(i,C,A,Y,ae,N,null)}}let $=C.children;for(let ae=0,I=$.length;ae<I;ae++)T($[ae],A,Y,M,E)}function L(C){C.target.removeEventListener("dispose",L);for(let Y in l){let M=l[Y],E=C.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}function uM(i,e,t){let n=t.isWebGL2;function s(){let R=!1,se=new _t,re=null,we=new _t(0,0,0,0);return{setMask:function(Me){re!==Me&&!R&&(i.colorMask(Me,Me,Me,Me),re=Me)},setLocked:function(Me){R=Me},setClear:function(Me,$e,je,dt,At){At===!0&&(Me*=dt,$e*=dt,je*=dt),se.set(Me,$e,je,dt),we.equals(se)===!1&&(i.clearColor(Me,$e,je,dt),we.copy(se))},reset:function(){R=!1,re=null,we.set(-1,0,0,0)}}}function r(){let R=!1,se=null,re=null,we=null;return{setTest:function(Me){Me?Ue(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(Me){se!==Me&&!R&&(i.depthMask(Me),se=Me)},setFunc:function(Me){if(re!==Me){switch(Me){case Pg:i.depthFunc(i.NEVER);break;case Lg:i.depthFunc(i.ALWAYS);break;case Ig:i.depthFunc(i.LESS);break;case Jr:i.depthFunc(i.LEQUAL);break;case Ug:i.depthFunc(i.EQUAL);break;case Dg:i.depthFunc(i.GEQUAL);break;case Ng:i.depthFunc(i.GREATER);break;case Og:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=Me}},setLocked:function(Me){R=Me},setClear:function(Me){we!==Me&&(i.clearDepth(Me),we=Me)},reset:function(){R=!1,se=null,re=null,we=null}}}function a(){let R=!1,se=null,re=null,we=null,Me=null,$e=null,je=null,dt=null,At=null;return{setTest:function(et){R||(et?Ue(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function(et){se!==et&&!R&&(i.stencilMask(et),se=et)},setFunc:function(et,Tt,hn){(re!==et||we!==Tt||Me!==hn)&&(i.stencilFunc(et,Tt,hn),re=et,we=Tt,Me=hn)},setOp:function(et,Tt,hn){($e!==et||je!==Tt||dt!==hn)&&(i.stencilOp(et,Tt,hn),$e=et,je=Tt,dt=hn)},setLocked:function(et){R=et},setClear:function(et){At!==et&&(i.clearStencil(et),At=et)},reset:function(){R=!1,se=null,re=null,we=null,Me=null,$e=null,je=null,dt=null,At=null}}}let o=new s,c=new r,l=new a,u=new WeakMap,h=new WeakMap,f={},d={},g=new WeakMap,_=[],m=null,p=!1,b=null,y=null,T=null,L=null,C=null,A=null,Y=null,M=new Ve(0,0,0),E=0,V=!1,$=null,ae=null,I=null,N=null,G=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,W=0,Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(Q)[1]),q=W>=1):Q.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),q=W>=2);let ne=null,de={},H=i.getParameter(i.SCISSOR_BOX),j=i.getParameter(i.VIEWPORT),fe=new _t().fromArray(H),ve=new _t().fromArray(j);function xe(R,se,re,we){let Me=new Uint8Array(4),$e=i.createTexture();i.bindTexture(R,$e),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<re;je++)n&&(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)?i.texImage3D(se,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(se+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return $e}let Ie={};Ie[i.TEXTURE_2D]=xe(i.TEXTURE_2D,i.TEXTURE_2D,1),Ie[i.TEXTURE_CUBE_MAP]=xe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ie[i.TEXTURE_2D_ARRAY]=xe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ie[i.TEXTURE_3D]=xe(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Ue(i.DEPTH_TEST),c.setFunc(Jr),De(!1),S(ku),Ue(i.CULL_FACE),ge($n);function Ue(R){f[R]!==!0&&(i.enable(R),f[R]=!0)}function Te(R){f[R]!==!1&&(i.disable(R),f[R]=!1)}function Xe(R,se){return d[R]!==se?(i.bindFramebuffer(R,se),d[R]=se,n&&(R===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=se),R===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=se)),!0):!1}function O(R,se){let re=_,we=!1;if(R)if(re=g.get(se),re===void 0&&(re=[],g.set(se,re)),R.isWebGLMultipleRenderTargets){let Me=R.texture;if(re.length!==Me.length||re[0]!==i.COLOR_ATTACHMENT0){for(let $e=0,je=Me.length;$e<je;$e++)re[$e]=i.COLOR_ATTACHMENT0+$e;re.length=Me.length,we=!0}}else re[0]!==i.COLOR_ATTACHMENT0&&(re[0]=i.COLOR_ATTACHMENT0,we=!0);else re[0]!==i.BACK&&(re[0]=i.BACK,we=!0);we&&(t.isWebGL2?i.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function ft(R){return m!==R?(i.useProgram(R),m=R,!0):!1}let Ee={[hi]:i.FUNC_ADD,[mg]:i.FUNC_SUBTRACT,[gg]:i.FUNC_REVERSE_SUBTRACT};if(n)Ee[Wu]=i.MIN,Ee[Xu]=i.MAX;else{let R=e.get("EXT_blend_minmax");R!==null&&(Ee[Wu]=R.MIN_EXT,Ee[Xu]=R.MAX_EXT)}let Pe={[_g]:i.ZERO,[xg]:i.ONE,[yg]:i.SRC_COLOR,[uc]:i.SRC_ALPHA,[wg]:i.SRC_ALPHA_SATURATE,[bg]:i.DST_COLOR,[Mg]:i.DST_ALPHA,[vg]:i.ONE_MINUS_SRC_COLOR,[hc]:i.ONE_MINUS_SRC_ALPHA,[Eg]:i.ONE_MINUS_DST_COLOR,[Sg]:i.ONE_MINUS_DST_ALPHA,[Ag]:i.CONSTANT_COLOR,[Tg]:i.ONE_MINUS_CONSTANT_COLOR,[Rg]:i.CONSTANT_ALPHA,[Cg]:i.ONE_MINUS_CONSTANT_ALPHA};function ge(R,se,re,we,Me,$e,je,dt,At,et){if(R===$n){p===!0&&(Te(i.BLEND),p=!1);return}if(p===!1&&(Ue(i.BLEND),p=!0),R!==pg){if(R!==b||et!==V){if((y!==hi||C!==hi)&&(i.blendEquation(i.FUNC_ADD),y=hi,C=hi),et)switch(R){case Ki:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vu:i.blendFunc(i.ONE,i.ONE);break;case Hu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Ki:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vu:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Hu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Gu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}T=null,L=null,A=null,Y=null,M.set(0,0,0),E=0,b=R,V=et}return}Me=Me||se,$e=$e||re,je=je||we,(se!==y||Me!==C)&&(i.blendEquationSeparate(Ee[se],Ee[Me]),y=se,C=Me),(re!==T||we!==L||$e!==A||je!==Y)&&(i.blendFuncSeparate(Pe[re],Pe[we],Pe[$e],Pe[je]),T=re,L=we,A=$e,Y=je),(dt.equals(M)===!1||At!==E)&&(i.blendColor(dt.r,dt.g,dt.b,At),M.copy(dt),E=At),b=R,V=!1}function tt(R,se){R.side===In?Te(i.CULL_FACE):Ue(i.CULL_FACE);let re=R.side===Ft;se&&(re=!re),De(re),R.blending===Ki&&R.transparent===!1?ge($n):ge(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),c.setFunc(R.depthFunc),c.setTest(R.depthTest),c.setMask(R.depthWrite),o.setMask(R.colorWrite);let we=R.stencilWrite;l.setTest(we),we&&(l.setMask(R.stencilWriteMask),l.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),l.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),F(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Ue(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function De(R){$!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),$=R)}function S(R){R!==hg?(Ue(i.CULL_FACE),R!==ae&&(R===ku?i.cullFace(i.BACK):R===fg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),ae=R}function x(R){R!==I&&(q&&i.lineWidth(R),I=R)}function F(R,se,re){R?(Ue(i.POLYGON_OFFSET_FILL),(N!==se||G!==re)&&(i.polygonOffset(se,re),N=se,G=re)):Te(i.POLYGON_OFFSET_FILL)}function te(R){R?Ue(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function K(R){R===void 0&&(R=i.TEXTURE0+X-1),ne!==R&&(i.activeTexture(R),ne=R)}function ee(R,se,re){re===void 0&&(ne===null?re=i.TEXTURE0+X-1:re=ne);let we=de[re];we===void 0&&(we={type:void 0,texture:void 0},de[re]=we),(we.type!==R||we.texture!==se)&&(ne!==re&&(i.activeTexture(re),ne=re),i.bindTexture(R,se||Ie[R]),we.type=R,we.texture=se)}function _e(){let R=de[ne];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function ue(){try{i.compressedTexImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function me(){try{i.compressedTexImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Re(){try{i.texSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Oe(){try{i.texSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function J(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function qe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function w(){try{i.texStorage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Z(){try{i.texStorage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ce(){try{i.texImage2D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ie(){try{i.texImage3D.apply(i,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ye(R){fe.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),fe.copy(R))}function He(R){ve.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),ve.copy(R))}function Ye(R,se){let re=h.get(se);re===void 0&&(re=new WeakMap,h.set(se,re));let we=re.get(R);we===void 0&&(we=i.getUniformBlockIndex(se,R.name),re.set(R,we))}function Be(R,se){let we=h.get(se).get(R);u.get(se)!==we&&(i.uniformBlockBinding(se,we,R.__bindingPointIndex),u.set(se,we))}function oe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},ne=null,de={},d={},g=new WeakMap,_=[],m=null,p=!1,b=null,y=null,T=null,L=null,C=null,A=null,Y=null,M=new Ve(0,0,0),E=0,V=!1,$=null,ae=null,I=null,N=null,G=null,fe.set(0,0,i.canvas.width,i.canvas.height),ve.set(0,0,i.canvas.width,i.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:Ue,disable:Te,bindFramebuffer:Xe,drawBuffers:O,useProgram:ft,setBlending:ge,setMaterial:tt,setFlipSided:De,setCullFace:S,setLineWidth:x,setPolygonOffset:F,setScissorTest:te,activeTexture:K,bindTexture:ee,unbindTexture:_e,compressedTexImage2D:ue,compressedTexImage3D:me,texImage2D:ce,texImage3D:ie,updateUBOMapping:Ye,uniformBlockBinding:Be,texStorage2D:w,texStorage3D:Z,texSubImage2D:Re,texSubImage3D:Oe,compressedTexSubImage2D:J,compressedTexSubImage3D:qe,scissor:ye,viewport:He,reset:oe}}function hM(i,e,t,n,s,r,a){let o=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,h,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,x){return d?new OffscreenCanvas(S,x):ro("canvas")}function _(S,x,F,te){let K=1;if((S.width>te||S.height>te)&&(K=te/Math.max(S.width,S.height)),K<1||x===!0)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap){let ee=x?so:Math.floor,_e=ee(K*S.width),ue=ee(K*S.height);h===void 0&&(h=g(_e,ue));let me=F?g(_e,ue):h;return me.width=_e,me.height=ue,me.getContext("2d").drawImage(S,0,0,_e,ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+_e+"x"+ue+")."),me}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),S;return S}function m(S){return xc(S.width)&&xc(S.height)}function p(S){return o?!1:S.wrapS!==cn||S.wrapT!==cn||S.minFilter!==It&&S.minFilter!==Kt}function b(S,x){return S.generateMipmaps&&x&&S.minFilter!==It&&S.minFilter!==Kt}function y(S){i.generateMipmap(S)}function T(S,x,F,te,K=!1){if(o===!1)return x;if(S!==null){if(i[S]!==void 0)return i[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let ee=x;if(x===i.RED&&(F===i.FLOAT&&(ee=i.R32F),F===i.HALF_FLOAT&&(ee=i.R16F),F===i.UNSIGNED_BYTE&&(ee=i.R8)),x===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(ee=i.R8UI),F===i.UNSIGNED_SHORT&&(ee=i.R16UI),F===i.UNSIGNED_INT&&(ee=i.R32UI),F===i.BYTE&&(ee=i.R8I),F===i.SHORT&&(ee=i.R16I),F===i.INT&&(ee=i.R32I)),x===i.RG&&(F===i.FLOAT&&(ee=i.RG32F),F===i.HALF_FLOAT&&(ee=i.RG16F),F===i.UNSIGNED_BYTE&&(ee=i.RG8)),x===i.RGBA){let _e=K?eo:Qe.getTransfer(te);F===i.FLOAT&&(ee=i.RGBA32F),F===i.HALF_FLOAT&&(ee=i.RGBA16F),F===i.UNSIGNED_BYTE&&(ee=_e===nt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function L(S,x,F){return b(S,F)===!0||S.isFramebufferTexture&&S.minFilter!==It&&S.minFilter!==Kt?Math.log2(Math.max(x.width,x.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?x.mipmaps.length:1}function C(S){return S===It||S===qu||S===Ua?i.NEAREST:i.LINEAR}function A(S){let x=S.target;x.removeEventListener("dispose",A),M(x),x.isVideoTexture&&u.delete(x)}function Y(S){let x=S.target;x.removeEventListener("dispose",Y),V(x)}function M(S){let x=n.get(S);if(x.__webglInit===void 0)return;let F=S.source,te=f.get(F);if(te){let K=te[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&E(S),Object.keys(te).length===0&&f.delete(F)}n.remove(S)}function E(S){let x=n.get(S);i.deleteTexture(x.__webglTexture);let F=S.source,te=f.get(F);delete te[x.__cacheKey],a.memory.textures--}function V(S){let x=S.texture,F=n.get(S),te=n.get(x);if(te.__webglTexture!==void 0&&(i.deleteTexture(te.__webglTexture),a.memory.textures--),S.depthTexture&&S.depthTexture.dispose(),S.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(F.__webglFramebuffer[K]))for(let ee=0;ee<F.__webglFramebuffer[K].length;ee++)i.deleteFramebuffer(F.__webglFramebuffer[K][ee]);else i.deleteFramebuffer(F.__webglFramebuffer[K]);F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer[K])}else{if(Array.isArray(F.__webglFramebuffer))for(let K=0;K<F.__webglFramebuffer.length;K++)i.deleteFramebuffer(F.__webglFramebuffer[K]);else i.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&i.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let K=0;K<F.__webglColorRenderbuffer.length;K++)F.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(F.__webglColorRenderbuffer[K]);F.__webglDepthRenderbuffer&&i.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let K=0,ee=x.length;K<ee;K++){let _e=n.get(x[K]);_e.__webglTexture&&(i.deleteTexture(_e.__webglTexture),a.memory.textures--),n.remove(x[K])}n.remove(x),n.remove(S)}let $=0;function ae(){$=0}function I(){let S=$;return S>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),$+=1,S}function N(S){let x=[];return x.push(S.wrapS),x.push(S.wrapT),x.push(S.wrapR||0),x.push(S.magFilter),x.push(S.minFilter),x.push(S.anisotropy),x.push(S.internalFormat),x.push(S.format),x.push(S.type),x.push(S.generateMipmaps),x.push(S.premultiplyAlpha),x.push(S.flipY),x.push(S.unpackAlignment),x.push(S.colorSpace),x.join()}function G(S,x){let F=n.get(S);if(S.isVideoTexture&&tt(S),S.isRenderTargetTexture===!1&&S.version>0&&F.__version!==S.version){let te=S.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe(F,S,x);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+x)}function X(S,x){let F=n.get(S);if(S.version>0&&F.__version!==S.version){fe(F,S,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+x)}function q(S,x){let F=n.get(S);if(S.version>0&&F.__version!==S.version){fe(F,S,x);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+x)}function W(S,x){let F=n.get(S);if(S.version>0&&F.__version!==S.version){ve(F,S,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+x)}let Q={[pc]:i.REPEAT,[cn]:i.CLAMP_TO_EDGE,[mc]:i.MIRRORED_REPEAT},ne={[It]:i.NEAREST,[qu]:i.NEAREST_MIPMAP_NEAREST,[Ua]:i.NEAREST_MIPMAP_LINEAR,[Kt]:i.LINEAR,[Xg]:i.LINEAR_MIPMAP_NEAREST,[Ds]:i.LINEAR_MIPMAP_LINEAR},de={[i_]:i.NEVER,[l_]:i.ALWAYS,[s_]:i.LESS,[wf]:i.LEQUAL,[r_]:i.EQUAL,[c_]:i.GEQUAL,[o_]:i.GREATER,[a_]:i.NOTEQUAL};function H(S,x,F){if(F?(i.texParameteri(S,i.TEXTURE_WRAP_S,Q[x.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,Q[x.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,Q[x.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,ne[x.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,ne[x.minFilter])):(i.texParameteri(S,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(S,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(x.wrapS!==cn||x.wrapT!==cn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(S,i.TEXTURE_MAG_FILTER,C(x.magFilter)),i.texParameteri(S,i.TEXTURE_MIN_FILTER,C(x.minFilter)),x.minFilter!==It&&x.minFilter!==Kt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,de[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let te=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===It||x.minFilter!==Ua&&x.minFilter!==Ds||x.type===Yn&&e.has("OES_texture_float_linear")===!1||o===!1&&x.type===Ns&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||n.get(x).__currentAnisotropy)&&(i.texParameterf(S,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy)}}function j(S,x){let F=!1;S.__webglInit===void 0&&(S.__webglInit=!0,x.addEventListener("dispose",A));let te=x.source,K=f.get(te);K===void 0&&(K={},f.set(te,K));let ee=N(x);if(ee!==S.__cacheKey){K[ee]===void 0&&(K[ee]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),K[ee].usedTimes++;let _e=K[S.__cacheKey];_e!==void 0&&(K[S.__cacheKey].usedTimes--,_e.usedTimes===0&&E(x)),S.__cacheKey=ee,S.__webglTexture=K[ee].texture}return F}function fe(S,x,F){let te=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(te=i.TEXTURE_3D);let K=j(S,x),ee=x.source;t.bindTexture(te,S.__webglTexture,i.TEXTURE0+F);let _e=n.get(ee);if(ee.version!==_e.__version||K===!0){t.activeTexture(i.TEXTURE0+F);let ue=Qe.getPrimaries(Qe.workingColorSpace),me=x.colorSpace===Qt?null:Qe.getPrimaries(x.colorSpace),Re=x.colorSpace===Qt||ue===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let Oe=p(x)&&m(x.image)===!1,J=_(x.image,Oe,!1,s.maxTextureSize);J=De(x,J);let qe=m(J)||o,w=r.convert(x.format,x.colorSpace),Z=r.convert(x.type),ce=T(x.internalFormat,w,Z,x.colorSpace,x.isVideoTexture);H(te,x,qe);let ie,ye=x.mipmaps,He=o&&x.isVideoTexture!==!0&&ce!==Sf,Ye=_e.__version===void 0||K===!0,Be=L(x,J,qe);if(x.isDepthTexture)ce=i.DEPTH_COMPONENT,o?x.type===Yn?ce=i.DEPTH_COMPONENT32F:x.type===qn?ce=i.DEPTH_COMPONENT24:x.type===pi?ce=i.DEPTH24_STENCIL8:ce=i.DEPTH_COMPONENT16:x.type===Yn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===mi&&ce===i.DEPTH_COMPONENT&&x.type!==$c&&x.type!==qn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=qn,Z=r.convert(x.type)),x.format===is&&ce===i.DEPTH_COMPONENT&&(ce=i.DEPTH_STENCIL,x.type!==pi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=pi,Z=r.convert(x.type))),Ye&&(He?t.texStorage2D(i.TEXTURE_2D,1,ce,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,ce,J.width,J.height,0,w,Z,null));else if(x.isDataTexture)if(ye.length>0&&qe){He&&Ye&&t.texStorage2D(i.TEXTURE_2D,Be,ce,ye[0].width,ye[0].height);for(let oe=0,R=ye.length;oe<R;oe++)ie=ye[oe],He?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,w,Z,ie.data):t.texImage2D(i.TEXTURE_2D,oe,ce,ie.width,ie.height,0,w,Z,ie.data);x.generateMipmaps=!1}else He?(Ye&&t.texStorage2D(i.TEXTURE_2D,Be,ce,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,J.width,J.height,w,Z,J.data)):t.texImage2D(i.TEXTURE_2D,0,ce,J.width,J.height,0,w,Z,J.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){He&&Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Be,ce,ye[0].width,ye[0].height,J.depth);for(let oe=0,R=ye.length;oe<R;oe++)ie=ye[oe],x.format!==ln?w!==null?He?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ie.width,ie.height,J.depth,w,ie.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,oe,ce,ie.width,ie.height,J.depth,0,ie.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?t.texSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ie.width,ie.height,J.depth,w,Z,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,oe,ce,ie.width,ie.height,J.depth,0,w,Z,ie.data)}else{He&&Ye&&t.texStorage2D(i.TEXTURE_2D,Be,ce,ye[0].width,ye[0].height);for(let oe=0,R=ye.length;oe<R;oe++)ie=ye[oe],x.format!==ln?w!==null?He?t.compressedTexSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,w,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,oe,ce,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,w,Z,ie.data):t.texImage2D(i.TEXTURE_2D,oe,ce,ie.width,ie.height,0,w,Z,ie.data)}else if(x.isDataArrayTexture)He?(Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Be,ce,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,w,Z,J.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ce,J.width,J.height,J.depth,0,w,Z,J.data);else if(x.isData3DTexture)He?(Ye&&t.texStorage3D(i.TEXTURE_3D,Be,ce,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,w,Z,J.data)):t.texImage3D(i.TEXTURE_3D,0,ce,J.width,J.height,J.depth,0,w,Z,J.data);else if(x.isFramebufferTexture){if(Ye)if(He)t.texStorage2D(i.TEXTURE_2D,Be,ce,J.width,J.height);else{let oe=J.width,R=J.height;for(let se=0;se<Be;se++)t.texImage2D(i.TEXTURE_2D,se,ce,oe,R,0,w,Z,null),oe>>=1,R>>=1}}else if(ye.length>0&&qe){He&&Ye&&t.texStorage2D(i.TEXTURE_2D,Be,ce,ye[0].width,ye[0].height);for(let oe=0,R=ye.length;oe<R;oe++)ie=ye[oe],He?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,w,Z,ie):t.texImage2D(i.TEXTURE_2D,oe,ce,w,Z,ie);x.generateMipmaps=!1}else He?(Ye&&t.texStorage2D(i.TEXTURE_2D,Be,ce,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,w,Z,J)):t.texImage2D(i.TEXTURE_2D,0,ce,w,Z,J);b(x,qe)&&y(te),_e.__version=ee.version,x.onUpdate&&x.onUpdate(x)}S.__version=x.version}function ve(S,x,F){if(x.image.length!==6)return;let te=j(S,x),K=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+F);let ee=n.get(K);if(K.version!==ee.__version||te===!0){t.activeTexture(i.TEXTURE0+F);let _e=Qe.getPrimaries(Qe.workingColorSpace),ue=x.colorSpace===Qt?null:Qe.getPrimaries(x.colorSpace),me=x.colorSpace===Qt||_e===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let Re=x.isCompressedTexture||x.image[0].isCompressedTexture,Oe=x.image[0]&&x.image[0].isDataTexture,J=[];for(let oe=0;oe<6;oe++)!Re&&!Oe?J[oe]=_(x.image[oe],!1,!0,s.maxCubemapSize):J[oe]=Oe?x.image[oe].image:x.image[oe],J[oe]=De(x,J[oe]);let qe=J[0],w=m(qe)||o,Z=r.convert(x.format,x.colorSpace),ce=r.convert(x.type),ie=T(x.internalFormat,Z,ce,x.colorSpace),ye=o&&x.isVideoTexture!==!0,He=ee.__version===void 0||te===!0,Ye=L(x,qe,w);H(i.TEXTURE_CUBE_MAP,x,w);let Be;if(Re){ye&&He&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ye,ie,qe.width,qe.height);for(let oe=0;oe<6;oe++){Be=J[oe].mipmaps;for(let R=0;R<Be.length;R++){let se=Be[R];x.format!==ln?Z!==null?ye?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,R,0,0,se.width,se.height,Z,se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,R,ie,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ye?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,R,0,0,se.width,se.height,Z,ce,se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,R,ie,se.width,se.height,0,Z,ce,se.data)}}}else{Be=x.mipmaps,ye&&He&&(Be.length>0&&Ye++,t.texStorage2D(i.TEXTURE_CUBE_MAP,Ye,ie,J[0].width,J[0].height));for(let oe=0;oe<6;oe++)if(Oe){ye?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,J[oe].width,J[oe].height,Z,ce,J[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ie,J[oe].width,J[oe].height,0,Z,ce,J[oe].data);for(let R=0;R<Be.length;R++){let re=Be[R].image[oe].image;ye?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,R+1,0,0,re.width,re.height,Z,ce,re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,R+1,ie,re.width,re.height,0,Z,ce,re.data)}}else{ye?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Z,ce,J[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ie,Z,ce,J[oe]);for(let R=0;R<Be.length;R++){let se=Be[R];ye?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,R+1,0,0,Z,ce,se.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,R+1,ie,Z,ce,se.image[oe])}}}b(x,w)&&y(i.TEXTURE_CUBE_MAP),ee.__version=K.version,x.onUpdate&&x.onUpdate(x)}S.__version=x.version}function xe(S,x,F,te,K,ee){let _e=r.convert(F.format,F.colorSpace),ue=r.convert(F.type),me=T(F.internalFormat,_e,ue,F.colorSpace);if(!n.get(x).__hasExternalTextures){let Oe=Math.max(1,x.width>>ee),J=Math.max(1,x.height>>ee);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,ee,me,Oe,J,x.depth,0,_e,ue,null):t.texImage2D(K,ee,me,Oe,J,0,_e,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,S),ge(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,K,n.get(F).__webglTexture,0,Pe(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,K,n.get(F).__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(S,x,F){if(i.bindRenderbuffer(i.RENDERBUFFER,S),x.depthBuffer&&!x.stencilBuffer){let te=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(F||ge(x)){let K=x.depthTexture;K&&K.isDepthTexture&&(K.type===Yn?te=i.DEPTH_COMPONENT32F:K.type===qn&&(te=i.DEPTH_COMPONENT24));let ee=Pe(x);ge(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,te,x.width,x.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,te,x.width,x.height)}else i.renderbufferStorage(i.RENDERBUFFER,te,x.width,x.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,S)}else if(x.depthBuffer&&x.stencilBuffer){let te=Pe(x);F&&ge(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,te,i.DEPTH24_STENCIL8,x.width,x.height):ge(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te,i.DEPTH24_STENCIL8,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,S)}else{let te=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let K=0;K<te.length;K++){let ee=te[K],_e=r.convert(ee.format,ee.colorSpace),ue=r.convert(ee.type),me=T(ee.internalFormat,_e,ue,ee.colorSpace),Re=Pe(x);F&&ge(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,me,x.width,x.height):ge(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Re,me,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,me,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(S,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,S),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G(x.depthTexture,0);let te=n.get(x.depthTexture).__webglTexture,K=Pe(x);if(x.depthTexture.format===mi)ge(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(x.depthTexture.format===is)ge(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Te(S){let x=n.get(S),F=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!x.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ue(x.__webglFramebuffer,S)}else if(F){x.__webglDepthbuffer=[];for(let te=0;te<6;te++)t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[te]),x.__webglDepthbuffer[te]=i.createRenderbuffer(),Ie(x.__webglDepthbuffer[te],S,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=i.createRenderbuffer(),Ie(x.__webglDepthbuffer,S,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(S,x,F){let te=n.get(S);x!==void 0&&xe(te.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Te(S)}function O(S){let x=S.texture,F=n.get(S),te=n.get(x);S.addEventListener("dispose",Y),S.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=x.version,a.memory.textures++);let K=S.isWebGLCubeRenderTarget===!0,ee=S.isWebGLMultipleRenderTargets===!0,_e=m(S)||o;if(K){F.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(o&&x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[ue]=[];for(let me=0;me<x.mipmaps.length;me++)F.__webglFramebuffer[ue][me]=i.createFramebuffer()}else F.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(o&&x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let ue=0;ue<x.mipmaps.length;ue++)F.__webglFramebuffer[ue]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(ee)if(s.drawBuffers){let ue=S.texture;for(let me=0,Re=ue.length;me<Re;me++){let Oe=n.get(ue[me]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&S.samples>0&&ge(S)===!1){let ue=ee?x:[x];F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let me=0;me<ue.length;me++){let Re=ue[me];F.__webglColorRenderbuffer[me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[me]);let Oe=r.convert(Re.format,Re.colorSpace),J=r.convert(Re.type),qe=T(Re.internalFormat,Oe,J,Re.colorSpace,S.isXRRenderTarget===!0),w=Pe(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,w,qe,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,F.__webglColorRenderbuffer[me])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Ie(F.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),H(i.TEXTURE_CUBE_MAP,x,_e);for(let ue=0;ue<6;ue++)if(o&&x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)xe(F.__webglFramebuffer[ue][me],S,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,me);else xe(F.__webglFramebuffer[ue],S,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);b(x,_e)&&y(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){let ue=S.texture;for(let me=0,Re=ue.length;me<Re;me++){let Oe=ue[me],J=n.get(Oe);t.bindTexture(i.TEXTURE_2D,J.__webglTexture),H(i.TEXTURE_2D,Oe,_e),xe(F.__webglFramebuffer,S,Oe,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,0),b(Oe,_e)&&y(i.TEXTURE_2D)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(o?ue=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ue,te.__webglTexture),H(ue,x,_e),o&&x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)xe(F.__webglFramebuffer[me],S,x,i.COLOR_ATTACHMENT0,ue,me);else xe(F.__webglFramebuffer,S,x,i.COLOR_ATTACHMENT0,ue,0);b(x,_e)&&y(ue),t.unbindTexture()}S.depthBuffer&&Te(S)}function ft(S){let x=m(S)||o,F=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let te=0,K=F.length;te<K;te++){let ee=F[te];if(b(ee,x)){let _e=S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ue=n.get(ee).__webglTexture;t.bindTexture(_e,ue),y(_e),t.unbindTexture()}}}function Ee(S){if(o&&S.samples>0&&ge(S)===!1){let x=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],F=S.width,te=S.height,K=i.COLOR_BUFFER_BIT,ee=[],_e=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(S),me=S.isWebGLMultipleRenderTargets===!0;if(me)for(let Re=0;Re<x.length;Re++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let Re=0;Re<x.length;Re++){ee.push(i.COLOR_ATTACHMENT0+Re),S.depthBuffer&&ee.push(_e);let Oe=ue.__ignoreDepthValues!==void 0?ue.__ignoreDepthValues:!1;if(Oe===!1&&(S.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),me&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[Re]),Oe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[_e]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_e])),me){let J=n.get(x[Re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,F,te,0,0,F,te,K,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),me)for(let Re=0;Re<x.length;Re++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,ue.__webglColorRenderbuffer[Re]);let Oe=n.get(x[Re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,Oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}}function Pe(S){return Math.min(s.maxSamples,S.samples)}function ge(S){let x=n.get(S);return o&&S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function tt(S){let x=a.render.frame;u.get(S)!==x&&(u.set(S,x),S.update())}function De(S,x){let F=S.colorSpace,te=S.format,K=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||S.format===_c||F!==On&&F!==Qt&&(Qe.getTransfer(F)===nt?o===!1?e.has("EXT_sRGB")===!0&&te===ln?(S.format=_c,S.minFilter=Kt,S.generateMipmaps=!1):x=oo.sRGBToLinear(x):(te!==ln||K!==jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),x}this.allocateTextureUnit=I,this.resetTextureUnits=ae,this.setTexture2D=G,this.setTexture2DArray=X,this.setTexture3D=q,this.setTextureCube=W,this.rebindTextures=Xe,this.setupRenderTarget=O,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ge}function fM(i,e,t){let n=t.isWebGL2;function s(r,a=Qt){let o,c=Qe.getTransfer(a);if(r===jn)return i.UNSIGNED_BYTE;if(r===_f)return i.UNSIGNED_SHORT_4_4_4_4;if(r===xf)return i.UNSIGNED_SHORT_5_5_5_1;if(r===qg)return i.BYTE;if(r===Yg)return i.SHORT;if(r===$c)return i.UNSIGNED_SHORT;if(r===gf)return i.INT;if(r===qn)return i.UNSIGNED_INT;if(r===Yn)return i.FLOAT;if(r===Ns)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===$g)return i.ALPHA;if(r===ln)return i.RGBA;if(r===Zg)return i.LUMINANCE;if(r===jg)return i.LUMINANCE_ALPHA;if(r===mi)return i.DEPTH_COMPONENT;if(r===is)return i.DEPTH_STENCIL;if(r===_c)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Jg)return i.RED;if(r===yf)return i.RED_INTEGER;if(r===Kg)return i.RG;if(r===vf)return i.RG_INTEGER;if(r===Mf)return i.RGBA_INTEGER;if(r===Da||r===Na||r===Oa||r===Fa)if(c===nt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Da)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Na)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Oa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Fa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Da)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Na)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Oa)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Fa)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Yu||r===$u||r===Zu||r===ju)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Yu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===$u)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Zu)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===ju)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Sf)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Ju||r===Ku)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Ju)return c===nt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Ku)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Qu||r===eh||r===th||r===nh||r===ih||r===sh||r===rh||r===oh||r===ah||r===ch||r===lh||r===uh||r===hh||r===fh)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Qu)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===eh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===th)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===nh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ih)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===sh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===rh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===oh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ah)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ch)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===lh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===uh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===hh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===fh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===za||r===dh||r===ph)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===za)return c===nt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===dh)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ph)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Qg||r===mh||r===gh||r===_h)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===za)return o.COMPRESSED_RED_RGTC1_EXT;if(r===mh)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===gh)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===_h)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===pi?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var Lc=class extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Yt=class extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}},dM={type:"move"},Us=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(dM)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Yt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ic=class extends mn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null,_=t.getContextAttributes(),m=null,p=null,b=[],y=[],T=new be,L=null,C=new Ut;C.layers.enable(1),C.viewport=new _t;let A=new Ut;A.layers.enable(2),A.viewport=new _t;let Y=[C,A],M=new Lc;M.layers.enable(1),M.layers.enable(2);let E=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let j=b[H];return j===void 0&&(j=new Us,b[H]=j),j.getTargetRaySpace()},this.getControllerGrip=function(H){let j=b[H];return j===void 0&&(j=new Us,b[H]=j),j.getGripSpace()},this.getHand=function(H){let j=b[H];return j===void 0&&(j=new Us,b[H]=j),j.getHandSpace()};function $(H){let j=y.indexOf(H.inputSource);if(j===-1)return;let fe=b[j];fe!==void 0&&(fe.update(H.inputSource,H.frame,l||a),fe.dispatchEvent({type:H.type,data:H.inputSource}))}function ae(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",ae),s.removeEventListener("inputsourceschange",I);for(let H=0;H<b.length;H++){let j=y[H];j!==null&&(y[H]=null,b[H].disconnect(j))}E=null,V=null,e.setRenderTarget(m),d=null,f=null,h=null,s=null,p=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",ae),s.addEventListener("inputsourceschange",I),_.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(T),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let j={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,j),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new Fn(d.framebufferWidth,d.framebufferHeight,{format:ln,type:jn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let j=null,fe=null,ve=null;_.depth&&(ve=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=_.stencil?is:mi,fe=_.stencil?pi:qn);let xe={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};h=new XRWebGLBinding(s,t),f=h.createProjectionLayer(xe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new Fn(f.textureWidth,f.textureHeight,{format:ln,type:jn,depthTexture:new xo(f.textureWidth,f.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});let Ie=e.properties.get(p);Ie.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),de.setContext(s),de.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function I(H){for(let j=0;j<H.removed.length;j++){let fe=H.removed[j],ve=y.indexOf(fe);ve>=0&&(y[ve]=null,b[ve].disconnect(fe))}for(let j=0;j<H.added.length;j++){let fe=H.added[j],ve=y.indexOf(fe);if(ve===-1){for(let Ie=0;Ie<b.length;Ie++)if(Ie>=y.length){y.push(fe),ve=Ie;break}else if(y[Ie]===null){y[Ie]=fe,ve=Ie;break}if(ve===-1)break}let xe=b[ve];xe&&xe.connect(fe)}}let N=new U,G=new U;function X(H,j,fe){N.setFromMatrixPosition(j.matrixWorld),G.setFromMatrixPosition(fe.matrixWorld);let ve=N.distanceTo(G),xe=j.projectionMatrix.elements,Ie=fe.projectionMatrix.elements,Ue=xe[14]/(xe[10]-1),Te=xe[14]/(xe[10]+1),Xe=(xe[9]+1)/xe[5],O=(xe[9]-1)/xe[5],ft=(xe[8]-1)/xe[0],Ee=(Ie[8]+1)/Ie[0],Pe=Ue*ft,ge=Ue*Ee,tt=ve/(-ft+Ee),De=tt*-ft;j.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(De),H.translateZ(tt),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();let S=Ue+tt,x=Te+tt,F=Pe-De,te=ge+(ve-De),K=Xe*Te/x*S,ee=O*Te/x*S;H.projectionMatrix.makePerspective(F,te,K,ee,S,x),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function q(H,j){j===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(j.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;M.near=A.near=C.near=H.near,M.far=A.far=C.far=H.far,(E!==M.near||V!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),E=M.near,V=M.far);let j=H.parent,fe=M.cameras;q(M,j);for(let ve=0;ve<fe.length;ve++)q(fe[ve],j);fe.length===2?X(M,C,A):M.projectionMatrix.copy(C.projectionMatrix),W(H,M,j)};function W(H,j,fe){fe===null?H.matrix.copy(j.matrixWorld):(H.matrix.copy(fe.matrixWorld),H.matrix.invert(),H.matrix.multiply(j.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(j.projectionMatrix),H.projectionMatrixInverse.copy(j.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Os*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(H){c=H,f!==null&&(f.fixedFoveation=H),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=H)};let Q=null;function ne(H,j){if(u=j.getViewerPose(l||a),g=j,u!==null){let fe=u.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let ve=!1;fe.length!==M.cameras.length&&(M.cameras.length=0,ve=!0);for(let xe=0;xe<fe.length;xe++){let Ie=fe[xe],Ue=null;if(d!==null)Ue=d.getViewport(Ie);else{let Xe=h.getViewSubImage(f,Ie);Ue=Xe.viewport,xe===0&&(e.setRenderTargetTextures(p,Xe.colorTexture,f.ignoreDepthValues?void 0:Xe.depthStencilTexture),e.setRenderTarget(p))}let Te=Y[xe];Te===void 0&&(Te=new Ut,Te.layers.enable(xe),Te.viewport=new _t,Y[xe]=Te),Te.matrix.fromArray(Ie.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(Ie.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),xe===0&&(M.matrix.copy(Te.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ve===!0&&M.cameras.push(Te)}}for(let fe=0;fe<b.length;fe++){let ve=y[fe],xe=b[fe];ve!==null&&xe!==void 0&&xe.update(ve,j,l||a)}Q&&Q(H,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}let de=new Pf;de.setAnimationLoop(ne),this.setAnimationLoop=function(H){Q=H},this.dispose=function(){}}};function pM(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Cf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,y,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,T)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,b,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ft&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ft&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=e.get(p).envMap;if(b&&(m.envMap.value=b,m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let y=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*y,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ft&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function mM(i,e,t,n){let s={},r={},a=[],o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(b,y){let T=y.program;n.uniformBlockBinding(b,T)}function l(b,y){let T=s[b.id];T===void 0&&(g(b),T=u(b),s[b.id]=T,b.addEventListener("dispose",m));let L=y.program;n.updateUBOMapping(b,L);let C=e.render.frame;r[b.id]!==C&&(f(b),r[b.id]=C)}function u(b){let y=h();b.__bindingPointIndex=y;let T=i.createBuffer(),L=b.__size,C=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,L,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,T),T}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){let y=s[b.id],T=b.uniforms,L=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let C=0,A=T.length;C<A;C++){let Y=Array.isArray(T[C])?T[C]:[T[C]];for(let M=0,E=Y.length;M<E;M++){let V=Y[M];if(d(V,C,M,L)===!0){let $=V.__offset,ae=Array.isArray(V.value)?V.value:[V.value],I=0;for(let N=0;N<ae.length;N++){let G=ae[N],X=_(G);typeof G=="number"||typeof G=="boolean"?(V.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,$+I,V.__data)):G.isMatrix3?(V.__data[0]=G.elements[0],V.__data[1]=G.elements[1],V.__data[2]=G.elements[2],V.__data[3]=0,V.__data[4]=G.elements[3],V.__data[5]=G.elements[4],V.__data[6]=G.elements[5],V.__data[7]=0,V.__data[8]=G.elements[6],V.__data[9]=G.elements[7],V.__data[10]=G.elements[8],V.__data[11]=0):(G.toArray(V.__data,I),I+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,$,V.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,y,T,L){let C=b.value,A=y+"_"+T;if(L[A]===void 0)return typeof C=="number"||typeof C=="boolean"?L[A]=C:L[A]=C.clone(),!0;{let Y=L[A];if(typeof C=="number"||typeof C=="boolean"){if(Y!==C)return L[A]=C,!0}else if(Y.equals(C)===!1)return Y.copy(C),!0}return!1}function g(b){let y=b.uniforms,T=0,L=16;for(let A=0,Y=y.length;A<Y;A++){let M=Array.isArray(y[A])?y[A]:[y[A]];for(let E=0,V=M.length;E<V;E++){let $=M[E],ae=Array.isArray($.value)?$.value:[$.value];for(let I=0,N=ae.length;I<N;I++){let G=ae[I],X=_(G),q=T%L;q!==0&&L-q<X.boundary&&(T+=L-q),$.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=T,T+=X.storage}}}let C=T%L;return C>0&&(T+=L-C),b.__size=T,b.__cache={},this}function _(b){let y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),y}function m(b){let y=b.target;y.removeEventListener("dispose",m);let T=a.indexOf(y.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}var ks=class{constructor(e={}){let{canvas:t=E_(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;let d=new Uint32Array(4),g=new Int32Array(4),_=null,m=null,p=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=vt,this._useLegacyLights=!1,this.toneMapping=Zn,this.toneMappingExposure=1;let y=this,T=!1,L=0,C=0,A=null,Y=-1,M=null,E=new _t,V=new _t,$=null,ae=new Ve(0),I=0,N=t.width,G=t.height,X=1,q=null,W=null,Q=new _t(0,0,N,G),ne=new _t(0,0,N,G),de=!1,H=new zs,j=!1,fe=!1,ve=null,xe=new lt,Ie=new be,Ue=new U,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Xe(){return A===null?X:1}let O=n;function ft(v,D){for(let B=0;B<v.length;B++){let k=v[B],z=t.getContext(k,D);if(z!==null)return z}return null}try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r160"),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",R,!1),t.addEventListener("webglcontextcreationerror",se,!1),O===null){let D=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&D.shift(),O=ft(D,v),O===null)throw ft(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Ee,Pe,ge,tt,De,S,x,F,te,K,ee,_e,ue,me,Re,Oe,J,qe,w,Z,ce,ie,ye,He;function Ye(){Ee=new Dy(O),Pe=new Ry(O,Ee,e),Ee.init(Pe),ie=new fM(O,Ee,Pe),ge=new uM(O,Ee,Pe),tt=new Fy(O),De=new Kv,S=new hM(O,Ee,ge,De,Pe,ie,tt),x=new Py(y),F=new Uy(y),te=new X_(O,Pe),ye=new Ay(O,Ee,te,Pe),K=new Ny(O,te,tt,ye),ee=new Vy(O,K,te,tt),w=new ky(O,Pe,S),Oe=new Cy(De),_e=new Jv(y,x,F,Ee,Pe,ye,Oe),ue=new pM(y,De),me=new eM,Re=new oM(Ee,Pe),qe=new wy(y,x,F,ge,ee,f,c),J=new lM(y,ee,Pe),He=new mM(O,tt,Pe,ge),Z=new Ty(O,Ee,tt,Pe),ce=new Oy(O,Ee,tt,Pe),tt.programs=_e.programs,y.capabilities=Pe,y.extensions=Ee,y.properties=De,y.renderLists=me,y.shadowMap=J,y.state=ge,y.info=tt}Ye();let Be=new Ic(y,O);this.xr=Be,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let v=Ee.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Ee.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(v){v!==void 0&&(X=v,this.setSize(N,G,!1))},this.getSize=function(v){return v.set(N,G)},this.setSize=function(v,D,B=!0){if(Be.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=v,G=D,t.width=Math.floor(v*X),t.height=Math.floor(D*X),B===!0&&(t.style.width=v+"px",t.style.height=D+"px"),this.setViewport(0,0,v,D)},this.getDrawingBufferSize=function(v){return v.set(N*X,G*X).floor()},this.setDrawingBufferSize=function(v,D,B){N=v,G=D,X=B,t.width=Math.floor(v*B),t.height=Math.floor(D*B),this.setViewport(0,0,v,D)},this.getCurrentViewport=function(v){return v.copy(E)},this.getViewport=function(v){return v.copy(Q)},this.setViewport=function(v,D,B,k){v.isVector4?Q.set(v.x,v.y,v.z,v.w):Q.set(v,D,B,k),ge.viewport(E.copy(Q).multiplyScalar(X).floor())},this.getScissor=function(v){return v.copy(ne)},this.setScissor=function(v,D,B,k){v.isVector4?ne.set(v.x,v.y,v.z,v.w):ne.set(v,D,B,k),ge.scissor(V.copy(ne).multiplyScalar(X).floor())},this.getScissorTest=function(){return de},this.setScissorTest=function(v){ge.setScissorTest(de=v)},this.setOpaqueSort=function(v){q=v},this.setTransparentSort=function(v){W=v},this.getClearColor=function(v){return v.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor.apply(qe,arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha.apply(qe,arguments)},this.clear=function(v=!0,D=!0,B=!0){let k=0;if(v){let z=!1;if(A!==null){let pe=A.texture.format;z=pe===Mf||pe===vf||pe===yf}if(z){let pe=A.texture.type,Se=pe===jn||pe===qn||pe===$c||pe===pi||pe===_f||pe===xf,Ce=qe.getClearColor(),Le=qe.getClearAlpha(),ke=Ce.r,Ne=Ce.g,Fe=Ce.b;Se?(d[0]=ke,d[1]=Ne,d[2]=Fe,d[3]=Le,O.clearBufferuiv(O.COLOR,0,d)):(g[0]=ke,g[1]=Ne,g[2]=Fe,g[3]=Le,O.clearBufferiv(O.COLOR,0,g))}else k|=O.COLOR_BUFFER_BIT}D&&(k|=O.DEPTH_BUFFER_BIT),B&&(k|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",R,!1),t.removeEventListener("webglcontextcreationerror",se,!1),me.dispose(),Re.dispose(),De.dispose(),x.dispose(),F.dispose(),ee.dispose(),ye.dispose(),He.dispose(),_e.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",At),Be.removeEventListener("sessionend",et),ve&&(ve.dispose(),ve=null),Tt.stop()};function oe(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let v=tt.autoReset,D=J.enabled,B=J.autoUpdate,k=J.needsUpdate,z=J.type;Ye(),tt.autoReset=v,J.enabled=D,J.autoUpdate=B,J.needsUpdate=k,J.type=z}function se(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function re(v){let D=v.target;D.removeEventListener("dispose",re),we(D)}function we(v){Me(v),De.remove(v)}function Me(v){let D=De.get(v).programs;D!==void 0&&(D.forEach(function(B){_e.releaseProgram(B)}),v.isShaderMaterial&&_e.releaseShaderCache(v))}this.renderBufferDirect=function(v,D,B,k,z,pe){D===null&&(D=Te);let Se=z.isMesh&&z.matrixWorld.determinant()<0,Ce=$d(v,D,B,k,z);ge.setMaterial(k,Se);let Le=B.index,ke=1;if(k.wireframe===!0){if(Le=K.getWireframeAttribute(B),Le===void 0)return;ke=2}let Ne=B.drawRange,Fe=B.attributes.position,ot=Ne.start*ke,Bt=(Ne.start+Ne.count)*ke;pe!==null&&(ot=Math.max(ot,pe.start*ke),Bt=Math.min(Bt,(pe.start+pe.count)*ke)),Le!==null?(ot=Math.max(ot,0),Bt=Math.min(Bt,Le.count)):Fe!=null&&(ot=Math.max(ot,0),Bt=Math.min(Bt,Fe.count));let pt=Bt-ot;if(pt<0||pt===1/0)return;ye.setup(z,k,Ce,B,Le);let yn,st=Z;if(Le!==null&&(yn=te.get(Le),st=ce,st.setIndex(yn)),z.isMesh)k.wireframe===!0?(ge.setLineWidth(k.wireframeLinewidth*Xe()),st.setMode(O.LINES)):st.setMode(O.TRIANGLES);else if(z.isLine){let Ge=k.linewidth;Ge===void 0&&(Ge=1),ge.setLineWidth(Ge*Xe()),z.isLineSegments?st.setMode(O.LINES):z.isLineLoop?st.setMode(O.LINE_LOOP):st.setMode(O.LINE_STRIP)}else z.isPoints?st.setMode(O.POINTS):z.isSprite&&st.setMode(O.TRIANGLES);if(z.isBatchedMesh)st.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else if(z.isInstancedMesh)st.renderInstances(ot,pt,z.count);else if(B.isInstancedBufferGeometry){let Ge=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,qo=Math.min(B.instanceCount,Ge);st.renderInstances(ot,pt,qo)}else st.render(ot,pt)};function $e(v,D,B){v.transparent===!0&&v.side===In&&v.forceSinglePass===!1?(v.side=Ft,v.needsUpdate=!0,qs(v,D,B),v.side=en,v.needsUpdate=!0,qs(v,D,B),v.side=In):qs(v,D,B)}this.compile=function(v,D,B=null){B===null&&(B=v),m=Re.get(B),m.init(),b.push(m),B.traverseVisible(function(z){z.isLight&&z.layers.test(D.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),v!==B&&v.traverseVisible(function(z){z.isLight&&z.layers.test(D.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights(y._useLegacyLights);let k=new Set;return v.traverse(function(z){let pe=z.material;if(pe)if(Array.isArray(pe))for(let Se=0;Se<pe.length;Se++){let Ce=pe[Se];$e(Ce,B,z),k.add(Ce)}else $e(pe,B,z),k.add(pe)}),b.pop(),m=null,k},this.compileAsync=function(v,D,B=null){let k=this.compile(v,D,B);return new Promise(z=>{function pe(){if(k.forEach(function(Se){De.get(Se).currentProgram.isReady()&&k.delete(Se)}),k.size===0){z(v);return}setTimeout(pe,10)}Ee.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let je=null;function dt(v){je&&je(v)}function At(){Tt.stop()}function et(){Tt.start()}let Tt=new Pf;Tt.setAnimationLoop(dt),typeof self<"u"&&Tt.setContext(self),this.setAnimationLoop=function(v){je=v,Be.setAnimationLoop(v),v===null?Tt.stop():Tt.start()},Be.addEventListener("sessionstart",At),Be.addEventListener("sessionend",et),this.render=function(v,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(D),D=Be.getCamera()),v.isScene===!0&&v.onBeforeRender(y,v,D,A),m=Re.get(v,b.length),m.init(),b.push(m),xe.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),H.setFromProjectionMatrix(xe),fe=this.localClippingEnabled,j=Oe.init(this.clippingPlanes,fe),_=me.get(v,p.length),_.init(),p.push(_),hn(v,D,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(q,W),this.info.render.frame++,j===!0&&Oe.beginShadows();let B=m.state.shadowsArray;if(J.render(B,v,D),j===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),qe.render(_,v),m.setupLights(y._useLegacyLights),D.isArrayCamera){let k=D.cameras;for(let z=0,pe=k.length;z<pe;z++){let Se=k[z];xl(_,v,Se,Se.viewport)}}else xl(_,v,D);A!==null&&(S.updateMultisampleRenderTarget(A),S.updateRenderTargetMipmap(A)),v.isScene===!0&&v.onAfterRender(y,v,D),ye.resetDefaultState(),Y=-1,M=null,b.pop(),b.length>0?m=b[b.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function hn(v,D,B,k){if(v.visible===!1)return;if(v.layers.test(D.layers)){if(v.isGroup)B=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(D);else if(v.isLight)m.pushLight(v),v.castShadow&&m.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||H.intersectsSprite(v)){k&&Ue.setFromMatrixPosition(v.matrixWorld).applyMatrix4(xe);let Se=ee.update(v),Ce=v.material;Ce.visible&&_.push(v,Se,Ce,B,Ue.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||H.intersectsObject(v))){let Se=ee.update(v),Ce=v.material;if(k&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Ue.copy(v.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ue.copy(Se.boundingSphere.center)),Ue.applyMatrix4(v.matrixWorld).applyMatrix4(xe)),Array.isArray(Ce)){let Le=Se.groups;for(let ke=0,Ne=Le.length;ke<Ne;ke++){let Fe=Le[ke],ot=Ce[Fe.materialIndex];ot&&ot.visible&&_.push(v,Se,ot,B,Ue.z,Fe)}}else Ce.visible&&_.push(v,Se,Ce,B,Ue.z,null)}}let pe=v.children;for(let Se=0,Ce=pe.length;Se<Ce;Se++)hn(pe[Se],D,B,k)}function xl(v,D,B,k){let z=v.opaque,pe=v.transmissive,Se=v.transparent;m.setupLightsView(B),j===!0&&Oe.setGlobalState(y.clippingPlanes,B),pe.length>0&&Yd(z,pe,D,B),k&&ge.viewport(E.copy(k)),z.length>0&&Xs(z,D,B),pe.length>0&&Xs(pe,D,B),Se.length>0&&Xs(Se,D,B),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Yd(v,D,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;let pe=Pe.isWebGL2;ve===null&&(ve=new Fn(1,1,{generateMipmaps:!0,type:Ee.has("EXT_color_buffer_half_float")?Ns:jn,minFilter:Ds,samples:pe?4:0})),y.getDrawingBufferSize(Ie),pe?ve.setSize(Ie.x,Ie.y):ve.setSize(so(Ie.x),so(Ie.y));let Se=y.getRenderTarget();y.setRenderTarget(ve),y.getClearColor(ae),I=y.getClearAlpha(),I<1&&y.setClearColor(16777215,.5),y.clear();let Ce=y.toneMapping;y.toneMapping=Zn,Xs(v,B,k),S.updateMultisampleRenderTarget(ve),S.updateRenderTargetMipmap(ve);let Le=!1;for(let ke=0,Ne=D.length;ke<Ne;ke++){let Fe=D[ke],ot=Fe.object,Bt=Fe.geometry,pt=Fe.material,yn=Fe.group;if(pt.side===In&&ot.layers.test(k.layers)){let st=pt.side;pt.side=Ft,pt.needsUpdate=!0,yl(ot,B,k,Bt,pt,yn),pt.side=st,pt.needsUpdate=!0,Le=!0}}Le===!0&&(S.updateMultisampleRenderTarget(ve),S.updateRenderTargetMipmap(ve)),y.setRenderTarget(Se),y.setClearColor(ae,I),y.toneMapping=Ce}function Xs(v,D,B){let k=D.isScene===!0?D.overrideMaterial:null;for(let z=0,pe=v.length;z<pe;z++){let Se=v[z],Ce=Se.object,Le=Se.geometry,ke=k===null?Se.material:k,Ne=Se.group;Ce.layers.test(B.layers)&&yl(Ce,D,B,Le,ke,Ne)}}function yl(v,D,B,k,z,pe){v.onBeforeRender(y,D,B,k,z,pe),v.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),z.onBeforeRender(y,D,B,k,v,pe),z.transparent===!0&&z.side===In&&z.forceSinglePass===!1?(z.side=Ft,z.needsUpdate=!0,y.renderBufferDirect(B,D,k,z,v,pe),z.side=en,z.needsUpdate=!0,y.renderBufferDirect(B,D,k,z,v,pe),z.side=In):y.renderBufferDirect(B,D,k,z,v,pe),v.onAfterRender(y,D,B,k,z,pe)}function qs(v,D,B){D.isScene!==!0&&(D=Te);let k=De.get(v),z=m.state.lights,pe=m.state.shadowsArray,Se=z.state.version,Ce=_e.getParameters(v,z.state,pe,D,B),Le=_e.getProgramCacheKey(Ce),ke=k.programs;k.environment=v.isMeshStandardMaterial?D.environment:null,k.fog=D.fog,k.envMap=(v.isMeshStandardMaterial?F:x).get(v.envMap||k.environment),ke===void 0&&(v.addEventListener("dispose",re),ke=new Map,k.programs=ke);let Ne=ke.get(Le);if(Ne!==void 0){if(k.currentProgram===Ne&&k.lightsStateVersion===Se)return Ml(v,Ce),Ne}else Ce.uniforms=_e.getUniforms(v),v.onBuild(B,Ce,y),v.onBeforeCompile(Ce,y),Ne=_e.acquireProgram(Ce,Le),ke.set(Le,Ne),k.uniforms=Ce.uniforms;let Fe=k.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Fe.clippingPlanes=Oe.uniform),Ml(v,Ce),k.needsLights=jd(v),k.lightsStateVersion=Se,k.needsLights&&(Fe.ambientLightColor.value=z.state.ambient,Fe.lightProbe.value=z.state.probe,Fe.directionalLights.value=z.state.directional,Fe.directionalLightShadows.value=z.state.directionalShadow,Fe.spotLights.value=z.state.spot,Fe.spotLightShadows.value=z.state.spotShadow,Fe.rectAreaLights.value=z.state.rectArea,Fe.ltc_1.value=z.state.rectAreaLTC1,Fe.ltc_2.value=z.state.rectAreaLTC2,Fe.pointLights.value=z.state.point,Fe.pointLightShadows.value=z.state.pointShadow,Fe.hemisphereLights.value=z.state.hemi,Fe.directionalShadowMap.value=z.state.directionalShadowMap,Fe.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Fe.spotShadowMap.value=z.state.spotShadowMap,Fe.spotLightMatrix.value=z.state.spotLightMatrix,Fe.spotLightMap.value=z.state.spotLightMap,Fe.pointShadowMap.value=z.state.pointShadowMap,Fe.pointShadowMatrix.value=z.state.pointShadowMatrix),k.currentProgram=Ne,k.uniformsList=null,Ne}function vl(v){if(v.uniformsList===null){let D=v.currentProgram.getUniforms();v.uniformsList=es.seqWithValue(D.seq,v.uniforms)}return v.uniformsList}function Ml(v,D){let B=De.get(v);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function $d(v,D,B,k,z){D.isScene!==!0&&(D=Te),S.resetTextureUnits();let pe=D.fog,Se=k.isMeshStandardMaterial?D.environment:null,Ce=A===null?y.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:On,Le=(k.isMeshStandardMaterial?F:x).get(k.envMap||Se),ke=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ne=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Fe=!!B.morphAttributes.position,ot=!!B.morphAttributes.normal,Bt=!!B.morphAttributes.color,pt=Zn;k.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(pt=y.toneMapping);let yn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,st=yn!==void 0?yn.length:0,Ge=De.get(k),qo=m.state.lights;if(j===!0&&(fe===!0||v!==M)){let $t=v===M&&k.id===Y;Oe.setState(k,v,$t)}let rt=!1;k.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==qo.state.version||Ge.outputColorSpace!==Ce||z.isBatchedMesh&&Ge.batching===!1||!z.isBatchedMesh&&Ge.batching===!0||z.isInstancedMesh&&Ge.instancing===!1||!z.isInstancedMesh&&Ge.instancing===!0||z.isSkinnedMesh&&Ge.skinning===!1||!z.isSkinnedMesh&&Ge.skinning===!0||z.isInstancedMesh&&Ge.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ge.instancingColor===!1&&z.instanceColor!==null||Ge.envMap!==Le||k.fog===!0&&Ge.fog!==pe||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==Oe.numPlanes||Ge.numIntersection!==Oe.numIntersection)||Ge.vertexAlphas!==ke||Ge.vertexTangents!==Ne||Ge.morphTargets!==Fe||Ge.morphNormals!==ot||Ge.morphColors!==Bt||Ge.toneMapping!==pt||Pe.isWebGL2===!0&&Ge.morphTargetsCount!==st)&&(rt=!0):(rt=!0,Ge.__version=k.version);let Qn=Ge.currentProgram;rt===!0&&(Qn=qs(k,D,z));let Sl=!1,ps=!1,Yo=!1,Mt=Qn.getUniforms(),ei=Ge.uniforms;if(ge.useProgram(Qn.program)&&(Sl=!0,ps=!0,Yo=!0),k.id!==Y&&(Y=k.id,ps=!0),Sl||M!==v){Mt.setValue(O,"projectionMatrix",v.projectionMatrix),Mt.setValue(O,"viewMatrix",v.matrixWorldInverse);let $t=Mt.map.cameraPosition;$t!==void 0&&$t.setValue(O,Ue.setFromMatrixPosition(v.matrixWorld)),Pe.logarithmicDepthBuffer&&Mt.setValue(O,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Mt.setValue(O,"isOrthographic",v.isOrthographicCamera===!0),M!==v&&(M=v,ps=!0,Yo=!0)}if(z.isSkinnedMesh){Mt.setOptional(O,z,"bindMatrix"),Mt.setOptional(O,z,"bindMatrixInverse");let $t=z.skeleton;$t&&(Pe.floatVertexTextures?($t.boneTexture===null&&$t.computeBoneTexture(),Mt.setValue(O,"boneTexture",$t.boneTexture,S)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}z.isBatchedMesh&&(Mt.setOptional(O,z,"batchingTexture"),Mt.setValue(O,"batchingTexture",z._matricesTexture,S));let $o=B.morphAttributes;if(($o.position!==void 0||$o.normal!==void 0||$o.color!==void 0&&Pe.isWebGL2===!0)&&w.update(z,B,Qn),(ps||Ge.receiveShadow!==z.receiveShadow)&&(Ge.receiveShadow=z.receiveShadow,Mt.setValue(O,"receiveShadow",z.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(ei.envMap.value=Le,ei.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),ps&&(Mt.setValue(O,"toneMappingExposure",y.toneMappingExposure),Ge.needsLights&&Zd(ei,Yo),pe&&k.fog===!0&&ue.refreshFogUniforms(ei,pe),ue.refreshMaterialUniforms(ei,k,X,G,ve),es.upload(O,vl(Ge),ei,S)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(es.upload(O,vl(Ge),ei,S),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Mt.setValue(O,"center",z.center),Mt.setValue(O,"modelViewMatrix",z.modelViewMatrix),Mt.setValue(O,"normalMatrix",z.normalMatrix),Mt.setValue(O,"modelMatrix",z.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let $t=k.uniformsGroups;for(let Zo=0,Jd=$t.length;Zo<Jd;Zo++)if(Pe.isWebGL2){let bl=$t[Zo];He.update(bl,Qn),He.bind(bl,Qn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Qn}function Zd(v,D){v.ambientLightColor.needsUpdate=D,v.lightProbe.needsUpdate=D,v.directionalLights.needsUpdate=D,v.directionalLightShadows.needsUpdate=D,v.pointLights.needsUpdate=D,v.pointLightShadows.needsUpdate=D,v.spotLights.needsUpdate=D,v.spotLightShadows.needsUpdate=D,v.rectAreaLights.needsUpdate=D,v.hemisphereLights.needsUpdate=D}function jd(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(v,D,B){De.get(v.texture).__webglTexture=D,De.get(v.depthTexture).__webglTexture=B;let k=De.get(v);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||Ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(v,D){let B=De.get(v);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(v,D=0,B=0){A=v,L=D,C=B;let k=!0,z=null,pe=!1,Se=!1;if(v){let Le=De.get(v);Le.__useDefaultFramebuffer!==void 0?(ge.bindFramebuffer(O.FRAMEBUFFER,null),k=!1):Le.__webglFramebuffer===void 0?S.setupRenderTarget(v):Le.__hasExternalTextures&&S.rebindTextures(v,De.get(v.texture).__webglTexture,De.get(v.depthTexture).__webglTexture);let ke=v.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Se=!0);let Ne=De.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ne[D])?z=Ne[D][B]:z=Ne[D],pe=!0):Pe.isWebGL2&&v.samples>0&&S.useMultisampledRTT(v)===!1?z=De.get(v).__webglMultisampledFramebuffer:Array.isArray(Ne)?z=Ne[B]:z=Ne,E.copy(v.viewport),V.copy(v.scissor),$=v.scissorTest}else E.copy(Q).multiplyScalar(X).floor(),V.copy(ne).multiplyScalar(X).floor(),$=de;if(ge.bindFramebuffer(O.FRAMEBUFFER,z)&&Pe.drawBuffers&&k&&ge.drawBuffers(v,z),ge.viewport(E),ge.scissor(V),ge.setScissorTest($),pe){let Le=De.get(v.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+D,Le.__webglTexture,B)}else if(Se){let Le=De.get(v.texture),ke=D||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Le.__webglTexture,B||0,ke)}Y=-1},this.readRenderTargetPixels=function(v,D,B,k,z,pe,Se){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=De.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Se!==void 0&&(Ce=Ce[Se]),Ce){ge.bindFramebuffer(O.FRAMEBUFFER,Ce);try{let Le=v.texture,ke=Le.format,Ne=Le.type;if(ke!==ln&&ie.convert(ke)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Fe=Ne===Ns&&(Ee.has("EXT_color_buffer_half_float")||Pe.isWebGL2&&Ee.has("EXT_color_buffer_float"));if(Ne!==jn&&ie.convert(Ne)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ne===Yn&&(Pe.isWebGL2||Ee.has("OES_texture_float")||Ee.has("WEBGL_color_buffer_float")))&&!Fe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=v.width-k&&B>=0&&B<=v.height-z&&O.readPixels(D,B,k,z,ie.convert(ke),ie.convert(Ne),pe)}finally{let Le=A!==null?De.get(A).__webglFramebuffer:null;ge.bindFramebuffer(O.FRAMEBUFFER,Le)}}},this.copyFramebufferToTexture=function(v,D,B=0){let k=Math.pow(2,-B),z=Math.floor(D.image.width*k),pe=Math.floor(D.image.height*k);S.setTexture2D(D,0),O.copyTexSubImage2D(O.TEXTURE_2D,B,0,0,v.x,v.y,z,pe),ge.unbindTexture()},this.copyTextureToTexture=function(v,D,B,k=0){let z=D.image.width,pe=D.image.height,Se=ie.convert(B.format),Ce=ie.convert(B.type);S.setTexture2D(B,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,B.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,B.unpackAlignment),D.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,k,v.x,v.y,z,pe,Se,Ce,D.image.data):D.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,k,v.x,v.y,D.mipmaps[0].width,D.mipmaps[0].height,Se,D.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,k,v.x,v.y,Se,Ce,D.image),k===0&&B.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),ge.unbindTexture()},this.copyTextureToTexture3D=function(v,D,B,k,z=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let pe=v.max.x-v.min.x+1,Se=v.max.y-v.min.y+1,Ce=v.max.z-v.min.z+1,Le=ie.convert(k.format),ke=ie.convert(k.type),Ne;if(k.isData3DTexture)S.setTexture3D(k,0),Ne=O.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)S.setTexture2DArray(k,0),Ne=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);let Fe=O.getParameter(O.UNPACK_ROW_LENGTH),ot=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Bt=O.getParameter(O.UNPACK_SKIP_PIXELS),pt=O.getParameter(O.UNPACK_SKIP_ROWS),yn=O.getParameter(O.UNPACK_SKIP_IMAGES),st=B.isCompressedTexture?B.mipmaps[z]:B.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,st.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,st.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,v.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,v.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,v.min.z),B.isDataTexture||B.isData3DTexture?O.texSubImage3D(Ne,z,D.x,D.y,D.z,pe,Se,Ce,Le,ke,st.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Ne,z,D.x,D.y,D.z,pe,Se,Ce,Le,st.data)):O.texSubImage3D(Ne,z,D.x,D.y,D.z,pe,Se,Ce,Le,ke,st),O.pixelStorei(O.UNPACK_ROW_LENGTH,Fe),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ot),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Bt),O.pixelStorei(O.UNPACK_SKIP_ROWS,pt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,yn),z===0&&k.generateMipmaps&&O.generateMipmap(Ne),ge.unbindTexture()},this.initTexture=function(v){v.isCubeTexture?S.setTextureCube(v,0):v.isData3DTexture?S.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?S.setTexture2DArray(v,0):S.setTexture2D(v,0),ge.unbindTexture()},this.resetState=function(){L=0,C=0,A=null,ge.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===Zc?"display-p3":"srgb",t.unpackColorSpace=Qe.workingColorSpace===Ao?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===vt?gi:bf}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===gi?vt:On}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Uc=class extends ks{};Uc.prototype.isWebGL1Renderer=!0;var yo=class extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},Dc=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=gc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Pt=new U,vo=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array),r=Ke(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Dt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Vs=class extends Jn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qi,Ts=new U,Yi=new U,$i=new U,Zi=new be,Rs=new be,Of=new lt,Yr=new U,Cs=new U,$r=new U,cf=new be,cc=new be,lf=new be,Mo=class extends wt{constructor(e=new Vs){if(super(),this.isSprite=!0,this.type="Sprite",qi===void 0){qi=new gn;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Dc(t,5);qi.setIndex([0,1,2,0,2,3]),qi.setAttribute("position",new vo(n,3,0,!1)),qi.setAttribute("uv",new vo(n,2,3,!1))}this.geometry=qi,this.material=e,this.center=new be(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Yi.setFromMatrixScale(this.matrixWorld),Of.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),$i.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Yi.multiplyScalar(-$i.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Zr(Yr.set(-.5,-.5,0),$i,a,Yi,s,r),Zr(Cs.set(.5,-.5,0),$i,a,Yi,s,r),Zr($r.set(.5,.5,0),$i,a,Yi,s,r),cf.set(0,0),cc.set(1,0),lf.set(1,1);let o=e.ray.intersectTriangle(Yr,Cs,$r,!1,Ts);if(o===null&&(Zr(Cs.set(-.5,.5,0),$i,a,Yi,s,r),cc.set(0,1),o=e.ray.intersectTriangle(Yr,$r,Cs,!1,Ts),o===null))return;let c=e.ray.origin.distanceTo(Ts);c<e.near||c>e.far||t.push({distance:c,point:Ts.clone(),uv:di.getInterpolation(Ts,Yr,Cs,$r,cf,cc,lf,new be),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Zr(i,e,t,n,s,r){Zi.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Rs.x=r*Zi.x-s*Zi.y,Rs.y=s*Zi.x+r*Zi.y):Rs.copy(Zi),i.copy(e),i.x+=Rs.x,i.y+=Rs.y,i.applyMatrix4(Of)}var So=class extends tn{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var yi=class extends Jn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ef,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function jr(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function gM(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var os=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Nc=class extends os{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xh,endingEnd:xh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case yh:r=e,o=2*t-n;break;case vh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case yh:a=e,c=2*n-t;break;case vh:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,b=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,y=(-1-d)*m+(1.5+d)*_+.5*g,T=d*m-d*_;for(let L=0;L!==o;++L)r[L]=p*a[u+L]+b*a[l+L]+y*a[c+L]+T*a[h+L];return r}},Oc=class extends os{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),h=1-u;for(let f=0;f!==o;++f)r[f]=a[l+f]*h+a[c+f]*u;return r}},Fc=class extends os{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},un=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=jr(t,this.TimeBufferType),this.values=jr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:jr(e.times,Array),values:jr(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Fc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Oc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Nc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Kr:t=this.InterpolantFactoryMethodDiscrete;break;case Qr:t=this.InterpolantFactoryMethodLinear;break;case Ba:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Kr;case this.InterpolantFactoryMethodLinear:return Qr;case this.InterpolantFactoryMethodSmooth:return Ba}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&gM(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ba,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{let h=o*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){let _=t[h+g];if(_!==t[f+g]||_!==t[d+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,f=a*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};un.prototype.TimeBufferType=Float32Array;un.prototype.ValueBufferType=Float32Array;un.prototype.DefaultInterpolation=Qr;var vi=class extends un{};vi.prototype.ValueTypeName="bool";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=Kr;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var zc=class extends un{};zc.prototype.ValueTypeName="color";var Bc=class extends un{};Bc.prototype.ValueTypeName="number";var kc=class extends os{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let u=l+o;l!==u;l+=4)zt.slerpFlat(r,0,a,l-o,a,l,c);return r}},Hs=class extends un{InterpolantFactoryMethodLinear(e){return new kc(this.times,this.values,this.getValueSize(),e)}};Hs.prototype.ValueTypeName="quaternion";Hs.prototype.DefaultInterpolation=Qr;Hs.prototype.InterpolantFactoryMethodSmooth=void 0;var Mi=class extends un{};Mi.prototype.ValueTypeName="string";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=Kr;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var Vc=class extends un{};Vc.prototype.ValueTypeName="vector";var Hc=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){let d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}},_M=new Hc,Gc=class{constructor(e){this.manager=e!==void 0?e:_M,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Gc.DEFAULT_MATERIAL_NAME="__DEFAULT";var bo=class extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Eo=class extends bo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},lc=new lt,uf=new U,hf=new U,Wc=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zs,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;uf.setFromMatrixPosition(e.matrixWorld),t.position.copy(uf),hf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hf),t.updateMatrixWorld(),lc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(lc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Xc=class extends Wc{constructor(){super(new go(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Gs=class extends bo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new Xc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Kc="\\[\\]\\.:\\/",xM=new RegExp("["+Kc+"]","g"),Qc="[^"+Kc+"]",yM="[^"+Kc.replace("\\.","")+"]",vM=/((?:WC+[\/:])*)/.source.replace("WC",Qc),MM=/(WCOD+)?/.source.replace("WCOD",yM),SM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Qc),bM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Qc),EM=new RegExp("^"+vM+MM+SM+bM+"$"),wM=["material","materials","bones","map"],qc=class{constructor(e,t,n){let s=n||it.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},it=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(xM,"")}static parseTrackName(e){let t=EM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);wM.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};it.Composite=qc;it.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};it.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};it.prototype.GetterByBindingType=[it.prototype._getValue_direct,it.prototype._getValue_array,it.prototype._getValue_arrayElement,it.prototype._getValue_toArray];it.prototype.SetterByBindingTypeAndVersioning=[[it.prototype._setValue_direct,it.prototype._setValue_direct_setNeedsUpdate,it.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[it.prototype._setValue_array,it.prototype._setValue_array_setNeedsUpdate,it.prototype._setValue_array_setMatrixWorldNeedsUpdate],[it.prototype._setValue_arrayElement,it.prototype._setValue_arrayElement_setNeedsUpdate,it.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[it.prototype._setValue_fromArray,it.prototype._setValue_fromArray_setNeedsUpdate,it.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Cb=new Float32Array(1);var as=class{constructor(e,t,n=0,s=1/0){this.ray=new ss(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Fs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Yc(e,this,n,t),n.sort(ff),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Yc(e[s],this,n,t);return n.sort(ff),n}};function ff(i,e){return i.distance-e.distance}function Yc(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){let s=i.children;for(let r=0,a=s.length;r<a;r++)Yc(s[r],e,t,!0)}}var Ws=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var AM=(i,e)=>({x:i.x-e.x,y:i.y-e.y,z:i.z-e.z}),Ro=(i,e)=>i.x*e.x+i.y*e.y+i.z*e.z,Ff=i=>Math.hypot(i.x,i.y,i.z),tl=(i,e)=>({x:i.x*e,y:i.y*e,z:i.z*e}),TM=(i,e)=>({x:i.y*e.z-i.z*e.y,y:i.z*e.x-i.x*e.z,z:i.x*e.y-i.y*e.x}),RM=i=>{let e=Ff(i)||1;return tl(i,1/e)};function zf({otraPegatina:i,mismaPegatina:e,pixeles:t}){return i?.05:e?null:t>=30?.35:null}function CM(i,e){let t=i.getRotationAxis(e.face);if(!t)return null;if(typeof t.axis=="string"){let n={x:t.axis==="x"?1:0,y:t.axis==="y"?1:0,z:t.axis==="z"?1:0},s=e.times===3?-1:e.times===2?2:1;return{vec:n,sign:Math.sign(t.sign*s)}}return{vec:{x:t.x,y:t.y,z:t.z},sign:Math.sign(e.times)}}function Bf(i,e,t,n){let s=[],r=Math.abs((i.getAnglePerMove?.()??0)-Math.PI)<1e-6;for(let a of i.getMoveNotation())for(let o of["","'"]){let c=a+o,l=i.parseMove(c);if(!l)continue;let u=i.pickLayerPieces(c);if(!u.includes(e))continue;let h=CM(i,l);if(!h)continue;let f=tl(TM(h.vec,t),h.sign);f=AM(f,tl(n,Ro(f,n))),!(Ff(f)<1e-9)&&s.push({move:c,dir:RM(f),size:u.length,simetrico:r,propio:!r&&Math.abs(Ro(h.vec,n))>.9})}return LM(PM(s))}function PM(i){let e=i.filter(t=>!t.propio);return e.length?e:i}function LM(i){return i.filter(e=>!i.some(t=>t!==e&&t.size<e.size&&Ro(t.dir,e.dir)>.999))}function kf(i,e,t=.35){let n=null,s=t;for(let r of i){let a=Ro(r.dir,e),o=r.simetrico?Math.abs(a):a;o>s&&(s=o,n=r)}return n}var IM=9,UM=18,DM=[[1,0],[-1,0],[0,1],[0,-1],[.7,.7],[-.7,.7],[.7,-.7],[-.7,-.7]],Co=class{constructor(e,t,n,s,r){this.renderer=e,this.getState=t,this.onMove=n,this.isBusy=s,this.onHover=r,this._dentro=!1,this._pendiente=!1,this.raycaster=new as,this.pointer=new be,this.arrastre=null,this._bind()}_bind(){this._onDown=e=>this._alPulsar(e),this._onMove=e=>this._alMover(e),this._onUp=e=>this._alSoltar(e),window.addEventListener("pointerdown",this._onDown,!0),window.addEventListener("pointermove",this._onMove,!0),window.addEventListener("pointerup",this._onUp,!0),window.addEventListener("pointercancel",this._onUp,!0)}dispose(){window.removeEventListener("pointerdown",this._onDown,!0),window.removeEventListener("pointermove",this._onMove,!0),window.removeEventListener("pointerup",this._onUp,!0),window.removeEventListener("pointercancel",this._onUp,!0),this._soltarCamara()}_agarre(e){let t={dentro:!1,pegatina:null},n=this.renderer.canvas.getBoundingClientRect();if(e.clientX<n.left||e.clientX>n.right||e.clientY<n.top||e.clientY>n.bottom)return t;let s=this._rayoConMargen(e,n);if(!s?.length)return t;let r=s.find(a=>a.object.userData.sticker)??null;return{dentro:!0,pegatina:r?.object??null,punto:r?this.renderer.puzzleGroup.worldToLocal(r.point.clone()):null}}_rayoConMargen(e,t){let n=e.pointerType==="touch"?UM:IM,s=[...this.renderer.pieceMeshes.values()];for(let[r,a]of[[0,0],...DM.map(([o,c])=>[o*n,c*n])]){this.pointer.x=(e.clientX+r-t.left)/t.width*2-1,this.pointer.y=-((e.clientY+a-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.renderer.camera);let o=this.raycaster.intersectObjects(s,!0);if(o.length)return o}return null}_alPulsar(e){if(this.arrastre){this.arrastre=null,this._soltarCamara();return}let{dentro:t,pegatina:n,punto:s}=this._agarre(e);if(!t)return;this.renderer.controls.enabled=!1,this._apagarBrillo();let r=n?this._normalLocal(n):null,a=n?.userData.sticker?.piece;this.arrastre={id:e.pointerId,x:e.clientX,y:e.clientY,ultimoX:e.clientX,ultimoY:e.clientY,tipo:e.pointerType,normal:r,pieza:a,pegatina:n,candidatos:a&&r&&!this.isBusy?.()?Bf(this.getState(),a,s,r):null,hecho:!1}}_vigilarPuntero(e){this._pendiente||(this._pendiente=!0,requestAnimationFrame(()=>{this._pendiente=!1;let t=this._agarre(e);if(this.arrastre){this._apagarBrillo(),this._quizaGirar(t);return}t.dentro!==this._dentro&&(this._dentro=t.dentro,this.onHover?.(t.dentro))}))}_apagarBrillo(){this._dentro&&(this._dentro=!1,this.onHover?.(!1))}_quizaGirar(e){let t=this.arrastre;if(!t||t.hecho||!t.candidatos?.length||this.isBusy?.())return;let n=t.ultimoX-t.x,s=t.ultimoY-t.y,r=zf({otraPegatina:!!e.pegatina&&e.pegatina!==t.pegatina,mismaPegatina:e.pegatina===t.pegatina,pixeles:Math.hypot(n,s)});if(r===null)return;let a=this._direccionEnLaCara(n,s,t.normal);if(!a)return;let o=kf(t.candidatos,a,r);o&&(t.hecho=!0,this.onMove(o.move))}_alMover(e){this._vigilarPuntero(e);let t=this.arrastre;!t||e.pointerId!==t.id||(t.ultimoX=e.clientX,t.ultimoY=e.clientY)}_alSoltar(e){this.arrastre&&e.pointerId!==this.arrastre.id||(this.arrastre=null,this._vigilarPuntero(e),this._soltarCamara())}_soltarCamara(){this.renderer.controls.enabled||setTimeout(()=>{this.renderer.controls.enabled=!0},0)}_direccionEnLaCara(e,t,n){let s=this.renderer.camera,r=this.renderer.puzzleGroup.getWorldQuaternion(new zt).invert(),a=new U(1,0,0).applyQuaternion(s.quaternion).applyQuaternion(r),o=new U(0,1,0).applyQuaternion(s.quaternion).applyQuaternion(r),c=a.multiplyScalar(e).addScaledVector(o,-t);return c.addScaledVector(n,-c.dot(n)),c.lengthSq()<1e-12?null:c.normalize()}_normalLocal(e){let t=this.renderer.puzzleGroup,n=e.userData.sticker?.poly;if(n){let s=n.vertices,r=new U;for(let l of s)r.add(new U(l.x,l.y,l.z));r.divideScalar(s.length);let a=new U(s[1].x-s[0].x,s[1].y-s[0].y,s[1].z-s[0].z),o=new U(s[2].x-s[0].x,s[2].y-s[0].y,s[2].z-s[0].z),c=a.cross(o).normalize();return c.dot(r)<0&&c.negate(),c}return e.getWorldDirection(new U).applyQuaternion(t.getWorldQuaternion(new zt).invert()).normalize()}};function NM(i,e){let t=i.parseMove?.(e)?.face??e,n=i.getRotationAxis?.(t);if(!n)return null;if(typeof n.axis=="string")return{x:+(n.axis==="x"),y:+(n.axis==="y"),z:+(n.axis==="z")};let s=Math.hypot(n.x,n.y,n.z);return s<1e-6?null:{x:n.x/s,y:n.y/s,z:n.z/s}}function Hf(i){let e=i.getPieces?.()??[];if(!e.length)return[];let t=[],n=new Map;for(let s of i.getMoveNotation()){let r=NM(i,s);if(!r)continue;let a;try{a=i.pickLayerPieces(s)}catch{continue}if(!a?.length||a.length===e.length)continue;let o=[1,-1].map(c=>({x:r.x*c,y:r.y*c,z:r.z*c})).map(c=>({dir:c,nivel:FM(a,e,c)})).filter(c=>c.nivel!==null).sort((c,l)=>c.nivel-l.nivel);for(let{dir:c,nivel:l}of o){let u=new Set(a),h=l,f=Vf(h,c);for(;n.has(f);){if(!OM(u,n.get(f))){f=null;break}f=Vf(++h,c)}if(!f)break;n.set(f,u),t.push({face:s,dir:c,nivel:h});break}}return t}var Vf=(i,e)=>[i,...[e.x,e.y,e.z].map(t=>t.toFixed(3))].join(",");function OM(i,e){if(i.size>=e.size)return!1;for(let t of i)if(!e.has(t))return!1;return!0}function FM(i,e,t){let n=a=>{let o=h=>a.x*h.position.x+a.y*h.position.y+a.z*h.position.z,c=h=>Number(h.toFixed(3)),l=[...new Set(e.map(h=>c(o(h))))].sort((h,f)=>f-h),u=c(Math.max(...i.map(o)));return l.findIndex(h=>Math.abs(h-u)<1e-6)},s=n(t),r=n({x:-t.x,y:-t.y,z:-t.z});return s===r?s>=1?Math.min(zM,s):null:s===0||s===1?s:null}var zM=2;function BM(i){let e=String(i).replace("#",""),t=e.length===3?e.split("").map(a=>a+a).join(""):e,[n,s,r]=[0,2,4].map(a=>parseInt(t.slice(a,a+2),16)/255);return .2126*n+.7152*s+.0722*r}function Gf(i){if(!i)return null;let e=[].concat(i).filter(Boolean);if(!e.length)return null;let n=e.reduce((s,r)=>s+BM(r),0)/e.length>.55;return{text:n?"#141821":"#ffffff",ring:n?"rgba(0, 0, 0, 0.38)":"rgba(255, 255, 255, 0.55)"}}var nl=i=>Math.hypot(i.x,i.y),Po=i=>typeof i=="number"?{xMin:-i,xMax:i,yMin:-i,yMax:i}:i.xMin!==void 0?i:{xMin:-i.x,xMax:i.x,yMin:-i.y,yMax:i.y},ls=(i,e,t)=>e>t?(e+t)/2:Math.max(e,Math.min(t,i));function Wf(i,e,t,n,s,r={x:0,y:1}){let a={x:i.x-e.x,y:i.y-e.y},o=nl(a);if(o<1e-4){let m=nl(r)||1;a={x:r.x/m,y:r.y/m},o=0}else a={x:a.x/o,y:a.y/o};let c=0;for(let m of t){let p=(m.x-e.x)*a.x+(m.y-e.y)*a.y;p>c&&(c=p)}let l=c+n+.06,u=o<l,h=u?l:o,f=e.x+a.x*h,d=e.y+a.y*h,g=Po(s),_=f<g.xMin||f>g.xMax||d<g.yMin||d>g.yMax;return _&&(f=ls(f,g.xMin,g.xMax),d=ls(d,g.yMin,g.yMax)),{x:f,y:d,pushed:u,clamped:_}}function kM(i,e,t,n,s,r){let a=Po(r),o=n;for(let[c,l,u,h,f]of[[i.x,e.x,t.x,a.xMin,a.xMax],[i.y,e.y,t.y,a.yMin,a.yMax]]){let d=Math.abs(u)*s,g=f-d,_=h+d;g<_||(l>1e-9?o=Math.min(o,(g-c)/l):l<-1e-9&&(o=Math.min(o,(_-c)/l)))}return Math.max(0,Math.min(n,o))}var VM=40;function Xf(i,e,t){let n=Po(e),s=2*t;for(let r=0;r<VM;r++){let a=!1;for(let o=0;o<i.length;o++)for(let c=o+1;c<i.length;c++){let l=i[o],u=i[c],h=u.x-l.x,f=u.y-l.y,d=Math.hypot(h,f);if(d>=s)continue;d<1e-6&&(h=1,f=0,d=1);let g=(s-d)/2/d;l.x-=h*g,l.y-=f*g,u.x+=h*g,u.y+=f*g,a=!0}if(!a)break;for(let o of i)o.x=ls(o.x,n.xMin,n.xMax),o.y=ls(o.y,n.yMin,n.yMax)}return i}function qf(i,e,t,n,s,r={x:0,y:1},a=0,o=1){if(!a)return Wf(i,e,t,n,s,r);let c=n*1.15,l=Wf(i,e,t,n+c*o,1/0,r),u=Po(s),h={x:l.x-e.x,y:l.y-e.y},f=nl(h)||1,d={x:h.x/f,y:h.y/f},g={x:-d.y,y:d.x},_=kM(e,d,g,f,c*o,u),m=e.x+d.x*_+g.x*a*c,p=e.y+d.y*_+g.y*a*c,b=m<u.xMin||m>u.xMax||p<u.yMin||p>u.yMax;return b&&(m=ls(m,u.xMin,u.xMax),p=ls(p,u.yMin,u.yMax)),{x:m,y:p,pushed:l.pushed,clamped:b}}var HM=[".topbar",".actions",".history-panel"];function Lo(i,e=HM){let t=i.getBoundingClientRect();if(!t.width||!t.height)return null;let n={left:t.left,right:t.right,top:t.top,bottom:t.bottom};for(let s of e){let r=document.querySelector(s);if(!r)continue;let a=r.getBoundingClientRect();if(!a.width||!a.height||a.right<=n.left||a.left>=n.right||a.bottom<=n.top||a.top>=n.bottom)continue;let o=n.right-n.left,c=n.bottom-n.top,l=[{lado:"top",valor:a.bottom,coste:(a.bottom-n.top)*o},{lado:"bottom",valor:a.top,coste:(n.bottom-a.top)*o},{lado:"left",valor:a.right,coste:(a.right-n.left)*c},{lado:"right",valor:a.left,coste:(n.right-a.left)*c}].sort((u,h)=>u.coste-h.coste)[0];n={...n,[l.lado]:l.valor}}return{...n,lienzo:t}}var Yf=i=>i.endsWith("2")?i:i.endsWith("'")?i.slice(0,-1):`${i}'`;var GM=.34,WM=2,$f=i=>1+(i??0)*WM,XM=.065,qM=18,YM=i=>XM*Math.min(1,Math.sqrt(qM/Math.max(1,i))),$M=.02,ZM=i=>i*.84,Zf=.28,jf=.18,jM=5,JM=16,KM=i=>i==="touch"?JM:jM,Jf=256,QM="rgba(26, 29, 36, 0.85)",eS="#e8ecf4",Kf="#f0b429",tS="#1a1d24",Io=class{constructor(e,t,n,s){this.renderer=e,this.onMove=t,this.isBusy=n,this.getState=s,this.group=new Yt,this.renderer.scene.add(this.group),this.labels=new Map,this.visible=!0,this._active=null,this._activeLabel=null,this._hovered=null,this._pending=null,this.raycaster=new as,this.pointer=new be,this._bindPointer()}dispose(){this._unbindPointer(),this.clear(),this.renderer.scene.remove(this.group)}_bindPointer(){let e=this.renderer.canvas;this._onMoveEv=t=>this._handleMove(t),this._onDownEv=t=>this._handleDown(t),this._onUpEv=t=>this._handleUp(t),this._onLeaveEv=()=>this._setHover(null),e.addEventListener("pointermove",this._onMoveEv),e.addEventListener("pointerleave",this._onLeaveEv),e.addEventListener("pointerdown",this._onDownEv),window.addEventListener("pointerup",this._onUpEv)}_unbindPointer(){let e=this.renderer.canvas;e.removeEventListener("pointermove",this._onMoveEv),e.removeEventListener("pointerleave",this._onLeaveEv),e.removeEventListener("pointerdown",this._onDownEv),window.removeEventListener("pointerup",this._onUpEv)}_pickMove(e){if(!this.visible||!this.labels.size)return null;let t=this.renderer.canvas.getBoundingClientRect();return this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.renderer.camera),this.group.updateMatrixWorld(!0),this.raycaster.intersectObjects(this.group.children,!1)[0]?.object?.userData?.move??null}_handleMove(e){if(this.isBusy?.()){this._setHover(null);return}this._setHover(this._pickMove(e))}_setHover(e){e!==this._hovered&&(this._hovered=e,this.announce(e,this.getState?.()),this.renderer.canvas.style.cursor=e?"pointer":"")}_handleDown(e){if(this._pending=null,this.isBusy?.())return;let t=this._pickMove(e);t&&(this._pending={move:t,x:e.clientX,y:e.clientY,pointerType:e.pointerType})}_handleUp(e){let t=this._pending;if(this._pending=null,!t||this.isBusy?.())return;let n=e.clientX-t.x,s=e.clientY-t.y;Math.hypot(n,s)>KM(t.pointerType)||this.onMove?.(t.move)}clear(){for(let{sprite:e,texture:t}of this.labels.values())this.group.remove(e),e.material.dispose(),t.dispose();this.labels.clear(),this._active=null,this._activeLabel=null,this._hovered=null,this._pending=null,this.renderer.canvas.style.cursor=""}setVisible(e){this.visible=e,this.group.visible=e}rebuild(e){if(this.clear(),!e)return;let t=new zn().setFromObject(this.renderer.puzzleGroup);if(t.isEmpty())return;let n=this.renderer.puzzleGroup.scale.x||1,s=t.getBoundingSphere(new _i).radius/n,r=this._corners(t).map(o=>o.divideScalar(n));this._hull=r;let a=Hf(e);this._masAncho=Math.max(1.5,...a.map(o=>$f(o.nivel)));for(let{face:o,dir:c,nivel:l}of a){let u=$f(l),h=Yf(o),f=[{move:o,lateral:-u}];h!==o&&e.parseMove?.(h)?f.push({move:h,lateral:+u}):f[0].lateral=0;let d=new U(c.x,c.y,c.z),_=Math.max(...r.map(p=>p.dot(d)))+s*GM,m=e.getFaceColour?.(o)??null;for(let{move:p,lateral:b}of f){let y=this._makeLabel(p,b,m);y.sprite.userData.hacia=d,y.sprite.userData.medida=_,y.sprite.userData.nivel=l,y.sprite.position.copy(d).multiplyScalar(_*n),this.group.add(y.sprite),this.labels.set(p,y)}}this._tamano=YM(this.labels.size),this._radio=ZM(this._tamano),this.group.visible=this.visible}announce(e,t){if(this._active&&this._active!==e&&this._restore(),!e){this._restore();return}let n=t?.parseMove?.(e)?.face,s=this.labels.get(e)??(n&&this.labels.get(n));s&&(this._draw(s,e,!0),this._active=e,this._activeLabel=s)}_restore(){let e=this._activeLabel;e&&this._draw(e,e.move,!1),this._active=null,this._activeLabel=null}_corners(e){let t=[];for(let n of[e.min.x,e.max.x])for(let s of[e.min.y,e.max.y])for(let r of[e.min.z,e.max.z])t.push(new U(n,s,r));return t}_colocar(e){if(!this.labels.size)return;let t=e.aspect||1,n=this.renderer.puzzleGroup.scale.x||1,s=(d,g)=>(g.copy(d).project(e),{x:g.x*t,y:g.y}),r=new U,a=s(new U(0,0,0),r),o=(this._hull??[]).map(d=>s(r.copy(d).multiplyScalar(n),r)),c=this._huecoLibre(t),l=[],u=new U;for(let d of this.labels.values()){let g=d.sprite,_=r.copy(g.userData.hacia).multiplyScalar(g.userData.medida*n);u.copy(_).project(e);let m=qf({x:u.x*t,y:u.y},a,o,this._radio,c,void 0,g.userData.lateral,this._masAncho??1);l.push({sprite:g,x:m.x,y:m.y,z:u.z})}Xf(l,c,this._radio);let h=r.copy(e.position).normalize(),f=2*Math.tan(e.fov*Math.PI/180/2);for(let d of l){u.set(d.x/t,d.y,d.z),d.sprite.position.copy(u.unproject(e));let g=e.position.distanceTo(d.sprite.position);d.sprite.scale.setScalar(g*f*this._tamano);let _=d.sprite.userData.hacia.dot(h),m=Math.max(0,Math.min(1,(_+jf)/(2*jf)));d.sprite.material.opacity=Zf+(1-Zf)*m}this.group.updateMatrixWorld(!0)}_huecoLibre(e){let t=this.renderer.hueco??Lo(this.renderer.canvas);if(!t)return{x:e,y:1};let n=t.lienzo,s=(c,l)=>({x:((c-n.left)/n.width*2-1)*e,y:-((l-n.top)/n.height*2-1)}),r=s(t.left,t.bottom),a=s(t.right,t.top),o=this._radio+$M;return{xMin:r.x+o,xMax:a.x-o,yMin:r.y+o,yMax:a.y-o}}_makeLabel(e,t=0,n=null){let s=document.createElement("canvas");s.width=s.height=Jf;let r=s.getContext("2d"),a=new So(s),o=new Mo(new Vs({map:a,transparent:!0,depthTest:!1,depthWrite:!1}));o.renderOrder=10,o.userData.move=e,o.userData.lateral=t,o.onBeforeRender=(l,u,h)=>{if(!h.isPerspectiveCamera)return;let f=l.info?.render?.frame??-1;f!==this._frame&&(this._frame=f,this._colocar(h))};let c={sprite:o,canvas:s,ctx:r,texture:a,move:e,ink:Gf(n),colour:n};return this._draw(c,e,!1),c}_draw(e,t,n){let{ctx:s,texture:r,ink:a}=e,o=Jf,c=o*.42;s.clearRect(0,0,o,o);let l=a?[].concat(e.colour):null;if(l){let u=Math.PI*2/l.length;l.forEach((h,f)=>{s.beginPath(),s.moveTo(o/2,o/2),s.arc(o/2,o/2,c,-Math.PI/2+f*u,-Math.PI/2+(f+1)*u),s.closePath(),s.fillStyle=h,s.fill()})}else s.beginPath(),s.arc(o/2,o/2,c,0,Math.PI*2),s.fillStyle=n?Kf:QM,s.fill();s.beginPath(),s.arc(o/2,o/2,c,0,Math.PI*2),s.lineWidth=o*(n?.085:.045),s.strokeStyle=n?a?"#ffffff":Kf:a?a.ring:"rgba(232, 236, 244, 0.55)",s.stroke(),s.fillStyle=a?a.text:n?tS:eS,s.font=`bold ${Math.round(o*(t.length>2?.32:.46))}px system-ui, sans-serif`,s.textAlign="center",s.textBaseline="middle",l?.length>1&&(s.lineWidth=o*.055,s.lineJoin="round",s.strokeStyle=a.text==="#ffffff"?"rgba(0, 0, 0, 0.6)":"rgba(255, 255, 255, 0.7)",s.strokeText(t,o/2,o/2+o*.02)),s.fillText(t,o/2,o/2+o*.02),r.needsUpdate=!0}};var Qf={type:"change"},il={type:"start"},ed={type:"end"},Uo=new ss,td=new an,nS=Math.cos(70*Af.DEG2RAD),Do=class extends mn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Si.ROTATE,MIDDLE:Si.DOLLY,RIGHT:Si.PAN},this.touches={ONE:bi.ROTATE,TWO:bi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(w){w.addEventListener("keydown",ee),this._domElementKeyEvents=w},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Qf),n.update(),r=s.NONE},this.update=(function(){let w=new U,Z=new zt().setFromUnitVectors(e.up,new U(0,1,0)),ce=Z.clone().invert(),ie=new U,ye=new zt,He=new U,Ye=2*Math.PI;return function(oe=null){let R=n.object.position;w.copy(R).sub(n.target),w.applyQuaternion(Z),o.setFromVector3(w),n.autoRotate&&r===s.NONE&&V(M(oe)),n.enableDamping?(o.theta+=c.theta*n.dampingFactor,o.phi+=c.phi*n.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let se=n.minAzimuthAngle,re=n.maxAzimuthAngle;isFinite(se)&&isFinite(re)&&(se<-Math.PI?se+=Ye:se>Math.PI&&(se-=Ye),re<-Math.PI?re+=Ye:re>Math.PI&&(re-=Ye),se<=re?o.theta=Math.max(se,Math.min(re,o.theta)):o.theta=o.theta>(se+re)/2?Math.max(se,o.theta):Math.min(re,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&C||n.object.isOrthographicCamera?o.radius=W(o.radius):o.radius=W(o.radius*l),w.setFromSpherical(o),w.applyQuaternion(ce),R.copy(n.target).add(w),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),u.set(0,0,0));let we=!1;if(n.zoomToCursor&&C){let Me=null;if(n.object.isPerspectiveCamera){let $e=w.length();Me=W($e*l);let je=$e-Me;n.object.position.addScaledVector(T,je),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let $e=new U(L.x,L.y,0);$e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),we=!0;let je=new U(L.x,L.y,0);je.unproject(n.object),n.object.position.sub(je).add($e),n.object.updateMatrixWorld(),Me=w.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Me!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Me).add(n.object.position):(Uo.origin.copy(n.object.position),Uo.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Uo.direction))<nS?e.lookAt(n.target):(td.setFromNormalAndCoplanarPoint(n.object.up,n.target),Uo.intersectPlane(td,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),we=!0);return l=1,C=!1,we||ie.distanceToSquared(n.object.position)>a||8*(1-ye.dot(n.object.quaternion))>a||He.distanceToSquared(n.target)>0?(n.dispatchEvent(Qf),ie.copy(n.object.position),ye.copy(n.object.quaternion),He.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",me),n.domElement.removeEventListener("pointerdown",De),n.domElement.removeEventListener("pointercancel",x),n.domElement.removeEventListener("wheel",K),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",x),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",ee),n._domElementKeyEvents=null)};let n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=s.NONE,a=1e-6,o=new Ws,c=new Ws,l=1,u=new U,h=new be,f=new be,d=new be,g=new be,_=new be,m=new be,p=new be,b=new be,y=new be,T=new U,L=new be,C=!1,A=[],Y={};function M(w){return w!==null?2*Math.PI/60*n.autoRotateSpeed*w:2*Math.PI/60/60*n.autoRotateSpeed}function E(w){let Z=Math.abs(w)/(100*(window.devicePixelRatio|0));return Math.pow(.95,n.zoomSpeed*Z)}function V(w){c.theta-=w}function $(w){c.phi-=w}let ae=(function(){let w=new U;return function(ce,ie){w.setFromMatrixColumn(ie,0),w.multiplyScalar(-ce),u.add(w)}})(),I=(function(){let w=new U;return function(ce,ie){n.screenSpacePanning===!0?w.setFromMatrixColumn(ie,1):(w.setFromMatrixColumn(ie,0),w.crossVectors(n.object.up,w)),w.multiplyScalar(ce),u.add(w)}})(),N=(function(){let w=new U;return function(ce,ie){let ye=n.domElement;if(n.object.isPerspectiveCamera){let He=n.object.position;w.copy(He).sub(n.target);let Ye=w.length();Ye*=Math.tan(n.object.fov/2*Math.PI/180),ae(2*ce*Ye/ye.clientHeight,n.object.matrix),I(2*ie*Ye/ye.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(ae(ce*(n.object.right-n.object.left)/n.object.zoom/ye.clientWidth,n.object.matrix),I(ie*(n.object.top-n.object.bottom)/n.object.zoom/ye.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function G(w){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=w:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function X(w){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=w:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function q(w,Z){if(!n.zoomToCursor)return;C=!0;let ce=n.domElement.getBoundingClientRect(),ie=w-ce.left,ye=Z-ce.top,He=ce.width,Ye=ce.height;L.x=ie/He*2-1,L.y=-(ye/Ye)*2+1,T.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function W(w){return Math.max(n.minDistance,Math.min(n.maxDistance,w))}function Q(w){h.set(w.clientX,w.clientY)}function ne(w){q(w.clientX,w.clientX),p.set(w.clientX,w.clientY)}function de(w){g.set(w.clientX,w.clientY)}function H(w){f.set(w.clientX,w.clientY),d.subVectors(f,h).multiplyScalar(n.rotateSpeed);let Z=n.domElement;V(2*Math.PI*d.x/Z.clientHeight),$(2*Math.PI*d.y/Z.clientHeight),h.copy(f),n.update()}function j(w){b.set(w.clientX,w.clientY),y.subVectors(b,p),y.y>0?G(E(y.y)):y.y<0&&X(E(y.y)),p.copy(b),n.update()}function fe(w){_.set(w.clientX,w.clientY),m.subVectors(_,g).multiplyScalar(n.panSpeed),N(m.x,m.y),g.copy(_),n.update()}function ve(w){q(w.clientX,w.clientY),w.deltaY<0?X(E(w.deltaY)):w.deltaY>0&&G(E(w.deltaY)),n.update()}function xe(w){let Z=!1;switch(w.code){case n.keys.UP:w.ctrlKey||w.metaKey||w.shiftKey?$(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(0,n.keyPanSpeed),Z=!0;break;case n.keys.BOTTOM:w.ctrlKey||w.metaKey||w.shiftKey?$(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(0,-n.keyPanSpeed),Z=!0;break;case n.keys.LEFT:w.ctrlKey||w.metaKey||w.shiftKey?V(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(n.keyPanSpeed,0),Z=!0;break;case n.keys.RIGHT:w.ctrlKey||w.metaKey||w.shiftKey?V(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(-n.keyPanSpeed,0),Z=!0;break}Z&&(w.preventDefault(),n.update())}function Ie(w){if(A.length===1)h.set(w.pageX,w.pageY);else{let Z=qe(w),ce=.5*(w.pageX+Z.x),ie=.5*(w.pageY+Z.y);h.set(ce,ie)}}function Ue(w){if(A.length===1)g.set(w.pageX,w.pageY);else{let Z=qe(w),ce=.5*(w.pageX+Z.x),ie=.5*(w.pageY+Z.y);g.set(ce,ie)}}function Te(w){let Z=qe(w),ce=w.pageX-Z.x,ie=w.pageY-Z.y,ye=Math.sqrt(ce*ce+ie*ie);p.set(0,ye)}function Xe(w){n.enableZoom&&Te(w),n.enablePan&&Ue(w)}function O(w){n.enableZoom&&Te(w),n.enableRotate&&Ie(w)}function ft(w){if(A.length==1)f.set(w.pageX,w.pageY);else{let ce=qe(w),ie=.5*(w.pageX+ce.x),ye=.5*(w.pageY+ce.y);f.set(ie,ye)}d.subVectors(f,h).multiplyScalar(n.rotateSpeed);let Z=n.domElement;V(2*Math.PI*d.x/Z.clientHeight),$(2*Math.PI*d.y/Z.clientHeight),h.copy(f)}function Ee(w){if(A.length===1)_.set(w.pageX,w.pageY);else{let Z=qe(w),ce=.5*(w.pageX+Z.x),ie=.5*(w.pageY+Z.y);_.set(ce,ie)}m.subVectors(_,g).multiplyScalar(n.panSpeed),N(m.x,m.y),g.copy(_)}function Pe(w){let Z=qe(w),ce=w.pageX-Z.x,ie=w.pageY-Z.y,ye=Math.sqrt(ce*ce+ie*ie);b.set(0,ye),y.set(0,Math.pow(b.y/p.y,n.zoomSpeed)),G(y.y),p.copy(b);let He=(w.pageX+Z.x)*.5,Ye=(w.pageY+Z.y)*.5;q(He,Ye)}function ge(w){n.enableZoom&&Pe(w),n.enablePan&&Ee(w)}function tt(w){n.enableZoom&&Pe(w),n.enableRotate&&ft(w)}function De(w){n.enabled!==!1&&(A.length===0&&(n.domElement.setPointerCapture(w.pointerId),n.domElement.addEventListener("pointermove",S),n.domElement.addEventListener("pointerup",x)),Re(w),w.pointerType==="touch"?_e(w):F(w))}function S(w){n.enabled!==!1&&(w.pointerType==="touch"?ue(w):te(w))}function x(w){Oe(w),A.length===0&&(n.domElement.releasePointerCapture(w.pointerId),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",x)),n.dispatchEvent(ed),r=s.NONE}function F(w){let Z;switch(w.button){case 0:Z=n.mouseButtons.LEFT;break;case 1:Z=n.mouseButtons.MIDDLE;break;case 2:Z=n.mouseButtons.RIGHT;break;default:Z=-1}switch(Z){case Si.DOLLY:if(n.enableZoom===!1)return;ne(w),r=s.DOLLY;break;case Si.ROTATE:if(w.ctrlKey||w.metaKey||w.shiftKey){if(n.enablePan===!1)return;de(w),r=s.PAN}else{if(n.enableRotate===!1)return;Q(w),r=s.ROTATE}break;case Si.PAN:if(w.ctrlKey||w.metaKey||w.shiftKey){if(n.enableRotate===!1)return;Q(w),r=s.ROTATE}else{if(n.enablePan===!1)return;de(w),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(il)}function te(w){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;H(w);break;case s.DOLLY:if(n.enableZoom===!1)return;j(w);break;case s.PAN:if(n.enablePan===!1)return;fe(w);break}}function K(w){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(w.preventDefault(),n.dispatchEvent(il),ve(w),n.dispatchEvent(ed))}function ee(w){n.enabled===!1||n.enablePan===!1||xe(w)}function _e(w){switch(J(w),A.length){case 1:switch(n.touches.ONE){case bi.ROTATE:if(n.enableRotate===!1)return;Ie(w),r=s.TOUCH_ROTATE;break;case bi.PAN:if(n.enablePan===!1)return;Ue(w),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case bi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Xe(w),r=s.TOUCH_DOLLY_PAN;break;case bi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;O(w),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(il)}function ue(w){switch(J(w),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;ft(w),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;Ee(w),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ge(w),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;tt(w),n.update();break;default:r=s.NONE}}function me(w){n.enabled!==!1&&w.preventDefault()}function Re(w){A.push(w.pointerId)}function Oe(w){delete Y[w.pointerId];for(let Z=0;Z<A.length;Z++)if(A[Z]==w.pointerId){A.splice(Z,1);return}}function J(w){let Z=Y[w.pointerId];Z===void 0&&(Z=new be,Y[w.pointerId]=Z),Z.set(w.pageX,w.pageY)}function qe(w){let Z=w.pointerId===A[0]?A[1]:A[0];return Y[Z]}n.domElement.addEventListener("contextmenu",me),n.domElement.addEventListener("pointerdown",De),n.domElement.addEventListener("pointercancel",x),n.domElement.addEventListener("wheel",K,{passive:!1}),this.update()}};var sl=.95,nd=.85,us=.478,rl=1,iS=240,sS={[Ae.PX]:{pos:[us,0,0],rot:[0,Math.PI/2,0]},[Ae.NX]:{pos:[-us,0,0],rot:[0,-Math.PI/2,0]},[Ae.PY]:{pos:[0,us,0],rot:[-Math.PI/2,0,0]},[Ae.NY]:{pos:[0,-us,0],rot:[Math.PI/2,0,0]},[Ae.PZ]:{pos:[0,0,us],rot:[0,0,0]},[Ae.NZ]:{pos:[0,0,-us],rot:[0,Math.PI,0]}},rS=3752527,oS=.5,aS=320,cS=320,lS=260,ol=i=>i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2,No=class{constructor(e,{onFirstFrame:t}={}){this.canvas=e,this.onFirstFrame=t,this._initScene(),this._initLights(),this._initControls(),this._initResize(),this._isAnimating=!1,this._animationQueue=[],this.pieceMeshes=new Map,this.stickerMeshes=[],this.bodyMaterials=[],this._glow=!1,this.puzzleGroup=new Yt,this.scene.add(this.puzzleGroup),this._stateType=null,this._startRenderLoop()}_initScene(){this.scene=new yo,this.scene.background=new Ve(1711396);let e=this.canvas.clientWidth/this.canvas.clientHeight;this.camera=new Ut(45,e||1,.1,100),this.camera.position.set(5,4.5,6.5),this.camera.lookAt(0,0,0),this.renderer=new ks({canvas:this.canvas,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(this.canvas.clientWidth,this.canvas.clientHeight,!1)}_fitFactor(){let e=this.camera.aspect||1;return e>=1?1:Math.min(1.4,1/Math.sqrt(Math.max(e,.45)))}_placeCamera(e,t,n){let s=this._fitFactor();this.camera.position.set(e*s,t*s,n*s),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update()}_initLights(){let e=new Eo(16777215,2105392,.85);this.scene.add(e);let t=new Gs(16777215,.9);t.position.set(5,8,6),this.scene.add(t);let n=new Gs(10531071,.35);n.position.set(-6,-3,-4),this.scene.add(n)}_initControls(){this.controls=new Do(this.camera,this.canvas),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.minDistance=4,this.controls.maxDistance=20,this.controls.enablePan=!1}_initResize(){this._onResize=()=>this._handleResize(),window.addEventListener("resize",this._onResize)}_handleResize(){let e=this.canvas.clientWidth,t=this.canvas.clientHeight;e===0||t===0||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1))}_encuadrar(){if(this.hueco=Lo(this.canvas),!this.hueco)return;let{lienzo:e}=this.hueco,t=(e.top+e.bottom)/2-(this.hueco.top+this.hueco.bottom)/2,n=this._subida??t;if(this._subida=Math.abs(t-n)<.5?t:n+(t-n)*.18,Math.abs(this._subida)<.5){this.camera.view?.enabled&&this.camera.clearViewOffset();return}this.camera.setViewOffset(e.width,e.height,0,this._subida,e.width,e.height)}_startRenderLoop(){let e=()=>{this.controls.update(),this._encuadrar(),this.renderer.render(this.scene,this.camera),this._firstFrameDone||(this._firstFrameDone=!0,this.onFirstFrame?.()),this._rafId=requestAnimationFrame(e)};e()}pauseLoop(){this._rafId!=null&&(cancelAnimationFrame(this._rafId),this._rafId=null)}resumeLoop(){this._rafId==null&&this._startRenderLoop()}dispose(){cancelAnimationFrame(this._rafId),window.removeEventListener("resize",this._onResize),this.controls.dispose(),this.renderer.dispose()}setEdgeGlow(e){let t=!!e;if(t!==this._glow){this._glow=t;for(let n of this.bodyMaterials)n.emissive.set(t?rS:0),n.emissiveIntensity=t?oS:0,n.needsUpdate=!0}}rebuild(e){let t=this._stateType;for(let s of this.pieceMeshes.values())this.puzzleGroup.remove(s),this._disposeMesh(s);this.pieceMeshes.clear(),this.stickerMeshes.length=0,this.bodyMaterials.length=0,this._stateType=e.getType(),this.puzzleGroup.position.set(0,0,0);let n=this._glow;if(this._glow=!1,this.puzzleGroup.rotation.set(0,0,0),this._stateType==="cube"){let s=e.n===2?2:e.n===3?1:3/e.n;this._setBaseScale(s),this._buildCubeMeshes(e),t!=="cube"&&this._placeCamera(5,4.5,6.5)}else if(this._stateType==="pyraminx")this._setBaseScale(2.5),this._buildFacetedMeshes(e),t!=="pyraminx"&&this._placeCamera(1.2,1.8,7);else if(this._stateType.startsWith("cuboid")){let s=e.getBoundingRadius?.()??1.5;this._setBaseScale(2/s),this._buildFacetedMeshes(e),t?.startsWith("cuboid")||this._placeCamera(4.6,5.6,6.4)}else this._stateType==="megaminx"&&(this._setBaseScale(2.6),this._buildFacetedMeshes(e),t!=="megaminx"&&this._placeCamera(.6,3.4,8));this.setEdgeGlow(n)}_setBaseScale(e){this._baseScale=e,this.puzzleGroup.scale.setScalar(e*(this._sitio??1))}setRoomScale(e,{ms:t=aS}={}){let n=this._sitio??1;if(Math.abs(n-e)<1e-4)return;if(cancelAnimationFrame(this._zoomRaf),!t){this._sitio=e,this._setBaseScale(this._baseScale??1);return}let s=performance.now(),r=a=>{let o=Math.min(1,(a-s)/t);this._sitio=n+(e-n)*ol(o),this._setBaseScale(this._baseScale??1),o<1&&(this._zoomRaf=requestAnimationFrame(r))};this._zoomRaf=requestAnimationFrame(r)}_buildCubeMeshes(e){for(let t of e.cubies){let n=this._createCubieMesh(t);this.pieceMeshes.set(t,n),this.puzzleGroup.add(n)}}_createCubieMesh(e){let t=new Yt;t.position.set(e.position.x*rl,e.position.y*rl,e.position.z*rl);let n=new xi(sl,sl,sl),s=new yi({color:657930,roughness:.55,metalness:.15}),r=new Ot(n,s);this.bodyMaterials.push(s),t.add(r);let a=new Bs(nd,nd);for(let o of Object.keys(e.faces)){let c=e.faces[o];if(!c)continue;let l=sS[o],u=new yi({color:new Ve(c),roughness:.4,metalness:0,side:en}),h=new Ot(a,u);h.position.set(...l.pos),h.rotation.set(...l.rot),h.userData.sticker={piece:e,faceKey:o},this.stickerMeshes.push(h),t.add(h)}return t.userData.piece=e,t}_buildFacetedMeshes(e){for(let t of e.pieces){let n=this._createFacetedPieceMesh(t);this.pieceMeshes.set(t,n),this.puzzleGroup.add(n)}}_createFacetedPieceMesh(e,t=.88){let n=new Yt;for(let s of e.stickers){let r=s.vertices,a=0,o=0,c=0;for(let X of r)a+=X.x,o+=X.y,c+=X.z;a/=r.length,o/=r.length,c/=r.length;let[l,u,h]=r,f=u.x-l.x,d=u.y-l.y,g=u.z-l.z,_=h.x-l.x,m=h.y-l.y,p=h.z-l.z,b=d*p-g*m,y=g*_-f*p,T=f*m-d*_,L=r,C=b,A=y,Y=T;b*a+y*o+T*c<0&&(L=[...r].reverse(),C=-b,A=-y,Y=-T);let M=Math.sqrt(C*C+A*A+Y*Y)||1,E=.004,V=C/M*E,$=A/M*E,ae=Y/M*E,I=new yi({color:658448,roughness:.55,metalness:.15,side:en});this.bodyMaterials.push(I),this._addPolygon(n,L.map(X=>({x:X.x+V*.3,y:X.y+$*.3,z:X.z+ae*.3})),I);let N=t,G=this._addPolygon(n,L.map(X=>({x:a+(X.x-a)*N+V,y:o+(X.y-o)*N+$,z:c+(X.z-c)*N+ae})),new yi({color:new Ve(s.color),roughness:.25,metalness:0,side:en}));G.userData.sticker={piece:e,face:s.face,poly:s},this.stickerMeshes.push(G)}return n.userData.piece=e,n}_addPolygon(e,t,n){let s=t.length-2,r=new Float32Array(s*9);for(let c=0;c<s;c++){let l=t[0],u=t[c+1],h=t[c+2];r.set([l.x,l.y,l.z,u.x,u.y,u.z,h.x,h.y,h.z],c*9)}let a=new gn;a.setAttribute("position",new Dt(r,3)),a.computeVertexNormals();let o=new Ot(a,n);return e.add(o),o}_disposeMesh(e){e.traverse(t=>{t.isMesh&&(t.geometry?.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material?.dispose())})}animateMove(e){return new Promise(t=>{this._animationQueue.push({spec:e,resolve:t}),this._processQueue()})}async _processQueue(){if(this._isAnimating||this._animationQueue.length===0)return;let{spec:e,resolve:t}=this._animationQueue.shift();this._isAnimating=!0;try{await this._runMoveAnimation(e)}finally{this._isAnimating=!1,t(),this._animationQueue.length>0&&this._processQueue()}}async _runMoveAnimation(e){let{pieces:t,axis:n,angle:s,state:r}=e;if(!t||t.length===0){r&&this.rebuild(r);return}let a=new Yt;this.puzzleGroup.add(a);let o=[];for(let l of t){let u=this.pieceMeshes.get(l);u&&(a.attach(u),o.push(u))}let c=e.duration??{pyraminx:cS,megaminx:lS}[this._stateType]??iS;if(typeof n=="string")await this._tweenRotation(a,n,s,c);else{let l=new U(n.x,n.y,n.z).normalize();await this._tweenQuaternionRotation(a,l,s,c)}for(let l of o)this.puzzleGroup.attach(l);this.puzzleGroup.remove(a),r&&this.rebuild(r)}_tweenRotation(e,t,n,s){return new Promise(r=>{let a=performance.now(),o=()=>{let c=Math.min((performance.now()-a)/s,1),l=ol(c)*n;e.rotation[t]=l,c<1?requestAnimationFrame(o):(e.rotation[t]=n,r())};requestAnimationFrame(o)})}_tweenQuaternionRotation(e,t,n,s){return new Promise(r=>{let a=performance.now(),o=()=>{let c=Math.min((performance.now()-a)/s,1),l=ol(c)*n;e.quaternion.setFromAxisAngle(t,l),c<1?requestAnimationFrame(o):(e.quaternion.setFromAxisAngle(t,n),r())};requestAnimationFrame(o)})}};var Oo=class{constructor(){this.moves=[],this.cursor=0,this._listeners=[]}subscribe(e){this._listeners.push(e);try{e(this.snapshot())}catch(t){console.error(t)}return()=>{this._listeners=this._listeners.filter(t=>t!==e)}}_emit(){let e=this.snapshot();for(let t of this._listeners)try{t(e)}catch(n){console.error(n)}}snapshot(){return{moves:[...this.moves],cursor:this.cursor,canUndo:this.canUndo(),canRedo:this.canRedo()}}addMove(e){typeof e!="string"||!e||(this.cursor<this.moves.length&&(this.moves=this.moves.slice(0,this.cursor)),this.moves.push(e),this.cursor=this.moves.length,this._emit())}queueMoves(e){if(!Array.isArray(e))return 0;let t=e.filter(n=>typeof n=="string"&&n);return t.length?(this.moves=this.moves.slice(0,this.cursor).concat(t),this._emit(),t.length):0}undo(){return this.canUndo()?(this.cursor--,this._emit(),1):0}redo(){return this.canRedo()?(this.cursor++,this._emit(),1):0}goToIndex(e){let t=Math.max(0,Math.min(this.moves.length,e|0)),n=t-this.cursor;return this.cursor=t,this._emit(),n}clear(){this.moves=[],this.cursor=0,this._emit()}canUndo(){return this.cursor>0}canRedo(){return this.cursor<this.moves.length}getCursor(){return this.cursor}getMoves(){return[...this.moves]}getMovesUpToCursor(){return this.moves.slice(0,this.cursor)}length(){return this.moves.length}};function _n(){let i=globalThis.ytgame;return i&&i.IN_PLAYABLES_ENV?i:null}var id=()=>_n()!==null;function sd(){_n()?.game.firstFrameReady()}function rd(){_n()?.game.gameReady()}var od=()=>{};function ad(i){return _n()?.system.onPause(i)??od}function cd(i){return _n()?.system.onResume(i)??od}async function ld(i){let e=_n();if(!e)return!1;try{return await e.game.saveData(i),!0}catch(t){return uS(`saveData: ${t?.errorType??"UNKNOWN"}`),!1}}async function ud(){let i=_n();if(!i)return null;try{return await i.game.loadData()??null}catch(e){return e?.errorType&&e.errorType!=="API_UNAVAILABLE"&&Fo(`loadData: ${e.errorType}`),null}}async function al(i){let e=_n();if(!e||!Number.isSafeInteger(i)||i<0)return!1;try{return await e.engagement.sendScore({value:i}),!0}catch(t){return Fo(`sendScore: ${t?.errorType??"UNKNOWN"}`),!1}}function uS(i){_n()?.health?.logError?.(i)}function Fo(i){_n()?.health?.logWarning?.(i)}var Kn=()=>globalThis.bridge??null,fd=()=>Kn()!==null,dd="twistlab_session",cl=!1;async function pd({espera:i=8e3}={}){let e=Kn();return e?.initialize?(await Promise.race([e.initialize().catch(t=>{console.warn("[playgama] initialize fall\xF3:",t?.message??t)}),new Promise(t=>setTimeout(t,i))]),cl=!!Kn()?.platform,cl||console.warn("[playgama] el Bridge no lleg\xF3 a estar listo"),cl):!1}var zo=()=>Kn()?.platform??null;function md(){let i=zo();if(!i?.sendMessage)return console.warn("[playgama] no se pudo avisar de game_ready: el Bridge no est\xE1 listo"),!1;try{return i.sendMessage("game_ready"),!0}catch(e){return console.warn("[playgama] game_ready fall\xF3:",e?.message??e),!1}}var hd=()=>{};function gd(){return zo()?.isAudioEnabled??!0}function _d(i,e){let t=zo(),n=Kn()?.EVENT_NAME?.[i];if(!t?.on||!n)return hd;try{t.on(n,e)}catch(s){console.warn(`[playgama] no se pudo escuchar ${i}:`,s?.message??s)}return hd}var xd=i=>_d("PAUSE_STATE_CHANGED",i),yd=i=>_d("AUDIO_STATE_CHANGED",i);async function vd(i){let e=Kn();if(!e?.storage?.set)return!1;try{return await e.storage.set([dd],[i]),!0}catch(t){return console.warn("[playgama] storage.set fall\xF3:",t?.message??t),!1}}var fS="level_completed";function ll(i=fS){let e=Kn()?.advertisement;if(!e?.showInterstitial||e.isInterstitialSupported===!1)return!1;try{return e.showInterstitial(i),!0}catch(t){return console.warn("[playgama] showInterstitial fall\xF3:",t?.message??t),!1}}function Md(){let i=zo();if(!i?.sendMessage)return!1;try{return i.sendMessage("level_completed"),!0}catch(e){return console.warn("[playgama] level_completed fall\xF3:",e?.message??e),!1}}async function Sd(){let i=Kn();if(!i?.storage?.get)return null;try{return(await i.storage.get([dd]))?.[0]??null}catch(e){return console.warn("[playgama] storage.get fall\xF3:",e?.message??e),null}}var pS=Object.freeze({cube2:1,cube3:3,cube4:6,cube5:10,pyraminx:2,megaminx:12,cuboid221:1,cuboid331:1}),bd=Object.freeze({cube2:{segundos:30,movimientos:25},cube3:{segundos:90,movimientos:100},cube4:{segundos:300,movimientos:300},cube5:{segundos:600,movimientos:500},pyraminx:{segundos:40,movimientos:30},megaminx:{segundos:600,movimientos:400},cuboid221:{segundos:20,movimientos:12},cuboid331:{segundos:30,movimientos:20}}),mS=i=>bd[i]??bd.cube3,Bo=5,ul=12,Ed=2,wd=()=>({total:0,sesion:{},enCurso:null}),gS=(i,e)=>{var t;return(t=i.sesion)[e]??(t[e]={tiempos:[],movimientos:[]})};function Ad(i,e){return i.enCurso={puzzle:e,desde:null,movimientos:0},i}function Vo(i){return i.enCurso=null,i}function Td(i,e){var t;return i.enCurso?((t=i.enCurso).desde??(t.desde=e),++i.enCurso.movimientos):0}function Rd(i,e){return i.enCurso?.desde?Math.max(0,e-i.enCurso.desde):0}function Cd(i,e){let t=i.enCurso;if(!t)return null;i.enCurso=null;let n=t.desde?Math.max(0,e-t.desde):0,s=t.movimientos,r=t.puzzle,a=gS(i,r);a.tiempos.push(n),a.movimientos.push(s),a.tiempos.length>ul&&(a.tiempos.shift(),a.movimientos.shift());let o=xS(r,n,s);return i.total+=o,{ms:n,movimientos:s,puntos:o,mejorTiempo:n===ko(a.tiempos),mejorMovimientos:s===ko(a.movimientos),...hl(i,r)}}var ko=i=>i?.length?Math.min(...i):null;function _S(i){if(!i||i.length<Bo)return null;let t=i.slice(-Bo).sort((n,s)=>n-s).slice(1,-1);return Math.round(t.reduce((n,s)=>n+s,0)/t.length)}function hl(i,e){let t=i.sesion[e];return t?.tiempos.length?{intentos:t.tiempos.length,mejorMs:ko(t.tiempos),media5Ms:_S(t.tiempos),mejorMovs:ko(t.movimientos)}:{intentos:0,mejorMs:null,media5Ms:null,mejorMovs:null}}function xS(i,e,t){let n=mS(i),s=(pS[i]??1)*50,r=Math.max(.5,e/1e3),a=Math.max(1,t),o=Math.min(Ed,n.segundos/r),c=Math.min(Ed,n.movimientos/a);return Math.max(Math.round(s*.1),Math.round(s*(o+c)/2))}function fl(i,e){let t={};if(!i||typeof i!="object")return t;let n=s=>Array.isArray(s)&&s.every(r=>Number.isSafeInteger(r)&&r>=0);for(let[s,r]of Object.entries(i)){if(e&&!e.includes(s))continue;let{tiempos:a,movimientos:o}=r??{};!n(a)||!n(o)||!a.length||a.length!==o.length||(t[s]={tiempos:a.slice(-ul),movimientos:o.slice(-ul)})}return t}var hs=i=>i==null?"\u2014":`${(i/1e3).toFixed(2)}s`;var Ho=Object.freeze(["cube2","cube3","cube4","cube5","pyraminx","megaminx","cuboid221","cuboid331"]),vS=4,MS=[1,2,3,4],Pd=4e3;function Ld({puzzle:i,moves:e,score:t=0,session:n={}}){if(!Ho.includes(i))return null;let s=Array.isArray(e)?e.filter(a=>typeof a=="string"&&a):[];if(s.length>Pd)return null;let r=Number.isSafeInteger(t)&&t>=0?t:0;return JSON.stringify({v:vS,p:i,m:s,s:r,t:fl(n,Ho)})}function Id(i){if(typeof i!="string"||!i)return null;let e;try{e=JSON.parse(i)}catch{return null}if(!e||typeof e!="object"||!MS.includes(e.v)||!Ho.includes(e.p)||!Array.isArray(e.m)||e.m.length>Pd||!e.m.every(n=>typeof n=="string"&&n))return null;let t=Number.isSafeInteger(e.s)&&e.s>=0?e.s:0;return{puzzle:e.p,moves:e.m,score:t,session:fl(e.t,Ho)}}function Ud(i,e){i.reset();let t=[];for(let n of e){if(!i.parseMove?.(n))break;i.applyMove(n),t.push(n)}return t}var P={puzzleKey:"cube3",puzzleState:null,renderer:null,history:null,isAnimating:!1,isSolving:!1,paused:!1,saveReady:!1,marcador:wd(),scrambled:!1,labels:!0,guia:null,guiado:!1};document.addEventListener("DOMContentLoaded",()=>{let i=document.getElementById("cube-canvas");P.renderer=new No(i,{onFirstFrame:()=>sd()}),P.faceLabels=new Io(P.renderer,e=>Wo(e),()=>P.isAnimating||P.isSolving,()=>P.puzzleState),P.dragTurns=new Co(P.renderer,()=>P.puzzleState,e=>Wo(e),()=>P.isAnimating||P.isSolving,e=>P.renderer.setEdgeGlow(e)),P.history=new Oo,P.history.subscribe(Xo),P.renderer.setRoomScale(Bd(),{ms:0}),pl(P.puzzleKey),document.getElementById("puzzle-select")?.addEventListener("change",e=>pl(e.target.value)),document.getElementById("btn-undo").addEventListener("click",DS),document.getElementById("btn-redo").addEventListener("click",Hd),document.getElementById("btn-reset").addEventListener("click",NS),document.getElementById("btn-solve").addEventListener("click",VS),document.getElementById("btn-shuffle").addEventListener("click",OS),document.getElementById("btn-labels")?.addEventListener("click",CS),document.getElementById("history-toggle")?.addEventListener("click",()=>Gd()),window.addEventListener("keydown",WS),Vd(),kd(),Xo(P.history.snapshot()),gl(),SS()});async function SS(){await pd(),md(),(id()||fd())&&await Promise.race([AS(),new Promise(i=>setTimeout(i,5e3))]),P.saveReady=!0,rd(),xd(i=>i?Dd():Nd()),yd(()=>{}),gd(),P.marcador.total>0&&al(P.marcador.total),ad(Dd),cd(Nd)}function Dd(){P.paused=!0,_l(),P.renderer.pauseLoop()}function Nd(){P.paused=!1,P.renderer.resumeLoop()}function gl({ganados:i=0}={}){let e=document.getElementById("score");e&&(e.textContent=`${P.marcador.total} pts`,i>0&&(e.classList.remove("gained"),e.offsetWidth,e.classList.add("gained"))),ds()}function ds(){let i=document.getElementById("stats");if(!i)return;let e=P.marcador.enCurso;if(e){let s=Rd(P.marcador,Date.now());i.hidden=!1,i.classList.add("running"),i.textContent=`${hs(s)} \xB7 ${e.movimientos} mov`,i.title="Time and moves for this solve";return}i.classList.remove("running");let t=hl(P.marcador,P.puzzleKey);if(!t.intentos){i.hidden=!0;return}let n=t.media5Ms?` \xB7 Ao5 ${hs(t.media5Ms)}`:` \xB7 ${Bo-t.intentos} more for Ao5`;i.hidden=!1,i.textContent=`best ${hs(t.mejorMs)}${n}`,i.title=`${t.intentos} solves \xB7 best ${hs(t.mejorMs)} \xB7 fewest ${t.mejorMovs} moves`}function Go(){clearInterval(Go._t),P.marcador.enCurso&&(Go._t=setInterval(()=>{if(!P.marcador.enCurso){clearInterval(Go._t);return}ds()},100))}function bS(){if(!P.scrambled||P.isSolving)return;let i=P.marcador.enCurso?.desde;Td(P.marcador,Date.now()),i||Go()}function ES(){if(!P.scrambled||P.isSolving||!P.puzzleState.looksSolved?.())return;P.scrambled=!1;let i=Cd(P.marcador,Date.now());if(!i)return;gl({ganados:i.puntos});let e=i.mejorTiempo&&i.intentos>1?" \xB7 best time!":"";Nt(`Solved in ${hs(i.ms)} \xB7 ${i.movimientos} moves \xB7 +${i.puntos} pts${e}`),al(P.marcador.total),_l(),Md(),setTimeout(()=>ll(),1500)}var wS=1200;function xn(){P.saveReady&&(clearTimeout(xn._t),xn._t=setTimeout(_l,wS))}function _l(){if(!P.saveReady)return;clearTimeout(xn._t);let i=Ld({puzzle:P.puzzleKey,moves:P.history.getMovesUpToCursor(),score:P.marcador.total,session:P.marcador.sesion});i&&(ld(i),vd(i))}async function AS(){let i=Id(await ud()??await Sd());if(!i)return;pl(i.puzzle),P.marcador.total=i.score,P.marcador.sesion=i.session??{},gl();let e=Ud(P.puzzleState,i.moves);P.renderer.rebuild(P.puzzleState),P.faceLabels?.rebuild(P.puzzleState),P.history.clear();for(let t of e)P.history.addMove(t);e.length!==i.moves.length&&Fo(`partida restaurada a medias: ${e.length}/${i.moves.length}`)}function pl(i){i===P.puzzleKey&&P.puzzleState||P.isAnimating||P.isSolving||(P.puzzleKey=i,P.puzzleState=IS(i),P.renderer.rebuild(P.puzzleState),P.faceLabels?.rebuild(P.puzzleState),P.history.clear(),Vd(),LS(),P.scrambled=!1,P.guia=null,P.guiado=!1,Vo(P.marcador),ds(),xn())}var TS=.82,RS=1.16,Bd=()=>P.labels?TS:RS;function CS(){P.labels=!P.labels,P.faceLabels?.setVisible(P.labels),P.renderer.setRoomScale(Bd()),kd()}function kd(){let i=document.getElementById("btn-labels");i&&(i.setAttribute("aria-pressed",String(P.labels)),i.title=P.labels?"Hide the floating move buttons":"Show the floating move buttons")}var PS=i=>{let e=i?.getType?.();return e==="megaminx"||e==="pyraminx"?!0:e==="cube"&&i.n>=3&&i.n<=5};function LS(){let i=document.getElementById("btn-solve");i&&(i.hidden=!PS(P.puzzleState))}function IS(i){switch(i){case"cube2":return new Rt(2);case"cube3":return new Rt(3);case"cube4":return new Rt(4);case"cube5":return new Rt(5);case"pyraminx":return new wi;case"megaminx":return new ni;case"cuboid221":return Il();case"cuboid331":return Ul();default:throw new Error(`[main] Puzzle no soportado: ${i}`)}}function Vd(){let i=document.getElementById("puzzle-select");i&&i.value!==P.puzzleKey&&(i.value=P.puzzleKey)}async function Wo(i,{duration:e}={}){if(P.isAnimating||P.isSolving)return;let t=P.puzzleState.parseMove(i);if(t){if(P.guiado)return US(i);P.isAnimating=!0,fs(!1);try{let n=P.puzzleState.pickLayerPieces(i),s=Er(P.puzzleState,t,1);P.puzzleState.applyMove(i),await P.renderer.animateMove({pieces:n,...s,...e?{duration:e}:{},state:P.puzzleState}),P.history.addMove(i),bS(),ES(),xn()}catch(n){console.error("[main] Error al ejecutar movimiento:",n)}finally{P.isAnimating=!1,fs(!0)}}}function US(i){let e=P.history.getMoves()[P.history.getCursor()];if(!e){Nt("The solution ends here \u2014 press Reset to leave the guide.");return}if(i===e)return Hd();Nt(`${i} is not the move \u2014 the next one is ${e}.`),P.faceLabels?.announce(e,P.puzzleState),Xo(P.history.snapshot())}async function DS(){if(!(P.isAnimating||P.isSolving)&&P.history.canUndo()){P.isAnimating=!0,fs(!1);try{let i=P.history.getCursor()-1,e=P.history.getMoves()[i],t=P.puzzleState.parseMove(e),n=P.puzzleState.pickLayerPieces(e),s=Er(P.puzzleState,t,-1);P.puzzleState.applyInverse(e),await P.renderer.animateMove({pieces:n,...s,state:P.puzzleState}),P.history.undo(),xn()}finally{P.isAnimating=!1,fs(!0)}}}async function Hd(){if(!(P.isAnimating||P.isSolving)&&P.history.canRedo()){P.isAnimating=!0,fs(!1);try{let i=P.history.getCursor(),e=P.history.getMoves()[i],t=P.puzzleState.parseMove(e),n=P.puzzleState.pickLayerPieces(e),s=Er(P.puzzleState,t,1);P.puzzleState.applyMove(e),await P.renderer.animateMove({pieces:n,...s,state:P.puzzleState}),P.history.redo(),GS(),xn()}finally{P.isAnimating=!1,fs(!0)}}}async function NS(){P.isAnimating||P.isSolving||P.guiado&&!await Wd("This clears the solution you are stepping through. You will have to press Solve again to get it back.")||(P.guiado=!1,P.puzzleState.reset(),P.renderer.rebuild(P.puzzleState),P.history.clear(),P.scrambled=!1,P.guia=null,Vo(P.marcador),ds(),xn())}async function OS(){if(P.isAnimating||P.isSolving||P.guiado&&!await Wd("Scrambling clears the solution you are stepping through."))return;P.guiado=!1,ll();let i=P.puzzleState.getMoveNotation(),e=P.puzzleState.getScrambleSuffixes(),t=P.puzzleState.getScrambleLength(),n=[],s="";for(let r=0;r<t;r++){let a;do a=i[Math.floor(Math.random()*i.length)];while(a===s);s=a,n.push(a+e[Math.floor(Math.random()*e.length)])}for(let r of n){if(P.paused)break;await Wo(r)}P.puzzleState.looksSolved?.()===!1&&(P.scrambled=!0,Ad(P.marcador,P.puzzleKey),ds())}function FS(i){if(P.isAnimating||P.isSolving)return;let e=P.history.getCursor();if(i===e)return;let t=P.history.getMoves().slice(0,i);P.puzzleState.reset(),P.puzzleState.applyMoves(t),P.renderer.rebuild(P.puzzleState),P.history.goToIndex(i),qd(i+1),xn()}var zS=new URL("./solver.JQANQH3R.js",import.meta.url),ml=0,BS=()=>{let i=performance.now();if(!(i-ml<100))return ml=i,new Promise(e=>setTimeout(e,0))},Od=(i,e)=>Nt(`Solving\u2026 step ${i} of 10: ${e}`,{fijo:!0}),dl=i=>e=>Nt(`Solving the ${i} \u2014 ${e}\u2026`,{fijo:!0});function Fd(){let i=[],e=(t,n)=>{i.length&&(i.at(-1).hasta=n),i.push({nombre:t,desde:n,hasta:n})};return e.cerrar=t=>(i.length&&(i.at(-1).hasta=t),i),e}function zd(i){let e;try{e=new Worker(zS,{type:"module"})}catch{return null}return new Promise(t=>{let n=s=>{e.terminate(),t(s)};e.onmessage=({data:s})=>{if(s.tipo==="etapa")return s.n?i.etapa?.(s.n,s.rotulo,s.hasta):i.aviso?.(s.etapa);if(s.tipo==="error")return console.warn("[main] El worker fall\xF3:",s.mensaje),n(void 0);n(s.plan)},e.onerror=s=>{console.warn("[main] No se pudo arrancar el worker:",s.message),n(null)},e.postMessage(i.mensaje)})}async function kS(){let i=P.puzzleState.getType?.();if(i==="cube"&&P.puzzleState.n===3){Nt("Solving the 3\xD73\xD73\u2026",{fijo:!0}),await new Promise(requestAnimationFrame);let e=Ri(P.puzzleState,{aviso:dl("3\xD73\xD73")});return e?.solved?e:null}if(i==="cube"&&(P.puzzleState.n===4||P.puzzleState.n===5)){let e=P.puzzleState.n,t=`${e}\xD7${e}\xD7${e}`;Nt(`Solving the ${t} \u2014 this takes a moment\u2026`),await new Promise(requestAnimationFrame);let n=dl(t),s=zd({aviso:n,mensaje:{tipo:"cubo",n:e,moves:P.history.getMovesUpToCursor()}});if(s){let o=await s;if(o!==void 0)return o}let a=(e===4?Fu:Bu)(P.puzzleState,{aviso:n});return a?.solved?a:null}if(i==="pyraminx"){let e=Fd(),t=dl("Pyraminx"),n=xu(P.puzzleState,{aviso:(s,r)=>{t(s),e(s,r)}});return n&&{moves:n,etapas:e.cerrar(n.length)}}if(i==="megaminx"){Nt("Solving the Megaminx \u2014 this takes a moment\u2026");let e=tu(P.puzzleState),t=Fd(),n=zd({etapa:(r,a,o)=>{Od(r,a),t(a,o)},mensaje:{tipo:"megaminx",estado:e}});if(n){let r=await n;if(r!==void 0)return r&&{moves:r,etapas:t.cerrar(r.length)}}ml=performance.now();let s=await lu(e,void 0,{aviso:(r,a,o)=>{Od(r,a),t(a,o)},respira:BS});return s&&{moves:s,etapas:t.cerrar(s.length)}}}async function VS(){if(P.isAnimating||P.isSolving)return;P.isSolving=!0;let i;try{i=await kS()}finally{P.isSolving=!1}if(i===void 0){Nt("For now I can only solve the cubes up to 5\xD75\xD75, the Megaminx and the Pyraminx.");return}if(!i){Nt("I could not find a solution for this state."),console.warn("[main] The solver did not reach the end:",P.puzzleState.getFaceletString?.());return}if(!i.moves.length){Nt("Already solved.");return}P.guia={etapas:i.etapas??[],desde:P.history.getCursor()};let e=P.history.queueMoves(i.moves);P.guiado=!0,P.scrambled=!1,Vo(P.marcador),ds(),xn();let t=P.guia.etapas.find(n=>n.hasta>n.desde)?.nombre;Nt(`${e} moves ready \u2014 turn the puzzle yourself and I will tell you when you stray`+(t?`. First up: the ${t}.`:"."))}function Xo(i){let e=document.getElementById("history-list"),t=document.getElementById("history-count"),n=document.getElementById("history-progress"),s=document.getElementById("btn-undo"),r=document.getElementById("btn-redo");if(t&&(t.textContent=`${i.cursor} / ${i.moves.length}`),s&&(s.disabled=!i.canUndo),r&&(r.disabled=!i.canRedo),n){let c=i.moves.length;n.style.width=c?`${i.cursor/c*100}%`:"0"}if(!e)return;e.innerHTML="";let a=new Map;P.guia?.etapas.length&&P.guia.etapas.forEach((c,l)=>{c.hasta>c.desde&&a.set(P.guia.desde+c.desde,{n:l+1,...c})});let o=null;i.moves.forEach((c,l)=>{let u=document.createElement("button");u.className="history-item "+(l<i.cursor?"done":"undone"),u.textContent=c,u.title=`Jump to the state after ${l+1} moves`;let h=a.get(l);h&&(u.classList.add("stage-start"),u.dataset.stage=h.n,u.title=`Step ${h.n}: ${h.nombre} \xB7 ${h.hasta-h.desde} moves`),l===i.cursor-1&&(u.classList.add("current","last-applied"),o=u),P.guiado&&l===i.cursor&&(u.classList.add("next"),o=o??u),u.addEventListener("click",()=>FS(l)),e.appendChild(u)}),o?.scrollIntoView({block:"nearest",inline:"center"})}function Gd(i){let e=document.getElementById("history-toggle"),t=document.getElementById("history-panel");if(!e||!t)return;let n=e.getAttribute("aria-expanded")==="true",s=i??!n;e.setAttribute("aria-expanded",s?"true":"false"),t.dataset.collapsed=s?"false":"true",s&&Xo(P.history.snapshot())}var HS=()=>Gd(!1);function fs(i){document.querySelectorAll("button").forEach(e=>{e.dataset.alwaysOn!=="true"&&(e.disabled=!i)})}function Wd(i,{ok:e="Reset"}={}){let t=document.getElementById("confirm"),n=document.getElementById("confirm-text"),s=document.getElementById("confirm-yes"),r=document.getElementById("confirm-no");return!t||!n||!s||!r?Promise.resolve(!0):(n.textContent=i,s.textContent=e,t.hidden=!1,s.focus(),new Promise(a=>{let o=f=>{t.hidden=!0,s.removeEventListener("click",c),r.removeEventListener("click",l),t.removeEventListener("click",u),window.removeEventListener("keydown",h,!0),a(f)},c=()=>o(!0),l=()=>o(!1),u=f=>{f.target===t&&o(!1)},h=f=>{if(f.key!=="Escape"&&f.key!=="Enter"){f.stopPropagation();return}f.stopPropagation(),o(f.key==="Enter")};s.addEventListener("click",c),r.addEventListener("click",l),t.addEventListener("click",u),window.addEventListener("keydown",h,!0)}))}function Nt(i,{fijo:e=!1}={}){let t=document.getElementById("status");t&&(t.textContent=i,t.classList.add("visible"),t.classList.toggle("working",e),clearTimeout(Nt._t),e||(Nt._t=setTimeout(()=>t.classList.remove("visible"),2400)))}function Xd(i){let e=P.guia;if(!e?.etapas.length)return null;let t=i-e.desde;if(t<=0)return null;let n=e.etapas.find(s=>t>s.desde&&t<=s.hasta);return n?{etapa:n,n:e.etapas.indexOf(n)+1}:null}function GS(){let i=Xd(P.history.getCursor());!i||i.etapa.nombre===P.guia.ultima||qd(P.history.getCursor())}function qd(i){let e=Xd(i);e&&(P.guia.ultima=e.etapa.nombre,Nt(`Step ${e.n} of ${P.guia.etapas.length}: ${e.etapa.nombre}`))}function WS(i){if(i.key==="Escape"){HS();return}if(P.isAnimating||P.isSolving)return;let e=i.key.toUpperCase();if(!P.puzzleState.getMoveNotation().includes(e))return;i.preventDefault();let n=i.altKey?"2":i.shiftKey?"'":"";Wo(e+n)}
/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
