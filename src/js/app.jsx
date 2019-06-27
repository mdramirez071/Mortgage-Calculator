import React from 'react';


export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
    this.state = {
      balance: "",
      rate: "",
      term: "",
      output: "",
      result: 0,
    };
    this.onChange = this.onChange.bind(this) //GOOGLE WHAT THIS MEANS!
    this.handleClick = this.handleClick.bind(this) 
  }
  
  onChange(e){ 
    this.setState({ [e.target.name] : e.target.value })
}  

  handleClick(e) {
    e.preventDefault(); //Stops the event at this point
    var result = this.calculate();
    console.log(result);
    this.setState(
      {output : `Your Monthly Payment Amount is: ${result}`}
    )
    return result;
  }

  
  calculate(balance, rate, term) {
    //var payment = balance * rate * term; //USED FOR TESTING PURPOSES ONLY
    balance = this.state.balance;
    rate = this.state.rate;
    term = this.state.term;
    const n = term * 12;
    const r = rate / 1200;
    const top = r * (1 + r) ** n;
    const bottom = (1 + r) ** n - 1;
    var payment = (balance * (top / bottom)).toFixed(2);  //I think this is the right math? 
    //then set state to bind the result to the div with an id of 'output' as a string like this: $1945.09 is your payment.
    return payment;
   }
    

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
    {/* your JSX goes here */}
    </div>
    );
  }

}

  // onbalanceChange(e) {
  //   this.setState({ balance: e.target.value });
  // }
  // onrateChange(e) {
  //   this.setState({ rate: e.target.value });
  // }
  // ontermChange(e) {
  //   this.setState({ term: e.target.value });
  // }
