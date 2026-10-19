/* Shared check-your-understanding questions for Pixel Smiley Lab + Image Size Explorer.
   Answers are saved in this browser under "pxchecks" so the final certificate can show them. */
(function(){
const MIN_WORDS=25;
const Q={
  lq1:{num:"Question 1",type:"True/False",
    text:"All four smileys are the same physical size. Only the number of pixels in each inch changed.",
    opts:["True","False"],correct:0,
    fb:["Right. Every canvas was 5 inches. Resolution changed how many times each inch was divided, not the size.",
        "Look at the rulers again. Every canvas was 5 inches. Resolution changed how many times each inch was divided, not the size."]},
  lq2:{num:"Question 2",type:"Multiple choice",
    text:"On the same 5 in canvas, what happens to each pixel as the ppi goes up?",
    opts:["Each pixel gets smaller","Each pixel gets bigger","The pixels stay the same size and the canvas gets bigger","The pixels become rounder"],correct:0,
    fb:["Right. Same 5 inches, divided into more pieces. At 5 ppi each pixel is 1/5 in; at 25 ppi it's 1/25 in.",
        "Count the squares in one inch on your 5 ppi and 25 ppi grids. Which squares are bigger?",
        "Check the rulers. Every canvas stayed 5 inches.",
        "Pixels are always square. They just get small enough that the curve looks smooth."]},
  eq1:{num:"Question 3",type:"Multiple choice",
    text:"In Image Size, you uncheck Resample and change the resolution from 72 to 300 ppi. What happens?",
    opts:["The pixel count stays the same and the print size gets smaller","The pixel count increases and the image gets sharper","The print size stays the same and the pixel count increases","Nothing changes"],correct:0,
    fb:["Right. With Resample unchecked, Photoshop rearranges the pixels you have. Pixels ÷ resolution = inches, so more ppi means fewer inches.",
        "That's what a lot of people expect, but with Resample unchecked, no pixels are added.",
        "That's what happens with Resample checked. Look at the checkbox again.",
        "The pixels didn't change, but the inches did. Pixels ÷ resolution = inches."]},
  eq2:{num:"Question 4",type:"True/False",
    text:"Checking Resample and raising the resolution adds detail to a low-resolution image.",
    opts:["True","False"],correct:1,
    fb:["Remember the enlarge trap. Photoshop added pixels, but they were copies and blends of the old ones. The smiley was just as blocky.",
        "Right. Resampling up adds pixels, not detail. The new pixels are copies and blends of the ones you already had."]},
};
const R={
  r1:{num:"Reflection 1",
    text:"Look at your four smileys side by side. How does the same smiley look different at 5 ppi compared to 25 ppi? Why do you think higher ppi makes the curves look cleaner and smoother? Think about how hard it was to paint the curve at 5 ppi compared to 25 ppi."},
  r2:{num:"Reflection 2",
    text:"You download a free stock background that Photoshop says is 16 feet wide at 72 ppi, for an 8.5 × 11 in flyer. Explain what you'd do in Image Size, whether Resample should be on or off, and why."},
  r3:{num:"Reflection 3",
    text:"What clicked for you today, and what about resolution or resampling still feels confusing?"},
};
const KEY="pxchecks";
let st={ans:{},refl:{},draft:{}};
try{const r=localStorage.getItem(KEY);if(r){const p=JSON.parse(r);if(p&&p.ans)st=Object.assign(st,p);}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}
const words=t=>(t||"").trim().split(/\s+/).filter(Boolean).length;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

const css=`
.qcard{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:16px;display:grid;gap:10px;min-width:0}
.qcard .qtext{font-weight:700;margin:0;max-width:70ch;display:block}
.qcard .opts{display:grid;gap:8px}
.qcard .opt{text-align:left;padding:10px 12px;border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--fg);font:500 .95rem var(--body);cursor:pointer;display:flex;gap:10px;align-items:flex-start}
.qcard .opt:hover:not(:disabled){border-color:var(--gold)}
.qcard .opt:disabled{cursor:default;opacity:.6}
.qcard .opt.right:disabled,.qcard .opt.wrong:disabled{opacity:1}
.qcard .opt .mk{flex:0 0 22px;height:22px;border-radius:50%;border:2px solid var(--line);display:grid;place-items:center;font:700 .8rem var(--mono)}
.qcard .opt.right{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 10%,transparent)}
.qcard .opt.right .mk{border-color:var(--ok);background:var(--ok);color:#fff}
.qcard .opt.wrong{border-color:var(--bad);background:color-mix(in srgb,var(--bad) 9%,transparent)}
.qcard .opt.wrong .mk{border-color:var(--bad);background:var(--bad);color:#fff}
.qcard .qfb{padding:10px 12px;border-radius:6px;font-size:.95rem}
.qcard .qfb.ok{background:color-mix(in srgb,var(--ok) 12%,transparent);border:1px solid color-mix(in srgb,var(--ok) 45%,transparent)}
.qcard .qfb.no{background:color-mix(in srgb,var(--bad) 9%,transparent);border:1px solid color-mix(in srgb,var(--bad) 40%,transparent)}
.qcard textarea{width:100%;min-height:130px;resize:vertical;font:1rem/1.5 var(--body);padding:10px 12px;border:2px solid var(--line);border-radius:6px;background:var(--bg);color:var(--fg)}
.qcard textarea:focus-visible,.qcard .opt:focus-visible,.qcard button:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.qcard textarea[readonly]{border-style:dashed}
.qcard .wcrow{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.qcard .wc{font:.8rem var(--mono);color:var(--muted);font-variant-numeric:tabular-nums}
.qcard .wc.met{color:var(--ok)}
.qcard .sub{font:600 .85rem var(--mono);color:var(--ok)}
.qcard .lockn{font-size:.82rem;color:var(--muted);margin:0}
`;
const tag=document.createElement("style");tag.textContent=css;document.head.appendChild(tag);

function mountQuestion(el,id,onDone){
  const q=Q[id];
  el.className="qcard";
  el.innerHTML=`<div class="eyebrow">${q.num} · ${q.type}</div><p class="qtext" id="${id}-t">${esc(q.text)}</p>
    <div class="opts" role="group" aria-labelledby="${id}-t"></div><div class="qfb" role="status" hidden></div>
    <p class="lockn">Your first answer is the one that counts.</p>`;
  const box=el.querySelector(".opts"),fb=el.querySelector(".qfb"),note=el.querySelector(".lockn");
  q.opts.forEach((o,i)=>{const b=document.createElement("button");b.className="opt";b.type="button";
    b.innerHTML=`<span class="mk" aria-hidden="true">${"ABCD"[i]}</span><span>${esc(o)}</span>`;
    b.onclick=()=>{if(st.ans[id]!=null)return;st.ans[id]=i;save();paint();onDone&&onDone();};box.appendChild(b);});
  function paint(){const a=st.ans[id];if(a==null)return;
    [...box.children].forEach((b,i)=>{b.disabled=true;if(i===q.correct)b.classList.add("right");if(i===a&&a!==q.correct)b.classList.add("wrong");
      b.querySelector(".mk").textContent=i===q.correct?"✓":(i===a?"✗":"ABCD"[i]);});
    const ok=a===q.correct;fb.hidden=false;fb.className="qfb "+(ok?"ok":"no");
    fb.innerHTML=(ok?"<strong>Correct.</strong> ":"<strong>Not quite.</strong> ")+esc(q.fb[a])+(ok?"":` <br><strong>Correct answer:</strong> ${esc(q.opts[q.correct])}`);
    note.hidden=true;}
  paint();
}
function mountReflection(el,id,onDone){
  const r=R[id];el.className="qcard";
  el.innerHTML=`<div class="eyebrow">${r.num} · Short answer</div><label class="qtext" for="${id}-ta">${esc(r.text)}</label>
    <textarea id="${id}-ta" placeholder="Write at least ${MIN_WORDS} words in your own words."></textarea>
    <div class="wcrow"><span class="wc" aria-live="polite"></span><button type="button" class="primary">Submit reflection</button></div>`;
  const ta=el.querySelector("textarea"),wc=el.querySelector(".wc"),btn=el.querySelector("button");
  ta.value=st.refl[id]!=null?st.refl[id]:(st.draft[id]||"");
  function upd(){const n=words(ta.value);
    if(st.refl[id]!=null){ta.readOnly=true;btn.hidden=true;wc.className="sub";wc.textContent=`Submitted · ${n} words`;return;}
    wc.className="wc"+(n>=MIN_WORDS?" met":"");wc.textContent=`${n} / ${MIN_WORDS} words`;btn.disabled=n<MIN_WORDS;}
  ta.addEventListener("input",()=>{st.draft[id]=ta.value;save();upd();});
  btn.onclick=()=>{if(words(ta.value)<MIN_WORDS)return;st.refl[id]=ta.value.trim();delete st.draft[id];save();upd();onDone&&onDone();};
  upd();
}
window.CHK={Q,R,MIN_WORDS,st,words,mountQuestion,mountReflection,
  answered:id=>Q[id]?st.ans[id]!=null:st.refl[id]!=null,
  allDone:ids=>ids.every(id=>Q[id]?st.ans[id]!=null:st.refl[id]!=null),
  reload(){try{const r=localStorage.getItem(KEY);if(r){const p=JSON.parse(r);if(p&&p.ans){st.ans=p.ans;st.refl=p.refl||{};st.draft=p.draft||{};}}}catch(e){}}};
})();
