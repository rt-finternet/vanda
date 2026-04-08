import mysql from "mysql2/promise";

// Use the env var directly - tsx will load it
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) { console.error("No DATABASE_URL"); process.exit(1); }

const conn = await mysql.createConnection(dbUrl);

const testEmail = "test@ipe-testing.com";
const testToken = "ipe-test-session-token-2026";

await conn.execute(
  "INSERT INTO allowed_emails (email, name, organization, defaultPin, isActive, accessCount) VALUES (?, ?, ?, ?, true, 0) ON DUPLICATE KEY UPDATE isActive = true",
  [testEmail, "IPE Tester", "Test Org", "123456"]
);
console.log("Email added");

await conn.execute(
  "INSERT INTO access_sessions (email, sessionToken, expiresAt) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 DAY)) ON DUPLICATE KEY UPDATE expiresAt = DATE_ADD(NOW(), INTERVAL 30 DAY)",
  [testEmail, testToken]
);
console.log("Session created:", testToken);

await conn.end();
