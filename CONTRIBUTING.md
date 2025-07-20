# Contributing to React Gift Spinner

Thank you for your interest in contributing to React Gift Spinner! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and considerate of others when contributing to this project.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue using the bug report template. Include as much information as possible:

- A clear description of the bug
- Steps to reproduce it
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (browser, OS, React version, etc.)

### Suggesting Features

Feature requests are welcome! Please use the feature request template when opening an issue.

### Pull Requests

1. Fork the repository
2. Create a new branch from `master`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Run tests to ensure nothing is broken:
   ```bash
   npm test
   ```
5. Make sure your code passes linting:
   ```bash
   npm run lint
   ```
6. Commit your changes:
   ```bash
   git commit -m "Add your commit message"
   ```
7. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
8. Open a pull request on GitHub

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/react-gift-spinner.git
   cd react-gift-spinner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Building the Package

```bash
npm run build
```

This will generate the distribution files in the `dist` directory.

## Testing

```bash
npm test
```

## Style Guide

- Use TypeScript for all new code
- Format your code using the project's prettier configuration
- Write descriptive commit messages

Thank you for contributing! 