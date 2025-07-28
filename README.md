# Twitch Dashboard Electron App

An Electron app that loads [Twitch Dashboard](https://dashboard.twitch.tv/) and injects a custom Exit button into the sidebar for quick app closing.

## Features

- Loads Twitch Dashboard in a desktop app window
- Injects a custom-styled Exit button inside Twitch’s sidebar
- Exit button closes the app instantly
- Simple, lightweight, and easy to extend

## Installation

1. Clone this repo or download the source.

```bash
git clone https://github.com/yourusername/twitch-dashboard-app.git
cd twitch-dashboard-app
```
Install dependencies:
```bash
npm install
```
Usage

Start the app with:
```
npm start
```
The app will open Twitch Dashboard. The Exit button will appear on the sidebar — click it to close the app.


## Development

The injection script runs in the main process after the page loads.

The UI elements are created dynamically with JavaScript for reliable React compatibility.

Electron context isolation is disabled to allow easy DOM manipulation and injection.

## Customization

Change the injected UI style or behavior in main.js, inside the injection script string.

Add more buttons or controls by extending the injected elements.

## Troubleshooting

Make sure you run with a recent version of Node and Electron.

If the Exit button doesn’t appear, Twitch might have changed their sidebar selectors — update the selector in main.js.

Keep contextIsolation disabled (false) in main.js for injection to work.

## License

MIT License — feel free to use and modify!

---
Made with ❤️ by Zachary
