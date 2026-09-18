const menu=document.querySelector('#menu'),nav=document.querySelector('#nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Header + active section
const header=document.querySelector('header');
const sections=[...document.querySelectorAll('section[id]')];
const navLinks=[...document.querySelectorAll('nav a')];
const updateNav=()=>{header?.classList.toggle('scrolled',scrollY>20);let id='';sections.forEach(s=>{if(scrollY>=s.offsetTop-180)id=s.id});navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`))};
addEventListener('scroll',updateNav,{passive:true});updateNav();

// Soft cursor spotlight on desktop
if(matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{document.documentElement.style.setProperty('--mx',`${e.clientX}px`);document.documentElement.style.setProperty('--my',`${e.clientY}px`)},{passive:true});}

// Professional GSAP entrance, scroll reveals and ambient motion
if(window.gsap){
 gsap.registerPlugin(ScrollTrigger);
 const tl=gsap.timeline({defaults:{ease:'power3.out'}});
 tl.from('header',{y:-24,opacity:0,duration:.65})
   .from('.hero-copy>*',{y:28,opacity:0,duration:.65,stagger:.075},'-=.25')
   .from('.workspace',{x:45,opacity:0,scale:.96,duration:1},'-=.75')
   .from('.hero-stats',{y:30,opacity:0,duration:.75},'-=.45');
 document.querySelectorAll('.reveal').forEach(el=>gsap.from(el,{scrollTrigger:{trigger:el,start:'top 88%',once:true},y:46,opacity:0,duration:.85,ease:'power3.out'}));
 gsap.to('.f1',{y:-22,x:8,rotation:3,duration:3,repeat:-1,yoyo:true,ease:'sine.inOut'});
 gsap.to('.f2',{y:18,x:-8,rotation:-3,duration:3.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
 gsap.to('.f3',{y:-14,x:12,rotation:2,duration:3.9,repeat:-1,yoyo:true,ease:'sine.inOut'});
 gsap.to('.f4',{y:18,x:8,rotation:-2,duration:2.8,repeat:-1,yoyo:true,ease:'sine.inOut'});
 gsap.to('.quote',{y:-7,duration:2.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
}

// Hero image 3D tilt/parallax — desktop only
const workspace=document.querySelector('.workspace'),heroImg=workspace?.querySelector('img');
if(workspace&&heroImg&&matchMedia('(pointer:fine)').matches){
 workspace.addEventListener('pointermove',e=>{const r=workspace.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;heroImg.style.transform=`rotateY(${x*7}deg) rotateX(${-y*6}deg) translate3d(${x*7}px,${y*7}px,0) scale(1.015)`});
 workspace.addEventListener('pointerleave',()=>heroImg.style.transform='rotateY(0) rotateX(0) translate3d(0,0,0) scale(1)');
}

// Three.js star field with pointer parallax
if(window.THREE){const c=document.querySelector('#space'),s=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,1000),r=new THREE.WebGLRenderer({canvas:c,alpha:true,antialias:true});r.setSize(innerWidth,innerHeight);r.setPixelRatio(Math.min(devicePixelRatio,1.8));cam.position.z=6;const geo=new THREE.BufferGeometry(),n=750,pos=new Float32Array(n*3);for(let i=0;i<n*3;i++)pos[i]=(Math.random()-.5)*18;geo.setAttribute('position',new THREE.BufferAttribute(pos,3));const pts=new THREE.Points(geo,new THREE.PointsMaterial({size:.018,color:0x9c7cff,transparent:true,opacity:.68}));s.add(pts);let mx=0,my=0;addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*.22;my=(e.clientY/innerHeight-.5)*.22},{passive:true});addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();r.setSize(innerWidth,innerHeight)});(function loop(){requestAnimationFrame(loop);pts.rotation.y+=.00035;pts.rotation.x+=.00008;cam.position.x+=(mx-cam.position.x)*.018;cam.position.y+=(-my-cam.position.y)*.018;r.render(s,cam)})()}
