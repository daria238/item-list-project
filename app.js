let itemList = [];
// basically a blank piece of paper to write the shopping list


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
    showIncompleteItemCount();
}


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
        statusDiv.id = "status-" + i;
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
    let statusDiv = document.getElementById(`status-${i}`);

    if (element.classList.contains("done")) {
        // Undo "done" action
        element.classList.remove("done");
        itemList[i].status = "incomplete";
        document.getElementById("todo-text-" + i).classList.remove("strike");

        // Update status label
        statusDiv.classList.remove("complete");
        statusDiv.classList.add("incomplete");
        statusDiv.innerHTML = "incomplete";
    } else {
        // Apply "done"
        element.classList.add("done");
        document.getElementById("todo-text-" + i).classList.add("strike");
        itemList[i].status = "complete";

        // Update status label
        statusDiv.classList.remove("incomplete");
        statusDiv.classList.add("complete");
        statusDiv.innerHTML = "complete";
    }
    showIncompleteItemCount();
}

function refresh() {
    itemList = [];
    displayItemsFromArray();
}

function getIncompleteTasksCount() {
    let count = 0;
    for (let i = 0; i < itemList.length; i++) {
        let itemObject = itemList[i];
        if (itemObject.status == "incomplete") {
            count++;
        }
    }
    return count;
}

window.onload = function () {
    showIncompleteItemCount();
}

function showIncompleteItemCount() {
    let itemSize = getIncompleteTasksCount();
    document.getElementById("item-count").innerHTML = itemSize + " task(s) to do";
}

function clearCompleted() {
    let newArray = [];
    for (let i = 0; i < itemList.length; i++) {
        let itemObject = itemList[i];
        if (itemObject.status == "incomplete") {
            newArray.push(itemObject);
        }
    }
    // link the itemList with the new Array :
    itemList = newArray;
    displayItemsFromArray();
    showIncompleteItemCount();
}