<?php


$id = '';

$con = mysqli_connect("localhost","root","","meeting_schedule");

//Access-Control Start

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods:*");
      header("Access-Control-Headers: *");    // cache for 1 day
      header("Acess-Control-Max-Age: 86400");
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
  


switch ($method) {
  case 'GET':
  // $meeting_name=($_GET["meeting"]);
  // $chairman= ($_GET["chairman"]);
  // $scheduler =($_GET["scheduler"]);
  // $date = $_GET["date"];
  // $time = $_GET["time"];
  // $room = $_GET["room"];
  // $location = $_GET["location"];
  // $agenda = $_GET["agenda"];
  // $attendees = $_GET["attendees"];

  $sql = "SELECT * FROM meeting"; 
  break;
  case 'POST': 
      $meeting_name = htmlentities($_POST["meeting_name"]);
      $chairman= htmlentities($_POST["chairman"]);
      $scheduler = htmlentities($_POST["scheduler"]);
      $date = $_POST["date"];
      $time = $_POST["time"];
      $room = $_POST["room"];
      $location = $_POST["location"];
      $agenda = $_POST["agenda"];
      $attendees = $_POST["attendees"];
    
//adding an  file to our database
      $response = array();
      $upload_dir = 'files/';
      $server_url = 'http://localhost/';

if($_FILES['avatar']){
  $avatar_name = $_FILES["avatar"]["name"];
    //image link
    $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
    //sizee of imaage
    $avatarsize=$_FILES["avatar"]["size"];
    //checking for errors
    $error = $_FILES["avatar"]["error"];

    if($error > 0){
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }else 
    {
        $random_name = rand(1000,1000000)."-".$avatar_name;
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);

        if(move_uploaded_file($avatar_tmp_name , $upload_name)) {
            $response = array(
                "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
                "url" => $server_url."/".$upload_name
              );
              $avatar_path = $server_url."newcontact/".$upload_name;
        }
        else
        {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    }    

}else{
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "No file was sent!"
    );
}
$tyme = date("Y/m/d h:i:sa");

      $sql = "INSERT INTO meeting ( meeting_name,chairman,scheduler,date,time,room,location,agenda,attendees,file_name,file_tmp,created_at,updated_at) values ('$meeting_name','$chairman','$scheduler','$date','$time', '$room', '$location', '$agenda','$attendees','$avatar_name','$avatar_path','$tyme','$tyme')"; 
break;
}

// run SQL statement
$result = mysqli_query($con,$sql);


// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
else{
  
}




if ($method == 'GET') {
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