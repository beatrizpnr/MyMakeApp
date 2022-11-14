import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie("MyMakeAPPCaseDB");

db.version(1).stores({
  product: "++id,name",
});

db.on("populate", async () => {
  await db.product.bulkPut([
    {
      category: "Pele",
      type: "Pó",
      name: "Pó Solto Facial",
      brand: "Boca Rosa Beauty",
      color: "Claro",
      picture: await buildUrl("Pó_Facial"),
     },
    {
      category: "Pele",
      type: "Blush",
      name: "Blush Me",
      brand: "Mari Saad",
      color: "Rosa",
      picture: await buildUrl("Blush"),
    },
  ]);
  retrieveData();
});


db.open();

function buildUrl(nameproduct) {
  return `./images/${nameproduct}.png`;
  
}



async function retrieveData() {
  const productList = await db.product.toArray();

  const section = document.querySelector("section");
  const productHTML = productList.map(toHTML).join("");
  section.innerHTML = productHTML;
  document.body.appendChild(section);



  function toHTML(products) {
    
    return `
    <div>
        <div>        
            ${products.id}
        </div>
        <div>        
            ${products.category}
        </div>
        <div>        
            ${products.name}
        </div>
        <div>        
            ${products.brand}
        </div>
        <div>        
             ${products.color}
        </div>
        <div>        
            <img src=${products.picture}>
        </div>
    </div>
    `;
  }
}
retrieveData();


async function saveFormData(event) {
  event.preventDefault();
  const form = event.target;
  await saveOnDatabase({
    category: form.category.value,
    type: form.type.value,
    name: form.name.value,
    brand: form.brand.value,
    color: form.color.value,
  });

  retrieveData();
  form.reset();
  form.focus();
  return false;
}

async function saveOnDatabase({  category, type, name, brand, color }) {
  const product = await db.product.where("name").equals(name).toArray();
  if (product.length === 0) {
    await db.product.add({
      category,
      type,
      name,
      brand,
      color,
      picture: buildUrl(type),
    });
    
  }

}

const form = document.querySelector("form");
form.addEventListener("submit", saveFormData);
const button = document.querySelector('button');
button.addEventListener('click', function(){             
console.log("add");

});


