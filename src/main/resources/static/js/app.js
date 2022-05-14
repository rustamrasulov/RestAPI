const usersTableId = $('#users-table-rows');
const formNewUser = $('#form-new_user');
const formDeleteUser = $('#form-delete_user');
const formEditUser = $('#form-edit_user');

const newUserButton = document.getElementById('submit-new-user-btn');

let _role = {};
let roleArray = [];

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

$('#link-user_tab').click(() => showUsersTable());
$('#link-new_user_tab').click(() => showNewUserForm());

function showUsersTable() {
    getAllUsers();
    $('#link-user_tab').addClass('active').addClass('show');
    $('#users-table-header').addClass('active').addClass('show');
    $('#users-table-rows').addClass('active').addClass('show');
    $('#form-new_user-header').removeClass('show').removeClass('active');
    $('#form-new_user').removeClass('show').removeClass('active');
    $('#link-new_user_tab').removeClass('active');

}

function showNewUserForm() {
    $('#form-new_user-header').addClass('show').addClass('active');
    $('#form-new_user').addClass('show').addClass('active');
    $('#link-new_user_tab').addClass('active');
    $('#link-user_tab').removeClass('active');
    $('#users-table-header').removeClass('show').removeClass('active');
    $('#users-table-rows').removeClass('show').removeClass('active');
    createFormNewUser();
}

function getAllUsers() {
    fetch('/api/users').then(function (response) {
        if (response.ok) {
            response.json().then(users => {
                usersTableId.empty();
                users.forEach(user => {
                    addUserToTable(user);
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
        .append($('<td>').text(user.username))
        .append($('<td>').text(user.roles.map(roles => roles.roleName)))
        .append($('<td>').append($('<button class="btn btn-info">')
            .click(() => {
                editUserForm(user.id);
            })
            .text('Edit')))
        .append($('<td>').append($('<button class="btn btn-danger">')
            .click(() => {
                deleteUserForm(user.id);
            })
            .text('Delete')));
}

function createFormNewUser() {
    formNewUser.find('#newFirstName').val('');
    formNewUser.find('#newLastName').val('');
    formNewUser.find('#newAge').val('');
    formNewUser.find('#newUsername').val('');
    formNewUser.find('#newPassword').val('');
    formNewUser.find('#newRoles').empty();
    roleArray.forEach(role => {
        formNewUser.find('#newRoles')
            .append($('<option>').val(role.id).text(role.roleName));
    })
}

newUserButton.onclick = () => {
    function getSelectedRoles() {
        let array = [];
        for (let elementId of formNewUser.find('#newRoles').val().map(id => parseInt(id))) {
            array.push(roleArray.find(function (_role) {
                return _role.id === elementId;
            }))
        }
        return array;
    }

    let user = {
        firstName: formNewUser.find('#newFirstName').val(),
        lastName: formNewUser.find('#newLastName').val(),
        age: formNewUser.find('#newAge').val(),
        username: formNewUser.find('#newUsername').val(),
        password: formNewUser.find('#newPassword').val(),
        roles: getSelectedRoles()
    }
    addNewUser(user);
}

function addNewUser(user) {
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }).then(function (response) {
        if (response.ok) {
            showUsersTable();
        } else {
            showNewUserForm();
        }
    })
}

function deleteUser(id) {
    fetch('/api/users/' + id, {method: 'DELETE'})
        .then(function (response) {
            if (response.ok) {
                formDeleteUser.modal('hide');
                getAllUsers();
            }
        });
}

function deleteUserForm(id) {
    fetch((`/api/users/${id}`))
        .then(function (response) {
            response.json().then(function (user) {
                formDeleteUser.find('#id').val(user.id);
                formDeleteUser.find('#firstName').val(user.firstName);
                formDeleteUser.find('#lastName').val(user.lastName);
                formDeleteUser.find('#age').val(user.age);
                formDeleteUser.find('#username').val(user.email);
                formDeleteUser.find('#password').val('');
                formDeleteUser.find('#userRoles').empty();
                user.roles.forEach(role => {
                    formDeleteUser.find('#userRoles').append($('<option>')
                        .val(role.id).text(role.roleName)
                    );
                })
                formDeleteUser.find('.submit')
                    .attr('onClick', 'deleteUser(' + id + ');');
            });
            formDeleteUser.modal();
        });
}

function updateUser(user) {
    fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }).then(function (response) {
        if (response.ok) {
            showUsersTable();
        } else {
            showNewUserForm();
        }
    })
}

function editUserForm(id) {
    formEditUser.find('#editId').empty();
    formEditUser.find('#editFirstName').empty();
    formEditUser.find('#editLastName').empty();
    formEditUser.find('#editAge').empty();
    formEditUser.find('#editUsername').empty();
    formEditUser.find('#password').empty();
    formEditUser.find('#editUserRoles').empty();
    fetch((`/api/users/${id}`))
        .then(function (response) {
            response.json().then(function (user) {
                formEditUser.find('#editId').val(user.id);
                formEditUser.find('#editFirstName').val(user.firstName);
                formEditUser.find('#editLastName').val(user.lastName);
                formEditUser.find('#editAge').val(user.age);
                formEditUser.find('#editUsername').val(user.email);
                formEditUser.find('#password').val('');
                roleArray.forEach(role => {
                    formEditUser.find('#editUserRoles')
                        .append($('<option>')
                            .prop('selected', user.roles.filter(userRole => userRole.id === role.id).length)
                            .val(role.id).text(role.roleName));
                })
            });
            formEditUser.modal();
        });
}

formEditUser.submit(async function () {
    function getSelectedRoles() {
        let array = [];
        for (let elementId of formEditUser.find('#editUserRoles').val().map(id => parseInt(id))) {
            array.push(roleArray.find(function (_role) {
                return _role.id === elementId;
            }));
        }
        return array;
    }

    let user = {
        id: formEditUser.find('#editId').val(),
        firstName: formEditUser.find('#editFirstName').val(),
        lastName: formEditUser.find('#editLastName').val(),
        age: formEditUser.find('#editAge').val(),
        username: formEditUser.find('#editUsername').val(),
        password: formEditUser.find('#editPassword').val(),
        roles: getSelectedRoles()
    }
    formEditUser.modal('hide');
    updateUser(user);
})

function initPage() {
    $('#user-panel-title').text('Admin panel');
    $('#nav-adminPanel').addClass('show').addClass('active');
    $('#nav-userPanel').hide().removeClass('active');
}

$('#admin-area-tab').click(() => {
    $('#admin-area-tab').addClass('active').removeClass('btn-light').addClass('btn-primary').prop('aria-selected', true);
    $('#user-area-tab').removeClass('active').removeClass('btn-primary').addClass('btn-light').prop('aria-selected', false);
    $('#user-panel-title').text('Admin panel');
    $('#nav-adminPanel').show().addClass('active');
    $('#nav-userPanel').hide().removeClass('active');

});

$('#user-area-tab').click(() => {
    $('#user-area-tab').addClass('active').removeClass('btn-light').addClass('btn-primary').prop('aria-selected', true);
    $('#admin-area-tab').removeClass('active').removeClass('btn-primary').addClass('btn-light').prop('aria-selected', false);
    $('#user-panel-title').text('User information-page');
    $('#nav-adminPanel').hide();
    $('#nav-userPanel').show();

});

$(document).ready(
    () => {
        initPage();
        getAllRoles();
        showUsersTable();
        console.log()
    }
);