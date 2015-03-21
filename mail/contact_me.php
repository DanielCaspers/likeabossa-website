<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
	
// Create the email and send the message
$to = 'Likeabossa@gmail.com';
$email_subject = "LikeABossa Contact Form";
$email_body = "$name wants to talk to you about gigs and stuff.\n\nEmail: $email_address\nPhone: $phone\n\nMessage:\n$message";
// This is the email address the message will be from. We recommend using noreply@yourdomain.com.
$headers = "From: $name <$email_address>\n"; 
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>