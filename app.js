let itemList = [];
// basically a blank piece of paper to write the shopping list
console.log(itemList);


class TodoItem {
    constructor(todoItemText, todoItemStatus) {
        this.text = todoItemText;
        this.status = todoItemStatus;
    }
}



let userInput = document.getElementById("item-input");
userInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") { //checks whether the pressed key is "Enter"
        addItemToArray();
    }
});

function addItemToArray() {
    //displaying the pop-up for "input asking"
    let userAnswer = document.getElementById("item-input").value;
    document.getElementById("item-input").value = "";

    let todoItemObject = new TodoItem(userAnswer, "incomplete");

    // add the answer to an array
    itemList.push(todoItemObject);
    displayItemsFromArray();
}

//TODO!!! 1

/*
<div class="flexbox">
            <div>Bread</div>
            <div class="control-buttons">
                <img src="trash.png" class="custom-icon-sm">
                <img src="stop.png" class="custom-icon-sm">
            </div>
        </div>
*/

function displayItemsFromArray() {
    let itemListPlaceholder = document.getElementById("shopping-placeholder");

    // recets/empties the shoppingPlaceholder in order to avoid repeating the items
    itemListPlaceholder.innerHTML = "";

    for (let i = 0; i < itemList.length; i++) {
        let flexBoxDiv = document.createElement("div"); // <div></div>
        flexBoxDiv.classList.add("flexbox"); // <div class = "flexbox"></div>

        let controlButtonDiv = document.createElement("div");
        controlButtonDiv.classList.add("control-buttons");
        
        let itemStatus = itemList[i].status;
        let statusDiv = document.createElement("div");
        statusDiv.classList.add("status-label");
        if (itemStatus == "incomplete") {
            statusDiv.classList.add("incomplete");
        } else {
            statusDiv.classList.add("complete");
        } 
        statusDiv.innerHTML = itemStatus;
        controlButtonDiv.appendChild(statusDiv);


        
        let imageTrash = document.createElement("img");
        imageTrash.id = "trash-icon-" + i;
        imageTrash.src = "trash.png";
        imageTrash.classList.add("custom-icon-sm");


        imageTrash.onclick = function () {
            let arrayOfIdParts = imageTrash.id.split("-");
            // [trash][icon][i]
            //   0.     1.   2.   
            let itemToBeRemovedId = arrayOfIdParts[2];
            itemList.splice(itemToBeRemovedId, 1);
            displayItemsFromArray();
        }

        controlButtonDiv.appendChild(imageTrash);




        let imageCheck = document.createElement("div");
        imageCheck.classList.add("checkmark");
        imageCheck.onclick = function () {
            markDone(this, i);
            displayItemsFromArray();
        };
        controlButtonDiv.appendChild(imageCheck);

        // create a div element containing info of "userAnswer"
        let newItemDiv = document.createElement("div");
        // set the userAnswer as value of <div> created above
        newItemDiv.innerHTML = itemList[i].text;
        newItemDiv.id = "todo-text-" + i;
        // add the div element to the shopping-placeholder
        flexBoxDiv.appendChild(newItemDiv);
        flexBoxDiv.appendChild(controlButtonDiv);
        itemListPlaceholder.appendChild(flexBoxDiv);
    }
}

function markDone(element, i) {
    if (element.classList.contains("done")) {
        // this part is for "undoing" the "done" action
        element.classList.remove("done");
        document.getElementById("todo-text-" + i).classList.remove("strike");
        itemList[i].status = "incomplete"
    } else {
        // this part is to aply "done"
        element.classList.add("done");
        document.getElementById("todo-text-" + i).classList.add("strike");
        itemList[i].status = "complete"
    }
}

function refresh() {
    itemList = [];
    displayItemsFromArray();
}


//comment


