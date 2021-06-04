# frozen_string_literal: true

class CreateCustomers < ActiveRecord::Migration[5.2]
  def change
    create_table :customers do |t|
      t.string :address
      t.text :name
      t.string :ssn
      t.string :company
      t.boolean :registered
      t.date :companyregdate

      t.timestamps
    end
  end
end
