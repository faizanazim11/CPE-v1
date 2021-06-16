<?php
$con = mysqli_connect('localhost', 'root', '', 'itworld');
$email=$_GET['email'];
$str = "SELECT name, prof_pic, c_score, ds_score, java_score, ccp, dscp, jcp FROM access_info JOIN profile_overview USING(email) WHERE email='$email'";
$result = mysqli_query($con, $str);
if(mysqli_num_rows($result)!=1)
{
    echo "Unable to retrieve data";
}
else
{
    $row = $result->fetch_assoc();
    echo json_encode($row);
    $con->close();
}
?>