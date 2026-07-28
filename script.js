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
const nameInput=document.getElementById('nameInput');
const projectDetails=document.getElementById('projectDetails');
const phoneHelp=document.getElementById('phoneHelp');
const emailHelp=document.getElementById('emailHelp');
const nameHelp=document.getElementById('nameHelp');
const projectHelp=document.getElementById('projectHelp');
let current=0;

const cityRadios=[...document.querySelectorAll('input[name="city"]')];
const otherCityRadio=document.getElementById('otherCityRadio');
const otherCityField=document.getElementById('otherCityField');
const otherCityInput=document.getElementById('otherCityInput');
function updateOtherCity(){
  const show=otherCityRadio?.checked;
  otherCityField?.classList.toggle('visible',!!show);
  if(otherCityInput){
    otherCityInput.required=!!show;
    if(!show){otherCityInput.value='';otherCityInput.setCustomValidity('');}
  }
}
cityRadios.forEach(r=>r.addEventListener('change',()=>{updateOtherCity();saveDraft()}));
updateOtherCity();

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

function digitsOnly(value){return String(value||'').replace(/\D/g,'').slice(0,10)}
function formatPhone(value){
  const d=digitsOnly(value);
  if(d.length<4)return d;
  if(d.length<7)return `(${d.slice(0,3)}) ${d.slice(3)}`;
  return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
}
function setState(input,help,ok,message){
  if(!input||!help)return;
  input.classList.toggle('is-valid',ok);
  input.classList.toggle('is-invalid',!ok);
  help.classList.toggle('success',ok);
  help.classList.toggle('error',!ok);
  help.textContent=message;
}
function clearState(input,help,defaultMessage){
  input?.classList.remove('is-valid','is-invalid');
  if(help){help.className='field-help';help.textContent=defaultMessage;}
}
function validatePhone(show=true){
  const raw=phone?.value||'';
  const digits=digitsOnly(raw);
  const repeated=/^(\d)\1{9}$/.test(digits);
  const fakeSequence=['1234567890','0123456789'].includes(digits);
  const ok=digits.length===10&&!repeated&&!fakeSequence;
  if(show){
    let message='Phone number looks good.';
    if(!ok){
      if(/[A-Za-z]/.test(raw))message='Use numbers only for the phone number.';
      else if(digits.length===7)message='Please add the 3-digit area code, such as 941.';
      else if(digits.length<10)message='Enter a complete 10-digit phone number, including the area code.';
      else message='Please enter a valid phone number.';
    }
    setState(phone,phoneHelp,ok,message);
  }
  phone?.setCustomValidity(ok?'':'Enter a valid 10-digit phone number including area code.');
  return ok;
}
function validateEmail(show=true){
  const value=email?.value.trim()||'';
  if(!value){
    email?.setCustomValidity('');
    clearState(email,emailHelp,'Example: name@example.com');
    return true;
  }
  const basic=/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
  const ok=basic.test(value)&&!value.includes('..')&&!value.endsWith('.');
  if(show){
    let msg='Email looks good.';
    if(!ok){
      if(!value.includes('@'))msg='The email is missing the @ symbol.';
      else if(!value.split('@')[1]?.includes('.'))msg='The email may be missing .com, .net, or another ending.';
      else msg='Check the email address for a typing mistake.';
    }
    setState(email,emailHelp,ok,msg);
  }
  email?.setCustomValidity(ok?'':'Enter a complete email address, such as name@example.com.');
  return ok;
}
function validateName(show=true){
  const value=nameInput?.value.trim()||'';
  const letters=(value.match(/[A-Za-z]/g)||[]).length;
  const ok=letters>=2&&/^[A-Za-z][A-Za-z .'-]*$/.test(value);
  if(show)setState(nameInput,nameHelp,ok,ok?'Name looks good.':'Enter your name using at least two letters.');
  nameInput?.setCustomValidity(ok?'':'Enter your name using at least two letters.');
  return ok;
}
function validateProject(show=true){
  const value=projectDetails?.value.trim()||'';
  const letters=(value.match(/[A-Za-z]/g)||[]).length;
  const ok=value.length>=10&&letters>=5;
  if(show)setState(projectDetails,projectHelp,ok,ok?'Project details look good.':'Please write at least a short sentence about the work (10 or more characters).');
  projectDetails?.setCustomValidity(ok?'':'Please include at least 10 characters describing the project.');
  return ok;
}

phone?.addEventListener('input',()=>{
  const typed=phone.value;
  if(/[A-Za-z]/.test(typed)){
    setState(phone,phoneHelp,false,'Use numbers only for the phone number.');
    phone.setCustomValidity('Use numbers only for the phone number.');
  }else{
    phone.value=formatPhone(typed);
    const count=digitsOnly(phone.value).length;
    if(count===10)validatePhone(true);else clearState(phone,phoneHelp,'Please include all 10 digits, including the area code.');
  }
  saveDraft();
});
phone?.addEventListener('blur',()=>validatePhone(true));
email?.addEventListener('blur',()=>validateEmail(true));
email?.addEventListener('input',()=>{clearState(email,emailHelp,'Example: name@example.com');email.setCustomValidity('');saveDraft()});
nameInput?.addEventListener('input',()=>{clearState(nameInput,nameHelp,'Enter your name using letters.');nameInput.setCustomValidity('');saveDraft()});
nameInput?.addEventListener('blur',()=>validateName(true));
projectDetails?.addEventListener('input',()=>{clearState(projectDetails,projectHelp,'Please include at least a short sentence about the work.');projectDetails.setCustomValidity('');saveDraft()});
projectDetails?.addEventListener('blur',()=>validateProject(true));
otherCityInput?.addEventListener('input',saveDraft);
form?.querySelectorAll('input[name="service"]').forEach(r=>r.addEventListener('change',saveDraft));

function valid(){
  alertBox.classList.remove('show');
  if(current===0&&!steps[0].querySelector('input[name="service"]:checked')){
    alertBox.textContent='Please choose a service before continuing.';
    alertBox.classList.add('show');
    return false;
  }
  if(current===1){
    const selectedCity=document.querySelector('input[name="city"]:checked');
    if(!selectedCity){
      alertBox.textContent='Please choose the city where the project is located.';
      alertBox.classList.add('show');
      return false;
    }
    if(selectedCity.value==='Other'&&!otherCityInput.value.trim()){
      alertBox.textContent='Please type the city where the project is located.';
      alertBox.classList.add('show');
      otherCityInput.focus();
      return false;
    }
  }
  if(current===2&&!validateProject(true)){
    alertBox.textContent='Please add a little more detail about the project.';
    alertBox.classList.add('show');
    projectDetails.focus();
    return false;
  }
  if(current===3){
    const nameOK=validateName(true);
    const phoneOK=validatePhone(true);
    const emailOK=validateEmail(true);
    if(!nameOK||!phoneOK||!emailOK){
      alertBox.textContent='Please correct the highlighted contact information.';
      alertBox.classList.add('show');
      (!nameOK?nameInput:!phoneOK?phone:email).focus();
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
next?.addEventListener('click',()=>{if(valid()){current++;render();saveDraft()}});
back?.addEventListener('click',()=>{current=Math.max(0,current-1);render();saveDraft()});

// Save unfinished form locally on the visitor's device.
const draftKey='axelsTrustedEstimateDraftV1';
function saveDraft(){
  if(!form)return;
  const service=form.querySelector('input[name="service"]:checked')?.value||'';
  const city=form.querySelector('input[name="city"]:checked')?.value||'';
  const draft={service,city,otherCity:otherCityInput?.value||'',message:projectDetails?.value||'',name:nameInput?.value||'',phone:phone?.value||'',email:email?.value||'',current};
  try{localStorage.setItem(draftKey,JSON.stringify(draft))}catch(_e){}
}
function restoreDraft(){
  try{
    const draft=JSON.parse(localStorage.getItem(draftKey)||'null');
    if(!draft)return;
    if(draft.service)form.querySelector(`input[name="service"][value="${CSS.escape(draft.service)}"]`)?.click();
    if(draft.city)form.querySelector(`input[name="city"][value="${CSS.escape(draft.city)}"]`)?.click();
    if(otherCityInput)otherCityInput.value=draft.otherCity||'';
    if(projectDetails)projectDetails.value=draft.message||'';
    if(nameInput)nameInput.value=draft.name||'';
    if(phone)phone.value=formatPhone(draft.phone||'');
    if(email)email.value=draft.email||'';
    current=Math.min(Math.max(Number(draft.current)||0,0),steps.length-1);
    updateOtherCity();
  }catch(_e){}
}
restoreDraft();

form?.addEventListener('submit',async event=>{
  event.preventDefault();
  // Run all final checks again so invalid data cannot bypass a step.
  const allValid=validateProject(true)&&validateName(true)&&validatePhone(true)&&validateEmail(true);
  if(!allValid||!valid()){
    current=allValid?current:3;
    render();
    alertBox.textContent='Please correct the highlighted fields before sending.';
    alertBox.classList.add('show');
    return;
  }
  submit.disabled=true;
  submit.textContent='Sending...';
  try{
    const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    if(!response.ok)throw new Error();
    localStorage.removeItem(draftKey);
    form.classList.add('completed');
  }catch(error){
    alertBox.textContent='There was a problem sending the form. Please call (941) 404-9777.';
    alertBox.classList.add('show');
    submit.disabled=false;
    submit.textContent='Request Free Estimate';
  }
});
render();
