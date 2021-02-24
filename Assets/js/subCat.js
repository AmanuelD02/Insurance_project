$('#edit').click(function() {
	var name = $('#name').val();
	var cat = $('#cat').val();
	var str = 'You Have Successfully Edited an Insurance Sub Category';
	$('#modal_body').html(str);
	updateSubCat({ name: cat, maincat: name, date: new Date().toUTCString() });
});

function updateSubCat(input) {
	return db
		.transaction('rw', db.sub_category, () => {
<<<<<<< HEAD
			db.sub_category
				.update(input.id, {input})
=======
			db.policies
				.update(input.id, { input })
>>>>>>> 60eded69d7806f471273fa4cbe75ada7b7249dff
				.then((val) => {
					return true;
				})
				.catch(() => {
					return false;
				});
		})
		.catch((e) => {
			console.log(e);
		});
}

function addSubDemo(title) {
	return db
		.transaction('rw', db.sub_category, function() {
			db.sub_category
				.put(title)
				.then((val) => {
					// console.log("Worked.." + val);
					return true;
				})
				.catch((val) => {
					console.log('Some Error Happened' + val);
					return false;
				});
		})
		.catch(function(e) {
			console.error(e.stack);
		});
}
// addSubDemo({name: "Health", maincat: "Life-Insurance", date: new Date().toUTCString()});
// addSubDemo({name: "Motor", maincat: "Property-Insurance", date: new Date().toUTCString()});
// addSubDemo({name: "Cycle", maincat: "Fire-Insurance", date: new Date().toUTCString()});
// addSubDemo({name: "Travel", maincat: "Liability-Insurance", date: new Date().toUTCString()});
// addSubDemo({name: "Mobile", maincat: "Guarantee-Insurance", date: new Date().toUTCString()});

const tableSubRow = document.querySelector('.subRowData');
function displaySubCategory() {
	return db
		.transaction('r', db.sub_category, function() {
			db.sub_category
				.each((val) => insertSubElement(val))
				.then((res) => {
					// console.log(res);
					return true;
				})
				.catch((res) => {
					console.log(res);
					return false;
				});
		})
		.catch(function(e) {
			console.error(e.stack);
		});
}
// let main = 0;
// async function getMainCategory(key){
//     // let objName = db.main_category.get({id: key});
//     // return objName;
//     let dbArr = db.main_category.toArray();
//     await db.main_category.each(element => {
//         // console.log(element.id);
//         if(element.id == key){
//             console.log("Worked!!!")
//             main = element.name;
//             return main;
//         }

//         // console.log("Processing...");
//     });
//     return main;

// }
// console.log(getMainCategory(1));
// console.log(main);
// // console.log(getMainCategory(1));

// // console.log(db.main_category.each(category => console.log(category.name)));
// // console.log(db.main_category.get('name').where('name').equals('Fire-Insurance'));

function insertSubElement(objText) {
	const tr = document.createElement('tr');
	const th = document.createElement('th');
	th.setAttribute('scope', 'row');
	th.appendChild(document.createTextNode(objText.id));
	const td = document.createElement('td');
	td.className = 'maincat';
	td.appendChild(document.createTextNode(objText.maincat));
	const td1 = document.createElement('td');
	td1.className = 'subcat';
	td1.appendChild(document.createTextNode(objText.name));
	const td2 = document.createElement('td');
	td2.className = 'date';
	td2.appendChild(document.createTextNode(moment(objText.date).format('YYYY-MM-DD')));
	const link = document.createElement('a');
	link.innerHTML = `<a href="#" data-toggle="modal" data-target="#editModal"><i class ="fas fa-edit"></i></a>`;
	link.innerHTML += modal;
	const td3 = document.createElement('td');
	td3.className = 'editLink';
	td3.appendChild(link);
	td3.appendChild(link2);
	tr.appendChild(th);
	tr.appendChild(td);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tableSubRow.appendChild(tr);
}

var modal = `
<div id="editModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="editModalLabel">Edit</h4>  
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">

				<!-- Start of Editing Form -->
				<form class="col-md-12 bg-secondary" id="form">
					<p class="text-white">Edit the following Information</p>
					<hr style="background-color: aliceblue;">
					<div class="form-group mt-4">
						<label class="text-white" for="category">Category: *</label><br>
						<select style="width: 24.5rem;" name="category" id="cat">
			
						</select>
					</div>
					<div class="form-group mt-4">
						<label class="text-white" for="name">Sub Category Name: *</label>
						<input style="width: 24.5rem;" type="text" required id="name" class="form-control bg-light">
					</div>
					<div class="row">
						<div class="col-md-12 mb-4 mt-2">
							<button id="edit" class="btn btn-info px-2 p-2 mb-2">Save Changes</button>
							<button type="button" class="btn btn-info px-2 p-2 mb-2" data-dismiss="modal">Cancel</button>
						</div>
					</div>
			  	</form>
				  <!-- End of Editing Form -->

			</div>
		</div>
	</div>
</div>
`;

displaySubCategory();
