import React from 'react';

export default class App extends React.Component {
  //Constructor initiliazes the state inside of the Component
  constructor(props) {
    super(props);
    this.state = {
      balance: "",
      rate: "",
      term: "",
      output: "",
      result: 0,
    };
    //If you want to grab "this" from a function, and it does not have () then you must BIND IT: See below for examples!
    this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this) 
  }
  //We are using a general onChange function that will perform the onChange event binding for
  //the following elements: balance, rate, term, and output.
  onChange(e){ 
    this.setState({ [e.target.name] : e.target.value })
}  
//The handleClick function is a event that will run once the button called "submit" is clicked. 'e' stands for event in this case.
  handleClick(e) {
    //Stops the event at this point, this prevents the Reset of the actual event that is taking place.
    e.preventDefault(); 
    //It's important to run 'this.calculate' without arguments because it already contains the state of each element in the calculate function itself.
    var result = this.calculate(); 
    //the setState portion will update the state of the 'output' element by using the string literal 'result'
    this.setState({
      output : `Your Monthly Payment Amount is: ${result}`}
    )
    return result;
  }
  
  calculate(balance, rate, term) {
    balance = this.state.balance;
    rate = this.state.rate;
    term = this.state.term;
    const n = term * 12;
    const r = rate / 1200;
    const top = r * (1 + r) ** n;
    const bottom = (1 + r) ** n - 1;
    var payment = (balance * (top / bottom)).toFixed(2);  
    return payment;
   }
  //All the information inside of render will get outputted on the initialRender and will take on the initial state assigned in this.state from the constructor.
  render() {
    return (
    <div className='container'>
      <form className="form-horizontal">
        <h3>Mortgage Calculator</h3>
      <div className="form-group">
        <label htmlFor="loan-balance">Loan Balance</label>
        <input type="number" value={this.state.balance} onChange={this.onChange} name="balance" className="form-control" id="loan-balance" placeholder="Loan Balance"></input>
        
        <label htmlFor="APR-rate">Annual Percentage Rate %</label>
        <input type="number" value={this.state.rate} onChange={this.onChange} name="rate" className="form-control" step="0.01" id="APR-rate" placeholder="Annual Percentage Rate %"></input>

        <label htmlFor="term">Term</label>
        <select className="form-control" name="term" value={this.state.term} onChange={this.onChange} id="term" placeholder="Loan-Term">
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
          <button name="submit" onClick={this.handleClick}>Submit</button>
        </div>

        <div name="output" value={this.state.output} onChange={this.onChange} className="form-group" id="output"><h3>{this.state.output}</h3></div>
      </form>
    </div>
    );
  }

}