import{r as O,j as Y}from"./vendor-B1ZDvj7W.js";import{u as K,t as X,s as J,g as Q,a as Z,w as d}from"./index-B9o6YyBN.js";const B=`#version 300 es
in vec4 aStar;   // x, y, z0, seed
in float aEnd;   // 0 head, 1 tail
uniform float uTime, uSpeed, uStreak, uAspect, uFocal, uDpr, uPoint;
out float vA; out float vSeed;
void main(){
  float z = fract(aStar.z - uTime * uSpeed * (0.4 + aStar.w * 0.6)) * 0.95 + 0.05;
  float zz = z + aEnd * uStreak * (0.25 + aStar.w);
  vec2 p = aStar.xy / zz * uFocal;
  p.x /= uAspect;
  gl_Position = vec4(p, 0.0, 1.0);
  float near = 1.0 - z;
  vA = (aEnd > 0.5) ? 0.0 : (0.25 + near * 0.75);
  vSeed = aStar.w;
  gl_PointSize = uPoint * uDpr * (0.6 + near * 1.6) * (0.7 + aStar.w * 0.6);
}`,D=`#version 300 es
precision mediump float;
in float vA; in float vSeed;
uniform vec3 uColor, uTint; uniform float uTintMix, uLines, uLight;
out vec4 o;
void main(){
  float a = vA;
  if (uLines < 0.5) { float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; a *= smoothstep(0.5, 0.0, d); }
  else { a = max(vA, 0.0) + 0.0; }
  vec3 c = mix(uColor, uTint, uTintMix * (0.5 + vSeed * 0.5));
  o = vec4(c, a * (uLight > 0.5 ? 0.55 : 0.9));
}`,$=B.replace("vA = (aEnd > 0.5) ? 0.0 : (0.25 + near * 0.75);","vA = (1.0 - aEnd) * (0.25 + near * 0.75);");function k(r,u,o){const e=(f,h)=>{const i=r.createShader(f);if(r.shaderSource(i,h),r.compileShader(i),!r.getShaderParameter(i,r.COMPILE_STATUS))throw new Error(r.getShaderInfoLog(i)??"shader");return i},c=r.createProgram();if(r.attachShader(c,e(r.VERTEX_SHADER,u)),r.attachShader(c,e(r.FRAGMENT_SHADER,o)),r.linkProgram(c),!r.getProgramParameter(c,r.LINK_STATUS))throw new Error(r.getProgramInfoLog(c)??"link");return c}const M=r=>{const u=parseInt(r.replace("#",""),16);return[(u>>16&255)/255,(u>>8&255)/255,(u&255)/255]};function re(){const r=O.useRef(null),{tier:u}=K();return O.useEffect(()=>{const o=r.current;if(!o)return;const e=o.getContext("webgl2",{alpha:!0,antialias:!1,premultipliedAlpha:!1});if(!e)return;const c=X[u],f=c.stars||1200,h=Math.min(c.dpr,window.devicePixelRatio||1);let i,p;try{i=k(e,B,D),p=k(e,$,D)}catch(t){console.warn("[Orbit] starfield disabled",t);return}const l=new Float32Array(f*4);for(let t=0;t<f;t++)l[t*4]=(Math.random()*2-1)*1.2,l[t*4+1]=(Math.random()*2-1)*1.2,l[t*4+2]=Math.random(),l[t*4+3]=Math.random();const g=new Float32Array(f*10);for(let t=0;t<f;t++)for(let s=0;s<2;s++){const n=(t*2+s)*5;g.set(l.subarray(t*4,t*4+4),n),g[n+4]=s}const y=(t,s,n,F)=>{const E=e.createVertexArray();e.bindVertexArray(E);const L=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,L),e.bufferData(e.ARRAY_BUFFER,s,e.STATIC_DRAW);const b=e.getAttribLocation(t,"aStar");e.enableVertexAttribArray(b),e.vertexAttribPointer(b,4,e.FLOAT,!1,n*4,0);const m=e.getAttribLocation(t,"aEnd");return m>=0&&(F?(e.enableVertexAttribArray(m),e.vertexAttribPointer(m,1,e.FLOAT,!1,n*4,16)):e.vertexAttrib1f(m,0)),e.bindVertexArray(null),E},U=y(i,l,4,!1),H=y(p,g,5,!0),R=t=>Object.fromEntries(["uTime","uSpeed","uStreak","uAspect","uFocal","uDpr","uPoint","uColor","uTint","uTintMix","uLines","uLight"].map(n=>[n,e.getUniformLocation(t,n)])),j=R(i),q=R(p);let _=[1,1,1],C=[.5,.6,1],S=0;const z=()=>{const t=Q();_=M(t.hex.text),C=M(t.hex.primary),S=t.scheme==="light"?1:0};z();const W=J(z),T=()=>{o.width=Math.round(innerWidth*h),o.height=Math.round(innerHeight*h),e.viewport(0,0,o.width,o.height)};T(),addEventListener("resize",T);let A=0,P=performance.now(),I=0,x=!0,v=0;const w=t=>{if(!x)return;const s=Math.min(.05,(t-P)/1e3);P=t,d.value+=(d.target-d.value)*Math.min(1,s*7),v=d.value;const n=Math.min(1,Math.abs(Z.velocity)*.5);I+=s;const F=(60+n*6+v*4)*(Math.PI/180),E=1/Math.tan(F/2)*.55,L=n*.18+v*.9,b=.012+v*.5+n*.05,m=d.hue?M(d.hue):C;e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),S?e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA):e.blendFunc(e.SRC_ALPHA,e.ONE);const N=(a,G)=>{e.uniform1f(a.uTime,I),e.uniform1f(a.uSpeed,b),e.uniform1f(a.uStreak,L),e.uniform1f(a.uAspect,o.width/o.height),e.uniform1f(a.uFocal,E),e.uniform1f(a.uDpr,h),e.uniform1f(a.uPoint,S?1.6:1.8),e.uniform3fv(a.uColor,_),e.uniform3fv(a.uTint,m),e.uniform1f(a.uTintMix,Math.min(1,v*1.4+.08)),e.uniform1f(a.uLines,G),e.uniform1f(a.uLight,S)};e.useProgram(i),N(j,0),e.bindVertexArray(U),e.drawArrays(e.POINTS,0,f),L>.01&&(e.useProgram(p),N(q,1),e.bindVertexArray(H),e.drawArrays(e.LINES,0,f*2)),A=requestAnimationFrame(w)};A=requestAnimationFrame(w);const V=()=>{x=!document.hidden,x?(P=performance.now(),A=requestAnimationFrame(w)):cancelAnimationFrame(A)};return document.addEventListener("visibilitychange",V),()=>{x=!1,cancelAnimationFrame(A),removeEventListener("resize",T),document.removeEventListener("visibilitychange",V),W(),e.getExtension("WEBGL_lose_context")?.loseContext()}},[u]),Y.jsx("canvas",{ref:r,"aria-hidden":"true",className:"pointer-events-none fixed inset-0 -z-[1] h-full w-full"})}export{re as default};
