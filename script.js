//const api_url = "https://prashant158.herokuapp.com/car"
const api_url = "http://localhost:8085/car"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].brand}</td>`;
		table_data += `<td>${records[i].model}</td>`;
		table_data += `<td>${records[i].year}</td>`;
		table_data += `<td>${records[i].price}</td>`;
		table_data += `<td>${records[i].fuel_type}</td>`;
		table_data += `<td>${records[i].fuel_capacity}</td>`;
		table_data += `<td>${records[i].economy}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => {
	
		console.log(data._id);
		console.log("hello");
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("brand").value=data.brand;
document.getElementById("model").value=data.model;
	document.getElementById("year").value=data.year;
	document.getElementById("price").value=data.price;
document.getElementById("fuel_type").value=data.fuel_type;
 document.getElementById("fuel_capacity").value=data.fuel_capacity;
 document.getElementById("economy").value=data.economy;
	

	

	})
}


function postData() {
	var brand = document.getElementById("brand").value;
	var model = document.getElementById("model").value;
	var year = document.getElementById("year").value;
	var price = document.getElementById("price").value;
	var fuel_type = document.getElementById("fuel_type").value;
	var fuel_capacity = document.getElementById("fuel_capacity").value;
	var economy = document.getElementById("economy").value;
	
	data = {brand: brand, model: model, year: year, price: price, fuel_type: fuel_type, fuel_capacity: fuel_capacity, economy: economy};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html";
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var brand = document.getElementById("brand").value;
	var model = document.getElementById("model").value;
	var year = document.getElementById("year").value;
	var price = document.getElementById("price").value;
	var fuel_type = document.getElementById("fuel_type").value;
	var fuel_capacity = document.getElementById("fuel_capacity").value;
	var economy = document.getElementById("economy").value;
	console.log(_id);
	
	data = {_id: _id, brand: brand, model: model, year: year, price: price, fuel_type: fuel_type, fuel_capacity: fuel_capacity, economy: economy};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input)		{
		console.log(id);
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}