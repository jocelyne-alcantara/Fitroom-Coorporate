<?php
if($_POST)
{
	$to_email   	= "example@gmail.com";
	$subject        = "Fitroom_Contact";
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
		
		$output = json_encode(array(
			'type'=>'error', 
			'text' => 'Sorry Request must be Ajax POST'
		));
		die($output);
    } 
	
	$user_name		= filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
	$user_email		= filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
	$user_website	= filter_var($_POST["user_website"], FILTER_SANITIZE_EMAIL);
	$message		= filter_var($_POST["msg"], FILTER_SANITIZE_STRING);

	if(strlen($user_name)<4){
		$output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty!'));
		die($output);
	}
	if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){
		$output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email!'));
		die($output);
	}
	if(strlen($message)<3){
		$output = json_encode(array('type'=>'error', 'text' => 'Too short message! Please enter something.'));
		die($output);
	}
	
	$message_body = "\r\nName : ".$user_name."\r\nEmail : ".$user_email."\r\nWebsite : ".$user_website."\r\nMessage : ".$message;
	
	$headers = 'From: '.$user_name.'' . "\r\n" .
	'Reply-To: '.$user_email.'' . "\r\n" .
	'X-Mailer: PHP/' . phpversion();
	
	$send_mail = mail($to_email, $subject, $message_body, $headers);
	
	if(!$send_mail)
	{
		$output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
		die($output);
	}else{
		$output = json_encode(array('type'=>'message', 'text' => 'Hi '.$user_name .' Thank you for your email. We will contact you shortly!'));
		die($output);
	}
}
?>