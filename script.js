const btn = document.querySelector(".new-task-submit")
const input = document.querySelector("#new-task-input")
const taskList = document.querySelector(".task-list")
const localItems = JSON.parse(localStorage.getItem('localItem'))



//Data loads from localstorage

function renderUI() {
    if (localItems === null) {
        localItems = []
    } else {
        for (let i = 0; i < localItems.length; i++) {
            const newDiv = document.createElement("div")
            newDiv.classList.add("task")
            const btnDiv = document.createElement("div")
            btnDiv.classList.add("btns")
            const data = document.createElement("p")
            data.classList.add("textData")
            data.innerText = localItems[i]
            const change = document.createElement("button")
            const remove = document.createElement("button")
            remove.classList.add("delete")
            const completed = document.createElement("button")
            change.innerText = "EDIT"
            remove.innerText = "Delete"
            completed.innerText = "Completed"
            taskList.appendChild(newDiv)
            newDiv.append(data)
            newDiv.append(btnDiv)
            btnDiv.append(change)
            btnDiv.append(remove)
            btnDiv.append(completed)
            change.addEventListener('click', edit)
            remove.addEventListener("click", del)
            completed.addEventListener("click", done)
        }
    }
}
renderUI()

btn.addEventListener('click', function (e) {
    e.preventDefault()
    if (input.value == "") {
        alert("Add some task ToDo")
    } else {
        const newDiv = document.createElement("div")
        newDiv.classList.add("task")
        const btnDiv = document.createElement("div")
        btnDiv.classList.add("btns")
        const data = document.createElement("p")
        data.classList.add("textData")
        data.innerText = input.value
        localItems.push(input.value)
        localStorage.setItem('localItem', JSON.stringify(localItems))
        input.value = ""
        const change = document.createElement("button")
        const remove = document.createElement("button")
        remove.classList.add("delete")
        const completed = document.createElement("button")
        change.innerText = "EDIT"
        remove.innerText = "Delete"
        completed.innerText = "Completed"
        taskList.appendChild(newDiv)
        newDiv.append(data)
        newDiv.append(btnDiv)
        btnDiv.append(change)
        btnDiv.append(remove)
        btnDiv.append(completed)
        change.addEventListener('click', edit)
        remove.addEventListener("click", del)
        completed.addEventListener("click", done)
    }
})

//edit function
function edit(event) {

    if (event.target.innerText == "EDIT") {

        event.target.parentElement.parentElement.children[0].contentEditable = true
        event.target.parentElement.parentElement.children[0].style.backgroundColor = "#EEE"
        event.target.innerText = "SAVE"
        let updatedData = [];
        let localItem = JSON.parse(localStorage.getItem('localItem'))
        for (let i = 0; i < localItems.length; i++) {
            if (localItem[i] !== event.target.parentElement.parentElement.children[0].innerText) {
                updatedData.push(localItem[i]);
            }
        }
        localStorage.setItem('localItem', JSON.stringify(updatedData))

    } else {
        event.target.parentElement.parentElement.children[0].contentEditable = false
        event.target.parentElement.parentElement.children[0].style.backgroundColor = "transparent"
        let localItem = JSON.parse(localStorage.getItem('localItem'))
        let updatedData = [];
        for (let i = 0; i < localItem.length; i++) {
            updatedData.push(localItem[i]);
        }
        updatedData.push(event.target.parentElement.parentElement.children[0].innerText)
        localStorage.setItem("localItem", JSON.stringify(updatedData))
        event.target.innerText = "EDIT"
    }
}

//delete function
function del(event) {

    event.target.parentElement.parentElement.remove()
    let updatedData = [];
    let localItem = JSON.parse(localStorage.getItem('localItem'))
    for (let i = 0; i < localItem.length; i++) {
        if (localItem[i] !== event.target.parentElement.parentElement.children[0].innerText) {
            updatedData.push(localItem[i]);
        }
    }
    localStorage.setItem('localItem', JSON.stringify(updatedData))
}

//completed function
function done(event) {

    event.target.parentElement.parentElement.children[0].style.textDecoration = "line-through"
    event.target.parentElement.children[0].style.display = "none"
    event.target.parentElement.children[2].style.display = "none"
}