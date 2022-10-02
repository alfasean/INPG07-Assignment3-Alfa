// variabel-variabel
const form_data = document.querySelector(".formData");
const input_element = document.querySelector(".inputElement");
const input_date = document.querySelector(".inputDate");


const content_section = document.querySelector("#content_section");
const loading_section = document.querySelector("#loading_section");


form_data.addEventListener("submit", (e) => {
    e.preventDefault();
    const country = input_element.value;
    const date = input_date.value;
    showLoading();
    hiddenContent();
    fetchDataAPI(country, date);
})



function fetchDataAPI(country, date) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    };
    const url = `https://covid-193.p.rapidapi.com/history?country=${country}&day=${date}`
    fetch(url, options)
        .finally(hiddenLoading)
        .then(response => response.json())
        .then(response => {
            if(response.results == 0) {
                showError();
            } else {
                showContent(response.response[0]);
            }
        })
}


function showLoading() {
    loading_section.classList.remove("d-none");
}
function hiddenLoading() {
    loading_section.classList.add("d-none");
}
function showError() {
   errorData();
   input_element.value = "";
   input_date.value = "";
}

function clearData() {
    input_element.value = "";
    input_date.value = "";
    active_cases.innerHTML = "";
    new_cases.innerHTML = "";
    recovered_cases.innerHTML = "";
    total_cases.innerHTML = "";
    total_deaths.innerHTML = "";
    total_test.innerHTML = "";
}


const active_cases = document.querySelector(".activeCases");
const new_cases = document.querySelector(".newCases");
const recovered_cases = document.querySelector(".recorvedCases");
const total_cases = document.querySelector(".totalCases");
const total_deaths = document.querySelector(".totalDeaths");
const total_test = document.querySelector(".totalTest");

function showContent(data) {
    successData();
    content_section.classList.remove("d-none");
    active_cases.innerHTML = data.cases.active;
    new_cases.innerHTML = (data.cases.new == null) ? 0 : data.cases.new;
    recovered_cases.innerHTML = data.cases.recovered;
    total_cases.innerHTML = data.cases.total;
    total_deaths.innerHTML = data.deaths.total;
    total_test.innerHTML = data.tests.total;
}
function hiddenContent() {
    content_section.classList.add("d-none");
}

var backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if ( this.scrollY >= 40 ) {
    backToTop.classList.add('show');

    backToTop.addEventListener('click', () => {
      window.scrollTo({top: 0});
    })
  } else {
    backToTop.classList.remove('show');
  }
});

function successData() {

    swal({

         title: "Berhasil",

         text: "Data Ditemukan",

         icon: "success",

         button: true

     });

 }

function errorData() {

    swal({

         title: "Error",

         text: "Negara Tidak Ditemukan!!!",

         icon: "error",

         button: true

     });

 }



