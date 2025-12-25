# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "user#{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "password" }
    confirmed_at { Time.now }
    roles_mask { 4 }

    trait :first do
      name { "first" }
      email { "first@example.com" }
      roles_mask { 4 }
    end

    trait :second do
      name { "second" }
      email { "second@example.com" }
      roles_mask { 4 }
    end

    trait :admin do
      name { "admin" }
      email { "admin@example.com" }
      roles_mask { 2 }
    end

    trait :root do
      name { "root" }
      email { "root@example.com" }
      roles_mask { 1 }
    end
  end
end
