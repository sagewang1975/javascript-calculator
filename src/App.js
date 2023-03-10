import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function App() {
const projectName = 'javascript-calculator',
equalsStyle = {
  background: '#489037',
  position: 'absolute',
  height: 130,
  bottom: 5
}, 
clearStyle = {
  background: '#ac3939',
  width: 160
},
zeroStyle = {
  width: 160
};

class App extends React.Component {

constructor(props) {
super(props);
this.state = {
expression: '0', 
current: '0', 
previous: '', 
evaluated: false,
lastInput: '',
firstNegative: false
}
this.evaluate = this.evaluate.bind(this);
this.clear = this.clear.bind(this);
this.numbers = this.numbers.bind(this);
this.operators = this.operators.bind(this);
this.maxDigit = this.maxDigit.bind(this);
this.decimal = this.decimal.bind(this);
}

maxDigit(){
this.setState({
expression: 'Digit Limit Met',
});
}

numbers(e){
if(this.state.expression !== 'Digit Limit Met'){
let currentExpression = this.state.expression; 

if(currentExpression.length > 21) this.maxDigit(); 
else {
currentExpression = currentExpression === '0' ? e.target.value : currentExpression + e.target.value;
if (this.state.lastInput === '.'){
 this.setState({
  expression: currentExpression,
  lastInput: e.target.value,
  current: this.state.current + e.target.value
  });
}
else if(/[+-/x]/.test(this.state.lastInput)) {
  this.setState({
   expression: currentExpression,
   lastInput: e.target.value,
   current: e.target.value
  });
}
else{
 this.setState({
  expression: currentExpression,
  lastInput: e.target.value,
  current: this.state.current === '0' ? e.target.value : this.state.current + e.target.value
  });
}}}}

operators(e){
console.log("last input in o "+this.state.lastInput); 
if(this.state.expression !== 'Digit Limit Met'){

let currentExpression = this.state.expression;
let lastInput = this.state.lastInput;
           
if(this.state.lastInput == '' && e.target.value == '-'){
  this.setState({
    firstNegative: true,
    expression: e.target.value,
    current: e.target.value,
    lastInput: e.target.value
  })
} 

else{
  
if(/[+-/x]/.test(this.state.lastInput)) {
  
  let prevChar = currentExpression[currentExpression.length - 2]       
          
  if(lastInput == '-' && /[+-/x]/.test(prevChar)){
    
    this.setState({
      expression: this.state.expression.slice(0, this.state.expression.length - 2) + e.target.value,
      lastInput: e.target.value,
      current: e.target.value,
      firstNegative: false
    });
    
  }
  
  else if(e.target.value == '-'){
    this.setState({
      expression: this.state.expression + e.target.value,
      lastInput: e.target.value,
      firstNegative: true
    });
  }
  else{
    this.setState({
      expression: this.state.expression.slice(0, this.state.expression.length - 1) + e.target.value,
      lastInput: e.target.value,
      current: e.target.value
    });
  }}
else{
  if(this.state.expression.includes('=')) {
    this.setState({
      expression: this.state.previous + e.target.value,
      lastInput: e.target.value,
      previous: this.state.current,
      current: e.target.value 
    });
  }
  else{
   currentExpression += e.target.value;
   this.setState({
     expression: currentExpression,
     lastInput: e.target.value,
     current: e.target.value
   });
  }
}
}
}
}

evaluate() {
let currentExpression = this.state.expression;
currentExpression = currentExpression.replace(/x/g, "*");
let answer = eval(currentExpression);
this.setState({
  expression: currentExpression + '=' + answer.toString(),
  current: answer.toString(),
  lastInput: '=',
  previous: answer.toString(),
  evaluated: true,
  firstNegative: false
 });
}

clear() {
this.setState({
expression: '0',
current: '0',
previous: '',
lastInput: '',
evaluated: false
});
}

decimal(){
console.log('evaluated? '+this.state.evaluated);
if (this.state.evaluated === true) {
this.setState({
  expression: '0.',
  current: '0.',
  evaluated: false,
  lastInput: ''
});
}
else{ 
if(!this.state.current.includes('.')) {
let current = this.state.current;
console.log('this current before adding . = ' +  this.state.current);
current = this.state.current === '0' ? '0.' : this.state.current + '.';
this.setState({
  expression: this.state.expression + '.',
  lastInput: '.',
  current: this.state.current === '0' ? current : this.state.current + '.'
  })
console.log('this current before adding . = ' +  this.state.current); 
}}}

render() {
return (
<div>
  <div className='calculator'>
    <Expression expression={this.state.expression} />
    <Result result={this.state.current}/>
    <Calculator numbers={this.numbers}
                clear={this.clear} 
                operators={this.operators}
                evaluate={this.evaluate}
                decimal={this.decimal}
                />
  </div>
  <br /> 
  
</div>
)
}}

class Calculator extends React.Component {

render(){
return(
<div>
<div className ='keys'>
<button id="clear" value='AC' onClick={this.props.clear} style = {clearStyle}>AC</button>
<button id="add" value= "+" onClick={this.props.operators} >+</button>
<button id="subtract" value= "-" onClick={this.props.operators} >-</button>
<button id="seven" value= "7" onClick={this.props.numbers}>7</button>  
<button id="eight" value= "8" onClick={this.props.numbers}>8</button> 
<button id="nine" value= "9" onClick={this.props.numbers}>9</button> 
<button id="divide" value= "/" onClick={this.props.operators}>/</button>
<button id="four" value= "4" onClick={this.props.numbers}>4</button> 
<button id="five" value= "5" onClick={this.props.numbers}>5</button> 
<button id="six" value= "6" onClick={this.props.numbers}>6</button> 
<button id="multiply" value= "x" onClick={this.props.operators}>x</button>
<button id="one" value= "1" onClick={this.props.numbers}>1</button> 
<button id="two" value= "2" onClick={this.props.numbers}>2</button>  
<button id="three" value= "3" onClick={this.props.numbers}>3</button> 
<button id="equals" value = "=" onClick={this.props.evaluate} style = {equalsStyle}>=</button>
<button id="zero" value= "0" onClick={this.props.numbers} style={zeroStyle}>0</button>
<button id="decimal" value= "." onClick={this.props.decimal}>.</button>
</div>
</div>
);
}}

class Result extends React.Component {
render () {
return <div id='display'>{this.props.result}</div>
}
}; 

class Expression extends React.Component {
render() {
return <div id = 'expressionDisplay'>{this.props.expression}</div>
}
}; 

ReactDOM.render(<App />, document.getElementById('root'));

}


export default App; 
