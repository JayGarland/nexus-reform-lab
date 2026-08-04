package filestore_test

import (
	"fmt"
	"path/filepath"
	"testing"

	"nexusprobe/go-workflows-e3/filestore"

	"github.com/luno/workflow"
	"github.com/luno/workflow/adapters/adaptertest"
)

// TestFileStoreAdapterContract runs the library's own RecordStore contract test
// (adaptertest.RunRecordStoreTest) against a fresh file-backed store per invocation.
// Passing this proves the probe adapter implements the native RecordStore interface
// according to the upstream's own conformance suite.
func TestFileStoreAdapterContract(t *testing.T) {
	dir := t.TempDir()
	counter := 0
	adaptertest.RunRecordStoreTest(t, func() workflow.RecordStore {
		counter++
		path := filepath.Join(dir, fmt.Sprintf("store-%d.json", counter))
		s, err := filestore.New(path)
		if err != nil {
			t.Fatalf("filestore.New: %v", err)
		}
		return s
	})
}
