-- Kilo gym plan — database schema.
--
-- Run this AS THE gymapp ROLE against the gymapp database, e.g.:
--   psql "postgres:///gymapp" -f schema.sql
-- (See README.md for the one-time role/database bootstrap, which needs a superuser.)
--
-- Safe to run repeatedly: everything uses IF NOT EXISTS.

-- The single allowed account (single-user app, but modelled relationally so
-- kv_item rows hang off a stable internal id rather than the GitHub id).
CREATE TABLE IF NOT EXISTS app_user (
  id           BIGSERIAL PRIMARY KEY,
  github_id    BIGINT UNIQUE NOT NULL,   -- numeric GitHub id (immutable), NOT the login name
  github_login TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- One row per (user, logical item). Heterogeneous key/value with a timestamp clock.
-- item_key mirrors the browser's localStorage key exactly, e.g.
--   'kilo_weight_goblet_squat_phase2'  or  'kilo_last_phase'
-- value is NULL when deleted = true (tombstone), so a cleared override is not
-- resurrected by an older non-null value during newer-wins merges.
CREATE TABLE IF NOT EXISTS kv_item (
  user_id    BIGINT NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  item_key   TEXT   NOT NULL,
  value      TEXT,
  deleted    BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, item_key)
);

CREATE INDEX IF NOT EXISTS kv_item_user_updated ON kv_item (user_id, updated_at);

-- Server-side sessions so login survives server restarts and can be revoked.
-- The cookie carries only the random session id (signed); everything else lives here.
CREATE TABLE IF NOT EXISTS session (
  id         TEXT PRIMARY KEY,            -- random, unguessable
  user_id    BIGINT NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS session_expires ON session (expires_at);
