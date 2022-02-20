import logo from './logo.svg';
import './App.css';

import React, { Component } from "react";

import { Container, Row, Col, FormControl, InputGroup, Button } from 'react-bootstrap'

import Web3 from 'web3';

import { Simple } from './ABI/Simple'

const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0xab574a9f9b532B3B8CE8c732Daa4e3b1CDc96ecA"

const storageContract = new web3.eth.Contract(Simple, contractAddress);

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {

      storedValue: 0,

      account: null

    };

    this.value = React.createRef();

  }

  componentDidMount = async (t) => {

        const accounts = await window.ethereum.enable();

        const account = accounts[0];

        this.setState({ account: account });

}

  setValue = async (t) => {

    const val = this.value.current.value;

    const gas = await storageContract.methods.set(val).estimateGas();

    const result = await storageContract.methods.set(val).send({

      from: this.state.account,

      gas,

    });

  }

  getValue = async (t) => {

    const result = await storageContract.methods.get().call({

      from: this.state.account,

    });

    this.setState({ storedValue: result });

  }
  render() {

    return (<div>
      <h2> Simple  </h2>

      <div class="form-row">
        <div class="col xs = {12}">
          <h7> MM Account: {this.state.account}  </h7>
        </div>
      </div>
      <>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Container>

          <Row>

            <InputGroup className="mb-3">

              <FormControl

                ref={this.value}

                placeholder="Value to Store"

                aria-label="Value to Store"

                aria-describedby="basic-addon2"

              />

              <Button variant="secondary" id="button-addon2" onClick={this.setValue}>

                Store</Button>

            </InputGroup>

          </Row>

          <Row>

            <Col><Button variant="success" onClick={this.getValue}>Retrieve</Button>{' '}</Col>

            <Col>The Stored Value is: {this.state.storedValue}

            </Col>

          </Row>

        </Container>

      </>

    </div>

    )

  };
}

export default App;
