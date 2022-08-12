let page = 0;

const getMonsters = (page) => {
  const url = `http://localhost:3000/monsters?_limit=50&_page=${page}`
  return fetch(url)
  .then(res => res.json());
}

const appendMonsters = (monsters) => {
  const box = document.querySelector('#monster-container');
  box.textContent = '';
  for (const index in monsters) {
    const monster = monsters[index];
    
    const name = document.createElement('h2');
    const age = document.createElement('h4');
    const desc = document.createElement('p');

    name.textContent = `Name: ${monster.name}`;
    age.textContent = `Age: ${monster.age}`;
    desc.textContent = `Description: ${monster.description}`;
    
    box.append(name, age, desc);
  }
}

const appendForm = () => {
  const box = document.querySelector('#create-monster');
  box.innerHTML = `
  <form action='http://localhost:3000/monsters' method='POST'> 
    <input type='text' placeholder='Enter name' id='name' name='name'>
    <input type='text' placeholder='Enter age' id='age' name='age'>
    <input type='text' placeholder='Enter description' id='description' name='description'>
    <button id='create'>Create Monster</button>
  </form>`
}

const post = (monster) => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(monster),
  }
  fetch('http://localhost:3000/monsters', config)
}

const forward = () => {
  page += 1;
  getMonsters(page)
  .then(monsters => appendMonsters(monsters));
}

const back = () => {
  if (page > 0) {
    page -= 1;
  }
  getMonsters(page)
  .then(monsters => appendMonsters(monsters));
}

const listeners = () => {
  const createBtn = document.querySelector('#create');
  createBtn.addEventListener('click', handleCreateClick);
  const fwdBtn = document.querySelector('#forward');
  fwdBtn.addEventListener('click', forward);
  const backBtn = document.querySelector('#back');
  backBtn.addEventListener('click', back);
}

const handleCreateClick = (e) => {
  e.preventDefault();
  const form = e.target.parentElement;
  const monster = {
    name: form.name.value,
    age: form.age.value,
    description: form.description.value,
  }
  post(monster);
}

const frontEndLoop = (() => {
  appendForm();
  listeners();
  getMonsters(0)
  .then(data => appendMonsters(data));
})();