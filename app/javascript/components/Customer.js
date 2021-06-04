import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CustomerNotFound from './CustomerNotFound';

const Customer = ({ customer, onDelete }) => {
  if (!customer) return <CustomerNotFound />;

  return (
    <div className="customerContainer">
      <h2>
        {customer.customer_date}
        {' - '}
        {customer.customer_type}
        {' '}
        <Link to={`/customers/${customer.id}/edit`}>Edit</Link>
        <button className="delete" type="button" onClick={() => onDelete(customer.id)}>
          Delete
        </button>
      </h2>
      <ul>
        <li>
          <strong>Name:</strong>
          {' '}
          {customer.name}
        </li>
        <li>
          <strong>CompanyRegisteredDate:</strong>
          {' '}
          {customer.companyregdate}
        </li>
        <li>
          <strong>Address:</strong>
          {' '}
          {customer.address}
        </li>
        <li>
          <strong>SSN:</strong>
          {' '}
          {customer.ssn}
        </li>
        <li>
          <strong>Company:</strong>
          {' '}
          {customer.company}
        </li>
        <li>
          <strong>Registered:</strong>
          {' '}
          {customer.registered ? 'yes' : 'no'}
        </li>
      </ul>
    </div>
  );
};

Customer.propTypes = {
  customer: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

Customer.defaultProps = {
  customer: undefined,
};

export default Customer;
