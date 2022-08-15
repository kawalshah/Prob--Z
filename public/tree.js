var preindex = 0;
class node
{
    constructor(data)
    {
        this.data = data;
    }
}
function constructTreeUtil(pre, post, l, h, size)
{
   if (preindex >= size || l > h)
    {
        return null;
    }
   var root = new node(pre[preindex]);
    preindex++;
   if (l == h || preindex >= size)
    {
        return root;
    }
    var i;
   for (i = l; i <= h; i++)
    {
        if (post[i] == pre[preindex])
        {
            break;
        }
    }
  if (i <= h)
    {
        root.left = constructTreeUtil(pre, post,  l, i, size);
        root.right = constructTreeUtil(pre, post,i + 1, h-1, size);
    }
    return root;
}
function constructTree(pre, post, size)
{
    preindex = 0;
    return constructTreeUtil(pre, post, 0, size - 1, size);
}
var out=[];
function printInorder(root)
{
    if (root == null)
    {
        return;
    }
    printInorder(root.left);
    out.push(root.data);
    printInorder(root.right);
}

let pre="1,2,4,8,9,5,3,6,7";
let post="8,9,4,5,2,6,7,3,1";
let ino="8,4,9,2,5,1,6,3,7";
function inorder(pr,po)
{

  let pre=pr.split(",").map(Number);
  let post=po.split(",").map(Number);
  let n=pre.length;
  let m=post.length;
  if(n!=m){
    return "Invalid Input";
  }else{
    out=[];
    var root = constructTree(pre, post,n);
    printInorder(root);
    console.log(out.toString());
    return out.toString();
  }
}

// inorder(pre,post).toString();
// console.log(preorder(ino,post));
// console.log(postorder(ino,pre));

function Stack() {
    this.stac = new Array();
    this.pop = function() {
      return this.stac.pop();
    }
    this.push = function(item) {
      this.stac.push(item);
    }
  }
  var postindex = 0;
  
  function search(inn, data, n) {
    let i = 0;
    for (i = 0; i < n; i++) {
      if (inn[i] === data) {
        return i;
      }
    }
    return i;
  }
  
  function prin(inn, post, st, end, stack, n) {
    if (st > end) {
      return;
    }
    let val = post[postindex];
    let index = search(inn, val, n);
    postindex--;
  
    prin(inn, post, index + 1, end, stack, n);
    prin(inn, post, st, index - 1, stack, n);
    stack.push(val);
  }
function preorder(ino, pre) {
  
    let inor = ino.split(",").map(Number);
    let preo = pre.split(",").map(Number);
    let n = inor.length;
    let m = preo.length;
    if (n != m) {
      return "Invalid Input";
    } else {
      postindex = n - 1;
      var stack = new Stack();
      prin(inor, preo, 0, n - 1, stack, n);
      let out = [];
      for (let i = 0; i < n; i++) {
        out.push(stack.pop());
      }
      return out;
    }
  }

  



  
var postindex=0;
function searchs(arr,st,en,data){
  let i=0;
  for(i=st;i<en;i++){
    if(arr[i]===data){
      return i;
    }
  }
  return i;
}
// let out=[];
function prins(arr,pre,st,en)
{
  if(st>en){
    return;
  }
  let index=searchs(arr,st,en,pre[postindex++]);
  prins(arr,pre,st,index-1);
  prins(arr,pre,index+1,en);
  out.push(arr[index]);
}

function postorder(ino,pre)
{
  // console.log(ino);
  out=[];
  let inor=ino.split(",").map(Number);
  let preo=pre.split(",").map(Number);
  let n=inor.length;
  let m=preo.length;
  if(n!=m){
    return "Invalid Input";
  }else{
    postindex=0;
    prins(inor,preo,0,n-1);
    return out;
  }
}

// export default inorder;
// export {inorder,preorder,postorder};