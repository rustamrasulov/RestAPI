const url = 'http://localhost:8080/api/users'

const usersTableId = $('#users-table-rows');
const formNewUser = $('#form-new_user');
const userForm = $('#user-profile');

let _role = {}
let roleArray = []

function getAllRoles() {
    fetch('/api/roles').then(function (response) {
        if (response.ok) {
            response.json().then(roles => {
                roles.forEach(role => {
                    _role = {
                        'id': parseInt(role.id),
                        'roleName': role.roleName,
                        'authority': role.authority
                    }
                    roleArray.push(_role)
                });
                return roleArray
            });
        } else {
            console.error('Network request for roles.json failed with response ' + response.status + ': ' + response.statusText);
            return null
        }
    });
}

$('#link-user_tab').click(() => showUsersTable())
$('#link-new_user_tab').click(() => showNewUserForm())

function showUsersTable() {
    $('#link-user_tab').addClass('active')
    $('#users-table-header').addClass('show').addClass('active')
    $('#users-table-rows').addClass('active').addClass('show')
    $('#form-new_user-header').removeClass('show').removeClass('active')
    $('#form-new_user').removeClass('show').removeClass('active')
    $('#link-new_user_tab').removeClass('active')
    getAllUsers()
}

function showNewUserForm() {
    $('#form-new_user-header').addClass('show').addClass('active')
    $('#form-new_user').addClass('show').addClass('active')
    $('#link-new_user_tab').addClass('active')
    $('#link-user_tab').removeClass('active')
    $('#users-table-header').removeClass('show').removeClass('active')
    $('#users-table-rows').removeClass('show').removeClass('active')
    createFormNewUser()
}

function getAllUsers() {
    fetch('/api/users').then(function (response) {
        if (response.ok) {
            response.json().then(users => {
                usersTableId.empty();
                users.forEach(user => {

                    console.log(user)
                    addUserToTable(user)
                })
            })
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    });
}

function addUserToTable(user) {
    usersTableId
        .append($('<tr class="border-top bg-light">'))
        .append($('<td>').text(user.id))
        .append($('<td>').text(user.firstName))
        .append($('<td>').text(user.lastName))
        .append($('<td>').text(user.age))
        .append($('<td>').text(user.email))
        .append($('<td>').text(user.authorities.map(roles => roles.roleName)))
        .append($('<td>').append($('<button class="btn btn-sm btn-info">').text('Edit')))
        .append($('<td>').append($('<button class="btn btn-sm btn-danger">')
            .click(() => {
                deleteUserForm(user.id)
            })
            .text('Delete')))
}

// submitNewUser.onclick = function () {
//     console.log(formNewUser.find('#newFirstName').val());
// }

// formNewUser.onsubmit(function () {
//     alert(formNewUser.find('#newFirstName').val())
// })

function createFormNewUser() {
    formNewUser.find('#newFirstName').val('');
    formNewUser.find('#newLastName').val('');
    formNewUser.find('#newAge').val('');
    formNewUser.find('#newEmail').val('');
    formNewUser.find('#newPassword').val('');
    formNewUser.find('#newRoles').empty();
    roleArray.forEach(role => {
        formNewUser.find('#newRoles')
            .append($('<option>').val(role.id).text(role.roleName));
    })
}


formNewUser.submit(async function () {


    function getSelectedRoles() {
        // return formNewUser.find('#newRoles').val().map(id => parseInt(id))
        let array = []
        for (let elementId of formNewUser.find('#newRoles').val().map(id => parseInt(id))) {
            array.push(roleArray.find(function (_role) {
                return _role.id === elementId
            }))
        }
        return array
    }

    let user = {
        firstName: formNewUser.find('#newFirstName').val(),
        lastName: formNewUser.find('#newLastName').val(),
        age: formNewUser.find('#newAge').val(),
        username: formNewUser.find('#newUsername').val(),
        password: formNewUser.find('#newPassword').val(),
        roles: getSelectedRoles()
    }

    // console.log(JSON.stringify(user))


    let response = fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })

    let result = await response.json();

})

function addNewUser() {

}

function deleteUser(id) {
    fetch('/api/users/' + id, {method: 'DELETE'})
        .then(function (response) {
            if (response.ok) {
                userForm.modal('hide');
                getAllUsers()
            }
        });
}

function deleteUserForm(id) {

    fetch((`/api/users/${id}`))
        .then(function (response) {
            response.json().then(function (user) {
                userForm.find('#id').val(user.id);
                userForm.find('#firstName').val(user.firstName);
                userForm.find('#lastName').val(user.lastName);
                userForm.find('#age').val(user.age);
                userForm.find('#email').val(user.email);
                userForm.find('#password').val('');
                userForm.find('.modal-title').text('Delete user');
                userForm.find('#password-div').hide();
                userForm.find('.submit')
                    .attr('onClick', 'deleteUser(' + id + ');');
                userForm.find('#userRoles').empty()
                userForm.find('#userRoles').append($('<option>')
                .text(user.authorities.map(roles => roles.roleName)))
            });
            userForm.modal();
        });
}


$(document).ready(
    () => {
        getAllRoles()
        getAllUsers()
    }
);