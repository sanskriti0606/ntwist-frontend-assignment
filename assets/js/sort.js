function sortNames() {
    const ul = document.getElementById("nameList");
    const items = Array.from(ul.getElementsByTagName("li"));
  
    const sortedItems = items
      .map(li => li.textContent)
      .sort((a, b) => a.localeCompare(b));
  
    ul.innerHTML = "";
    sortedItems.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      ul.appendChild(li);
    });
  }
  