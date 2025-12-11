# Vessel Journal 📖

**Vessel** is a minimalist, cross-platform digital journal application designed to help you track your thoughts, memories, and moods in a secure and elegant way. Built with modern web technologies and wrapped for Desktop and Mobile.

![License](https://img.shields.io/badge/license-GPLv3-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20Windows%20%7C%20Android-lightgrey)

## 🌟 Features

- **Calendar View:** Visualize your writing habits with a GitHub-style activity calendar.
- **Mood Tracking:** Analyze your emotional journey with detailed charts.
- **Privacy First:** Secure your journal with a built-in PIN lock system.
- **Media Support:** "On This Day" flashbacks to relive past memories.
- **Cross-Platform:** Seamless experience on Desktop (Linux/Windows) and Mobile.
- **Data Ownership:** Full JSON export/import capability. You own your data.

## 🚀 Installation

### For Users (Download)
Go to the [Releases](https://github.com/aliden1z/vessel-journal/releases) page to download the latest version for your operating system (AppImage for Linux, Setup for Windows, APK for Android).

### For Developers (Build from Source)

Prerequisites: Node.js and npm.

```bash
# 1. Clone the repository
git clone https://github.com/aliden1z/vessel-journal.git
cd vessel-journal

# 2. Install dependencies
npm install

# 3. Run in development mode
npm start
```

## 📦 Building

To create executables for your specific platform:

```bash
# Build for Linux (.AppImage)
npm run dist

# Build for Windows (.exe)
npm run dist -- --win
```

## 🛠️ Tech Stack

- **Core:** HTML5, CSS3 (CSS Variables), Vanilla JavaScript
- **Desktop Wrapper:** Electron JS
- **Mobile Wrapper:** Capacitor JS

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPLv3)**.

You are free to use, modify, and distribute this software, provided that:
1. You include the original copyright notice and attribution to **aliden1z**.
2. Any derivative work (modifications) must also be open-source under the same GPLv3 license.

See the [LICENSE](LICENSE) file for details.

---
Made with ❤️ by [aliden1z](https://github.com/aliden1z)
