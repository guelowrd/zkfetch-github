# zkFetcher for GitHub commits

## Description
A Node.js application that fetches / generates a proof for commits information from a private GitHub repository using zkFetch.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure you have Node.js 18.0.0 or later installed.

## Usage

1. Set up your GitHub personal access token with the necessary permissions to access the private repository (create your .env file from .env.example).)

2. Run the application:
   ```bash
   npm start
   ```

3. The application will fetch and display commit information from the specified private repository.

## Configuration

- Update the configuration file to include your GitHub repository details and access token.

## License
This project is licensed under the MIT License.