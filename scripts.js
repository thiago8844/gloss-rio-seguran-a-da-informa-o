document.addEventListener('DOMContentLoaded', function () {
  const btnBuscar = document.querySelector('.buscar-btn');
  
  btnBuscar.addEventListener('click', function (e) {
      e.preventDefault();
      console.log("foi")
      searchText();
  });
});

function searchText() {
  // Get the input value
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  // Get the content section
  const content = document.querySelector(".termos");

  // Check if the content element exists
  if (!content) {
      console.error("Content element not found");
      return;
  }

  // Remove previous highlights
  const highlightedElements = document.querySelectorAll(".highlight");
  highlightedElements.forEach((el) => {
      el.classList.remove("highlight");
  });

  // If search term is empty, return
  if (searchTerm === "") return;

  // Get the text nodes within the content section
  const textNodes = getTextNodes(content);

  textNodes.forEach((node) => {
      const nodeText = node.nodeValue.toLowerCase();
      let startPos = nodeText.indexOf(searchTerm);
      while (startPos !== -1) {
          // Highlight the found term
          const span = document.createElement("span");
          span.classList.add("highlight");
          const endPos = startPos + searchTerm.length;
          span.textContent = node.nodeValue.substring(startPos, endPos);

          // Split the node text into before, match, and after
          const before = document.createTextNode(
              node.nodeValue.substring(0, startPos)
          );
          const after = document.createTextNode(node.nodeValue.substring(endPos));

          // Replace the original node with the new nodes
          const parent = node.parentNode;
          parent.insertBefore(before, node);
          parent.insertBefore(span, node);
          parent.insertBefore(after, node);
          parent.removeChild(node);

          // Move to the next match
          node = after;
          startPos = node.nodeValue.toLowerCase().indexOf(searchTerm);
      }
  });
}

function getTextNodes(node) {
  let textNodes = [];
  if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach((child) => {
          textNodes = textNodes.concat(getTextNodes(child));
      });
  }
  return textNodes;
}