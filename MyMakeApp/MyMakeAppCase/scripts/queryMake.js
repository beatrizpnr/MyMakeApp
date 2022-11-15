import db from './app.js';

async function retrieveData() {
    const productList = await db.product.toArray();  
    const section = document.getElementById("section");
    const productHTML = productList.map(toHTML).join("");
    section.innerHTML = productHTML;    
  
    function toHTML(products) {
      
      return `
        <tr>
            <td>${products.id}</td>
            <td>${products.name}</td>
            <td>${products.category}</td>
            <td>${products.brand}</td>
            <td>${products.color}</td>
            <td><img src=${products.picture}></td>
                            
        </tr>
    `;
    }
  } 




async function deletedb(event){

    event.preventDefault();
    const form = event.target;    
    const id = parseInt(form.idvalue.value);    
    await db.product.where('id').equals(id).delete();
    retrieveData();
    form.reset(); 
    return false;
}

const form = document.getElementById('form-case');
form.addEventListener('submit', deletedb);
retrieveData();



 



