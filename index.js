function addTodo(todo, name, time = "", done = false) {
    let date = new Date();
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
        save();
    });
    child.querySelector(".todo-text").addEventListener("change", () => {
        save();
    });
    clone.querySelector(".todo-text").value = todo;
    if (time === "") {
        time = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        if (!name) {
            name = document.querySelector(".form-name").value;
        }
        if (name) {
            time += ` - ${name}`;
        }
    }
    clone.querySelector(".todo-name").innerText = time;
    if (done) {
        child.classList.add("done");
    }
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
        save();
    }
});

/**
 * Since date is first, simply sorting works.
 */
document.querySelector(".sorting-date").addEventListener("click", () => {
    let children = Array.from(document.querySelectorAll(".list > .todo"));
    children = children.sort((a, b) =>
        a
            .querySelector(".todo-name")
            .innerText.localeCompare(b.querySelector(".todo-name").innerText)
    );
    document.querySelector(".list").replaceChildren(...children);
    save();
});

/**
 * Uses regex to select to correct sorting data
 */
document.querySelector(".sorting-name").addEventListener("click", () => {
    let children = Array.from(document.querySelectorAll(".list > .todo"));
    children = children.sort((a, b) =>
        a
            .querySelector(".todo-name")
            .innerText.replace(/.*-/m, "")
            .localeCompare(b.querySelector(".todo-name").innerText.replace(/.*-/m, ""))
    );
    document.querySelector(".list").replaceChildren(...children);
    save();
});

function save() {
    let data = [];
    document.querySelectorAll(".list .todo").forEach((t) => {
        data.push({
            text: t.querySelector(".todo-text").value,
            nameDate: t.querySelector(".todo-name").innerText,
            done: t.classList.contains("done") ? true : false,
        });
    });
    localStorage.setItem("todos", JSON.stringify(data));
}

function restore() {
    for (x of JSON.parse(localStorage.getItem("todos"))) {
        addTodo(x.text, "", x.nameDate, x.done);
    }
}

restore();
