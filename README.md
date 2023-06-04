
# Todo App on Blockchain


A decentralized todo app built with Next.js and Solidity, using the Gorli Test Network. This app allows users to create tasks and manage them using smart contracts. Users can connect their digital wallets to interact with the app.

## Features

- Create and manage tasks using smart contracts.
- Connect your digital wallet to interact with the app
- Built using Next.js for a fast and responsive frontend
- Deployed on the Gorli Test Network for easy testing and development

## Prerequisites
Before setting up the project, make sure you have the following software installed:
- Node.js (version 12.x or higher)
- Yarn (version 1.x or higher)
- Truffle (version 5.x or higher)



## Installation

Clone the repository and navigate to the project directory.
```bash
git https://github.com/OSAMA-tec/Todo_App_Blockchain.git
cd Todo_App_Blockchain
```
Install the dependencies for the frontend and backend.
```
cd client
npm install
```


Compile the smart contracts:
```
cd ../backend
truffle compile
```
Deploy the smart contracts to the Gorli Test Network:
```
truffle migrate --network gorli
```

Start the development server:

```
yarn dev
```
Open your browser and navigate to http://localhost:3000 to view the app.


## Contributing
If you want to contribute to the College Finder Application, follow these steps:

- `Fork` this repository
- `Create` a new branch for your changes
- Make your changes and `commit` them
- `Push` your changes to your fork
- Create a `pull` request to merge your changes into the main repository
## License
The Project is licensed under the `MIT` License. See the `LICENSE` file for more information.
