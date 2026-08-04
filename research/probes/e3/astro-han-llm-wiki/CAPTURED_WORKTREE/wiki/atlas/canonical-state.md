# Canonical State

> Sources: Project Atlas probe fixture, 2026-08-03
> Raw: [source-a](../../raw/atlas/2026-08-03-project-atlas-versioned-state.md); [source-b](../../raw/atlas/2026-08-03-atlas-database-superseded.md)
> Updated: 2026-08-03

## Overview

Canonical state is the authoritative system state that survives worker restarts. Project Atlas demonstrates a file-first canonical state model with a rebuildable index as an optional derived artifact.

## File-First Canonical State

Project Atlas stores canonical state in versioned files, and worker instances have no persistent internal memory. The versioned-file layer is the source of truth.

## Index Is Derived

The database, if kept, is only a rebuildable index, not canonical state. It was superseded as the canonical store on 2026-07-01.

## See Also

- [Project Atlas](project-atlas.md)
