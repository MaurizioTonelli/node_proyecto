window.onload = init;
function init(){
    if(!localStorage.getItem("token")){
        document.querySelector("#btn-login").addEventListener("click", login);
    }else{
        window.location.href = "tnode.html";
    }
}

function login(){
    var username = document.getElementById('input-username').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data:{
            user_name: username,
            user_password: pass
        }
    }).then(function(res){
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "tnode.html";
        }else{
            document.getElementById("error-msg").innerHTML = res.data.message;
        }
    }).catch(function(err){
        console.log(err);
    });
}