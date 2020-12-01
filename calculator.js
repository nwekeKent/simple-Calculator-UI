const outputValue = document.getElementById('output-value')
const historyValue = document.getElementById('history-value')
const operators = document.querySelectorAll('.operator')
const numbers = document.querySelectorAll('.number')


function getHistory(){
	return historyValue.innerText;
}
function printHistory(num){
	historyValue.innerText=num;
}
function getOutput(){
  return outputValue.innerText;
}
function printOutput(num){
	if(num==""){
		outputValue.innerText=num;
	}
	else{
		outputValue.innerText=getFormattedNumber(num);
	}	
}

function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}



operators.forEach(operator => {
        operator.addEventListener('click', () => {
            if(operator.id == 'clear'){
              printHistory("");
		          printOutput("0");
            }

            else if(operator.id=="backspace"){
              let output=reverseNumberFormat(getOutput()).toString();
              if(output){//if output has a value
                output= output.substr(0,output.length-1);
                printOutput(output);
              }
            }
            else{
              let output= getOutput();
              let  history= getHistory();
              if(output== "" && history!=""){
                if(isNaN(history[history.length-1])){
                  history = history.substr(0,history.length-1);
                }
              }

              if(output !="" || history!=""){
                output = output == "" ? output:reverseNumberFormat(output);
                history = history + output;
                if(operator.id=="calculate"){
                  let result= eval(history);
                  printOutput(result);
                  printHistory("");
                }

                else{
                  history=history+operator.id;
                  printHistory(history);
                  printOutput("");
                }
              }
            }
            

          })

        })
numbers.forEach(number => {
    number.addEventListener('click', () => {
     
      let output=reverseNumberFormat(getOutput());
      if(output !=NaN || number.id == '.'){ //if output is a number
        output = output + number.innerText;
        printOutput(output);
      } 
    })
})