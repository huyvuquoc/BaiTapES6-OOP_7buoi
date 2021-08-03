function getEle(id) {
    return document.getElementById(id);
}

const list = new TaskList();

// Hàm render task khi được thêm vào
function renderTask(arr) {
    let content = '';
    arr.map((item, index) => {
        content += `
            <li>${item.name}
                <div>
                    <button onclick="completeTask(${index})">
                        <i class="fa fa-check-circle"></i>
                    </button>
                    <button onclick="deleteTask(${index})">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                </div>
            </li>
        `
    })
    getEle('todo').innerHTML = content;
}

// Tạo sự kiện add task mới
addItem.addEventListener('click', () => {
    const name = getEle('newTask').value;

    const task = new Task(name);
    list.addTask(task);
    renderTask(list.arr);
    setLocalStorage(list.arr);
})

// Hàm sắp xếp thứ tự alphabet tăng dần
function ascendingSort() {
    // tạo mảng task đã được sắp xếp theo thứ tự
    let sortedOrder = list.arr.sort((a, b) => {
        return a.name.localeCompare(b.name)
    });
    renderTask(sortedOrder);
    setLocalStorage(sortedOrder);
}

// Hàm sắp xếp thứ tự alphabet giảm dần
function descendingSort() {
    // tạo mảng task đã được sắp xếp theo thứ tự
    let sortedOrder = list.arr.sort((a, b) => {
        return a.name.localeCompare(b.name) * (-1)
    });
    renderTask(sortedOrder);
    setLocalStorage(sortedOrder);
}
// Hàm xóa task
function deleteTask(id) {
    list.arr.splice(id, 1);
    renderTask(list.arr);
    setLocalStorage(list.arr);
}

// tạo mảng task đã hoàn thành
let completedArr = [];

// Hàm set task đã hoàn thành
function completeTask(id) {
    // chuyển vào mảng task đã hoàn thành
    completedArr.push(list.arr[id].name);
    renderCompletedTask(completedArr);
    list.arr.splice(id, 1);
    renderTask(list.arr);
    setLocalStorage(list.arr);
}

// Hàm xóa task đã hoàn thành
function deleteCompletedTask(id) {
    completedArr.splice(id, 1);
    renderCompletedTask(completedArr);
}

// Hàm render task đã hoàn thành
function renderCompletedTask(arr) {
    let content = '';
    arr.map((item, index) => {
        content += `
            <li>${item}
                <div>
                    <button onclick="deleteCompletedTask(${index})">
                        <i class="fa fa-trash-alt"></i>
                    </button>
                </div>
            </li>
        `
    })
    getEle('completed').innerHTML = content;
}

// set item xuống localStorage
function setLocalStorage(arr) {
    return localStorage.setLocalStorage('toDoList', JSON.stringify(arr))
}

// get item từ localStorage
function getLocalStorage() {
    if (localStorage.getItem('toDoList')) {
        list.arr = JSON.parse(localStorage.getItem('toDoList'));
        renderTask(list.arr);
    }
}
getLocalStorage();