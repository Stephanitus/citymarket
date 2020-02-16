import React, { Component } from 'react';
import './App.css';
import Titlebar from './Titlebar';
import Business from './Business';
import fire from './config/fire';

class App extends Component {
  constructor(props){
    super(props);
    this.mergeState = this.mergeState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.authListener = this.authListener.bind(this);
    this.state = {
      user: null,
      form: "businesses",
      loggedin: false,
      selectedOption: "customer",
      items: [],
      businesses: [
        {
          businessname: "Schmidt's Poultry",
          businessdescription: "Raw chicken, soups, and salads",
          photourl: "https://previews.123rf.com/images/valery121283/valery1212831907/valery121283190700777/127749137-raw-chicken-legs-isolated-on-white-background.jpg",
          producttype: "food"
        },{
          businessname: "Kenny's Clothing",
          businessdescription: "Shirts, shoes, and pants",
          photourl: "https://chilledworld.com/image/cache/hoodies/designer%20Hoodie%20b-600x600.jpg",
          producttype: "clothing"
        },{
          businessname: "Penny's Propane",
          businessdescription: "Grilling essentials",
          photourl: "https://cdn11.bigcommerce.com/s-vmvni2zq0j/images/stencil/1280x1280/products/44568/56220/6902027__85991.1500584805.jpg?c=2&imbypass=on",
          producttype: "hardware"
        },{
          businessname: "Jack's Hardware",
          businessdescription: "Better than Lowe's",
          photourl: "https://images-na.ssl-images-amazon.com/images/I/71tTWyypTKL._AC_SX522_.jpg",
          producttype: "hardware"
        },{
          businessname: "Laury's Housekeeping",
          businessdescription: "Get your house clean before the end of Winter!",
          photourl: "https://images-na.ssl-images-amazon.com/images/I/81KBr70-REL._AC_SL1500_.jpg",
          producttype: "services"
        },{
          businessname: "Beekeeping Professionals",
          businessdescription: "You've never had real honey until now.",
          photourl: "https://images.ctfassets.net/cnu0m8re1exe/6NeDywiU9G0nkD4OAMi83J/2a73d55ca6bb977f7f6e61d39513d682/Honeybee.jpg?w=650&h=433&fit=fill",
          producttype: "services"
        },{
          businessname: "Minidonalds",
          businessdescription: "Not at all related to McDonalds",
          photourl: "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Fries-Small-Medium.jpg",
          producttype: "food"
        },{
          businessname: "King's Burgers",
          businessdescription: "Best burgers in the city",
          photourl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg",
          producttype: "food"
        }
      ]
    };
  }

  componentDidMount() {
  this.authListener();
}

  mergeState(partialState){
    if(partialState){
      this.setState(Object.assign(this.state, partialState));
    }
  }

  handleEmptySubmit(e){
    this.setState({form: "businesses", loggedin: true});
  }

  handleSubmit(e){
    if(this.state.selectedOption==="customer"){
      this.handleEmptySubmit(e);
    }else{
      const business = {
        businessname: e.target[5].value,
        businessdescription: e.target[6].value,
        producttype: e.target[11].value,
        photourl: e.target[10].value
      };

      const product = {
        productname: e.target[7].value,
        productdescription: e.target[8].value,
        productprice: e.target[9].value,
        producttype: e.target[11].value
      };
      const products = [...this.state.items, product]
      const businesses = [...this.state.businesses, business]
      console.log(businesses);
      console.log(products);
      this.setState({form: "businesses", loggedin: true, items: products, businesses: businesses });
    }
  }

