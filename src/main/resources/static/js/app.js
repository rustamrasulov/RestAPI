const url = 'http://localhost:8080/api/users'

const usersTableId = $('#users-table-rows');

getAllUsers()

function getAllUsers() {
    fetch('/api/users').then(function (response) {
        if (response.ok) { // если HTTP-статус в диапазоне 200-299
            response.json().then(users => {
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




function _appendUserRow(user) {
    usersTableId
        .append($('<tr class="border-top bg-light">').attr('id', 'userRow[' + user.id + ']')
            .append($('<td>').attr('id', 'userData[' + user.id + '][id]').text(user.id))
            .append($('<td>').attr('id', 'userData[' + user.id + '][firstName]').text(user.firstName))
            .append($('<td>').attr('id', 'userData[' + user.id + '][lastName]').text(user.lastName))
            .append($('<td>').attr('id', 'userData[' + user.id + '][age]').text(user.age))
            .append($('<td>').attr('id', 'userData[' + user.id + '][email]').text(user.email))
            .append($('<td>').attr('id', 'userData[' + user.id + '][roles]').text(user.roles.map(role => role.name)))
            .append($('<td>').append($('<button class="btn btn-sm btn-info">')
                .click(() => {
                    loadUserAndShowModalForm(user.id);
                }).text('Edit')))
            .append($('<td>').append($('<button class="btn btn-sm btn-danger">')
                .click(() => {
                    loadUserAndShowModalForm(user.id, false);
                }).text('Delete')))
        );
}
/*
    <th scope="row" th:text="${user.id}"></th>
    <td th:text="${user.firstName}"></td>
    <td th:text="${user.lastName}"></td>
    <td th:text="${user.age}"></td>
    <td th:text="${user.email}"></td>
    <td>
        <th:block th:each="role : ${user.roles}">
            <span className="align-middle" th:text="${role.authority}"></span>
        </th:block>
    </td>
    <td>
        <button type="button" className="btn btn-primary" data-toggle="modal"
                data-target="#editModal"
                th:data-target="${'#editModal'+user.id}">Edit
        </button>

    </td>
    <td>
        <button type="button" className="btn btn-danger" data-toggle="modal"
                data-target="#deleteModal"
                th:data-target="${'#deleteModal'+user.id}">
            Delete
        </button>
    </td>
*/


//
// function _appendUserRow(user) {
//     usersTableId
//         .append($('<tr class="border-top bg-light">').attr('id', 'userRow[' + user.id + ']')
//             .append($('<td>').attr('id', 'userData[' + user.id + '][id]').text(user.id))
//             .append($('<td>').attr('id', 'userData[' + user.id + '][firstName]').text(user.firstName))
//             .append($('<td>').attr('id', 'userData[' + user.id + '][lastName]').text(user.lastName))
//             .append($('<td>').attr('id', 'userData[' + user.id + '][age]').text(user.age))
//             .append($('<td>').attr('id', 'userData[' + user.id + '][email]').text(user.email))
//             // .append($('<td>').attr('id', 'userData[' + user.id + '][roles]').text(user.roles.map(role => role.name)))
//             .append($('<td>').attr('id', 'userData[' + user.id + '][roles]').text('user.roles.map(role => role.name)'))
//             .append($('<td>').append($('<button class="btn btn-sm btn-info">')
//                 .click(() => {
//                     loadUserAndShowModalForm(user.id);
//                 }).text('Edit')))
//             .append($('<td>').append($('<button class="btn btn-sm btn-danger">')
//                 .click(() => {
//                     loadUserAndShowModalForm(user.id, false);
//                 }).text('Delete')))
//         );
// }
//
// function getAllRoles() {
//     //let response = fetch(url);
//     fetch('/api/users/roles').then(function (response) {
//         if (response.ok) { // если HTTP-статус в диапазоне 200-299
//             response.json().then(roles => {
//                 roles.forEach(role => console.log(role))
//             })
//
//         } else {
//             alert("Ошибка HTTP: " + response.status);
//         }
//     });
// }
//
// getAllUsers();
// getAllRoles();