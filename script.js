const tbody = document.getElementById("contenu-lexique");
const input = document.getElementById("search");
const menuCategories = document.getElementById("menu-categories");
let lexique = [];

async function chargerLexique() {
  const response = await fetch('https://chancelucas.github.io/API_LexiqueDevWeb/lexique.json');
  const data = await response.json();
  lexique = data.categories; // Adapter à la structure de l'API
  afficherMenuCategories();
  afficherLexique();
}

function afficherMenuCategories() {
  menuCategories.innerHTML = "";
  // Ajouter une option pour afficher toutes les catégories en premier
  const liToutes = document.createElement("li");
  liToutes.innerHTML = `<a href="#" onclick="filtrerParCategorie('')">Toutes les catégories</a>`;
  menuCategories.appendChild(liToutes);

  lexique.forEach(categorie => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="filtrerParCategorie('${categorie.nom}')">${categorie.nom}</a>`;
    menuCategories.appendChild(li);
  });
}

function afficherLexique(filtre = "", categorieFiltre = "") {
  tbody.innerHTML = "";
  lexique.forEach(categorie => {
    if (categorieFiltre && categorie.nom !== categorieFiltre) return;

    const filteredTerms = categorie.termes.filter(item =>
      item.terme.toLowerCase().includes(filtre.toLowerCase()) ||
      item.definition.toLowerCase().includes(filtre.toLowerCase())
    );

    if (filteredTerms.length > 0) {
      const categoryRow = document.createElement("tr");
      categoryRow.innerHTML = `<td colspan="2"><strong>${categorie.nom}</strong></td>`;
      tbody.appendChild(categoryRow);

      filteredTerms.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `<td><strong>${item.terme}</strong></td><td>${item.definition}</td>`;
        tbody.appendChild(row);
      });

      // Afficher les sous-catégories si elles existent
      if (categorie.sousCategories) {
        categorie.sousCategories.forEach(sousCategorie => {
          const sousCategoryRow = document.createElement("tr");
          sousCategoryRow.innerHTML = `<td colspan="2"><strong>${sousCategorie.nom}</strong></td>`;
          tbody.appendChild(sousCategoryRow);

          sousCategorie.termes.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `<td><strong>${item.terme}</strong></td><td>${item.definition}</td>`;
            tbody.appendChild(row);
          });
        });
      }
    }
  });
}

function filtrerParCategorie(categorieNom) {
  afficherLexique(input.value, categorieNom);
}

input.addEventListener("input", e => {
  afficherLexique(e.target.value);
});

chargerLexique(); // 👈 Lance le chargement du JSON