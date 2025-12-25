# RoR + React Start Project

Nowoczesny boilerplate łączący **Ruby on Rails 8+** z frontendem **React 19** oraz systemem budowania **Vite**. Aplikacja wykorzystuje **Inertia.js**, co pozwala na budowanie nowoczesnych Single Page Apps przy zachowaniu klasycznego modelu programowania Rails (bez konieczności budowania oddzielnego API JSON).

## 🚀 Technologie i Pakiety

### Backend:
* **Ruby on Rails 8.1.1**
* **Active Storage** – obsługa plików i awatarów.
* **Inertia Rails** – łącznik między Rails a Reactem.
* **js-routes** – dostęp do tras Railsowych bezpośrednio w JavaScript.
* **i18n-js** – obsługa tłumaczeń po stronie frontendu.

### Frontend:
* **React 19**
* **Vite** – ultraszybki system budowania i Hot Module Replacement (HMR).
* **Tailwind CSS 4** – najnowsza wersja frameworka CSS.
* **@inertiajs/react** – obsługa routingu i stanu po stronie klienta.
* **blueimp-md5** – generowanie hashy dla wsparcia Gravatara.
* **React Icons** & **Heroicons** – zestawy ikon.

---

## 🛠 Uruchomienie w Dev Container (RubyMine)

Projekt jest w pełni skonfigurowany do pracy w **Dev Container**, co eliminuje potrzebę lokalnej instalacji Ruby, Node.js czy PostgreSQL.

1. **Inicjalizacja:** W RubyMine wybierz opcję **"New Dev Container..."** (dostępną na ekranie powitalnym lub w menu *File | Remote Development*).
2. **Konfiguracja:** Wybierz opcję "Docker" i wskaż plik `.devcontainer/devcontainer.json` znajdujący się w repozytorium.
3. **Budowanie:** RubyMine automatycznie zbuduje obraz i uruchomi kontener z zainstalowanymi wszystkimi zależnościami.
4. **Interpreter:** RubyMine zapyta o skonfigurowanie interpretera oraz instalację gemów, co zapewni pełne wsparcie IDE dla gemów i paczek npm.

### Inicjalizacja bazy danych:
Po wejściu do terminala w kontenerze, wykonaj poniższą komendę, aby przygotować bazę i załadować dane startowe:
```bash
bin/rails db:prepare db:seed
```

### Użytkownicy Testowi
Po wykonaniu db:seed, w bazie zostaną utworzeni użytkownicy z następującymi uprawnieniami (wszyscy posiadają hasło: password):

root@example.com – Superadmin z pełnym dostępem.

admin@example.com – Administrator systemu.

first@example.com – Standardowy użytkownik testowy.

---
## 💻 Praca z projektem i uruchamianie
### Serwer deweloperski
Aplikacja wykorzystuje bin/dev do równoległego uruchamiania serwera Rails oraz procesu Vite:

```bash
bin/dev
```

Aplikacja będzie dostępna pod adresem: http://localhost:3000

### Generowanie Tras i Tłumaczeń
Pliki routes.js oraz tłumaczenia są ignorowane przez Git (.gitignore), ponieważ generują się automatycznie. Jeśli potrzebujesz ich ręcznej regeneracji:

bundle exec rails js:routes – generuje plik app/javascript/routes.js (w środowisku testowym generowny automatycznie).

bundle exec i18n export – eksportuje tłumaczenia do JS.
---
### 🧪 Testowanie i Jakość Kodu
Projekt posiada skonfigurowany zestaw testów RSpec (Request Specs oraz System Tests).

```bash

# Uruchomienie wszystkich testów:
bundle exec rspec

# Tylko testy systemowe (E2E) w trybie Headless Chrome:
bundle exec rspec spec/system
```

### GitHub Actions (CI)
Plik .github/workflows/ci.yml automatyzuje weryfikację każdego Pull Requesta w ramach czterech wyspecjalizowanych zadań:

1. Scan Ruby: Statyczna analiza bezpieczeństwa (Brakeman) oraz skanowanie gemów pod kątem znanych podatności (Bundler Audit).

2. Lint: Sprawdzanie stylu kodowania Ruby zgodnie z regułami (RuboCop) z wykorzystaniem pamięci podręcznej (cache).

3. Test: Uruchomienie testów Request. Zadanie to instaluje Node.js, generuje trasy/tłumaczenia, buduje assety Vite w trybie testowym oraz przygotowuje bazę PostgreSQL.

4. System-test: Uruchomienie pełnych testów systemowych (E2E). W przypadku niepowodzenia, artefakty (zrzuty ekranu) są zachowywane do debugowania.
---
### 📁 Struktura folderów
app/javascript/Pages/ – Komponenty React pełniące rolę widoków.

app/javascript/components/ – Reużywalne komponenty (np. Avatar z fallbackiem do Gravatar Initials).

app/javascript/Layouts/ – Główne szablony stron.

spec/ – Katalog z testami RSpec.