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

type Result struct {
	IsError bool
	Result  any
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
func (a *App) OpenFile() Result {
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
		return Result{IsError: true, Result: fmt.Sprintf("ERROR: %s", err)}
	}

	// Read the file
	bytes, err := os.ReadFile(file)
	if err != nil {
		return Result{IsError: true, Result: fmt.Sprintf("ERROR: %s", err)}
	}

	content := string(bytes)

	return Result{IsError: false, Result: File{File: file, Content: content}}
}

// NOTE: parameter file must be in full path, filename and extension included
func (a *App) SaveFile(file string, data string) Result {
	// Convert the string data to byte slice
	byteData := []byte(data)

	// Write to file if file exist
	err := os.WriteFile(file, byteData, 0644)
	if err != nil {
		if os.IsNotExist(err) {
			return Result{IsError: true, Result: "File doesn't exist"}
		}

		return Result{IsError: true, Result: fmt.Sprintf("ERROR: %s", err)}
	}

	return Result{IsError: false, Result: "File saved"}
}

func (a *App) SaveFileAs(filename string, data string) Result {
	filepath, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{DefaultFilename: filename})
	if err != nil {
		return Result{IsError: true, Result: fmt.Sprintf("ERROR: %s", err)}
	}

	file, err := os.OpenFile(filepath, os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		return Result{IsError: true, Result: fmt.Sprintf("ERROR: %s", err)}
	}
	defer file.Close()

	_, err = file.WriteString(data)
	if err != nil {
		return Result{IsError: true, Result: fmt.Sprintf("ERROR: %s", err)}
	}

	return Result{IsError: false, Result: filepath}
}

func (a *App) WarningMessage(title string, message string) Result {
	selection, err := runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Type:          runtime.WarningDialog,
		Title:         title,
		Message:       message,
		DefaultButton: "Ok",
		CancelButton:  "Cancel",
	})
	if err != nil {
		return Result{IsError: true, Result: fmt.Sprintf("ERROR: %s", err)}
	}

	return Result{IsError: false, Result: selection}
}
