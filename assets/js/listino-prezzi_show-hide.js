function toggleElementVisibility(elementId) {
    var element = document.getElementById(elementId);
    element.style.display = element.style.display === "table" ? "none" : "table";
}