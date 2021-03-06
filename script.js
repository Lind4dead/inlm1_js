const regForm = document.querySelector('#regForm');
const output = document.querySelector('#userList');
const saveButton = document.querySelector('#buttonSave');
const emailInput = document.querySelector('#email');
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const idNumber = document.querySelector('#id-number');



let users = [
  {
    id: 'asd',
    firstName: 'Emil',
    lastName: 'Lind',
    email: 'emil.lind@me.se'
  },

  {
    id: 'asdd',
    firstName: 'Emil',
    lastName: 'Lind',
    email: 'emil.lind@me.com'
  }
]

const validateText = (id) => {

  let input = document.querySelector(id);
  let nameError = document.querySelector(id + '-error')
  

  if (input.value === '' || input.value.length < 2) {
    nameError.innerText = 'Your name have to be atleast 2 characters long'
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    input.focus();
    return false;
  }
  else {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    return true;
  }

}

const validateMail = (mail) => {
  let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  let emailError = document.querySelector('#email-error');
  emailError.innerText = 'You have to enter a correct email.'

  let dupMail = true;
  if (users.find(u => u.email === mail.value)) {

    emailError.innerText = 'That email already exists'
    mail.classList.remove('is-valid');
    mail.classList.add('is-invalid');
    mail.focus();
    dupMail = false;
  }
  
  if (dupMail) {

    if (regEx.test(mail.value)) {
      mail.classList.remove('is-invalid');
      mail.classList.add('is-valid');
      return true;
    }
    else {
      mail.classList.remove('is-valid')
      mail.classList.add('is-invalid');
      mail.focus();
      return false;
    }

  }
  else {
    return false;
  }

}



const regUser = (e) => {
  const newUser = {
    id: Date.now().toString(),
    firstName: e.currentTarget.firstName.value,
    lastName: e.currentTarget.lastName.value,
    email: e.currentTarget.email.value
  };
  users.push(newUser);
}

const addUserToList = () => {
  output.innerHTML = '';
  users.forEach(user => {
    output.innerHTML += `
    <li class="list-group-item d-flex">
        <div class="me-auto d-flex justify-content-between w-100">
          <div>
            <div class="fw-bold">${user.firstName} ${user.lastName}</div>
            <a href="mailto:${user.email}">${user.email}</a>
          </div>  
          <div class="d-flex align-items-center" id="${user.id}">
          <button type="button" class="btn btn-info btn-sm mx-3" id="buttonChange">Change</button>
          <button type="button" class="btn btn-danger btn-sm" id="buttonDelete">X</button>
          </div>
        </div>
      </li>
    `
  })
}

const resetInputs = (e) => {
  for (let i = 0; i < e.currentTarget.length; i++) {
    e.currentTarget[i].value = '';
  }
}


addUserToList();


email.addEventListener('keyup', () => {
  const list = [...email.classList]

  if (list.includes('is-invalid'))
    validateMail(email);
})

firstNameInput.addEventListener('keyup', () => {
  const list = [...firstNameInput.classList];

  if (list.includes('is-invalid'))
    validateText('#' + firstName.id);
}),

  lastNameInput.addEventListener('keyup', () => {
    const list = [...lastNameInput.classList];

    if (list.includes('is-invalid'))
      validateText('#' + lastName.id);
  })


regForm.addEventListener('submit', e => {
  e.preventDefault();
  
  const errors = [];
  
  if (e.submitter.id !== 'buttonSave') {
    for (let i = 0; i < e.currentTarget.length; i++) {
      if (e.currentTarget[i].type === 'text') {
        errors[i] = validateText('#' + e.currentTarget[i].id);
      }
      else if (e.currentTarget[i].type === 'email') {

        errors[i] = validateMail(email);
      }
    }
    if (errors.includes(false)) {
      return;
    }
    else {
      regUser(e);
      addUserToList();
      resetInputs(e);
      
    }
  }

  else if (e.submitter.id === 'buttonSave') {
    const changeUser = users.find(u => u.id === idNumber.innerText);
    const tempMail = users.find(u => u.id === idNumber.innerText).email;
    const index = users.indexOf(changeUser);

    for (let i = 0; i < e.currentTarget.length; i++) {
      if (e.currentTarget[i].type === 'text') {
        errors[i] = validateText('#' + e.currentTarget[i].id);
      }
      else if (e.currentTarget[i].type === 'email') {
        if(tempMail !== email.value){
          errors[i] = validateMail(email);
        }
      }
    }
    if (errors.includes(false)) {
      return;
    }
    users[index] = {
      id: idNumber.innerText,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: email.value
    }
    addUserToList();
    resetInputs(e);
    buttonReg.classList.remove('d-none');
    buttonSave.classList.add('d-none');
  }
})

output.addEventListener('click', (e) => {


  const changeUser = users.find(u => u.id === e.target.parentNode.id);
  
  if (e.target.type === 'button' && e.target.id === 'buttonChange') {
    firstNameInput.value = changeUser.firstName;
    lastNameInput.value = changeUser.lastName;
    email.value = changeUser.email;
    idNumber.innerText = changeUser.id;

    buttonReg.classList.add('d-none');
    buttonSave.classList.remove('d-none');
  }
  else {
    users = users.filter(user => user.id !== e.target.parentNode.id);
    addUserToList();
  }
})


