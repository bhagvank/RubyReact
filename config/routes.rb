# frozen_string_literal: true

Rails.application.routes.draw do
  root to: redirect('/events')

  get 'customers', to: 'site#index'
  get 'customers/new', to: 'site#index'
  get 'customers/:id', to: 'site#index'
  get 'customers/:id/edit', to: 'site#index'

  namespace :api do
    resources :customers, only: %i[index show create destroy update]
  end
end
