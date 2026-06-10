<?php
// require_once('class.phpmailer.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // === RECAPTCHA VERIFICATION ===
    $secretKey = "6LcktRctAAAAAOQ5-_HLzpJEImXNW0xnZBr8kIS1";
    $responseKey = $_POST['g-recaptcha-response'];
    $userIP = $_SERVER['REMOTE_ADDR'];

    $url = "https://www.google.com/recaptcha/api/siteverify";
    $data = [
        'secret' => $secretKey,
        'response' => $responseKey,
        'remoteip' => $userIP
    ];

    // Send the request to Google
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ]
    ];
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $resultJson = json_decode($result, true);

    if ($resultJson['success']) {
        // === FORM PROCESSING + EMAIL SENDING ===

        // Sanitize input fields
        $name = htmlspecialchars($_POST['name']);
        $phone = htmlspecialchars($_POST['phone']);
        $email = htmlspecialchars($_POST['email']);
        $messageText = nl2br(htmlspecialchars($_POST['message']));

        // Email settings
        $to = "praviks.123@gmail.com";
        $subject = "New Enquiry from " . $name;
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: noreply@travelcia.in" . "\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        // $headers .= "Cc: praviks.123@gmail.com" . "\r\n";

        // HTML Email body
        $message = '<html><body>';
        $message .= '<div style="padding:50px;">Hi,<br/><br/>';
        $message .= 'We have a New Enquiry from ' . $name . '<br/><br/>';
        $message .= '<div style="font-family:Tahoma, Geneva, sans-serif; font-size:13px; color: #666; padding:10px; border-radius:8px; box-shadow:0px 0px 10px #e1e1e1; max-width:500px; border: 5px solid #efefef">
            <h3 style="margin: 0px;padding: 6px 0 4px 1px;color: #084884;text-transform: uppercase;font-weight: normal;font-size: 19px;border-bottom: 1px dashed #ddd;margin-bottom: 10px;">
                Enquiry Details Form
            </h3>
            <table width="100%" cellspacing="0" cellpadding="10" border="0">
                <tr>
                    <td width="19%" style="background: #fafafa; border-bottom: 1px solid #f3f3f3; color:#000;">First Name</td>
                    <td width="2%" style="background: #fafafa; border-bottom: 1px solid #f3f3f3;">:</td>
                    <td width="79%" style="background: #fafafa; border-bottom: 1px solid #f3f3f3;">' . $name . '</td>
                </tr>
                <tr>
                    <td style="background: #fafafa; border-bottom: 1px solid #f3f3f3; color:#000;">Email</td>
                    <td style="background: #fafafa; border-bottom: 1px solid #f3f3f3;">:</td>
                    <td style="background: #fafafa; border-bottom: 1px solid #f3f3f3;">' . $email . '</td>
                </tr>
                <tr>
                    <td style="background: #fafafa; border-bottom: 1px solid #f3f3f3; color:#000;">Phone</td>
                    <td style="background: #fafafa; border-bottom: 1px solid #f3f3f3;">:</td>
                    <td style="background: #fafafa; border-bottom: 1px solid #f3f3f3;">' . $phone . '</td>
                </tr>
                <tr>
                    <td style="background: #fafafa; border-bottom: 1px solid #f3f3f3; color:#000;">Message</td>
                    <td style="background: #fafafa; border-bottom: 1px solid #f3f3f3;">:</td>
                    <td style="background: #fafafa; border-bottom: 1px solid #f3f3f3;">' . $messageText . '</td>
                </tr>
            </table>
        </div>
        </div>';
        $message .= '</body></html>';

        // Send the email
        if(mail($to, $subject, $message, $headers)) {
            echo "<span>Your message was successfully sent. We will contact you soon.!</span>";
        } else {
            echo "<span>Mail was not sent. Please try again later.</span>";
        }

    } else {
        // reCAPTCHA failed
        echo "<span>reCAPTCHA verification failed. Please try again.</span>";
    }
}
?>
