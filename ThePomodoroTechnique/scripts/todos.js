function initElement() {
    document.getElementById("startbutton").onclick = function (e) {
        startTask();
    }

    document.getElementById("completedbutton").onclick = function (e) {
        completedTask();
    }

    document.getElementById("tgAll").checked = true;

    document.getElementById("editbutton").onclick = function () {
        editTask();
    }
    document.getElementById("applybutton").onclick = function () {
        Apply();
    }
    
}


function addTask() {
    var task = document.getElementById("task").value + ',0,Incomplete';
    if (task !== ",0") {
        var todos = get_tasks();
        todos.push(task);
        localStorage.setItem("alltasks", JSON.stringify(todos));

        showTask();

        return false;
    }
    else{
        alert("Task cannot be empty");
        showTask();
        return false;
    }

}

function get_tasks() {
    var todos = new Array;
    var todos_str = localStorage.getItem("alltasks");
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}

function removeTask(id) {
    var todos = get_tasks();

    todos.splice(id, 1);
    localStorage.setItem("alltasks", JSON.stringify(todos));

    showTask();

    return false;
    
}

function editTask() {
    var text = '<input id="rename" placeholder="Rename the Task!">' +
        '<button onclick="Apply()" class="allbutton" id="applybutton">Apply</button>'
    
    document.getElementById("changename").innerHTML = text;
}

function Apply() {
    var elementList = new Array();
    elementList = document.getElementsByClassName('toggle');

    var todos = get_tasks();

    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].checked == true) {
            var task = document.getElementById("rename").value
            todos[i] = task + ',' + todos[i].split(',')[1] + ',' + todos[i].split(',')[2];
        }
    }
    localStorage.setItem("alltasks", JSON.stringify(todos));
    document.getElementById('changename').innerHTML = ''
    showTask();
}

function startTask() {
    var elementList = new Array();
    elementList = document.getElementsByClassName('toggle');
    if(elementList.length == 0){
        alert("Please select one task");
    }
    for (var i = 0; i < elementList.length; i++) {      
        if (elementList[i].checked == true) {           
            chronometer(min, sec, msec);
            break;
        } else if (elementList.length == i + 1 && elementList[i].checked == false) {
            alert("Please select one task");
        }
    }
}


function CheckFlag(id) {
    var elementList = new Array();
    elementList = document.getElementsByClassName('toggle');

    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].id != id && elementList[i].checked == true) {
            elementList[i].checked = false;
        } 
    }    
}

function completedTask() {

    var elementList = new Array();
    elementList = document.getElementsByClassName('toggle');

    var todos = get_tasks();

    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].checked == true) {
            todos[i] = todos[i].split(',')[0] + ',' + todos[i].split(',')[1] + ',COMPLETED';
        }
    }
    localStorage.setItem("alltasks", JSON.stringify(todos));
    showTask();
}


function pomoCount() {
    var elementList = new Array();
    elementList = document.getElementsByClassName('toggle');
    var todos = get_tasks();

    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].checked == true) {
            var count = todos[i].split(',')[1];
            count++;
            todos[i] = todos[i].split(',')[0] + ',' + count.toString() + ',' + todos[i].split(',')[2];
        }
    }
    localStorage.setItem("alltasks", JSON.stringify(todos));
}

function playSound() {
    var audio = document.getElementById("beep");
    audio.play();
}


function filter(id) {

    var tgall = document.getElementById("tgAll").checked;
    var tgcomplete = document.getElementById("tgComplete").checked;
    var tgincomplete = document.getElementById("tgIncomplete").checked;


    if (id == "tgAll") {
        document.getElementById("tgAll").checked = true;
        document.getElementById("tgComplete").checked = false;
        document.getElementById("tgIncomplete").checked = false;
    }
    if (id == "tgComplete") {
        document.getElementById("tgAll").checked = false;
        document.getElementById("tgComplete").checked = true;
        document.getElementById("tgIncomplete").checked = false;
    }
    if (id == "tgIncomplete") {
        document.getElementById("tgAll").checked = false;
        document.getElementById("tgComplete").checked = false;
        document.getElementById("tgIncomplete").checked = true;
    }
    showTask()
}

function showTask() {
    var todos = get_tasks();
    var tgalls = document.getElementById("tgAll").checked;
    var tgcompletes = document.getElementById("tgComplete").checked;
    var tgincompletes = document.getElementById("tgIncomplete").checked;

        var html = '<ul><li><h3>Tasks</li>';
        for (var i = 0; i < todos.length; i++) {
            if (tgcompletes == true && todos[i].split(',')[2] != "Incomplete"){
                html += '<li' + 'id="togglelist">' +
                        '<div class="view">' +
                            '<input class="toggle" type="checkbox" id="tg' + i + '" onChange="CheckFlag(id)">' +
                            '<label id="tntg' + i + '"class="taskName">' + todos[i].split(',')[0] + '</label>' +
                            '<label id="pntg' + i + '"class="PomoNumber"> - ' + todos[i].split(',')[1] + '</label>' +
                            '<label id="tstg' + i + '"class="taskStatus"> - ' + todos[i].split(',')[2] + ' </label>' +
                            '<button id="' + i + '"onclick="removeTask(id)" class="destroy">X</button>' +
                        '</div>' +
                    '</li>';
            } else if (tgincompletes == true && todos[i].split(',')[2] != "COMPLETED") {
                html += '<li' + 'id="togglelist">' +
                        '<div class="view">' +
                            '<input class="toggle" type="checkbox" id="tg' + i + '" onChange="CheckFlag(id)">' +
                            '<label id="tg' + i + '"class="taskName">' + todos[i].split(',')[0] + '</label>' +
                            '<label id="tg' + i + '"class="PomoNumber"> - ' + todos[i].split(',')[1] + '</label>' +
                            '<label id="tg' + i + '"class="taskStatus"> - ' + todos[i].split(',')[2] + ' </label>' +
                            '<button id="' + i + '"onclick="removeTask(id)" class="destroy">X</button>' +
                        '</div>' +
                    '</li>';
            } else if (tgalls == true) {
                html += '<li' + 'id="togglelist">' +
                        '<div class="view">' +
                            '<input class="toggle" type="checkbox" id="tg' + i + '" onChange="CheckFlag(id)">' +
                            '<label id="tg' + i + '"class="taskName">' + todos[i].split(',')[0] + '</label>' +
                            '<label id="tg' + i + '"class="PomoNumber"> - ' + todos[i].split(',')[1] + '</label>' +
                            '<label id="tg' + i + '"class="taskStatus"> - ' + todos[i].split(',')[2] + ' </label>' +
                            '<button id="' + i + '"onclick="removeTask(id)" class="destroy">X</button>' +
                        '</div>' +
                    '</li>';

            }

            
    }
    document.getElementById("alltasks").innerHTML = html;    
}