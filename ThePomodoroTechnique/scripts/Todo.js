
function AddTask() {

    alert("Working")

    var task = document.getElementById('add').value;

    show();

    return false;
}

function show() {
    var todos = document.getElementById('addtask').value;

    var html = '<ul>';
    for (var i = 0; i < todos.length; i++) {
        html += '<li>' + todos[i] + '<button class="remove" id="' + i + '">x</button></li';
    };
    html += '</ul>';

   

    document.getElementById('todos').innerHTML = html;

}

/document.getElementById('add').addEventListener('onclick', AddTask);

var testButton = document.getElementById('add');
testButton.onclick = function () {
    alert("Coffee added to your cart");
}