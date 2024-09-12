# Paystream

Welcome to **Paystream**! Paystream is a server application designed to enable merchants in Nigeria to receive both cryptocurrency and local currency payments directly within their e-commerce or other types of apps. Created by [vulpescode](https://github.com/vulpes231), Paystream simplifies payment integration, offering a seamless experience for merchants.

## Features

- **Cryptocurrency Payments**: Accept a variety of popular cryptocurrencies.
- **Local Currency Payments**: Handle transactions in Nigerian Naira (NGN).
- **Easy Integration**: Quickly connect your e-commerce or other types of applications.
- **Efficient Setup**: Simple configuration for merchants to get started.

## Getting Started

To get started with Paystream Server, follow the instructions below:

### Prerequisites

Ensure you have [Bun](https://bun.sh) installed. You can download it from the [official website](https://bun.sh).

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/vulpes231/paystream-server.git
cd paystream-server
bun install
```

### Running the Server

To start the server, use the following command:

```bash
bun run index.js
```

The server will start and listen for incoming payment requests.

## Configuration

You may need to configure the server to match your specific needs. Configuration options are located in the `config` directory. Refer to the `config/README.md` for details on how to set up your configuration.

## Usage

Once the server is running, you can integrate it with your application by following the API documentation provided in the `docs` directory. This will guide you through connecting your app and making payment requests.

## Contributing

We welcome contributions to the Paystream project! To contribute, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top-right of this page.
2. **Clone Your Fork**: Clone your forked repository to your local machine.
   ```bash
   git clone https://github.com/YOUR_USERNAME/paystream-server.git
   ```
3. **Create a Branch**: Create a new branch for your feature or bugfix.
   ```bash
   git checkout -b my-feature-branch
   ```
4. **Make Your Changes**: Implement your feature or fix.
5. **Commit Your Changes**: Commit your changes with a descriptive message.
   ```bash
   git add .
   git commit -m "Add my new feature"
   ```
6. **Push to Your Fork**: Push your changes to your forked repository.
   ```bash
   git push origin my-feature-branch
   ```
7. **Create a Pull Request**: Open a pull request from your forked repository to the original repository.

For more detailed guidelines, check out `CONTRIBUTING.md`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any questions or support, please reach out to [vulpescode](https://github.com/vulpes231) or create an issue on the GitHub repository.

---

Feel free to adjust any sections or add more details based on your specific needs and preferences!
