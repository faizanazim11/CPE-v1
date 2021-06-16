<?php
$con = mysqli_connect('localhost', 'root', '', 'itworld');
$sub = $_POST['sub'];
$email = $_POST['email'];
$str = "SELECT prob_name, score, diff, (SELECT COUNT(*) FROM usr_solved WHERE email='$email' AND usr_solved.prob_name=prob_def.prob_name) AS status FROM prob_def WHERE subject='$sub'";
$result = mysqli_query($con, $str);
if(mysqli_num_rows($result)==0)
{
    echo json_encode(NULL);
}
else
{
    $arr = [];
    while($row=$result->fetch_assoc())
    {
        array_push($arr, $row);
    }
    echo json_encode($arr);
}
$con->close();
?>