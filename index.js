primaryTaskList = [`Example Task`];

refreshListGui();

/*NON-EVENT FUNCTIONS*/

function refreshListGui() {

  document.getElementById('list').innerHTML = null;
  for (let uni in primaryTaskList) {
    appendListItem(primaryTaskList[uni], uni);
  }
  document.getElementById('addItemInput').value = null;
  document.getElementById('addItemInput').focus();
}

function appendListItem(text, uni) {
  let listItem = document.createElement("div");
  listItem.className = "item"
  listItem.uni = uni;
  if (uni > 10) {
    let len = primaryTaskList.length + 10;
    let opac = (len - uni) / len;
    if (opac < 0.1) {
      opac = 0.1
    }
    listItem.style.opacity = opac;

  }



  let inputBox = document.createElement("input");
  inputBox.value = text;
  inputBox.addEventListener("change", inputBoxChange);
  listItem.appendChild(inputBox);

  let buttonTop = document.createElement("button");
  buttonTop.innerText = "🔼";
  buttonTop.addEventListener("click", buttonTopClick);
  listItem.appendChild(buttonTop);

  let buttonDel = document.createElement("button");
  buttonDel.innerText = "🗑️";
  buttonDel.addEventListener("click", buttonDelClick);
  listItem.appendChild(buttonDel);

  document.getElementById(`list`).appendChild(listItem);
}

document.getElementById('addItemButton').addEventListener("click", addListItem);
document.getElementById('addItemInput').addEventListener("keyup", addListItem);

/*EVENT FUNCTIONS*/

function buttonTopClick(evt) {
  if (evt.currentTarget.parentElement.uni < 1) {
    return;
  }
  primaryTaskList.splice(evt.currentTarget.parentElement.uni - 1, 0, primaryTaskList.splice(evt.currentTarget.parentElement.uni, 1));
  refreshListGui();
}

function buttonDelClick(evt) {
  primaryTaskList.splice(evt.currentTarget.parentElement.uni, 1);
  refreshListGui();


}

function inputBoxChange(evt) {
  primaryTaskList[evt.currentTarget.parentElement.uni] = evt.currentTarget.value;
  refreshListGui();
}

function addListItem(evt) {

  if (document.getElementById('addItemInput').value.length === 0) {
    return;
  }

  if (evt.key !== "Enter" && evt.key !== undefined) {
    return;
  }

  primaryTaskList.push(document.getElementById('addItemInput').value);
  refreshListGui();

}
