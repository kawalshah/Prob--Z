function prec(c) {
		if(c == '^')
			return 3;
		else if(c == '/' || c=='*')
			return 2;
		else if(c == '+' || c == '-')
			return 1;
		else
			return -1;
	}
function infixToPostfix(s) {

		let st = []; //For stack operations, we are using C++ built in stack
		let result = "";

		for(let i = 0; i < s.length; i++) {
			let c = s[i];
			if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'))
				result += c;
			else if(c == '(')
				st.push('(');
			else if(c == ')') {
				while(st[st.length - 1] != '(')
				{
					result += st[st.length - 1];
					st.pop();
				}
				st.pop();
			}
			else {
				while(st.length != 0 && prec(s[i]) <= prec(st[st.length - 1])) {
					result += st[st.length - 1];
					st.pop();
				}
				st.push(c);
			}
		}
		while(st.length != 0) {
			result += st[st.length - 1];
			st.pop();
		}
        return result;
	}

function reverseString(str) {
        if (str === "")
          return "";
        else
          return reverseString(str.substr(1)) + str.charAt(0);
}
function infixToPrefix(infix)
    {
       let l = infix.length;
       infix=reverseString(infix);
    //    console.log(infix);
       let inf="";
       for (let i = 0; i < l; i++) {
           var c=infix.charAt(i);
            if (c === '(') {
                // infix[i] = ')';
                inf+=')';
                // i++;
            }
            else if (c=== ')') {
                // infix[i] = '(';
                inf+='(';
                // i++;
            }else{
                inf+=infix[i];
            }
        }
        // console.log(inf);
        let prefix = infixToPostfix(inf);
        prefix=reverseString(prefix);
        
        return prefix;
    }

    
    function isOperator(x)
    {
        switch (x) {
        case '+':
        case '-':
        case '/':
        case '*':
            return true;
        }
        return false;
    }
     
    // Convert prefix to Postfix expression
    function preToPost(pre_exp)
    {
  
        let s = [];
  
        // length of expression
        let length = pre_exp.length;
  
        // reading from right to left
        for (let i = length - 1; i >= 0; i--)
        {
  
            // check if symbol is operator
            if (isOperator(pre_exp[i]))
            {
                // pop two operands from stack
                let op1 = s[s.length - 1];
                s.pop();
                let op2 = s[s.length - 1];
                s.pop();
  
                // concat the operands and operator
                let temp = op1 + op2 + pre_exp[i];
  
                // Push String temp back to stack
                s.push(temp);
            }
  
            // if symbol is an operand
            else {
                // push the operand to the stack
                s.push(pre_exp[i] + "");
            }
        }
  
        // stack contains only the Postfix expression
        return s[s.length - 1];
    }
let pre_exp = "*-a/bc-/akl";  
let exp = "a+b*(c^d-e)^(f+g*h)-i";
// console.log(infixToPrefix(exp));
// console.log(infixToPostfix(exp));
// console.log(preToPost(pre_exp));


// export default infixToPrefix;
// export {infixToPrefix,infixToPostfix,preToPost};