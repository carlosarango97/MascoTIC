const auth=firebase['auth']();
const db=firebase['firestore']();
const storage=firebase['storage']();

function signUp() {
    // Get user info Form
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
            // Set account  doc  
            account = {
                userId: userUid,
                username: username,
                deviceID: deviceId
            }

            db.collection('accounts').doc(emailUser).set(account).then(function () {
            }).catch(function (error) {
                console.error("Error: ", error);
            });

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
                    alert(errorMessage);
                }
            });
    } else {
        alert("The passwords are diferents!");
    }

}