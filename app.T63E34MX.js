var Ae=Object.freeze({PX:"px",NX:"nx",PY:"py",NY:"ny",PZ:"pz",NZ:"nz"}),qd=Object.freeze({[Ae.PX]:{x:1,y:0,z:0},[Ae.NX]:{x:-1,y:0,z:0},[Ae.PY]:{x:0,y:1,z:0},[Ae.NY]:{x:0,y:-1,z:0},[Ae.PZ]:{x:0,y:0,z:1},[Ae.NZ]:{x:0,y:0,z:-1}}),LS=Object.freeze({WHITE:"U",YELLOW:"D",GREEN:"F",BLUE:"B",RED:"R",ORANGE:"L"}),Xs=class i{constructor(e,t,n){this.position={x:e,y:t,z:n},this.faces={[Ae.PX]:null,[Ae.NX]:null,[Ae.PY]:null,[Ae.NY]:null,[Ae.PZ]:null,[Ae.NZ]:null}}getId(){return`cubie_${this.position.x}_${this.position.y}_${this.position.z}`}setFaceColor(e,t){this.faces[e]=t}applyMatrix(e){let t=this.position,n=Ml(e,t);this.position={x:Yo(n.x),y:Yo(n.y),z:Yo(n.z)};let s={[Ae.PX]:null,[Ae.NX]:null,[Ae.PY]:null,[Ae.NY]:null,[Ae.PZ]:null,[Ae.NZ]:null};for(let r of Object.keys(this.faces)){let a=this.faces[r];if(a===null)continue;let o=qd[r],c=Ml(e,o),l=$d(c);s[l]=a}this.faces=s}clone(){let e=new i(this.position.x,this.position.y,this.position.z);return e.faces={...this.faces},e}};function Ml(i,e){return{x:i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,y:i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,z:i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z}}function $d(i){let e=Math.round(i.x),t=Math.round(i.y),n=Math.round(i.z);return e===1?Ae.PX:e===-1?Ae.NX:t===1?Ae.PY:t===-1?Ae.NY:n===1?Ae.PZ:n===-1?Ae.NZ:Math.abs(i.x)>=Math.abs(i.y)&&Math.abs(i.x)>=Math.abs(i.z)?i.x>0?Ae.PX:Ae.NX:Math.abs(i.y)>=Math.abs(i.x)&&Math.abs(i.y)>=Math.abs(i.z)?i.y>0?Ae.PY:Ae.NY:i.z>0?Ae.PZ:Ae.NZ}function Yo(i){return Math.round(i*2)/2}var gn=class i{constructor(){if(new.target===i)throw new Error("[PuzzleState] Clase abstracta: no se puede instanciar directamente. Use CubeState, PyraminxState u otra subclase concreta.")}applyMove(){throw new Error("PuzzleState.applyMove no implementado")}applyInverse(){throw new Error("PuzzleState.applyInverse no implementado")}getFaceletString(){throw new Error("PuzzleState.getFaceletString no implementado")}reset(){throw new Error("PuzzleState.reset no implementado")}isSolved(){throw new Error("PuzzleState.isSolved no implementado")}clone(){throw new Error("PuzzleState.clone no implementado")}getType(){return"unknown"}getLabel(){return this.getType()}getMoveNotation(){return[]}getAnglePerMove(){return Math.PI/2}getMoveSuffixes(){return["","'","2"]}getScrambleSuffixes(){return this.getMoveSuffixes()}getScrambleLength(){return 20}looksSolved(){return this.isSolved()}getFaceColour(){return null}pickLayerPieces(){return[]}getRotationAxis(){return{axis:"y",sign:1}}getPieces(){return[]}applyMoves(e){for(let t of e)this.applyMove(t)}};var Bt=Object.freeze({U:"#f5f5f5",D:"#ffd500",F:"#009b48",B:"#0046ad",R:"#b71234",L:"#ff5800"}),Zd=Object.freeze({[Bt.U]:"U",[Bt.D]:"D",[Bt.F]:"F",[Bt.B]:"B",[Bt.R]:"R",[Bt.L]:"L"}),jd=Object.freeze({U:[[0,0,-1],[0,1,0],[1,0,0]],D:[[0,0,1],[0,1,0],[-1,0,0]],R:[[1,0,0],[0,0,1],[0,-1,0]],L:[[1,0,0],[0,0,-1],[0,1,0]],F:[[0,1,0],[-1,0,0],[0,0,1]],B:[[0,-1,0],[1,0,0],[0,0,1]]}),Jd=Object.freeze({U:[[-1,0,0],[0,1,0],[0,0,-1]],D:[[-1,0,0],[0,1,0],[0,0,-1]],R:[[1,0,0],[0,-1,0],[0,0,-1]],L:[[1,0,0],[0,-1,0],[0,0,-1]],F:[[-1,0,0],[0,-1,0],[0,0,1]],B:[[-1,0,0],[0,-1,0],[0,0,1]]}),Kd=Object.freeze({U:[[0,0,1],[0,1,0],[-1,0,0]],D:[[0,0,-1],[0,1,0],[1,0,0]],R:[[1,0,0],[0,0,-1],[0,1,0]],L:[[1,0,0],[0,0,1],[0,-1,0]],F:[[0,-1,0],[1,0,0],[0,0,1]],B:[[0,1,0],[-1,0,0],[0,0,1]]}),Qd=Object.freeze([[1,0,0],[0,1,0],[0,0,1]]),ep=Object.freeze({U:{axis:"y",sign:-1},D:{axis:"y",sign:1},R:{axis:"x",sign:-1},L:{axis:"x",sign:1},F:{axis:"z",sign:-1},B:{axis:"z",sign:1}}),Rt=class i extends gn{constructor(e=3){super(),this.setSize(e)}getFaceColour(e){return Bt[e]??null}looksSolved(){let e=(this.n-1)/2;return[["py","y",e],["ny","y",-e],["px","x",e],["nx","x",-e],["pz","z",e],["nz","z",-e]].every(([n,s,r])=>{let a=new Set;for(let o of this.getPieces())Math.abs(o.position[s]-r)>1e-6||a.add(o.faces[n]);return a.size===1})}getType(){return"cube"}getLabel(){return`${this.n}\xD7${this.n}`}getMoveNotation(){let e=["U","D","R","L","F","B"],t=this.n%2===1&&this.n>=3?["M","E","S"]:[];return this.n<4?[...e,...t]:[...e,...e.map(n=>n.toLowerCase()),...e.map(n=>`(${n}${n.toLowerCase()})`),...t]}getAnglePerMove(){return Math.PI/2}getPieces(){return this.cubies}getRotationAxis(e){return ep[e]||{axis:"y",sign:1}}pickLayerPieces(e){let t=this.parseMove(e)||this.parseMove(e+""),n=t?this.getLayerInfo(t.face,t.layers):this.getLayerInfo(e);return this.cubies.filter(s=>this._cubieInLayer(s,n.axis,n.values))}setSize(e){if(!Number.isInteger(e)||e<2)throw new Error(`[CubeState] Dimensi\xF3n no soportada: ${e}`);this.n=e,this.cubies=[],this._buildSolved()}_buildSolved(){this.cubies=[];let e=this._axisValues();for(let t of e)for(let n of e)for(let s of e){let r=new Xs(t,n,s);this._paintOuterFaces(r),this.cubies.push(r)}}_paintOuterFaces(e){let t=this._maxCoord(),n=this._minCoord(),{x:s,y:r,z:a}=e.position;s===t&&e.setFaceColor(Ae.PX,Bt.R),s===n&&e.setFaceColor(Ae.NX,Bt.L),r===t&&e.setFaceColor(Ae.PY,Bt.U),r===n&&e.setFaceColor(Ae.NY,Bt.D),a===t&&e.setFaceColor(Ae.PZ,Bt.F),a===n&&e.setFaceColor(Ae.NZ,Bt.B)}_maxCoord(){return(this.n-1)/2}_minCoord(){return-(this.n-1)/2}_axisValues(){let e=[],n=-((this.n-1)/2)*1;for(let s=0;s<this.n;s++)e.push(n+s*1);return e}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let n=this.getLayerInfo(t.face,t.layers),s=this._resolveMatrix(t.face,t.times);for(let r of this.cubies)this._cubieInLayer(r,n.axis,n.values)&&r.applyMatrix(s);return!0}applyInverse(e){let t=this.parseMove(e);if(!t)return!1;let n=t.times===2?2:t.times===1?3:1,s=this._resolveMatrix(t.face,n),r=this.getLayerInfo(t.face,t.layers);for(let a of this.cubies)this._cubieInLayer(a,r.axis,r.values)&&a.applyMatrix(s);return!0}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.trim().match(/^([MES])(2|'|)$/);if(t){if(this.n%2===0)return null;let c={M:"L",E:"D",S:"F"}[t[1]],l=1;return t[2]==="'"?l=3:t[2]==="2"&&(l=2),{face:c,times:l,layers:"middle"}}let n=e.trim().match(/^(?:\(([UDRLFB])([udrlfb])\)|([UDRLFB])|([udrlfb]))(2|'|)$/);if(!n)return null;let s,r;if(n[1]){if(n[1].toLowerCase()!==n[2])return null;s=n[1],r="both"}else n[3]?(s=n[3],r="outer"):(s=n[4].toUpperCase(),r="inner");if(r!=="outer"&&this.n<4)return null;let a=n[5],o=1;return a==="'"?o=3:a==="2"&&(o=2),{face:s,times:o,layers:r}}getLayerInfo(e,t="outer"){let n=this._maxCoord(),s=this._minCoord(),r={U:"y",D:"y",R:"x",L:"x",F:"z",B:"z"},a={U:!0,D:!1,R:!0,L:!1,F:!0,B:!1},o=r[e];if(!o)return{axis:"y",value:0,values:[0]};let c=a[e]?n:s,l=a[e]?n-1:s+1,h=t==="outer"?[c]:t==="inner"?[l]:t==="middle"?[0]:[c,l];return{axis:o,value:h[0],values:h}}_resolveMatrix(e,t){return t===1?jd[e]:t===2?Jd[e]:t===3?Kd[e]:Qd}_cubieInLayer(e,t,n){return(Array.isArray(n)?n:[n]).some(r=>Math.abs(e.position[t]-r)<.01)}clone(){let e=new i(this.n);return e.cubies=this.cubies.map(t=>t.clone()),e}static fromMoves(e,t){let n=new i(e);return n.applyMoves(t),n}getFaceletString(){let e=this._axisValues(),t=this._maxCoord(),n=new Map;for(let a of this.cubies)n.set(this._key(a.position),a);let s=(a,o,c,l)=>{let h=n.get(this._key({x:a,y:o,z:c}));if(!h)return"?";let u=h.faces[l];return u&&Zd[u]||"?"},r="";for(let a of[...e].reverse())for(let o of e)r+=s(o,t,a,Ae.PY);for(let a of e)for(let o of e)r+=s(t,a,o,Ae.PX);for(let a of e)for(let o of e)r+=s(o,a,t,Ae.PZ);for(let a of e)for(let o of e)r+=s(o,-t,a,Ae.NY);for(let a of e)for(let o of[...e].reverse())r+=s(-t,a,o,Ae.NX);for(let a of e)for(let o of[...e].reverse())r+=s(o,a,-t,Ae.NZ);return r}isSolved(){return this.getFaceletString()===this._solvedFaceletString()}_solvedFaceletString(){let e=this.n*this.n;return"U".repeat(e)+"R".repeat(e)+"F".repeat(e)+"D".repeat(e)+"L".repeat(e)+"B".repeat(e)}_key(e){return`${e.x.toFixed(2)},${e.y.toFixed(2)},${e.z.toFixed(2)}`}};var wi=Math.SQRT2,$s=Math.sqrt(6),qs=1/3,Ct=Object.freeze({U:{x:0,y:1,z:0},L:{x:-2*wi/3,y:-qs,z:0},R:{x:wi/3,y:-qs,z:$s/3},B:{x:wi/3,y:-qs,z:-$s/3}}),$t=Object.freeze({U:{x:0,y:-qs,z:0},L:{x:2*wi/9,y:1/9,z:0},R:{x:-wi/9,y:1/9,z:-$s/9},B:{x:-wi/9,y:1/9,z:$s/9}}),tp=Object.freeze({U:{x:$t.U.x*3,y:$t.U.y*3,z:$t.U.z*3},L:{x:$t.L.x*3,y:$t.L.y*3,z:$t.L.z*3},R:{x:$t.R.x*3,y:$t.R.y*3,z:$t.R.z*3},B:{x:$t.B.x*3,y:$t.B.y*3,z:$t.B.z*3}}),Ys=Object.freeze({U:{x:Ct.U.x,y:Ct.U.y,z:Ct.U.z},L:{x:Ct.L.x,y:Ct.L.y,z:Ct.L.z},R:{x:Ct.R.x,y:Ct.R.y,z:Ct.R.z},B:{x:Ct.B.x,y:Ct.B.y,z:Ct.B.z}}),$o=Object.freeze({U:"#009b48",L:"#ffd500",R:"#0046ad",B:"#b71234"}),np=1/9,ip=1e-6,sp=5/9,rp=Object.freeze({U:["L","R","B"],L:["U","R","B"],R:["U","L","B"],B:["U","L","R"]}),Sl=["U","L","R","B"];function qo(i,e){let t=Sl.indexOf(i),n=Sl.indexOf(e);return(t<n?i+e:e+i)+"_edge"}function op(i,e){let t=i.x,n=i.y,s=i.z,r=Math.cos(e),a=Math.sin(e),o=1-r;return[[o*t*t+r,o*t*n-a*s,o*t*s+a*n],[o*t*n+a*s,o*n*n+r,o*n*s-a*t],[o*t*s-a*n,o*n*s+a*t,o*s*s+r]]}function bl(i,e){return{x:i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,y:i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,z:i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z}}function ap(i,e,t,n,s){return{x:i.x+(e.x-i.x)*n/3+(t.x-i.x)*s/3,y:i.y+(e.y-i.y)*n/3+(t.y-i.y)*s/3,z:i.z+(e.z-i.z)*n/3+(t.z-i.z)*s/3}}var Ai=class i extends gn{constructor(){super(),this._buildSolved()}getType(){return"pyraminx"}getLabel(){return"Pyraminx"}getMoveNotation(){return["U","L","R","B","u","l","r","b"]}getAnglePerMove(){return 2*Math.PI/3}getScrambleSuffixes(){return["","'"]}getRotationAxis(e){return Ys[e]||Ys.U}getPieces(){return this.pieces}pickLayerPieces(e){let t=this.parseMove(e),n=t?.face??e,s=Ys[n];if(!s)return[];let r=t?.layers==="tip"?sp:np;return this.pieces.filter(a=>a.stickers.every(o=>o.vertices.every(c=>c.x*s.x+c.y*s.y+c.z*s.z>r-ip)))}_buildSolved(){this.pieces=[],this._byName=new Map;let e=new Map,t=(n,s)=>{let r=e.get(s);return r||(r={kind:n,name:s,stickers:[]},e.set(s,r)),r.stickers};for(let[n,[s,r,a]]of Object.entries(rp)){let o=Ct[s],c=Ct[r],l=Ct[a],h=(u,f)=>ap(o,c,l,u,f);t("tip",`${s}_tip`).push({face:n,vertices:[h(0,0),h(1,0),h(0,1)]}),t("tip",`${r}_tip`).push({face:n,vertices:[h(3,0),h(2,0),h(2,1)]}),t("tip",`${a}_tip`).push({face:n,vertices:[h(0,3),h(0,2),h(1,2)]}),t("center",`${s}_center`).push({face:n,vertices:[h(1,0),h(0,1),h(1,1)]}),t("center",`${r}_center`).push({face:n,vertices:[h(2,0),h(1,1),h(2,1)]}),t("center",`${a}_center`).push({face:n,vertices:[h(1,1),h(0,2),h(1,2)]}),t("edge",qo(s,r)).push({face:n,vertices:[h(1,0),h(2,0),h(1,1)]}),t("edge",qo(s,a)).push({face:n,vertices:[h(0,1),h(1,1),h(0,2)]}),t("edge",qo(r,a)).push({face:n,vertices:[h(2,1),h(1,2),h(1,1)]})}for(let{kind:n,name:s,stickers:r}of e.values())this._addPiece(n,s,r)}_addPiece(e,t,n){let s=0,r=0,a=0,o=0;for(let l of n)for(let h of l.vertices)r+=h.x,a+=h.y,o+=h.z,s++;let c={kind:e,name:t,position:{x:r/s,y:a/s,z:o/s},stickers:n.map(l=>({color:$o[l.face],face:l.face,vertices:l.vertices}))};this.pieces.push(c),this._byName.set(t,c)}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.match(/^([ULRBulrb])(2|'|)$/);if(!t)return null;let n=t[1],s=n.toUpperCase(),r=n===s?"big":"tip",a=t[2],o=1;return a==="'"?o=-1:a==="2"&&(o=2),{face:s,times:o,layers:r}}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let{face:n,times:s}=t,r=Ys[n],a=this.pickLayerPieces(e),o=s*2*Math.PI/3,c=op(r,o);for(let l of a){l.position=bl(c,l.position);for(let h of l.stickers)h.vertices=h.vertices.map(u=>bl(c,u))}return!0}applyInverse(e){let t=this.parseMove(e);if(!t)return!1;let n=t.times===1?-1:1,s=t.layers==="tip"?t.face.toLowerCase():t.face;return this.applyMove(s+(n===-1?"'":""))}getFaceletString(){return"UUUUUUULLLLLLLRRRRRRRBBBBBBB"}_faceOf(e){let t=e.vertices,n=(t[0].x+t[1].x+t[2].x)/3,s=(t[0].y+t[1].y+t[2].y)/3,r=(t[0].z+t[1].z+t[2].z)/3,a="U",o=-1/0;for(let[c,l]of Object.entries(tp)){let h=n*l.x+s*l.y+r*l.z;h>o&&(o=h,a=c)}return a}isSolved(){let e={U:null,L:null,R:null,B:null};for(let t of this.pieces)for(let n of t.stickers){let s=this._faceOf(n);if(e[s]===null)e[s]=n.color;else if(e[s]!==n.color)return!1}return!0}clone(){let e=new i;e.pieces=this.pieces.map(t=>({kind:t.kind,name:t.name,position:{...t.position},stickers:t.stickers.map(n=>({color:n.color,face:n.face,vertices:n.vertices.map(s=>({...s}))}))})),e._byName=new Map;for(let t of e.pieces)e._byName.set(t.name,t);return e}};var ii=(1+Math.sqrt(5))/2,kt=(i,e,t)=>({x:i,y:e,z:t}),cp=(i,e)=>kt(i.x+e.x,i.y+e.y,i.z+e.z),bn=(i,e)=>kt(i.x-e.x,i.y-e.y,i.z-e.z),Zs=(i,e)=>kt(i.x*e,i.y*e,i.z*e),Ht=(i,e)=>i.x*e.x+i.y*e.y+i.z*e.z,Jo=(i,e)=>kt(i.y*e.z-i.z*e.y,i.z*e.x-i.x*e.z,i.x*e.y-i.y*e.x),js=i=>Math.hypot(i.x,i.y,i.z),Ko=i=>{let e=js(i)||1;return kt(i.x/e,i.y/e,i.z/e)},ps=(i,e,t)=>cp(i,Zs(bn(e,i),t));function jo(i,e){let{x:t,y:n,z:s}=i,r=Math.cos(e),a=Math.sin(e),o=1-r;return[[o*t*t+r,o*t*n-a*s,o*t*s+a*n],[o*t*n+a*s,o*n*n+r,o*n*s-a*t],[o*t*s-a*n,o*n*s+a*t,o*s*s+r]]}var Ti=(i,e)=>kt(i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z);function lp(){let i=[];for(let n of[1,-1])for(let s of[1,-1])for(let r of[1,-1])i.push(kt(n,s,r));for(let n of[1,-1])for(let s of[1,-1])i.push(kt(0,n/ii,s*ii));for(let n of[1,-1])for(let s of[1,-1])i.push(kt(n/ii,s*ii,0));for(let n of[1,-1])for(let s of[1,-1])i.push(kt(n*ii,0,s/ii));let e=i.map(n=>Zs(n,1/js(n))),t=[];for(let n=0;n<e.length;n++)for(let s=n+1;s<e.length;s++)for(let r=s+1;r<e.length;r++){let a=Jo(bn(e[s],e[n]),bn(e[r],e[n]));if(!(js(a)<1e-9))for(let o of[1,-1]){let c=Ko(Zs(a,o)),l=Ht(c,e[n]);l<=0||e.every(h=>Ht(c,h)<=l+1e-9)&&(t.some(h=>Ht(h.normal,c)>1-1e-9)||t.push({normal:c,d:l,verts:e.filter(h=>Math.abs(Ht(c,h)-l)<1e-9)}))}}return{verts:e,faces:t}}function hp(i,e,t){let n=Ko(bn(i[0],t)),s=Jo(e,n);return[...i].sort((r,a)=>{let o=Math.atan2(Ht(bn(r,t),s),Ht(bn(r,t),n)),c=Math.atan2(Ht(bn(a,t),s),Ht(bn(a,t),n));return o-c})}var Zo=lp(),up=(()=>{let i=Zo.faces.reduce((l,h)=>h.normal.y>l.normal.y?h:l,Zo.faces[0]),e=kt(0,1,0),t;if(Ht(i.normal,e)>1-1e-12)t=[[1,0,0],[0,1,0],[0,0,1]];else{let l=Ko(Jo(i.normal,e)),h=Math.acos(Math.max(-1,Math.min(1,Ht(i.normal,e))));t=jo(l,h)}let n=l=>({...l,normal:Ti(t,l.normal),verts:l.verts.map(h=>Ti(t,h))}),s=Zo.faces.map(n),r=s.reduce((l,h)=>h.normal.y>l.normal.y?h:l,s[0]),a=s.filter(l=>Math.abs(Ht(l.normal,r.normal)-1/Math.sqrt(5))<1e-6),o=a.reduce((l,h)=>h.normal.z>l.normal.z?h:l,a[0]),c=jo(kt(0,1,0),-Math.atan2(o.normal.x,o.normal.z));return s.map(l=>({normal:Ti(c,l.normal),d:l.d,verts:l.verts.map(h=>Ti(c,h))}))})(),Je=Object.freeze(["U","F","R","BR","BL","L","D","DF","DR","DBR","DBL","DL"]),kS=Object.freeze({B:"DR"}),ms=(()=>{let i=o=>{let c=Math.atan2(o.normal.x,o.normal.z);return c<-1e-9?c+2*Math.PI:c},e=[...up].sort((o,c)=>c.normal.y-o.normal.y),t=e[0],n=e[e.length-1],s=e.slice(1,6).sort((o,c)=>i(o)-i(c)),r=e.slice(6,11).sort((o,c)=>i(o)-i(c)),a={};a.U=t,a.D=n,["F","R","BR","BL","L"].forEach((o,c)=>{a[o]=s[c]}),["DF","DR","DBR","DBL","DL"].forEach((o,c)=>{a[o]=r[c]});for(let o of Je){let c=a[o];c.center=Zs(c.normal,c.d),c.ring=hp(c.verts,c.normal,c.center)}return Object.freeze(a)})(),mt=Object.freeze(Object.fromEntries(Je.map(i=>[i,ms[i].normal]))),fp=ms.U.d,Al=1-Math.sqrt(5)/(3*ii),dp=(()=>{let i=1/Math.sqrt(5),e=Math.sqrt(1-i*i),t=ms.U,n=js(bn(ps(t.ring[0],t.ring[1],.5),t.center));return Al*n*e+fp*i})(),pp=1e-6,El=Object.freeze({U:"#ffffff",F:"#009b48",R:"#b71234",BR:"#0046ad",BL:"#ffd500",L:"#ff5800",D:"#8a8a8a",DF:"#7ad3ff",DR:"#ff9ec7",DBR:"#6b3fa0",DBL:"#c9f24a",DL:"#f2e3c0"}),mp=new RegExp(`^(${[...Je].sort((i,e)=>e.length-i.length).join("|")})(\\+\\+|--|2'|2|')?$`),wl=2*Math.PI/5,si=class i extends gn{constructor(){super(),this._buildSolved()}getType(){return"megaminx"}getFaceColour(e){return El[e]??null}getLabel(){return"Megaminx"}getMoveNotation(){return[...Je]}getAnglePerMove(){return wl}getMoveSuffixes(){return["","'","2","2'"]}getScrambleLength(){return 40}getRotationAxis(e){return mt[e]||mt.U}getPieces(){return this.pieces}pickLayerPieces(e){let t=this.parseMove(e)?.face??e,n=mt[t];return n?this.pieces.filter(s=>s.stickers.every(r=>r.vertices.every(a=>Ht(a,n)>dp-pp))):[]}_buildSolved(){this.pieces=[],this._byName=new Map;let e=new Map,t=(r,a)=>{let o=e.get(a);return o||(o={kind:r,name:a,stickers:[]},e.set(a,o)),o.stickers},n=r=>`${r.x.toFixed(6)}|${r.y.toFixed(6)}|${r.z.toFixed(6)}`,s=new Map;for(let r of Je)for(let a of ms[r].ring)s.has(n(a))||s.set(n(a),`corner${s.size}`);for(let r of Je){let{center:a,ring:o}=ms[r],c=o.map(l=>ps(a,l,Al));t("center",`${r}_center`).push({face:r,vertices:c});for(let l=0;l<5;l++){let h=(l+1)%5,u=(l+4)%5,f=ps(o[l],o[h],1/3),d=ps(o[l],o[h],2/3),g=s.get(n(o[l]));t("corner",g).push({face:r,vertices:[c[l],ps(o[u],o[l],2/3),o[l],f]});let _=gp(o[l],o[h],s,n);t("edge",_).push({face:r,vertices:[c[l],f,d,c[h]]})}}for(let{kind:r,name:a,stickers:o}of e.values())this._addPiece(r,a,o)}_addPiece(e,t,n){let s=0,r=0,a=0,o=0;for(let l of n)for(let h of l.vertices)r+=h.x,a+=h.y,o+=h.z,s++;let c={kind:e,name:t,position:kt(r/s,a/s,o/s),stickers:n.map(l=>({color:El[l.face],face:l.face,vertices:l.vertices}))};this.pieces.push(c),this._byName.set(t,c)}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.trim().match(mp);if(!t)return null;let n=t[1];switch(t[2]){case void 0:case"":return{face:n,times:1};case"'":return{face:n,times:-1};case"2":case"++":return{face:n,times:2};case"2'":case"--":return{face:n,times:-2};default:return null}}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let{face:n,times:s}=t,r=this.pickLayerPieces(n),a=jo(mt[n],s*wl);for(let o of r){o.position=Ti(a,o.position);for(let c of o.stickers)c.vertices=c.vertices.map(l=>Ti(a,l))}return!0}applyInverse(e){let t=this.parseMove(e);if(!t)return!1;let n={1:"'","-1":"",2:"2'","-2":"2"}[String(t.times)];return this.applyMove(t.face+n)}getFaceletString(){return Je.map(e=>e.repeat(11)).join("")}isSolved(){let e={};for(let t of this.pieces)for(let n of t.stickers){let s=this._faceOf(n);if(!s)return!1;if(e[s]===void 0)e[s]=n.color;else if(e[s]!==n.color)return!1}return!0}_faceOf(e){let t=null,n=-1/0;for(let s of Je){let r=mt[s],a=0;for(let o of e.vertices)a+=Ht(o,r);a/=e.vertices.length,a>n&&(n=a,t=s)}return t}clone(){let e=new i;e.pieces=this.pieces.map(t=>({kind:t.kind,name:t.name,position:{...t.position},stickers:t.stickers.map(n=>({color:n.color,face:n.face,vertices:n.vertices.map(s=>({...s}))}))})),e._byName=new Map;for(let t of e.pieces)e._byName.set(t.name,t);return e}};function gp(i,e,t,n){let s=t.get(n(i)),r=t.get(n(e));return[s,r].sort().join("-")}var Ze=(i,e,t)=>({x:i,y:e,z:t});function _p(i,e){let{x:t,y:n,z:s}=i,r=Math.cos(e),a=Math.sin(e),o=1-r;return[[o*t*t+r,o*t*n-a*s,o*t*s+a*n],[o*t*n+a*s,o*n*n+r,o*n*s-a*t],[o*t*s-a*n,o*n*s+a*t,o*s*s+r]]}var Tl=(i,e)=>Ze(i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z),ue=.5,xp=Object.freeze({U:"#ffffff",D:"#ffd500",F:"#009b48",B:"#0046ad",R:"#b71234",L:"#ff5800"}),gs=Object.freeze({U:Ze(0,1,0),D:Ze(0,-1,0),F:Ze(0,0,1),B:Ze(0,0,-1),R:Ze(1,0,0),L:Ze(-1,0,0)}),Rl=Object.freeze(["F","B","R","L"]);function yp(i,e){let{x:t,y:n,z:s}=i;switch(e){case"U":return[Ze(t-ue,n+ue,s-ue),Ze(t+ue,n+ue,s-ue),Ze(t+ue,n+ue,s+ue),Ze(t-ue,n+ue,s+ue)];case"D":return[Ze(t-ue,n-ue,s-ue),Ze(t-ue,n-ue,s+ue),Ze(t+ue,n-ue,s+ue),Ze(t+ue,n-ue,s-ue)];case"F":return[Ze(t-ue,n-ue,s+ue),Ze(t+ue,n-ue,s+ue),Ze(t+ue,n+ue,s+ue),Ze(t-ue,n+ue,s+ue)];case"B":return[Ze(t+ue,n-ue,s-ue),Ze(t-ue,n-ue,s-ue),Ze(t-ue,n+ue,s-ue),Ze(t+ue,n+ue,s-ue)];case"R":return[Ze(t+ue,n-ue,s+ue),Ze(t+ue,n-ue,s-ue),Ze(t+ue,n+ue,s-ue),Ze(t+ue,n+ue,s+ue)];case"L":return[Ze(t-ue,n-ue,s-ue),Ze(t-ue,n-ue,s+ue),Ze(t-ue,n+ue,s+ue),Ze(t-ue,n+ue,s-ue)];default:return[]}}var Js=class i extends gn{constructor(e=3,t=e,n="2"){super(),this.width=e,this.depth=t,this.suffix=n,this._buildSolved()}getType(){return`cuboid${this.width}${this.depth}1`}getLabel(){return`${this.width}\xD7${this.depth}\xD71`}getMoveNotation(){return[...Rl]}getAnglePerMove(){return Math.PI}getMoveSuffixes(){return[this.suffix]}getScrambleLength(){return Math.max(6,this.width*this.depth)}getRotationAxis(e){return gs[e]||gs.F}getPieces(){return this.pieces}getBoundingRadius(){return Math.hypot(this.width/2,ue,this.depth/2)}_extentAlong(e){return e.x!==0?(this.width-1)/2:e.z!==0?(this.depth-1)/2:0}pickLayerPieces(e){let t=this.parseMove(e)?.face??e,n=gs[t];if(!n||!Rl.includes(t))return[];let s=this._extentAlong(n);return this.pieces.filter(r=>r.position.x*n.x+r.position.y*n.y+r.position.z*n.z>s-.5)}_buildSolved(){this.pieces=[],this._byName=new Map;let e=(this.width-1)/2,t=(this.depth-1)/2;for(let n=0;n<this.width;n++)for(let s=0;s<this.depth;s++){let r=Ze(n-e,0,s-t),a=[];n===0&&a.push("L"),n===this.width-1&&a.push("R"),s===0&&a.push("B"),s===this.depth-1&&a.push("F");let o=a.length===2?"corner":a.length===1?"edge":"center",c=["U","D",...a];this._addPiece(o,`${n}${s}`,r,c.map(l=>({face:l,vertices:yp(r,l)})))}}_addPiece(e,t,n,s){let r={kind:e,name:t,position:{...n},stickers:s.map(a=>({color:xp[a.face],face:a.face,vertices:a.vertices}))};this.pieces.push(r),this._byName.set(t,r)}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.trim().match(/^([FBRL])(2)?$/);return t?{face:t[1],times:1}:null}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let n=gs[t.face],s=this.pickLayerPieces(t.face),r=_p(n,Math.PI);for(let a of s){a.position=Tl(r,a.position);for(let o of a.stickers)o.vertices=o.vertices.map(c=>Tl(r,c))}return!0}applyInverse(e){return this.applyMove(e)}getFaceletString(){let e=t=>{let n=Math.round(t*1e3)/1e3;return(n===0?0:n).toFixed(3)};return this.pieces.flatMap(t=>t.stickers.map(n=>({key:this._centroid(n).map(e).join(","),color:n.face}))).sort((t,n)=>t.key<n.key?-1:t.key>n.key?1:0).map(t=>t.color).join("")}isSolved(){let e={};for(let t of this.pieces)for(let n of t.stickers){let s=this._faceOf(n);if(e[s]===void 0)e[s]=n.color;else if(e[s]!==n.color)return!1}return!0}_centroid(e){let t=0,n=0,s=0;for(let a of e.vertices)t+=a.x,n+=a.y,s+=a.z;let r=e.vertices.length;return[t/r,n/r,s/r]}_faceOf(e){let[t,n,s]=e.vertices,r=n.x-t.x,a=n.y-t.y,o=n.z-t.z,c=s.x-t.x,l=s.y-t.y,h=s.z-t.z,u=a*h-o*l,f=o*c-r*h,d=r*l-a*c,[g,_,m]=this._centroid(e);u*g+f*_+d*m<0&&(u=-u,f=-f,d=-d);let p="U",b=-1/0;for(let[y,T]of Object.entries(gs)){let L=u*T.x+f*T.y+d*T.z;L>b&&(b=L,p=y)}return p}clone(){let e=new i(this.width,this.depth,this.suffix);e.pieces=this.pieces.map(t=>({kind:t.kind,name:t.name,position:{...t.position},stickers:t.stickers.map(n=>({color:n.color,face:n.face,vertices:n.vertices.map(s=>({...s}))}))})),e._byName=new Map;for(let t of e.pieces)e._byName.set(t.name,t);return e}},Cl=()=>new Js(2,2,""),Pl=()=>new Js(3,3,"2");var Ll=.001,Il=i=>[i.x,i.y,i.z].map(e=>(Math.round(e/Ll)*Ll).toFixed(3)).join(",");function Ul(i,e,t){let n=Math.cos(t),s=Math.sin(t),r=e.x*i.x+e.y*i.y+e.z*i.z;return{x:i.x*n+(e.y*i.z-e.z*i.y)*s+e.x*r*(1-n),y:i.y*n+(e.z*i.x-e.x*i.z)*s+e.y*r*(1-n),z:i.z*n+(e.x*i.y-e.y*i.x)*s+e.z*r*(1-n)}}function Qo(i,e){let t=i.parseMove?.(e)?.face??e,n=i.getRotationAxis?.(t);if(!n)return null;if(typeof n.axis=="string")return{x:+(n.axis==="x"),y:+(n.axis==="y"),z:+(n.axis==="z"),sign:n.sign};let s=Math.hypot(n.x,n.y,n.z)||1;return{x:n.x/s,y:n.y/s,z:n.z/s,sign:1}}function Nl(i,e,t){let n=Qo(i,e),s=i.getPieces?.()??[];if(!n||!s.length||!t)return null;let r=2*Math.PI/t,a=i.getMoveNotation(),o=new Map;for(let l of a){let h=i.pickLayerPieces(l);!h.length||h.length===s.length||o.set(l,new Set(h.map(u=>Il(u.position))))}let c={};for(let[l,h]of o){let u=new Set([...i.pickLayerPieces(l)].map(b=>Il(Ul(b.position,n,r)))),f=null;for(let[b,y]of o)if(y.size===u.size&&[...u].every(T=>y.has(T))){f=b;break}if(!f)continue;let d=Qo(i,l),g=Qo(i,f),_=Ul({x:d.x*d.sign,y:d.y*d.sign,z:d.z*d.sign},n,r),m={x:g.x*g.sign,y:g.y*g.sign,z:g.z*g.sign},p=_.x*m.x+_.y*m.y+_.z*m.z;c[l]=[f,p<0]}return c}var vp={U:["U",!1],D:["D",!1],E:["E",!1],F:["R",!1],R:["B",!1],B:["L",!1],L:["F",!1],M:["S",!1],S:["M",!0]};function ea(i){return i.startsWith("2")?"2":i==="'"?"":"'"}function Dl(i,e){let t=i,n=!1;for(let s=0;s<e;s++){let r=vp[t];if(!r)return null;t=r[0],n=n!==r[1]}return[t,n]}function Mp(i,e,t=null){if(!e)return i;if(t){let h=i.match(/^(.*?)(2'|'|2)?$/),u=h[1],f=h[2]??"",d=!1;for(let g=0;g<e;g++){let _=t[u];if(!_)return i;u=_[0],d=d!==_[1]}return u+(d?ea(f):f)}let n=i.match(/^\(([A-Za-z])([A-Za-z])\)(.*)$/);if(n){let h=Dl(n[1].toUpperCase(),e);if(!h)return i;let[u,f]=h,d=f?ea(n[3]):n[3];return`(${u}${u.toLowerCase()})${d}`}let s=i.match(/^([A-Za-z])(.*)$/);if(!s)return i;let r=s[1]===s[1].toLowerCase(),a=Dl(s[1].toUpperCase(),e);if(!a)return i;let[o,c]=a,l=c?ea(s[2]):s[2];return(r?o.toLowerCase():o)+l}function Ri(i,e,t=null){return e?i.trim().split(/\s+/).map(n=>Mp(n,e,t)).join(" "):i}var xt={PX:"px",NX:"nx",PY:"py",NY:"ny",PZ:"pz",NZ:"nz"},at=[{face:"F",dir:{x:0,y:0,z:1},key:xt.PZ},{face:"R",dir:{x:1,y:0,z:0},key:xt.PX},{face:"B",dir:{x:0,y:0,z:-1},key:xt.NZ},{face:"L",dir:{x:-1,y:0,z:0},key:xt.NX}],Vt=(i,e,t,n)=>i.getPieces().find(s=>s.position.x===e&&s.position.y===t&&s.position.z===n),Sp=i=>({U:Vt(i,0,1,0).faces[xt.PY],D:Vt(i,0,-1,0).faces[xt.NY],F:Vt(i,0,0,1).faces[xt.PZ],B:Vt(i,0,0,-1).faces[xt.NZ],R:Vt(i,1,0,0).faces[xt.PX],L:Vt(i,-1,0,0).faces[xt.NX]}),kl=i=>Object.values(i.faces).filter(Boolean),Hl=(i,e)=>i.length===e.length&&i.every(t=>e.includes(t)),Ks=(i,e)=>i.getPieces().find(t=>Hl(kl(t),e));function Zt(i,e,t){if(e)for(let n of e.trim().split(/\s+/))n&&(i.applyMove(n),t.push(n))}var bp=["M","M'","M2","E","E'","E2","S","S'","S2"],Ep=[[0,1,0],[0,-1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1]];function Ol(i,e){return Ep.every(([t,n,s])=>{let r=Vt(i,t,n,s),a=Vt(e,t,n,s);return r&&a&&Object.keys(a.faces).every(o=>r.faces[o]===a.faces[o])})}function wp(i,e){let t=i.clone();if(t.reset(),Ol(i,t))return!0;let n=Gl(i,bp,s=>Ol(s,t),3);if(!n)return!1;for(let s of n)Zt(i,s,e);return!0}var Ap=["U","D","R","L","F","B"],Tp=["","'","2"],Rp={U:"D",D:"U",R:"L",L:"R",F:"B",B:"F"};function Cp(i,e,t){let n=Vt(i,t.dir.x,-1,t.dir.z);return!!n&&n.faces[xt.NY]===e.D&&n.faces[t.key]===e[t.face]}function Pp(i,e,t){let n=[],s=(r,a)=>{if(e(i))return!0;if(r===0)return!1;for(let o of Ap)if(!(o===a||Rp[o]===a))for(let c of Tp){let l=o+c;if(i.applyMove(l),n.push(l),s(r-1,o))return!0;n.pop(),i.applyInverse(l)}return!1};for(let r=0;r<=t;r++){if(s(r,null)){let a=n.slice();for(let o=a.length-1;o>=0;o--)i.applyInverse(a[o]);return a}n.length=0}return null}function Lp(i,e,t){let n=[];for(let s of at){n.push(s);let a=Pp(i,o=>n.every(c=>Cp(o,e,c)),7);if(!a)return!1;Zt(i,a.join(" "),t)}return!0}var Ip="R U R'",Up="R U R' U'";function ra(i){let e=at[i].dir,t=at[(i+1)%4].dir;return{x:e.x+t.x,y:-1,z:e.z+t.z}}function ta(i,e,t){let n=ra(t),s=Vt(i,n.x,n.y,n.z);if(!s)return!1;let r=at[t],a=at[(t+1)%4];return s.faces[xt.NY]===e.D&&s.faces[r.key]===e[r.face]&&s.faces[a.key]===e[a.face]}function Dp(i,e,t,n){for(let s=0;s<4;s++){let r=at[s],a=at[(s+1)%4],o=[e.D,e[r.face],e[a.face]],c=ra(s),l=Ri(Up,s,t),h=Ks(i,o);if(h&&h.position.y===-1&&!ta(i,e,s)){let f=at.findIndex((d,g)=>{let _=ra(g);return _.x===h.position.x&&_.z===h.position.z});Zt(i,Ri(Ip,f,t),n)}let u=ta(i,e,s);for(let f=0;f<4&&!u;f++){let d=Ks(i,o);if(d.position.y===1&&d.position.x===c.x&&d.position.z===c.z)for(let _=0;_<6&&!u;_++)Zt(i,l,n),u=ta(i,e,s);u||Zt(i,"U",n)}if(!u)return!1}return!0}var Fl="U R U' R' U' F' U F",Np="U' L' U L U F U' F'";function Vl(i){let e=at[i].dir,t=at[(i+1)%4].dir;return{x:e.x+t.x,y:0,z:e.z+t.z}}function zl(i,e,t){let n=Vl(t),s=Vt(i,n.x,n.y,n.z);if(!s)return!1;let r=at[t],a=at[(t+1)%4];return s.faces[r.key]===e[r.face]&&s.faces[a.key]===e[a.face]}function Op(i){return i.position.y!==0?-1:at.findIndex((e,t)=>{let n=Vl(t);return n.x===i.position.x&&n.z===i.position.z})}function Fp(i,e,t,n){for(let s=0;s<4;s++){if(zl(i,e,s))continue;let r=at[s],a=at[(s+1)%4],o=[e[r.face],e[a.face]],c=Op(Ks(i,o));c>=0&&Zt(i,Ri(Fl,c,t),n);let l=!1;for(let h=0;h<4&&!l;h++){let u=Ks(i,o),f=u.faces[xt.PY],d=[{side:r,front:e[r.face],up:e[a.face],alg:Fl,times:s},{side:a,front:e[a.face],up:e[r.face],alg:Np,times:(s+1)%4}];for(let g of d)if(u.position.y===1&&u.position.x===g.side.dir.x&&u.position.z===g.side.dir.z&&u.faces[g.side.key]===g.front&&f===g.up){Zt(i,Ri(g.alg,g.times,t),n),l=zl(i,e,s);break}l||Zt(i,"U",n)}if(!l)return!1}return!0}var zp="F R U R' U' F'",Bp="F U R U' R' F'",na="U R U' L' U R' U' L",kp="R' D' R D",Hp="R U' R U R U R U' R' U' R2",Vp="R U R' U' R' F R2 U' R' U' R U R' F'",ia=["","U","U2","U'"];function Gl(i,e,t,n=3){let s=(r,a)=>{if(t(r))return[];if(!a)return null;for(let o of e){let c=r.clone();Zt(c,o,[]);let l=s(c,a-1);if(l)return[o,...l]}return null};for(let r=0;r<=n;r++){let a=s(i,r);if(a)return a}return null}function sa(i,e,t,n,s=3){let r=Gl(i,e,t,s);if(!r)return!1;for(let a of r)Zt(i,a,n);return!0}var Wl=(i,e)=>Vt(i,e.dir.x,1,e.dir.z),oa=(i,e)=>{let t=at[e].dir,n=at[(e+1)%4].dir;return Vt(i,t.x+n.x,1,t.z+n.z)},Gp=(i,e)=>at.filter(t=>Wl(i,t)?.faces[xt.PY]===e.U).length;function Bl(i,e){let t=0;for(let n=0;n<4;n++){let s=oa(i,n);if(!s)continue;let r=at[n],a=at[(n+1)%4];Hl(kl(s),[e.U,e[r.face],e[a.face]])&&t++}return t}var Wp=(i,e)=>[0,1,2,3].filter(t=>oa(i,t)?.faces[xt.PY]===e.U).length;function Xp(i,e){let t=0;for(let n of at){let s=Wl(i,n);s&&s.faces[xt.PY]===e.U&&s.faces[n.key]===e[n.face]&&t++}return t}function Yp(i,e,t,n){let s=ia.flatMap(o=>[`${o} ${zp}`,`${o} ${Bp}`]);if(!sa(i,s,o=>Gp(o,e)===4,n))return"cruz superior";let r=ia.flatMap(o=>[`${o} ${na}`,`${o} ${na} ${na}`,`${o} ${Vp}`]).concat(ia.slice(1));if(!sa(i,r,o=>Bl(o,e)===4,n))return"colocar esquinas";if(Wp(i,e)<4)for(let o=0;o<4;o++){let c=0;for(;oa(i,0)?.faces[xt.PY]!==e.U;)if(Zt(i,kp,n),++c>5)return"orientar esquinas";if(c%2)return"orientar esquinas \xB7 giros impares";Zt(i,"U",n)}if(Bl(i,e)<4)return"orientar esquinas \xB7 capa descolocada";let a=[];for(let o=0;o<4;o++){let c=Ri(Hp,o,t);a.push(c,`${c} ${c}`)}return sa(i,a,o=>Xp(o,e)===4,n)?null:"permutar aristas"}function Ci(i){if(i.n!==3)return null;let e=i.clone(),t=[];if(!wp(e,t))return null;let n=Sp(e),s=Nl(e,"U",4);return!Lp(e,n,t)||!Dp(e,n,s,t)||!Fp(e,n,s,t)||Yp(e,n,s,t)?null:{moves:t,solved:e.isSolved(),state:e}}var _s=(i,e)=>i.x*e.x+i.y*e.y+i.z*e.z,qp=(i,e)=>({x:i.x-e.x,y:i.y-e.y,z:i.z-e.z}),$p=(i,e)=>({x:i.y*e.z-i.z*e.y,y:i.z*e.x-i.x*e.z,z:i.x*e.y-i.y*e.x}),Zp=(i,e)=>({x:i.x*e,y:i.y*e,z:i.z*e}),jp=i=>{let e=Math.hypot(i.x,i.y,i.z)||1;return{x:i.x/e,y:i.y/e,z:i.z/e}},Jp=1/Math.sqrt(5);var sn=(i,e)=>i!==e&&Math.abs(_s(mt[i],mt[e])-Jp)<1e-6,ri=i=>Je.filter(e=>sn(i,e)),aa=i=>Je.find(e=>_s(mt[i],mt[e])<-1+1e-6);function Kp(i){let e=null,t=-1/0;for(let n of Je){let s=_s(mt[n],i);s>t&&(t=s,e=n)}return e}function Xl(i,e){let t=jp(qp(e,Zp(i,_s(e,i))));return[t,$p(i,t),i]}function Qp(i,e,t){let n=i.map(s=>_s(s,t));return{x:n[0]*e[0].x+n[1]*e[1].x+n[2]*e[2].x,y:n[0]*e[0].y+n[1]*e[1].y+n[2]*e[2].y,z:n[0]*e[0].z+n[1]*e[1].z+n[2]*e[2].z}}function Yl(i,e){if(!mt[i]||!mt[e]||!sn(i,e))return null;let t=Xl(mt.U,mt.F),n=Xl(mt[i],mt[e]),s={};for(let r of Je)s[r]=Kp(Qp(t,n,mt[r]));return s}var ql=new Map(Je.map((i,e)=>[i,e])),Qs=(i,e)=>ql.get(i)-ql.get(e),er=i=>[...i].sort(Qs).join("-"),En=(()=>{let i=[];for(let e=0;e<Je.length;e++)for(let t=e+1;t<Je.length;t++)sn(Je[e],Je[t])&&i.push([Je[e],Je[t]]);return i})(),wn=(()=>{let i=[];for(let e=0;e<Je.length;e++)for(let t=e+1;t<Je.length;t++)for(let n=t+1;n<Je.length;n++){let[s,r,a]=[Je[e],Je[t],Je[n]];sn(s,r)&&sn(r,a)&&sn(s,a)&&i.push([s,r,a])}return i})(),em=new Map(En.map((i,e)=>[er(i),e])),tm=new Map(wn.map((i,e)=>[er(i),e])),ca=i=>em.get(er(i)),xs=i=>tm.get(er(i)),nm=(()=>{let i={};for(let e of Je){let t=ri(e),n=new si,s=new Map;for(let o of n.getPieces())o.kind==="edge"&&s.set(o.name,o.stickers.map(c=>c.face));n.applyMove(e);let r=new Map;for(let o of n.getPieces()){if(o.kind!=="edge")continue;let c=s.get(o.name);if(!c.includes(e))continue;let l=o.stickers.map(h=>n._faceOf(h));r.set(c.find(h=>h!==e),l.find(h=>h!==e))}let a=[t[0]];for(let o=1;o<5;o++)a.push(r.get(a[o-1]));i[e]=a}return Object.freeze(i)})();function $l(i,e,t){if(e===i)return i;let n=nm[i],s=n.indexOf(e);return s<0?e:n[((s+t)%5+5)%5]}var tr=["","'","2","2'"],im={"":1,"'":-1,2:2,"2'":-2},nr=Je.flatMap(i=>tr.map(e=>i+e));function la(i){let e=i.match(/^[A-Z]+/)[0];return e+{"":"'","'":"",2:"2'","2'":"2"}[i.slice(e.length)]}function sm(i,e){let t=[],n=[];for(let[s,r,a]of[[En,ca,t],[wn,xs,n]])for(let o=0;o<s.length;o++){let c=s[o];if(!c.includes(i))continue;let l=c.map(f=>$l(i,f,e)),h=r(l),u=[...l].sort(Qs);a.push({from:o,to:h,orient:c.map(f=>u.indexOf($l(i,f,e)))})}return{edges:t,corners:n}}var Zl=(i,e)=>({from:Int8Array.from(i.map(t=>t.from)),to:Int8Array.from(i.map(t=>t.to)),orient:Int8Array.from(i.flatMap(t=>t.orient)),ancho:e,n:i.length}),rm=(()=>{let i=new Map;for(let e of Je)for(let t of tr){let n=sm(e,im[t]);i.set(e+t,{edges:Zl(n.edges,2),corners:Zl(n.corners,3)})}return i})(),jl=new Int8Array(16),Jl=new Int8Array(16);function ir(){return{ep:En.map((i,e)=>e),eo:En.map(()=>0),cp:wn.map((i,e)=>e),co:wn.map(()=>0)}}var sr=i=>({ep:[...i.ep],eo:[...i.eo],cp:[...i.cp],co:[...i.co]});function An(i,e){let t=rm.get(e);if(!t)return!1;for(let[n,s,r]of[[i.ep,i.eo,t.edges],[i.cp,i.co,t.corners]]){for(let a=0;a<r.n;a++)jl[a]=n[r.from[a]],Jl[a]=s[r.from[a]];for(let a=0;a<r.n;a++)n[r.to[a]]=jl[a],s[r.to[a]]=r.orient[a*r.ancho+Jl[a]]}return!0}var om=(()=>{let i=new si,e=new Map;for(let t of i.getPieces())t.kind!=="center"&&e.set(t.name,t.stickers.map(n=>n.face).sort(Qs));return e})();function Kl(i){let e=ir();for(let t of i.getPieces()){if(t.kind==="center")continue;let n=om.get(t.name),s=t.stickers.map(o=>({marca:o.face,cara:i._faceOf(o)})),r=s.map(o=>o.cara).sort(Qs),a=s.find(o=>o.marca===n[0]).cara;if(t.kind==="edge"){let o=ca(r);e.ep[o]=ca(n),e.eo[o]=r.indexOf(a)}else{let o=xs(r);e.cp[o]=xs(n),e.co[o]=r.indexOf(a)}}return e}var Ql=i=>En[i],eh=i=>wn[i];var oi="U",cm=(i,e)=>e.kind==="edge"?i.ep[e.i]===e.i&&i.eo[e.i]===0:i.cp[e.i]===e.i&&i.co[e.i]===0,nh=(i,e)=>(e.kind==="edge"?i.ep:i.cp).indexOf(e.i),th=(i,e)=>i==="edge"?Ql(e):eh(e),or=new Map(nr.map(i=>[i,i.match(/^[A-Z]+/)[0]])),da=i=>i.flatMap(e=>tr.map(t=>e+t));function ar(i,e,t,n,s,r,a){if(a(i,r))return!0;if(n===0)return!1;for(let o=0;o<e.length;o++){if(t[o]===s)continue;An(i,e[o]),r.push(e[o]);let c=ar(i,e,t,n-1,t[o],r,a);if(r.pop(),An(i,la(e[o])),c)return!0}return!1}function lm(i,e,t,n){let s=e.map(o=>or.get(o)),r=null,a=(o,c)=>t(o)&&(r=[...c],!0);for(let o=0;o<=n&&!r;o++)ar(i,e,s,o,null,[],a);return r}function ih(i){let e=new Int8Array(En.length).fill(-1),t=new Int8Array(wn.length).fill(-1),n=0;for(let r of i)(r.kind==="edge"?e:t)[r.i]=n++;let s=new Array(2*n);return r=>{for(let a=0;a<r.ep.length;a++){let o=e[r.ep[a]];o>=0&&(s[2*o]=a,s[2*o+1]=r.eo[a])}for(let a=0;a<r.cp.length;a++){let o=t[r.cp[a]];o>=0&&(s[2*o]=a,s[2*o+1]=r.co[a])}return String.fromCharCode.apply(null,s)}}function ha(i,e,t,n=3,s=3){let r=ih(t),a=e.map(f=>or.get(f)),o=new Map,c=ir(),l=(f,d)=>{let g=r(f);return o.has(g)||o.set(g,[...d]),!1};for(let f=0;f<=n;f++)ar(c,e,a,f,null,[],l);let h=null,u=(f,d)=>{let g=o.get(r(f));return g?(h=[...d,...g.slice().reverse().map(la)],!0):!1};for(let f=0;f<=s&&!h;f++)ar(i,e,a,f,null,[],u);return h}var sh=[{caras:null,atras:0,alante:2},{caras:null,atras:3,alante:3},{caras:"hueco",atras:4,alante:4},{caras:"cuna",atras:4,alante:5},{caras:"region",atras:4,alante:4},{caras:"cuna",atras:5,alante:6},{caras:"hueco",atras:4,alante:5},{caras:"region",atras:4,alante:5},{caras:"hueco",atras:5,alante:5}],rr=new Map,ua=new Map;function hm(i){if(!ua.has(i)){let e=ri(i),t=[];for(let n of e)for(let s of e)n<s&&sn(n,s)&&t.push([i,n,s]);ua.set(i,t)}return ua.get(i)}function um(i,e,t,n,s){let r=[e,...t],a=s+"|"+r.map(d=>d.kind[0]+d.i).join(",")+"|"+ih(r)(i);if(rr.has(a))return rr.get(a);let o=d=>(rr.set(a,d),d),{caras:c,atras:l,alante:h}=sh[s];if(!c)return o(l?ha(i,nr,r,l,h):lm(i,nr,g=>r.every(_=>cm(g,_)),h));if(c==="cuna"){for(let d of hm(n)){let g=ha(i,da(d),r,l,h);if(g)return o(g)}return o(null)}let u=nh(i,e),f=c==="region"?[n,...ri(n)]:[...new Set([n,...th(e.kind,e.i),...th(e.kind,u)])];return o(ha(i,da(f),r,l,h))}async function fm(i,e,t,n,s,r,a){let o=[...t],c=[];for(let l=0;l<e.length;l++){let h=e.filter(f=>!o.some(d=>d.kind===f.kind&&d.i===f.i));if(!l&&s&&(h=[s]),r&&h.every(f=>nh(i,f)===f.i))return c;let u=null;for(let f=0;f<sh.length&&!u;f++)for(let d of h){a&&await a();let g=um(i,d,o,n,f);if(g&&(!u||g.length<u.secuencia.length)&&(u={meta:d,secuencia:g},!g.length))break}if(!u)return r?c:null;for(let f of u.secuencia)An(i,f);c.push(...u.secuencia),o.push(u.meta)}return c}async function dm(i,e,t,n,s=!1,r=null){let a=sr(i);rr.clear();for(let o of[null,...e]){let c=sr(a),l=await fm(c,e,t,n,o,s,r);if(l)return Object.assign(i,c),l}return null}function pm(i=oi){let e=aa(i);return Yl(e,ri(e)[0])}function mm(i,e){let t=[],n=[[]];for(let s=0;s<e;s++){let r=[];for(let a of n)for(let o of i){if(a.length&&or.get(a[a.length-1])===or.get(o))continue;let c=[...a,o];r.push(c),t.push(c)}n=r}return t}var fa=new Map;function gm(i){if(fa.has(i))return fa.get(i);let e=ri(i),t=e[0],n=e.find(c=>c!==t&&sn(c,t)),s=xs([i,t,n]),r=En.map((c,l)=>[c,l]).filter(([c])=>c.includes(i)).map(([,c])=>c),a=wn.map((c,l)=>[c,l]).filter(([c])=>c.includes(i)).map(([,c])=>c),o=null;for(let c of mm(da([t,n]),4)){let l=ir();for(let h=1;h<=6&&!o;h++){for(let f of c)An(l,f);r.every(f=>l.ep[f]===f&&l.eo[f]===0)&&a.every(f=>l.cp[f]===f&&(f===s||l.co[f]===0))&&l.co[s]&&(o={hueco:s,alg:Array.from({length:h},()=>c).flat()})}if(o)break}return fa.set(i,o),o}function _m(i,e=oi){let t=gm(e);if(!t)return null;let n=[];for(let s=0;s<5;s++){let r=null;for(let a=0;a<3&&r===null;a++){let o=sr(i);for(let l=0;l<a;l++)for(let h of t.alg)An(o,h);let c=o.cp[t.hueco];for(let l=s;l<5;l++)An(o,e);o.co[o.cp.indexOf(c)]===0&&(r=a)}if(r===null)return null;for(let a=0;a<r;a++)for(let o of t.alg)An(i,o),n.push(o);An(i,e),n.push(e)}return n}var xm=(i,e)=>i===e?0:sn(i,e)?1:i===aa(e)?3:2;function ym(i,e,t){let n=i==="edge"?En:wn,s=[...e].sort().join(""),r=[];for(let a=0;a<n.length;a++)n[a].map(o=>xm(o,t)).sort().join("")===s&&r.push({kind:i,i:a});return r}var pa=(i=oi)=>{let e=pm(i).U;return[{nombre:"estrella",rotulo:"first star",kind:"edge",alturas:[0,1],desde:i},{nombre:"esquinas de la 1\xAA capa",rotulo:"first layer corners",kind:"corner",alturas:[0,1,1],desde:i},{nombre:"aristas de la 2\xAA fila",rotulo:"second row of edges",kind:"edge",alturas:[1,1],desde:i},{nombre:"esquinas de la 3\xAA fila",rotulo:"third row of corners",kind:"corner",alturas:[1,1,2],desde:e},{nombre:"aristas junto a esquina",rotulo:"edges next to corners",kind:"edge",alturas:[1,2],desde:e},{nombre:"esquinas pen\xFAltimas",rotulo:"next-to-last corners",kind:"corner",alturas:[1,2,2],desde:e},{nombre:"aristas pen\xFAltimas",rotulo:"next-to-last edges",kind:"edge",alturas:[2,2],desde:e},{nombre:"aristas de la \xFAltima capa",rotulo:"last layer edges",kind:"edge",alturas:[2,3],desde:e},{nombre:"esquinas de la \xFAltima capa",rotulo:"last layer corners",kind:"corner",alturas:[2,2,3],desde:e,parcial:!0},{nombre:"girar las \xFAltimas esquinas",rotulo:"twisting the corners",kind:"corner",alturas:[2,2,3],desde:e,giro:!0}].map(t=>({...t,piezas:ym(t.kind,t.alturas,i)}))};var vm=(i,e=oi)=>pa(e)[i-1].rotulo,rh=pa().length;async function Mm(i,e,t=oi,n=null){let s=pa(t),r=s[e-1];if(r.giro)return _m(i,r.desde);let a=[];for(let o of s.slice(0,e-1))for(let c of o.piezas)a.some(l=>l.kind===c.kind&&l.i===c.i)||a.push(c);return dm(i,r.piezas,a,r.desde,r.parcial,n)}async function Sm(i,e=rh,t=oi,{aviso:n,respira:s}={}){let r=[];for(let a=1;a<=e;a++){n&&await n(a,vm(a,t));let o=await Mm(i,a,t,s);if(!o)return null;r.push(...o)}return r}var oh=(i,e=oi,t)=>Sm(i,rh,e,t);var yt=Object.freeze(["U","L","R","B"]),cr=Object.freeze(yt.flatMap(i=>[i,i+"'"])),bm=Object.freeze(yt.flatMap(i=>[i.toLowerCase(),i.toLowerCase()+"'"])),Hn=Object.freeze((()=>{let i=[];for(let e=0;e<yt.length;e++)for(let t=e+1;t<yt.length;t++)i.push([yt[e],yt[t]]);return i})()),Em=new Map(Hn.map((i,e)=>[i.join(""),e])),ma=new Map(yt.map((i,e)=>[i,e])),wm=(i,e)=>ma.get(i)-ma.get(e),ah=i=>Em.get([...i].sort(wm).join("")),Am=new Map(Object.entries($o).map(([i,e])=>[e,i])),Tm=i=>yt.filter(e=>e!==i);function ga(i){let e={ep:new Int8Array(Hn.length),eo:new Int8Array(Hn.length),co:new Int8Array(yt.length),to:new Int8Array(yt.length)};for(let t of i.getPieces()){let n=t.stickers.map(r=>i._faceOf(r)),s=t.stickers.map(r=>Am.get(r.color));if(t.kind==="edge"){let r=ah(n),a=ah(s),[o]=Hn[r],[c]=Hn[a],l=n.indexOf(o);e.ep[r]=a,e.eo[r]=s[l]===c?0:1}else{let r=t.name[0],a=Tm(r),o=n.indexOf(a[0]),c=(a.indexOf(s[o])-0+3)%3;(t.kind==="tip"?e.to:e.co)[ma.get(r)]=c}}return e}var ch=()=>({ep:Int8Array.from([0,1,2,3,4,5]),eo:new Int8Array(6),co:new Int8Array(4),to:new Int8Array(4)}),Rm=new Map([...cr,...bm].map(i=>{let e=new Ai;return e.applyMove(i),[i,ga(e)]})),_a=i=>i.endsWith("'")?i.slice(0,-1):i+"'",lh=i=>i[0].toUpperCase();function Tn(i,e){let t=Rm.get(e);if(!t)return!1;let n=i.ep.slice(),s=i.eo.slice();for(let r=0;r<n.length;r++){let a=t.ep[r];i.ep[r]=n[a],i.eo[r]=s[a]+t.eo[r]&1}for(let r=0;r<yt.length;r++)i.co[r]=(i.co[r]+t.co[r])%3,i.to[r]=(i.to[r]+t.to[r])%3;return!0}var lr=i=>({ep:i.ep.slice(),eo:i.eo.slice(),co:i.co.slice(),to:i.to.slice()}),xa=i=>i.co.every(e=>e===0),Cm=i=>i.ep.every((e,t)=>e===t)&&i.eo.every(e=>e===0),hh=i=>xa(i)&&Cm(i)&&i.to.every(e=>e===0);var Lm="U",ph=Hn.map((i,e)=>[i,e]).filter(([i])=>i.includes(Lm)).map(([,i])=>i),Im=Hn.map((i,e)=>e).filter(i=>!ph.includes(i)),uh=new Map(cr.map(i=>[i,lh(i)]));function hr(i,e,t,n,s){if(s(i,n))return!0;if(e===0)return!1;for(let r of cr){if(uh.get(r)===t)continue;Tn(i,r),n.push(r);let a=hr(i,e-1,uh.get(r),n,s);if(n.pop(),Tn(i,_a(r)),a)return!0}return!1}function Um(i){let e=new Array(2*i.length+yt.length);return t=>{for(let n=0;n<i.length;n++){let s=t.ep.indexOf(i[n]);e[2*n]=s,e[2*n+1]=t.eo[s]}for(let n=0;n<t.co.length;n++)e[2*i.length+n]=t.co[n];return String.fromCharCode.apply(null,e)}}function Dm(i,e,t=3,n=4){let s=Um(e),r=new Map,a=ch(),o=(h,u)=>{let f=s(h);return r.has(f)||r.set(f,[...u]),!1};for(let h=0;h<=t;h++)hr(a,h,null,[],o);let c=null,l=(h,u)=>{let f=r.get(s(h));return f?(c=[...u,...f.slice().reverse().map(_a)],!0):!1};for(let h=0;h<=n&&!c;h++)hr(i,h,null,[],l);return c}var Nm=[{atras:0,alante:3},{atras:3,alante:3},{atras:4,alante:4},{atras:5,alante:5},{atras:6,alante:6}];function fh(i,e){for(let{atras:t,alante:n}of Nm){let s=t===0?Om(i,e,n):Dm(i,e,t,n);if(s)return s}return null}function Om(i,e,t){let n=a=>xa(a)&&e.every(o=>a.ep[o]===o&&a.eo[o]===0),s=null,r=(a,o)=>n(a)&&(s=[...o],!0);for(let a=0;a<=t&&!s;a++)hr(i,a,null,[],r);return s}function Fm(i){let e=[];for(let t=0;t<yt.length;t++){if(i.co[t]===0)continue;let n=yt[t];for(let s of[n,n+"'"]){let r=lr(i);if(Tn(r,s),r.co[t]===0){Tn(i,s),e.push(s);break}}if(i.co[t]!==0)return null}return e}function dh(i,e,t){let n=[],s=[];if(!t){let r=fh(i,e);if(!r)return null;for(let a of r)Tn(i,a);return r}for(;s.length<e.length;){let r=null;for(let a of e){if(s.includes(a))continue;let o=fh(i,[...s,a]);if(o&&(!r||o.length<r.secuencia.length)&&(r={hueco:a,secuencia:o},!o.length))break}if(!r)return null;for(let a of r.secuencia)Tn(i,a);n.push(...r.secuencia),s.push(r.hueco)}return n}function zm(i){let e=[];for(let t=0;t<yt.length;t++){if(i.to[t]===0)continue;let n=yt[t].toLowerCase();for(let s of[n,n+"'"]){let r=lr(i);if(Tn(r,s),r.to[t]===0){Tn(i,s),e.push(s);break}}if(i.to[t]!==0)return null}return e}var Bm=Object.freeze([{nombre:"centros",correr:i=>Fm(i)},{nombre:"capa de abajo",correr:i=>dh(i,ph,!0)},{nombre:"pir\xE1mide peque\xF1a",correr:i=>dh(i,Im,!1)},{nombre:"puntas",correr:i=>zm(i)}]);function mh(i,{aviso:e=null}={}){let t=i?.getPieces?ga(i):lr(i),n=[];for(let s of Bm){e&&e(s.nombre);let r=s.correr(t);if(!r)return null;n.push(...r)}return hh(t)?n:null}var xh=["","'","2"],gh=["U","D","R","L","F","B"].flatMap(i=>xh.map(e=>i+e)),km=i=>["r","l","u","d","f","b",...i%2?["M","E","S"]:[]].flatMap(e=>xh.map(t=>e+t)),ys=i=>i.endsWith("2")?i:i.endsWith("'")?i.slice(0,-1):`${i}'`,Hm=i=>i.trim().split(/\s+/).filter(Boolean).reverse().map(ys).join(" "),ur=i=>`${i.x.toFixed(1)},${i.y.toFixed(1)},${i.z.toFixed(1)}`;function Ma(i,e,t){for(let n of(e??"").trim().split(/\s+/))n&&(i.applyMove(n),t?.push(n))}var Sa=(i,e)=>[i.x,i.y,i.z].filter(t=>Math.abs(Math.abs(t)-e)<1e-6).length===1;function yh(i,e){return Math.abs(i.y-e)<1e-6?"py":Math.abs(i.y+e)<1e-6?"ny":Math.abs(i.x-e)<1e-6?"px":Math.abs(i.x+e)<1e-6?"nx":Math.abs(i.z-e)<1e-6?"pz":"nz"}function _h(i,e){let t=new Rt(i),n=(i-1)/2,r=t.getPieces().map(o=>({piece:o,from:{...o.position}}));Ma(t,e);let a=new Map;for(let{piece:o,from:c}of r)Sa(c,n)&&a.set(ur(c),ur(o.position));return a}var ya=new Map;function Vm(i){if(ya.has(i))return ya.get(i);let e=km(i),t=[];for(let c of e)for(let l of gh)for(let h of e){let u=`${c} ${l} ${h} ${ys(l)} ${ys(c)} ${l} ${ys(h)} ${ys(l)}`,d=[..._h(i,u)].filter(([g,_])=>g!==_);d.length===3&&t.push({alg:u,moved:d})}let n=[];for(let c of["",...e,...gh]){let l=c?_h(i,c):null,h=l?new Map([...l].map(([u,f])=>[f,u])):null;for(let u of t)n.push({alg:c?`${c} ${u.alg} ${Hm(c)}`:u.alg,moved:h?u.moved.map(([f,d])=>[h.get(f),h.get(d)]):u.moved})}let s=(i-1)/2,r=new Map,a=(c,l,h)=>{let u=vh(l.moved[0][0],s);r.has(u)||r.set(u,{clave:u,base:[],macros:[],places:new Set}),r.get(u)[h].push(l);for(let[f,d]of l.moved)r.get(u).places.add(f),r.get(u).places.add(d)};for(let c of t)a(null,c,"base");for(let c of n)a(null,c,"macros");let o={base:t,macros:n,target:Gm(i),orbits:[...r.values()]};return ya.set(i,o),o}var vh=(i,e)=>i.split(",").map(Number).filter(t=>Math.abs(Math.abs(t)-e)>1e-6).map(t=>Math.abs(t)).sort().join("|");function Gm(i){let e=new Rt(i),t=(i-1)/2,n=new Map;for(let s of e.getPieces())Sa(s.position,t)&&n.set(ur(s.position),s.faces[yh(s.position,t)]);return n}var Mh=(i,e)=>{let t=new Map;for(let n of i.getPieces())Sa(n.position,e)&&t.set(ur(n.position),n.faces[yh(n.position,e)]);return t};function va(i,e,t){let n=0;for(let[s,r]of e)n+=(i.get(s)===t.get(r)?1:0)-(i.get(r)===t.get(r)?1:0);return n}var Wm=(i,e)=>{let t=new Map(i);for(let[n,s]of e)t.set(s,i.get(n));return t};function vs(i,e,t=60){if(i.n!==4&&i.n!==5)return!1;let n=(i.n-1)/2,{target:s,orbits:r}=Vm(i.n);if(!Xm(i,e,n,s))return!1;for(let a of r)if(!Ym(i,e,n,s,a,t))return!1;return!0}function Xm(i,e,t,n){if(i.n%2===0)return!0;let s=()=>[...Mh(i,t)].every(([l,h])=>vh(l,t)!=="0|0"||h===n.get(l));if(s())return!0;let r=["M","M'","M2","E","E'","E2","S","S'","S2"],a=[],o=c=>{if(s())return!0;if(c===0)return!1;for(let l of r){if(i.applyMove(l),a.push(l),o(c-1))return!0;a.pop(),i.applyInverse(l)}return!1};for(let c=1;c<=3;c++){if(o(c))return e?.push(...a),!0;a.length=0}return!1}function Ym(i,e,t,n,{base:s,macros:r,places:a},o){let c=l=>[...a].every(h=>l.get(h)===n.get(h));for(let l=0;l<o;l++){let h=Mh(i,t);if(c(h))return!0;let u=null;for(let d of r){let g=va(h,d.moved,n);if((!u||g>u.g)&&(u={g,alg:d.alg},g===3))break}if(u&&u.g>0){Ma(i,u.alg,e);continue}let f=null;for(let d of s){let g=Wm(h,d.moved),_=va(h,d.moved,n);for(let m of r){let p=_+va(g,m.moved,n);if((!f||p>f.g)&&(f={g:p,alg:`${d.alg} ${m.alg}`},p>=4))break}if(f&&f.g>=4)break}if(!f||f.g<=0)return!1;Ma(i,f.alg,e)}return!1}var bh=["","'","2"],fr=["U","D","R","L","F","B"].flatMap(i=>bh.map(e=>i+e)),Eh={x:["nx","px"],y:["ny","py"],z:["nz","pz"]},wh=i=>i.endsWith("2")?i:i.endsWith("'")?i.slice(0,-1):`${i}'`,dr=i=>(i??"").trim().split(/\s+/).filter(Boolean),Ah=i=>dr(i).reverse().map(wh).join(" ");function Gt(i,e,t){for(let n of dr(e))i.applyMove(n),t?.push(n)}var Th=(i,e)=>{let t=dr(e);for(let n=t.length-1;n>=0;n--)i.applyInverse(t[n])},Pi=i=>(i.n-1)/2,ai=(i,e)=>Math.abs(Math.abs(i)-e)<1e-6,Rn=(i,e)=>[i.x,i.y,i.z].filter(t=>ai(t,e)).length===2;function pr(i,e){let t=[];for(let n of["x","y","z"]){let s=i.position[n];if(!ai(s,e))continue;let r=Eh[n][s>0?1:0];t.push([r,i.faces[r]])}return t}var Rh=(i,e)=>["x","y","z"].map(t=>ai(i.position[t],e)?Math.sign(i.position[t]):0).join(",");function mr(i){let e=Pi(i),t=new Map;for(let n of Ch(i)){let s=Rh(n,e);t.has(s)||t.set(s,[]),t.get(s).push(n)}return t}var Sh=new WeakMap;function Ch(i){let e=Sh.get(i);if(e)return e;let t=Pi(i),n=i.getPieces().filter(s=>Rn(s.position,t));return Sh.set(i,n),n}var Aa=(i,e)=>pr(i,e).map(([t,n])=>`${t}${n}`).sort().join("|"),Ta=(i,e)=>i.every(t=>Aa(t,e)===Aa(i[0],e));function ba(i){let e=Pi(i),t=new Map;for(let s of Ch(i)){let r=Rh(s,e),a=t.get(r);a||t.set(r,a=[]),a.push(Aa(s,e))}let n=0;for(let s of t.values()){let r=0;for(let a of s){let o=0;for(let c of s)c===a&&o++;o>r&&(r=o)}n+=r-1}return n}var gr=i=>{let e=Pi(i),t=0;for(let n of mr(i).values())Ta(n,e)&&t++;return t},Ea=new Map;function Ra(i,e,t){let n=`${t}:${i}`;if(Ea.has(n))return Ea.get(n);let s=[""];for(let a=0;a<i;a++){let o=[];for(let c of s){let l=dr(c).at(-1)?.[0];for(let h of fr)h[0]!==l&&o.push(c?`${c} ${h}`:h)}s=o}let r=[];for(let a of s)for(let o of e)r.push(a?`${a} ${o} ${Ah(a)}`:o);return Ea.set(n,r),r}var wa=new Map;function Ph(i,e){if(wa.has(i))return wa.get(i);let t=(i-1)/2,n=["r","l","u","d","f","b",...i%2?["M","E","S"]:[]].flatMap(d=>bh.map(g=>d+g)),s=[];for(let d of fr)for(let g of fr)if(d[0]!==g[0])for(let _ of fr)g[0]!==_[0]&&s.push(`${d} ${g} ${_}`);let r=new e(i),a=d=>[d.x,d.y,d.z].filter(g=>ai(g,t)).length===1;r.cubies=r.cubies.filter(d=>Rn(d.position,t)||a(d.position));let o=d=>`${d.position.x},${d.position.y},${d.position.z}`,c=r.cubies.map(d=>({arista:Rn(d.position,t),sitio:o(d)})),l=d=>{for(let g of["x","y","z"]){let _=d.position[g];if(ai(_,t))return d.faces[Eh[g][_>0?1:0]]}return null},h=new Map;for(let d of r.cubies)Rn(d.position,t)||h.set(o(d),l(d));let u=()=>{for(let d of r.cubies)if(!Rn(d.position,t)&&h.get(o(d))!==l(d))return!1;return!0},f=[];for(let d of n)for(let g of s){let _=`${d} ${g} ${wh(d)} ${Ah(g)}`;Gt(r,_);let m=0;for(let b=0;b<r.cubies.length&&m<=3;b++)c[b].arista&&o(r.cubies[b])!==c[b].sitio&&m++;let p=m===3&&u();Th(r,_),p&&f.push(_)}return wa.set(i,f),f}function _r(i,e,{niveles:t,limit:n=80,paciencia:s=3}){let r=12*(mr(i).values().next().value.length-1),a=1,o=u=>(a=a*1103515245+12345&2147483647)%u,c=i.clone();c.cubies=c.cubies.filter(u=>Rn(u.position,Pi(i)));let l=u=>{Gt(c,u),Gt(i,u,e)},h=0;for(let u=0;u<n;u++){let f=ba(c);if(f===r)return!0;let d=null,g=t.map(()=>[]);for(let m=0;m<t.length&&!d;m++){let{depth:p,bases:b,marca:y,sacude:T}=t[m];for(let L of Ra(p,b,y)){Gt(c,L);let R=ba(c);if(Th(c,L),R>f&&(!d||R>d.after)?d={after:R,alg:L}:R===f&&T&&g[m].push(L),d&&d.after===r)break}}if(d){l(d.alg),h=0;continue}let _=g.map((m,p)=>({algs:m,rango:t[p].sacude??1/0})).filter(m=>m.algs.length).sort((m,p)=>m.rango-p.rango).flatMap(m=>m.algs);if(!_.length||++h>s)return!1;l(_[o(_.length)])}return ba(c)===r}function xr(i,e){let t=Pi(i),n=new e(3),s=r=>ai(r,t)?Math.sign(r):0;for(let r of i.getPieces()){let{x:a,y:o,z:c}=r.position;if(![a,o,c].every(u=>ai(u,t))&&!Rn(r.position,t))continue;let h=n.getPieces().find(u=>u.position.x===s(a)&&u.position.y===s(o)&&u.position.z===s(c));if(!h)return null;for(let[u,f]of pr(r,t)){if(!f)return null;h.setFaceColor(u,f)}}return n}var yr=i=>i.filter(e=>/^[UDRLFB](2|'|)$/.test(e));var Uh="u R F' U R' F u'",vr=Object.freeze(["(Rr)' U' R' U (Rr)","(Ll) U L U' (Ll)'",Uh,"(Rr) U R U' (Rr)'","(Ll)' U' L U (Ll)"]),qm=Object.freeze([{depth:0,bases:vr,marca:"juntar4"},{depth:1,bases:vr,marca:"juntar4",sacude:1},{depth:2,bases:vr,marca:"juntar4"},{depth:3,bases:vr,marca:"juntar4"},{depth:4,bases:[Uh],marca:"ultimas4"}]),Lh="(Rr)2 B2 U2 (Ll) U2 (Rr)' U2 (Rr) U2 F2 (Rr) F2 (Ll)' B2 (Rr)2",Ih="r2 U2 r2 (Uu)2 r2 u2",$m=Object.freeze(["",Lh,Ih,`${Lh} ${Ih}`]),Zm=(i,e)=>_r(i,e,{niveles:qm}),jm=i=>xr(i,Rt);function Dh(i,{aviso:e=null}={}){if(i.n!==4)return null;let t=i.clone(),n=[];if(e?.("centros"),!vs(t,n)||(e?.("aristas"),!Zm(t,n)))return null;e?.("3\xD73\xD73");for(let s of $m){let r=t.clone();if(Gt(r,s),gr(r)!==12)continue;let a=jm(r),o=a&&Ci(a);if(!o?.solved)continue;let c=yr(o.moves);return c.length!==o.moves.length?null:(Gt(t,s,n),Gt(t,c.join(" "),n),{moves:n,solved:t.isSolved(),state:t})}return null}var Mr=Object.freeze(["(Ll) U L U' (Ll)'","(Rr)' U' R' U (Rr)","(Ll)' U' L U (Ll)","(Rr) U R U' (Rr)'","l U L U' l'","r' U' R' U r","M U L U' M'","M' U' R' U M"]),Jm=Object.freeze(["(Ll) U L U' F' U' F U (Ll)'","(Rr)' U' R' U F U F' U' (Rr)","u R F' U R' F u'","l U L U' F' U' F U l'","r' U' R' U F U F' U' r","M U L U' F' U' F U M'","M' U' R' U F U F' U' M"]),Nh="(Rr)2 B2 U2 (Ll) U2 (Rr)' U2 (Rr) U2 F2 (Rr) F2 (Ll)' B2 (Rr)2",Km=null,Qm=()=>Km??(Km=[{depth:0,bases:Mr,marca:"juntar5"},{depth:1,bases:Mr,marca:"juntar5",sacude:2},{depth:2,bases:Mr,marca:"juntar5"},{depth:0,bases:Ph(5,Rt),marca:"ciclos5"},{depth:3,bases:Mr,marca:"juntar5"},{depth:3,bases:Jm,marca:"ultimas5"},{depth:2,bases:[Nh],marca:"orientar5",sacude:1}]),eg=Object.freeze(["",Nh]),tg=(i,e)=>_r(i,e,{niveles:Qm()});function ng(i,e,t){let n=["r","u","f","r'","u'","f'"];for(let s=0;s<=n.length;s++){if(tg(i,e))return!0;if(s===n.length||(t?.("paridad de alas"),Gt(i,n[s],e),!vs(i,e)))return!1}return!1}var ig=i=>xr(i,Rt);function Oh(i,{aviso:e=null}={}){if(i.n!==5)return null;let t=i.clone(),n=[];if(e?.("centros"),!vs(t,n)||(e?.("aristas"),!ng(t,n,e)))return null;e?.("3\xD73\xD73");for(let s of eg){let r=t.clone();if(Gt(r,s),gr(r)!==12)continue;let a=ig(r),o=a&&Ci(a);if(!o?.solved)continue;let c=yr(o.moves);return c.length!==o.moves.length?null:(Gt(t,s,n),Gt(t,c.join(" "),n),{moves:n,solved:t.isSolved(),state:t})}return null}var sg=Math.PI;function rg(i){return i===1?1:i===2?2:i===3?-1:0}function Sr(i,e,t=1){let n=i.getRotationAxis(e.face);if(n&&typeof n.axis=="string"){let r=rg(e.times);return{axis:n.axis,angle:t*n.sign*r*(sg/2)}}let s=i.getAnglePerMove();return{axis:{x:n.x,y:n.y,z:n.z},angle:t*e.times*s}}var bi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ei={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},og=0,Fh=1,ag=2;var mf=1,cg=2,Dn=3,en=0,Ot=1,ln=2;var jn=0,Qi=1,zh=2,Bh=3,kh=4,lg=5,di=100,hg=101,ug=102,Hh=103,Vh=104,fg=200,dg=201,pg=202,mg=203,cc=204,lc=205,gg=206,_g=207,xg=208,yg=209,vg=210,Mg=211,Sg=212,bg=213,Eg=214,wg=0,Ag=1,Tg=2,Qr=3,Rg=4,Cg=5,Pg=6,Lg=7,gf=0,Ig=1,Ug=2,Jn=0,Dg=1,Ng=2,Og=3,Fg=4,zg=5,Bg=6;var _f=300,is=301,ss=302,hc=303,uc=304,Ro=306,fc=1e3,hn=1001,dc=1002,It=1003,Gh=1004;var Ca=1005;var Jt=1006,kg=1007;var Ls=1008;var Kn=1009,Hg=1010,Vg=1011,qc=1012,xf=1013,qn=1014,$n=1015,Is=1016,yf=1017,vf=1018,mi=1020,Gg=1021,un=1023,Wg=1024,Xg=1025,gi=1026,rs=1027,Yg=1028,Mf=1029,qg=1030,Sf=1031,bf=1033,Pa=33776,La=33777,Ia=33778,Ua=33779,Wh=35840,Xh=35841,Yh=35842,qh=35843,Ef=36196,$h=37492,Zh=37496,jh=37808,Jh=37809,Kh=37810,Qh=37811,eu=37812,tu=37813,nu=37814,iu=37815,su=37816,ru=37817,ou=37818,au=37819,cu=37820,lu=37821,Da=36492,hu=36494,uu=36495,$g=36283,fu=36284,du=36285,pu=36286;var eo=2300,to=2301,Na=2302,mu=2400,gu=2401,_u=2402;var wf=3e3,_i=3001,Zg=3200,jg=3201,Af=0,Jg=1,Kt="",vt="srgb",Fn="srgb-linear",$c="display-p3",Co="display-p3-linear",no="linear",nt="srgb",io="rec709",so="p3";var Li=7680;var xu=519,Kg=512,Qg=513,e_=514,Tf=515,t_=516,n_=517,i_=518,s_=519,pc=35044;var yu="300 es",mc=1035,Nn=2e3,ro=2001,yn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vu=1234567,es=Math.PI/180,Us=180/Math.PI;function On(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function wt(i,e,t){return Math.max(e,Math.min(t,i))}function Zc(i,e){return(i%e+e)%e}function r_(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function o_(i,e,t){return i!==e?(t-i)/(e-i):0}function Rs(i,e,t){return(1-t)*i+t*e}function a_(i,e,t,n){return Rs(i,e,1-Math.exp(-t*n))}function c_(i,e=1){return e-Math.abs(Zc(i,e*2)-e)}function l_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function h_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function u_(i,e){return i+Math.floor(Math.random()*(e-i+1))}function f_(i,e){return i+Math.random()*(e-i)}function d_(i){return i*(.5-Math.random())}function p_(i){i!==void 0&&(vu=i);let e=vu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function m_(i){return i*es}function g_(i){return i*Us}function gc(i){return(i&i-1)===0&&i!==0}function __(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function oo(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function x_(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),f=a((e-n)/2),d=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*u,c*f,o*l);break;case"YZY":i.set(c*f,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*f,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*d,o*l);break;case"YXY":i.set(c*d,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*d,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function xn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ke(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Rf={DEG2RAD:es,RAD2DEG:Us,generateUUID:On,clamp:wt,euclideanModulo:Zc,mapLinear:r_,inverseLerp:o_,lerp:Rs,damp:a_,pingpong:c_,smoothstep:l_,smootherstep:h_,randInt:u_,randFloat:f_,randFloatSpread:d_,seededRandom:p_,degToRad:m_,radToDeg:g_,isPowerOfTwo:gc,ceilPowerOfTwo:__,floorPowerOfTwo:oo,setQuaternionFromProperEuler:x_,normalize:Ke,denormalize:xn},be=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},We=class i{constructor(e,t,n,s,r,a,o,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=s[0],m=s[3],p=s[6],b=s[1],y=s[4],T=s[7],L=s[2],R=s[5],A=s[8];return r[0]=a*_+o*b+c*L,r[3]=a*m+o*y+c*R,r[6]=a*p+o*T+c*A,r[1]=l*_+h*b+u*L,r[4]=l*m+h*y+u*R,r[7]=l*p+h*T+u*A,r[2]=f*_+d*b+g*L,r[5]=f*m+d*y+g*R,r[8]=f*p+d*T+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,f=o*c-h*r,d=l*r-a*c,g=t*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=f*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Oa.makeScale(e,t)),this}rotate(e){return this.premultiply(Oa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Oa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Oa=new We;function Cf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ao(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function y_(){let i=ao("canvas");return i.style.display="block",i}var Mu={};function Cs(i){i in Mu||(Mu[i]=!0,console.warn(i))}var Su=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),bu=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),br={[Fn]:{transfer:no,primaries:io,toReference:i=>i,fromReference:i=>i},[vt]:{transfer:nt,primaries:io,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Co]:{transfer:no,primaries:so,toReference:i=>i.applyMatrix3(bu),fromReference:i=>i.applyMatrix3(Su)},[$c]:{transfer:nt,primaries:so,toReference:i=>i.convertSRGBToLinear().applyMatrix3(bu),fromReference:i=>i.applyMatrix3(Su).convertLinearToSRGB()}},v_=new Set([Fn,Co]),Qe={enabled:!0,_workingColorSpace:Fn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!v_.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=br[e].toReference,s=br[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return br[i].primaries},getTransfer:function(i){return i===Kt?no:br[i].transfer}};function ts(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fa(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Ii,co=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ii===void 0&&(Ii=ao("canvas")),Ii.width=e.width,Ii.height=e.height;let n=Ii.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ii}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ao("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ts(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ts(t[n]/255)*255):t[n]=ts(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},M_=0,lo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:M_++}),this.uuid=On(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(za(s[a].image)):r.push(za(s[a]))}else r=za(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function za(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?co.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var S_=0,tn=class i extends yn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=hn,s=hn,r=Jt,a=Ls,o=un,c=Kn,l=i.DEFAULT_ANISOTROPY,h=Kt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:S_++}),this.uuid=On(),this.name="",this.source=new lo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Cs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===_i?vt:Kt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_f)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fc:e.x=e.x-Math.floor(e.x);break;case hn:e.x=e.x<0?0:1;break;case dc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fc:e.y=e.y-Math.floor(e.y);break;case hn:e.y=e.y<0?0:1;break;case dc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Cs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===vt?_i:wf}set encoding(e){Cs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===_i?vt:Kt}};tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=_f;tn.DEFAULT_ANISOTROPY=1;var _t=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,T=(d+1)/2,L=(p+1)/2,R=(h+f)/4,A=(u+_)/4,X=(g+m)/4;return y>T&&y>L?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=R/n,r=A/n):T>L?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=R/s,r=X/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=A/r,s=X/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-_)/b,this.z=(f-h)/b,this.w=Math.acos((l+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},_c=class extends yn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t);let s={width:e,height:t,depth:1};n.encoding!==void 0&&(Cs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===_i?vt:Kt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new tn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new lo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},zn=class extends _c{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ho=class extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var xc=class extends tn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ft=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[a+0],d=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==f||l!==d||h!==g){let m=1-o,p=c*f+l*d+h*g+u*_,b=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let L=Math.sqrt(y),R=Math.atan2(L,p*b);m=Math.sin(m*R)/L,o=Math.sin(o*R)/L}let T=o*b;if(c=c*m+f*T,l=l*m+d*T,h=h*m+g*T,u=u*m+_*T,m===1-o){let L=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=L,l*=L,h*=L,u*=L}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*d-l*f,e[t+1]=c*g+h*f+l*u-o*d,e[t+2]=l*g+h*d+o*f-c*u,e[t+3]=h*g-o*u-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u+f*d*g;break;case"YZX":this._x=f*h*u+l*d*g,this._y=l*d*u+f*h*g,this._z=l*h*g-f*d*u,this._w=l*h*u-f*d*g;break;case"XZY":this._x=f*h*u-l*d*g,this._y=l*d*u-f*h*g,this._z=l*h*g+f*d*u,this._w=l*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+o+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Eu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Eu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ba.copy(this).projectOnVector(e),this.sub(Ba)}reflect(e){return this.sub(Ba.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ba=new P,Eu=new Ft,fn=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,rn):rn.fromBufferAttribute(r,a),rn.applyMatrix4(e.matrixWorld),this.expandByPoint(rn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Er.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Er.copy(n.boundingBox)),Er.applyMatrix4(e.matrixWorld),this.union(Er)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,rn),rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ms),wr.subVectors(this.max,Ms),Ui.subVectors(e.a,Ms),Di.subVectors(e.b,Ms),Ni.subVectors(e.c,Ms),Vn.subVectors(Di,Ui),Gn.subVectors(Ni,Di),ci.subVectors(Ui,Ni);let t=[0,-Vn.z,Vn.y,0,-Gn.z,Gn.y,0,-ci.z,ci.y,Vn.z,0,-Vn.x,Gn.z,0,-Gn.x,ci.z,0,-ci.x,-Vn.y,Vn.x,0,-Gn.y,Gn.x,0,-ci.y,ci.x,0];return!ka(t,Ui,Di,Ni,wr)||(t=[1,0,0,0,1,0,0,0,1],!ka(t,Ui,Di,Ni,wr))?!1:(Ar.crossVectors(Vn,Gn),t=[Ar.x,Ar.y,Ar.z],ka(t,Ui,Di,Ni,wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Cn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Cn=[new P,new P,new P,new P,new P,new P,new P,new P],rn=new P,Er=new fn,Ui=new P,Di=new P,Ni=new P,Vn=new P,Gn=new P,ci=new P,Ms=new P,wr=new P,Ar=new P,li=new P;function ka(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){li.fromArray(i,r);let o=s.x*Math.abs(li.x)+s.y*Math.abs(li.y)+s.z*Math.abs(li.z),c=e.dot(li),l=t.dot(li),h=n.dot(li);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var b_=new fn,Ss=new P,Ha=new P,Qn=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):b_.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ss.subVectors(e,this.center);let t=Ss.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ss,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ha.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ss.copy(e.center).add(Ha)),this.expandByPoint(Ss.copy(e.center).sub(Ha))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Pn=new P,Va=new P,Tr=new P,Wn=new P,Ga=new P,Rr=new P,Wa=new P,xi=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Pn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Pn.copy(this.origin).addScaledVector(this.direction,t),Pn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Va.copy(e).add(t).multiplyScalar(.5),Tr.copy(t).sub(e).normalize(),Wn.copy(this.origin).sub(Va);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Tr),o=Wn.dot(this.direction),c=-Wn.dot(Tr),l=Wn.lengthSq(),h=Math.abs(1-a*a),u,f,d,g;if(h>0)if(u=a*c-o,f=a*o-c,g=r*h,u>=0)if(f>=-g)if(f<=g){let _=1/h;u*=_,f*=_,d=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Va).addScaledVector(Tr,f),d}intersectSphere(e,t){Pn.subVectors(e.center,this.origin);let n=Pn.dot(this.direction),s=Pn.dot(Pn)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Pn)!==null}intersectTriangle(e,t,n,s,r){Ga.subVectors(t,e),Rr.subVectors(n,e),Wa.crossVectors(Ga,Rr);let a=this.direction.dot(Wa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wn.subVectors(this.origin,e);let c=o*this.direction.dot(Rr.crossVectors(Wn,Rr));if(c<0)return null;let l=o*this.direction.dot(Ga.cross(Wn));if(l<0||c+l>a)return null;let h=-o*Wn.dot(Wa);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},lt=class i{constructor(e,t,n,s,r,a,o,c,l,h,u,f,d,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,u,f,d,g,_,m)}set(e,t,n,s,r,a,o,c,l,h,u,f,d,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Oi.setFromMatrixColumn(e,0).length(),r=1/Oi.setFromMatrixColumn(e,1).length(),a=1/Oi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=a*h,d=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=d+g*l,t[5]=f-_*l,t[9]=-o*c,t[2]=_-f*l,t[6]=g+d*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*h,d=c*u,g=l*h,_=l*u;t[0]=f+_*o,t[4]=g*o-d,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=d*o-g,t[6]=_+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*h,d=c*u,g=l*h,_=l*u;t[0]=f-_*o,t[4]=-a*u,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*h,t[9]=_-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*h,d=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=g*l-d,t[8]=f*l+_,t[1]=c*u,t[5]=_*l+f,t[9]=d*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-f*u,t[8]=g*u+d,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=d*u+g,t[10]=f-_*u}else if(e.order==="XZY"){let f=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+_,t[5]=a*h,t[9]=d*u-g,t[2]=g*u-d,t[6]=o*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(E_,e,w_)}lookAt(e,t,n){let s=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),Xn.crossVectors(n,Wt),Xn.lengthSq()===0&&(Math.abs(n.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),Xn.crossVectors(n,Wt)),Xn.normalize(),Cr.crossVectors(Wt,Xn),s[0]=Xn.x,s[4]=Cr.x,s[8]=Wt.x,s[1]=Xn.y,s[5]=Cr.y,s[9]=Wt.y,s[2]=Xn.z,s[6]=Cr.z,s[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],y=n[7],T=n[11],L=n[15],R=s[0],A=s[4],X=s[8],M=s[12],E=s[1],H=s[5],$=s[9],ae=s[13],I=s[2],N=s[6],G=s[10],Y=s[14],q=s[3],W=s[7],Q=s[11],ne=s[15];return r[0]=a*R+o*E+c*I+l*q,r[4]=a*A+o*H+c*N+l*W,r[8]=a*X+o*$+c*G+l*Q,r[12]=a*M+o*ae+c*Y+l*ne,r[1]=h*R+u*E+f*I+d*q,r[5]=h*A+u*H+f*N+d*W,r[9]=h*X+u*$+f*G+d*Q,r[13]=h*M+u*ae+f*Y+d*ne,r[2]=g*R+_*E+m*I+p*q,r[6]=g*A+_*H+m*N+p*W,r[10]=g*X+_*$+m*G+p*Q,r[14]=g*M+_*ae+m*Y+p*ne,r[3]=b*R+y*E+T*I+L*q,r[7]=b*A+y*H+T*N+L*W,r[11]=b*X+y*$+T*G+L*Q,r[15]=b*M+y*ae+T*Y+L*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*u-s*l*u-r*o*f+n*l*f+s*o*d-n*c*d)+_*(+t*c*d-t*l*f+r*a*f-s*a*d+s*l*h-r*c*h)+m*(+t*l*u-t*o*d-r*a*u+n*a*d+r*o*h-n*l*h)+p*(-s*o*h-t*c*u+t*o*f+s*a*u-n*a*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=u*m*l-_*f*l+_*c*d-o*m*d-u*c*p+o*f*p,y=g*f*l-h*m*l-g*c*d+a*m*d+h*c*p-a*f*p,T=h*_*l-g*u*l+g*o*d-a*_*d-h*o*p+a*u*p,L=g*u*c-h*_*c-g*o*f+a*_*f+h*o*m-a*u*m,R=t*b+n*y+s*T+r*L;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/R;return e[0]=b*A,e[1]=(_*f*r-u*m*r-_*s*d+n*m*d+u*s*p-n*f*p)*A,e[2]=(o*m*r-_*c*r+_*s*l-n*m*l-o*s*p+n*c*p)*A,e[3]=(u*c*r-o*f*r-u*s*l+n*f*l+o*s*d-n*c*d)*A,e[4]=y*A,e[5]=(h*m*r-g*f*r+g*s*d-t*m*d-h*s*p+t*f*p)*A,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*p-t*c*p)*A,e[7]=(a*f*r-h*c*r+h*s*l-t*f*l-a*s*d+t*c*d)*A,e[8]=T*A,e[9]=(g*u*r-h*_*r-g*n*d+t*_*d+h*n*p-t*u*p)*A,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*p+t*o*p)*A,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*d-t*o*d)*A,e[12]=L*A,e[13]=(h*_*s-g*u*s+g*n*f-t*_*f-h*n*m+t*u*m)*A,e[14]=(g*o*s-a*_*s-g*n*c+t*_*c+a*n*m-t*o*m)*A,e[15]=(a*u*s-h*o*s+h*n*c-t*u*c-a*n*f+t*o*f)*A,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,f=r*l,d=r*h,g=r*u,_=a*h,m=a*u,p=o*u,b=c*l,y=c*h,T=c*u,L=n.x,R=n.y,A=n.z;return s[0]=(1-(_+p))*L,s[1]=(d+T)*L,s[2]=(g-y)*L,s[3]=0,s[4]=(d-T)*R,s[5]=(1-(f+p))*R,s[6]=(m+b)*R,s[7]=0,s[8]=(g+y)*A,s[9]=(m-b)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Oi.set(s[0],s[1],s[2]).length(),a=Oi.set(s[4],s[5],s[6]).length(),o=Oi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],on.copy(this);let l=1/r,h=1/a,u=1/o;return on.elements[0]*=l,on.elements[1]*=l,on.elements[2]*=l,on.elements[4]*=h,on.elements[5]*=h,on.elements[6]*=h,on.elements[8]*=u,on.elements[9]*=u,on.elements[10]*=u,t.setFromRotationMatrix(on),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Nn){let c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),d,g;if(o===Nn)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===ro)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Nn){let c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(a-r),f=(t+e)*l,d=(n+s)*h,g,_;if(o===Nn)g=(a+r)*u,_=-2*u;else if(o===ro)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Oi=new P,on=new lt,E_=new P(0,0,0),w_=new P(1,1,1),Xn=new P,Cr=new P,Wt=new P,wu=new lt,Au=new Ft,uo=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(wt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-wt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(wt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Au.setFromEuler(this),this.setFromQuaternion(Au,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};uo.DEFAULT_ORDER="XYZ";var Ds=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},A_=0,Tu=new P,Fi=new Ft,Ln=new lt,Pr=new P,bs=new P,T_=new P,R_=new Ft,Ru=new P(1,0,0),Cu=new P(0,1,0),Pu=new P(0,0,1),C_={type:"added"},P_={type:"removed"},Mt=class i extends yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:A_++}),this.uuid=On(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new P,t=new uo,n=new Ft,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new lt},normalMatrix:{value:new We}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ds,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis(Ru,e)}rotateY(e){return this.rotateOnAxis(Cu,e)}rotateZ(e){return this.rotateOnAxis(Pu,e)}translateOnAxis(e,t){return Tu.copy(e).applyQuaternion(this.quaternion),this.position.add(Tu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ru,e)}translateY(e){return this.translateOnAxis(Cu,e)}translateZ(e){return this.translateOnAxis(Pu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Pr.copy(e):Pr.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(bs,Pr,this.up):Ln.lookAt(Pr,bs,this.up),this.quaternion.setFromRotationMatrix(Ln),s&&(Ln.extractRotation(s.matrixWorld),Fi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(C_)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(P_)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ln),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,e,T_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,R_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++){let o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Mt.DEFAULT_UP=new P(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var an=new P,In=new P,Xa=new P,Un=new P,zi=new P,Bi=new P,Lu=new P,Ya=new P,qa=new P,$a=new P,Lr=!1,Zn=class i{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),an.subVectors(e,t),s.cross(an);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){an.subVectors(s,t),In.subVectors(n,t),Xa.subVectors(e,t);let a=an.dot(an),o=an.dot(In),c=an.dot(Xa),l=In.dot(In),h=In.dot(Xa),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getUV(e,t,n,s,r,a,o,c){return Lr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Lr=!0),this.getInterpolation(e,t,n,s,r,a,o,c)}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Un.x),c.addScaledVector(a,Un.y),c.addScaledVector(o,Un.z),c)}static isFrontFacing(e,t,n,s){return an.subVectors(n,t),In.subVectors(e,t),an.cross(In).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return an.subVectors(this.c,this.b),In.subVectors(this.a,this.b),an.cross(In).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return Lr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Lr=!0),i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;zi.subVectors(s,n),Bi.subVectors(r,n),Ya.subVectors(e,n);let c=zi.dot(Ya),l=Bi.dot(Ya);if(c<=0&&l<=0)return t.copy(n);qa.subVectors(e,s);let h=zi.dot(qa),u=Bi.dot(qa);if(h>=0&&u<=h)return t.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(zi,a);$a.subVectors(e,r);let d=zi.dot($a),g=Bi.dot($a);if(g>=0&&d<=g)return t.copy(r);let _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Bi,o);let m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Lu.subVectors(r,s),o=(u-h)/(u-h+(d-g)),t.copy(s).addScaledVector(Lu,o);let p=1/(m+_+f);return a=_*p,o=f*p,t.copy(n).addScaledVector(zi,a).addScaledVector(Bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Pf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},Ir={h:0,s:0,l:0};function Za(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Be=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Qe.workingColorSpace){if(e=Zc(e,1),t=wt(t,0,1),n=wt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Za(a,r,e+1/3),this.g=Za(a,r,e),this.b=Za(a,r,e-1/3)}return Qe.toWorkingColorSpace(this,s),this}setStyle(e,t=vt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vt){let n=Pf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ts(e.r),this.g=ts(e.g),this.b=ts(e.b),this}copyLinearToSRGB(e){return this.r=Fa(e.r),this.g=Fa(e.g),this.b=Fa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vt){return Qe.fromWorkingColorSpace(Et.copy(this),e),Math.round(wt(Et.r*255,0,255))*65536+Math.round(wt(Et.g*255,0,255))*256+Math.round(wt(Et.b*255,0,255))}getHexString(e=vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(Et.copy(this),t);let n=Et.r,s=Et.g,r=Et.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=vt){Qe.fromWorkingColorSpace(Et.copy(this),e);let t=Et.r,n=Et.g,s=Et.b;return e!==vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Yn),this.setHSL(Yn.h+e,Yn.s+t,Yn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Yn),e.getHSL(Ir);let n=Rs(Yn.h,Ir.h,t),s=Rs(Yn.s,Ir.s,t),r=Rs(Yn.l,Ir.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Et=new Be;Be.NAMES=Pf;var L_=0,Bn=class extends yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:L_++}),this.uuid=On(),this.name="",this.type="Material",this.blending=Qi,this.side=en,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cc,this.blendDst=lc,this.blendEquation=di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=Qr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qi&&(n.blending=this.blending),this.side!==en&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==cc&&(n.blendSrc=this.blendSrc),this.blendDst!==lc&&(n.blendDst=this.blendDst),this.blendEquation!==di&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},os=class extends Bn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=gf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var ct=new P,Ur=new be,Nt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=pc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=$n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ur.fromBufferAttribute(this,t),Ur.applyMatrix3(e),this.setXY(t,Ur.x,Ur.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix3(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ke(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array),r=Ke(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==pc&&(e.usage=this.usage),e}};var fo=class extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var po=class extends Nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Qt=class extends Nt{constructor(e,t,n){super(new Float32Array(e),t,n)}};var I_=0,jt=new lt,ja=new Mt,ki=new P,Xt=new fn,Es=new fn,gt=new P,nn=class i extends yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:I_++}),this.uuid=On(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cf(e)?po:fo)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,n){return jt.makeTranslation(e,t,n),this.applyMatrix4(jt),this}scale(e,t,n){return jt.makeScale(e,t,n),this.applyMatrix4(jt),this}lookAt(e){return ja.lookAt(e),ja.updateMatrix(),this.applyMatrix4(ja.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ki).negate(),this.translate(ki.x,ki.y,ki.z),this}setFromPoints(e){let t=[];for(let n=0,s=e.length;n<s;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Qt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Xt.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Es.setFromBufferAttribute(o),this.morphTargetsRelative?(gt.addVectors(Xt.min,Es.min),Xt.expandByPoint(gt),gt.addVectors(Xt.max,Es.max),Xt.expandByPoint(gt)):(Xt.expandByPoint(Es.min),Xt.expandByPoint(Es.max))}Xt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)gt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(gt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)gt.fromBufferAttribute(o,l),c&&(ki.fromBufferAttribute(e,l),gt.add(ki)),s=Math.max(s,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*o),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let E=0;E<o;E++)l[E]=new P,h[E]=new P;let u=new P,f=new P,d=new P,g=new be,_=new be,m=new be,p=new P,b=new P;function y(E,H,$){u.fromArray(s,E*3),f.fromArray(s,H*3),d.fromArray(s,$*3),g.fromArray(a,E*2),_.fromArray(a,H*2),m.fromArray(a,$*2),f.sub(u),d.sub(u),_.sub(g),m.sub(g);let ae=1/(_.x*m.y-m.x*_.y);isFinite(ae)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(d,-_.y).multiplyScalar(ae),b.copy(d).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar(ae),l[E].add(p),l[H].add(p),l[$].add(p),h[E].add(b),h[H].add(b),h[$].add(b))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let E=0,H=T.length;E<H;++E){let $=T[E],ae=$.start,I=$.count;for(let N=ae,G=ae+I;N<G;N+=3)y(n[N+0],n[N+1],n[N+2])}let L=new P,R=new P,A=new P,X=new P;function M(E){A.fromArray(r,E*3),X.copy(A);let H=l[E];L.copy(H),L.sub(A.multiplyScalar(A.dot(H))).normalize(),R.crossVectors(X,H);let ae=R.dot(h[E])<0?-1:1;c[E*4]=L.x,c[E*4+1]=L.y,c[E*4+2]=L.z,c[E*4+3]=ae}for(let E=0,H=T.length;E<H;++E){let $=T[E],ae=$.start,I=$.count;for(let N=ae,G=ae+I;N<G;N+=3)M(n[N+0]),M(n[N+1]),M(n[N+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new P,r=new P,a=new P,o=new P,c=new P,l=new P,h=new P,u=new P;if(e)for(let f=0,d=e.count;f<d;f+=3){let g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h),d=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*h;for(let p=0;p<h;p++)f[g++]=l[d++]}return new Nt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=e(f,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Iu=new lt,hi=new xi,Dr=new Qn,Uu=new P,Hi=new P,Vi=new P,Gi=new P,Ja=new P,Nr=new P,Or=new be,Fr=new be,zr=new be,Du=new P,Nu=new P,Ou=new P,Br=new P,kr=new P,Dt=class extends Mt{constructor(e=new nn,t=new os){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Nr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(Ja.fromBufferAttribute(u,e),a?Nr.addScaledVector(Ja,h):Nr.addScaledVector(Ja.sub(t),h))}t.add(Nr)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(r),hi.copy(e.ray).recast(e.near),!(Dr.containsPoint(hi.origin)===!1&&(hi.intersectSphere(Dr,Uu)===null||hi.origin.distanceToSquared(Uu)>(e.far-e.near)**2))&&(Iu.copy(r).invert(),hi.copy(e.ray).applyMatrix4(Iu),!(n.boundingBox!==null&&hi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,hi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),y=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let T=b,L=y;T<L;T+=3){let R=o.getX(T),A=o.getX(T+1),X=o.getX(T+2);s=Hr(this,p,e,n,l,h,u,R,A,X),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let b=o.getX(m),y=o.getX(m+1),T=o.getX(m+2);s=Hr(this,a,e,n,l,h,u,b,y,T),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let T=b,L=y;T<L;T+=3){let R=T,A=T+1,X=T+2;s=Hr(this,p,e,n,l,h,u,R,A,X),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let b=m,y=m+1,T=m+2;s=Hr(this,a,e,n,l,h,u,b,y,T),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function U_(i,e,t,n,s,r,a,o){let c;if(e.side===Ot?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===en,o),c===null)return null;kr.copy(o),kr.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(kr);return l<t.near||l>t.far?null:{distance:l,point:kr.clone(),object:i}}function Hr(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Hi),i.getVertexPosition(c,Vi),i.getVertexPosition(l,Gi);let h=U_(i,e,t,n,Hi,Vi,Gi,Br);if(h){s&&(Or.fromBufferAttribute(s,o),Fr.fromBufferAttribute(s,c),zr.fromBufferAttribute(s,l),h.uv=Zn.getInterpolation(Br,Hi,Vi,Gi,Or,Fr,zr,new be)),r&&(Or.fromBufferAttribute(r,o),Fr.fromBufferAttribute(r,c),zr.fromBufferAttribute(r,l),h.uv1=Zn.getInterpolation(Br,Hi,Vi,Gi,Or,Fr,zr,new be),h.uv2=h.uv1),a&&(Du.fromBufferAttribute(a,o),Nu.fromBufferAttribute(a,c),Ou.fromBufferAttribute(a,l),h.normal=Zn.getInterpolation(Br,Hi,Vi,Gi,Du,Nu,Ou,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:c,c:l,normal:new P,materialIndex:0};Zn.getNormal(Hi,Vi,Gi,u.normal),h.face=u}return h}var yi=class i extends nn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Qt(l,3)),this.setAttribute("normal",new Qt(h,3)),this.setAttribute("uv",new Qt(u,2));function g(_,m,p,b,y,T,L,R,A,X,M){let E=T/A,H=L/X,$=T/2,ae=L/2,I=R/2,N=A+1,G=X+1,Y=0,q=0,W=new P;for(let Q=0;Q<G;Q++){let ne=Q*H-ae;for(let de=0;de<N;de++){let V=de*E-$;W[_]=V*b,W[m]=ne*y,W[p]=I,l.push(W.x,W.y,W.z),W[_]=0,W[m]=0,W[p]=R>0?1:-1,h.push(W.x,W.y,W.z),u.push(de/A),u.push(1-Q/X),Y+=1}}for(let Q=0;Q<X;Q++)for(let ne=0;ne<A;ne++){let de=f+ne+N*Q,V=f+ne+N*(Q+1),j=f+(ne+1)+N*(Q+1),fe=f+(ne+1)+N*Q;c.push(de,V,fe),c.push(V,j,fe),q+=6}o.addGroup(d,q,M),d+=q,f+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function as(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Lt(i){let e={};for(let t=0;t<i.length;t++){let n=as(i[t]);for(let s in n)e[s]=n[s]}return e}function D_(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Lf(i){return i.getRenderTarget()===null?i.outputColorSpace:Qe.workingColorSpace}var N_={clone:as,merge:Lt},O_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,F_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,kn=class extends Bn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=O_,this.fragmentShader=F_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=as(e.uniforms),this.uniformsGroups=D_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},mo=class extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=Nn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ut=class extends mo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Us*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(es*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Us*2*Math.atan(Math.tan(es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(es*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Wi=-90,Xi=1,yc=class extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ut(Wi,Xi,e,t);s.layers=this.layers,this.add(s);let r=new Ut(Wi,Xi,e,t);r.layers=this.layers,this.add(r);let a=new Ut(Wi,Xi,e,t);a.layers=this.layers,this.add(a);let o=new Ut(Wi,Xi,e,t);o.layers=this.layers,this.add(o);let c=new Ut(Wi,Xi,e,t);c.layers=this.layers,this.add(c);let l=new Ut(Wi,Xi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ro)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},go=class extends tn{constructor(e,t,n,s,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:is,super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},vc=class extends zn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Cs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===_i?vt:Kt),this.texture=new go(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new yi(5,5,5),r=new kn({name:"CubemapFromEquirect",uniforms:as(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ot,blending:jn});r.uniforms.tEquirect.value=t;let a=new Dt(s,r),o=t.minFilter;return t.minFilter===Ls&&(t.minFilter=Jt),new yc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},Ka=new P,z_=new P,B_=new We,cn=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Ka.subVectors(n,t).cross(z_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Ka),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||B_.getNormalMatrix(e),s=this.coplanarPoint(Ka).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ui=new Qn,Vr=new P,Ns=class{constructor(e=new cn,t=new cn,n=new cn,s=new cn,r=new cn,a=new cn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Nn){let n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],d=s[8],g=s[9],_=s[10],m=s[11],p=s[12],b=s[13],y=s[14],T=s[15];if(n[0].setComponents(c-r,f-l,m-d,T-p).normalize(),n[1].setComponents(c+r,f+l,m+d,T+p).normalize(),n[2].setComponents(c+a,f+h,m+g,T+b).normalize(),n[3].setComponents(c-a,f-h,m-g,T-b).normalize(),n[4].setComponents(c-o,f-u,m-_,T-y).normalize(),t===Nn)n[5].setComponents(c+o,f+u,m+_,T+y).normalize();else if(t===ro)n[5].setComponents(o,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(e){return ui.center.set(0,0,0),ui.radius=.7071067811865476,ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Vr.x=s.normal.x>0?e.max.x:e.min.x,Vr.y=s.normal.y>0?e.max.y:e.min.y,Vr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Vr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function If(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function k_(i,e){let t=e.isWebGL2,n=new WeakMap;function s(l,h){let u=l.array,f=l.usage,d=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,f),l.onUploadCallback();let _;if(u instanceof Float32Array)_=i.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=i.SHORT;else if(u instanceof Uint32Array)_=i.UNSIGNED_INT;else if(u instanceof Int32Array)_=i.INT;else if(u instanceof Int8Array)_=i.BYTE;else if(u instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:d}}function r(l,h,u){let f=h.array,d=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,l),d.count===-1&&g.length===0&&i.bufferSubData(u,0,f),g.length!==0){for(let _=0,m=g.length;_<m;_++){let p=g[_];t?i.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):i.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}d.count!==-1&&(t?i.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):i.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(i.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,s(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:a,remove:o,update:c}}var Os=class i extends nn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=e/o,f=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){let b=p*f-a;for(let y=0;y<l;y++){let T=y*u-r;g.push(T,-b,0),_.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<o;b++){let y=b+l*p,T=b+l*(p+1),L=b+1+l*(p+1),R=b+1+l*p;d.push(y,T,R),d.push(T,L,R)}this.setIndex(d),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(_,3)),this.setAttribute("uv",new Qt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},H_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,V_=`#ifdef USE_ALPHAHASH
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
#endif`,G_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,W_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,X_=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Y_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,q_=`#ifdef USE_AOMAP
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
#endif`,$_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Z_=`#ifdef USE_BATCHING
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
#endif`,j_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,J_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,K_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Q_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,e0=`#ifdef USE_IRIDESCENCE
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
#endif`,t0=`#ifdef USE_BUMPMAP
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
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,i0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,s0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,r0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,o0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,a0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,c0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,l0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,h0=`#define PI 3.141592653589793
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
} // validated`,u0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,f0=`vec3 transformedNormal = objectNormal;
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
#endif`,d0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,p0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,m0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,g0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_0="gl_FragColor = linearToOutputTexel( gl_FragColor );",x0=`
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
}`,y0=`#ifdef USE_ENVMAP
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
#endif`,v0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,M0=`#ifdef USE_ENVMAP
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
#endif`,S0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,b0=`#ifdef USE_ENVMAP
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
#endif`,E0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,w0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,A0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,T0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,R0=`#ifdef USE_GRADIENTMAP
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
}`,C0=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,P0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,L0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,I0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,U0=`uniform bool receiveShadow;
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
#endif`,D0=`#ifdef USE_ENVMAP
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
#endif`,N0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,O0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,F0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,z0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,B0=`PhysicalMaterial material;
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
#endif`,k0=`struct PhysicalMaterial {
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
}`,H0=`
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
#endif`,V0=`#if defined( RE_IndirectDiffuse )
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
#endif`,G0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,W0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,X0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Y0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,q0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,$0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Z0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,j0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,J0=`#if defined( USE_POINTS_UV )
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
#endif`,K0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Q0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ex=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tx=`#ifdef USE_MORPHNORMALS
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
#endif`,nx=`#ifdef USE_MORPHTARGETS
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
#endif`,ix=`#ifdef USE_MORPHTARGETS
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
#endif`,sx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,rx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ox=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ax=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lx=`#ifdef USE_NORMALMAP
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
#endif`,hx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ux=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,px=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_x=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Mx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ex=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wx=`float getShadowMask() {
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
}`,Ax=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tx=`#ifdef USE_SKINNING
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
#endif`,Rx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cx=`#ifdef USE_SKINNING
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
#endif`,Px=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ix=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ux=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dx=`#ifdef USE_TRANSMISSION
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
#endif`,Nx=`#ifdef USE_TRANSMISSION
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
#endif`,Ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,kx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hx=`uniform sampler2D t2D;
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
}`,Vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yx=`#include <common>
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
}`,qx=`#if DEPTH_PACKING == 3200
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
}`,$x=`#define DISTANCE
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
}`,Zx=`#define DISTANCE
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
}`,jx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kx=`uniform float scale;
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
}`,Qx=`uniform vec3 diffuse;
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
}`,ey=`#include <common>
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
}`,ty=`uniform vec3 diffuse;
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
}`,ny=`#define LAMBERT
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
}`,iy=`#define LAMBERT
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
}`,sy=`#define MATCAP
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
}`,ry=`#define MATCAP
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
}`,oy=`#define NORMAL
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
}`,ay=`#define NORMAL
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
}`,cy=`#define PHONG
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
}`,ly=`#define PHONG
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
}`,hy=`#define STANDARD
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
}`,uy=`#define STANDARD
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
}`,fy=`#define TOON
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
}`,dy=`#define TOON
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
}`,py=`uniform float size;
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
}`,my=`uniform vec3 diffuse;
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
}`,gy=`#include <common>
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
}`,_y=`uniform vec3 color;
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
}`,xy=`uniform float rotation;
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
}`,yy=`uniform vec3 diffuse;
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
}`,ze={alphahash_fragment:H_,alphahash_pars_fragment:V_,alphamap_fragment:G_,alphamap_pars_fragment:W_,alphatest_fragment:X_,alphatest_pars_fragment:Y_,aomap_fragment:q_,aomap_pars_fragment:$_,batching_pars_vertex:Z_,batching_vertex:j_,begin_vertex:J_,beginnormal_vertex:K_,bsdfs:Q_,iridescence_fragment:e0,bumpmap_pars_fragment:t0,clipping_planes_fragment:n0,clipping_planes_pars_fragment:i0,clipping_planes_pars_vertex:s0,clipping_planes_vertex:r0,color_fragment:o0,color_pars_fragment:a0,color_pars_vertex:c0,color_vertex:l0,common:h0,cube_uv_reflection_fragment:u0,defaultnormal_vertex:f0,displacementmap_pars_vertex:d0,displacementmap_vertex:p0,emissivemap_fragment:m0,emissivemap_pars_fragment:g0,colorspace_fragment:_0,colorspace_pars_fragment:x0,envmap_fragment:y0,envmap_common_pars_fragment:v0,envmap_pars_fragment:M0,envmap_pars_vertex:S0,envmap_physical_pars_fragment:D0,envmap_vertex:b0,fog_vertex:E0,fog_pars_vertex:w0,fog_fragment:A0,fog_pars_fragment:T0,gradientmap_pars_fragment:R0,lightmap_fragment:C0,lightmap_pars_fragment:P0,lights_lambert_fragment:L0,lights_lambert_pars_fragment:I0,lights_pars_begin:U0,lights_toon_fragment:N0,lights_toon_pars_fragment:O0,lights_phong_fragment:F0,lights_phong_pars_fragment:z0,lights_physical_fragment:B0,lights_physical_pars_fragment:k0,lights_fragment_begin:H0,lights_fragment_maps:V0,lights_fragment_end:G0,logdepthbuf_fragment:W0,logdepthbuf_pars_fragment:X0,logdepthbuf_pars_vertex:Y0,logdepthbuf_vertex:q0,map_fragment:$0,map_pars_fragment:Z0,map_particle_fragment:j0,map_particle_pars_fragment:J0,metalnessmap_fragment:K0,metalnessmap_pars_fragment:Q0,morphcolor_vertex:ex,morphnormal_vertex:tx,morphtarget_pars_vertex:nx,morphtarget_vertex:ix,normal_fragment_begin:sx,normal_fragment_maps:rx,normal_pars_fragment:ox,normal_pars_vertex:ax,normal_vertex:cx,normalmap_pars_fragment:lx,clearcoat_normal_fragment_begin:hx,clearcoat_normal_fragment_maps:ux,clearcoat_pars_fragment:fx,iridescence_pars_fragment:dx,opaque_fragment:px,packing:mx,premultiplied_alpha_fragment:gx,project_vertex:_x,dithering_fragment:xx,dithering_pars_fragment:yx,roughnessmap_fragment:vx,roughnessmap_pars_fragment:Mx,shadowmap_pars_fragment:Sx,shadowmap_pars_vertex:bx,shadowmap_vertex:Ex,shadowmask_pars_fragment:wx,skinbase_vertex:Ax,skinning_pars_vertex:Tx,skinning_vertex:Rx,skinnormal_vertex:Cx,specularmap_fragment:Px,specularmap_pars_fragment:Lx,tonemapping_fragment:Ix,tonemapping_pars_fragment:Ux,transmission_fragment:Dx,transmission_pars_fragment:Nx,uv_pars_fragment:Ox,uv_pars_vertex:Fx,uv_vertex:zx,worldpos_vertex:Bx,background_vert:kx,background_frag:Hx,backgroundCube_vert:Vx,backgroundCube_frag:Gx,cube_vert:Wx,cube_frag:Xx,depth_vert:Yx,depth_frag:qx,distanceRGBA_vert:$x,distanceRGBA_frag:Zx,equirect_vert:jx,equirect_frag:Jx,linedashed_vert:Kx,linedashed_frag:Qx,meshbasic_vert:ey,meshbasic_frag:ty,meshlambert_vert:ny,meshlambert_frag:iy,meshmatcap_vert:sy,meshmatcap_frag:ry,meshnormal_vert:oy,meshnormal_frag:ay,meshphong_vert:cy,meshphong_frag:ly,meshphysical_vert:hy,meshphysical_frag:uy,meshtoon_vert:fy,meshtoon_frag:dy,points_vert:py,points_frag:my,shadow_vert:gy,shadow_frag:_y,sprite_vert:xy,sprite_frag:yy},le={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},_n={basic:{uniforms:Lt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Lt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Be(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Lt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Lt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Lt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new Be(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Lt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Lt([le.points,le.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Lt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Lt([le.common,le.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Lt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Lt([le.sprite,le.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Lt([le.common,le.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Lt([le.lights,le.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};_n.physical={uniforms:Lt([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};var Gr={r:0,b:0,g:0};function vy(i,e,t,n,s,r,a){let o=new Be(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function g(m,p){let b=!1,y=p.isScene===!0?p.background:null;y&&y.isTexture&&(y=(p.backgroundBlurriness>0?t:e).get(y)),y===null?_(o,c):y&&y.isColor&&(_(y,1),b=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||b)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),y&&(y.isCubeTexture||y.mapping===Ro)?(h===void 0&&(h=new Dt(new yi(1,1,1),new kn({name:"BackgroundCubeMaterial",uniforms:as(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=Qe.getTransfer(y.colorSpace)!==nt,(u!==y||f!==y.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,d=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Dt(new Os(2,2),new kn({name:"BackgroundMaterial",uniforms:as(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=Qe.getTransfer(y.colorSpace)!==nt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,d=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,p){m.getRGB(Gr,Lf(i)),n.buffers.color.setClear(Gr.r,Gr.g,Gr.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),c=p,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(o,c)},render:g}}function My(i,e,t,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=m(null),l=c,h=!1;function u(I,N,G,Y,q){let W=!1;if(a){let Q=_(Y,G,N);l!==Q&&(l=Q,d(l.object)),W=p(I,Y,G,q),W&&b(I,Y,G,q)}else{let Q=N.wireframe===!0;(l.geometry!==Y.id||l.program!==G.id||l.wireframe!==Q)&&(l.geometry=Y.id,l.program=G.id,l.wireframe=Q,W=!0)}q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(W||h)&&(h=!1,X(I,N,G,Y),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function d(I){return n.isWebGL2?i.bindVertexArray(I):r.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?i.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function _(I,N,G){let Y=G.wireframe===!0,q=o[I.id];q===void 0&&(q={},o[I.id]=q);let W=q[N.id];W===void 0&&(W={},q[N.id]=W);let Q=W[Y];return Q===void 0&&(Q=m(f()),W[Y]=Q),Q}function m(I){let N=[],G=[],Y=[];for(let q=0;q<s;q++)N[q]=0,G[q]=0,Y[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:G,attributeDivisors:Y,object:I,attributes:{},index:null}}function p(I,N,G,Y){let q=l.attributes,W=N.attributes,Q=0,ne=G.getAttributes();for(let de in ne)if(ne[de].location>=0){let j=q[de],fe=W[de];if(fe===void 0&&(de==="instanceMatrix"&&I.instanceMatrix&&(fe=I.instanceMatrix),de==="instanceColor"&&I.instanceColor&&(fe=I.instanceColor)),j===void 0||j.attribute!==fe||fe&&j.data!==fe.data)return!0;Q++}return l.attributesNum!==Q||l.index!==Y}function b(I,N,G,Y){let q={},W=N.attributes,Q=0,ne=G.getAttributes();for(let de in ne)if(ne[de].location>=0){let j=W[de];j===void 0&&(de==="instanceMatrix"&&I.instanceMatrix&&(j=I.instanceMatrix),de==="instanceColor"&&I.instanceColor&&(j=I.instanceColor));let fe={};fe.attribute=j,j&&j.data&&(fe.data=j.data),q[de]=fe,Q++}l.attributes=q,l.attributesNum=Q,l.index=Y}function y(){let I=l.newAttributes;for(let N=0,G=I.length;N<G;N++)I[N]=0}function T(I){L(I,0)}function L(I,N){let G=l.newAttributes,Y=l.enabledAttributes,q=l.attributeDivisors;G[I]=1,Y[I]===0&&(i.enableVertexAttribArray(I),Y[I]=1),q[I]!==N&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,N),q[I]=N)}function R(){let I=l.newAttributes,N=l.enabledAttributes;for(let G=0,Y=N.length;G<Y;G++)N[G]!==I[G]&&(i.disableVertexAttribArray(G),N[G]=0)}function A(I,N,G,Y,q,W,Q){Q===!0?i.vertexAttribIPointer(I,N,G,q,W):i.vertexAttribPointer(I,N,G,Y,q,W)}function X(I,N,G,Y){if(n.isWebGL2===!1&&(I.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;y();let q=Y.attributes,W=G.getAttributes(),Q=N.defaultAttributeValues;for(let ne in W){let de=W[ne];if(de.location>=0){let V=q[ne];if(V===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(V=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(V=I.instanceColor)),V!==void 0){let j=V.normalized,fe=V.itemSize,ve=t.get(V);if(ve===void 0)continue;let xe=ve.buffer,Ie=ve.type,Ue=ve.bytesPerElement,Te=n.isWebGL2===!0&&(Ie===i.INT||Ie===i.UNSIGNED_INT||V.gpuType===xf);if(V.isInterleavedBufferAttribute){let Xe=V.data,O=Xe.stride,ft=V.offset;if(Xe.isInstancedInterleavedBuffer){for(let Ee=0;Ee<de.locationSize;Ee++)L(de.location+Ee,Xe.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Xe.meshPerAttribute*Xe.count)}else for(let Ee=0;Ee<de.locationSize;Ee++)T(de.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Ee=0;Ee<de.locationSize;Ee++)A(de.location+Ee,fe/de.locationSize,Ie,j,O*Ue,(ft+fe/de.locationSize*Ee)*Ue,Te)}else{if(V.isInstancedBufferAttribute){for(let Xe=0;Xe<de.locationSize;Xe++)L(de.location+Xe,V.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let Xe=0;Xe<de.locationSize;Xe++)T(de.location+Xe);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Xe=0;Xe<de.locationSize;Xe++)A(de.location+Xe,fe/de.locationSize,Ie,j,fe*Ue,fe/de.locationSize*Xe*Ue,Te)}}else if(Q!==void 0){let j=Q[ne];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(de.location,j);break;case 3:i.vertexAttrib3fv(de.location,j);break;case 4:i.vertexAttrib4fv(de.location,j);break;default:i.vertexAttrib1fv(de.location,j)}}}}R()}function M(){$();for(let I in o){let N=o[I];for(let G in N){let Y=N[G];for(let q in Y)g(Y[q].object),delete Y[q];delete N[G]}delete o[I]}}function E(I){if(o[I.id]===void 0)return;let N=o[I.id];for(let G in N){let Y=N[G];for(let q in Y)g(Y[q].object),delete Y[q];delete N[G]}delete o[I.id]}function H(I){for(let N in o){let G=o[N];if(G[I.id]===void 0)continue;let Y=G[I.id];for(let q in Y)g(Y[q].object),delete Y[q];delete G[I.id]}}function $(){ae(),h=!0,l!==c&&(l=c,d(l.object))}function ae(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:$,resetDefaultState:ae,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:H,initAttributes:y,enableAttribute:T,disableUnusedAttributes:R}}function Sy(i,e,t,n){let s=n.isWebGL2,r;function a(h){r=h}function o(h,u){i.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,f){if(f===0)return;let d,g;if(s)d=i,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,h,u,f),t.update(u,r,f)}function l(h,u,f){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(h[g],u[g]);else{d.multiDrawArraysWEBGL(r,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function by(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",o=t.precision!==void 0?t.precision:"highp",c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);let l=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,T=a||e.has("OES_texture_float"),L=y&&T,R=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:b,vertexTextures:y,floatFragmentTextures:T,floatVertexTextures:L,maxSamples:R}}function Ey(i){let e=this,t=null,n=0,s=!1,r=!1,a=new cn,o=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let b=r?0:n,y=b*4,T=p.clippingState||null;c.value=T,T=h(g,f,y,d);for(let L=0;L!==y;++L)T[L]=t[L];p.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=d+_*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,T=d;y!==_;++y,T+=4)a.copy(u[y]).applyMatrix4(b,o),a.normal.toArray(m,T),m[T+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function wy(i){let e=new WeakMap;function t(a,o){return o===hc?a.mapping=is:o===uc&&(a.mapping=ss),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===hc||o===uc)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new vc(c.height/2);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var _o=class extends mo{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ji=4,Fu=[.125,.215,.35,.446,.526,.582],pi=20,Qa=new _o,zu=new Be,ec=null,tc=0,nc=0,fi=(1+Math.sqrt(5))/2,Yi=1/fi,Bu=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,fi,Yi),new P(0,fi,-Yi),new P(Yi,0,fi),new P(-Yi,0,fi),new P(fi,Yi,0),new P(-fi,Yi,0)],xo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){ec=this._renderer.getRenderTarget(),tc=this._renderer.getActiveCubeFace(),nc=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ec,tc,nc),e.scissorTest=!1,Wr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===is||e.mapping===ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ec=this._renderer.getRenderTarget(),tc=this._renderer.getActiveCubeFace(),nc=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:Is,format:un,colorSpace:Fn,depthBuffer:!1},s=ku(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ku(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ay(r)),this._blurMaterial=Ty(r,e,t)}return s}_compileMaterial(e){let t=new Dt(this._lodPlanes[0],e);this._renderer.compile(t,Qa)}_sceneToCubeUV(e,t,n,s){let o=new Ut(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(zu),h.toneMapping=Jn,h.autoClear=!1;let d=new os({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),g=new Dt(new yi,d),_=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(zu),_=!0);for(let p=0;p<6;p++){let b=p%3;b===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):b===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));let y=this._cubeSize;Wr(s,b*y,p>2?y:0,y,y),h.setRenderTarget(s),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===is||e.mapping===ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Dt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Wr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Qa)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Bu[(s-1)%Bu.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Dt(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*pi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):pi;m>pi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${pi}`);let p=[],b=0;for(let A=0;A<pi;++A){let X=A/_,M=Math.exp(-X*X/2);p.push(M),A===0?b+=M:A<m&&(b+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;let T=this._sizeLods[s],L=3*T*(s>y-Ji?s-y+Ji:0),R=4*(this._cubeSize-T);Wr(t,L,R,3*T,2*T),c.setRenderTarget(t),c.render(u,Qa)}};function Ay(i){let e=[],t=[],n=[],s=i,r=i-Ji+1+Fu.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let c=1/o;a>i-Ji?c=Fu[a-i+Ji-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*d),y=new Float32Array(m*g*d),T=new Float32Array(p*g*d);for(let R=0;R<d;R++){let A=R%3*2/3-1,X=R>2?0:-1,M=[A,X,0,A+2/3,X,0,A+2/3,X+1,0,A,X,0,A+2/3,X+1,0,A,X+1,0];b.set(M,_*g*R),y.set(f,m*g*R);let E=[R,R,R,R,R,R];T.set(E,p*g*R)}let L=new nn;L.setAttribute("position",new Nt(b,_)),L.setAttribute("uv",new Nt(y,m)),L.setAttribute("faceIndex",new Nt(T,p)),e.push(L),s>Ji&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ku(i,e,t){let n=new zn(i,e,t);return n.texture.mapping=Ro,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ty(i,e,t){let n=new Float32Array(pi),s=new P(0,1,0);return new kn({name:"SphericalGaussianBlur",defines:{n:pi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:jc(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Hu(){return new kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jc(),fragmentShader:`

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
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Vu(){return new kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function jc(){return`

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
	`}function Ry(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===hc||c===uc,h=c===is||c===ss;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new xo(i)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{let u=o.image;if(l&&u&&u.height>0||h&&u&&s(u)){t===null&&(t=new xo(i));let f=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Cy(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Py(i,e,t,n){let s={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}f.removeEventListener("dispose",a),delete s[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let g in f)e.update(f[g],i.ARRAY_BUFFER);let d=u.morphAttributes;for(let g in d){let _=d[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(u){let f=[],d=u.index,g=u.attributes.position,_=0;if(d!==null){let b=d.array;_=d.version;for(let y=0,T=b.length;y<T;y+=3){let L=b[y+0],R=b[y+1],A=b[y+2];f.push(L,R,R,A,A,L)}}else if(g!==void 0){let b=g.array;_=g.version;for(let y=0,T=b.length/3-1;y<T;y+=3){let L=y+0,R=y+1,A=y+2;f.push(L,R,R,A,A,L)}}else return;let m=new(Cf(f)?po:fo)(f,1);m.version=_;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function Ly(i,e,t,n){let s=n.isWebGL2,r;function a(d){r=d}let o,c;function l(d){o=d.type,c=d.bytesPerElement}function h(d,g){i.drawElements(r,g,o,d*c),t.update(g,r,1)}function u(d,g,_){if(_===0)return;let m,p;if(s)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,o,d*c,_),t.update(g,r,_)}function f(d,g,_){if(_===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(d[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,o,d,0,_);let p=0;for(let b=0;b<_;b++)p+=g[b];t.update(p,r,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function Iy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Uy(i,e){return i[0]-e[0]}function Dy(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Ny(i,e,t){let n={},s=new Float32Array(8),r=new WeakMap,a=new _t,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,u){let f=l.morphTargetInfluences;if(e.isWebGL2===!0){let d=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=d!==void 0?d.length:0,_=r.get(h);if(_===void 0||_.count!==g){let I=function(){$.dispose(),r.delete(h),h.removeEventListener("dispose",I)};_!==void 0&&_.texture.dispose();let b=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,T=h.morphAttributes.color!==void 0,L=h.morphAttributes.position||[],R=h.morphAttributes.normal||[],A=h.morphAttributes.color||[],X=0;b===!0&&(X=1),y===!0&&(X=2),T===!0&&(X=3);let M=h.attributes.position.count*X,E=1;M>e.maxTextureSize&&(E=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let H=new Float32Array(M*E*4*g),$=new ho(H,M,E,g);$.type=$n,$.needsUpdate=!0;let ae=X*4;for(let N=0;N<g;N++){let G=L[N],Y=R[N],q=A[N],W=M*E*4*N;for(let Q=0;Q<G.count;Q++){let ne=Q*ae;b===!0&&(a.fromBufferAttribute(G,Q),H[W+ne+0]=a.x,H[W+ne+1]=a.y,H[W+ne+2]=a.z,H[W+ne+3]=0),y===!0&&(a.fromBufferAttribute(Y,Q),H[W+ne+4]=a.x,H[W+ne+5]=a.y,H[W+ne+6]=a.z,H[W+ne+7]=0),T===!0&&(a.fromBufferAttribute(q,Q),H[W+ne+8]=a.x,H[W+ne+9]=a.y,H[W+ne+10]=a.z,H[W+ne+11]=q.itemSize===4?a.w:1)}}_={count:g,texture:$,size:new be(M,E)},r.set(h,_),h.addEventListener("dispose",I)}let m=0;for(let b=0;b<f.length;b++)m+=f[b];let p=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",p),u.getUniforms().setValue(i,"morphTargetInfluences",f),u.getUniforms().setValue(i,"morphTargetsTexture",_.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{let d=f===void 0?0:f.length,g=n[h.id];if(g===void 0||g.length!==d){g=[];for(let y=0;y<d;y++)g[y]=[y,0];n[h.id]=g}for(let y=0;y<d;y++){let T=g[y];T[0]=y,T[1]=f[y]}g.sort(Dy);for(let y=0;y<8;y++)y<d&&g[y][1]?(o[y][0]=g[y][0],o[y][1]=g[y][1]):(o[y][0]=Number.MAX_SAFE_INTEGER,o[y][1]=0);o.sort(Uy);let _=h.morphAttributes.position,m=h.morphAttributes.normal,p=0;for(let y=0;y<8;y++){let T=o[y],L=T[0],R=T[1];L!==Number.MAX_SAFE_INTEGER&&R?(_&&h.getAttribute("morphTarget"+y)!==_[L]&&h.setAttribute("morphTarget"+y,_[L]),m&&h.getAttribute("morphNormal"+y)!==m[L]&&h.setAttribute("morphNormal"+y,m[L]),s[y]=R,p+=R):(_&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),m&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),s[y]=0)}let b=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(i,"morphTargetBaseInfluence",b),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function Oy(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function a(){s=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}var yo=class extends tn{constructor(e,t,n,s,r,a,o,c,l,h){if(h=h!==void 0?h:gi,h!==gi&&h!==rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===gi&&(n=qn),n===void 0&&h===rs&&(n=mi),super(null,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:It,this.minFilter=c!==void 0?c:It,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Uf=new tn,Df=new yo(1,1);Df.compareFunction=Tf;var Nf=new ho,Of=new xc,Ff=new go,Gu=[],Wu=[],Xu=new Float32Array(16),Yu=new Float32Array(9),qu=new Float32Array(4);function hs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Gu[s];if(r===void 0&&(r=new Float32Array(s),Gu[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Po(i,e){let t=Wu[e];t===void 0&&(t=new Int32Array(e),Wu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Fy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function zy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;i.uniform2fv(this.addr,e),ut(t,e)}}function By(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ht(t,e))return;i.uniform3fv(this.addr,e),ut(t,e)}}function ky(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;i.uniform4fv(this.addr,e),ut(t,e)}}function Hy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ut(t,e)}else{if(ht(t,n))return;qu.set(n),i.uniformMatrix2fv(this.addr,!1,qu),ut(t,n)}}function Vy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ut(t,e)}else{if(ht(t,n))return;Yu.set(n),i.uniformMatrix3fv(this.addr,!1,Yu),ut(t,n)}}function Gy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ut(t,e)}else{if(ht(t,n))return;Xu.set(n),i.uniformMatrix4fv(this.addr,!1,Xu),ut(t,n)}}function Wy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Xy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;i.uniform2iv(this.addr,e),ut(t,e)}}function Yy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ht(t,e))return;i.uniform3iv(this.addr,e),ut(t,e)}}function qy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;i.uniform4iv(this.addr,e),ut(t,e)}}function $y(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Zy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;i.uniform2uiv(this.addr,e),ut(t,e)}}function jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ht(t,e))return;i.uniform3uiv(this.addr,e),ut(t,e)}}function Jy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;i.uniform4uiv(this.addr,e),ut(t,e)}}function Ky(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?Df:Uf;t.setTexture2D(e||r,s)}function Qy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Of,s)}function ev(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ff,s)}function tv(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Nf,s)}function nv(i){switch(i){case 5126:return Fy;case 35664:return zy;case 35665:return By;case 35666:return ky;case 35674:return Hy;case 35675:return Vy;case 35676:return Gy;case 5124:case 35670:return Wy;case 35667:case 35671:return Xy;case 35668:case 35672:return Yy;case 35669:case 35673:return qy;case 5125:return $y;case 36294:return Zy;case 36295:return jy;case 36296:return Jy;case 35678:case 36198:case 36298:case 36306:case 35682:return Ky;case 35679:case 36299:case 36307:return Qy;case 35680:case 36300:case 36308:case 36293:return ev;case 36289:case 36303:case 36311:case 36292:return tv}}function iv(i,e){i.uniform1fv(this.addr,e)}function sv(i,e){let t=hs(e,this.size,2);i.uniform2fv(this.addr,t)}function rv(i,e){let t=hs(e,this.size,3);i.uniform3fv(this.addr,t)}function ov(i,e){let t=hs(e,this.size,4);i.uniform4fv(this.addr,t)}function av(i,e){let t=hs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function cv(i,e){let t=hs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function lv(i,e){let t=hs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function hv(i,e){i.uniform1iv(this.addr,e)}function uv(i,e){i.uniform2iv(this.addr,e)}function fv(i,e){i.uniform3iv(this.addr,e)}function dv(i,e){i.uniform4iv(this.addr,e)}function pv(i,e){i.uniform1uiv(this.addr,e)}function mv(i,e){i.uniform2uiv(this.addr,e)}function gv(i,e){i.uniform3uiv(this.addr,e)}function _v(i,e){i.uniform4uiv(this.addr,e)}function xv(i,e,t){let n=this.cache,s=e.length,r=Po(t,s);ht(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Uf,r[a])}function yv(i,e,t){let n=this.cache,s=e.length,r=Po(t,s);ht(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Of,r[a])}function vv(i,e,t){let n=this.cache,s=e.length,r=Po(t,s);ht(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ff,r[a])}function Mv(i,e,t){let n=this.cache,s=e.length,r=Po(t,s);ht(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Nf,r[a])}function Sv(i){switch(i){case 5126:return iv;case 35664:return sv;case 35665:return rv;case 35666:return ov;case 35674:return av;case 35675:return cv;case 35676:return lv;case 5124:case 35670:return hv;case 35667:case 35671:return uv;case 35668:case 35672:return fv;case 35669:case 35673:return dv;case 5125:return pv;case 36294:return mv;case 36295:return gv;case 36296:return _v;case 35678:case 36198:case 36298:case 36306:case 35682:return xv;case 35679:case 36299:case 36307:return yv;case 35680:case 36300:case 36308:case 36293:return vv;case 36289:case 36303:case 36311:case 36292:return Mv}}var Mc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nv(t.type)}},Sc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sv(t.type)}},bc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},ic=/(\w+)(\])?(\[|\.)?/g;function $u(i,e){i.seq.push(e),i.map[e.id]=e}function bv(i,e,t){let n=i.name,s=n.length;for(ic.lastIndex=0;;){let r=ic.exec(n),a=ic.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){$u(t,l===void 0?new Mc(o,i,e):new Sc(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new bc(o),$u(t,u)),t=u}}}var ns=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);bv(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Zu(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Ev=37297,wv=0;function Av(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Tv(i){let e=Qe.getPrimaries(Qe.workingColorSpace),t=Qe.getPrimaries(i),n;switch(e===t?n="":e===so&&t===io?n="LinearDisplayP3ToLinearSRGB":e===io&&t===so&&(n="LinearSRGBToLinearDisplayP3"),i){case Fn:case Co:return[n,"LinearTransferOETF"];case vt:case $c:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function ju(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Av(i.getShaderSource(e),a)}else return s}function Rv(i,e){let t=Tv(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Cv(i,e){let t;switch(e){case Dg:t="Linear";break;case Ng:t="Reinhard";break;case Og:t="OptimizedCineon";break;case Fg:t="ACESFilmic";break;case Bg:t="AgX";break;case zg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Pv(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ki).join(`
`)}function Lv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ki).join(`
`)}function Iv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Uv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ki(i){return i!==""}function Ju(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ku(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Dv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ec(i){return i.replace(Dv,Ov)}var Nv=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Ov(i,e){let t=ze[e];if(t===void 0){let n=Nv.get(e);if(n!==void 0)t=ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ec(t)}var Fv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qu(i){return i.replace(Fv,zv)}function zv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ef(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Bv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===mf?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===cg?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Dn&&(e="SHADOWMAP_TYPE_VSM"),e}function kv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case is:case ss:e="ENVMAP_TYPE_CUBE";break;case Ro:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Hv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ss:e="ENVMAP_MODE_REFRACTION";break}return e}function Vv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case gf:e="ENVMAP_BLENDING_MULTIPLY";break;case Ig:e="ENVMAP_BLENDING_MIX";break;case Ug:e="ENVMAP_BLENDING_ADD";break}return e}function Gv(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Wv(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=Bv(t),l=kv(t),h=Hv(t),u=Vv(t),f=Gv(t),d=t.isWebGL2?"":Pv(t),g=Lv(t),_=Iv(r),m=s.createProgram(),p,b,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ki).join(`
`),p.length>0&&(p+=`
`),b=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ki).join(`
`),b.length>0&&(b+=`
`)):(p=[ef(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ki).join(`
`),b=[d,ef(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Jn?"#define TONE_MAPPING":"",t.toneMapping!==Jn?ze.tonemapping_pars_fragment:"",t.toneMapping!==Jn?Cv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,Rv("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ki).join(`
`)),a=Ec(a),a=Ju(a,t),a=Ku(a,t),o=Ec(o),o=Ju(o,t),o=Ku(o,t),a=Qu(a),o=Qu(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===yu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);let T=y+p+a,L=y+b+o,R=Zu(s,s.VERTEX_SHADER,T),A=Zu(s,s.FRAGMENT_SHADER,L);s.attachShader(m,R),s.attachShader(m,A),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function X($){if(i.debug.checkShaderErrors){let ae=s.getProgramInfoLog(m).trim(),I=s.getShaderInfoLog(R).trim(),N=s.getShaderInfoLog(A).trim(),G=!0,Y=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,R,A);else{let q=ju(s,R,"vertex"),W=ju(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+ae+`
`+q+`
`+W)}else ae!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ae):(I===""||N==="")&&(Y=!1);Y&&($.diagnostics={runnable:G,programLog:ae,vertexShader:{log:I,prefix:p},fragmentShader:{log:N,prefix:b}})}s.deleteShader(R),s.deleteShader(A),M=new ns(s,m),E=Uv(s,m)}let M;this.getUniforms=function(){return M===void 0&&X(this),M};let E;this.getAttributes=function(){return E===void 0&&X(this),E};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=s.getProgramParameter(m,Ev)),H},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wv++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=R,this.fragmentShader=A,this}var Xv=0,wc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ac(e),t.set(e,n)),n}},Ac=class{constructor(e){this.id=Xv++,this.code=e,this.usedTimes=0}};function Yv(i,e,t,n,s,r,a){let o=new Ds,c=new wc,l=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,f=s.vertexTextures,d=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,E,H,$,ae){let I=$.fog,N=ae.geometry,G=M.isMeshStandardMaterial?$.environment:null,Y=(M.isMeshStandardMaterial?t:e).get(M.envMap||G),q=Y&&Y.mapping===Ro?Y.image.height:null,W=g[M.type];M.precision!==null&&(d=s.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));let Q=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ne=Q!==void 0?Q.length:0,de=0;N.morphAttributes.position!==void 0&&(de=1),N.morphAttributes.normal!==void 0&&(de=2),N.morphAttributes.color!==void 0&&(de=3);let V,j,fe,ve;if(W){let At=_n[W];V=At.vertexShader,j=At.fragmentShader}else V=M.vertexShader,j=M.fragmentShader,c.update(M),fe=c.getVertexShaderID(M),ve=c.getFragmentShaderID(M);let xe=i.getRenderTarget(),Ie=ae.isInstancedMesh===!0,Ue=ae.isBatchedMesh===!0,Te=!!M.map,Xe=!!M.matcap,O=!!Y,ft=!!M.aoMap,Ee=!!M.lightMap,Pe=!!M.bumpMap,ge=!!M.normalMap,tt=!!M.displacementMap,De=!!M.emissiveMap,S=!!M.metalnessMap,x=!!M.roughnessMap,F=M.anisotropy>0,te=M.clearcoat>0,K=M.iridescence>0,ee=M.sheen>0,_e=M.transmission>0,he=F&&!!M.anisotropyMap,me=te&&!!M.clearcoatMap,Re=te&&!!M.clearcoatNormalMap,Oe=te&&!!M.clearcoatRoughnessMap,J=K&&!!M.iridescenceMap,Ye=K&&!!M.iridescenceThicknessMap,w=ee&&!!M.sheenColorMap,Z=ee&&!!M.sheenRoughnessMap,ce=!!M.specularMap,ie=!!M.specularColorMap,ye=!!M.specularIntensityMap,Ve=_e&&!!M.transmissionMap,qe=_e&&!!M.thicknessMap,ke=!!M.gradientMap,oe=!!M.alphaMap,C=M.alphaTest>0,se=!!M.alphaHash,re=!!M.extensions,we=!!N.attributes.uv1,Me=!!N.attributes.uv2,$e=!!N.attributes.uv3,je=Jn;return M.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(je=i.toneMapping),{isWebGL2:h,shaderID:W,shaderType:M.type,shaderName:M.name,vertexShader:V,fragmentShader:j,defines:M.defines,customVertexShaderID:fe,customFragmentShaderID:ve,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:Ue,instancing:Ie,instancingColor:Ie&&ae.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:Fn,map:Te,matcap:Xe,envMap:O,envMapMode:O&&Y.mapping,envMapCubeUVHeight:q,aoMap:ft,lightMap:Ee,bumpMap:Pe,normalMap:ge,displacementMap:f&&tt,emissiveMap:De,normalMapObjectSpace:ge&&M.normalMapType===Jg,normalMapTangentSpace:ge&&M.normalMapType===Af,metalnessMap:S,roughnessMap:x,anisotropy:F,anisotropyMap:he,clearcoat:te,clearcoatMap:me,clearcoatNormalMap:Re,clearcoatRoughnessMap:Oe,iridescence:K,iridescenceMap:J,iridescenceThicknessMap:Ye,sheen:ee,sheenColorMap:w,sheenRoughnessMap:Z,specularMap:ce,specularColorMap:ie,specularIntensityMap:ye,transmission:_e,transmissionMap:Ve,thicknessMap:qe,gradientMap:ke,opaque:M.transparent===!1&&M.blending===Qi,alphaMap:oe,alphaTest:C,alphaHash:se,combine:M.combine,mapUv:Te&&_(M.map.channel),aoMapUv:ft&&_(M.aoMap.channel),lightMapUv:Ee&&_(M.lightMap.channel),bumpMapUv:Pe&&_(M.bumpMap.channel),normalMapUv:ge&&_(M.normalMap.channel),displacementMapUv:tt&&_(M.displacementMap.channel),emissiveMapUv:De&&_(M.emissiveMap.channel),metalnessMapUv:S&&_(M.metalnessMap.channel),roughnessMapUv:x&&_(M.roughnessMap.channel),anisotropyMapUv:he&&_(M.anisotropyMap.channel),clearcoatMapUv:me&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Re&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:w&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Z&&_(M.sheenRoughnessMap.channel),specularMapUv:ce&&_(M.specularMap.channel),specularColorMapUv:ie&&_(M.specularColorMap.channel),specularIntensityMapUv:ye&&_(M.specularIntensityMap.channel),transmissionMapUv:Ve&&_(M.transmissionMap.channel),thicknessMapUv:qe&&_(M.thicknessMap.channel),alphaMapUv:oe&&_(M.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ge||F),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:Me,vertexUv3s:$e,pointsUvs:ae.isPoints===!0&&!!N.attributes.uv&&(Te||oe),fog:!!I,useFog:M.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ae.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:de,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&H.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Te&&M.map.isVideoTexture===!0&&Qe.getTransfer(M.map.colorSpace)===nt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ln,flipSided:M.side===Ot,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:re&&M.extensions.derivatives===!0,extensionFragDepth:re&&M.extensions.fragDepth===!0,extensionDrawBuffers:re&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:re&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){let E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(let H in M.defines)E.push(H),E.push(M.defines[H]);return M.isRawShaderMaterial===!1&&(b(E,M),y(E,M),E.push(i.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function b(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function y(M,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),M.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function T(M){let E=g[M.type],H;if(E){let $=_n[E];H=N_.clone($.uniforms)}else H=M.uniforms;return H}function L(M,E){let H;for(let $=0,ae=l.length;$<ae;$++){let I=l[$];if(I.cacheKey===E){H=I,++H.usedTimes;break}}return H===void 0&&(H=new Wv(i,E,M,r),l.push(H)),H}function R(M){if(--M.usedTimes===0){let E=l.indexOf(M);l[E]=l[l.length-1],l.pop(),M.destroy()}}function A(M){c.remove(M)}function X(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:T,acquireProgram:L,releaseProgram:R,releaseShaderCache:A,programs:l,dispose:X}}function qv(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function $v(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function tf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function nf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,f,d,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,f,d,g,_,m){let p=a(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):t.push(p)}function c(u,f,d,g,_,m){let p=a(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):t.unshift(p)}function l(u,f){t.length>1&&t.sort(u||$v),n.length>1&&n.sort(f||tf),s.length>1&&s.sort(f||tf)}function h(){for(let u=e,f=i.length;u<f;u++){let d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function Zv(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new nf,i.set(n,[a])):s>=r.length?(a=new nf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function jv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Be};break;case"SpotLight":t={position:new P,direction:new P,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function Jv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Kv=0;function Qv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function eM(i,e){let t=new jv,n=Jv(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new P);let r=new P,a=new lt,o=new lt;function c(h,u){let f=0,d=0,g=0;for(let $=0;$<9;$++)s.probe[$].set(0,0,0);let _=0,m=0,p=0,b=0,y=0,T=0,L=0,R=0,A=0,X=0,M=0;h.sort(Qv);let E=u===!0?Math.PI:1;for(let $=0,ae=h.length;$<ae;$++){let I=h[$],N=I.color,G=I.intensity,Y=I.distance,q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)f+=N.r*G*E,d+=N.g*G*E,g+=N.b*G*E;else if(I.isLightProbe){for(let W=0;W<9;W++)s.probe[W].addScaledVector(I.sh.coefficients[W],G);M++}else if(I.isDirectionalLight){let W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity*E),I.castShadow){let Q=I.shadow,ne=n.get(I);ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,s.directionalShadow[_]=ne,s.directionalShadowMap[_]=q,s.directionalShadowMatrix[_]=I.shadow.matrix,T++}s.directional[_]=W,_++}else if(I.isSpotLight){let W=t.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(N).multiplyScalar(G*E),W.distance=Y,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,s.spot[p]=W;let Q=I.shadow;if(I.map&&(s.spotLightMap[A]=I.map,A++,Q.updateMatrices(I),I.castShadow&&X++),s.spotLightMatrix[p]=Q.matrix,I.castShadow){let ne=n.get(I);ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,s.spotShadow[p]=ne,s.spotShadowMap[p]=q,R++}p++}else if(I.isRectAreaLight){let W=t.get(I);W.color.copy(N).multiplyScalar(G),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),s.rectArea[b]=W,b++}else if(I.isPointLight){let W=t.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity*E),W.distance=I.distance,W.decay=I.decay,I.castShadow){let Q=I.shadow,ne=n.get(I);ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,ne.shadowCameraNear=Q.camera.near,ne.shadowCameraFar=Q.camera.far,s.pointShadow[m]=ne,s.pointShadowMap[m]=q,s.pointShadowMatrix[m]=I.shadow.matrix,L++}s.point[m]=W,m++}else if(I.isHemisphereLight){let W=t.get(I);W.skyColor.copy(I.color).multiplyScalar(G*E),W.groundColor.copy(I.groundColor).multiplyScalar(G*E),s.hemi[y]=W,y++}}b>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=le.LTC_FLOAT_1,s.rectAreaLTC2=le.LTC_FLOAT_2):(s.rectAreaLTC1=le.LTC_HALF_1,s.rectAreaLTC2=le.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=le.LTC_FLOAT_1,s.rectAreaLTC2=le.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=le.LTC_HALF_1,s.rectAreaLTC2=le.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=d,s.ambient[2]=g;let H=s.hash;(H.directionalLength!==_||H.pointLength!==m||H.spotLength!==p||H.rectAreaLength!==b||H.hemiLength!==y||H.numDirectionalShadows!==T||H.numPointShadows!==L||H.numSpotShadows!==R||H.numSpotMaps!==A||H.numLightProbes!==M)&&(s.directional.length=_,s.spot.length=p,s.rectArea.length=b,s.point.length=m,s.hemi.length=y,s.directionalShadow.length=T,s.directionalShadowMap.length=T,s.pointShadow.length=L,s.pointShadowMap.length=L,s.spotShadow.length=R,s.spotShadowMap.length=R,s.directionalShadowMatrix.length=T,s.pointShadowMatrix.length=L,s.spotLightMatrix.length=R+A-X,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=X,s.numLightProbes=M,H.directionalLength=_,H.pointLength=m,H.spotLength=p,H.rectAreaLength=b,H.hemiLength=y,H.numDirectionalShadows=T,H.numPointShadows=L,H.numSpotShadows=R,H.numSpotMaps=A,H.numLightProbes=M,s.version=Kv++)}function l(h,u){let f=0,d=0,g=0,_=0,m=0,p=u.matrixWorldInverse;for(let b=0,y=h.length;b<y;b++){let T=h[b];if(T.isDirectionalLight){let L=s.directional[f];L.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),f++}else if(T.isSpotLight){let L=s.spot[g];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),L.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),g++}else if(T.isRectAreaLight){let L=s.rectArea[_];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),o.identity(),a.copy(T.matrixWorld),a.premultiply(p),o.extractRotation(a),L.halfWidth.set(T.width*.5,0,0),L.halfHeight.set(0,T.height*.5,0),L.halfWidth.applyMatrix4(o),L.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){let L=s.point[d];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),d++}else if(T.isHemisphereLight){let L=s.hemi[m];L.direction.setFromMatrixPosition(T.matrixWorld),L.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:s}}function sf(i,e){let t=new eM(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(u){n.push(u)}function o(u){s.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function tM(i,e){let t=new WeakMap;function n(r,a=0){let o=t.get(r),c;return o===void 0?(c=new sf(i,e),t.set(r,[c])):a>=o.length?(c=new sf(i,e),o.push(c)):c=o[a],c}function s(){t=new WeakMap}return{get:n,dispose:s}}var Tc=class extends Bn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Rc=class extends Bn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},nM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iM=`uniform sampler2D shadow_pass;
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
}`;function sM(i,e,t){let n=new Ns,s=new be,r=new be,a=new _t,o=new Tc({depthPacking:jg}),c=new Rc,l={},h=t.maxTextureSize,u={[en]:Ot,[Ot]:en,[ln]:ln},f=new kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:nM,fragmentShader:iM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new nn;g.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Dt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mf;let p=this.type;this.render=function(R,A,X){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;let M=i.getRenderTarget(),E=i.getActiveCubeFace(),H=i.getActiveMipmapLevel(),$=i.state;$.setBlending(jn),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);let ae=p!==Dn&&this.type===Dn,I=p===Dn&&this.type!==Dn;for(let N=0,G=R.length;N<G;N++){let Y=R[N],q=Y.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let W=q.getFrameExtents();if(s.multiply(W),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/W.x),s.x=r.x*W.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/W.y),s.y=r.y*W.y,q.mapSize.y=r.y)),q.map===null||ae===!0||I===!0){let ne=this.type!==Dn?{minFilter:It,magFilter:It}:{};q.map!==null&&q.map.dispose(),q.map=new zn(s.x,s.y,ne),q.map.texture.name=Y.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();let Q=q.getViewportCount();for(let ne=0;ne<Q;ne++){let de=q.getViewport(ne);a.set(r.x*de.x,r.y*de.y,r.x*de.z,r.y*de.w),$.viewport(a),q.updateMatrices(Y,ne),n=q.getFrustum(),T(A,X,q.camera,Y,this.type)}q.isPointLightShadow!==!0&&this.type===Dn&&b(q,X),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,E,H)};function b(R,A){let X=e.update(_);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,d.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new zn(s.x,s.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(A,null,X,f,_,null),d.uniforms.shadow_pass.value=R.mapPass.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(A,null,X,d,_,null)}function y(R,A,X,M){let E=null,H=X.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(H!==void 0)E=H;else if(E=X.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let $=E.uuid,ae=A.uuid,I=l[$];I===void 0&&(I={},l[$]=I);let N=I[ae];N===void 0&&(N=E.clone(),I[ae]=N,A.addEventListener("dispose",L)),E=N}if(E.visible=A.visible,E.wireframe=A.wireframe,M===Dn?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:u[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,X.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let $=i.properties.get(E);$.light=X}return E}function T(R,A,X,M,E){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&E===Dn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,R.matrixWorld);let ae=e.update(R),I=R.material;if(Array.isArray(I)){let N=ae.groups;for(let G=0,Y=N.length;G<Y;G++){let q=N[G],W=I[q.materialIndex];if(W&&W.visible){let Q=y(R,W,M,E);R.onBeforeShadow(i,R,A,X,ae,Q,q),i.renderBufferDirect(X,null,ae,Q,R,q),R.onAfterShadow(i,R,A,X,ae,Q,q)}}}else if(I.visible){let N=y(R,I,M,E);R.onBeforeShadow(i,R,A,X,ae,N,null),i.renderBufferDirect(X,null,ae,N,R,null),R.onAfterShadow(i,R,A,X,ae,N,null)}}let $=R.children;for(let ae=0,I=$.length;ae<I;ae++)T($[ae],A,X,M,E)}function L(R){R.target.removeEventListener("dispose",L);for(let X in l){let M=l[X],E=R.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}function rM(i,e,t){let n=t.isWebGL2;function s(){let C=!1,se=new _t,re=null,we=new _t(0,0,0,0);return{setMask:function(Me){re!==Me&&!C&&(i.colorMask(Me,Me,Me,Me),re=Me)},setLocked:function(Me){C=Me},setClear:function(Me,$e,je,dt,At){At===!0&&(Me*=dt,$e*=dt,je*=dt),se.set(Me,$e,je,dt),we.equals(se)===!1&&(i.clearColor(Me,$e,je,dt),we.copy(se))},reset:function(){C=!1,re=null,we.set(-1,0,0,0)}}}function r(){let C=!1,se=null,re=null,we=null;return{setTest:function(Me){Me?Ue(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(Me){se!==Me&&!C&&(i.depthMask(Me),se=Me)},setFunc:function(Me){if(re!==Me){switch(Me){case wg:i.depthFunc(i.NEVER);break;case Ag:i.depthFunc(i.ALWAYS);break;case Tg:i.depthFunc(i.LESS);break;case Qr:i.depthFunc(i.LEQUAL);break;case Rg:i.depthFunc(i.EQUAL);break;case Cg:i.depthFunc(i.GEQUAL);break;case Pg:i.depthFunc(i.GREATER);break;case Lg:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=Me}},setLocked:function(Me){C=Me},setClear:function(Me){we!==Me&&(i.clearDepth(Me),we=Me)},reset:function(){C=!1,se=null,re=null,we=null}}}function a(){let C=!1,se=null,re=null,we=null,Me=null,$e=null,je=null,dt=null,At=null;return{setTest:function(et){C||(et?Ue(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function(et){se!==et&&!C&&(i.stencilMask(et),se=et)},setFunc:function(et,Tt,mn){(re!==et||we!==Tt||Me!==mn)&&(i.stencilFunc(et,Tt,mn),re=et,we=Tt,Me=mn)},setOp:function(et,Tt,mn){($e!==et||je!==Tt||dt!==mn)&&(i.stencilOp(et,Tt,mn),$e=et,je=Tt,dt=mn)},setLocked:function(et){C=et},setClear:function(et){At!==et&&(i.clearStencil(et),At=et)},reset:function(){C=!1,se=null,re=null,we=null,Me=null,$e=null,je=null,dt=null,At=null}}}let o=new s,c=new r,l=new a,h=new WeakMap,u=new WeakMap,f={},d={},g=new WeakMap,_=[],m=null,p=!1,b=null,y=null,T=null,L=null,R=null,A=null,X=null,M=new Be(0,0,0),E=0,H=!1,$=null,ae=null,I=null,N=null,G=null,Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,W=0,Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(Q)[1]),q=W>=1):Q.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),q=W>=2);let ne=null,de={},V=i.getParameter(i.SCISSOR_BOX),j=i.getParameter(i.VIEWPORT),fe=new _t().fromArray(V),ve=new _t().fromArray(j);function xe(C,se,re,we){let Me=new Uint8Array(4),$e=i.createTexture();i.bindTexture(C,$e),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<re;je++)n&&(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)?i.texImage3D(se,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(se+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return $e}let Ie={};Ie[i.TEXTURE_2D]=xe(i.TEXTURE_2D,i.TEXTURE_2D,1),Ie[i.TEXTURE_CUBE_MAP]=xe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ie[i.TEXTURE_2D_ARRAY]=xe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ie[i.TEXTURE_3D]=xe(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Ue(i.DEPTH_TEST),c.setFunc(Qr),De(!1),S(Fh),Ue(i.CULL_FACE),ge(jn);function Ue(C){f[C]!==!0&&(i.enable(C),f[C]=!0)}function Te(C){f[C]!==!1&&(i.disable(C),f[C]=!1)}function Xe(C,se){return d[C]!==se?(i.bindFramebuffer(C,se),d[C]=se,n&&(C===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=se),C===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=se)),!0):!1}function O(C,se){let re=_,we=!1;if(C)if(re=g.get(se),re===void 0&&(re=[],g.set(se,re)),C.isWebGLMultipleRenderTargets){let Me=C.texture;if(re.length!==Me.length||re[0]!==i.COLOR_ATTACHMENT0){for(let $e=0,je=Me.length;$e<je;$e++)re[$e]=i.COLOR_ATTACHMENT0+$e;re.length=Me.length,we=!0}}else re[0]!==i.COLOR_ATTACHMENT0&&(re[0]=i.COLOR_ATTACHMENT0,we=!0);else re[0]!==i.BACK&&(re[0]=i.BACK,we=!0);we&&(t.isWebGL2?i.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function ft(C){return m!==C?(i.useProgram(C),m=C,!0):!1}let Ee={[di]:i.FUNC_ADD,[hg]:i.FUNC_SUBTRACT,[ug]:i.FUNC_REVERSE_SUBTRACT};if(n)Ee[Hh]=i.MIN,Ee[Vh]=i.MAX;else{let C=e.get("EXT_blend_minmax");C!==null&&(Ee[Hh]=C.MIN_EXT,Ee[Vh]=C.MAX_EXT)}let Pe={[fg]:i.ZERO,[dg]:i.ONE,[pg]:i.SRC_COLOR,[cc]:i.SRC_ALPHA,[vg]:i.SRC_ALPHA_SATURATE,[xg]:i.DST_COLOR,[gg]:i.DST_ALPHA,[mg]:i.ONE_MINUS_SRC_COLOR,[lc]:i.ONE_MINUS_SRC_ALPHA,[yg]:i.ONE_MINUS_DST_COLOR,[_g]:i.ONE_MINUS_DST_ALPHA,[Mg]:i.CONSTANT_COLOR,[Sg]:i.ONE_MINUS_CONSTANT_COLOR,[bg]:i.CONSTANT_ALPHA,[Eg]:i.ONE_MINUS_CONSTANT_ALPHA};function ge(C,se,re,we,Me,$e,je,dt,At,et){if(C===jn){p===!0&&(Te(i.BLEND),p=!1);return}if(p===!1&&(Ue(i.BLEND),p=!0),C!==lg){if(C!==b||et!==H){if((y!==di||R!==di)&&(i.blendEquation(i.FUNC_ADD),y=di,R=di),et)switch(C){case Qi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zh:i.blendFunc(i.ONE,i.ONE);break;case Bh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case kh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Qi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zh:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Bh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case kh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}T=null,L=null,A=null,X=null,M.set(0,0,0),E=0,b=C,H=et}return}Me=Me||se,$e=$e||re,je=je||we,(se!==y||Me!==R)&&(i.blendEquationSeparate(Ee[se],Ee[Me]),y=se,R=Me),(re!==T||we!==L||$e!==A||je!==X)&&(i.blendFuncSeparate(Pe[re],Pe[we],Pe[$e],Pe[je]),T=re,L=we,A=$e,X=je),(dt.equals(M)===!1||At!==E)&&(i.blendColor(dt.r,dt.g,dt.b,At),M.copy(dt),E=At),b=C,H=!1}function tt(C,se){C.side===ln?Te(i.CULL_FACE):Ue(i.CULL_FACE);let re=C.side===Ot;se&&(re=!re),De(re),C.blending===Qi&&C.transparent===!1?ge(jn):ge(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),c.setFunc(C.depthFunc),c.setTest(C.depthTest),c.setMask(C.depthWrite),o.setMask(C.colorWrite);let we=C.stencilWrite;l.setTest(we),we&&(l.setMask(C.stencilWriteMask),l.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),l.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),F(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?Ue(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function De(C){$!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),$=C)}function S(C){C!==og?(Ue(i.CULL_FACE),C!==ae&&(C===Fh?i.cullFace(i.BACK):C===ag?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),ae=C}function x(C){C!==I&&(q&&i.lineWidth(C),I=C)}function F(C,se,re){C?(Ue(i.POLYGON_OFFSET_FILL),(N!==se||G!==re)&&(i.polygonOffset(se,re),N=se,G=re)):Te(i.POLYGON_OFFSET_FILL)}function te(C){C?Ue(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function K(C){C===void 0&&(C=i.TEXTURE0+Y-1),ne!==C&&(i.activeTexture(C),ne=C)}function ee(C,se,re){re===void 0&&(ne===null?re=i.TEXTURE0+Y-1:re=ne);let we=de[re];we===void 0&&(we={type:void 0,texture:void 0},de[re]=we),(we.type!==C||we.texture!==se)&&(ne!==re&&(i.activeTexture(re),ne=re),i.bindTexture(C,se||Ie[C]),we.type=C,we.texture=se)}function _e(){let C=de[ne];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function he(){try{i.compressedTexImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function me(){try{i.compressedTexImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Re(){try{i.texSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Oe(){try{i.texSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function J(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ye(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function w(){try{i.texStorage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Z(){try{i.texStorage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ce(){try{i.texImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ie(){try{i.texImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ye(C){fe.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),fe.copy(C))}function Ve(C){ve.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),ve.copy(C))}function qe(C,se){let re=u.get(se);re===void 0&&(re=new WeakMap,u.set(se,re));let we=re.get(C);we===void 0&&(we=i.getUniformBlockIndex(se,C.name),re.set(C,we))}function ke(C,se){let we=u.get(se).get(C);h.get(se)!==we&&(i.uniformBlockBinding(se,we,C.__bindingPointIndex),h.set(se,we))}function oe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},ne=null,de={},d={},g=new WeakMap,_=[],m=null,p=!1,b=null,y=null,T=null,L=null,R=null,A=null,X=null,M=new Be(0,0,0),E=0,H=!1,$=null,ae=null,I=null,N=null,G=null,fe.set(0,0,i.canvas.width,i.canvas.height),ve.set(0,0,i.canvas.width,i.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:Ue,disable:Te,bindFramebuffer:Xe,drawBuffers:O,useProgram:ft,setBlending:ge,setMaterial:tt,setFlipSided:De,setCullFace:S,setLineWidth:x,setPolygonOffset:F,setScissorTest:te,activeTexture:K,bindTexture:ee,unbindTexture:_e,compressedTexImage2D:he,compressedTexImage3D:me,texImage2D:ce,texImage3D:ie,updateUBOMapping:qe,uniformBlockBinding:ke,texStorage2D:w,texStorage3D:Z,texSubImage2D:Re,texSubImage3D:Oe,compressedTexSubImage2D:J,compressedTexSubImage3D:Ye,scissor:ye,viewport:Ve,reset:oe}}function oM(i,e,t,n,s,r,a){let o=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,x){return d?new OffscreenCanvas(S,x):ao("canvas")}function _(S,x,F,te){let K=1;if((S.width>te||S.height>te)&&(K=te/Math.max(S.width,S.height)),K<1||x===!0)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap){let ee=x?oo:Math.floor,_e=ee(K*S.width),he=ee(K*S.height);u===void 0&&(u=g(_e,he));let me=F?g(_e,he):u;return me.width=_e,me.height=he,me.getContext("2d").drawImage(S,0,0,_e,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+_e+"x"+he+")."),me}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),S;return S}function m(S){return gc(S.width)&&gc(S.height)}function p(S){return o?!1:S.wrapS!==hn||S.wrapT!==hn||S.minFilter!==It&&S.minFilter!==Jt}function b(S,x){return S.generateMipmaps&&x&&S.minFilter!==It&&S.minFilter!==Jt}function y(S){i.generateMipmap(S)}function T(S,x,F,te,K=!1){if(o===!1)return x;if(S!==null){if(i[S]!==void 0)return i[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let ee=x;if(x===i.RED&&(F===i.FLOAT&&(ee=i.R32F),F===i.HALF_FLOAT&&(ee=i.R16F),F===i.UNSIGNED_BYTE&&(ee=i.R8)),x===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(ee=i.R8UI),F===i.UNSIGNED_SHORT&&(ee=i.R16UI),F===i.UNSIGNED_INT&&(ee=i.R32UI),F===i.BYTE&&(ee=i.R8I),F===i.SHORT&&(ee=i.R16I),F===i.INT&&(ee=i.R32I)),x===i.RG&&(F===i.FLOAT&&(ee=i.RG32F),F===i.HALF_FLOAT&&(ee=i.RG16F),F===i.UNSIGNED_BYTE&&(ee=i.RG8)),x===i.RGBA){let _e=K?no:Qe.getTransfer(te);F===i.FLOAT&&(ee=i.RGBA32F),F===i.HALF_FLOAT&&(ee=i.RGBA16F),F===i.UNSIGNED_BYTE&&(ee=_e===nt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function L(S,x,F){return b(S,F)===!0||S.isFramebufferTexture&&S.minFilter!==It&&S.minFilter!==Jt?Math.log2(Math.max(x.width,x.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?x.mipmaps.length:1}function R(S){return S===It||S===Gh||S===Ca?i.NEAREST:i.LINEAR}function A(S){let x=S.target;x.removeEventListener("dispose",A),M(x),x.isVideoTexture&&h.delete(x)}function X(S){let x=S.target;x.removeEventListener("dispose",X),H(x)}function M(S){let x=n.get(S);if(x.__webglInit===void 0)return;let F=S.source,te=f.get(F);if(te){let K=te[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&E(S),Object.keys(te).length===0&&f.delete(F)}n.remove(S)}function E(S){let x=n.get(S);i.deleteTexture(x.__webglTexture);let F=S.source,te=f.get(F);delete te[x.__cacheKey],a.memory.textures--}function H(S){let x=S.texture,F=n.get(S),te=n.get(x);if(te.__webglTexture!==void 0&&(i.deleteTexture(te.__webglTexture),a.memory.textures--),S.depthTexture&&S.depthTexture.dispose(),S.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(F.__webglFramebuffer[K]))for(let ee=0;ee<F.__webglFramebuffer[K].length;ee++)i.deleteFramebuffer(F.__webglFramebuffer[K][ee]);else i.deleteFramebuffer(F.__webglFramebuffer[K]);F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer[K])}else{if(Array.isArray(F.__webglFramebuffer))for(let K=0;K<F.__webglFramebuffer.length;K++)i.deleteFramebuffer(F.__webglFramebuffer[K]);else i.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&i.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let K=0;K<F.__webglColorRenderbuffer.length;K++)F.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(F.__webglColorRenderbuffer[K]);F.__webglDepthRenderbuffer&&i.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let K=0,ee=x.length;K<ee;K++){let _e=n.get(x[K]);_e.__webglTexture&&(i.deleteTexture(_e.__webglTexture),a.memory.textures--),n.remove(x[K])}n.remove(x),n.remove(S)}let $=0;function ae(){$=0}function I(){let S=$;return S>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),$+=1,S}function N(S){let x=[];return x.push(S.wrapS),x.push(S.wrapT),x.push(S.wrapR||0),x.push(S.magFilter),x.push(S.minFilter),x.push(S.anisotropy),x.push(S.internalFormat),x.push(S.format),x.push(S.type),x.push(S.generateMipmaps),x.push(S.premultiplyAlpha),x.push(S.flipY),x.push(S.unpackAlignment),x.push(S.colorSpace),x.join()}function G(S,x){let F=n.get(S);if(S.isVideoTexture&&tt(S),S.isRenderTargetTexture===!1&&S.version>0&&F.__version!==S.version){let te=S.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe(F,S,x);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+x)}function Y(S,x){let F=n.get(S);if(S.version>0&&F.__version!==S.version){fe(F,S,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+x)}function q(S,x){let F=n.get(S);if(S.version>0&&F.__version!==S.version){fe(F,S,x);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+x)}function W(S,x){let F=n.get(S);if(S.version>0&&F.__version!==S.version){ve(F,S,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+x)}let Q={[fc]:i.REPEAT,[hn]:i.CLAMP_TO_EDGE,[dc]:i.MIRRORED_REPEAT},ne={[It]:i.NEAREST,[Gh]:i.NEAREST_MIPMAP_NEAREST,[Ca]:i.NEAREST_MIPMAP_LINEAR,[Jt]:i.LINEAR,[kg]:i.LINEAR_MIPMAP_NEAREST,[Ls]:i.LINEAR_MIPMAP_LINEAR},de={[Kg]:i.NEVER,[s_]:i.ALWAYS,[Qg]:i.LESS,[Tf]:i.LEQUAL,[e_]:i.EQUAL,[i_]:i.GEQUAL,[t_]:i.GREATER,[n_]:i.NOTEQUAL};function V(S,x,F){if(F?(i.texParameteri(S,i.TEXTURE_WRAP_S,Q[x.wrapS]),i.texParameteri(S,i.TEXTURE_WRAP_T,Q[x.wrapT]),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,Q[x.wrapR]),i.texParameteri(S,i.TEXTURE_MAG_FILTER,ne[x.magFilter]),i.texParameteri(S,i.TEXTURE_MIN_FILTER,ne[x.minFilter])):(i.texParameteri(S,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(S,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(S===i.TEXTURE_3D||S===i.TEXTURE_2D_ARRAY)&&i.texParameteri(S,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(x.wrapS!==hn||x.wrapT!==hn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(S,i.TEXTURE_MAG_FILTER,R(x.magFilter)),i.texParameteri(S,i.TEXTURE_MIN_FILTER,R(x.minFilter)),x.minFilter!==It&&x.minFilter!==Jt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(i.texParameteri(S,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(S,i.TEXTURE_COMPARE_FUNC,de[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let te=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===It||x.minFilter!==Ca&&x.minFilter!==Ls||x.type===$n&&e.has("OES_texture_float_linear")===!1||o===!1&&x.type===Is&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||n.get(x).__currentAnisotropy)&&(i.texParameterf(S,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy)}}function j(S,x){let F=!1;S.__webglInit===void 0&&(S.__webglInit=!0,x.addEventListener("dispose",A));let te=x.source,K=f.get(te);K===void 0&&(K={},f.set(te,K));let ee=N(x);if(ee!==S.__cacheKey){K[ee]===void 0&&(K[ee]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),K[ee].usedTimes++;let _e=K[S.__cacheKey];_e!==void 0&&(K[S.__cacheKey].usedTimes--,_e.usedTimes===0&&E(x)),S.__cacheKey=ee,S.__webglTexture=K[ee].texture}return F}function fe(S,x,F){let te=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(te=i.TEXTURE_3D);let K=j(S,x),ee=x.source;t.bindTexture(te,S.__webglTexture,i.TEXTURE0+F);let _e=n.get(ee);if(ee.version!==_e.__version||K===!0){t.activeTexture(i.TEXTURE0+F);let he=Qe.getPrimaries(Qe.workingColorSpace),me=x.colorSpace===Kt?null:Qe.getPrimaries(x.colorSpace),Re=x.colorSpace===Kt||he===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let Oe=p(x)&&m(x.image)===!1,J=_(x.image,Oe,!1,s.maxTextureSize);J=De(x,J);let Ye=m(J)||o,w=r.convert(x.format,x.colorSpace),Z=r.convert(x.type),ce=T(x.internalFormat,w,Z,x.colorSpace,x.isVideoTexture);V(te,x,Ye);let ie,ye=x.mipmaps,Ve=o&&x.isVideoTexture!==!0&&ce!==Ef,qe=_e.__version===void 0||K===!0,ke=L(x,J,Ye);if(x.isDepthTexture)ce=i.DEPTH_COMPONENT,o?x.type===$n?ce=i.DEPTH_COMPONENT32F:x.type===qn?ce=i.DEPTH_COMPONENT24:x.type===mi?ce=i.DEPTH24_STENCIL8:ce=i.DEPTH_COMPONENT16:x.type===$n&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===gi&&ce===i.DEPTH_COMPONENT&&x.type!==qc&&x.type!==qn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=qn,Z=r.convert(x.type)),x.format===rs&&ce===i.DEPTH_COMPONENT&&(ce=i.DEPTH_STENCIL,x.type!==mi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=mi,Z=r.convert(x.type))),qe&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,ce,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,ce,J.width,J.height,0,w,Z,null));else if(x.isDataTexture)if(ye.length>0&&Ye){Ve&&qe&&t.texStorage2D(i.TEXTURE_2D,ke,ce,ye[0].width,ye[0].height);for(let oe=0,C=ye.length;oe<C;oe++)ie=ye[oe],Ve?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,w,Z,ie.data):t.texImage2D(i.TEXTURE_2D,oe,ce,ie.width,ie.height,0,w,Z,ie.data);x.generateMipmaps=!1}else Ve?(qe&&t.texStorage2D(i.TEXTURE_2D,ke,ce,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,J.width,J.height,w,Z,J.data)):t.texImage2D(i.TEXTURE_2D,0,ce,J.width,J.height,0,w,Z,J.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ve&&qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ke,ce,ye[0].width,ye[0].height,J.depth);for(let oe=0,C=ye.length;oe<C;oe++)ie=ye[oe],x.format!==un?w!==null?Ve?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ie.width,ie.height,J.depth,w,ie.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,oe,ce,ie.width,ie.height,J.depth,0,ie.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?t.texSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ie.width,ie.height,J.depth,w,Z,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,oe,ce,ie.width,ie.height,J.depth,0,w,Z,ie.data)}else{Ve&&qe&&t.texStorage2D(i.TEXTURE_2D,ke,ce,ye[0].width,ye[0].height);for(let oe=0,C=ye.length;oe<C;oe++)ie=ye[oe],x.format!==un?w!==null?Ve?t.compressedTexSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,w,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,oe,ce,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,w,Z,ie.data):t.texImage2D(i.TEXTURE_2D,oe,ce,ie.width,ie.height,0,w,Z,ie.data)}else if(x.isDataArrayTexture)Ve?(qe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ke,ce,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,w,Z,J.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ce,J.width,J.height,J.depth,0,w,Z,J.data);else if(x.isData3DTexture)Ve?(qe&&t.texStorage3D(i.TEXTURE_3D,ke,ce,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,w,Z,J.data)):t.texImage3D(i.TEXTURE_3D,0,ce,J.width,J.height,J.depth,0,w,Z,J.data);else if(x.isFramebufferTexture){if(qe)if(Ve)t.texStorage2D(i.TEXTURE_2D,ke,ce,J.width,J.height);else{let oe=J.width,C=J.height;for(let se=0;se<ke;se++)t.texImage2D(i.TEXTURE_2D,se,ce,oe,C,0,w,Z,null),oe>>=1,C>>=1}}else if(ye.length>0&&Ye){Ve&&qe&&t.texStorage2D(i.TEXTURE_2D,ke,ce,ye[0].width,ye[0].height);for(let oe=0,C=ye.length;oe<C;oe++)ie=ye[oe],Ve?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,w,Z,ie):t.texImage2D(i.TEXTURE_2D,oe,ce,w,Z,ie);x.generateMipmaps=!1}else Ve?(qe&&t.texStorage2D(i.TEXTURE_2D,ke,ce,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,w,Z,J)):t.texImage2D(i.TEXTURE_2D,0,ce,w,Z,J);b(x,Ye)&&y(te),_e.__version=ee.version,x.onUpdate&&x.onUpdate(x)}S.__version=x.version}function ve(S,x,F){if(x.image.length!==6)return;let te=j(S,x),K=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,S.__webglTexture,i.TEXTURE0+F);let ee=n.get(K);if(K.version!==ee.__version||te===!0){t.activeTexture(i.TEXTURE0+F);let _e=Qe.getPrimaries(Qe.workingColorSpace),he=x.colorSpace===Kt?null:Qe.getPrimaries(x.colorSpace),me=x.colorSpace===Kt||_e===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let Re=x.isCompressedTexture||x.image[0].isCompressedTexture,Oe=x.image[0]&&x.image[0].isDataTexture,J=[];for(let oe=0;oe<6;oe++)!Re&&!Oe?J[oe]=_(x.image[oe],!1,!0,s.maxCubemapSize):J[oe]=Oe?x.image[oe].image:x.image[oe],J[oe]=De(x,J[oe]);let Ye=J[0],w=m(Ye)||o,Z=r.convert(x.format,x.colorSpace),ce=r.convert(x.type),ie=T(x.internalFormat,Z,ce,x.colorSpace),ye=o&&x.isVideoTexture!==!0,Ve=ee.__version===void 0||te===!0,qe=L(x,Ye,w);V(i.TEXTURE_CUBE_MAP,x,w);let ke;if(Re){ye&&Ve&&t.texStorage2D(i.TEXTURE_CUBE_MAP,qe,ie,Ye.width,Ye.height);for(let oe=0;oe<6;oe++){ke=J[oe].mipmaps;for(let C=0;C<ke.length;C++){let se=ke[C];x.format!==un?Z!==null?ye?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,C,0,0,se.width,se.height,Z,se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,C,ie,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ye?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,C,0,0,se.width,se.height,Z,ce,se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,C,ie,se.width,se.height,0,Z,ce,se.data)}}}else{ke=x.mipmaps,ye&&Ve&&(ke.length>0&&qe++,t.texStorage2D(i.TEXTURE_CUBE_MAP,qe,ie,J[0].width,J[0].height));for(let oe=0;oe<6;oe++)if(Oe){ye?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,J[oe].width,J[oe].height,Z,ce,J[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ie,J[oe].width,J[oe].height,0,Z,ce,J[oe].data);for(let C=0;C<ke.length;C++){let re=ke[C].image[oe].image;ye?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,C+1,0,0,re.width,re.height,Z,ce,re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,C+1,ie,re.width,re.height,0,Z,ce,re.data)}}else{ye?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Z,ce,J[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ie,Z,ce,J[oe]);for(let C=0;C<ke.length;C++){let se=ke[C];ye?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,C+1,0,0,Z,ce,se.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,C+1,ie,Z,ce,se.image[oe])}}}b(x,w)&&y(i.TEXTURE_CUBE_MAP),ee.__version=K.version,x.onUpdate&&x.onUpdate(x)}S.__version=x.version}function xe(S,x,F,te,K,ee){let _e=r.convert(F.format,F.colorSpace),he=r.convert(F.type),me=T(F.internalFormat,_e,he,F.colorSpace);if(!n.get(x).__hasExternalTextures){let Oe=Math.max(1,x.width>>ee),J=Math.max(1,x.height>>ee);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,ee,me,Oe,J,x.depth,0,_e,he,null):t.texImage2D(K,ee,me,Oe,J,0,_e,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,S),ge(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,K,n.get(F).__webglTexture,0,Pe(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,K,n.get(F).__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ie(S,x,F){if(i.bindRenderbuffer(i.RENDERBUFFER,S),x.depthBuffer&&!x.stencilBuffer){let te=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(F||ge(x)){let K=x.depthTexture;K&&K.isDepthTexture&&(K.type===$n?te=i.DEPTH_COMPONENT32F:K.type===qn&&(te=i.DEPTH_COMPONENT24));let ee=Pe(x);ge(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,te,x.width,x.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,te,x.width,x.height)}else i.renderbufferStorage(i.RENDERBUFFER,te,x.width,x.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,S)}else if(x.depthBuffer&&x.stencilBuffer){let te=Pe(x);F&&ge(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,te,i.DEPTH24_STENCIL8,x.width,x.height):ge(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te,i.DEPTH24_STENCIL8,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,S)}else{let te=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let K=0;K<te.length;K++){let ee=te[K],_e=r.convert(ee.format,ee.colorSpace),he=r.convert(ee.type),me=T(ee.internalFormat,_e,he,ee.colorSpace),Re=Pe(x);F&&ge(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,me,x.width,x.height):ge(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Re,me,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,me,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ue(S,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,S),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G(x.depthTexture,0);let te=n.get(x.depthTexture).__webglTexture,K=Pe(x);if(x.depthTexture.format===gi)ge(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(x.depthTexture.format===rs)ge(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Te(S){let x=n.get(S),F=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!x.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ue(x.__webglFramebuffer,S)}else if(F){x.__webglDepthbuffer=[];for(let te=0;te<6;te++)t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[te]),x.__webglDepthbuffer[te]=i.createRenderbuffer(),Ie(x.__webglDepthbuffer[te],S,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=i.createRenderbuffer(),Ie(x.__webglDepthbuffer,S,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(S,x,F){let te=n.get(S);x!==void 0&&xe(te.__webglFramebuffer,S,S.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Te(S)}function O(S){let x=S.texture,F=n.get(S),te=n.get(x);S.addEventListener("dispose",X),S.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=x.version,a.memory.textures++);let K=S.isWebGLCubeRenderTarget===!0,ee=S.isWebGLMultipleRenderTargets===!0,_e=m(S)||o;if(K){F.__webglFramebuffer=[];for(let he=0;he<6;he++)if(o&&x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer[he]=[];for(let me=0;me<x.mipmaps.length;me++)F.__webglFramebuffer[he][me]=i.createFramebuffer()}else F.__webglFramebuffer[he]=i.createFramebuffer()}else{if(o&&x.mipmaps&&x.mipmaps.length>0){F.__webglFramebuffer=[];for(let he=0;he<x.mipmaps.length;he++)F.__webglFramebuffer[he]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(ee)if(s.drawBuffers){let he=S.texture;for(let me=0,Re=he.length;me<Re;me++){let Oe=n.get(he[me]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&S.samples>0&&ge(S)===!1){let he=ee?x:[x];F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let me=0;me<he.length;me++){let Re=he[me];F.__webglColorRenderbuffer[me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[me]);let Oe=r.convert(Re.format,Re.colorSpace),J=r.convert(Re.type),Ye=T(Re.internalFormat,Oe,J,Re.colorSpace,S.isXRRenderTarget===!0),w=Pe(S);i.renderbufferStorageMultisample(i.RENDERBUFFER,w,Ye,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,F.__webglColorRenderbuffer[me])}i.bindRenderbuffer(i.RENDERBUFFER,null),S.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Ie(F.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),V(i.TEXTURE_CUBE_MAP,x,_e);for(let he=0;he<6;he++)if(o&&x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)xe(F.__webglFramebuffer[he][me],S,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,me);else xe(F.__webglFramebuffer[he],S,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);b(x,_e)&&y(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){let he=S.texture;for(let me=0,Re=he.length;me<Re;me++){let Oe=he[me],J=n.get(Oe);t.bindTexture(i.TEXTURE_2D,J.__webglTexture),V(i.TEXTURE_2D,Oe,_e),xe(F.__webglFramebuffer,S,Oe,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,0),b(Oe,_e)&&y(i.TEXTURE_2D)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(o?he=S.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(he,te.__webglTexture),V(he,x,_e),o&&x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)xe(F.__webglFramebuffer[me],S,x,i.COLOR_ATTACHMENT0,he,me);else xe(F.__webglFramebuffer,S,x,i.COLOR_ATTACHMENT0,he,0);b(x,_e)&&y(he),t.unbindTexture()}S.depthBuffer&&Te(S)}function ft(S){let x=m(S)||o,F=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let te=0,K=F.length;te<K;te++){let ee=F[te];if(b(ee,x)){let _e=S.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,he=n.get(ee).__webglTexture;t.bindTexture(_e,he),y(_e),t.unbindTexture()}}}function Ee(S){if(o&&S.samples>0&&ge(S)===!1){let x=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],F=S.width,te=S.height,K=i.COLOR_BUFFER_BIT,ee=[],_e=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=n.get(S),me=S.isWebGLMultipleRenderTargets===!0;if(me)for(let Re=0;Re<x.length;Re++)t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let Re=0;Re<x.length;Re++){ee.push(i.COLOR_ATTACHMENT0+Re),S.depthBuffer&&ee.push(_e);let Oe=he.__ignoreDepthValues!==void 0?he.__ignoreDepthValues:!1;if(Oe===!1&&(S.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),S.stencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),me&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,he.__webglColorRenderbuffer[Re]),Oe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[_e]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_e])),me){let J=n.get(x[Re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,F,te,0,0,F,te,K,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),me)for(let Re=0;Re<x.length;Re++){t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,he.__webglColorRenderbuffer[Re]);let Oe=n.get(x[Re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,Oe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}}function Pe(S){return Math.min(s.maxSamples,S.samples)}function ge(S){let x=n.get(S);return o&&S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function tt(S){let x=a.render.frame;h.get(S)!==x&&(h.set(S,x),S.update())}function De(S,x){let F=S.colorSpace,te=S.format,K=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||S.format===mc||F!==Fn&&F!==Kt&&(Qe.getTransfer(F)===nt?o===!1?e.has("EXT_sRGB")===!0&&te===un?(S.format=mc,S.minFilter=Jt,S.generateMipmaps=!1):x=co.sRGBToLinear(x):(te!==un||K!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),x}this.allocateTextureUnit=I,this.resetTextureUnits=ae,this.setTexture2D=G,this.setTexture2DArray=Y,this.setTexture3D=q,this.setTextureCube=W,this.rebindTextures=Xe,this.setupRenderTarget=O,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ge}function aM(i,e,t){let n=t.isWebGL2;function s(r,a=Kt){let o,c=Qe.getTransfer(a);if(r===Kn)return i.UNSIGNED_BYTE;if(r===yf)return i.UNSIGNED_SHORT_4_4_4_4;if(r===vf)return i.UNSIGNED_SHORT_5_5_5_1;if(r===Hg)return i.BYTE;if(r===Vg)return i.SHORT;if(r===qc)return i.UNSIGNED_SHORT;if(r===xf)return i.INT;if(r===qn)return i.UNSIGNED_INT;if(r===$n)return i.FLOAT;if(r===Is)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Gg)return i.ALPHA;if(r===un)return i.RGBA;if(r===Wg)return i.LUMINANCE;if(r===Xg)return i.LUMINANCE_ALPHA;if(r===gi)return i.DEPTH_COMPONENT;if(r===rs)return i.DEPTH_STENCIL;if(r===mc)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Yg)return i.RED;if(r===Mf)return i.RED_INTEGER;if(r===qg)return i.RG;if(r===Sf)return i.RG_INTEGER;if(r===bf)return i.RGBA_INTEGER;if(r===Pa||r===La||r===Ia||r===Ua)if(c===nt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Pa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===La)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ia)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ua)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Pa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===La)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ia)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ua)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Wh||r===Xh||r===Yh||r===qh)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Wh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Xh)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Yh)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===qh)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ef)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===$h||r===Zh)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===$h)return c===nt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Zh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===jh||r===Jh||r===Kh||r===Qh||r===eu||r===tu||r===nu||r===iu||r===su||r===ru||r===ou||r===au||r===cu||r===lu)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===jh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Jh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Kh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Qh)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===eu)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===tu)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===nu)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===iu)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===su)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ru)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ou)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===au)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===cu)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===lu)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Da||r===hu||r===uu)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Da)return c===nt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===hu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===uu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===$g||r===fu||r===du||r===pu)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Da)return o.COMPRESSED_RED_RGTC1_EXT;if(r===fu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===du)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===pu)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===mi?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var Cc=class extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Yt=class extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}},cM={type:"move"},Ps=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Yt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Yt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Yt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cM)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Yt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Pc=class extends yn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,g=null,_=t.getContextAttributes(),m=null,p=null,b=[],y=[],T=new be,L=null,R=new Ut;R.layers.enable(1),R.viewport=new _t;let A=new Ut;A.layers.enable(2),A.viewport=new _t;let X=[R,A],M=new Cc;M.layers.enable(1),M.layers.enable(2);let E=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let j=b[V];return j===void 0&&(j=new Ps,b[V]=j),j.getTargetRaySpace()},this.getControllerGrip=function(V){let j=b[V];return j===void 0&&(j=new Ps,b[V]=j),j.getGripSpace()},this.getHand=function(V){let j=b[V];return j===void 0&&(j=new Ps,b[V]=j),j.getHandSpace()};function $(V){let j=y.indexOf(V.inputSource);if(j===-1)return;let fe=b[j];fe!==void 0&&(fe.update(V.inputSource,V.frame,l||a),fe.dispatchEvent({type:V.type,data:V.inputSource}))}function ae(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",ae),s.removeEventListener("inputsourceschange",I);for(let V=0;V<b.length;V++){let j=y[V];j!==null&&(y[V]=null,b[V].disconnect(j))}E=null,H=null,e.setRenderTarget(m),d=null,f=null,u=null,s=null,p=null,de.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",ae),s.addEventListener("inputsourceschange",I),_.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(T),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let j={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,j),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new zn(d.framebufferWidth,d.framebufferHeight,{format:un,type:Kn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let j=null,fe=null,ve=null;_.depth&&(ve=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=_.stencil?rs:gi,fe=_.stencil?mi:qn);let xe={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(xe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new zn(f.textureWidth,f.textureHeight,{format:un,type:Kn,depthTexture:new yo(f.textureWidth,f.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});let Ie=e.properties.get(p);Ie.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),de.setContext(s),de.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function I(V){for(let j=0;j<V.removed.length;j++){let fe=V.removed[j],ve=y.indexOf(fe);ve>=0&&(y[ve]=null,b[ve].disconnect(fe))}for(let j=0;j<V.added.length;j++){let fe=V.added[j],ve=y.indexOf(fe);if(ve===-1){for(let Ie=0;Ie<b.length;Ie++)if(Ie>=y.length){y.push(fe),ve=Ie;break}else if(y[Ie]===null){y[Ie]=fe,ve=Ie;break}if(ve===-1)break}let xe=b[ve];xe&&xe.connect(fe)}}let N=new P,G=new P;function Y(V,j,fe){N.setFromMatrixPosition(j.matrixWorld),G.setFromMatrixPosition(fe.matrixWorld);let ve=N.distanceTo(G),xe=j.projectionMatrix.elements,Ie=fe.projectionMatrix.elements,Ue=xe[14]/(xe[10]-1),Te=xe[14]/(xe[10]+1),Xe=(xe[9]+1)/xe[5],O=(xe[9]-1)/xe[5],ft=(xe[8]-1)/xe[0],Ee=(Ie[8]+1)/Ie[0],Pe=Ue*ft,ge=Ue*Ee,tt=ve/(-ft+Ee),De=tt*-ft;j.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(De),V.translateZ(tt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();let S=Ue+tt,x=Te+tt,F=Pe-De,te=ge+(ve-De),K=Xe*Te/x*S,ee=O*Te/x*S;V.projectionMatrix.makePerspective(F,te,K,ee,S,x),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function q(V,j){j===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(j.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;M.near=A.near=R.near=V.near,M.far=A.far=R.far=V.far,(E!==M.near||H!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),E=M.near,H=M.far);let j=V.parent,fe=M.cameras;q(M,j);for(let ve=0;ve<fe.length;ve++)q(fe[ve],j);fe.length===2?Y(M,R,A):M.projectionMatrix.copy(R.projectionMatrix),W(V,M,j)};function W(V,j,fe){fe===null?V.matrix.copy(j.matrixWorld):(V.matrix.copy(fe.matrixWorld),V.matrix.invert(),V.matrix.multiply(j.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(j.projectionMatrix),V.projectionMatrixInverse.copy(j.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Us*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(V){c=V,f!==null&&(f.fixedFoveation=V),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=V)};let Q=null;function ne(V,j){if(h=j.getViewerPose(l||a),g=j,h!==null){let fe=h.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let ve=!1;fe.length!==M.cameras.length&&(M.cameras.length=0,ve=!0);for(let xe=0;xe<fe.length;xe++){let Ie=fe[xe],Ue=null;if(d!==null)Ue=d.getViewport(Ie);else{let Xe=u.getViewSubImage(f,Ie);Ue=Xe.viewport,xe===0&&(e.setRenderTargetTextures(p,Xe.colorTexture,f.ignoreDepthValues?void 0:Xe.depthStencilTexture),e.setRenderTarget(p))}let Te=X[xe];Te===void 0&&(Te=new Ut,Te.layers.enable(xe),Te.viewport=new _t,X[xe]=Te),Te.matrix.fromArray(Ie.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(Ie.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),xe===0&&(M.matrix.copy(Te.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ve===!0&&M.cameras.push(Te)}}for(let fe=0;fe<b.length;fe++){let ve=y[fe],xe=b[fe];ve!==null&&xe!==void 0&&xe.update(ve,j,l||a)}Q&&Q(V,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}let de=new If;de.setAnimationLoop(ne),this.setAnimationLoop=function(V){Q=V},this.dispose=function(){}}};function lM(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Lf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,y,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,T)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,b,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ot&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ot&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=e.get(p).envMap;if(b&&(m.envMap.value=b,m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let y=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*y,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ot&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function hM(i,e,t,n){let s={},r={},a=[],o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(b,y){let T=y.program;n.uniformBlockBinding(b,T)}function l(b,y){let T=s[b.id];T===void 0&&(g(b),T=h(b),s[b.id]=T,b.addEventListener("dispose",m));let L=y.program;n.updateUBOMapping(b,L);let R=e.render.frame;r[b.id]!==R&&(f(b),r[b.id]=R)}function h(b){let y=u();b.__bindingPointIndex=y;let T=i.createBuffer(),L=b.__size,R=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,L,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,T),T}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){let y=s[b.id],T=b.uniforms,L=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let R=0,A=T.length;R<A;R++){let X=Array.isArray(T[R])?T[R]:[T[R]];for(let M=0,E=X.length;M<E;M++){let H=X[M];if(d(H,R,M,L)===!0){let $=H.__offset,ae=Array.isArray(H.value)?H.value:[H.value],I=0;for(let N=0;N<ae.length;N++){let G=ae[N],Y=_(G);typeof G=="number"||typeof G=="boolean"?(H.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,$+I,H.__data)):G.isMatrix3?(H.__data[0]=G.elements[0],H.__data[1]=G.elements[1],H.__data[2]=G.elements[2],H.__data[3]=0,H.__data[4]=G.elements[3],H.__data[5]=G.elements[4],H.__data[6]=G.elements[5],H.__data[7]=0,H.__data[8]=G.elements[6],H.__data[9]=G.elements[7],H.__data[10]=G.elements[8],H.__data[11]=0):(G.toArray(H.__data,I),I+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,$,H.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,y,T,L){let R=b.value,A=y+"_"+T;if(L[A]===void 0)return typeof R=="number"||typeof R=="boolean"?L[A]=R:L[A]=R.clone(),!0;{let X=L[A];if(typeof R=="number"||typeof R=="boolean"){if(X!==R)return L[A]=R,!0}else if(X.equals(R)===!1)return X.copy(R),!0}return!1}function g(b){let y=b.uniforms,T=0,L=16;for(let A=0,X=y.length;A<X;A++){let M=Array.isArray(y[A])?y[A]:[y[A]];for(let E=0,H=M.length;E<H;E++){let $=M[E],ae=Array.isArray($.value)?$.value:[$.value];for(let I=0,N=ae.length;I<N;I++){let G=ae[I],Y=_(G),q=T%L;q!==0&&L-q<Y.boundary&&(T+=L-q),$.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=T,T+=Y.storage}}}let R=T%L;return R>0&&(T+=L-R),b.__size=T,b.__cache={},this}function _(b){let y={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(y.boundary=4,y.storage=4):b.isVector2?(y.boundary=8,y.storage=8):b.isVector3||b.isColor?(y.boundary=16,y.storage=12):b.isVector4?(y.boundary=16,y.storage=16):b.isMatrix3?(y.boundary=48,y.storage=48):b.isMatrix4?(y.boundary=64,y.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),y}function m(b){let y=b.target;y.removeEventListener("dispose",m);let T=a.indexOf(y.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}var Fs=class{constructor(e={}){let{canvas:t=y_(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;let d=new Uint32Array(4),g=new Int32Array(4),_=null,m=null,p=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=vt,this._useLegacyLights=!1,this.toneMapping=Jn,this.toneMappingExposure=1;let y=this,T=!1,L=0,R=0,A=null,X=-1,M=null,E=new _t,H=new _t,$=null,ae=new Be(0),I=0,N=t.width,G=t.height,Y=1,q=null,W=null,Q=new _t(0,0,N,G),ne=new _t(0,0,N,G),de=!1,V=new Ns,j=!1,fe=!1,ve=null,xe=new lt,Ie=new be,Ue=new P,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Xe(){return A===null?Y:1}let O=n;function ft(v,U){for(let B=0;B<v.length;B++){let k=v[B],z=t.getContext(k,U);if(z!==null)return z}return null}try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r160"),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",C,!1),t.addEventListener("webglcontextcreationerror",se,!1),O===null){let U=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&U.shift(),O=ft(U,v),O===null)throw ft(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Ee,Pe,ge,tt,De,S,x,F,te,K,ee,_e,he,me,Re,Oe,J,Ye,w,Z,ce,ie,ye,Ve;function qe(){Ee=new Cy(O),Pe=new by(O,Ee,e),Ee.init(Pe),ie=new aM(O,Ee,Pe),ge=new rM(O,Ee,Pe),tt=new Iy(O),De=new qv,S=new oM(O,Ee,ge,De,Pe,ie,tt),x=new wy(y),F=new Ry(y),te=new k_(O,Pe),ye=new My(O,Ee,te,Pe),K=new Py(O,te,tt,ye),ee=new Oy(O,K,te,tt),w=new Ny(O,Pe,S),Oe=new Ey(De),_e=new Yv(y,x,F,Ee,Pe,ye,Oe),he=new lM(y,De),me=new Zv,Re=new tM(Ee,Pe),Ye=new vy(y,x,F,ge,ee,f,c),J=new sM(y,ee,Pe),Ve=new hM(O,tt,Pe,ge),Z=new Sy(O,Ee,tt,Pe),ce=new Ly(O,Ee,tt,Pe),tt.programs=_e.programs,y.capabilities=Pe,y.extensions=Ee,y.properties=De,y.renderLists=me,y.shadowMap=J,y.state=ge,y.info=tt}qe();let ke=new Pc(y,O);this.xr=ke,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let v=Ee.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Ee.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(v){v!==void 0&&(Y=v,this.setSize(N,G,!1))},this.getSize=function(v){return v.set(N,G)},this.setSize=function(v,U,B=!0){if(ke.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=v,G=U,t.width=Math.floor(v*Y),t.height=Math.floor(U*Y),B===!0&&(t.style.width=v+"px",t.style.height=U+"px"),this.setViewport(0,0,v,U)},this.getDrawingBufferSize=function(v){return v.set(N*Y,G*Y).floor()},this.setDrawingBufferSize=function(v,U,B){N=v,G=U,Y=B,t.width=Math.floor(v*B),t.height=Math.floor(U*B),this.setViewport(0,0,v,U)},this.getCurrentViewport=function(v){return v.copy(E)},this.getViewport=function(v){return v.copy(Q)},this.setViewport=function(v,U,B,k){v.isVector4?Q.set(v.x,v.y,v.z,v.w):Q.set(v,U,B,k),ge.viewport(E.copy(Q).multiplyScalar(Y).floor())},this.getScissor=function(v){return v.copy(ne)},this.setScissor=function(v,U,B,k){v.isVector4?ne.set(v.x,v.y,v.z,v.w):ne.set(v,U,B,k),ge.scissor(H.copy(ne).multiplyScalar(Y).floor())},this.getScissorTest=function(){return de},this.setScissorTest=function(v){ge.setScissorTest(de=v)},this.setOpaqueSort=function(v){q=v},this.setTransparentSort=function(v){W=v},this.getClearColor=function(v){return v.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(v=!0,U=!0,B=!0){let k=0;if(v){let z=!1;if(A!==null){let pe=A.texture.format;z=pe===bf||pe===Sf||pe===Mf}if(z){let pe=A.texture.type,Se=pe===Kn||pe===qn||pe===qc||pe===mi||pe===yf||pe===vf,Ce=Ye.getClearColor(),Le=Ye.getClearAlpha(),He=Ce.r,Ne=Ce.g,Fe=Ce.b;Se?(d[0]=He,d[1]=Ne,d[2]=Fe,d[3]=Le,O.clearBufferuiv(O.COLOR,0,d)):(g[0]=He,g[1]=Ne,g[2]=Fe,g[3]=Le,O.clearBufferiv(O.COLOR,0,g))}else k|=O.COLOR_BUFFER_BIT}U&&(k|=O.DEPTH_BUFFER_BIT),B&&(k|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",C,!1),t.removeEventListener("webglcontextcreationerror",se,!1),me.dispose(),Re.dispose(),De.dispose(),x.dispose(),F.dispose(),ee.dispose(),ye.dispose(),Ve.dispose(),_e.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",At),ke.removeEventListener("sessionend",et),ve&&(ve.dispose(),ve=null),Tt.stop()};function oe(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function C(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let v=tt.autoReset,U=J.enabled,B=J.autoUpdate,k=J.needsUpdate,z=J.type;qe(),tt.autoReset=v,J.enabled=U,J.autoUpdate=B,J.needsUpdate=k,J.type=z}function se(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function re(v){let U=v.target;U.removeEventListener("dispose",re),we(U)}function we(v){Me(v),De.remove(v)}function Me(v){let U=De.get(v).programs;U!==void 0&&(U.forEach(function(B){_e.releaseProgram(B)}),v.isShaderMaterial&&_e.releaseShaderCache(v))}this.renderBufferDirect=function(v,U,B,k,z,pe){U===null&&(U=Te);let Se=z.isMesh&&z.matrixWorld.determinant()<0,Ce=Gd(v,U,B,k,z);ge.setMaterial(k,Se);let Le=B.index,He=1;if(k.wireframe===!0){if(Le=K.getWireframeAttribute(B),Le===void 0)return;He=2}let Ne=B.drawRange,Fe=B.attributes.position,ot=Ne.start*He,zt=(Ne.start+Ne.count)*He;pe!==null&&(ot=Math.max(ot,pe.start*He),zt=Math.min(zt,(pe.start+pe.count)*He)),Le!==null?(ot=Math.max(ot,0),zt=Math.min(zt,Le.count)):Fe!=null&&(ot=Math.max(ot,0),zt=Math.min(zt,Fe.count));let pt=zt-ot;if(pt<0||pt===1/0)return;ye.setup(z,k,Ce,B,Le);let Sn,st=Z;if(Le!==null&&(Sn=te.get(Le),st=ce,st.setIndex(Sn)),z.isMesh)k.wireframe===!0?(ge.setLineWidth(k.wireframeLinewidth*Xe()),st.setMode(O.LINES)):st.setMode(O.TRIANGLES);else if(z.isLine){let Ge=k.linewidth;Ge===void 0&&(Ge=1),ge.setLineWidth(Ge*Xe()),z.isLineSegments?st.setMode(O.LINES):z.isLineLoop?st.setMode(O.LINE_LOOP):st.setMode(O.LINE_STRIP)}else z.isPoints?st.setMode(O.POINTS):z.isSprite&&st.setMode(O.TRIANGLES);if(z.isBatchedMesh)st.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else if(z.isInstancedMesh)st.renderInstances(ot,pt,z.count);else if(B.isInstancedBufferGeometry){let Ge=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Vo=Math.min(B.instanceCount,Ge);st.renderInstances(ot,pt,Vo)}else st.render(ot,pt)};function $e(v,U,B){v.transparent===!0&&v.side===ln&&v.forceSinglePass===!1?(v.side=Ot,v.needsUpdate=!0,Ws(v,U,B),v.side=en,v.needsUpdate=!0,Ws(v,U,B),v.side=ln):Ws(v,U,B)}this.compile=function(v,U,B=null){B===null&&(B=v),m=Re.get(B),m.init(),b.push(m),B.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),v!==B&&v.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights(y._useLegacyLights);let k=new Set;return v.traverse(function(z){let pe=z.material;if(pe)if(Array.isArray(pe))for(let Se=0;Se<pe.length;Se++){let Ce=pe[Se];$e(Ce,B,z),k.add(Ce)}else $e(pe,B,z),k.add(pe)}),b.pop(),m=null,k},this.compileAsync=function(v,U,B=null){let k=this.compile(v,U,B);return new Promise(z=>{function pe(){if(k.forEach(function(Se){De.get(Se).currentProgram.isReady()&&k.delete(Se)}),k.size===0){z(v);return}setTimeout(pe,10)}Ee.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let je=null;function dt(v){je&&je(v)}function At(){Tt.stop()}function et(){Tt.start()}let Tt=new If;Tt.setAnimationLoop(dt),typeof self<"u"&&Tt.setContext(self),this.setAnimationLoop=function(v){je=v,ke.setAnimationLoop(v),v===null?Tt.stop():Tt.start()},ke.addEventListener("sessionstart",At),ke.addEventListener("sessionend",et),this.render=function(v,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(U),U=ke.getCamera()),v.isScene===!0&&v.onBeforeRender(y,v,U,A),m=Re.get(v,b.length),m.init(),b.push(m),xe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),V.setFromProjectionMatrix(xe),fe=this.localClippingEnabled,j=Oe.init(this.clippingPlanes,fe),_=me.get(v,p.length),_.init(),p.push(_),mn(v,U,0,y.sortObjects),_.finish(),y.sortObjects===!0&&_.sort(q,W),this.info.render.frame++,j===!0&&Oe.beginShadows();let B=m.state.shadowsArray;if(J.render(B,v,U),j===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ye.render(_,v),m.setupLights(y._useLegacyLights),U.isArrayCamera){let k=U.cameras;for(let z=0,pe=k.length;z<pe;z++){let Se=k[z];ml(_,v,Se,Se.viewport)}}else ml(_,v,U);A!==null&&(S.updateMultisampleRenderTarget(A),S.updateRenderTargetMipmap(A)),v.isScene===!0&&v.onAfterRender(y,v,U),ye.resetDefaultState(),X=-1,M=null,b.pop(),b.length>0?m=b[b.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function mn(v,U,B,k){if(v.visible===!1)return;if(v.layers.test(U.layers)){if(v.isGroup)B=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(U);else if(v.isLight)m.pushLight(v),v.castShadow&&m.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||V.intersectsSprite(v)){k&&Ue.setFromMatrixPosition(v.matrixWorld).applyMatrix4(xe);let Se=ee.update(v),Ce=v.material;Ce.visible&&_.push(v,Se,Ce,B,Ue.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||V.intersectsObject(v))){let Se=ee.update(v),Ce=v.material;if(k&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Ue.copy(v.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Ue.copy(Se.boundingSphere.center)),Ue.applyMatrix4(v.matrixWorld).applyMatrix4(xe)),Array.isArray(Ce)){let Le=Se.groups;for(let He=0,Ne=Le.length;He<Ne;He++){let Fe=Le[He],ot=Ce[Fe.materialIndex];ot&&ot.visible&&_.push(v,Se,ot,B,Ue.z,Fe)}}else Ce.visible&&_.push(v,Se,Ce,B,Ue.z,null)}}let pe=v.children;for(let Se=0,Ce=pe.length;Se<Ce;Se++)mn(pe[Se],U,B,k)}function ml(v,U,B,k){let z=v.opaque,pe=v.transmissive,Se=v.transparent;m.setupLightsView(B),j===!0&&Oe.setGlobalState(y.clippingPlanes,B),pe.length>0&&Vd(z,pe,U,B),k&&ge.viewport(E.copy(k)),z.length>0&&Gs(z,U,B),pe.length>0&&Gs(pe,U,B),Se.length>0&&Gs(Se,U,B),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Vd(v,U,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;let pe=Pe.isWebGL2;ve===null&&(ve=new zn(1,1,{generateMipmaps:!0,type:Ee.has("EXT_color_buffer_half_float")?Is:Kn,minFilter:Ls,samples:pe?4:0})),y.getDrawingBufferSize(Ie),pe?ve.setSize(Ie.x,Ie.y):ve.setSize(oo(Ie.x),oo(Ie.y));let Se=y.getRenderTarget();y.setRenderTarget(ve),y.getClearColor(ae),I=y.getClearAlpha(),I<1&&y.setClearColor(16777215,.5),y.clear();let Ce=y.toneMapping;y.toneMapping=Jn,Gs(v,B,k),S.updateMultisampleRenderTarget(ve),S.updateRenderTargetMipmap(ve);let Le=!1;for(let He=0,Ne=U.length;He<Ne;He++){let Fe=U[He],ot=Fe.object,zt=Fe.geometry,pt=Fe.material,Sn=Fe.group;if(pt.side===ln&&ot.layers.test(k.layers)){let st=pt.side;pt.side=Ot,pt.needsUpdate=!0,gl(ot,B,k,zt,pt,Sn),pt.side=st,pt.needsUpdate=!0,Le=!0}}Le===!0&&(S.updateMultisampleRenderTarget(ve),S.updateRenderTargetMipmap(ve)),y.setRenderTarget(Se),y.setClearColor(ae,I),y.toneMapping=Ce}function Gs(v,U,B){let k=U.isScene===!0?U.overrideMaterial:null;for(let z=0,pe=v.length;z<pe;z++){let Se=v[z],Ce=Se.object,Le=Se.geometry,He=k===null?Se.material:k,Ne=Se.group;Ce.layers.test(B.layers)&&gl(Ce,U,B,Le,He,Ne)}}function gl(v,U,B,k,z,pe){v.onBeforeRender(y,U,B,k,z,pe),v.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),z.onBeforeRender(y,U,B,k,v,pe),z.transparent===!0&&z.side===ln&&z.forceSinglePass===!1?(z.side=Ot,z.needsUpdate=!0,y.renderBufferDirect(B,U,k,z,v,pe),z.side=en,z.needsUpdate=!0,y.renderBufferDirect(B,U,k,z,v,pe),z.side=ln):y.renderBufferDirect(B,U,k,z,v,pe),v.onAfterRender(y,U,B,k,z,pe)}function Ws(v,U,B){U.isScene!==!0&&(U=Te);let k=De.get(v),z=m.state.lights,pe=m.state.shadowsArray,Se=z.state.version,Ce=_e.getParameters(v,z.state,pe,U,B),Le=_e.getProgramCacheKey(Ce),He=k.programs;k.environment=v.isMeshStandardMaterial?U.environment:null,k.fog=U.fog,k.envMap=(v.isMeshStandardMaterial?F:x).get(v.envMap||k.environment),He===void 0&&(v.addEventListener("dispose",re),He=new Map,k.programs=He);let Ne=He.get(Le);if(Ne!==void 0){if(k.currentProgram===Ne&&k.lightsStateVersion===Se)return xl(v,Ce),Ne}else Ce.uniforms=_e.getUniforms(v),v.onBuild(B,Ce,y),v.onBeforeCompile(Ce,y),Ne=_e.acquireProgram(Ce,Le),He.set(Le,Ne),k.uniforms=Ce.uniforms;let Fe=k.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Fe.clippingPlanes=Oe.uniform),xl(v,Ce),k.needsLights=Xd(v),k.lightsStateVersion=Se,k.needsLights&&(Fe.ambientLightColor.value=z.state.ambient,Fe.lightProbe.value=z.state.probe,Fe.directionalLights.value=z.state.directional,Fe.directionalLightShadows.value=z.state.directionalShadow,Fe.spotLights.value=z.state.spot,Fe.spotLightShadows.value=z.state.spotShadow,Fe.rectAreaLights.value=z.state.rectArea,Fe.ltc_1.value=z.state.rectAreaLTC1,Fe.ltc_2.value=z.state.rectAreaLTC2,Fe.pointLights.value=z.state.point,Fe.pointLightShadows.value=z.state.pointShadow,Fe.hemisphereLights.value=z.state.hemi,Fe.directionalShadowMap.value=z.state.directionalShadowMap,Fe.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Fe.spotShadowMap.value=z.state.spotShadowMap,Fe.spotLightMatrix.value=z.state.spotLightMatrix,Fe.spotLightMap.value=z.state.spotLightMap,Fe.pointShadowMap.value=z.state.pointShadowMap,Fe.pointShadowMatrix.value=z.state.pointShadowMatrix),k.currentProgram=Ne,k.uniformsList=null,Ne}function _l(v){if(v.uniformsList===null){let U=v.currentProgram.getUniforms();v.uniformsList=ns.seqWithValue(U.seq,v.uniforms)}return v.uniformsList}function xl(v,U){let B=De.get(v);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function Gd(v,U,B,k,z){U.isScene!==!0&&(U=Te),S.resetTextureUnits();let pe=U.fog,Se=k.isMeshStandardMaterial?U.environment:null,Ce=A===null?y.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Fn,Le=(k.isMeshStandardMaterial?F:x).get(k.envMap||Se),He=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ne=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Fe=!!B.morphAttributes.position,ot=!!B.morphAttributes.normal,zt=!!B.morphAttributes.color,pt=Jn;k.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(pt=y.toneMapping);let Sn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,st=Sn!==void 0?Sn.length:0,Ge=De.get(k),Vo=m.state.lights;if(j===!0&&(fe===!0||v!==M)){let qt=v===M&&k.id===X;Oe.setState(k,v,qt)}let rt=!1;k.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==Vo.state.version||Ge.outputColorSpace!==Ce||z.isBatchedMesh&&Ge.batching===!1||!z.isBatchedMesh&&Ge.batching===!0||z.isInstancedMesh&&Ge.instancing===!1||!z.isInstancedMesh&&Ge.instancing===!0||z.isSkinnedMesh&&Ge.skinning===!1||!z.isSkinnedMesh&&Ge.skinning===!0||z.isInstancedMesh&&Ge.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ge.instancingColor===!1&&z.instanceColor!==null||Ge.envMap!==Le||k.fog===!0&&Ge.fog!==pe||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==Oe.numPlanes||Ge.numIntersection!==Oe.numIntersection)||Ge.vertexAlphas!==He||Ge.vertexTangents!==Ne||Ge.morphTargets!==Fe||Ge.morphNormals!==ot||Ge.morphColors!==zt||Ge.toneMapping!==pt||Pe.isWebGL2===!0&&Ge.morphTargetsCount!==st)&&(rt=!0):(rt=!0,Ge.__version=k.version);let ti=Ge.currentProgram;rt===!0&&(ti=Ws(k,U,z));let yl=!1,ds=!1,Go=!1,St=ti.getUniforms(),ni=Ge.uniforms;if(ge.useProgram(ti.program)&&(yl=!0,ds=!0,Go=!0),k.id!==X&&(X=k.id,ds=!0),yl||M!==v){St.setValue(O,"projectionMatrix",v.projectionMatrix),St.setValue(O,"viewMatrix",v.matrixWorldInverse);let qt=St.map.cameraPosition;qt!==void 0&&qt.setValue(O,Ue.setFromMatrixPosition(v.matrixWorld)),Pe.logarithmicDepthBuffer&&St.setValue(O,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&St.setValue(O,"isOrthographic",v.isOrthographicCamera===!0),M!==v&&(M=v,ds=!0,Go=!0)}if(z.isSkinnedMesh){St.setOptional(O,z,"bindMatrix"),St.setOptional(O,z,"bindMatrixInverse");let qt=z.skeleton;qt&&(Pe.floatVertexTextures?(qt.boneTexture===null&&qt.computeBoneTexture(),St.setValue(O,"boneTexture",qt.boneTexture,S)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}z.isBatchedMesh&&(St.setOptional(O,z,"batchingTexture"),St.setValue(O,"batchingTexture",z._matricesTexture,S));let Wo=B.morphAttributes;if((Wo.position!==void 0||Wo.normal!==void 0||Wo.color!==void 0&&Pe.isWebGL2===!0)&&w.update(z,B,ti),(ds||Ge.receiveShadow!==z.receiveShadow)&&(Ge.receiveShadow=z.receiveShadow,St.setValue(O,"receiveShadow",z.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(ni.envMap.value=Le,ni.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),ds&&(St.setValue(O,"toneMappingExposure",y.toneMappingExposure),Ge.needsLights&&Wd(ni,Go),pe&&k.fog===!0&&he.refreshFogUniforms(ni,pe),he.refreshMaterialUniforms(ni,k,Y,G,ve),ns.upload(O,_l(Ge),ni,S)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(ns.upload(O,_l(Ge),ni,S),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&St.setValue(O,"center",z.center),St.setValue(O,"modelViewMatrix",z.modelViewMatrix),St.setValue(O,"normalMatrix",z.normalMatrix),St.setValue(O,"modelMatrix",z.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let qt=k.uniformsGroups;for(let Xo=0,Yd=qt.length;Xo<Yd;Xo++)if(Pe.isWebGL2){let vl=qt[Xo];Ve.update(vl,ti),Ve.bind(vl,ti)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ti}function Wd(v,U){v.ambientLightColor.needsUpdate=U,v.lightProbe.needsUpdate=U,v.directionalLights.needsUpdate=U,v.directionalLightShadows.needsUpdate=U,v.pointLights.needsUpdate=U,v.pointLightShadows.needsUpdate=U,v.spotLights.needsUpdate=U,v.spotLightShadows.needsUpdate=U,v.rectAreaLights.needsUpdate=U,v.hemisphereLights.needsUpdate=U}function Xd(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(v,U,B){De.get(v.texture).__webglTexture=U,De.get(v.depthTexture).__webglTexture=B;let k=De.get(v);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||Ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(v,U){let B=De.get(v);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(v,U=0,B=0){A=v,L=U,R=B;let k=!0,z=null,pe=!1,Se=!1;if(v){let Le=De.get(v);Le.__useDefaultFramebuffer!==void 0?(ge.bindFramebuffer(O.FRAMEBUFFER,null),k=!1):Le.__webglFramebuffer===void 0?S.setupRenderTarget(v):Le.__hasExternalTextures&&S.rebindTextures(v,De.get(v.texture).__webglTexture,De.get(v.depthTexture).__webglTexture);let He=v.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Se=!0);let Ne=De.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ne[U])?z=Ne[U][B]:z=Ne[U],pe=!0):Pe.isWebGL2&&v.samples>0&&S.useMultisampledRTT(v)===!1?z=De.get(v).__webglMultisampledFramebuffer:Array.isArray(Ne)?z=Ne[B]:z=Ne,E.copy(v.viewport),H.copy(v.scissor),$=v.scissorTest}else E.copy(Q).multiplyScalar(Y).floor(),H.copy(ne).multiplyScalar(Y).floor(),$=de;if(ge.bindFramebuffer(O.FRAMEBUFFER,z)&&Pe.drawBuffers&&k&&ge.drawBuffers(v,z),ge.viewport(E),ge.scissor(H),ge.setScissorTest($),pe){let Le=De.get(v.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,Le.__webglTexture,B)}else if(Se){let Le=De.get(v.texture),He=U||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Le.__webglTexture,B||0,He)}X=-1},this.readRenderTargetPixels=function(v,U,B,k,z,pe,Se){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=De.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Se!==void 0&&(Ce=Ce[Se]),Ce){ge.bindFramebuffer(O.FRAMEBUFFER,Ce);try{let Le=v.texture,He=Le.format,Ne=Le.type;if(He!==un&&ie.convert(He)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Fe=Ne===Is&&(Ee.has("EXT_color_buffer_half_float")||Pe.isWebGL2&&Ee.has("EXT_color_buffer_float"));if(Ne!==Kn&&ie.convert(Ne)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ne===$n&&(Pe.isWebGL2||Ee.has("OES_texture_float")||Ee.has("WEBGL_color_buffer_float")))&&!Fe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=v.width-k&&B>=0&&B<=v.height-z&&O.readPixels(U,B,k,z,ie.convert(He),ie.convert(Ne),pe)}finally{let Le=A!==null?De.get(A).__webglFramebuffer:null;ge.bindFramebuffer(O.FRAMEBUFFER,Le)}}},this.copyFramebufferToTexture=function(v,U,B=0){let k=Math.pow(2,-B),z=Math.floor(U.image.width*k),pe=Math.floor(U.image.height*k);S.setTexture2D(U,0),O.copyTexSubImage2D(O.TEXTURE_2D,B,0,0,v.x,v.y,z,pe),ge.unbindTexture()},this.copyTextureToTexture=function(v,U,B,k=0){let z=U.image.width,pe=U.image.height,Se=ie.convert(B.format),Ce=ie.convert(B.type);S.setTexture2D(B,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,B.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,B.unpackAlignment),U.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,k,v.x,v.y,z,pe,Se,Ce,U.image.data):U.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,k,v.x,v.y,U.mipmaps[0].width,U.mipmaps[0].height,Se,U.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,k,v.x,v.y,Se,Ce,U.image),k===0&&B.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),ge.unbindTexture()},this.copyTextureToTexture3D=function(v,U,B,k,z=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let pe=v.max.x-v.min.x+1,Se=v.max.y-v.min.y+1,Ce=v.max.z-v.min.z+1,Le=ie.convert(k.format),He=ie.convert(k.type),Ne;if(k.isData3DTexture)S.setTexture3D(k,0),Ne=O.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)S.setTexture2DArray(k,0),Ne=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);let Fe=O.getParameter(O.UNPACK_ROW_LENGTH),ot=O.getParameter(O.UNPACK_IMAGE_HEIGHT),zt=O.getParameter(O.UNPACK_SKIP_PIXELS),pt=O.getParameter(O.UNPACK_SKIP_ROWS),Sn=O.getParameter(O.UNPACK_SKIP_IMAGES),st=B.isCompressedTexture?B.mipmaps[z]:B.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,st.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,st.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,v.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,v.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,v.min.z),B.isDataTexture||B.isData3DTexture?O.texSubImage3D(Ne,z,U.x,U.y,U.z,pe,Se,Ce,Le,He,st.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Ne,z,U.x,U.y,U.z,pe,Se,Ce,Le,st.data)):O.texSubImage3D(Ne,z,U.x,U.y,U.z,pe,Se,Ce,Le,He,st),O.pixelStorei(O.UNPACK_ROW_LENGTH,Fe),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ot),O.pixelStorei(O.UNPACK_SKIP_PIXELS,zt),O.pixelStorei(O.UNPACK_SKIP_ROWS,pt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Sn),z===0&&k.generateMipmaps&&O.generateMipmap(Ne),ge.unbindTexture()},this.initTexture=function(v){v.isCubeTexture?S.setTextureCube(v,0):v.isData3DTexture?S.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?S.setTexture2DArray(v,0):S.setTexture2D(v,0),ge.unbindTexture()},this.resetState=function(){L=0,R=0,A=null,ge.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===$c?"display-p3":"srgb",t.unpackColorSpace=Qe.workingColorSpace===Co?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===vt?_i:wf}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===_i?vt:Fn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Lc=class extends Fs{};Lc.prototype.isWebGL1Renderer=!0;var vo=class extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},Ic=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=pc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=On()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=On()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=On()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Pt=new P,Mo=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=xn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=xn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=xn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=xn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),s=Ke(s,this.array),r=Ke(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Nt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},zs=class extends Bn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qi,ws=new P,$i=new P,Zi=new P,ji=new be,As=new be,zf=new lt,Xr=new P,Ts=new P,Yr=new P,rf=new be,sc=new be,of=new be,So=class extends Mt{constructor(e=new zs){if(super(),this.isSprite=!0,this.type="Sprite",qi===void 0){qi=new nn;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ic(t,5);qi.setIndex([0,1,2,0,2,3]),qi.setAttribute("position",new Mo(n,3,0,!1)),qi.setAttribute("uv",new Mo(n,2,3,!1))}this.geometry=qi,this.material=e,this.center=new be(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),$i.setFromMatrixScale(this.matrixWorld),zf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Zi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&$i.multiplyScalar(-Zi.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;qr(Xr.set(-.5,-.5,0),Zi,a,$i,s,r),qr(Ts.set(.5,-.5,0),Zi,a,$i,s,r),qr(Yr.set(.5,.5,0),Zi,a,$i,s,r),rf.set(0,0),sc.set(1,0),of.set(1,1);let o=e.ray.intersectTriangle(Xr,Ts,Yr,!1,ws);if(o===null&&(qr(Ts.set(-.5,.5,0),Zi,a,$i,s,r),sc.set(0,1),o=e.ray.intersectTriangle(Xr,Yr,Ts,!1,ws),o===null))return;let c=e.ray.origin.distanceTo(ws);c<e.near||c>e.far||t.push({distance:c,point:ws.clone(),uv:Zn.getInterpolation(ws,Xr,Ts,Yr,rf,sc,of,new be),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function qr(i,e,t,n,s,r){ji.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(As.x=r*ji.x-s*ji.y,As.y=s*ji.x+r*ji.y):As.copy(ji),i.copy(e),i.x+=As.x,i.y+=As.y,i.applyMatrix4(zf)}var Bs=class extends Bn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},af=new P,cf=new P,lf=new lt,rc=new xi,$r=new Qn,Uc=class extends Mt{constructor(e=new nn,t=new Bs){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)af.fromBufferAttribute(t,s-1),cf.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=af.distanceTo(cf);e.setAttribute("lineDistance",new Qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(s),$r.radius+=r,e.ray.intersectsSphere($r)===!1)return;lf.copy(s).invert(),rc.copy(e.ray).applyMatrix4(lf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new P,h=new P,u=new P,f=new P,d=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let p=Math.max(0,a.start),b=Math.min(g.count,a.start+a.count);for(let y=p,T=b-1;y<T;y+=d){let L=g.getX(y),R=g.getX(y+1);if(l.fromBufferAttribute(m,L),h.fromBufferAttribute(m,R),rc.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let X=e.ray.origin.distanceTo(f);X<e.near||X>e.far||t.push({distance:X,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,a.start),b=Math.min(m.count,a.start+a.count);for(let y=p,T=b-1;y<T;y+=d){if(l.fromBufferAttribute(m,y),h.fromBufferAttribute(m,y+1),rc.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let R=e.ray.origin.distanceTo(f);R<e.near||R>e.far||t.push({distance:R,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}},hf=new P,uf=new P,bo=class extends Uc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)hf.fromBufferAttribute(t,s),uf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+hf.distanceTo(uf);e.setAttribute("lineDistance",new Qt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Eo=class extends tn{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Zr=new P,jr=new P,oc=new P,Jr=new Zn,wo=class extends nn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(es*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:_,b:m,c:p}=Jr;if(_.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),Jr.getNormal(oc),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let b=0;b<3;b++){let y=(b+1)%3,T=u[b],L=u[y],R=Jr[h[b]],A=Jr[h[y]],X=`${T}_${L}`,M=`${L}_${T}`;M in f&&f[M]?(oc.dot(f[M].normal)<=r&&(d.push(R.x,R.y,R.z),d.push(A.x,A.y,A.z)),f[M]=null):X in f||(f[X]={index0:l[b],index1:l[y],normal:oc.clone()})}}for(let g in f)if(f[g]){let{index0:_,index1:m}=f[g];Zr.fromBufferAttribute(o,_),jr.fromBufferAttribute(o,m),d.push(Zr.x,Zr.y,Zr.z),d.push(jr.x,jr.y,jr.z)}this.setAttribute("position",new Qt(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var vi=class extends Bn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Af,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Kr(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function uM(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var cs=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Dc=class extends cs{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:mu,endingEnd:mu}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case gu:r=e,o=2*t-n;break;case _u:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case gu:a=e,c=2*n-t;break;case _u:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,b=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,y=(-1-d)*m+(1.5+d)*_+.5*g,T=d*m-d*_;for(let L=0;L!==o;++L)r[L]=p*a[h+L]+b*a[l+L]+y*a[c+L]+T*a[u+L];return r}},Nc=class extends cs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==o;++f)r[f]=a[l+f]*u+a[c+f]*h;return r}},Oc=class extends cs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},dn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Kr(t,this.TimeBufferType),this.values=Kr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Kr(e.times,Array),values:Kr(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Oc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Nc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Dc(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case eo:t=this.InterpolantFactoryMethodDiscrete;break;case to:t=this.InterpolantFactoryMethodLinear;break;case Na:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return eo;case this.InterpolantFactoryMethodLinear:return to;case this.InterpolantFactoryMethodSmooth:return Na}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&uM(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Na,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let u=o*n,f=u-n,d=u+n;for(let g=0;g!==n;++g){let _=t[u+g];if(_!==t[f+g]||_!==t[d+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,f=a*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=to;var Mi=class extends dn{};Mi.prototype.ValueTypeName="bool";Mi.prototype.ValueBufferType=Array;Mi.prototype.DefaultInterpolation=eo;Mi.prototype.InterpolantFactoryMethodLinear=void 0;Mi.prototype.InterpolantFactoryMethodSmooth=void 0;var Fc=class extends dn{};Fc.prototype.ValueTypeName="color";var zc=class extends dn{};zc.prototype.ValueTypeName="number";var Bc=class extends cs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)Ft.slerpFlat(r,0,a,l-o,a,l,c);return r}},ks=class extends dn{InterpolantFactoryMethodLinear(e){return new Bc(this.times,this.values,this.getValueSize(),e)}};ks.prototype.ValueTypeName="quaternion";ks.prototype.DefaultInterpolation=to;ks.prototype.InterpolantFactoryMethodSmooth=void 0;var Si=class extends dn{};Si.prototype.ValueTypeName="string";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=eo;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var kc=class extends dn{};kc.prototype.ValueTypeName="vector";var Hc=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],g=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null}}},fM=new Hc,Vc=class{constructor(e){this.manager=e!==void 0?e:fM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Vc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ao=class extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},To=class extends Ao{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},ac=new lt,ff=new P,df=new P,Gc=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ns,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;ff.setFromMatrixPosition(e.matrixWorld),t.position.copy(ff),df.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(df),t.updateMatrixWorld(),ac.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ac),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ac)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Wc=class extends Gc{constructor(){super(new _o(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hs=class extends Ao{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Wc}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Jc="\\[\\]\\.:\\/",dM=new RegExp("["+Jc+"]","g"),Kc="[^"+Jc+"]",pM="[^"+Jc.replace("\\.","")+"]",mM=/((?:WC+[\/:])*)/.source.replace("WC",Kc),gM=/(WCOD+)?/.source.replace("WCOD",pM),_M=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Kc),xM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Kc),yM=new RegExp("^"+mM+gM+_M+xM+"$"),vM=["material","materials","bones","map"],Xc=class{constructor(e,t,n){let s=n||it.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},it=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(dM,"")}static parseTrackName(e){let t=yM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);vM.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};it.Composite=Xc;it.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};it.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};it.prototype.GetterByBindingType=[it.prototype._getValue_direct,it.prototype._getValue_array,it.prototype._getValue_arrayElement,it.prototype._getValue_toArray];it.prototype.SetterByBindingTypeAndVersioning=[[it.prototype._setValue_direct,it.prototype._setValue_direct_setNeedsUpdate,it.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[it.prototype._setValue_array,it.prototype._setValue_array_setNeedsUpdate,it.prototype._setValue_array_setMatrixWorldNeedsUpdate],[it.prototype._setValue_arrayElement,it.prototype._setValue_arrayElement_setNeedsUpdate,it.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[it.prototype._setValue_fromArray,it.prototype._setValue_fromArray_setNeedsUpdate,it.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var mb=new Float32Array(1);var ls=class{constructor(e,t,n=0,s=1/0){this.ray=new xi(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Ds,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Yc(e,this,n,t),n.sort(pf),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Yc(e[s],this,n,t);return n.sort(pf),n}};function pf(i,e){return i.distance-e.distance}function Yc(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){let s=i.children;for(let r=0,a=s.length;r<a;r++)Yc(s[r],e,t,!0)}}var Vs=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(wt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var MM=(i,e)=>({x:i.x-e.x,y:i.y-e.y,z:i.z-e.z}),tl=(i,e)=>i.x*e.x+i.y*e.y+i.z*e.z,Bf=i=>Math.hypot(i.x,i.y,i.z),el=(i,e)=>({x:i.x*e,y:i.y*e,z:i.z*e}),SM=(i,e)=>({x:i.y*e.z-i.z*e.y,y:i.z*e.x-i.x*e.z,z:i.x*e.y-i.y*e.x}),bM=i=>{let e=Bf(i)||1;return el(i,1/e)};function EM(i,e){let t=i.getRotationAxis(e.face);if(!t)return null;if(typeof t.axis=="string"){let n={x:t.axis==="x"?1:0,y:t.axis==="y"?1:0,z:t.axis==="z"?1:0},s=e.times===3?-1:e.times===2?2:1;return{vec:n,sign:Math.sign(t.sign*s)}}return{vec:{x:t.x,y:t.y,z:t.z},sign:Math.sign(e.times)}}function kf(i,e,t,n){let s=[];for(let r of i.getMoveNotation())for(let a of["","'"]){let o=r+a,c=i.parseMove(o);if(!c)continue;let l=i.pickLayerPieces(o);if(!l.includes(e))continue;let h=EM(i,c);if(!h)continue;let u=el(SM(h.vec,t),h.sign);u=MM(u,el(n,tl(u,n))),!(Bf(u)<1e-9)&&s.push({move:o,dir:bM(u),size:l.length})}return wM(s)}function wM(i){return i.filter(e=>!i.some(t=>t!==e&&t.size<e.size&&tl(t.dir,e.dir)>.999))}function Hf(i,e){let t=null,n=.35;for(let s of i){let r=tl(s.dir,e);r>n&&(n=r,t=s)}return t}var AM=10,TM=18,RM=i=>i==="touch"?TM:AM,CM=40,Lo=class{constructor(e,t,n,s,r){this.renderer=e,this.getState=t,this.onMove=n,this.isBusy=s,this.onHover=r,this._dentro=!1,this._pendiente=!1,this.raycaster=new ls,this.pointer=new be,this.arrastre=null,this._bind()}_bind(){this._onDown=e=>this._alPulsar(e),this._onMove=e=>this._alMover(e),this._onUp=e=>this._alSoltar(e),window.addEventListener("pointerdown",this._onDown,!0),window.addEventListener("pointermove",this._onMove,!0),window.addEventListener("pointerup",this._onUp,!0),window.addEventListener("pointercancel",this._onUp,!0)}dispose(){window.removeEventListener("pointerdown",this._onDown,!0),window.removeEventListener("pointermove",this._onMove,!0),window.removeEventListener("pointerup",this._onUp,!0),window.removeEventListener("pointercancel",this._onUp,!0),this._soltarCamara()}_agarre(e){let t={dentro:!1,pegatina:null},n=this.renderer.canvas.getBoundingClientRect();if(e.clientX<n.left||e.clientX>n.right||e.clientY<n.top||e.clientY>n.bottom)return t;this.pointer.x=(e.clientX-n.left)/n.width*2-1,this.pointer.y=-((e.clientY-n.top)/n.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.renderer.camera);let s=[...this.renderer.pieceMeshes.values()],r=this.raycaster.intersectObjects(s,!0);if(!r.length)return t;let a=r.find(o=>o.object.userData.sticker)??null;return{dentro:!0,pegatina:a?.object??null,punto:a?this.renderer.puzzleGroup.worldToLocal(a.point.clone()):null}}_alPulsar(e){if(this.arrastre){this.arrastre=null,this.renderer.setPressed?.(null),this._soltarCamara();return}let{dentro:t,pegatina:n,punto:s}=this._agarre(e);if(!t)return;this.renderer.controls.enabled=!1,this.renderer.setPressed?.(n);let r=n?this._normalLocal(n):null,a=n?.userData.sticker?.piece;this.arrastre={id:e.pointerId,x:e.clientX,y:e.clientY,ultimoX:e.clientX,ultimoY:e.clientY,tipo:e.pointerType,normal:r,pieza:a,paso:n?this._tamanoPiezaPx(n):null,candidatos:a&&r&&!this.isBusy?.()?kf(this.getState(),a,s,r):null,hecho:!1}}_tamanoPiezaPx(e){let t=new fn().setFromObject(e.parent??e),n=t.getCenter(new P),s=t.getSize(new P),r=(s.x+s.y+s.z)/3/2;if(!(r>0))return null;let a=this.renderer.camera,o=new P().setFromMatrixColumn(a.matrixWorld,0),c=n.clone().addScaledVector(o,r),l=n.clone().project(a),h=c.project(a),u=this.renderer.canvas.getBoundingClientRect().width,f=Math.abs(h.x-l.x)*u/2;return f>0?f*2:null}_vigilarPuntero(e){!this.onHover||this._pendiente||(this._pendiente=!0,requestAnimationFrame(()=>{this._pendiente=!1;let t=this.arrastre?!0:this._agarre(e).dentro;t!==this._dentro&&(this._dentro=t,this.onHover(t))}))}_llegoALaContigua(e,t,n){let s=this._agarre(e).pegatina?.userData.sticker?.piece;return s&&t.pieza&&s!==t.pieza?!0:t.paso?n>=t.paso:!1}_remarcar(e){if(this.renderer.pressed)return;let t=this._agarre(e).pegatina;t&&this.renderer.setPressed?.(t)}_devolverLaMarca(e){let t=CM,n=()=>{if(this.arrastre!==e||t--<=0)return;if(this.renderer.pressed){requestAnimationFrame(n);return}let s=this._agarreEn(e.ultimoX,e.ultimoY);s?this.renderer.setPressed?.(s):requestAnimationFrame(n)};requestAnimationFrame(n)}_agarreEn(e,t){return this._agarre({clientX:e,clientY:t}).pegatina}_alMover(e){this._vigilarPuntero(e);let t=this.arrastre;if(!t||e.pointerId!==t.id)return;if(t.ultimoX=e.clientX,t.ultimoY=e.clientY,t.hecho){this._remarcar(e);return}let n=e.clientX-t.x,s=e.clientY-t.y,r=Math.hypot(n,s);if(r<RM(t.tipo))return;if(!t.candidatos?.length||this.isBusy?.()){t.hecho=!0;return}if(!this._llegoALaContigua(e,t,r))return;t.hecho=!0;let a=this._direccionEnLaCara(n,s,t.normal);if(!a)return;let o=Hf(t.candidatos,a);o&&(this.onMove(o.move),this._devolverLaMarca(t))}_alSoltar(e){this.arrastre&&e.pointerId!==this.arrastre.id||(this.arrastre=null,this.renderer.setPressed?.(null),this._vigilarPuntero(e),this._soltarCamara())}_soltarCamara(){this.renderer.controls.enabled||setTimeout(()=>{this.renderer.controls.enabled=!0},0)}_direccionEnLaCara(e,t,n){let s=this.renderer.camera,r=this.renderer.puzzleGroup.getWorldQuaternion(new Ft).invert(),a=new P(1,0,0).applyQuaternion(s.quaternion).applyQuaternion(r),o=new P(0,1,0).applyQuaternion(s.quaternion).applyQuaternion(r),c=a.multiplyScalar(e).addScaledVector(o,-t);return c.addScaledVector(n,-c.dot(n)),c.lengthSq()<1e-12?null:c.normalize()}_normalLocal(e){let t=this.renderer.puzzleGroup,n=e.userData.sticker?.poly;if(n){let s=n.vertices,r=new P;for(let l of s)r.add(new P(l.x,l.y,l.z));r.divideScalar(s.length);let a=new P(s[1].x-s[0].x,s[1].y-s[0].y,s[1].z-s[0].z),o=new P(s[2].x-s[0].x,s[2].y-s[0].y,s[2].z-s[0].z),c=a.cross(o).normalize();return c.dot(r)<0&&c.negate(),c}return e.getWorldDirection(new P).applyQuaternion(t.getWorldQuaternion(new Ft).invert()).normalize()}};function PM(i,e){let t=i.getRotationAxis?.(e);if(!t)return null;if(typeof t.axis=="string")return{x:+(t.axis==="x"),y:+(t.axis==="y"),z:+(t.axis==="z")};let n=Math.hypot(t.x,t.y,t.z);return n<1e-6?null:{x:t.x/n,y:t.y/n,z:t.z/n}}function Vf(i){let e=i.getPieces?.()??[];if(!e.length)return[];let t=[],n=new Set;for(let s of i.getMoveNotation()){let r=PM(i,s);if(!r)continue;let a;try{a=i.pickLayerPieces(s)}catch{continue}if(!(!a?.length||a.length===e.length))for(let o of[1,-1]){let c={x:r.x*o,y:r.y*o,z:r.z*o},l=u=>Math.max(...u.map(f=>c.x*f.position.x+c.y*f.position.y+c.z*f.position.z));if(l(a)<l(e)-1e-6)continue;let h=[c.x,c.y,c.z].map(u=>u.toFixed(3)).join(",");if(n.has(h))break;n.add(h),t.push({face:s,dir:c});break}}return t}function LM(i){let e=String(i).replace("#",""),t=e.length===3?e.split("").map(a=>a+a).join(""):e,[n,s,r]=[0,2,4].map(a=>parseInt(t.slice(a,a+2),16)/255);return .2126*n+.7152*s+.0722*r}function Gf(i){if(!i)return null;let e=LM(i)>.55;return{text:e?"#141821":"#ffffff",ring:e?"rgba(0, 0, 0, 0.38)":"rgba(255, 255, 255, 0.55)"}}var nl=i=>Math.hypot(i.x,i.y),Xf=i=>typeof i=="number"?{x:i,y:i}:i;function Wf(i,e,t,n,s,r={x:0,y:1}){let a={x:i.x-e.x,y:i.y-e.y},o=nl(a);if(o<1e-4){let m=nl(r)||1;a={x:r.x/m,y:r.y/m},o=0}else a={x:a.x/o,y:a.y/o};let c=0;for(let m of t){let p=(m.x-e.x)*a.x+(m.y-e.y)*a.y;p>c&&(c=p)}let l=c+n+.06,h=o<l,u=h?l:o,f=e.x+a.x*u,d=e.y+a.y*u,g=Xf(s),_=Math.abs(f)>g.x||Math.abs(d)>g.y;return _&&(f=Math.max(-g.x,Math.min(g.x,f)),d=Math.max(-g.y,Math.min(g.y,d))),{x:f,y:d,pushed:h,clamped:_}}function Yf(i,e,t,n,s,r={x:0,y:1},a=0){if(!a)return Wf(i,e,t,n,s,r);let o=n*1.15,c=Wf(i,e,t,n+o/2,1/0,r),l=Xf(s),h={x:c.x-e.x,y:c.y-e.y},u=nl(h)||1,f={x:-h.y/u,y:h.x/u},d=c.x+f.x*a*o,g=c.y+f.y*a*o,_=Math.abs(d)>l.x||Math.abs(g)>l.y;return _&&(d=Math.max(-l.x,Math.min(l.x,d)),g=Math.max(-l.y,Math.min(l.y,g))),{x:d,y:g,pushed:c.pushed,clamped:_}}var qf=i=>i.endsWith("2")?i:i.endsWith("'")?i.slice(0,-1):`${i}'`;var IM=.34,Qf=.065,$f=.02,il=Qf*.84,Zf=.28,jf=.18,UM=5,DM=16,NM=i=>i==="touch"?DM:UM;var Jf=256,OM="rgba(26, 29, 36, 0.85)",FM="#e8ecf4",Kf="#f0b429",zM="#1a1d24",Io=class{constructor(e,t,n,s){this.renderer=e,this.onMove=t,this.isBusy=n,this.getState=s,this.group=new Yt,this.renderer.scene.add(this.group),this.labels=new Map,this.visible=!0,this._active=null,this._activeLabel=null,this._hovered=null,this._pending=null,this.raycaster=new ls,this.pointer=new be,this._bindPointer()}dispose(){this._unbindPointer(),this.clear(),this.renderer.scene.remove(this.group)}_bindPointer(){let e=this.renderer.canvas;this._onMoveEv=t=>this._handleMove(t),this._onDownEv=t=>this._handleDown(t),this._onUpEv=t=>this._handleUp(t),this._onLeaveEv=()=>this._setHover(null),e.addEventListener("pointermove",this._onMoveEv),e.addEventListener("pointerleave",this._onLeaveEv),e.addEventListener("pointerdown",this._onDownEv),window.addEventListener("pointerup",this._onUpEv)}_unbindPointer(){let e=this.renderer.canvas;e.removeEventListener("pointermove",this._onMoveEv),e.removeEventListener("pointerleave",this._onLeaveEv),e.removeEventListener("pointerdown",this._onDownEv),window.removeEventListener("pointerup",this._onUpEv)}_pickMove(e){if(!this.visible||!this.labels.size)return null;let t=this.renderer.canvas.getBoundingClientRect();return this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.renderer.camera),this.group.updateMatrixWorld(!0),this.raycaster.intersectObjects(this.group.children,!1)[0]?.object?.userData?.move??null}_handleMove(e){if(this.isBusy?.()){this._setHover(null);return}this._setHover(this._pickMove(e))}_setHover(e){e!==this._hovered&&(this._hovered=e,this.announce(e,this.getState?.()),this.renderer.canvas.style.cursor=e?"pointer":"")}_handleDown(e){if(this._pending=null,this.isBusy?.())return;let t=this._pickMove(e);t&&(this._pending={move:t,x:e.clientX,y:e.clientY,pointerType:e.pointerType})}_handleUp(e){let t=this._pending;if(this._pending=null,!t||this.isBusy?.())return;let n=e.clientX-t.x,s=e.clientY-t.y;Math.hypot(n,s)>NM(t.pointerType)||this.onMove?.(t.move)}clear(){for(let{sprite:e,texture:t}of this.labels.values())this.group.remove(e),e.material.dispose(),t.dispose();this.labels.clear(),this._active=null,this._activeLabel=null,this._hovered=null,this._pending=null,this.renderer.canvas.style.cursor=""}setVisible(e){this.visible=e,this.group.visible=e}rebuild(e){if(this.clear(),!e)return;let t=new fn().setFromObject(this.renderer.puzzleGroup);if(t.isEmpty())return;let n=t.getBoundingSphere(new Qn).radius,s=this._corners(t);this._hull=s;for(let{face:r,dir:a}of Vf(e)){let o=qf(r),c=[{move:r,lateral:-1}];o!==r&&e.parseMove?.(o)?c.push({move:o,lateral:1}):c[0].lateral=0;let l=new P(a.x,a.y,a.z),h=Math.max(...s.map(d=>d.dot(l))),u=l.clone().multiplyScalar(h+n*IM),f=e.getFaceColour?.(r)??null;for(let{move:d,lateral:g}of c){let _=this._makeLabel(d,g,f);_.sprite.userData.anchor=u,_.sprite.position.copy(u),this.group.add(_.sprite),this.labels.set(d,_)}}this.group.visible=this.visible}announce(e,t){if(this._active&&this._active!==e&&this._restore(),!e){this._restore();return}let n=t?.parseMove?.(e)?.face,s=this.labels.get(e)??(n&&this.labels.get(n));s&&(this._draw(s,e,!0),this._active=e,this._activeLabel=s)}_restore(){let e=this._activeLabel;e&&this._draw(e,e.move,!1),this._active=null,this._activeLabel=null}_corners(e){let t=[];for(let n of[e.min.x,e.max.x])for(let s of[e.min.y,e.max.y])for(let r of[e.min.z,e.max.z])t.push(new P(n,s,r));return t}_makeLabel(e,t=0,n=null){let s=document.createElement("canvas");s.width=s.height=Jf;let r=s.getContext("2d"),a=new Eo(s),o=new So(new zs({map:a,transparent:!0,depthTest:!1,depthWrite:!1}));o.renderOrder=10,o.userData.move=e,o.userData.lateral=t;let c=new P,l=new P,h=new P,u=new P;o.onBeforeRender=(d,g,_)=>{if(!_.isPerspectiveCamera)return;let m=o.userData.anchor,p=_.aspect||1;c.copy(m).project(_),l.set(0,0,0).project(_);let b=(this._hull??[]).map(M=>(h.copy(M).project(_),{x:h.x*p,y:h.y})),y={x:Math.max(0,p-il-$f),y:Math.max(0,1-il-$f)},T=Yf({x:c.x*p,y:c.y},{x:l.x*p,y:l.y},b,il,y,void 0,o.userData.lateral);c.x=T.x/p,c.y=T.y,o.position.copy(c.unproject(_));let R=2*_.position.distanceTo(o.position)*Math.tan(_.fov*Math.PI/180/2);o.scale.setScalar(R*Qf),u.copy(_.position).normalize();let A=m.clone().normalize().dot(u),X=Math.max(0,Math.min(1,(A+jf)/(2*jf)));o.material.opacity=Zf+(1-Zf)*X};let f={sprite:o,canvas:s,ctx:r,texture:a,move:e,ink:Gf(n),colour:n};return this._draw(f,e,!1),f}_draw(e,t,n){let{ctx:s,texture:r,ink:a}=e,o=Jf;s.clearRect(0,0,o,o),s.beginPath(),s.arc(o/2,o/2,o*.42,0,Math.PI*2),s.fillStyle=a?e.colour:n?Kf:OM,s.fill(),s.lineWidth=o*(n?.085:.045),s.strokeStyle=n?a?"#ffffff":Kf:a?a.ring:"rgba(232, 236, 244, 0.55)",s.stroke(),s.fillStyle=a?a.text:n?zM:FM,s.font=`bold ${Math.round(o*(t.length>2?.32:.46))}px system-ui, sans-serif`,s.textAlign="center",s.textBaseline="middle",s.fillText(t,o/2,o/2+o*.02),r.needsUpdate=!0}};var ed={type:"change"},sl={type:"start"},td={type:"end"},Uo=new xi,nd=new cn,BM=Math.cos(70*Rf.DEG2RAD),Do=class extends yn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bi.ROTATE,MIDDLE:bi.DOLLY,RIGHT:bi.PAN},this.touches={ONE:Ei.ROTATE,TWO:Ei.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(w){w.addEventListener("keydown",ee),this._domElementKeyEvents=w},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(ed),n.update(),r=s.NONE},this.update=(function(){let w=new P,Z=new Ft().setFromUnitVectors(e.up,new P(0,1,0)),ce=Z.clone().invert(),ie=new P,ye=new Ft,Ve=new P,qe=2*Math.PI;return function(oe=null){let C=n.object.position;w.copy(C).sub(n.target),w.applyQuaternion(Z),o.setFromVector3(w),n.autoRotate&&r===s.NONE&&H(M(oe)),n.enableDamping?(o.theta+=c.theta*n.dampingFactor,o.phi+=c.phi*n.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let se=n.minAzimuthAngle,re=n.maxAzimuthAngle;isFinite(se)&&isFinite(re)&&(se<-Math.PI?se+=qe:se>Math.PI&&(se-=qe),re<-Math.PI?re+=qe:re>Math.PI&&(re-=qe),se<=re?o.theta=Math.max(se,Math.min(re,o.theta)):o.theta=o.theta>(se+re)/2?Math.max(se,o.theta):Math.min(re,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&R||n.object.isOrthographicCamera?o.radius=W(o.radius):o.radius=W(o.radius*l),w.setFromSpherical(o),w.applyQuaternion(ce),C.copy(n.target).add(w),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let we=!1;if(n.zoomToCursor&&R){let Me=null;if(n.object.isPerspectiveCamera){let $e=w.length();Me=W($e*l);let je=$e-Me;n.object.position.addScaledVector(T,je),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let $e=new P(L.x,L.y,0);$e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),we=!0;let je=new P(L.x,L.y,0);je.unproject(n.object),n.object.position.sub(je).add($e),n.object.updateMatrixWorld(),Me=w.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Me!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Me).add(n.object.position):(Uo.origin.copy(n.object.position),Uo.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Uo.direction))<BM?e.lookAt(n.target):(nd.setFromNormalAndCoplanarPoint(n.object.up,n.target),Uo.intersectPlane(nd,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),we=!0);return l=1,R=!1,we||ie.distanceToSquared(n.object.position)>a||8*(1-ye.dot(n.object.quaternion))>a||Ve.distanceToSquared(n.target)>0?(n.dispatchEvent(ed),ie.copy(n.object.position),ye.copy(n.object.quaternion),Ve.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",me),n.domElement.removeEventListener("pointerdown",De),n.domElement.removeEventListener("pointercancel",x),n.domElement.removeEventListener("wheel",K),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",x),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",ee),n._domElementKeyEvents=null)};let n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=s.NONE,a=1e-6,o=new Vs,c=new Vs,l=1,h=new P,u=new be,f=new be,d=new be,g=new be,_=new be,m=new be,p=new be,b=new be,y=new be,T=new P,L=new be,R=!1,A=[],X={};function M(w){return w!==null?2*Math.PI/60*n.autoRotateSpeed*w:2*Math.PI/60/60*n.autoRotateSpeed}function E(w){let Z=Math.abs(w)/(100*(window.devicePixelRatio|0));return Math.pow(.95,n.zoomSpeed*Z)}function H(w){c.theta-=w}function $(w){c.phi-=w}let ae=(function(){let w=new P;return function(ce,ie){w.setFromMatrixColumn(ie,0),w.multiplyScalar(-ce),h.add(w)}})(),I=(function(){let w=new P;return function(ce,ie){n.screenSpacePanning===!0?w.setFromMatrixColumn(ie,1):(w.setFromMatrixColumn(ie,0),w.crossVectors(n.object.up,w)),w.multiplyScalar(ce),h.add(w)}})(),N=(function(){let w=new P;return function(ce,ie){let ye=n.domElement;if(n.object.isPerspectiveCamera){let Ve=n.object.position;w.copy(Ve).sub(n.target);let qe=w.length();qe*=Math.tan(n.object.fov/2*Math.PI/180),ae(2*ce*qe/ye.clientHeight,n.object.matrix),I(2*ie*qe/ye.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(ae(ce*(n.object.right-n.object.left)/n.object.zoom/ye.clientWidth,n.object.matrix),I(ie*(n.object.top-n.object.bottom)/n.object.zoom/ye.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function G(w){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=w:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Y(w){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=w:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function q(w,Z){if(!n.zoomToCursor)return;R=!0;let ce=n.domElement.getBoundingClientRect(),ie=w-ce.left,ye=Z-ce.top,Ve=ce.width,qe=ce.height;L.x=ie/Ve*2-1,L.y=-(ye/qe)*2+1,T.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function W(w){return Math.max(n.minDistance,Math.min(n.maxDistance,w))}function Q(w){u.set(w.clientX,w.clientY)}function ne(w){q(w.clientX,w.clientX),p.set(w.clientX,w.clientY)}function de(w){g.set(w.clientX,w.clientY)}function V(w){f.set(w.clientX,w.clientY),d.subVectors(f,u).multiplyScalar(n.rotateSpeed);let Z=n.domElement;H(2*Math.PI*d.x/Z.clientHeight),$(2*Math.PI*d.y/Z.clientHeight),u.copy(f),n.update()}function j(w){b.set(w.clientX,w.clientY),y.subVectors(b,p),y.y>0?G(E(y.y)):y.y<0&&Y(E(y.y)),p.copy(b),n.update()}function fe(w){_.set(w.clientX,w.clientY),m.subVectors(_,g).multiplyScalar(n.panSpeed),N(m.x,m.y),g.copy(_),n.update()}function ve(w){q(w.clientX,w.clientY),w.deltaY<0?Y(E(w.deltaY)):w.deltaY>0&&G(E(w.deltaY)),n.update()}function xe(w){let Z=!1;switch(w.code){case n.keys.UP:w.ctrlKey||w.metaKey||w.shiftKey?$(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(0,n.keyPanSpeed),Z=!0;break;case n.keys.BOTTOM:w.ctrlKey||w.metaKey||w.shiftKey?$(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(0,-n.keyPanSpeed),Z=!0;break;case n.keys.LEFT:w.ctrlKey||w.metaKey||w.shiftKey?H(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(n.keyPanSpeed,0),Z=!0;break;case n.keys.RIGHT:w.ctrlKey||w.metaKey||w.shiftKey?H(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):N(-n.keyPanSpeed,0),Z=!0;break}Z&&(w.preventDefault(),n.update())}function Ie(w){if(A.length===1)u.set(w.pageX,w.pageY);else{let Z=Ye(w),ce=.5*(w.pageX+Z.x),ie=.5*(w.pageY+Z.y);u.set(ce,ie)}}function Ue(w){if(A.length===1)g.set(w.pageX,w.pageY);else{let Z=Ye(w),ce=.5*(w.pageX+Z.x),ie=.5*(w.pageY+Z.y);g.set(ce,ie)}}function Te(w){let Z=Ye(w),ce=w.pageX-Z.x,ie=w.pageY-Z.y,ye=Math.sqrt(ce*ce+ie*ie);p.set(0,ye)}function Xe(w){n.enableZoom&&Te(w),n.enablePan&&Ue(w)}function O(w){n.enableZoom&&Te(w),n.enableRotate&&Ie(w)}function ft(w){if(A.length==1)f.set(w.pageX,w.pageY);else{let ce=Ye(w),ie=.5*(w.pageX+ce.x),ye=.5*(w.pageY+ce.y);f.set(ie,ye)}d.subVectors(f,u).multiplyScalar(n.rotateSpeed);let Z=n.domElement;H(2*Math.PI*d.x/Z.clientHeight),$(2*Math.PI*d.y/Z.clientHeight),u.copy(f)}function Ee(w){if(A.length===1)_.set(w.pageX,w.pageY);else{let Z=Ye(w),ce=.5*(w.pageX+Z.x),ie=.5*(w.pageY+Z.y);_.set(ce,ie)}m.subVectors(_,g).multiplyScalar(n.panSpeed),N(m.x,m.y),g.copy(_)}function Pe(w){let Z=Ye(w),ce=w.pageX-Z.x,ie=w.pageY-Z.y,ye=Math.sqrt(ce*ce+ie*ie);b.set(0,ye),y.set(0,Math.pow(b.y/p.y,n.zoomSpeed)),G(y.y),p.copy(b);let Ve=(w.pageX+Z.x)*.5,qe=(w.pageY+Z.y)*.5;q(Ve,qe)}function ge(w){n.enableZoom&&Pe(w),n.enablePan&&Ee(w)}function tt(w){n.enableZoom&&Pe(w),n.enableRotate&&ft(w)}function De(w){n.enabled!==!1&&(A.length===0&&(n.domElement.setPointerCapture(w.pointerId),n.domElement.addEventListener("pointermove",S),n.domElement.addEventListener("pointerup",x)),Re(w),w.pointerType==="touch"?_e(w):F(w))}function S(w){n.enabled!==!1&&(w.pointerType==="touch"?he(w):te(w))}function x(w){Oe(w),A.length===0&&(n.domElement.releasePointerCapture(w.pointerId),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",x)),n.dispatchEvent(td),r=s.NONE}function F(w){let Z;switch(w.button){case 0:Z=n.mouseButtons.LEFT;break;case 1:Z=n.mouseButtons.MIDDLE;break;case 2:Z=n.mouseButtons.RIGHT;break;default:Z=-1}switch(Z){case bi.DOLLY:if(n.enableZoom===!1)return;ne(w),r=s.DOLLY;break;case bi.ROTATE:if(w.ctrlKey||w.metaKey||w.shiftKey){if(n.enablePan===!1)return;de(w),r=s.PAN}else{if(n.enableRotate===!1)return;Q(w),r=s.ROTATE}break;case bi.PAN:if(w.ctrlKey||w.metaKey||w.shiftKey){if(n.enableRotate===!1)return;Q(w),r=s.ROTATE}else{if(n.enablePan===!1)return;de(w),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(sl)}function te(w){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;V(w);break;case s.DOLLY:if(n.enableZoom===!1)return;j(w);break;case s.PAN:if(n.enablePan===!1)return;fe(w);break}}function K(w){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(w.preventDefault(),n.dispatchEvent(sl),ve(w),n.dispatchEvent(td))}function ee(w){n.enabled===!1||n.enablePan===!1||xe(w)}function _e(w){switch(J(w),A.length){case 1:switch(n.touches.ONE){case Ei.ROTATE:if(n.enableRotate===!1)return;Ie(w),r=s.TOUCH_ROTATE;break;case Ei.PAN:if(n.enablePan===!1)return;Ue(w),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case Ei.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Xe(w),r=s.TOUCH_DOLLY_PAN;break;case Ei.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;O(w),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(sl)}function he(w){switch(J(w),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;ft(w),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;Ee(w),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ge(w),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;tt(w),n.update();break;default:r=s.NONE}}function me(w){n.enabled!==!1&&w.preventDefault()}function Re(w){A.push(w.pointerId)}function Oe(w){delete X[w.pointerId];for(let Z=0;Z<A.length;Z++)if(A[Z]==w.pointerId){A.splice(Z,1);return}}function J(w){let Z=X[w.pointerId];Z===void 0&&(Z=new be,X[w.pointerId]=Z),Z.set(w.pageX,w.pageY)}function Ye(w){let Z=w.pointerId===A[0]?A[1]:A[0];return X[Z]}n.domElement.addEventListener("contextmenu",me),n.domElement.addEventListener("pointerdown",De),n.domElement.addEventListener("pointercancel",x),n.domElement.addEventListener("wheel",K,{passive:!1}),this.update()}};var rl=.95,id=.85,us=.478,ol=1,kM=240,HM={[Ae.PX]:{pos:[us,0,0],rot:[0,Math.PI/2,0]},[Ae.NX]:{pos:[-us,0,0],rot:[0,-Math.PI/2,0]},[Ae.PY]:{pos:[0,us,0],rot:[-Math.PI/2,0,0]},[Ae.NY]:{pos:[0,-us,0],rot:[Math.PI/2,0,0]},[Ae.PZ]:{pos:[0,0,us],rot:[0,0,0]},[Ae.NZ]:{pos:[0,0,-us],rot:[0,Math.PI,0]}},VM=11187136,GM=.38,WM=16765952,XM=.5,YM=1316380,qM=320,$M=260,sd=i=>i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2,No=class{constructor(e,{onFirstFrame:t}={}){this.canvas=e,this.onFirstFrame=t,this._initScene(),this._initLights(),this._initControls(),this._initResize(),this._isAnimating=!1,this._animationQueue=[],this.pieceMeshes=new Map,this.stickerMeshes=[],this.bodyMaterials=[],this._glow=!1,this._pressed=null,this.puzzleGroup=new Yt,this.scene.add(this.puzzleGroup),this._stateType=null,this._startRenderLoop()}_initScene(){this.scene=new vo,this.scene.background=new Be(1711396);let e=this.canvas.clientWidth/this.canvas.clientHeight;this.camera=new Ut(45,e||1,.1,100),this.camera.position.set(5,4.5,6.5),this.camera.lookAt(0,0,0),this.renderer=new Fs({canvas:this.canvas,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(this.canvas.clientWidth,this.canvas.clientHeight,!1)}_fitFactor(){let e=this.camera.aspect||1;return e>=1?1:Math.min(1.4,1/Math.sqrt(Math.max(e,.45)))}_placeCamera(e,t,n){let s=this._fitFactor();this.camera.position.set(e*s,t*s,n*s),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update()}_initLights(){let e=new To(16777215,2105392,.85);this.scene.add(e);let t=new Hs(16777215,.9);t.position.set(5,8,6),this.scene.add(t);let n=new Hs(10531071,.35);n.position.set(-6,-3,-4),this.scene.add(n)}_initControls(){this.controls=new Do(this.camera,this.canvas),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.minDistance=4,this.controls.maxDistance=20,this.controls.enablePan=!1}_initResize(){this._onResize=()=>this._handleResize(),window.addEventListener("resize",this._onResize)}_handleResize(){let e=this.canvas.clientWidth,t=this.canvas.clientHeight;e===0||t===0||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1))}_startRenderLoop(){let e=()=>{this.controls.update(),this.renderer.render(this.scene,this.camera),this._firstFrameDone||(this._firstFrameDone=!0,this.onFirstFrame?.()),this._rafId=requestAnimationFrame(e)};e()}pauseLoop(){this._rafId!=null&&(cancelAnimationFrame(this._rafId),this._rafId=null)}resumeLoop(){this._rafId==null&&this._startRenderLoop()}dispose(){cancelAnimationFrame(this._rafId),window.removeEventListener("resize",this._onResize),this.controls.dispose(),this.renderer.dispose()}setEdgeGlow(e){let t=!!e;if(t!==this._glow){this._glow=t;for(let n of this.bodyMaterials)n.emissive.set(t?VM:0),n.emissiveIntensity=t?GM:0,n.needsUpdate=!0}}get pressed(){return this._pressed}setPressed(e){if(this._pressed&&(this._pressed.parent?.remove(this._pressed),this._pressed.traverse(s=>{s!==this._pressed&&s.geometry?.dispose(),s.material?.dispose()}),this._pressed=null),!e?.geometry)return;let t=new Dt(e.geometry,new os({color:WM,transparent:!0,opacity:XM,depthWrite:!1,side:ln,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));t.renderOrder=2;let n=new bo(new wo(e.geometry),new Bs({color:YM,transparent:!0,opacity:.9}));n.renderOrder=3,t.add(n),e.add(t),this._pressed=t}rebuild(e){let t=this._stateType;this.setPressed(null);for(let s of this.pieceMeshes.values())this.puzzleGroup.remove(s),this._disposeMesh(s);this.pieceMeshes.clear(),this.stickerMeshes.length=0,this.bodyMaterials.length=0,this._stateType=e.getType(),this.puzzleGroup.position.set(0,0,0);let n=this._glow;if(this._glow=!1,this.puzzleGroup.rotation.set(0,0,0),this._stateType==="cube"){let s=e.n===2?2:e.n===3?1:3/e.n;this.puzzleGroup.scale.setScalar(s),this._buildCubeMeshes(e),t!=="cube"&&this._placeCamera(5,4.5,6.5)}else if(this._stateType==="pyraminx")this.puzzleGroup.scale.setScalar(2.5),this._buildFacetedMeshes(e),t!=="pyraminx"&&this._placeCamera(1.2,1.8,7);else if(this._stateType.startsWith("cuboid")){let s=e.getBoundingRadius?.()??1.5;this.puzzleGroup.scale.setScalar(2/s),this._buildFacetedMeshes(e),t?.startsWith("cuboid")||this._placeCamera(4.6,5.6,6.4)}else this._stateType==="megaminx"&&(this.puzzleGroup.scale.setScalar(2.6),this._buildFacetedMeshes(e),t!=="megaminx"&&this._placeCamera(.6,3.4,8));this.setEdgeGlow(n)}_buildCubeMeshes(e){for(let t of e.cubies){let n=this._createCubieMesh(t);this.pieceMeshes.set(t,n),this.puzzleGroup.add(n)}}_createCubieMesh(e){let t=new Yt;t.position.set(e.position.x*ol,e.position.y*ol,e.position.z*ol);let n=new yi(rl,rl,rl),s=new vi({color:657930,roughness:.55,metalness:.15}),r=new Dt(n,s);this.bodyMaterials.push(s),t.add(r);let a=new Os(id,id);for(let o of Object.keys(e.faces)){let c=e.faces[o];if(!c)continue;let l=HM[o],h=new vi({color:new Be(c),roughness:.4,metalness:0,side:en}),u=new Dt(a,h);u.position.set(...l.pos),u.rotation.set(...l.rot),u.userData.sticker={piece:e,faceKey:o},this.stickerMeshes.push(u),t.add(u)}return t.userData.piece=e,t}_buildFacetedMeshes(e){for(let t of e.pieces){let n=this._createFacetedPieceMesh(t);this.pieceMeshes.set(t,n),this.puzzleGroup.add(n)}}_createFacetedPieceMesh(e,t=.88){let n=new Yt;for(let s of e.stickers){let r=s.vertices,a=0,o=0,c=0;for(let Y of r)a+=Y.x,o+=Y.y,c+=Y.z;a/=r.length,o/=r.length,c/=r.length;let[l,h,u]=r,f=h.x-l.x,d=h.y-l.y,g=h.z-l.z,_=u.x-l.x,m=u.y-l.y,p=u.z-l.z,b=d*p-g*m,y=g*_-f*p,T=f*m-d*_,L=r,R=b,A=y,X=T;b*a+y*o+T*c<0&&(L=[...r].reverse(),R=-b,A=-y,X=-T);let M=Math.sqrt(R*R+A*A+X*X)||1,E=.004,H=R/M*E,$=A/M*E,ae=X/M*E,I=new vi({color:658448,roughness:.55,metalness:.15,side:en});this.bodyMaterials.push(I),this._addPolygon(n,L.map(Y=>({x:Y.x+H*.3,y:Y.y+$*.3,z:Y.z+ae*.3})),I);let N=t,G=this._addPolygon(n,L.map(Y=>({x:a+(Y.x-a)*N+H,y:o+(Y.y-o)*N+$,z:c+(Y.z-c)*N+ae})),new vi({color:new Be(s.color),roughness:.25,metalness:0,side:en}));G.userData.sticker={piece:e,face:s.face,poly:s},this.stickerMeshes.push(G)}return n.userData.piece=e,n}_addPolygon(e,t,n){let s=t.length-2,r=new Float32Array(s*9);for(let c=0;c<s;c++){let l=t[0],h=t[c+1],u=t[c+2];r.set([l.x,l.y,l.z,h.x,h.y,h.z,u.x,u.y,u.z],c*9)}let a=new nn;a.setAttribute("position",new Nt(r,3)),a.computeVertexNormals();let o=new Dt(a,n);return e.add(o),o}_disposeMesh(e){e.traverse(t=>{t.isMesh&&(t.geometry?.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material?.dispose())})}animateMove(e){return new Promise(t=>{this._animationQueue.push({spec:e,resolve:t}),this._processQueue()})}async _processQueue(){if(this._isAnimating||this._animationQueue.length===0)return;let{spec:e,resolve:t}=this._animationQueue.shift();this._isAnimating=!0;try{await this._runMoveAnimation(e)}finally{this._isAnimating=!1,t(),this._animationQueue.length>0&&this._processQueue()}}async _runMoveAnimation(e){let{pieces:t,axis:n,angle:s,state:r}=e;if(!t||t.length===0){r&&this.rebuild(r);return}let a=new Yt;this.puzzleGroup.add(a);let o=[];for(let l of t){let h=this.pieceMeshes.get(l);h&&(a.attach(h),o.push(h))}let c=e.duration??{pyraminx:qM,megaminx:$M}[this._stateType]??kM;if(typeof n=="string")await this._tweenRotation(a,n,s,c);else{let l=new P(n.x,n.y,n.z).normalize();await this._tweenQuaternionRotation(a,l,s,c)}for(let l of o)this.puzzleGroup.attach(l);this.puzzleGroup.remove(a),r&&this.rebuild(r)}_tweenRotation(e,t,n,s){return new Promise(r=>{let a=performance.now(),o=()=>{let c=Math.min((performance.now()-a)/s,1),l=sd(c)*n;e.rotation[t]=l,c<1?requestAnimationFrame(o):(e.rotation[t]=n,r())};requestAnimationFrame(o)})}_tweenQuaternionRotation(e,t,n,s){return new Promise(r=>{let a=performance.now(),o=()=>{let c=Math.min((performance.now()-a)/s,1),l=sd(c)*n;e.quaternion.setFromAxisAngle(t,l),c<1?requestAnimationFrame(o):(e.quaternion.setFromAxisAngle(t,n),r())};requestAnimationFrame(o)})}};var Oo=class{constructor(){this.moves=[],this.cursor=0,this._listeners=[]}subscribe(e){this._listeners.push(e);try{e(this.snapshot())}catch(t){console.error(t)}return()=>{this._listeners=this._listeners.filter(t=>t!==e)}}_emit(){let e=this.snapshot();for(let t of this._listeners)try{t(e)}catch(n){console.error(n)}}snapshot(){return{moves:[...this.moves],cursor:this.cursor,canUndo:this.canUndo(),canRedo:this.canRedo()}}addMove(e){typeof e!="string"||!e||(this.cursor<this.moves.length&&(this.moves=this.moves.slice(0,this.cursor)),this.moves.push(e),this.cursor=this.moves.length,this._emit())}queueMoves(e){if(!Array.isArray(e))return 0;let t=e.filter(n=>typeof n=="string"&&n);return t.length?(this.moves=this.moves.slice(0,this.cursor).concat(t),this._emit(),t.length):0}undo(){return this.canUndo()?(this.cursor--,this._emit(),1):0}redo(){return this.canRedo()?(this.cursor++,this._emit(),1):0}goToIndex(e){let t=Math.max(0,Math.min(this.moves.length,e|0)),n=t-this.cursor;return this.cursor=t,this._emit(),n}clear(){this.moves=[],this.cursor=0,this._emit()}canUndo(){return this.cursor>0}canRedo(){return this.cursor<this.moves.length}getCursor(){return this.cursor}getMoves(){return[...this.moves]}getMovesUpToCursor(){return this.moves.slice(0,this.cursor)}length(){return this.moves.length}};function vn(){let i=globalThis.ytgame;return i&&i.IN_PLAYABLES_ENV?i:null}var rd=()=>vn()!==null;function od(){vn()?.game.firstFrameReady()}function ad(){vn()?.game.gameReady()}var cd=()=>{};function ld(i){return vn()?.system.onPause(i)??cd}function hd(i){return vn()?.system.onResume(i)??cd}async function ud(i){let e=vn();if(!e)return!1;try{return await e.game.saveData(i),!0}catch(t){return ZM(`saveData: ${t?.errorType??"UNKNOWN"}`),!1}}async function fd(){let i=vn();if(!i)return null;try{return await i.game.loadData()??null}catch(e){return e?.errorType&&e.errorType!=="API_UNAVAILABLE"&&Fo(`loadData: ${e.errorType}`),null}}async function al(i){let e=vn();if(!e||!Number.isSafeInteger(i)||i<0)return!1;try{return await e.engagement.sendScore({value:i}),!0}catch(t){return Fo(`sendScore: ${t?.errorType??"UNKNOWN"}`),!1}}function ZM(i){vn()?.health?.logError?.(i)}function Fo(i){vn()?.health?.logWarning?.(i)}var ei=()=>globalThis.bridge??null,pd=()=>ei()!==null,md="twistlab_session",cl=!1;async function gd({espera:i=8e3}={}){let e=ei();return e?.initialize?(await Promise.race([e.initialize().catch(t=>{console.warn("[playgama] initialize fall\xF3:",t?.message??t)}),new Promise(t=>setTimeout(t,i))]),cl=!!ei()?.platform,cl||console.warn("[playgama] el Bridge no lleg\xF3 a estar listo"),cl):!1}var zo=()=>ei()?.platform??null;function _d(){let i=zo();if(!i?.sendMessage)return console.warn("[playgama] no se pudo avisar de game_ready: el Bridge no est\xE1 listo"),!1;try{return i.sendMessage("game_ready"),!0}catch(e){return console.warn("[playgama] game_ready fall\xF3:",e?.message??e),!1}}var dd=()=>{};function xd(){return zo()?.isAudioEnabled??!0}function yd(i,e){let t=zo(),n=ei()?.EVENT_NAME?.[i];if(!t?.on||!n)return dd;try{t.on(n,e)}catch(s){console.warn(`[playgama] no se pudo escuchar ${i}:`,s?.message??s)}return dd}var vd=i=>yd("PAUSE_STATE_CHANGED",i),Md=i=>yd("AUDIO_STATE_CHANGED",i);async function Sd(i){let e=ei();if(!e?.storage?.set)return!1;try{return await e.storage.set([md],[i]),!0}catch(t){return console.warn("[playgama] storage.set fall\xF3:",t?.message??t),!1}}var JM="level_completed";function ll(i=JM){let e=ei()?.advertisement;if(!e?.showInterstitial||e.isInterstitialSupported===!1)return!1;try{return e.showInterstitial(i),!0}catch(t){return console.warn("[playgama] showInterstitial fall\xF3:",t?.message??t),!1}}function bd(){let i=zo();if(!i?.sendMessage)return!1;try{return i.sendMessage("level_completed"),!0}catch(e){return console.warn("[playgama] level_completed fall\xF3:",e?.message??e),!1}}async function Ed(){let i=ei();if(!i?.storage?.get)return null;try{return(await i.storage.get([md]))?.[0]??null}catch(e){return console.warn("[playgama] storage.get fall\xF3:",e?.message??e),null}}var wd=Object.freeze({cube2:1,cube3:3,cube4:6,cube5:10,pyraminx:2,megaminx:12,cuboid221:1,cuboid331:1}),QM=5,eS=2500,tS=.2,nS=3,Ad=3,iS=i=>(wd[i]??1)*30,sS=i=>(wd[i]??1)*20,Td=()=>({total:0,carrera:0,racha:0,ultimo:0,desde:0,corriendo:!1,mejores:[]}),rS=i=>Math.min(nS,1+Math.max(0,i-1)*tS);function Rd(i,e){return i.corriendo=!0,i.carrera=0,i.racha=0,i.ultimo=0,i.desde=e,i}function Bo(i){return i.corriendo=!1,i.carrera=0,i.racha=0,i}function Cd(i,e){if(!i.corriendo)return 0;let t=i.ultimo&&e-i.ultimo<=eS;i.racha=t?i.racha+1:1,i.ultimo=e;let n=Math.round(QM*rS(i.racha));return i.carrera+=n,i.total+=n,n}function Pd(i,e,t){if(!i.corriendo)return null;let n=Math.max(0,(t-i.desde)/1e3),s=iS(e),r=sS(e),a=Math.round(r*Math.max(0,1-n/s));i.carrera+=r+a,i.total+=r+a;let o=i.carrera,c=oS(i,o);return i.corriendo=!1,i.carrera=0,i.racha=0,{base:r,prima:a,carrera:o,segundos:n,puesto:c}}function oS(i,e){if(!(e>0))return 0;let t=[...i.mejores,e].sort((s,r)=>r-s).slice(0,Ad);return i.mejores=t,t.indexOf(e)+1}var hl=i=>(Array.isArray(i)?i:[]).filter(e=>Number.isSafeInteger(e)&&e>0).sort((e,t)=>t-e).slice(0,Ad);var Ld=Object.freeze(["cube2","cube3","cube4","cube5","pyraminx","megaminx","cuboid221","cuboid331"]),cS=3,lS=[1,2,3],Id=4e3;function Ud({puzzle:i,moves:e,score:t=0,best:n=[]}){if(!Ld.includes(i))return null;let s=Array.isArray(e)?e.filter(a=>typeof a=="string"&&a):[];if(s.length>Id)return null;let r=Number.isSafeInteger(t)&&t>=0?t:0;return JSON.stringify({v:cS,p:i,m:s,s:r,b:hl(n)})}function Dd(i){if(typeof i!="string"||!i)return null;let e;try{e=JSON.parse(i)}catch{return null}if(!e||typeof e!="object"||!lS.includes(e.v)||!Ld.includes(e.p)||!Array.isArray(e.m)||e.m.length>Id||!e.m.every(n=>typeof n=="string"&&n))return null;let t=Number.isSafeInteger(e.s)&&e.s>=0?e.s:0;return{puzzle:e.p,moves:e.m,score:t,best:hl(e.b)}}function Nd(i,e){i.reset();let t=[];for(let n of e){if(!i.parseMove?.(n))break;i.applyMove(n),t.push(n)}return t}var D={puzzleKey:"cube3",puzzleState:null,renderer:null,history:null,isAnimating:!1,isSolving:!1,paused:!1,saveReady:!1,marcador:Td(),scrambled:!1,labels:!0};document.addEventListener("DOMContentLoaded",()=>{let i=document.getElementById("cube-canvas");D.renderer=new No(i,{onFirstFrame:()=>od()}),D.faceLabels=new Io(D.renderer,e=>ko(e),()=>D.isAnimating||D.isSolving,()=>D.puzzleState),D.dragTurns=new Lo(D.renderer,()=>D.puzzleState,e=>ko(e),()=>D.isAnimating||D.isSolving,e=>D.renderer.setEdgeGlow(e)),D.history=new Oo,D.history.subscribe(dl),ul(D.puzzleKey),document.querySelectorAll("[data-puzzle]").forEach(e=>{e.addEventListener("click",()=>ul(e.dataset.puzzle))}),document.getElementById("btn-undo").addEventListener("click",yS),document.getElementById("btn-redo").addEventListener("click",vS),document.getElementById("btn-reset").addEventListener("click",MS),document.getElementById("btn-solve").addEventListener("click",RS),document.getElementById("btn-shuffle").addEventListener("click",SS),document.getElementById("btn-labels")?.addEventListener("click",mS),document.getElementById("history-toggle")?.addEventListener("click",()=>Hd()),window.addEventListener("keydown",PS),Bd(),zd(),dl(D.history.snapshot()),Ho(),hS()});async function hS(){await gd(),_d(),(rd()||pd())&&await Promise.race([pS(),new Promise(i=>setTimeout(i,5e3))]),D.saveReady=!0,ad(),vd(i=>i?Od():Fd()),Md(()=>{}),xd(),D.marcador.total>0&&al(D.marcador.total),ld(Od),hd(Fd)}function Od(){D.paused=!0,pl(),D.renderer.pauseLoop()}function Fd(){D.paused=!1,D.renderer.resumeLoop()}function Ho({ganados:i=0}={}){let e=document.getElementById("score");e&&(e.textContent=`${D.marcador.total} pts`,i>0&&(e.classList.remove("gained"),e.offsetWidth,e.classList.add("gained")));let t=document.getElementById("best");if(!t)return;let n=D.marcador.mejores;t.hidden=n.length===0,t.innerHTML=n.map((s,r)=>`<span class="${r===0?"top":""}">${r===0?"\u2605 ":""}${s}</span>`).join(" \xB7 "),t.title=`Your ${n.length} best runs`}function uS(){if(!D.scrambled||D.isSolving)return;let i=Cd(D.marcador,Date.now());i>0&&Ho({ganados:i})}function fS(){if(!D.scrambled||D.isSolving||!D.puzzleState.looksSolved?.())return;D.scrambled=!1;let i=Pd(D.marcador,D.puzzleKey,Date.now());if(!i)return;Ho({ganados:i.base+i.prima});let e=i.puesto?` \xB7 #${i.puesto} best run!`:"";pn(`Solved in ${Math.round(i.segundos)}s! +${i.base+i.prima} \xB7 run ${i.carrera}${e}`),al(D.marcador.total),pl(),bd(),setTimeout(()=>ll(),1500)}var dS=1200;function Mn(){D.saveReady&&(clearTimeout(Mn._t),Mn._t=setTimeout(pl,dS))}function pl(){if(!D.saveReady)return;clearTimeout(Mn._t);let i=Ud({puzzle:D.puzzleKey,moves:D.history.getMovesUpToCursor(),score:D.marcador.total,best:D.marcador.mejores});i&&(ud(i),Sd(i))}async function pS(){let i=Dd(await fd()??await Ed());if(!i)return;ul(i.puzzle),D.marcador.total=i.score,D.marcador.mejores=i.best??[],Ho();let e=Nd(D.puzzleState,i.moves);D.renderer.rebuild(D.puzzleState),D.faceLabels?.rebuild(D.puzzleState),D.history.clear();for(let t of e)D.history.addMove(t);e.length!==i.moves.length&&Fo(`partida restaurada a medias: ${e.length}/${i.moves.length}`)}function ul(i){i===D.puzzleKey&&D.puzzleState||D.isAnimating||D.isSolving||(D.puzzleKey=i,D.puzzleState=xS(i),D.renderer.rebuild(D.puzzleState),D.faceLabels?.rebuild(D.puzzleState),D.history.clear(),Bd(),_S(),D.scrambled=!1,Bo(D.marcador),Mn())}function mS(){D.labels=!D.labels,D.faceLabels?.setVisible(D.labels),zd()}function zd(){let i=document.getElementById("btn-labels");i&&(i.setAttribute("aria-pressed",String(D.labels)),i.title=D.labels?"Hide the floating move buttons":"Show the floating move buttons")}var gS=i=>{let e=i?.getType?.();return e==="megaminx"||e==="pyraminx"?!0:e==="cube"&&i.n>=3&&i.n<=5};function _S(){let i=document.getElementById("btn-solve");i&&(i.hidden=!gS(D.puzzleState))}function xS(i){switch(i){case"cube2":return new Rt(2);case"cube3":return new Rt(3);case"cube4":return new Rt(4);case"cube5":return new Rt(5);case"pyraminx":return new Ai;case"megaminx":return new si;case"cuboid221":return Cl();case"cuboid331":return Pl();default:throw new Error(`[main] Puzzle no soportado: ${i}`)}}function Bd(){document.querySelectorAll("[data-puzzle]").forEach(i=>{let e=i.dataset.puzzle===D.puzzleKey;i.classList.toggle("active",e),i.setAttribute("aria-pressed",e?"true":"false")})}async function ko(i,{duration:e}={}){if(D.isAnimating||D.isSolving)return;let t=D.puzzleState.parseMove(i);if(t){D.isAnimating=!0,fs(!1);try{let n=D.puzzleState.pickLayerPieces(i),s=Sr(D.puzzleState,t,1);D.puzzleState.applyMove(i),await D.renderer.animateMove({pieces:n,...s,...e?{duration:e}:{},state:D.puzzleState}),D.history.addMove(i),uS(),fS(),Mn()}catch(n){console.error("[main] Error al ejecutar movimiento:",n)}finally{D.isAnimating=!1,fs(!0)}}}async function yS(){if(!(D.isAnimating||D.isSolving)&&D.history.canUndo()){D.isAnimating=!0,fs(!1);try{let i=D.history.getCursor()-1,e=D.history.getMoves()[i],t=D.puzzleState.parseMove(e),n=D.puzzleState.pickLayerPieces(e),s=Sr(D.puzzleState,t,-1);D.puzzleState.applyInverse(e),await D.renderer.animateMove({pieces:n,...s,state:D.puzzleState}),D.history.undo(),Mn()}finally{D.isAnimating=!1,fs(!0)}}}async function vS(){if(!(D.isAnimating||D.isSolving)&&D.history.canRedo()){D.isAnimating=!0,fs(!1);try{let i=D.history.getCursor(),e=D.history.getMoves()[i],t=D.puzzleState.parseMove(e),n=D.puzzleState.pickLayerPieces(e),s=Sr(D.puzzleState,t,1);D.puzzleState.applyMove(e),await D.renderer.animateMove({pieces:n,...s,state:D.puzzleState}),D.history.redo(),Mn()}finally{D.isAnimating=!1,fs(!0)}}}function MS(){D.isAnimating||D.isSolving||(D.puzzleState.reset(),D.renderer.rebuild(D.puzzleState),D.history.clear(),D.scrambled=!1,Bo(D.marcador),Mn())}async function SS(){if(D.isAnimating||D.isSolving)return;ll();let i=D.puzzleState.getMoveNotation(),e=D.puzzleState.getScrambleSuffixes(),t=D.puzzleState.getScrambleLength(),n=[],s="";for(let r=0;r<t;r++){let a;do a=i[Math.floor(Math.random()*i.length)];while(a===s);s=a,n.push(a+e[Math.floor(Math.random()*e.length)])}for(let r of n){if(D.paused)break;await ko(r)}D.puzzleState.looksSolved?.()===!1&&(D.scrambled=!0,Rd(D.marcador,Date.now()))}function bS(i){if(D.isAnimating||D.isSolving)return;let e=D.history.getCursor();if(i===e)return;let t=D.history.getMoves().slice(0,i);D.puzzleState.reset(),D.puzzleState.applyMoves(t),D.renderer.rebuild(D.puzzleState),D.history.goToIndex(i),Mn()}var ES=new URL("./solver.N5G5F36D.js",import.meta.url),fl=0,wS=()=>{let i=performance.now();if(!(i-fl<100))return fl=i,new Promise(e=>setTimeout(e,0))},kd=(i,e)=>pn(`Solving\u2026 step ${i} of 10: ${e}`);function AS(i){let e;try{e=new Worker(ES,{type:"module"})}catch{return null}return new Promise(t=>{let n=s=>{e.terminate(),t(s)};e.onmessage=({data:s})=>{if(s.tipo==="etapa")return kd(s.n,s.rotulo);if(s.tipo==="error")return console.warn("[main] El worker del Megaminx fall\xF3:",s.mensaje),n(null);n(s.plan)},e.onerror=s=>{console.warn("[main] No se pudo arrancar el worker del Megaminx:",s.message),n(void 0)},e.postMessage({estado:i})})}async function TS(){let i=D.puzzleState.getType?.();if(i==="cube"&&D.puzzleState.n===3){let e=Ci(D.puzzleState);return e&&e.solved?e.moves:null}if(i==="cube"&&(D.puzzleState.n===4||D.puzzleState.n===5)){let e=D.puzzleState.n,t=`${e}\xD7${e}\xD7${e}`;pn(`Solving the ${t} \u2014 this takes a moment\u2026`),await new Promise(requestAnimationFrame);let s=(e===4?Dh:Oh)(D.puzzleState,{aviso:r=>pn(`Solving the ${t} \u2014 ${r}\u2026`)});return s&&s.solved?s.moves:null}if(i==="pyraminx")return mh(D.puzzleState);if(i==="megaminx"){pn("Solving the Megaminx \u2014 this takes a moment\u2026");let e=Kl(D.puzzleState),t=AS(e);if(t){let n=await t;if(n!==void 0)return n}return fl=performance.now(),oh(e,void 0,{aviso:kd,respira:wS})}}async function RS(){if(D.isAnimating||D.isSolving)return;D.isSolving=!0;let i;try{i=await TS()}finally{D.isSolving=!1}if(i===void 0){pn("For now I can only solve the cubes up to 5\xD75\xD75, the Megaminx and the Pyraminx.");return}if(!i){pn("I could not find a solution for this state."),console.warn("[main] The solver did not reach the end:",D.puzzleState.getFaceletString?.());return}if(!i.length){pn("Already solved.");return}let e={moves:i},t=D.history.queueMoves(e.moves);D.scrambled=!1,Bo(D.marcador),Mn(),pn(`${t} moves ready \u2014 press Redo to step through them.`)}function dl(i){let e=document.getElementById("history-list"),t=document.getElementById("history-count"),n=document.getElementById("history-progress"),s=document.getElementById("btn-undo"),r=document.getElementById("btn-redo");if(t&&(t.textContent=`${i.cursor} / ${i.moves.length}`),s&&(s.disabled=!i.canUndo),r&&(r.disabled=!i.canRedo),n){let o=i.moves.length;n.style.width=o?`${i.cursor/o*100}%`:"0"}if(!e)return;e.innerHTML="";let a=null;i.moves.forEach((o,c)=>{let l=document.createElement("button");l.className="history-item "+(c<i.cursor?"done":"undone"),l.textContent=o,l.title=`Jump to the state after ${c+1} moves`,c===i.cursor-1&&(l.classList.add("current","last-applied"),a=l),l.addEventListener("click",()=>bS(c)),e.appendChild(l)}),a?.scrollIntoView({block:"nearest",inline:"center"})}function Hd(i){let e=document.getElementById("history-toggle"),t=document.getElementById("history-panel");if(!e||!t)return;let n=e.getAttribute("aria-expanded")==="true",s=i??!n;e.setAttribute("aria-expanded",s?"true":"false"),t.dataset.collapsed=s?"false":"true",s&&dl(D.history.snapshot())}var CS=()=>Hd(!1);function fs(i){document.querySelectorAll("button").forEach(e=>{e.dataset.alwaysOn!=="true"&&(e.disabled=!i)})}function pn(i){let e=document.getElementById("status");e&&(e.textContent=i,e.classList.add("visible"),clearTimeout(pn._t),pn._t=setTimeout(()=>e.classList.remove("visible"),2400))}function PS(i){if(i.key==="Escape"){CS();return}if(D.isAnimating||D.isSolving)return;let e=i.key.toUpperCase();if(!D.puzzleState.getMoveNotation().includes(e))return;i.preventDefault();let n=i.altKey?"2":i.shiftKey?"'":"";ko(e+n)}
/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
