<?php
//Constant Declarations
$EMPTY_ARGS_MESSAGE = "Empty arguments were passed into required fields. Please review contact_me.php!";
$REQUIRED_FIELD_MESSAGE = "One or more required fields was found to be empty. Please review contact_me.php!";
$DEFAULT_TO_ADDRESS = "Likeabossa@gmail.com";
$DEFAULT_PHONE_NUMBER = "";

// Assert that required form fields are non-empty
if( empty($_POST['name']) || empty($_POST['message']) ){
   echo $REQUIRED_FIELD_MESSAGE;
   return false;
}

//Required Fields   
$name = isset($_POST['name']) ? $_POST['name'] : $EMPTY_ARGS_MESSAGE;
$message = isset($_POST['message']) ? $_POST['message'] : $EMPTY_ARGS_MESSAGE;

//Optional Fields
$from_email_address = isset($_POST['email']) ? $_POST['email'] : $DEFAULT_TO_ADDRESS;
$phone = isset($_POST['phone']) ? $_POST['phone'] : $DEFAULT_PHONE_NUMBER;
    
// Create the email and send the message
$email_subject = "LikeABossa Contact Form";
$email_body = "$name wants to talk to you about gigs and stuff.\n\nEmail: $from_email_address\nPhone: $phone\n\nMessage:\n$message";

$headers = "From: $name <$from_email_address>\n"; 
$headers .= "Reply-To: $from_email_address";    
mail($to,$email_subject,$email_body,$headers);
return true;            
?>
