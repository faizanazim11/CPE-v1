<?php
function register(){
    $con = mysqli_connect('localhost', 'root', '', 'itworld');
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $auth = mt_rand(100000, 999999);
    $str = "INSERT INTO access_info(name, email, password, authenticate) VALUES('$name', '$email', '$password', $auth)";
    mysqli_query($con, $str);
    $subject = "Verification code";
    $body = "Hi $name, thanks for registering.\nYour verification code is $auth.\n";
    $headers = "From: faizanphptest@gmail.com";
    mail($email, $subject, $body, $headers);
    echo "You are successfully registered.";
    $con->close();
}
function checkmail(){
    $con = mysqli_connect('localhost', 'root', '', 'itworld');
    $email = $_POST['email'];
    $str = "SELECT * FROM access_info WHERE email='$email'";
    $result = mysqli_query($con, $str);
    if(mysqli_num_rows($result)!=1)
    {
        echo json_encode(false);
    }
    else
    {
        echo json_encode(true);
    }
    $con->close();
}
$fun = $_POST['fun'];
if($fun==1)
{    
    checkmail();
}
else   
{
    register();
}
?>