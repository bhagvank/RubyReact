import React from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';
import { Link } from 'react-router-dom';
import { formatDate, isEmptyObject, validateCustomer } from '../helpers/helpers';
import CustomerNotFound from './CustomerNotFound';
import 'pikaday/css/pikaday.css';

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: props.customer,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.dateInput = React.createRef();
  }

  componentDidMount() {
    /* eslint-disable no-new */
    new Pikaday({
      field: this.dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        this.dateInput.current.value = formattedDate;
        this.updateCustomer('companyregdate', formattedDate);
      },
    });
  }

  componentWillReceiveProps({ customer }) {
    this.setState({ customer });
  }

  updateCustomer(key, value) {
    this.setState(prevState => ({
      customer: {
        ...prevState.customer,
        [key]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { customer } = this.state;
    const errors = validateCustomer(customer);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(customer);
    }
  }

  handleInputChange(customer) {
    const { target } = customer;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.updateCustomer(name, value);
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the customer from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { customer } = this.state;
    const { path } = this.props;

    if (!customer.id && path === '/customers/:id/edit') return <CustomerNotFound />;

    const cancelURL = customer.id ? `/customers/${customer.id}` : '/customers';
    const address = customer.id ? `${customer.companyregdate} - ${customer.name}` : 'New Customer';

    return (
      <div>
        <h2>{address}</h2>

        {this.renderErrors()}

        <form className="customerForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">
              <strong>Name:</strong>
              <input
                type="text"
                id="name"
                name="name"
                onChange={this.handleInputChange}
                value={customer.name}
              />
            </label>
          </div>
          <div>
            <label htmlFor="companyregdate">
              <strong>CompanyRegisteredDate:</strong>
              <input
                type="text"
                id="companyregdate"
                name="companyregdate"
                ref={this.dateInput}
                autoComplete="off"
                value={customer.companyregdate}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="address">
              <strong>Address:</strong>
              <textarea
                cols="30"
                rows="10"
                id="address"
                name="address"
                onChange={this.handleInputChange}
                value={customer.address}
              />
            </label>
          </div>
          <div>
            <label htmlFor="ssn">
              <strong>SSN:</strong>
              <input
                type="text"
                id="ssn"
                name="ssn"
                onChange={this.handleInputChange}
                value={customer.ssn}
              />
            </label>
          </div>
          <div>
            <label htmlFor="company">
              <strong>Company:</strong>
              <input
                type="text"
                id="company"
                name="company"
                onChange={this.handleInputChange}
                value={customer.company}
              />
            </label>
          </div>
          <div>
            <label htmlFor="registered">
              <strong>Registered:</strong>
              <input
                type="checkbox"
                id="registered"
                name="registered"
                onChange={this.handleInputChange}
                checked={customer.registered}
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

CustomerForm.propTypes = {
  customer: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

CustomerForm.defaultProps = {
  customer: {
    name: '',
    companyregdate: '',
    address: '',
    ssn: '',
    company: '',
    registered: false,
  },
};

export default CustomerForm;
