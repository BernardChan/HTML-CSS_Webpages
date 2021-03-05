const streetname = document.getElementById("stname");
streetname.addEventListener("blur", update_textarea);

const suburb = document.getElementById("suburb");
suburb.addEventListener("blur", update_textarea);

const postcode = document.getElementById("postcode");
postcode.addEventListener("blur", update_textarea);

const dob = document.getElementById("dob");
dob.addEventListener("blur", update_textarea);

const building = document.getElementById("building");
building.addEventListener("change", update_textarea);

// checkboxes
const checkbox1 = document.querySelector("#cb1");
checkbox1.addEventListener("change", update_textarea);

const checkbox2 = document.querySelector("#cb2");
checkbox2.addEventListener("change", update_textarea);

const checkbox3 = document.querySelector("#cb3");
checkbox3.addEventListener("change", update_textarea);

const checkbox4 = document.querySelector("#cb4");
checkbox4.addEventListener("change", update_textarea);

const select = document.getElementById("select");
select.addEventListener("click", update_checkboxes);
select.addEventListener("click", update_textarea);

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
    document.getElementById("select").innerHTML = "Select all";
});

// main function for updating textarea output
function update_textarea() {
    const textarea = document.getElementById("textarea");
    if (streetname.value == "" || valid_text(streetname.value) == false) {
        textarea.value = "Please input a valid street name";
    }
    else if (suburb.value == "" || valid_text(suburb.value) == false) {
        textarea.value = "Please input a valid suburb";
    }
    else if (postcode.value == "" || valid_postcode(postcode.value) == false) {
        textarea.value = "Please input a valid postcode"
    }
    else if (dob.value == "" || valid_dob(dob.value) == false) {
        textarea.value = "Please input a valid date of birth"
    }
    else {
        var print_string = "Your are "
        + get_age(dob.value) 
        + " years old, and your address is " 
        + streetname.value 
        + " St, " 
        + suburb.value + ", "
        + postcode.value + ", " 
        + "Australia. Your building is "

        if (building.value == "Apartment") {
            print_string = print_string.concat(`an ${building.value}`)
        }
        else {
            print_string = print_string.concat(`a ${building.value}`)
        }
        print_string = print_string + ", and it has "

        var checkbox = document.querySelectorAll(`input[type=checkbox]:checked`)
        var features_string = ""

        if (checkbox.length == 0) {
            features_string = "no features"
        }
        for (var i = 0; i < checkbox.length; i++) {
            // occurs between last and second last feature when there are >1 features
            if (i == checkbox.length - 1 && i != 0) {
                features_string = features_string + 'and '
            }
            features_string = features_string + checkbox[i].value
            if (i < checkbox.length - 1) {
                features_string = features_string + ", "
            }
        }
        textarea.value = print_string + features_string;
    }
    select_switch();
}

// select/deselect all button
function update_checkboxes () {
    var status = document.getElementById("select");
    var checkbox = document.querySelectorAll(`input[type=checkbox]`)
    if (status.innerHTML == "Deselect all") {
        for (var i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false;
        }
    }
    else {
        for (var i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = true;
        }
    }
}

// switches between select and deselect
function select_switch() {
    var checked = document.querySelectorAll(`input[type=checkbox]:checked`)
    if (checked.length == 4) {
        document.getElementById("select").innerHTML = "Deselect all";
    }
    else document.getElementById("select").innerHTML = "Select all";
}

function valid_text(text) {
    if (text.length >= 3 && text.length <= 50) return true;
    else return false;
}

function valid_postcode(int) {
    if (int.length == 4 && isNaN(int) == false) return true;
    else return false;
}

function valid_dob(dob) {
    var datereg = /^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$/g;
    // date is switched from DD-MM-YYYY to MM-DD-YYYY to be appropriately used in Date.parse()
    var datearray = dob.split("/");
    var newdate = `${datearray[1]}/${datearray[0]}/${datearray[2]}`;

    if (dob.match(datereg) != null && isNaN(Date.parse(newdate)) == false) return true;
    else return false;
}

function get_age(dob) {
    var datearray = dob.split("/");
    var newdate = `${datearray[1]}/${datearray[0]}/${datearray[2]}`;

    var today = new Date();
    var birth = new Date(newdate);
    var diff = today - birth;
    // as diff is in milliseconds, we convert it to years, divide by (1000*60*60*24*365.25)
    age = Math.floor(diff/31557600000);
    return age;
}

