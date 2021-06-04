# frozen_string_literal: true

class Api::CustomersController < ApplicationController
  respond_to :json

  def index
    respond_with Customer.order(companyregdate: :DESC)
  end

  def show
    respond_with Customer.find(params[:id])
  end

  def create
    respond_with :api, Customer.create(customer_params)
  end

  def destroy
    respond_with Customer.destroy(params[:id])
  end

  def update
    customer = Customer.find(params['id'])
    customer.update(customer_params)
    respond_with Customer, json: customer
  end

  private

  def customer_params
    params.require(:customer).permit(
      :id,
      :name,
      :companyregdate,
      :company,
      :address,
      :ssn,
      :registered
    )
  end
end
