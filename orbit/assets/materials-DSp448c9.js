import{S as x,V as C,c as l,A as M,e as g,M as T,f as h,d as p}from"./three-DbB-ci8-.js";const P=`
vec3 hash3(vec3 p){ p = vec3(dot(p,vec3(127.1,311.7,74.7)), dot(p,vec3(269.5,183.3,246.1)), dot(p,vec3(113.5,271.9,124.6))); return -1.0 + 2.0*fract(sin(p)*43758.5453123); }
float noise(vec3 p){
  vec3 i = floor(p); vec3 f = fract(p); vec3 u = f*f*(3.0-2.0*f);
  return mix(mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)), dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
                 mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)), dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
             mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)), dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
                 mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)), dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);
}
float fbm(vec3 p){ float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }
`;function L(e,i,t=0,a=null){return new x({uniforms:{uColor:{value:new l(e)},uLight:{value:i?1:0},uSeed:{value:t},uTime:{value:0},uTex:{value:a},uHasTex:{value:a?1:0},uLightPos:{value:new C(0,0,0)}},vertexShader:`
      varying vec3 vN; varying vec3 vP; varying vec3 vW; varying vec2 vUv;
      void main(){ vUv = uv; vP = position; vN = normalize(normalMatrix * normal); vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }
    `,fragmentShader:`
      uniform vec3 uColor; uniform float uLight; uniform float uSeed; uniform float uTime; uniform sampler2D uTex; uniform float uHasTex; uniform vec3 uLightPos;
      varying vec3 vN; varying vec3 vP; varying vec3 vW; varying vec2 vUv;
      ${P}
      void main(){
        float bands = fbm(vec3(vP.x*1.5, vP.y*6.0 + uSeed, vP.z*1.5) + uTime*0.02);
        vec3 base = uColor * (0.75 + bands*0.9);
        if (uHasTex > 0.5) { vec3 t = texture2D(uTex, vUv).rgb; float l = dot(t, vec3(0.299,0.587,0.114)); base = mix(base, uColor * (0.4 + l*1.4), 0.65); }
        vec3 n = normalize(vN);
        vec3 L = normalize((viewMatrix * vec4(uLightPos,1.0)).xyz - (viewMatrix*vec4(vW,1.0)).xyz);
        float diff = clamp(dot(n, L), 0.0, 1.0);
        float rim = pow(1.0 - abs(n.z), 2.5);
        vec3 col;
        if (uLight > 0.5) {
          col = mix(vec3(1.0), uColor, 0.35 + bands*0.25) * (0.85 + diff*0.15);
          col = mix(col, uColor, rim*0.5);
        } else {
          col = base * (0.18 + diff*1.05) + uColor * rim * 0.9;
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `})}function B(e,i=1){return new x({uniforms:{uColor:{value:new l(e)},uStrength:{value:i}},vertexShader:"varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:"uniform vec3 uColor; uniform float uStrength; varying vec3 vN; void main(){ float f = pow(0.72 - dot(vN, vec3(0.0,0.0,1.0)), 3.0); gl_FragColor = vec4(uColor, clamp(f*uStrength, 0.0, 1.0)); }",side:g,blending:M,transparent:!0,depthWrite:!1})}function W(e){return new T({color:new l(e),side:g})}function E(){const e=document.createElement("canvas");e.width=e.height=128;const i=e.getContext("2d"),t=i.createRadialGradient(64,64,0,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,255,255,0.45)"),t.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=t,i.fillRect(0,0,128,128);const a=new h(e);return a.colorSpace=p,a}function U(e,i){const t=document.createElement("canvas");t.width=t.height=256;const a=t.getContext("2d"),r=getComputedStyle(document.documentElement).getPropertyValue("--font-display")||"sans-serif";a.fillStyle=i,a.font=`800 170px ${r}`,a.textAlign="center",a.textBaseline="middle",a.fillText(e,128,138);const n=new h(t);return n.colorSpace=p,n}function z(e,i,t,a){const r=3*e,n=3*(t-e)-r,u=1-r-n,v=3*i,s=3*(a-i)-v,y=1-v-s,S=o=>((u*o+n)*o+r)*o,b=o=>((y*o+s)*o+v)*o,w=o=>(3*u*o+2*n)*o+r;return o=>{if(o<=0)return 0;if(o>=1)return 1;let c=o;for(let f=0;f<8;f++){const d=S(c)-o,m=w(c);if(Math.abs(d)<1e-5||Math.abs(m)<1e-6)break;c-=d/m}return b(Math.min(1,Math.max(0,c)))}}const V=z(.7,0,.2,1);export{B as a,V as e,E as g,U as m,W as o,L as p};
