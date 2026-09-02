var Ae=Object.freeze({PX:"px",NX:"nx",PY:"py",NY:"ny",PZ:"pz",NZ:"nz"}),sg=Object.freeze({[Ae.PX]:{x:1,y:0,z:0},[Ae.NX]:{x:-1,y:0,z:0},[Ae.PY]:{x:0,y:1,z:0},[Ae.NY]:{x:0,y:-1,z:0},[Ae.PZ]:{x:0,y:0,z:1},[Ae.NZ]:{x:0,y:0,z:-1}}),Ow=Object.freeze({WHITE:"U",YELLOW:"D",GREEN:"F",BLUE:"B",RED:"R",ORANGE:"L"}),vr=class i{constructor(e,t,n){this.position={x:e,y:t,z:n},this.faces={[Ae.PX]:null,[Ae.NX]:null,[Ae.PY]:null,[Ae.NY]:null,[Ae.PZ]:null,[Ae.NZ]:null}}getId(){return`cubie_${this.position.x}_${this.position.y}_${this.position.z}`}setFaceColor(e,t){this.faces[e]=t}applyMatrix(e){let t=this.position,n=Lu(e,t);this.position={x:Oa(n.x),y:Oa(n.y),z:Oa(n.z)};let s={[Ae.PX]:null,[Ae.NX]:null,[Ae.PY]:null,[Ae.NY]:null,[Ae.PZ]:null,[Ae.NZ]:null};for(let r of Object.keys(this.faces)){let a=this.faces[r];if(a===null)continue;let o=sg[r],c=Lu(e,o),l=rg(c);s[l]=a}this.faces=s}clone(){let e=new i(this.position.x,this.position.y,this.position.z);return e.faces={...this.faces},e}};function Lu(i,e){return{x:i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,y:i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,z:i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z}}function rg(i){let e=Math.round(i.x),t=Math.round(i.y),n=Math.round(i.z);return e===1?Ae.PX:e===-1?Ae.NX:t===1?Ae.PY:t===-1?Ae.NY:n===1?Ae.PZ:n===-1?Ae.NZ:Math.abs(i.x)>=Math.abs(i.y)&&Math.abs(i.x)>=Math.abs(i.z)?i.x>0?Ae.PX:Ae.NX:Math.abs(i.y)>=Math.abs(i.x)&&Math.abs(i.y)>=Math.abs(i.z)?i.y>0?Ae.PY:Ae.NY:i.z>0?Ae.PZ:Ae.NZ}function Oa(i){return Math.round(i*2)/2}var _n=class i{constructor(){if(new.target===i)throw new Error("[PuzzleState] Clase abstracta: no se puede instanciar directamente. Use CubeState, PyraminxState u otra subclase concreta.")}applyMove(){throw new Error("PuzzleState.applyMove no implementado")}applyInverse(){throw new Error("PuzzleState.applyInverse no implementado")}getFaceletString(){throw new Error("PuzzleState.getFaceletString no implementado")}reset(){throw new Error("PuzzleState.reset no implementado")}isSolved(){throw new Error("PuzzleState.isSolved no implementado")}clone(){throw new Error("PuzzleState.clone no implementado")}getType(){return"unknown"}getLabel(){return this.getType()}getMoveNotation(){return[]}getAnglePerMove(){return Math.PI/2}getMoveSuffixes(){return["","'","2"]}getScrambleSuffixes(){return this.getMoveSuffixes()}getScrambleLength(){return 20}looksSolved(){return this.isSolved()}getFaceColour(){return null}pickLayerPieces(){return[]}getRotationAxis(){return{axis:"y",sign:1}}getPieces(){return[]}applyMoves(e){for(let t of e)this.applyMove(t)}};var Gt=Object.freeze({U:"#f5f5f5",D:"#ffd500",F:"#009b48",B:"#0046ad",R:"#b71234",L:"#ff5800"}),og=Object.freeze({[Gt.U]:"U",[Gt.D]:"D",[Gt.F]:"F",[Gt.B]:"B",[Gt.R]:"R",[Gt.L]:"L"}),ag=Object.freeze({U:[[0,0,-1],[0,1,0],[1,0,0]],D:[[0,0,1],[0,1,0],[-1,0,0]],R:[[1,0,0],[0,0,1],[0,-1,0]],L:[[1,0,0],[0,0,-1],[0,1,0]],F:[[0,1,0],[-1,0,0],[0,0,1]],B:[[0,-1,0],[1,0,0],[0,0,1]]}),cg=Object.freeze({U:[[-1,0,0],[0,1,0],[0,0,-1]],D:[[-1,0,0],[0,1,0],[0,0,-1]],R:[[1,0,0],[0,-1,0],[0,0,-1]],L:[[1,0,0],[0,-1,0],[0,0,-1]],F:[[-1,0,0],[0,-1,0],[0,0,1]],B:[[-1,0,0],[0,-1,0],[0,0,1]]}),lg=Object.freeze({U:[[0,0,1],[0,1,0],[-1,0,0]],D:[[0,0,-1],[0,1,0],[1,0,0]],R:[[1,0,0],[0,0,-1],[0,1,0]],L:[[1,0,0],[0,0,1],[0,-1,0]],F:[[0,-1,0],[1,0,0],[0,0,1]],B:[[0,1,0],[-1,0,0],[0,0,1]]}),ug=Object.freeze([[1,0,0],[0,1,0],[0,0,1]]),hg=Object.freeze({M:"R",E:"U",S:"F"}),dg=Object.freeze({U:{axis:"y",sign:-1},D:{axis:"y",sign:1},R:{axis:"x",sign:-1},L:{axis:"x",sign:1},F:{axis:"z",sign:-1},B:{axis:"z",sign:1}}),It=class i extends _n{constructor(e=3){super(),this.setSize(e)}getFaceColour(e){let t=String(e).match(/^([MES])/)?.[1],n=t?hg[t]:this.parseMove(e)?.face??e;return Gt[n]??null}looksSolved(){let e=(this.n-1)/2;return[["py","y",e],["ny","y",-e],["px","x",e],["nx","x",-e],["pz","z",e],["nz","z",-e]].every(([n,s,r])=>{let a=new Set;for(let o of this.getPieces())Math.abs(o.position[s]-r)>1e-6||a.add(o.faces[n]);return a.size===1})}getType(){return"cube"}getLabel(){return`${this.n}\xD7${this.n}`}getMoveNotation(){let e=["U","D","R","L","F","B"],t=this.n%2===1&&this.n>=3?["M","E","S"]:[];return this.n<4?[...e,...t]:[...e,...e.map(n=>n.toLowerCase()),...e.map(n=>`(${n}${n.toLowerCase()})`),...t]}getAnglePerMove(){return Math.PI/2}getPieces(){return this.cubies}getRotationAxis(e){return dg[e]||{axis:"y",sign:1}}pickLayerPieces(e){let t=this.parseMove(e)||this.parseMove(e+""),n=t?this.getLayerInfo(t.face,t.layers):this.getLayerInfo(e);return this.cubies.filter(s=>this._cubieInLayer(s,n.axis,n.values))}setSize(e){if(!Number.isInteger(e)||e<2)throw new Error(`[CubeState] Dimensi\xF3n no soportada: ${e}`);this.n=e,this.cubies=[],this._buildSolved()}_buildSolved(){this.cubies=[];let e=this._axisValues();for(let t of e)for(let n of e)for(let s of e){let r=new vr(t,n,s);this._paintOuterFaces(r),this.cubies.push(r)}}_paintOuterFaces(e){let t=this._maxCoord(),n=this._minCoord(),{x:s,y:r,z:a}=e.position;s===t&&e.setFaceColor(Ae.PX,Gt.R),s===n&&e.setFaceColor(Ae.NX,Gt.L),r===t&&e.setFaceColor(Ae.PY,Gt.U),r===n&&e.setFaceColor(Ae.NY,Gt.D),a===t&&e.setFaceColor(Ae.PZ,Gt.F),a===n&&e.setFaceColor(Ae.NZ,Gt.B)}_maxCoord(){return(this.n-1)/2}_minCoord(){return-(this.n-1)/2}_axisValues(){let e=[],n=-((this.n-1)/2)*1;for(let s=0;s<this.n;s++)e.push(n+s*1);return e}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let n=this.getLayerInfo(t.face,t.layers),s=this._resolveMatrix(t.face,t.times);for(let r of this.cubies)this._cubieInLayer(r,n.axis,n.values)&&r.applyMatrix(s);return!0}applyInverse(e){let t=this.parseMove(e);if(!t)return!1;let n=t.times===2?2:t.times===1?3:1,s=this._resolveMatrix(t.face,n),r=this.getLayerInfo(t.face,t.layers);for(let a of this.cubies)this._cubieInLayer(a,r.axis,r.values)&&a.applyMatrix(s);return!0}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.trim().match(/^([MES])(2|'|)$/);if(t){if(this.n%2===0)return null;let c={M:"L",E:"D",S:"F"}[t[1]],l=1;return t[2]==="'"?l=3:t[2]==="2"&&(l=2),{face:c,times:l,layers:"middle"}}let n=e.trim().match(/^(?:\(([UDRLFB])([udrlfb])\)|([UDRLFB])|([udrlfb]))(2|'|)$/);if(!n)return null;let s,r;if(n[1]){if(n[1].toLowerCase()!==n[2])return null;s=n[1],r="both"}else n[3]?(s=n[3],r="outer"):(s=n[4].toUpperCase(),r="inner");if(r!=="outer"&&this.n<4)return null;let a=n[5],o=1;return a==="'"?o=3:a==="2"&&(o=2),{face:s,times:o,layers:r}}getLayerInfo(e,t="outer"){let n=this._maxCoord(),s=this._minCoord(),r={U:"y",D:"y",R:"x",L:"x",F:"z",B:"z"},a={U:!0,D:!1,R:!0,L:!1,F:!0,B:!1},o=r[e];if(!o)return{axis:"y",value:0,values:[0]};let c=a[e]?n:s,l=a[e]?n-1:s+1,u=t==="outer"?[c]:t==="inner"?[l]:t==="middle"?[0]:[c,l];return{axis:o,value:u[0],values:u}}_resolveMatrix(e,t){return t===1?ag[e]:t===2?cg[e]:t===3?lg[e]:ug}_cubieInLayer(e,t,n){return(Array.isArray(n)?n:[n]).some(r=>Math.abs(e.position[t]-r)<.01)}clone(){let e=new i(this.n);return e.cubies=this.cubies.map(t=>t.clone()),e}static fromMoves(e,t){let n=new i(e);return n.applyMoves(t),n}getFaceletString(){let e=this._axisValues(),t=this._maxCoord(),n=new Map;for(let a of this.cubies)n.set(this._key(a.position),a);let s=(a,o,c,l)=>{let u=n.get(this._key({x:a,y:o,z:c}));if(!u)return"?";let h=u.faces[l];return h&&og[h]||"?"},r="";for(let a of[...e].reverse())for(let o of e)r+=s(o,t,a,Ae.PY);for(let a of e)for(let o of e)r+=s(t,a,o,Ae.PX);for(let a of e)for(let o of e)r+=s(o,a,t,Ae.PZ);for(let a of e)for(let o of e)r+=s(o,-t,a,Ae.NY);for(let a of e)for(let o of[...e].reverse())r+=s(-t,a,o,Ae.NX);for(let a of e)for(let o of[...e].reverse())r+=s(o,a,-t,Ae.NZ);return r}isSolved(){return this.getFaceletString()===this._solvedFaceletString()}_solvedFaceletString(){let e=this.n*this.n;return"U".repeat(e)+"R".repeat(e)+"F".repeat(e)+"D".repeat(e)+"L".repeat(e)+"B".repeat(e)}_key(e){return`${e.x.toFixed(2)},${e.y.toFixed(2)},${e.z.toFixed(2)}`}};var zi=Math.SQRT2,Mr=Math.sqrt(6),yr=1/3,Ut=Object.freeze({U:{x:0,y:1,z:0},L:{x:-2*zi/3,y:-yr,z:0},R:{x:zi/3,y:-yr,z:Mr/3},B:{x:zi/3,y:-yr,z:-Mr/3}}),Jt=Object.freeze({U:{x:0,y:-yr,z:0},L:{x:2*zi/9,y:1/9,z:0},R:{x:-zi/9,y:1/9,z:-Mr/9},B:{x:-zi/9,y:1/9,z:Mr/9}}),fg=Object.freeze({U:{x:Jt.U.x*3,y:Jt.U.y*3,z:Jt.U.z*3},L:{x:Jt.L.x*3,y:Jt.L.y*3,z:Jt.L.z*3},R:{x:Jt.R.x*3,y:Jt.R.y*3,z:Jt.R.z*3},B:{x:Jt.B.x*3,y:Jt.B.y*3,z:Jt.B.z*3}}),zs=Object.freeze({U:{x:Ut.U.x,y:Ut.U.y,z:Ut.U.z},L:{x:Ut.L.x,y:Ut.L.y,z:Ut.L.z},R:{x:Ut.R.x,y:Ut.R.y,z:Ut.R.z},B:{x:Ut.B.x,y:Ut.B.y,z:Ut.B.z}}),br=Object.freeze({U:"#009b48",L:"#ffd500",R:"#0046ad",B:"#b71234"}),pg=1/9,mg=1e-6,gg=5/9,_g=Object.freeze({U:["L","R","B"],L:["U","R","B"],R:["U","L","B"],B:["U","L","R"]}),Ba=["U","L","R","B"];function Fa(i,e){let t=Ba.indexOf(i),n=Ba.indexOf(e);return(t<n?i+e:e+i)+"_edge"}function xg(i,e){let t=i.x,n=i.y,s=i.z,r=Math.cos(e),a=Math.sin(e),o=1-r;return[[o*t*t+r,o*t*n-a*s,o*t*s+a*n],[o*t*n+a*s,o*n*n+r,o*n*s-a*t],[o*t*s-a*n,o*n*s+a*t,o*s*s+r]]}function Iu(i,e){return{x:i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,y:i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,z:i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z}}function vg(i,e,t,n,s){return{x:i.x+(e.x-i.x)*n/3+(t.x-i.x)*s/3,y:i.y+(e.y-i.y)*n/3+(t.y-i.y)*s/3,z:i.z+(e.z-i.z)*n/3+(t.z-i.z)*s/3}}var Ni=class i extends _n{constructor(){super(),this._buildSolved()}getType(){return"pyraminx"}getLabel(){return"Pyraminx"}getMoveNotation(){return["U","L","R","B","u","l","r","b"]}getAnglePerMove(){return 2*Math.PI/3}getScrambleSuffixes(){return["","'"]}getRotationAxis(e){return zs[e]||zs.U}getPieces(){return this.pieces}getFaceColour(e){let t=this.parseMove(e)?.face??e;return zs[t]?Ba.filter(n=>n!==t).map(n=>br[n]):null}pickLayerPieces(e){let t=this.parseMove(e),n=t?.face??e,s=zs[n];if(!s)return[];let r=t?.layers==="tip"?gg:pg;return this.pieces.filter(a=>a.stickers.every(o=>o.vertices.every(c=>c.x*s.x+c.y*s.y+c.z*s.z>r-mg)))}_buildSolved(){this.pieces=[],this._byName=new Map;let e=new Map,t=(n,s)=>{let r=e.get(s);return r||(r={kind:n,name:s,stickers:[]},e.set(s,r)),r.stickers};for(let[n,[s,r,a]]of Object.entries(_g)){let o=Ut[s],c=Ut[r],l=Ut[a],u=(h,d)=>vg(o,c,l,h,d);t("tip",`${s}_tip`).push({face:n,vertices:[u(0,0),u(1,0),u(0,1)]}),t("tip",`${r}_tip`).push({face:n,vertices:[u(3,0),u(2,0),u(2,1)]}),t("tip",`${a}_tip`).push({face:n,vertices:[u(0,3),u(0,2),u(1,2)]}),t("center",`${s}_center`).push({face:n,vertices:[u(1,0),u(0,1),u(1,1)]}),t("center",`${r}_center`).push({face:n,vertices:[u(2,0),u(1,1),u(2,1)]}),t("center",`${a}_center`).push({face:n,vertices:[u(1,1),u(0,2),u(1,2)]}),t("edge",Fa(s,r)).push({face:n,vertices:[u(1,0),u(2,0),u(1,1)]}),t("edge",Fa(s,a)).push({face:n,vertices:[u(0,1),u(1,1),u(0,2)]}),t("edge",Fa(r,a)).push({face:n,vertices:[u(2,1),u(1,2),u(1,1)]})}for(let{kind:n,name:s,stickers:r}of e.values())this._addPiece(n,s,r)}_addPiece(e,t,n){let s=0,r=0,a=0,o=0;for(let l of n)for(let u of l.vertices)r+=u.x,a+=u.y,o+=u.z,s++;let c={kind:e,name:t,position:{x:r/s,y:a/s,z:o/s},stickers:n.map(l=>({color:br[l.face],face:l.face,vertices:l.vertices}))};this.pieces.push(c),this._byName.set(t,c)}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.match(/^([ULRBulrb])(2|'|)$/);if(!t)return null;let n=t[1],s=n.toUpperCase(),r=n===s?"big":"tip",a=t[2],o=1;return a==="'"?o=-1:a==="2"&&(o=2),{face:s,times:o,layers:r}}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let{face:n,times:s}=t,r=zs[n],a=this.pickLayerPieces(e),o=s*2*Math.PI/3,c=xg(r,o);for(let l of a){l.position=Iu(c,l.position);for(let u of l.stickers)u.vertices=u.vertices.map(h=>Iu(c,h))}return!0}applyInverse(e){let t=this.parseMove(e);if(!t)return!1;let n=t.times===1?-1:1,s=t.layers==="tip"?t.face.toLowerCase():t.face;return this.applyMove(s+(n===-1?"'":""))}getFaceletString(){return"UUUUUUULLLLLLLRRRRRRRBBBBBBB"}_faceOf(e){let t=e.vertices,n=(t[0].x+t[1].x+t[2].x)/3,s=(t[0].y+t[1].y+t[2].y)/3,r=(t[0].z+t[1].z+t[2].z)/3,a="U",o=-1/0;for(let[c,l]of Object.entries(fg)){let u=n*l.x+s*l.y+r*l.z;u>o&&(o=u,a=c)}return a}isSolved(){let e={U:null,L:null,R:null,B:null};for(let t of this.pieces)for(let n of t.stickers){let s=this._faceOf(n);if(e[s]===null)e[s]=n.color;else if(e[s]!==n.color)return!1}return!0}clone(){let e=new i;e.pieces=this.pieces.map(t=>({kind:t.kind,name:t.name,position:{...t.position},stickers:t.stickers.map(n=>({color:n.color,face:n.face,vertices:n.vertices.map(s=>({...s}))}))})),e._byName=new Map;for(let t of e.pieces)e._byName.set(t.name,t);return e}};var di=(1+Math.sqrt(5))/2,Wt=(i,e,t)=>({x:i,y:e,z:t}),yg=(i,e)=>Wt(i.x+e.x,i.y+e.y,i.z+e.z),wn=(i,e)=>Wt(i.x-e.x,i.y-e.y,i.z-e.z),Sr=(i,e)=>Wt(i.x*e,i.y*e,i.z*e),Xt=(i,e)=>i.x*e.x+i.y*e.y+i.z*e.z,Va=(i,e)=>Wt(i.y*e.z-i.z*e.y,i.z*e.x-i.x*e.z,i.x*e.y-i.y*e.x),Er=i=>Math.hypot(i.x,i.y,i.z),Ga=i=>{let e=Er(i)||1;return Wt(i.x/e,i.y/e,i.z/e)},Ns=(i,e,t)=>yg(i,Sr(wn(e,i),t));function Ha(i,e){let{x:t,y:n,z:s}=i,r=Math.cos(e),a=Math.sin(e),o=1-r;return[[o*t*t+r,o*t*n-a*s,o*t*s+a*n],[o*t*n+a*s,o*n*n+r,o*n*s-a*t],[o*t*s-a*n,o*n*s+a*t,o*s*s+r]]}var Oi=(i,e)=>Wt(i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z);function Mg(){let i=[];for(let n of[1,-1])for(let s of[1,-1])for(let r of[1,-1])i.push(Wt(n,s,r));for(let n of[1,-1])for(let s of[1,-1])i.push(Wt(0,n/di,s*di));for(let n of[1,-1])for(let s of[1,-1])i.push(Wt(n/di,s*di,0));for(let n of[1,-1])for(let s of[1,-1])i.push(Wt(n*di,0,s/di));let e=i.map(n=>Sr(n,1/Er(n))),t=[];for(let n=0;n<e.length;n++)for(let s=n+1;s<e.length;s++)for(let r=s+1;r<e.length;r++){let a=Va(wn(e[s],e[n]),wn(e[r],e[n]));if(!(Er(a)<1e-9))for(let o of[1,-1]){let c=Ga(Sr(a,o)),l=Xt(c,e[n]);l<=0||e.every(u=>Xt(c,u)<=l+1e-9)&&(t.some(u=>Xt(u.normal,c)>1-1e-9)||t.push({normal:c,d:l,verts:e.filter(u=>Math.abs(Xt(c,u)-l)<1e-9)}))}}return{verts:e,faces:t}}function bg(i,e,t){let n=Ga(wn(i[0],t)),s=Va(e,n);return[...i].sort((r,a)=>{let o=Math.atan2(Xt(wn(r,t),s),Xt(wn(r,t),n)),c=Math.atan2(Xt(wn(a,t),s),Xt(wn(a,t),n));return o-c})}var ka=Mg(),Sg=(()=>{let i=ka.faces.reduce((l,u)=>u.normal.y>l.normal.y?u:l,ka.faces[0]),e=Wt(0,1,0),t;if(Xt(i.normal,e)>1-1e-12)t=[[1,0,0],[0,1,0],[0,0,1]];else{let l=Ga(Va(i.normal,e)),u=Math.acos(Math.max(-1,Math.min(1,Xt(i.normal,e))));t=Ha(l,u)}let n=l=>({...l,normal:Oi(t,l.normal),verts:l.verts.map(u=>Oi(t,u))}),s=ka.faces.map(n),r=s.reduce((l,u)=>u.normal.y>l.normal.y?u:l,s[0]),a=s.filter(l=>Math.abs(Xt(l.normal,r.normal)-1/Math.sqrt(5))<1e-6),o=a.reduce((l,u)=>u.normal.z>l.normal.z?u:l,a[0]),c=Ha(Wt(0,1,0),-Math.atan2(o.normal.x,o.normal.z));return s.map(l=>({normal:Oi(c,l.normal),d:l.d,verts:l.verts.map(u=>Oi(c,u))}))})(),Ke=Object.freeze(["U","F","R","BR","BL","L","D","DF","DR","DBR","DBL","DL"]),qw=Object.freeze({B:"DR"}),Os=(()=>{let i=o=>{let c=Math.atan2(o.normal.x,o.normal.z);return c<-1e-9?c+2*Math.PI:c},e=[...Sg].sort((o,c)=>c.normal.y-o.normal.y),t=e[0],n=e[e.length-1],s=e.slice(1,6).sort((o,c)=>i(o)-i(c)),r=e.slice(6,11).sort((o,c)=>i(o)-i(c)),a={};a.U=t,a.D=n,["F","R","BR","BL","L"].forEach((o,c)=>{a[o]=s[c]}),["DF","DR","DBR","DBL","DL"].forEach((o,c)=>{a[o]=r[c]});for(let o of Ke){let c=a[o];c.center=Sr(c.normal,c.d),c.ring=bg(c.verts,c.normal,c.center)}return Object.freeze(a)})(),xt=Object.freeze(Object.fromEntries(Ke.map(i=>[i,Os[i].normal]))),Eg=Os.U.d,zu=1-Math.sqrt(5)/(3*di),wg=(()=>{let i=1/Math.sqrt(5),e=Math.sqrt(1-i*i),t=Os.U,n=Er(wn(Ns(t.ring[0],t.ring[1],.5),t.center));return zu*n*e+Eg*i})(),Ag=1e-6,Uu=Object.freeze({U:"#ffffff",F:"#009b48",R:"#b71234",BR:"#0046ad",BL:"#ffd500",L:"#ff5800",D:"#8a8a8a",DF:"#7ad3ff",DR:"#ff9ec7",DBR:"#6b3fa0",DBL:"#c9f24a",DL:"#f2e3c0"}),Tg=new RegExp(`^(${[...Ke].sort((i,e)=>e.length-i.length).join("|")})(\\+\\+|--|2'|2|')?$`),Du=2*Math.PI/5,fi=class i extends _n{constructor(){super(),this._buildSolved()}getType(){return"megaminx"}getFaceColour(e){return Uu[e]??null}getLabel(){return"Megaminx"}getMoveNotation(){return[...Ke]}getAnglePerMove(){return Du}getMoveSuffixes(){return["","'","2","2'"]}getScrambleLength(){return 40}getRotationAxis(e){return xt[e]||xt.U}getPieces(){return this.pieces}pickLayerPieces(e){let t=this.parseMove(e)?.face??e,n=xt[t];return n?this.pieces.filter(s=>s.stickers.every(r=>r.vertices.every(a=>Xt(a,n)>wg-Ag))):[]}_buildSolved(){this.pieces=[],this._byName=new Map;let e=new Map,t=(r,a)=>{let o=e.get(a);return o||(o={kind:r,name:a,stickers:[]},e.set(a,o)),o.stickers},n=r=>`${r.x.toFixed(6)}|${r.y.toFixed(6)}|${r.z.toFixed(6)}`,s=new Map;for(let r of Ke)for(let a of Os[r].ring)s.has(n(a))||s.set(n(a),`corner${s.size}`);for(let r of Ke){let{center:a,ring:o}=Os[r],c=o.map(l=>Ns(a,l,zu));t("center",`${r}_center`).push({face:r,vertices:c});for(let l=0;l<5;l++){let u=(l+1)%5,h=(l+4)%5,d=Ns(o[l],o[u],1/3),f=Ns(o[l],o[u],2/3),g=s.get(n(o[l]));t("corner",g).push({face:r,vertices:[c[l],Ns(o[h],o[l],2/3),o[l],d]});let _=Rg(o[l],o[u],s,n);t("edge",_).push({face:r,vertices:[c[l],d,f,c[u]]})}}for(let{kind:r,name:a,stickers:o}of e.values())this._addPiece(r,a,o)}_addPiece(e,t,n){let s=0,r=0,a=0,o=0;for(let l of n)for(let u of l.vertices)r+=u.x,a+=u.y,o+=u.z,s++;let c={kind:e,name:t,position:Wt(r/s,a/s,o/s),stickers:n.map(l=>({color:Uu[l.face],face:l.face,vertices:l.vertices}))};this.pieces.push(c),this._byName.set(t,c)}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.trim().match(Tg);if(!t)return null;let n=t[1];switch(t[2]){case void 0:case"":return{face:n,times:1};case"'":return{face:n,times:-1};case"2":case"++":return{face:n,times:2};case"2'":case"--":return{face:n,times:-2};default:return null}}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let{face:n,times:s}=t,r=this.pickLayerPieces(n),a=Ha(xt[n],s*Du);for(let o of r){o.position=Oi(a,o.position);for(let c of o.stickers)c.vertices=c.vertices.map(l=>Oi(a,l))}return!0}applyInverse(e){let t=this.parseMove(e);if(!t)return!1;let n={1:"'","-1":"",2:"2'","-2":"2"}[String(t.times)];return this.applyMove(t.face+n)}getFaceletString(){return Ke.map(e=>e.repeat(11)).join("")}isSolved(){let e={};for(let t of this.pieces)for(let n of t.stickers){let s=this._faceOf(n);if(!s)return!1;if(e[s]===void 0)e[s]=n.color;else if(e[s]!==n.color)return!1}return!0}_faceOf(e){let t=null,n=-1/0;for(let s of Ke){let r=xt[s],a=0;for(let o of e.vertices)a+=Xt(o,r);a/=e.vertices.length,a>n&&(n=a,t=s)}return t}clone(){let e=new i;e.pieces=this.pieces.map(t=>({kind:t.kind,name:t.name,position:{...t.position},stickers:t.stickers.map(n=>({color:n.color,face:n.face,vertices:n.vertices.map(s=>({...s}))}))})),e._byName=new Map;for(let t of e.pieces)e._byName.set(t.name,t);return e}};function Rg(i,e,t,n){let s=t.get(n(i)),r=t.get(n(e));return[s,r].sort().join("-")}var $e=(i,e,t)=>({x:i,y:e,z:t});function Cg(i,e){let{x:t,y:n,z:s}=i,r=Math.cos(e),a=Math.sin(e),o=1-r;return[[o*t*t+r,o*t*n-a*s,o*t*s+a*n],[o*t*n+a*s,o*n*n+r,o*n*s-a*t],[o*t*s-a*n,o*n*s+a*t,o*s*s+r]]}var Nu=(i,e)=>$e(i[0][0]*e.x+i[0][1]*e.y+i[0][2]*e.z,i[1][0]*e.x+i[1][1]*e.y+i[1][2]*e.z,i[2][0]*e.x+i[2][1]*e.y+i[2][2]*e.z),he=.5,wr=Object.freeze({U:"#ffffff",D:"#ffd500",F:"#009b48",B:"#0046ad",R:"#b71234",L:"#ff5800"}),Fi=Object.freeze({U:$e(0,1,0),D:$e(0,-1,0),F:$e(0,0,1),B:$e(0,0,-1),R:$e(1,0,0),L:$e(-1,0,0)}),Ou=Object.freeze(["F","B","R","L"]),Wa=Object.freeze({M:Fi.R,S:Fi.F});function Pg(i,e){let{x:t,y:n,z:s}=i;switch(e){case"U":return[$e(t-he,n+he,s-he),$e(t+he,n+he,s-he),$e(t+he,n+he,s+he),$e(t-he,n+he,s+he)];case"D":return[$e(t-he,n-he,s-he),$e(t-he,n-he,s+he),$e(t+he,n-he,s+he),$e(t+he,n-he,s-he)];case"F":return[$e(t-he,n-he,s+he),$e(t+he,n-he,s+he),$e(t+he,n+he,s+he),$e(t-he,n+he,s+he)];case"B":return[$e(t+he,n-he,s-he),$e(t-he,n-he,s-he),$e(t-he,n+he,s-he),$e(t+he,n+he,s-he)];case"R":return[$e(t+he,n-he,s+he),$e(t+he,n-he,s-he),$e(t+he,n+he,s-he),$e(t+he,n+he,s+he)];case"L":return[$e(t-he,n-he,s-he),$e(t-he,n-he,s+he),$e(t-he,n+he,s+he),$e(t-he,n+he,s-he)];default:return[]}}var Ar=class i extends _n{constructor(e=3,t=e,n="2"){super(),this.width=e,this.depth=t,this.suffix=n,this._buildSolved()}getType(){return`cuboid${this.width}${this.depth}1`}getLabel(){return`${this.width}\xD7${this.depth}\xD71`}getMoveNotation(){return[...Ou,...this._rebanadas()]}_rebanadas(){let e=[];return this.width%2===1&&this.width>=3&&e.push("M"),this.depth%2===1&&this.depth>=3&&e.push("S"),e}getFaceColour(e){let t=this.parseMove(e)?.face??e;return t==="M"?wr.R:t==="S"?wr.F:wr[t]??null}getAnglePerMove(){return Math.PI}getMoveSuffixes(){return[this.suffix]}getScrambleLength(){return Math.max(6,this.width*this.depth)}getRotationAxis(e){return Wa[e]||Fi[e]||Fi.F}getPieces(){return this.pieces}getBoundingRadius(){return Math.hypot(this.width/2,he,this.depth/2)}_extentAlong(e){return e.x!==0?(this.width-1)/2:e.z!==0?(this.depth-1)/2:0}pickLayerPieces(e){let t=this.parseMove(e)?.face??e,n=Wa[t];if(n)return this._rebanadas().includes(t)?this.pieces.filter(a=>Math.abs(a.position.x*n.x+a.position.z*n.z)<.5):[];let s=Fi[t];if(!s||!Ou.includes(t))return[];let r=this._extentAlong(s);return this.pieces.filter(a=>a.position.x*s.x+a.position.y*s.y+a.position.z*s.z>r-.5)}_buildSolved(){this.pieces=[],this._byName=new Map;let e=(this.width-1)/2,t=(this.depth-1)/2;for(let n=0;n<this.width;n++)for(let s=0;s<this.depth;s++){let r=$e(n-e,0,s-t),a=[];n===0&&a.push("L"),n===this.width-1&&a.push("R"),s===0&&a.push("B"),s===this.depth-1&&a.push("F");let o=a.length===2?"corner":a.length===1?"edge":"center",c=["U","D",...a];this._addPiece(o,`${n}${s}`,r,c.map(l=>({face:l,vertices:Pg(r,l)})))}}_addPiece(e,t,n,s){let r={kind:e,name:t,position:{...n},stickers:s.map(a=>({color:wr[a.face],face:a.face,vertices:a.vertices}))};this.pieces.push(r),this._byName.set(t,r)}reset(){this._buildSolved()}parseMove(e){if(typeof e!="string")return null;let t=e.trim().match(/^([FBRLMS])(2|')?$/);return!t||Wa[t[1]]&&!this._rebanadas().includes(t[1])?null:{face:t[1],times:t[2]==="'"?-1:1}}applyMove(e){let t=this.parseMove(e);if(!t)return!1;let n=this.getRotationAxis(t.face),s=this.pickLayerPieces(t.face),r=Cg(n,Math.PI);for(let a of s){a.position=Nu(r,a.position);for(let o of a.stickers)o.vertices=o.vertices.map(c=>Nu(r,c))}return!0}applyInverse(e){return this.applyMove(e)}getFaceletString(){let e=t=>{let n=Math.round(t*1e3)/1e3;return(n===0?0:n).toFixed(3)};return this.pieces.flatMap(t=>t.stickers.map(n=>({key:this._centroid(n).map(e).join(","),color:n.face}))).sort((t,n)=>t.key<n.key?-1:t.key>n.key?1:0).map(t=>t.color).join("")}isSolved(){let e={};for(let t of this.pieces)for(let n of t.stickers){let s=this._faceOf(n);if(e[s]===void 0)e[s]=n.color;else if(e[s]!==n.color)return!1}return!0}_centroid(e){let t=0,n=0,s=0;for(let a of e.vertices)t+=a.x,n+=a.y,s+=a.z;let r=e.vertices.length;return[t/r,n/r,s/r]}_faceOf(e){let[t,n,s]=e.vertices,r=n.x-t.x,a=n.y-t.y,o=n.z-t.z,c=s.x-t.x,l=s.y-t.y,u=s.z-t.z,h=a*u-o*l,d=o*c-r*u,f=r*l-a*c,[g,_,m]=this._centroid(e);h*g+d*_+f*m<0&&(h=-h,d=-d,f=-f);let p="U",S=-1/0;for(let[v,R]of Object.entries(Fi)){let I=h*R.x+d*R.y+f*R.z;I>S&&(S=I,p=v)}return p}clone(){let e=new i(this.width,this.depth,this.suffix);e.pieces=this.pieces.map(t=>({kind:t.kind,name:t.name,position:{...t.position},stickers:t.stickers.map(n=>({color:n.color,face:n.face,vertices:n.vertices.map(s=>({...s}))}))})),e._byName=new Map;for(let t of e.pieces)e._byName.set(t.name,t);return e}},Fu=()=>new Ar(2,2,""),Bu=()=>new Ar(3,3,"2");var ku=.001,Hu=i=>[i.x,i.y,i.z].map(e=>(Math.round(e/ku)*ku).toFixed(3)).join(",");function Vu(i,e,t){let n=Math.cos(t),s=Math.sin(t),r=e.x*i.x+e.y*i.y+e.z*i.z;return{x:i.x*n+(e.y*i.z-e.z*i.y)*s+e.x*r*(1-n),y:i.y*n+(e.z*i.x-e.x*i.z)*s+e.y*r*(1-n),z:i.z*n+(e.x*i.y-e.y*i.x)*s+e.z*r*(1-n)}}function Xa(i,e){let t=i.parseMove?.(e)?.face??e,n=i.getRotationAxis?.(t);if(!n)return null;if(typeof n.axis=="string")return{x:+(n.axis==="x"),y:+(n.axis==="y"),z:+(n.axis==="z"),sign:n.sign};let s=Math.hypot(n.x,n.y,n.z)||1;return{x:n.x/s,y:n.y/s,z:n.z/s,sign:1}}function Wu(i,e,t){let n=Xa(i,e),s=i.getPieces?.()??[];if(!n||!s.length||!t)return null;let r=2*Math.PI/t,a=i.getMoveNotation(),o=new Map;for(let l of a){let u=i.pickLayerPieces(l);!u.length||u.length===s.length||o.set(l,new Set(u.map(h=>Hu(h.position))))}let c={};for(let[l,u]of o){let h=new Set([...i.pickLayerPieces(l)].map(S=>Hu(Vu(S.position,n,r)))),d=null;for(let[S,v]of o)if(v.size===h.size&&[...h].every(R=>v.has(R))){d=S;break}if(!d)continue;let f=Xa(i,l),g=Xa(i,d),_=Vu({x:f.x*f.sign,y:f.y*f.sign,z:f.z*f.sign},n,r),m={x:g.x*g.sign,y:g.y*g.sign,z:g.z*g.sign},p=_.x*m.x+_.y*m.y+_.z*m.z;c[l]=[d,p<0]}return c}var Lg={U:["U",!1],D:["D",!1],E:["E",!1],F:["R",!1],R:["B",!1],B:["L",!1],L:["F",!1],M:["S",!1],S:["M",!0]};function qa(i){return i.startsWith("2")?"2":i==="'"?"":"'"}function Gu(i,e){let t=i,n=!1;for(let s=0;s<e;s++){let r=Lg[t];if(!r)return null;t=r[0],n=n!==r[1]}return[t,n]}function Ig(i,e,t=null){if(!e)return i;if(t){let u=i.match(/^(.*?)(2'|'|2)?$/),h=u[1],d=u[2]??"",f=!1;for(let g=0;g<e;g++){let _=t[h];if(!_)return i;h=_[0],f=f!==_[1]}return h+(f?qa(d):d)}let n=i.match(/^\(([A-Za-z])([A-Za-z])\)(.*)$/);if(n){let u=Gu(n[1].toUpperCase(),e);if(!u)return i;let[h,d]=u,f=d?qa(n[3]):n[3];return`(${h}${h.toLowerCase()})${f}`}let s=i.match(/^([A-Za-z])(.*)$/);if(!s)return i;let r=s[1]===s[1].toLowerCase(),a=Gu(s[1].toUpperCase(),e);if(!a)return i;let[o,c]=a,l=c?qa(s[2]):s[2];return(r?o.toLowerCase():o)+l}function Bi(i,e,t=null){return e?i.trim().split(/\s+/).map(n=>Ig(n,e,t)).join(" "):i}var bt={PX:"px",NX:"nx",PY:"py",NY:"ny",PZ:"pz",NZ:"nz"},ct=[{face:"F",dir:{x:0,y:0,z:1},key:bt.PZ},{face:"R",dir:{x:1,y:0,z:0},key:bt.PX},{face:"B",dir:{x:0,y:0,z:-1},key:bt.NZ},{face:"L",dir:{x:-1,y:0,z:0},key:bt.NX}],qt=(i,e,t,n)=>i.getPieces().find(s=>s.position.x===e&&s.position.y===t&&s.position.z===n),Ug=i=>({U:qt(i,0,1,0).faces[bt.PY],D:qt(i,0,-1,0).faces[bt.NY],F:qt(i,0,0,1).faces[bt.PZ],B:qt(i,0,0,-1).faces[bt.NZ],R:qt(i,1,0,0).faces[bt.PX],L:qt(i,-1,0,0).faces[bt.NX]}),Zu=i=>Object.values(i.faces).filter(Boolean),$u=(i,e)=>i.length===e.length&&i.every(t=>e.includes(t)),Tr=(i,e)=>i.getPieces().find(t=>$u(Zu(t),e));function Kt(i,e,t){if(e)for(let n of e.trim().split(/\s+/))n&&(i.applyMove(n),t.push(n))}var Dg=["M","M'","M2","E","E'","E2","S","S'","S2"],zg=[[0,1,0],[0,-1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1]];function Xu(i,e){return zg.every(([t,n,s])=>{let r=qt(i,t,n,s),a=qt(e,t,n,s);return r&&a&&Object.keys(a.faces).every(o=>r.faces[o]===a.faces[o])})}function Ng(i,e){let t=i.clone();if(t.reset(),Xu(i,t))return!0;let n=Ku(i,Dg,s=>Xu(s,t),3);if(!n)return!1;for(let s of n)Kt(i,s,e);return!0}var Og=["U","D","R","L","F","B"],Fg=["","'","2"],Bg={U:"D",D:"U",R:"L",L:"R",F:"B",B:"F"};function kg(i,e,t){let n=qt(i,t.dir.x,-1,t.dir.z);return!!n&&n.faces[bt.NY]===e.D&&n.faces[t.key]===e[t.face]}function Hg(i,e,t){let n=[],s=(r,a)=>{if(e(i))return!0;if(r===0)return!1;for(let o of Og)if(!(o===a||Bg[o]===a))for(let c of Fg){let l=o+c;if(i.applyMove(l),n.push(l),s(r-1,o))return!0;n.pop(),i.applyInverse(l)}return!1};for(let r=0;r<=t;r++){if(s(r,null)){let a=n.slice();for(let o=a.length-1;o>=0;o--)i.applyInverse(a[o]);return a}n.length=0}return null}function Vg(i,e,t){let n=[];for(let s of ct){n.push(s);let a=Hg(i,o=>n.every(c=>kg(o,e,c)),7);if(!a)return!1;Kt(i,a.join(" "),t)}return!0}var Gg="R U R'",Wg="R U R' U'";function Ja(i){let e=ct[i].dir,t=ct[(i+1)%4].dir;return{x:e.x+t.x,y:-1,z:e.z+t.z}}function Ya(i,e,t){let n=Ja(t),s=qt(i,n.x,n.y,n.z);if(!s)return!1;let r=ct[t],a=ct[(t+1)%4];return s.faces[bt.NY]===e.D&&s.faces[r.key]===e[r.face]&&s.faces[a.key]===e[a.face]}function Xg(i,e,t,n){for(let s=0;s<4;s++){let r=ct[s],a=ct[(s+1)%4],o=[e.D,e[r.face],e[a.face]],c=Ja(s),l=Bi(Wg,s,t),u=Tr(i,o);if(u&&u.position.y===-1&&!Ya(i,e,s)){let d=ct.findIndex((f,g)=>{let _=Ja(g);return _.x===u.position.x&&_.z===u.position.z});Kt(i,Bi(Gg,d,t),n)}let h=Ya(i,e,s);for(let d=0;d<4&&!h;d++){let f=Tr(i,o);if(f.position.y===1&&f.position.x===c.x&&f.position.z===c.z)for(let _=0;_<6&&!h;_++)Kt(i,l,n),h=Ya(i,e,s);h||Kt(i,"U",n)}if(!h)return!1}return!0}var qu="U R U' R' U' F' U F",qg="U' L' U L U F U' F'";function Ju(i){let e=ct[i].dir,t=ct[(i+1)%4].dir;return{x:e.x+t.x,y:0,z:e.z+t.z}}function Yu(i,e,t){let n=Ju(t),s=qt(i,n.x,n.y,n.z);if(!s)return!1;let r=ct[t],a=ct[(t+1)%4];return s.faces[r.key]===e[r.face]&&s.faces[a.key]===e[a.face]}function Yg(i){return i.position.y!==0?-1:ct.findIndex((e,t)=>{let n=Ju(t);return n.x===i.position.x&&n.z===i.position.z})}function jg(i,e,t,n){for(let s=0;s<4;s++){if(Yu(i,e,s))continue;let r=ct[s],a=ct[(s+1)%4],o=[e[r.face],e[a.face]],c=Yg(Tr(i,o));c>=0&&Kt(i,Bi(qu,c,t),n);let l=!1;for(let u=0;u<4&&!l;u++){let h=Tr(i,o),d=h.faces[bt.PY],f=[{side:r,front:e[r.face],up:e[a.face],alg:qu,times:s},{side:a,front:e[a.face],up:e[r.face],alg:qg,times:(s+1)%4}];for(let g of f)if(h.position.y===1&&h.position.x===g.side.dir.x&&h.position.z===g.side.dir.z&&h.faces[g.side.key]===g.front&&d===g.up){Kt(i,Bi(g.alg,g.times,t),n),l=Yu(i,e,s);break}l||Kt(i,"U",n)}if(!l)return!1}return!0}var Zg="F R U R' U' F'",$g="F U R U' R' F'",ja="U R U' L' U R' U' L",Jg="R' D' R D",Kg="R U' R U R U R U' R' U' R2",Qg="R U R' U' R' F R2 U' R' U' R U R' F'",Za=["","U","U2","U'"];function Ku(i,e,t,n=3){let s=(r,a)=>{if(t(r))return[];if(!a)return null;for(let o of e){let c=r.clone();Kt(c,o,[]);let l=s(c,a-1);if(l)return[o,...l]}return null};for(let r=0;r<=n;r++){let a=s(i,r);if(a)return a}return null}function $a(i,e,t,n,s=3){let r=Ku(i,e,t,s);if(!r)return!1;for(let a of r)Kt(i,a,n);return!0}var Qu=(i,e)=>qt(i,e.dir.x,1,e.dir.z),Ka=(i,e)=>{let t=ct[e].dir,n=ct[(e+1)%4].dir;return qt(i,t.x+n.x,1,t.z+n.z)},e0=(i,e)=>ct.filter(t=>Qu(i,t)?.faces[bt.PY]===e.U).length;function ju(i,e){let t=0;for(let n=0;n<4;n++){let s=Ka(i,n);if(!s)continue;let r=ct[n],a=ct[(n+1)%4];$u(Zu(s),[e.U,e[r.face],e[a.face]])&&t++}return t}var t0=(i,e)=>[0,1,2,3].filter(t=>Ka(i,t)?.faces[bt.PY]===e.U).length;function n0(i,e){let t=0;for(let n of ct){let s=Qu(i,n);s&&s.faces[bt.PY]===e.U&&s.faces[n.key]===e[n.face]&&t++}return t}function i0(i,e,t,n){let s=Za.flatMap(o=>[`${o} ${Zg}`,`${o} ${$g}`]);if(!$a(i,s,o=>e0(o,e)===4,n))return"cruz superior";let r=Za.flatMap(o=>[`${o} ${ja}`,`${o} ${ja} ${ja}`,`${o} ${Qg}`]).concat(Za.slice(1));if(!$a(i,r,o=>ju(o,e)===4,n))return"colocar esquinas";if(t0(i,e)<4)for(let o=0;o<4;o++){let c=0;for(;Ka(i,0)?.faces[bt.PY]!==e.U;)if(Kt(i,Jg,n),++c>5)return"orientar esquinas";if(c%2)return"orientar esquinas \xB7 giros impares";Kt(i,"U",n)}if(ju(i,e)<4)return"orientar esquinas \xB7 capa descolocada";let a=[];for(let o=0;o<4;o++){let c=Bi(Kg,o,t);a.push(c,`${c} ${c}`)}return $a(i,a,o=>n0(o,e)===4,n)?null:"permutar aristas"}function ki(i,{aviso:e=null}={}){if(i.n!==3)return null;let t=i.clone(),n=[],s=[],r=(c,l)=>{e?.(c);let u=n.length,h=l();return s.push({nombre:c,desde:u,hasta:n.length}),h};if(r("etapa.centros",()=>!Ng(t,n)))return null;let a=Ug(t),o=Wu(t,"U",4);return r("etapa.cruzAbajo",()=>!Vg(t,a,n))||r("etapa.esquinasAbajo",()=>!Xg(t,a,o,n))||r("etapa.capaMedia",()=>!jg(t,a,o,n))||r("etapa.ultimaCapa",()=>i0(t,a,o,n))?null:{moves:n,solved:t.isSolved(),state:t,etapas:s}}var Fs=(i,e)=>i.x*e.x+i.y*e.y+i.z*e.z,s0=(i,e)=>({x:i.x-e.x,y:i.y-e.y,z:i.z-e.z}),r0=(i,e)=>({x:i.y*e.z-i.z*e.y,y:i.z*e.x-i.x*e.z,z:i.x*e.y-i.y*e.x}),o0=(i,e)=>({x:i.x*e,y:i.y*e,z:i.z*e}),a0=i=>{let e=Math.hypot(i.x,i.y,i.z)||1;return{x:i.x/e,y:i.y/e,z:i.z/e}},c0=1/Math.sqrt(5);var on=(i,e)=>i!==e&&Math.abs(Fs(xt[i],xt[e])-c0)<1e-6,pi=i=>Ke.filter(e=>on(i,e)),Qa=i=>Ke.find(e=>Fs(xt[i],xt[e])<-1+1e-6);function l0(i){let e=null,t=-1/0;for(let n of Ke){let s=Fs(xt[n],i);s>t&&(t=s,e=n)}return e}function eh(i,e){let t=a0(s0(e,o0(i,Fs(e,i))));return[t,r0(i,t),i]}function u0(i,e,t){let n=i.map(s=>Fs(s,t));return{x:n[0]*e[0].x+n[1]*e[1].x+n[2]*e[2].x,y:n[0]*e[0].y+n[1]*e[1].y+n[2]*e[2].y,z:n[0]*e[0].z+n[1]*e[1].z+n[2]*e[2].z}}function th(i,e){if(!xt[i]||!xt[e]||!on(i,e))return null;let t=eh(xt.U,xt.F),n=eh(xt[i],xt[e]),s={};for(let r of Ke)s[r]=l0(u0(t,n,xt[r]));return s}var nh=new Map(Ke.map((i,e)=>[i,e])),Rr=(i,e)=>nh.get(i)-nh.get(e),Cr=i=>[...i].sort(Rr).join("-"),An=(()=>{let i=[];for(let e=0;e<Ke.length;e++)for(let t=e+1;t<Ke.length;t++)on(Ke[e],Ke[t])&&i.push([Ke[e],Ke[t]]);return i})(),Tn=(()=>{let i=[];for(let e=0;e<Ke.length;e++)for(let t=e+1;t<Ke.length;t++)for(let n=t+1;n<Ke.length;n++){let[s,r,a]=[Ke[e],Ke[t],Ke[n]];on(s,r)&&on(r,a)&&on(s,a)&&i.push([s,r,a])}return i})(),h0=new Map(An.map((i,e)=>[Cr(i),e])),d0=new Map(Tn.map((i,e)=>[Cr(i),e])),ec=i=>h0.get(Cr(i)),Bs=i=>d0.get(Cr(i)),f0=(()=>{let i={};for(let e of Ke){let t=pi(e),n=new fi,s=new Map;for(let o of n.getPieces())o.kind==="edge"&&s.set(o.name,o.stickers.map(c=>c.face));n.applyMove(e);let r=new Map;for(let o of n.getPieces()){if(o.kind!=="edge")continue;let c=s.get(o.name);if(!c.includes(e))continue;let l=o.stickers.map(u=>n._faceOf(u));r.set(c.find(u=>u!==e),l.find(u=>u!==e))}let a=[t[0]];for(let o=1;o<5;o++)a.push(r.get(a[o-1]));i[e]=a}return Object.freeze(i)})();function ih(i,e,t){if(e===i)return i;let n=f0[i],s=n.indexOf(e);return s<0?e:n[((s+t)%5+5)%5]}var Pr=["","'","2","2'"],p0={"":1,"'":-1,2:2,"2'":-2},Lr=Ke.flatMap(i=>Pr.map(e=>i+e));function tc(i){let e=i.match(/^[A-Z]+/)[0];return e+{"":"'","'":"",2:"2'","2'":"2"}[i.slice(e.length)]}function m0(i,e){let t=[],n=[];for(let[s,r,a]of[[An,ec,t],[Tn,Bs,n]])for(let o=0;o<s.length;o++){let c=s[o];if(!c.includes(i))continue;let l=c.map(d=>ih(i,d,e)),u=r(l),h=[...l].sort(Rr);a.push({from:o,to:u,orient:c.map(d=>h.indexOf(ih(i,d,e)))})}return{edges:t,corners:n}}var sh=(i,e)=>({from:Int8Array.from(i.map(t=>t.from)),to:Int8Array.from(i.map(t=>t.to)),orient:Int8Array.from(i.flatMap(t=>t.orient)),ancho:e,n:i.length}),g0=(()=>{let i=new Map;for(let e of Ke)for(let t of Pr){let n=m0(e,p0[t]);i.set(e+t,{edges:sh(n.edges,2),corners:sh(n.corners,3)})}return i})(),rh=new Int8Array(16),oh=new Int8Array(16);function Ir(){return{ep:An.map((i,e)=>e),eo:An.map(()=>0),cp:Tn.map((i,e)=>e),co:Tn.map(()=>0)}}var Ur=i=>({ep:[...i.ep],eo:[...i.eo],cp:[...i.cp],co:[...i.co]});function Rn(i,e){let t=g0.get(e);if(!t)return!1;for(let[n,s,r]of[[i.ep,i.eo,t.edges],[i.cp,i.co,t.corners]]){for(let a=0;a<r.n;a++)rh[a]=n[r.from[a]],oh[a]=s[r.from[a]];for(let a=0;a<r.n;a++)n[r.to[a]]=rh[a],s[r.to[a]]=r.orient[a*r.ancho+oh[a]]}return!0}var _0=(()=>{let i=new fi,e=new Map;for(let t of i.getPieces())t.kind!=="center"&&e.set(t.name,t.stickers.map(n=>n.face).sort(Rr));return e})();function ah(i){let e=Ir();for(let t of i.getPieces()){if(t.kind==="center")continue;let n=_0.get(t.name),s=t.stickers.map(o=>({marca:o.face,cara:i._faceOf(o)})),r=s.map(o=>o.cara).sort(Rr),a=s.find(o=>o.marca===n[0]).cara;if(t.kind==="edge"){let o=ec(r);e.ep[o]=ec(n),e.eo[o]=r.indexOf(a)}else{let o=Bs(r);e.cp[o]=Bs(n),e.co[o]=r.indexOf(a)}}return e}var ch=i=>An[i],lh=i=>Tn[i];var mi="U",v0=(i,e)=>e.kind==="edge"?i.ep[e.i]===e.i&&i.eo[e.i]===0:i.cp[e.i]===e.i&&i.co[e.i]===0,hh=(i,e)=>(e.kind==="edge"?i.ep:i.cp).indexOf(e.i),uh=(i,e)=>i==="edge"?ch(e):lh(e),zr=new Map(Lr.map(i=>[i,i.match(/^[A-Z]+/)[0]])),rc=i=>i.flatMap(e=>Pr.map(t=>e+t));function Nr(i,e,t,n,s,r,a){if(a(i,r))return!0;if(n===0)return!1;for(let o=0;o<e.length;o++){if(t[o]===s)continue;Rn(i,e[o]),r.push(e[o]);let c=Nr(i,e,t,n-1,t[o],r,a);if(r.pop(),Rn(i,tc(e[o])),c)return!0}return!1}function y0(i,e,t,n){let s=e.map(o=>zr.get(o)),r=null,a=(o,c)=>t(o)&&(r=[...c],!0);for(let o=0;o<=n&&!r;o++)Nr(i,e,s,o,null,[],a);return r}function dh(i){let e=new Int8Array(An.length).fill(-1),t=new Int8Array(Tn.length).fill(-1),n=0;for(let r of i)(r.kind==="edge"?e:t)[r.i]=n++;let s=new Array(2*n);return r=>{for(let a=0;a<r.ep.length;a++){let o=e[r.ep[a]];o>=0&&(s[2*o]=a,s[2*o+1]=r.eo[a])}for(let a=0;a<r.cp.length;a++){let o=t[r.cp[a]];o>=0&&(s[2*o]=a,s[2*o+1]=r.co[a])}return String.fromCharCode.apply(null,s)}}function nc(i,e,t,n=3,s=3){let r=dh(t),a=e.map(d=>zr.get(d)),o=new Map,c=Ir(),l=(d,f)=>{let g=r(d);return o.has(g)||o.set(g,[...f]),!1};for(let d=0;d<=n;d++)Nr(c,e,a,d,null,[],l);let u=null,h=(d,f)=>{let g=o.get(r(d));return g?(u=[...f,...g.slice().reverse().map(tc)],!0):!1};for(let d=0;d<=s&&!u;d++)Nr(i,e,a,d,null,[],h);return u}var fh=[{caras:null,atras:0,alante:2},{caras:null,atras:3,alante:3},{caras:"hueco",atras:4,alante:4},{caras:"cuna",atras:4,alante:5},{caras:"region",atras:4,alante:4},{caras:"cuna",atras:5,alante:6},{caras:"hueco",atras:4,alante:5},{caras:"region",atras:4,alante:5},{caras:"hueco",atras:5,alante:5}],Dr=new Map,ic=new Map;function M0(i){if(!ic.has(i)){let e=pi(i),t=[];for(let n of e)for(let s of e)n<s&&on(n,s)&&t.push([i,n,s]);ic.set(i,t)}return ic.get(i)}function b0(i,e,t,n,s){let r=[e,...t],a=s+"|"+r.map(f=>f.kind[0]+f.i).join(",")+"|"+dh(r)(i);if(Dr.has(a))return Dr.get(a);let o=f=>(Dr.set(a,f),f),{caras:c,atras:l,alante:u}=fh[s];if(!c)return o(l?nc(i,Lr,r,l,u):y0(i,Lr,g=>r.every(_=>v0(g,_)),u));if(c==="cuna"){for(let f of M0(n)){let g=nc(i,rc(f),r,l,u);if(g)return o(g)}return o(null)}let h=hh(i,e),d=c==="region"?[n,...pi(n)]:[...new Set([n,...uh(e.kind,e.i),...uh(e.kind,h)])];return o(nc(i,rc(d),r,l,u))}async function S0(i,e,t,n,s,r,a){let o=[...t],c=[];for(let l=0;l<e.length;l++){let u=e.filter(d=>!o.some(f=>f.kind===d.kind&&f.i===d.i));if(!l&&s&&(u=[s]),r&&u.every(d=>hh(i,d)===d.i))return c;let h=null;for(let d=0;d<fh.length&&!h;d++)for(let f of u){a&&await a();let g=b0(i,f,o,n,d);if(g&&(!h||g.length<h.secuencia.length)&&(h={meta:f,secuencia:g},!g.length))break}if(!h)return r?c:null;for(let d of h.secuencia)Rn(i,d);c.push(...h.secuencia),o.push(h.meta)}return c}async function E0(i,e,t,n,s=!1,r=null){let a=Ur(i);Dr.clear();for(let o of[null,...e]){let c=Ur(a),l=await S0(c,e,t,n,o,s,r);if(l)return Object.assign(i,c),l}return null}function w0(i=mi){let e=Qa(i);return th(e,pi(e)[0])}function A0(i,e){let t=[],n=[[]];for(let s=0;s<e;s++){let r=[];for(let a of n)for(let o of i){if(a.length&&zr.get(a[a.length-1])===zr.get(o))continue;let c=[...a,o];r.push(c),t.push(c)}n=r}return t}var sc=new Map;function T0(i){if(sc.has(i))return sc.get(i);let e=pi(i),t=e[0],n=e.find(c=>c!==t&&on(c,t)),s=Bs([i,t,n]),r=An.map((c,l)=>[c,l]).filter(([c])=>c.includes(i)).map(([,c])=>c),a=Tn.map((c,l)=>[c,l]).filter(([c])=>c.includes(i)).map(([,c])=>c),o=null;for(let c of A0(rc([t,n]),4)){let l=Ir();for(let u=1;u<=6&&!o;u++){for(let d of c)Rn(l,d);r.every(d=>l.ep[d]===d&&l.eo[d]===0)&&a.every(d=>l.cp[d]===d&&(d===s||l.co[d]===0))&&l.co[s]&&(o={hueco:s,alg:Array.from({length:u},()=>c).flat()})}if(o)break}return sc.set(i,o),o}function R0(i,e=mi){let t=T0(e);if(!t)return null;let n=[];for(let s=0;s<5;s++){let r=null;for(let a=0;a<3&&r===null;a++){let o=Ur(i);for(let l=0;l<a;l++)for(let u of t.alg)Rn(o,u);let c=o.cp[t.hueco];for(let l=s;l<5;l++)Rn(o,e);o.co[o.cp.indexOf(c)]===0&&(r=a)}if(r===null)return null;for(let a=0;a<r;a++)for(let o of t.alg)Rn(i,o),n.push(o);Rn(i,e),n.push(e)}return n}var C0=(i,e)=>i===e?0:on(i,e)?1:i===Qa(e)?3:2;function P0(i,e,t){let n=i==="edge"?An:Tn,s=[...e].sort().join(""),r=[];for(let a=0;a<n.length;a++)n[a].map(o=>C0(o,t)).sort().join("")===s&&r.push({kind:i,i:a});return r}var oc=(i=mi)=>{let e=w0(i).U;return[{nombre:"estrella",rotulo:"etapa.estrella",kind:"edge",alturas:[0,1],desde:i},{nombre:"esquinas de la 1\xAA capa",rotulo:"etapa.esquinasPrimeraCapa",kind:"corner",alturas:[0,1,1],desde:i},{nombre:"aristas de la 2\xAA fila",rotulo:"etapa.aristasSegundaFila",kind:"edge",alturas:[1,1],desde:i},{nombre:"esquinas de la 3\xAA fila",rotulo:"etapa.esquinasTerceraFila",kind:"corner",alturas:[1,1,2],desde:e},{nombre:"aristas junto a esquina",rotulo:"etapa.aristasJuntoAEsquina",kind:"edge",alturas:[1,2],desde:e},{nombre:"esquinas pen\xFAltimas",rotulo:"etapa.esquinasPenultimas",kind:"corner",alturas:[1,2,2],desde:e},{nombre:"aristas pen\xFAltimas",rotulo:"etapa.aristasPenultimas",kind:"edge",alturas:[2,2],desde:e},{nombre:"aristas de la \xFAltima capa",rotulo:"etapa.aristasUltimaCapa",kind:"edge",alturas:[2,3],desde:e},{nombre:"esquinas de la \xFAltima capa",rotulo:"etapa.esquinasUltimaCapa",kind:"corner",alturas:[2,2,3],desde:e,parcial:!0},{nombre:"girar las \xFAltimas esquinas",rotulo:"etapa.girarEsquinas",kind:"corner",alturas:[2,2,3],desde:e,giro:!0}].map(t=>({...t,piezas:P0(t.kind,t.alturas,i)}))};var L0=(i,e=mi)=>oc(e)[i-1].rotulo,Or=oc().length;async function I0(i,e,t=mi,n=null){let s=oc(t),r=s[e-1];if(r.giro)return R0(i,r.desde);let a=[];for(let o of s.slice(0,e-1))for(let c of o.piezas)a.some(l=>l.kind===c.kind&&l.i===c.i)||a.push(c);return E0(i,r.piezas,a,r.desde,r.parcial,n)}async function U0(i,e=Or,t=mi,{aviso:n,respira:s}={}){let r=[];for(let a=1;a<=e;a++){n&&await n(a,L0(a,t),r.length);let o=await I0(i,a,t,s);if(!o)return null;r.push(...o)}return r}var ph=(i,e=mi,t)=>U0(i,Or,e,t);var St=Object.freeze(["U","L","R","B"]),Fr=Object.freeze(St.flatMap(i=>[i,i+"'"])),D0=Object.freeze(St.flatMap(i=>[i.toLowerCase(),i.toLowerCase()+"'"])),Yn=Object.freeze((()=>{let i=[];for(let e=0;e<St.length;e++)for(let t=e+1;t<St.length;t++)i.push([St[e],St[t]]);return i})()),z0=new Map(Yn.map((i,e)=>[i.join(""),e])),ac=new Map(St.map((i,e)=>[i,e])),N0=(i,e)=>ac.get(i)-ac.get(e),mh=i=>z0.get([...i].sort(N0).join("")),O0=new Map(Object.entries(br).map(([i,e])=>[e,i])),F0=i=>St.filter(e=>e!==i);function cc(i){let e={ep:new Int8Array(Yn.length),eo:new Int8Array(Yn.length),co:new Int8Array(St.length),to:new Int8Array(St.length)};for(let t of i.getPieces()){let n=t.stickers.map(r=>i._faceOf(r)),s=t.stickers.map(r=>O0.get(r.color));if(t.kind==="edge"){let r=mh(n),a=mh(s),[o]=Yn[r],[c]=Yn[a],l=n.indexOf(o);e.ep[r]=a,e.eo[r]=s[l]===c?0:1}else{let r=t.name[0],a=F0(r),o=n.indexOf(a[0]),c=(a.indexOf(s[o])-0+3)%3;(t.kind==="tip"?e.to:e.co)[ac.get(r)]=c}}return e}var gh=()=>({ep:Int8Array.from([0,1,2,3,4,5]),eo:new Int8Array(6),co:new Int8Array(4),to:new Int8Array(4)}),B0=new Map([...Fr,...D0].map(i=>{let e=new Ni;return e.applyMove(i),[i,cc(e)]})),lc=i=>i.endsWith("'")?i.slice(0,-1):i+"'",_h=i=>i[0].toUpperCase();function Cn(i,e){let t=B0.get(e);if(!t)return!1;let n=i.ep.slice(),s=i.eo.slice();for(let r=0;r<n.length;r++){let a=t.ep[r];i.ep[r]=n[a],i.eo[r]=s[a]+t.eo[r]&1}for(let r=0;r<St.length;r++)i.co[r]=(i.co[r]+t.co[r])%3,i.to[r]=(i.to[r]+t.to[r])%3;return!0}var Br=i=>({ep:i.ep.slice(),eo:i.eo.slice(),co:i.co.slice(),to:i.to.slice()}),uc=i=>i.co.every(e=>e===0),k0=i=>i.ep.every((e,t)=>e===t)&&i.eo.every(e=>e===0),xh=i=>uc(i)&&k0(i)&&i.to.every(e=>e===0);var V0="U",bh=Yn.map((i,e)=>[i,e]).filter(([i])=>i.includes(V0)).map(([,i])=>i),G0=Yn.map((i,e)=>e).filter(i=>!bh.includes(i)),vh=new Map(Fr.map(i=>[i,_h(i)]));function kr(i,e,t,n,s){if(s(i,n))return!0;if(e===0)return!1;for(let r of Fr){if(vh.get(r)===t)continue;Cn(i,r),n.push(r);let a=kr(i,e-1,vh.get(r),n,s);if(n.pop(),Cn(i,lc(r)),a)return!0}return!1}function W0(i){let e=new Array(2*i.length+St.length);return t=>{for(let n=0;n<i.length;n++){let s=t.ep.indexOf(i[n]);e[2*n]=s,e[2*n+1]=t.eo[s]}for(let n=0;n<t.co.length;n++)e[2*i.length+n]=t.co[n];return String.fromCharCode.apply(null,e)}}function X0(i,e,t=3,n=4){let s=W0(e),r=new Map,a=gh(),o=(u,h)=>{let d=s(u);return r.has(d)||r.set(d,[...h]),!1};for(let u=0;u<=t;u++)kr(a,u,null,[],o);let c=null,l=(u,h)=>{let d=r.get(s(u));return d?(c=[...h,...d.slice().reverse().map(lc)],!0):!1};for(let u=0;u<=n&&!c;u++)kr(i,u,null,[],l);return c}var q0=[{atras:0,alante:3},{atras:3,alante:3},{atras:4,alante:4},{atras:5,alante:5},{atras:6,alante:6}];function yh(i,e){for(let{atras:t,alante:n}of q0){let s=t===0?Y0(i,e,n):X0(i,e,t,n);if(s)return s}return null}function Y0(i,e,t){let n=a=>uc(a)&&e.every(o=>a.ep[o]===o&&a.eo[o]===0),s=null,r=(a,o)=>n(a)&&(s=[...o],!0);for(let a=0;a<=t&&!s;a++)kr(i,a,null,[],r);return s}function j0(i){let e=[];for(let t=0;t<St.length;t++){if(i.co[t]===0)continue;let n=St[t];for(let s of[n,n+"'"]){let r=Br(i);if(Cn(r,s),r.co[t]===0){Cn(i,s),e.push(s);break}}if(i.co[t]!==0)return null}return e}function Mh(i,e,t){let n=[],s=[];if(!t){let r=yh(i,e);if(!r)return null;for(let a of r)Cn(i,a);return r}for(;s.length<e.length;){let r=null;for(let a of e){if(s.includes(a))continue;let o=yh(i,[...s,a]);if(o&&(!r||o.length<r.secuencia.length)&&(r={hueco:a,secuencia:o},!o.length))break}if(!r)return null;for(let a of r.secuencia)Cn(i,a);n.push(...r.secuencia),s.push(r.hueco)}return n}function Z0(i){let e=[];for(let t=0;t<St.length;t++){if(i.to[t]===0)continue;let n=St[t].toLowerCase();for(let s of[n,n+"'"]){let r=Br(i);if(Cn(r,s),r.to[t]===0){Cn(i,s),e.push(s);break}}if(i.to[t]!==0)return null}return e}var $0=Object.freeze([{nombre:"centros",rotulo:"etapa.centros",correr:i=>j0(i)},{nombre:"capa de abajo",rotulo:"etapa.capaAbajo",correr:i=>Mh(i,bh,!0)},{nombre:"pir\xE1mide peque\xF1a",rotulo:"etapa.piramidePequena",correr:i=>Mh(i,G0,!1)},{nombre:"puntas",rotulo:"etapa.puntas",correr:i=>Z0(i)}]);function Sh(i,{aviso:e=null}={}){let t=i?.getPieces?cc(i):Br(i),n=[];for(let s of $0){e&&e(s.rotulo,n.length);let r=s.correr(t);if(!r)return null;n.push(...r)}return xh(t)?n:null}var Ah=["","'","2"],Eh=["U","D","R","L","F","B"].flatMap(i=>Ah.map(e=>i+e)),J0=i=>["r","l","u","d","f","b",...i%2?["M","E","S"]:[]].flatMap(e=>Ah.map(t=>e+t)),ks=i=>i.endsWith("2")?i:i.endsWith("'")?i.slice(0,-1):`${i}'`,K0=i=>i.trim().split(/\s+/).filter(Boolean).reverse().map(ks).join(" "),Hr=i=>`${i.x.toFixed(1)},${i.y.toFixed(1)},${i.z.toFixed(1)}`;function fc(i,e,t){for(let n of(e??"").trim().split(/\s+/))n&&(i.applyMove(n),t?.push(n))}var pc=(i,e)=>[i.x,i.y,i.z].filter(t=>Math.abs(Math.abs(t)-e)<1e-6).length===1;function Th(i,e){return Math.abs(i.y-e)<1e-6?"py":Math.abs(i.y+e)<1e-6?"ny":Math.abs(i.x-e)<1e-6?"px":Math.abs(i.x+e)<1e-6?"nx":Math.abs(i.z-e)<1e-6?"pz":"nz"}function wh(i,e){let t=new It(i),n=(i-1)/2,r=t.getPieces().map(o=>({piece:o,from:{...o.position}}));fc(t,e);let a=new Map;for(let{piece:o,from:c}of r)pc(c,n)&&a.set(Hr(c),Hr(o.position));return a}var hc=new Map;function Q0(i){if(hc.has(i))return hc.get(i);let e=J0(i),t=[];for(let c of e)for(let l of Eh)for(let u of e){let h=`${c} ${l} ${u} ${ks(l)} ${ks(c)} ${l} ${ks(u)} ${ks(l)}`,f=[...wh(i,h)].filter(([g,_])=>g!==_);f.length===3&&t.push({alg:h,moved:f})}let n=[];for(let c of["",...e,...Eh]){let l=c?wh(i,c):null,u=l?new Map([...l].map(([h,d])=>[d,h])):null;for(let h of t)n.push({alg:c?`${c} ${h.alg} ${K0(c)}`:h.alg,moved:u?h.moved.map(([d,f])=>[u.get(d),u.get(f)]):h.moved})}let s=(i-1)/2,r=new Map,a=(c,l,u)=>{let h=Rh(l.moved[0][0],s);r.has(h)||r.set(h,{clave:h,base:[],macros:[],places:new Set}),r.get(h)[u].push(l);for(let[d,f]of l.moved)r.get(h).places.add(d),r.get(h).places.add(f)};for(let c of t)a(null,c,"base");for(let c of n)a(null,c,"macros");let o={base:t,macros:n,target:e_(i),orbits:[...r.values()]};return hc.set(i,o),o}var Rh=(i,e)=>i.split(",").map(Number).filter(t=>Math.abs(Math.abs(t)-e)>1e-6).map(t=>Math.abs(t)).sort().join("|");function e_(i){let e=new It(i),t=(i-1)/2,n=new Map;for(let s of e.getPieces())pc(s.position,t)&&n.set(Hr(s.position),s.faces[Th(s.position,t)]);return n}var Ch=(i,e)=>{let t=new Map;for(let n of i.getPieces())pc(n.position,e)&&t.set(Hr(n.position),n.faces[Th(n.position,e)]);return t};function dc(i,e,t){let n=0;for(let[s,r]of e)n+=(i.get(s)===t.get(r)?1:0)-(i.get(r)===t.get(r)?1:0);return n}var t_=(i,e)=>{let t=new Map(i);for(let[n,s]of e)t.set(s,i.get(n));return t};function Hs(i,e,t=60){if(i.n!==4&&i.n!==5)return!1;let n=(i.n-1)/2,{target:s,orbits:r}=Q0(i.n);if(!n_(i,e,n,s))return!1;for(let a of r)if(!i_(i,e,n,s,a,t))return!1;return!0}function n_(i,e,t,n){if(i.n%2===0)return!0;let s=()=>[...Ch(i,t)].every(([l,u])=>Rh(l,t)!=="0|0"||u===n.get(l));if(s())return!0;let r=["M","M'","M2","E","E'","E2","S","S'","S2"],a=[],o=c=>{if(s())return!0;if(c===0)return!1;for(let l of r){if(i.applyMove(l),a.push(l),o(c-1))return!0;a.pop(),i.applyInverse(l)}return!1};for(let c=1;c<=3;c++){if(o(c))return e?.push(...a),!0;a.length=0}return!1}function i_(i,e,t,n,{base:s,macros:r,places:a},o){let c=l=>[...a].every(u=>l.get(u)===n.get(u));for(let l=0;l<o;l++){let u=Ch(i,t);if(c(u))return!0;let h=null;for(let f of r){let g=dc(u,f.moved,n);if((!h||g>h.g)&&(h={g,alg:f.alg},g===3))break}if(h&&h.g>0){fc(i,h.alg,e);continue}let d=null;for(let f of s){let g=t_(u,f.moved),_=dc(u,f.moved,n);for(let m of r){let p=_+dc(g,m.moved,n);if((!d||p>d.g)&&(d={g:p,alg:`${f.alg} ${m.alg}`},p>=4))break}if(d&&d.g>=4)break}if(!d||d.g<=0)return!1;fc(i,d.alg,e)}return!1}var Lh=["","'","2"],Vr=["U","D","R","L","F","B"].flatMap(i=>Lh.map(e=>i+e)),Ih={x:["nx","px"],y:["ny","py"],z:["nz","pz"]},Uh=i=>i.endsWith("2")?i:i.endsWith("'")?i.slice(0,-1):`${i}'`,Gr=i=>(i??"").trim().split(/\s+/).filter(Boolean),Dh=i=>Gr(i).reverse().map(Uh).join(" ");function Yt(i,e,t){for(let n of Gr(e))i.applyMove(n),t?.push(n)}var zh=(i,e)=>{let t=Gr(e);for(let n=t.length-1;n>=0;n--)i.applyInverse(t[n])},Hi=i=>(i.n-1)/2,gi=(i,e)=>Math.abs(Math.abs(i)-e)<1e-6,Pn=(i,e)=>[i.x,i.y,i.z].filter(t=>gi(t,e)).length===2;function Wr(i,e){let t=[];for(let n of["x","y","z"]){let s=i.position[n];if(!gi(s,e))continue;let r=Ih[n][s>0?1:0];t.push([r,i.faces[r]])}return t}var Nh=(i,e)=>["x","y","z"].map(t=>gi(i.position[t],e)?Math.sign(i.position[t]):0).join(",");function Xr(i){let e=Hi(i),t=new Map;for(let n of Oh(i)){let s=Nh(n,e);t.has(s)||t.set(s,[]),t.get(s).push(n)}return t}var Ph=new WeakMap;function Oh(i){let e=Ph.get(i);if(e)return e;let t=Hi(i),n=i.getPieces().filter(s=>Pn(s.position,t));return Ph.set(i,n),n}var xc=(i,e)=>Wr(i,e).map(([t,n])=>`${t}${n}`).sort().join("|"),vc=(i,e)=>i.every(t=>xc(t,e)===xc(i[0],e));function mc(i){let e=Hi(i),t=new Map;for(let s of Oh(i)){let r=Nh(s,e),a=t.get(r);a||t.set(r,a=[]),a.push(xc(s,e))}let n=0;for(let s of t.values()){let r=0;for(let a of s){let o=0;for(let c of s)c===a&&o++;o>r&&(r=o)}n+=r-1}return n}var qr=i=>{let e=Hi(i),t=0;for(let n of Xr(i).values())vc(n,e)&&t++;return t},gc=new Map;function yc(i,e,t){let n=`${t}:${i}`;if(gc.has(n))return gc.get(n);let s=[""];for(let a=0;a<i;a++){let o=[];for(let c of s){let l=Gr(c).at(-1)?.[0];for(let u of Vr)u[0]!==l&&o.push(c?`${c} ${u}`:u)}s=o}let r=[];for(let a of s)for(let o of e)r.push(a?`${a} ${o} ${Dh(a)}`:o);return gc.set(n,r),r}var _c=new Map;function Fh(i,e){if(_c.has(i))return _c.get(i);let t=(i-1)/2,n=["r","l","u","d","f","b",...i%2?["M","E","S"]:[]].flatMap(f=>Lh.map(g=>f+g)),s=[];for(let f of Vr)for(let g of Vr)if(f[0]!==g[0])for(let _ of Vr)g[0]!==_[0]&&s.push(`${f} ${g} ${_}`);let r=new e(i),a=f=>[f.x,f.y,f.z].filter(g=>gi(g,t)).length===1;r.cubies=r.cubies.filter(f=>Pn(f.position,t)||a(f.position));let o=f=>`${f.position.x},${f.position.y},${f.position.z}`,c=r.cubies.map(f=>({arista:Pn(f.position,t),sitio:o(f)})),l=f=>{for(let g of["x","y","z"]){let _=f.position[g];if(gi(_,t))return f.faces[Ih[g][_>0?1:0]]}return null},u=new Map;for(let f of r.cubies)Pn(f.position,t)||u.set(o(f),l(f));let h=()=>{for(let f of r.cubies)if(!Pn(f.position,t)&&u.get(o(f))!==l(f))return!1;return!0},d=[];for(let f of n)for(let g of s){let _=`${f} ${g} ${Uh(f)} ${Dh(g)}`;Yt(r,_);let m=0;for(let S=0;S<r.cubies.length&&m<=3;S++)c[S].arista&&o(r.cubies[S])!==c[S].sitio&&m++;let p=m===3&&h();zh(r,_),p&&d.push(_)}return _c.set(i,d),d}function Yr(i,e,{niveles:t,limit:n=80,paciencia:s=3}){let r=12*(Xr(i).values().next().value.length-1),a=1,o=h=>(a=a*1103515245+12345&2147483647)%h,c=i.clone();c.cubies=c.cubies.filter(h=>Pn(h.position,Hi(i)));let l=h=>{Yt(c,h),Yt(i,h,e)},u=0;for(let h=0;h<n;h++){let d=mc(c);if(d===r)return!0;let f=null,g=t.map(()=>[]);for(let m=0;m<t.length&&!f;m++){let{depth:p,bases:S,marca:v,sacude:R}=t[m];for(let I of yc(p,S,v)){Yt(c,I);let C=mc(c);if(zh(c,I),C>d&&(!f||C>f.after)?f={after:C,alg:I}:C===d&&R&&g[m].push(I),f&&f.after===r)break}}if(f){l(f.alg),u=0;continue}let _=g.map((m,p)=>({algs:m,rango:t[p].sacude??1/0})).filter(m=>m.algs.length).sort((m,p)=>m.rango-p.rango).flatMap(m=>m.algs);if(!_.length||++u>s)return!1;l(_[o(_.length)])}return mc(c)===r}function jr(i,e){let t=Hi(i),n=new e(3),s=r=>gi(r,t)?Math.sign(r):0;for(let r of i.getPieces()){let{x:a,y:o,z:c}=r.position;if(![a,o,c].every(h=>gi(h,t))&&!Pn(r.position,t))continue;let u=n.getPieces().find(h=>h.position.x===s(a)&&h.position.y===s(o)&&h.position.z===s(c));if(!u)return null;for(let[h,d]of Wr(r,t)){if(!d)return null;u.setFaceColor(h,d)}}return n}var Zr=i=>i.filter(e=>/^[UDRLFB](2|'|)$/.test(e));var Hh="u R F' U R' F u'",$r=Object.freeze(["(Rr)' U' R' U (Rr)","(Ll) U L U' (Ll)'",Hh,"(Rr) U R U' (Rr)'","(Ll)' U' L U (Ll)"]),s_=Object.freeze([{depth:0,bases:$r,marca:"juntar4"},{depth:1,bases:$r,marca:"juntar4",sacude:1},{depth:2,bases:$r,marca:"juntar4"},{depth:3,bases:$r,marca:"juntar4"},{depth:4,bases:[Hh],marca:"ultimas4"}]),Bh="(Rr)2 B2 U2 (Ll) U2 (Rr)' U2 (Rr) U2 F2 (Rr) F2 (Ll)' B2 (Rr)2",kh="r2 U2 r2 (Uu)2 r2 u2",r_=Object.freeze(["",Bh,kh,`${Bh} ${kh}`]),o_=(i,e)=>Yr(i,e,{niveles:s_}),a_=i=>jr(i,It);function Vh(i,{aviso:e=null}={}){if(i.n!==4)return null;let t=i.clone(),n=[],s=[],r=a=>s.push({nombre:a,desde:s.at(-1)?.hasta??0,hasta:n.length});if(e?.("etapa.centros"),!Hs(t,n)||(r("etapa.centros"),e?.("etapa.aristas"),!o_(t,n)))return null;r("etapa.aristas"),e?.("etapa.comoUn3x3");for(let a of r_){let o=t.clone();if(Yt(o,a),qr(o)!==12)continue;let c=a_(o),l=c&&ki(c);if(!l?.solved)continue;let u=Zr(l.moves);if(u.length!==l.moves.length)return null;Yt(t,a,n),a&&r("etapa.paridad"),Yt(t,u.join(" "),n);let h=s.at(-1)?.hasta??0;for(let d of l.etapas??[])s.push({nombre:d.nombre,desde:h+d.desde,hasta:h+d.hasta});return{moves:n,solved:t.isSolved(),state:t,etapas:s}}return null}var Jr=Object.freeze(["(Ll) U L U' (Ll)'","(Rr)' U' R' U (Rr)","(Ll)' U' L U (Ll)","(Rr) U R U' (Rr)'","l U L U' l'","r' U' R' U r","M U L U' M'","M' U' R' U M"]),c_=Object.freeze(["(Ll) U L U' F' U' F U (Ll)'","(Rr)' U' R' U F U F' U' (Rr)","u R F' U R' F u'","l U L U' F' U' F U l'","r' U' R' U F U F' U' r","M U L U' F' U' F U M'","M' U' R' U F U F' U' M"]),Gh="(Rr)2 B2 U2 (Ll) U2 (Rr)' U2 (Rr) U2 F2 (Rr) F2 (Ll)' B2 (Rr)2",l_=null,u_=()=>l_??(l_=[{depth:0,bases:Jr,marca:"juntar5"},{depth:1,bases:Jr,marca:"juntar5",sacude:2},{depth:2,bases:Jr,marca:"juntar5"},{depth:0,bases:Fh(5,It),marca:"ciclos5"},{depth:3,bases:Jr,marca:"juntar5"},{depth:3,bases:c_,marca:"ultimas5"},{depth:2,bases:[Gh],marca:"orientar5",sacude:1}]),h_=Object.freeze(["",Gh]),d_=(i,e)=>Yr(i,e,{niveles:u_()});function f_(i,e,t){let n=["r","u","f","r'","u'","f'"];for(let s=0;s<=n.length;s++){if(d_(i,e))return!0;if(s===n.length||(t?.("etapa.paridadDeAristas"),Yt(i,n[s],e),!Hs(i,e)))return!1}return!1}var p_=i=>jr(i,It);function Wh(i,{aviso:e=null}={}){if(i.n!==5)return null;let t=i.clone(),n=[],s=[],r=a=>s.push({nombre:a,desde:s.at(-1)?.hasta??0,hasta:n.length});if(e?.("etapa.centros"),!Hs(t,n)||(r("etapa.centros"),e?.("etapa.aristas"),!f_(t,n,e)))return null;r("etapa.aristas"),e?.("etapa.comoUn3x3");for(let a of h_){let o=t.clone();if(Yt(o,a),qr(o)!==12)continue;let c=p_(o),l=c&&ki(c);if(!l?.solved)continue;let u=Zr(l.moves);if(u.length!==l.moves.length)return null;Yt(t,a,n),a&&r("etapa.paridad"),Yt(t,u.join(" "),n);let h=s.at(-1)?.hasta??0;for(let d of l.etapas??[])s.push({nombre:d.nombre,desde:h+d.desde,hasta:h+d.hasta});return{moves:n,solved:t.isSolved(),state:t,etapas:s}}return null}var m_=Math.PI;function g_(i){return i===1?1:i===2?2:i===3?-1:0}function Kr(i,e,t=1){let n=i.getRotationAxis(e.face);if(n&&typeof n.axis=="string"){let r=g_(e.times);return{axis:n.axis,angle:t*n.sign*r*(m_/2)}}let s=i.getAnglePerMove();return{axis:{x:n.x,y:n.y,z:n.z},angle:t*e.times*s}}var Ui={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Di={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},__=0,Xh=1,x_=2;var wf=1,v_=2,Nn=3,nn=0,Ht=1,On=2;var ti=0,us=1,qh=2,Yh=3,jh=4,y_=5,bi=100,M_=101,b_=102,Zh=103,$h=104,S_=200,E_=201,w_=202,A_=203,Qc=204,el=205,T_=206,R_=207,C_=208,P_=209,L_=210,I_=211,U_=212,D_=213,z_=214,N_=0,O_=1,F_=2,Co=3,B_=4,k_=5,H_=6,V_=7,Af=0,G_=1,W_=2,ni=0,X_=1,q_=2,Y_=3,j_=4,Z_=5,$_=6;var Tf=300,fs=301,ps=302,tl=303,nl=304,na=306,il=1e3,hn=1001,sl=1002,Nt=1003,Jh=1004;var Mc=1005;var en=1006,J_=1007;var Qs=1008;var ii=1009,K_=1010,Q_=1011,Bl=1012,Rf=1013,Qn=1014,ei=1015,er=1016,Cf=1017,Pf=1018,wi=1020,ex=1021,dn=1023,tx=1024,nx=1025,Ai=1026,ms=1027,ix=1028,Lf=1029,sx=1030,If=1031,Uf=1033,bc=33776,Sc=33777,Ec=33778,wc=33779,Kh=35840,Qh=35841,ed=35842,td=35843,Df=36196,nd=37492,id=37496,sd=37808,rd=37809,od=37810,ad=37811,cd=37812,ld=37813,ud=37814,hd=37815,dd=37816,fd=37817,pd=37818,md=37819,gd=37820,_d=37821,Ac=36492,xd=36494,vd=36495,rx=36283,yd=36284,Md=36285,bd=36286;var Po=2300,Lo=2301,Tc=2302,Sd=2400,Ed=2401,wd=2402;var zf=3e3,Ti=3001,ox=3200,ax=3201,Nf=0,cx=1,tn="",dt="srgb",kn="srgb-linear",kl="display-p3",ia="display-p3-linear",Io="linear",it="srgb",Uo="rec709",Do="p3";var Vi=7680;var Ad=519,lx=512,ux=513,hx=514,Of=515,dx=516,fx=517,px=518,mx=519,rl=35044;var Td="300 es",ol=1035,Fn=2e3,zo=2001,yn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rd=1234567,Zs=Math.PI/180,tr=180/Math.PI;function Bn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function Tt(i,e,t){return Math.max(e,Math.min(t,i))}function Hl(i,e){return(i%e+e)%e}function gx(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function _x(i,e,t){return i!==e?(t-i)/(e-i):0}function $s(i,e,t){return(1-t)*i+t*e}function xx(i,e,t,n){return $s(i,e,1-Math.exp(-t*n))}function vx(i,e=1){return e-Math.abs(Hl(i,e*2)-e)}function yx(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Mx(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function bx(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Sx(i,e){return i+Math.random()*(e-i)}function Ex(i){return i*(.5-Math.random())}function wx(i){i!==void 0&&(Rd=i);let e=Rd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ax(i){return i*Zs}function Tx(i){return i*tr}function al(i){return(i&i-1)===0&&i!==0}function Rx(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function No(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Cx(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*h,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*u,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function vn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Qe(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ff={DEG2RAD:Zs,RAD2DEG:tr,generateUUID:Bn,clamp:Tt,euclideanModulo:Hl,mapLinear:gx,inverseLerp:_x,lerp:$s,damp:xx,pingpong:vx,smoothstep:yx,smootherstep:Mx,randInt:bx,randFloat:Sx,randFloatSpread:Ex,seededRandom:wx,degToRad:Ax,radToDeg:Tx,isPowerOfTwo:al,ceilPowerOfTwo:Rx,floorPowerOfTwo:No,setQuaternionFromProperEuler:Cx,normalize:Qe,denormalize:vn},Se=class i{constructor(e=0,t=0){i.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Xe=class i{constructor(e,t,n,s,r,a,o,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],S=s[1],v=s[4],R=s[7],I=s[2],C=s[5],A=s[8];return r[0]=a*_+o*S+c*I,r[3]=a*m+o*v+c*C,r[6]=a*p+o*R+c*A,r[1]=l*_+u*S+h*I,r[4]=l*m+u*v+h*C,r[7]=l*p+u*R+h*A,r[2]=d*_+f*S+g*I,r[5]=d*m+f*v+g*C,r[8]=d*p+f*R+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*r,f=l*r-a*c,g=t*h+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=h*_,e[1]=(s*l-u*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Rc.makeScale(e,t)),this}rotate(e){return this.premultiply(Rc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Rc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Rc=new Xe;function Bf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Oo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Px(){let i=Oo("canvas");return i.style.display="block",i}var Cd={};function Js(i){i in Cd||(Cd[i]=!0,console.warn(i))}var Pd=new Xe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ld=new Xe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Qr={[kn]:{transfer:Io,primaries:Uo,toReference:i=>i,fromReference:i=>i},[dt]:{transfer:it,primaries:Uo,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[ia]:{transfer:Io,primaries:Do,toReference:i=>i.applyMatrix3(Ld),fromReference:i=>i.applyMatrix3(Pd)},[kl]:{transfer:it,primaries:Do,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Ld),fromReference:i=>i.applyMatrix3(Pd).convertLinearToSRGB()}},Lx=new Set([kn,ia]),et={enabled:!0,_workingColorSpace:kn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Lx.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;let n=Qr[e].toReference,s=Qr[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Qr[i].primaries},getTransfer:function(i){return i===tn?Io:Qr[i].transfer}};function hs(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Cc(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Gi,Fo=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Gi===void 0&&(Gi=Oo("canvas")),Gi.width=e.width,Gi.height=e.height;let n=Gi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Oo("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=hs(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(hs(t[n]/255)*255):t[n]=hs(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Ix=0,Bo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ix++}),this.uuid=Bn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Pc(s[a].image)):r.push(Pc(s[a]))}else r=Pc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Pc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Fo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ux=0,sn=class i extends yn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=hn,s=hn,r=en,a=Qs,o=dn,c=ii,l=i.DEFAULT_ANISOTROPY,u=tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ux++}),this.uuid=Bn(),this.name="",this.source=new Bo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Ti?dt:tn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case il:e.x=e.x-Math.floor(e.x);break;case hn:e.x=e.x<0?0:1;break;case sl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case il:e.y=e.y-Math.floor(e.y);break;case hn:e.y=e.y<0?0:1;break;case sl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===dt?Ti:zf}set encoding(e){Js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ti?dt:tn}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=Tf;sn.DEFAULT_ANISOTROPY=1;var yt=class i{constructor(e=0,t=0,n=0,s=1){i.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,R=(f+1)/2,I=(p+1)/2,C=(u+d)/4,A=(h+_)/4,Y=(g+m)/4;return v>R&&v>I?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=C/n,r=A/n):R>I?R<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(R),n=C/s,r=Y/s):I<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),n=A/r,s=Y/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(h-_)/S,this.z=(d-u)/S,this.w=Math.acos((l+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},cl=class extends yn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);let s={width:e,height:t,depth:1};n.encoding!==void 0&&(Js("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Ti?dt:tn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new sn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Bo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Hn=class extends cl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ko=class extends sn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ll=class extends sn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Nt,this.minFilter=Nt,this.wrapR=hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Rt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3],d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==d||l!==f||u!==g){let m=1-o,p=c*d+l*f+u*g+h*_,S=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let I=Math.sqrt(v),C=Math.atan2(I,p*S);m=Math.sin(m*C)/I,o=Math.sin(o*C)/I}let R=o*S;if(c=c*m+d*R,l=l*m+f*R,u=u*m+g*R,h=h*m+_*R,m===1-o){let I=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=I,l*=I,u*=I,h*=I}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+u*h+c*f-l*d,e[t+1]=c*g+u*d+l*h-o*f,e[t+2]=l*g+u*f+o*d-c*h,e[t+3]=u*g-o*h-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"YXZ":this._x=d*u*h+l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"ZXY":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h-d*f*g;break;case"ZYX":this._x=d*u*h-l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h+d*f*g;break;case"YZX":this._x=d*u*h+l*f*g,this._y=l*f*h+d*u*g,this._z=l*u*g-d*f*h,this._w=l*u*h-d*f*g;break;case"XZY":this._x=d*u*h-l*f*g,this._y=l*f*h-d*u*g,this._z=l*u*g+d*f*h,this._w=l*u*h+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>h){let f=2*Math.sqrt(1+n-o-h);this._w=(u-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>h){let f=2*Math.sqrt(1+o-n-h);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+h-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(e=0,t=0,n=0){i.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Id.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Id.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Lc.copy(this).projectOnVector(e),this.sub(Lc)}reflect(e){return this.sub(Lc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Lc=new L,Id=new Rt,Vn=class{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(an.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(an.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=an.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,an):an.fromBufferAttribute(r,a),an.applyMatrix4(e.matrixWorld),this.expandByPoint(an);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),eo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),eo.copy(n.boundingBox)),eo.applyMatrix4(e.matrixWorld),this.union(eo)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,an),an.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vs),to.subVectors(this.max,Vs),Wi.subVectors(e.a,Vs),Xi.subVectors(e.b,Vs),qi.subVectors(e.c,Vs),jn.subVectors(Xi,Wi),Zn.subVectors(qi,Xi),_i.subVectors(Wi,qi);let t=[0,-jn.z,jn.y,0,-Zn.z,Zn.y,0,-_i.z,_i.y,jn.z,0,-jn.x,Zn.z,0,-Zn.x,_i.z,0,-_i.x,-jn.y,jn.x,0,-Zn.y,Zn.x,0,-_i.y,_i.x,0];return!Ic(t,Wi,Xi,qi,to)||(t=[1,0,0,0,1,0,0,0,1],!Ic(t,Wi,Xi,qi,to))?!1:(no.crossVectors(jn,Zn),t=[no.x,no.y,no.z],Ic(t,Wi,Xi,qi,to))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,an).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(an).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Ln=[new L,new L,new L,new L,new L,new L,new L,new L],an=new L,eo=new Vn,Wi=new L,Xi=new L,qi=new L,jn=new L,Zn=new L,_i=new L,Vs=new L,to=new L,no=new L,xi=new L;function Ic(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){xi.fromArray(i,r);let o=s.x*Math.abs(xi.x)+s.y*Math.abs(xi.y)+s.z*Math.abs(xi.z),c=e.dot(xi),l=t.dot(xi),u=n.dot(xi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var Dx=new Vn,Gs=new L,Uc=new L,Gn=class{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Dx.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gs.subVectors(e,this.center);let t=Gs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Gs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Uc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gs.copy(e.center).add(Uc)),this.expandByPoint(Gs.copy(e.center).sub(Uc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},In=new L,Dc=new L,io=new L,$n=new L,zc=new L,so=new L,Nc=new L,si=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Dc.copy(e).add(t).multiplyScalar(.5),io.copy(t).sub(e).normalize(),$n.copy(this.origin).sub(Dc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(io),o=$n.dot(this.direction),c=-$n.dot(io),l=$n.lengthSq(),u=Math.abs(1-a*a),h,d,f,g;if(u>0)if(h=a*c-o,d=a*o-c,g=r*u,h>=0)if(d>=-g)if(d<=g){let _=1/u;h*=_,d*=_,f=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l):d<=g?(h=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),f=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Dc).addScaledVector(io,d),f}intersectSphere(e,t){In.subVectors(e.center,this.origin);let n=In.dot(this.direction),s=In.dot(In)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,n,s,r){zc.subVectors(t,e),so.subVectors(n,e),Nc.crossVectors(zc,so);let a=this.direction.dot(Nc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;$n.subVectors(this.origin,e);let c=o*this.direction.dot(so.crossVectors($n,so));if(c<0)return null;let l=o*this.direction.dot(zc.cross($n));if(l<0||c+l>a)return null;let u=-o*$n.dot(Nc);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},lt=class i{constructor(e,t,n,s,r,a,o,c,l,u,h,d,f,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,h,d,f,g,_,m)}set(e,t,n,s,r,a,o,c,l,u,h,d,f,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Yi.setFromMatrixColumn(e,0).length(),r=1/Yi.setFromMatrixColumn(e,1).length(),a=1/Yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let d=a*u,f=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*u,f=c*h,g=l*u,_=l*h;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*u,f=c*h,g=l*u,_=l*h;t[0]=d-_*o,t[4]=-a*h,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*u,f=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*h,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=_-d*h,t[8]=g*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*h+g,t[10]=d-_*h}else if(e.order==="XZY"){let d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+_,t[5]=a*u,t[9]=f*h-g,t[2]=g*h-f,t[6]=o*u,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zx,e,Nx)}lookAt(e,t,n){let s=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),Jn.crossVectors(n,jt),Jn.lengthSq()===0&&(Math.abs(n.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),Jn.crossVectors(n,jt)),Jn.normalize(),ro.crossVectors(jt,Jn),s[0]=Jn.x,s[4]=ro.x,s[8]=jt.x,s[1]=Jn.y,s[5]=ro.y,s[9]=jt.y,s[2]=Jn.z,s[6]=ro.z,s[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],S=n[3],v=n[7],R=n[11],I=n[15],C=s[0],A=s[4],Y=s[8],M=s[12],E=s[1],H=s[5],j=s[9],ae=s[13],U=s[2],z=s[6],G=s[10],X=s[14],q=s[3],W=s[7],Q=s[11],ne=s[15];return r[0]=a*C+o*E+c*U+l*q,r[4]=a*A+o*H+c*z+l*W,r[8]=a*Y+o*j+c*G+l*Q,r[12]=a*M+o*ae+c*X+l*ne,r[1]=u*C+h*E+d*U+f*q,r[5]=u*A+h*H+d*z+f*W,r[9]=u*Y+h*j+d*G+f*Q,r[13]=u*M+h*ae+d*X+f*ne,r[2]=g*C+_*E+m*U+p*q,r[6]=g*A+_*H+m*z+p*W,r[10]=g*Y+_*j+m*G+p*Q,r[14]=g*M+_*ae+m*X+p*ne,r[3]=S*C+v*E+R*U+I*q,r[7]=S*A+v*H+R*z+I*W,r[11]=S*Y+v*j+R*G+I*Q,r[15]=S*M+v*ae+R*X+I*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*f-n*c*f)+_*(+t*c*f-t*l*d+r*a*d-s*a*f+s*l*u-r*c*u)+m*(+t*l*h-t*o*f-r*a*h+n*a*f+r*o*u-n*l*u)+p*(-s*o*u-t*c*h+t*o*d+s*a*h-n*a*d+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],S=h*m*l-_*d*l+_*c*f-o*m*f-h*c*p+o*d*p,v=g*d*l-u*m*l-g*c*f+a*m*f+u*c*p-a*d*p,R=u*_*l-g*h*l+g*o*f-a*_*f-u*o*p+a*h*p,I=g*h*c-u*_*c-g*o*d+a*_*d+u*o*m-a*h*m,C=t*S+n*v+s*R+r*I;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/C;return e[0]=S*A,e[1]=(_*d*r-h*m*r-_*s*f+n*m*f+h*s*p-n*d*p)*A,e[2]=(o*m*r-_*c*r+_*s*l-n*m*l-o*s*p+n*c*p)*A,e[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*f-n*c*f)*A,e[4]=v*A,e[5]=(u*m*r-g*d*r+g*s*f-t*m*f-u*s*p+t*d*p)*A,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*p-t*c*p)*A,e[7]=(a*d*r-u*c*r+u*s*l-t*d*l-a*s*f+t*c*f)*A,e[8]=R*A,e[9]=(g*h*r-u*_*r-g*n*f+t*_*f+u*n*p-t*h*p)*A,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*p+t*o*p)*A,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*f-t*o*f)*A,e[12]=I*A,e[13]=(u*_*s-g*h*s+g*n*d-t*_*d-u*n*m+t*h*m)*A,e[14]=(g*o*s-a*_*s-g*n*c+t*_*c+a*n*m-t*o*m)*A,e[15]=(a*h*s-u*o*s+u*n*c-t*h*c-a*n*d+t*o*d)*A,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,d=r*l,f=r*u,g=r*h,_=a*u,m=a*h,p=o*h,S=c*l,v=c*u,R=c*h,I=n.x,C=n.y,A=n.z;return s[0]=(1-(_+p))*I,s[1]=(f+R)*I,s[2]=(g-v)*I,s[3]=0,s[4]=(f-R)*C,s[5]=(1-(d+p))*C,s[6]=(m+S)*C,s[7]=0,s[8]=(g+v)*A,s[9]=(m-S)*A,s[10]=(1-(d+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Yi.set(s[0],s[1],s[2]).length(),a=Yi.set(s[4],s[5],s[6]).length(),o=Yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],cn.copy(this);let l=1/r,u=1/a,h=1/o;return cn.elements[0]*=l,cn.elements[1]*=l,cn.elements[2]*=l,cn.elements[4]*=u,cn.elements[5]*=u,cn.elements[6]*=u,cn.elements[8]*=h,cn.elements[9]*=h,cn.elements[10]*=h,t.setFromRotationMatrix(cn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Fn){let c=this.elements,l=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s),f,g;if(o===Fn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===zo)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Fn){let c=this.elements,l=1/(t-e),u=1/(n-s),h=1/(a-r),d=(t+e)*l,f=(n+s)*u,g,_;if(o===Fn)g=(a+r)*h,_=-2*h;else if(o===zo)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Yi=new L,cn=new lt,zx=new L(0,0,0),Nx=new L(1,1,1),Jn=new L,ro=new L,jt=new L,Ud=new lt,Dd=new Rt,Ho=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Tt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Tt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ud.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ud,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Dd.setFromEuler(this),this.setFromQuaternion(Dd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ho.DEFAULT_ORDER="XYZ";var nr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ox=0,zd=new L,ji=new Rt,Un=new lt,oo=new L,Ws=new L,Fx=new L,Bx=new Rt,Nd=new L(1,0,0),Od=new L(0,1,0),Fd=new L(0,0,1),kx={type:"added"},Hx={type:"removed"},Mt=class i extends yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ox++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new L,t=new Ho,n=new Rt,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new lt},normalMatrix:{value:new Xe}}),this.matrix=new lt,this.matrixWorld=new lt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.multiply(ji),this}rotateOnWorldAxis(e,t){return ji.setFromAxisAngle(e,t),this.quaternion.premultiply(ji),this}rotateX(e){return this.rotateOnAxis(Nd,e)}rotateY(e){return this.rotateOnAxis(Od,e)}rotateZ(e){return this.rotateOnAxis(Fd,e)}translateOnAxis(e,t){return zd.copy(e).applyQuaternion(this.quaternion),this.position.add(zd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nd,e)}translateY(e){return this.translateOnAxis(Od,e)}translateZ(e){return this.translateOnAxis(Fd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?oo.copy(e):oo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ws.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Ws,oo,this.up):Un.lookAt(oo,Ws,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),ji.setFromRotationMatrix(Un),this.quaternion.premultiply(ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(kx)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hx)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Un.multiply(e.parent.matrixWorld)),e.applyMatrix4(Un),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,e,Fx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ws,Bx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++){let o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Mt.DEFAULT_UP=new L(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ln=new L,Dn=new L,Oc=new L,zn=new L,Zi=new L,$i=new L,Bd=new L,Fc=new L,Bc=new L,kc=new L,ao=!1,Ei=class i{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ln.subVectors(e,t),s.cross(ln);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ln.subVectors(s,t),Dn.subVectors(n,t),Oc.subVectors(e,t);let a=ln.dot(ln),o=ln.dot(Dn),c=ln.dot(Oc),l=Dn.dot(Dn),u=Dn.dot(Oc),h=a*l-o*o;if(h===0)return r.set(0,0,0),null;let d=1/h,f=(l*c-o*u)*d,g=(a*u-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getUV(e,t,n,s,r,a,o,c){return ao===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ao=!0),this.getInterpolation(e,t,n,s,r,a,o,c)}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,zn.x),c.addScaledVector(a,zn.y),c.addScaledVector(o,zn.z),c)}static isFrontFacing(e,t,n,s){return ln.subVectors(n,t),Dn.subVectors(e,t),ln.cross(Dn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ln.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),ln.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return ao===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ao=!0),i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Zi.subVectors(s,n),$i.subVectors(r,n),Fc.subVectors(e,n);let c=Zi.dot(Fc),l=$i.dot(Fc);if(c<=0&&l<=0)return t.copy(n);Bc.subVectors(e,s);let u=Zi.dot(Bc),h=$i.dot(Bc);if(u>=0&&h<=u)return t.copy(s);let d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Zi,a);kc.subVectors(e,r);let f=Zi.dot(kc),g=$i.dot(kc);if(g>=0&&f<=g)return t.copy(r);let _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector($i,o);let m=u*g-f*h;if(m<=0&&h-u>=0&&f-g>=0)return Bd.subVectors(r,s),o=(h-u)/(h-u+(f-g)),t.copy(s).addScaledVector(Bd,o);let p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(Zi,a).addScaledVector($i,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},kf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},co={h:0,s:0,l:0};function Hc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Oe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=Hl(e,1),t=Tt(t,0,1),n=Tt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Hc(a,r,e+1/3),this.g=Hc(a,r,e),this.b=Hc(a,r,e-1/3)}return et.toWorkingColorSpace(this,s),this}setStyle(e,t=dt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dt){let n=kf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=hs(e.r),this.g=hs(e.g),this.b=hs(e.b),this}copyLinearToSRGB(e){return this.r=Cc(e.r),this.g=Cc(e.g),this.b=Cc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dt){return et.fromWorkingColorSpace(At.copy(this),e),Math.round(Tt(At.r*255,0,255))*65536+Math.round(Tt(At.g*255,0,255))*256+Math.round(Tt(At.b*255,0,255))}getHexString(e=dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(At.copy(this),t);let n=At.r,s=At.g,r=At.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=dt){et.fromWorkingColorSpace(At.copy(this),e);let t=At.r,n=At.g,s=At.b;return e!==dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Kn),this.setHSL(Kn.h+e,Kn.s+t,Kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Kn),e.getHSL(co);let n=$s(Kn.h,co.h,t),s=$s(Kn.s,co.s,t),r=$s(Kn.l,co.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},At=new Oe;Oe.NAMES=kf;var Vx=0,Mn=class extends yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vx++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=us,this.side=nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qc,this.blendDst=el,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Co,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ad,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==us&&(n.blending=this.blending),this.side!==nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Qc&&(n.blendSrc=this.blendSrc),this.blendDst!==el&&(n.blendDst=this.blendDst),this.blendEquation!==bi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Co&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ad&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Vo=class extends Mn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Af,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var ut=new L,lo=new Se,ht=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=rl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ei,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)lo.fromBufferAttribute(this,t),lo.applyMatrix3(e),this.setXY(t,lo.x,lo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==rl&&(e.usage=this.usage),e}};var Go=class extends ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Wo=class extends ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var fn=class extends ht{constructor(e,t,n){super(new Float32Array(e),t,n)}};var Gx=0,Qt=new lt,Vc=new Mt,Ji=new L,Zt=new Vn,Xs=new Vn,vt=new L,Ct=class i extends yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gx++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bf(e)?Wo:Go)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Xe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qt.makeRotationFromQuaternion(e),this.applyMatrix4(Qt),this}rotateX(e){return Qt.makeRotationX(e),this.applyMatrix4(Qt),this}rotateY(e){return Qt.makeRotationY(e),this.applyMatrix4(Qt),this}rotateZ(e){return Qt.makeRotationZ(e),this.applyMatrix4(Qt),this}translate(e,t,n){return Qt.makeTranslation(e,t,n),this.applyMatrix4(Qt),this}scale(e,t,n){return Qt.makeScale(e,t,n),this.applyMatrix4(Qt),this}lookAt(e){return Vc.lookAt(e),Vc.updateMatrix(),this.applyMatrix4(Vc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(e){let t=[];for(let n=0,s=e.length;n<s;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new fn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Zt.setFromBufferAttribute(r),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){let n=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Xs.setFromBufferAttribute(o),this.morphTargetsRelative?(vt.addVectors(Zt.min,Xs.min),Zt.expandByPoint(vt),vt.addVectors(Zt.max,Xs.max),Zt.expandByPoint(vt)):(Zt.expandByPoint(Xs.min),Zt.expandByPoint(Xs.max))}Zt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)vt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(vt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)vt.fromBufferAttribute(o,l),c&&(Ji.fromBufferAttribute(e,l),vt.add(Ji)),s=Math.max(s,n.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ht(new Float32Array(4*o),4));let c=this.getAttribute("tangent").array,l=[],u=[];for(let E=0;E<o;E++)l[E]=new L,u[E]=new L;let h=new L,d=new L,f=new L,g=new Se,_=new Se,m=new Se,p=new L,S=new L;function v(E,H,j){h.fromArray(s,E*3),d.fromArray(s,H*3),f.fromArray(s,j*3),g.fromArray(a,E*2),_.fromArray(a,H*2),m.fromArray(a,j*2),d.sub(h),f.sub(h),_.sub(g),m.sub(g);let ae=1/(_.x*m.y-m.x*_.y);isFinite(ae)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-_.y).multiplyScalar(ae),S.copy(f).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(ae),l[E].add(p),l[H].add(p),l[j].add(p),u[E].add(S),u[H].add(S),u[j].add(S))}let R=this.groups;R.length===0&&(R=[{start:0,count:n.length}]);for(let E=0,H=R.length;E<H;++E){let j=R[E],ae=j.start,U=j.count;for(let z=ae,G=ae+U;z<G;z+=3)v(n[z+0],n[z+1],n[z+2])}let I=new L,C=new L,A=new L,Y=new L;function M(E){A.fromArray(r,E*3),Y.copy(A);let H=l[E];I.copy(H),I.sub(A.multiplyScalar(A.dot(H))).normalize(),C.crossVectors(Y,H);let ae=C.dot(u[E])<0?-1:1;c[E*4]=I.x,c[E*4+1]=I.y,c[E*4+2]=I.z,c[E*4+3]=ae}for(let E=0,H=R.length;E<H;++E){let j=R[E],ae=j.start,U=j.count;for(let z=ae,G=ae+U;z<G;z+=3)M(n[z+0]),M(n[z+1]),M(n[z+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new L,r=new L,a=new L,o=new L,c=new L,l=new L,u=new L,h=new L;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u),f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*u;for(let p=0;p<u;p++)d[g++]=l[f++]}return new ht(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){let d=l[u],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){let f=l[h];u.push(f.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],h=r[l];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},kd=new lt,vi=new si,uo=new Gn,Hd=new L,Ki=new L,Qi=new L,es=new L,Gc=new L,ho=new L,fo=new Se,po=new Se,mo=new Se,Vd=new L,Gd=new L,Wd=new L,go=new L,_o=new L,Bt=class extends Mt{constructor(e=new Ct,t=new Vo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){ho.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],h=r[c];u!==0&&(Gc.fromBufferAttribute(h,e),a?ho.addScaledVector(Gc,u):ho.addScaledVector(Gc.sub(t),u))}t.add(ho)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),uo.copy(n.boundingSphere),uo.applyMatrix4(r),vi.copy(e.ray).recast(e.near),!(uo.containsPoint(vi.origin)===!1&&(vi.intersectSphere(uo,Hd)===null||vi.origin.distanceToSquared(Hd)>(e.far-e.near)**2))&&(kd.copy(r).invert(),vi.copy(e.ray).applyMatrix4(kd),!(n.boundingBox!==null&&vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,vi)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let R=S,I=v;R<I;R+=3){let C=o.getX(R),A=o.getX(R+1),Y=o.getX(R+2);s=xo(this,p,e,n,l,u,h,C,A,Y),s&&(s.faceIndex=Math.floor(R/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let S=o.getX(m),v=o.getX(m+1),R=o.getX(m+2);s=xo(this,a,e,n,l,u,h,S,v,R),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let m=d[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let R=S,I=v;R<I;R+=3){let C=R,A=R+1,Y=R+2;s=xo(this,p,e,n,l,u,h,C,A,Y),s&&(s.faceIndex=Math.floor(R/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let S=m,v=m+1,R=m+2;s=xo(this,a,e,n,l,u,h,S,v,R),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Wx(i,e,t,n,s,r,a,o){let c;if(e.side===Ht?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===nn,o),c===null)return null;_o.copy(o),_o.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(_o);return l<t.near||l>t.far?null:{distance:l,point:_o.clone(),object:i}}function xo(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Ki),i.getVertexPosition(c,Qi),i.getVertexPosition(l,es);let u=Wx(i,e,t,n,Ki,Qi,es,go);if(u){s&&(fo.fromBufferAttribute(s,o),po.fromBufferAttribute(s,c),mo.fromBufferAttribute(s,l),u.uv=Ei.getInterpolation(go,Ki,Qi,es,fo,po,mo,new Se)),r&&(fo.fromBufferAttribute(r,o),po.fromBufferAttribute(r,c),mo.fromBufferAttribute(r,l),u.uv1=Ei.getInterpolation(go,Ki,Qi,es,fo,po,mo,new Se),u.uv2=u.uv1),a&&(Vd.fromBufferAttribute(a,o),Gd.fromBufferAttribute(a,c),Wd.fromBufferAttribute(a,l),u.normal=Ei.getInterpolation(go,Ki,Qi,es,Vd,Gd,Wd,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:c,c:l,normal:new L,materialIndex:0};Ei.getNormal(Ki,Qi,es,h.normal),u.face=h}return u}var Ri=class i extends Ct{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],h=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new fn(l,3)),this.setAttribute("normal",new fn(u,3)),this.setAttribute("uv",new fn(h,2));function g(_,m,p,S,v,R,I,C,A,Y,M){let E=R/A,H=I/Y,j=R/2,ae=I/2,U=C/2,z=A+1,G=Y+1,X=0,q=0,W=new L;for(let Q=0;Q<G;Q++){let ne=Q*H-ae;for(let fe=0;fe<z;fe++){let V=fe*E-j;W[_]=V*S,W[m]=ne*v,W[p]=U,l.push(W.x,W.y,W.z),W[_]=0,W[m]=0,W[p]=C>0?1:-1,u.push(W.x,W.y,W.z),h.push(fe/A),h.push(1-Q/Y),X+=1}}for(let Q=0;Q<Y;Q++)for(let ne=0;ne<A;ne++){let fe=d+ne+z*Q,V=d+ne+z*(Q+1),$=d+(ne+1)+z*(Q+1),de=d+(ne+1)+z*Q;c.push(fe,V,de),c.push(V,$,de),q+=6}o.addGroup(f,q,M),f+=q,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function gs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function zt(i){let e={};for(let t=0;t<i.length;t++){let n=gs(i[t]);for(let s in n)e[s]=n[s]}return e}function Xx(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Hf(i){return i.getRenderTarget()===null?i.outputColorSpace:et.workingColorSpace}var qx={clone:gs,merge:zt},Yx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Wn=class extends Mn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yx,this.fragmentShader=jx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gs(e.uniforms),this.uniformsGroups=Xx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Xo=class extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new lt,this.projectionMatrix=new lt,this.projectionMatrixInverse=new lt,this.coordinateSystem=Fn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ot=class extends Xo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=tr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Zs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return tr*2*Math.atan(Math.tan(Zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Zs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ts=-90,ns=1,ul=class extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ot(ts,ns,e,t);s.layers=this.layers,this.add(s);let r=new Ot(ts,ns,e,t);r.layers=this.layers,this.add(r);let a=new Ot(ts,ns,e,t);a.layers=this.layers,this.add(a);let o=new Ot(ts,ns,e,t);o.layers=this.layers,this.add(o);let c=new Ot(ts,ns,e,t);c.layers=this.layers,this.add(c);let l=new Ot(ts,ns,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===zo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},qo=class extends sn{constructor(e,t,n,s,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:fs,super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},hl=class extends Hn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Js("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ti?dt:tn),this.texture=new qo(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:en}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ri(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ht,blending:ti});r.uniforms.tEquirect.value=t;let a=new Bt(s,r),o=t.minFilter;return t.minFilter===Qs&&(t.minFilter=en),new ul(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},Wc=new L,Zx=new L,$x=new Xe,un=class{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Wc.subVectors(n,t).cross(Zx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Wc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||$x.getNormalMatrix(e),s=this.coplanarPoint(Wc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},yi=new Gn,vo=new L,ir=class{constructor(e=new un,t=new un,n=new un,s=new un,r=new un,a=new un){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn){let n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],h=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],S=s[13],v=s[14],R=s[15];if(n[0].setComponents(c-r,d-l,m-f,R-p).normalize(),n[1].setComponents(c+r,d+l,m+f,R+p).normalize(),n[2].setComponents(c+a,d+u,m+g,R+S).normalize(),n[3].setComponents(c-a,d-u,m-g,R-S).normalize(),n[4].setComponents(c-o,d-h,m-_,R-v).normalize(),t===Fn)n[5].setComponents(c+o,d+h,m+_,R+v).normalize();else if(t===zo)n[5].setComponents(o,h,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(e){return yi.center.set(0,0,0),yi.radius=.7071067811865476,yi.applyMatrix4(e.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(vo.x=s.normal.x>0?e.max.x:e.min.x,vo.y=s.normal.y>0?e.max.y:e.min.y,vo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(vo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Vf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Jx(i,e){let t=e.isWebGL2,n=new WeakMap;function s(l,u){let h=l.array,d=l.usage,f=h.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,h,d),l.onUploadCallback();let _;if(h instanceof Float32Array)_=i.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=i.SHORT;else if(h instanceof Uint32Array)_=i.UNSIGNED_INT;else if(h instanceof Int32Array)_=i.INT;else if(h instanceof Int8Array)_=i.BYTE;else if(h instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:f}}function r(l,u,h){let d=u.array,f=u._updateRange,g=u.updateRanges;if(i.bindBuffer(h,l),f.count===-1&&g.length===0&&i.bufferSubData(h,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){let p=g[_];t?i.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):i.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}f.count!==-1&&(t?i.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):i.bufferSubData(h,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);u&&(i.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){let d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);if(h===void 0)n.set(l,s(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,u),h.version=l.version}}return{get:a,remove:o,update:c}}var sr=class i extends Ct{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=e/o,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let S=p*d-a;for(let v=0;v<l;v++){let R=v*h-r;g.push(R,-S,0),_.push(0,0,1),m.push(v/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<o;S++){let v=S+l*p,R=S+l*(p+1),I=S+1+l*(p+1),C=S+1+l*p;f.push(v,R,C),f.push(R,I,C)}this.setIndex(f),this.setAttribute("position",new fn(g,3)),this.setAttribute("normal",new fn(_,3)),this.setAttribute("uv",new fn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Kx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qx=`#ifdef USE_ALPHAHASH
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
#endif`,ev=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nv=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,iv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sv=`#ifdef USE_AOMAP
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
#endif`,rv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ov=`#ifdef USE_BATCHING
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
#endif`,av=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,cv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,uv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,hv=`#ifdef USE_IRIDESCENCE
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
#endif`,dv=`#ifdef USE_BUMPMAP
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
#endif`,fv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_v=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,yv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Mv=`#define PI 3.141592653589793
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
} // validated`,bv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Sv=`vec3 transformedNormal = objectNormal;
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
#endif`,Ev=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Av=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cv=`
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
}`,Pv=`#ifdef USE_ENVMAP
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
#endif`,Lv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Iv=`#ifdef USE_ENVMAP
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
#endif`,Uv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dv=`#ifdef USE_ENVMAP
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
#endif`,zv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ov=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bv=`#ifdef USE_GRADIENTMAP
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
}`,kv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Hv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wv=`uniform bool receiveShadow;
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
#endif`,Xv=`#ifdef USE_ENVMAP
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
#endif`,qv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$v=`PhysicalMaterial material;
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
#endif`,Jv=`struct PhysicalMaterial {
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
}`,Kv=`
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
#endif`,Qv=`#if defined( RE_IndirectDiffuse )
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
#endif`,ey=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ty=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ny=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,sy=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ry=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,oy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ay=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cy=`#if defined( USE_POINTS_UV )
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
#endif`,ly=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,uy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hy=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dy=`#ifdef USE_MORPHNORMALS
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
#endif`,fy=`#ifdef USE_MORPHTARGETS
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
#endif`,py=`#ifdef USE_MORPHTARGETS
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
#endif`,my=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_y=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yy=`#ifdef USE_NORMALMAP
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
#endif`,My=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,by=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ey=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ay=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ty=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ry=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Py=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ly=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Iy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Uy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ny=`float getShadowMask() {
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
}`,Oy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fy=`#ifdef USE_SKINNING
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
#endif`,By=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ky=`#ifdef USE_SKINNING
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
#endif`,Hy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xy=`#ifdef USE_TRANSMISSION
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
#endif`,qy=`#ifdef USE_TRANSMISSION
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
#endif`,Yy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$y=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Jy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ky=`uniform sampler2D t2D;
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
}`,Qy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eM=`#ifdef ENVMAP_TYPE_CUBE
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
}`,tM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iM=`#include <common>
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
}`,sM=`#if DEPTH_PACKING == 3200
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
}`,rM=`#define DISTANCE
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
}`,oM=`#define DISTANCE
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
}`,aM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lM=`uniform float scale;
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
}`,uM=`uniform vec3 diffuse;
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
}`,hM=`#include <common>
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
}`,dM=`uniform vec3 diffuse;
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
}`,fM=`#define LAMBERT
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
}`,pM=`#define LAMBERT
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
}`,mM=`#define MATCAP
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
}`,gM=`#define MATCAP
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
}`,_M=`#define NORMAL
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
}`,xM=`#define NORMAL
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
}`,vM=`#define PHONG
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
}`,yM=`#define PHONG
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
}`,MM=`#define STANDARD
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
}`,bM=`#define STANDARD
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
}`,SM=`#define TOON
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
}`,EM=`#define TOON
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
}`,wM=`uniform float size;
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
}`,AM=`uniform vec3 diffuse;
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
}`,TM=`#include <common>
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
}`,RM=`uniform vec3 color;
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
}`,CM=`uniform float rotation;
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
}`,PM=`uniform vec3 diffuse;
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
}`,ke={alphahash_fragment:Kx,alphahash_pars_fragment:Qx,alphamap_fragment:ev,alphamap_pars_fragment:tv,alphatest_fragment:nv,alphatest_pars_fragment:iv,aomap_fragment:sv,aomap_pars_fragment:rv,batching_pars_vertex:ov,batching_vertex:av,begin_vertex:cv,beginnormal_vertex:lv,bsdfs:uv,iridescence_fragment:hv,bumpmap_pars_fragment:dv,clipping_planes_fragment:fv,clipping_planes_pars_fragment:pv,clipping_planes_pars_vertex:mv,clipping_planes_vertex:gv,color_fragment:_v,color_pars_fragment:xv,color_pars_vertex:vv,color_vertex:yv,common:Mv,cube_uv_reflection_fragment:bv,defaultnormal_vertex:Sv,displacementmap_pars_vertex:Ev,displacementmap_vertex:wv,emissivemap_fragment:Av,emissivemap_pars_fragment:Tv,colorspace_fragment:Rv,colorspace_pars_fragment:Cv,envmap_fragment:Pv,envmap_common_pars_fragment:Lv,envmap_pars_fragment:Iv,envmap_pars_vertex:Uv,envmap_physical_pars_fragment:Xv,envmap_vertex:Dv,fog_vertex:zv,fog_pars_vertex:Nv,fog_fragment:Ov,fog_pars_fragment:Fv,gradientmap_pars_fragment:Bv,lightmap_fragment:kv,lightmap_pars_fragment:Hv,lights_lambert_fragment:Vv,lights_lambert_pars_fragment:Gv,lights_pars_begin:Wv,lights_toon_fragment:qv,lights_toon_pars_fragment:Yv,lights_phong_fragment:jv,lights_phong_pars_fragment:Zv,lights_physical_fragment:$v,lights_physical_pars_fragment:Jv,lights_fragment_begin:Kv,lights_fragment_maps:Qv,lights_fragment_end:ey,logdepthbuf_fragment:ty,logdepthbuf_pars_fragment:ny,logdepthbuf_pars_vertex:iy,logdepthbuf_vertex:sy,map_fragment:ry,map_pars_fragment:oy,map_particle_fragment:ay,map_particle_pars_fragment:cy,metalnessmap_fragment:ly,metalnessmap_pars_fragment:uy,morphcolor_vertex:hy,morphnormal_vertex:dy,morphtarget_pars_vertex:fy,morphtarget_vertex:py,normal_fragment_begin:my,normal_fragment_maps:gy,normal_pars_fragment:_y,normal_pars_vertex:xy,normal_vertex:vy,normalmap_pars_fragment:yy,clearcoat_normal_fragment_begin:My,clearcoat_normal_fragment_maps:by,clearcoat_pars_fragment:Sy,iridescence_pars_fragment:Ey,opaque_fragment:wy,packing:Ay,premultiplied_alpha_fragment:Ty,project_vertex:Ry,dithering_fragment:Cy,dithering_pars_fragment:Py,roughnessmap_fragment:Ly,roughnessmap_pars_fragment:Iy,shadowmap_pars_fragment:Uy,shadowmap_pars_vertex:Dy,shadowmap_vertex:zy,shadowmask_pars_fragment:Ny,skinbase_vertex:Oy,skinning_pars_vertex:Fy,skinning_vertex:By,skinnormal_vertex:ky,specularmap_fragment:Hy,specularmap_pars_fragment:Vy,tonemapping_fragment:Gy,tonemapping_pars_fragment:Wy,transmission_fragment:Xy,transmission_pars_fragment:qy,uv_pars_fragment:Yy,uv_pars_vertex:jy,uv_vertex:Zy,worldpos_vertex:$y,background_vert:Jy,background_frag:Ky,backgroundCube_vert:Qy,backgroundCube_frag:eM,cube_vert:tM,cube_frag:nM,depth_vert:iM,depth_frag:sM,distanceRGBA_vert:rM,distanceRGBA_frag:oM,equirect_vert:aM,equirect_frag:cM,linedashed_vert:lM,linedashed_frag:uM,meshbasic_vert:hM,meshbasic_frag:dM,meshlambert_vert:fM,meshlambert_frag:pM,meshmatcap_vert:mM,meshmatcap_frag:gM,meshnormal_vert:_M,meshnormal_frag:xM,meshphong_vert:vM,meshphong_frag:yM,meshphysical_vert:MM,meshphysical_frag:bM,meshtoon_vert:SM,meshtoon_frag:EM,points_vert:wM,points_frag:AM,shadow_vert:TM,shadow_frag:RM,sprite_vert:CM,sprite_frag:PM},le={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},xn={basic:{uniforms:zt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:zt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Oe(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:zt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:zt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:zt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new Oe(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:zt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:zt([le.points,le.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:zt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:zt([le.common,le.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:zt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:zt([le.sprite,le.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:zt([le.common,le.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:zt([le.lights,le.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};xn.physical={uniforms:zt([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};var yo={r:0,b:0,g:0};function LM(i,e,t,n,s,r,a){let o=new Oe(0),c=r===!0?0:1,l,u,h=null,d=0,f=null;function g(m,p){let S=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?_(o,c):v&&v.isColor&&(_(v,1),S=!0);let R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===na)?(u===void 0&&(u=new Bt(new Ri(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:gs(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=et.getTransfer(v.colorSpace)!==it,(h!==v||d!==v.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,h=v,d=v.version,f=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Bt(new sr(2,2),new Wn({name:"BackgroundMaterial",uniforms:gs(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=et.getTransfer(v.colorSpace)!==it,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,f=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,p){m.getRGB(yo,Hf(i)),n.buffers.color.setClear(yo.r,yo.g,yo.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),c=p,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(o,c)},render:g}}function IM(i,e,t,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=m(null),l=c,u=!1;function h(U,z,G,X,q){let W=!1;if(a){let Q=_(X,G,z);l!==Q&&(l=Q,f(l.object)),W=p(U,X,G,q),W&&S(U,X,G,q)}else{let Q=z.wireframe===!0;(l.geometry!==X.id||l.program!==G.id||l.wireframe!==Q)&&(l.geometry=X.id,l.program=G.id,l.wireframe=Q,W=!0)}q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(W||u)&&(u=!1,Y(U,z,G,X),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function f(U){return n.isWebGL2?i.bindVertexArray(U):r.bindVertexArrayOES(U)}function g(U){return n.isWebGL2?i.deleteVertexArray(U):r.deleteVertexArrayOES(U)}function _(U,z,G){let X=G.wireframe===!0,q=o[U.id];q===void 0&&(q={},o[U.id]=q);let W=q[z.id];W===void 0&&(W={},q[z.id]=W);let Q=W[X];return Q===void 0&&(Q=m(d()),W[X]=Q),Q}function m(U){let z=[],G=[],X=[];for(let q=0;q<s;q++)z[q]=0,G[q]=0,X[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:G,attributeDivisors:X,object:U,attributes:{},index:null}}function p(U,z,G,X){let q=l.attributes,W=z.attributes,Q=0,ne=G.getAttributes();for(let fe in ne)if(ne[fe].location>=0){let $=q[fe],de=W[fe];if(de===void 0&&(fe==="instanceMatrix"&&U.instanceMatrix&&(de=U.instanceMatrix),fe==="instanceColor"&&U.instanceColor&&(de=U.instanceColor)),$===void 0||$.attribute!==de||de&&$.data!==de.data)return!0;Q++}return l.attributesNum!==Q||l.index!==X}function S(U,z,G,X){let q={},W=z.attributes,Q=0,ne=G.getAttributes();for(let fe in ne)if(ne[fe].location>=0){let $=W[fe];$===void 0&&(fe==="instanceMatrix"&&U.instanceMatrix&&($=U.instanceMatrix),fe==="instanceColor"&&U.instanceColor&&($=U.instanceColor));let de={};de.attribute=$,$&&$.data&&(de.data=$.data),q[fe]=de,Q++}l.attributes=q,l.attributesNum=Q,l.index=X}function v(){let U=l.newAttributes;for(let z=0,G=U.length;z<G;z++)U[z]=0}function R(U){I(U,0)}function I(U,z){let G=l.newAttributes,X=l.enabledAttributes,q=l.attributeDivisors;G[U]=1,X[U]===0&&(i.enableVertexAttribArray(U),X[U]=1),q[U]!==z&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](U,z),q[U]=z)}function C(){let U=l.newAttributes,z=l.enabledAttributes;for(let G=0,X=z.length;G<X;G++)z[G]!==U[G]&&(i.disableVertexAttribArray(G),z[G]=0)}function A(U,z,G,X,q,W,Q){Q===!0?i.vertexAttribIPointer(U,z,G,q,W):i.vertexAttribPointer(U,z,G,X,q,W)}function Y(U,z,G,X){if(n.isWebGL2===!1&&(U.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();let q=X.attributes,W=G.getAttributes(),Q=z.defaultAttributeValues;for(let ne in W){let fe=W[ne];if(fe.location>=0){let V=q[ne];if(V===void 0&&(ne==="instanceMatrix"&&U.instanceMatrix&&(V=U.instanceMatrix),ne==="instanceColor"&&U.instanceColor&&(V=U.instanceColor)),V!==void 0){let $=V.normalized,de=V.itemSize,ye=t.get(V);if(ye===void 0)continue;let xe=ye.buffer,Ue=ye.type,De=ye.bytesPerElement,Te=n.isWebGL2===!0&&(Ue===i.INT||Ue===i.UNSIGNED_INT||V.gpuType===Rf);if(V.isInterleavedBufferAttribute){let qe=V.data,N=qe.stride,mt=V.offset;if(qe.isInstancedInterleavedBuffer){for(let Ee=0;Ee<fe.locationSize;Ee++)I(fe.location+Ee,qe.meshPerAttribute);U.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=qe.meshPerAttribute*qe.count)}else for(let Ee=0;Ee<fe.locationSize;Ee++)R(fe.location+Ee);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Ee=0;Ee<fe.locationSize;Ee++)A(fe.location+Ee,de/fe.locationSize,Ue,$,N*De,(mt+de/fe.locationSize*Ee)*De,Te)}else{if(V.isInstancedBufferAttribute){for(let qe=0;qe<fe.locationSize;qe++)I(fe.location+qe,V.meshPerAttribute);U.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let qe=0;qe<fe.locationSize;qe++)R(fe.location+qe);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let qe=0;qe<fe.locationSize;qe++)A(fe.location+qe,de/fe.locationSize,Ue,$,de*De,de/fe.locationSize*qe*De,Te)}}else if(Q!==void 0){let $=Q[ne];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(fe.location,$);break;case 3:i.vertexAttrib3fv(fe.location,$);break;case 4:i.vertexAttrib4fv(fe.location,$);break;default:i.vertexAttrib1fv(fe.location,$)}}}}C()}function M(){j();for(let U in o){let z=o[U];for(let G in z){let X=z[G];for(let q in X)g(X[q].object),delete X[q];delete z[G]}delete o[U]}}function E(U){if(o[U.id]===void 0)return;let z=o[U.id];for(let G in z){let X=z[G];for(let q in X)g(X[q].object),delete X[q];delete z[G]}delete o[U.id]}function H(U){for(let z in o){let G=o[z];if(G[U.id]===void 0)continue;let X=G[U.id];for(let q in X)g(X[q].object),delete X[q];delete G[U.id]}}function j(){ae(),u=!0,l!==c&&(l=c,f(l.object))}function ae(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:j,resetDefaultState:ae,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:H,initAttributes:v,enableAttribute:R,disableUnusedAttributes:C}}function UM(i,e,t,n){let s=n.isWebGL2,r;function a(u){r=u}function o(u,h){i.drawArrays(r,u,h),t.update(h,r,1)}function c(u,h,d){if(d===0)return;let f,g;if(s)f=i,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,u,h,d),t.update(h,r,d)}function l(u,h,d){if(d===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(u[g],h[g]);else{f.multiDrawArraysWEBGL(r,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function DM(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext",o=t.precision!==void 0?t.precision:"highp",c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);let l=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,R=a||e.has("OES_texture_float"),I=v&&R,C=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:S,vertexTextures:v,floatFragmentTextures:R,floatVertexTextures:I,maxSamples:C}}function zM(i){let e=this,t=null,n=0,s=!1,r=!1,a=new un,o=new Xe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||n!==0||s;return s=d,n=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){let g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{let S=r?0:n,v=S*4,R=p.clippingState||null;c.value=R,R=u(g,d,v,f);for(let I=0;I!==v;++I)R[I]=t[I];p.clippingState=R,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,g){let _=h!==null?h.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=f+_*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,R=f;v!==_;++v,R+=4)a.copy(h[v]).applyMatrix4(S,o),a.normal.toArray(m,R),m[R+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function NM(i){let e=new WeakMap;function t(a,o){return o===tl?a.mapping=fs:o===nl&&(a.mapping=ps),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===tl||o===nl)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new hl(c.height/2);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var Yo=class extends Xo{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},cs=4,Xd=[.125,.215,.35,.446,.526,.582],Si=20,Xc=new Yo,qd=new Oe,qc=null,Yc=0,jc=0,Mi=(1+Math.sqrt(5))/2,is=1/Mi,Yd=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,Mi,is),new L(0,Mi,-is),new L(is,0,Mi),new L(-is,0,Mi),new L(Mi,is,0),new L(-Mi,is,0)],jo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){qc=this._renderer.getRenderTarget(),Yc=this._renderer.getActiveCubeFace(),jc=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$d(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(qc,Yc,jc),e.scissorTest=!1,Mo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fs||e.mapping===ps?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qc=this._renderer.getRenderTarget(),Yc=this._renderer.getActiveCubeFace(),jc=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:er,format:dn,colorSpace:kn,depthBuffer:!1},s=jd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jd(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=OM(r)),this._blurMaterial=FM(r,e,t)}return s}_compileMaterial(e){let t=new Bt(this._lodPlanes[0],e);this._renderer.compile(t,Xc)}_sceneToCubeUV(e,t,n,s){let o=new Ot(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(qd),u.toneMapping=ni,u.autoClear=!1;let f=new Vo({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1}),g=new Bt(new Ri,f),_=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(qd),_=!0);for(let p=0;p<6;p++){let S=p%3;S===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):S===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));let v=this._cubeSize;Mo(s,S*v,p>2?v:0,v,v),u.setRenderTarget(s),_&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===fs||e.mapping===ps;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$d()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zd());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Bt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let c=this._cubeSize;Mo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Xc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Yd[(s-1)%Yd.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Bt(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Si-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Si;m>Si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Si}`);let p=[],S=0;for(let A=0;A<Si;++A){let Y=A/_,M=Math.exp(-Y*Y/2);p.push(M),A===0?S+=M:A<m&&(S+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;let R=this._sizeLods[s],I=3*R*(s>v-cs?s-v+cs:0),C=4*(this._cubeSize-R);Mo(t,I,C,3*R,2*R),c.setRenderTarget(t),c.render(h,Xc)}};function OM(i){let e=[],t=[],n=[],s=i,r=i-cs+1+Xd.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let c=1/o;a>i-cs?c=Xd[a-i+cs-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*f),v=new Float32Array(m*g*f),R=new Float32Array(p*g*f);for(let C=0;C<f;C++){let A=C%3*2/3-1,Y=C>2?0:-1,M=[A,Y,0,A+2/3,Y,0,A+2/3,Y+1,0,A,Y,0,A+2/3,Y+1,0,A,Y+1,0];S.set(M,_*g*C),v.set(d,m*g*C);let E=[C,C,C,C,C,C];R.set(E,p*g*C)}let I=new Ct;I.setAttribute("position",new ht(S,_)),I.setAttribute("uv",new ht(v,m)),I.setAttribute("faceIndex",new ht(R,p)),e.push(I),s>cs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function jd(i,e,t){let n=new Hn(i,e,t);return n.texture.mapping=na,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Mo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function FM(i,e,t){let n=new Float32Array(Si),s=new L(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:Si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Vl(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Zd(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vl(),fragmentShader:`

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
		`,blending:ti,depthTest:!1,depthWrite:!1})}function $d(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ti,depthTest:!1,depthWrite:!1})}function Vl(){return`

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
	`}function BM(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===tl||c===nl,u=c===fs||c===ps;if(l||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new jo(i)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{let h=o.image;if(l&&h&&h.height>0||u&&h&&s(h)){t===null&&(t=new jo(i));let d=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function s(o){let c=0,l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function kM(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function HM(i,e,t,n){let s={},r=new WeakMap;function a(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);for(let g in d.morphAttributes){let _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",a),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(h){let d=h.attributes;for(let g in d)e.update(d[g],i.ARRAY_BUFFER);let f=h.morphAttributes;for(let g in f){let _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(h){let d=[],f=h.index,g=h.attributes.position,_=0;if(f!==null){let S=f.array;_=f.version;for(let v=0,R=S.length;v<R;v+=3){let I=S[v+0],C=S[v+1],A=S[v+2];d.push(I,C,C,A,A,I)}}else if(g!==void 0){let S=g.array;_=g.version;for(let v=0,R=S.length/3-1;v<R;v+=3){let I=v+0,C=v+1,A=v+2;d.push(I,C,C,A,A,I)}}else return;let m=new(Bf(d)?Wo:Go)(d,1);m.version=_;let p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){let d=r.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function VM(i,e,t,n){let s=n.isWebGL2,r;function a(f){r=f}let o,c;function l(f){o=f.type,c=f.bytesPerElement}function u(f,g){i.drawElements(r,g,o,f*c),t.update(g,r,1)}function h(f,g,_){if(_===0)return;let m,p;if(s)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,o,f*c,_),t.update(g,r,_)}function d(f,g,_){if(_===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(f[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,o,f,0,_);let p=0;for(let S=0;S<_;S++)p+=g[S];t.update(p,r,1)}}this.setMode=a,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function GM(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function WM(i,e){return i[0]-e[0]}function XM(i,e){return Math.abs(e[1])-Math.abs(i[1])}function qM(i,e,t){let n={},s=new Float32Array(8),r=new WeakMap,a=new yt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,u,h){let d=l.morphTargetInfluences;if(e.isWebGL2===!0){let f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=f!==void 0?f.length:0,_=r.get(u);if(_===void 0||_.count!==g){let U=function(){j.dispose(),r.delete(u),u.removeEventListener("dispose",U)};_!==void 0&&_.texture.dispose();let S=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,R=u.morphAttributes.color!==void 0,I=u.morphAttributes.position||[],C=u.morphAttributes.normal||[],A=u.morphAttributes.color||[],Y=0;S===!0&&(Y=1),v===!0&&(Y=2),R===!0&&(Y=3);let M=u.attributes.position.count*Y,E=1;M>e.maxTextureSize&&(E=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let H=new Float32Array(M*E*4*g),j=new ko(H,M,E,g);j.type=ei,j.needsUpdate=!0;let ae=Y*4;for(let z=0;z<g;z++){let G=I[z],X=C[z],q=A[z],W=M*E*4*z;for(let Q=0;Q<G.count;Q++){let ne=Q*ae;S===!0&&(a.fromBufferAttribute(G,Q),H[W+ne+0]=a.x,H[W+ne+1]=a.y,H[W+ne+2]=a.z,H[W+ne+3]=0),v===!0&&(a.fromBufferAttribute(X,Q),H[W+ne+4]=a.x,H[W+ne+5]=a.y,H[W+ne+6]=a.z,H[W+ne+7]=0),R===!0&&(a.fromBufferAttribute(q,Q),H[W+ne+8]=a.x,H[W+ne+9]=a.y,H[W+ne+10]=a.z,H[W+ne+11]=q.itemSize===4?a.w:1)}}_={count:g,texture:j,size:new Se(M,E)},r.set(u,_),u.addEventListener("dispose",U)}let m=0;for(let S=0;S<d.length;S++)m+=d[S];let p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",p),h.getUniforms().setValue(i,"morphTargetInfluences",d),h.getUniforms().setValue(i,"morphTargetsTexture",_.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}else{let f=d===void 0?0:d.length,g=n[u.id];if(g===void 0||g.length!==f){g=[];for(let v=0;v<f;v++)g[v]=[v,0];n[u.id]=g}for(let v=0;v<f;v++){let R=g[v];R[0]=v,R[1]=d[v]}g.sort(XM);for(let v=0;v<8;v++)v<f&&g[v][1]?(o[v][0]=g[v][0],o[v][1]=g[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(WM);let _=u.morphAttributes.position,m=u.morphAttributes.normal,p=0;for(let v=0;v<8;v++){let R=o[v],I=R[0],C=R[1];I!==Number.MAX_SAFE_INTEGER&&C?(_&&u.getAttribute("morphTarget"+v)!==_[I]&&u.setAttribute("morphTarget"+v,_[I]),m&&u.getAttribute("morphNormal"+v)!==m[I]&&u.setAttribute("morphNormal"+v,m[I]),s[v]=C,p+=C):(_&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),m&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),s[v]=0)}let S=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(i,"morphTargetBaseInfluence",S),h.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function YM(i,e,t,n){let s=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}var Zo=class extends sn{constructor(e,t,n,s,r,a,o,c,l,u){if(u=u!==void 0?u:Ai,u!==Ai&&u!==ms)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ai&&(n=Qn),n===void 0&&u===ms&&(n=wi),super(null,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Nt,this.minFilter=c!==void 0?c:Nt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Gf=new sn,Wf=new Zo(1,1);Wf.compareFunction=Of;var Xf=new ko,qf=new ll,Yf=new qo,Jd=[],Kd=[],Qd=new Float32Array(16),ef=new Float32Array(9),tf=new Float32Array(4);function Ms(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Jd[s];if(r===void 0&&(r=new Float32Array(s),Jd[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function pt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function sa(i,e){let t=Kd[e];t===void 0&&(t=new Int32Array(e),Kd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function jM(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ZM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2fv(this.addr,e),pt(t,e)}}function $M(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;i.uniform3fv(this.addr,e),pt(t,e)}}function JM(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4fv(this.addr,e),pt(t,e)}}function KM(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;tf.set(n),i.uniformMatrix2fv(this.addr,!1,tf),pt(t,n)}}function QM(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;ef.set(n),i.uniformMatrix3fv(this.addr,!1,ef),pt(t,n)}}function eb(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,n))return;Qd.set(n),i.uniformMatrix4fv(this.addr,!1,Qd),pt(t,n)}}function tb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function nb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2iv(this.addr,e),pt(t,e)}}function ib(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;i.uniform3iv(this.addr,e),pt(t,e)}}function sb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4iv(this.addr,e),pt(t,e)}}function rb(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ob(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;i.uniform2uiv(this.addr,e),pt(t,e)}}function ab(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;i.uniform3uiv(this.addr,e),pt(t,e)}}function cb(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;i.uniform4uiv(this.addr,e),pt(t,e)}}function lb(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?Wf:Gf;t.setTexture2D(e||r,s)}function ub(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||qf,s)}function hb(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Yf,s)}function db(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Xf,s)}function fb(i){switch(i){case 5126:return jM;case 35664:return ZM;case 35665:return $M;case 35666:return JM;case 35674:return KM;case 35675:return QM;case 35676:return eb;case 5124:case 35670:return tb;case 35667:case 35671:return nb;case 35668:case 35672:return ib;case 35669:case 35673:return sb;case 5125:return rb;case 36294:return ob;case 36295:return ab;case 36296:return cb;case 35678:case 36198:case 36298:case 36306:case 35682:return lb;case 35679:case 36299:case 36307:return ub;case 35680:case 36300:case 36308:case 36293:return hb;case 36289:case 36303:case 36311:case 36292:return db}}function pb(i,e){i.uniform1fv(this.addr,e)}function mb(i,e){let t=Ms(e,this.size,2);i.uniform2fv(this.addr,t)}function gb(i,e){let t=Ms(e,this.size,3);i.uniform3fv(this.addr,t)}function _b(i,e){let t=Ms(e,this.size,4);i.uniform4fv(this.addr,t)}function xb(i,e){let t=Ms(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function vb(i,e){let t=Ms(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function yb(i,e){let t=Ms(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Mb(i,e){i.uniform1iv(this.addr,e)}function bb(i,e){i.uniform2iv(this.addr,e)}function Sb(i,e){i.uniform3iv(this.addr,e)}function Eb(i,e){i.uniform4iv(this.addr,e)}function wb(i,e){i.uniform1uiv(this.addr,e)}function Ab(i,e){i.uniform2uiv(this.addr,e)}function Tb(i,e){i.uniform3uiv(this.addr,e)}function Rb(i,e){i.uniform4uiv(this.addr,e)}function Cb(i,e,t){let n=this.cache,s=e.length,r=sa(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Gf,r[a])}function Pb(i,e,t){let n=this.cache,s=e.length,r=sa(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||qf,r[a])}function Lb(i,e,t){let n=this.cache,s=e.length,r=sa(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Yf,r[a])}function Ib(i,e,t){let n=this.cache,s=e.length,r=sa(t,s);ft(n,r)||(i.uniform1iv(this.addr,r),pt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Xf,r[a])}function Ub(i){switch(i){case 5126:return pb;case 35664:return mb;case 35665:return gb;case 35666:return _b;case 35674:return xb;case 35675:return vb;case 35676:return yb;case 5124:case 35670:return Mb;case 35667:case 35671:return bb;case 35668:case 35672:return Sb;case 35669:case 35673:return Eb;case 5125:return wb;case 36294:return Ab;case 36295:return Tb;case 36296:return Rb;case 35678:case 36198:case 36298:case 36306:case 35682:return Cb;case 35679:case 36299:case 36307:return Pb;case 35680:case 36300:case 36308:case 36293:return Lb;case 36289:case 36303:case 36311:case 36292:return Ib}}var dl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=fb(t.type)}},fl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ub(t.type)}},pl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Zc=/(\w+)(\])?(\[|\.)?/g;function nf(i,e){i.seq.push(e),i.map[e.id]=e}function Db(i,e,t){let n=i.name,s=n.length;for(Zc.lastIndex=0;;){let r=Zc.exec(n),a=Zc.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){nf(t,l===void 0?new dl(o,i,e):new fl(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new pl(o),nf(t,h)),t=h}}}var ds=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Db(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function sf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var zb=37297,Nb=0;function Ob(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Fb(i){let e=et.getPrimaries(et.workingColorSpace),t=et.getPrimaries(i),n;switch(e===t?n="":e===Do&&t===Uo?n="LinearDisplayP3ToLinearSRGB":e===Uo&&t===Do&&(n="LinearSRGBToLinearDisplayP3"),i){case kn:case ia:return[n,"LinearTransferOETF"];case dt:case kl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function rf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Ob(i.getShaderSource(e),a)}else return s}function Bb(i,e){let t=Fb(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function kb(i,e){let t;switch(e){case X_:t="Linear";break;case q_:t="Reinhard";break;case Y_:t="OptimizedCineon";break;case j_:t="ACESFilmic";break;case $_:t="AgX";break;case Z_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Hb(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ls).join(`
`)}function Vb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ls).join(`
`)}function Gb(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Wb(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ls(i){return i!==""}function of(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function af(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Xb=/^[ \t]*#include +<([\w\d./]+)>/gm;function ml(i){return i.replace(Xb,Yb)}var qb=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Yb(i,e){let t=ke[e];if(t===void 0){let n=qb.get(e);if(n!==void 0)t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ml(t)}var jb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cf(i){return i.replace(jb,Zb)}function Zb(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function lf(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function $b(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===wf?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===v_?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Nn&&(e="SHADOWMAP_TYPE_VSM"),e}function Jb(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case fs:case ps:e="ENVMAP_TYPE_CUBE";break;case na:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Kb(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ps:e="ENVMAP_MODE_REFRACTION";break}return e}function Qb(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Af:e="ENVMAP_BLENDING_MULTIPLY";break;case G_:e="ENVMAP_BLENDING_MIX";break;case W_:e="ENVMAP_BLENDING_ADD";break}return e}function eS(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function tS(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=$b(t),l=Jb(t),u=Kb(t),h=Qb(t),d=eS(t),f=t.isWebGL2?"":Hb(t),g=Vb(t),_=Gb(r),m=s.createProgram(),p,S,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ls).join(`
`),p.length>0&&(p+=`
`),S=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ls).join(`
`),S.length>0&&(S+=`
`)):(p=[lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ls).join(`
`),S=[f,lf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ni?"#define TONE_MAPPING":"",t.toneMapping!==ni?ke.tonemapping_pars_fragment:"",t.toneMapping!==ni?kb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,Bb("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ls).join(`
`)),a=ml(a),a=of(a,t),a=af(a,t),o=ml(o),o=of(o,t),o=af(o,t),a=cf(a),o=cf(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Td?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Td?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);let R=v+p+a,I=v+S+o,C=sf(s,s.VERTEX_SHADER,R),A=sf(s,s.FRAGMENT_SHADER,I);s.attachShader(m,C),s.attachShader(m,A),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function Y(j){if(i.debug.checkShaderErrors){let ae=s.getProgramInfoLog(m).trim(),U=s.getShaderInfoLog(C).trim(),z=s.getShaderInfoLog(A).trim(),G=!0,X=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,C,A);else{let q=rf(s,C,"vertex"),W=rf(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+ae+`
`+q+`
`+W)}else ae!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ae):(U===""||z==="")&&(X=!1);X&&(j.diagnostics={runnable:G,programLog:ae,vertexShader:{log:U,prefix:p},fragmentShader:{log:z,prefix:S}})}s.deleteShader(C),s.deleteShader(A),M=new ds(s,m),E=Wb(s,m)}let M;this.getUniforms=function(){return M===void 0&&Y(this),M};let E;this.getAttributes=function(){return E===void 0&&Y(this),E};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=s.getProgramParameter(m,zb)),H},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Nb++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=C,this.fragmentShader=A,this}var nS=0,gl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new _l(e),t.set(e,n)),n}},_l=class{constructor(e){this.id=nS++,this.code=e,this.usedTimes=0}};function iS(i,e,t,n,s,r,a){let o=new nr,c=new gl,l=[],u=s.isWebGL2,h=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,E,H,j,ae){let U=j.fog,z=ae.geometry,G=M.isMeshStandardMaterial?j.environment:null,X=(M.isMeshStandardMaterial?t:e).get(M.envMap||G),q=X&&X.mapping===na?X.image.height:null,W=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let Q=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ne=Q!==void 0?Q.length:0,fe=0;z.morphAttributes.position!==void 0&&(fe=1),z.morphAttributes.normal!==void 0&&(fe=2),z.morphAttributes.color!==void 0&&(fe=3);let V,$,de,ye;if(W){let Pt=xn[W];V=Pt.vertexShader,$=Pt.fragmentShader}else V=M.vertexShader,$=M.fragmentShader,c.update(M),de=c.getVertexShaderID(M),ye=c.getFragmentShaderID(M);let xe=i.getRenderTarget(),Ue=ae.isInstancedMesh===!0,De=ae.isBatchedMesh===!0,Te=!!M.map,qe=!!M.matcap,N=!!X,mt=!!M.aoMap,Ee=!!M.lightMap,Le=!!M.bumpMap,ge=!!M.normalMap,nt=!!M.displacementMap,ze=!!M.emissiveMap,b=!!M.metalnessMap,x=!!M.roughnessMap,O=M.anisotropy>0,te=M.clearcoat>0,K=M.iridescence>0,ee=M.sheen>0,_e=M.transmission>0,ue=O&&!!M.anisotropyMap,me=te&&!!M.clearcoatMap,Re=te&&!!M.clearcoatNormalMap,Fe=te&&!!M.clearcoatRoughnessMap,J=K&&!!M.iridescenceMap,Ye=K&&!!M.iridescenceThicknessMap,w=ee&&!!M.sheenColorMap,Z=ee&&!!M.sheenRoughnessMap,ce=!!M.specularMap,ie=!!M.specularColorMap,ve=!!M.specularIntensityMap,Ge=_e&&!!M.transmissionMap,je=_e&&!!M.thicknessMap,He=!!M.gradientMap,oe=!!M.alphaMap,P=M.alphaTest>0,se=!!M.alphaHash,re=!!M.extensions,we=!!z.attributes.uv1,Me=!!z.attributes.uv2,Ze=!!z.attributes.uv3,Je=ni;return M.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(Je=i.toneMapping),{isWebGL2:u,shaderID:W,shaderType:M.type,shaderName:M.name,vertexShader:V,fragmentShader:$,defines:M.defines,customVertexShaderID:de,customFragmentShaderID:ye,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:De,instancing:Ue,instancingColor:Ue&&ae.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:kn,map:Te,matcap:qe,envMap:N,envMapMode:N&&X.mapping,envMapCubeUVHeight:q,aoMap:mt,lightMap:Ee,bumpMap:Le,normalMap:ge,displacementMap:d&&nt,emissiveMap:ze,normalMapObjectSpace:ge&&M.normalMapType===cx,normalMapTangentSpace:ge&&M.normalMapType===Nf,metalnessMap:b,roughnessMap:x,anisotropy:O,anisotropyMap:ue,clearcoat:te,clearcoatMap:me,clearcoatNormalMap:Re,clearcoatRoughnessMap:Fe,iridescence:K,iridescenceMap:J,iridescenceThicknessMap:Ye,sheen:ee,sheenColorMap:w,sheenRoughnessMap:Z,specularMap:ce,specularColorMap:ie,specularIntensityMap:ve,transmission:_e,transmissionMap:Ge,thicknessMap:je,gradientMap:He,opaque:M.transparent===!1&&M.blending===us,alphaMap:oe,alphaTest:P,alphaHash:se,combine:M.combine,mapUv:Te&&_(M.map.channel),aoMapUv:mt&&_(M.aoMap.channel),lightMapUv:Ee&&_(M.lightMap.channel),bumpMapUv:Le&&_(M.bumpMap.channel),normalMapUv:ge&&_(M.normalMap.channel),displacementMapUv:nt&&_(M.displacementMap.channel),emissiveMapUv:ze&&_(M.emissiveMap.channel),metalnessMapUv:b&&_(M.metalnessMap.channel),roughnessMapUv:x&&_(M.roughnessMap.channel),anisotropyMapUv:ue&&_(M.anisotropyMap.channel),clearcoatMapUv:me&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Re&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:w&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Z&&_(M.sheenRoughnessMap.channel),specularMapUv:ce&&_(M.specularMap.channel),specularColorMapUv:ie&&_(M.specularColorMap.channel),specularIntensityMapUv:ve&&_(M.specularIntensityMap.channel),transmissionMapUv:Ge&&_(M.transmissionMap.channel),thicknessMapUv:je&&_(M.thicknessMap.channel),alphaMapUv:oe&&_(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(ge||O),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:Me,vertexUv3s:Ze,pointsUvs:ae.isPoints===!0&&!!z.attributes.uv&&(Te||oe),fog:!!U,useFog:M.fog===!0,fogExp2:U&&U.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:ae.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:fe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&H.length>0,shadowMapType:i.shadowMap.type,toneMapping:Je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Te&&M.map.isVideoTexture===!0&&et.getTransfer(M.map.colorSpace)===it,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===On,flipSided:M.side===Ht,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:re&&M.extensions.derivatives===!0,extensionFragDepth:re&&M.extensions.fragDepth===!0,extensionDrawBuffers:re&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:re&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){let E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(let H in M.defines)E.push(H),E.push(M.defines[H]);return M.isRawShaderMaterial===!1&&(S(E,M),v(E,M),E.push(i.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function S(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function v(M,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),M.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function R(M){let E=g[M.type],H;if(E){let j=xn[E];H=qx.clone(j.uniforms)}else H=M.uniforms;return H}function I(M,E){let H;for(let j=0,ae=l.length;j<ae;j++){let U=l[j];if(U.cacheKey===E){H=U,++H.usedTimes;break}}return H===void 0&&(H=new tS(i,E,M,r),l.push(H)),H}function C(M){if(--M.usedTimes===0){let E=l.indexOf(M);l[E]=l[l.length-1],l.pop(),M.destroy()}}function A(M){c.remove(M)}function Y(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:R,acquireProgram:I,releaseProgram:C,releaseShaderCache:A,programs:l,dispose:Y}}function sS(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function rS(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function uf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:h.id,object:h,geometry:d,material:f,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},i[e]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function o(h,d,f,g,_,m){let p=a(h,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(h,d,f,g,_,m){let p=a(h,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(h,d){t.length>1&&t.sort(h||rS),n.length>1&&n.sort(d||uf),s.length>1&&s.sort(d||uf)}function u(){for(let h=e,d=i.length;h<d;h++){let f=i[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function oS(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new hf,i.set(n,[a])):s>=r.length?(a=new hf,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function aS(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Oe};break;case"SpotLight":t={position:new L,direction:new L,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function cS(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var lS=0;function uS(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function hS(i,e){let t=new aS,n=cS(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new L);let r=new L,a=new lt,o=new lt;function c(u,h){let d=0,f=0,g=0;for(let j=0;j<9;j++)s.probe[j].set(0,0,0);let _=0,m=0,p=0,S=0,v=0,R=0,I=0,C=0,A=0,Y=0,M=0;u.sort(uS);let E=h===!0?Math.PI:1;for(let j=0,ae=u.length;j<ae;j++){let U=u[j],z=U.color,G=U.intensity,X=U.distance,q=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)d+=z.r*G*E,f+=z.g*G*E,g+=z.b*G*E;else if(U.isLightProbe){for(let W=0;W<9;W++)s.probe[W].addScaledVector(U.sh.coefficients[W],G);M++}else if(U.isDirectionalLight){let W=t.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity*E),U.castShadow){let Q=U.shadow,ne=n.get(U);ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,s.directionalShadow[_]=ne,s.directionalShadowMap[_]=q,s.directionalShadowMatrix[_]=U.shadow.matrix,R++}s.directional[_]=W,_++}else if(U.isSpotLight){let W=t.get(U);W.position.setFromMatrixPosition(U.matrixWorld),W.color.copy(z).multiplyScalar(G*E),W.distance=X,W.coneCos=Math.cos(U.angle),W.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),W.decay=U.decay,s.spot[p]=W;let Q=U.shadow;if(U.map&&(s.spotLightMap[A]=U.map,A++,Q.updateMatrices(U),U.castShadow&&Y++),s.spotLightMatrix[p]=Q.matrix,U.castShadow){let ne=n.get(U);ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,s.spotShadow[p]=ne,s.spotShadowMap[p]=q,C++}p++}else if(U.isRectAreaLight){let W=t.get(U);W.color.copy(z).multiplyScalar(G),W.halfWidth.set(U.width*.5,0,0),W.halfHeight.set(0,U.height*.5,0),s.rectArea[S]=W,S++}else if(U.isPointLight){let W=t.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity*E),W.distance=U.distance,W.decay=U.decay,U.castShadow){let Q=U.shadow,ne=n.get(U);ne.shadowBias=Q.bias,ne.shadowNormalBias=Q.normalBias,ne.shadowRadius=Q.radius,ne.shadowMapSize=Q.mapSize,ne.shadowCameraNear=Q.camera.near,ne.shadowCameraFar=Q.camera.far,s.pointShadow[m]=ne,s.pointShadowMap[m]=q,s.pointShadowMatrix[m]=U.shadow.matrix,I++}s.point[m]=W,m++}else if(U.isHemisphereLight){let W=t.get(U);W.skyColor.copy(U.color).multiplyScalar(G*E),W.groundColor.copy(U.groundColor).multiplyScalar(G*E),s.hemi[v]=W,v++}}S>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=le.LTC_FLOAT_1,s.rectAreaLTC2=le.LTC_FLOAT_2):(s.rectAreaLTC1=le.LTC_HALF_1,s.rectAreaLTC2=le.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=le.LTC_FLOAT_1,s.rectAreaLTC2=le.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=le.LTC_HALF_1,s.rectAreaLTC2=le.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=f,s.ambient[2]=g;let H=s.hash;(H.directionalLength!==_||H.pointLength!==m||H.spotLength!==p||H.rectAreaLength!==S||H.hemiLength!==v||H.numDirectionalShadows!==R||H.numPointShadows!==I||H.numSpotShadows!==C||H.numSpotMaps!==A||H.numLightProbes!==M)&&(s.directional.length=_,s.spot.length=p,s.rectArea.length=S,s.point.length=m,s.hemi.length=v,s.directionalShadow.length=R,s.directionalShadowMap.length=R,s.pointShadow.length=I,s.pointShadowMap.length=I,s.spotShadow.length=C,s.spotShadowMap.length=C,s.directionalShadowMatrix.length=R,s.pointShadowMatrix.length=I,s.spotLightMatrix.length=C+A-Y,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=Y,s.numLightProbes=M,H.directionalLength=_,H.pointLength=m,H.spotLength=p,H.rectAreaLength=S,H.hemiLength=v,H.numDirectionalShadows=R,H.numPointShadows=I,H.numSpotShadows=C,H.numSpotMaps=A,H.numLightProbes=M,s.version=lS++)}function l(u,h){let d=0,f=0,g=0,_=0,m=0,p=h.matrixWorldInverse;for(let S=0,v=u.length;S<v;S++){let R=u[S];if(R.isDirectionalLight){let I=s.directional[d];I.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(p),d++}else if(R.isSpotLight){let I=s.spot[g];I.position.setFromMatrixPosition(R.matrixWorld),I.position.applyMatrix4(p),I.direction.setFromMatrixPosition(R.matrixWorld),r.setFromMatrixPosition(R.target.matrixWorld),I.direction.sub(r),I.direction.transformDirection(p),g++}else if(R.isRectAreaLight){let I=s.rectArea[_];I.position.setFromMatrixPosition(R.matrixWorld),I.position.applyMatrix4(p),o.identity(),a.copy(R.matrixWorld),a.premultiply(p),o.extractRotation(a),I.halfWidth.set(R.width*.5,0,0),I.halfHeight.set(0,R.height*.5,0),I.halfWidth.applyMatrix4(o),I.halfHeight.applyMatrix4(o),_++}else if(R.isPointLight){let I=s.point[f];I.position.setFromMatrixPosition(R.matrixWorld),I.position.applyMatrix4(p),f++}else if(R.isHemisphereLight){let I=s.hemi[m];I.direction.setFromMatrixPosition(R.matrixWorld),I.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:s}}function df(i,e){let t=new hS(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(h){n.push(h)}function o(h){s.push(h)}function c(h){t.setup(n,h)}function l(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function dS(i,e){let t=new WeakMap;function n(r,a=0){let o=t.get(r),c;return o===void 0?(c=new df(i,e),t.set(r,[c])):a>=o.length?(c=new df(i,e),o.push(c)):c=o[a],c}function s(){t=new WeakMap}return{get:n,dispose:s}}var xl=class extends Mn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ox,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},vl=class extends Mn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},fS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pS=`uniform sampler2D shadow_pass;
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
}`;function mS(i,e,t){let n=new ir,s=new Se,r=new Se,a=new yt,o=new xl({depthPacking:ax}),c=new vl,l={},u=t.maxTextureSize,h={[nn]:Ht,[Ht]:nn,[On]:On},d=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:fS,fragmentShader:pS}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ct;g.setAttribute("position",new ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Bt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wf;let p=this.type;this.render=function(C,A,Y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let M=i.getRenderTarget(),E=i.getActiveCubeFace(),H=i.getActiveMipmapLevel(),j=i.state;j.setBlending(ti),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);let ae=p!==Nn&&this.type===Nn,U=p===Nn&&this.type!==Nn;for(let z=0,G=C.length;z<G;z++){let X=C[z],q=X.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let W=q.getFrameExtents();if(s.multiply(W),r.copy(q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/W.x),s.x=r.x*W.x,q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/W.y),s.y=r.y*W.y,q.mapSize.y=r.y)),q.map===null||ae===!0||U===!0){let ne=this.type!==Nn?{minFilter:Nt,magFilter:Nt}:{};q.map!==null&&q.map.dispose(),q.map=new Hn(s.x,s.y,ne),q.map.texture.name=X.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();let Q=q.getViewportCount();for(let ne=0;ne<Q;ne++){let fe=q.getViewport(ne);a.set(r.x*fe.x,r.y*fe.y,r.x*fe.z,r.y*fe.w),j.viewport(a),q.updateMatrices(X,ne),n=q.getFrustum(),R(A,Y,q.camera,X,this.type)}q.isPointLightShadow!==!0&&this.type===Nn&&S(q,Y),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(M,E,H)};function S(C,A){let Y=e.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Hn(s.x,s.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(A,null,Y,d,_,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(A,null,Y,f,_,null)}function v(C,A,Y,M){let E=null,H=Y.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(H!==void 0)E=H;else if(E=Y.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let j=E.uuid,ae=A.uuid,U=l[j];U===void 0&&(U={},l[j]=U);let z=U[ae];z===void 0&&(z=E.clone(),U[ae]=z,A.addEventListener("dispose",I)),E=z}if(E.visible=A.visible,E.wireframe=A.wireframe,M===Nn?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:h[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,Y.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let j=i.properties.get(E);j.light=Y}return E}function R(C,A,Y,M,E){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&E===Nn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,C.matrixWorld);let ae=e.update(C),U=C.material;if(Array.isArray(U)){let z=ae.groups;for(let G=0,X=z.length;G<X;G++){let q=z[G],W=U[q.materialIndex];if(W&&W.visible){let Q=v(C,W,M,E);C.onBeforeShadow(i,C,A,Y,ae,Q,q),i.renderBufferDirect(Y,null,ae,Q,C,q),C.onAfterShadow(i,C,A,Y,ae,Q,q)}}}else if(U.visible){let z=v(C,U,M,E);C.onBeforeShadow(i,C,A,Y,ae,z,null),i.renderBufferDirect(Y,null,ae,z,C,null),C.onAfterShadow(i,C,A,Y,ae,z,null)}}let j=C.children;for(let ae=0,U=j.length;ae<U;ae++)R(j[ae],A,Y,M,E)}function I(C){C.target.removeEventListener("dispose",I);for(let Y in l){let M=l[Y],E=C.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}function gS(i,e,t){let n=t.isWebGL2;function s(){let P=!1,se=new yt,re=null,we=new yt(0,0,0,0);return{setMask:function(Me){re!==Me&&!P&&(i.colorMask(Me,Me,Me,Me),re=Me)},setLocked:function(Me){P=Me},setClear:function(Me,Ze,Je,gt,Pt){Pt===!0&&(Me*=gt,Ze*=gt,Je*=gt),se.set(Me,Ze,Je,gt),we.equals(se)===!1&&(i.clearColor(Me,Ze,Je,gt),we.copy(se))},reset:function(){P=!1,re=null,we.set(-1,0,0,0)}}}function r(){let P=!1,se=null,re=null,we=null;return{setTest:function(Me){Me?De(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(Me){se!==Me&&!P&&(i.depthMask(Me),se=Me)},setFunc:function(Me){if(re!==Me){switch(Me){case N_:i.depthFunc(i.NEVER);break;case O_:i.depthFunc(i.ALWAYS);break;case F_:i.depthFunc(i.LESS);break;case Co:i.depthFunc(i.LEQUAL);break;case B_:i.depthFunc(i.EQUAL);break;case k_:i.depthFunc(i.GEQUAL);break;case H_:i.depthFunc(i.GREATER);break;case V_:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=Me}},setLocked:function(Me){P=Me},setClear:function(Me){we!==Me&&(i.clearDepth(Me),we=Me)},reset:function(){P=!1,se=null,re=null,we=null}}}function a(){let P=!1,se=null,re=null,we=null,Me=null,Ze=null,Je=null,gt=null,Pt=null;return{setTest:function(tt){P||(tt?De(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function(tt){se!==tt&&!P&&(i.stencilMask(tt),se=tt)},setFunc:function(tt,Lt,gn){(re!==tt||we!==Lt||Me!==gn)&&(i.stencilFunc(tt,Lt,gn),re=tt,we=Lt,Me=gn)},setOp:function(tt,Lt,gn){(Ze!==tt||Je!==Lt||gt!==gn)&&(i.stencilOp(tt,Lt,gn),Ze=tt,Je=Lt,gt=gn)},setLocked:function(tt){P=tt},setClear:function(tt){Pt!==tt&&(i.clearStencil(tt),Pt=tt)},reset:function(){P=!1,se=null,re=null,we=null,Me=null,Ze=null,Je=null,gt=null,Pt=null}}}let o=new s,c=new r,l=new a,u=new WeakMap,h=new WeakMap,d={},f={},g=new WeakMap,_=[],m=null,p=!1,S=null,v=null,R=null,I=null,C=null,A=null,Y=null,M=new Oe(0,0,0),E=0,H=!1,j=null,ae=null,U=null,z=null,G=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,W=0,Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(Q)[1]),q=W>=1):Q.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),q=W>=2);let ne=null,fe={},V=i.getParameter(i.SCISSOR_BOX),$=i.getParameter(i.VIEWPORT),de=new yt().fromArray(V),ye=new yt().fromArray($);function xe(P,se,re,we){let Me=new Uint8Array(4),Ze=i.createTexture();i.bindTexture(P,Ze),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Je=0;Je<re;Je++)n&&(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)?i.texImage3D(se,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(se+Je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return Ze}let Ue={};Ue[i.TEXTURE_2D]=xe(i.TEXTURE_2D,i.TEXTURE_2D,1),Ue[i.TEXTURE_CUBE_MAP]=xe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ue[i.TEXTURE_2D_ARRAY]=xe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ue[i.TEXTURE_3D]=xe(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),De(i.DEPTH_TEST),c.setFunc(Co),ze(!1),b(Xh),De(i.CULL_FACE),ge(ti);function De(P){d[P]!==!0&&(i.enable(P),d[P]=!0)}function Te(P){d[P]!==!1&&(i.disable(P),d[P]=!1)}function qe(P,se){return f[P]!==se?(i.bindFramebuffer(P,se),f[P]=se,n&&(P===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=se),P===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=se)),!0):!1}function N(P,se){let re=_,we=!1;if(P)if(re=g.get(se),re===void 0&&(re=[],g.set(se,re)),P.isWebGLMultipleRenderTargets){let Me=P.texture;if(re.length!==Me.length||re[0]!==i.COLOR_ATTACHMENT0){for(let Ze=0,Je=Me.length;Ze<Je;Ze++)re[Ze]=i.COLOR_ATTACHMENT0+Ze;re.length=Me.length,we=!0}}else re[0]!==i.COLOR_ATTACHMENT0&&(re[0]=i.COLOR_ATTACHMENT0,we=!0);else re[0]!==i.BACK&&(re[0]=i.BACK,we=!0);we&&(t.isWebGL2?i.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function mt(P){return m!==P?(i.useProgram(P),m=P,!0):!1}let Ee={[bi]:i.FUNC_ADD,[M_]:i.FUNC_SUBTRACT,[b_]:i.FUNC_REVERSE_SUBTRACT};if(n)Ee[Zh]=i.MIN,Ee[$h]=i.MAX;else{let P=e.get("EXT_blend_minmax");P!==null&&(Ee[Zh]=P.MIN_EXT,Ee[$h]=P.MAX_EXT)}let Le={[S_]:i.ZERO,[E_]:i.ONE,[w_]:i.SRC_COLOR,[Qc]:i.SRC_ALPHA,[L_]:i.SRC_ALPHA_SATURATE,[C_]:i.DST_COLOR,[T_]:i.DST_ALPHA,[A_]:i.ONE_MINUS_SRC_COLOR,[el]:i.ONE_MINUS_SRC_ALPHA,[P_]:i.ONE_MINUS_DST_COLOR,[R_]:i.ONE_MINUS_DST_ALPHA,[I_]:i.CONSTANT_COLOR,[U_]:i.ONE_MINUS_CONSTANT_COLOR,[D_]:i.CONSTANT_ALPHA,[z_]:i.ONE_MINUS_CONSTANT_ALPHA};function ge(P,se,re,we,Me,Ze,Je,gt,Pt,tt){if(P===ti){p===!0&&(Te(i.BLEND),p=!1);return}if(p===!1&&(De(i.BLEND),p=!0),P!==y_){if(P!==S||tt!==H){if((v!==bi||C!==bi)&&(i.blendEquation(i.FUNC_ADD),v=bi,C=bi),tt)switch(P){case us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qh:i.blendFunc(i.ONE,i.ONE);break;case Yh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case jh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qh:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Yh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case jh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}R=null,I=null,A=null,Y=null,M.set(0,0,0),E=0,S=P,H=tt}return}Me=Me||se,Ze=Ze||re,Je=Je||we,(se!==v||Me!==C)&&(i.blendEquationSeparate(Ee[se],Ee[Me]),v=se,C=Me),(re!==R||we!==I||Ze!==A||Je!==Y)&&(i.blendFuncSeparate(Le[re],Le[we],Le[Ze],Le[Je]),R=re,I=we,A=Ze,Y=Je),(gt.equals(M)===!1||Pt!==E)&&(i.blendColor(gt.r,gt.g,gt.b,Pt),M.copy(gt),E=Pt),S=P,H=!1}function nt(P,se){P.side===On?Te(i.CULL_FACE):De(i.CULL_FACE);let re=P.side===Ht;se&&(re=!re),ze(re),P.blending===us&&P.transparent===!1?ge(ti):ge(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),c.setFunc(P.depthFunc),c.setTest(P.depthTest),c.setMask(P.depthWrite),o.setMask(P.colorWrite);let we=P.stencilWrite;l.setTest(we),we&&(l.setMask(P.stencilWriteMask),l.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),l.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),O(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?De(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function ze(P){j!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),j=P)}function b(P){P!==__?(De(i.CULL_FACE),P!==ae&&(P===Xh?i.cullFace(i.BACK):P===x_?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),ae=P}function x(P){P!==U&&(q&&i.lineWidth(P),U=P)}function O(P,se,re){P?(De(i.POLYGON_OFFSET_FILL),(z!==se||G!==re)&&(i.polygonOffset(se,re),z=se,G=re)):Te(i.POLYGON_OFFSET_FILL)}function te(P){P?De(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function K(P){P===void 0&&(P=i.TEXTURE0+X-1),ne!==P&&(i.activeTexture(P),ne=P)}function ee(P,se,re){re===void 0&&(ne===null?re=i.TEXTURE0+X-1:re=ne);let we=fe[re];we===void 0&&(we={type:void 0,texture:void 0},fe[re]=we),(we.type!==P||we.texture!==se)&&(ne!==re&&(i.activeTexture(re),ne=re),i.bindTexture(P,se||Ue[P]),we.type=P,we.texture=se)}function _e(){let P=fe[ne];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function ue(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function me(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Re(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Fe(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function J(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ye(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function w(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Z(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ce(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ie(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ve(P){de.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),de.copy(P))}function Ge(P){ye.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),ye.copy(P))}function je(P,se){let re=h.get(se);re===void 0&&(re=new WeakMap,h.set(se,re));let we=re.get(P);we===void 0&&(we=i.getUniformBlockIndex(se,P.name),re.set(P,we))}function He(P,se){let we=h.get(se).get(P);u.get(se)!==we&&(i.uniformBlockBinding(se,we,P.__bindingPointIndex),u.set(se,we))}function oe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},ne=null,fe={},f={},g=new WeakMap,_=[],m=null,p=!1,S=null,v=null,R=null,I=null,C=null,A=null,Y=null,M=new Oe(0,0,0),E=0,H=!1,j=null,ae=null,U=null,z=null,G=null,de.set(0,0,i.canvas.width,i.canvas.height),ye.set(0,0,i.canvas.width,i.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:De,disable:Te,bindFramebuffer:qe,drawBuffers:N,useProgram:mt,setBlending:ge,setMaterial:nt,setFlipSided:ze,setCullFace:b,setLineWidth:x,setPolygonOffset:O,setScissorTest:te,activeTexture:K,bindTexture:ee,unbindTexture:_e,compressedTexImage2D:ue,compressedTexImage3D:me,texImage2D:ce,texImage3D:ie,updateUBOMapping:je,uniformBlockBinding:He,texStorage2D:w,texStorage3D:Z,texSubImage2D:Re,texSubImage3D:Fe,compressedTexSubImage2D:J,compressedTexSubImage3D:Ye,scissor:ve,viewport:Ge,reset:oe}}function _S(i,e,t,n,s,r,a){let o=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,h,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,x){return f?new OffscreenCanvas(b,x):Oo("canvas")}function _(b,x,O,te){let K=1;if((b.width>te||b.height>te)&&(K=te/Math.max(b.width,b.height)),K<1||x===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){let ee=x?No:Math.floor,_e=ee(K*b.width),ue=ee(K*b.height);h===void 0&&(h=g(_e,ue));let me=O?g(_e,ue):h;return me.width=_e,me.height=ue,me.getContext("2d").drawImage(b,0,0,_e,ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+_e+"x"+ue+")."),me}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function m(b){return al(b.width)&&al(b.height)}function p(b){return o?!1:b.wrapS!==hn||b.wrapT!==hn||b.minFilter!==Nt&&b.minFilter!==en}function S(b,x){return b.generateMipmaps&&x&&b.minFilter!==Nt&&b.minFilter!==en}function v(b){i.generateMipmap(b)}function R(b,x,O,te,K=!1){if(o===!1)return x;if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ee=x;if(x===i.RED&&(O===i.FLOAT&&(ee=i.R32F),O===i.HALF_FLOAT&&(ee=i.R16F),O===i.UNSIGNED_BYTE&&(ee=i.R8)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(ee=i.R8UI),O===i.UNSIGNED_SHORT&&(ee=i.R16UI),O===i.UNSIGNED_INT&&(ee=i.R32UI),O===i.BYTE&&(ee=i.R8I),O===i.SHORT&&(ee=i.R16I),O===i.INT&&(ee=i.R32I)),x===i.RG&&(O===i.FLOAT&&(ee=i.RG32F),O===i.HALF_FLOAT&&(ee=i.RG16F),O===i.UNSIGNED_BYTE&&(ee=i.RG8)),x===i.RGBA){let _e=K?Io:et.getTransfer(te);O===i.FLOAT&&(ee=i.RGBA32F),O===i.HALF_FLOAT&&(ee=i.RGBA16F),O===i.UNSIGNED_BYTE&&(ee=_e===it?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function I(b,x,O){return S(b,O)===!0||b.isFramebufferTexture&&b.minFilter!==Nt&&b.minFilter!==en?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function C(b){return b===Nt||b===Jh||b===Mc?i.NEAREST:i.LINEAR}function A(b){let x=b.target;x.removeEventListener("dispose",A),M(x),x.isVideoTexture&&u.delete(x)}function Y(b){let x=b.target;x.removeEventListener("dispose",Y),H(x)}function M(b){let x=n.get(b);if(x.__webglInit===void 0)return;let O=b.source,te=d.get(O);if(te){let K=te[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&E(b),Object.keys(te).length===0&&d.delete(O)}n.remove(b)}function E(b){let x=n.get(b);i.deleteTexture(x.__webglTexture);let O=b.source,te=d.get(O);delete te[x.__cacheKey],a.memory.textures--}function H(b){let x=b.texture,O=n.get(b),te=n.get(x);if(te.__webglTexture!==void 0&&(i.deleteTexture(te.__webglTexture),a.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(O.__webglFramebuffer[K]))for(let ee=0;ee<O.__webglFramebuffer[K].length;ee++)i.deleteFramebuffer(O.__webglFramebuffer[K][ee]);else i.deleteFramebuffer(O.__webglFramebuffer[K]);O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer[K])}else{if(Array.isArray(O.__webglFramebuffer))for(let K=0;K<O.__webglFramebuffer.length;K++)i.deleteFramebuffer(O.__webglFramebuffer[K]);else i.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&i.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&i.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let K=0;K<O.__webglColorRenderbuffer.length;K++)O.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(O.__webglColorRenderbuffer[K]);O.__webglDepthRenderbuffer&&i.deleteRenderbuffer(O.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let K=0,ee=x.length;K<ee;K++){let _e=n.get(x[K]);_e.__webglTexture&&(i.deleteTexture(_e.__webglTexture),a.memory.textures--),n.remove(x[K])}n.remove(x),n.remove(b)}let j=0;function ae(){j=0}function U(){let b=j;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),j+=1,b}function z(b){let x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function G(b,x){let O=n.get(b);if(b.isVideoTexture&&nt(b),b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){let te=b.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{de(O,b,x);return}}t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function X(b,x){let O=n.get(b);if(b.version>0&&O.__version!==b.version){de(O,b,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function q(b,x){let O=n.get(b);if(b.version>0&&O.__version!==b.version){de(O,b,x);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function W(b,x){let O=n.get(b);if(b.version>0&&O.__version!==b.version){ye(O,b,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}let Q={[il]:i.REPEAT,[hn]:i.CLAMP_TO_EDGE,[sl]:i.MIRRORED_REPEAT},ne={[Nt]:i.NEAREST,[Jh]:i.NEAREST_MIPMAP_NEAREST,[Mc]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[J_]:i.LINEAR_MIPMAP_NEAREST,[Qs]:i.LINEAR_MIPMAP_LINEAR},fe={[lx]:i.NEVER,[mx]:i.ALWAYS,[ux]:i.LESS,[Of]:i.LEQUAL,[hx]:i.EQUAL,[px]:i.GEQUAL,[dx]:i.GREATER,[fx]:i.NOTEQUAL};function V(b,x,O){if(O?(i.texParameteri(b,i.TEXTURE_WRAP_S,Q[x.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,Q[x.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,Q[x.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,ne[x.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,ne[x.minFilter])):(i.texParameteri(b,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(b,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(x.wrapS!==hn||x.wrapT!==hn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(b,i.TEXTURE_MAG_FILTER,C(x.magFilter)),i.texParameteri(b,i.TEXTURE_MIN_FILTER,C(x.minFilter)),x.minFilter!==Nt&&x.minFilter!==en&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,fe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let te=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===Nt||x.minFilter!==Mc&&x.minFilter!==Qs||x.type===ei&&e.has("OES_texture_float_linear")===!1||o===!1&&x.type===er&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||n.get(x).__currentAnisotropy)&&(i.texParameterf(b,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy)}}function $(b,x){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",A));let te=x.source,K=d.get(te);K===void 0&&(K={},d.set(te,K));let ee=z(x);if(ee!==b.__cacheKey){K[ee]===void 0&&(K[ee]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),K[ee].usedTimes++;let _e=K[b.__cacheKey];_e!==void 0&&(K[b.__cacheKey].usedTimes--,_e.usedTimes===0&&E(x)),b.__cacheKey=ee,b.__webglTexture=K[ee].texture}return O}function de(b,x,O){let te=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(te=i.TEXTURE_3D);let K=$(b,x),ee=x.source;t.bindTexture(te,b.__webglTexture,i.TEXTURE0+O);let _e=n.get(ee);if(ee.version!==_e.__version||K===!0){t.activeTexture(i.TEXTURE0+O);let ue=et.getPrimaries(et.workingColorSpace),me=x.colorSpace===tn?null:et.getPrimaries(x.colorSpace),Re=x.colorSpace===tn||ue===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let Fe=p(x)&&m(x.image)===!1,J=_(x.image,Fe,!1,s.maxTextureSize);J=ze(x,J);let Ye=m(J)||o,w=r.convert(x.format,x.colorSpace),Z=r.convert(x.type),ce=R(x.internalFormat,w,Z,x.colorSpace,x.isVideoTexture);V(te,x,Ye);let ie,ve=x.mipmaps,Ge=o&&x.isVideoTexture!==!0&&ce!==Df,je=_e.__version===void 0||K===!0,He=I(x,J,Ye);if(x.isDepthTexture)ce=i.DEPTH_COMPONENT,o?x.type===ei?ce=i.DEPTH_COMPONENT32F:x.type===Qn?ce=i.DEPTH_COMPONENT24:x.type===wi?ce=i.DEPTH24_STENCIL8:ce=i.DEPTH_COMPONENT16:x.type===ei&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===Ai&&ce===i.DEPTH_COMPONENT&&x.type!==Bl&&x.type!==Qn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=Qn,Z=r.convert(x.type)),x.format===ms&&ce===i.DEPTH_COMPONENT&&(ce=i.DEPTH_STENCIL,x.type!==wi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=wi,Z=r.convert(x.type))),je&&(Ge?t.texStorage2D(i.TEXTURE_2D,1,ce,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,ce,J.width,J.height,0,w,Z,null));else if(x.isDataTexture)if(ve.length>0&&Ye){Ge&&je&&t.texStorage2D(i.TEXTURE_2D,He,ce,ve[0].width,ve[0].height);for(let oe=0,P=ve.length;oe<P;oe++)ie=ve[oe],Ge?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,w,Z,ie.data):t.texImage2D(i.TEXTURE_2D,oe,ce,ie.width,ie.height,0,w,Z,ie.data);x.generateMipmaps=!1}else Ge?(je&&t.texStorage2D(i.TEXTURE_2D,He,ce,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,J.width,J.height,w,Z,J.data)):t.texImage2D(i.TEXTURE_2D,0,ce,J.width,J.height,0,w,Z,J.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ge&&je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,ce,ve[0].width,ve[0].height,J.depth);for(let oe=0,P=ve.length;oe<P;oe++)ie=ve[oe],x.format!==dn?w!==null?Ge?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ie.width,ie.height,J.depth,w,ie.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,oe,ce,ie.width,ie.height,J.depth,0,ie.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?t.texSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ie.width,ie.height,J.depth,w,Z,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,oe,ce,ie.width,ie.height,J.depth,0,w,Z,ie.data)}else{Ge&&je&&t.texStorage2D(i.TEXTURE_2D,He,ce,ve[0].width,ve[0].height);for(let oe=0,P=ve.length;oe<P;oe++)ie=ve[oe],x.format!==dn?w!==null?Ge?t.compressedTexSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,w,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,oe,ce,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ie.width,ie.height,w,Z,ie.data):t.texImage2D(i.TEXTURE_2D,oe,ce,ie.width,ie.height,0,w,Z,ie.data)}else if(x.isDataArrayTexture)Ge?(je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,ce,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,w,Z,J.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,ce,J.width,J.height,J.depth,0,w,Z,J.data);else if(x.isData3DTexture)Ge?(je&&t.texStorage3D(i.TEXTURE_3D,He,ce,J.width,J.height,J.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,w,Z,J.data)):t.texImage3D(i.TEXTURE_3D,0,ce,J.width,J.height,J.depth,0,w,Z,J.data);else if(x.isFramebufferTexture){if(je)if(Ge)t.texStorage2D(i.TEXTURE_2D,He,ce,J.width,J.height);else{let oe=J.width,P=J.height;for(let se=0;se<He;se++)t.texImage2D(i.TEXTURE_2D,se,ce,oe,P,0,w,Z,null),oe>>=1,P>>=1}}else if(ve.length>0&&Ye){Ge&&je&&t.texStorage2D(i.TEXTURE_2D,He,ce,ve[0].width,ve[0].height);for(let oe=0,P=ve.length;oe<P;oe++)ie=ve[oe],Ge?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,w,Z,ie):t.texImage2D(i.TEXTURE_2D,oe,ce,w,Z,ie);x.generateMipmaps=!1}else Ge?(je&&t.texStorage2D(i.TEXTURE_2D,He,ce,J.width,J.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,w,Z,J)):t.texImage2D(i.TEXTURE_2D,0,ce,w,Z,J);S(x,Ye)&&v(te),_e.__version=ee.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function ye(b,x,O){if(x.image.length!==6)return;let te=$(b,x),K=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+O);let ee=n.get(K);if(K.version!==ee.__version||te===!0){t.activeTexture(i.TEXTURE0+O);let _e=et.getPrimaries(et.workingColorSpace),ue=x.colorSpace===tn?null:et.getPrimaries(x.colorSpace),me=x.colorSpace===tn||_e===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let Re=x.isCompressedTexture||x.image[0].isCompressedTexture,Fe=x.image[0]&&x.image[0].isDataTexture,J=[];for(let oe=0;oe<6;oe++)!Re&&!Fe?J[oe]=_(x.image[oe],!1,!0,s.maxCubemapSize):J[oe]=Fe?x.image[oe].image:x.image[oe],J[oe]=ze(x,J[oe]);let Ye=J[0],w=m(Ye)||o,Z=r.convert(x.format,x.colorSpace),ce=r.convert(x.type),ie=R(x.internalFormat,Z,ce,x.colorSpace),ve=o&&x.isVideoTexture!==!0,Ge=ee.__version===void 0||te===!0,je=I(x,Ye,w);V(i.TEXTURE_CUBE_MAP,x,w);let He;if(Re){ve&&Ge&&t.texStorage2D(i.TEXTURE_CUBE_MAP,je,ie,Ye.width,Ye.height);for(let oe=0;oe<6;oe++){He=J[oe].mipmaps;for(let P=0;P<He.length;P++){let se=He[P];x.format!==dn?Z!==null?ve?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P,0,0,se.width,se.height,Z,se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P,ie,se.width,se.height,0,se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ve?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P,0,0,se.width,se.height,Z,ce,se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P,ie,se.width,se.height,0,Z,ce,se.data)}}}else{He=x.mipmaps,ve&&Ge&&(He.length>0&&je++,t.texStorage2D(i.TEXTURE_CUBE_MAP,je,ie,J[0].width,J[0].height));for(let oe=0;oe<6;oe++)if(Fe){ve?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,J[oe].width,J[oe].height,Z,ce,J[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ie,J[oe].width,J[oe].height,0,Z,ce,J[oe].data);for(let P=0;P<He.length;P++){let re=He[P].image[oe].image;ve?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P+1,0,0,re.width,re.height,Z,ce,re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P+1,ie,re.width,re.height,0,Z,ce,re.data)}}else{ve?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Z,ce,J[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ie,Z,ce,J[oe]);for(let P=0;P<He.length;P++){let se=He[P];ve?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P+1,0,0,Z,ce,se.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,P+1,ie,Z,ce,se.image[oe])}}}S(x,w)&&v(i.TEXTURE_CUBE_MAP),ee.__version=K.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function xe(b,x,O,te,K,ee){let _e=r.convert(O.format,O.colorSpace),ue=r.convert(O.type),me=R(O.internalFormat,_e,ue,O.colorSpace);if(!n.get(x).__hasExternalTextures){let Fe=Math.max(1,x.width>>ee),J=Math.max(1,x.height>>ee);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,ee,me,Fe,J,x.depth,0,_e,ue,null):t.texImage2D(K,ee,me,Fe,J,0,_e,ue,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),ge(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,K,n.get(O).__webglTexture,0,Le(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,K,n.get(O).__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(b,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,b),x.depthBuffer&&!x.stencilBuffer){let te=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(O||ge(x)){let K=x.depthTexture;K&&K.isDepthTexture&&(K.type===ei?te=i.DEPTH_COMPONENT32F:K.type===Qn&&(te=i.DEPTH_COMPONENT24));let ee=Le(x);ge(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ee,te,x.width,x.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ee,te,x.width,x.height)}else i.renderbufferStorage(i.RENDERBUFFER,te,x.width,x.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,b)}else if(x.depthBuffer&&x.stencilBuffer){let te=Le(x);O&&ge(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,te,i.DEPTH24_STENCIL8,x.width,x.height):ge(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te,i.DEPTH24_STENCIL8,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,b)}else{let te=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let K=0;K<te.length;K++){let ee=te[K],_e=r.convert(ee.format,ee.colorSpace),ue=r.convert(ee.type),me=R(ee.internalFormat,_e,ue,ee.colorSpace),Re=Le(x);O&&ge(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,me,x.width,x.height):ge(x)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Re,me,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,me,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(b,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G(x.depthTexture,0);let te=n.get(x.depthTexture).__webglTexture,K=Le(x);if(x.depthTexture.format===Ai)ge(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(x.depthTexture.format===ms)ge(x)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Te(b){let x=n.get(b),O=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");De(x.__webglFramebuffer,b)}else if(O){x.__webglDepthbuffer=[];for(let te=0;te<6;te++)t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[te]),x.__webglDepthbuffer[te]=i.createRenderbuffer(),Ue(x.__webglDepthbuffer[te],b,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=i.createRenderbuffer(),Ue(x.__webglDepthbuffer,b,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function qe(b,x,O){let te=n.get(b);x!==void 0&&xe(te.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Te(b)}function N(b){let x=b.texture,O=n.get(b),te=n.get(x);b.addEventListener("dispose",Y),b.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=x.version,a.memory.textures++);let K=b.isWebGLCubeRenderTarget===!0,ee=b.isWebGLMultipleRenderTargets===!0,_e=m(b)||o;if(K){O.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(o&&x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[ue]=[];for(let me=0;me<x.mipmaps.length;me++)O.__webglFramebuffer[ue][me]=i.createFramebuffer()}else O.__webglFramebuffer[ue]=i.createFramebuffer()}else{if(o&&x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let ue=0;ue<x.mipmaps.length;ue++)O.__webglFramebuffer[ue]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(ee)if(s.drawBuffers){let ue=b.texture;for(let me=0,Re=ue.length;me<Re;me++){let Fe=n.get(ue[me]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&b.samples>0&&ge(b)===!1){let ue=ee?x:[x];O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let me=0;me<ue.length;me++){let Re=ue[me];O.__webglColorRenderbuffer[me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[me]);let Fe=r.convert(Re.format,Re.colorSpace),J=r.convert(Re.type),Ye=R(Re.internalFormat,Fe,J,Re.colorSpace,b.isXRRenderTarget===!0),w=Le(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,w,Ye,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,O.__webglColorRenderbuffer[me])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Ue(O.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),V(i.TEXTURE_CUBE_MAP,x,_e);for(let ue=0;ue<6;ue++)if(o&&x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)xe(O.__webglFramebuffer[ue][me],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,me);else xe(O.__webglFramebuffer[ue],b,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);S(x,_e)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){let ue=b.texture;for(let me=0,Re=ue.length;me<Re;me++){let Fe=ue[me],J=n.get(Fe);t.bindTexture(i.TEXTURE_2D,J.__webglTexture),V(i.TEXTURE_2D,Fe,_e),xe(O.__webglFramebuffer,b,Fe,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,0),S(Fe,_e)&&v(i.TEXTURE_2D)}t.unbindTexture()}else{let ue=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(o?ue=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ue,te.__webglTexture),V(ue,x,_e),o&&x.mipmaps&&x.mipmaps.length>0)for(let me=0;me<x.mipmaps.length;me++)xe(O.__webglFramebuffer[me],b,x,i.COLOR_ATTACHMENT0,ue,me);else xe(O.__webglFramebuffer,b,x,i.COLOR_ATTACHMENT0,ue,0);S(x,_e)&&v(ue),t.unbindTexture()}b.depthBuffer&&Te(b)}function mt(b){let x=m(b)||o,O=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let te=0,K=O.length;te<K;te++){let ee=O[te];if(S(ee,x)){let _e=b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ue=n.get(ee).__webglTexture;t.bindTexture(_e,ue),v(_e),t.unbindTexture()}}}function Ee(b){if(o&&b.samples>0&&ge(b)===!1){let x=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],O=b.width,te=b.height,K=i.COLOR_BUFFER_BIT,ee=[],_e=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(b),me=b.isWebGLMultipleRenderTargets===!0;if(me)for(let Re=0;Re<x.length;Re++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let Re=0;Re<x.length;Re++){ee.push(i.COLOR_ATTACHMENT0+Re),b.depthBuffer&&ee.push(_e);let Fe=ue.__ignoreDepthValues!==void 0?ue.__ignoreDepthValues:!1;if(Fe===!1&&(b.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),me&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[Re]),Fe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[_e]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_e])),me){let J=n.get(x[Re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,O,te,0,0,O,te,K,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),me)for(let Re=0;Re<x.length;Re++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,ue.__webglColorRenderbuffer[Re]);let Fe=n.get(x[Re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,Fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}}function Le(b){return Math.min(s.maxSamples,b.samples)}function ge(b){let x=n.get(b);return o&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function nt(b){let x=a.render.frame;u.get(b)!==x&&(u.set(b,x),b.update())}function ze(b,x){let O=b.colorSpace,te=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===ol||O!==kn&&O!==tn&&(et.getTransfer(O)===it?o===!1?e.has("EXT_sRGB")===!0&&te===dn?(b.format=ol,b.minFilter=en,b.generateMipmaps=!1):x=Fo.sRGBToLinear(x):(te!==dn||K!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}this.allocateTextureUnit=U,this.resetTextureUnits=ae,this.setTexture2D=G,this.setTexture2DArray=X,this.setTexture3D=q,this.setTextureCube=W,this.rebindTextures=qe,this.setupRenderTarget=N,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ge}function xS(i,e,t){let n=t.isWebGL2;function s(r,a=tn){let o,c=et.getTransfer(a);if(r===ii)return i.UNSIGNED_BYTE;if(r===Cf)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Pf)return i.UNSIGNED_SHORT_5_5_5_1;if(r===K_)return i.BYTE;if(r===Q_)return i.SHORT;if(r===Bl)return i.UNSIGNED_SHORT;if(r===Rf)return i.INT;if(r===Qn)return i.UNSIGNED_INT;if(r===ei)return i.FLOAT;if(r===er)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===ex)return i.ALPHA;if(r===dn)return i.RGBA;if(r===tx)return i.LUMINANCE;if(r===nx)return i.LUMINANCE_ALPHA;if(r===Ai)return i.DEPTH_COMPONENT;if(r===ms)return i.DEPTH_STENCIL;if(r===ol)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===ix)return i.RED;if(r===Lf)return i.RED_INTEGER;if(r===sx)return i.RG;if(r===If)return i.RG_INTEGER;if(r===Uf)return i.RGBA_INTEGER;if(r===bc||r===Sc||r===Ec||r===wc)if(c===it)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===bc)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Sc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ec)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===wc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===bc)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Sc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ec)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===wc)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Kh||r===Qh||r===ed||r===td)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Kh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Qh)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ed)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===td)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Df)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===nd||r===id)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===nd)return c===it?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===id)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===sd||r===rd||r===od||r===ad||r===cd||r===ld||r===ud||r===hd||r===dd||r===fd||r===pd||r===md||r===gd||r===_d)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===sd)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===rd)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===od)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===ad)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===cd)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ld)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ud)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===hd)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===dd)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===fd)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===pd)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===md)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===gd)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===_d)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ac||r===xd||r===vd)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Ac)return c===it?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===xd)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===vd)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===rx||r===yd||r===Md||r===bd)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Ac)return o.COMPRESSED_RED_RGTC1_EXT;if(r===yd)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Md)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===bd)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===wi?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var yl=class extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},kt=class extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}},vS={type:"move"},Ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vS)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new kt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ml=class extends yn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,f=null,g=null,_=t.getContextAttributes(),m=null,p=null,S=[],v=[],R=new Se,I=null,C=new Ot;C.layers.enable(1),C.viewport=new yt;let A=new Ot;A.layers.enable(2),A.viewport=new yt;let Y=[C,A],M=new yl;M.layers.enable(1),M.layers.enable(2);let E=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let $=S[V];return $===void 0&&($=new Ks,S[V]=$),$.getTargetRaySpace()},this.getControllerGrip=function(V){let $=S[V];return $===void 0&&($=new Ks,S[V]=$),$.getGripSpace()},this.getHand=function(V){let $=S[V];return $===void 0&&($=new Ks,S[V]=$),$.getHandSpace()};function j(V){let $=v.indexOf(V.inputSource);if($===-1)return;let de=S[$];de!==void 0&&(de.update(V.inputSource,V.frame,l||a),de.dispatchEvent({type:V.type,data:V.inputSource}))}function ae(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",ae),s.removeEventListener("inputsourceschange",U);for(let V=0;V<S.length;V++){let $=v[V];$!==null&&(v[V]=null,S[V].disconnect($))}E=null,H=null,e.setRenderTarget(m),f=null,d=null,h=null,s=null,p=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",ae),s.addEventListener("inputsourceschange",U),_.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(R),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let $={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,$),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Hn(f.framebufferWidth,f.framebufferHeight,{format:dn,type:ii,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let $=null,de=null,ye=null;_.depth&&(ye=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=_.stencil?ms:Ai,de=_.stencil?wi:Qn);let xe={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(xe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new Hn(d.textureWidth,d.textureHeight,{format:dn,type:ii,depthTexture:new Zo(d.textureWidth,d.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});let Ue=e.properties.get(p);Ue.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),fe.setContext(s),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function U(V){for(let $=0;$<V.removed.length;$++){let de=V.removed[$],ye=v.indexOf(de);ye>=0&&(v[ye]=null,S[ye].disconnect(de))}for(let $=0;$<V.added.length;$++){let de=V.added[$],ye=v.indexOf(de);if(ye===-1){for(let Ue=0;Ue<S.length;Ue++)if(Ue>=v.length){v.push(de),ye=Ue;break}else if(v[Ue]===null){v[Ue]=de,ye=Ue;break}if(ye===-1)break}let xe=S[ye];xe&&xe.connect(de)}}let z=new L,G=new L;function X(V,$,de){z.setFromMatrixPosition($.matrixWorld),G.setFromMatrixPosition(de.matrixWorld);let ye=z.distanceTo(G),xe=$.projectionMatrix.elements,Ue=de.projectionMatrix.elements,De=xe[14]/(xe[10]-1),Te=xe[14]/(xe[10]+1),qe=(xe[9]+1)/xe[5],N=(xe[9]-1)/xe[5],mt=(xe[8]-1)/xe[0],Ee=(Ue[8]+1)/Ue[0],Le=De*mt,ge=De*Ee,nt=ye/(-mt+Ee),ze=nt*-mt;$.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(ze),V.translateZ(nt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();let b=De+nt,x=Te+nt,O=Le-ze,te=ge+(ye-ze),K=qe*Te/x*b,ee=N*Te/x*b;V.projectionMatrix.makePerspective(O,te,K,ee,b,x),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function q(V,$){$===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices($.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;M.near=A.near=C.near=V.near,M.far=A.far=C.far=V.far,(E!==M.near||H!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),E=M.near,H=M.far);let $=V.parent,de=M.cameras;q(M,$);for(let ye=0;ye<de.length;ye++)q(de[ye],$);de.length===2?X(M,C,A):M.projectionMatrix.copy(C.projectionMatrix),W(V,M,$)};function W(V,$,de){de===null?V.matrix.copy($.matrixWorld):(V.matrix.copy(de.matrixWorld),V.matrix.invert(),V.matrix.multiply($.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy($.projectionMatrix),V.projectionMatrixInverse.copy($.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=tr*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(V){c=V,d!==null&&(d.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)};let Q=null;function ne(V,$){if(u=$.getViewerPose(l||a),g=$,u!==null){let de=u.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let ye=!1;de.length!==M.cameras.length&&(M.cameras.length=0,ye=!0);for(let xe=0;xe<de.length;xe++){let Ue=de[xe],De=null;if(f!==null)De=f.getViewport(Ue);else{let qe=h.getViewSubImage(d,Ue);De=qe.viewport,xe===0&&(e.setRenderTargetTextures(p,qe.colorTexture,d.ignoreDepthValues?void 0:qe.depthStencilTexture),e.setRenderTarget(p))}let Te=Y[xe];Te===void 0&&(Te=new Ot,Te.layers.enable(xe),Te.viewport=new yt,Y[xe]=Te),Te.matrix.fromArray(Ue.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(Ue.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(De.x,De.y,De.width,De.height),xe===0&&(M.matrix.copy(Te.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ye===!0&&M.cameras.push(Te)}}for(let de=0;de<S.length;de++){let ye=v[de],xe=S[de];ye!==null&&xe!==void 0&&xe.update(ye,$,l||a)}Q&&Q(V,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}let fe=new Vf;fe.setAnimationLoop(ne),this.setAnimationLoop=function(V){Q=V},this.dispose=function(){}}};function yS(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Hf(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,v,R){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,R)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,S,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ht&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ht&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=e.get(p).envMap;if(S&&(m.envMap.value=S,m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let v=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*v,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,S,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ht&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function MS(i,e,t,n){let s={},r={},a=[],o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(S,v){let R=v.program;n.uniformBlockBinding(S,R)}function l(S,v){let R=s[S.id];R===void 0&&(g(S),R=u(S),s[S.id]=R,S.addEventListener("dispose",m));let I=v.program;n.updateUBOMapping(S,I);let C=e.render.frame;r[S.id]!==C&&(d(S),r[S.id]=C)}function u(S){let v=h();S.__bindingPointIndex=v;let R=i.createBuffer(),I=S.__size,C=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,R),i.bufferData(i.UNIFORM_BUFFER,I,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,R),R}function h(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){let v=s[S.id],R=S.uniforms,I=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let C=0,A=R.length;C<A;C++){let Y=Array.isArray(R[C])?R[C]:[R[C]];for(let M=0,E=Y.length;M<E;M++){let H=Y[M];if(f(H,C,M,I)===!0){let j=H.__offset,ae=Array.isArray(H.value)?H.value:[H.value],U=0;for(let z=0;z<ae.length;z++){let G=ae[z],X=_(G);typeof G=="number"||typeof G=="boolean"?(H.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,j+U,H.__data)):G.isMatrix3?(H.__data[0]=G.elements[0],H.__data[1]=G.elements[1],H.__data[2]=G.elements[2],H.__data[3]=0,H.__data[4]=G.elements[3],H.__data[5]=G.elements[4],H.__data[6]=G.elements[5],H.__data[7]=0,H.__data[8]=G.elements[6],H.__data[9]=G.elements[7],H.__data[10]=G.elements[8],H.__data[11]=0):(G.toArray(H.__data,U),U+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,j,H.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,v,R,I){let C=S.value,A=v+"_"+R;if(I[A]===void 0)return typeof C=="number"||typeof C=="boolean"?I[A]=C:I[A]=C.clone(),!0;{let Y=I[A];if(typeof C=="number"||typeof C=="boolean"){if(Y!==C)return I[A]=C,!0}else if(Y.equals(C)===!1)return Y.copy(C),!0}return!1}function g(S){let v=S.uniforms,R=0,I=16;for(let A=0,Y=v.length;A<Y;A++){let M=Array.isArray(v[A])?v[A]:[v[A]];for(let E=0,H=M.length;E<H;E++){let j=M[E],ae=Array.isArray(j.value)?j.value:[j.value];for(let U=0,z=ae.length;U<z;U++){let G=ae[U],X=_(G),q=R%I;q!==0&&I-q<X.boundary&&(R+=I-q),j.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=R,R+=X.storage}}}let C=R%I;return C>0&&(R+=I-C),S.__size=R,S.__cache={},this}function _(S){let v={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(v.boundary=4,v.storage=4):S.isVector2?(v.boundary=8,v.storage=8):S.isVector3||S.isColor?(v.boundary=16,v.storage=12):S.isVector4?(v.boundary=16,v.storage=16):S.isMatrix3?(v.boundary=48,v.storage=48):S.isMatrix4?(v.boundary=64,v.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),v}function m(S){let v=S.target;v.removeEventListener("dispose",m);let R=a.indexOf(v.__bindingPointIndex);a.splice(R,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(let S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}var rr=class{constructor(e={}){let{canvas:t=Px(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;let f=new Uint32Array(4),g=new Int32Array(4),_=null,m=null,p=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dt,this._useLegacyLights=!1,this.toneMapping=ni,this.toneMappingExposure=1;let v=this,R=!1,I=0,C=0,A=null,Y=-1,M=null,E=new yt,H=new yt,j=null,ae=new Oe(0),U=0,z=t.width,G=t.height,X=1,q=null,W=null,Q=new yt(0,0,z,G),ne=new yt(0,0,z,G),fe=!1,V=new ir,$=!1,de=!1,ye=null,xe=new lt,Ue=new Se,De=new L,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function qe(){return A===null?X:1}let N=n;function mt(y,D){for(let B=0;B<y.length;B++){let k=y[B],F=t.getContext(k,D);if(F!==null)return F}return null}try{let y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r160"),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",P,!1),t.addEventListener("webglcontextcreationerror",se,!1),N===null){let D=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&D.shift(),N=mt(D,y),N===null)throw mt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&N instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),N.getShaderPrecisionFormat===void 0&&(N.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Ee,Le,ge,nt,ze,b,x,O,te,K,ee,_e,ue,me,Re,Fe,J,Ye,w,Z,ce,ie,ve,Ge;function je(){Ee=new kM(N),Le=new DM(N,Ee,e),Ee.init(Le),ie=new xS(N,Ee,Le),ge=new gS(N,Ee,Le),nt=new GM(N),ze=new sS,b=new _S(N,Ee,ge,ze,Le,ie,nt),x=new NM(v),O=new BM(v),te=new Jx(N,Le),ve=new IM(N,Ee,te,Le),K=new HM(N,te,nt,ve),ee=new YM(N,K,te,nt),w=new qM(N,Le,b),Fe=new zM(ze),_e=new iS(v,x,O,Ee,Le,ve,Fe),ue=new yS(v,ze),me=new oS,Re=new dS(Ee,Le),Ye=new LM(v,x,O,ge,ee,d,c),J=new mS(v,ee,Le),Ge=new MS(N,nt,Le,ge),Z=new UM(N,Ee,nt,Le),ce=new VM(N,Ee,nt,Le),nt.programs=_e.programs,v.capabilities=Le,v.extensions=Ee,v.properties=ze,v.renderLists=me,v.shadowMap=J,v.state=ge,v.info=nt}je();let He=new Ml(v,N);this.xr=He,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let y=Ee.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=Ee.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(y){y!==void 0&&(X=y,this.setSize(z,G,!1))},this.getSize=function(y){return y.set(z,G)},this.setSize=function(y,D,B=!0){if(He.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=y,G=D,t.width=Math.floor(y*X),t.height=Math.floor(D*X),B===!0&&(t.style.width=y+"px",t.style.height=D+"px"),this.setViewport(0,0,y,D)},this.getDrawingBufferSize=function(y){return y.set(z*X,G*X).floor()},this.setDrawingBufferSize=function(y,D,B){z=y,G=D,X=B,t.width=Math.floor(y*B),t.height=Math.floor(D*B),this.setViewport(0,0,y,D)},this.getCurrentViewport=function(y){return y.copy(E)},this.getViewport=function(y){return y.copy(Q)},this.setViewport=function(y,D,B,k){y.isVector4?Q.set(y.x,y.y,y.z,y.w):Q.set(y,D,B,k),ge.viewport(E.copy(Q).multiplyScalar(X).floor())},this.getScissor=function(y){return y.copy(ne)},this.setScissor=function(y,D,B,k){y.isVector4?ne.set(y.x,y.y,y.z,y.w):ne.set(y,D,B,k),ge.scissor(H.copy(ne).multiplyScalar(X).floor())},this.getScissorTest=function(){return fe},this.setScissorTest=function(y){ge.setScissorTest(fe=y)},this.setOpaqueSort=function(y){q=y},this.setTransparentSort=function(y){W=y},this.getClearColor=function(y){return y.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(y=!0,D=!0,B=!0){let k=0;if(y){let F=!1;if(A!==null){let pe=A.texture.format;F=pe===Uf||pe===If||pe===Lf}if(F){let pe=A.texture.type,be=pe===ii||pe===Qn||pe===Bl||pe===wi||pe===Cf||pe===Pf,Pe=Ye.getClearColor(),Ie=Ye.getClearAlpha(),Ve=Pe.r,Ne=Pe.g,Be=Pe.b;be?(f[0]=Ve,f[1]=Ne,f[2]=Be,f[3]=Ie,N.clearBufferuiv(N.COLOR,0,f)):(g[0]=Ve,g[1]=Ne,g[2]=Be,g[3]=Ie,N.clearBufferiv(N.COLOR,0,g))}else k|=N.COLOR_BUFFER_BIT}D&&(k|=N.DEPTH_BUFFER_BIT),B&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",P,!1),t.removeEventListener("webglcontextcreationerror",se,!1),me.dispose(),Re.dispose(),ze.dispose(),x.dispose(),O.dispose(),ee.dispose(),ve.dispose(),Ge.dispose(),_e.dispose(),He.dispose(),He.removeEventListener("sessionstart",Pt),He.removeEventListener("sessionend",tt),ye&&(ye.dispose(),ye=null),Lt.stop()};function oe(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let y=nt.autoReset,D=J.enabled,B=J.autoUpdate,k=J.needsUpdate,F=J.type;je(),nt.autoReset=y,J.enabled=D,J.autoUpdate=B,J.needsUpdate=k,J.type=F}function se(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function re(y){let D=y.target;D.removeEventListener("dispose",re),we(D)}function we(y){Me(y),ze.remove(y)}function Me(y){let D=ze.get(y).programs;D!==void 0&&(D.forEach(function(B){_e.releaseProgram(B)}),y.isShaderMaterial&&_e.releaseShaderCache(y))}this.renderBufferDirect=function(y,D,B,k,F,pe){D===null&&(D=Te);let be=F.isMesh&&F.matrixWorld.determinant()<0,Pe=eg(y,D,B,k,F);ge.setMaterial(k,be);let Ie=B.index,Ve=1;if(k.wireframe===!0){if(Ie=K.getWireframeAttribute(B),Ie===void 0)return;Ve=2}let Ne=B.drawRange,Be=B.attributes.position,at=Ne.start*Ve,Vt=(Ne.start+Ne.count)*Ve;pe!==null&&(at=Math.max(at,pe.start*Ve),Vt=Math.min(Vt,(pe.start+pe.count)*Ve)),Ie!==null?(at=Math.max(at,0),Vt=Math.min(Vt,Ie.count)):Be!=null&&(at=Math.max(at,0),Vt=Math.min(Vt,Be.count));let _t=Vt-at;if(_t<0||_t===1/0)return;ve.setup(F,k,Pe,B,Ie);let En,rt=Z;if(Ie!==null&&(En=te.get(Ie),rt=ce,rt.setIndex(En)),F.isMesh)k.wireframe===!0?(ge.setLineWidth(k.wireframeLinewidth*qe()),rt.setMode(N.LINES)):rt.setMode(N.TRIANGLES);else if(F.isLine){let We=k.linewidth;We===void 0&&(We=1),ge.setLineWidth(We*qe()),F.isLineSegments?rt.setMode(N.LINES):F.isLineLoop?rt.setMode(N.LINE_LOOP):rt.setMode(N.LINE_STRIP)}else F.isPoints?rt.setMode(N.POINTS):F.isSprite&&rt.setMode(N.TRIANGLES);if(F.isBatchedMesh)rt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)rt.renderInstances(at,_t,F.count);else if(B.isInstancedBufferGeometry){let We=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Ua=Math.min(B.instanceCount,We);rt.renderInstances(at,_t,Ua)}else rt.render(at,_t)};function Ze(y,D,B){y.transparent===!0&&y.side===On&&y.forceSinglePass===!1?(y.side=Ht,y.needsUpdate=!0,xr(y,D,B),y.side=nn,y.needsUpdate=!0,xr(y,D,B),y.side=On):xr(y,D,B)}this.compile=function(y,D,B=null){B===null&&(B=y),m=Re.get(B),m.init(),S.push(m),B.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),y!==B&&y.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights(v._useLegacyLights);let k=new Set;return y.traverse(function(F){let pe=F.material;if(pe)if(Array.isArray(pe))for(let be=0;be<pe.length;be++){let Pe=pe[be];Ze(Pe,B,F),k.add(Pe)}else Ze(pe,B,F),k.add(pe)}),S.pop(),m=null,k},this.compileAsync=function(y,D,B=null){let k=this.compile(y,D,B);return new Promise(F=>{function pe(){if(k.forEach(function(be){ze.get(be).currentProgram.isReady()&&k.delete(be)}),k.size===0){F(y);return}setTimeout(pe,10)}Ee.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Je=null;function gt(y){Je&&Je(y)}function Pt(){Lt.stop()}function tt(){Lt.start()}let Lt=new Vf;Lt.setAnimationLoop(gt),typeof self<"u"&&Lt.setContext(self),this.setAnimationLoop=function(y){Je=y,He.setAnimationLoop(y),y===null?Lt.stop():Lt.start()},He.addEventListener("sessionstart",Pt),He.addEventListener("sessionend",tt),this.render=function(y,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(He.cameraAutoUpdate===!0&&He.updateCamera(D),D=He.getCamera()),y.isScene===!0&&y.onBeforeRender(v,y,D,A),m=Re.get(y,S.length),m.init(),S.push(m),xe.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),V.setFromProjectionMatrix(xe),de=this.localClippingEnabled,$=Fe.init(this.clippingPlanes,de),_=me.get(y,p.length),_.init(),p.push(_),gn(y,D,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(q,W),this.info.render.frame++,$===!0&&Fe.beginShadows();let B=m.state.shadowsArray;if(J.render(B,y,D),$===!0&&Fe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ye.render(_,y),m.setupLights(v._useLegacyLights),D.isArrayCamera){let k=D.cameras;for(let F=0,pe=k.length;F<pe;F++){let be=k[F];wu(_,y,be,be.viewport)}}else wu(_,y,D);A!==null&&(b.updateMultisampleRenderTarget(A),b.updateRenderTargetMipmap(A)),y.isScene===!0&&y.onAfterRender(v,y,D),ve.resetDefaultState(),Y=-1,M=null,S.pop(),S.length>0?m=S[S.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function gn(y,D,B,k){if(y.visible===!1)return;if(y.layers.test(D.layers)){if(y.isGroup)B=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(D);else if(y.isLight)m.pushLight(y),y.castShadow&&m.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||V.intersectsSprite(y)){k&&De.setFromMatrixPosition(y.matrixWorld).applyMatrix4(xe);let be=ee.update(y),Pe=y.material;Pe.visible&&_.push(y,be,Pe,B,De.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||V.intersectsObject(y))){let be=ee.update(y),Pe=y.material;if(k&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),De.copy(y.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),De.copy(be.boundingSphere.center)),De.applyMatrix4(y.matrixWorld).applyMatrix4(xe)),Array.isArray(Pe)){let Ie=be.groups;for(let Ve=0,Ne=Ie.length;Ve<Ne;Ve++){let Be=Ie[Ve],at=Pe[Be.materialIndex];at&&at.visible&&_.push(y,be,at,B,De.z,Be)}}else Pe.visible&&_.push(y,be,Pe,B,De.z,null)}}let pe=y.children;for(let be=0,Pe=pe.length;be<Pe;be++)gn(pe[be],D,B,k)}function wu(y,D,B,k){let F=y.opaque,pe=y.transmissive,be=y.transparent;m.setupLightsView(B),$===!0&&Fe.setGlobalState(v.clippingPlanes,B),pe.length>0&&Qm(F,pe,D,B),k&&ge.viewport(E.copy(k)),F.length>0&&_r(F,D,B),pe.length>0&&_r(pe,D,B),be.length>0&&_r(be,D,B),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Qm(y,D,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;let pe=Le.isWebGL2;ye===null&&(ye=new Hn(1,1,{generateMipmaps:!0,type:Ee.has("EXT_color_buffer_half_float")?er:ii,minFilter:Qs,samples:pe?4:0})),v.getDrawingBufferSize(Ue),pe?ye.setSize(Ue.x,Ue.y):ye.setSize(No(Ue.x),No(Ue.y));let be=v.getRenderTarget();v.setRenderTarget(ye),v.getClearColor(ae),U=v.getClearAlpha(),U<1&&v.setClearColor(16777215,.5),v.clear();let Pe=v.toneMapping;v.toneMapping=ni,_r(y,B,k),b.updateMultisampleRenderTarget(ye),b.updateRenderTargetMipmap(ye);let Ie=!1;for(let Ve=0,Ne=D.length;Ve<Ne;Ve++){let Be=D[Ve],at=Be.object,Vt=Be.geometry,_t=Be.material,En=Be.group;if(_t.side===On&&at.layers.test(k.layers)){let rt=_t.side;_t.side=Ht,_t.needsUpdate=!0,Au(at,B,k,Vt,_t,En),_t.side=rt,_t.needsUpdate=!0,Ie=!0}}Ie===!0&&(b.updateMultisampleRenderTarget(ye),b.updateRenderTargetMipmap(ye)),v.setRenderTarget(be),v.setClearColor(ae,U),v.toneMapping=Pe}function _r(y,D,B){let k=D.isScene===!0?D.overrideMaterial:null;for(let F=0,pe=y.length;F<pe;F++){let be=y[F],Pe=be.object,Ie=be.geometry,Ve=k===null?be.material:k,Ne=be.group;Pe.layers.test(B.layers)&&Au(Pe,D,B,Ie,Ve,Ne)}}function Au(y,D,B,k,F,pe){y.onBeforeRender(v,D,B,k,F,pe),y.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),F.onBeforeRender(v,D,B,k,y,pe),F.transparent===!0&&F.side===On&&F.forceSinglePass===!1?(F.side=Ht,F.needsUpdate=!0,v.renderBufferDirect(B,D,k,F,y,pe),F.side=nn,F.needsUpdate=!0,v.renderBufferDirect(B,D,k,F,y,pe),F.side=On):v.renderBufferDirect(B,D,k,F,y,pe),y.onAfterRender(v,D,B,k,F,pe)}function xr(y,D,B){D.isScene!==!0&&(D=Te);let k=ze.get(y),F=m.state.lights,pe=m.state.shadowsArray,be=F.state.version,Pe=_e.getParameters(y,F.state,pe,D,B),Ie=_e.getProgramCacheKey(Pe),Ve=k.programs;k.environment=y.isMeshStandardMaterial?D.environment:null,k.fog=D.fog,k.envMap=(y.isMeshStandardMaterial?O:x).get(y.envMap||k.environment),Ve===void 0&&(y.addEventListener("dispose",re),Ve=new Map,k.programs=Ve);let Ne=Ve.get(Ie);if(Ne!==void 0){if(k.currentProgram===Ne&&k.lightsStateVersion===be)return Ru(y,Pe),Ne}else Pe.uniforms=_e.getUniforms(y),y.onBuild(B,Pe,v),y.onBeforeCompile(Pe,v),Ne=_e.acquireProgram(Pe,Ie),Ve.set(Ie,Ne),k.uniforms=Pe.uniforms;let Be=k.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Be.clippingPlanes=Fe.uniform),Ru(y,Pe),k.needsLights=ng(y),k.lightsStateVersion=be,k.needsLights&&(Be.ambientLightColor.value=F.state.ambient,Be.lightProbe.value=F.state.probe,Be.directionalLights.value=F.state.directional,Be.directionalLightShadows.value=F.state.directionalShadow,Be.spotLights.value=F.state.spot,Be.spotLightShadows.value=F.state.spotShadow,Be.rectAreaLights.value=F.state.rectArea,Be.ltc_1.value=F.state.rectAreaLTC1,Be.ltc_2.value=F.state.rectAreaLTC2,Be.pointLights.value=F.state.point,Be.pointLightShadows.value=F.state.pointShadow,Be.hemisphereLights.value=F.state.hemi,Be.directionalShadowMap.value=F.state.directionalShadowMap,Be.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Be.spotShadowMap.value=F.state.spotShadowMap,Be.spotLightMatrix.value=F.state.spotLightMatrix,Be.spotLightMap.value=F.state.spotLightMap,Be.pointShadowMap.value=F.state.pointShadowMap,Be.pointShadowMatrix.value=F.state.pointShadowMatrix),k.currentProgram=Ne,k.uniformsList=null,Ne}function Tu(y){if(y.uniformsList===null){let D=y.currentProgram.getUniforms();y.uniformsList=ds.seqWithValue(D.seq,y.uniforms)}return y.uniformsList}function Ru(y,D){let B=ze.get(y);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function eg(y,D,B,k,F){D.isScene!==!0&&(D=Te),b.resetTextureUnits();let pe=D.fog,be=k.isMeshStandardMaterial?D.environment:null,Pe=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:kn,Ie=(k.isMeshStandardMaterial?O:x).get(k.envMap||be),Ve=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ne=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Be=!!B.morphAttributes.position,at=!!B.morphAttributes.normal,Vt=!!B.morphAttributes.color,_t=ni;k.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(_t=v.toneMapping);let En=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,rt=En!==void 0?En.length:0,We=ze.get(k),Ua=m.state.lights;if($===!0&&(de===!0||y!==M)){let $t=y===M&&k.id===Y;Fe.setState(k,y,$t)}let ot=!1;k.version===We.__version?(We.needsLights&&We.lightsStateVersion!==Ua.state.version||We.outputColorSpace!==Pe||F.isBatchedMesh&&We.batching===!1||!F.isBatchedMesh&&We.batching===!0||F.isInstancedMesh&&We.instancing===!1||!F.isInstancedMesh&&We.instancing===!0||F.isSkinnedMesh&&We.skinning===!1||!F.isSkinnedMesh&&We.skinning===!0||F.isInstancedMesh&&We.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&We.instancingColor===!1&&F.instanceColor!==null||We.envMap!==Ie||k.fog===!0&&We.fog!==pe||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==Fe.numPlanes||We.numIntersection!==Fe.numIntersection)||We.vertexAlphas!==Ve||We.vertexTangents!==Ne||We.morphTargets!==Be||We.morphNormals!==at||We.morphColors!==Vt||We.toneMapping!==_t||Le.isWebGL2===!0&&We.morphTargetsCount!==rt)&&(ot=!0):(ot=!0,We.__version=k.version);let ui=We.currentProgram;ot===!0&&(ui=xr(k,D,F));let Cu=!1,Ds=!1,Da=!1,Et=ui.getUniforms(),hi=We.uniforms;if(ge.useProgram(ui.program)&&(Cu=!0,Ds=!0,Da=!0),k.id!==Y&&(Y=k.id,Ds=!0),Cu||M!==y){Et.setValue(N,"projectionMatrix",y.projectionMatrix),Et.setValue(N,"viewMatrix",y.matrixWorldInverse);let $t=Et.map.cameraPosition;$t!==void 0&&$t.setValue(N,De.setFromMatrixPosition(y.matrixWorld)),Le.logarithmicDepthBuffer&&Et.setValue(N,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Et.setValue(N,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,Ds=!0,Da=!0)}if(F.isSkinnedMesh){Et.setOptional(N,F,"bindMatrix"),Et.setOptional(N,F,"bindMatrixInverse");let $t=F.skeleton;$t&&(Le.floatVertexTextures?($t.boneTexture===null&&$t.computeBoneTexture(),Et.setValue(N,"boneTexture",$t.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(Et.setOptional(N,F,"batchingTexture"),Et.setValue(N,"batchingTexture",F._matricesTexture,b));let za=B.morphAttributes;if((za.position!==void 0||za.normal!==void 0||za.color!==void 0&&Le.isWebGL2===!0)&&w.update(F,B,ui),(Ds||We.receiveShadow!==F.receiveShadow)&&(We.receiveShadow=F.receiveShadow,Et.setValue(N,"receiveShadow",F.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(hi.envMap.value=Ie,hi.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),Ds&&(Et.setValue(N,"toneMappingExposure",v.toneMappingExposure),We.needsLights&&tg(hi,Da),pe&&k.fog===!0&&ue.refreshFogUniforms(hi,pe),ue.refreshMaterialUniforms(hi,k,X,G,ye),ds.upload(N,Tu(We),hi,b)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(ds.upload(N,Tu(We),hi,b),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Et.setValue(N,"center",F.center),Et.setValue(N,"modelViewMatrix",F.modelViewMatrix),Et.setValue(N,"normalMatrix",F.normalMatrix),Et.setValue(N,"modelMatrix",F.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let $t=k.uniformsGroups;for(let Na=0,ig=$t.length;Na<ig;Na++)if(Le.isWebGL2){let Pu=$t[Na];Ge.update(Pu,ui),Ge.bind(Pu,ui)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ui}function tg(y,D){y.ambientLightColor.needsUpdate=D,y.lightProbe.needsUpdate=D,y.directionalLights.needsUpdate=D,y.directionalLightShadows.needsUpdate=D,y.pointLights.needsUpdate=D,y.pointLightShadows.needsUpdate=D,y.spotLights.needsUpdate=D,y.spotLightShadows.needsUpdate=D,y.rectAreaLights.needsUpdate=D,y.hemisphereLights.needsUpdate=D}function ng(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(y,D,B){ze.get(y.texture).__webglTexture=D,ze.get(y.depthTexture).__webglTexture=B;let k=ze.get(y);k.__hasExternalTextures=!0,k.__hasExternalTextures&&(k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||Ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(y,D){let B=ze.get(y);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(y,D=0,B=0){A=y,I=D,C=B;let k=!0,F=null,pe=!1,be=!1;if(y){let Ie=ze.get(y);Ie.__useDefaultFramebuffer!==void 0?(ge.bindFramebuffer(N.FRAMEBUFFER,null),k=!1):Ie.__webglFramebuffer===void 0?b.setupRenderTarget(y):Ie.__hasExternalTextures&&b.rebindTextures(y,ze.get(y.texture).__webglTexture,ze.get(y.depthTexture).__webglTexture);let Ve=y.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(be=!0);let Ne=ze.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ne[D])?F=Ne[D][B]:F=Ne[D],pe=!0):Le.isWebGL2&&y.samples>0&&b.useMultisampledRTT(y)===!1?F=ze.get(y).__webglMultisampledFramebuffer:Array.isArray(Ne)?F=Ne[B]:F=Ne,E.copy(y.viewport),H.copy(y.scissor),j=y.scissorTest}else E.copy(Q).multiplyScalar(X).floor(),H.copy(ne).multiplyScalar(X).floor(),j=fe;if(ge.bindFramebuffer(N.FRAMEBUFFER,F)&&Le.drawBuffers&&k&&ge.drawBuffers(y,F),ge.viewport(E),ge.scissor(H),ge.setScissorTest(j),pe){let Ie=ze.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,Ie.__webglTexture,B)}else if(be){let Ie=ze.get(y.texture),Ve=D||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ie.__webglTexture,B||0,Ve)}Y=-1},this.readRenderTargetPixels=function(y,D,B,k,F,pe,be){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pe=ze.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&be!==void 0&&(Pe=Pe[be]),Pe){ge.bindFramebuffer(N.FRAMEBUFFER,Pe);try{let Ie=y.texture,Ve=Ie.format,Ne=Ie.type;if(Ve!==dn&&ie.convert(Ve)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Be=Ne===er&&(Ee.has("EXT_color_buffer_half_float")||Le.isWebGL2&&Ee.has("EXT_color_buffer_float"));if(Ne!==ii&&ie.convert(Ne)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ne===ei&&(Le.isWebGL2||Ee.has("OES_texture_float")||Ee.has("WEBGL_color_buffer_float")))&&!Be){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=y.width-k&&B>=0&&B<=y.height-F&&N.readPixels(D,B,k,F,ie.convert(Ve),ie.convert(Ne),pe)}finally{let Ie=A!==null?ze.get(A).__webglFramebuffer:null;ge.bindFramebuffer(N.FRAMEBUFFER,Ie)}}},this.copyFramebufferToTexture=function(y,D,B=0){let k=Math.pow(2,-B),F=Math.floor(D.image.width*k),pe=Math.floor(D.image.height*k);b.setTexture2D(D,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,y.x,y.y,F,pe),ge.unbindTexture()},this.copyTextureToTexture=function(y,D,B,k=0){let F=D.image.width,pe=D.image.height,be=ie.convert(B.format),Pe=ie.convert(B.type);b.setTexture2D(B,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment),D.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,k,y.x,y.y,F,pe,be,Pe,D.image.data):D.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,k,y.x,y.y,D.mipmaps[0].width,D.mipmaps[0].height,be,D.mipmaps[0].data):N.texSubImage2D(N.TEXTURE_2D,k,y.x,y.y,be,Pe,D.image),k===0&&B.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),ge.unbindTexture()},this.copyTextureToTexture3D=function(y,D,B,k,F=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let pe=y.max.x-y.min.x+1,be=y.max.y-y.min.y+1,Pe=y.max.z-y.min.z+1,Ie=ie.convert(k.format),Ve=ie.convert(k.type),Ne;if(k.isData3DTexture)b.setTexture3D(k,0),Ne=N.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)b.setTexture2DArray(k,0),Ne=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);let Be=N.getParameter(N.UNPACK_ROW_LENGTH),at=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Vt=N.getParameter(N.UNPACK_SKIP_PIXELS),_t=N.getParameter(N.UNPACK_SKIP_ROWS),En=N.getParameter(N.UNPACK_SKIP_IMAGES),rt=B.isCompressedTexture?B.mipmaps[F]:B.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,rt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,rt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,y.min.x),N.pixelStorei(N.UNPACK_SKIP_ROWS,y.min.y),N.pixelStorei(N.UNPACK_SKIP_IMAGES,y.min.z),B.isDataTexture||B.isData3DTexture?N.texSubImage3D(Ne,F,D.x,D.y,D.z,pe,be,Pe,Ie,Ve,rt.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),N.compressedTexSubImage3D(Ne,F,D.x,D.y,D.z,pe,be,Pe,Ie,rt.data)):N.texSubImage3D(Ne,F,D.x,D.y,D.z,pe,be,Pe,Ie,Ve,rt),N.pixelStorei(N.UNPACK_ROW_LENGTH,Be),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,at),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Vt),N.pixelStorei(N.UNPACK_SKIP_ROWS,_t),N.pixelStorei(N.UNPACK_SKIP_IMAGES,En),F===0&&k.generateMipmaps&&N.generateMipmap(Ne),ge.unbindTexture()},this.initTexture=function(y){y.isCubeTexture?b.setTextureCube(y,0):y.isData3DTexture?b.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?b.setTexture2DArray(y,0):b.setTexture2D(y,0),ge.unbindTexture()},this.resetState=function(){I=0,C=0,A=null,ge.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===kl?"display-p3":"srgb",t.unpackColorSpace=et.workingColorSpace===ia?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===dt?Ti:zf}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ti?dt:kn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},bl=class extends rr{};bl.prototype.isWebGL1Renderer=!0;var $o=class extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},Sl=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=rl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Dt=new L,Jo=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=vn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=vn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=vn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=vn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),s=Qe(s,this.array),r=Qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},or=class extends Mn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ss,qs=new L,rs=new L,os=new L,as=new Se,Ys=new Se,jf=new lt,bo=new L,js=new L,So=new L,ff=new Se,$c=new Se,pf=new Se,Ko=class extends Mt{constructor(e=new or){if(super(),this.isSprite=!0,this.type="Sprite",ss===void 0){ss=new Ct;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Sl(t,5);ss.setIndex([0,1,2,0,2,3]),ss.setAttribute("position",new Jo(n,3,0,!1)),ss.setAttribute("uv",new Jo(n,2,3,!1))}this.geometry=ss,this.material=e,this.center=new Se(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),rs.setFromMatrixScale(this.matrixWorld),jf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),os.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&rs.multiplyScalar(-os.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;Eo(bo.set(-.5,-.5,0),os,a,rs,s,r),Eo(js.set(.5,-.5,0),os,a,rs,s,r),Eo(So.set(.5,.5,0),os,a,rs,s,r),ff.set(0,0),$c.set(1,0),pf.set(1,1);let o=e.ray.intersectTriangle(bo,js,So,!1,qs);if(o===null&&(Eo(js.set(-.5,.5,0),os,a,rs,s,r),$c.set(0,1),o=e.ray.intersectTriangle(bo,So,js,!1,qs),o===null))return;let c=e.ray.origin.distanceTo(qs);c<e.near||c>e.far||t.push({distance:c,point:qs.clone(),uv:Ei.getInterpolation(qs,bo,js,So,ff,$c,pf,new Se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Eo(i,e,t,n,s,r){as.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Ys.x=r*as.x-s*as.y,Ys.y=s*as.x+r*as.y):Ys.copy(as),i.copy(e),i.x+=Ys.x,i.y+=Ys.y,i.applyMatrix4(jf)}var ar=class extends Mn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},mf=new L,gf=new L,_f=new lt,Jc=new si,wo=new Gn,El=class extends Mt{constructor(e=new Ct,t=new ar){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)mf.fromBufferAttribute(t,s-1),gf.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=mf.distanceTo(gf);e.setAttribute("lineDistance",new fn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wo.copy(n.boundingSphere),wo.applyMatrix4(s),wo.radius+=r,e.ray.intersectsSphere(wo)===!1)return;_f.copy(s).invert(),Jc.copy(e.ray).applyMatrix4(_f);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new L,u=new L,h=new L,d=new L,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let p=Math.max(0,a.start),S=Math.min(g.count,a.start+a.count);for(let v=p,R=S-1;v<R;v+=f){let I=g.getX(v),C=g.getX(v+1);if(l.fromBufferAttribute(m,I),u.fromBufferAttribute(m,C),Jc.distanceSqToSegment(l,u,d,h)>c)continue;d.applyMatrix4(this.matrixWorld);let Y=e.ray.origin.distanceTo(d);Y<e.near||Y>e.far||t.push({distance:Y,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,a.start),S=Math.min(m.count,a.start+a.count);for(let v=p,R=S-1;v<R;v+=f){if(l.fromBufferAttribute(m,v),u.fromBufferAttribute(m,v+1),Jc.distanceSqToSegment(l,u,d,h)>c)continue;d.applyMatrix4(this.matrixWorld);let C=e.ray.origin.distanceTo(d);C<e.near||C>e.far||t.push({distance:C,point:h.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}},xf=new L,vf=new L,Qo=class extends El{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)xf.fromBufferAttribute(t,s),vf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+xf.distanceTo(vf);e.setAttribute("lineDistance",new fn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ci=class extends Mn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},yf=new lt,wl=new si,Ao=new Gn,To=new L,_s=class extends Mt{constructor(e=new Ct,t=new Ci){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ao.copy(n.boundingSphere),Ao.applyMatrix4(s),Ao.radius+=r,e.ray.intersectsSphere(Ao)===!1)return;yf.copy(s).invert(),wl.copy(e.ray).applyMatrix4(yf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){let d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,_=f;g<_;g++){let m=l.getX(g);To.fromBufferAttribute(h,m),Mf(To,m,c,s,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,_=f;g<_;g++)To.fromBufferAttribute(h,g),Mf(To,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Mf(i,e,t,n,s,r,a){let o=wl.distanceSqToPoint(i);if(o<t){let c=new L;wl.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}var xs=class extends sn{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Pi=class extends Mn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nf,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};function Ro(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function bS(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var vs=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Al=class extends vs{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Sd,endingEnd:Sd}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ed:r=e,o=2*t-n;break;case wd:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ed:a=e,c=2*n-t;break;case wd:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,S=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,v=(-1-f)*m+(1.5+f)*_+.5*g,R=f*m-f*_;for(let I=0;I!==o;++I)r[I]=p*a[u+I]+S*a[l+I]+v*a[c+I]+R*a[h+I];return r}},Tl=class extends vs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*h+a[c+d]*u;return r}},Rl=class extends vs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},pn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ro(t,this.TimeBufferType),this.values=Ro(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ro(e.times,Array),values:Ro(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Rl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Tl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Al(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Po:t=this.InterpolantFactoryMethodDiscrete;break;case Lo:t=this.InterpolantFactoryMethodLinear;break;case Tc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Po;case this.InterpolantFactoryMethodLinear:return Lo;case this.InterpolantFactoryMethodSmooth:return Tc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&bS(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Tc,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{let h=o*n,d=h-n,f=h+n;for(let g=0;g!==n;++g){let _=t[h+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=Lo;var Li=class extends pn{};Li.prototype.ValueTypeName="bool";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=Po;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;var Cl=class extends pn{};Cl.prototype.ValueTypeName="color";var Pl=class extends pn{};Pl.prototype.ValueTypeName="number";var Ll=class extends vs{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let u=l+o;l!==u;l+=4)Rt.slerpFlat(r,0,a,l-o,a,l,c);return r}},cr=class extends pn{InterpolantFactoryMethodLinear(e){return new Ll(this.times,this.values,this.getValueSize(),e)}};cr.prototype.ValueTypeName="quaternion";cr.prototype.DefaultInterpolation=Lo;cr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends pn{};Ii.prototype.ValueTypeName="string";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=Po;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var Il=class extends pn{};Il.prototype.ValueTypeName="vector";var Ul=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){let f=l[h],g=l[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},SS=new Ul,Dl=class{constructor(e){this.manager=e!==void 0?e:SS,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Dl.DEFAULT_MATERIAL_NAME="__DEFAULT";var ea=class extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},ta=class extends ea{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Kc=new lt,bf=new L,Sf=new L,zl=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.map=null,this.mapPass=null,this.matrix=new lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ir,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;bf.setFromMatrixPosition(e.matrixWorld),t.position.copy(bf),Sf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sf),t.updateMatrixWorld(),Kc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Kc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Nl=class extends zl{constructor(){super(new Yo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},lr=class extends ea{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Nl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Gl="\\[\\]\\.:\\/",ES=new RegExp("["+Gl+"]","g"),Wl="[^"+Gl+"]",wS="[^"+Gl.replace("\\.","")+"]",AS=/((?:WC+[\/:])*)/.source.replace("WC",Wl),TS=/(WCOD+)?/.source.replace("WCOD",wS),RS=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wl),CS=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wl),PS=new RegExp("^"+AS+TS+RS+CS+"$"),LS=["material","materials","bones","map"],Ol=class{constructor(e,t,n){let s=n||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},st=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ES,"")}static parseTrackName(e){let t=PS.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);LS.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};st.Composite=Ol;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var MA=new Float32Array(1);var ys=class{constructor(e,t,n=0,s=1/0){this.ray=new si(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new nr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Fl(e,this,n,t),n.sort(Ef),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Fl(e[s],this,n,t);return n.sort(Ef),n}};function Ef(i,e){return i.distance-e.distance}function Fl(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){let s=i.children;for(let r=0,a=s.length;r<a;r++)Fl(s[r],e,t,!0)}}var ur=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Tt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var IS=(i,e)=>({x:i.x-e.x,y:i.y-e.y,z:i.z-e.z}),ra=(i,e)=>i.x*e.x+i.y*e.y+i.z*e.z,Zf=i=>Math.hypot(i.x,i.y,i.z),ql=(i,e)=>({x:i.x*e,y:i.y*e,z:i.z*e}),US=(i,e)=>({x:i.y*e.z-i.z*e.y,y:i.z*e.x-i.x*e.z,z:i.x*e.y-i.y*e.x}),DS=i=>{let e=Zf(i)||1;return ql(i,1/e)};function $f({otraPegatina:i,mismaPegatina:e,pixeles:t}){return i?.05:e?null:t>=30?.35:null}function zS(i,e){let t=i.getRotationAxis(e.face);if(!t)return null;if(typeof t.axis=="string"){let n={x:t.axis==="x"?1:0,y:t.axis==="y"?1:0,z:t.axis==="z"?1:0},s=e.times===3?-1:e.times===2?2:1;return{vec:n,sign:Math.sign(t.sign*s)}}return{vec:{x:t.x,y:t.y,z:t.z},sign:Math.sign(e.times)}}function Jf(i,e,t,n){let s=[],r=Math.abs((i.getAnglePerMove?.()??0)-Math.PI)<1e-6;for(let a of i.getMoveNotation())for(let o of["","'"]){let c=a+o,l=i.parseMove(c);if(!l)continue;let u=i.pickLayerPieces(c);if(!u.includes(e))continue;let h=zS(i,l);if(!h)continue;let d=ql(US(h.vec,t),h.sign);d=IS(d,ql(n,ra(d,n))),!(Zf(d)<1e-9)&&s.push({move:c,dir:DS(d),size:u.length,propio:!r&&Math.abs(ra(h.vec,n))>.9})}return OS(NS(s))}function NS(i){let e=i.filter(t=>!t.propio);return e.length?e:i}function OS(i){return i.filter(e=>!i.some(t=>t!==e&&t.size<e.size&&ra(t.dir,e.dir)>.999))}function Kf(i,e,t=.35){let n=null,s=t;for(let r of i){let a=ra(r.dir,e);a>s&&(s=a,n=r)}return n}var FS=9,BS=18,kS=[[1,0],[-1,0],[0,1],[0,-1],[.7,.7],[-.7,.7],[.7,-.7],[-.7,-.7]],oa=class{constructor(e,t,n,s,r){this.renderer=e,this.getState=t,this.onMove=n,this.isBusy=s,this.onHover=r,this._dentro=!1,this._pendiente=!1,this.raycaster=new ys,this.pointer=new Se,this.arrastre=null,this._bind()}_bind(){this._onDown=e=>this._alPulsar(e),this._onMove=e=>this._alMover(e),this._onUp=e=>this._alSoltar(e),window.addEventListener("pointerdown",this._onDown,!0),window.addEventListener("pointermove",this._onMove,!0),window.addEventListener("pointerup",this._onUp,!0),window.addEventListener("pointercancel",this._onUp,!0)}dispose(){window.removeEventListener("pointerdown",this._onDown,!0),window.removeEventListener("pointermove",this._onMove,!0),window.removeEventListener("pointerup",this._onUp,!0),window.removeEventListener("pointercancel",this._onUp,!0),this._soltarCamara()}_agarre(e){let t={dentro:!1,pegatina:null},n=this.renderer.canvas.getBoundingClientRect();if(e.clientX<n.left||e.clientX>n.right||e.clientY<n.top||e.clientY>n.bottom)return t;let s=this._rayoConMargen(e,n);if(!s?.length)return t;let r=s.find(a=>a.object.userData.sticker)??null;return{dentro:!0,pegatina:r?.object??null,punto:r?this.renderer.puzzleGroup.worldToLocal(r.point.clone()):null}}_rayoConMargen(e,t){let n=e.pointerType==="touch"?BS:FS,s=[...this.renderer.pieceMeshes.values()];for(let[r,a]of[[0,0],...kS.map(([o,c])=>[o*n,c*n])]){this.pointer.x=(e.clientX+r-t.left)/t.width*2-1,this.pointer.y=-((e.clientY+a-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.renderer.camera);let o=this.raycaster.intersectObjects(s,!0);if(o.length)return o}return null}_alPulsar(e){if(this.arrastre){this.arrastre=null,this.renderer.controls.enabled=!0;return}let{dentro:t,pegatina:n,punto:s}=this._agarre(e);if(!t)return;this.renderer.controls.enabled=!1,this._apagarBrillo();let r=n?this._normalLocal(n):null,a=n?.userData.sticker?.piece;this.arrastre={id:e.pointerId,x:e.clientX,y:e.clientY,ultimoX:e.clientX,ultimoY:e.clientY,tipo:e.pointerType,normal:r,pieza:a,pegatina:n,candidatos:a&&r&&!this.isBusy?.()?Jf(this.getState(),a,s,r):null,hecho:!1}}_vigilarPuntero(e){this._pendiente||(this._pendiente=!0,requestAnimationFrame(()=>{this._pendiente=!1;let t=this._agarre(e);if(this.arrastre){this._apagarBrillo(),this._quizaGirar(t);return}t.dentro!==this._dentro&&(this._dentro=t.dentro,this.onHover?.(t.dentro))}))}_apagarBrillo(){this._dentro&&(this._dentro=!1,this.onHover?.(!1))}_quizaGirar(e){let t=this.arrastre;if(!t||t.hecho||!t.candidatos?.length||this.isBusy?.())return;let n=t.ultimoX-t.x,s=t.ultimoY-t.y,r=$f({otraPegatina:!!e.pegatina&&e.pegatina!==t.pegatina,mismaPegatina:e.pegatina===t.pegatina,pixeles:Math.hypot(n,s)});if(r===null)return;let a=this._direccionEnLaCara(n,s,t.normal);if(!a)return;let o=Kf(t.candidatos,a,r);o&&(t.hecho=!0,this.onMove(o.move))}_alMover(e){this._vigilarPuntero(e);let t=this.arrastre;!t||e.pointerId!==t.id||(t.ultimoX=e.clientX,t.ultimoY=e.clientY)}_alSoltar(e){this.arrastre&&e.pointerId!==this.arrastre.id||(this.arrastre=null,this._vigilarPuntero(e),this._soltarCamara())}_soltarCamara(){this.renderer.controls.enabled||setTimeout(()=>{this.renderer.controls.enabled=!0},0)}_direccionEnLaCara(e,t,n){let s=this.renderer.camera,r=this.renderer.puzzleGroup.getWorldQuaternion(new Rt).invert(),a=new L(1,0,0).applyQuaternion(s.quaternion).applyQuaternion(r),o=new L(0,1,0).applyQuaternion(s.quaternion).applyQuaternion(r),c=a.multiplyScalar(e).addScaledVector(o,-t);return c.addScaledVector(n,-c.dot(n)),c.lengthSq()<1e-12?null:c.normalize()}_normalLocal(e){let t=this.renderer.puzzleGroup,n=e.userData.sticker?.poly;if(n){let s=n.vertices,r=new L;for(let l of s)r.add(new L(l.x,l.y,l.z));r.divideScalar(s.length);let a=new L(s[1].x-s[0].x,s[1].y-s[0].y,s[1].z-s[0].z),o=new L(s[2].x-s[0].x,s[2].y-s[0].y,s[2].z-s[0].z),c=a.cross(o).normalize();return c.dot(r)<0&&c.negate(),c}return e.getWorldDirection(new L).applyQuaternion(t.getWorldQuaternion(new Rt).invert()).normalize()}};function HS(i,e){let t=i.parseMove?.(e)?.face??e,n=i.getRotationAxis?.(t);if(!n)return null;if(typeof n.axis=="string")return{x:+(n.axis==="x"),y:+(n.axis==="y"),z:+(n.axis==="z")};let s=Math.hypot(n.x,n.y,n.z);return s<1e-6?null:{x:n.x/s,y:n.y/s,z:n.z/s}}function ep(i){let e=i.getPieces?.()??[];if(!e.length)return[];let t=[],n=new Map;for(let s of i.getMoveNotation()){let r=HS(i,s);if(!r)continue;let a;try{a=i.pickLayerPieces(s)}catch{continue}if(!a?.length||a.length===e.length)continue;let o=[1,-1].map(c=>({x:r.x*c,y:r.y*c,z:r.z*c})).map(c=>({dir:c,nivel:GS(a,e,c)})).filter(c=>c.nivel!==null).sort((c,l)=>c.nivel-l.nivel);for(let{dir:c,nivel:l}of o){let u=new Set(a),h=l,d=Qf(h,c);for(;n.has(d);){if(!VS(u,n.get(d))){d=null;break}d=Qf(++h,c)}if(!d)break;n.set(d,u),t.push({face:s,dir:c,nivel:h});break}}return t}var Qf=(i,e)=>[i,...[e.x,e.y,e.z].map(t=>t.toFixed(3))].join(",");function VS(i,e){if(i.size>=e.size)return!1;for(let t of i)if(!e.has(t))return!1;return!0}function GS(i,e,t){let n=a=>{let o=h=>a.x*h.position.x+a.y*h.position.y+a.z*h.position.z,c=h=>Number(h.toFixed(3)),l=[...new Set(e.map(h=>c(o(h))))].sort((h,d)=>d-h),u=c(Math.max(...i.map(o)));return l.findIndex(h=>Math.abs(h-u)<1e-6)},s=n(t),r=n({x:-t.x,y:-t.y,z:-t.z});return s===r?s>=1?Math.min(WS,s):null:s===0||s===1?s:null}var WS=2;function XS(i){let e=String(i).replace("#",""),t=e.length===3?e.split("").map(a=>a+a).join(""):e,[n,s,r]=[0,2,4].map(a=>parseInt(t.slice(a,a+2),16)/255);return .2126*n+.7152*s+.0722*r}function tp(i){if(!i)return null;let e=[].concat(i).filter(Boolean);if(!e.length)return null;let n=e.reduce((s,r)=>s+XS(r),0)/e.length>.55;return{text:n?"#141821":"#ffffff",ring:n?"rgba(0, 0, 0, 0.38)":"rgba(255, 255, 255, 0.55)"}}var Yl=i=>Math.hypot(i.x,i.y),aa=i=>typeof i=="number"?{xMin:-i,xMax:i,yMin:-i,yMax:i}:i.xMin!==void 0?i:{xMin:-i.x,xMax:i.x,yMin:-i.y,yMax:i.y},bs=(i,e,t)=>e>t?(e+t)/2:Math.max(e,Math.min(t,i));function np(i,e,t,n,s,r={x:0,y:1}){let a={x:i.x-e.x,y:i.y-e.y},o=Yl(a);if(o<1e-4){let m=Yl(r)||1;a={x:r.x/m,y:r.y/m},o=0}else a={x:a.x/o,y:a.y/o};let c=0;for(let m of t){let p=(m.x-e.x)*a.x+(m.y-e.y)*a.y;p>c&&(c=p)}let l=c+n+.06,u=o<l,h=u?l:o,d=e.x+a.x*h,f=e.y+a.y*h,g=aa(s),_=d<g.xMin||d>g.xMax||f<g.yMin||f>g.yMax;return _&&(d=bs(d,g.xMin,g.xMax),f=bs(f,g.yMin,g.yMax)),{x:d,y:f,pushed:u,clamped:_}}function qS(i,e,t,n,s,r){let a=aa(r),o=n;for(let[c,l,u,h,d]of[[i.x,e.x,t.x,a.xMin,a.xMax],[i.y,e.y,t.y,a.yMin,a.yMax]]){let f=Math.abs(u)*s,g=d-f,_=h+f;g<_||(l>1e-9?o=Math.min(o,(g-c)/l):l<-1e-9&&(o=Math.min(o,(_-c)/l)))}return Math.max(0,Math.min(n,o))}var YS=40;function ip(i,e,t){let n=aa(e),s=2*t;for(let r=0;r<YS;r++){let a=!1;for(let o=0;o<i.length;o++)for(let c=o+1;c<i.length;c++){let l=i[o],u=i[c],h=u.x-l.x,d=u.y-l.y,f=Math.hypot(h,d);if(f>=s)continue;f<1e-6&&(h=1,d=0,f=1);let g=(s-f)/2/f;l.x-=h*g,l.y-=d*g,u.x+=h*g,u.y+=d*g,a=!0}if(!a)break;for(let o of i)o.x=bs(o.x,n.xMin,n.xMax),o.y=bs(o.y,n.yMin,n.yMax)}return i}function sp(i,e,t,n,s,r={x:0,y:1},a=0,o=1){if(!a)return np(i,e,t,n,s,r);let c=n*1.15,l=np(i,e,t,n+c*o,1/0,r),u=aa(s),h={x:l.x-e.x,y:l.y-e.y},d=Yl(h)||1,f={x:h.x/d,y:h.y/d},g={x:-f.y,y:f.x},_=qS(e,f,g,d,c*o,u),m=e.x+f.x*_+g.x*a*c,p=e.y+f.y*_+g.y*a*c,S=m<u.xMin||m>u.xMax||p<u.yMin||p>u.yMax;return S&&(m=bs(m,u.xMin,u.xMax),p=bs(p,u.yMin,u.yMax)),{x:m,y:p,pushed:l.pushed,clamped:S}}var jS=[".topbar",".actions",".history-panel"];function Ss(i,e=jS){let t=i.getBoundingClientRect();if(!t.width||!t.height)return null;let n={left:t.left,right:t.right,top:t.top,bottom:t.bottom};for(let s of e){let r=document.querySelector(s);if(!r)continue;let a=r.getBoundingClientRect();if(!a.width||!a.height||a.right<=n.left||a.left>=n.right||a.bottom<=n.top||a.top>=n.bottom)continue;let o=n.right-n.left,c=n.bottom-n.top,l=[{lado:"top",valor:a.bottom,coste:(a.bottom-n.top)*o},{lado:"bottom",valor:a.top,coste:(n.bottom-a.top)*o},{lado:"left",valor:a.right,coste:(a.right-n.left)*c},{lado:"right",valor:a.left,coste:(n.right-a.left)*c}].sort((u,h)=>u.coste-h.coste)[0];n={...n,[l.lado]:l.valor}}return{...n,lienzo:t}}var rp=i=>i.endsWith("2")?i:i.endsWith("'")?i.slice(0,-1):`${i}'`;var ca=2*Math.PI,ZS=(i,e)=>{let t=((i-e)%ca+ca)%ca;return t<1e-9||ca-t<1e-9};function op(i,e){let t=i.parseMove?.(e);if(!t||Math.abs(t.times)!==2)return[];let n=i.getAnglePerMove?.();if(!n)return[];let s=t.times*n,r=e.trim().replace(/(2'?|')$/,"");return[r,`${r}'`].filter(a=>{let o=i.parseMove(a);return o&&ZS(2*o.times*n,s)})}var $S=.34,JS=2,ap=i=>1+(i??0)*JS,KS=.065,QS=18,eE=i=>KS*Math.min(1,Math.sqrt(QS/Math.max(1,i))),tE=.02,nE=i=>i*.84,cp=.28,lp=.18,iE=5,sE=16,rE=i=>i==="touch"?sE:iE,up=256,oE="rgba(26, 29, 36, 0.85)",aE="#e8ecf4",hp="#f0b429",cE="#1a1d24",dp="#ffffff",lE=140,la=class{constructor(e,t,n,s){this.renderer=e,this.onMove=t,this.isBusy=n,this.getState=s,this.group=new kt,this.renderer.scene.add(this.group),this.labels=new Map,this.visible=!0,this._active=null,this._activeLabel=null,this._hovered=null,this._pending=null,this._pressed=null,this.raycaster=new ys,this.pointer=new Se,this._bindPointer()}dispose(){this._unbindPointer(),this.clear(),this.renderer.scene.remove(this.group)}_bindPointer(){let e=this.renderer.canvas;this._onMoveEv=t=>this._handleMove(t),this._onDownEv=t=>this._handleDown(t),this._onUpEv=t=>this._handleUp(t),this._onLeaveEv=()=>this._setHover(null),this._onCancelEv=()=>{this._pending=null,this._release()},e.addEventListener("pointermove",this._onMoveEv),e.addEventListener("pointerleave",this._onLeaveEv),e.addEventListener("pointerdown",this._onDownEv),e.addEventListener("pointercancel",this._onCancelEv),window.addEventListener("pointerup",this._onUpEv)}_unbindPointer(){let e=this.renderer.canvas;e.removeEventListener("pointermove",this._onMoveEv),e.removeEventListener("pointerleave",this._onLeaveEv),e.removeEventListener("pointerdown",this._onDownEv),e.removeEventListener("pointercancel",this._onCancelEv),window.removeEventListener("pointerup",this._onUpEv)}_pickMove(e){if(!this.visible||!this.labels.size)return null;let t=this.renderer.canvas.getBoundingClientRect();return this.pointer.x=(e.clientX-t.left)/t.width*2-1,this.pointer.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.pointer,this.renderer.camera),this.group.updateMatrixWorld(!0),this.raycaster.intersectObjects(this.group.children,!1)[0]?.object?.userData?.move??null}_handleMove(e){if(this.isBusy?.()){this._setHover(null);return}this._setHover(this._pickMove(e))}_setHover(e){e!==this._hovered&&(this._hovered=e,this.announce(e,this.getState?.()),this.renderer.canvas.style.cursor=e?"pointer":"")}_handleDown(e){if(this._pending=null,this.isBusy?.())return;let t=this._pickMove(e);t&&(this._pending={move:t,x:e.clientX,y:e.clientY,pointerType:e.pointerType},this._press(t))}_handleUp(e){let t=this._pending;if(this._pending=null,this._release(),!t||this.isBusy?.())return;let n=e.clientX-t.x,s=e.clientY-t.y;Math.hypot(n,s)>rE(t.pointerType)||this.onMove?.(t.move)}_press(e){let t=this.labels.get(e);t&&(this._apagarPulsado(),this._pressed={label:t,at:performance.now()},this.announce(e,this.getState?.()))}_release(){let e=this._pressed;if(!e)return;let t=lE-(performance.now()-e.at);t>0?setTimeout(()=>{this._pressed===e&&this._apagarPulsado()},t):this._apagarPulsado()}_apagarPulsado(){let e=this._pressed;e&&(this._pressed=null,this.labels.get(e.label.move)===e.label&&(this._activeLabel===e.label&&this._hovered!==e.label.move?this._restore():this._repintar(e.label,!1)))}_repintar(e,t){let n=this._activeLabel===e;this._draw(e,n?this._active??e.move:e.move,n,t)}clear(){for(let{sprite:e,texture:t}of this.labels.values())this.group.remove(e),e.material.dispose(),t.dispose();this.labels.clear(),this._active=null,this._activeLabel=null,this._hovered=null,this._pending=null,this._pressed=null,this.renderer.canvas.style.cursor=""}setVisible(e){this.visible=e,this.group.visible=e}rotuloDestacable(){if(!this.visible)return null;let e=null,t=-1;for(let[n,s]of this.labels){let r=s.sprite.material.opacity??0;r>t&&(t=r,e=n)}return e}rectanguloEnPantalla(e){let t=this.labels.get(e);if(!t||!this.visible)return null;let n=this.renderer.camera,s=this.renderer.canvas.getBoundingClientRect();if(!n||!s.width||!s.height)return null;let r=t.sprite.position.clone().project(n);if(r.z>1)return null;let a=s.left+(r.x+1)/2*s.width,o=s.top+(1-r.y)/2*s.height,c=this._radio*(s.height/2);return{x:a-c,y:o-c,ancho:c*2,alto:c*2}}rebuild(e){if(this.clear(),!e)return;let t=new Vn().setFromObject(this.renderer.puzzleGroup);if(t.isEmpty())return;let n=this.renderer.puzzleGroup.scale.x||1,s=t.getBoundingSphere(new Gn).radius/n,r=this._corners(t).map(o=>o.divideScalar(n));this._hull=r;let a=ep(e);this._masAncho=Math.max(1.5,...a.map(o=>ap(o.nivel)));for(let{face:o,dir:c,nivel:l}of a){let u=ap(l),h=rp(o),d=[{move:o,lateral:-u}];h!==o&&e.parseMove?.(h)?d.push({move:h,lateral:+u}):d[0].lateral=0;let f=new L(c.x,c.y,c.z),_=Math.max(...r.map(p=>p.dot(f)))+s*$S,m=e.getFaceColour?.(o)??null;for(let{move:p,lateral:S}of d){let v=this._makeLabel(p,S,m);v.sprite.userData.hacia=f,v.sprite.userData.medida=_,v.sprite.userData.nivel=l,v.sprite.position.copy(f).multiplyScalar(_*n),this.group.add(v.sprite),this.labels.set(p,v)}}this._tamano=eE(this.labels.size),this._radio=nE(this._tamano),this.group.visible=this.visible}announce(e,t){if(this._active&&this._active!==e&&this._restore(),!e){this._restore();return}let n=t?.parseMove?.(e)?.face,s=this.labels.get(e)??(n&&this.labels.get(n));s&&(this._draw(s,e,!0,this._pressed?.label===s),this._active=e,this._activeLabel=s)}_restore(){let e=this._activeLabel;e&&this._draw(e,e.move,!1,this._pressed?.label===e),this._active=null,this._activeLabel=null}_corners(e){let t=[];for(let n of[e.min.x,e.max.x])for(let s of[e.min.y,e.max.y])for(let r of[e.min.z,e.max.z])t.push(new L(n,s,r));return t}_colocar(e){if(!this.labels.size)return;let t=e.aspect||1,n=this.renderer.puzzleGroup.scale.x||1,s=(f,g)=>(g.copy(f).project(e),{x:g.x*t,y:g.y}),r=new L,a=s(new L(0,0,0),r),o=(this._hull??[]).map(f=>s(r.copy(f).multiplyScalar(n),r)),c=this._huecoLibre(t),l=[],u=new L;for(let f of this.labels.values()){let g=f.sprite,_=r.copy(g.userData.hacia).multiplyScalar(g.userData.medida*n);u.copy(_).project(e);let m=sp({x:u.x*t,y:u.y},a,o,this._radio,c,void 0,g.userData.lateral,this._masAncho??1);l.push({sprite:g,x:m.x,y:m.y,z:u.z})}ip(l,c,this._radio);let h=r.copy(e.position).normalize(),d=2*Math.tan(e.fov*Math.PI/180/2);for(let f of l){u.set(f.x/t,f.y,f.z),f.sprite.position.copy(u.unproject(e));let g=e.position.distanceTo(f.sprite.position);f.sprite.scale.setScalar(g*d*this._tamano);let _=f.sprite.userData.hacia.dot(h),m=Math.max(0,Math.min(1,(_+lp)/(2*lp)));f.sprite.material.opacity=cp+(1-cp)*m}this.group.updateMatrixWorld(!0)}_huecoLibre(e){let t=this.renderer.hueco??Ss(this.renderer.canvas);if(!t)return{x:e,y:1};let n=t.lienzo,s=(c,l)=>({x:((c-n.left)/n.width*2-1)*e,y:-((l-n.top)/n.height*2-1)}),r=s(t.left,t.bottom),a=s(t.right,t.top),o=this._radio+tE;return{xMin:r.x+o,xMax:a.x-o,yMin:r.y+o,yMax:a.y-o}}_makeLabel(e,t=0,n=null){let s=document.createElement("canvas");s.width=s.height=up;let r=s.getContext("2d"),a=new xs(s),o=new Ko(new or({map:a,transparent:!0,depthTest:!1,depthWrite:!1}));o.renderOrder=10,o.userData.move=e,o.userData.lateral=t,o.onBeforeRender=(l,u,h)=>{if(!h.isPerspectiveCamera)return;let d=l.info?.render?.frame??-1;d!==this._frame&&(this._frame=d,this._colocar(h))};let c={sprite:o,canvas:s,ctx:r,texture:a,move:e,ink:tp(n),colour:n};return this._draw(c,e,!1),c}_draw(e,t,n,s=!1){let{ctx:r,texture:a,ink:o}=e,c=up,l=c*.42;r.clearRect(0,0,c,c);let u=o?[].concat(e.colour):null;if(u){let h=Math.PI*2/u.length;u.forEach((d,f)=>{r.beginPath(),r.moveTo(c/2,c/2),r.arc(c/2,c/2,l,-Math.PI/2+f*h,-Math.PI/2+(f+1)*h),r.closePath(),r.fillStyle=d,r.fill()})}else r.beginPath(),r.arc(c/2,c/2,l,0,Math.PI*2),r.fillStyle=n?hp:oE,r.fill();r.beginPath(),r.arc(c/2,c/2,l,0,Math.PI*2),r.lineWidth=c*(n?.085:.045),r.strokeStyle=n?o?"#ffffff":hp:o?o.ring:"rgba(232, 236, 244, 0.55)",r.stroke(),s&&(r.save(),r.beginPath(),r.arc(c/2,c/2,l,0,Math.PI*2),r.lineWidth=c*.095,r.strokeStyle=dp,r.shadowColor=dp,r.shadowBlur=c*.025,r.stroke(),r.stroke(),r.restore()),r.fillStyle=o?o.text:n?cE:aE,r.font=`bold ${Math.round(c*(t.length>2?.32:.46))}px system-ui, sans-serif`,r.textAlign="center",r.textBaseline="middle",u?.length>1&&(r.lineWidth=c*.055,r.lineJoin="round",r.strokeStyle=o.text==="#ffffff"?"rgba(0, 0, 0, 0.6)":"rgba(255, 255, 255, 0.7)",r.strokeText(t,c/2,c/2+c*.02)),r.fillText(t,c/2,c/2+c*.02),a.needsUpdate=!0}};var fp={type:"change"},jl={type:"start"},pp={type:"end"},ua=new si,mp=new un,uE=Math.cos(70*Ff.DEG2RAD),ha=class extends yn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ui.ROTATE,MIDDLE:Ui.DOLLY,RIGHT:Ui.PAN},this.touches={ONE:Di.ROTATE,TWO:Di.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(w){w.addEventListener("keydown",ee),this._domElementKeyEvents=w},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(fp),n.update(),r=s.NONE},this.update=(function(){let w=new L,Z=new Rt().setFromUnitVectors(e.up,new L(0,1,0)),ce=Z.clone().invert(),ie=new L,ve=new Rt,Ge=new L,je=2*Math.PI;return function(oe=null){let P=n.object.position;w.copy(P).sub(n.target),w.applyQuaternion(Z),o.setFromVector3(w),n.autoRotate&&r===s.NONE&&H(M(oe)),n.enableDamping?(o.theta+=c.theta*n.dampingFactor,o.phi+=c.phi*n.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let se=n.minAzimuthAngle,re=n.maxAzimuthAngle;isFinite(se)&&isFinite(re)&&(se<-Math.PI?se+=je:se>Math.PI&&(se-=je),re<-Math.PI?re+=je:re>Math.PI&&(re-=je),se<=re?o.theta=Math.max(se,Math.min(re,o.theta)):o.theta=o.theta>(se+re)/2?Math.max(se,o.theta):Math.min(re,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&C||n.object.isOrthographicCamera?o.radius=W(o.radius):o.radius=W(o.radius*l),w.setFromSpherical(o),w.applyQuaternion(ce),P.copy(n.target).add(w),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),u.set(0,0,0));let we=!1;if(n.zoomToCursor&&C){let Me=null;if(n.object.isPerspectiveCamera){let Ze=w.length();Me=W(Ze*l);let Je=Ze-Me;n.object.position.addScaledVector(R,Je),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let Ze=new L(I.x,I.y,0);Ze.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),we=!0;let Je=new L(I.x,I.y,0);Je.unproject(n.object),n.object.position.sub(Je).add(Ze),n.object.updateMatrixWorld(),Me=w.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Me!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Me).add(n.object.position):(ua.origin.copy(n.object.position),ua.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(ua.direction))<uE?e.lookAt(n.target):(mp.setFromNormalAndCoplanarPoint(n.object.up,n.target),ua.intersectPlane(mp,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),we=!0);return l=1,C=!1,we||ie.distanceToSquared(n.object.position)>a||8*(1-ve.dot(n.object.quaternion))>a||Ge.distanceToSquared(n.target)>0?(n.dispatchEvent(fp),ie.copy(n.object.position),ve.copy(n.object.quaternion),Ge.copy(n.target),!0):!1}})(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",me),n.domElement.removeEventListener("pointerdown",ze),n.domElement.removeEventListener("pointercancel",x),n.domElement.removeEventListener("wheel",K),n.domElement.removeEventListener("pointermove",b),n.domElement.removeEventListener("pointerup",x),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",ee),n._domElementKeyEvents=null)};let n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},r=s.NONE,a=1e-6,o=new ur,c=new ur,l=1,u=new L,h=new Se,d=new Se,f=new Se,g=new Se,_=new Se,m=new Se,p=new Se,S=new Se,v=new Se,R=new L,I=new Se,C=!1,A=[],Y={};function M(w){return w!==null?2*Math.PI/60*n.autoRotateSpeed*w:2*Math.PI/60/60*n.autoRotateSpeed}function E(w){let Z=Math.abs(w)/(100*(window.devicePixelRatio|0));return Math.pow(.95,n.zoomSpeed*Z)}function H(w){c.theta-=w}function j(w){c.phi-=w}let ae=(function(){let w=new L;return function(ce,ie){w.setFromMatrixColumn(ie,0),w.multiplyScalar(-ce),u.add(w)}})(),U=(function(){let w=new L;return function(ce,ie){n.screenSpacePanning===!0?w.setFromMatrixColumn(ie,1):(w.setFromMatrixColumn(ie,0),w.crossVectors(n.object.up,w)),w.multiplyScalar(ce),u.add(w)}})(),z=(function(){let w=new L;return function(ce,ie){let ve=n.domElement;if(n.object.isPerspectiveCamera){let Ge=n.object.position;w.copy(Ge).sub(n.target);let je=w.length();je*=Math.tan(n.object.fov/2*Math.PI/180),ae(2*ce*je/ve.clientHeight,n.object.matrix),U(2*ie*je/ve.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(ae(ce*(n.object.right-n.object.left)/n.object.zoom/ve.clientWidth,n.object.matrix),U(ie*(n.object.top-n.object.bottom)/n.object.zoom/ve.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function G(w){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=w:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function X(w){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=w:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function q(w,Z){if(!n.zoomToCursor)return;C=!0;let ce=n.domElement.getBoundingClientRect(),ie=w-ce.left,ve=Z-ce.top,Ge=ce.width,je=ce.height;I.x=ie/Ge*2-1,I.y=-(ve/je)*2+1,R.set(I.x,I.y,1).unproject(n.object).sub(n.object.position).normalize()}function W(w){return Math.max(n.minDistance,Math.min(n.maxDistance,w))}function Q(w){h.set(w.clientX,w.clientY)}function ne(w){q(w.clientX,w.clientX),p.set(w.clientX,w.clientY)}function fe(w){g.set(w.clientX,w.clientY)}function V(w){d.set(w.clientX,w.clientY),f.subVectors(d,h).multiplyScalar(n.rotateSpeed);let Z=n.domElement;H(2*Math.PI*f.x/Z.clientHeight),j(2*Math.PI*f.y/Z.clientHeight),h.copy(d),n.update()}function $(w){S.set(w.clientX,w.clientY),v.subVectors(S,p),v.y>0?G(E(v.y)):v.y<0&&X(E(v.y)),p.copy(S),n.update()}function de(w){_.set(w.clientX,w.clientY),m.subVectors(_,g).multiplyScalar(n.panSpeed),z(m.x,m.y),g.copy(_),n.update()}function ye(w){q(w.clientX,w.clientY),w.deltaY<0?X(E(w.deltaY)):w.deltaY>0&&G(E(w.deltaY)),n.update()}function xe(w){let Z=!1;switch(w.code){case n.keys.UP:w.ctrlKey||w.metaKey||w.shiftKey?j(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(0,n.keyPanSpeed),Z=!0;break;case n.keys.BOTTOM:w.ctrlKey||w.metaKey||w.shiftKey?j(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(0,-n.keyPanSpeed),Z=!0;break;case n.keys.LEFT:w.ctrlKey||w.metaKey||w.shiftKey?H(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(n.keyPanSpeed,0),Z=!0;break;case n.keys.RIGHT:w.ctrlKey||w.metaKey||w.shiftKey?H(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(-n.keyPanSpeed,0),Z=!0;break}Z&&(w.preventDefault(),n.update())}function Ue(w){if(A.length===1)h.set(w.pageX,w.pageY);else{let Z=Ye(w),ce=.5*(w.pageX+Z.x),ie=.5*(w.pageY+Z.y);h.set(ce,ie)}}function De(w){if(A.length===1)g.set(w.pageX,w.pageY);else{let Z=Ye(w),ce=.5*(w.pageX+Z.x),ie=.5*(w.pageY+Z.y);g.set(ce,ie)}}function Te(w){let Z=Ye(w),ce=w.pageX-Z.x,ie=w.pageY-Z.y,ve=Math.sqrt(ce*ce+ie*ie);p.set(0,ve)}function qe(w){n.enableZoom&&Te(w),n.enablePan&&De(w)}function N(w){n.enableZoom&&Te(w),n.enableRotate&&Ue(w)}function mt(w){if(A.length==1)d.set(w.pageX,w.pageY);else{let ce=Ye(w),ie=.5*(w.pageX+ce.x),ve=.5*(w.pageY+ce.y);d.set(ie,ve)}f.subVectors(d,h).multiplyScalar(n.rotateSpeed);let Z=n.domElement;H(2*Math.PI*f.x/Z.clientHeight),j(2*Math.PI*f.y/Z.clientHeight),h.copy(d)}function Ee(w){if(A.length===1)_.set(w.pageX,w.pageY);else{let Z=Ye(w),ce=.5*(w.pageX+Z.x),ie=.5*(w.pageY+Z.y);_.set(ce,ie)}m.subVectors(_,g).multiplyScalar(n.panSpeed),z(m.x,m.y),g.copy(_)}function Le(w){let Z=Ye(w),ce=w.pageX-Z.x,ie=w.pageY-Z.y,ve=Math.sqrt(ce*ce+ie*ie);S.set(0,ve),v.set(0,Math.pow(S.y/p.y,n.zoomSpeed)),G(v.y),p.copy(S);let Ge=(w.pageX+Z.x)*.5,je=(w.pageY+Z.y)*.5;q(Ge,je)}function ge(w){n.enableZoom&&Le(w),n.enablePan&&Ee(w)}function nt(w){n.enableZoom&&Le(w),n.enableRotate&&mt(w)}function ze(w){n.enabled!==!1&&(A.length===0&&(n.domElement.setPointerCapture(w.pointerId),n.domElement.addEventListener("pointermove",b),n.domElement.addEventListener("pointerup",x)),Re(w),w.pointerType==="touch"?_e(w):O(w))}function b(w){n.enabled!==!1&&(w.pointerType==="touch"?ue(w):te(w))}function x(w){Fe(w),A.length===0&&(n.domElement.releasePointerCapture(w.pointerId),n.domElement.removeEventListener("pointermove",b),n.domElement.removeEventListener("pointerup",x)),n.dispatchEvent(pp),r=s.NONE}function O(w){let Z;switch(w.button){case 0:Z=n.mouseButtons.LEFT;break;case 1:Z=n.mouseButtons.MIDDLE;break;case 2:Z=n.mouseButtons.RIGHT;break;default:Z=-1}switch(Z){case Ui.DOLLY:if(n.enableZoom===!1)return;ne(w),r=s.DOLLY;break;case Ui.ROTATE:if(w.ctrlKey||w.metaKey||w.shiftKey){if(n.enablePan===!1)return;fe(w),r=s.PAN}else{if(n.enableRotate===!1)return;Q(w),r=s.ROTATE}break;case Ui.PAN:if(w.ctrlKey||w.metaKey||w.shiftKey){if(n.enableRotate===!1)return;Q(w),r=s.ROTATE}else{if(n.enablePan===!1)return;fe(w),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(jl)}function te(w){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;V(w);break;case s.DOLLY:if(n.enableZoom===!1)return;$(w);break;case s.PAN:if(n.enablePan===!1)return;de(w);break}}function K(w){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(w.preventDefault(),n.dispatchEvent(jl),ye(w),n.dispatchEvent(pp))}function ee(w){n.enabled===!1||n.enablePan===!1||xe(w)}function _e(w){switch(J(w),A.length){case 1:switch(n.touches.ONE){case Di.ROTATE:if(n.enableRotate===!1)return;Ue(w),r=s.TOUCH_ROTATE;break;case Di.PAN:if(n.enablePan===!1)return;De(w),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case Di.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;qe(w),r=s.TOUCH_DOLLY_PAN;break;case Di.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;N(w),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(jl)}function ue(w){switch(J(w),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;mt(w),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;Ee(w),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ge(w),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;nt(w),n.update();break;default:r=s.NONE}}function me(w){n.enabled!==!1&&w.preventDefault()}function Re(w){A.push(w.pointerId)}function Fe(w){delete Y[w.pointerId];for(let Z=0;Z<A.length;Z++)if(A[Z]==w.pointerId){A.splice(Z,1);return}}function J(w){let Z=Y[w.pointerId];Z===void 0&&(Z=new Se,Y[w.pointerId]=Z),Z.set(w.pageX,w.pageY)}function Ye(w){let Z=w.pointerId===A[0]?A[1]:A[0];return Y[Z]}n.domElement.addEventListener("contextmenu",me),n.domElement.addEventListener("pointerdown",ze),n.domElement.addEventListener("pointercancel",x),n.domElement.addEventListener("wheel",K,{passive:!1}),this.update()}};var hE=Object.freeze([{nombre:"Ori\xF3n",estrellas:[[88.793,7.407],[81.283,6.35],[85.19,-1.943],[84.053,-1.202],[83.002,-.299],[86.939,-9.67],[78.634,-8.202]],lineas:[[0,1],[1,4],[4,3],[3,2],[2,0],[2,5],[4,6],[6,5]]},{nombre:"Osa Mayor",estrellas:[[165.932,61.751],[165.46,56.383],[178.458,53.695],[183.857,57.033],[193.507,55.96],[200.981,54.925],[206.885,49.313]],lineas:[[0,1],[1,2],[2,3],[3,0],[3,4],[4,5],[5,6]]},{nombre:"Casiopea",estrellas:[[28.599,63.67],[21.454,60.235],[14.177,60.717],[10.127,56.537],[2.295,59.15]],lineas:[[0,1],[1,2],[2,3],[3,4]]},{nombre:"Cruz del Sur",estrellas:[[186.65,-63.099],[191.93,-59.689],[187.791,-57.113],[183.786,-58.749]],lineas:[[0,2],[1,3]]},{nombre:"Escorpio",estrellas:[[241.359,-19.806],[240.083,-22.622],[239.713,-26.114],[247.352,-26.432],[248.971,-28.216],[252.543,-34.293],[252.968,-38.048],[253.646,-42.362],[258.038,-43.239],[264.33,-42.998],[266.896,-40.127],[263.402,-37.104],[262.691,-37.296]],lineas:[[0,1],[1,2],[1,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12]]},{nombre:"Can Mayor",estrellas:[[101.287,-16.716],[95.675,-17.956],[105.94,-15.633],[107.098,-26.393],[104.656,-28.972],[111.024,-29.303],[95.078,-30.063]],lineas:[[0,1],[0,2],[0,3],[3,4],[4,6],[3,5]]}]),gp=Math.PI/180;function dE(i,e){let t=i*gp,n=e*gp,s=Math.cos(n);return{x:s*Math.cos(t),y:Math.sin(n),z:s*Math.sin(t)}}function fE(i=Math.random){let e=i(),t=i()*2*Math.PI,n=i()*2*Math.PI,s=Math.sqrt(1-e),r=Math.sqrt(e);return[s*Math.sin(t),s*Math.cos(t),r*Math.sin(n),r*Math.cos(n)]}function pE({x:i,y:e,z:t},[n,s,r,a]){let o=2*(s*t-r*e),c=2*(r*i-n*t),l=2*(n*e-s*i);return{x:i+a*o+s*l-r*c,y:e+a*c+r*o-n*l,z:t+a*l+n*c-s*o}}function mE(i,e=Math.random){let t=[...i];for(let n=t.length-1;n>0;n--){let s=Math.floor(e()*(n+1));[t[n],t[s]]=[t[s],t[n]]}return t}var gE=4;function _p({cuantas:i=gE,radio:e=1,azar:t=Math.random}={}){let n=fE(t),r=mE(hE,t).slice(0,i).map(a=>({nombre:a.nombre,estrellas:a.estrellas.map(([o,c])=>{let l=pE(dE(o,c),n);return{x:l.x*e,y:l.y*e,z:l.z*e}}),lineas:a.lineas}));return{giro:n,figuras:r}}function xp(i){let e=[],t=[];for(let n of i){for(let s of n.estrellas)e.push(s.x,s.y,s.z);for(let[s,r]of n.lineas){let a=n.estrellas[s],o=n.estrellas[r];t.push(a.x,a.y,a.z,o.x,o.y,o.z)}}return{puntos:new Float32Array(e),lineas:new Float32Array(t)}}function vp({cuantos:i,radio:e,ancho:t=.45,grupos:n=2,azar:s=Math.random}={}){let r=Array.from({length:n},()=>[]);for(let a=0;a<i;a++){let o=s()*2-1,c=s()*Math.PI*2,l=Math.sqrt(1-o*o),u=e*(1+s()*t);r[a%n].push(Math.cos(c)*l*u,o*u,Math.sin(c)*l*u)}return r.map(a=>new Float32Array(a))}var ri=Object.freeze({cube:Object.freeze([5,4.5,6.5]),pyraminx:Object.freeze([1.2,1.8,7]),cuboid:Object.freeze([4.6,5.6,6.4]),megaminx:Object.freeze([.6,3.4,8])}),OA=Object.freeze(Object.keys(ri));function da(i){let e=String(i??"").startsWith("cuboid")?"cuboid":i;return ri[e]??ri.cube}var _E=[0,1,0];var Zl=(i,e)=>i[0]*e[0]+i[1]*e[1]+i[2]*e[2],yp=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],Mp=i=>{let e=Math.hypot(...i);return e>0?[i[0]/e,i[1]/e,i[2]/e]:[0,0,1]};function xE(i){let e=Mp(i??[0,0,1]),t=yp(_E,e),n=Math.hypot(...t)>1e-6?Mp(t):[1,0,0];return{x:n,y:yp(e,n),z:e}}function bp(i){let e=[...i].sort((s,r)=>r[0]-s[0]),t=[],n=-1/0;for(let s of e)s[1]<=n||(n=s[1],t.push(s));return t}function Ep(i,e){let t=xE(i),n=[],s=[];for(let r of e){let a=Zl(r,t.z);n.push([Math.abs(Zl(r,t.x)),a]),s.push([Math.abs(Zl(r,t.y)),a])}return{ancho:bp(n),alto:bp(s)}}function Sp(i,e,t){let n=1/0;for(let[s,r]of i){let a=s+t*r;if(a<=1e-9)continue;let o=e*t/a;o<n&&(n=o)}return n}function wp({silueta:i,distancia:e,fovGrados:t,aspecto:n}={}){if(!i||!(e>0))return 1/0;let s=Math.tan(t*Math.PI/180/2);return!(s>0)||!(n>0)?1/0:Math.min(Sp(i.alto,e,s),Sp(i.ancho,e,s*n))}var $l=.95,Ap=.85,Es=.478,Jl=1,vE=240,yE=3,ME=95,bE=[{cuantas:500,radio:30,tamano:.085,brillo:.95,anclaje:0},{cuantas:900,radio:45,tamano:.1,brillo:.8,anclaje:.5},{cuantas:1250,radio:60,tamano:.115,brillo:.6,anclaje:.8}],SE={radio:70,anclaje:.92,tamano:.3,brillo:.95,linea:{color:7308984,opacidad:.22}},ws={cuantos:260,radio:21,ancho:.18,anclaje:0,siluetas:[{tamano:.28,brillo:.55},{tamano:.42,brillo:.45}]},EE=new L(0,0,1),wE={[Ae.PX]:{pos:[Es,0,0],rot:[0,Math.PI/2,0]},[Ae.NX]:{pos:[-Es,0,0],rot:[0,-Math.PI/2,0]},[Ae.PY]:{pos:[0,Es,0],rot:[-Math.PI/2,0,0]},[Ae.NY]:{pos:[0,-Es,0],rot:[Math.PI/2,0,0]},[Ae.PZ]:{pos:[0,0,Es],rot:[0,0,0]},[Ae.NZ]:{pos:[0,0,-Es],rot:[0,Math.PI,0]}},AE=3752527,TE=.5,Kl=320,RE=320,CE=260,fa=i=>i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2,pa=class{constructor(e,{onFirstFrame:t}={}){this.canvas=e,this.onFirstFrame=t,this._initScene(),this._initLights(),this._initControls(),this._initResize(),this._isAnimating=!1,this._animationQueue=[],this.pieceMeshes=new Map,this.stickerMeshes=[],this.bodyMaterials=[],this._glow=!1,this._pensandoTarea=0,this._pensandoColores=null,this.puzzleGroup=new kt,this.scene.add(this.puzzleGroup),this._stateType=null,this._startRenderLoop()}_initScene(){this.scene=new $o,this.scene.background=new Oe(329485),this.estrellas=null,this.capasEstrellas=[],this._dirCamara=new L,this._giroCamara=new Rt;let e=this.canvas.clientWidth/this.canvas.clientHeight;this.camera=new Ot(45,e||1,.1,100),this.camera.position.set(5,4.5,6.5),this.camera.lookAt(0,0,0),this.renderer=new rr({canvas:this.canvas,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(this.canvas.clientWidth,this.canvas.clientHeight,!1)}_fitFactor(){let e=this.camera.aspect||1;return e>=1?1:Math.min(1.4,1/Math.sqrt(Math.max(e,.45)))}_placeCamera(e,t,n){let s=this._fitFactor();this.camera.position.set(e*s,t*s,n*s),this.camera.lookAt(0,0,0),this.controls.target.set(0,0,0),this.controls.update()}reencuadrar({ms:e=Kl}={}){let[t,n,s]=da(this._stateType),r=this._fitFactor(),a=new L(t*r,n*r,s*r);if(cancelAnimationFrame(this._vistaRaf),!e){this._acabarReencuadre(a);return}let o=this.camera.position.clone(),c=this.controls.target.clone(),l=new L(0,0,0);this.controls.enabled=!1;let u=performance.now(),h=d=>{let f=Math.min(1,(d-u)/e),g=fa(f);if(this.camera.position.lerpVectors(o,a,g),this.controls.target.lerpVectors(c,l,g),this.camera.lookAt(this.controls.target),f<1){this._vistaRaf=requestAnimationFrame(h);return}this._acabarReencuadre(a)};this._vistaRaf=requestAnimationFrame(h)}_acabarReencuadre(e){this._vistaRaf=0,this.camera.position.copy(e),this.controls.target.set(0,0,0),this.controls.enabled=!0,this.controls.update()}_initLights(){let e=new ta(16777215,2105392,.85);this.scene.add(e);let t=new lr(16777215,.9);t.position.set(5,8,6),this.scene.add(t);let n=new lr(10531071,.35);n.position.set(-6,-3,-4),this.scene.add(n)}_initControls(){this.controls=new ha(this.camera,this.canvas),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.minDistance=4,this.controls.maxDistance=20,this.controls.enablePan=!1}_initResize(){this._onResize=()=>this._handleResize(),window.addEventListener("resize",this._onResize)}_handleResize(){let e=this.canvas.clientWidth,t=this.canvas.clientHeight;e===0||t===0||(this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1),this._resolverSitio({ms:0}))}_encuadrar(){if(this.hueco=Ss(this.canvas),!this.hueco)return;let{lienzo:e}=this.hueco,t=(e.top+e.bottom)/2-(this.hueco.top+this.hueco.bottom)/2,n=this._subida??t;if(this._subida=Math.abs(t-n)<.5?t:n+(t-n)*.18,Math.abs(this._subida)<.5){this.camera.view?.enabled&&this.camera.clearViewOffset();return}this.camera.setViewOffset(e.width,e.height,0,this._subida,e.width,e.height)}_crearEstrellas(){if(this.estrellas)return;let e=new kt,t=new Oe;for(let n of bE){let s=new Float32Array(n.cuantas*3),r=new Float32Array(n.cuantas*3);for(let l=0;l<n.cuantas;l++){let u=Math.random()*2-1,h=Math.random()*Math.PI*2,d=Math.sqrt(1-u*u),f=n.radio*(.85+Math.random()*.3);s[l*3]=Math.cos(h)*d*f,s[l*3+1]=u*f,s[l*3+2]=Math.sin(h)*d*f;let g=Math.random(),_=g<.12||g>.94;t.setHSL(g<.12?.58:g>.94?.09:.6,_?.45:.05,.5+Math.pow(Math.random(),3)*.5),r[l*3]=t.r,r[l*3+1]=t.g,r[l*3+2]=t.b}let a=new Ct;a.setAttribute("position",new ht(s,3)),a.setAttribute("color",new ht(r,3));let o=new Ci({size:n.tamano,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:n.brillo,depthWrite:!1}),c=new _s(a,o);c.userData.anclaje=n.anclaje,e.add(c),this.capasEstrellas.push(c)}this.estrellas=e,this.scene.add(e),this._crearConstelaciones(e),this._crearCinturon(e)}_crearConstelaciones(e){let t=SE,{figuras:n}=_p({radio:t.radio}),{puntos:s,lineas:r}=xp(n);if(!s.length)return;let a=new Ct;a.setAttribute("position",new ht(s,3));let o=new _s(a,new Ci({size:t.tamano,sizeAttenuation:!0,color:16777215,transparent:!0,opacity:t.brillo,depthWrite:!1})),c=new Ct;c.setAttribute("position",new ht(r,3));let l=new Qo(c,new ar({color:t.linea.color,transparent:!0,opacity:t.linea.opacidad,depthWrite:!1}));for(let u of[o,l])u.userData.anclaje=t.anclaje,e.add(u),this.capasEstrellas.push(u)}_siluetaDeRoca(e){let n=document.createElement("canvas");n.width=n.height=32;let s=n.getContext("2d");if(!s)return null;let r=32/2,a=12;s.beginPath();for(let c=0;c<a;c++){let l=c/a*Math.PI*2,u=.72+.28*Math.abs(Math.sin(c*e)),h=r*.92*u,d=r+Math.cos(l)*h,f=r+Math.sin(l)*h;c===0?s.moveTo(d,f):s.lineTo(d,f)}s.closePath(),s.fillStyle="#ffffff",s.fill();let o=new xs(n);return o.colorSpace=dt,o}_crearCinturon(e){vp({cuantos:ws.cuantos,radio:ws.radio,ancho:ws.ancho,grupos:ws.siluetas.length}).forEach((n,s)=>{if(!n.length)return;let r=ws.siluetas[s],a=new Ct;a.setAttribute("position",new ht(n,3));let o=new _s(a,new Ci({size:r.tamano,sizeAttenuation:!0,map:this._siluetaDeRoca(1.7+s*.9),color:9143671,transparent:!0,opacity:r.brillo,depthWrite:!1}));o.userData.anclaje=ws.anclaje,e.add(o),this.capasEstrellas.push(o)})}_orientarEstrellas(){if(this.estrellas&&(this._dirCamara.copy(this.camera.position),this._dirCamara.lengthSq()!==0)){this._dirCamara.normalize(),this._giroCamara.setFromUnitVectors(EE,this._dirCamara);for(let e of this.capasEstrellas)e.quaternion.identity().slerp(this._giroCamara,e.userData.anclaje)}}_startRenderLoop(){let e=()=>{this.controls.update(),this._encuadrar(),this._orientarEstrellas(),this.renderer.render(this.scene,this.camera),this._firstFrameDone?this._crearEstrellas():(this._firstFrameDone=!0,this.onFirstFrame?.()),this._rafId=requestAnimationFrame(e)};e()}pauseLoop(){this._rafId!=null&&(cancelAnimationFrame(this._rafId),this._rafId=null)}resumeLoop(){this._rafId==null&&this._startRenderLoop()}dispose(){cancelAnimationFrame(this._rafId),cancelAnimationFrame(this._vistaRaf),cancelAnimationFrame(this._zoomRaf),window.removeEventListener("resize",this._onResize);for(let e of this.capasEstrellas)e.geometry.dispose(),e.material.map?.dispose(),e.material.dispose();this.controls.dispose(),this.renderer.dispose()}setEdgeGlow(e){let t=!!e;if(t!==this._glow){this._glow=t;for(let n of this.bodyMaterials)n.emissive.set(t?AE:0),n.emissiveIntensity=t?TE:0,n.needsUpdate=!0}}rebuild(e){let t=this._stateType;for(let s of this.pieceMeshes.values())this.puzzleGroup.remove(s),this._disposeMesh(s);this.pensando(!1),this.pieceMeshes.clear(),this.stickerMeshes.length=0,this.bodyMaterials.length=0,this._stateType=e.getType(),this.puzzleGroup.position.set(0,0,0);let n=this._glow;if(this._glow=!1,this.puzzleGroup.rotation.set(0,0,0),this._stateType==="cube")this._setBaseScale(yE/e.n),this._buildCubeMeshes(e),t!=="cube"&&this._placeCamera(...ri.cube);else if(this._stateType==="pyraminx")this._setBaseScale(2.5),this._buildFacetedMeshes(e),t!=="pyraminx"&&this._placeCamera(...ri.pyraminx);else if(this._stateType.startsWith("cuboid")){let s=e.getBoundingRadius?.()??1.5;this._setBaseScale(2/s),this._buildFacetedMeshes(e),t?.startsWith("cuboid")||this._placeCamera(...ri.cuboid)}else this._stateType==="megaminx"&&(this._setBaseScale(2.6),this._buildFacetedMeshes(e),t!=="megaminx"&&this._placeCamera(...ri.megaminx));this._medirSilueta(),this._resolverSitio({ms:0}),this.setEdgeGlow(n)}_medirSilueta(){this.puzzleGroup.updateMatrixWorld(!0);let e=this._sitio??1,t=new L,n=[];this.puzzleGroup.traverse(s=>{let r=s.geometry?.attributes?.position;if(r)for(let a=0;a<r.count;a++)t.fromBufferAttribute(r,a).applyMatrix4(s.matrixWorld),n.push([t.x/e,t.y/e,t.z/e])}),this._silueta=n.length?Ep(da(this._stateType),n):null}_setBaseScale(e){this._baseScale=e,this.puzzleGroup.scale.setScalar(e*(this._sitio??1))}setRoomScale(e,{ms:t=Kl}={}){this._sitioPedido=e,this._resolverSitio({ms:t})}_topeDeSitio(){return wp({silueta:this._silueta,distancia:Math.hypot(...da(this._stateType))*this._fitFactor(),fovGrados:this.camera.fov,aspecto:this.camera.aspect||1})}_resolverSitio({ms:e=Kl}={}){let t=Math.min(this._sitioPedido??1,this._topeDeSitio()),n=this._sitio??1;if(Math.abs(n-t)<1e-4)return;if(cancelAnimationFrame(this._zoomRaf),!e){this._sitio=t,this._setBaseScale(this._baseScale??1);return}let s=performance.now(),r=a=>{let o=Math.min(1,(a-s)/e);this._sitio=n+(t-n)*fa(o),this._setBaseScale(this._baseScale??1),o<1&&(this._zoomRaf=requestAnimationFrame(r))};this._zoomRaf=requestAnimationFrame(r)}pensando(e){if(e){if(this._pensandoTarea)return;this._pensandoColores=this.stickerMeshes.map(s=>s.material.color.getHex());let n=[...new Set(this._pensandoColores)];if(!n.length)return;this._pensandoTarea=setInterval(()=>{for(let s of this.stickerMeshes)s?.material&&s.material.color.setHex(n[Math.floor(Math.random()*n.length)])},ME);return}if(!this._pensandoTarea)return;clearInterval(this._pensandoTarea),this._pensandoTarea=0;let t=this._pensandoColores??[];this._pensandoColores=null,t.length===this.stickerMeshes.length&&this.stickerMeshes.forEach((n,s)=>{n?.material&&n.material.color.setHex(t[s])})}_buildCubeMeshes(e){for(let t of e.cubies){let n=this._createCubieMesh(t);this.pieceMeshes.set(t,n),this.puzzleGroup.add(n)}}_createCubieMesh(e){let t=new kt;t.position.set(e.position.x*Jl,e.position.y*Jl,e.position.z*Jl);let n=new Ri($l,$l,$l),s=new Pi({color:657930,roughness:.55,metalness:.15}),r=new Bt(n,s);this.bodyMaterials.push(s),t.add(r);let a=new sr(Ap,Ap);for(let o of Object.keys(e.faces)){let c=e.faces[o];if(!c)continue;let l=wE[o],u=new Pi({color:new Oe(c),roughness:.4,metalness:0,side:nn}),h=new Bt(a,u);h.position.set(...l.pos),h.rotation.set(...l.rot),h.userData.sticker={piece:e,faceKey:o},this.stickerMeshes.push(h),t.add(h)}return t.userData.piece=e,t}_buildFacetedMeshes(e){for(let t of e.pieces){let n=this._createFacetedPieceMesh(t);this.pieceMeshes.set(t,n),this.puzzleGroup.add(n)}}_createFacetedPieceMesh(e,t=.88){let n=new kt;for(let s of e.stickers){let r=s.vertices,a=0,o=0,c=0;for(let X of r)a+=X.x,o+=X.y,c+=X.z;a/=r.length,o/=r.length,c/=r.length;let[l,u,h]=r,d=u.x-l.x,f=u.y-l.y,g=u.z-l.z,_=h.x-l.x,m=h.y-l.y,p=h.z-l.z,S=f*p-g*m,v=g*_-d*p,R=d*m-f*_,I=r,C=S,A=v,Y=R;S*a+v*o+R*c<0&&(I=[...r].reverse(),C=-S,A=-v,Y=-R);let M=Math.sqrt(C*C+A*A+Y*Y)||1,E=.004,H=C/M*E,j=A/M*E,ae=Y/M*E,U=new Pi({color:658448,roughness:.55,metalness:.15,side:nn});this.bodyMaterials.push(U),this._addPolygon(n,I.map(X=>({x:X.x+H*.3,y:X.y+j*.3,z:X.z+ae*.3})),U);let z=t,G=this._addPolygon(n,I.map(X=>({x:a+(X.x-a)*z+H,y:o+(X.y-o)*z+j,z:c+(X.z-c)*z+ae})),new Pi({color:new Oe(s.color),roughness:.25,metalness:0,side:nn}));G.userData.sticker={piece:e,face:s.face,poly:s},this.stickerMeshes.push(G)}return n.userData.piece=e,n}_addPolygon(e,t,n){let s=t.length-2,r=new Float32Array(s*9);for(let c=0;c<s;c++){let l=t[0],u=t[c+1],h=t[c+2];r.set([l.x,l.y,l.z,u.x,u.y,u.z,h.x,h.y,h.z],c*9)}let a=new Ct;a.setAttribute("position",new ht(r,3)),a.computeVertexNormals();let o=new Bt(a,n);return e.add(o),o}_disposeMesh(e){e.traverse(t=>{t.isMesh&&(t.geometry?.dispose(),Array.isArray(t.material)?t.material.forEach(n=>n.dispose()):t.material?.dispose())})}animateMove(e){return new Promise(t=>{this._animationQueue.push({spec:e,resolve:t}),this._processQueue()})}async _processQueue(){if(this._isAnimating||this._animationQueue.length===0)return;let{spec:e,resolve:t}=this._animationQueue.shift();this._isAnimating=!0;try{await this._runMoveAnimation(e)}finally{this._isAnimating=!1,t(),this._animationQueue.length>0&&this._processQueue()}}async _runMoveAnimation(e){let{pieces:t,axis:n,angle:s,state:r}=e;if(!t||t.length===0){r&&this.rebuild(r);return}let a=new kt;this.puzzleGroup.add(a);let o=[];for(let l of t){let u=this.pieceMeshes.get(l);u&&(a.attach(u),o.push(u))}let c=e.duration??{pyraminx:RE,megaminx:CE}[this._stateType]??vE;if(typeof n=="string")await this._tweenRotation(a,n,s,c);else{let l=new L(n.x,n.y,n.z).normalize();await this._tweenQuaternionRotation(a,l,s,c)}for(let l of o)this.puzzleGroup.attach(l);this.puzzleGroup.remove(a),r&&this.rebuild(r)}_tweenRotation(e,t,n,s){return new Promise(r=>{let a=performance.now(),o=()=>{let c=Math.min((performance.now()-a)/s,1),l=fa(c)*n;e.rotation[t]=l,c<1?requestAnimationFrame(o):(e.rotation[t]=n,r())};requestAnimationFrame(o)})}_tweenQuaternionRotation(e,t,n,s){return new Promise(r=>{let a=performance.now(),o=()=>{let c=Math.min((performance.now()-a)/s,1),l=fa(c)*n;e.quaternion.setFromAxisAngle(t,l),c<1?requestAnimationFrame(o):(e.quaternion.setFromAxisAngle(t,n),r())};requestAnimationFrame(o)})}};var ma=class{constructor(){this.moves=[],this.cursor=0,this._listeners=[]}subscribe(e){this._listeners.push(e);try{e(this.snapshot())}catch(t){console.error(t)}return()=>{this._listeners=this._listeners.filter(t=>t!==e)}}_emit(){let e=this.snapshot();for(let t of this._listeners)try{t(e)}catch(n){console.error(n)}}snapshot(){return{moves:[...this.moves],cursor:this.cursor,canUndo:this.canUndo(),canRedo:this.canRedo()}}addMove(e){typeof e!="string"||!e||(this.cursor<this.moves.length&&(this.moves=this.moves.slice(0,this.cursor)),this.moves.push(e),this.cursor=this.moves.length,this._emit())}queueMoves(e){if(!Array.isArray(e))return 0;let t=e.filter(n=>typeof n=="string"&&n);return t.length?(this.moves=this.moves.slice(0,this.cursor).concat(t),this._emit(),t.length):0}replaceAt(e,t){return!Array.isArray(t)||!t.length||e<this.cursor||e>=this.moves.length?!1:(this.moves.splice(e,1,...t),this._emit(),!0)}undo(){return this.canUndo()?(this.cursor--,this._emit(),1):0}redo(){return this.canRedo()?(this.cursor++,this._emit(),1):0}goToIndex(e){let t=Math.max(0,Math.min(this.moves.length,e|0)),n=t-this.cursor;return this.cursor=t,this._emit(),n}clear(){this.moves=[],this.cursor=0,this._emit()}canUndo(){return this.cursor>0}canRedo(){return this.cursor<this.moves.length}getCursor(){return this.cursor}getMoves(){return[...this.moves]}getMovesUpToCursor(){return this.moves.slice(0,this.cursor)}length(){return this.moves.length}};function rn(){let i=globalThis.ytgame;return i&&i.IN_PLAYABLES_ENV?i:null}var Tp=()=>rn()!==null;function Rp(){rn()?.game.firstFrameReady()}function Cp(){rn()?.game.gameReady()}var Ql=()=>{};function Pp(i){return rn()?.system.onPause(i)??Ql}function Lp(i){return rn()?.system.onResume(i)??Ql}function Ip(){return rn()?.system.isAudioEnabled()??!0}function Up(i){return rn()?.system.onAudioEnabledChange(i)??Ql}async function Dp(i){let e=rn();if(!e)return!1;try{return await e.game.saveData(i),!0}catch(t){return PE(`saveData: ${t?.errorType??"UNKNOWN"}`),!1}}async function zp(){let i=rn();if(!i)return null;try{return await i.game.loadData()??null}catch(e){return e?.errorType&&e.errorType!=="API_UNAVAILABLE"&&ga(`loadData: ${e.errorType}`),null}}async function eu(i){let e=rn();if(!e||!Number.isSafeInteger(i)||i<0)return!1;try{return await e.engagement.sendScore({value:i}),!0}catch(t){return ga(`sendScore: ${t?.errorType??"UNKNOWN"}`),!1}}function PE(i){rn()?.health?.logError?.(i)}function ga(i){rn()?.health?.logWarning?.(i)}var oi=()=>globalThis.bridge??null,Op=()=>oi()!==null,Fp="twistlab_session",tu=!1;async function Bp({espera:i=8e3}={}){let e=oi();return e?.initialize?(await Promise.race([e.initialize().catch(t=>{console.warn("[playgama] initialize fall\xF3:",t?.message??t)}),new Promise(t=>setTimeout(t,i))]),tu=!!oi()?.platform,tu||console.warn("[playgama] el Bridge no lleg\xF3 a estar listo"),tu):!1}var _a=()=>oi()?.platform??null;function kp(){let i=_a();if(!i?.sendMessage)return console.warn("[playgama] no se pudo avisar de game_ready: el Bridge no est\xE1 listo"),!1;try{return i.sendMessage("game_ready"),!0}catch(e){return console.warn("[playgama] game_ready fall\xF3:",e?.message??e),!1}}var Np=()=>{};function Hp(){return _a()?.isAudioEnabled??!0}function Vp(i,e){let t=_a(),n=oi()?.EVENT_NAME?.[i];if(!t?.on||!n)return Np;try{t.on(n,e)}catch(s){console.warn(`[playgama] no se pudo escuchar ${i}:`,s?.message??s)}return Np}var Gp=i=>Vp("PAUSE_STATE_CHANGED",i),Wp=i=>Vp("AUDIO_STATE_CHANGED",i);async function Xp(i){let e=oi();if(!e?.storage?.set)return!1;try{return await e.storage.set([Fp],[i]),!0}catch(t){return console.warn("[playgama] storage.set fall\xF3:",t?.message??t),!1}}var IE="level_completed";function nu(i=IE){let e=oi()?.advertisement;if(!e?.showInterstitial||e.isInterstitialSupported===!1)return!1;try{return e.showInterstitial(i),!0}catch(t){return console.warn("[playgama] showInterstitial fall\xF3:",t?.message??t),!1}}function qp(){let i=_a();if(!i?.sendMessage)return!1;try{return i.sendMessage("level_completed"),!0}catch(e){return console.warn("[playgama] level_completed fall\xF3:",e?.message??e),!1}}async function Yp(){let i=oi();if(!i?.storage?.get)return null;try{return(await i.storage.get([Fp]))?.[0]??null}catch(e){return console.warn("[playgama] storage.get fall\xF3:",e?.message??e),null}}var jp="twistlab.sesion";async function Zp(i){return!1}async function $p(){return null}var zE=Object.freeze({cube2:1,cube3:3,cube4:6,cube5:10,pyraminx:2,megaminx:12,cuboid221:1,cuboid331:1}),Jp=Object.freeze({cube2:{segundos:30,movimientos:25},cube3:{segundos:90,movimientos:100},cube4:{segundos:300,movimientos:300},cube5:{segundos:600,movimientos:500},pyraminx:{segundos:40,movimientos:30},megaminx:{segundos:600,movimientos:400},cuboid221:{segundos:20,movimientos:12},cuboid331:{segundos:30,movimientos:20}}),NE=i=>Jp[i]??Jp.cube3,xa=5,iu=12,Kp=2,Qp=()=>({total:0,sesion:{},enCurso:null}),OE=(i,e)=>{var t;return(t=i.sesion)[e]??(t[e]={tiempos:[],movimientos:[]})};function em(i,e){return i.enCurso={puzzle:e,desde:null,movimientos:0},i}function ya(i){return i.enCurso=null,i}function tm(i,e){var t;return i.enCurso?((t=i.enCurso).desde??(t.desde=e),++i.enCurso.movimientos):0}function nm(i,e){return i.enCurso?.desde?Math.max(0,e-i.enCurso.desde):0}function im(i,e){let t=i.enCurso;if(!t)return null;i.enCurso=null;let n=t.desde?Math.max(0,e-t.desde):0,s=t.movimientos,r=t.puzzle,a=OE(i,r);a.tiempos.push(n),a.movimientos.push(s),a.tiempos.length>iu&&(a.tiempos.shift(),a.movimientos.shift());let o=BE(r,n,s);return i.total+=o,{ms:n,movimientos:s,puntos:o,mejorTiempo:n===va(a.tiempos),mejorMovimientos:s===va(a.movimientos),...su(i,r)}}var va=i=>i?.length?Math.min(...i):null;function FE(i){if(!i||i.length<xa)return null;let t=i.slice(-xa).sort((n,s)=>n-s).slice(1,-1);return Math.round(t.reduce((n,s)=>n+s,0)/t.length)}function su(i,e){let t=i.sesion[e];return t?.tiempos.length?{intentos:t.tiempos.length,mejorMs:va(t.tiempos),media5Ms:FE(t.tiempos),mejorMovs:va(t.movimientos)}:{intentos:0,mejorMs:null,media5Ms:null,mejorMovs:null}}function BE(i,e,t){let n=NE(i),s=(zE[i]??1)*50,r=Math.max(.5,e/1e3),a=Math.max(1,t),o=Math.min(Kp,n.segundos/r),c=Math.min(Kp,n.movimientos/a);return Math.max(Math.round(s*.1),Math.round(s*(o+c)/2))}function ru(i,e){let t={};if(!i||typeof i!="object")return t;let n=s=>Array.isArray(s)&&s.every(r=>Number.isSafeInteger(r)&&r>=0);for(let[s,r]of Object.entries(i)){if(e&&!e.includes(s))continue;let{tiempos:a,movimientos:o}=r??{};!n(a)||!n(o)||!a.length||a.length!==o.length||(t[s]={tiempos:a.slice(-iu),movimientos:o.slice(-iu)})}return t}var As=i=>i==null?"\u2014":`${(i/1e3).toFixed(2)}s`;var Ma=Object.freeze(["cube2","cube3","cube4","cube5","pyraminx","megaminx","cuboid221","cuboid331"]),HE=4,VE=[1,2,3,4],sm=4e3;function rm({puzzle:i,moves:e,score:t=0,session:n={}}){if(!Ma.includes(i))return null;let s=Array.isArray(e)?e.filter(a=>typeof a=="string"&&a):[];if(s.length>sm)return null;let r=Number.isSafeInteger(t)&&t>=0?t:0;return JSON.stringify({v:HE,p:i,m:s,s:r,t:ru(n,Ma)})}function om(i){if(typeof i!="string"||!i)return null;let e;try{e=JSON.parse(i)}catch{return null}if(!e||typeof e!="object"||!VE.includes(e.v)||!Ma.includes(e.p)||!Array.isArray(e.m)||e.m.length>sm||!e.m.every(n=>typeof n=="string"&&n))return null;let t=Number.isSafeInteger(e.s)&&e.s>=0?e.s:0;return{puzzle:e.p,moves:e.m,score:t,session:ru(e.t,Ma)}}function am(i,e){i.reset();let t=[];for(let n of e){if(!i.parseMove?.(n))break;i.applyMove(n),t.push(n)}return t}var Xn=null,hr=null,cm=-1,dr=0,ai=!1,um=!0,hm="twistlab.silencio";function dm(){if(Xn===null){if(typeof window>"u")return Xn=!1,null;let i=window.AudioContext||window.webkitAudioContext;if(!i)return Xn=!1,null;try{Xn=new i}catch{return Xn=!1,null}}return Xn===!1?null:(Xn.state==="suspended"&&Xn.resume().catch(()=>{}),Xn)}function GE(i){if(hr)return hr;hr=i.createBuffer(1,i.sampleRate,i.sampleRate);let e=hr.getChannelData(0);for(let t=0;t<e.length;t++)e[t]=Math.random()*2-1;return hr}function fm(){let i=()=>dm();window.addEventListener("pointerdown",i,{capture:!0,once:!0})}var WE=()=>!ai&&um;function pm({volumen:i,duracion:e,hz:t,ancho:n}){if(!WE())return;let s=dm();if(!s)return;let r=s.currentTime;if(!(r-cm<.025)){cm=r;try{let a=s.createBufferSource();a.buffer=GE(s),a.playbackRate.value=.85+Math.random()*.35;let o=s.createBiquadFilter();o.type="bandpass",o.frequency.value=t+Math.random()*n,o.Q.value=.9;let c=s.createGain();c.gain.setValueAtTime(1e-4,r),c.gain.linearRampToValueAtTime(i,r+.004),c.gain.exponentialRampToValueAtTime(1e-4,r+e),a.connect(o).connect(c).connect(s.destination),a.start(r),a.stop(r+e)}catch{}}}var Ts=()=>pm({volumen:.22,duracion:.085,hz:1500,ancho:900});function lm(){pm({volumen:.085,duracion:.035,hz:2600,ancho:700})}function ou(){dr||(lm(),dr=setInterval(lm,95))}function au(){dr&&(clearInterval(dr),dr=0)}function mm(i){um=i!==!1}function XE(i){ai=i;try{localStorage.setItem(hm,i?"1":"0")}catch{}return ai}var gm=()=>XE(!ai),_m=()=>ai;function xm(){try{ai=localStorage.getItem(hm)==="1"}catch{ai=!1}return ai}var vm={"pagina.titulo":"Twistlab \u2014 Rubik\u2019s Cube and more twisty puzzles","canvas.aria":"3D puzzle","puntos.title":"Points you earned yourself, turn by turn","puntos.valor":"{total} pts","puzzle.aria":"Puzzle type","puzzle.title":"Choose the puzzle \u2014 each one shows what it looks like","sonido.sr":"Sound","sonido.apagar":"Turn the turning sound off","sonido.encender":"Turn the turning sound on","ayuda.sr":"Guided tour","ayuda.title":"Watch the guided tour again","idioma.sr":"Language","idioma.title":"Choose the language","idioma.aria":"Language","marcas.enCurso":"Time and moves for this solve","marcas.reloj":"{tiempo} \xB7 {movimientos} mov","marcas.mejor":"best {tiempo}","marcas.ao5":" \xB7 Ao5 {tiempo}","marcas.faltanAo5":" \xB7 {faltan} more for Ao5","marcas.title":"{intentos} solves \xB7 best {tiempo} \xB7 fewest {movimientos} moves","acciones.aria":"Actions","deshacer.lbl":"Undo","deshacer.title":"Undo (Ctrl+Z)","rehacer.lbl":"Redo","rehacer.title":"Redo (Ctrl+Y)","rotulos.lbl":"Moves","rotulos.title":"Show or hide the floating move buttons","rotulos.esconder":"Hide the floating move buttons","rotulos.mostrar":"Show the floating move buttons","reiniciar.lbl":"Reset","reiniciar.title":"Back to a solved puzzle","mezclar.lbl":"Scramble","mezclar.title":"Scramble the puzzle","resolver.lbl":"Solve","resolver.title":"Solve the puzzle","historial.aria":"Move history","historial.title":"Show / hide the move history","historial.titulo":"History","historial.vacio":"Turn the puzzle \u2014 every move lands here, and you can tap one to travel back.","historial.saltar":"Jump to the state after {n} moves","historial.etapa":"Step {n}: {etapa} \xB7 {movimientos} moves","confirmar.cancelar":"Cancel","confirmar.reiniciar":"Reset","confirmar.cambiar":"Switch","confirmar.cambiarPuzzle":"Switching puzzles clears the moves you have made here.","confirmar.reiniciarGuia":"This clears the solution you are stepping through. You will have to press Solve again to get it back.","confirmar.mezclarGuia":"Scrambling clears the solution you are stepping through.","salir.pregunta":"Leave Twistlab? Your game is saved.","salir.si":"Leave","salir.no":"Keep playing","aviso.resuelto":"Solved in {tiempo} \xB7 {movimientos} moves \xB7 +{puntos} pts{marca}","aviso.mejorTiempo":" \xB7 best time!","aviso.finGuia":"The solution ends here \u2014 press Reset to leave the guide.","aviso.noEsElMovimiento":"{movimiento} is not the move \u2014 the next one is {toca}.","aviso.noEsElMovimientoDoble":"{movimiento} is not the move \u2014 the next one is {toca}, and {mitad} twice does it.","aviso.resolviendo3x3":"Solving the 3\xD73\xD73\u2026","aviso.resolviendoTarda":"Solving the {puzzle} \u2014 this takes a moment\u2026","aviso.resolviendoEtapa":"Solving the {puzzle} \u2014 {etapa}\u2026","aviso.etapaNumerada":"Solving\u2026 step {n} of {total}: {etapa}","aviso.sinSolucionador":"For now I can only solve the cubes up to 5\xD75\xD75, the Megaminx and the Pyraminx.","aviso.sinSolucion":"I could not find a solution for this state.","aviso.yaResuelto":"Already solved.","aviso.preparados":"{n} moves ready \u2014 turn the puzzle yourself and I will tell you when you stray.","aviso.preparadosPrimera":"{n} moves ready \u2014 turn the puzzle yourself and I will tell you when you stray. First up: the {etapa}.","aviso.paso":"Step {n} of {total}: {etapa}","encuadrar.title":"Fit the puzzle back on screen","encuadrar.sr":"Fit the puzzle on screen","visita.pellizco":"Pinch with two fingers to zoom in and out. The puzzle gets bigger or smaller, nothing else changes.","visita.encuadrar":"Lost the puzzle off screen? This brings it back \u2014 its size, and the angle it started at.","visita.saltar":"Skip","visita.siguiente":"Next","visita.hecho":"Done","visita.cuenta":"{n} / {total}","visita.puzzles":"Eight puzzles live here \u2014 cubes from 2\xD72\xD72 up to 5\xD75\xD75, a Pyraminx and a Megaminx. Each one shows what it looks like, so you can see before you pick.","visita.arrastrar":"Drag across a sticker to turn that layer. This is how you actually play.","visita.rotulos":"Or tap one of these floating buttons to turn that face. A bright ring shows you which one you pressed.","visita.deshacer":"Undo and redo your last turns.","visita.interruptor":"Show or hide those floating buttons. They help at first and get in the way once you drag.","visita.reiniciar":"Back to a solved puzzle, whenever you want a clean start.","visita.mezclar":"Scramble the puzzle. The clock starts with your first turn.","visita.resolver":"Stuck? This walks the puzzle home, move by move, so you can follow how it is done.","visita.historial":"Every move you make lands here. Tap any one of them to travel back to that point.","visita.sonido":"Turn the turning sound on or off.","visita.ayuda":"And you can watch this tour again from here, any time.","etapa.centros":"centres","etapa.cruzAbajo":"bottom cross","etapa.esquinasAbajo":"bottom corners","etapa.capaMedia":"middle layer","etapa.ultimaCapa":"last layer","etapa.aristas":"edge pairing","etapa.comoUn3x3":"the 3\xD73\xD73","etapa.paridad":"parity","etapa.paridadDeAristas":"wing parity","etapa.capaAbajo":"bottom layer","etapa.piramidePequena":"small pyramid","etapa.puntas":"tips","etapa.estrella":"first star","etapa.esquinasPrimeraCapa":"first layer corners","etapa.aristasSegundaFila":"second row of edges","etapa.esquinasTerceraFila":"third row of corners","etapa.aristasJuntoAEsquina":"edges next to corners","etapa.esquinasPenultimas":"next-to-last corners","etapa.aristasPenultimas":"next-to-last edges","etapa.aristasUltimaCapa":"last layer edges","etapa.esquinasUltimaCapa":"last layer corners","etapa.girarEsquinas":"twisting the corners"};var ym={"pagina.titulo":"Twistlab \u2014 El cubo de Rubik y m\xE1s rompecabezas","canvas.aria":"Rompecabezas en 3D","puntos.title":"Los puntos que has ganado t\xFA, giro a giro","puntos.valor":"{total} pts","puzzle.aria":"Tipo de rompecabezas","puzzle.title":"Elige el rompecabezas \u2014 cada uno ense\xF1a cu\xE1l es","sonido.sr":"Sonido","sonido.apagar":"Quitar el sonido de los giros","sonido.encender":"Poner el sonido de los giros","ayuda.sr":"Visita guiada","ayuda.title":"Volver a ver la visita guiada","idioma.sr":"Idioma","idioma.title":"Elige el idioma","idioma.aria":"Idioma","marcas.enCurso":"Tiempo y movimientos de este intento","marcas.reloj":"{tiempo} \xB7 {movimientos} mov","marcas.mejor":"mejor {tiempo}","marcas.ao5":" \xB7 Ao5 {tiempo}","marcas.faltanAo5":" \xB7 faltan {faltan} para el Ao5","marcas.title":"{intentos} intentos \xB7 mejor {tiempo} \xB7 m\xEDnimo {movimientos} movimientos","acciones.aria":"Acciones","deshacer.lbl":"Deshacer","deshacer.title":"Deshacer (Ctrl+Z)","rehacer.lbl":"Rehacer","rehacer.title":"Rehacer (Ctrl+Y)","rotulos.lbl":"Giros","rotulos.title":"Ense\xF1ar o esconder los botones flotantes de giro","rotulos.esconder":"Esconder los botones flotantes de giro","rotulos.mostrar":"Ense\xF1ar los botones flotantes de giro","reiniciar.lbl":"Reiniciar","reiniciar.title":"Volver al rompecabezas resuelto","mezclar.lbl":"Mezclar","mezclar.title":"Mezclar el rompecabezas","resolver.lbl":"Resolver","resolver.title":"Resolver el rompecabezas","historial.aria":"Historial de movimientos","historial.title":"Ense\xF1ar / esconder el historial","historial.titulo":"Historial","historial.vacio":"Gira el rompecabezas \u2014 cada movimiento cae aqu\xED, y puedes pulsar uno para volver a ese punto.","historial.saltar":"Ir al estado tras {n} movimientos","historial.etapa":"Etapa {n}: {etapa} \xB7 {movimientos} movimientos","confirmar.cancelar":"Cancelar","confirmar.reiniciar":"Reiniciar","confirmar.cambiar":"Cambiar","confirmar.cambiarPuzzle":"Cambiar de rompecabezas borra los movimientos que has hecho aqu\xED.","confirmar.reiniciarGuia":"Esto borra la soluci\xF3n que est\xE1s siguiendo. Tendr\xE1s que pulsar Resolver otra vez para recuperarla.","confirmar.mezclarGuia":"Mezclar borra la soluci\xF3n que est\xE1s siguiendo.","salir.pregunta":"\xBFSalir de Twistlab? La partida en curso se guarda.","salir.si":"Salir","salir.no":"Seguir jugando","aviso.resuelto":"Resuelto en {tiempo} \xB7 {movimientos} movimientos \xB7 +{puntos} pts{marca}","aviso.mejorTiempo":" \xB7 \xA1tu mejor tiempo!","aviso.finGuia":"La soluci\xF3n termina aqu\xED \u2014 pulsa Reiniciar para salir de la gu\xEDa.","aviso.noEsElMovimiento":"{movimiento} no es el movimiento \u2014 el que toca es {toca}.","aviso.noEsElMovimientoDoble":"{movimiento} no es el movimiento \u2014 el que toca es {toca}, y {mitad} dos veces lo hace.","aviso.resolviendo3x3":"Resolviendo el 3\xD73\xD73\u2026","aviso.resolviendoTarda":"Resolviendo el {puzzle} \u2014 esto tarda un momento\u2026","aviso.resolviendoEtapa":"Resolviendo el {puzzle} \u2014 {etapa}\u2026","aviso.etapaNumerada":"Resolviendo\u2026 etapa {n} de {total}: {etapa}","aviso.sinSolucionador":"Por ahora solo s\xE9 resolver los cubos hasta el 5\xD75\xD75, el Megaminx y el Pyraminx.","aviso.sinSolucion":"No he encontrado soluci\xF3n para este estado.","aviso.yaResuelto":"Ya est\xE1 resuelto.","aviso.preparados":"{n} movimientos preparados \u2014 g\xEDralo t\xFA mismo y te aviso si te desv\xEDas.","aviso.preparadosPrimera":"{n} movimientos preparados \u2014 g\xEDralo t\xFA mismo y te aviso si te desv\xEDas. Empezamos por: {etapa}.","aviso.paso":"Etapa {n} de {total}: {etapa}","encuadrar.title":"Devolver el rompecabezas a la pantalla","encuadrar.sr":"Encuadrar el rompecabezas","visita.pellizco":"Pellizca con dos dedos para acercar y alejar. El rompecabezas se hace m\xE1s grande o m\xE1s peque\xF1o, y nada m\xE1s.","visita.encuadrar":"\xBFSe te ha ido de la pantalla? Esto lo devuelve \u2014 a su tama\xF1o y al \xE1ngulo con el que empez\xF3.","visita.saltar":"Saltar","visita.siguiente":"Siguiente","visita.hecho":"Hecho","visita.cuenta":"{n} / {total}","visita.puzzles":"Aqu\xED viven ocho rompecabezas \u2014 cubos del 2\xD72\xD72 al 5\xD75\xD75, un Pyraminx y un Megaminx. Cada uno ense\xF1a cu\xE1l es, para que lo veas antes de elegir.","visita.arrastrar":"Arrastra sobre una pegatina para girar esa capa. As\xED es como se juega de verdad.","visita.rotulos":"O pulsa uno de estos botones flotantes para girar esa cara. Un aro brillante te ense\xF1a cu\xE1l has pulsado.","visita.deshacer":"Deshaz y rehaz tus \xFAltimos giros.","visita.interruptor":"Ense\xF1a o esconde esos botones flotantes. Ayudan al principio y estorban en cuanto arrastras.","visita.reiniciar":"Vuelve al rompecabezas resuelto, cuando quieras empezar limpio.","visita.mezclar":"Mezcla el rompecabezas. El reloj arranca con tu primer giro.","visita.resolver":"\xBFAtascado? Esto lleva el rompecabezas a casa, movimiento a movimiento, para que veas c\xF3mo se hace.","visita.historial":"Cada movimiento que haces cae aqu\xED. Pulsa cualquiera para volver a ese punto.","visita.sonido":"Pon o quita el sonido de los giros.","visita.ayuda":"Y puedes volver a ver esta visita desde aqu\xED, cuando quieras.","etapa.centros":"los centros","etapa.cruzAbajo":"la cruz de abajo","etapa.esquinasAbajo":"las esquinas de abajo","etapa.capaMedia":"la capa media","etapa.ultimaCapa":"la \xFAltima capa","etapa.aristas":"emparejar aristas","etapa.comoUn3x3":"el 3\xD73\xD73","etapa.paridad":"la paridad","etapa.paridadDeAristas":"la paridad de aristas","etapa.capaAbajo":"la capa de abajo","etapa.piramidePequena":"la pir\xE1mide peque\xF1a","etapa.puntas":"las puntas","etapa.estrella":"la estrella","etapa.esquinasPrimeraCapa":"las esquinas de la 1\xAA capa","etapa.aristasSegundaFila":"las aristas de la 2\xAA fila","etapa.esquinasTerceraFila":"las esquinas de la 3\xAA fila","etapa.aristasJuntoAEsquina":"las aristas junto a esquina","etapa.esquinasPenultimas":"las esquinas pen\xFAltimas","etapa.aristasPenultimas":"las aristas pen\xFAltimas","etapa.aristasUltimaCapa":"las aristas de la \xFAltima capa","etapa.esquinasUltimaCapa":"las esquinas de la \xFAltima capa","etapa.girarEsquinas":"girar las \xFAltimas esquinas"};var Mm={"pagina.titulo":"Twistlab \u2014 O cubo de Rubik e mais quebra-cabe\xE7as","canvas.aria":"Quebra-cabe\xE7as em 3D","puntos.title":"Os pontos que voc\xEA ganhou, giro a giro","puntos.valor":"{total} pts","puzzle.aria":"Tipo de quebra-cabe\xE7as","puzzle.title":"Escolha o quebra-cabe\xE7as \u2014 cada um mostra qual \xE9","sonido.sr":"Som","sonido.apagar":"Desligar o som dos giros","sonido.encender":"Ligar o som dos giros","ayuda.sr":"Visita guiada","ayuda.title":"Ver a visita guiada de novo","idioma.sr":"Idioma","idioma.title":"Escolha o idioma","idioma.aria":"Idioma","marcas.enCurso":"Tempo e movimentos desta resolu\xE7\xE3o","marcas.reloj":"{tiempo} \xB7 {movimientos} mov","marcas.mejor":"melhor {tiempo}","marcas.ao5":" \xB7 Ao5 {tiempo}","marcas.faltanAo5":" \xB7 faltam {faltan} para o Ao5","marcas.title":"{intentos} resolu\xE7\xF5es \xB7 melhor {tiempo} \xB7 m\xEDnimo {movimientos} movimentos","acciones.aria":"A\xE7\xF5es","deshacer.lbl":"Desfazer","deshacer.title":"Desfazer (Ctrl+Z)","rehacer.lbl":"Refazer","rehacer.title":"Refazer (Ctrl+Y)","rotulos.lbl":"Giros","rotulos.title":"Mostrar ou esconder os bot\xF5es flutuantes de giro","rotulos.esconder":"Esconder os bot\xF5es flutuantes de giro","rotulos.mostrar":"Mostrar os bot\xF5es flutuantes de giro","reiniciar.lbl":"Reiniciar","reiniciar.title":"Voltar ao quebra-cabe\xE7as resolvido","mezclar.lbl":"Misturar","mezclar.title":"Misturar o quebra-cabe\xE7as","resolver.lbl":"Resolver","resolver.title":"Resolver o quebra-cabe\xE7as","historial.aria":"Hist\xF3rico de movimentos","historial.title":"Mostrar / esconder o hist\xF3rico","historial.titulo":"Hist\xF3rico","historial.vacio":"Gire o quebra-cabe\xE7as \u2014 cada movimento cai aqui, e voc\xEA pode tocar em um para voltar \xE0quele ponto.","historial.saltar":"Ir ao estado ap\xF3s {n} movimentos","historial.etapa":"Etapa {n}: {etapa} \xB7 {movimientos} movimentos","confirmar.cancelar":"Cancelar","confirmar.reiniciar":"Reiniciar","confirmar.cambiar":"Trocar","confirmar.cambiarPuzzle":"Trocar de quebra-cabe\xE7as apaga os movimentos que voc\xEA fez aqui.","confirmar.reiniciarGuia":"Isto apaga a solu\xE7\xE3o que voc\xEA est\xE1 seguindo. Voc\xEA ter\xE1 que tocar em Resolver de novo para recuper\xE1-la.","confirmar.mezclarGuia":"Misturar apaga a solu\xE7\xE3o que voc\xEA est\xE1 seguindo.","salir.pregunta":"Sair do Twistlab? O jogo em andamento fica salvo.","salir.si":"Sair","salir.no":"Continuar jogando","aviso.resuelto":"Resolvido em {tiempo} \xB7 {movimientos} movimentos \xB7 +{puntos} pts{marca}","aviso.mejorTiempo":" \xB7 seu melhor tempo!","aviso.finGuia":"A solu\xE7\xE3o termina aqui \u2014 toque em Reiniciar para sair do guia.","aviso.noEsElMovimiento":"{movimiento} n\xE3o \xE9 o movimento \u2014 o pr\xF3ximo \xE9 {toca}.","aviso.noEsElMovimientoDoble":"{movimiento} n\xE3o \xE9 o movimento \u2014 o pr\xF3ximo \xE9 {toca}, e {mitad} duas vezes resolve.","aviso.resolviendo3x3":"Resolvendo o 3\xD73\xD73\u2026","aviso.resolviendoTarda":"Resolvendo o {puzzle} \u2014 isto demora um momento\u2026","aviso.resolviendoEtapa":"Resolvendo o {puzzle} \u2014 {etapa}\u2026","aviso.etapaNumerada":"Resolvendo\u2026 etapa {n} de {total}: {etapa}","aviso.sinSolucionador":"Por enquanto s\xF3 sei resolver os cubos at\xE9 o 5\xD75\xD75, o Megaminx e o Pyraminx.","aviso.sinSolucion":"N\xE3o encontrei solu\xE7\xE3o para este estado.","aviso.yaResuelto":"J\xE1 est\xE1 resolvido.","aviso.preparados":"{n} movimentos prontos \u2014 gire voc\xEA mesmo e eu aviso se voc\xEA se desviar.","aviso.preparadosPrimera":"{n} movimentos prontos \u2014 gire voc\xEA mesmo e eu aviso se voc\xEA se desviar. Come\xE7amos por: {etapa}.","aviso.paso":"Etapa {n} de {total}: {etapa}","encuadrar.title":"Trazer o quebra-cabe\xE7as de volta \xE0 tela","encuadrar.sr":"Enquadrar o quebra-cabe\xE7as","visita.pellizco":"Belisque com dois dedos para aproximar e afastar. O quebra-cabe\xE7as fica maior ou menor, e nada mais.","visita.encuadrar":"Perdeu o quebra-cabe\xE7as de vista? Isto o traz de volta \u2014 ao seu tamanho e ao \xE2ngulo em que come\xE7ou.","visita.saltar":"Pular","visita.siguiente":"Pr\xF3ximo","visita.hecho":"Pronto","visita.cuenta":"{n} / {total}","visita.puzzles":"Aqui vivem oito quebra-cabe\xE7as \u2014 cubos do 2\xD72\xD72 ao 5\xD75\xD75, um Pyraminx e um Megaminx. Cada um mostra qual \xE9, para voc\xEA ver antes de escolher.","visita.arrastrar":"Arraste sobre um adesivo para girar aquela camada. \xC9 assim que se joga de verdade.","visita.rotulos":"Ou toque em um destes bot\xF5es flutuantes para girar aquela face. Um anel brilhante mostra qual voc\xEA apertou.","visita.deshacer":"Desfa\xE7a e refa\xE7a seus \xFAltimos giros.","visita.interruptor":"Mostre ou esconda esses bot\xF5es flutuantes. Ajudam no come\xE7o e atrapalham assim que voc\xEA arrasta.","visita.reiniciar":"Volte ao quebra-cabe\xE7as resolvido, quando quiser come\xE7ar limpo.","visita.mezclar":"Misture o quebra-cabe\xE7as. O rel\xF3gio come\xE7a no seu primeiro giro.","visita.resolver":"Travou? Isto leva o quebra-cabe\xE7as para casa, movimento a movimento, para voc\xEA ver como se faz.","visita.historial":"Cada movimento que voc\xEA faz cai aqui. Toque em qualquer um para voltar \xE0quele ponto.","visita.sonido":"Ligue ou desligue o som dos giros.","visita.ayuda":"E voc\xEA pode ver esta visita de novo daqui, quando quiser.","etapa.centros":"os centros","etapa.cruzAbajo":"a cruz de baixo","etapa.esquinasAbajo":"as quinas de baixo","etapa.capaMedia":"a camada do meio","etapa.ultimaCapa":"a \xFAltima camada","etapa.aristas":"juntar as arestas","etapa.comoUn3x3":"o 3\xD73\xD73","etapa.paridad":"a paridade","etapa.paridadDeAristas":"a paridade de arestas","etapa.capaAbajo":"a camada de baixo","etapa.piramidePequena":"a pir\xE2mide pequena","etapa.puntas":"as pontas","etapa.estrella":"a estrela","etapa.esquinasPrimeraCapa":"as quinas da 1\xAA camada","etapa.aristasSegundaFila":"as arestas da 2\xAA fila","etapa.esquinasTerceraFila":"as quinas da 3\xAA fila","etapa.aristasJuntoAEsquina":"as arestas junto \xE0s quinas","etapa.esquinasPenultimas":"as pen\xFAltimas quinas","etapa.aristasPenultimas":"as pen\xFAltimas arestas","etapa.aristasUltimaCapa":"as arestas da \xFAltima camada","etapa.esquinasUltimaCapa":"as quinas da \xFAltima camada","etapa.girarEsquinas":"girar as \xFAltimas quinas"};var bm={"pagina.titulo":"Twistlab \u2014 Le Rubik\u2019s Cube et d\u2019autres casse-t\xEAte","canvas.aria":"Casse-t\xEAte en 3D","puntos.title":"Les points que vous avez gagn\xE9s vous-m\xEAme, tour apr\xE8s tour","puntos.valor":"{total} pts","puzzle.aria":"Type de casse-t\xEAte","puzzle.title":"Choisissez le casse-t\xEAte \u2014 chacun montre ce qu\u2019il est","sonido.sr":"Son","sonido.apagar":"Couper le son des rotations","sonido.encender":"Activer le son des rotations","ayuda.sr":"Visite guid\xE9e","ayuda.title":"Revoir la visite guid\xE9e","idioma.sr":"Langue","idioma.title":"Choisissez la langue","idioma.aria":"Langue","marcas.enCurso":"Temps et mouvements de ce r\xE9solu","marcas.reloj":"{tiempo} \xB7 {movimientos} mvt","marcas.mejor":"record {tiempo}","marcas.ao5":" \xB7 Ao5 {tiempo}","marcas.faltanAo5":" \xB7 encore {faltan} pour l\u2019Ao5","marcas.title":"{intentos} r\xE9solus \xB7 record {tiempo} \xB7 minimum {movimientos} mouvements","acciones.aria":"Actions","deshacer.lbl":"Annuler","deshacer.title":"Annuler (Ctrl+Z)","rehacer.lbl":"R\xE9tablir","rehacer.title":"R\xE9tablir (Ctrl+Y)","rotulos.lbl":"Tours","rotulos.title":"Afficher ou masquer les boutons flottants de rotation","rotulos.esconder":"Masquer les boutons flottants de rotation","rotulos.mostrar":"Afficher les boutons flottants de rotation","reiniciar.lbl":"R\xE9init.","reiniciar.title":"Revenir au casse-t\xEAte r\xE9solu","mezclar.lbl":"M\xE9langer","mezclar.title":"M\xE9langer le casse-t\xEAte","resolver.lbl":"R\xE9soudre","resolver.title":"R\xE9soudre le casse-t\xEAte","historial.aria":"Historique des mouvements","historial.title":"Afficher / masquer l\u2019historique","historial.titulo":"Historique","historial.vacio":"Tournez le casse-t\xEAte \u2014 chaque mouvement atterrit ici, et vous pouvez en toucher un pour y revenir.","historial.saltar":"Aller \xE0 l\u2019\xE9tat apr\xE8s {n} mouvements","historial.etapa":"\xC9tape {n} : {etapa} \xB7 {movimientos} mouvements","confirmar.cancelar":"Annuler","confirmar.reiniciar":"R\xE9initialiser","confirmar.cambiar":"Changer","confirmar.cambiarPuzzle":"Changer de casse-t\xEAte efface les mouvements que vous avez faits ici.","confirmar.reiniciarGuia":"Ceci efface la solution que vous suivez. Il faudra appuyer de nouveau sur R\xE9soudre pour la retrouver.","confirmar.mezclarGuia":"M\xE9langer efface la solution que vous suivez.","salir.pregunta":"Quitter Twistlab ? La partie en cours est enregistr\xE9e.","salir.si":"Quitter","salir.no":"Continuer \xE0 jouer","aviso.resuelto":"R\xE9solu en {tiempo} \xB7 {movimientos} mouvements \xB7 +{puntos} pts{marca}","aviso.mejorTiempo":" \xB7 votre record !","aviso.finGuia":"La solution s\u2019arr\xEAte ici \u2014 appuyez sur R\xE9init. pour quitter le guide.","aviso.noEsElMovimiento":"{movimiento} n\u2019est pas le mouvement \u2014 le suivant est {toca}.","aviso.noEsElMovimientoDoble":"{movimiento} n\u2019est pas le mouvement \u2014 le suivant est {toca}, et {mitad} deux fois y arrive.","aviso.resolviendo3x3":"R\xE9solution du 3\xD73\xD73\u2026","aviso.resolviendoTarda":"R\xE9solution du {puzzle} \u2014 cela prend un instant\u2026","aviso.resolviendoEtapa":"R\xE9solution du {puzzle} \u2014 {etapa}\u2026","aviso.etapaNumerada":"R\xE9solution\u2026 \xE9tape {n} sur {total} : {etapa}","aviso.sinSolucionador":"Pour l\u2019instant je ne sais r\xE9soudre que les cubes jusqu\u2019au 5\xD75\xD75, le Megaminx et le Pyraminx.","aviso.sinSolucion":"Je n\u2019ai pas trouv\xE9 de solution pour cet \xE9tat.","aviso.yaResuelto":"D\xE9j\xE0 r\xE9solu.","aviso.preparados":"{n} mouvements pr\xEAts \u2014 tournez-le vous-m\xEAme et je vous pr\xE9viens si vous vous \xE9cartez.","aviso.preparadosPrimera":"{n} mouvements pr\xEAts \u2014 tournez-le vous-m\xEAme et je vous pr\xE9viens si vous vous \xE9cartez. On commence par : {etapa}.","aviso.paso":"\xC9tape {n} sur {total} : {etapa}","encuadrar.title":"Ramener le casse-t\xEAte \xE0 l\u2019\xE9cran","encuadrar.sr":"Recadrer le casse-t\xEAte","visita.pellizco":"Pincez \xE0 deux doigts pour zoomer et d\xE9zoomer. Le casse-t\xEAte grandit ou rapetisse, et rien d\u2019autre.","visita.encuadrar":"Le casse-t\xEAte a disparu de l\u2019\xE9cran ? Ceci le ram\xE8ne \u2014 \xE0 sa taille et \xE0 l\u2019angle de d\xE9part.","visita.saltar":"Passer","visita.siguiente":"Suivant","visita.hecho":"Termin\xE9","visita.cuenta":"{n} / {total}","visita.puzzles":"Huit casse-t\xEAte vivent ici \u2014 des cubes du 2\xD72\xD72 au 5\xD75\xD75, un Pyraminx et un Megaminx. Chacun montre ce qu\u2019il est, pour que vous voyiez avant de choisir.","visita.arrastrar":"Faites glisser sur un autocollant pour tourner cette couche. C\u2019est comme \xE7a qu\u2019on joue vraiment.","visita.rotulos":"Ou touchez un de ces boutons flottants pour tourner cette face. Un anneau lumineux montre celui que vous avez press\xE9.","visita.deshacer":"Annulez et r\xE9tablissez vos derniers tours.","visita.interruptor":"Affichez ou masquez ces boutons flottants. Ils aident au d\xE9but et g\xEAnent d\xE8s que vous faites glisser.","visita.reiniciar":"Revenez au casse-t\xEAte r\xE9solu, quand vous voulez repartir \xE0 neuf.","visita.mezclar":"M\xE9langez le casse-t\xEAte. Le chrono d\xE9marre \xE0 votre premier tour.","visita.resolver":"Bloqu\xE9 ? Ceci ram\xE8ne le casse-t\xEAte \xE0 la maison, mouvement par mouvement, pour que vous voyiez comment on fait.","visita.historial":"Chaque mouvement que vous faites atterrit ici. Touchez-en un pour revenir \xE0 ce point.","visita.sonido":"Activez ou coupez le son des rotations.","visita.ayuda":"Et vous pouvez revoir cette visite d\u2019ici, \xE0 tout moment.","etapa.centros":"les centres","etapa.cruzAbajo":"la croix du bas","etapa.esquinasAbajo":"les coins du bas","etapa.capaMedia":"la couronne du milieu","etapa.ultimaCapa":"la derni\xE8re couche","etapa.aristas":"l\u2019appairage des ar\xEAtes","etapa.comoUn3x3":"le 3\xD73\xD73","etapa.paridad":"la parit\xE9","etapa.paridadDeAristas":"la parit\xE9 des ar\xEAtes","etapa.capaAbajo":"la couche du bas","etapa.piramidePequena":"la petite pyramide","etapa.puntas":"les pointes","etapa.estrella":"l\u2019\xE9toile","etapa.esquinasPrimeraCapa":"les coins de la 1re couche","etapa.aristasSegundaFila":"les ar\xEAtes de la 2e rang\xE9e","etapa.esquinasTerceraFila":"les coins de la 3e rang\xE9e","etapa.aristasJuntoAEsquina":"les ar\xEAtes pr\xE8s des coins","etapa.esquinasPenultimas":"les avant-derniers coins","etapa.aristasPenultimas":"les avant-derni\xE8res ar\xEAtes","etapa.aristasUltimaCapa":"les ar\xEAtes de la derni\xE8re couche","etapa.esquinasUltimaCapa":"les coins de la derni\xE8re couche","etapa.girarEsquinas":"orienter les derniers coins"};var uu="en",cu=Object.freeze({en:vm,es:ym,pt:Mm,fr:bm}),fr=Object.freeze(Object.keys(cu)),Sm=Object.freeze({en:"English",es:"Espa\xF1ol",pt:"Portugu\xEAs",fr:"Fran\xE7ais"}),hu=Object.freeze({en:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#012169"/><path d="M0 0 24 16M24 0 0 16" stroke="#fff" stroke-width="3.2"/><path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" stroke-width="1.9"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="5.3"/><path d="M12 0v16M0 8h24" stroke="#c8102e" stroke-width="3.2"/></svg>',es:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#aa151b"/><rect y="4" width="24" height="8" fill="#f1bf00"/></svg>',pt:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#da291c"/><rect width="9.6" height="16" fill="#046a38"/><circle cx="9.6" cy="8" r="3.3" fill="#ffe000" stroke="#fff" stroke-width=".8"/><circle cx="9.6" cy="8" r="1.5" fill="#da291c"/></svg>',fr:'<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#fff"/><rect width="8" height="16" fill="#002654"/><rect x="16" width="8" height="16" fill="#ed2939"/></svg>'}),Em="twistlab.idioma",ci=uu,lu=new Set,YE=i=>String(i??"").trim().toLowerCase().split(/[-_]/)[0];function wm(){if(typeof navigator>"u")return[];let i=navigator.languages;return Array.isArray(i)&&i.length?i:navigator.language?[navigator.language]:[]}function jE(i=wm()){for(let e of i){let t=YE(e);if(fr.includes(t))return t}return uu}function ZE(){try{let i=localStorage.getItem(Em);return fr.includes(i)?i:null}catch{return}}var Am=()=>ci;function Tm(i){return ci=ZE()??jE(i??wm()),Cm(),ci}function Rm(i){if(!(!fr.includes(i)||i===ci)){ci=i;try{localStorage.setItem(Em,i)}catch{}Cm();for(let e of lu)e(ci)}}function ba(i){return lu.add(i),()=>lu.delete(i)}function $E(i,e){return i.replace(/\{(\w+)\}/g,(t,n)=>n in e?String(e[n]):t)}function Ce(i,e=null){let t=cu[ci]?.[i]??cu[uu][i];return t===void 0?"":e?$E(t,e):t}function Cm(i=null){if(typeof document>"u")return;let e=i??document;i||(document.documentElement.lang=ci);for(let t of e.querySelectorAll("[data-t]"))t.textContent=Ce(t.dataset.t);for(let t of e.querySelectorAll("[data-t-title]"))t.title=Ce(t.dataset.tTitle);for(let t of e.querySelectorAll("[data-t-aria]"))t.setAttribute("aria-label",Ce(t.dataset.tAria));if(!i){let t=Ce("pagina.titulo");t&&(document.title=t)}}var Lm="twistlab.visita",Sa=8;function mn(i){let e=document.querySelector(i);if(!e)return null;let t=e.getBoundingClientRect();return!t.width||!t.height?null:{x:t.left,y:t.top,ancho:t.width,alto:t.height}}function KE(i,e){if(!i)return e;if(!e)return i;let t=Math.min(i.x,e.x),n=Math.min(i.y,e.y);return{x:t,y:n,ancho:Math.max(i.x+i.ancho,e.x+e.ancho)-t,alto:Math.max(i.y+i.alto,e.y+e.alto)-n}}function Pm(){let i=document.getElementById("cube-canvas");if(!i)return null;let e=Ss(i);if(!e)return null;let t=e.right-e.left,n=e.bottom-e.top;return t<=0||n<=0?null:{x:e.left,y:e.top,ancho:t,alto:n}}var QE=[{clave:"visita.puzzles",donde:()=>mn("#puzzle")},{clave:"visita.arrastrar",donde:()=>Pm()},{clave:"visita.rotulos",redondo:!0,donde:i=>i.faceLabels?(Cs??(Cs=i.faceLabels.rotuloDestacable()),Cs?i.faceLabels.rectanguloEnPantalla(Cs):null):null},{clave:"visita.deshacer",donde:()=>KE(mn("#btn-undo"),mn("#btn-redo"))},{clave:"visita.interruptor",donde:()=>mn("#btn-labels")},{clave:"visita.reiniciar",donde:()=>mn("#btn-reset")},{clave:"visita.mezclar",donde:()=>mn("#btn-shuffle")},{clave:"visita.resolver",donde:()=>mn("#btn-solve")},{clave:"visita.historial",donde:()=>mn("#history-panel")},{clave:"visita.pellizco",donde:()=>Pm()},{clave:"visita.encuadrar",donde:()=>mn("#btn-encuadrar")},{clave:"visita.sonido",donde:()=>mn("#btn-sound")},{clave:"visita.ayuda",donde:()=>mn("#btn-help")}],bn=[],qn=0,wa=null,Ea=0,pr=null,Cs=null,Rs=null;function mr(){if(Rs)return Rs;let i=document.getElementById("tour");return i?(Rs={raiz:i,foco:document.getElementById("tour-focus"),cartel:document.getElementById("tour-card"),texto:document.getElementById("tour-text"),cuenta:document.getElementById("tour-count"),siguiente:document.getElementById("tour-next"),saltar:document.getElementById("tour-skip")},Rs.siguiente?.addEventListener("click",nw),Rs.saltar?.addEventListener("click",Aa),Rs):null}function ew(){try{return localStorage.getItem(Lm)==="1"}catch{return null}}function tw(){try{localStorage.setItem(Lm,"1")}catch{}}var Im=()=>ew()===!1,Ps=()=>bn.length>0;function Um(i){let e=mr();e&&(wa=i??{},bn=QE.filter(t=>t.donde(wa)!==null),bn.length&&(qn=0,pr=null,Cs=null,e.raiz.hidden=!1,Dm(),Nm()))}function Aa(){let i=mr();Ea&&(cancelAnimationFrame(Ea),Ea=0),bn=[],qn=0,wa=null,pr=null,Cs=null,i&&(i.raiz.hidden=!0),tw()}function nw(){if(Ps()){if(qn+=1,qn>=bn.length){Aa();return}Dm()}}function Dm(){let i=mr();i&&(pr=null,Cs=null,zm(),i.foco&&i.foco.classList.toggle("redondo",bn[qn].redondo===!0),Om())}function zm(){let i=mr();if(!i||!Ps())return;let e=bn[qn];i.texto&&(i.texto.textContent=Ce(e.clave)),i.cuenta&&(i.cuenta.textContent=Ce("visita.cuenta",{n:qn+1,total:bn.length})),i.siguiente&&(i.siguiente.textContent=Ce(qn===bn.length-1?"visita.hecho":"visita.siguiente"))}ba(zm);function Nm(){Ea=requestAnimationFrame(()=>{Ps()&&(Om(),Nm())})}function Om(){let i=mr();if(!i?.foco||!Ps())return;let e=bn[qn].donde(wa)??pr;if(e&&(pr=e,i.foco.style.left=`${e.x-Sa}px`,i.foco.style.top=`${e.y-Sa}px`,i.foco.style.width=`${e.ancho+Sa*2}px`,i.foco.style.height=`${e.alto+Sa*2}px`,i.cartel)){let t=e.y+e.alto/2;i.cartel.classList.toggle("abajo",t<window.innerHeight/2)}}function Ls(i,e=i){let t=20/Math.max(i,e),n=t*i,s=t*e,r=(24-n)/2,a=(24-s)/2,o="";for(let c=0;c<=i;c++)o+=`M${(r+c*t).toFixed(2)} ${a.toFixed(2)}v${s.toFixed(2)}`;for(let c=0;c<=e;c++)o+=`M${r.toFixed(2)} ${(a+c*t).toFixed(2)}h${n.toFixed(2)}`;return`<path d="${o}"/>`}var sw='<path d="M12 3 21.5 20.5H2.5Z"/><path d="M8.83 9.5h6.34M5.67 15h12.66"/>',rw='<path d="M12 2.8 21.2 9.5 17.7 20.3H6.3L2.8 9.5Z"/><path d="M12 2.8v6.4M21.2 9.5l-6.1 4.4M17.7 20.3l-2.6-6.4M6.3 20.3l2.6-6.4M2.8 9.5l6.1 4.4"/>',li=i=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" aria-hidden="true">'+i+"</svg>",Ta=Object.freeze({cuboid221:li(Ls(2,1)),cube2:li(Ls(2)),cuboid331:li(Ls(3,1)),cube3:li(Ls(3)),cube4:li(Ls(4)),cube5:li(Ls(5)),pyraminx:li(sw),megaminx:li(rw)}),du=Object.freeze({cuboid221:"2\xD72\xD71",cube2:"2\xD72\xD72",cuboid331:"3\xD73\xD71",cube3:"3\xD73\xD73",cube4:"4\xD74\xD74",cube5:"5\xD75\xD75",pyraminx:"Pyraminx",megaminx:"Megaminx"}),Fm=Object.freeze(Object.keys(Ta));var T={puzzleKey:"cube3",puzzleState:null,renderer:null,history:null,isAnimating:!1,isSolving:!1,paused:!1,saveReady:!1,marcador:Qp(),scrambled:!1,labels:!0,guia:null,guiado:!1};document.addEventListener("DOMContentLoaded",()=>{Tm();let i=document.getElementById("cube-canvas");T.renderer=new pa(i,{onFirstFrame:()=>Rp()}),T.faceLabels=new la(T.renderer,e=>{Ts(),La(e)},()=>T.isAnimating||T.isSolving,()=>T.puzzleState),T.dragTurns=new oa(T.renderer,()=>T.puzzleState,e=>{Ts(),La(e)},()=>T.isAnimating||T.isSolving,e=>T.renderer.setEdgeGlow(e)),T.history=new ma,T.history.subscribe(gr),T.renderer.setRoomScale(Zm(),{ms:0}),xu(T.puzzleKey),document.getElementById("btn-undo").addEventListener("click",ww),document.getElementById("btn-redo").addEventListener("click",pu),document.getElementById("btn-reset").addEventListener("click",Aw),document.getElementById("btn-solve").addEventListener("click",Uw),document.getElementById("btn-shuffle").addEventListener("click",Tw),document.getElementById("btn-labels")?.addEventListener("click",xw),document.getElementById("btn-sound")?.addEventListener("click",vw),document.getElementById("btn-help")?.addEventListener("click",jm),document.getElementById("btn-encuadrar")?.addEventListener("click",()=>T.renderer.reencuadrar()),xm(),yu(),fm(),document.getElementById("history-toggle")?.addEventListener("click",()=>$m()),window.addEventListener("keydown",Nw),lw(),cw(),Mu(),vu(),gr(T.history.snapshot()),Ia(),ow(),aw()});function ow(){!1}async function aw(){await Bp(),kp(),(Tp()||Op()||!1)&&await Promise.race([pw(),new Promise(e=>setTimeout(e,5e3))]),T.saveReady=!0,Cp(),Gp(e=>e?Bm():km());let i=()=>mm(Hp()&&Ip());Wp(i),Up(i),i(),T.marcador.total>0&&eu(T.marcador.total),Pp(Bm),Lp(km),Im()&&jm()}function cw(){let i=document.getElementById("puzzle"),e=document.getElementById("btn-puzzle"),t=document.getElementById("puzzle-menu");if(!(!i||!e||!t)){for(let n of Fm){let s=document.createElement("button");s.type="button",s.className="puzzle-option",s.dataset.puzzle=n,s.setAttribute("role","menuitemradio"),s.dataset.alwaysOn="true",s.innerHTML=`<span class="pzico">${Ta[n]}</span>`,s.append(du[n]),s.addEventListener("click",()=>{Ra(!1),e.focus(),n!==T.puzzleKey&&mw(n)}),t.appendChild(s)}e.addEventListener("click",()=>Ra()),document.addEventListener("pointerdown",n=>{Xm()&&!i.contains(n.target)&&Ra(!1)},!0)}}var Xm=()=>document.getElementById("puzzle-menu")?.hidden===!1;function Ra(i){let e=document.getElementById("btn-puzzle"),t=document.getElementById("puzzle-menu");if(!e||!t)return;let n=i??t.hidden;t.hidden=!n,e.setAttribute("aria-expanded",String(n))}function lw(){let i=document.getElementById("lang"),e=document.getElementById("btn-lang"),t=document.getElementById("lang-menu");if(!(!i||!e||!t)){for(let n of fr){let s=document.createElement("button");s.type="button",s.className="lang-option",s.dataset.idioma=n,s.setAttribute("role","menuitemradio"),s.dataset.alwaysOn="true",s.innerHTML=`<span class="flag">${hu[n]}</span>`,s.append(Sm[n]),s.addEventListener("click",()=>{Rm(n),Ca(!1),e.focus()}),t.appendChild(s)}e.addEventListener("click",()=>Ca()),document.addEventListener("pointerdown",n=>{qm()&&!i.contains(n.target)&&Ca(!1)},!0),ba(uw),Ym()}}var qm=()=>document.getElementById("lang-menu")?.hidden===!1;function Ca(i){let e=document.getElementById("btn-lang"),t=document.getElementById("lang-menu");if(!e||!t)return;let n=i??t.hidden;t.hidden=!n,e.setAttribute("aria-expanded",String(n))}function Ym(){let i=Am(),e=document.getElementById("lang-flag");e&&(e.innerHTML=hu[i]);for(let t of document.querySelectorAll(".lang-option"))t.setAttribute("aria-checked",String(t.dataset.idioma===i))}function uw(){Ym(),yu(),vu(),Ia(),gr(T.history.snapshot()),Su?.()}function jm(){Um({faceLabels:T.faceLabels})}function Bm(){T.paused=!0,_u(),T.renderer.pauseLoop()}function km(){T.paused=!1,T.renderer.resumeLoop()}function Ia({ganados:i=0}={}){let e=document.getElementById("score");e&&(e.textContent=Ce("puntos.valor",{total:T.marcador.total}),i>0&&(e.classList.remove("gained"),e.offsetWidth,e.classList.add("gained"))),Us()}function Us(){let i=document.getElementById("stats");if(!i)return;let e=T.marcador.enCurso;if(e){let s=nm(T.marcador,Date.now());i.hidden=!1,i.classList.add("running"),i.textContent=Ce("marcas.reloj",{tiempo:As(s),movimientos:e.movimientos}),i.title=Ce("marcas.enCurso");return}i.classList.remove("running");let t=su(T.marcador,T.puzzleKey);if(!t.intentos){i.hidden=!0;return}let n=t.media5Ms?Ce("marcas.ao5",{tiempo:As(t.media5Ms)}):Ce("marcas.faltanAo5",{faltan:xa-t.intentos});i.hidden=!1,i.textContent=Ce("marcas.mejor",{tiempo:As(t.mejorMs)})+n,i.title=Ce("marcas.title",{intentos:t.intentos,tiempo:As(t.mejorMs),movimientos:t.mejorMovs})}function Pa(){clearInterval(Pa._t),T.marcador.enCurso&&(Pa._t=setInterval(()=>{if(!T.marcador.enCurso){clearInterval(Pa._t);return}Us()},100))}function hw(){if(!T.scrambled||T.isSolving)return;let i=T.marcador.enCurso?.desde;tm(T.marcador,Date.now()),i||Pa()}function dw(){if(!T.scrambled||T.isSolving||!T.puzzleState.looksSolved?.())return;T.scrambled=!1;let i=im(T.marcador,Date.now());if(!i)return;Ia({ganados:i.puntos});let e=i.mejorTiempo&&i.intentos>1?Ce("aviso.mejorTiempo"):"";Ft(Ce("aviso.resuelto",{tiempo:As(i.ms),movimientos:i.movimientos,puntos:i.puntos,marca:e})),eu(T.marcador.total),_u(),qp(),setTimeout(()=>nu(),1500)}var fw=1200;function Sn(){T.saveReady&&(clearTimeout(Sn._t),Sn._t=setTimeout(_u,fw))}function _u(){if(!T.saveReady)return;clearTimeout(Sn._t);let i=rm({puzzle:T.puzzleKey,moves:T.history.getMovesUpToCursor(),score:T.marcador.total,session:T.marcador.sesion});i&&(Dp(i),Xp(i),Zp(i))}async function pw(){let i=om(await zp()??await Yp()??await $p());if(!i)return;xu(i.puzzle),T.marcador.total=i.score,T.marcador.sesion=i.session??{},Ia();let e=am(T.puzzleState,i.moves);T.renderer.rebuild(T.puzzleState),T.faceLabels?.rebuild(T.puzzleState),T.history.clear();for(let t of e)T.history.addMove(t);e.length!==i.moves.length&&ga(`partida restaurada a medias: ${e.length}/${i.moves.length}`)}async function mw(i){let e=i;T.history.getCursor()>0&&!await bu(Ce("confirmar.cambiarPuzzle"),{ok:Ce("confirmar.cambiar")})||(xu(e),Mu())}function xu(i){i===T.puzzleKey&&T.puzzleState||T.isAnimating||T.isSolving||(T.puzzleKey=i,T.puzzleState=bw(i),T.renderer.rebuild(T.puzzleState),T.faceLabels?.rebuild(T.puzzleState),T.history.clear(),Mu(),Mw(),T.scrambled=!1,T.guia=null,T.guiado=!1,ya(T.marcador),Us(),Sn())}var gw=.82,_w=1.16,Zm=()=>T.labels?gw:_w;function xw(){T.labels=!T.labels,T.faceLabels?.setVisible(T.labels),T.renderer.setRoomScale(Zm()),vu()}function vu(){let i=document.getElementById("btn-labels");i&&(i.setAttribute("aria-pressed",String(T.labels)),i.title=Ce(T.labels?"rotulos.esconder":"rotulos.mostrar"))}function vw(){gm(),yu()}function yu(){let i=document.getElementById("btn-sound");if(!i)return;let e=!_m();i.setAttribute("aria-pressed",String(e));let t=i.querySelector(".ico");t&&(t.textContent=e?"\u{1F50A}":"\u{1F507}"),i.title=Ce(e?"sonido.apagar":"sonido.encender")}var yw=i=>{let e=i?.getType?.();return e==="megaminx"||e==="pyraminx"?!0:e==="cube"&&i.n>=3&&i.n<=5};function Mw(){let i=document.getElementById("btn-solve");i&&(i.hidden=!yw(T.puzzleState))}function bw(i){switch(i){case"cube2":return new It(2);case"cube3":return new It(3);case"cube4":return new It(4);case"cube5":return new It(5);case"pyraminx":return new Ni;case"megaminx":return new fi;case"cuboid221":return Fu();case"cuboid331":return Bu();default:throw new Error(`[main] Puzzle no soportado: ${i}`)}}function Mu(){let i=T.puzzleKey,e=document.getElementById("puzzle-ico"),t=document.getElementById("puzzle-nombre");e&&(e.innerHTML=Ta[i]??""),t&&(t.textContent=du[i]??i);for(let n of document.querySelectorAll(".puzzle-option"))n.setAttribute("aria-checked",String(n.dataset.puzzle===i))}async function La(i,{duration:e}={}){if(T.isAnimating||T.isSolving)return;let t=T.puzzleState.parseMove(i);if(t){if(T.guiado)return Sw(i);T.isAnimating=!0,Is(!1);try{let n=T.puzzleState.pickLayerPieces(i),s=Kr(T.puzzleState,t,1);T.puzzleState.applyMove(i),await T.renderer.animateMove({pieces:n,...s,...e?{duration:e}:{},state:T.puzzleState}),T.history.addMove(i),hw(),dw(),Sn()}catch(n){console.error("[main] Error al ejecutar movimiento:",n)}finally{T.isAnimating=!1,Is(!0)}}}function Sw(i){let e=T.history.getCursor(),t=T.history.getMoves()[e];if(!t){Ft(Ce("aviso.finGuia"));return}if(i===t)return pu();let n=op(T.puzzleState,t);if(n.includes(i))return Ew(e,i),pu();Ft(n.length?Ce("aviso.noEsElMovimientoDoble",{movimiento:i,toca:t,mitad:n[0]}):Ce("aviso.noEsElMovimiento",{movimiento:i,toca:t})),T.faceLabels?.announce(t,T.puzzleState),gr(T.history.snapshot())}function Ew(i,e){T.history.replaceAt(i,[e,e]);let t=T.guia;if(!t?.etapas.length)return;let n=i-t.desde;for(let s of t.etapas)s.desde>n&&s.desde++,s.hasta>n&&s.hasta++}async function ww(){if(!(T.isAnimating||T.isSolving)&&T.history.canUndo()){Ts(),T.isAnimating=!0,Is(!1);try{let i=T.history.getCursor()-1,e=T.history.getMoves()[i],t=T.puzzleState.parseMove(e),n=T.puzzleState.pickLayerPieces(e),s=Kr(T.puzzleState,t,-1);T.puzzleState.applyInverse(e),await T.renderer.animateMove({pieces:n,...s,state:T.puzzleState}),T.history.undo(),Sn()}finally{T.isAnimating=!1,Is(!0)}}}async function pu(){if(!(T.isAnimating||T.isSolving)&&T.history.canRedo()){Ts(),T.isAnimating=!0,Is(!1);try{let i=T.history.getCursor(),e=T.history.getMoves()[i],t=T.puzzleState.parseMove(e),n=T.puzzleState.pickLayerPieces(e),s=Kr(T.puzzleState,t,1);T.puzzleState.applyMove(e),await T.renderer.animateMove({pieces:n,...s,state:T.puzzleState}),T.history.redo(),zw(),Sn()}finally{T.isAnimating=!1,Is(!0)}}}async function Aw(){T.isAnimating||T.isSolving||T.guiado&&!await bu(Ce("confirmar.reiniciarGuia"))||(Ts(),T.guiado=!1,T.puzzleState.reset(),T.renderer.rebuild(T.puzzleState),T.history.clear(),T.scrambled=!1,T.guia=null,ya(T.marcador),Us(),Sn())}async function Tw(){if(T.isAnimating||T.isSolving||T.guiado&&!await bu(Ce("confirmar.mezclarGuia")))return;T.guiado=!1,nu();let i=T.puzzleState.getMoveNotation(),e=T.puzzleState.getScrambleSuffixes(),t=T.puzzleState.getScrambleLength(),n=[],s="";for(let r=0;r<t;r++){let a;do a=i[Math.floor(Math.random()*i.length)];while(a===s);s=a,n.push(a+e[Math.floor(Math.random()*e.length)])}ou();try{for(let r of n){if(T.paused)break;await La(r)}}finally{au()}T.puzzleState.looksSolved?.()===!1&&(T.scrambled=!0,em(T.marcador,T.puzzleKey),Us())}function Rw(i){if(T.isAnimating||T.isSolving)return;let e=T.history.getCursor();if(i===e)return;let t=T.history.getMoves().slice(0,i);T.puzzleState.reset(),T.puzzleState.applyMoves(t),T.renderer.rebuild(T.puzzleState),T.history.goToIndex(i),Km(i+1),Sn()}var Hm=new URL("./solver.FVTVBRZF.js",import.meta.url),mu=0,Cw=()=>{let i=performance.now();if(!(i-mu<100))return mu=i,new Promise(e=>setTimeout(e,0))},Vm=(i,e)=>Eu(()=>Ft(Ce("aviso.etapaNumerada",{n:i,total:Or,etapa:Ce(e)}),{fijo:!0})),fu=i=>e=>Eu(()=>Ft(Ce("aviso.resolviendoEtapa",{puzzle:i,etapa:Ce(e)}),{fijo:!0}));function Gm(){let i=[],e=(t,n)=>{i.length&&(i.at(-1).hasta=n),i.push({nombre:t,desde:n,hasta:n})};return e.cerrar=t=>(i.length&&(i.at(-1).hasta=t),i),e}var Pw=8e3;async function Lw(){if(!1)try{let i=await fetch(Hm);if(!i.ok)throw new Error(`HTTP ${i.status}`);let e=URL.createObjectURL(new Blob([await i.text()],{type:"text/javascript"}));return{worker:new Worker(e,{type:"module"}),url:e}}catch(i){return console.warn("[main] No se pudo traer el worker:",i.message),null}try{return{worker:new Worker(Hm,{type:"module"}),url:null}}catch{return null}}async function Wm(i){let e=await Lw();if(!e)return;let{worker:t,url:n}=e;return new Promise(s=>{let r,a=o=>{clearTimeout(r),t.terminate(),n&&URL.revokeObjectURL(n),s(o)};r=setTimeout(()=>{console.warn("[main] El worker no dio se\xF1ales de vida; se cuenta en la p\xE1gina."),a(void 0)},Pw),t.onmessage=({data:o})=>{if(o.tipo==="listo")return clearTimeout(r);if(o.tipo==="etapa")return o.n?i.etapa?.(o.n,o.rotulo,o.hasta):i.aviso?.(o.etapa);if(o.tipo==="error")return console.warn("[main] El worker fall\xF3:",o.mensaje),a(void 0);a(o.plan)},t.onerror=o=>{console.warn("[main] No se pudo arrancar el worker:",o.message),a(void 0)},t.postMessage(i.mensaje)})}async function Iw(){let i=T.puzzleState.getType?.();if(i==="cube"&&T.puzzleState.n===3){Eu(()=>Ft(Ce("aviso.resolviendo3x3"),{fijo:!0})),await new Promise(requestAnimationFrame);let e=ki(T.puzzleState,{aviso:fu("3\xD73\xD73")});return e?.solved?e:null}if(i==="cube"&&(T.puzzleState.n===4||T.puzzleState.n===5)){let e=T.puzzleState.n,t=`${e}\xD7${e}\xD7${e}`;Ft(Ce("aviso.resolviendoTarda",{puzzle:t})),await new Promise(requestAnimationFrame);let n=fu(t),s=await Wm({aviso:n,mensaje:{tipo:"cubo",n:e,moves:T.history.getMovesUpToCursor()}});if(s!==void 0)return s;let a=(e===4?Vh:Wh)(T.puzzleState,{aviso:n});return a?.solved?a:null}if(i==="pyraminx"){let e=Gm(),t=fu("Pyraminx"),n=Sh(T.puzzleState,{aviso:(s,r)=>{t(s),e(s,r)}});return n&&{moves:n,etapas:e.cerrar(n.length)}}if(i==="megaminx"){Ft(Ce("aviso.resolviendoTarda",{puzzle:"Megaminx"}));let e=ah(T.puzzleState),t=Gm(),n=await Wm({etapa:(r,a,o)=>{Vm(r,a),t(a,o)},mensaje:{tipo:"megaminx",estado:e}});if(n!==void 0)return n&&{moves:n,etapas:t.cerrar(n.length)};mu=performance.now();let s=await ph(e,void 0,{aviso:(r,a,o)=>{Vm(r,a),t(a,o)},respira:Cw});return s&&{moves:s,etapas:t.cerrar(s.length)}}}async function Uw(){if(T.isAnimating||T.isSolving)return;T.isSolving=!0,ou(),T.renderer.pensando(!0);let i;try{i=await Iw()}finally{T.isSolving=!1,au(),T.renderer.pensando(!1)}if(i===void 0){Ft(Ce("aviso.sinSolucionador"));return}if(!i){Ft(Ce("aviso.sinSolucion")),console.warn("[main] The solver did not reach the end:",T.puzzleState.getFaceletString?.());return}if(!i.moves.length){Ft(Ce("aviso.yaResuelto"));return}T.guia={etapas:i.etapas??[],desde:T.history.getCursor()};let e=T.history.queueMoves(i.moves);T.guiado=!0,T.scrambled=!1,ya(T.marcador),Us(),Sn();let t=T.guia.etapas.find(n=>n.hasta>n.desde)?.nombre;Ft(t?Ce("aviso.preparadosPrimera",{n:e,etapa:Ce(t)}):Ce("aviso.preparados",{n:e}))}function gr(i){let e=document.getElementById("history-list"),t=document.getElementById("history-count"),n=document.getElementById("history-progress"),s=document.getElementById("btn-undo"),r=document.getElementById("btn-redo");if(t&&(t.textContent=`${i.cursor} / ${i.moves.length}`),s&&(s.disabled=!i.canUndo),r&&(r.disabled=!i.canRedo),n){let c=i.moves.length;n.style.width=c?`${i.cursor/c*100}%`:"0"}if(!e)return;e.innerHTML="";let a=new Map;T.guia?.etapas.length&&T.guia.etapas.forEach((c,l)=>{c.hasta>c.desde&&a.set(T.guia.desde+c.desde,{n:l+1,...c})});let o=null;i.moves.forEach((c,l)=>{let u=document.createElement("button");u.className="history-item "+(l<i.cursor?"done":"undone"),u.textContent=c,u.title=Ce("historial.saltar",{n:l+1});let h=a.get(l);h&&(u.classList.add("stage-start"),u.dataset.stage=h.n,u.title=Ce("historial.etapa",{n:h.n,etapa:Ce(h.nombre),movimientos:h.hasta-h.desde})),l===i.cursor-1&&(u.classList.add("current","last-applied"),o=u),T.guiado&&l===i.cursor&&(u.classList.add("next"),o=o??u),u.addEventListener("click",()=>Rw(l)),e.appendChild(u)}),o?.scrollIntoView({block:"nearest",inline:"center"})}function $m(i){let e=document.getElementById("history-toggle"),t=document.getElementById("history-panel");if(!e||!t)return;let n=e.getAttribute("aria-expanded")==="true",s=i??!n;e.setAttribute("aria-expanded",s?"true":"false"),t.dataset.collapsed=s?"false":"true",s&&gr(T.history.snapshot())}var Dw=()=>$m(!1);function Is(i){document.querySelectorAll("button").forEach(e=>{e.dataset.alwaysOn!=="true"&&(e.disabled=!i)})}function bu(i,{ok:e=null}={}){let t=document.getElementById("confirm"),n=document.getElementById("confirm-text"),s=document.getElementById("confirm-yes"),r=document.getElementById("confirm-no");return!t||!n||!s||!r?Promise.resolve(!0):(n.textContent=i,s.textContent=e??Ce("confirmar.reiniciar"),t.hidden=!1,s.focus(),new Promise(a=>{let o=d=>{t.hidden=!0,s.removeEventListener("click",c),r.removeEventListener("click",l),t.removeEventListener("click",u),window.removeEventListener("keydown",h,!0),a(d)},c=()=>o(!0),l=()=>o(!1),u=d=>{d.target===t&&o(!1)},h=d=>{if(d.key!=="Escape"&&d.key!=="Enter"){d.stopPropagation();return}d.stopPropagation(),o(d.key==="Enter")};s.addEventListener("click",c),r.addEventListener("click",l),t.addEventListener("click",u),window.addEventListener("keydown",h,!0)}))}function Ft(i,{fijo:e=!1}={}){let t=document.getElementById("status");t&&(t.textContent=i,t.classList.add("visible"),t.classList.toggle("working",e),clearTimeout(Ft._t),e||(Ft._t=setTimeout(()=>t.classList.remove("visible"),2400)),e||(Su=null))}var Su=null,Eu=i=>{i(),Su=i};function Jm(i){let e=T.guia;if(!e?.etapas.length)return null;let t=i-e.desde;if(t<=0)return null;let n=e.etapas.find(s=>t>s.desde&&t<=s.hasta);return n?{etapa:n,n:e.etapas.indexOf(n)+1}:null}function zw(){let i=Jm(T.history.getCursor());!i||i.etapa.nombre===T.guia.ultima||Km(T.history.getCursor())}function Km(i){let e=Jm(i);e&&(T.guia.ultima=e.etapa.nombre,Ft(Ce("aviso.paso",{n:e.n,total:T.guia.etapas.length,etapa:Ce(e.etapa.nombre)})))}function Nw(i){if(i.key==="Escape"){Dw();return}if(T.isAnimating||T.isSolving)return;let e=i.key.toUpperCase();if(!T.puzzleState.getMoveNotation().includes(e))return;i.preventDefault();let n=i.altKey?"2":i.shiftKey?"'":"";La(e+n)}
/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
