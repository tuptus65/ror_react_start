# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "Logowanie i nawigacja", type: :system do
  let!(:admin) { User.find_by(name: "admin") }

  it "administrator loguje się pomyślnie i widzi panel zarządzania" do
    visit "/login"
    # Te pola muszą odpowiadać Twoim labelom lub id w Reactcie
    fill_in User.human_attribute_name(:name), with: admin.name
    fill_in User.human_attribute_name(:password), with: "password"
    click_button I18n.t("session.new.Login")

    # Sprawdzamy, czy Inertia przekierowała nas poprawnie
    expect(page).to have_content("Panel", wait: 5)
    expect(page).to have_current_path("/", ignore_query: true)

    # Przejście do admina
    # visit "/admin/users"
    click_link "Panel"
    expect(page).to have_content(I18n.t("menu.Users"), wait: 5)
    click_link I18n.t("menu.Users")
    expect(page).to have_content(admin.email)
    within "table tbody" do
      expect(page).to have_css("tr", count: 20)
    end
    within "nav#pagination" do
      expect(page).to have_link("2")
      expect(page).not_to have_link("3") # Opcjonalnie: upewniamy się, że nie ma więcej stron
    end
    click_link "2"
    within "table tbody" do
      expect(page).to have_css("tr", count: 4)
    end
    expect(page).to have_css("a.bg-blue-600", text: "2")
  end

  it "administrator pomyślnie tworzy nowego użytkownika z obrazkiem i rolami" do
    # 1. Logowanie i nawigacja
    new_user_name = "Zygfryt Tester"
    visit "/login"
    fill_in User.human_attribute_name(:name), with: admin.name
    fill_in User.human_attribute_name(:password), with: "password"
    click_button I18n.t("session.new.Login")

    click_link "Panel"
    click_link I18n.t("menu.Users")
    click_link I18n.t("users.index.new_user")

    # 2. Wypełnianie formularza
    fill_in "name", with: new_user_name
    fill_in "email", with: "zygi@example.com"
    fill_in "password", with: "password123"
    fill_in "password_confirmation", with: "password123"

    # 3. Obsługa Select Multiple
    # Wybieramy np. 'user' i 'admin' - wartości muszą odpowiadać tym z User.valid_roles
    select "user", from: "roles"
    select "admin", from: "roles"

    # 4. Upload Avatara (FileInput w Twoim form.jsx)
    # Rails.root.join('spec/fixtures/avatar.png') musi istnieć!
    attach_file "avatar", Rails.root.join('spec/fixtures/files/tux_in_circle.png')

    # 5. Zapis (Twój PrimaryButton ma tekst t('common.Save'))
    click_button I18n.t("common.Save")

    expect(page).to have_current_path(admin_users_path)
    # expect(page).to have_content("User was successfully created.")

    click_link "2" # Idziemy na drugą stronę (bo 24 + 1 = 25 userów)

    within "table tbody" do
      expect(page).to have_content(new_user_name)
      expect(page).to have_css("tr", count: 5)
      # Sprawdzamy, czy avatar się wyrenderował (w serialize_user masz url_for(user.avatar))
      expect(page).to have_css("img[src*='tux_in_circle.png']")
      expect(page).to have_css("a[href*='edit']")
    end
  end

  it "administrator widzi błędy walidacji przy próbie wysłania pustego formularza" do
    visit "/login"
    fill_in User.human_attribute_name(:name), with: admin.name
    fill_in User.human_attribute_name(:password), with: "password"
    click_button I18n.t("session.new.Login")
    click_link "Panel"
    click_link I18n.t("menu.Users")
    click_link I18n.t("users.index.new_user")

    # 1. Wysyłamy pusty formularz
    click_button I18n.t("common.Save")

    blank_error = I18n.t('errors.messages.blank')
    within(:xpath, "//div[label[@for='name']]") do
      expect(page).to have_css("p", text: blank_error)
    end
    within(:xpath, "//div[label[@for='email']]") do
      expect(page).to have_css("p", text: blank_error)
    end
    within(:xpath, "//div[label[@for='password']]") do
      expect(page).to have_css("p", text: blank_error)
    end
  end
end
