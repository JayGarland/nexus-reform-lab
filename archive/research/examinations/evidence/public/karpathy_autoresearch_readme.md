Title: karpathy/autoresearch: Autonomous LLM training research loop
Author: Andrej Karpathy (2026)
Canonical Repository: https://github.com/karpathy/autoresearch
Commit SHA: 3788737df98e21a4f028fa687b1ef0bfbfa66935
Quoted Anchor: "autoresearch is an experimental framework to let AI agents autonomously run ML research. The agent modifies train.py, runs a 5-minute GPU training experiment, checks val_bpb, and keeps or resets the git state depending on performance."
Summary: Defines 3-file structure (prepare.py, train.py, program.md) for 5-minute GPU training experiment loops using val_bpb bits-per-byte loss.
