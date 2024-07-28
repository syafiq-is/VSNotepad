package main

import (
	"context"
	"fmt"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

/*
	type File struct{
		File string: the full filepath with filename
		Content string: the file content
	}
*/
type File struct {
	File    string
	Content string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// returns (File | string)
func (a *App) OpenFile() any {
	file, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Open file",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Text Files (*.txt;*.md)",
				Pattern:     "*.txt;*.md",
			},
		},
	})
	if err != nil {
		return fmt.Sprintf("ERROR: %s", err)
	}

	// Read the file
	bytes, err := os.ReadFile(file)
	if err != nil {
		return fmt.Sprintf("ERROR: %s", err)
	}

	content := string(bytes)

	return File{File: file, Content: content}
}

// NOTE: parameter file must be in full path, filename and extension included
func (a *App) SaveFile(file string, data string) string {
	// Convert the string data to byte slice
	byteData := []byte(data)

	// Write to file if file exist
	err := os.WriteFile(file, byteData, 0644)
	if err != nil {
		if os.IsNotExist(err) {
			return "ERROR: file doesn't exist"
		}

		return fmt.Sprintf("ERROR: %s", err)
	}

	return "SUCCESS: file written"
}

func (a *App) SaveFileAs(filename string, data string) string {
	filepath, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{DefaultFilename: filename})
	if err != nil {
		return fmt.Sprintf("ERROR: %s", err)
	}

	file, err := os.OpenFile(filepath, os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		return fmt.Sprintf("ERROR: %s", err)
	}
	defer file.Close()

	_, err = file.WriteString(data)
	if err != nil {
		return fmt.Sprintf("ERROR: %s", err)
	}

	return "SUCCESS: file created and written"
}
