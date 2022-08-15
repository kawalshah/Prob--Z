# OSPS
## Introduction
OSPS (Operating System's Process Scheduler) is a node module that simulates the process scheduling algorithms. 

## Installation 


```js
npm install osps
```

## Usage

```js
var osps = require("./osps.js");
var sim = osps.schedule(proc_info);
```


### Inputs
The proc_info object should contain the following: 
- "proc_list": A list of process objects. Each of these objects should look like:

        { 

        "proc_id": 1, //A positive unique number identifying each process

        "len": 10, //A number showing the amount of CPU time that process needs to complete

        "arrival_time": 2, //A number showing the simulation time at which the process enters the system

        }

- "cs_time": A number showing the amount of context switch time required. 0 if negligible.

- "alg": A string that specifies the algorithm of the simulation. Can be one of:

"fifo" (First In First Out), "sjf" (Shortest Job First), "rr" (Round Robin)

- "quanta": For quanta based algorithms (like "rr"), specifies the amount of quanta at each turn.


### Outputs

Output is a list of objects, each one showing one block of execution that can be process execution,
context switch or CPU idle time. Each object looks like this: 

          {

          "proc_id": 1, //shows the id of the process that is being executed in this block, -1 if cs_time or is_idle is true

          "begin_time": 10, //begin time of this block of execution

          "end_time": 15, //begin time of this block of execution

          "is_cs": false, //true if this block is for context switching

          "id_idle": false, // true if during this block cpu is idle

          }
