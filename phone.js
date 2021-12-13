getAll();
function getContent(data, i) {
    return `<tr>
                <td>${i + 1}</td>
                <td>${data[i].producer}</td>
                <td>${data[i].model}</td>
                <td>${data[i].price}</td>
                <td><button onclick="removeSmartphone(${data[i].id})">Delete</button></td>
                <td><button onclick="updateSmartphoneForm(${data[i].id})">Update</button></td>
            </tr>`;
}

function updateSmartphoneForm(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/smartphones/${id}`,
        success: function (smartphone){
            $("#update-smartphone").html( `<table>
        <tr>
            <td><input type="hidden" id="id" value="${id}" placeholder="producer"></td>
        </tr>
        <tr>
            <td>Producer:</td>
            <td><input type="text" id="producer" value="${smartphone.producer}" placeholder="producer"></td>
        </tr>
        <tr>
            <td>Model:</td>
            <td><input type="text" id="model" value="${smartphone.model}" placeholder="model"></td>
        </tr>
        <tr>
            <td>Price:</td>
            <td><input type="text" id="price" value="${smartphone.price}" placeholder="price"></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="button" value="Save" onclick="updateSmartphone(${id})"></td>
        </tr>
    </table>`)
        }
    });
}

function updateSmartphone() {
    let id = $('#id').val();
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        id: id,
        producer: producer,
        model: model,
        price: price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newSmartphone),
        url: `http://localhost:8080/smartphones`,
        success: getAll

    })
}

function removeSmartphone(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/smartphones/" + id,
        success: getAll
    });
}

function getAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/smartphones",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += getContent(data, i)
            }
            $("#smartphone").html(content);
        }
    });
}

function addNewForm() {
    document.getElementById("add-smartphone").innerHTML = `<table>
        <tr>
            <td>Producer:</td>
            <td><input type="text" id="producer" placeholder="producer"></td>
        </tr>
        <tr>
            <td>Model:</td>
            <td><input type="text" id="model" placeholder="model"></td>
        </tr>
        <tr>
            <td>Price:</td>
            <td><input type="text" id="price" placeholder="price"></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="button" value="Add" onclick="addNew()"></td>
        </tr>
    </table>`
}

function addNew() {
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        //tên API
        url: "http://localhost:8080/smartphones",
        success: getAll

    });
    event.preventDefault();
}