//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
var j;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {  
      
      for (j = 0; j < dropdown.length; j++) {
        if (i!== j){
            dropdown[j].nextElementSibling.style.display = "none"
        }
        
      }
      dropdownContent.style.display = "block";

    }
  });
}