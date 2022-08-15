function printJobScheduling(arr, t) {
    let n = arr.length;
  
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < (n - 1 - i); j++) {
        if (arr[j][2] < arr[j + 1][2]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    let result = [];
  
    let job = [];
    for (let i = 0; i < t; i++) {
      job[i] = '-1';
      result[i] = false;
    }
  
    for (let i = 0; i < arr.length; i++) {
      for (let j = (t - 1, arr[i][1] - 1); j >= 0; j--) {
        if (result[j] == false) {
          result[j] = true;
          job[j] = arr[i][0];
          break;
        }
      }
    }
    return job;
  }


function JobScheduling(nm, pr, dd) {
    let names = nm.split(",");
    let profit = pr.split(",").map(Number);
    let deadline = dd.split(",").map(Number);
    let l=names.length;
    if(names.length!==profit.length || profit.length!==deadline.length)return "Wrong Input";
    var a=[];
    var lim=0;
    for(let i=0;i<l;i++){
        lim=Math.max(lim,deadline[i]);
      a.push([names[i],deadline[i],profit[i]]);
    }
    var out=printJobScheduling(a, lim);
    return out;
  }
var 
nm="a,b,c,d,e",
pr="100,19,27,25,15",
dd="2,1,2,1,3";
console.log(JobScheduling(nm, pr, dd));


let Activity=[];
function MaxActivities(arr, n){
    let selected = [];
    Activity = Activity.sort(function(a,b) {
    return a[1] - b[1];
    });
    let i = 0
    selected.push(arr[i]);
    for(let j=1;j<n;j++){
      if( arr[j][0] >= arr[i][1]){
          selected.push(arr[j]);
          i = j;
      }
    }
    return selected;
}
// 
let ss="1,3,0,5,8,5";
let ff="2,4,6,7,9,9";
function activities(ss,ff){
  let s=ss.split(",").map(Number);
  let f=ff.split(",").map(Number);
  let n = s.length;
  if(s.length!==f.length)return "Invalid Input";
   Activity = [];
  for(let i=0;i<n;i++){
    Activity.push([s[i],f[i]]);
  }
  let out=MaxActivities(Activity, n);
  return out;
}

// console.log(activities(ss,ff));

const knapSack = (values, weights, target) => {
    // T[i][j] holds the max value of knapsack
    let T = new Array(values.length + 1);
    for(let i = 0; i < T.length; i++){
      T[i] = new Array(target+1).fill(0);
    }
  
    // for ith item
    for (let i = 1; i <= values.length; i++) {
      // choose all weights from 0 to maximum capacity W
  
      for (let j = 0; j <= target; j++) {
        // base case: don't pick ith element if j-weights[i-1] is negative
        if (weights[i-1] > j) {
          T[i][j] = T[i-1][j];
        } else {
          // store the max value that we get by picking or leaving the i'th item
          T[i][j] = Math.max(T[i-1][j], T[i-1][j-weights[i-1]] + values[i-1]);
        }
      }
    }
  
    // return maximum value
    return T[values.length][target];
  }

 let val="60,100,120", wt="10,20,30", tr="50";
 function knapSackprob(val,wt,tr){
    let values=val.split(",").map(Number);
    let weights=wt.split(",").map(Number);
    if(values.length!==weights.length)return "Invalid Input"
    let target=Number(tr);
    let out=knapSack(values,weights,target);
    return out;
  }
  // console.log(knapSackprob(val,wt,tr));
  
  // export default knapSackprob;
  // export {knapSackprob,activities,JobScheduling};