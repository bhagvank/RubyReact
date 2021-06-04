# frozen_string_literal: true

json = ActiveSupport::JSON.decode(File.read('db/seeds/customers.json'))
json.each do |record|
  Customer.create!(record)
end
