import React from 'react';


export default class App extends React.Component {
  // your Javascript goes here
  //If you want to initialize the state inside of your Component, you must use a Constructor!
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
  //We are using onChange as a generic fits all function that will perform the onChange event binding for
  //the following elements: balance, rate, term, and output.
  onChange(e){ 
    this.setState({ [e.target.name] : e.target.value })
}  
//The handleClick function is a event that will run once the button called "submit" is clicked. 'e' stands for event in this case.
  handleClick(e) {
    e.preventDefault(); //Stops the event at this point, this prevents the Reset of the actual event that is taking place.
    var result = this.calculate(); //It's important to run 'this.calculate' without arguments because it already contains the state of each element in the calculate function itself.
    console.log(result);
    //the setState portion will update the state of the 'output' element by using the string mentioned below along with the information stored in the variable called result
    this.setState(
      {output : `Your Monthly Payment Amount is: ${result}`}
    )
    return result;
  }

  
  calculate(balance, rate, term) {
    //var payment = balance * rate * term; //USED FOR TESTING PURPOSES ONLY
    //Lines 41-43 are grabbing the actual state of each variable which means it will grab the actual numbers that are inputted/selected by the user.
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
    //All the information inside of render will get outputted on the initialRender and will take on the initial state's assigned in this.state within the constructor.
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
//this contains the explicit format of each onChange for each div element
  // onbalanceChange(e) {
  //   this.setState({ balance: e.target.value });
  // }
  // onrateChange(e) {
  //   this.setState({ rate: e.target.value });
  // }
  // ontermChange(e) {
  //   this.setState({ term: e.target.value });
  // }
