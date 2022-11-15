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
  
});


db.open();

function buildUrl(nameproduct) {
  return `./images/${nameproduct}.png`;
  
}

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

try {
  const form = document.querySelector("form");
  form.addEventListener("submit", saveFormData);
} catch (error) {
    console.log('bypass error');

}


export default db;