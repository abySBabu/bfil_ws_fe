"use strict";(self.webpackChunkbfil_ws=self.webpackChunkbfil_ws||[]).push([[7234],{68745:(e,t,r)=>{r.d(t,{D:()=>G,b:()=>V});var i=r(72412),n=r(62026),o=r(34981),a=r(26917),s=r(59395),l=r(45937),c=r(59046),d=r(838),u=r(22148),h=r(97808),f=r(54478),m=r(55386),p=r(64436),v=r(53762),g=r(72937),_=r(20770),x=r(36943),T=r(43557),b=r(81993),y=r(27920),A=r(42953),E=r(26719),S=r(1773),w=r(55696),M=r(27969),C=r(90235),O=r(99774),I=r(96041),R=r(42451),N=r(5517),P=r(58350),L=r(21390),H=r(64839),D=r(32307),B=r(70367),F=r(10773),z=r(66470);function V(e){const t=new D.N5,{vertex:r,fragment:V,varyings:G}=t;if((0,R.NB)(r,e),t.include(d.I),G.add("vpos","vec3"),t.include(M.A,e),t.include(l.BK,e),t.include(p.G,e),t.include(w.q2,e),e.output===o.V.Color){t.include(w.Sx,e),t.include(w.MU,e),t.include(w.O1,e),t.include(w.QM,e),(0,R.yu)(r,e),t.include(c.Y,e),t.include(s.d,e);const o=e.normalType===c.W.Attribute||e.normalType===c.W.Compressed;o&&e.offsetBackfaces&&t.include(n.M),t.include(g.W,e),t.include(m.Mh,e),e.instancedColor&&t.attributes.add(z.r.INSTANCECOLOR,"vec4"),G.add("vPositionLocal","vec3"),t.include(h.U,e),t.include(i.oD,e),t.include(u.K,e),t.include(f.c,e),r.uniforms.add(new P.E("externalColor",(e=>e.externalColor))),G.add("vcolorExt","vec4"),e.multipassEnabled&&G.add("depth","float"),r.code.add(H.H`
      void main(void) {
        forwardNormalizedVertexColor();
        vcolorExt = externalColor;
        ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
        vcolorExt *= vvColor();
        vcolorExt *= getSymbolColor();
        forwardColorMixMode();

        if (vcolorExt.a < ${H.H.float(C.y)}) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        } else {
          vpos = getVertexInLocalOriginSpace();
          vPositionLocal = vpos - view[3].xyz;
          vpos = subtractOrigin(vpos);
          ${o?H.H`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`:""}
          vpos = addVerticalOffset(vpos, localOrigin);
          ${e.hasVertexTangents?"vTangent = dpTransformVertexTangent(tangent);":""}
          gl_Position = transformPosition(proj, view, vpos);
          ${o&&e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
        }

        ${e.multipassEnabled?"depth = (view * vec4(vpos, 1.0)).z;":""}
        forwardLinearDepth();
        forwardTextureCoordinates();
        forwardColorUV();
        forwardNormalUV();
        forwardEmissiveUV();
        forwardOcclusionUV();
        forwardMetallicRoughnessUV();
      }
    `),t.include(a.HQ,e),t.include(x.kA,e),t.include(_.n,e),t.include(O.S,e),t.include(e.instancedDoublePrecision?S.G:S.Bz,e),t.include(b.Q,e),(0,R.yu)(V,e),V.uniforms.add(r.uniforms.get("localOrigin"),new N.t("ambient",(e=>e.ambient)),new N.t("diffuse",(e=>e.diffuse)),new L.m("opacity",(e=>e.opacity)),new L.m("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&V.uniforms.add(new B.N("tex",(e=>e.texture))),t.include(E._Z,e),t.include(A.c,e),V.include(I.N),t.include(y.r,e),(0,x.a8)(V),(0,x.eU)(V),(0,T.O4)(V),e.transparencyPassType===F.y.ColorAlpha&&(t.outputs.add("fragColor","vec4",0),t.outputs.add("fragAlpha","float",1)),V.code.add(H.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?"terrainDepthTest(depth);":""}
        ${e.hasColorTexture?H.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?H.H`colorUV`:H.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:H.H`vec4 texColor = vec4(1.0);`}
        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        ${e.normalType===c.W.ScreenDerivative?H.H`
                vec3 normal = screenDerivativeNormal(vPositionLocal);`:H.H`
                shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
        ${e.pbrMode===E.A9.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

        vec3 posWorld = vpos + localOrigin;

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        float shadow = ${e.receiveShadows?"readShadowMap(vpos, linearDepth)":e.spherical?"lightingGlobalFactor * (1.0 - additionalAmbientScale)":"0.0"};

        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?H.H`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:H.H`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.hasNormalTexture?H.H`
                mat3 tangentSpace = ${e.hasVertexTangents?"computeTangentSpace(normal);":"computeTangentSpace(normal, vpos, vuv0);"}
                vec3 shadingNormal = computeTextureNormal(tangentSpace, ${e.hasNormalTextureTransform?H.H`normalUV`:"vuv0"});`:H.H`vec3 shadingNormal = normal;`}
        vec3 normalGround = ${e.spherical?H.H`normalize(posWorld);`:H.H`vec3(0.0, 0.0, 1.0);`}

        ${e.snowCover?H.H`
                float snow = smoothstep(0.5, 0.55, dot(normal, normalGround));
                albedo = mix(albedo, vec3(1), snow);
                shadingNormal = mix(shadingNormal, normal, snow);
                ssao = mix(ssao, 1.0, snow);`:""}

        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

        ${e.pbrMode===E.A9.Normal||e.pbrMode===E.A9.Schematic?H.H`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?H.H`
                        mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
                        emission = mix(emission, vec3(0.0), snow);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:H.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===F.y.ColorAlpha?H.H`
                  fragColor = premultiplyAlpha(fragColor);
                  fragAlpha = fragColor.a;`:""}
      }
    `)}return t.include(v.E,e),t}const G=Object.freeze(Object.defineProperty({__proto__:null,build:V},Symbol.toStringTag,{value:"Module"}))},35249:(e,t,r)=>{r.d(t,{R:()=>B,b:()=>D});var i=r(72412),n=r(62026),o=r(34981),a=r(26917),s=r(59395),l=r(45937),c=r(59046),d=r(838),u=r(22148),h=r(97808),f=r(54478),m=r(64436),p=r(53762),v=r(20770),g=r(36943),_=r(43557),x=r(81993),T=r(42953),b=r(26719),y=r(1773),A=r(27969),E=r(90235),S=r(99774),w=r(96041),M=r(42451),C=r(5517),O=r(58350),I=r(21390),R=r(64839),N=r(32307),P=r(70367),L=r(10773),H=r(66470);function D(e){const t=new N.N5,{vertex:r,fragment:D,varyings:B}=t;return(0,M.NB)(r,e),t.include(d.I),B.add("vpos","vec3"),t.include(A.A,e),t.include(l.BK,e),t.include(m.G,e),e.output===o.V.Color&&((0,M.yu)(t.vertex,e),t.include(c.Y,e),t.include(s.d,e),e.offsetBackfaces&&t.include(n.M),e.instancedColor&&t.attributes.add(H.r.INSTANCECOLOR,"vec4"),B.add("vNormalWorld","vec3"),B.add("localvpos","vec3"),e.multipassEnabled&&B.add("depth","float"),t.include(h.U,e),t.include(i.oD,e),t.include(u.K,e),t.include(f.c,e),r.uniforms.add(new O.E("externalColor",(e=>e.externalColor))),B.add("vcolorExt","vec4"),r.code.add(R.H`
        void main(void) {
          forwardNormalizedVertexColor();
          vcolorExt = externalColor;
          ${e.instancedColor?"vcolorExt *= instanceColor * 0.003921568627451;":""}
          vcolorExt *= vvColor();
          vcolorExt *= getSymbolColor();
          forwardColorMixMode();

          if (vcolorExt.a < ${R.H.float(E.y)}) {
            gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          } else {
            vpos = getVertexInLocalOriginSpace();
            localvpos = vpos - view[3].xyz;
            vpos = subtractOrigin(vpos);
            vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            ${e.offsetBackfaces?"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);":""}
          }
          ${e.multipassEnabled?R.H`depth = (view * vec4(vpos, 1.0)).z;`:""}
          forwardLinearDepth();
          forwardTextureCoordinates();
        }
      `)),e.output===o.V.Color&&(t.include(a.HQ,e),t.include(g.kA,e),t.include(v.n,e),t.include(S.S,e),t.include(e.instancedDoublePrecision?y.G:y.Bz,e),t.include(x.Q,e),(0,M.yu)(t.fragment,e),(0,_.Gc)(D),(0,g.a8)(D),(0,g.eU)(D),D.uniforms.add(r.uniforms.get("localOrigin"),r.uniforms.get("view"),new C.t("ambient",(e=>e.ambient)),new C.t("diffuse",(e=>e.diffuse)),new I.m("opacity",(e=>e.opacity)),new I.m("layerOpacity",(e=>e.layerOpacity))),e.hasColorTexture&&D.uniforms.add(new P.N("tex",(e=>e.texture))),t.include(b._Z,e),t.include(T.c,e),D.include(w.N),e.transparencyPassType===L.y.ColorAlpha&&(t.outputs.add("fragColor","vec4",0),t.outputs.add("fragAlpha","float",1)),(0,_.O4)(D),D.code.add(R.H`
      void main() {
        discardBySlice(vpos);
        ${e.multipassEnabled?R.H`terrainDepthTest(depth);`:""}
        ${e.hasColorTexture?R.H`
                vec4 texColor = texture(tex, ${e.hasColorTextureTransform?R.H`colorUV`:R.H`vuv0`});
                ${e.textureAlphaPremultiplied?"texColor.rgb /= texColor.a;":""}
                discardOrAdjustAlpha(texColor);`:R.H`vec4 texColor = vec4(1.0);`}
        vec3 viewDirection = normalize(vpos - cameraPosition);
        ${e.pbrMode===b.A9.Normal?"applyPBRFactors();":""}
        float ssao = evaluateAmbientOcclusionInverse();
        ssao *= getBakedOcclusion();

        float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        ${e.receiveShadows?"float shadow = readShadowMap(vpos, linearDepth);":e.spherical?"float shadow = lightingGlobalFactor * (1.0 - additionalAmbientScale);":"float shadow = 0.0;"}
        vec3 matColor = max(ambient, diffuse);
        ${e.hasVertexColors?R.H`
                vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, int(colorMixMode));`:R.H`
                vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, int(colorMixMode));
                float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, int(colorMixMode));`}
        ${e.snowCover?R.H`albedo = mix(albedo, vec3(1), 0.9);`:R.H``}
        ${R.H`
            vec3 shadingNormal = normalize(vNormalWorld);
            albedo *= 1.2;
            vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
            float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
            float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
            float treeRadialFalloff = vColor.r;
            float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
            additionalLight += backLightFactor * mainLightIntensity;`}
        ${e.pbrMode===b.A9.Normal||e.pbrMode===b.A9.Schematic?e.spherical?R.H`vec3 normalGround = normalize(vpos + localOrigin);`:R.H`vec3 normalGround = vec3(0.0, 0.0, 1.0);`:R.H``}
        ${e.pbrMode===b.A9.Normal||e.pbrMode===b.A9.Schematic?R.H`
                float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
                ${e.snowCover?R.H`
                        mrr = vec3(0.0, 1.0, 0.04);
                        emission = vec3(0.0);`:""}

                vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, normalGround, mrr, emission, additionalAmbientIrradiance);`:R.H`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        fragColor = highlightSlice(vec4(shadedColor, opacity_), vpos);
        ${e.transparencyPassType===L.y.ColorAlpha?R.H`
                fragColor = premultiplyAlpha(fragColor);
                fragAlpha = fragColor.a;`:""}
      }
    `)),t.include(p.E,e),t}const B=Object.freeze(Object.defineProperty({__proto__:null,build:D},Symbol.toStringTag,{value:"Module"}))},51331:(e,t,r)=>{r.d(t,{S:()=>g,b:()=>m,g:()=>p});var i=r(19555),n=r(72745),o=r(73398),a=r(65058),s=r(27963),l=r(95756),c=r(21390),d=r(64839),u=r(32307),h=r(70367);const f=16;function m(){const e=new u.N5,t=e.fragment;return e.include(o.c),e.include(s.Ir),t.include(a.E),t.uniforms.add(new c.m("radius",((e,t)=>p(t.camera)))).code.add(d.H`vec3 sphere[16] = vec3[16](
vec3(0.186937, 0.0, 0.0),
vec3(0.700542, 0.0, 0.0),
vec3(-0.864858, -0.481795, -0.111713),
vec3(-0.624773, 0.102853, -0.730153),
vec3(-0.387172, 0.260319, 0.007229),
vec3(-0.222367, -0.642631, -0.707697),
vec3(-0.01336, -0.014956, 0.169662),
vec3(0.122575, 0.1544, -0.456944),
vec3(-0.177141, 0.85997, -0.42346),
vec3(-0.131631, 0.814545, 0.524355),
vec3(-0.779469, 0.007991, 0.624833),
vec3(0.308092, 0.209288,0.35969),
vec3(0.359331, -0.184533, -0.377458),
vec3(0.192633, -0.482999, -0.065284),
vec3(0.233538, 0.293706, -0.055139),
vec3(0.417709, -0.386701, 0.442449)
);
float fallOffFunction(float vv, float vn, float bias) {
float f = max(radius * radius - vv, 0.0);
return f * f * f * max(vn - bias, 0.0);
}`),t.code.add(d.H`float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {
vec3 v = Q - C;
float vv = dot(v, v);
float vn = dot(normalize(v), n_C);
return fallOffFunction(vv, vn, 0.1);
}`),t.uniforms.add(new h.N("normalMap",(e=>e.normalTexture)),new h.N("depthMap",(e=>e.depthTexture)),new c.m("projScale",(e=>e.projScale)),new h.N("rnm",(e=>e.noiseTexture)),new l.G("rnmScale",((e,t)=>(0,i.hZ)(v,t.camera.fullWidth/e.noiseTexture.descriptor.width,t.camera.fullHeight/e.noiseTexture.descriptor.height))),new c.m("intensity",(e=>e.intensity)),new l.G("screenSize",((e,t)=>(0,i.hZ)(v,t.camera.fullWidth,t.camera.fullHeight)))),e.outputs.add("fragOcclusion","float"),t.code.add(d.H`
    void main(void) {
      float depth = depthFromTexture(depthMap, uv);

      // Early out if depth is out of range, such as in the sky
      if (depth >= 1.0 || depth <= 0.0) {
        fragOcclusion = 1.0;
        return;
      }

      // get the normal of current fragment
      vec4 norm4 = texture(normalMap, uv);
      if(norm4.a != 1.0) {
        fragOcclusion = 1.0;
        return;
      }
      vec3 norm = vec3(-1.0) + 2.0 * norm4.xyz;

      float currentPixelDepth = linearizeDepth(depth);
      vec3 currentPixelPos = reconstructPosition(gl_FragCoord.xy, currentPixelDepth);

      float sum = 0.0;
      vec3 tapPixelPos;

      vec3 fres = normalize(2.0 * texture(rnm, uv * rnmScale).xyz - 1.0);

      // note: the factor 2.0 should not be necessary, but makes ssao much nicer.
      // bug or deviation from CE somewhere else?
      float ps = projScale / (2.0 * currentPixelPos.z * zScale.x + zScale.y);

      for(int i = 0; i < ${d.H.int(f)}; ++i) {
        vec2 unitOffset = reflect(sphere[i], fres).xy;
        vec2 offset = vec2(-unitOffset * radius * ps);

        // don't use current or very nearby samples
        if( abs(offset.x) < 2.0 || abs(offset.y) < 2.0){
          continue;
        }

        vec2 tc = vec2(gl_FragCoord.xy + offset);
        if (tc.x < 0.0 || tc.y < 0.0 || tc.x > screenSize.x || tc.y > screenSize.y) continue;
        vec2 tcTap = tc / screenSize;
        float occluderFragmentDepth = linearDepthFromTexture(depthMap, tcTap);

        tapPixelPos = reconstructPosition(tc, occluderFragmentDepth);

        sum += aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);
      }

      // output the result
      float A = max(1.0 - sum * intensity / float(${d.H.int(f)}), 0.0);

      // Anti-tone map to reduce contrast and drag dark region farther: (x^0.2 + 1.2 * x^4) / 2.2
      A = (pow(A, 0.2) + 1.2 * A*A*A*A) / 2.2;

      fragOcclusion = A;
    }
  `),e}function p(e){return Math.max(10,20*e.computeScreenPixelSizeAtDist(Math.abs(4*e.relativeElevation)))}const v=(0,n.vt)(),g=Object.freeze(Object.defineProperty({__proto__:null,build:m,getRadius:p},Symbol.toStringTag,{value:"Module"}))},29228:(e,t,r)=>{r.d(t,{S:()=>m,b:()=>f});var i=r(20664),n=r(73398),o=r(65058),a=r(56289),s=r(21390),l=r(64839),c=r(32307),d=r(27374),u=r(70367);const h=4;function f(){const e=new c.N5,t=e.fragment;e.include(n.c);const r=(h+1)/2,f=1/(2*r*r);return t.include(o.E),t.uniforms.add(new u.N("depthMap",(e=>e.depthTexture)),new d.o("tex",(e=>e.colorTexture)),new a.t("blurSize",(e=>e.blurSize)),new s.m("projScale",((e,t)=>{const r=(0,i.p)(t.camera.eye,t.camera.center);return r>5e4?Math.max(0,e.projScale-(r-5e4)):e.projScale}))),t.code.add(l.H`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${l.H.float(f)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),e.outputs.add("fragBlur","float"),t.code.add(l.H`
    void main(void) {
      float b = 0.0;
      float w_total = 0.0;

      float center_d = linearDepthFromTexture(depthMap, uv);

      float sharpness = -0.05 * projScale / center_d;
      for (int r = -${l.H.int(h)}; r <= ${l.H.int(h)}; ++r) {
        float rf = float(r);
        vec2 uvOffset = uv + rf * blurSize;
        blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
      }

      fragBlur = b / w_total;
    }
  `),e}const m=Object.freeze(Object.defineProperty({__proto__:null,build:f},Symbol.toStringTag,{value:"Module"}))},45136:(e,t,r)=>{r.d(t,{a:()=>n,b:()=>c,c:()=>o,d:()=>i,e:()=>d,f:()=>s,n:()=>u,s:()=>l,t:()=>a});r(81806),r(76460);function i(e,t,r){n(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function n(e,t,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:i;if(e.length/i!==Math.ceil(t.length/n))return e;const o=e.length/i,a=r[0],s=r[1],l=r[2],c=r[4],d=r[5],u=r[6],h=r[8],f=r[9],m=r[10],p=r[12],v=r[13],g=r[14];let _=0,x=0;for(let T=0;T<o;T++){const r=t[_],o=t[_+1],T=t[_+2];e[x]=a*r+c*o+h*T+p,e[x+1]=s*r+d*o+f*T+v,e[x+2]=l*r+u*o+m*T+g,_+=n,x+=i}return e}function o(e,t,r){a(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function a(e,t,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:i;if(e.length/i!==Math.ceil(t.length/n))return;const o=e.length/i,a=r[0],s=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],f=r[7],m=r[8];let p=0,v=0;for(let g=0;g<o;g++){const r=t[p],o=t[p+1],g=t[p+2];e[v]=a*r+c*o+h*g,e[v+1]=s*r+d*o+f*g,e[v+2]=l*r+u*o+m*g,p+=n,v+=i}}function s(e,t,r){l(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function l(e,t,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:i;const o=Math.min(e.length/i,t.length/n);let a=0,s=0;for(let l=0;l<o;l++)e[s]=r*t[a],e[s+1]=r*t[a+1],e[s+2]=r*t[a+2],a+=n,s+=i;return e}function c(e,t,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:i;const o=e.length/i;if(o!==Math.ceil(t.length/n))return e;let a=0,s=0;for(let l=0;l<o;l++)e[s]=t[a]+r[0],e[s+1]=t[a+1]+r[1],e[s+2]=t[a+2]+r[2],a+=n,s+=i;return e}function d(e,t){u(e.typedBuffer,t.typedBuffer,e.typedBufferStride,t.typedBufferStride)}function u(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:r;const n=Math.min(e.length/r,t.length/i);let o=0,a=0;for(let s=0;s<n;s++){const n=t[o],s=t[o+1],l=t[o+2],c=n*n+s*s+l*l;if(c>0){const t=1/Math.sqrt(c);e[a]=t*n,e[a+1]=t*s,e[a+2]=t*l}o+=i,a+=r}}Object.freeze(Object.defineProperty({__proto__:null,normalize:u,normalizeView:d,scale:l,scaleView:s,shiftRight:function(e,t,r){const i=Math.min(e.count,t.count),n=e.typedBuffer,o=e.typedBufferStride,a=t.typedBuffer,s=t.typedBufferStride;let l=0,c=0;for(let d=0;d<i;d++)n[c]=a[l]>>r,n[c+1]=a[l+1]>>r,n[c+2]=a[l+2]>>r,l+=s,c+=o},transformMat3:a,transformMat3View:o,transformMat4:n,transformMat4View:i,translate:c},Symbol.toStringTag,{value:"Module"}))},10947:(e,t,r)=>{r.d(t,{a:()=>n,b:()=>s,n:()=>a,s:()=>l,t:()=>o});r(81806);var i=r(76460);function n(e,t,r){o(e.typedBuffer,t.typedBuffer,r,e.typedBufferStride,t.typedBufferStride)}function o(e,t,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:4,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:i;if(e.length/i!=t.length/n)return;const o=e.length/i,a=r[0],s=r[1],l=r[2],c=r[3],d=r[4],u=r[5],h=r[6],f=r[7],m=r[8];let p=0,v=0;for(let g=0;g<o;g++){const r=t[p],o=t[p+1],g=t[p+2],_=t[p+3];e[v]=a*r+c*o+h*g,e[v+1]=s*r+d*o+f*g,e[v+2]=l*r+u*o+m*g,e[v+3]=_,p+=n,v+=i}}function a(e,t){const r=Math.min(e.count,t.count),i=e.typedBuffer,n=e.typedBufferStride,o=t.typedBuffer,a=t.typedBufferStride;for(let s=0;s<r;s++){const e=s*n,t=s*a,r=o[t],l=o[t+1],c=o[t+2],d=r*r+l*l+c*c;if(d>0){const t=1/Math.sqrt(d);i[e]=t*r,i[e+1]=t*l,i[e+2]=t*c}}}function s(e,t,r){l(e.typedBuffer,t,r,e.typedBufferStride)}function l(e,t,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:4;const n=Math.min(e.length/i,t.count),o=t.typedBuffer,a=t.typedBufferStride;let s=0,l=0;for(let c=0;c<n;c++)e[l]=r*o[s],e[l+1]=r*o[s+1],e[l+2]=r*o[s+2],e[l+3]=r*o[s+3],s+=a,l+=i}Object.freeze(Object.defineProperty({__proto__:null,normalize:a,scale:l,scaleView:s,transformMat3:o,transformMat3View:n,transformMat4:function(e,t,r){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:4,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:n;if(e.length/n!=t.length/o)return void i.A.getLogger("esri.views.3d.support.buffer.math").error("source and destination buffers need to have the same number of elements");const a=e.length/n,s=r[0],l=r[1],c=r[2],d=r[3],u=r[4],h=r[5],f=r[6],m=r[7],p=r[8],v=r[9],g=r[10],_=r[11],x=r[12],T=r[13],b=r[14],y=r[15];let A=0,E=0;for(let i=0;i<a;i++){const r=t[A],i=t[A+1],a=t[A+2],S=t[A+3];e[E]=s*r+u*i+p*a+x*S,e[E+1]=l*r+h*i+v*a+T*S,e[E+2]=c*r+f*i+g*a+b*S,e[E+3]=d*r+m*i+_*a+y*S,A+=o,E+=n}},transformMat4View:function(e,t,r){if(e.count!==t.count)return;const i=e.count,n=r[0],o=r[1],a=r[2],s=r[3],l=r[4],c=r[5],d=r[6],u=r[7],h=r[8],f=r[9],m=r[10],p=r[11],v=r[12],g=r[13],_=r[14],x=r[15],T=e.typedBuffer,b=e.typedBufferStride,y=t.typedBuffer,A=t.typedBufferStride;for(let E=0;E<i;E++){const e=E*b,t=E*A,r=y[t],i=y[t+1],S=y[t+2],w=y[t+3];T[e]=n*r+l*i+h*S+v*w,T[e+1]=o*r+c*i+f*S+g*w,T[e+2]=a*r+d*i+m*S+_*w,T[e+3]=s*r+u*i+p*S+x*w}}},Symbol.toStringTag,{value:"Module"}))},75941:(e,t,r)=>{r.d(t,{O:()=>i});class i{constructor(){this._outer=new Map}clear(){this._outer.clear()}get empty(){return 0===this._outer.size}get(e,t){return this._outer.get(e)?.get(t)}set(e,t,r){const i=this._outer.get(e);i?i.set(t,r):this._outer.set(e,new Map([[t,r]]))}delete(e,t){const r=this._outer.get(e);r&&(r.delete(t),0===r.size&&this._outer.delete(e))}forEach(e){this._outer.forEach(((t,r)=>e(t,r)))}}},93795:(e,t,r)=>{function i(e){return e=e||globalThis.location.hostname,c.some((t=>null!=e?.match(t)))}function n(e,t){return e&&(t=t||globalThis.location.hostname)?null!=t.match(o)||null!=t.match(s)?e.replace("static.arcgis.com","staticdev.arcgis.com"):null!=t.match(a)||null!=t.match(l)?e.replace("static.arcgis.com","staticqa.arcgis.com"):e:e}r.d(t,{EM:()=>n,b5:()=>i});const o=/^devext\.arcgis\.com$/,a=/^qaext\.arcgis\.com$/,s=/^[\w-]*\.mapsdevext\.arcgis\.com$/,l=/^[\w-]*\.mapsqa\.arcgis\.com$/,c=[/^([\w-]*\.)?[\w-]*\.zrh-dev-local\.esri\.com$/,o,a,/^jsapps\.esri\.com$/,s,l]},75002:(e,t,r)=>{r.d(t,{oe:()=>n});var i=r(78393);function n(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e<=i.y9?t?new Array(e).fill(0):new Array(e):new Float32Array(e)}},38496:(e,t,r)=>{r.d(t,{Dg:()=>n,my:()=>o,tM:()=>c});var i=r(78393);function n(e){if((0,i.cy)(e)){if(e.length<i.y9)return e}else if(e.length<i.y9)return Array.from(e);let t=!0,r=!0;return e.some(((e,i)=>(t=t&&0===e,r=r&&e===i,!t&&!r))),t?function(e){if(1===e)return s;if(e<i.y9)return new Array(e).fill(0);if(e>d.length){const t=Math.max(2*d.length,e);d=new Uint8Array(t)}return new Uint8Array(d.buffer,0,e)}(e.length):r?c(e.length):(0,i.cy)(e)||e.BYTES_PER_ELEMENT!==Uint16Array.BYTES_PER_ELEMENT?function(e){let t=!0;for(const r of e){if(r>=65536)return(0,i.cy)(e)?new Uint32Array(e):e;r>=256&&(t=!1)}return t?new Uint8Array(e):new Uint16Array(e)}(e):e}function o(e){return e<=i.y9?new Array(e):e<=65536?new Uint16Array(e):new Uint32Array(e)}let a=(()=>{const e=new Uint32Array(131072);for(let t=0;t<e.length;++t)e[t]=t;return e})();const s=[0],l=(()=>{const e=new Uint16Array(65536);for(let t=0;t<e.length;++t)e[t]=t;return e})();function c(e){if(1===e)return s;if(e<i.y9)return Array.from(new Uint16Array(l.buffer,0,e));if(e<l.length)return new Uint16Array(l.buffer,0,e);if(e>a.length){const t=Math.max(2*a.length,e);a=new Uint32Array(t);for(let e=0;e<a.length;e++)a[e]=e}return new Uint32Array(a.buffer,0,e)}let d=new Uint8Array(65536)},44230:(e,t,r)=>{r.d(t,{Cr:()=>c,_I:()=>d,vt:()=>l});var i=r(15941),n=r(97467),o=r(20664),a=r(9392),s=r(75762);function l(e){return e?{origin:(0,a.o8)(e.origin),vector:(0,a.o8)(e.vector)}:{origin:(0,a.vt)(),vector:(0,a.vt)()}}function c(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:l();return(0,o.c)(r.origin,e),(0,o.f)(r.vector,t,e),r}function d(e,t,r){return function(e,t,r,n,a){const{vector:l,origin:c}=e,d=(0,o.f)(s.rq.get(),t,c),u=(0,o.m)(l,d)/(0,o.q)(l);return(0,o.j)(a,l,(0,i.qE)(u,r,n)),(0,o.g)(a,a,e.origin)}(e,t,0,1,r)}(0,a.vt)(),(0,a.vt)(),new n.I((()=>l()))},49003:(e,t,r)=>{r.d(t,{D:()=>n});var i=r(3825);async function n(e,t){const{data:r}=await(0,i.A)(e,{responseType:"image",...t});return r}},87234:(e,t,r)=>{r.d(t,{fetch:()=>Vr});var i=r(93795),n=r(15941),o=r(63919),a=r(44680),s=r(34761),l=r(13191),c=r(72745),d=r(20664),u=r(9392),h=r(42294),f=r(75002),m=r(88105),p=r(45136),v=r(10947),g=r(52007),_=r(64591),x=r(2e3),T=r(11109),b=r(56516),y=r(420),A=r(37040),E=r(59422);function S(e){if(null==e)return null;const t=null!=e.offset?e.offset:E.uY,r=null!=e.rotation?e.rotation:0,i=null!=e.scale?e.scale:E.Un,n=(0,a.fA)(1,0,0,0,1,0,t[0],t[1],1),s=(0,a.fA)(Math.cos(r),-Math.sin(r),0,Math.sin(r),Math.cos(r),0,0,0,1),l=(0,a.fA)(i[0],0,0,0,i[1],0,0,0,1),c=(0,a.vt)();return(0,o.lw)(c,s,l),(0,o.lw)(c,n,c),c}class w{constructor(){this.geometries=new Array,this.materials=new Array,this.textures=new Array}}class M{constructor(e,t,r){this.name=e,this.lodThreshold=t,this.pivotOffset=r,this.stageResources=new w,this.numberOfVertices=0}}var C=r(3825),O=r(98773),I=r(21499),R=r(50076),N=r(76460),P=r(75941),L=r(50346),H=r(19898),D=r(38496),B=r(49003),F=r(50468),z=r(83490),V=r(78393);function G(e){if(e.length<V.y9)return Array.from(e);if((0,V.cy)(e))return Float64Array.from(e);if(!("BYTES_PER_ELEMENT"in e))return Array.from(e);switch(e.BYTES_PER_ELEMENT){case 1:return Uint8Array.from(e);case 2:return(0,V.jq)(e)?Uint16Array.from(e):Int16Array.from(e);case 4:return Float32Array.from(e);default:return Float64Array.from(e)}}var W=r(30015),U=r(86994);class j{constructor(e,t,r){this.primitiveIndices=e,this._numIndexPerPrimitive=t,this.position=r,this._children=void 0,(0,U.vA)(e.length>=1),(0,U.vA)(3===r.size||4===r.size);const{data:i,size:n,indices:o}=r;(0,U.vA)(o.length%this._numIndexPerPrimitive==0),(0,U.vA)(o.length>=e.length*this._numIndexPerPrimitive);const a=e.length;let s=n*o[this._numIndexPerPrimitive*e[0]];q.clear(),q.push(s);const l=(0,u.fA)(i[s],i[s+1],i[s+2]),c=(0,u.o8)(l);for(let d=0;d<a;++d){const t=this._numIndexPerPrimitive*e[d];for(let e=0;e<this._numIndexPerPrimitive;++e){s=n*o[t+e],q.push(s);let r=i[s];l[0]=Math.min(r,l[0]),c[0]=Math.max(r,c[0]),r=i[s+1],l[1]=Math.min(r,l[1]),c[1]=Math.max(r,c[1]),r=i[s+2],l[2]=Math.min(r,l[2]),c[2]=Math.max(r,c[2])}}this.bbMin=l,this.bbMax=c;const h=(0,d.o)((0,u.vt)(),this.bbMin,this.bbMax,.5);this.radius=.5*Math.max(Math.max(c[0]-l[0],c[1]-l[1]),c[2]-l[2]);let f=this.radius*this.radius;for(let d=0;d<q.length;++d){s=q.at(d);const e=i[s]-h[0],t=i[s+1]-h[1],r=i[s+2]-h[2],n=e*e+t*t+r*r;if(n<=f)continue;const o=Math.sqrt(n),a=.5*(o-this.radius);this.radius=this.radius+a,f=this.radius*this.radius;const l=a/o;h[0]+=e*l,h[1]+=t*l,h[2]+=r*l}this.center=h,q.clear()}getChildren(){if(this._children||(0,d.a)(this.bbMin,this.bbMax)<=1)return this._children;const e=(0,d.o)((0,u.vt)(),this.bbMin,this.bbMax,.5),t=this.primitiveIndices.length,r=new Uint8Array(t),i=new Array(8);for(let c=0;c<8;++c)i[c]=0;const{data:n,size:o,indices:a}=this.position;for(let c=0;c<t;++c){let t=0;const s=this._numIndexPerPrimitive*this.primitiveIndices[c];let l=o*a[s],d=n[l],u=n[l+1],h=n[l+2];for(let e=1;e<this._numIndexPerPrimitive;++e){l=o*a[s+e];const t=n[l],r=n[l+1],i=n[l+2];t<d&&(d=t),r<u&&(u=r),i<h&&(h=i)}d<e[0]&&(t|=1),u<e[1]&&(t|=2),h<e[2]&&(t|=4),r[c]=t,++i[t]}let s=0;for(let c=0;c<8;++c)i[c]>0&&++s;if(s<2)return;const l=new Array(8);for(let c=0;c<8;++c)l[c]=i[c]>0?new Uint32Array(i[c]):void 0;for(let c=0;c<8;++c)i[c]=0;for(let c=0;c<t;++c){const e=r[c];l[e][i[e]++]=this.primitiveIndices[c]}this._children=new Array;for(let c=0;c<8;++c)void 0!==l[c]&&this._children.push(new j(l[c],this._numIndexPerPrimitive,this.position));return this._children}static prune(){q.prune()}}const q=new W.A({deallocator:null});var k=r(73146),$=r(87634),Y=r(97467),X=r(44230);r(75762);function Z(e){return e?{p0:(0,u.o8)(e.p0),p1:(0,u.o8)(e.p1),p2:(0,u.o8)(e.p2)}:{p0:(0,u.vt)(),p1:(0,u.vt)(),p2:(0,u.vt)()}}function J(e,t,r){return(0,d.f)(K,t,e),(0,d.f)(Q,r,e),.5*(0,d.l)((0,d.b)(K,K,Q))}new Y.I(X.vt),new Y.I((()=>Z()));const K=(0,u.vt)(),Q=(0,u.vt)();const ee=(0,u.vt)(),te=(0,u.vt)(),re=(0,u.vt)(),ie=(0,u.vt)();var ne=r(90632);class oe{constructor(e){this.channel=e,this.id=(0,ne.c)()}}var ae=r(66470);r(99643);(0,u.vt)(),new Float32Array(6);class se extends k.J{constructor(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:$.X.Mesh,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:-1;super(),this.material=e,this.mapPositions=r,this.type=i,this.objectAndLayerIdColor=n,this.edgeIndicesLength=o,this.visible=!0,this._attributes=new Map,this._boundingInfo=null;for(const[a,s]of t)this._attributes.set(a,{...s,indices:(0,D.Dg)(s.indices)}),a===ae.r.POSITION&&(this.edgeIndicesLength=this.edgeIndicesLength<0?this._attributes.get(a).indices.length:this.edgeIndicesLength)}instantiate(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=new se(e.material||this.material,[],this.mapPositions,this.type,this.objectAndLayerIdColor,this.edgeIndicesLength);return this._attributes.forEach(((e,r)=>{e.exclusive=!1,t._attributes.set(r,e)})),t._boundingInfo=this._boundingInfo,t.transformation=e.transformation||this.transformation,t}get attributes(){return this._attributes}getMutableAttribute(e){let t=this._attributes.get(e);return t&&!t.exclusive&&(t={...t,exclusive:!0,data:G(t.data)},this._attributes.set(e,t)),t}setAttributeData(e,t){const r=this._attributes.get(e);r&&this._attributes.set(e,{...r,exclusive:!0,data:t})}get indexCount(){const e=this._attributes.values().next().value.indices;return e?.length??0}get faceCount(){return this.indexCount/3}get boundingInfo(){return null==this._boundingInfo&&(this._boundingInfo=this._calculateBoundingInfo()),this._boundingInfo}computeAttachmentOrigin(e){return!!(this.type===$.X.Mesh?this._computeAttachmentOriginTriangles(e):this.type===$.X.Line?this._computeAttachmentOriginLines(e):this._computeAttachmentOriginPoints(e))&&(null!=this._transformation&&(0,d.h)(e,e,this._transformation),!0)}_computeAttachmentOriginTriangles(e){return function(e,t){if(!e)return!1;const{size:r,data:i,indices:n}=e;(0,d.s)(t,0,0,0),(0,d.s)(ie,0,0,0);let o=0,a=0;for(let s=0;s<n.length-2;s+=3){const e=n[s]*r,l=n[s+1]*r,c=n[s+2]*r;(0,d.s)(ee,i[e],i[e+1],i[e+2]),(0,d.s)(te,i[l],i[l+1],i[l+2]),(0,d.s)(re,i[c],i[c+1],i[c+2]);const u=J(ee,te,re);u?((0,d.g)(ee,ee,te),(0,d.g)(ee,ee,re),(0,d.j)(ee,ee,1/3*u),(0,d.g)(t,t,ee),o+=u):((0,d.g)(ie,ie,ee),(0,d.g)(ie,ie,te),(0,d.g)(ie,ie,re),a+=3)}return(0!==a||0!==o)&&(0!==o?((0,d.j)(t,t,1/o),!0):0!==a&&((0,d.j)(t,ie,1/a),!0))}(this.attributes.get(ae.r.POSITION),e)}_computeAttachmentOriginLines(e){const t=this.attributes.get(ae.r.POSITION);return function(e,t,r){if(!e)return!1;(0,d.s)(r,0,0,0),(0,d.s)(ie,0,0,0);let i=0,n=0;const{size:o,data:a,indices:s}=e,l=s.length-1,c=l+(t?2:0);for(let u=0;u<c;u+=2){const e=u<l?u+1:0,t=s[u<l?u:l]*o,c=s[e]*o;ee[0]=a[t],ee[1]=a[t+1],ee[2]=a[t+2],te[0]=a[c],te[1]=a[c+1],te[2]=a[c+2],(0,d.j)(ee,(0,d.g)(ee,ee,te),.5);const h=(0,d.F)(ee,te);h>0?((0,d.g)(r,r,(0,d.j)(ee,ee,h)),i+=h):0===i&&((0,d.g)(ie,ie,ee),n++)}return 0!==i?((0,d.j)(r,r,1/i),!0):0!==n&&((0,d.j)(r,ie,1/n),!0)}(t,function(e,t){return!(!("isClosed"in e)||!e.isClosed)&&t.indices.length>2}(this.material.parameters,t),e)}_computeAttachmentOriginPoints(e){return function(e,t){if(!e)return!1;const{size:r,data:i,indices:n}=e;(0,d.s)(t,0,0,0);let o=-1,a=0;for(let s=0;s<n.length;s++){const e=n[s]*r;o!==e&&(t[0]+=i[e],t[1]+=i[e+1],t[2]+=i[e+2],a++),o=e}return a>1&&(0,d.j)(t,t,1/a),a>0}(this.attributes.get(ae.r.POSITION),e)}invalidateBoundingInfo(){this._boundingInfo=null}_calculateBoundingInfo(){const e=this.attributes.get(ae.r.POSITION);if(!e||0===e.indices.length)return null;const t=this.type===$.X.Mesh?3:1;(0,U.vA)(e.indices.length%t==0,"Indexing error: "+e.indices.length+" not divisible by "+t);const r=(0,D.tM)(e.indices.length/t);return new j(r,t,e)}get transformation(){return this._transformation??l.zK}set transformation(e){this._transformation=e&&e!==l.zK?(0,l.o8)(e):null}addHighlight(){const e=new oe(z.Mg.Highlight);return this.highlights=function(e,t){return null==e&&(e=[]),e.push(t),e}(this.highlights,e),e}removeHighlight(e){this.highlights=function(e,t){if(null==e)return null;const r=e.filter((e=>e!==t));return 0===r.length?null:r}(this.highlights,e)}}var le=r(81806),ce=r(54099),de=r(30726),ue=r(90534),he=r(76312),fe=r(28899);let me;var pe;!function(e){e[e.ETC1_RGB=0]="ETC1_RGB",e[e.ETC2_RGBA=1]="ETC2_RGBA",e[e.BC1_RGB=2]="BC1_RGB",e[e.BC3_RGBA=3]="BC3_RGBA",e[e.BC4_R=4]="BC4_R",e[e.BC5_RG=5]="BC5_RG",e[e.BC7_M6_RGB=6]="BC7_M6_RGB",e[e.BC7_M5_RGBA=7]="BC7_M5_RGBA",e[e.PVRTC1_4_RGB=8]="PVRTC1_4_RGB",e[e.PVRTC1_4_RGBA=9]="PVRTC1_4_RGBA",e[e.ASTC_4x4_RGBA=10]="ASTC_4x4_RGBA",e[e.ATC_RGB=11]="ATC_RGB",e[e.ATC_RGBA=12]="ATC_RGBA",e[e.FXT1_RGB=17]="FXT1_RGB",e[e.PVRTC2_4_RGB=18]="PVRTC2_4_RGB",e[e.PVRTC2_4_RGBA=19]="PVRTC2_4_RGBA",e[e.ETC2_EAC_R11=20]="ETC2_EAC_R11",e[e.ETC2_EAC_RG11=21]="ETC2_EAC_RG11",e[e.RGBA32=13]="RGBA32",e[e.RGB565=14]="RGB565",e[e.BGR565=15]="BGR565",e[e.RGBA4444=16]="RGBA4444"}(pe||(pe={}));var ve=r(93345),ge=r(98433),_e=r(27207);let xe=null,Te=null;async function be(){return null==Te&&(me??=(async()=>{const e=await r.e(4027).then(r.bind(r,84027)),t=await e.default({locateFile:e=>(0,fe.s)(`esri/libs/basisu/${e}`)});return t.initializeBasis(),t})(),Te=me,xe=await Te),Te}function ye(e,t,r,i,n){const o=(0,_e.IB)(t?ve.CQ.COMPRESSED_RGBA8_ETC2_EAC:ve.CQ.COMPRESSED_RGB8_ETC2),a=n&&e>1?(4**e-1)/(3*4**(e-1)):1;return Math.ceil(r*i*o*a)}function Ae(e){return e.getNumImages()>=1&&!e.isUASTC()}function Ee(e){return e.getFaces()>=1&&e.isETC1S()}function Se(e,t,r,i,n,o,a,s){const{compressedTextureETC:l,compressedTextureS3TC:c}=e.capabilities,[d,u]=l?i?[pe.ETC2_RGBA,ve.CQ.COMPRESSED_RGBA8_ETC2_EAC]:[pe.ETC1_RGB,ve.CQ.COMPRESSED_RGB8_ETC2]:c?i?[pe.BC3_RGBA,ve.CQ.COMPRESSED_RGBA_S3TC_DXT5_EXT]:[pe.BC1_RGB,ve.CQ.COMPRESSED_RGB_S3TC_DXT1_EXT]:[pe.RGBA32,ve.Ab.RGBA],h=t.hasMipmap?r:Math.min(1,r),f=[];for(let m=0;m<h;m++)f.push(new Uint8Array(a(m,d))),s(m,d,f[m]);return t.internalFormat=u,t.hasMipmap=f.length>1,t.samplingMode=t.hasMipmap?ve.Cj.LINEAR_MIPMAP_LINEAR:ve.Cj.LINEAR,t.width=n,t.height=o,new ge.g(e,t,{type:"compressed",levels:f})}const we=()=>N.A.getLogger("esri.views.3d.webgl-engine.lib.DDSUtil"),Me=542327876,Ce=131072,Oe=4;function Ie(e){return e.charCodeAt(0)+(e.charCodeAt(1)<<8)+(e.charCodeAt(2)<<16)+(e.charCodeAt(3)<<24)}const Re=Ie("DXT1"),Ne=Ie("DXT3"),Pe=Ie("DXT5"),Le=31,He=0,De=1,Be=2,Fe=3,ze=4,Ve=7,Ge=20,We=21;function Ue(e,t,r){const i=function(e,t){const r=new Int32Array(e,0,Le);if(r[He]!==Me)return we().error("Invalid magic number in DDS header"),null;if(!(r[Ge]&Oe))return we().error("Unsupported format, must contain a FourCC code"),null;const i=r[We];let n,o;switch(i){case Re:n=8,o=ve.CQ.COMPRESSED_RGB_S3TC_DXT1_EXT;break;case Ne:n=16,o=ve.CQ.COMPRESSED_RGBA_S3TC_DXT3_EXT;break;case Pe:n=16,o=ve.CQ.COMPRESSED_RGBA_S3TC_DXT5_EXT;break;default:return we().error("Unsupported FourCC code:",function(e){return String.fromCharCode(255&e,e>>8&255,e>>16&255,e>>24&255)}(i)),null}let a=1,s=r[ze],l=r[Fe];(3&s||3&l)&&(we().warn("Rounding up compressed texture size to nearest multiple of 4."),s=s+3&-4,l=l+3&-4);const c=s,d=l;let u,h;r[Be]&Ce&&!1!==t&&(a=Math.max(1,r[Ve]));let f=r[De]+4;const m=[];for(let p=0;p<a;++p)h=(s+3>>2)*(l+3>>2)*n,u=new Uint8Array(e,f,h),m.push(u),f+=h,s=Math.max(1,s>>1),l=Math.max(1,l>>1);return{textureData:{type:"compressed",levels:m},internalFormat:o,width:c,height:d}}(r,t.hasMipmap??!1);if(null==i)throw new Error("DDS texture data is null");const{textureData:n,internalFormat:o,width:a,height:s}=i;return t.samplingMode=n.levels.length>1?ve.Cj.LINEAR_MIPMAP_LINEAR:ve.Cj.LINEAR,t.hasMipmap=n.levels.length>1,t.internalFormat=o,t.width=a,t.height=s,new ge.g(e,t,n)}function je(e,t,r){if(e instanceof ImageData)return je(qe(e),t,r);const i=document.createElement("canvas");return i.width=t,i.height=r,i.getContext("2d").drawImage(e,0,0,i.width,i.height),i}function qe(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");if(null==r)throw new R.A("Failed to create 2d context from HTMLCanvasElement");return r.putImageData(e,0,0),t}var ke,$e=r(96673);class Ye extends k.J{get parameters(){return this._parameters}constructor(e,t){super(),this._data=e,this.type=$.X.Texture,this._glTexture=null,this._loadingPromise=null,this._loadingController=null,this.events=new ce.A,this._parameters={...Ze,...t},this._startPreload(e)}dispose(){this.unload(),this._data=this.frameUpdate=void 0}_startPreload(e){null!=e&&(e instanceof HTMLVideoElement?(this.frameUpdate=t=>this._frameUpdate(e,t),this._startPreloadVideoElement(e)):e instanceof HTMLImageElement&&this._startPreloadImageElement(e))}_startPreloadVideoElement(e){if(!((0,ue.w8)(e.src)||"auto"===e.preload&&e.crossOrigin)){e.preload="auto",e.crossOrigin="anonymous";const t=!e.paused;if(e.src=e.src,t&&e.autoplay){const t=()=>{e.removeEventListener("canplay",t),e.play()};e.addEventListener("canplay",t)}}}_startPreloadImageElement(e){(0,ue.DB)(e.src)||(0,ue.w8)(e.src)||e.crossOrigin||(e.crossOrigin="anonymous",e.src=e.src)}_createDescriptor(e){const t=new $e.R;return t.wrapMode=this._parameters.wrap??ve.pF.REPEAT,t.flipped=!this._parameters.noUnpackFlip,t.samplingMode=this._parameters.mipmap?ve.Cj.LINEAR_MIPMAP_LINEAR:ve.Cj.LINEAR,t.hasMipmap=!!this._parameters.mipmap,t.preMultiplyAlpha=!!this._parameters.preMultiplyAlpha,t.maxAnisotropy=this._parameters.maxAnisotropy??(this._parameters.mipmap?e.parameters.maxMaxAnisotropy:1),t}get glTexture(){return this._glTexture}get memoryEstimate(){return this._glTexture?.usedMemory||function(e,t){if(null==e)return 0;if((0,V.mw)(e)||(0,V.mg)(e))return t.encoding===z.JS.KTX2_ENCODING?function(e,t){if(null==xe)return e.byteLength;const r=new xe.KTX2File(new Uint8Array(e)),i=Ee(r)?ye(r.getLevels(),r.getHasAlpha(),r.getWidth(),r.getHeight(),t):0;return r.close(),r.delete(),i}(e,!!t.mipmap):t.encoding===z.JS.BASIS_ENCODING?function(e,t){if(null==xe)return e.byteLength;const r=new xe.BasisFile(new Uint8Array(e)),i=Ae(r)?ye(r.getNumLevels(0),r.getHasAlpha(),r.getImageWidth(0,0),r.getImageHeight(0,0),t):0;return r.close(),r.delete(),i}(e,!!t.mipmap):e.byteLength;const{width:r,height:i}=e instanceof Image||e instanceof ImageData||e instanceof HTMLCanvasElement||e instanceof HTMLVideoElement?Xe(e):t;return(t.mipmap?4/3:1)*r*i*(t.components||4)||0}(this._data,this._parameters)}load(e){if(this._glTexture)return this._glTexture;if(this._loadingPromise)return this._loadingPromise;const t=this._data;return null==t?(this._glTexture=new ge.g(e,this._createDescriptor(e),null),this._glTexture):(this._parameters.reloadable||(this._data=void 0),"string"==typeof t?this._loadFromURL(e,t):t instanceof Image?this._loadFromImageElement(e,t):t instanceof HTMLVideoElement?this._loadFromVideoElement(e,t):t instanceof ImageData||t instanceof HTMLCanvasElement?this._loadFromImage(e,t):((0,V.mw)(t)||(0,V.mg)(t))&&this._parameters.encoding===z.JS.DDS_ENCODING?this._loadFromDDSData(e,t):((0,V.mw)(t)||(0,V.mg)(t))&&this._parameters.encoding===z.JS.KTX2_ENCODING?this._loadFromKTX2(e,t):((0,V.mw)(t)||(0,V.mg)(t))&&this._parameters.encoding===z.JS.BASIS_ENCODING?this._loadFromBasis(e,t):(0,V.mg)(t)?this._loadFromPixelData(e,t):(0,V.mw)(t)?this._loadFromPixelData(e,new Uint8Array(t)):null)}_frameUpdate(e,t){return null==this._glTexture||e.readyState<ke.HAVE_CURRENT_DATA||t===e.currentTime?t:(this._glTexture.setData(e),this._glTexture.descriptor.hasMipmap&&this._glTexture.generateMipmap(),this._parameters.updateCallback&&this._parameters.updateCallback(),e.currentTime)}_loadFromDDSData(e,t){return this._glTexture=Ue(e,this._createDescriptor(e),t),this._glTexture}_loadFromKTX2(e,t){return this._loadAsync((()=>async function(e,t,r){null==xe&&(xe=await be());const i=new xe.KTX2File(new Uint8Array(r));if(!Ee(i))return null;i.startTranscoding();const n=Se(e,t,i.getLevels(),i.getHasAlpha(),i.getWidth(),i.getHeight(),((e,t)=>i.getImageTranscodedSizeInBytes(e,0,0,t)),((e,t,r)=>i.transcodeImage(r,e,0,0,t,0,-1,-1)));return i.close(),i.delete(),n}(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromBasis(e,t){return this._loadAsync((()=>async function(e,t,r){null==xe&&(xe=await be());const i=new xe.BasisFile(new Uint8Array(r));if(!Ae(i))return null;i.startTranscoding();const n=Se(e,t,i.getNumLevels(0),i.getHasAlpha(),i.getImageWidth(0,0),i.getImageHeight(0,0),((e,t)=>i.getImageTranscodedSizeInBytes(0,e,t)),((e,t,r)=>i.transcodeImage(r,0,e,t,0,0)));return i.close(),i.delete(),n}(e,this._createDescriptor(e),t).then((e=>(this._glTexture=e,e)))))}_loadFromPixelData(e,t){(0,U.vA)(this._parameters.width>0&&this._parameters.height>0);const r=this._createDescriptor(e);return r.pixelFormat=1===this._parameters.components?ve.Ab.LUMINANCE:3===this._parameters.components?ve.Ab.RGB:ve.Ab.RGBA,r.width=this._parameters.width??0,r.height=this._parameters.height??0,this._glTexture=new ge.g(e,r,t),this._glTexture}_loadFromURL(e,t){return this._loadAsync((async r=>{const i=await(0,B.D)(t,{signal:r});return(0,L.Te)(r),this._loadFromImage(e,i)}))}_loadFromImageElement(e,t){return t.complete?this._loadFromImage(e,t):this._loadAsync((async r=>{const i=await(0,he.Sx)(t,t.src,!1,r);return(0,L.Te)(r),this._loadFromImage(e,i)}))}_loadFromVideoElement(e,t){return t.readyState>=ke.HAVE_CURRENT_DATA?this._loadFromImage(e,t):this._loadFromVideoElementAsync(e,t)}_loadFromVideoElementAsync(e,t){return this._loadAsync((r=>new Promise(((i,n)=>{const o=()=>{t.removeEventListener("loadeddata",a),t.removeEventListener("error",s),(0,de.xt)(l)},a=()=>{t.readyState>=ke.HAVE_CURRENT_DATA&&(o(),i(this._loadFromImage(e,t)))},s=e=>{o(),n(e||new R.A("Failed to load video"))};t.addEventListener("loadeddata",a),t.addEventListener("error",s);const l=(0,L.u7)(r,(()=>s((0,L.NK)())))}))))}_loadFromImage(e,t){let r=t;if(!(r instanceof HTMLVideoElement)){const{maxTextureSize:t}=e.parameters;r=this._parameters.downsampleUncompressed?function(e,t){let r=e.width*e.height;if(r<4096)return e instanceof ImageData?qe(e):e;let i=e.width,n=e.height;do{i=Math.ceil(i/2),n=Math.ceil(n/2),r=i*n}while(r>1048576||null!=t&&(i>t||n>t));return je(e,i,n)}(r,t):function(e,t){const r=Math.max(e.width,e.height);if(r<=t)return e;const i=t/r;return je(e,Math.round(e.width*i),Math.round(e.height*i))}(r,t)}const i=Xe(r);this._parameters.width=i.width,this._parameters.height=i.height;const n=this._createDescriptor(e);return n.pixelFormat=3===this._parameters.components?ve.Ab.RGB:ve.Ab.RGBA,n.width=i.width,n.height=i.height,this._glTexture=new ge.g(e,n,r),this._glTexture}_loadAsync(e){const t=new AbortController;this._loadingController=t;const r=e(t.signal);this._loadingPromise=r;const i=()=>{this._loadingController===t&&(this._loadingController=null),this._loadingPromise===r&&(this._loadingPromise=null)};return r.then(i,i),r}unload(){if(this._glTexture=(0,de.WD)(this._glTexture),null!=this._loadingController){const e=this._loadingController;this._loadingController=null,this._loadingPromise=null,e.abort()}this.events.emit("unloaded")}}function Xe(e){return e instanceof HTMLVideoElement?{width:e.videoWidth,height:e.videoHeight}:e}!function(e){e[e.HAVE_NOTHING=0]="HAVE_NOTHING",e[e.HAVE_METADATA=1]="HAVE_METADATA",e[e.HAVE_CURRENT_DATA=2]="HAVE_CURRENT_DATA",e[e.HAVE_FUTURE_DATA=3]="HAVE_FUTURE_DATA",e[e.HAVE_ENOUGH_DATA=4]="HAVE_ENOUGH_DATA"}(ke||(ke={}));const Ze={wrap:{s:ve.pF.REPEAT,t:ve.pF.REPEAT},mipmap:!0,noUnpackFlip:!1,preMultiplyAlpha:!1,downsampleUncompressed:!1};var Je=r(64465),Ke=r(48549),Qe=r(34981),et=r(59046),tt=r(27920),rt=r(26719),it=r(16005),nt=r(84103),ot=r(10773),at=r(57162);const st=(0,at.p3)(ve.dn.SRC_ALPHA,ve.dn.ONE,ve.dn.ONE_MINUS_SRC_ALPHA,ve.dn.ONE_MINUS_SRC_ALPHA),lt=(0,at.p3)(ve.dn.ONE,ve.dn.ZERO,ve.dn.ONE,ve.dn.ONE_MINUS_SRC_ALPHA);function ct(e){return e===ot.y.FrontFace?null:lt}const dt={factor:-1,units:-2};function ut(e){return e?dt:null}function ht(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ve.MT.LESS;return e===ot.y.NONE||e===ot.y.FrontFace?t:ve.MT.LEQUAL}function ft(e){return e===ot.y.ColorAlpha?{buffers:[ve.Nm.COLOR_ATTACHMENT0,ve.Nm.COLOR_ATTACHMENT1]}:null}class mt{constructor(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.isVerticalRay=e,this.normalRequired=t}}const pt=(0,h.vt)();function vt(e,t,r,i,n,o){if(!e.visible)return;const a=(0,d.z)(It,i,r),s=(e,t,r)=>{o(e,r,t,!1)},l=new mt(!1,t.options.normalRequired);if(e.boundingInfo){(0,U.vA)(e.type===$.X.Mesh);const i=t.tolerance;_t(e.boundingInfo,r,a,i,n,l,s)}else{const t=e.attributes.get(ae.r.POSITION),i=t.indices;Tt(r,a,0,i.length/3,i,t.data,t.stride,n,l,s)}}const gt=(0,u.vt)();function _t(e,t,r,i,n,o,a){if(null==e)return;const s=function(e,t){return(0,d.s)(t,1/e[0],1/e[1],1/e[2])}(r,gt);if((0,h.Ne)(pt,e.bbMin),(0,h.vI)(pt,e.bbMax),null!=n&&n.applyToAabb(pt),function(e,t,r,i){return function(e,t,r,i,n){const o=(e[0]-i-t[0])*r[0],a=(e[3]+i-t[0])*r[0];let s=Math.min(o,a),l=Math.max(o,a);const c=(e[1]-i-t[1])*r[1],d=(e[4]+i-t[1])*r[1];if(l=Math.min(l,Math.max(c,d)),l<0)return!1;if(s=Math.max(s,Math.min(c,d)),s>l)return!1;const u=(e[2]-i-t[2])*r[2],h=(e[5]+i-t[2])*r[2];return l=Math.min(l,Math.max(u,h)),!(l<0)&&(s=Math.max(s,Math.min(u,h)),!(s>l)&&s<n)}(e,t,r,i,1/0)}(pt,t,s,i)){const{primitiveIndices:s,position:l}=e,c=s?s.length:l.indices.length/3;if(c>Ct){const s=e.getChildren();if(void 0!==s){for(const e of s)_t(e,t,r,i,n,o,a);return}}!function(e,t,r,i,n,o,a,s,l,c,d){const u=e[0],h=e[1],f=e[2],m=t[0],p=t[1],v=t[2],{normalRequired:g}=c;for(let _=r;_<i;++_){const e=s[_],t=3*e,r=a*n[t];let i=o[r],c=o[r+1],x=o[r+2];const T=a*n[t+1];let b=o[T],y=o[T+1],A=o[T+2];const E=a*n[t+2];let S=o[E],w=o[E+1],M=o[E+2];null!=l&&([i,c,x]=l.applyToVertex(i,c,x,_),[b,y,A]=l.applyToVertex(b,y,A,_),[S,w,M]=l.applyToVertex(S,w,M,_));const C=b-i,O=y-c,I=A-x,R=S-i,N=w-c,P=M-x,L=p*P-N*v,H=v*R-P*m,D=m*N-R*p,B=C*L+O*H+I*D;if(Math.abs(B)<=Ot)continue;const F=u-i,z=h-c,V=f-x,G=F*L+z*H+V*D;if(B>0){if(G<0||G>B)continue}else if(G>0||G<B)continue;const W=z*I-O*V,U=V*C-I*F,j=F*O-C*z,q=m*W+p*U+v*j;if(B>0){if(q<0||G+q>B)continue}else if(q>0||G+q<B)continue;const k=(R*W+N*U+P*j)/B;k>=0&&d(k,e,g?Et(C,O,I,R,N,P,xt):null)}}(t,r,0,c,l.indices,l.data,l.stride,s,n,o,a)}}const xt=(0,u.vt)();function Tt(e,t,r,i,n,o,a,s,l,c){const u=t,h=Rt,f=Math.abs(u[0]),m=Math.abs(u[1]),p=Math.abs(u[2]),v=f>=m?f>=p?0:2:m>=p?1:2,g=v,_=u[g]<0?2:1,x=(v+_)%3,T=(v+(3-_))%3,b=u[x]/u[g],y=u[T]/u[g],A=1/u[g],E=bt,S=yt,w=At,{normalRequired:M}=l;for(let C=r;C<i;++C){const t=3*C,r=a*n[t];(0,d.s)(h[0],o[r+0],o[r+1],o[r+2]);const i=a*n[t+1];(0,d.s)(h[1],o[i+0],o[i+1],o[i+2]);const l=a*n[t+2];(0,d.s)(h[2],o[l+0],o[l+1],o[l+2]),s&&((0,d.c)(h[0],s.applyToVertex(h[0][0],h[0][1],h[0][2],C)),(0,d.c)(h[1],s.applyToVertex(h[1][0],h[1][1],h[1][2],C)),(0,d.c)(h[2],s.applyToVertex(h[2][0],h[2][1],h[2][2],C))),(0,d.z)(E,h[0],e),(0,d.z)(S,h[1],e),(0,d.z)(w,h[2],e);const u=E[x]-b*E[g],f=E[T]-y*E[g],m=S[x]-b*S[g],p=S[T]-y*S[g],v=w[x]-b*w[g],_=w[T]-y*w[g],O=v*p-_*m,I=u*_-f*v,R=m*f-p*u;if((O<0||I<0||R<0)&&(O>0||I>0||R>0))continue;const N=O+I+R;if(0===N)continue;const P=O*(A*E[g])+I*(A*S[g])+R*(A*w[g]);if(P*Math.sign(N)<0)continue;const L=P/N;L>=0&&c(L,C,M?St(h):null)}}const bt=(0,u.vt)(),yt=(0,u.vt)(),At=(0,u.vt)();function Et(e,t,r,i,n,o,a){return(0,d.s)(wt,e,t,r),(0,d.s)(Mt,i,n,o),(0,d.b)(a,wt,Mt),(0,d.n)(a,a),a}function St(e){return(0,d.z)(wt,e[1],e[0]),(0,d.z)(Mt,e[2],e[0]),(0,d.b)(xt,wt,Mt),(0,d.n)(xt,xt),xt}const wt=(0,u.vt)(),Mt=(0,u.vt)();const Ct=1e3,Ot=1e-7,It=(0,u.vt)(),Rt=[(0,u.vt)(),(0,u.vt)(),(0,u.vt)()];var Nt;!function(e){e[e.INTEGRATED_MESH=0]="INTEGRATED_MESH",e[e.OPAQUE_TERRAIN=1]="OPAQUE_TERRAIN",e[e.OPAQUE_MATERIAL=2]="OPAQUE_MATERIAL",e[e.OPAQUE_NO_SSAO_DEPTH=3]="OPAQUE_NO_SSAO_DEPTH",e[e.TRANSPARENT_MATERIAL=4]="TRANSPARENT_MATERIAL",e[e.TRANSPARENT_NO_SSAO_DEPTH=5]="TRANSPARENT_NO_SSAO_DEPTH",e[e.TRANSPARENT_TERRAIN=6]="TRANSPARENT_TERRAIN",e[e.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL=7]="TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL",e[e.OCCLUDED_TERRAIN=8]="OCCLUDED_TERRAIN",e[e.OCCLUDER_MATERIAL=9]="OCCLUDER_MATERIAL",e[e.TRANSPARENT_OCCLUDER_MATERIAL=10]="TRANSPARENT_OCCLUDER_MATERIAL",e[e.OCCLUSION_PIXELS=11]="OCCLUSION_PIXELS",e[e.OPAQUE_ENVIRONMENT=12]="OPAQUE_ENVIRONMENT",e[e.TRANSPARENT_ENVIRONMENT=13]="TRANSPARENT_ENVIRONMENT",e[e.LASERLINES=14]="LASERLINES",e[e.LASERLINES_CONTRAST_CONTROL=15]="LASERLINES_CONTRAST_CONTROL",e[e.HUD_MATERIAL=16]="HUD_MATERIAL",e[e.LABEL_MATERIAL=17]="LABEL_MATERIAL",e[e.LINE_CALLOUTS=18]="LINE_CALLOUTS",e[e.LINE_CALLOUTS_HUD_DEPTH=19]="LINE_CALLOUTS_HUD_DEPTH",e[e.DRAPED_MATERIAL=20]="DRAPED_MATERIAL",e[e.DRAPED_WATER=21]="DRAPED_WATER",e[e.VIEWSHED=22]="VIEWSHED",e[e.VOXEL=23]="VOXEL",e[e.MAX_SLOTS=24]="MAX_SLOTS"}(Nt||(Nt={}));var Pt=r(93582),Lt=r(59231);const Ht=new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.offset=e,this.sphere=(0,Pt.c)(),this.tmpVertex=(0,u.vt)()}applyToVertex(e,t,r){const i=this.objectTransform.transform,n=(0,d.s)(Dt,e,t,r),o=(0,d.h)(n,n,i),a=this.offset/(0,d.l)(o);(0,d.r)(o,o,o,a);const s=this.objectTransform.inverse;return(0,d.h)(this.tmpVertex,o,s),this.tmpVertex}applyToMinMax(e,t){const r=this.offset/(0,d.l)(e);(0,d.r)(e,e,e,r);const i=this.offset/(0,d.l)(t);(0,d.r)(t,t,t,i)}applyToAabb(e){const t=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*t,e[1]+=e[1]*t,e[2]+=e[2]*t;const r=this.offset/Math.sqrt(e[3]*e[3]+e[4]*e[4]+e[5]*e[5]);return e[3]+=e[3]*r,e[4]+=e[4]*r,e[5]+=e[5]*r,e}applyToBoundingSphere(e){const t=(0,d.l)((0,Pt.g)(e)),r=this.offset/t;return(0,d.r)((0,Pt.g)(this.sphere),(0,Pt.g)(e),(0,Pt.g)(e),r),this.sphere[3]=e[3]+e[3]*this.offset/t,this.sphere}};new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.componentLocalOriginLength=0,this._totalOffset=0,this._offset=0,this._tmpVertex=(0,u.vt)(),this._tmpMbs=(0,Pt.c)(),this._tmpObb=new Lt.ab,this._resetOffset(e)}_resetOffset(e){this._offset=e,this._totalOffset=e}set offset(e){this._resetOffset(e)}get offset(){return this._offset}set componentOffset(e){this._totalOffset=this._offset+e}set localOrigin(e){this.componentLocalOriginLength=(0,d.l)(e)}applyToVertex(e,t,r){const i=(0,d.s)(Dt,e,t,r),n=(0,d.s)(Bt,e,t,r+this.componentLocalOriginLength),o=this._totalOffset/(0,d.l)(n);return(0,d.r)(this._tmpVertex,i,n,o),this._tmpVertex}applyToAabb(e){const t=this.componentLocalOriginLength,r=e[0],i=e[1],n=e[2]+t,o=e[3],a=e[4],s=e[5]+t,l=Math.abs(r),c=Math.abs(i),d=Math.abs(n),u=Math.abs(o),h=Math.abs(a),f=Math.abs(s),m=.5*(1+Math.sign(r*o))*Math.min(l,u),p=.5*(1+Math.sign(i*a))*Math.min(c,h),v=.5*(1+Math.sign(n*s))*Math.min(d,f),g=Math.max(l,u),_=Math.max(c,h),x=Math.max(d,f),T=Math.sqrt(m*m+p*p+v*v),b=Math.sign(l+r),y=Math.sign(c+i),A=Math.sign(d+n),E=Math.sign(u+o),S=Math.sign(h+a),w=Math.sign(f+s),M=this._totalOffset;if(T<M)return e[0]-=(1-b)*M,e[1]-=(1-y)*M,e[2]-=(1-A)*M,e[3]+=E*M,e[4]+=S*M,e[5]+=w*M,e;const C=M/Math.sqrt(g*g+_*_+x*x),O=M/T,I=O-C,R=-I;return e[0]+=r*(b*R+O),e[1]+=i*(y*R+O),e[2]+=n*(A*R+O),e[3]+=o*(E*I+C),e[4]+=a*(S*I+C),e[5]+=s*(w*I+C),e}applyToMbs(e){const t=(0,d.l)((0,Pt.g)(e)),r=this._totalOffset/t;return(0,d.r)((0,Pt.g)(this._tmpMbs),(0,Pt.g)(e),(0,Pt.g)(e),r),this._tmpMbs[3]=e[3]+e[3]*this._totalOffset/t,this._tmpMbs}applyToObb(e){return(0,Lt.gm)(e,this._totalOffset,this._totalOffset,Je.RT.Global,this._tmpObb),this._tmpObb}};new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.offset=e,this.tmpVertex=(0,u.vt)()}applyToVertex(e,t,r){const i=(0,d.s)(Dt,e,t,r),n=(0,d.g)(Bt,i,this.localOrigin),o=this.offset/(0,d.l)(n);return(0,d.r)(this.tmpVertex,i,n,o),this.tmpVertex}applyToAabb(e){const t=Ft,r=zt,i=Vt;for(let s=0;s<3;++s)t[s]=e[0+s]+this.localOrigin[s],r[s]=e[3+s]+this.localOrigin[s],i[s]=t[s];const n=this.applyToVertex(t[0],t[1],t[2]);for(let s=0;s<3;++s)e[s]=n[s],e[s+3]=n[s];const o=t=>{const r=this.applyToVertex(t[0],t[1],t[2]);for(let i=0;i<3;++i)e[i]=Math.min(e[i],r[i]),e[i+3]=Math.max(e[i+3],r[i])};for(let s=1;s<8;++s){for(let e=0;e<3;++e)i[e]=s&1<<e?r[e]:t[e];o(i)}let a=0;for(let s=0;s<3;++s)t[s]*r[s]<0&&(a|=1<<s);if(0!==a&&7!==a)for(let s=0;s<8;++s)if(!(a&s)){for(let e=0;e<3;++e)i[e]=a&1<<e?0:s&1<<e?t[e]:r[e];o(i)}for(let s=0;s<3;++s)e[s]-=this.localOrigin[s],e[s+3]-=this.localOrigin[s];return e}};const Dt=(0,u.vt)(),Bt=(0,u.vt)(),Ft=(0,u.vt)(),zt=(0,u.vt)(),Vt=(0,u.vt)();function Gt(e,t,r){const{data:i,indices:n}=e,o=t.typedBuffer,a=t.typedBufferStride,s=n.length;r*=a;for(let l=0;l<s;++l){const e=2*n[l];o[r]=i[e],o[r+1]=i[e+1],r+=a}}function Wt(e,t,r,i){const{data:n,indices:o}=e,a=t.typedBuffer,s=t.typedBufferStride,l=o.length;if(r*=s,null==i||1===i)for(let c=0;c<l;++c){const e=3*o[c];a[r]=n[e],a[r+1]=n[e+1],a[r+2]=n[e+2],r+=s}else for(let c=0;c<l;++c){const e=3*o[c];for(let t=0;t<i;++t)a[r]=n[e],a[r+1]=n[e+1],a[r+2]=n[e+2],r+=s}}function Ut(e,t,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;const{data:n,indices:o}=e,a=t.typedBuffer,s=t.typedBufferStride,l=o.length;if(r*=s,1===i)for(let c=0;c<l;++c){const e=4*o[c];a[r]=n[e],a[r+1]=n[e+1],a[r+2]=n[e+2],a[r+3]=n[e+3],r+=s}else for(let c=0;c<l;++c){const e=4*o[c];for(let t=0;t<i;++t)a[r]=n[e],a[r+1]=n[e+1],a[r+2]=n[e+2],a[r+3]=n[e+3],r+=s}}function jt(e,t,r,i){let n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;const o=t.typedBuffer,a=t.typedBufferStride;if(i*=a,1===n)for(let s=0;s<r;++s)o[i]=e[0],o[i+1]=e[1],o[i+2]=e[2],o[i+3]=e[3],i+=a;else for(let s=0;s<r;++s)for(let t=0;t<n;++t)o[i]=e[0],o[i+1]=e[1],o[i+2]=e[2],o[i+3]=e[3],i+=a}function qt(e,t,r,i,n,o){switch(e){case ae.r.POSITION:{(0,U.vA)(3===t.size);const i=n.getField(e,m.xs);(0,U.vA)(!!i,`No buffer view for ${e}`),i&&function(e,t,r,i){let n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;if(!t)return void Wt(e,r,i,n);const{data:o,indices:a}=e,l=r.typedBuffer,c=r.typedBufferStride,d=a.length,u=t[0],h=t[1],f=t[2],m=t[4],p=t[5],v=t[6],g=t[8],_=t[9],x=t[10],T=t[12],b=t[13],y=t[14];i*=c;let A=0,E=0,S=0;const w=(0,s.tZ)(t)?e=>{A=o[e]+T,E=o[e+1]+b,S=o[e+2]+y}:e=>{const t=o[e],r=o[e+1],i=o[e+2];A=u*t+m*r+g*i+T,E=h*t+p*r+_*i+b,S=f*t+v*r+x*i+y};if(1===n)for(let s=0;s<d;++s)w(3*a[s]),l[i]=A,l[i+1]=E,l[i+2]=S,i+=c;else for(let s=0;s<d;++s){w(3*a[s]);for(let e=0;e<n;++e)l[i]=A,l[i+1]=E,l[i+2]=S,i+=c}}(t,r,i,o);break}case ae.r.NORMAL:{(0,U.vA)(3===t.size);const r=n.getField(e,m.xs);(0,U.vA)(!!r,`No buffer view for ${e}`),r&&function(e,t,r,i){let n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;if(!t)return void Wt(e,r,i,n);const{data:o,indices:a}=e,l=t,c=r.typedBuffer,d=r.typedBufferStride,u=a.length,h=l[0],f=l[1],m=l[2],p=l[4],v=l[5],g=l[6],_=l[8],x=l[9],T=l[10],b=!(0,s.ut)(l),y=1e-6,A=1-y;i*=d;let E=0,S=0,w=0;const M=(0,s.tZ)(l)?e=>{E=o[e],S=o[e+1],w=o[e+2]}:e=>{const t=o[e],r=o[e+1],i=o[e+2];E=h*t+p*r+_*i,S=f*t+v*r+x*i,w=m*t+g*r+T*i};if(1===n)if(b)for(let s=0;s<u;++s){M(3*a[s]);const e=E*E+S*S+w*w;if(e<A&&e>y){const t=1/Math.sqrt(e);c[i]=E*t,c[i+1]=S*t,c[i+2]=w*t}else c[i]=E,c[i+1]=S,c[i+2]=w;i+=d}else for(let s=0;s<u;++s)M(3*a[s]),c[i]=E,c[i+1]=S,c[i+2]=w,i+=d;else for(let s=0;s<u;++s){if(M(3*a[s]),b){const e=E*E+S*S+w*w;if(e<A&&e>y){const t=1/Math.sqrt(e);E*=t,S*=t,w*=t}}for(let e=0;e<n;++e)c[i]=E,c[i+1]=S,c[i+2]=w,i+=d}}(t,i,r,o);break}case ae.r.NORMALCOMPRESSED:{(0,U.vA)(2===t.size);const r=n.getField(e,m.mJ);(0,U.vA)(!!r,`No buffer view for ${e}`),r&&Gt(t,r,o);break}case ae.r.UV0:{(0,U.vA)(2===t.size);const r=n.getField(e,m.gH);(0,U.vA)(!!r,`No buffer view for ${e}`),r&&Gt(t,r,o);break}case ae.r.COLOR:case ae.r.SYMBOLCOLOR:{const r=n.getField(e,m.XP);(0,U.vA)(!!r,`No buffer view for ${e}`),(0,U.vA)(3===t.size||4===t.size),!r||3!==t.size&&4!==t.size||function(e,t,r,i){let n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;const{data:o,indices:a}=e,s=r.typedBuffer,l=r.typedBufferStride,c=a.length;if(i*=l,t!==o.length||4!==t)if(1!==n)if(4!==t)for(let d=0;d<c;++d){const e=3*a[d];for(let t=0;t<n;++t)s[i]=o[e],s[i+1]=o[e+1],s[i+2]=o[e+2],s[i+3]=255,i+=l}else for(let d=0;d<c;++d){const e=4*a[d];for(let t=0;t<n;++t)s[i]=o[e],s[i+1]=o[e+1],s[i+2]=o[e+2],s[i+3]=o[e+3],i+=l}else{if(4===t){for(let e=0;e<c;++e){const t=4*a[e];s[i]=o[t],s[i+1]=o[t+1],s[i+2]=o[t+2],s[i+3]=o[t+3],i+=l}return}for(let e=0;e<c;++e){const t=3*a[e];s[i]=o[t],s[i+1]=o[t+1],s[i+2]=o[t+2],s[i+3]=255,i+=l}}else{s[i]=o[0],s[i+1]=o[1],s[i+2]=o[2],s[i+3]=o[3];const e=new Uint32Array(r.typedBuffer.buffer,r.start),t=l/4,a=e[i/=4];i+=t;const d=c*n;for(let r=1;r<d;++r)e[i]=a,i+=t}}(t,t.size,r,o);break}case ae.r.COLORFEATUREATTRIBUTE:{const r=n.getField(e,m.Y$);(0,U.vA)(!!r,`No buffer view for ${e}`),(0,U.vA)(1===t.size),r&&1===t.size&&function(e,t,r){const{data:i,indices:n}=e,o=t.typedBuffer,a=t.typedBufferStride,s=n.length,l=i[0];r*=a;for(let c=0;c<s;++c)o[r]=l,r+=a}(t,r,o);break}case ae.r.TANGENT:{(0,U.vA)(4===t.size);const i=n.getField(e,m.Eq);(0,U.vA)(!!i,`No buffer view for ${e}`),i&&function(e,t,r,i){let n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;if(!t)return void Ut(e,r,i,n);const{data:o,indices:a}=e,l=t,c=r.typedBuffer,d=r.typedBufferStride,u=a.length,h=l[0],f=l[1],m=l[2],p=l[4],v=l[5],g=l[6],_=l[8],x=l[9],T=l[10],b=!(0,s.ut)(l),y=1e-6,A=1-y;if(i*=d,1===n)for(let s=0;s<u;++s){const e=4*a[s],t=o[e],r=o[e+1],n=o[e+2],l=o[e+3];let u=h*t+p*r+_*n,E=f*t+v*r+x*n,S=m*t+g*r+T*n;if(b){const e=u*u+E*E+S*S;if(e<A&&e>y){const t=1/Math.sqrt(e);u*=t,E*=t,S*=t}}c[i]=u,c[i+1]=E,c[i+2]=S,c[i+3]=l,i+=d}else for(let s=0;s<u;++s){const e=4*a[s],t=o[e],r=o[e+1],l=o[e+2],u=o[e+3];let E=h*t+p*r+_*l,S=f*t+v*r+x*l,w=m*t+g*r+T*l;if(b){const e=E*E+S*S+w*w;if(e<A&&e>y){const t=1/Math.sqrt(e);E*=t,S*=t,w*=t}}for(let o=0;o<n;++o)c[i]=E,c[i+1]=S,c[i+2]=w,c[i+3]=u,i+=d}}(t,r,i,o);break}case ae.r.PROFILERIGHT:case ae.r.PROFILEUP:case ae.r.PROFILEVERTEXANDNORMAL:case ae.r.FEATUREVALUE:{(0,U.vA)(4===t.size);const r=n.getField(e,m.Eq);(0,U.vA)(!!r,`No buffer view for ${e}`),r&&Ut(t,r,o)}}}class kt{constructor(e){this.vertexBufferLayout=e}elementCount(e){return e.attributes.get(ae.r.POSITION).indices.length}write(e,t,r,i,n){!function(e,t,r,i,n,o){for(const a of t.fields.keys()){const t=e.attributes.get(a),s=t?.indices;if(t&&s)qt(a,t,r,i,n,o);else if(a===ae.r.OBJECTANDLAYERIDCOLOR&&null!=e.objectAndLayerIdColor){const t=e.attributes.get(ae.r.POSITION)?.indices;if(t){const r=t.length,i=n.getField(a,m.XP);jt(e.objectAndLayerIdColor,i,r,o)}}}}(r,this.vertexBufferLayout,e,t,i,n)}}var $t=r(25814),Yt=r(55855),Xt=r(97808),Zt=r(55386),Jt=r(90235),Kt=r(16506),Qt=r(42693),er=r(32119),tr=r(28584);ve.MT.LESS,ve.MT.ALWAYS;const rr={mask:255},ir={function:{func:ve.MT.ALWAYS,ref:z.dd.OutlineVisualElementMask,mask:z.dd.OutlineVisualElementMask},operation:{fail:ve.eA.KEEP,zFail:ve.eA.KEEP,zPass:ve.eA.ZERO}},nr={function:{func:ve.MT.ALWAYS,ref:z.dd.OutlineVisualElementMask,mask:z.dd.OutlineVisualElementMask},operation:{fail:ve.eA.KEEP,zFail:ve.eA.KEEP,zPass:ve.eA.REPLACE}};ve.MT.EQUAL,z.dd.OutlineVisualElementMask,z.dd.OutlineVisualElementMask,ve.eA.KEEP,ve.eA.KEEP,ve.eA.KEEP,ve.MT.NOTEQUAL,z.dd.OutlineVisualElementMask,z.dd.OutlineVisualElementMask,ve.eA.KEEP,ve.eA.KEEP,ve.eA.KEEP;const or=[1,1,.5],ar=[0,.6,.2],sr=[0,1,.2];var lr=r(68745);class cr extends Zt.Zo{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=(0,u.ci)(or),this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=z.s2.Back,this.isInstanced=!1,this.hasInstancedColor=!1,this.emissiveFactor=(0,u.fA)(0,0,0),this.instancedDoublePrecision=!1,this.normalType=et.W.Attribute,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.shadowMappingEnabled=!1,this.ambient=(0,u.fA)(.2,.2,.2),this.diffuse=(0,u.fA)(.8,.8,.8),this.externalColor=(0,Yt.fA)(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=(0,u.vt)(),this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.vvSymbolAnchor=null,this.vvSymbolRotationMatrix=null,this.modelTransformation=null,this.transparent=!1,this.writeDepth=!0,this.customDepthTest=z.it.Less,this.textureAlphaMode=z.sf.Blend,this.textureAlphaCutoff=Jt.H,this.textureAlphaPremultiplied=!1,this.hasOccludees=!1,this.renderOccluded=nt.m$.Occlude,this.isDecoration=!1}}Zt.gy;class dr extends Qt.w{initializeConfiguration(e,t){t.spherical=e.viewingMode===Je.RT.Global,t.doublePrecisionRequiresObfuscation=e.rctx.driverTest.doublePrecisionRequiresObfuscation.result,t.textureCoordinateType=t.hasColorTexture||t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture||t.hasNormalTexture?Xt.q.Default:Xt.q.None,t.objectAndLayerIdColorInstanced=t.instanced}initializeProgram(e){return this._initializeProgram(e,dr.shader)}_initializeProgram(e,t){return new tr.B(e.rctx,t.get().build(this.configuration),er.D)}_makePipeline(e,t){const r=this.configuration,i=e===ot.y.NONE,n=e===ot.y.FrontFace;return(0,at.Ey)({blending:r.output===Qe.V.Color&&r.transparent?i?st:ct(e):null,culling:hr(r)?(0,at.Xt)(r.cullFace):null,depthTest:{func:ht(e,ur(r.customDepthTest))},depthWrite:(i||n)&&r.writeDepth?at.kn:null,drawBuffers:r.output===Qe.V.Depth?{buffers:[ve.Hr.NONE]}:ft(e),colorWrite:at.wE,stencilWrite:r.hasOccludees?rr:null,stencilTest:r.hasOccludees?t?nr:ir:null,polygonOffset:i||n?null:ut(r.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._makePipeline(this.configuration.transparencyPassType,!0),this._makePipeline(this.configuration.transparencyPassType,!1)}getPipeline(e){return e?this._occludeePipelineState:super.getPipeline()}}function ur(e){return e===z.it.Lequal?ve.MT.LEQUAL:ve.MT.LESS}function hr(e){return e.cullFace!==z.s2.None||!e.hasSlicePlane&&!e.transparent&&!e.doubleSidedMode}dr.shader=new Kt.$(lr.D,(()=>r.e(3727).then(r.bind(r,23727))));var fr=r(35143),mr=r(99415),pr=r(45937),vr=r(24245);class gr extends pr.nW{}(0,fr._)([(0,mr.W)({constValue:!0})],gr.prototype,"hasSliceHighlight",void 0),(0,fr._)([(0,mr.W)({constValue:!1})],gr.prototype,"hasSliceInVertexProgram",void 0),(0,fr._)([(0,mr.W)({constValue:vr.c.Pass})],gr.prototype,"pbrTextureBindType",void 0);class _r extends gr{constructor(){super(...arguments),this.output=Qe.V.Color,this.alphaDiscardMode=z.sf.Opaque,this.doubleSidedMode=tt.W.None,this.pbrMode=rt.A9.Disabled,this.cullFace=z.s2.None,this.transparencyPassType=ot.y.NONE,this.normalType=et.W.Attribute,this.textureCoordinateType=Xt.q.None,this.customDepthTest=z.it.Less,this.spherical=!1,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasSlicePlane=!1,this.hasSliceHighlight=!0,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasEmissionTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.multipassEnabled=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.vvSize=!1,this.vvColor=!1,this.receiveShadows=!1,this.receiveAmbientOcclusion=!1,this.textureAlphaPremultiplied=!1,this.instanced=!1,this.instancedColor=!1,this.objectAndLayerIdColorInstanced=!1,this.instancedDoublePrecision=!1,this.doublePrecisionRequiresObfuscation=!1,this.writeDepth=!0,this.transparent=!1,this.enableOffset=!0,this.cullAboveGround=!1,this.snowCover=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1}}(0,fr._)([(0,mr.W)({count:Qe.V.COUNT})],_r.prototype,"output",void 0),(0,fr._)([(0,mr.W)({count:z.sf.COUNT})],_r.prototype,"alphaDiscardMode",void 0),(0,fr._)([(0,mr.W)({count:tt.W.COUNT})],_r.prototype,"doubleSidedMode",void 0),(0,fr._)([(0,mr.W)({count:rt.A9.COUNT})],_r.prototype,"pbrMode",void 0),(0,fr._)([(0,mr.W)({count:z.s2.COUNT})],_r.prototype,"cullFace",void 0),(0,fr._)([(0,mr.W)({count:ot.y.COUNT})],_r.prototype,"transparencyPassType",void 0),(0,fr._)([(0,mr.W)({count:et.W.COUNT})],_r.prototype,"normalType",void 0),(0,fr._)([(0,mr.W)({count:Xt.q.COUNT})],_r.prototype,"textureCoordinateType",void 0),(0,fr._)([(0,mr.W)({count:z.it.COUNT})],_r.prototype,"customDepthTest",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"spherical",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasVertexColors",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasSymbolColors",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasVerticalOffset",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasSlicePlane",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasSliceHighlight",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasColorTexture",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasMetallicRoughnessTexture",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasEmissionTexture",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasOcclusionTexture",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasNormalTexture",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasScreenSizePerspective",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasVertexTangents",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasOccludees",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"multipassEnabled",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasModelTransformation",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"offsetBackfaces",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"vvSize",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"vvColor",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"receiveShadows",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"receiveAmbientOcclusion",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"textureAlphaPremultiplied",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"instanced",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"instancedColor",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"objectAndLayerIdColorInstanced",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"instancedDoublePrecision",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"doublePrecisionRequiresObfuscation",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"writeDepth",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"transparent",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"enableOffset",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"cullAboveGround",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"snowCover",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasColorTextureTransform",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasEmissionTextureTransform",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasNormalTextureTransform",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasOcclusionTextureTransform",void 0),(0,fr._)([(0,mr.W)()],_r.prototype,"hasMetallicRoughnessTextureTransform",void 0),(0,fr._)([(0,mr.W)({constValue:!1})],_r.prototype,"occlusionPass",void 0),(0,fr._)([(0,mr.W)({constValue:!0})],_r.prototype,"hasVvInstancing",void 0),(0,fr._)([(0,mr.W)({constValue:!1})],_r.prototype,"useCustomDTRExponentForWater",void 0),(0,fr._)([(0,mr.W)({constValue:!1})],_r.prototype,"supportsTextureAtlas",void 0),(0,fr._)([(0,mr.W)({constValue:!0})],_r.prototype,"useFillLights",void 0);var xr=r(35249);class Tr extends dr{initializeConfiguration(e,t){super.initializeConfiguration(e,t),t.hasMetallicRoughnessTexture=!1,t.hasEmissionTexture=!1,t.hasOcclusionTexture=!1,t.hasNormalTexture=!1,t.hasModelTransformation=!1,t.normalType=et.W.Attribute,t.doubleSidedMode=tt.W.WindingOrder,t.hasVertexTangents=!1}initializeProgram(e){return this._initializeProgram(e,Tr.shader)}}Tr.shader=new Kt.$(xr.R,(()=>r.e(7919).then(r.bind(r,77919))));class br extends nt.im{constructor(e){super(e,Ar),this.supportsEdges=!0,this.produces=new Map([[Nt.OPAQUE_MATERIAL,e=>((0,Qe.XY)(e)||(0,Qe.PJ)(e))&&!this.parameters.transparent],[Nt.TRANSPARENT_MATERIAL,e=>((0,Qe.XY)(e)||(0,Qe.PJ)(e))&&this.parameters.transparent&&this.parameters.writeDepth],[Nt.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL,e=>((0,Qe.XY)(e)||(0,Qe.PJ)(e))&&this.parameters.transparent&&!this.parameters.writeDepth]]),this._configuration=new _r,this._vertexBufferLayout=function(e){const t=(0,Ke.BP)().vec3f(ae.r.POSITION);return e.normalType===et.W.Compressed?t.vec2i16(ae.r.NORMALCOMPRESSED,{glNormalized:!0}):t.vec3f(ae.r.NORMAL),e.hasVertexTangents&&t.vec4f(ae.r.TANGENT),(e.textureId||e.normalTextureId||e.metallicRoughnessTextureId||e.emissiveTextureId||e.occlusionTextureId)&&t.vec2f(ae.r.UV0),e.hasVertexColors&&t.vec4u8(ae.r.COLOR),e.hasSymbolColors&&t.vec4u8(ae.r.SYMBOLCOLOR),(0,le.A)("enable-feature:objectAndLayerId-rendering")&&t.vec4u8(ae.r.OBJECTANDLAYERIDCOLOR),t}(this.parameters)}isVisibleForOutput(e){return e!==Qe.V.Shadow&&e!==Qe.V.ShadowExcludeHighlight&&e!==Qe.V.ShadowHighlight||this.parameters.castShadows}isVisible(){const e=this.parameters;if(!super.isVisible()||0===e.layerOpacity)return!1;const{hasInstancedColor:t,hasVertexColors:r,hasSymbolColors:i,vvColor:n}=e,o="replace"===e.colorMixMode,a=e.opacity>0,s=e.externalColor&&e.externalColor[3]>0,l=t||n||i;return r&&l?o||a:r?o?s:a:l?o||a:o?s:a}getConfiguration(e,t){return this._configuration.output=e,this._configuration.hasNormalTexture=!!this.parameters.normalTextureId,this._configuration.hasColorTexture=!!this.parameters.textureId,this._configuration.hasVertexTangents=this.parameters.hasVertexTangents,this._configuration.instanced=this.parameters.isInstanced,this._configuration.instancedDoublePrecision=this.parameters.instancedDoublePrecision,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.hasVerticalOffset=null!=this.parameters.verticalOffset,this._configuration.hasScreenSizePerspective=null!=this.parameters.screenSizePerspective,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasSliceHighlight=this.parameters.hasSliceHighlight,this._configuration.alphaDiscardMode=this.parameters.textureAlphaMode,this._configuration.normalType=this.parameters.normalType,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,null!=this.parameters.customDepthTest&&(this._configuration.customDepthTest=this.parameters.customDepthTest),this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.cullFace=this.parameters.hasSlicePlane?z.s2.None:this.parameters.cullFace,this._configuration.multipassEnabled=t.multipassEnabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration.hasModelTransformation=null!=this.parameters.modelTransformation,e===Qe.V.Color&&(this._configuration.hasVertexColors=this.parameters.hasVertexColors,this._configuration.hasSymbolColors=this.parameters.hasSymbolColors,this.parameters.treeRendering?this._configuration.doubleSidedMode=tt.W.WindingOrder:this._configuration.doubleSidedMode=this.parameters.doubleSided&&"normal"===this.parameters.doubleSidedType?tt.W.View:this.parameters.doubleSided&&"winding-order"===this.parameters.doubleSidedType?tt.W.WindingOrder:tt.W.None,this._configuration.instancedColor=this.parameters.hasInstancedColor,this._configuration.receiveShadows=this.parameters.receiveShadows&&this.parameters.shadowMappingEnabled,this._configuration.receiveAmbientOcclusion=this.parameters.receiveAmbientOcclusion&&null!=t.ssao,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.textureAlphaPremultiplied=!!this.parameters.textureAlphaPremultiplied,this._configuration.pbrMode=this.parameters.usePBR?this.parameters.isSchematic?rt.A9.Schematic:rt.A9.Normal:rt.A9.Disabled,this._configuration.hasMetallicRoughnessTexture=!!this.parameters.metallicRoughnessTextureId,this._configuration.hasEmissionTexture=!!this.parameters.emissiveTextureId,this._configuration.hasOcclusionTexture=!!this.parameters.occlusionTextureId,this._configuration.offsetBackfaces=!(!this.parameters.transparent||!this.parameters.offsetTransparentBackfaces),this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.enableOffset=t.camera.relativeElevation<5e5,this._configuration.snowCover=this.hasSnowCover(t),this._configuration.hasColorTextureTransform=!!this.parameters.colorTextureTransformMatrix,this._configuration.hasNormalTextureTransform=!!this.parameters.normalTextureTransformMatrix,this._configuration.hasEmissionTextureTransform=!!this.parameters.emissiveTextureTransformMatrix,this._configuration.hasOcclusionTextureTransform=!!this.parameters.occlusionTextureTransformMatrix,this._configuration.hasMetallicRoughnessTextureTransform=!!this.parameters.metallicRoughnessTextureTransformMatrix),this._configuration}hasSnowCover(e){return null!=e.weather&&e.weatherVisible&&"snowy"===e.weather.type&&"enabled"===e.weather.snowCover}intersect(e,t,r,i,n,o){if(null!=this.parameters.verticalOffset){const e=r.camera;(0,d.s)(Or,t[12],t[13],t[14]);let o=null;switch(r.viewingMode){case Je.RT.Global:o=(0,d.n)(Mr,Or);break;case Je.RT.Local:o=(0,d.c)(Mr,wr)}let a=0;const s=(0,d.f)(Ir,Or,e.eye),l=(0,d.l)(s),c=(0,d.j)(s,s,1/l);let u=null;this.parameters.screenSizePerspective&&(u=(0,d.m)(o,c)),a+=(0,$t.kE)(e,l,this.parameters.verticalOffset,u??0,this.parameters.screenSizePerspective),(0,d.j)(o,o,a),(0,d.t)(Cr,o,r.transform.inverseRotation),i=(0,d.f)(Er,i,Cr),n=(0,d.f)(Sr,n,Cr)}vt(e,r,i,n,function(e){return null!=e?(Ht.offset=e,Ht):null}(r.verticalOffset),o)}createGLMaterial(e){return new yr(e)}createBufferWriter(){return new kt(this._vertexBufferLayout)}}class yr extends it.m{constructor(e){super({...e,...e.material.parameters})}_updateShadowState(e){e.shadowMap.enabled!==this._material.parameters.shadowMappingEnabled&&this._material.setParameters({shadowMappingEnabled:e.shadowMap.enabled})}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&this._material.setParameters({hasOccludees:e.hasOccludees})}beginSlot(e){this._output===Qe.V.Color&&(this._updateShadowState(e),this._updateOccludeeState(e));const t=this._material.parameters;this.updateTexture(t.textureId);const r=e.camera.viewInverseTransposeMatrix;return(0,d.s)(t.origin,r[3],r[7],r[11]),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(t.treeRendering?Tr:dr,e)}}const Ar=new class extends cr{constructor(){super(...arguments),this.initTextureTransparent=!1,this.treeRendering=!1,this.hasVertexTangents=!1}};const Er=(0,u.vt)(),Sr=(0,u.vt)(),wr=(0,u.fA)(0,0,1),Mr=(0,u.vt)(),Cr=(0,u.vt)(),Or=(0,u.vt)(),Ir=(0,u.vt)(),Rr=()=>N.A.getLogger("esri.views.3d.layers.graphics.objectResourceUtils");async function Nr(e,t){const r=await async function(e,t){const r=t?.streamDataRequester;if(r)return async function(e,t,r){const i=await(0,O.Ke)(t.request(e,"json",r));if(!0===i.ok)return i.value;(0,L.QP)(i.error),Pr(i.error.details.url)}(e,r,t);const i=await(0,O.Ke)((0,C.A)(e,t));if(!0===i.ok)return i.value.data;(0,L.QP)(i.error),Pr(i.error)}(e,t),i=await async function(e,t){const r=new Array;for(const o in e){const i=e[o],n=i.images[0].data;if(!n){Rr().warn("Externally referenced texture data is not yet supported");continue}const a=i.encoding+";base64,"+n,s="/textureDefinitions/"+o,l="rgba"===i.channels?i.alphaChannelUsage||"transparency":"none",c={noUnpackFlip:!0,wrap:{s:ve.pF.REPEAT,t:ve.pF.REPEAT},preMultiplyAlpha:Dr(l)!==z.sf.Opaque},d=t?.disableTextures?Promise.resolve(null):(0,B.D)(a,t);r.push(d.then((e=>({refId:s,image:e,parameters:c,alphaChannelUsage:l}))))}const i=await Promise.all(r),n={};for(const o of i)n[o.refId]=o;return n}(r.textureDefinitions??{},t);let n=0;for(const o in i)if(i.hasOwnProperty(o)){const e=i[o];n+=e?.image?e.image.width*e.image.height*4:0}return{resource:r,textures:i,size:n+(0,I.iL)(r)}}function Pr(e){throw new R.A("",`Request for object resource failed: ${e}`)}function Lr(e){const t=e.params,r=t.topology;let i=!0;switch(t.vertexAttributes||(Rr().warn("Geometry must specify vertex attributes"),i=!1),t.topology){case"PerAttributeArray":break;case"Indexed":case null:case void 0:{const e=t.faces;if(e){if(t.vertexAttributes)for(const r in t.vertexAttributes){const t=e[r];t?.values?(null!=t.valueType&&"UInt32"!==t.valueType&&(Rr().warn(`Unsupported indexed geometry indices type '${t.valueType}', only UInt32 is currently supported`),i=!1),null!=t.valuesPerElement&&1!==t.valuesPerElement&&(Rr().warn(`Unsupported indexed geometry values per element '${t.valuesPerElement}', only 1 is currently supported`),i=!1)):(Rr().warn(`Indexed geometry does not specify face indices for '${r}' attribute`),i=!1)}}else Rr().warn("Indexed geometries must specify faces"),i=!1;break}default:Rr().warn(`Unsupported topology '${r}'`),i=!1}e.params.material||(Rr().warn("Geometry requires material"),i=!1);const n=e.params.vertexAttributes;for(const o in n)n[o].values||(Rr().warn("Geometries with externally defined attributes are not yet supported"),i=!1);return i}function Hr(e){const t=(0,h.Ie)();return e.forEach((e=>{const r=e.boundingInfo;null!=r&&((0,h.iT)(t,r.bbMin),(0,h.iT)(t,r.bbMax))})),t}function Dr(e){switch(e){case"mask":return z.sf.Mask;case"maskAndTransparency":return z.sf.MaskBlend;case"none":return z.sf.Opaque;default:return z.sf.Blend}}function Br(e){const t=e.params;return{id:1,material:t.material,texture:t.texture,region:t.texture}}const Fr=new H.R(1,2,"wosr");var zr=r(50791);async function Vr(e,t){const r=function(e){const t=e.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return t?{fileType:"gltf",url:t[1],specifiedLodIndex:null!=t[4]?Number(t[4]):null}:e.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:e,specifiedLodIndex:null}:{fileType:"unknown",url:e,specifiedLodIndex:null}}((0,i.EM)(e));if("wosr"===r.fileType){const e=await(t.cache?t.cache.loadWOSR(r.url,t):Nr(r.url,t)),{engineResources:i,referenceBoundingBox:n}=function(e,t){const r=new Array,i=new Array,n=new Array,o=new P.O,a=e.resource,s=H.R.parse(a.version||"1.0","wosr");Fr.validate(s);const l=a.model.name,c=a.model.geometries,d=a.materialDefinitions??{},h=e.textures;let f=0;const m=new Map;for(let p=0;p<c.length;p++){const e=c[p];if(!Lr(e))continue;const a=Br(e),s=e.params.vertexAttributes,l=[],v=t=>{if("PerAttributeArray"===e.params.topology)return null;const r=e.params.faces;for(const e in r)if(e===t)return r[e].values;return null},g=s[ae.r.POSITION],_=g.values.length/g.valuesPerElement;for(const t in s){const e=s[t],r=e.values,i=v(t)??(0,D.tM)(_);l.push([t,new F.n(r,i,e.valuesPerElement,!0)])}const x=a.texture,T=h&&h[x];if(T&&!m.has(x)){const{image:e,parameters:t}=T,r=new Ye(e,t);i.push(r),m.set(x,r)}const b=m.get(x),y=b?b.id:void 0,A=a.material;let E=o.get(A,x);if(null==E){const e=d[A.substring(A.lastIndexOf("/")+1)].params;1===e.transparency&&(e.transparency=0);const r=T&&T.alphaChannelUsage,i=e.transparency>0||"transparency"===r||"maskAndTransparency"===r,n=T?Dr(T.alphaChannelUsage):void 0,a={ambient:(0,u.ci)(e.diffuse),diffuse:(0,u.ci)(e.diffuse),opacity:1-(e.transparency||0),transparent:i,textureAlphaMode:n,textureAlphaCutoff:.33,textureId:y,initTextureTransparent:!0,doubleSided:!0,cullFace:z.s2.None,colorMixMode:e.externalColorMixMode||"tint",textureAlphaPremultiplied:T?.parameters.preMultiplyAlpha??!1};t?.materialParameters&&Object.assign(a,t.materialParameters),E=new br(a),o.set(A,x,E)}n.push(E);const S=new se(E,l);f+=l.find((e=>e[0]===ae.r.POSITION))?.[1]?.indices.length??0,r.push(S)}return{engineResources:[{name:l,stageResources:{textures:i,materials:n,geometries:r},pivotOffset:a.model.pivotOffset,numberOfVertices:f,lodThreshold:null}],referenceBoundingBox:Hr(r)}}(e,t);return{lods:i,referenceBoundingBox:n,isEsriSymbolResource:!1,isWosr:!0}}const a=await(t.cache?t.cache.loadGLTF(r.url,t,!!t.usePBR):(0,b.y)(new T.R(t.streamDataRequester),r.url,t,t.usePBR)),E=a.model.meta?.ESRI_proxyEllipsoid,w=a.meta.isEsriSymbolResource&&null!=E&&"EsriRealisticTreesStyle"===a.meta.ESRI_webstyle;w&&!a.customMeta.esriTreeRendering&&(a.customMeta.esriTreeRendering=!0,function(e,t){for(let r=0;r<e.model.lods.length;++r){const i=e.model.lods[r];for(const n of i.parts){const i=n.attributes.normal;if(null==i)return;const o=n.attributes.position,a=o.count,c=(0,u.vt)(),h=(0,u.vt)(),f=(0,u.vt)(),p=new Uint8Array(4*a),v=new Float64Array(3*a),g=(0,s.B8)((0,l.vt)(),n.transform);let _=0,x=0;for(let s=0;s<a;s++){o.getVec(s,h),i.getVec(s,c),(0,d.h)(h,h,n.transform),(0,d.f)(f,h,t.center),(0,d.D)(f,f,t.radius);const a=f[2],l=(0,d.l)(f),u=Math.min(.45+.55*l*l,1);(0,d.D)(f,f,t.radius),null!==g&&(0,d.h)(f,f,g),(0,d.n)(f,f),r+1!==e.model.lods.length&&e.model.lods.length>1&&(0,d.o)(f,f,c,a>-1?.2:Math.min(-4*a-3.8,1)),v[_]=f[0],v[_+1]=f[1],v[_+2]=f[2],_+=3,p[x]=255*u,p[x+1]=255*u,p[x+2]=255*u,p[x+3]=255,x+=4}n.attributes.normal=new m.xs(v),n.attributes.color=new m.XP(p)}}}(a,E));const C=!!t.usePBR,O=a.meta.isEsriSymbolResource?{usePBR:C,isSchematic:!1,treeRendering:w,mrrFactors:[...sr]}:{usePBR:C,isSchematic:!1,treeRendering:!1,mrrFactors:[...or]},I={...t.materialParameters,treeRendering:w},{engineResources:R,referenceBoundingBox:N}=function(e,t,r,i){const a=e.model,s=new Array,l=new Map,T=new Map,b=a.lods.length,E=(0,h.Ie)();return a.lods.forEach(((e,w)=>{const C=!0===i.skipHighLods&&(b>1&&0===w||b>3&&1===w)||!1===i.skipHighLods&&null!=i.singleLodIndex&&w!==i.singleLodIndex;if(C&&0!==w)return;const O=new M(e.name,e.lodThreshold,[0,0,0]);e.parts.forEach((e=>{const i=C?new br({}):function(e,t,r,i,n,o,a){const s=t.material+(t.attributes.normal?"_normal":"")+(t.attributes.color?"_color":"")+(t.attributes.texCoord0?"_texCoord0":"")+(t.attributes.tangent?"_tangent":""),l=e.materials.get(t.material),h=null!=t.attributes.texCoord0,f=null!=t.attributes.normal;if(null==l)return null;const m=function(e){switch(e){case"BLEND":return z.sf.Blend;case"MASK":return z.sf.Mask;case"OPAQUE":case null:case void 0:return z.sf.Opaque}}(l.alphaMode);if(!o.has(s)){if(h){const t=function(t){let r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(null!=t&&!a.has(t)){const i=e.textures.get(t);if(null!=i){const e=i.data;a.set(t,new Ye((0,A.x3)(e)?e.data:e,{...i.parameters,preMultiplyAlpha:!(0,A.x3)(e)&&r,encoding:(0,A.x3)(e)&&null!=e.encoding?e.encoding:void 0}))}}};t(l.textureColor,m!==z.sf.Opaque),t(l.textureNormal),t(l.textureOcclusion),t(l.textureEmissive),t(l.textureMetallicRoughness)}const r=l.color[0]**(1/zr.T),p=l.color[1]**(1/zr.T),v=l.color[2]**(1/zr.T),g=l.emissiveFactor[0]**(1/zr.T),_=l.emissiveFactor[1]**(1/zr.T),x=l.emissiveFactor[2]**(1/zr.T),T=null!=l.textureColor&&h?a.get(l.textureColor):null,b=function(e){let{normalTexture:t,metallicRoughnessTexture:r,metallicFactor:i,roughnessFactor:n,emissiveTexture:o,emissiveFactor:a,occlusionTexture:s}=e;return null==t&&null==r&&null==o&&(null==a||(0,d.e)(a,u.uY))&&null==s&&(null==n||1===n)&&(null==i||1===i)}({normalTexture:l.textureNormal,metallicRoughnessTexture:l.textureMetallicRoughness,metallicFactor:l.metallicFactor,roughnessFactor:l.roughnessFactor,emissiveTexture:l.textureEmissive,emissiveFactor:l.emissiveFactor,occlusionTexture:l.textureOcclusion}),y=null!=l.normalTextureTransform?.scale?l.normalTextureTransform?.scale:c.Un;o.set(s,new br({...i,transparent:m===z.sf.Blend,customDepthTest:z.it.Lequal,textureAlphaMode:m,textureAlphaCutoff:l.alphaCutoff,diffuse:[r,p,v],ambient:[r,p,v],opacity:l.opacity,doubleSided:l.doubleSided,doubleSidedType:"winding-order",cullFace:l.doubleSided?z.s2.None:z.s2.Back,hasVertexColors:!!t.attributes.color,hasVertexTangents:!!t.attributes.tangent,normalType:f?et.W.Attribute:et.W.ScreenDerivative,castShadows:!0,receiveShadows:l.receiveShadows,receiveAmbientOcclusion:l.receiveAmbientOcclustion,textureId:null!=T?T.id:void 0,colorMixMode:l.colorMixMode,normalTextureId:null!=l.textureNormal&&h?a.get(l.textureNormal).id:void 0,textureAlphaPremultiplied:null!=T&&!!T.parameters.preMultiplyAlpha,occlusionTextureId:null!=l.textureOcclusion&&h?a.get(l.textureOcclusion).id:void 0,emissiveTextureId:null!=l.textureEmissive&&h?a.get(l.textureEmissive).id:void 0,metallicRoughnessTextureId:null!=l.textureMetallicRoughness&&h?a.get(l.textureMetallicRoughness).id:void 0,emissiveFactor:[g,_,x],mrrFactors:b?[...ar]:[l.metallicFactor,l.roughnessFactor,i.mrrFactors[2]],isSchematic:b,colorTextureTransformMatrix:S(l.colorTextureTransform),normalTextureTransformMatrix:S(l.normalTextureTransform),scale:[y[0],y[1]],occlusionTextureTransformMatrix:S(l.occlusionTextureTransform),emissiveTextureTransformMatrix:S(l.emissiveTextureTransform),metallicRoughnessTextureTransformMatrix:S(l.metallicRoughnessTextureTransform),...n}))}const p=o.get(s);if(r.stageResources.materials.push(p),h){const e=e=>{null!=e&&r.stageResources.textures.push(a.get(e))};e(l.textureColor),e(l.textureNormal),e(l.textureOcclusion),e(l.textureEmissive),e(l.textureMetallicRoughness)}return p}(a,e,O,t,r,l,T),{geometry:s,vertexCount:b}=function(e,t){const r=e.attributes.position.count,i=(0,y.x)(e.indices||r,e.primitiveType),a=(0,f.oe)(3*r),{typedBuffer:s,typedBufferStride:l}=e.attributes.position;(0,p.a)(a,s,e.transform,3,l);const c=[[ae.r.POSITION,new F.n(a,i,3,!0)]];if(null!=e.attributes.normal){const t=(0,f.oe)(3*r),{typedBuffer:a,typedBufferStride:s}=e.attributes.normal;(0,o.Ge)(Gr,e.transform),(0,p.t)(t,a,Gr,3,s),(0,n.or)(Gr)&&(0,p.n)(t,t),c.push([ae.r.NORMAL,new F.n(t,i,3,!0)])}if(null!=e.attributes.tangent){const t=(0,f.oe)(4*r),{typedBuffer:a,typedBufferStride:s}=e.attributes.tangent;(0,o.z0)(Gr,e.transform),(0,v.t)(t,a,Gr,4,s),(0,n.or)(Gr)&&(0,p.n)(t,t,4),c.push([ae.r.TANGENT,new F.n(t,i,4,!0)])}if(null!=e.attributes.texCoord0){const t=(0,f.oe)(2*r),{typedBuffer:n,typedBufferStride:o}=e.attributes.texCoord0;(0,g.n)(t,n,2,o),c.push([ae.r.UV0,new F.n(t,i,2,!0)])}const d=e.attributes.color;if(null!=d){const t=new Uint8Array(4*r);4===d.elementCount?d instanceof m.Eq?(0,v.s)(t,d,255):d instanceof m.XP?(0,x.c)(t,d):d instanceof m.Uz&&(0,v.s)(t,d,1/256):(t.fill(255),d instanceof m.xs?(0,p.s)(t,d.typedBuffer,255,4,d.typedBufferStride):e.attributes.color instanceof m.eI?(0,_.c)(t,d.typedBuffer,4,e.attributes.color.typedBufferStride):e.attributes.color instanceof m.nS&&(0,p.s)(t,d.typedBuffer,1/256,4,d.typedBufferStride)),c.push([ae.r.COLOR,new F.n(t,i,4,!0)])}return{geometry:new se(t,c),vertexCount:r}}(e,null!=i?i:new br({})),M=s.boundingInfo;null!=M&&0===w&&((0,h.iT)(E,M.bbMin),(0,h.iT)(E,M.bbMax)),null!=i&&(O.stageResources.geometries.push(s),O.numberOfVertices+=b)})),C||s.push(O)})),{engineResources:s,referenceBoundingBox:E}}(a,O,I,t.skipHighLods&&null==r.specifiedLodIndex?{skipHighLods:!0}:{skipHighLods:!1,singleLodIndex:r.specifiedLodIndex});return{lods:R,referenceBoundingBox:N,isEsriSymbolResource:a.meta.isEsriSymbolResource,isWosr:!1}}const Gr=(0,a.vt)()},48549:(e,t,r)=>{r.d(t,{BP:()=>l,l5:()=>c});var i=r(88105),n=r(6381),o=r(86994);class a{constructor(e,t){this.layout=e,this.buffer="number"==typeof t?new ArrayBuffer(t*e.stride):t;for(const r of e.fields.keys()){const t=e.fields.get(r);this[r]=new t.constructor(this.buffer,t.offset,this.stride)}}get stride(){return this.layout.stride}get count(){return this.buffer.byteLength/this.stride}get byteLength(){return this.buffer.byteLength}getField(e,t){const r=this[e];return r&&r.elementCount===t.ElementCount&&r.elementType===t.ElementType?r:null}slice(e,t){return new a(this.layout,this.buffer.slice(e*this.stride,t*this.stride))}copyFrom(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e.count;const n=this.stride;if(n%4==0){const o=new Uint32Array(e.buffer,t*n,i*n/4);new Uint32Array(this.buffer,r*n,i*n/4).set(o)}else{const o=new Uint8Array(e.buffer,t*n,i*n);new Uint8Array(this.buffer,r*n,i*n).set(o)}return this}get usedMemory(){return this.byteLength}dispose(){}}class s{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this._stride=0,this._lastAligned=0,this._fields=new Map,e&&(this._stride=e.stride,e.fields.forEach((e=>this._fields.set(e[0],{...e[1],constructor:h(e[1].constructor)}))))}freeze(){return this}vec2f(e,t){return this._appendField(e,i.gH,t),this}vec2f64(e,t){return this._appendField(e,i.si,t),this}vec3f(e,t){return this._appendField(e,i.xs,t),this}vec3f64(e,t){return this._appendField(e,i.Xm,t),this}vec4f(e,t){return this._appendField(e,i.Eq,t),this}vec4f64(e,t){return this._appendField(e,i.Aj,t),this}mat3f(e,t){return this._appendField(e,i.jZ,t),this}mat3f64(e,t){return this._appendField(e,i.j0,t),this}mat4f(e,t){return this._appendField(e,i.Sx,t),this}mat4f64(e,t){return this._appendField(e,i.E$,t),this}vec4u8(e,t){return this._appendField(e,i.XP,t),this}f32(e,t){return this._appendField(e,i.Y$,t),this}f64(e,t){return this._appendField(e,i.qB,t),this}u8(e,t){return this._appendField(e,i.SL,t),this}u16(e,t){return this._appendField(e,i.h,t),this}i8(e,t){return this._appendField(e,i.bf,t),this}vec2i8(e,t){return this._appendField(e,i.D6,t),this}vec2i16(e,t){return this._appendField(e,i.mJ,t),this}vec2u8(e,t){return this._appendField(e,i.LC,t),this}vec4u16(e,t){return this._appendField(e,i.Uz,t),this}u32(e,t){return this._appendField(e,i.P,t),this}_appendField(e,t,r){if(this._fields.has(e))return void(0,o.vA)(!1,`${e} already added to vertex buffer layout`);const i=t.ElementCount*(0,n.GJ)(t.ElementType),a=this._stride;this._stride+=i,this._fields.set(e,{size:i,constructor:t,offset:a,optional:r})}createBuffer(e){return new a(this,e)}createView(e){return new a(this,e)}clone(){const e=new s;return e._stride=this._stride,e._fields=new Map,this._fields.forEach(((t,r)=>e._fields.set(r,t))),e.BufferType=this.BufferType,e}get stride(){if(this._lastAligned!==this._fields.size){let e=1;this._fields.forEach((t=>e=Math.max(e,(0,n.GJ)(t.constructor.ElementType)))),this._stride=Math.floor((this._stride+e-1)/e)*e,this._lastAligned=this._fields.size}return this._stride}get fields(){return this._fields}}function l(){return new s}class c{constructor(e){this.fields=new Array,e.fields.forEach(((e,t)=>{const r={...e,constructor:u(e.constructor)};this.fields.push([t,r])})),this.stride=e.stride}}const d=[i.Y$,i.gH,i.xs,i.Eq,i.jZ,i.Sx,i.qB,i.si,i.Xm,i.Aj,i.j0,i.E$,i.SL,i.LC,i.eI,i.XP,i.h,i.Yi,i.nS,i.Uz,i.P,i.An,i.H$,i.ml,i.bf,i.D6,i.m8,i.TX,i.Qt,i.mJ,i.Vp,i.E7,i.My,i.UL,i.zD,i.Y4];function u(e){return`${e.ElementType}_${e.ElementCount}`}function h(e){return f.get(e)}const f=new Map;d.forEach((e=>f.set(u(e),e)))},72412:(e,t,r)=>{r.d(t,{i$:()=>c,oD:()=>d,xJ:()=>l});var i=r(34981),n=r(36358),o=r(95756),a=r(64839);function s(e){e.varyings.add("linearDepth","float")}function l(e){e.vertex.uniforms.add(new o.G("nearFar",((e,t)=>t.camera.nearFar)))}function c(e){e.vertex.code.add(a.H`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function d(e,t){const{vertex:r}=e;switch(t.output){case i.V.Color:if(t.receiveShadows)return s(e),void r.code.add(a.H`void forwardLinearDepth() { linearDepth = gl_Position.w; }`);break;case i.V.Shadow:case i.V.ShadowHighlight:case i.V.ShadowExcludeHighlight:case i.V.ViewshedShadow:return e.include(n.em,t),s(e),l(e),c(e),void r.code.add(a.H`void forwardLinearDepth() {
linearDepth = calculateLinearDepth(nearFar, vPosition_view.z);
}`)}r.code.add(a.H`void forwardLinearDepth() {}`)}},62026:(e,t,r)=>{r.d(t,{M:()=>n});var i=r(64839);function n(e){e.vertex.code.add(i.H`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}},73398:(e,t,r)=>{r.d(t,{c:()=>o});var i=r(64839),n=r(66470);function o(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];e.attributes.add(n.r.POSITION,"vec2"),t&&e.varyings.add("uv","vec2"),e.vertex.code.add(i.H`
    void main(void) {
      gl_Position = vec4(position, 0.0, 1.0);
      ${t?i.H`uv = position * 0.5 + vec2(0.5);`:""}
    }
  `)}},26917:(e,t,r)=>{r.d(t,{HQ:()=>c});var i=r(34761),n=r(13191),o=r(20664),a=r(9392),s=r(72468),l=(r(5517),r(64839));l.Y;function c(e,t){d(e,t,new s.W("slicePlaneOrigin",((e,r)=>m(t,e,r))),new s.W("slicePlaneBasis1",((e,r)=>p(t,e,r,r.slicePlane?.basis1))),new s.W("slicePlaneBasis2",((e,r)=>p(t,e,r,r.slicePlane?.basis2))))}function d(e,t){if(!t.hasSlicePlane){const r=l.H`#define rejectBySlice(_pos_) false
#define discardBySlice(_pos_) {}
#define highlightSlice(_color_, _pos_) (_color_)`;return t.hasSliceInVertexProgram&&e.vertex.code.add(r),void e.fragment.code.add(r)}for(var r=arguments.length,i=new Array(r>2?r-2:0),n=2;n<r;n++)i[n-2]=arguments[n];t.hasSliceInVertexProgram&&e.vertex.uniforms.add(...i),e.fragment.uniforms.add(...i);const o=l.H`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool sliceByPlane(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}
#define rejectBySlice(_pos_) sliceByPlane(_pos_)
#define discardBySlice(_pos_) { if (sliceByPlane(_pos_)) discard; }`,a=l.H`vec4 applySliceHighlight(vec4 color, vec3 pos) {
SliceFactors factors = calculateSliceFactors(pos);
const float HIGHLIGHT_WIDTH = 1.0;
const vec4 HIGHLIGHT_COLOR = vec4(0.0, 0.0, 0.0, 0.3);
factors.front /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.front);
factors.side0 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side0);
factors.side1 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side1);
factors.side2 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side2);
factors.side3 /= (2.0 * HIGHLIGHT_WIDTH) * fwidth(factors.side3);
if (sliceByFactors(factors)) {
return color;
}
float highlightFactor = (1.0 - step(0.5, factors.front))
* (1.0 - step(0.5, factors.side0))
* (1.0 - step(0.5, factors.side1))
* (1.0 - step(0.5, factors.side2))
* (1.0 - step(0.5, factors.side3));
return mix(color, vec4(HIGHLIGHT_COLOR.rgb, color.a), highlightFactor * HIGHLIGHT_COLOR.a);
}`,s=t.hasSliceHighlight?l.H`
        ${a}
        #define highlightSlice(_color_, _pos_) (sliceEnabled() ? applySliceHighlight(_color_, _pos_) : (_color_))
      `:l.H`#define highlightSlice(_color_, _pos_) (_color_)`;t.hasSliceInVertexProgram&&e.vertex.code.add(o),e.fragment.code.add(o),e.fragment.code.add(s)}function u(e,t,r){return e.instancedDoublePrecision?(0,o.s)(v,r.camera.viewInverseTransposeMatrix[3],r.camera.viewInverseTransposeMatrix[7],r.camera.viewInverseTransposeMatrix[11]):t.slicePlaneLocalOrigin}function h(e,t){return null!=e?(0,o.f)(g,t.origin,e):t.origin}function f(e,t,r){return e.hasSliceTranslatedView?null!=t?(0,i.Tl)(x,r.camera.viewMatrix,t):r.camera.viewMatrix:null}function m(e,t,r){if(null==r.slicePlane)return a.uY;const i=u(e,t,r),n=h(i,r.slicePlane),s=f(e,i,r);return null!=s?(0,o.h)(g,n,s):n}function p(e,t,r,i){if(null==i||null==r.slicePlane)return a.uY;const n=u(e,t,r),s=h(n,r.slicePlane),l=f(e,n,r);return null!=l?((0,o.g)(_,i,s),(0,o.h)(g,s,l),(0,o.h)(_,_,l),(0,o.f)(_,_,g)):i}const v=(0,a.vt)(),g=(0,a.vt)(),_=(0,a.vt)(),x=(0,n.vt)()},59395:(e,t,r)=>{r.d(t,{d:()=>o});var i=r(72412),n=r(64839);function o(e){(0,i.i$)(e),e.vertex.code.add(n.H`vec4 transformPositionWithDepth(mat4 proj, mat4 view, vec3 pos, vec2 nearFar, out float depth) {
vec4 eye = view * vec4(pos, 1.0);
depth = calculateLinearDepth(nearFar,eye.z);
return proj * eye;
}`),e.vertex.code.add(n.H`vec4 transformPosition(mat4 proj, mat4 view, vec3 pos) {
return proj * (view * vec4(pos, 1.0));
}`)}},45937:(e,t,r)=>{r.d(t,{BK:()=>b,nW:()=>x});var i=r(35143),n=r(63919),o=r(44680),a=r(13191),s=r(20664),l=r(9392),c=r(34981),d=r(89299),u=r(42451),h=r(72468),f=r(64839),m=r(72106),p=r(43425),v=r(99415),g=r(66470),_=r(99643);class x extends v.K{constructor(){super(...arguments),this.instancedDoublePrecision=!1,this.hasModelTransformation=!1}}(0,i._)([(0,v.W)()],x.prototype,"instancedDoublePrecision",void 0),(0,i._)([(0,v.W)()],x.prototype,"hasModelTransformation",void 0);f.Y;const T=(0,o.vt)();function b(e,t){const r=t.hasModelTransformation,i=t.instancedDoublePrecision;r&&(e.vertex.uniforms.add(new p.X("model",(e=>e.modelTransformation??a.zK))),e.vertex.uniforms.add(new m.k("normalLocalOriginFromModel",(e=>((0,n.Ge)(T,e.modelTransformation??a.zK),T))))),t.instanced&&i&&(e.attributes.add(g.r.INSTANCEMODELORIGINHI,"vec3"),e.attributes.add(g.r.INSTANCEMODELORIGINLO,"vec3"),e.attributes.add(g.r.INSTANCEMODEL,"mat3"),e.attributes.add(g.r.INSTANCEMODELNORMAL,"mat3"));const o=e.vertex;i&&(o.include(d.u,t),o.uniforms.add(new h.W("viewOriginHi",((e,t)=>(0,_.Zo)((0,s.s)(y,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),y))),new h.W("viewOriginLo",((e,t)=>(0,_.jA)((0,s.s)(y,t.camera.viewInverseTransposeMatrix[3],t.camera.viewInverseTransposeMatrix[7],t.camera.viewInverseTransposeMatrix[11]),y))))),o.code.add(f.H`
    vec3 getVertexInLocalOriginSpace() {
      return ${r?i?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":i?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${i?f.H`
          // Negated inputs are intentionally the first two arguments. The other way around the obfuscation in dpAdd() stopped
          // working for macOS 14+ and iOS 17+.
          // Issue: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(-instanceModelOriginHi, -instanceModelOriginLo, viewOriginHi, viewOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }
    `),o.code.add(f.H`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${r?i?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":i?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
    `),t.output===c.V.Normal&&((0,u.S7)(o),o.code.add(f.H`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${r?i?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":i?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `)),t.hasVertexTangents&&o.code.add(f.H`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${r?i?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":i?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}const y=(0,l.vt)()},838:(e,t,r)=>{r.d(t,{I:()=>o});var i=r(64839),n=r(66470);function o(e){e.attributes.add(n.r.POSITION,"vec3"),e.vertex.code.add(i.H`vec3 positionModel() { return position; }`)}},22148:(e,t,r)=>{r.d(t,{K:()=>l});var i=r(59581),n=r(72790),o=r(64839),a=r(66470),s=r(25814);function l(e,t){t.hasSymbolColors?(e.include(i.A),e.attributes.add(a.r.SYMBOLCOLOR,"vec4"),e.varyings.add("colorMixMode","mediump float"),e.vertex.code.add(o.H`int symbolColorMixMode;
vec4 getSymbolColor() {
return decodeSymbolColor(symbolColor, symbolColorMixMode) * 0.003921568627451;
}
void forwardColorMixMode() {
colorMixMode = float(symbolColorMixMode) + 0.5;
}`)):(e.fragment.uniforms.add(new n.c("colorMixMode",(e=>s.Um[e.colorMixMode]))),e.vertex.code.add(o.H`vec4 getSymbolColor() { return vec4(1.0); }
void forwardColorMixMode() {}`))}},97808:(e,t,r)=>{r.d(t,{U:()=>s,q:()=>i});var i,n=r(4212),o=r(64839),a=r(66470);function s(e,t){switch(t.textureCoordinateType){case i.Default:return e.attributes.add(a.r.UV0,"vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(o.H`void forwardTextureCoordinates() {
vuv0 = uv0;
}`);case i.Compressed:return e.attributes.add(a.r.UV0,"vec2"),e.varyings.add("vuv0","vec2"),void e.vertex.code.add(o.H`vec2 getUV0() {
return uv0 / 16384.0;
}
void forwardTextureCoordinates() {
vuv0 = getUV0();
}`);case i.Atlas:return e.attributes.add(a.r.UV0,"vec2"),e.varyings.add("vuv0","vec2"),e.attributes.add(a.r.UVREGION,"vec4"),e.varyings.add("vuvRegion","vec4"),void e.vertex.code.add(o.H`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);default:(0,n.Xb)(t.textureCoordinateType);case i.None:return void e.vertex.code.add(o.H`void forwardTextureCoordinates() {}`);case i.COUNT:return}}!function(e){e[e.None=0]="None",e[e.Default=1]="Default",e[e.Atlas=2]="Atlas",e[e.Compressed=3]="Compressed",e[e.COUNT=4]="COUNT"}(i||(i={}))},54478:(e,t,r)=>{r.d(t,{c:()=>o});var i=r(64839),n=r(66470);function o(e,t){t.hasVertexColors?(e.attributes.add(n.r.COLOR,"vec4"),e.varyings.add("vColor","vec4"),e.vertex.code.add(i.H`void forwardVertexColor() { vColor = color; }`),e.vertex.code.add(i.H`void forwardNormalizedVertexColor() { vColor = color * 0.003921568627451; }`)):e.vertex.code.add(i.H`void forwardVertexColor() {}
void forwardNormalizedVertexColor() {}`)}},55386:(e,t,r)=>{r.d(t,{Mh:()=>u,Zo:()=>h,gy:()=>f});var i=r(4212),n=r(44680),o=r(55855),a=r(59046),s=r(36358),l=r(64839),c=r(42759),d=r(72106);function u(e,t){switch(t.normalType){case a.W.Attribute:case a.W.Compressed:e.include(a.Y,t),e.varyings.add("vNormalWorld","vec3"),e.varyings.add("vNormalView","vec3"),e.vertex.uniforms.add(new c.h("transformNormalGlobalFromModel",(e=>e.transformNormalGlobalFromModel)),new d.k("transformNormalViewFromGlobal",(e=>e.transformNormalViewFromGlobal))),e.vertex.code.add(l.H`void forwardNormal() {
vNormalWorld = transformNormalGlobalFromModel * normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case a.W.Ground:e.include(s.em,t),e.varyings.add("vNormalWorld","vec3"),e.vertex.code.add(l.H`
        void forwardNormal() {
          vNormalWorld = ${t.spherical?l.H`normalize(vPositionWorldCameraRelative);`:l.H`vec3(0.0, 0.0, 1.0);`}
        }
        `);break;case a.W.ScreenDerivative:e.vertex.code.add(l.H`void forwardNormal() {}`);break;default:(0,i.Xb)(t.normalType);case a.W.COUNT:}}class h extends s.dO{constructor(){super(...arguments),this.transformNormalViewFromGlobal=(0,n.vt)()}}class f extends s.EM{constructor(){super(...arguments),this.transformNormalGlobalFromModel=(0,n.vt)(),this.toMapSpace=(0,o.vt)()}}},36358:(e,t,r)=>{r.d(t,{EM:()=>v,dO:()=>p,em:()=>m});var i=r(44680),n=r(13191),o=r(9392),a=r(838),s=r(89299),l=r(72468),c=r(5517),d=r(64839),u=r(42759),h=r(72106),f=r(43425);function m(e,t){e.include(a.I);const r=e.vertex;r.include(s.u,t),e.varyings.add("vPositionWorldCameraRelative","vec3"),e.varyings.add("vPosition_view","vec3"),r.uniforms.add(new c.t("transformWorldFromViewTH",(e=>e.transformWorldFromViewTH)),new c.t("transformWorldFromViewTL",(e=>e.transformWorldFromViewTL)),new h.k("transformViewFromCameraRelativeRS",(e=>e.transformViewFromCameraRelativeRS)),new f.X("transformProjFromView",(e=>e.transformProjFromView)),new u.h("transformWorldFromModelRS",(e=>e.transformWorldFromModelRS)),new l.W("transformWorldFromModelTH",(e=>e.transformWorldFromModelTH)),new l.W("transformWorldFromModelTL",(e=>e.transformWorldFromModelTL))),r.code.add(d.H`vec3 positionWorldCameraRelative() {
vec3 rotatedModelPosition = transformWorldFromModelRS * positionModel();
vec3 transform_CameraRelativeFromModel = dpAdd(
transformWorldFromModelTL,
transformWorldFromModelTH,
-transformWorldFromViewTL,
-transformWorldFromViewTH
);
return transform_CameraRelativeFromModel + rotatedModelPosition;
}`),r.code.add(d.H`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${t.spherical?d.H`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:d.H`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),e.fragment.uniforms.add(new c.t("transformWorldFromViewTL",(e=>e.transformWorldFromViewTL))),r.code.add(d.H`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),e.fragment.code.add(d.H`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}class p extends d.Y{constructor(){super(...arguments),this.transformWorldFromViewTH=(0,o.vt)(),this.transformWorldFromViewTL=(0,o.vt)(),this.transformViewFromCameraRelativeRS=(0,i.vt)(),this.transformProjFromView=(0,n.vt)()}}class v extends d.Y{constructor(){super(...arguments),this.transformWorldFromModelRS=(0,i.vt)(),this.transformWorldFromModelTH=(0,o.vt)(),this.transformWorldFromModelTL=(0,o.vt)()}}},95352:(e,t,r)=>{r.d(t,{r:()=>s});var i=r(4212),n=r(97808),o=r(64839);function a(e){e.fragment.code.add(o.H`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function s(e,t){switch(e.include(n.U,t),t.textureCoordinateType){case n.q.Default:case n.q.Compressed:return void e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, vec2 uv) {
return texture(tex, uv);
}`);case n.q.Atlas:return e.include(a),void e.fragment.code.add(o.H`vec4 textureLookup(sampler2D tex, vec2 uv) {
return textureAtlasLookup(tex, uv, vuvRegion);
}`);default:(0,i.Xb)(t.textureCoordinateType);case n.q.None:case n.q.COUNT:return}}},64436:(e,t,r)=>{r.d(t,{G:()=>m});var i=r(43047),n=r(55855),o=r(20664),a=r(9392),s=r(5517),l=r(64839);function c(e){e.vertex.code.add(l.H`float screenSizePerspectiveViewAngleDependentFactor(float absCosAngle) {
return absCosAngle * absCosAngle * absCosAngle;
}`),e.vertex.code.add(l.H`vec3 screenSizePerspectiveScaleFactor(float absCosAngle, float distanceToCamera, vec3 params) {
return vec3(
min(params.x / (distanceToCamera - params.y), 1.0),
screenSizePerspectiveViewAngleDependentFactor(absCosAngle),
params.z
);
}`),e.vertex.code.add(l.H`float applyScreenSizePerspectiveScaleFactorFloat(float size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(l.H`float screenSizePerspectiveScaleFloat(float size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorFloat(
size,
screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params)
);
}`),e.vertex.code.add(l.H`vec2 applyScreenSizePerspectiveScaleFactorVec2(vec2 size, vec3 factor) {
return mix(size * clamp(factor.x, factor.z, 1.0), size, factor.y);
}`),e.vertex.code.add(l.H`vec2 screenSizePerspectiveScaleVec2(vec2 size, float absCosAngle, float distanceToCamera, vec3 params) {
return applyScreenSizePerspectiveScaleFactorVec2(size, screenSizePerspectiveScaleFactor(absCosAngle, distanceToCamera, params));
}`)}function d(e){return(0,o.s)(u,e.parameters.divisor,e.parameters.offset,e.minScaleFactor)}const u=(0,a.vt)();var h=r(42451),f=r(58350);function m(e,t){const r=e.vertex;t.hasVerticalOffset?(function(e){e.uniforms.add(new f.E("verticalOffset",((e,t)=>{const{minWorldLength:r,maxWorldLength:n,screenLength:o}=e.verticalOffset,a=Math.tan(.5*t.camera.fovY)/(.5*t.camera.fullViewport[3]),s=t.camera.pixelRatio||1;return(0,i.s)(p,o*s,a,r,n)})))}(r),t.hasScreenSizePerspective&&(e.include(c),function(e){e.uniforms.add(new s.t("screenSizePerspectiveAlignment",(e=>d(e.screenSizePerspectiveAlignment||e.screenSizePerspective))))}(r),(0,h.yu)(e.vertex,t)),r.code.add(l.H`
      vec3 calculateVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        float viewDistance = length((view * vec4(worldPos, 1.0)).xyz);
        ${t.spherical?l.H`vec3 worldNormal = normalize(worldPos + localOrigin);`:l.H`vec3 worldNormal = vec3(0.0, 0.0, 1.0);`}
        ${t.hasScreenSizePerspective?l.H`
            float cosAngle = dot(worldNormal, normalize(worldPos - cameraPosition));
            float verticalOffsetScreenHeight = screenSizePerspectiveScaleFloat(verticalOffset.x, abs(cosAngle), viewDistance, screenSizePerspectiveAlignment);`:l.H`
            float verticalOffsetScreenHeight = verticalOffset.x;`}
        // Screen sized offset in world space, used for example for line callouts
        float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * viewDistance, verticalOffset.z, verticalOffset.w);
        return worldNormal * worldOffset;
      }

      vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) {
        return worldPos + calculateVerticalOffset(worldPos, localOrigin);
      }
    `)):r.code.add(l.H`vec3 addVerticalOffset(vec3 worldPos, vec3 localOrigin) { return worldPos; }`)}const p=(0,n.vt)()},53762:(e,t,r)=>{r.d(t,{E:()=>E});var i=r(72412),n=r(34981),o=r(26917),a=r(59395),s=r(59046),l=r(64839),c=r(66470);function d(e,t){const r=t.output===n.V.ObjectAndLayerIdColor,i=t.objectAndLayerIdColorInstanced;r&&(e.varyings.add("objectAndLayerIdColorVarying","vec4"),i?e.attributes.add(c.r.INSTANCEOBJECTANDLAYERIDCOLOR,"vec4"):e.attributes.add(c.r.OBJECTANDLAYERIDCOLOR,"vec4")),e.vertex.code.add(l.H`
     void forwardObjectAndLayerIdColor() {
      ${r?i?l.H`objectAndLayerIdColorVarying = instanceObjectAndLayerIdColor * 0.003921568627451;`:l.H`objectAndLayerIdColorVarying = objectAndLayerIdColor * 0.003921568627451;`:l.H``} }`),e.fragment.code.add(l.H`
      void outputObjectAndLayerIdColor() {
        ${r?l.H`fragColor = objectAndLayerIdColorVarying;`:l.H``} }`)}var u=r(97808),h=r(55386),f=r(87572);function m(e,t){switch(t.output){case n.V.Shadow:case n.V.ShadowHighlight:case n.V.ShadowExcludeHighlight:case n.V.ViewshedShadow:e.fragment.include(f.U),e.fragment.code.add(l.H`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth) {
fragColor = floatToRgba4(_calculateFragDepth(_linearDepth));
}`)}}var p=r(55855),v=r(70367);const g=(0,p.fA)(1,1,0,1),_=(0,p.fA)(1,0,1,1);function x(e){e.fragment.uniforms.add(new v.N("depthTexture",((e,t)=>t.mainDepth))),e.fragment.constants.add("occludedHighlightFlag","vec4",g).add("unoccludedHighlightFlag","vec4",_),e.fragment.code.add(l.H`void outputHighlight() {
float sceneDepth = float(texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x);
if (gl_FragCoord.z > sceneDepth + 5e-7) {
fragColor = occludedHighlightFlag;
} else {
fragColor = unoccludedHighlightFlag;
}
}`)}var T=r(27969),b=r(99774),y=r(42451),A=r(83490);function E(e,t){const{vertex:r,fragment:c}=e,f=t.hasColorTexture&&t.alphaDiscardMode!==A.sf.Opaque;switch(t.output){case n.V.Depth:(0,y.NB)(r,t),e.include(a.d,t),e.include(o.HQ,t),e.include(u.U,t),f&&c.uniforms.add(new v.N("tex",(e=>e.texture))),r.code.add(l.H`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),e.include(b.S,t),c.code.add(l.H`
          void main(void) {
            discardBySlice(vpos);
            ${f?l.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?l.H`colorUV`:l.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
          }
        `);break;case n.V.Shadow:case n.V.ShadowHighlight:case n.V.ShadowExcludeHighlight:case n.V.ViewshedShadow:case n.V.ObjectAndLayerIdColor:(0,y.NB)(r,t),e.include(a.d,t),e.include(u.U,t),e.include(T.A,t),e.include(m,t),e.include(o.HQ,t),e.include(d,t),(0,i.xJ)(e),e.varyings.add("depth","float"),f&&c.uniforms.add(new v.N("tex",(e=>e.texture))),r.code.add(l.H`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();
}`),e.include(b.S,t),c.code.add(l.H`
          void main(void) {
            discardBySlice(vpos);
            ${f?l.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?l.H`colorUV`:l.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            ${t.output===n.V.ObjectAndLayerIdColor?l.H`outputObjectAndLayerIdColor();`:l.H`outputDepth(depth);`}
          }
        `);break;case n.V.Normal:{(0,y.NB)(r,t),e.include(a.d,t),e.include(s.Y,t),e.include(h.Mh,t),e.include(u.U,t),e.include(T.A,t),f&&c.uniforms.add(new v.N("tex",(e=>e.texture))),t.normalType===s.W.ScreenDerivative&&e.varyings.add("vPositionView","vec3");const i=t.normalType===s.W.Attribute||t.normalType===s.W.Compressed;r.code.add(l.H`
          void main(void) {
            vpos = getVertexInLocalOriginSpace();

            ${i?l.H`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:l.H`
                  // Get vertex position in camera space for screen-space derivative normals
                  vPositionView = (view * vec4(vpos, 1.0)).xyz;
                `}
            vpos = subtractOrigin(vpos);
            vpos = addVerticalOffset(vpos, localOrigin);
            gl_Position = transformPosition(proj, view, vpos);
            forwardTextureCoordinates();
          }
        `),e.include(o.HQ,t),e.include(b.S,t),c.code.add(l.H`
          void main() {
            discardBySlice(vpos);
            ${f?l.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?l.H`colorUV`:l.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}

            ${t.normalType===s.W.ScreenDerivative?l.H`vec3 normal = screenDerivativeNormal(vPositionView);`:l.H`
                  vec3 normal = normalize(vNormalWorld);
                  if (gl_FrontFacing == false){
                    normal = -normal;
                  }`}
            fragColor = vec4(0.5 + 0.5 * normal, 1.0);
          }
        `);break}case n.V.Highlight:(0,y.NB)(r,t),e.include(a.d,t),e.include(u.U,t),e.include(T.A,t),f&&c.uniforms.add(new v.N("tex",(e=>e.texture))),r.code.add(l.H`void main(void) {
vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();
}`),e.include(o.HQ,t),e.include(b.S,t),e.include(x,t),c.code.add(l.H`
          void main() {
            discardBySlice(vpos);
            ${f?l.H`
                    vec4 texColor = texture(tex, ${t.hasColorTextureTransform?l.H`colorUV`:l.H`vuv0`});
                    discardOrAdjustAlpha(texColor);`:""}
            outputHighlight();
          }
        `)}}},65058:(e,t,r)=>{r.d(t,{E:()=>s});var i=r(19555),n=r(72745),o=(r(81449),r(95756)),a=r(64839);function s(e){e.uniforms.add(new o.G("zProjectionMap",((e,t)=>function(e){const t=e.projectionMatrix;return(0,i.hZ)(l,t[14],t[10])}(t.camera)))),e.code.add(a.H`float linearizeDepth(float depth) {
float depthNdc = depth * 2.0 - 1.0;
float c1 = zProjectionMap[0];
float c2 = zProjectionMap[1];
return -(c1 / (depthNdc + c2 + 1e-7));
}`),e.code.add(a.H`float depthFromTexture(sampler2D depthTexture, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthTexture, 0)));
float depth = texelFetch(depthTexture, iuv, 0).r;
return depth;
}`),e.code.add(a.H`float linearDepthFromTexture(sampler2D depthTexture, vec2 uv) {
return linearizeDepth(depthFromTexture(depthTexture, uv));
}`)}const l=(0,n.vt)()},72937:(e,t,r)=>{r.d(t,{W:()=>p});var i=r(44680),n=r(72745),o=r(97808),a=r(95352),s=r(27920),l=r(95756),c=r(64839),d=r(72106),u=r(27374),h=r(70367),f=r(24245),m=r(66470);function p(e,t){const r=e.fragment;t.hasVertexTangents?(e.attributes.add(m.r.TANGENT,"vec4"),e.varyings.add("vTangent","vec4"),t.doubleSidedMode===s.W.WindingOrder?r.code.add(c.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):r.code.add(c.H`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):r.code.add(c.H`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),t.textureCoordinateType!==o.q.None&&(e.include(a.r,t),r.uniforms.add(t.pbrTextureBindType===f.c.Pass?new h.N("normalTexture",(e=>e.textureNormal)):new u.o("normalTexture",(e=>e.textureNormal))),t.hasNormalTextureTransform&&(r.uniforms.add(new l.G("scale",(e=>e.scale??n.Un))),r.uniforms.add(new d.k("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??i.zK)))),r.code.add(c.H`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),t.hasNormalTextureTransform&&r.code.add(c.H`mat3 normalTextureRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalTextureRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),r.code.add(c.H`return tangentSpace * rawNormal;
}`))}},20770:(e,t,r)=>{r.d(t,{n:()=>W});var i,n,o,a=r(64839),s=r(70367),l=r(35143),c=r(15941),d=r(30726),u=r(68134),h=r(91417),f=r(46053),m=(r(81806),r(76460),r(47249),r(85842)),p=r(19555);(o=i||(i={}))[o.RED=0]="RED",o[o.RG=1]="RG",o[o.RGBA4=2]="RGBA4",o[o.RGBA=3]="RGBA",o[o.RGBA_MIPMAP=4]="RGBA_MIPMAP",o[o.R16F=5]="R16F",o[o.RGBA16F=6]="RGBA16F",function(e){e[e.DEPTH_STENCIL_TEXTURE=0]="DEPTH_STENCIL_TEXTURE",e[e.DEPTH16_BUFFER=1]="DEPTH16_BUFFER"}(n||(n={}));var v=r(91967),g=r(50076),_=r(83490);let x=class extends v.A{constructor(e){super(e),this.view=null,this.consumes={required:[]},this.produces="composite-color",this._context=null,this._dirty=!0}initialize(){this.addHandles([(0,u.wB)((()=>this.view.ready),(e=>{e&&this.view._stage?.renderer.addRenderNode(this)}),u.Vh)])}destroy(){this.view._stage?.renderer?.removeRenderNode(this)}render(){throw new g.A("RenderNode:render-function-not-implemented","render() is not implemented.")}get camera(){return this.view.state.camera.clone()}get sunLight(){return this.bindParameters.lighting.legacy}get gl(){return this.view._stage.renderView.renderingContext.gl}acquireOutputFramebuffer(){const e=this._frameBuffer?.getTexture()?.descriptor,t=this.view._stage.renderer.fboCache.acquire(e?.width??640,e?.height??480,this.produces);return t.fbo?.initializeAndBind(),t}bindRenderTarget(){return this._frameBuffer?.fbo?.initializeAndBind(),this._frameBuffer}requestRender(e){e===_.C7.UPDATE&&this.view._stage?.renderView.requestRender(e),this._dirty=!0}resetWebGLState(){this.renderingContext.resetState(),this.renderingContext.bindFramebuffer(this._frameBuffer?.fbo)}get fboCache(){return this.view._stage.renderer.fboCache}get bindParameters(){return this._context.bindParameters}get renderingContext(){return this.view._stage.renderView.renderingContext}updateAnimation(){return!!this._dirty&&(this._dirty=!1,!0)}doRender(e,t){this._context=t,this._frameBuffer=e.find((e=>{let{name:t}=e;return t===this.produces}));try{return this.render(e)}finally{this._frameBuffer=null}}};(0,l._)([(0,f.MZ)({constructOnly:!0})],x.prototype,"view",void 0),(0,l._)([(0,f.MZ)({constructOnly:!0})],x.prototype,"consumes",void 0),(0,l._)([(0,f.MZ)()],x.prototype,"produces",void 0),x=(0,l._)([(0,m.$)("esri.views.3d.webgl.RenderNode")],x);const T=x,b=5e5;var y=r(16506),A=r(42693),E=r(32119),S=r(28584),w=r(29228),M=r(57162);class C extends A.w{initializeProgram(e){return new S.B(e.rctx,C.shader.get().build(),E.D)}initializePipeline(){return(0,M.Ey)({colorWrite:M.wE})}}C.shader=new y.$(w.S,(()=>r.e(1538).then(r.bind(r,91538))));var O=r(72745);class I extends a.Y{constructor(){super(...arguments),this.projScale=1}}class R extends I{constructor(){super(...arguments),this.intensity=1}}class N extends a.Y{}class P extends N{constructor(){super(...arguments),this.blurSize=(0,O.vt)()}}var L=r(51331);class H extends A.w{initializeProgram(e){return new S.B(e.rctx,H.shader.get().build(),E.D)}initializePipeline(){return(0,M.Ey)({colorWrite:M.wE})}}H.shader=new y.$(L.S,(()=>r.e(3185).then(r.bind(r,43185))));var D=r(93345),B=r(98433),F=r(96673);const z=2;let V=class extends T{constructor(e){super(e),this.consumes={required:["normals"]},this.produces="ssao",this.isEnabled=()=>!1,this._enableTime=(0,h.l5)(0),this._passParameters=new R,this._drawParameters=new P}initialize(){const e=Uint8Array.from(atob("eXKEvZaUc66cjIKElE1jlJ6MjJ6Ufkl+jn2fcXp5jBx7c6KEflSGiXuXeW6OWs+tfqZ2Yot2Y7Zzfo2BhniEj3xoiXuXj4eGZpqEaHKDWjSMe7palFlzc3BziYOGlFVzg6Zzg7CUY5JrjFF7eYJ4jIKEcyyEonSXe7qUfqZ7j3xofqZ2c4R5lFZ5Y0WUbppoe1l2cIh2ezyUho+BcHN2cG6DbpqJhqp2e1GcezhrdldzjFGUcyxjc3aRjDyEc1h7Sl17c6aMjH92pb6Mjpd4dnqBjMOEhqZleIOBYzB7gYx+fnqGjJuEkWlwnCx7fGl+c4hjfGyRe5qMlNOMfnqGhIWHc6OMi4GDc6aMfqZuc6aMzqJzlKZ+lJ6Me3qRfoFue0WUhoR5UraEa6qMkXiPjMOMlJOGe7JrUqKMjK6MeYRzdod+Sl17boiPc6qEeYBlcIh2c1WEe7GDiWCDa0WMjEmMdod+Y0WcdntzhmN8WjyMjKJjiXtzgYxYaGd+a89zlEV7e2GJfnd+lF1rcK5zc4p5cHuBhL6EcXp5eYB7fnh8iX6HjIKEeaxuiYOGc66RfG2Ja5hzjlGMjEmMe9OEgXuPfHyGhPeEdl6JY02McGuMfnqGhFiMa3WJfnx2l4hwcG1uhmN8c0WMc39og1GBbrCEjE2EZY+JcIh2cIuGhIWHe0mEhIVrc09+gY5+eYBlnCyMhGCDl3drfmmMgX15aGd+gYx+fnuRfnhzY1SMsluJfnd+hm98WtNrcIuGh4SEj0qPdkqOjFF7jNNjdnqBgaqUjMt7boeBhnZ4jDR7c5pze4GGjEFrhLqMjHyMc0mUhKZze4WEa117kWlwbpqJjHZ2eX2Bc09zeId+e0V7WlF7jHJ2l72BfId8l3eBgXyBe897jGl7c66cgW+Xc76EjKNbgaSEjGx4fId8jFFjgZB8cG6DhlFziZhrcIh2fH6HgUqBgXiPY8dahGFzjEmMhEFre2dxhoBzc5SGfleGe6alc7aUeYBlhKqUdlp+cH5za4OEczxza0Gcc4J2jHZ5iXuXjH2Jh5yRjH2JcFx+hImBjH+MpddCl3dreZeJjIt8ZW18bm1zjoSEeIOBlF9oh3N7hlqBY4+UeYFwhLJjeYFwaGd+gUqBYxiEYot2fqZ2ondzhL6EYyiEY02Ea0VjgZB8doaGjHxoc66cjEGEiXuXiXWMiZhreHx8frGMe75rY02Ec5pzfnhzlEp4a3VzjM+EhFFza3mUY7Zza1V5e2iMfGyRcziEhDyEkXZ2Y4OBnCx7g5t2eyBjgV6EhEFrcIh2dod+c4Z+nJ5zjm15jEmUeYxijJp7nL6clIpjhoR5WrZraGd+fnuRa6pzlIiMg6ZzfHx5foh+eX1ufnB5eX1ufnB5aJt7UqKMjIh+e3aBfm5lbYSBhGFze6J4c39oc0mUc4Z+e0V7fKFVe0WEdoaGY02Ec4Z+Y02EZYWBfH6HgU1+gY5+hIWUgW+XjJ57ebWRhFVScHuBfJ6PhBx7WqJzlM+Ujpd4gHZziX6HjHmEgZN+lJt5boiPe2GJgX+GjIGJgHZzeaxufnB5hF2JtdN7jJ57hp57hK6ElFVzg6ZzbmiEbndzhIWHe3uJfoFue3qRhJd2j3xoc65zlE1jc3p8lE1jhniEgXJ7e657vZaUc3qBh52BhIF4aHKDa9drgY5+c52GWqZzbpqJe8tjnM+UhIeMfo2BfGl+hG1zSmmMjKJjZVaGgX15c1lze0mEp4OHa3mUhIWHhDyclJ6MeYOJkXiPc0VzhFiMlKaEboSJa5Jze41re3qRhn+HZYWBe0mEc4p5fnORbox5lEp4hGFjhGGEjJuEc1WEhLZjeHeGa7KlfHx2hLaMeX1ugY5+hIWHhKGPjMN7c1WEho1zhoBzZYx7fnhzlJt5exyUhFFziXtzfmmMa6qMYyiEiXxweV12kZSMeWqXSl17fnhzxmmMrVGEe1mcc4p5eHeGjK6MgY5+doaGa6pzlGV7g1qBh4KHkXiPeW6OaKqafqZ2eXZ5e1V7jGd7boSJc3BzhJd2e0mcYot2h1RoY8dahK6EQmWEWjx7e1l2lL6UgXyBdnR4eU9zc0VreX1umqaBhld7fo2Bc6KEc5Z+hDyEcIeBWtNrfHyGe5qMhMuMe5qMhEGEbVVupcNzg3aHhIF4boeBe0mEdlptc39ofFl5Y8uUlJOGiYt2UmGEcyxjjGx4jFF7a657ZYWBnElzhp57iXtrgZN+tfOEhIOBjE2HgU1+e8tjjKNbiWCDhE15gUqBgYN7fnqGc66ce9d7iYSBj0qPcG6DnGGcT3eGa6qMZY+JlIiMl4hwc3aRdnqBlGV7eHJ2hLZjfnuRhDyEeX6MSk17g6Z+c6aUjHmEhIF4gXyBc76EZW18fGl+fkl+jCxrhoVwhDyUhIqGlL2DlI6EhJd2tdN7eYORhEGMa2Faa6pzc3Bzc4R5lIRznM+UY9eMhDycc5Z+c4p5c4iGY117pb6MgXuPrbJafnx2eYOJeXZ5e657hDyEcziElKZjfoB5eHeGj4WRhGGEe6KGeX1utTStc76EhFGJnCyMa5hzfH6HnNeceYB7hmN8gYuMhIVrczSMgYF8h3N7c5pza5hzjJqEYIRdgYuMlL2DeYRzhGGEeX1uhLaEc4iGeZ1zdl6JhrVteX6Me2iMfm5lWqJzSpqEa6pzdnmchHx2c6OMhNdrhoR5g3aHczxzeW52gV6Ejm15frGMc0Vzc4Z+l3drfniJe+9rWq5rlF1rhGGEhoVwe9OEfoh+e7pac09+c3qBY0lrhDycdnp2lJ6MiYOGhGCDc3aRlL2DlJt5doaGdnp2gYF8gWeOjF2Uc4R5c5Z+jEmMe7KEc4mEeYJ4dmyBe0mcgXiPbqJ7eYB7fmGGiYSJjICGlF1reZ2PnElzbpqJfH6Hc39oe4WEc5eJhK6EhqyJc3qBgZB8c09+hEmEaHKDhFGJc5SGiXWMUpaEa89zc6OMnCyMiXtrho+Be5qMc7KEjJ57dmN+hKGPjICGbmiEe7prdod+hGCDdnmchBx7eX6MkXZ2hGGEa657hm98jFFjY5JreYOJgY2EjHZ2a295Y3FajJ6Mc1J+YzB7e4WBjF2Uc4R5eV12gYxzg1qBeId+c9OUc5pzjFFjgY5+hFiMlIaPhoR5lIpjjIKBlNdSe7KEeX2BfrGMhIqGc65zjE2UhK6EklZ+QmWEeziMWqZza3VzdnR4foh+gYF8n3iJiZhrnKp7gYF8eId+lJ6Me1lrcIuGjKJjhmN8c66MjFF7a6prjJ6UnJ5zezyUfruRWlF7nI5zfHyGe657h4SEe8tjhBx7jFFjc09+c39ojICMeZeJeXt+YzRzjHZ2c0WEcIeBeXZ5onSXkVR+gYJ+eYFwdldzgYF7eX2BjJ6UiXuXlE1jh4SEe1mchLJjc4Z+hqZ7eXZ5bm1zlL6Ue5p7iWeGhKqUY5pzjKJjcIeBe8t7gXyBYIRdlEp4a3mGnK6EfmmMZpqEfFl5gYxzjKZuhGFjhoKGhHx2fnx2eXuMe3aBiWeGvbKMe6KGa5hzYzB7gZOBlGV7hmN8hqZlYot2Y117a6pzc6KEfId8foB5rctrfneJfJ6PcHN2hFiMc5pzjH92c0VzgY2EcElzdmCBlFVzg1GBc65zY4OBboeBcHiBeYJ4ewxzfHx5lIRzlEmEnLKEbk1zfJ6PhmN8eYBljBiEnMOEiXxwezyUcIeBe76EdsKEeX2BdnR4jGWUrXWMjGd7fkl+j4WRlEGMa5Jzho+BhDyEfnqMeXt+g3aHlE1jczClhNN7ZW18eHx8hGFjZW18iXWMjKJjhH57gYuMcIuGWjyMe4ZtjJuExmmMj4WRdntzi4GDhFFzYIRdnGGcjJp7Y0F7e4WEkbCGiX57fnSHa657a6prhBCMe3Z+SmmMjH92eHJ2hK6EY1FzexhrvbKMnI5za4OEfnd+eXuMhImBe897hLaMjN+EfG+BeIOBhF1+eZeJi4GDkXZ2eXKEgZ6Ejpd4c2GHa1V5e5KUfqZuhCx7jKp7lLZrg11+hHx2hFWUoot2nI5zgbh5mo9zvZaUe3qRbqKMfqZ2kbCGhFiM"),(e=>e.charCodeAt(0))),t=new F.R;t.wrapMode=D.pF.CLAMP_TO_EDGE,t.pixelFormat=D.Ab.RGB,t.wrapMode=D.pF.REPEAT,t.hasMipmap=!0,t.width=32,t.height=32,this._passParameters.noiseTexture=new B.g(this.renderingContext,t,e),this._ssaoTechnique=this.techniques.acquire(H),this._blurTechnique=this.techniques.acquire(C),this.addHandles((0,u.wB)((()=>this.isEnabled()),(()=>this._enableTime=(0,h.l5)(0))))}destroy(){this._passParameters.noiseTexture=(0,d.WD)(this._passParameters.noiseTexture),this._blurTechnique.release(),this._ssaoTechnique.release()}render(e){const t=this.bindParameters,r=e.find((e=>{let{name:t}=e;return"normals"===t})),n=r?.getTexture(),o=r?.getTexture(D.nI),a=this.fboCache,s=t.camera,l=s.fullViewport[2],d=s.fullViewport[3],u=Math.round(l/z),f=Math.round(d/z);if(!this._ssaoTechnique.compiled||!this._blurTechnique.compiled)return this._enableTime=(0,h.l5)(performance.now()),this.requestRender(),a.acquire(u,f,"ssao",i.RED);0===this._enableTime&&(this._enableTime=(0,h.l5)(performance.now()));const m=this.renderingContext,v=this.view.qualitySettings.fadeDuration,g=s.relativeElevation,x=(0,c.qE)((b-g)/2e5,0,1),T=v>0?Math.min(v,performance.now()-this._enableTime)/v:1,y=T*x;this._passParameters.normalTexture=n,this._passParameters.depthTexture=o,this._passParameters.projScale=1/s.computeScreenPixelSizeAtDist(1),this._passParameters.intensity=4*G/(0,L.g)(s)**6*y;const A=a.acquire(l,d,"ssao input",i.RG);m.unbindTexture(A.fbo.colorTexture),m.bindFramebuffer(A.fbo),m.setViewport(0,0,l,d),m.bindTechnique(this._ssaoTechnique,t,this._passParameters,this._drawParameters),m.screen.draw();const E=a.acquire(u,f,"ssao blur",i.RED);m.unbindTexture(E.fbo.colorTexture),m.bindFramebuffer(E.fbo),this._drawParameters.colorTexture=A.getTexture(),(0,p.hZ)(this._drawParameters.blurSize,0,z/d),m.bindTechnique(this._blurTechnique,t,this._passParameters,this._drawParameters),m.setViewport(0,0,u,f),m.screen.draw(),A.release();const S=a.acquire(u,f,"ssao",i.RED);return m.unbindTexture(S.fbo.colorTexture),m.bindFramebuffer(S.fbo),m.setViewport(0,0,l,d),m.setClearColor(1,1,1,0),m.clear(D.hn.COLOR_BUFFER_BIT),this._drawParameters.colorTexture=E.getTexture(),(0,p.hZ)(this._drawParameters.blurSize,z/l,0),m.bindTechnique(this._blurTechnique,t,this._passParameters,this._drawParameters),m.setViewport(0,0,u,f),m.screen.draw(),m.setViewport4fv(s.fullViewport),E.release(),T<1&&this.requestRender(_.C7.UPDATE),S}};(0,l._)([(0,f.MZ)()],V.prototype,"consumes",void 0),(0,l._)([(0,f.MZ)()],V.prototype,"produces",void 0),(0,l._)([(0,f.MZ)({constructOnly:!0})],V.prototype,"techniques",void 0),(0,l._)([(0,f.MZ)({constructOnly:!0})],V.prototype,"isEnabled",void 0),V=(0,l._)([(0,m.$)("esri.views.3d.webgl-engine.effects.ssao.SSAO")],V);const G=.5;function W(e,t){const r=e.fragment;t.receiveAmbientOcclusion?(r.uniforms.add(new s.N("ssaoTex",((e,t)=>t.ssao?.getTexture()))),r.constants.add("blurSizePixelsInverse","float",1/z),r.code.add(a.H`float evaluateAmbientOcclusionInverse() {
vec2 ssaoTextureSizeInverse = 1.0 / vec2(textureSize(ssaoTex, 0));
return texture(ssaoTex, gl_FragCoord.xy * blurSizePixelsInverse * ssaoTextureSizeInverse).r;
}
float evaluateAmbientOcclusion() {
return 1.0 - evaluateAmbientOcclusionInverse();
}`)):r.code.add(a.H`float evaluateAmbientOcclusionInverse() { return 1.0; }
float evaluateAmbientOcclusion() { return 0.0; }`)}},36943:(e,t,r)=>{r.d(t,{kA:()=>w,a8:()=>E,eU:()=>S});var i=r(4212),n=r(20664),o=r(9392),a=r(43047),s=r(55855),l=r(26719),c=r(5517),d=r(58350),u=r(64839);function h(e,t){const r=e.fragment,i=void 0!==t.lightingSphericalHarmonicsOrder?t.lightingSphericalHarmonicsOrder:2;0===i?(r.uniforms.add(new c.t("lightingAmbientSH0",((e,t)=>(0,n.s)(f,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0])))),r.code.add(u.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):1===i?(r.uniforms.add(new d.E("lightingAmbientSH_R",((e,t)=>(0,a.s)(m,t.lighting.sh.r[0],t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3]))),new d.E("lightingAmbientSH_G",((e,t)=>(0,a.s)(m,t.lighting.sh.g[0],t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3]))),new d.E("lightingAmbientSH_B",((e,t)=>(0,a.s)(m,t.lighting.sh.b[0],t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3])))),r.code.add(u.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):2===i&&(r.uniforms.add(new c.t("lightingAmbientSH0",((e,t)=>(0,n.s)(f,t.lighting.sh.r[0],t.lighting.sh.g[0],t.lighting.sh.b[0]))),new d.E("lightingAmbientSH_R1",((e,t)=>(0,a.s)(m,t.lighting.sh.r[1],t.lighting.sh.r[2],t.lighting.sh.r[3],t.lighting.sh.r[4]))),new d.E("lightingAmbientSH_G1",((e,t)=>(0,a.s)(m,t.lighting.sh.g[1],t.lighting.sh.g[2],t.lighting.sh.g[3],t.lighting.sh.g[4]))),new d.E("lightingAmbientSH_B1",((e,t)=>(0,a.s)(m,t.lighting.sh.b[1],t.lighting.sh.b[2],t.lighting.sh.b[3],t.lighting.sh.b[4]))),new d.E("lightingAmbientSH_R2",((e,t)=>(0,a.s)(m,t.lighting.sh.r[5],t.lighting.sh.r[6],t.lighting.sh.r[7],t.lighting.sh.r[8]))),new d.E("lightingAmbientSH_G2",((e,t)=>(0,a.s)(m,t.lighting.sh.g[5],t.lighting.sh.g[6],t.lighting.sh.g[7],t.lighting.sh.g[8]))),new d.E("lightingAmbientSH_B2",((e,t)=>(0,a.s)(m,t.lighting.sh.b[5],t.lighting.sh.b[6],t.lighting.sh.b[7],t.lighting.sh.b[8])))),r.code.add(u.H`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),t.pbrMode!==l.A9.Normal&&t.pbrMode!==l.A9.Schematic||r.code.add(u.H`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}const f=(0,o.vt)(),m=(0,s.vt)();var p=r(20770),v=r(43557),g=r(42953),_=r(36324),x=r(7223),T=r(24245);class b extends x.n{constructor(e,t){super(e,"bool",T.c.Pass,((r,i,n)=>r.setUniform1b(e,t(i,n))))}}var y=r(21390);r(15941);(0,o.vt)();const A=.4;(0,o.vt)();function E(e){e.constants.add("ambientBoostFactor","float",A)}function S(e){e.uniforms.add(new y.m("lightingGlobalFactor",((e,t)=>t.lighting.globalFactor)))}function w(e,t){const r=e.fragment;switch(e.include(p.n,t),t.pbrMode!==l.A9.Disabled&&e.include(g.c,t),e.include(h,t),e.include(_.p),r.code.add(u.H`
    const float GAMMA_SRGB = 2.1;
    const float INV_GAMMA_SRGB = 0.4761904;
    ${t.pbrMode===l.A9.Disabled?"":"const vec3 GROUND_REFLECTANCE = vec3(0.2);"}
  `),E(r),S(r),(0,v.Gc)(r),r.code.add(u.H`
    float additionalDirectedAmbientLight(vec3 vPosWorld) {
      float vndl = dot(${t.spherical?u.H`normalize(vPosWorld)`:u.H`vec3(0.0, 0.0, 1.0)`}, mainLightDirection);
      return smoothstep(0.0, 1.0, clamp(vndl * 2.5, 0.0, 1.0));
    }
  `),(0,v.O4)(r),r.code.add(u.H`vec3 evaluateAdditionalLighting(float ambientOcclusion, vec3 vPosWorld) {
float additionalAmbientScale = additionalDirectedAmbientLight(vPosWorld);
return (1.0 - ambientOcclusion) * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor * mainLightIntensity;
}`),t.pbrMode){case l.A9.Disabled:case l.A9.WaterOnIntegratedMesh:case l.A9.Water:e.include(v.qU),r.code.add(u.H`vec3 evaluateSceneLighting(vec3 normalWorld, vec3 albedo, float shadow, float ssao, vec3 additionalLight)
{
vec3 mainLighting = evaluateMainLighting(normalWorld, shadow);
vec3 ambientLighting = calculateAmbientIrradiance(normalWorld, ssao);
vec3 albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
vec3 totalLight = mainLighting + ambientLighting + additionalLight;
totalLight = min(totalLight, vec3(PI));
vec3 outColor = vec3((albedoLinear / PI) * totalLight);
return pow(outColor, vec3(INV_GAMMA_SRGB));
}`);break;case l.A9.Normal:case l.A9.Schematic:r.code.add(u.H`const float fillLightIntensity = 0.25;
const float horizonLightDiffusion = 0.4;
const float additionalAmbientIrradianceFactor = 0.02;
vec3 evaluateSceneLightingPBR(vec3 normal, vec3 albedo, float shadow, float ssao, vec3 additionalLight, vec3 viewDir, vec3 normalGround, vec3 mrr, vec3 _emission, float additionalAmbientIrradiance)
{
vec3 viewDirection = -viewDir;
vec3 h = normalize(viewDirection + mainLightDirection);
PBRShadingInfo inputs;
inputs.NdotL = clamp(dot(normal, mainLightDirection), 0.001, 1.0);
inputs.NdotV = clamp(abs(dot(normal, viewDirection)), 0.001, 1.0);
inputs.NdotH = clamp(dot(normal, h), 0.0, 1.0);
inputs.VdotH = clamp(dot(viewDirection, h), 0.0, 1.0);
inputs.NdotNG = clamp(dot(normal, normalGround), -1.0, 1.0);
vec3 reflectedView = normalize(reflect(viewDirection, normal));
inputs.RdotNG = clamp(dot(reflectedView, normalGround), -1.0, 1.0);
inputs.albedoLinear = pow(albedo, vec3(GAMMA_SRGB));
inputs.ssao = ssao;
inputs.metalness = mrr[0];
inputs.roughness = clamp(mrr[1] * mrr[1], 0.001, 0.99);`),r.code.add(u.H`inputs.f0 = (0.16 * mrr[2] * mrr[2]) * (1.0 - inputs.metalness) + inputs.albedoLinear * inputs.metalness;
inputs.f90 = vec3(clamp(dot(inputs.f0, vec3(50.0 * 0.33)), 0.0, 1.0));
inputs.diffuseColor = inputs.albedoLinear * (vec3(1.0) - inputs.f0) * (1.0 - inputs.metalness);`),t.useFillLights?r.uniforms.add(new b("hasFillLights",((e,t)=>t.enableFillLights))):r.constants.add("hasFillLights","bool",!1),r.code.add(u.H`vec3 ambientDir = vec3(5.0 * normalGround[1] - normalGround[0] * normalGround[2], - 5.0 * normalGround[0] - normalGround[2] * normalGround[1], normalGround[1] * normalGround[1] + normalGround[0] * normalGround[0]);
ambientDir = ambientDir != vec3(0.0) ? normalize(ambientDir) : normalize(vec3(5.0, -1.0, 0.0));
inputs.NdotAmbDir = hasFillLights ? abs(dot(normal, ambientDir)) : 1.0;
vec3 mainLightIrradianceComponent = inputs.NdotL * (1.0 - shadow) * mainLightIntensity;
vec3 fillLightsIrradianceComponent = inputs.NdotAmbDir * mainLightIntensity * fillLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(normal, ssao) + additionalLight;
inputs.skyIrradianceToSurface = ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;
inputs.groundIrradianceToSurface = GROUND_REFLECTANCE * ambientLightIrradianceComponent + mainLightIrradianceComponent + fillLightsIrradianceComponent ;`),r.uniforms.add(new y.m("lightingSpecularStrength",((e,t)=>t.lighting.mainLight.specularStrength)),new y.m("lightingEnvironmentStrength",((e,t)=>t.lighting.mainLight.environmentStrength))),r.code.add(u.H`vec3 horizonRingDir = inputs.RdotNG * normalGround - reflectedView;
vec3 horizonRingH = normalize(viewDirection + horizonRingDir);
inputs.NdotH_Horizon = dot(normal, horizonRingH);
vec3 mainLightRadianceComponent = lightingSpecularStrength * normalDistribution(inputs.NdotH, inputs.roughness) * mainLightIntensity * (1.0 - shadow);
vec3 horizonLightRadianceComponent = lightingEnvironmentStrength * normalDistribution(inputs.NdotH_Horizon, min(inputs.roughness + horizonLightDiffusion, 1.0)) * mainLightIntensity * fillLightIntensity;
vec3 ambientLightRadianceComponent = lightingEnvironmentStrength * calculateAmbientRadiance(ssao) + additionalLight;
float normalDirectionModifier = mix(1., min(mix(0.1, 2.0, (inputs.NdotNG + 1.) * 0.5), 1.0), clamp(inputs.roughness * 5.0, 0.0 , 1.0));
inputs.skyRadianceToSurface = (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.groundRadianceToSurface = 0.5 * GROUND_REFLECTANCE * (ambientLightRadianceComponent + horizonLightRadianceComponent) * normalDirectionModifier + mainLightRadianceComponent;
inputs.averageAmbientRadiance = ambientLightIrradianceComponent[1] * (1.0 + GROUND_REFLECTANCE[1]);`),r.code.add(u.H`
        vec3 reflectedColorComponent = evaluateEnvironmentIllumination(inputs);
        vec3 additionalMaterialReflectanceComponent = inputs.albedoLinear * additionalAmbientIrradiance;
        vec3 emissionComponent = _emission == vec3(0.0) ? _emission : pow(_emission, vec3(GAMMA_SRGB));
        vec3 outColorLinear = reflectedColorComponent + additionalMaterialReflectanceComponent + emissionComponent;
        ${t.pbrMode!==l.A9.Schematic||t.hasColorTexture?u.H`vec3 outColor = pow(blackLevelSoftCompression(outColorLinear, inputs), vec3(INV_GAMMA_SRGB));`:u.H`vec3 outColor = pow(max(vec3(0.0), outColorLinear - 0.005 * inputs.averageAmbientRadiance), vec3(INV_GAMMA_SRGB));`}
        return outColor;
      }
    `);break;case l.A9.Simplified:case l.A9.TerrainWithWater:e.include(v.qU),r.code.add(u.H`const float roughnessTerrain = 0.5;
const float specularityTerrain = 0.5;
const vec3 fresnelReflectionTerrain = vec3(0.04);
vec3 evaluatePBRSimplifiedLighting(vec3 n, vec3 c, float shadow, float ssao, vec3 al, vec3 vd, vec3 nup) {
vec3 viewDirection = -vd;
vec3 h = normalize(viewDirection + mainLightDirection);
float NdotL = clamp(dot(n, mainLightDirection), 0.001, 1.0);
float NdotV = clamp(abs(dot(n, viewDirection)), 0.001, 1.0);
float NdotH = clamp(dot(n, h), 0.0, 1.0);
float NdotNG = clamp(dot(n, nup), -1.0, 1.0);
vec3 albedoLinear = pow(c, vec3(GAMMA_SRGB));
float lightness = 0.3 * albedoLinear[0] + 0.5 * albedoLinear[1] + 0.2 * albedoLinear[2];
vec3 f0 = (0.85 * lightness + 0.15) * fresnelReflectionTerrain;
vec3 f90 =  vec3(clamp(dot(f0, vec3(50.0 * 0.33)), 0.0, 1.0));
vec3 mainLightIrradianceComponent = (1. - shadow) * NdotL * mainLightIntensity;
vec3 ambientLightIrradianceComponent = calculateAmbientIrradiance(n, ssao) + al;
vec3 ambientSky = ambientLightIrradianceComponent + mainLightIrradianceComponent;
vec3 indirectDiffuse = ((1.0 - NdotNG) * mainLightIrradianceComponent + (1.0 + NdotNG ) * ambientSky) * 0.5;
vec3 outDiffColor = albedoLinear * (1.0 - f0) * indirectDiffuse / PI;
vec3 mainLightRadianceComponent = normalDistribution(NdotH, roughnessTerrain) * mainLightIntensity;
vec2 dfg = prefilteredDFGAnalytical(roughnessTerrain, NdotV);
vec3 specularColor = f0 * dfg.x + f90 * dfg.y;
vec3 specularComponent = specularityTerrain * specularColor * mainLightRadianceComponent;
vec3 outColorLinear = outDiffColor + specularComponent;
vec3 outColor = pow(outColorLinear, vec3(INV_GAMMA_SRGB));
return outColor;
}`);break;default:(0,i.Xb)(t.pbrMode);case l.A9.COUNT:}}},43557:(e,t,r)=>{r.d(t,{Gc:()=>o,O4:()=>a,qU:()=>s});var i=r(5517),n=r(64839);function o(e){e.uniforms.add(new i.t("mainLightDirection",((e,t)=>t.lighting.mainLight.direction)))}function a(e){e.uniforms.add(new i.t("mainLightIntensity",((e,t)=>t.lighting.mainLight.intensity)))}function s(e){o(e.fragment),a(e.fragment),e.fragment.code.add(n.H`vec3 evaluateMainLighting(vec3 normal_global, float shadowing) {
float dotVal = clamp(dot(normal_global, mainLightDirection), 0.0, 1.0);
return mainLightIntensity * ((1.0 - shadowing) * dotVal);
}`)}},81993:(e,t,r)=>{r.d(t,{Q:()=>a});var i=r(65058),n=r(64839),o=r(70367);function a(e,t){if(!t.multipassEnabled)return;e.fragment.include(i.E),e.fragment.uniforms.add(new o.N("terrainDepthTexture",((e,t)=>t.multipassTerrain.depth?.attachment)));const r=t.occlusionPass;e.fragment.code.add(n.H`
   ${r?"bool":"void"} terrainDepthTest(float fragmentDepth) {
      float depth = texelFetch(terrainDepthTexture, ivec2(gl_FragCoord.xy), 0).r;
      float linearDepth = linearizeDepth(depth);
      ${r?n.H`return fragmentDepth < linearDepth && depth < 1.0;`:n.H`
          if(fragmentDepth ${t.cullAboveGround?">":"<="} linearDepth){
            discard;
          }`}
    }`)}},27920:(e,t,r)=>{r.d(t,{W:()=>i,r:()=>a});var i,n=r(4212),o=r(64839);function a(e,t){const r=e.fragment;switch(r.code.add(o.H`struct ShadingNormalParameters {
vec3 normalView;
vec3 viewDirection;
} shadingParams;`),t.doubleSidedMode){case i.None:r.code.add(o.H`vec3 shadingNormal(ShadingNormalParameters params) {
return normalize(params.normalView);
}`);break;case i.View:r.code.add(o.H`vec3 shadingNormal(ShadingNormalParameters params) {
return dot(params.normalView, params.viewDirection) > 0.0 ? normalize(-params.normalView) : normalize(params.normalView);
}`);break;case i.WindingOrder:r.code.add(o.H`vec3 shadingNormal(ShadingNormalParameters params) {
return gl_FrontFacing ? normalize(params.normalView) : normalize(-params.normalView);
}`);break;default:(0,n.Xb)(t.doubleSidedMode);case i.COUNT:}}!function(e){e[e.None=0]="None",e[e.View=1]="View",e[e.WindingOrder=2]="WindingOrder",e[e.COUNT=3]="COUNT"}(i||(i={}))},42953:(e,t,r)=>{r.d(t,{c:()=>s});var i=r(64839);function n(e){const t=e.fragment.code;t.add(i.H`vec3 evaluateDiffuseIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float NdotNG)
{
return ((1.0 - NdotNG) * ambientGround + (1.0 + NdotNG) * ambientSky) * 0.5;
}`),t.add(i.H`float integratedRadiance(float cosTheta2, float roughness)
{
return (cosTheta2 - 1.0) / (cosTheta2 * (1.0 - roughness * roughness) - 1.0);
}`),t.add(i.H`vec3 evaluateSpecularIlluminationHemisphere(vec3 ambientGround, vec3 ambientSky, float RdotNG, float roughness)
{
float cosTheta2 = 1.0 - RdotNG * RdotNG;
float intRadTheta = integratedRadiance(cosTheta2, roughness);
float ground = RdotNG < 0.0 ? 1.0 - intRadTheta : 1.0 + intRadTheta;
float sky = 2.0 - ground;
return (ground * ambientGround + sky * ambientSky) * 0.5;
}`)}var o=r(26719),a=r(36324);function s(e,t){const r=e.fragment.code;e.include(a.p),t.pbrMode!==o.A9.Normal&&t.pbrMode!==o.A9.Schematic&&t.pbrMode!==o.A9.Simplified&&t.pbrMode!==o.A9.TerrainWithWater||(r.add(i.H`float normalDistribution(float NdotH, float roughness)
{
float a = NdotH * roughness;
float b = roughness / (1.0 - NdotH * NdotH + a * a);
return b * b * INV_PI;
}`),r.add(i.H`const vec4 c0 = vec4(-1.0, -0.0275, -0.572,  0.022);
const vec4 c1 = vec4( 1.0,  0.0425,  1.040, -0.040);
const vec2 c2 = vec2(-1.04, 1.04);
vec2 prefilteredDFGAnalytical(float roughness, float NdotV) {
vec4 r = roughness * c0 + c1;
float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * r.x + r.y;
return c2 * a004 + r.zw;
}`)),t.pbrMode!==o.A9.Normal&&t.pbrMode!==o.A9.Schematic||(e.include(n),r.add(i.H`struct PBRShadingInfo
{
float NdotL;
float NdotV;
float NdotH;
float VdotH;
float LdotH;
float NdotNG;
float RdotNG;
float NdotAmbDir;
float NdotH_Horizon;
vec3 skyRadianceToSurface;
vec3 groundRadianceToSurface;
vec3 skyIrradianceToSurface;
vec3 groundIrradianceToSurface;
float averageAmbientRadiance;
float ssao;
vec3 albedoLinear;
vec3 f0;
vec3 f90;
vec3 diffuseColor;
float metalness;
float roughness;
};`),r.add(i.H`vec3 evaluateEnvironmentIllumination(PBRShadingInfo inputs) {
vec3 indirectDiffuse = evaluateDiffuseIlluminationHemisphere(inputs.groundIrradianceToSurface, inputs.skyIrradianceToSurface, inputs.NdotNG);
vec3 indirectSpecular = evaluateSpecularIlluminationHemisphere(inputs.groundRadianceToSurface, inputs.skyRadianceToSurface, inputs.RdotNG, inputs.roughness);
vec3 diffuseComponent = inputs.diffuseColor * indirectDiffuse * INV_PI;
vec2 dfg = prefilteredDFGAnalytical(inputs.roughness, inputs.NdotV);
vec3 specularColor = inputs.f0 * dfg.x + inputs.f90 * dfg.y;
vec3 specularComponent = specularColor * indirectSpecular;
return (diffuseComponent + specularComponent);
}`),r.add(i.H`float gamutMapChanel(float x, vec2 p){
return (x < p.x) ? mix(0.0, p.y, x/p.x) : mix(p.y, 1.0, (x - p.x) / (1.0 - p.x) );
}`),r.add(i.H`vec3 blackLevelSoftCompression(vec3 inColor, PBRShadingInfo inputs){
vec3 outColor;
vec2 p = vec2(0.02 * (inputs.averageAmbientRadiance), 0.0075 * (inputs.averageAmbientRadiance));
outColor.x = gamutMapChanel(inColor.x, p) ;
outColor.y = gamutMapChanel(inColor.y, p) ;
outColor.z = gamutMapChanel(inColor.z, p) ;
return outColor;
}`))}},26719:(e,t,r)=>{r.d(t,{A9:()=>i,_Z:()=>u});var i,n=r(95352),o=r(72468),a=r(5517),s=r(64839),l=r(27374),c=r(70367),d=r(24245);r(16005);!function(e){e[e.Disabled=0]="Disabled",e[e.Normal=1]="Normal",e[e.Schematic=2]="Schematic",e[e.Water=3]="Water",e[e.WaterOnIntegratedMesh=4]="WaterOnIntegratedMesh",e[e.Simplified=5]="Simplified",e[e.TerrainWithWater=6]="TerrainWithWater",e[e.COUNT=7]="COUNT"}(i||(i={}));function u(e,t){const r=e.fragment,u=t.hasMetallicRoughnessTexture||t.hasEmissionTexture||t.hasOcclusionTexture;if(t.pbrMode===i.Normal&&u&&e.include(n.r,t),t.pbrMode!==i.Schematic)if(t.pbrMode!==i.Disabled){if(t.pbrMode===i.Normal){r.code.add(s.H`vec3 mrr;
vec3 emission;
float occlusion;`);const e=t.pbrTextureBindType;t.hasMetallicRoughnessTexture&&(r.uniforms.add(e===d.c.Pass?new c.N("texMetallicRoughness",(e=>e.textureMetallicRoughness)):new l.o("texMetallicRoughness",(e=>e.textureMetallicRoughness))),r.code.add(s.H`void applyMetallnessAndRoughness(vec2 uv) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`)),t.hasEmissionTexture&&(r.uniforms.add(e===d.c.Pass?new c.N("texEmission",(e=>e.textureEmissive)):new l.o("texEmission",(e=>e.textureEmissive))),r.code.add(s.H`void applyEmission(vec2 uv) {
emission *= textureLookup(texEmission, uv).rgb;
}`)),t.hasOcclusionTexture?(r.uniforms.add(e===d.c.Pass?new c.N("texOcclusion",(e=>e.textureOcclusion)):new l.o("texOcclusion",(e=>e.textureOcclusion))),r.code.add(s.H`void applyOcclusion(vec2 uv) {
occlusion *= textureLookup(texOcclusion, uv).r;
}
float getBakedOcclusion() {
return occlusion;
}`)):r.code.add(s.H`float getBakedOcclusion() { return 1.0; }`),e===d.c.Pass?r.uniforms.add(new a.t("emissionFactor",(e=>e.emissiveFactor)),new a.t("mrrFactors",(e=>e.mrrFactors))):r.uniforms.add(new o.W("emissionFactor",(e=>e.emissiveFactor)),new o.W("mrrFactors",(e=>e.mrrFactors))),r.code.add(s.H`
    void applyPBRFactors() {
      mrr = mrrFactors;
      emission = emissionFactor;
      occlusion = 1.0;

      ${t.hasMetallicRoughnessTexture?s.H`applyMetallnessAndRoughness(${t.hasMetallicRoughnessTextureTransform?s.H`metallicRoughnessUV`:"vuv0"});`:""}

      ${t.hasEmissionTexture?s.H`applyEmission(${t.hasEmissiveTextureTransform?s.H`emissiveUV`:"vuv0"});`:""}

      ${t.hasOcclusionTexture?s.H`applyOcclusion(${t.hasOcclusionTextureTransform?s.H`occlusionUV`:"vuv0"});`:""}
    }
  `)}}else r.code.add(s.H`float getBakedOcclusion() { return 1.0; }`);else r.code.add(s.H`vec3 mrr = vec3(0.0, 0.6, 0.2);
vec3 emission = vec3(0.0);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`)}},36324:(e,t,r)=>{r.d(t,{p:()=>n});var i=r(64839);function n(e){e.vertex.code.add(i.H`const float PI = 3.141592653589793;`),e.fragment.code.add(i.H`const float PI = 3.141592653589793;
const float LIGHT_NORMALIZATION = 1.0 / PI;
const float INV_PI = 0.3183098861837907;
const float HALF_PI = 1.570796326794897;`)}},1773:(e,t,r)=>{r.d(t,{Bz:()=>f,G:()=>h});r(13191),r(9392);var i=r(87572),n=r(58350),o=r(72790),a=r(64839),s=r(7223),l=r(24245);class c extends s.n{constructor(e,t,r){super(e,"mat4",l.c.Draw,((r,i,n,o)=>r.setUniformMatrix4fv(e,t(i,n,o))),r)}}class d extends s.n{constructor(e,t,r){super(e,"mat4",l.c.Pass,((r,i,n)=>r.setUniformMatrix4fv(e,t(i,n))),r)}}var u=r(70367);a.Y;a.Y;function h(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new d("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),m(e))}function f(e,t){t.receiveShadows&&(e.fragment.uniforms.add(new c("shadowMapMatrix",((e,t)=>t.shadowMap.getShadowMapMatrices(e.origin)),4)),m(e))}function m(e){const t=e.fragment;t.include(i.U),t.uniforms.add(new u.N("shadowMap",((e,t)=>t.shadowMap.depthTexture)),new o.c("numCascades",((e,t)=>t.shadowMap.numCascades)),new n.E("cascadeDistances",((e,t)=>t.shadowMap.cascadeDistances))),t.code.add(a.H`int chooseCascade(float depth, out mat4 mat) {
vec4 distance = cascadeDistances;
int i = depth < distance[1] ? 0 : depth < distance[2] ? 1 : depth < distance[3] ? 2 : 3;
mat = i == 0 ? shadowMapMatrix[0] : i == 1 ? shadowMapMatrix[1] : i == 2 ? shadowMapMatrix[2] : shadowMapMatrix[3];
return i;
}
vec3 lightSpacePosition(vec3 _vpos, mat4 mat) {
vec4 lv = mat * vec4(_vpos, 1.0);
lv.xy /= lv.w;
return 0.5 * lv.xyz + vec3(0.5);
}
vec2 cascadeCoordinates(int i, ivec2 textureSize, vec3 lvpos) {
float xScale = float(textureSize.y) / float(textureSize.x);
return vec2((float(i) + lvpos.x) * xScale, lvpos.y);
}
float readShadowMapDepth(ivec2 uv, sampler2D _depthTex) {
return rgba4ToFloat(texelFetch(_depthTex, uv, 0));
}
float posIsInShadow(ivec2 uv, vec3 lvpos, sampler2D _depthTex) {
return readShadowMapDepth(uv, _depthTex) < lvpos.z ? 1.0 : 0.0;
}
float filterShadow(vec2 uv, vec3 lvpos, ivec2 texSize, sampler2D _depthTex) {
vec2 st = fract(uv * vec2(texSize) + vec2(0.5));
ivec2 base = ivec2(uv * vec2(texSize) - vec2(0.5));
float s00 = posIsInShadow(ivec2(base.x, base.y), lvpos, _depthTex);
float s10 = posIsInShadow(ivec2(base.x + 1, base.y), lvpos, _depthTex);
float s11 = posIsInShadow(ivec2(base.x + 1, base.y + 1), lvpos, _depthTex);
float s01 = posIsInShadow(ivec2(base.x, base.y + 1), lvpos, _depthTex);
return mix(mix(s00, s10, st.x), mix(s01, s11, st.x), st.y);
}
float readShadowMap(const in vec3 _vpos, float _linearDepth) {
mat4 mat;
int i = chooseCascade(_linearDepth, mat);
if (i >= numCascades) { return 0.0; }
vec3 lvpos = lightSpacePosition(_vpos, mat);
if (lvpos.z >= 1.0 || lvpos.x < 0.0 || lvpos.x > 1.0 || lvpos.y < 0.0 || lvpos.y > 1.0) { return 0.0; }
ivec2 size = textureSize(shadowMap, 0);
vec2 uv = cascadeCoordinates(i, size, lvpos);
return filterShadow(uv, lvpos, size, shadowMap);
}`)}},55696:(e,t,r)=>{r.d(t,{MU:()=>c,O1:()=>d,QM:()=>u,Sx:()=>l,q2:()=>s});var i=r(44680),n=r(97808),o=r(64839),a=r(72106);function s(e,t){t.hasColorTextureTransform?(e.vertex.uniforms.add(new a.k("colorTextureTransformMatrix",(e=>e.colorTextureTransformMatrix??i.zK))),e.varyings.add("colorUV","vec2"),e.vertex.code.add(o.H`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardColorUV(){}`)}function l(e,t){t.hasNormalTextureTransform&&t.textureCoordinateType!==n.q.None?(e.vertex.uniforms.add(new a.k("normalTextureTransformMatrix",(e=>e.normalTextureTransformMatrix??i.zK))),e.varyings.add("normalUV","vec2"),e.vertex.code.add(o.H`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardNormalUV(){}`)}function c(e,t){t.hasEmissionTextureTransform&&t.textureCoordinateType!==n.q.None?(e.vertex.uniforms.add(new a.k("emissiveTextureTransformMatrix",(e=>e.emissiveTextureTransformMatrix??i.zK))),e.varyings.add("emissiveUV","vec2"),e.vertex.code.add(o.H`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardEmissiveUV(){}`)}function d(e,t){t.hasOcclusionTextureTransform&&t.textureCoordinateType!==n.q.None?(e.vertex.uniforms.add(new a.k("occlusionTextureTransformMatrix",(e=>e.occlusionTextureTransformMatrix??i.zK))),e.varyings.add("occlusionUV","vec2"),e.vertex.code.add(o.H`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardOcclusionUV(){}`)}function u(e,t){t.hasMetallicRoughnessTextureTransform&&t.textureCoordinateType!==n.q.None?(e.vertex.uniforms.add(new a.k("metallicRoughnessTextureTransformMatrix",(e=>e.metallicRoughnessTextureTransformMatrix??i.zK))),e.varyings.add("metallicRoughnessUV","vec2"),e.vertex.code.add(o.H`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):e.vertex.code.add(o.H`void forwardMetallicRoughnessUV(){}`)}},27969:(e,t,r)=>{r.d(t,{A:()=>b});var i=r(5517),n=r(7223),o=r(24245);class a extends n.n{constructor(e,t,r){super(e,"vec4",o.c.Pass,((r,i,n)=>r.setUniform4fv(e,t(i,n))),r)}}class s extends n.n{constructor(e,t,r){super(e,"float",o.c.Pass,((r,i,n)=>r.setUniform1fv(e,t(i,n))),r)}}var l=r(64839),c=r(72106),d=r(66470),u=(r(81806),r(15941),r(63919),r(44680),r(34761),r(13191)),h=(r(20664),r(9392)),f=(r(3454),r(35143)),m=r(91967),p=r(46053),v=(r(76460),r(47249),r(85842));let g=class extends m.A{constructor(){super(...arguments),this.SCENEVIEW_HITTEST_RETURN_INTERSECTOR=!1,this.DECONFLICTOR_SHOW_VISIBLE=!1,this.DECONFLICTOR_SHOW_INVISIBLE=!1,this.DECONFLICTOR_SHOW_GRID=!1,this.LABELS_SHOW_BORDER=!1,this.TEXT_SHOW_BASELINE=!1,this.TEXT_SHOW_BORDER=!1,this.OVERLAY_DRAW_DEBUG_TEXTURE=!1,this.OVERLAY_SHOW_CENTER=!1,this.SHOW_POI=!1,this.TESTS_DISABLE_OPTIMIZATIONS=!1,this.TESTS_DISABLE_FAST_UPDATES=!1,this.DRAW_MESH_GEOMETRY_NORMALS=!1,this.FEATURE_TILE_FETCH_SHOW_TILES=!1,this.FEATURE_TILE_TREE_SHOW_TILES=!1,this.TERRAIN_TILE_TREE_SHOW_TILES=!1,this.I3S_TREE_SHOW_TILES=!1,this.I3S_SHOW_MODIFICATIONS=!1,this.LOD_INSTANCE_RENDERER_DISABLE_UPDATES=!1,this.LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL=!1,this.EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES=!1,this.LINE_WIREFRAMES=!1}};(0,f._)([(0,p.MZ)()],g.prototype,"SCENEVIEW_HITTEST_RETURN_INTERSECTOR",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DECONFLICTOR_SHOW_VISIBLE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DECONFLICTOR_SHOW_INVISIBLE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DECONFLICTOR_SHOW_GRID",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LABELS_SHOW_BORDER",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TEXT_SHOW_BASELINE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TEXT_SHOW_BORDER",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"OVERLAY_DRAW_DEBUG_TEXTURE",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"OVERLAY_SHOW_CENTER",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"SHOW_POI",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TESTS_DISABLE_OPTIMIZATIONS",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TESTS_DISABLE_FAST_UPDATES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"DRAW_MESH_GEOMETRY_NORMALS",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"FEATURE_TILE_FETCH_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"FEATURE_TILE_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"TERRAIN_TILE_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"I3S_TREE_SHOW_TILES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"I3S_SHOW_MODIFICATIONS",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LOD_INSTANCE_RENDERER_DISABLE_UPDATES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"EDGES_SHOW_HIDDEN_TRANSPARENT_EDGES",void 0),(0,f._)([(0,p.MZ)()],g.prototype,"LINE_WIREFRAMES",void 0),g=(0,f._)([(0,v.$)("esri.views.3d.support.debugFlags")],g);new g;var _,x;!function(e){e[e.Undefined=0]="Undefined",e[e.DefinedSize=1]="DefinedSize",e[e.DefinedScale=2]="DefinedScale"}(_||(_={})),function(e){e[e.Undefined=0]="Undefined",e[e.DefinedAngle=1]="DefinedAngle"}(x||(x={}));l.Y;(0,u.vt)(),(0,h.vt)(),(0,u.vt)();r(84103);const T=8;function b(e,t){const{vertex:r,attributes:n}=e;t.hasVvInstancing&&(t.vvSize||t.vvColor)&&n.add(d.r.INSTANCEFEATUREATTRIBUTE,"vec4"),t.vvSize?(r.uniforms.add(new i.t("vvSizeMinSize",(e=>e.vvSize.minSize))),r.uniforms.add(new i.t("vvSizeMaxSize",(e=>e.vvSize.maxSize))),r.uniforms.add(new i.t("vvSizeOffset",(e=>e.vvSize.offset))),r.uniforms.add(new i.t("vvSizeFactor",(e=>e.vvSize.factor))),r.uniforms.add(new c.k("vvSymbolRotationMatrix",(e=>e.vvSymbolRotationMatrix))),r.uniforms.add(new i.t("vvSymbolAnchor",(e=>e.vvSymbolAnchor))),r.code.add(l.H`vec3 vvScale(vec4 _featureAttribute) {
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),r.code.add(l.H`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 vvScale = clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize + eps, vvSizeMaxSize);
        return vec4(vvSymbolRotationMatrix * _normal / vvScale, 1.0);
      }

      ${t.hasVvInstancing?l.H`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:""}
    `)):r.code.add(l.H`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),t.vvColor?(r.constants.add("vvColorNumber","int",T),r.uniforms.add(new s("vvColorValues",(e=>e.vvColor.values),T),new a("vvColorColors",(e=>e.vvColor.colors),T)),r.code.add(l.H`
      vec4 interpolateVVColor(float value) {
        if (value <= vvColorValues[0]) {
          return vvColorColors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (vvColorValues[i] >= value) {
            float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
            return mix(vvColorColors[i-1], vvColorColors[i], f);
          }
        }
        return vvColorColors[vvColorNumber - 1];
      }

      vec4 vvGetColor(vec4 featureAttribute) {
        return interpolateVVColor(featureAttribute.y);
      }

      ${t.hasVvInstancing?l.H`
            vec4 vvColor() {
              return vvGetColor(instanceFeatureAttribute);
            }`:"vec4 vvColor() { return vec4(1.0); }"}
    `)):r.code.add(l.H`vec4 vvColor() { return vec4(1.0); }`)}},90235:(e,t,r)=>{r.d(t,{H:()=>i,y:()=>n});const i=.1,n=.001},99774:(e,t,r)=>{r.d(t,{S:()=>c});var i=r(90235),n=r(64839);function o(e){e.fragment.code.add(n.H`
    #define discardOrAdjustAlpha(color) { if (color.a < ${n.H.float(i.y)}) { discard; } }
  `)}var a=r(7223);r(24245);a.n;var s=r(21390),l=r(83490);function c(e,t){d(e,t,new s.m("textureAlphaCutoff",(e=>e.textureAlphaCutoff)))}function d(e,t,r){const i=e.fragment;switch(t.alphaDiscardMode!==l.sf.Mask&&t.alphaDiscardMode!==l.sf.MaskBlend||i.uniforms.add(r),t.alphaDiscardMode){case l.sf.Blend:return e.include(o);case l.sf.Opaque:i.code.add(n.H`void discardOrAdjustAlpha(inout vec4 color) {
color.a = 1.0;
}`);break;case l.sf.Mask:i.code.add(n.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } else { color.a = 1.0; } }`);break;case l.sf.MaskBlend:e.fragment.code.add(n.H`#define discardOrAdjustAlpha(color) { if (color.a < textureAlphaCutoff) { discard; } }`)}}},27963:(e,t,r)=>{r.d(t,{Ir:()=>d});var i=r(19555),n=r(72745),o=r(43047),a=r(55855),s=r(95756),l=r(58350),c=r(64839);function d(e){e.fragment.uniforms.add(new l.E("projInfo",((e,t)=>function(e){const t=e.projectionMatrix;return 0===t[11]?(0,o.s)(u,2/(e.fullWidth*t[0]),2/(e.fullHeight*t[5]),(1+t[12])/t[0],(1+t[13])/t[5]):(0,o.s)(u,-2/(e.fullWidth*t[0]),-2/(e.fullHeight*t[5]),(1-t[8])/t[0],(1-t[9])/t[5])}(t.camera)))),e.fragment.uniforms.add(new s.G("zScale",((e,t)=>function(e){return 0===e.projectionMatrix[11]?(0,i.hZ)(h,0,1):(0,i.hZ)(h,1,0)}(t.camera)))),e.fragment.code.add(c.H`vec3 reconstructPosition(vec2 fragCoord, float depth) {
return vec3((fragCoord * projInfo.xy + projInfo.zw) * (zScale.x * depth + zScale.y), depth);
}`)}const u=(0,a.vt)();const h=(0,n.vt)()},96041:(e,t,r)=>{r.d(t,{N:()=>a});var i=r(51990),n=r(64839);function o(e){e.code.add(n.H`vec4 premultiplyAlpha(vec4 v) {
return vec4(v.rgb * v.a, v.a);
}
vec3 rgb2hsv(vec3 c) {
vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
float d = q.x - min(q.w, q.y);
float e = 1.0e-10;
return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), min(d / (q.x + e), 1.0), q.x);
}
vec3 hsv2rgb(vec3 c) {
vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
float rgb2v(vec3 c) {
return max(c.x, max(c.y, c.z));
}`)}function a(e){e.include(o),e.code.add(n.H`
    vec3 mixExternalColor(vec3 internalColor, vec3 textureColor, vec3 externalColor, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      vec3 internalMixed = internalColor * textureColor;
      vec3 allMixed = internalMixed * externalColor;

      if (mode == ${n.H.int(i.k5.Multiply)}) {
        return allMixed;
      }
      if (mode == ${n.H.int(i.k5.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${n.H.int(i.k5.Replace)}) {
        return externalColor;
      }

      // tint (or something invalid)
      float vIn = rgb2v(internalMixed);
      vec3 hsvTint = rgb2hsv(externalColor);
      vec3 hsvOut = vec3(hsvTint.x, hsvTint.y, vIn * hsvTint.z);
      return hsv2rgb(hsvOut);
    }

    float mixExternalOpacity(float internalOpacity, float textureOpacity, float externalOpacity, int mode) {
      // workaround for artifacts in OSX using Intel Iris Pro
      // see: https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/10475
      float internalMixed = internalOpacity * textureOpacity;
      float allMixed = internalMixed * externalOpacity;

      if (mode == ${n.H.int(i.k5.Ignore)}) {
        return internalMixed;
      }
      if (mode == ${n.H.int(i.k5.Replace)}) {
        return externalOpacity;
      }

      // multiply or tint (or something invalid)
      return allMixed;
    }
  `)}},87572:(e,t,r)=>{r.d(t,{U:()=>n});var i=r(64839);function n(e){e.code.add(i.H`const float MAX_RGBA4_FLOAT =
15.0 / 16.0 +
15.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 +
15.0 / 16.0 / 16.0 / 16.0 / 16.0;
const vec4 FIXED_POINT_FACTORS_RGBA4 = vec4(1.0, 16.0, 16.0 * 16.0, 16.0 * 16.0 * 16.0);
vec4 floatToRgba4(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA4_FLOAT);
vec4 fixedPointU4 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS_RGBA4) * 16.0);
const float toU4AsFloat = 1.0 / 15.0;
return fixedPointU4 * toU4AsFloat;
}
const vec4 RGBA4_2_FLOAT_FACTORS = vec4(
15.0 / (16.0),
15.0 / (16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0),
15.0 / (16.0 * 16.0 * 16.0 * 16.0)
);
float rgba4ToFloat(vec4 rgba) {
return dot(rgba, RGBA4_2_FLOAT_FACTORS);
}`)}},42451:(e,t,r)=>{r.d(t,{yu:()=>f,NB:()=>m,S7:()=>g});var i=r(34761),n=r(13191),o=r(20664),a=r(9392),s=r(72468),l=r(5517),c=(r(21390),r(7223)),d=r(24245);class u extends c.n{constructor(e,t){super(e,"mat4",d.c.Draw,((r,i,n)=>r.setUniformMatrix4fv(e,t(i,n))))}}var h=r(43425);function f(e,t){t.instancedDoublePrecision?e.constants.add("cameraPosition","vec3",a.uY):e.uniforms.add(new s.W("cameraPosition",((e,t)=>(0,o.s)(v,t.camera.viewInverseTransposeMatrix[3]-e.origin[0],t.camera.viewInverseTransposeMatrix[7]-e.origin[1],t.camera.viewInverseTransposeMatrix[11]-e.origin[2]))))}function m(e,t){if(!t.instancedDoublePrecision)return void e.uniforms.add(new h.X("proj",((e,t)=>t.camera.projectionMatrix)),new u("view",((e,t)=>(0,i.Tl)(p,t.camera.viewMatrix,e.origin))),new s.W("localOrigin",(e=>e.origin)));const r=e=>(0,o.s)(v,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]);e.uniforms.add(new h.X("proj",((e,t)=>t.camera.projectionMatrix)),new h.X("view",((e,t)=>(0,i.Tl)(p,t.camera.viewMatrix,r(t)))),new l.t("localOrigin",((e,t)=>r(t))))}const p=(0,n.vt)(),v=(0,a.vt)();function g(e){e.uniforms.add(new h.X("viewNormal",((e,t)=>t.camera.viewInverseTransposeMatrix)))}},56289:(e,t,r)=>{r.d(t,{t:()=>o});var i=r(7223),n=r(24245);class o extends i.n{constructor(e,t){super(e,"vec2",n.c.Draw,((r,i,n,o)=>r.setUniform2fv(e,t(i,n,o))))}}},95756:(e,t,r)=>{r.d(t,{G:()=>o});var i=r(7223),n=r(24245);class o extends i.n{constructor(e,t){super(e,"vec2",n.c.Pass,((r,i,n)=>r.setUniform2fv(e,t(i,n))))}}},58350:(e,t,r)=>{r.d(t,{E:()=>o});var i=r(7223),n=r(24245);class o extends i.n{constructor(e,t){super(e,"vec4",n.c.Pass,((r,i,n)=>r.setUniform4fv(e,t(i,n))))}}},72790:(e,t,r)=>{r.d(t,{c:()=>o});var i=r(7223),n=r(24245);class o extends i.n{constructor(e,t){super(e,"int",n.c.Pass,((r,i,n)=>r.setUniform1i(e,t(i,n))))}}},32307:(e,t,r)=>{r.d(t,{N5:()=>l});var i=r(50076),n=(r(81806),r(76460)),o=r(24245),a=r(86994);class s{constructor(){this._includedModules=new Map}include(e,t){this._includedModules.has(e)?this._includedModules.get(e):(this._includedModules.set(e,t),e(this.builder,t))}}class l extends s{constructor(){super(...arguments),this.vertex=new u,this.fragment=new u,this.attributes=new h,this.varyings=new f,this.extensions=new m,this.constants=new v,this.outputs=new p}get fragmentUniforms(){return this.fragment.uniforms.entries}get builder(){return this}generate(e){const t=this.extensions.generateSource(e),r=this.attributes.generateSource(e),i=this.varyings.generateSource(e),n="vertex"===e?this.vertex:this.fragment,o=n.uniforms.generateSource(),a=n.code.generateSource(),s="vertex"===e?_:g,l=this.constants.generateSource().concat(n.constants.generateSource()),c=this.outputs.generateSource(e);return`#version 300 es\n${t.join("\n")}\n\n${s}\n\n${l.join("\n")}\n\n${o.join("\n")}\n\n${r.join("\n")}\n\n${i.join("\n")}\n\n${c.join("\n")}\n\n${a.join("\n")}`}generateBindPass(e){const t=new Map;this.vertex.uniforms.entries.forEach((e=>{const r=e.bind[o.c.Pass];r&&t.set(e.name,r)})),this.fragment.uniforms.entries.forEach((e=>{const r=e.bind[o.c.Pass];r&&t.set(e.name,r)}));const r=Array.from(t.values()),i=r.length;return(t,n)=>{for(let o=0;o<i;++o)r[o](e,t,n)}}generateBindDraw(e){const t=new Map;this.vertex.uniforms.entries.forEach((e=>{const r=e.bind[o.c.Draw];r&&t.set(e.name,r)})),this.fragment.uniforms.entries.forEach((e=>{const r=e.bind[o.c.Draw];r&&t.set(e.name,r)}));const r=Array.from(t.values()),i=r.length;return(t,n,o)=>{for(let a=0;a<i;++a)r[a](e,t,n,o)}}}class c{constructor(e){this._stage=e,this._entries=new Map}add(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];for(const i of t)this._add(i);return this._stage}get(e){return this._entries.get(e)}_add(e){if(null!=e){if(this._entries.has(e.name)&&!this._entries.get(e.name).equals(e))throw new i.A(`Duplicate uniform name ${e.name} for different uniform type`);this._entries.set(e.name,e)}else n.A.getLogger("esri.views.3d.webgl-engine.core.shaderModules.shaderBuilder").error(`Trying to add null Uniform from ${(new Error).stack}.`)}generateSource(){return Array.from(this._entries.values()).map((e=>null!=e.arraySize?`uniform ${e.type} ${e.name}[${e.arraySize}];`:`uniform ${e.type} ${e.name};`))}get entries(){return Array.from(this._entries.values())}}class d{constructor(e){this._stage=e,this._entries=new Array}add(e){return this._entries.push(e),this._stage}generateSource(){return this._entries}}class u extends s{constructor(){super(...arguments),this.uniforms=new c(this),this.code=new d(this),this.constants=new v}get builder(){return this}}class h{constructor(){this._entries=new Array}add(e,t){this._entries.push([e,t])}generateSource(e){return"fragment"===e?[]:this._entries.map((e=>`in ${e[1]} ${e[0]};`))}}class f{constructor(){this._entries=new Map}add(e,t){this._entries.has(e)&&(0,a.vA)(this._entries.get(e)===t),this._entries.set(e,t)}generateSource(e){const t=new Array;return this._entries.forEach(((r,i)=>t.push("vertex"===e?`out ${r} ${i};`:`in ${r} ${i};`))),t}}class m{constructor(){this._entries=new Set}add(e){this._entries.add(e)}generateSource(e){const t="vertex"===e?m.ALLOWLIST_VERTEX:m.ALLOWLIST_FRAGMENT;return Array.from(this._entries).filter((e=>t.includes(e))).map((e=>`#extension ${e} : enable`))}}m.ALLOWLIST_FRAGMENT=["GL_EXT_shader_texture_lod","GL_OES_standard_derivatives"],m.ALLOWLIST_VERTEX=[];class p{constructor(){this._entries=new Map}add(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;const i=this._entries.get(r);i?(0,a.vA)(i.name===e&&i.type===t,`Fragment shader output location ${r} occupied`):this._entries.set(r,{name:e,type:t})}generateSource(e){if("vertex"===e)return[];0===this._entries.size&&this._entries.set(0,{name:p.DEFAULT_NAME,type:p.DEFAULT_TYPE});const t=new Array;return this._entries.forEach(((e,r)=>t.push(`layout(location = ${r}) out ${e.type} ${e.name};`))),t}}p.DEFAULT_TYPE="vec4",p.DEFAULT_NAME="fragColor";class v{constructor(){this._entries=new Set}add(e,t,r){let i="ERROR_CONSTRUCTOR_STRING";switch(t){case"float":i=v._numberToFloatStr(r);break;case"int":i=v._numberToIntStr(r);break;case"bool":i=r.toString();break;case"vec2":i=`vec2(${v._numberToFloatStr(r[0])},                            ${v._numberToFloatStr(r[1])})`;break;case"vec3":i=`vec3(${v._numberToFloatStr(r[0])},                            ${v._numberToFloatStr(r[1])},                            ${v._numberToFloatStr(r[2])})`;break;case"vec4":i=`vec4(${v._numberToFloatStr(r[0])},                            ${v._numberToFloatStr(r[1])},                            ${v._numberToFloatStr(r[2])},                            ${v._numberToFloatStr(r[3])})`;break;case"ivec2":i=`ivec2(${v._numberToIntStr(r[0])},                             ${v._numberToIntStr(r[1])})`;break;case"ivec3":i=`ivec3(${v._numberToIntStr(r[0])},                             ${v._numberToIntStr(r[1])},                             ${v._numberToIntStr(r[2])})`;break;case"ivec4":i=`ivec4(${v._numberToIntStr(r[0])},                             ${v._numberToIntStr(r[1])},                             ${v._numberToIntStr(r[2])},                             ${v._numberToIntStr(r[3])})`;break;case"mat2":case"mat3":case"mat4":i=`${t}(${Array.prototype.map.call(r,(e=>v._numberToFloatStr(e))).join(", ")})`}return this._entries.add(`const ${t} ${e} = ${i};`),this}static _numberToIntStr(e){return e.toFixed(0)}static _numberToFloatStr(e){return Number.isInteger(e)?e.toFixed(1):e.toString()}generateSource(){return Array.from(this._entries)}}const g="#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n  precision highp sampler2D;\n#else\n  precision mediump float;\n  precision mediump sampler2D;\n#endif",_="precision highp float;\nprecision highp sampler2D;"},70367:(e,t,r)=>{r.d(t,{N:()=>o});var i=r(7223),n=r(24245);class o extends i.n{constructor(e,t){super(e,"sampler2D",n.c.Pass,((r,i,n)=>r.bindTexture(e,t(i,n))))}}},16506:(e,t,r)=>{r.d(t,{$:()=>i});class i{constructor(e,t){this._module=e,this._loadModule=t}get(){return this._module}async reload(){return this._module=await this._loadModule(),this._module}}},42693:(e,t,r)=>{r.d(t,{w:()=>o});var i=r(30726),n=r(93345);class o{constructor(e,t,r){this.release=r,this.initializeConfiguration(e,t),this._configuration=t.snapshot(),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}destroy(){this._program=(0,i.WD)(this._program),this._pipeline=this._configuration=null}reload(e){(0,i.WD)(this._program),this._program=this.initializeProgram(e),this._pipeline=this.initializePipeline(e)}get program(){return this._program}get compiled(){return this.program.compiled}get key(){return this._configuration.key}get configuration(){return this._configuration}ensureAttributeLocations(e){this.program.assertCompatibleVertexAttributeLocations(e)}get primitiveType(){return n.WR.TRIANGLES}getPipeline(e,t,r){return this._pipeline}initializeConfiguration(e,t){}}},99415:(e,t,r)=>{r.d(t,{K:()=>n,W:()=>o});var i=r(64839);class n extends i.Y{constructor(){super(),this._key="",this._keyDirty=!1,this._parameterBits=this._parameterBits?this._parameterBits.map((()=>0)):[],this._parameterNames||(this._parameterNames=[])}get key(){return this._keyDirty&&(this._keyDirty=!1,this._key=String.fromCharCode.apply(String,this._parameterBits)),this._key}snapshot(){const e=this._parameterNames,t={key:this.key};for(const r of e)t[r]=this[r];return t}}function o(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(t,r)=>{if(t._parameterNames=t._parameterNames??[],t._parameterNames.push(r),null!=e.constValue)Object.defineProperty(t,r,{get:()=>e.constValue});else{const i=t._parameterNames.length-1,n=e.count||2,o=Math.ceil(Math.log2(n)),a=t._parameterBits??[0];let s=0;for(;a[s]+o>16;)s++,s>=a.length&&a.push(0);t._parameterBits=a;const l=a[s],c=(1<<o)-1<<l;a[s]+=o,Object.defineProperty(t,r,{get(){return this[i]},set(e){if(this[i]!==e&&(this[i]=e,this._keyDirty=!0,this._parameterBits[s]=this._parameterBits[s]&~c|+e<<l&c,"number"!=typeof e&&"boolean"!=typeof e))throw new Error("Configuration value for "+r+" must be boolean or number, got "+typeof e)}})}}}},73146:(e,t,r)=>{r.d(t,{J:()=>n});var i=r(90632);class n{constructor(){this.id=(0,i.c)()}}},87634:(e,t,r)=>{var i;r.d(t,{X:()=>i}),function(e){e[e.Layer=0]="Layer",e[e.Object=1]="Object",e[e.Mesh=2]="Mesh",e[e.Line=3]="Line",e[e.Point=4]="Point",e[e.Material=5]="Material",e[e.Texture=6]="Texture",e[e.COUNT=7]="COUNT"}(i||(i={}))},32119:(e,t,r)=>{r.d(t,{D:()=>n});var i=r(66470);const n=new Map([[i.r.POSITION,0],[i.r.NORMAL,1],[i.r.NORMALCOMPRESSED,1],[i.r.UV0,2],[i.r.COLOR,3],[i.r.COLORFEATUREATTRIBUTE,3],[i.r.SIZE,4],[i.r.TANGENT,4],[i.r.CENTEROFFSETANDDISTANCE,5],[i.r.SYMBOLCOLOR,5],[i.r.FEATUREATTRIBUTE,6],[i.r.INSTANCEFEATUREATTRIBUTE,6],[i.r.INSTANCECOLOR,7],[i.r.OBJECTANDLAYERIDCOLOR,7],[i.r.INSTANCEOBJECTANDLAYERIDCOLOR,7],[i.r.INSTANCEMODEL,8],[i.r.INSTANCEMODELNORMAL,12],[i.r.INSTANCEMODELORIGINHI,11],[i.r.INSTANCEMODELORIGINLO,15]])},16005:(e,t,r)=>{r.d(t,{m:()=>l});var i=r(30726),n=r(50346),o=r(64839),a=r(83490);class s{constructor(e){this._material=e.material,this._techniques=e.techniques,this._output=e.output}dispose(){this._techniques.release(this._technique)}get technique(){return this._technique}get _stippleTextures(){return this._techniques.constructionContext.stippleTextures}get _markerTextures(){return this._techniques.constructionContext.markerTextures}ensureTechnique(e,t){return this._technique=this._techniques.releaseAndAcquire(e,this._material.getConfiguration(this._output,t),this._technique),this._technique}ensureResources(e){return a.Am.LOADED}}class l extends s{constructor(e){super(e),this._numLoading=0,this._disposed=!1,this._textures=e.textures,this._textureId=e.textureId,this._acquire(e.textureId,(e=>this._texture=e)),this._acquire(e.normalTextureId,(e=>this._textureNormal=e)),this._acquire(e.emissiveTextureId,(e=>this._textureEmissive=e)),this._acquire(e.occlusionTextureId,(e=>this._textureOcclusion=e)),this._acquire(e.metallicRoughnessTextureId,(e=>this._textureMetallicRoughness=e))}dispose(){this._texture=(0,i.Gz)(this._texture),this._textureNormal=(0,i.Gz)(this._textureNormal),this._textureEmissive=(0,i.Gz)(this._textureEmissive),this._textureOcclusion=(0,i.Gz)(this._textureOcclusion),this._textureMetallicRoughness=(0,i.Gz)(this._textureMetallicRoughness),this._disposed=!0}ensureResources(e){return 0===this._numLoading?a.Am.LOADED:a.Am.LOADING}get textureBindParameters(){return new c(null!=this._texture?this._texture.glTexture:null,null!=this._textureNormal?this._textureNormal.glTexture:null,null!=this._textureEmissive?this._textureEmissive.glTexture:null,null!=this._textureOcclusion?this._textureOcclusion.glTexture:null,null!=this._textureMetallicRoughness?this._textureMetallicRoughness.glTexture:null)}updateTexture(e){null!=this._texture&&e===this._texture.id||(this._texture=(0,i.Gz)(this._texture),this._textureId=e,this._acquire(this._textureId,(e=>this._texture=e)))}_acquire(e,t){if(null==e)return void t(null);const r=this._textures.acquire(e);if((0,n.$X)(r))return++this._numLoading,void r.then((e=>{if(this._disposed)return(0,i.Gz)(e),void t(null);t(e)})).finally((()=>--this._numLoading));t(r)}}class c extends o.Y{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,o=arguments.length>5?arguments[5]:void 0,a=arguments.length>6?arguments[6]:void 0;super(),this.texture=e,this.textureNormal=t,this.textureEmissive=r,this.textureOcclusion=i,this.textureMetallicRoughness=n,this.scale=o,this.normalTextureTransformMatrix=a}}},84103:(e,t,r)=>{r.d(t,{im:()=>u,m$:()=>o});var i=r(9392),n=r(64839);var o,a=r(83490),s=r(73146),l=r(87634),c=r(32119),d=r(25814);class u extends s.J{constructor(e,t){super(),this.type=l.X.Material,this.supportsEdges=!1,this._visible=!0,this._renderPriority=0,this._vertexAttributeLocations=c.D,this._pp0=(0,i.fA)(0,0,1),this._pp1=(0,i.fA)(0,0,0),this._parameters=(0,d.qu)(e,t),this.validateParameters(this._parameters)}get parameters(){return this._parameters}update(e){return!1}setParameters(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];(0,d.MB)(this._parameters,e)&&(this.validateParameters(this._parameters),t&&this.parametersChanged())}validateParameters(e){}get visible(){return this._visible}set visible(e){e!==this._visible&&(this._visible=e,this.parametersChanged())}shouldRender(e){return this.isVisible()&&this.isVisibleForOutput(e.output)&&(!this.parameters.isDecoration||e.bindParameters.decorations===a.ID.ON)&&!!(this.parameters.renderOccluded&e.renderOccludedMask)}isVisibleForOutput(e){return!0}get renderPriority(){return this._renderPriority}set renderPriority(e){e!==this._renderPriority&&(this._renderPriority=e,this.parametersChanged())}get vertexAttributeLocations(){return this._vertexAttributeLocations}isVisible(){return this._visible}parametersChanged(){this.repository?.materialChanged(this)}queryRenderOccludedState(e){return this.isVisible()&&this.parameters.renderOccluded===e}intersectDraped(e,t,r,i,n,o){return this._pp0[0]=this._pp1[0]=i[0],this._pp0[1]=this._pp1[1]=i[1],this.intersect(e,t,r,this._pp0,this._pp1,n)}}!function(e){e[e.None=0]="None",e[e.Occlude=1]="Occlude",e[e.Transparent=2]="Transparent",e[e.OccludeAndTransparent=4]="OccludeAndTransparent",e[e.OccludeAndTransparentStencil=8]="OccludeAndTransparentStencil",e[e.Opaque=16]="Opaque"}(o||(o={}));n.Y},28584:(e,t,r)=>{r.d(t,{B:()=>o});var i=r(30015),n=r(61678);class o{constructor(e,t,r){this._context=e,this._locations=r,this._textures=new Map,this._freeTextureUnits=new i.A({deallocator:null}),this._glProgram=e.programCache.acquire(t.generate("vertex"),t.generate("fragment"),r),this._glProgram.stop=()=>{throw new Error("Wrapped _glProgram used directly")},this.bindPass=t.generateBindPass(this),this.bindDraw=t.generateBindDraw(this),this._fragmentUniforms=(0,n.en)()?t.fragmentUniforms:null}dispose(){this._glProgram.dispose()}get glName(){return this._glProgram.glName}get hasTransformFeedbackVaryings(){return this._glProgram.hasTransformFeedbackVaryings}get compiled(){return this._glProgram.compiled}setUniform1b(e,t){this._glProgram.setUniform1i(e,t?1:0)}setUniform1i(e,t){this._glProgram.setUniform1i(e,t)}setUniform1f(e,t){this._glProgram.setUniform1f(e,t)}setUniform2fv(e,t){this._glProgram.setUniform2fv(e,t)}setUniform3fv(e,t){this._glProgram.setUniform3fv(e,t)}setUniform4fv(e,t){this._glProgram.setUniform4fv(e,t)}setUniformMatrix3fv(e,t){this._glProgram.setUniformMatrix3fv(e,t)}setUniformMatrix4fv(e,t){this._glProgram.setUniformMatrix4fv(e,t)}setUniform1fv(e,t){this._glProgram.setUniform1fv(e,t)}setUniform1iv(e,t){this._glProgram.setUniform1iv(e,t)}setUniform2iv(e,t){this._glProgram.setUniform3iv(e,t)}setUniform3iv(e,t){this._glProgram.setUniform3iv(e,t)}setUniform4iv(e,t){this._glProgram.setUniform4iv(e,t)}assertCompatibleVertexAttributeLocations(e){e.locations!==this._locations&&console.error("VertexAttributeLocations are incompatible")}stop(){this._textures.clear(),this._freeTextureUnits.clear()}bindTexture(e,t){if(null==t?.glName){const t=this._textures.get(e);return t&&(this._context.bindTexture(null,t.unit),this._freeTextureUnit(t),this._textures.delete(e)),null}let r=this._textures.get(e);return null==r?(r=this._allocTextureUnit(t),this._textures.set(e,r)):r.texture=t,this._context.useProgram(this),this.setUniform1i(e,r.unit),this._context.bindTexture(t,r.unit),r.unit}rebindTextures(){this._context.useProgram(this),this._textures.forEach(((e,t)=>{this._context.bindTexture(e.texture,e.unit),this.setUniform1i(t,e.unit)})),this._fragmentUniforms?.forEach((e=>{"sampler2D"!==e.type&&"samplerCube"!==e.type||this._textures.has(e.name)||console.error(`Texture sampler ${e.name} has no bound texture`)}))}_allocTextureUnit(e){return{texture:e,unit:0===this._freeTextureUnits.length?this._textures.size:this._freeTextureUnits.pop()}}_freeTextureUnit(e){this._freeTextureUnits.push(e.unit)}}},10773:(e,t,r)=>{var i;r.d(t,{y:()=>i}),function(e){e[e.ColorAlpha=0]="ColorAlpha",e[e.FrontFace=1]="FrontFace",e[e.NONE=2]="NONE",e[e.COUNT=3]="COUNT"}(i||(i={}))},86994:(e,t,r)=>{r.d(t,{O_:()=>o,vA:()=>n});r(72745),r(43047);(0,r(55855).vt)();class i{constructor(e){this.message=e}toString(){return`AssertException: ${this.message}`}}function n(e,t){if(!e){t=t||"Assertion";const e=new Error(t).stack;throw new i(`${t} at ${e}`)}}function o(e,t,r,i){let n,o=(r[0]-e[0])/t[0],a=(i[0]-e[0])/t[0];o>a&&(n=o,o=a,a=n);let s=(r[1]-e[1])/t[1],l=(i[1]-e[1])/t[1];if(s>l&&(n=s,s=l,l=n),o>l||s>a)return!1;s>o&&(o=s),l<a&&(a=l);let c=(r[2]-e[2])/t[2],d=(i[2]-e[2])/t[2];return c>d&&(n=c,c=d,d=n),!(o>d||c>a)&&(d<a&&(a=d),!(a<0))}},25814:(e,t,r)=>{r.d(t,{Um:()=>f,qu:()=>d,MB:()=>u,kE:()=>c});var i=r(18690),n=r(15941);r(64465);function o(e,t,r){const i=r.parameters;return l.scale=Math.min(i.divisor/(t-i.offset),1),l.factor=function(e){return Math.abs(e*e*e)}(e),l}function a(e,t){return(0,n.Cc)(e*Math.max(t.scale,t.minScaleFactor),e,t.factor)}function s(e,t,r,i){return a(e,o(t,r,i))}(0,n.kU)(10),(0,n.kU)(12),(0,n.kU)(70),(0,n.kU)(40);const l={scale:0,factor:0,minScaleFactor:0};function c(e,t,r,i,o){let a=(r.screenLength||0)*e.pixelRatio;null!=o&&(a=s(a,i,t,o));const l=a*Math.tan(.5*e.fovY)/(.5*e.fullHeight);return(0,n.qE)(l*t,r.minWorldLength||0,null!=r.maxWorldLength?r.maxWorldLength:1/0)}function d(e,t){const r=t?d(t):{};for(const i in e){let t=e[i];t?.forEach&&(t=h(t)),null==t&&i in r||(r[i]=t)}return r}function u(e,t){let r=!1;for(const n in t){const o=t[n];void 0!==o&&(Array.isArray(o)?null===e[n]?(e[n]=o.slice(),r=!0):(0,i.yo)(e[n],o)&&(r=!0):e[n]!==o&&(r=!0,e[n]=o))}return r}function h(e){const t=[];return e.forEach((e=>t.push(e))),t}const f={multiply:1,ignore:2,replace:3,tint:4}},99643:(e,t,r)=>{function i(e,t,r){for(let i=0;i<r;++i)t[2*i]=e[i],t[2*i+1]=e[i]-t[2*i]}function n(e,t){const r=e.length;for(let i=0;i<r;++i)a[0]=e[i],t[i]=a[0];return t}function o(e,t){const r=e.length;for(let i=0;i<r;++i)a[0]=e[i],a[1]=e[i]-a[0],t[i]=a[1];return t}r.d(t,{Zo:()=>n,jA:()=>o,jS:()=>i});const a=new Float32Array(2)},57162:(e,t,r)=>{r.d(t,{Ey:()=>b,Ms:()=>U,Xt:()=>c,kn:()=>d,ox:()=>o,p3:()=>a,wE:()=>u});var i=r(83490),n=r(93345);function o(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n.Tb.ADD,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[0,0,0,0];return{srcRgb:e,srcAlpha:e,dstRgb:t,dstAlpha:t,opRgb:r,opAlpha:r,color:{r:i[0],g:i[1],b:i[2],a:i[3]}}}function a(e,t,r,i){let o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:n.Tb.ADD,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:n.Tb.ADD,s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:[0,0,0,0];return{srcRgb:e,srcAlpha:t,dstRgb:r,dstAlpha:i,opRgb:o,opAlpha:a,color:{r:s[0],g:s[1],b:s[2],a:s[3]}}}const s={face:n.Y7.BACK,mode:n.Ac.CCW},l={face:n.Y7.FRONT,mode:n.Ac.CCW},c=e=>e===i.s2.Back?s:e===i.s2.Front?l:null,d={zNear:0,zFar:1},u={r:!0,g:!0,b:!0,a:!0};function h(e){return E.intern(e)}function f(e){return w.intern(e)}function m(e){return C.intern(e)}function p(e){return I.intern(e)}function v(e){return N.intern(e)}function g(e){return L.intern(e)}function _(e){return D.intern(e)}function x(e){return F.intern(e)}function T(e){return V.intern(e)}function b(e){return W.intern(e)}class y{constructor(e,t){this._makeKey=e,this._makeRef=t,this._interns=new Map}intern(e){if(!e)return null;const t=this._makeKey(e),r=this._interns;return r.has(t)||r.set(t,this._makeRef(e)),r.get(t)??null}}function A(e){return"["+e.join(",")+"]"}const E=new y(S,(e=>({__tag:"Blending",...e})));function S(e){return e?A([e.srcRgb,e.srcAlpha,e.dstRgb,e.dstAlpha,e.opRgb,e.opAlpha,e.color.r,e.color.g,e.color.b,e.color.a]):null}const w=new y(M,(e=>({__tag:"Culling",...e})));function M(e){return e?A([e.face,e.mode]):null}const C=new y(O,(e=>({__tag:"PolygonOffset",...e})));function O(e){return e?A([e.factor,e.units]):null}const I=new y(R,(e=>({__tag:"DepthTest",...e})));function R(e){return e?A([e.func]):null}const N=new y(P,(e=>({__tag:"StencilTest",...e})));function P(e){return e?A([e.function.func,e.function.ref,e.function.mask,e.operation.fail,e.operation.zFail,e.operation.zPass]):null}const L=new y(H,(e=>({__tag:"DepthWrite",...e})));function H(e){return e?A([e.zNear,e.zFar]):null}const D=new y(B,(e=>({__tag:"ColorWrite",...e})));function B(e){return e?A([e.r,e.g,e.b,e.a]):null}const F=new y(z,(e=>({__tag:"StencilWrite",...e})));function z(e){return e?A([e.mask]):null}const V=new y(G,(e=>({__tag:"DrawBuffers",...e})));function G(e){return e?A(e.buffers):null}const W=new y((function(e){return e?A([S(e.blending),M(e.culling),O(e.polygonOffset),R(e.depthTest),P(e.stencilTest),H(e.depthWrite),B(e.colorWrite),z(e.stencilWrite),G(e.drawBuffers)]):null}),(e=>({blending:h(e.blending),culling:f(e.culling),polygonOffset:m(e.polygonOffset),depthTest:p(e.depthTest),stencilTest:v(e.stencilTest),depthWrite:g(e.depthWrite),colorWrite:_(e.colorWrite),stencilWrite:x(e.stencilWrite),drawBuffers:T(e.drawBuffers)})));class U{constructor(e){this._pipelineInvalid=!0,this._blendingInvalid=!0,this._cullingInvalid=!0,this._polygonOffsetInvalid=!0,this._depthTestInvalid=!0,this._stencilTestInvalid=!0,this._depthWriteInvalid=!0,this._colorWriteInvalid=!0,this._stencilWriteInvalid=!0,this._drawBuffersInvalid=!0,this._stateSetters=e}setPipeline(e){(this._pipelineInvalid||e!==this._pipeline)&&(this._setBlending(e.blending),this._setCulling(e.culling),this._setPolygonOffset(e.polygonOffset),this._setDepthTest(e.depthTest),this._setStencilTest(e.stencilTest),this._setDepthWrite(e.depthWrite),this._setColorWrite(e.colorWrite),this._setStencilWrite(e.stencilWrite),this._setDrawBuffers(e.drawBuffers),this._pipeline=e),this._pipelineInvalid=!1}invalidateBlending(){this._blendingInvalid=!0,this._pipelineInvalid=!0}invalidateCulling(){this._cullingInvalid=!0,this._pipelineInvalid=!0}invalidatePolygonOffset(){this._polygonOffsetInvalid=!0,this._pipelineInvalid=!0}invalidateDepthTest(){this._depthTestInvalid=!0,this._pipelineInvalid=!0}invalidateStencilTest(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDepthWrite(){this._depthWriteInvalid=!0,this._pipelineInvalid=!0}invalidateColorWrite(){this._colorWriteInvalid=!0,this._pipelineInvalid=!0}invalidateStencilWrite(){this._stencilTestInvalid=!0,this._pipelineInvalid=!0}invalidateDrawBuffers(){this._drawBuffersInvalid=!0,this._pipelineInvalid=!0}_setBlending(e){this._blending=this._setSubState(e,this._blending,this._blendingInvalid,this._stateSetters.setBlending),this._blendingInvalid=!1}_setCulling(e){this._culling=this._setSubState(e,this._culling,this._cullingInvalid,this._stateSetters.setCulling),this._cullingInvalid=!1}_setPolygonOffset(e){this._polygonOffset=this._setSubState(e,this._polygonOffset,this._polygonOffsetInvalid,this._stateSetters.setPolygonOffset),this._polygonOffsetInvalid=!1}_setDepthTest(e){this._depthTest=this._setSubState(e,this._depthTest,this._depthTestInvalid,this._stateSetters.setDepthTest),this._depthTestInvalid=!1}_setStencilTest(e){this._stencilTest=this._setSubState(e,this._stencilTest,this._stencilTestInvalid,this._stateSetters.setStencilTest),this._stencilTestInvalid=!1}_setDepthWrite(e){this._depthWrite=this._setSubState(e,this._depthWrite,this._depthWriteInvalid,this._stateSetters.setDepthWrite),this._depthWriteInvalid=!1}_setColorWrite(e){this._colorWrite=this._setSubState(e,this._colorWrite,this._colorWriteInvalid,this._stateSetters.setColorWrite),this._colorWriteInvalid=!1}_setStencilWrite(e){this._stencilWrite=this._setSubState(e,this._stencilWrite,this._stencilWriteInvalid,this._stateSetters.setStencilWrite),this._stencilTestInvalid=!1}_setDrawBuffers(e){this._drawBuffers=this._setSubState(e,this._drawBuffers,this._drawBuffersInvalid,this._stateSetters.setDrawBuffers),this._drawBuffersInvalid=!1}_setSubState(e,t,r,i){return(r||e!==t)&&(i(e),this._pipelineInvalid=!0),e}}}}]);
//# sourceMappingURL=7234.f08ec783.chunk.js.map