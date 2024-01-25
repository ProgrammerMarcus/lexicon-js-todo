function addTodo(todo) {
    let date = new Date()
    let clone = document.querySelector("#template-todo").content.cloneNode(true);
    let child = clone.firstElementChild;
    child.addEventListener("click", (e) => {
        if (e.target.classList.contains("todo-up")) {
            if (child.previousElementSibling) {
                child.previousElementSibling.insertAdjacentElement("beforebegin", child);
            }
        } else if (e.target.classList.contains("todo-down")) {
            if (child.nextElementSibling) {
                child.nextElementSibling.insertAdjacentElement("afterend", child);
            }
        } else if (e.target.classList.contains("todo-done")) {
            switch (child.classList.contains("done")) {
                case true:
                    e.target.firstElementChild.src =
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAOJJREFUSEvtky0OAjEQRt9eBw7CCfiX3A4EggSBQJAgEAgMAoFAYBAIBAZBSmZI03TbLrsrSLbJqm7fy8w3k1HzyWrm0wiiHf6rFk2BmXzfyqqqwMC7Qu3ZkioECn8BBj63gykrUPgT6AMLN/UyAoU/gAGw9I2UTzABOlJu3hgq/C7wVd6PrqAFmMdtCcr01D0Kvwl8HVoGXwUhicKvwBDYxDYtLwOfROEXYARsY3BzHwrZlZg5Pwt8lwKPCcy9LTkJfJ8KTxHYkjFwKAJPFajkWBReRPAL+/OmzCYnSRtBtE1vu+MqGWavYNgAAAAASUVORK5CYII=";
                    child.classList.remove("done");
                    break;
                case false:
                    e.target.firstElementChild.src =
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAM5JREFUSEvtlLENAjEQBPdboIAvAAqgALJPyCiSjISMAr4AKIACqAEWnaXDem5PCAuCd2bZ3rld+9yh8ega62MGyIT/IqIlgMubUqO15xHlgAJ7AAOAawXpARwf8F1QQAgo4isAo0FuBlmY+BrAOYJkHRByMggZrHyjxDMRcY93cjAH24x4FlBDOA9j8XelIip7vYuvA7w4K+fgnaRcKAe1OJ8kB59uChIBpsRLw0VrL+2SdTDVTAXycaP5C272VcjfUm1QEanzcn0G/D6iO7RbMBn0h3UzAAAAAElFTkSuQmCC";
                    child.classList.add("done");
                    break;
            }
        } else if (e.target.classList.contains("todo-remove")) {
            child.remove();
        }
    });
    clone.querySelector(".todo-text").value = todo;
    let name = document.querySelector(".form-name").value
    let formatted = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
    if (name) {
        formatted += ` - ${name}`
    }
    clone.querySelector(".todo-name").innerText = formatted
    document.querySelector(".list").appendChild(clone);
}

document.querySelector(".form > .form-btn").addEventListener("click", () => {
    const input = document.querySelector(".form-todo");
    const form = document.querySelector(".form");
    if (input.value === "") {
        form.classList.add("error");
        input.focus();
        setTimeout(() => {
            form.classList.remove("error");
        }, 300);
    } else {
        addTodo(input.value);
    }
});