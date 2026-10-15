<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
$email = is_array($body) ? trim((string) ($body['email'] ?? '')) : '';

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address.']);
    exit;
}

try {
    $pdo = get_db();
    $stmt = $pdo->prepare('INSERT INTO subscribers (email, created_at) VALUES (:email, :created_at)');
    $stmt->execute([
        ':email' => $email,
        ':created_at' => gmdate('Y-m-d H:i:s'),
    ]);

    http_response_code(201);
    echo json_encode(['status' => 'success', 'message' => "You're on the list! We'll notify you."]);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') {
        http_response_code(409);
        echo json_encode(['status' => 'error', 'message' => 'This email is already on the list.']);
        exit;
    }

    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Something went wrong. Please try again.']);
}
