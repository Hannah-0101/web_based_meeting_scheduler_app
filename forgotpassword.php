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

        $email = $_GET["email"];

        $sql = "SELECT * FROM `user` WHERE `email` = '$email' ";
        $result = mysqli_query($con,$sql);
        
        $count_check_admin = mysqli_num_rows($result); 
        $rows = array();
        if($count_check_admin == 1){
        
        while($row = mysqli_fetch_assoc($result)){
        $namefrom = $row ['first_name'];
        $title = $row ['title'];
        $rows[] = $row;
        }
        echo json_encode($rows);

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
   
        $sql_one = "UPDATE `user` SET `password` = '$hash' WHERE `email` = '$email' ";
        $result_one = mysqli_query($con,$sql_one);

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
            $mail->addAddress($email);     // Add a recipient
            $mail->isHTML(true);                                  // Set email format to HTML
            
            $mail->Subject = 'Meeting Schedule';
            // $mail->Body    = 'Password '.$pass.'';
            $mail->Body    = 
            "<div class='content'>
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
                                  Dear ".$title." ".$namefrom." ,</strong><br>
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
                                    Password reset request Successful!
            Please use the credentials below to login.<br>
            If you did not request this password reset, please contact our support team. support@makedu.com 
                        
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
            
                                  <strong>Team Lead</strong><br>
                                  Engineering Team,<br>
                                
                                  <strong>Makedu Consult</strong><br>
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

     }


  

