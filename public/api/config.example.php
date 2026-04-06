<?php
// Copy to config.php and fill values (Beget: MySQL settings).
return [
  'db' => [
    'dsn' => 'mysql:host=localhost;dbname=YOUR_DB;charset=utf8mb4',
    'user' => 'YOUR_USER',
    'pass' => 'YOUR_PASSWORD',
  ],
  // Change this to a long random string.
  'session_secret' => 'CHANGE_ME_TO_RANDOM',
  // Admin password (store hash, not plaintext). Generate with: php -r "echo password_hash('your-pass', PASSWORD_DEFAULT), PHP_EOL;"
  'admin_password_hash' => 'CHANGE_ME',
];

