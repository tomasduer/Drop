# Architecture rules
- Use Cloud auth (email/password + Google) for real accounts; guest mode keeps a local demo profile in the root context and never writes to Cloud.
- Change points only by inserting point_movements rows; a database trigger validates and applies them to profiles, and clients cannot update point columns directly, so balances stay auditable.
- Validate DROP-owned mission attempts through authenticated server functions and private atomic database RPCs; only configured supported validators may award points, while streaming/QR/AR and unconnected experiences remain labeled demonstrations.
- Keep general balances, campaign participation and historical artist totals separate; reward redemption affects only general points, and campaign rankings derive only from recorded participation.
- Configure campaigns, missions, validator rules and rewards in database records; new content using supported kinds requires no client-code changes, while secret solutions remain private.
- Preserve community and past-drop examples as labeled demonstrations; reward catalogs stay empty until authentic benefits are supplied.
- Album reviews and manually added albums still live in the root context per session until they get their own tables.
- Use / for the introduction, /auth for access and password recovery requests, /reset-password for setting a new password, and /mi-drop for the single user profile (also opened from the avatar inside a drop) with its compact drop selector.
- Use /invitado for temporary guest setup; keep guest photos and activity in React memory only, and use separate public practice questions rather than exposing private mission solutions.
