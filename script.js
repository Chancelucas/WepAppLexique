
  const tbody = document.getElementById("contenu-lexique");
  const input = document.getElementById("search");
  let lexique = [];

  async function chargerLexique() {
    const response = await fetch('lexique.json');
    lexique = await response.json();
    afficherLexique();
  }

  function afficherLexique(filtre = "") {
    tbody.innerHTML = "";
    lexique
      .filter(item =>
        item.terme.toLowerCase().includes(filtre.toLowerCase()) ||
        item.definition.toLowerCase().includes(filtre.toLowerCase())
      )
      .forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `<td><strong>${item.terme}</strong></td><td>${item.definition}</td>`;
        tbody.appendChild(row);
      });
  }

  input.addEventListener("input", e => {
    afficherLexique(e.target.value);
  });

  chargerLexique(); // 👈 Lance le chargement du JSON
