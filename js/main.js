// This method change the section
// This method has 2 parameters:
//      pageOut: The section ID that you go out
//      pageIn: The section ID that you go in
function page(pageOut, pageIn){
    document.getElementById(pageOut).className += " invisible";
    document.getElementById(pageIn).classList.remove("invisible");
    window.scroll(0,document.getElementById(pageIn).scrollTop);
}

/* Set the width of the side navigation to 250px */
function openNav(section) {
    document.getElementById("mySidenav_" + section).style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav(section) {
    document.getElementById("mySidenav_" + section).style.width = "0";
} 

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav(section) {
    document.getElementById("mySidenav_" + section).style.width = "250px";
    document.getElementById("main_" + section).style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav(section) {
    document.getElementById("mySidenav_" + section).style.width = "0";
    document.getElementById("main_" + section).style.marginLeft = "0";
} 

// var Chart = require('chart.js');
var ctx = document.getElementById('stadistics_graph').getContext('2d');
var stadistics = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['12/9', '13/9', '14/9', '15/9', '16/9', '17/9'],
        datasets: [{
            label: 'Feeding',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

function btnLook(id, span) {
    if (document.getElementById(id).type == "password") {
        document.getElementById(id).type = "text";
        document.getElementById(span).src = "img/noLook.png";
    } else {
        document.getElementById(id).type = "password";
        document.getElementById(span).src = "img/look.png";
    }
}