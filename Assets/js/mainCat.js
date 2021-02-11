var db = new Dexie('RETEX');

db.version(1).stores({
	users: '++id,fname,lname,&uname,psd,email,dob,policies,admin,balance',
	policies: '++id,&name, maincat, subcat,description,premium,sum_assured, date',
	main_category: '++id,&name, date',
	sub_category: '++id,&name, maincat, date',
	pending_policies: 'uname,policy_name'
});

function addDemo(title){
    return db
		.transaction('rw', db.main_category, function() {
			db.main_category
				.add(title)
				.then((val) => {
					// console.log("Worked.." + val);
					return true;
				})
				.catch((val) => {
					console.log("Some Error Happened" + val);
					return false;
				});
		})
		.catch(function(e) {
			console.error(e.stack);
		});
}
// addDemo({name: "Life-Insurance", date: new Date().toISOString()});
// addDemo({name: 'Property-Insurance', date: new Date().toLocaleDateString()});
// addDemo({name: 'Fire-Insurance', date: new Date().toLocaleTimeString()});
// addDemo({name: 'Liability-Insurance', date: new Date().toString()});
// addDemo({name: 'Guarantee-Insurance', date: new Date().toUTCString()});

const tableRow = document.querySelector('.rowData');
function displayMainCategory() {
	return db
		.transaction('r', db.main_category, function() {
			db.main_category
                .each(val => insertElement(val))
				.then((res) => {
					return true;
				})
				.catch((res) => {
					return false;
				});
		})
		.catch(function(e) {
			console.error(e.stack);
		});
}

function insertElement(objText){
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.setAttribute('scope', 'row')
    th.appendChild(document.createTextNode(objText.id));
    const td = document.createElement('td');
    td.className = 'mainCat';
    td.appendChild(document.createTextNode(objText.name));
    const td2 = document.createElement('td');
    td2.className = 'date';
    td2.appendChild(document.createTextNode(objText.date));
    const link = document.createElement('a');
    link.innerHTML = `<a href="edit.html">Edit Insurance Category</a>`
    const td3 = document.createElement('td');
    td3.className = 'editLink';
    td3.appendChild(link);
    tr.appendChild(th);
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tableRow.appendChild(tr);
}

displayMainCategory();