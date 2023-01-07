//local storage part
const updateLS = ()=>{
  const name = document.querySelectorAll(".user-name");
  const email = document.querySelectorAll(".user-email");
  const mobile = document.querySelectorAll(".mobile");
  const role = document.querySelectorAll(".role");

  const nameArr=[];
  const emailArr=[];
  const mobileArr=[];
  const roleArr = [];

  for(let i=0;i<name.length;i++){  
    nameArr.push(name[i].innerHTML);
    emailArr.push(email[i].innerHTML);
    mobileArr.push(mobile[i].innerHTML);
    roleArr.push(role[i].innerHTML);
  }
  localStorage.setItem("name",JSON.stringify(nameArr));
  localStorage.setItem("email",JSON.stringify(emailArr));
  localStorage.setItem("mobile",JSON.stringify(mobileArr));
  localStorage.setItem("role",JSON.stringify(roleArr));
}

const sub = document.querySelector('form');
const process = ()=>{
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const role = document.getElementById("role").value;

    if(isDataValid(name,email,mobile,role)){
        createChild(name,email,mobile,role);
        const status = document.querySelector(".status");
        status.innerHTML = "Sucessfully added";
        status.className='sucess';

      window.setTimeout(()=>{
        status.className='status';
      },2000)
      
    }
}

function isDataValid(name,email,mobile,role) {

  const emailRegax = /^[a-zA-Z0-9.]{3,}@[a-zA-Z]{3,}[.]{1,1}[a-zA-Z.]{2,}$/;
  const mobileRegax = /^[0-9]{10}$/;
  if(name=='' && email=='' && mobile=='' && role==''){
    showErrors('Please fill the form');
    return;
  }
    if(name==''){
      showErrors('Please Enter your name');
      return false;
    }
    if(email==''){
      showErrors('Please Enter your email');
      return false;
    }
    if(mobile==''){
      showErrors('Please Enter your mobile number');
      return false;
    }
    if(role==''){
      showErrors('Please Enter your role');
      return false;
    }
    if(!emailRegax.test(email)){
      showErrors('Please enter a valid email');
      return false;
    }
    if(!mobileRegax.test(mobile)){
      showErrors('Please enter a valid mobile number');
      return false;
    }
    return true;
}
//Show error when user fill wrong data
function showErrors(error) {
    const status = document.querySelector(".status");
    status.innerHTML = error;
    status.className = 'error';
    window.setTimeout(()=>{
        status.className='status';
      },2000)
  }

const createChild = (name,email,mobile,role) =>{
    const div = document.createElement("div");
    div.className='record-items';

    const htmlContent =  `
          <div class="user-detail">
          <div>
            <span> <b>Name:</b> </span><span class="user-name">${name}</span>
            <span> <b>Email:</b> </span><span class="user-email">${email}</span>
          </div>
          <div>
            <span> <b>Mobile:</b> </span><span class="mobile">${mobile}</span>
            <span> <b>Role:</b> </span><span class="role">${role}</span>
          </div>
      </div>
        <button class='btn'>Delete</button>
      `;

  div.innerHTML = htmlContent;
  document.querySelector(".records").appendChild(div);
  
  //deleteing child
  const btn = div.querySelector(".btn");
  btn.addEventListener("click",(e)=>{
    div.remove();
    updateLS();
});
}

sub.addEventListener("submit", (event)=>{
  event.preventDefault();
  process();
  updateLS();
});

window.addEventListener('DOMContentLoaded',()=>{
  //getting reference of all the local storage
  const name = JSON.parse(localStorage.getItem("name"));
  const email = JSON.parse(localStorage.getItem("email"));
  const mobile = JSON.parse(localStorage.getItem("mobile"));
  const role = JSON.parse(localStorage.getItem("role"));
  
  for(let index in name){
  createChild(name[index],email[index],
            mobile[index],
            role[index]);
  }
});

//adding current date in copyright
  const date = new Date();
  const year = date.getFullYear();
  document.getElementById("date").innerHTML = year;