  login(e){
      this.handleSubmit(e);
      var userEmail = document.getElementById("email_field").value;
      var userPass = document.getElementById("password_field").value;
      fire.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
      });
    }

    logout(){
      fire.auth().signOut();
    }

    signup(e){
      this.handleSubmit(e);
      var signupEmail = document.getElementById("register_email").value;
      var signupPass = document.getElementById("register_password").value;
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      }).then((u)=>{console.log(u)})
      .catch((error) => {
          console.log(error);
        })
    }

    authListener() {
      fire.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user, loggedin: true });
          localStorage.setItem('user', user.uid);
        } else {
          this.setState({ user: null });
          this.setState({ user, loggedin: false });
          localStorage.removeItem('user');
        }
      });
    }



  render(){
    const cards = [];
    for (const business of this.state.businesses){
      cards.push(<Business key={business.businessname} name={business.businessname} summary={business.businessdescription} picloc={business.photourl}/>);
    }

    const foodcards = [];
    for (const business of this.state.businesses){
      if(business.producttype==="food"){
        foodcards.push(<Business key={business.businessname} name={business.businessname} summary={business.businessdescription} picloc={business.photourl}/>);
      }
    }

    const clothingcards = [];
    for (const business of this.state.businesses){
      if(business.producttype==="clothing"){
        clothingcards.push(<Business key={business.businessname} name={business.businessname} summary={business.businessdescription} picloc={business.photourl}/>);
      }
    }

    const hardwarecards = [];
    for (const business of this.state.businesses){
      if(business.producttype==="hardware"){
        hardwarecards.push(<Business key={business.businessname} name={business.businessname} summary={business.businessdescription} picloc={business.photourl}/>);
      }
    }

    const servicescards = [];
    for (const business of this.state.businesses){
      if(business.producttype==="services"){
        servicescards.push(<Business key={business.businessname} name={business.businessname} summary={business.businessdescription} picloc={business.photourl}/>);
      }
    }

    if(this.state.form==="businesses"){
      return(
        <div className="App">
          <Titlebar loggedin={this.state.loggedin} mergeState={this.mergeState} logout={this.logout} />
          <div className="Body">
            {cards}
          </div>
        </div>
      );
    }else if(this.state.form==="login"){
      return(
        <div className="App">
          <Titlebar loggedin={this.state.loggedin} mergeState={this.mergeState} logout={this.logout} />
          <div className="Login">
            <form onSubmit={this.handleSubmit}>
            <div className="TitleContainer">
              <label id="user_para">
                Login
              </label>
            </div>
              <label>
                Email:
                <input type="email" placeholder="Email..." id="email_field" />
              </label><br/>
              <label>
                Password:
                <input type="password" placeholder="Password..." id="password_field" />
              </label><br/>
            <input type="submit" onClick={this.login} value="Submit" />
            </form>
          </div>
        </div>
      );
    }else if(this.state.form==="food"){
      return(
        <div className="App">
          <Titlebar loggedin={this.state.loggedin} mergeState={this.mergeState} logout={this.logout} />
          <div className="Body">
            {foodcards}
          </div>
        </div>
      );
    }else if(this.state.form==="clothing"){
      return(
        <div className="App">
          <Titlebar loggedin={this.state.loggedin} mergeState={this.mergeState} logout={this.logout} />
          <div className="Body">
            {clothingcards}
          </div>
        </div>
      );
    }else if(this.state.form==="hardware"){
      return(
        <div className="App">
          <Titlebar loggedin={this.state.loggedin} mergeState={this.mergeState} logout={this.logout} />
          <div className="Body">
            {hardwarecards}
          </div>
        </div>
      );
    }else if(this.state.form==="services"){
      return(
        <div className="App">
          <Titlebar loggedin={this.state.loggedin} mergeState={this.mergeState} logout={this.logout} />
          <div className="Body">
            {servicescards}
          </div>
        </div>
      );
    }else if(this.state.form==="profile"){
      return(
        <div className="App">
          <Titlebar loggedin={this.state.loggedin} mergeState={this.mergeState} logout={this.logout} />
          <div className="Body">

          </div>
        </div>
      );
    }else if(this.state.form==="about"){
      return(
        <div className="App">
          <Titlebar loggedin={this.state.loggedin} mergeState={this.mergeState} logout={this.logout} />
          <div className="Body">

          </div>
        </div>
      );
    }else if(this.state.form==="signup" && this.state.selectedOption==="localbusiness"){
      return(
        <div className="App">
          <Titlebar loggedin={this.state.loggedin} mergeState={this.mergeState} logout={this.logout} />
          <div className="Body">
          <div className="TitleContainer">
            <label>
              Register
            </label>
          </div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Email:
                <input type="email" placeholder="Email..." id="register_email"  />
              </label><br/>
              <label>
                Password:
                <input type="password" placeholder="Password" id="register_password"  />
              </label><br/>
              <label>
                Confirm password:
                <input type="password" placeholder="Confirm Password" id="confirm_register_password"  />
              </label><br/>

              <div className="radio">
                <label>
                  <input type="radio" onChange={(e)=>{this.setState({selectedOption: e.target.value})}} checked={this.state.selectedOption === 'localbusiness'}/>
                  Local Business
                </label>
                <label>
                  <input type="radio" onChange={(e)=>{this.setState({selectedOption: e.target.value})}} checked={this.state.selectedOption === 'customer'}/>
                  Customer
                </label>
              </div>

              <label>
                Business name:
                <input type="text" name="businessname"  />
              </label><br/>
              <label>
                Business description:
                <input type="text" name="businessdescription"  />
              </label><br/>
              <label>
                Product name:
                <input type="text" name="productname"  />
              </label><br/>
              <label>
                Product description:
                <input type="text" name="productdescription"  />
              </label><br/>
              <label>
                Product price:
                <input type="text" name="price"  />
              </label><br/>
              <label>
                Photo URL:
                <input type="text" name="url"  />
              </label><br/>
            <select name="type" >
                <option value="food">Food</option>
                <option value="clothing">Clothing</option>
                <option value="hardware">Hardware</option>
                <option value="services">Service</option>
              </select><br/>

            <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      );
    }else if(this.state.form==="signup"){
      return(
        <div className="App">
          <Titlebar loggedin={this.state.loggedin} mergeState={this.mergeState} logout={this.logout} />
          <div className="Body">
          <div className="TitleContainer">
            <label>
              Register
            </label>
          </div>
            <form>
              <label>
                Email:
                <input type="email" placeholder="Email..." id="register_email" />
              </label><br/>
              <label>
                Password:
                <input type="password" placeholder="Password" id="register_password" />
              </label><br/>
              <label>
                Confirm password:
                <input type="password" placeholder="Confirm Password" id="confirm_register_password"  />
              </label><br/>
              <div className="radio">
                <label>
                  <input type="radio" value="localbusiness" onChange={(e)=>{this.setState({selectedOption: e.target.value})}} checked={this.state.selectedOption === 'localbusiness'}/>
                  Local Business
                </label>
                <label>
                  <input type="radio" value="customer" onChange={(e)=>{this.setState({selectedOption: e.target.value})}} checked={this.state.selectedOption === 'customer'}/>
                  Customer
                </label>
              </div>
            <input type="submit" onClick={this.handleEmptySubmit} value="Submit" />
            </form>
          </div>
        </div>
      );
    }else{
      console.log("state.form error");
    }
  }
}

export default App;
