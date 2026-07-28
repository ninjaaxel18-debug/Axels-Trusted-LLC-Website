const menu=document.querySelector('.menu');
const header=document.querySelector('.site-header');
menu?.addEventListener('click',()=>header.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>header.classList.remove('open')));

// Before-and-after slider
const range=document.querySelector('.compare input');
const before=document.querySelector('.before');
const compare=document.querySelector('.compare');
function updateCompare(){
  if(!range||!before||!compare)return;
  const value=range.value;
  before.style.width=value+'%';
  compare.style.setProperty('--x',value+'%');
}
range?.addEventListener('input',updateCompare);
updateCompare();

// Multi-step form
const form=document.getElementById('leadForm');
const steps=[...document.querySelectorAll('.form-step')];
const next=document.getElementById('nextBtn');
const back=document.getElementById('backBtn');
const submit=document.getElementById('submitBtn');
const bar=document.getElementById('progressBar');
const label=document.getElementById('stepLabel');
const phone=document.getElementById('phoneInput');
const email=document.getElementById('emailInput');
const phoneHelp=document.getElementById('phoneHelp');
const emailHelp=document.getElementById('emailHelp');
let current=0;

const alertBox=document.createElement('div');
alertBox.className='form-alert';
alertBox.setAttribute('role','alert');
alertBox.setAttribute('aria-live','polite');
document.querySelector('.form-actions')?.before(alertBox);

function render(){
  steps.forEach((s,i)=>s.classList.toggle('active',i===current));
  bar.style.width=((current+1)/steps.length*100)+'%';
  label.textContent=`Step ${current+1} of ${steps.length}`;
  back.style.display=current?'inline-flex':'none';
  next.style.display=current===steps.length-1?'none':'inline-flex';
  submit.style.display=current===steps.length-1?'inline-flex':'none';
  alertBox.classList.remove('show');
}

function digitsOnly(value){return value.replace(/\D/g,'').slice(0,10)}
function formatPhone(value){
  const d=digitsOnly(value);
  if(d.length<4)return d;
  if(d.length<7)return `(${d.slice(0,3)}) ${d.slice(3)}`;
  return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
}
function setState(input,help,ok,message){
  input.classList.toggle('is-valid',ok);
  input.classList.toggle('is-invalid',!ok);
  help.classList.toggle('success',ok);
  help.classList.toggle('error',!ok);
  help.textContent=message;
}
function validatePhone(show=true){
  const count=digitsOnly(phone.value).length;
  const ok=count===10;
  if(show){
    if(ok)setState(phone,phoneHelp,true,'Phone number looks good.');
    else setState(phone,phoneHelp,false,count===7?'Please add the 3-digit area code, such as 941.':'Enter a complete 10-digit phone number, including the area code.');
  }
  phone.setCustomValidity(ok?'':'Enter a complete 10-digit phone number including area code.');
  return ok;
}
function validateEmail(show=true){
  const value=email.value.trim();
  if(!value){
    email.setCustomValidity('');
    email.classList.remove('is-valid','is-invalid');
    emailHelp.className='field-help';
    emailHelp.textContent='Example: name@example.com';
    return true;
  }
  const basic=/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  const ok=basic.test(value);
  if(show){
    let msg='Email looks good.';
    if(!ok){
      if(!value.includes('@'))msg='The email is missing the @ symbol.';
      else if(!value.split('@')[1]?.includes('.'))msg='The email may be missing .com, .net, or another ending.';
      else msg='Check the email address for a typing mistake.';
    }
    setState(email,emailHelp,ok,msg);
  }
  email.setCustomValidity(ok?'':'Enter a complete email address, such as name@example.com.');
  return ok;
}
phone?.addEventListener('input',()=>{phone.value=formatPhone(phone.value);if(digitsOnly(phone.value).length===10)validatePhone(true);else{phone.classList.remove('is-valid');phone.setCustomValidity('')}});
phone?.addEventListener('blur',()=>validatePhone(true));
email?.addEventListener('blur',()=>validateEmail(true));
email?.addEventListener('input',()=>{email.classList.remove('is-valid','is-invalid');email.setCustomValidity('');emailHelp.className='field-help';emailHelp.textContent='Example: name@example.com'});

function valid(){
  alertBox.classList.remove('show');
  if(current===0&&!steps[0].querySelector('input[name="service"]:checked')){
    alertBox.textContent='Please choose a service before continuing.';
    alertBox.classList.add('show');
    return false;
  }
  if(current===3){
    const phoneOK=validatePhone(true);
    const emailOK=validateEmail(true);
    if(!phoneOK||!emailOK){
      alertBox.textContent='Please correct the highlighted contact information.';
      alertBox.classList.add('show');
      (!phoneOK?phone:email).focus();
      return false;
    }
  }
  const fields=[...steps[current].querySelectorAll('input,textarea')];
  for(const field of fields){
    if(!field.checkValidity()){
      field.reportValidity();
      return false;
    }
  }
  return true;
}
next?.addEventListener('click',()=>{if(valid()){current++;render()}});
back?.addEventListener('click',()=>{current--;render()});
form?.addEventListener('submit',async event=>{
  event.preventDefault();
  if(!valid())return;
  submit.disabled=true;
  submit.textContent='Sending...';
  try{
    const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    if(!response.ok)throw new Error();
    form.classList.add('completed');
  }catch(error){
    alertBox.textContent='There was a problem sending the form. Please call (941) 404-9777.';
    alertBox.classList.add('show');
    submit.disabled=false;
    submit.textContent='Request Free Estimate';
  }
});
render();
