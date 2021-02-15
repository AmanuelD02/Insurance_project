function addMainCat(title) {
	return db
		.transaction('rw', db.main_category, function() {
			db.main_category
				.add(title)
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

var add_btn = document.getElementById('add_insurance');
var insurance_input = document.getElementById('insurance_name');
var error_label = document.getElementById('error_display');

function submitted() {
	console.log('CLICKED');
	if (insurance_input.value == '') {
		insurance_input.style.borderColor = 'red';
		error_label.value = 'Required Field';
		error_label.style.color = 'red';
	} else {
		console.log(insurance_input.value);
	}
}