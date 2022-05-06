const url = 'http://localhost:8080/api/users'

const usersTableId = $('#users-table-rows');

showUsersTable()

$('#link-user_tab').click(() => showUsersTable())
$('#link-new_user_tab').click(() => showNewUserForm())

function showUsersTable () {
    $('#link-user_tab').addClass('active')
    $('#users-table-header').addClass('show').addClass('active')
    $('#users-table-rows').addClass('active').addClass('show')
    $('#form-new_user-header').removeClass('show').removeClass('active')
    $('#form-new_user').removeClass('show').removeClass('active')
    $('#link-new_user_tab').removeClass('active')
    getAllUsers()
}

function showNewUserForm () {
    $('#form-new_user-header').addClass('show').addClass('active')
    $('#form-new_user').addClass('show').addClass('active')
    $('#link-new_user_tab').addClass('active')
    $('#link-user_tab').removeClass('active')
    $('#users-table-header').removeClass('show').removeClass('active')
    $('#users-table-rows').removeClass('show').removeClass('active')

}

function getAllUsers() {
    fetch('/api/users').then(function (response) {
        if (response.ok) { // если HTTP-статус в диапазоне 200-299
            //
            // for (let [key, value] of response.headers) {
            //     console.log(`${key} = ${value}`);
            // }
            // console.log(response.headers)
            response.json().then(users => {
                usersTableId.empty();
                users.forEach(user => {
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
        .append($('<td>').append($('<button class="btn btn-sm btn-danger">').text('Delete')))
}

function addNewUser() {

}

