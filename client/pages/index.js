import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import Taskabi from '../../Backend/build/contracts/TaskContract.json';
import { ContractAddress } from '../config'
import { ethers } from "ethers"
import { useState, useEffect } from "react";
/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {
  const [correctNetwork, setcorrectNetwork] = useState(false);
  const [isUserLoggedIn, setisUserLoggedIn] = useState();
  const [currentAccount, setcurrentAccount] = useState();
  const [task, setTask] = useState([]);
  const [input, setInput] = useState();
  // Calls Metamask to connect wallet on clicking Connect Wallet button



  useEffect(() => {
    connectWallet()
    getAllTasks()
  }, [])
  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log("MetaMask not detected!")
        return
      }
      else {
        console.log("MetaMask detected successfully!")
      }
      let chainId = await ethereum.request({ method: 'eth_chainId' })
      console.log("connected to chain!", chainId);
      const goerliId = '0x5';
      if (chainId != goerliId) {
        alert("You are not connected to the goerli test network!");
        setcorrectNetwork(false);
        return
      }
      else {
        setcorrectNetwork(true);

      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log("Account found!", accounts[0])
      setisUserLoggedIn(true);
      setcurrentAccount(accounts[0])
    } catch (error) {
      console.log(error);
    }
  };

  // Just gets all the tasks from the contract
  const getAllTasks = async (e) => {
    try{
       const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          ContractAddress,
          Taskabi.abi,
          signer
        );
        let allTasks=await TaskContract.getMyTasks()
        setTask(allTasks);
      }
      else{
        console.log("ethereum object doest not exist");
      }
    }catch(error){
      console.log(error);
    }

  };
  // Add tasks from front-end onto the blockchain
  const addTask = async e => {
    e.preventDefault(); // avoid refresh

    let taskObj = {
      taskText: input,
      isDeleted: false
    };

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          ContractAddress,
          Taskabi.abi,
          signer
        );

        TaskContract.addTask(taskObj.taskText, taskObj.isDeleted)
          .then(res => {
            setTask([...task, taskObj]);
            console.log("Added Task");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log("ethereum object does not exist!");
      }
    } catch (error) {
      console.log(error);
    }
    setInput(' ')
  };
  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = key => async () => {
    try{
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          ContractAddress,
          Taskabi.abi,
          signer
        );

      const deletedTaskTx= await TaskContract.deleteTask(key,true)

        console.log("Successfully deleted Task: ", deletedTaskTx)
        let allTasks= await TaskContract.getMyTasks()
        setTask(allTasks)
      }else{
        console.log("ethereum object does not exist!");
      }
    }catch(error){
      console.log(error)
    }
  };

  return (
    <div className="bg-[#97b5fe] h-screen w-screen flex justify-center py-6">
      {!isUserLoggedIn ?
        <ConnectWalletButton connectWallet={connectWallet} />
        : correctNetwork ?
          <TodoList task={task} input={input} setInput={setInput} addTask={addTask} deleteTask={deleteTask}/>
          :
          <WrongNetworkMessage />
      }
    </div>
  );
}