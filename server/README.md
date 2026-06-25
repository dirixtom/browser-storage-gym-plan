# Kilo gym plan — sync server

A tiny backend that lets the gym plan app sync your custom weights across devices.

- **Logged out** → the app works exactly as before, using browser storage only. Nothing leaves your device.
- **Logged in** (GitHub OAuth, **only your account**) → the app reconciles browser storage with Postgres using per-item timestamps (newer wins).

It serves the app **and** the API from one HTTPS origin, so there is no CORS and the
login cookie works cleanly. Postgres stays bound to `localhost` and is never exposed to
the internet.

---

## What you need

- A Mac (your iMac), with admin access.
- [Homebrew](https://brew.sh) or [Postgres.app](https://postgresapp.com).
- Node.js ≥ 20 (`brew install node`).
- A domain you can manage in Cloudflare (free plan is fine) for `gym.<your-domain>`.

---

## 1. Postgres

Install and start Postgres (Homebrew shown):

```bash
brew install postgresql@16
brew services start postgresql@16   # auto-starts on login/reboot
```

Create the least-privilege role and database (one-time, as your Mac user, which is a
Postgres superuser by default with Homebrew):

```bash
# Recommended: passwordless local access via peer auth over the Unix socket.
createuser gymapp
createdb -O gymapp gymapp
```

> Prefer a TCP password instead? `createuser -P gymapp` (prompts for a password) and use
> the `postgres://gymapp:...@localhost:5432/gymapp` form of `DATABASE_URL`.

Keep Postgres local-only (it is by default): `listen_addresses = 'localhost'` and never
forward port 5432. Verify:

```bash
psql -U gymapp -d gymapp -c '\conninfo'
```

## 2. Configure

```bash
cd server
cp .env.example .env
chmod 600 .env          # owner-read-only
$EDITOR .env            # fill in the values (see comments in the file)
npm install
```

Apply the schema:

```bash
psql "postgres:///gymapp" -f schema.sql
# or: npm run init-db
```

## 3. GitHub OAuth app

github.com → **Settings → Developer settings → OAuth Apps → New OAuth App**:

- **Homepage URL:** `https://gym.<your-domain>/`
- **Authorization callback URL:** `https://gym.<your-domain>/auth/github/callback`

Copy the **Client ID** and a generated **Client secret** into `.env`. Put your own
**numeric** GitHub id in `ALLOWED_GITHUB_ID` (find it with
`curl https://api.github.com/users/<your-login>`).

## 4. Run it

```bash
npm start            # node --env-file=.env server.js  → listens on 127.0.0.1:8787
```

Local smoke test:

```bash
curl -s http://127.0.0.1:8787/api/me        # {"loggedIn":false}
open http://127.0.0.1:8787/                  # the app loads
```

## 5. Expose it securely with Cloudflare Tunnel

No router ports, home IP hidden, automatic HTTPS at Cloudflare's edge.

```bash
brew install cloudflared
cloudflared tunnel login                     # authorize your domain
cloudflared tunnel create kilo
# Route the hostname to the local app:
cloudflared tunnel route dns kilo gym.<your-domain>
```

Create `~/.cloudflared/config.yml`:

```yaml
tunnel: kilo
credentials-file: /Users/<you>/.cloudflared/<tunnel-id>.json
ingress:
  - hostname: gym.<your-domain>
    service: http://127.0.0.1:8787
  - service: http_status:404
```

Install both as background services so they survive reboots:

```bash
sudo cloudflared service install              # runs the tunnel on boot
```

For the Node server, create `~/Library/LaunchAgents/com.kilo.gymserver.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.kilo.gymserver</string>
  <key>ProgramArguments</key>
  <array>
    <string>/opt/homebrew/bin/node</string>
    <string>--env-file=.env</string>
    <string>server.js</string>
  </array>
  <key>WorkingDirectory</key><string>/Users/<you>/path/to/browser-storage-gym-plan/server</string>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>/tmp/kilo-server.log</string>
  <key>StandardErrorPath</key><string>/tmp/kilo-server.err</string>
</dict>
</plist>
```

```bash
launchctl load ~/Library/LaunchAgents/com.kilo.gymserver.plist
```

Then visit `https://gym.<your-domain>/` and click **Sign in**.

---

## Security notes

- The browser never receives the DB credentials, the OAuth client secret, or your GitHub
  password. The page talks only to `/api/*` over HTTPS.
- The session cookie is `HttpOnly; Secure; SameSite=Lax` and signed; sessions live in the
  DB and can be revoked (logout deletes the row).
- Only `ALLOWED_GITHUB_ID` can log in; every other account gets `403` and nothing is stored.
- Postgres is `localhost`-only; with peer auth there is no DB password to leak.
- Keep `.env` at `chmod 600` and never commit it (it is gitignored).
- If `.env` ever leaks: rotate the GitHub client secret and `SESSION_SECRET` (and the DB
  password if you used one).
