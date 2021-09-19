

function newItem(){

    //javascript
    //1. Adding a new item to the list of items: 
       let list = $('#list');
       $('#list').appendChild(<li>To Do List</li>)
       list.appendChild(li);
       let inputValue = $('#input').val();
       li.appendChild(inputValue);
       let text = $('#inputValue');
       li.appendChild(text);
    

       if (inputValue ().text < 0) {
         $('#You must write something');
       }
    
     //2. Crossing out an item from the list of items:
       function crossOut() {
             li.classList.toggle("strike");
         }
    
         li.addEventListener("dblclick",crossOut);
    
     //3(i). Adding the delete button "X": 
       let crossOutButton = document.createElement("crossOutButton");
         crossOutButton.appendChild(document.createTextNode("X"));
         li.appendChild(crossOutButton);
    
         crossOutButton.addEventListener("click", deleteListItem);
     //3(ii). Adding CLASS DELETE (DISPLAY: NONE) from the css:
       function deleteListItem(){
             li.classList.add("delete")
         }
     // 4. Reordering the items: 
       $('#list').sortable();
    
    }
    