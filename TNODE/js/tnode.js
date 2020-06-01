window.onload = init;

var selectedRow = null;
var headers = {}
var base_path =  'http://localhost:3000/employees/'

function init() {
    const logout_btn = document.getElementById("logout-btn");
    logout_btn.addEventListener("click", logout);

    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmployees();
    }
    else {
        window.location.href = "login.html";
    }
}


function logout(){
    localStorage.removeItem("token");
    window.location.href="login.html";
}

function loadEmployees(){
    clearEmployees();

    axios.get(base_path, headers)
    .then(function(res){
        for(var i = 0; i < res.data.message.length; i+=1){
            const {employee_id, name,last_name, phone_no, address, email} = res.data.message[i];
            var data = {employee_id, name, last_name, phone_no, address, email};
            displayRecord(data);
        }
    }).catch(function(err){
        console.log(err)
    });
}
function clearEmployees(){
    var table = document.getElementById("employee-list").getElementsByTagName("tbody")[0];
    table.innerHTML = '';
}

function onFormSubmit(){
    var formData = readFormData();
    if(selectedRow === null){
        insertRecord(formData);
    }else{
        updateRecord(formData);
    }
    resetForm();
}

function readFormData(){
    var formData = {};
    formData["firstName"] = document.getElementById("first_name").value;
    formData["lastName"] = document.getElementById("last_name").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["address"] = document.getElementById("address").value;
    formData["email"] = document.getElementById("email").value;
    return formData;
}

function displayRecord(data){
    var table = document.getElementById("employee-list").getElementsByTagName("tbody")[0];
    var newRow = document.createElement('tr');
    newRow.setAttribute("data-key", `${data.employee_id}`);
    newRow.innerHTML = `<th>${data.name}</th>
                        <th>${data.last_name}</th>
                        <th>${data.phone_no}</th>
                        <th>${data.address}</th>
                        <th>${data.email}</th>
                        <th><a onClick="onEdit(this)">Edit</a></th>
                        <th><a onClick="onDelete(this)">Delete</a></th>`;
    table.appendChild(newRow);
}

function insertRecord(data){
    axios.put(base_path,
        {
            first_name : data["firstName"],
            last_name : data["lastName"],
            phone_no : data["phone"],
            address : data["address"],
            email : data["email"] 
        },
        headers)
    .then(function(res){
        console.log("row inserted");
        loadEmployees();
    }).catch(function(err){
        console.log(err);
    });
}

function updateRecord(data){
    const key = selectedRow.getAttribute("data-key");
    const path = base_path + key
    axios.patch(path,
        {
            first_name : data["firstName"],
            last_name : data["lastName"],
            phone_no : data["phone"],
            address : data["address"],
            email : data["email"] 
        },
        headers)
    .then(function(res){
        console.log("row updated");
        loadEmployees();
    }).catch(function(err){
        console.log(err);
    });
}

function resetForm(){
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
    selectedRow = null;
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("first_name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("last_name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[2].innerHTML;
    document.getElementById("address").value = selectedRow.cells[3].innerHTML;
    document.getElementById("email").value = selectedRow.cells[4].innerHTML;
}

function onDelete(td){
    if(confirm("Are you sure you want to delete this employee?")){
        var row = td.parentElement.parentElement;
        const key = row.getAttribute("data-key");
        const path = base_path +  key;

        axios.delete(path, headers)
        .then(function(res){
            console.log("row deleted");
            loadEmployees();
            resetForm();
        }).catch(function(err){
            console.log(err);
        });
    }
}