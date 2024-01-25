function addTodo(todo) {
    let clone = document.querySelector("#template-todo").content.cloneNode(true)
    let child = clone.firstElementChild
    child.addEventListener("click", (e) => {
        if (e.target.classList.contains("todo-up")) {
            if (child.previousElementSibling) {
                child.previousElementSibling.insertAdjacentElement("beforebegin", child)
            }
        } else if (e.target.classList.contains("todo-down")) {
            if (child.nextElementSibling) {
                child.nextElementSibling.insertAdjacentElement("afterend", child)
            }
        } else if (e.target.classList.contains("todo-done")) {
            switch (child.classList.contains("done")) {
                case true:
                    child.classList.remove("done")
                    break;
                case false:
                    child.classList.add("done")
                    break;
            }
        } else if (e.target.classList.contains("todo-remove")) {
            child.remove()
        }
    })
    clone.querySelector(".todo-text").innerText = todo
    document.querySelector(".list").appendChild(clone)
}

document.querySelector(".form > .form-btn").addEventListener("click", () => {
    const input = document.querySelector(".form-todo");
    const form = document.querySelector(".form");
    if (input.value === "") {
        form.classList.add("error")
        input.placeholder = "YOU CAN'T HAVE EMPTY TODOS!"
        setTimeout(() => {
            form.classList.remove("error")
          }, 300);          
    } else {
        addTodo(input.value)
    }   
})

for (x of ["Brush teeth in the bathroom wearing a wizard hat and robes while dancing to sick beats.", "Program on the computer", "Sleep"]) {
    addTodo(x)
}