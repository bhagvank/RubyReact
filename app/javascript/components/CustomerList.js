/* eslint-disable camelcase */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.searchInput = React.createRef();
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updateSearchTerm() {
    this.setState({ searchTerm: this.searchInput.current.value });
  }

  matchSearchTerm(obj) {
    const {
      id, registered, created_at, updated_at, ...rest
    } = obj;
    const { searchTerm } = this.state;

    return Object.values(rest).some(
      value => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  }

  renderCustomers() {
    const { activeId, customers } = this.props;
    const filteredCustomers = customers
      .filter(el => this.matchSearchTerm(el))
      .sort((a, b) => new Date(b.companyregdate) - new Date(a.companyregdate));

    return filteredCustomers.map(customer => (
      <li key={customer.id}>
        <Link to={`/customers/${customer.id}`} className={activeId === customer.id ? 'active' : ''}>
          {customer.companyregdate}
          {' - '}
          {customer.name}
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <section className="customerList">
        <h2>
        Customers
          <Link to="/customers/new">New Customer</Link>
        </h2>

        <input
          className="search"
          placeholder="Search"
          type="text"
          ref={this.searchInput}
          onKeyUp={this.updateSearchTerm}
        />

        <ul>{this.renderCustomers()}</ul>
      </section>
    );
  }
}

CustomerList.propTypes = {
  activeId: PropTypes.number,
  customers: PropTypes.arrayOf(PropTypes.object),
};

CustomerList.defaultProps = {
  activeId: undefined,
  customers: [],
};

export default CustomerList;
