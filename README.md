# Wei Resolver Chrome Extension

## Overview

Wei Resolver is a Chrome extension designed to append zeros to input values on various blockchain explorers. This extension simplifies the process of adding zeros to input values, making it easier for users to handle large numbers.

## Features

- Automatically adds a button to input fields on supported sites.
- Allows users to preset a configurable number of zeros to input values.
- Supports multiple blockchain explorers.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/wei-resolver.git
   cd wei-resolver
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Build the project:
   ```sh
   npm run build:prod
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to 

chrome://extensions/

.
   - Enable "Developer mode" using the toggle in the top right corner.
   - Click "Load unpacked" and select the `dist` directory from the project.

## Usage

1. Navigate to a supported blockchain explorer (e.g., Etherscan).
2. The extension will intelligently add a button next to input fields that requires large values.
3. Click the button to append zeros to the value.

## Supported Sites

The extension supports the following blockchain explorers:
- Etherscan
- Sepolia Etherscan
- Holesky Etherscan
- Goerli Etherscan
- Optimistic Etherscan
- Sepolia Optimism Etherscan
- Basescan
- Sepolia Basescan
- Polygonscan
- Scrollscan
- Sepolia Scrollscan
- Sepolia Lineascan
- Arbiscan
- Sepolia Arbiscan
- Bscscan
- Testnet Bscscan
- Snowtrace
- Testnet Snowtrace
- Blastscan
- Sepolia Blastscan

## Development

### Scripts

- `npm run build`: Build the project in development mode.
- `npm run build:prod`: Build the project in production mode.

### Continuous Integration

The project uses GitHub Actions for continuous integration. The workflow is defined in `build-deploy.yml`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Contact

For any questions or support, please contact [@thecoderabbi](https://x.com/thecoderabbi).
