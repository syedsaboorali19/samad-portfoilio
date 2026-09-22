
// ── LOADER ──
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const l=document.getElementById('loader');
    l.style.transition='opacity .6s';l.style.opacity='0';
    setTimeout(()=>l.style.display='none',600);
    // animate mobile menu links
    document.querySelectorAll('.mobile-menu a').forEach((a,i)=>{
      setTimeout(()=>{a.style.opacity='1';a.style.transform='none';a.style.transition='color .2s'},i*80);
    });
  },1800);
});

// ── PARTICLES ──
const pc=document.getElementById('particles');
for(let i=0;i<30;i++){
  const p=document.createElement('div');p.className='hero-particle';
  const size=Math.random()*4+2;
  p.style.cssText=`width:${size}px;height:${size}px;background:${Math.random()>.5?'rgba(124,92,252,0.4)':'rgba(196,92,252,0.3)'};left:${Math.random()*100}%;top:${Math.random()*100}%;--dur:${4+Math.random()*8}s;--delay:${Math.random()*4}s;--opacity:${.2+Math.random()*.4};--tx:${(Math.random()-.5)*60}px;--ty:${(Math.random()-.5)*60}px;--s:${.5+Math.random()}`;
  pc.appendChild(p);
}
// blobs
const blobs=[{s:'400px',bg:'rgba(124,92,252,0.15)',t:'-80px',r:'-80px',bx:'30px',by:'40px',bs:'1.1',bd:'10s',bd2:'0s'},{s:'300px',bg:'rgba(196,92,252,0.1)',b:'-50px',l:'10%',bx:'20px',by:'-30px',bs:'1.05',bd:'8s',bd2:'2s'}];
blobs.forEach(b=>{const el=document.createElement('div');el.className='hero-blob';el.style.cssText=`width:${b.s};height:${b.s};background:${b.bg};${b.t?'top:'+b.t:'bottom:'+b.b};${b.r?'right:'+b.r:'left:'+b.l};--bx:${b.bx};--by:${b.by};--bs:${b.bs};--bd:${b.bd};--bd2:${b.bd2}`;document.querySelector('.hero-particles').appendChild(el);});

// ── TYPING ──
const roles=['Graphic Designer','Logo Designer','Brand Creator','Visual Artist'];
let ri=0,ci=0,del=false;
function type(){
  const t=document.getElementById('typeTarget');
  const cur=roles[ri];
  if(!del){
    t.textContent=cur.slice(0,ci+1);ci++;
    if(ci===cur.length){del=true;setTimeout(type,1600);return;}
  }else{
    t.textContent=cur.slice(0,ci-1);ci--;
    if(ci===0){del=false;ri=(ri+1)%roles.length;}
  }
  setTimeout(type,del?60:80);
}
setTimeout(type,2200);

// ── CURSOR ──
const dot=document.getElementById('cursor-dot'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
function animCursor(){
  rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.work-card,.skill-card,.cred-card,.stat-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-expand'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-expand'));
});
if('ontouchstart' in window){dot.style.display='none';ring.style.display='none';}

// ── NAV ──
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));

// ── PROGRESS ──
const prog=document.getElementById('progress');
window.addEventListener('scroll',()=>{
  const pct=scrollY/(document.body.scrollHeight-innerHeight)*100;
  prog.style.width=pct+'%';
});

// ── BACK TO TOP ──
const btt=document.getElementById('btt');
window.addEventListener('scroll',()=>btt.classList.toggle('show',scrollY>400));
function scrollToTop(){window.scrollTo({top:0,behavior:'smooth'});}

// ── MOBILE MENU ──
function toggleMenu(){
  const h=document.getElementById('ham'),m=document.getElementById('mobileMenu');
  h.classList.toggle('open');m.classList.toggle('open');
}

// ── SCROLL REVEAL ──
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      const bar=e.target.querySelector('.skill-bar-fg');
      if(bar){setTimeout(()=>bar.style.width=(e.target.dataset.pct||80)+'%',200);}
      // timeline
      if(e.target.id==='timeline') e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el=>io.observe(el));
const tlIO=new IntersectionObserver(([e])=>{if(e.isIntersecting){e.target.classList.add('visible');tlIO.unobserve(e.target);}},{threshold:.2});
const tl=document.getElementById('timeline');if(tl)tlIO.observe(tl);

// ── PORTFOLIO FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.work-card').forEach(card=>{
      const show=f==='all'||card.dataset.category===f;
      card.style.transition='opacity .35s,transform .35s';
      card.style.opacity=show?'1':'0.2';
      card.style.pointerEvents=show?'all':'none';
      card.style.transform=show?'':'scale(0.95)';
    });
  });
});

// ── MODAL ──
document.querySelectorAll('.work-card').forEach(card=>{
  card.addEventListener('click',()=>{
    const d=JSON.parse(card.dataset.modal||'{}');
    document.getElementById('mEmoji').textContent=d.emoji||'🎨';
    document.getElementById('mTag').textContent=d.tag||'';
    document.getElementById('mTitle').textContent=d.title||'';
    document.getElementById('mDesc').textContent=d.desc||'';
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow='hidden';
  });
});
function closeModal(){
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

// ── FORM ──
function handleForm(e){
  e.preventDefault();
  const btn=e.target.querySelector('.form-submit');
  btn.textContent='Sending...';btn.disabled=true;
  setTimeout(()=>{btn.textContent='Sent! ✅';setTimeout(()=>{btn.textContent='Send Message ✉️';btn.disabled=false;e.target.reset();},2500);},1000);
}

// ── 3D TILT ──
document.querySelectorAll('.skill-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    const rx2=(y/r.height-.5)*10,ry2=(x/r.width-.5)*-10;
    card.style.transform=`translateY(-6px) rotateX(${rx2}deg) rotateY(${ry2}deg)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});
