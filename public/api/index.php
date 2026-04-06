<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function respond(int $code, $data) : void {
  http_response_code($code);
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function readJson() : array {
  $raw = file_get_contents('php://input');
  if ($raw === false || $raw === '') return [];
  $data = json_decode($raw, true);
  if (!is_array($data)) respond(400, ['error' => 'invalid_json']);
  return $data;
}

function cfg() : array {
  $path = __DIR__ . '/config.php';
  if (!file_exists($path)) {
    respond(500, ['error' => 'missing_config', 'hint' => 'Copy config.example.php to config.php']);
  }
  $c = require $path;
  if (!is_array($c)) respond(500, ['error' => 'bad_config']);
  return $c;
}

function db() : PDO {
  static $pdo = null;
  if ($pdo) return $pdo;
  $c = cfg();
  $pdo = new PDO($c['db']['dsn'], $c['db']['user'], $c['db']['pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);
  return $pdo;
}

function startSession() : void {
  $c = cfg();
  if (session_status() === PHP_SESSION_ACTIVE) return;
  session_name('exma_admin');
  session_set_cookie_params([
    'httponly' => true,
    'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off'),
    'samesite' => 'Lax',
    'path' => '/',
  ]);
  // simple hardening
  ini_set('session.use_strict_mode', '1');
  ini_set('session.cookie_httponly', '1');
  ini_set('session.cookie_samesite', 'Lax');
  session_start();
}

function requireAdmin() : void {
  startSession();
  if (empty($_SESSION['admin']) || $_SESSION['admin'] !== true) {
    respond(401, ['error' => 'unauthorized']);
  }
}

function offerFromRow(array $r) : array {
  $tags = json_decode($r['tags_json'], true) ?: [];
  $payouts = json_decode($r['payouts_json'], true) ?: [];
  $i18n = json_decode($r['i18n_json'], true) ?: [];
  $reviews = json_decode($r['reviews_json'], true) ?: [];
  return [
    'id' => $r['id'],
    'name' => $r['name'],
    'category' => $r['category'],
    'tags' => $tags,
    'payouts' => $payouts,
    'minWithdrawUsd' => $r['min_withdraw_usd'] !== null ? (float)$r['min_withdraw_usd'] : null,
    'verified' => (bool)$r['verified'],
    'ratingAvg' => $r['rating_avg'] !== null ? (float)$r['rating_avg'] : null,
    'ratingCount' => $r['rating_count'] !== null ? (int)$r['rating_count'] : null,
    'ctaUrl' => $r['cta_url'],
    'accent' => $r['accent'],
    'tagline' => $i18n['tagline'] ?? ['ru' => '', 'en' => ''],
    'cadence' => $i18n['cadence'] ?? null,
    'highlights' => $i18n['highlights'] ?? [],
    'ctaLabel' => $i18n['ctaLabel'] ?? ['ru' => 'Перейти', 'en' => 'Open'],
    'reviews' => $reviews,
  ];
}

// Routing
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$base = '/api';
if (strpos($uri, $base) === 0) $uri = substr($uri, strlen($base));
$uri = rtrim($uri, '/');
if ($uri === '') $uri = '/';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
  if ($uri === '/health') {
    respond(200, ['ok' => true]);
  }

  if ($uri === '/offers' && $method === 'GET') {
    $stmt = db()->query('SELECT * FROM offers ORDER BY updated_at DESC');
    $out = [];
    foreach ($stmt->fetchAll() as $row) $out[] = offerFromRow($row);
    respond(200, $out);
  }

  if (preg_match('#^/offers/([a-zA-Z0-9_\\-]+)$#', $uri, $m) && $method === 'GET') {
    $id = $m[1];
    $stmt = db()->prepare('SELECT * FROM offers WHERE id = ? LIMIT 1');
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) respond(404, ['error' => 'not_found']);
    respond(200, offerFromRow($row));
  }

  if ($uri === '/admin/login' && $method === 'POST') {
    startSession();
    $c = cfg();
    $body = readJson();
    $pwd = (string)($body['password'] ?? '');
    $ok = !empty($c['admin_password_hash']) && password_verify($pwd, $c['admin_password_hash']);
    if (!$ok) respond(401, ['error' => 'unauthorized']);
    $_SESSION['admin'] = true;
    respond(200, ['ok' => true]);
  }

  if ($uri === '/admin/logout' && $method === 'POST') {
    startSession();
    $_SESSION = [];
    session_destroy();
    respond(200, ['ok' => true]);
  }

  if ($uri === '/admin/me' && $method === 'GET') {
    startSession();
    respond(200, ['authed' => (!empty($_SESSION['admin']) && $_SESSION['admin'] === true)]);
  }

  if ($uri === '/admin/offers' && $method === 'POST') {
    requireAdmin();
    $o = readJson();
    $id = (string)($o['id'] ?? '');
    if ($id === '') respond(400, ['error' => 'missing_id']);

    $i18n = [
      'tagline' => $o['tagline'] ?? ['ru' => '', 'en' => ''],
      'cadence' => $o['cadence'] ?? null,
      'highlights' => $o['highlights'] ?? [],
      'ctaLabel' => $o['ctaLabel'] ?? ['ru' => 'Перейти', 'en' => 'Open'],
    ];

    $stmt = db()->prepare('REPLACE INTO offers (id, name, category, accent, tags_json, payouts_json, min_withdraw_usd, verified, rating_avg, rating_count, cta_url, i18n_json, reviews_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([
      $id,
      (string)($o['name'] ?? ''),
      (string)($o['category'] ?? ''),
      isset($o['accent']) ? (string)$o['accent'] : null,
      json_encode($o['tags'] ?? [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
      json_encode($o['payouts'] ?? [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
      isset($o['minWithdrawUsd']) ? $o['minWithdrawUsd'] : null,
      !empty($o['verified']) ? 1 : 0,
      isset($o['ratingAvg']) ? $o['ratingAvg'] : null,
      isset($o['ratingCount']) ? $o['ratingCount'] : null,
      (string)($o['ctaUrl'] ?? ''),
      json_encode($i18n, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
      json_encode($o['reviews'] ?? [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    ]);
    respond(200, ['ok' => true]);
  }

  if (preg_match('#^/admin/offers/([a-zA-Z0-9_\\-]+)$#', $uri, $m) && $method === 'DELETE') {
    requireAdmin();
    $id = $m[1];
    $stmt = db()->prepare('DELETE FROM offers WHERE id = ?');
    $stmt->execute([$id]);
    respond(200, ['ok' => true]);
  }

  respond(404, ['error' => 'not_found', 'path' => $uri]);
} catch (Throwable $e) {
  respond(500, ['error' => 'server_error', 'message' => $e->getMessage()]);
}

