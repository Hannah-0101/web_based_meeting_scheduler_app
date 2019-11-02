<?php
$id = '';


$con = mysqli_connect("localhost","root","","meeting_schedule");
include('config.php');
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


switch ($method) {
  case 'GET':
  // $id = $_GET['user'];
  // $sql = "select * from contacts".($id?" where id=$id":''); 
  $sql = "SELECT * FROM user"; 
  break;
    case 'POST':
      // $id = $_POST["id"];
      $title = $_POST["title"];
      $rank = $_POST["rank"];
      $first_name = htmlentities($_POST["first_name"]);
      $last_name = htmlentities($_POST["last_name"]);
      $other_name = htmlentities($_POST["other_name"]);
      // $name = mysqli_real_escape_string(($_POST["name"]));

      $email = $_POST["email"];
      //encrypt password
      
      $department = $_POST["department"];
  

//adding an image file to our database
      $response = array();
      $upload_dir = 'uploads/';
      $server_url = 'http://localhost/';

if($_FILES['avatar'])
{
  //image name
    $avatar_name = $_FILES["avatar"]["name"];
    //image link
    $avatar_tmp_name = $_FILES["avatar"]["tmp_name"];
    //sizee of imaage
    $avatarsize=$_FILES["avatar"]["size"];
    //checking for errors
    $error = $_FILES["avatar"]["error"];


    // $filename=$_FILES['image']["name"];
      // $filetmp=$_FILES['image']["name"];
      // $filesize=$_FILES['image']["name"];
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


      

      function randomPassword() {
        $alphabet = "abcdefghjklmnpqrstuwxyzABCDEFGHJKLMNPQRSTUWXYZ123456789@";
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 10; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }

    $pass = randomPassword();
    $hash = md5($pass);
       $time = date("Y/m/d h:i:sa");

//inserting data from our UI to our database...
      $sql = "INSERT INTO user (title,rank,first_name,last_name,other_name, email,password, department,image_name,image_tmp,created_at,updated_at) values ('$title','$rank','$first_name','$last_name','$other_name', '$email', '$hash', '$department','$avatar_name','$avatar_path','$time','$time')"; 
break;

      // $sql = "insert into contacts (name, email, city, country, job, password, imagename, imagetmp, time_stamp) values ('$name', '$email', '$city', '$country', '$job', '$password', '$file_basename', '$final_dir', '$time')"; 
      // break;
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
else{

  require 'PHP_Mailer/PHPMailerAutoload.php';
    require 'credential.php';

    
    $mail = new PHPMailer;
    
    //$mail->SMTPDebug = 3;                               // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'mail.nabamis.com';  // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = 'support@nabamis.com';                 // SMTP username
  $mail->Password = 'd9dpermit2amis';                           // SMTP password
  $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
  $mail->Port = '25';
  $mail->From = 'support@nabamis.com';                                    // TCP port to connect to
    
    $mail->setFrom(EMAIL, 'Mailer');
    $mail->addAddress($email, $first_name);     // Add a recipient
    $mail->isHTML(true);                                  // Set email format to HTML
    
    $mail->Subject = 'Meeting Schedule';
    // $mail->Body    = 'Password '.$pass.'';
    $mail->Body    = "<div class='content'>
    <div class='container'>
    
    <div class='row'>
    <div class='col-md-12'>
    
        <div class='panel-body'>
    
            <div id='for_nab' class='clearfix'>
                <div class='pull-left'>
                   <address>
                   Tel. No: 0302 506143<br>
                   <br>
                   12 Nii Amon Kotey St,East Legon Accra<br>
                  <abbr></abbr> website: www.makeduconsult.com
                  </address>
                          
                </div>
                
               
            </div>
    <br/>
          
            <div class='row'>
                <div class='col-md-12'>
                    
                    <div class='pull-left m-t-30'>
                        <address>
                          Dear ".$title." ".$first_name.",</strong><br>
                        </address>
                    </div>
    
                </div>
            </div>
            <br/>
           
             <div class='m-h-50'></div>
            <div class='row'>
    
             <div class='col-md-12'>
                  
                    <div class='pull-left m-t-30'>
                         <address>
                            Signup was successful!
    Your password has been sent, use the credentials below to login.<br>
    please contact our support team. support@meetingScheduler.com 
                
        <br>
    
    
    
                        <hr>       
                          <strong>Email: ".$email."<br>
                        
                          <strong>Password: ".$pass."</strong><br>
    
                         <hr>
                   
                         Use this to login to your account: <a href='http://localhost:3002/react/demo/?#/login'> Login</a>
                          </address>
                       
                    </div>
                </div>
    
            </div>
            
            <br/>
    
    
            <div id='pr_footer' class='row'>
                <div class='col-md-12'>
                  
                    <div class='pull-left m-t-30'>
                         <address>
                            Signed<br>
    
                          <strong>Hannah Kwakye</strong><br>
                         DIV , Accelerator Program<br>
                        
                          <strong>Makedu Consult Ltd</strong><br>
                          </address>
                       
                    </div>
                </div>
            </div>
    
        </div>
    </div>
    
    </div>
    
    </div>
    
    </div>
    ";
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