# Commands — go-workflows E3 probe

All commands ran in PowerShell 7, working directory `F:\nexus-probes\coordination\go-workflows-e3\probe\`
(unless noted). Exit codes and raw output captured in RAW_OUTPUT/.

## 1. Upstream verification + clone (identity evidence)

```
git ls-remote --tags https://github.com/luno/workflow.git          # v0.5.0 present
git ls-remote https://github.com/luno/workflow.git                  # HEAD/main
Invoke-RestMethod https://api.github.com/repos/luno/workflow        # license BSD-3-Clause, active
git clone --depth 1 --branch v0.5.0 https://github.com/luno/workflow.git F:\nexus-probes\coordination\go-workflows-e3\upstream-src
git -C ...\upstream-src rev-parse HEAD                               # 2f70c64c... (v0.5.0)
```

## 2. Module installation (library install surface)

```
go mod init nexusprobe/go-workflows-e3
go get github.com/luno/workflow@v0.5.0                               # exit 0
go mod tidy                                                          # exit 0
```

## 3. Adapter contract conformance (light probe adapter vs upstream's own test suite)

```
go test ./filestore/ -run TestFileStoreAdapterContract -v           # exit 0, all sub-tests PASS
# -> RAW_OUTPUT/adaptertest-conformance.log
```

## 4. Build probe binary

```
go build -o probe.exe .                                             # exit 0
```

## 5. Phase 1 — create items, ready query, claim, attempt, persist, crash

```
& .\probe.exe phase1 F:\nexus-probes\coordination\go-workflows-e3\run-state\store.json F:\nexus-probes\coordination\go-workflows-e3\run-state\manifest.json
# exit code 137 (simulated interruption via os.Exit(137))
# -> RAW_OUTPUT/phase1.log
Copy-Item ...\store.json ...\store-after-crash.json                 # durable state at crash point
```

## 6. Phase 2 — recover with NEW process, same store, continue, output, lineage

```
& .\probe.exe phase2 F:\nexus-probes\coordination\go-workflows-e3\run-state\store.json F:\nexus-probes\coordination\go-workflows-e3\run-state\manifest.json
# exit code 0
# -> RAW_OUTPUT/phase2.log, RAW_OUTPUT/state-final.json
```

## 7. Capabilities probe — retry / auto-pause / cancel (Domain B surfaces)

```
& .\probe.exe capab F:\nexus-probes\coordination\go-workflows-e3\run-state\capab-store.json F:\nexus-probes\coordination\go-workflows-e3\run-state\capab-manifest.json
# exit code 0
# -> RAW_OUTPUT/capab.log
```

## 8. Evidence capture + cleanup

```
Copy-Item RAW_OUTPUT/* -> research/probes/e3/go-workflows/RAW_OUTPUT/
# probe.exe, module cache, and F:\nexus-probes\coordination\go-workflows-e3 removed after commit (CLEANUP.md)
```

Exit codes: adapter test 0, phase1 137 (expected crash), phase2 0, capab 0.
