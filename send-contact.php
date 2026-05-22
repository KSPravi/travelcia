<?php
declare(strict_types=1);

header('Content-Type: application/json');

const RECAPTCHA_SECRET_KEY = 'YOUR_RECAPTCHA_SECRET_KEY';
const MAIL_TO = 'travelcia.in@gmail.com';
const MAIL_SUBJECT = 'New Travelcia Contact Enquiry';

function respond(bool $success, string $message, int $status = 200): void
{
    http_response_code($status);
    echo json_encode([
        'success' => $success,
        'message' => $message,
    ]);
    exit;
}

function field(string $key): string
{
    return trim((string)($_POST[$key] ?? ''));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request method.', 405);
}

$name = field('name');
$phone = field('phone');
$email = field('email');
$message = field('message');
$recaptchaToken = field('g-recaptcha-response');

if (strlen($name) < 2) {
    respond(false, 'Please enter your full name.', 422);
}

if (!preg_match('/^[0-9+\-\s()]{7,20}$/', $phone)) {
    respond(false, 'Please enter a valid phone number.', 422);
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.', 422);
}

if (strlen($message) < 10) {
    respond(false, 'Please enter a message with at least 10 characters.', 422);
}

if ($recaptchaToken === '') {
    respond(false, 'Please complete the reCAPTCHA verification.', 422);
}

if (RECAPTCHA_SECRET_KEY === 'YOUR_RECAPTCHA_SECRET_KEY') {
    respond(false, 'reCAPTCHA secret key is not configured.', 500);
}

$verifyResponse = file_get_contents(
    'https://www.google.com/recaptcha/api/siteverify',
    false,
    stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => http_build_query([
                'secret' => RECAPTCHA_SECRET_KEY,
                'response' => $recaptchaToken,
                'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
            ]),
            'timeout' => 10,
        ],
    ])
);

if ($verifyResponse === false) {
    respond(false, 'Unable to verify reCAPTCHA. Please try again.', 500);
}

$verifyData = json_decode($verifyResponse, true);

if (empty($verifyData['success'])) {
    respond(false, 'reCAPTCHA verification failed. Please try again.', 422);
}

$body = implode("\n", [
    'New enquiry from Travelcia website',
    '',
    'Name: ' . $name,
    'Phone: ' . $phone,
    'Email: ' . ($email !== '' ? $email : 'Not provided'),
    '',
    'Message:',
    $message,
]);

$headers = [
    'From: Travelcia Website <no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'travelcia.in') . '>',
    'Reply-To: ' . ($email !== '' ? $email : MAIL_TO),
    'Content-Type: text/plain; charset=UTF-8',
];

if (!mail(MAIL_TO, MAIL_SUBJECT, $body, implode("\r\n", $headers))) {
    respond(false, 'Unable to send your enquiry right now. Please try again later.', 500);
}

respond(true, 'Thank you. We will contact you shortly.');
