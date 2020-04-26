
const mewsElemt = document.querySelector('.mews');
const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/mews';

loadingElement.style.display = 'none';

listAllMews();

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    const data = {
        name,
        content
    };
    console.log(data);
    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdMew =>{
        console.log(createdMew);
        setTimeout(() =>{
            form.style.display = "";
        }, 3000)
        
        listAllMews();
        form.reset();
      });
});

function listAllMews(){
    mewsElemt.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(mews =>{
            console.log(mews);
            mews.reverse();
            mews.forEach(mew =>{
                const div = document.createElement('div');
                
                const header = document.createElement('h3');
                header.textContent  = mews.name;

                const textContent = document.createElement("p");
                textContent.textContent = mew.content;

                div.appendChild(header);
                div.appendChild(textContent);
                div.appendChild(date);
                mewsElemt.appendChild(div);

            });
        });
}