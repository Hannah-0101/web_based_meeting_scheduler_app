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
  if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
  }
  
$data = json_decode(file_get_contents("php://input"));
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
        $id = $_POST["id"];
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

        $sql = "UPDATE `meeting`SET `meeting_name`='$meeting_name',`chairman`='$chairman', `scheduler`='$scheduler',`date`='$date',`time_to`='$time',`room`='$room',`location`='$location',`agenda`='$agenda',`attendees`='$attendees',`file_name`='$avatar_name',`file_tmp`='$avatar_path',`created_at`='$tyme',`updated_at`='$tyme' WHERE `id`='3'"; 
  break;
}

$result = mysqli_query($con,$sql);

// if ($con->query($sql) === TRUE) {
//     echo "Meeting updated successfully";
// } else {
//     echo "Error updating meeting: " . $con->error;
// }
// run SQL statement



// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
else{
    echo "Meeting updated successfully";
  require '../PHP_Mailer/PHPMailerAutoload.php';
  require '../credential.php';

  
  $mail = new PHPMailer;
  
  //$mail->SMTPDebug = 3;                               // Enable verbose debug output
  
  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'smtp.mailtrap.io';  // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = '17b8a287b2cc6a';                 // SMTP username
  $mail->Password = '3f88f93a35967e';                           // SMTP password
  $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
  $mail->Port = '2525';                                    // TCP port to connect to
  
  var_dump($attendees);
  $mail->setFrom(EMAIL, 'Mailer');
  // $mail->addAddress($attendees, $scheduler);   // Add a recipient
 
  foreach(explode(",", $attendees) as $email){    //this separates joined string into individual strings by commaand enables us to send mails to individual attendees.
    $mail->addAddress($email, $scheduler);
  }
  $mail->isHTML(true);                                  // Set email format to HTML
  
  $mail->Subject = 'Meeting Schedule';
  $mail->Body    = "hello '$scheduler'
                   you have been invited to a meeting by '$scheduler' on '$date'";
  $mail->AltBody = '';
  
  if(!$mail->send()) {
      echo 'Message could not be sent.';
      echo 'Mailer Error: ' . $mail->ErrorInfo;
  } else {
      echo 'Message has been sent';
  }
}

//Magic


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

