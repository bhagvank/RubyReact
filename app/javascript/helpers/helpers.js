import { error } from './notifications';

const isValidDate = dateObj => !Number.isNaN(Date.parse(dateObj));

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validateCustomer = (customer) => {
  const errors = {};

  if (customer.name === '') {
    errors.name = 'You must enter a name';
  }

  if (!isValidDate(customer.companyregdate)) {
    errors.companyregdate = 'You must enter a valid date';
  }

  if (customer.addresss === '') {
    errors.address = 'You must enter a address';
  }

  if (customer.ssn === '') {
    errors.ssn = 'You must enter the ssn';
  }

  if (customer.company === '') {
    errors.company = 'You must enter a company';
  }

  return errors;
};

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.warn(err);
};
