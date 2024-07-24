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

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) ReadFile(filename string) string {
	b, err := os.ReadFile(filename)
	if err != nil {
		fmt.Printf("ERROR: %s", err)
	}

	str := string(b)

	return str
}

func (a *App) WriteFile(filename string, data string) string {
	// Convert the string data to byte slice
	byteData := []byte(data)

	// Attempt to write to the file
	err := os.WriteFile(filename, byteData, 0644)
	if err != nil {
		// Check if the error is because the file doesn't exist
		if os.IsNotExist(err) {
			return "ERROR: file doesn't exist"
		}
		// For other errors, return a generic error message
		return fmt.Sprintf("ERROR: %s", err)
	}
	return "SUCCESS: file written"
}

func CreateWriteFile(filename string, data string) string {
	file, err := os.OpenFile(filename, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0644)
	if err != nil {
		if os.IsExist(err) {
			return "ERROR: file already exist"
		}
		return fmt.Sprintf("ERROR: %s", err)
	}
	defer file.Close()

	_, err = file.WriteString(data)
	if err != nil {
		return fmt.Sprintf("ERROR: %s", err)
	}

	return "SUCCESS: file created"
}

func (a *App) SaveAsFile(filename string, data string) string {
	filepath, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{DefaultFilename: filename})
	if err != nil {
		fmt.Printf("ERROR: %s", err)
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
