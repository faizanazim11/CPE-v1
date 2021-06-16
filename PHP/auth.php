<?php
function login(){
    $con = mysqli_connect('localhost', 'root', '', 'itworld');
    $email=$_POST['email'];
    $password=$_POST['password'];
    $str = "SELECT * FROM access_info WHERE email='$email' AND password='$password'";
    $result = mysqli_query($con, $str);
    if(mysqli_num_rows($result)!=1)
    {
        echo "Invalid Username/Password!";
    }
    else
    {
        $row = $result->fetch_assoc();
        if($row['authenticate']!=NULL)
        {
            $ret = array(
                "res" => 1
            );
            echo json_encode($ret);
        }
        else
        {
            date_default_timezone_set('Asia/Kolkata');
            $date = date('Y-m-d H:i:s', time());
            $loginc = "UPDATE access_info SET lognos=lognos + 1, lastlog='$date' WHERE email='$email'";
            mysqli_query($con, $loginc);
            $name = "SELECT name FROM access_info WHERE email='$email'";
            $result = mysqli_query($con, $name);
            $row = $result->fetch_assoc();
            $ret = array(
                "res" => 2,
                "name" => $row['name']
            );
            echo json_encode($ret);
        }
    }
    $con->close();
}
function validate(){
    $con = mysqli_connect('localhost', 'root', '', 'itworld');
    $auth = $_POST['auth'];
    $email = $_POST['email'];
    $str = "SELECT * from access_info WHERE email='$email'";
    $result = mysqli_query($con, $str);
    $row = $result->fetch_assoc();
    if($row['authenticate'] == $auth)
    {
        $rm = "UPDATE access_info SET authenticate = NULL WHERE email='$email'";
        mysqli_query($con, $rm);
        $prof = "INSERT INTO profile_overview(email) VALUES('$email')";
        mysqli_query($con, $prof);
        echo "Account validated successfully!";
    }
    else
    {
        echo "Invalid code!";
    }
    $con->close();
}
$fun = $_POST['fun'];
if($fun == 1)
{
    login();
}
else
{
    validate();
}
?>