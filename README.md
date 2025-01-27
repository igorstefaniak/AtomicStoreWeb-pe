# AtomicStore – Aplikacja Webowa i Testy

## Wprowadzenie
**AtomicStore** to nowoczesna aplikacja webowa stworzona przy użyciu technologii **React** i **Vite**. 
Oferuje funkcjonalności umożliwiające testowanie kodu w różnych aspektach, takich jak testy jednostkowe, integracyjne, E2E oraz pokrycie testami (coverage), 
co pozwala na kompleksową weryfikację jej działania i jakości. Aby aplikacja działa potrzebne są end-pointy z aplikacji AtomicStoreAPI i zainstalowany node.js wraz z
odpowiednimi bibliotekami.

---

## Uruchamianie aplikacji i testów

### Uruchamianie aplikacji w trybie deweloperskim
    npm run dev

### Uruchamianie różnych rodzajów testów

- **Testy jednostkowe i integracyjne**
    npm run test

- **Testy E2E (End-to-End)**
    npm run test:e2e

- **Sprawdzenie pokrycia testami (coverage)**
    npm run test:coverage

---

## Testy aplikacji

### Testy integracyjne
Przykładowy test integracyjny to `ProductList.test.jsx`. Łączy on dane komponentu `ProductList.jsx` z jego podkomponentem `ProductRow.jsx`, odpowiedzialnym za wyświetlanie i weryfikację danych.

### Testy E2E (Cypress)
Testy E2E są stworzone za pomocą frameworka **Cypress**, umożliwiającego testowanie aplikacji w rzeczywistym środowisku przeglądarkowym.

#### Lokalizacja testów Cypress:
- Admin: `./cypress/e2e/Admin.cy.js`
- User: `./cypress/e2e/User.cy.js`

Testy te obejmują kluczowe ścieżki użytkownika, takie jak:
- Logowanie
- Przeglądanie produktów
- Zarządzanie produktami jako administrator

### Testy MOCK
#### Przykłady testów mock:
- `ProductRow.test.jsx` – Weryfikuje poprawność wyświetlania danych przy użyciu zmockowanych wartości.
- `ProductContext.test.jsx` – Testuje działanie kontekstu aplikacji (np. zarządzanie stanem produktów).
- `LoginForm.test.jsx` – Sprawdza poprawność działania formularza logowania przy użyciu zmockowanych funkcji i danych.

#### Fixture w testach
W testach formularza logowania (`LoginForm.test.jsx`) wykorzystano **fixture** – zestaw wcześniej przygotowanych danych testowych,
 co umożliwia bardziej przewidywalne testowanie.

---

## Generowanie raportów

### Lokalizacje raportów:
- **Raport z pokrycia testami**
    ./coverage/Icov-report/index.html

- **Raport z testów (np. E2E)**
    ./html-report/report.html

---

## Narzędzia używane w projekcie

- **JEST** – Biblioteka do testowania aplikacji napisanych w JavaScript. Stosowana głównie do testów jednostkowych i integracyjnych.
- **Cypress** – Framework testowy umożliwiający testowanie E2E w przeglądarce, co pozwala na testy w warunkach zbliżonych do rzeczywistych.
- **Vite** – Szybkie i nowoczesne narzędzie do budowania aplikacji frontendowych, zapewniające szybsze uruchamianie projektu oraz wsparcie dla najnowszych standardów JavaScript.
- **ESLint** – Narzędzie do statycznej analizy kodu, pomagające w wykrywaniu problemów i utrzymaniu dobrych praktyk programistycznych.

---

## Podsumowanie
**AtomicStore** to aplikacja webowa wspierająca nowoczesne podejście do rozwoju i testowania. Dzięki testom integracyjnym, 
E2E oraz mockom możliwe jest kompleksowe sprawdzenie funkcjonalności – od pojedynczego komponentu po pełne ścieżki użytkownika. 
Generowane raporty HTML ułatwiają analizę wyników testów, wspierając proces zapewnienia jakości kodu. 
Wykorzystane narzędzia, takie jak **Jest**, **Cypress** czy **ESLint**, zapewniają zgodność projektu z aktualnymi standardami w web developmentcie.

## Autor
**Igor Stefaniak**