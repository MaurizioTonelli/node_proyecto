window.onload = init;

var selectedRow = null;
var headers = {};
var base_path = "https://tnodehr.herokuapp.com/employees/";

function init() {
  const logout_btn = document.getElementById("logout-btn");
  logout_btn.addEventListener("click", logout);

  if (localStorage.getItem("token")) {
    headers = {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };
    loadEmployees();
  } else {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function loadEmployees(search = "") {
  clearEmployees();
  search = search.replace(/\s/g, "");
  axios
    .get(base_path + search, headers)
    .then(function (res) {
      for (var i = 0; i < res.data.message.length; i += 1) {
        const {
          employee_id,
          name,
          last_name,
          phone_no,
          address,
          email,
        } = res.data.message[i];
        var data = { employee_id, name, last_name, phone_no, address, email };
        displayRecord(data);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
function clearEmployees() {
  var table = document
    .getElementById("employee-list")
    .getElementsByTagName("tbody")[0];
  table.innerHTML = "";
}

function onFormSearch() {
  var search = document.getElementById("search").value;
  loadEmployees(search);
}

function onFormShowAll() {
  document.getElementById("search").value = "";
  loadEmployees();
}

function onFormSubmit() {
  var formData = readFormData();
  if (selectedRow === null) {
    insertRecord(formData);
  } else {
    updateRecord(formData);
  }
  resetForm();
}
function validateEmail(email) {
  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  if (re.test(email)) {
    return email;
  }
}
function readFormData() {
  var formData = {};
  formData["firstName"] = document.getElementById("first_name").value;
  formData["lastName"] = document.getElementById("last_name").value;
  formData["phone"] = document.getElementById("phone").value;
  formData["address"] = document.getElementById("address").value;
  formData["email"] = validateEmail(document.getElementById("email").value);
  return formData;
}

function displayRecord(data) {
  var table = document
    .getElementById("employee-list")
    .getElementsByTagName("tbody")[0];
  var newRow = document.createElement("tr");
  newRow.setAttribute("data-key", `${data.employee_id}`);
  newRow.innerHTML = `<td>${data.name}</td>
                        <td>${data.last_name}</td>
                        <td>${data.phone_no}</td>
                        <td>${data.address}</td>
                        <td>${data.email}</td>
                        <td><a onClick="onEdit(this)" class="btn btn-warning">Edit</a>
                        <a onClick="onDelete(this)" class="btn btn-danger">Delete</a> 
                        </td>`;
  table.appendChild(newRow);
}

function insertRecord(data) {
  axios
    .put(
      base_path,
      {
        first_name: data["firstName"],
        last_name: data["lastName"],
        phone_no: data["phone"],
        address: data["address"],
        email: data["email"],
      },
      headers
    )
    .then(function (res) {
      console.log("row inserted");
      loadEmployees();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function updateRecord(data) {
  const key = selectedRow.getAttribute("data-key");
  const path = base_path + key;
  axios
    .patch(
      path,
      {
        first_name: data["firstName"],
        last_name: data["lastName"],
        phone_no: data["phone"],
        address: data["address"],
        email: data["email"],
      },
      headers
    )
    .then(function (res) {
      console.log("Row updated");
      loadEmployees();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function resetForm() {
  document.getElementById("first_name").value = "";
  document.getElementById("last_name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  document.getElementById("email").value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("first_name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("last_name").value = selectedRow.cells[1].innerHTML;
  document.getElementById("phone").value = selectedRow.cells[2].innerHTML;
  document.getElementById("address").value = selectedRow.cells[3].innerHTML;
  document.getElementById("email").value = selectedRow.cells[4].innerHTML;
}

function onDelete(td) {
  if (confirm("Are you sure you want to delete this employee?")) {
    var row = td.parentElement.parentElement;
    const key = row.getAttribute("data-key");
    const path = base_path + key;

    axios
      .delete(path, headers)
      .then(function (res) {
        console.log("row deleted");
        loadEmployees();
        resetForm();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
