<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

// Function to log messages to a custom file
function log_message($message) {
    error_log($message, 3, '/var/www/html/logs/error.log'); // Update the path if necessary
}

// Buffer output to avoid sending any output before JSON response
ob_start();

$response = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Check that data was sent
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        $response['error'] = 'Please complete the form and try again.';
        log_message("400 Bad Request: Incomplete form submission.\n");
        echo json_encode($response);
        ob_end_flush(); // Flush the buffer and end output buffering
        exit;
    }

    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->SMTPDebug = 0; // Disable debug output to avoid corrupting JSON response
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'portfoliomailer33@gmail.com'; // Your Gmail address
        $mail->Password   = 'wbio zope ktwx eqem'; // Your App Password or Gmail password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('portfoliomailer33@gmail.com', 'Your Name'); // Replace 'Your Name' with the sender's name
        $mail->addAddress('asbotens@gmail.com'); // Add a recipient

        // Content
        $mail->isHTML(false);
        $mail->Subject = "New contact from $name";
        $mail->Body    = "Name: $name\nEmail: $email\n\nMessage:\n$message\n";

        $mail->send();
        http_response_code(200);
        $response['message'] = 'Thank You! Your message has been sent.';
        log_message("200 OK: Email sent successfully.\n");
    } catch (Exception $e) {
        http_response_code(500);
        $response['error'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        log_message("500 Internal Server Error: {$mail->ErrorInfo}\n");
    }
} else {
    http_response_code(403);
    $response['error'] = 'There was a problem with your submission, please try again.';
    log_message("403 Forbidden: Invalid request method.\n");
}

// Output the JSON response
echo json_encode($response);
ob_end_flush(); // Flush the buffer and end output buffering
?>
