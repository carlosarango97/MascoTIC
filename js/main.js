// This method change the section
// This method has 2 parameters:
//      pageOut: The section ID that you go out
//      pageIn: The section ID that you go in
function page(idOut, idIn){
    document.getElementById(idIn).classList.remove("out");
    document.getElementById(idIn).classList.add("in");
    document.getElementById(idOut).classList.add("out");
    document.getElementById(idOut).classList.remove("in");
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

function send(){
	const url = 'http://192.168.1.180'
	const http = new XMLHttpRequest()

	http.open("GET", url)
	http.onreadystatechange = function(){

		if(this.readyState == 4 && this.status == 200){
			var resultado = JSON.parse(this.responseText)
			console.log(resultado.name)
		}
	}
	http.send()
}	

// var Chart = require('chart.js');
var ctx = document.getElementById('stadistics_graph').getContext('2d');
// var stadistics = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['12/9', '13/9', '14/9', '15/9', '16/9', '17/9'],
//         datasets: [{
//             label: 'Feeding',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });

function btnLook(id, span) {
    if (document.getElementById(id).type == "password") {
        document.getElementById(id).type = "text";
        document.getElementById(span).src = "img/noLook.png";
    } else {
        document.getElementById(id).type = "password";
        document.getElementById(span).src = "img/look.png";
    }
}

function charge(on) {
    if (!on) {
        document.getElementById("charge").className += " invisible";
    } else {
        document.getElementById("charge").classList.remove("invisible");
    }
}

function addSchedul() {
    document.getElementById('schedulesCards').innerHTML += 
        `<div class="div_top_schedules div_span_schedules">
            <img class="deleteBtn">
            <span class="span_schedules">08:00 - 20gr</span>
        </div>`;    
}

function addSchedule() {

    var food = document.getElementById('food').value;
    var time = document.getElementById('time').value;

    var div = document.createElement("div");
    
    div.classList.add("div_top_schedules");
    div.classList.add("div_span_schedules");    
    div.appendChild(document.createTextNode(food+"gr"+" - "+time));
	document.getElementById('schedulesCards').appendChild(div);

    var imgDel = document.createElement("img");
    
	imgDel.classList.add("deleteBtn");
	div.appendChild(imgDel);
	imgDel.addEventListener("click", deleteListItem);

	function deleteListItem() {
		div.classList.add("invisible");
    }
    
    document.getElementById('food').value = "";
    document.getElementById('time').value = "";
} 

function saveFood(quantity){
    let date = new Date();
    let month = (date.getMonth()+1) + "a" + date.getFullYear();
    let device = localStorage.getItem("DeviceID");    
    let minutes = date.getMinutes()<10?"0" + date.getMinutes():date.getMinutes();
    jsonDate = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + "-" + date.getHours() + ":" + minutes;
    let data = {
        feeder: quantity,
        food: jsonDate
    }
    db.collection('accounts').doc(localStorage.getItem("userID")).update(data);
    updateTimes(localStorage.getItem("userID"));
    let address = "Alimentacion/" + device + "/" + month + "/" + date.getDate();
    firebase.database().ref(address).once('value').then(function (snapshot) {
        let ok = snapshot.exists();
        let value = quantity;
        if(ok){
            value = parseInt(value) + parseInt(snapshot.val());
        }
        updates = {};
        updates[address + '/'] = value;    
        firebase.database().ref().update(updates);
    });
    firebase.database().ref("Alimentacion/" + device + "/" + month + "/count").once('value').then(function (snapshot) {
        let count;
        if(snapshot.exists()){
            count = parseInt(snapshot.val()) + parseInt(quantity);
        }else{
            count = parseInt(quantity);
        }        
        update = {};
        update["Alimentacion/" + device + "/" + month + "/count/"] = count;
        firebase.database().ref().update(update);
    });
}

function updateTimes(userUid) {
    db.collection('accounts').doc(userUid).get().then(snap => {        
        let date = new Date();        
        let food = snap.data().food;
        if(food!="N/A"){
            let day = food.split("-")[0].split("/");
            let lastDay = new Date(date.getFullYear(),date.getMonth(),0);
            let dayVal = "";
            if(day[1]==(date.getMonth()+1)){
                if(day[0]==date.getDate()){
                    dayVal = "Today";
                }else if(day[0]==(date.getDate()-1)){
                    dayVal = "Yesterday";
                }            
                else{
                    dayVal = day[0] + "/" + day[1] + "/" + day[2];
                }
            }else{
                if(date.getDate()==1 && day[0]==lastDay.getDate()){
                    dayVal = "Yesterday";
                }else{
                    dayVal = day[0] + "/" + day[1] + "/" + day[2];
                }
            }
            let lastFood = "Last food: " + dayVal + " at " + snap.data().food.split("-")[1];
            document.getElementById("span_last_food").innerHTML = lastFood;
            let feeder = "In this moment your feeder has: " + snap.data().feeder + "gr.";
            document.getElementById("span_feeder_has").innerHTML = feeder;
        }else{       
            document.getElementById("span_last_food").innerHTML = "";
            document.getElementById("span_feeder_has").innerHTML = "You hasn't used MascoTIC";
        }
    });
}

function stadisticsForDays(){
    let date = new Date();
    let month = (date.getMonth()+1) + "a" + date.getFullYear();
    let device = localStorage.getItem("DeviceID");    
    let day = parseInt(date.getDate());
    for(let i = 0; i<6; i++){
        firebase.database().ref("Alimentacion/" + device + "/" + month + "/" + day).once('value').then(function (snapshot) {
            firebase.database().ref("Alimentacion/" + device + "/stads/i" + i).set({
                x: (day+6) + "/" + (date.getMonth()+1),
                val: snapshot.val()
            });
            day--;
        });        
        day--;
    }
    firebase.database().ref("Alimentacion/" + device + "/stads").once('value').then(function (snap) {
        // stadistics.data.datasets.forEach((dataset) => {
        //     dataset.data.pop();
        // });
        // stadistics.data.datasets.data = [snap.val().i0.val, snap.val().i1.val, snap.val().i2.val, snap.val().i3.val, snap.val().i4.val, snap.val().i5.val];        
        // stadistics.update();
        // stadistics.data.labels = [snap.val().i0.x, snap.val().i1.x, snap.val().i2.x, snap.val().i3.x, snap.val().i4.x, snap.val().i5.x];
        stadistics = null;
        stadistics = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [snap.val().i0.x, snap.val().i1.x, snap.val().i2.x, snap.val().i3.x, snap.val().i4.x, snap.val().i5.x],
                datasets: [{
                    label: 'Feeding',
                    data: [snap.val().i0.val, snap.val().i1.val, snap.val().i2.val, snap.val().i3.val, snap.val().i4.val, snap.val().i5.val],
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
        stadistics.update();        
        charge(false);
    });
}

function stadisticsForMonths(){
    let date = new Date();
    let device = localStorage.getItem("DeviceID");
    for(let i = 0; i<6; i++){
        firebase.database().ref("Alimentacion/" + device + "/" + (date.getMonth()+1-i) + "a" + date.getFullYear() + "/count").once('value').then(function (snapshot) {
            firebase.database().ref("Alimentacion/" + device + "/stads/i" + i).set({
                x: (date.getMonth()+1-i) + "/" + date.getFullYear(),
                val: snapshot.val()
            });
        });    
    }
    firebase.database().ref("Alimentacion/" + device + "/stads").once('value').then(function (snap) {
        // stadistics.data.datasets.forEach((dataset) => {
        //     dataset.data.pop();
        // });
        // stadistics.data.datasets.data = [snap.val().i0.val, snap.val().i1.val, snap.val().i2.val, snap.val().i3.val, snap.val().i4.val, snap.val().i5.val];        
        // stadistics.update();
        // stadistics.data.labels = [snap.val().i0.x, snap.val().i1.x, snap.val().i2.x, snap.val().i3.x, snap.val().i4.x, snap.val().i5.x];
        stadistics = null;
        stadistics = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [snap.val().i0.x, snap.val().i1.x, snap.val().i2.x, snap.val().i3.x, snap.val().i4.x, snap.val().i5.x],
                datasets: [{
                    label: 'Feeding',
                    data: [snap.val().i0.val, snap.val().i1.val, snap.val().i2.val, snap.val().i3.val, snap.val().i4.val, snap.val().i5.val],
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
        stadistics.update();
    });
}