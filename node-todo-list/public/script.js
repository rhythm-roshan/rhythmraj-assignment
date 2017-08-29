const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODO_LIST_ID = "todo_list_div"

    function add_todo_elements(id, todo_data_json) {

    var parents = document.getElementById(id);
    parents.innerHTML += " <br>"+todo_data_json;

    }
function getTodosAJAX()
{
    var xhr = new XMLHttpRequest();
//xhr - JS object for making requests to server via JS
    xhr.open("GET","api/todos",true);

        xhr.onreadystatechange = function () {
            if(xhr.readyState == RESPONSE_DONE){
                if(xhr.status ==  STATUS_OK)
                {
                    console.log(xhr.responseText);

                    add_todo_elements(TODO_LIST_ID,xhr.responseText);
        }
    }
}
xhr.send(data = null);

}