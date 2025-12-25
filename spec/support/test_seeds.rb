# frozen_string_literal: true

module TestSeeds
  def self.seed
    FactoryBot.create(:user, :root)   # roles_mask: 1
    FactoryBot.create(:user, :admin)  # roles_mask: 2
    FactoryBot.create(:user, :first)  # roles_mask: 4
    FactoryBot.create(:user, :second) # roles_mask: 4

    # 20 dodatkowych użytkowników (wykorzystają sekwencje name i email)
    FactoryBot.create_list(:user, 20)
  end
end
