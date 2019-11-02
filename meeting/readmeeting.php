<?php
$id = '';
$con = mysqli_connect("localhost","root","","meeting_schedule");
//Access-Control Start
 
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
      header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
      header('Access-Control-Allow-Credentials: true');
      header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }
 
  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
 
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
 
      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
 
      exit(0);
  }
 
  //Access-Control End
 
$method = $_SERVER['REQUEST_METHOD'];
//$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
 
 
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

        $scheduler_id = $_GET["scheduler_id"];

        $sql = "SELECT * FROM `meeting` WHERE `scheduler_id` = '$scheduler_id' ";
        $result = mysqli_query($con,$sql);

        if (!$result) {
          http_response_code(404);
          die(mysqli_error($con));
        }
        else{

        }
         
        if ($method == 'GET') {
          // echo json_encode($result);
            if (!$id) echo '[';
            for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
              echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
            }
            if (!$id) echo ']';
          } elseif ($method == 'POST') {
            echo json_encode($result);
          } else {
            echo mysqli_affected_rows($con);
          }
                 
        $con->close();

