// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TaskContract {
    event AddTask(address recipient, uint taskId);
    event DeleteTask(uint taskId, bool isDeleted);

    struct Task {
        uint id;
        string taskText;
        bool isDeleted;
    }

    Task[] private tasks;

    mapping(uint256 => address) taskToOwner;

    function addTask(string memory taskText, bool isDeleted) external {
        uint taskID = tasks.length;
        tasks.push(Task(taskID, taskText, isDeleted));
        taskToOwner[taskID] = msg.sender;
        emit AddTask(msg.sender, taskID);
    }

    function getMyTasks() external view returns (Task[] memory) {
        uint count = 0;
        for (uint i = 0; i < tasks.length; i++) {
            if (taskToOwner[i] == msg.sender) {
                count++;
            }
        }

        Task[] memory result = new Task[](count);
        uint index = 0;
        for (uint i = 0; i < tasks.length; i++) {
            if (taskToOwner[i] == msg.sender) {
                result[index] = tasks[i];
                index++;
            }
        }
        return result;
    }

    function deleteTask(uint taskID, bool isDeleted) external {
        require(taskToOwner[taskID] == msg.sender, "Only the task owner can delete the task");
        tasks[taskID].isDeleted = isDeleted;
        emit DeleteTask(taskID, isDeleted);
    }
}

