const auth=firebase['auth']();
const db=firebase['firestore']();

function signUp() {
    // Get user info Form    
    charge(true);
    const email = document.getElementById("email_LogUp").value;
    const username = document.getElementById("user_LogUp").value;
    const password1 = document.getElementById("password1_LogUp").value;
    const password2 = document.getElementById("password2_LogUp").value;
    const deviceId = document.getElementById("device_id_LogUp").value;
    var emailUser = email.toLowerCase();
    if (password1 === password2) {
        // Sing up the user
        auth.createUserWithEmailAndPassword(email, password1).then(function (data) {
            const userUid = data.user.uid;
            var account = null;
            let feederVal = "N/A";
            let lastFood = feederVal;
            // Set account  doc  
            account = {
                userId: userUid,
                username: username,
                deviceID: deviceId,
                feeder: feederVal,
                food: lastFood
            }

            db.collection('accounts').doc(emailUser).set(account).then(function () {
            }).catch(function (error) {
                console.error("Error: ", error);
            });
            charge(false);
            alert("User was created!");            
            document.getElementById("email_LogUp").value = "";
            document.getElementById("user_LogUp").value = "";
            document.getElementById("password1_LogUp").value = "";
            document.getElementById("password2_LogUp").value = "";
            document.getElementById("device_id_LogUp").value = "";
            data.user.sendEmailVerification();
            page('logUp','logIn');
            userDataLogin(emailUser);
        })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorMessage === "The email address is already in use by another account.") {
                    charge(false);
                    alert(errorMessage);
                }
            });
    } else {
        charge(false);
        alert("The passwords are diferents!");        
    }

}

function signIn() {
    charge(true);
    // Get user info
    var email = document.getElementById("email_Login").value.toLowerCase();
    const password = document.getElementById("password_Login").value;


    // Sign up the user

    auth.signInWithEmailAndPassword(email, password).then(function (data) {
        const userUid = email;
        if (data.user.emailVerified) {
            document.getElementById("email_Login").value = "";
            document.getElementById("password_Login").value = "";
            page('logIn','main_menu');
            db.collection('accounts').doc(userUid).get().then(snap => {
                localStorage.setItem('DeviceID',snap.data().deviceID);
                localStorage.setItem('userID',userUid);
                updateTimes(userUid); 
                stadisticsForDays();               
            });
        } else {
            alert("Verify your email!");
            charge(false);
        }

    }).catch(function (error) {
        console.log(error.message);
        charge(false);
        alert("The user or password aren't correct! :(");

    });
    return false;
}

function logOut(){
    auth.signOut();
    page('main_menu','logIn');
}

function passwordRecovery() {
    const email = document.getElementById("input_recoveryAccount").value;
    document.getElementById("input_recoveryAccount").value = "";
    console.log(firebase.auth().sendPasswordResetEmail(email));    
    page('recoveryAccount','logIn');
    return false;
}