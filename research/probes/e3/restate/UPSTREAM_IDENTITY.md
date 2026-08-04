# UPSTREAM_IDENTITY.md — Restate

## Server (probed)

```text
project                    Restate
official source            github.com/restatedev/restate  (docs.restate.dev)
probed release             v1.7.2   (published 2026-07-06, GitHub release)
release tag commit        6f1c0803f4fc3e3110af1e6c77b2a8882ab8ae70
server binary banner       "Restate Server 1.7.2 (6f1c080 x86_64-unknown-linux-gnu 2026-07-06)"
main HEAD (checked_at)     37d2ac73dceac70798bdde83866ccdf1a1bc69db (2026-08-04T08:47:50Z)
license                    Business Source License 1.1 (BSL-1.1)
                           Licensor: Restate Software, Inc., Restate GmbH
                           Change Date: 4 years after release
                           Change License: Apache License 2.0
                           NOTE: not OSI-approved as-is; SPDX on GitHub reports NOASSERTION/"Other"
image                      ghcr.io/restatedev/restate:1.7.2
image digest               sha256:d39111bd494dd7cf4e107c913c89e38572f454292805ad0b9a0f0485a91e4b24
maintenance status         Active (pushed_at 2026-08-04T08:47:55Z, 4,245 stars per refresh round)
checked_at                 2026-08-04T11:32+02:00 (local) / 09:32Z
```

## SDK (used by the disposable fixture)

```text
package                    @restatedev/restate-sdk
version                    1.16.2  (npm latest, published 2026-07-16)
sdk banner in deployment   "restate-sdk-typescript/1.16.2"
protocol                   negotiated min 5 / max 7 (bidi-stream) with server 1.7.2
note                       SDK versioning is ahead of the server versioning in this timeline;
                           server 1.7.2 + SDK 1.16.2 are mutually compatible (verified by discovery)
```

## Environment / dependencies

See ENVIRONMENT.md. Node v24.12.0 (host), Docker Desktop 28.3.2 (WSL2 Linux containers).
No Windows-native Restate server binary exists in the v1.7.2 release assets; the
only real installation path on this host is Docker (Linux container) — confirmed.
