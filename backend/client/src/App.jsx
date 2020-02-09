import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Modal,
  Table,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Header from "./components/Header";

class App extends Component {
  state = {
    cars: [],
    newCarModal: false,
    editCarModal: false,
    newCarData: {
      model: "",
      make: "",
      owner: "",
      registration: ""
    },
    editCarData: {
      model: "",
      make: "",
      owner: "",
      registration: ""
    }
  };

  // fetching the json Cars data from the /api endpoint in componentDidMount method using proxy
  componentDidMount() {
    axios.get("/carApi").then(res => {
      // console.log(res);
      // console.log(res.data);
      this.setState({ cars: res.data });
    });
  }

  // sets the form modal to the opposite of what it currently is in display in order to toggle
  toggleNewCarModal() {
    this.setState({
      newCarModal: !this.state.newCarModal
    });
  }

  toggleEditCarModal() {
    this.setState({
      editCarModal: !this.state.editCarModal
    });
  }

  // add Cars function, uses axios post request to api using form data from state
  addCar() {
    axios.post("/carApi", this.state.newCarData).then(res => {
      let { cars } = this.state;
     
      cars.push(res.data);

      this.setState({
        cars,
        newCarModal: false,
        // resetting the new project data back to empty strings for next project add
        newCarData: {
          model: "",
          make: "",
          owner: "",
          registration: ""
        }
      });
      // calling componentDidMount method in order to refresh the data from the api
      this.componentDidMount();
    });
  }

  // edit project function, takes info from form and and it to state in edit variable

  editCar(model, make, owner, registration) {
    this.setState({
      editCarData: {
        model: "",
        make: "",
        owner: "",
        registration: ""
      },
      editCarModal: !this.state.editCarModal
    });
  }

  // update project function, runs when update button is clicked - makes a put request to proxy api to update project with specific id and new info

  updateCar() {
    let { model, make, owner, registration } = this.state.editCarData;
    axios
      // adding the selected project id onto the put request URL
      .put("/api/" + this.state.editCarData.id, {
        model,
        make,
        owner,
        registration
      })
      .then(res => {
        this.componentDidMount();
        console.log(res.data);

        this.setState({
          editCarModal: false,
          editCarData: {
            model: "",
            make: "",
            owner: "",
            registration: ""
          }
        });
      });
  }

  // delete project function, sends a delete request to api with the selected project id
  deleteCar(id) {
    axios.delete("/api/" + id).then(res => {
      this.componentDidMount();
    });
  }

  render() {
    // saving project from state to array and mapping over them to produce a new table row
    let cars = this.state.cars.map(car => {
      // returning a new table row for every time a project gets added
      return (
        <tr key={car.id}>
          <td>{car.model}</td>
          <td>{car.make}</td>
          <td>{car.owner}</td>
          <td>{car.registration}</td>

          <td>
            <i
              onClick={this.editCar.bind(
                this,
                car.id,
                car.model,
                car.make,
                car.owner,
                car.registration
              )}
              className="fas fa-edit fa-1.5x"
              id="editButton"
            ></i>
          </td>
          <td>
            <i
              onClick={this.deleteCar.bind(this, car.id)}
              className="fas fa-times fa-1.5x"
              id="deleteButton"
            ></i>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <Header />

        <div className="mainContainer">
          <Button
            id="addButton"
            color="primary"
            // binding the toggle modal function to the add new project button
            onClick={this.toggleNewCarModal.bind(this)}
          >
            Add New
          </Button>
          {/* NEW PROJECT MODAL FORM */}
          <Modal
            isOpen={this.state.newCarModal}
            toggle={this.toggleNewCarModal.bind(this)}
          >
            <ModalHeader toggle={this.toggleNewCarModal.bind(this)}>
              Add New Car
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="model">Model</Label>
                <Input
                  id="model"
                  value={this.state.newCarData.model}
                  // function to get data from inputs, sets the state to the form values
                  onChange={e => {
                    let { newCarData } = this.state;
                    // setting the value of the input for title to state
                    newCarData.model = e.target.value;

                    this.setState({ newCarData });
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="Make">Make</Label>
                <Input
                  id="Make"
                  value={this.state.newCarData.make}
                  onChange={e => {
                    let { newCarData } = this.state;

                    newCarData.make = e.target.value;

                    this.setState({ newCarData });
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="Owner">Owner</Label>
                <Input
                  id="Owner"
                  value={this.state.newCarData.owner}
                  onChange={e => {
                    let { newCarData } = this.state;

                    newCarData.owner = e.target.value;

                    this.setState({ newCarData });
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="registration">Registration</Label>
                <Input
                  id="registration"
                  value={this.state.registration}
                  onChange={e => {
                    let { newCarData } = this.state;

                    newCarData.registration = e.target.value;

                    this.setState({ newCarData });
                  }}
                ></Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.addCar.bind(this)}>
                Add Car
              </Button>{" "}
              {/* cancel button for modal, sets modal state for open/close */}
              <Button
                color="danger"
                onClick={this.toggleNewCarModal.bind(this)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* EDIT PROJECT MODAL FORM */}

          <Modal
            isOpen={this.state.editCarModal}
            toggle={this.toggleEditCarModal.bind(this)}
          >
            <ModalHeader toggle={this.toggleEditCarModal.bind(this)}>
              Edit Car
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  value={this.state.editCarData.title}
                  // function to get data from inputs, sets the state to the form values
                  onChange={e => {
                    let { editCarData } = this.state;
                    // setting the value of the input for title to state
                    editCarData.title = e.target.value;

                    this.setState({ editCarData });
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  id="description"
                  value={this.state.editCarData.description}
                  onChange={e => {
                    let { editCarData } = this.state;

                    editCarData.description = e.target.value;

                    this.setState({ editCarData });
                  }}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="URL">URL</Label>
                <Input
                  id="URL"
                  value={this.state.editCarData.URL}
                  onChange={e => {
                    let { editCarData } = this.state;

                    editCarData.URL = e.target.value;

                    this.setState({ editCarData });
                  }}
                ></Input>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.updateCar.bind(this)}>
                Update Car
              </Button>{" "}
              {/* cancel button for modal, sets modal state for open/close */}
              <Button
                color="danger"
                onClick={this.toggleEditCarModal.bind(this)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Table className="projectTable" bordered hover striped variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Model</th>
                <th>Make</th>
                <th>Owner </th>
                <th>Registration</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{cars}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
