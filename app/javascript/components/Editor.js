/* global window */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import Customer from './Customer';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import Header from './Header';
import PropsRoute from './PropsRoute';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: null,
    };

    this.addCustomer = this.addCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/customers.json')
      .then(response => this.setState({ customers: response.data }))
      .catch(handleAjaxError);
  }

  addCustomer(newCustomer) {
    axios
      .post('/api/customers.json', newCustomer)
      .then((response) => {
        success('Customer Added!');
        const savedCustomer = response.data;
        this.setState(prevState => ({
          customers: [...prevState.customers, savedCustomer],
        }));
        const { history } = this.props;
        history.push(`/customers/${savedCustomer.id}`);
      })
      .catch(handleAjaxError);
  }

  deleteCustomer(customerId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/customers/${customerId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Customer deleted successfully');
            const { history } = this.props;
            history.push('/customers');

            const { customers } = this.state;
            this.setState({ customers: customers.filter(customer => customer.id  !== customerId) });
          }
        })
        .catch(handleAjaxError);
    }
  }

  updateCustomer(updatedCustomer) {
    axios
      .put(`/api/customers/${updatedCustomer.id}.json`, updatedCustomer)
      .then(() => {
        success('Customer updated');
        const { customers } = this.state;
        const idx = customers.findIndex(customer => customer.id === updatedCustomer.id);
        customers[idx] = updatedCustomer;
        const { history } = this.props;
        history.push(`/customers/${updatedCustomer.id}`);
        this.setState({ customers });
      })
      .catch(handleAjaxError);
  }

  render() {
    const { customers } = this.state;
    if (customers === null) return null;

    const { match } = this.props;
    const customerId = match.params.id;
    const customer = customers.find(customer => customer.id === Number(customerId));

    return (
      <div>
        <Header />
        <div className="grid">
          <CustomerList customers={customers} activeId={Number(customerId)} />
          <Switch>
            <PropsRoute path="/customers/new" component={CustomerForm} onSubmit={this.addCustomer} />
            <PropsRoute
              exact
              path="/customers/:id/edit"
              component={CustomerForm}
              customer={customer}
              onSubmit={this.updateCustomer}
            />
            <PropsRoute
              path="/customers/:id"
              component={Customer}
              customer ={customer}
              onDelete={this.deleteCustomer}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
  match: undefined,
};

export default Editor;
