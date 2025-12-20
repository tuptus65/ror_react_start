class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest
      t.string :avatar
      t.integer :roles_mask, default: 0
      t.datetime :confirmed_at, default: nil
      t.string :confirmation_token, default: nil
      t.string :token

      t.timestamps
    end

    add_index :users, :name, unique: true
    add_index :users, :confirmation_token, unique: true
    add_index :users, :token, unique: true
  end
end
