<!-- backend for contact us page -->

<?php
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$message = $_POST['$message'];

// source email
$email_from = 'fevroniavansickle@veytel.com';

$email_subject = "New Website Contact Form Submission";

$email_body = "User name: $name.\n". "User Email: $visitor_email.\n". "User Message: $message.\n";

// destination email
$to = "info@veytel.com";

$headers = "From: $email_from \r\n";

$headers .= "Reply-To: $visitor_email \r\n";

mail($to,$email_subject,$email_body,$headers);

header("Location: contact.html")

?>