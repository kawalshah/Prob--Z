//Operating system process scheduler module
//Written by Benyamin Noori


//sort processes in the list based on time of arrival
var sortByArrival = function(obj_list){
	for(var i = 0; i < obj_list.length; i++){
		for(var j = i; j < obj_list.length; j++){
			if(obj_list[i].arrival_time > obj_list[i].arrival_time) {
				var temp = obj_list[i];
				obj_list[i] = obj_list[j];
				obj_list[j] = temp;
			}
		}
	}
	return obj_list;
}


//sort processes in the list based on length of execution
var sortByLength = function(obj_list){
	for(var i = 0; i < obj_list.length; i++){
		for(var j = i; j < obj_list.length; j++){
			if(obj_list[i].len > obj_list[j].len) {
				var temp = obj_list[i];
				obj_list[i] = obj_list[j];
				obj_list[j] = temp;
			}
		}
	}
	return obj_list;	
}

//add processes that have arrived by curr_time to queue of processes
var updateCur = function(queue, proc_list, curr_time){

	while(proc_list.length > 0 && proc_list[0].arrival_time <= curr_time){
		queue.push(proc_list.shift());
	}

	return queue;
}


//simulate process scheduling using round robin algorithm
var rr = function(proc_info){
	var queue = []; //list of processes currently in the system
	var sch = []; //final list of scheduling results
	var curr_time = 0; //current simulation time
	var quanta = proc_info.quanta; //quanta of execution at every turn

	//sort processes by arrival time
	var proc_list = sortByArrival(proc_info.proc_list);

	//set remaining time of execution for every process
	for(var i = 0; i < proc_list.length; i++){
		proc_list[i]["rem"] = proc_list[i].len;
	}

	//scheduling begins as soon as the first process arrives 
	curr_time = proc_list[0].arrival_time;
	updateCur(queue, proc_list, curr_time);

	while(queue.length > 0){

		//dequeue process to schedule
		proc = queue.shift();


		if(proc.rem < quanta){
			//add new process to schedule
			sch.push({
				"proc_id": proc.id,
				"begin_time": curr_time,
				"end_time": curr_time + proc.rem,
				"is_cs": false,
				"id_idle": false,
			});
			//update current simulation time
			curr_time += proc.rem;
			//update process remaining time
			proc.rem = 0;
		}
		else {
			//add new process to schedule
			sch.push({
				"proc_id": proc.id,
				"begin_time": curr_time,
				"end_time": curr_time + quanta,
				"is_cs": false,
				"id_idle": false,
			});
			//update current simulation time
			curr_time += quanta;
			//update process remaining time
			proc.rem -= quanta;
		}


		//if context switch time specified, schedule one
		if(proc_info.cs_time != 0 && proc_list.length != 0){
			sch.push({
				"proc_id": -1,
				"begin_time": curr_time,
				"end_time": curr_time + proc_info.cs_time,
				"is_cs": true,
				"id_idle": false,
			});
			curr_time += proc_info.cs_time;
		}


		//add processes that have arrived by now
		queue = updateCur(queue, proc_list, curr_time);


		//if process isn't finished yet, add it to the end of the job queue
		if(proc.rem > 0){
			queue.push(proc);
		}
		

		//check if cpu has to go idle till the next process arrives
		if(proc_list.length > 0 && queue.length == 0){
			var next_proc = proc_list[0].arrival_time;
			sch.push({
				"proc_id": -1,
				"begin_time": curr_time,
				"end_time": next_proc,
				"is_cs": false,
				"id_idle": true,
			});
			curr_time = next_proc;
			queue.push(proc_list.shift());
		}

	}

	return sch;
}


//simulate process scheduling using shortest job first algorithm
var sjf = function(proc_info){
	var queue = []; //list of processes currently in the system
	var sch = []; //final list of scheduling results
	var curr_time = 0; //current simulation time

	//sort processes by arrival time
	var proc_list = sortByArrival(proc_info.proc_list);

	//scheduling begins as soon as the first process arrives 
	curr_time = proc_list[0].arrival_time;
	updateCur(queue, proc_list, curr_time);

	while(queue.length > 0){

		//sort processes by length to determine the next one to be executed.
		queue = sortByLength(queue);

		//dequeue process to schedule
		proc = queue.shift();

		//add new process to schedule
		sch.push({
			"proc_id": proc.id,
			"begin_time": curr_time,
			"end_time": curr_time + proc.len,
			"is_cs": false,
			"id_idle": false,
		});

		//update current simulation time
		curr_time += proc.len;

		//if context switch time specified, schedule one
		if(proc_info.cs_time != 0 && proc_list.length != 0){
			sch.push({
				"proc_id": -1,
				"begin_time": curr_time,
				"end_time": curr_time + proc_info.cs_time,
				"is_cs": true,
				"id_idle": false,
			});
			curr_time += proc_info.cs_time;
		}


		//add processes that have arrived by now
		queue = updateCur(queue, proc_list, curr_time);
		

		//check if cpu has to go idle till the next process arrives
		if(proc_list.length > 0 && queue.length == 0){
			var next_proc = proc_list[0].arrival_time;
			sch.push({
				"proc_id": -1,
				"begin_time": curr_time,
				"end_time": next_proc,
				"is_cs": false,
				"id_idle": true,
			});
			curr_time = next_proc;
			queue.push(proc_list.shift());
		}

	}

	return sch;
}



//simulate process scheduling using first in first out algorithm
var fifo = function(proc_info){
	var queue = []; //list of processes currently in the system
	var sch = []; //final list of scheduling results
	var curr_time = 0; //current simulation time

	//sort processes by arrival time
	var proc_list = sortByArrival(proc_info.proc_list);

	//scheduling begins as soon as the first process arrives 
	curr_time = proc_list[0].arrival_time;
	updateCur(queue, proc_list, curr_time);

	while(queue.length > 0){
		//dequeue process to schedule
		proc = queue.shift();

		//add new process to schedule
		sch.push({
			"proc_id": proc.id,
			"begin_time": curr_time,
			"end_time": curr_time + proc.len,
			"is_cs": false,
			"id_idle": false,
		});

		//update current simulation time
		curr_time += proc.len;

		//if context switch time specified, schedule one
		if(proc_info.cs_time != 0 && proc_list.length != 0){
			sch.push({
				"proc_id": -1,
				"begin_time": curr_time,
				"end_time": curr_time + proc_info.cs_time,
				"is_cs": true,
				"id_idle": false,
			});
			curr_time += proc_info.cs_time;
		}


		//add processes that have arrived by now
		queue = updateCur(queue, proc_list, curr_time);
		

		//check if cpu has to go idle till the next process arrives
		if(proc_list.length > 0 && queue.length == 0){
			var next_proc = proc_list[0].arrival_time;
			sch.push({
				"proc_id": -1,
				"begin_time": curr_time,
				"end_time": next_proc,
				"is_cs": false,
				"id_idle": true,
			});
			curr_time = next_proc;
			queue.push(proc_list.shift());
		}

	}

	return sch;
}



//proc_info contains the following: 
//1. "proc_list": a list of {"id", "len", "arrival_time"} objects each representing a process
//2. "cs_time": context switch time. 
//3. "alg": The algorithm that is used. Can be one of 
//{"fifo", "sjf", "srjf", "rr"}
//4. "quanta" which shows that quanta for every process
//Returns a list of json objects {"proc_id", "begin_time", "end_time", "is_cs", "is_idle"}
exports.schedule = function(proc_info){
	switch(proc_info.alg){
		case "fifo": return fifo(proc_info);
		case "sjf": return sjf(proc_info);
		case "rr": return rr(proc_info);
	}
}