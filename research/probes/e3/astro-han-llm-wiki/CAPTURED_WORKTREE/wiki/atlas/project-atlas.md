# Project Atlas

> Sources: Project Atlas probe fixture, 2026-08-03; Project Atlas probe fixture, 2026-08-03
> Raw: [source-a](../../raw/atlas/2026-08-03-project-atlas-versioned-state.md); [source-b](../../raw/atlas/2026-08-03-atlas-database-superseded.md)
> Updated: 2026-08-03

## Overview

Project Atlas is an example system whose canonical state lives in versioned files rather than in a database or in worker memory. Worker instances carry no persistent internal memory.

## Current State Model

Project Atlas stores canonical state in versioned files. Its worker instances have no persistent internal memory.

## Superseded Database Design

Atlas previously used a database as canonical state. That design was superseded on 2026-07-01. The database may remain only as a rebuildable index.

> **Status: Outdated** (2026-07-01)
> The database-based canonical state was superseded; versioned files are now canonical. Source: [source-b](../../raw/atlas/2026-08-03-atlas-database-superseded.md)

## See Also

- [Canonical State](canonical-state.md)
