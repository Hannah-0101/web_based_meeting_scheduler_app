
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
$title = "";
$rank = "";
$name = "";
$email = "";

$meeting_id = $_POST["meeting_id"];
$title = $_POST["title"];
$rank = $_POST["rank"];
$name= htmlentities($_POST["name"]);
$email = htmlentities($_POST["email"]);
$status = htmlentities($_POST["status"]);     
$time = date("Y/m/d h:i:sa");

//inserting data from our UI to our database...
      $sql = "INSERT INTO attendees (meeting_id,title,rank,name,email,status,action_time) values ('$meeting_id','$title','$rank','$name', '$email','$status','$time')"; 


      // $sql = "insert into contacts (name, email, city, country, job, password, imagename, imagetmp, time_stamp) values ('$name', '$email', '$city', '$country', '$job', '$password', '$file_basename', '$final_dir', '$time')"; 
      // break;


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
    $mail->addAddress($email, $name);     // Add a recipient
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
                          Dear ".$title." ".$name.",</strong><br>
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
                           Your response has been saved.
                           Thank you for your time .
                          <br/> 
                        please contact our support team. 
                        support@meetingScheduler.com 
                
        <br>
    
    
    
                
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
    // for ($i = 0; $i < mysqli_num_rows($result); $i++) {
    //   echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
    // }
    if (!$id) echo ']';
  } elseif ($method == 'POST') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }
  
  
  $con->close();

// if ($method == 'GET') {
//     if (!$id) echo '[';
//     for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
//       echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
//     }
//     if (!$id) echo ']';
//   } elseif ($method == 'POST') {
//     echo json_encode($result);
//   } else {
//     echo mysqli_affected_rows($con);
//   }

// $con->close();