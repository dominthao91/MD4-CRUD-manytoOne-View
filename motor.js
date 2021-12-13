
function getContent(data, i) {
    return ` <tr>
            <td>${i+1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].price}</td>
            <td>${data[i].description}</td>
            <td>${data[i].category?.name}</td>
            <td>${data[i].image}</td>
            <td>
                <button onclick="showEditMotor(${data[i].id})">Edit</button>
            </td>
            <td>
                <button  onclick="removeMotor(${data[i].id})">Delete</button>
            </td>
        </tr>`
}
function getAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/motors",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += getContent(data, i)
            }
            $("#motor").html(content);
        }
    });
}
function addNewMotor() {
    document.getElementById("addMotor").innerHTML = `<table>
        <tr>
            <td>Name:</td>
            <td><input type="text" id="motorName" placeholder="name"></td>
        </tr>
        <tr>
            <td>Price:</td>
            <td><input type="text" id="motorPrice" placeholder="price"></td>
        </tr>
        <tr>
            <td>Description:</td>
            <td><input type="text" id="motorDescription" placeholder="description"></td>
        </tr>
        <tr>
            <td>Category:</td>
            <td> <select id="motorCategory">
       
            </select></td>
        </tr>
        <tr>
            <td>Image:</td>
            <td><input type="file" id="motorImage"  placeholder="image" onchange="image(this)"></td>
            <td id="displayImage"></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="submit" value="Create" onclick="addNew()"></td>
        </tr>
    </table>`
}
function addNew() {
    let name = $('#motorName').val();
    let price = $('#motorPrice').val();
    let description = $('#motorDescription').val();
    let category = $('#motorCategory').val();
    let image = $('#motorImage').val();
    let newMotor = {
        name : name,
        price : price,
        description : description,
        category : {
            id: category
        },
        image : image
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newMotor),
        url: `http://localhost:8080/motors/`,
        enctype : 'multipart/form-data',
        success: getAll
    })
}
function removeMotor(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/motors/` + id,
        success: getAll
    });
    event.preventDefault();
}
function editMotor() {
    let id = $('#id').val();
    let name = $('#name').val();
    let price = $('#price').val();
    let description = $('#description').val();
    let category = $('#motorCategory').val();
    let image = $('#motorImage').val();
    let newMotor = {
        name : name,
        price : price,
        description : description,
        category : {
            id: category
        },
        image : image
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newMotor),
        url: `http://localhost:8080/motors`,
        success: getAll

    })
    event.preventDefault();
}
function showEditMotor(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/motors/${id}`,
        success: function (motor){
            $("#editMotor").html( `<table>
        <tr>
            <td><input type="hidden" id="id" value="${id}" placeholder="producer"></td>
        </tr>
        <tr>
            <td>Name:</td>
            <td><input type="text" id="name" value="${motor.name}" placeholder="name"></td>
        </tr>
        <tr>
            <td>Price:</td>
            <td><input type="text" id="price" value="${motor.price}" placeholder="price"></td>
        </tr>
        <tr>
            <td>Descreption:</td>
            <td><input type="text" id="desscription" value="${motor.description}" placeholder="description"></td>
        </tr>
        <tr>
            <td>Category:</td>
            <td> <select id="motorCategory">
       
            </select></td>
        </tr>
         <tr>
            <td>Image:</td>
            <td><input type="text" id="image" value="${motor.image}" placeholder="image"></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="button" value="Save" onclick="editMotor(${id})"></td>
        </tr>
    </table>`)
        }
    });
    event.preventDefault();
}