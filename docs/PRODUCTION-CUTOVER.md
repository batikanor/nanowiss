# Production publishing decision

The owner chose on 28 October 2026 to retain GitHub Pages production and Hetzner
staging. The earlier proposed production DNS migration is superseded. The domain
owner needs no DNS action for this release. See [DEPLOYMENT.md](DEPLOYMENT.md)
for current commands, actual hosting differences and rollback.

The prior private Hetzner target contains the exact old production recovery only;
its edge fragment remains inactive. Retain it as recovery material while the
GitHub Pages production release and final checks complete. Historical preparation
evidence is retained in [the old cutover note](history/unactivated-hetzner-production-2026-10-28.md).
