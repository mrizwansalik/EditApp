import React from "react";
import idGenerator from "react-id-generator";

export default class App extends React.Component {
  state = {
    employees: [],
    firstname: "",
    lastname: "",
    id: 0,
    create: true
  };
  componentDidMount() {
    //Intializing sample data
    const emps = [
      { firstname: "John", lastname: "Doe", id: 0 },
      { firstname: "Bruno", lastname: "Mars", id: 0 }
    ];
    this.setState({
      employees: emps.map(e => {
        return {
          firstname: e.firstname,
          lastname: e.lastname,
          id: idGenerator()
        };
      })
    });
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleCreateEmployee = () => {
    if (this.state.employees) {
      this.setState({
        employees: [
          ...this.state.employees,
          {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            id: idGenerator()
          }
        ]
      });
    } else {
      this.setState({
        employees: [
          {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            id: idGenerator()
          }
        ]
      });
    }
    this.setState({ firstname: "", lastname: "" });
  };

  handleEdit = e => {
    const employee = this.state.employees.find((emp) => {
      if (emp.id === e.target.id) {
        return emp;
      }
    });
    this.setState({
      firstname: employee.firstname,
      lastname: employee.lastname,
      id: employee.id,
      create: false
    });
  };
  handleDelete = e => {
    this.setState({
      employees: this.state.employees.filter((emp) => {
        if (emp.id !== e.target.id) return emp;
      })
    });
  };
  handleUpdateEmployee = () => {
    const employee = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      id: this.state.id
    };
    const employeesupdated = this.state.employees.map(emp => {
      if (emp.id === this.state.id) {
        return employee;
      } else return emp;
    });

    this.setState((prevStae, props) => ({
      employees: employeesupdated,
      create: true,
      firstname: "",
      lastname: ""
    }));
  };

  render() {
    const create = this.state.create ? "Save" : "Update";
    const { employees } = this.state;
    const inputIsEmpty =
      this.state.firstname === "" || this.state.lastname === "" ? true : false;
    return (
      <div>
        <input
          style={{ width: 120 }}
          type="text"
          placeholder="Enter Firstname"
          onChange={this.handleChange}
          name="firstname"
          value={this.state.firstname}
        />
        <input
          style={{ width: 120 }}
          type="text"
          placeholder="Enter Firstname"
          onChange={this.handleChange}
          name="lastname"
          value={this.state.lastname}
        />

        <button
          style={{ width: 150 }}
          disabled={inputIsEmpty}
          onClick={
            this.state.create
              ? this.handleCreateEmployee
              : this.handleUpdateEmployee
          }
        >
          {create}
        </button>
        <br />
        <table border="1" style={{ width: 400, paddingTop: 5 }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => {
              return (
                <tr key={i}>
                  <td>{emp.firstname}</td>
                  <td>{emp.lastname}</td>
                  <td>
                    <button onClick={this.handleEdit} id={emp.id}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={this.handleDelete} id={emp.id}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}