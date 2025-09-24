# Структура папок проекта Cars Frontend

## Общая структура

```
carsFE/
├── public/                 # Статические файлы
├── src/                   # Исходный код приложения
├── docs/                  # Документация
├── tests/                 # Тесты
├── .github/              # GitHub workflows
├── config/               # Конфигурационные файлы
└── scripts/              # Скрипты сборки и развертывания
```

## Детальная структура папки `src/`

### 📁 `src/components/` — Переиспользуемые UI-компоненты

Содержит все переиспользуемые компоненты пользовательского интерфейса.

```
src/components/
├── ui/                    # Базовые UI элементы
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   ├── Button.stories.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   ├── Modal/
│   ├── Spinner/
│   ├── Toast/
│   └── index.ts          # Экспорт всех UI компонентов
│
├── forms/                 # Компоненты форм
│   ├── CarForm/
│   │   ├── CarForm.tsx
│   │   ├── CarForm.types.ts
│   │   ├── CarForm.test.tsx
│   │   └── index.ts
│   ├── SearchForm/
│   ├── FilterForm/
│   └── index.ts
│
├── layout/               # Компоненты макета
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   └── index.ts
│   ├── Sidebar/
│   ├── Footer/
│   ├── Layout/
│   └── index.ts
│
├── cards/               # Карточки для отображения данных
│   ├── CarCard/
│   ├── UserCard/
│   └── index.ts
│
└── index.ts            # Экспорт всех компонентов
```

**Принципы организации:**
- Каждый компонент в отдельной папке
- Файл компонента, стили, тесты и типы в одной папке
- index.ts для удобного импорта
- Соглашение об именовании: PascalCase для папок и файлов

### 📁 `src/pages/` — Страницы приложения (роуты)

Содержит компоненты страниц, связанные с роутингом.

```
src/pages/
├── Home/
│   ├── HomePage.tsx
│   ├── HomePage.module.css
│   ├── HomePage.test.tsx
│   └── index.ts
│
├── Cars/
│   ├── CarsListPage/
│   │   ├── CarsListPage.tsx
│   │   ├── CarsListPage.hooks.ts    # Кастомные хуки страницы
│   │   ├── CarsListPage.types.ts
│   │   ├── CarsListPage.test.tsx
│   │   └── index.ts
│   ├── CarDetailsPage/
│   ├── CreateCarPage/
│   ├── EditCarPage/
│   └── index.ts
│
├── Profile/
│   ├── ProfilePage/
│   ├── SettingsPage/
│   └── index.ts
│
├── Auth/
│   ├── LoginPage/
│   ├── RegisterPage/
│   └── index.ts
│
├── Error/
│   ├── NotFoundPage/
│   ├── ErrorPage/
│   └── index.ts
│
└── index.ts
```

**Особенности:**
- Каждая страница может иметь свои хуки и типы
- Группировка связанных страниц в подпапки
- Страницы ошибок в отдельной группе

### 📁 `src/store/` — Глобальный стейт (Zustand)

Управление глобальным состоянием приложения.

```
src/store/
├── slices/               # Отдельные части состояния
│   ├── auth/
│   │   ├── authSlice.ts
│   │   ├── authSlice.types.ts
│   │   ├── authSlice.test.ts
│   │   └── index.ts
│   ├── cars/
│   │   ├── carsSlice.ts
│   │   ├── carsSlice.types.ts
│   │   ├── carsSlice.test.ts
│   │   └── index.ts
│   ├── ui/
│   │   ├── uiSlice.ts      # Глобальные UI состояния
│   │   ├── themeSlice.ts   # Управление темой
│   │   └── index.ts
│   └── index.ts
│
├── types/               # Общие типы для состояния
│   ├── index.ts
│   ├── auth.types.ts
│   ├── cars.types.ts
│   └── ui.types.ts
│
├── middleware/          # Middleware для Zustand
│   ├── logger.ts
│   ├── persist.ts
│   └── index.ts
│
├── utils/              # Утилиты для работы с состоянием
│   ├── storeUtils.ts
│   └── index.ts
│
└── index.ts           # Главный store
```

**Структура слайса:**
```typescript
// Пример структуры authSlice.ts
export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  clearError: () => void;
}

export type AuthSlice = AuthState & AuthActions;
```

### 📁 `src/services/` — API и бизнес-логика

Содержит сервисы для работы с API и бизнес-логику.

```
src/services/
├── api/                # HTTP клиенты и API endpoints
│   ├── client/
│   │   ├── apiClient.ts      # Базовый HTTP клиент
│   │   ├── interceptors.ts   # Перехватчики запросов
│   │   ├── endpoints.ts      # Конфигурация endpoints
│   │   └── index.ts
│   ├── cars/
│   │   ├── carsApi.ts
│   │   ├── carsApi.types.ts
│   │   ├── carsApi.test.ts
│   │   └── index.ts
│   ├── auth/
│   ├── users/
│   └── index.ts
│
├── business/           # Бизнес-логика
│   ├── carService.ts
│   ├── authService.ts
│   ├── validationService.ts
│   └── index.ts
│
├── utils/             # Утилиты для сервисов
│   ├── apiUtils.ts
│   ├── errorHandler.ts
│   ├── requestUtils.ts
│   └── index.ts
│
└── index.ts
```

**Пример структуры API сервиса:**
```typescript
// carsApi.ts
export class CarsApi {
  constructor(private client: ApiClient) {}

  async getCars(params?: GetCarsParams): Promise<Car[]> {
    return this.client.get('/cars', { params });
  }

  async getCarById(id: string): Promise<Car> {
    return this.client.get(`/cars/${id}`);
  }
  
  // ... другие методы
}
```

### 📁 `src/theme/` — Темизация

Настройки темы, цветов и стилей.

```
src/theme/
├── colors/
│   ├── colors.ts          # Цветовые палитры
│   ├── lightTheme.ts      # Светлая тема
│   ├── darkTheme.ts       # Тёмная тема
│   └── index.ts
│
├── typography/
│   ├── fonts.ts           # Настройки шрифтов
│   ├── typography.ts      # Типографические стили
│   └── index.ts
│
├── components/
│   ├── button.theme.ts    # Стили для Button
│   ├── input.theme.ts     # Стили для Input
│   └── index.ts
│
├── breakpoints/
│   ├── breakpoints.ts     # Точки перелома для адаптива
│   └── index.ts
│
├── animations/
│   ├── transitions.ts     # Анимации и переходы
│   └── index.ts
│
├── globals/
│   ├── reset.css         # CSS reset
│   ├── variables.css     # CSS переменные
│   └── globals.css       # Глобальные стили
│
└── index.ts             # Главная тема
```

### 📁 `src/utils/` — Вспомогательные функции

Утилиты общего назначения.

```
src/utils/
├── formatters/
│   ├── dateFormatter.ts
│   ├── numberFormatter.ts
│   ├── stringFormatter.ts
│   └── index.ts
│
├── validators/
│   ├── formValidators.ts
│   ├── dataValidators.ts
│   ├── schemaValidators.ts
│   └── index.ts
│
├── helpers/
│   ├── arrayHelpers.ts
│   ├── objectHelpers.ts
│   ├── urlHelpers.ts
│   └── index.ts
│
├── constants/
│   ├── api.constants.ts
│   ├── app.constants.ts
│   ├── routes.constants.ts
│   └── index.ts
│
├── storage/
│   ├── localStorage.ts
│   ├── sessionStorage.ts
│   └── index.ts
│
└── index.ts
```

### 📁 `src/hooks/` — Кастомные React хуки

Переиспользуемые хуки для общей логики.

```
src/hooks/
├── api/
│   ├── useCars.ts
│   ├── useAuth.ts
│   ├── useApi.ts          # Базовый хук для API
│   └── index.ts
│
├── ui/
│   ├── useModal.ts
│   ├── useToast.ts
│   ├── useTheme.ts
│   ├── useLocalStorage.ts
│   └── index.ts
│
├── forms/
│   ├── useForm.ts
│   ├── useFormValidation.ts
│   └── index.ts
│
├── navigation/
│   ├── useRouter.ts
│   ├── useBreadcrumbs.ts
│   └── index.ts
│
└── index.ts
```

### 📁 `src/types/` — Глобальные типы TypeScript

Общие типы для всего приложения.

```
src/types/
├── api/
│   ├── common.types.ts    # Общие API типы
│   ├── request.types.ts   # Типы запросов
│   ├── response.types.ts  # Типы ответов
│   └── index.ts
│
├── entities/
│   ├── Car.types.ts
│   ├── User.types.ts
│   ├── Auth.types.ts
│   └── index.ts
│
├── ui/
│   ├── component.types.ts # Общие типы компонентов
│   ├── theme.types.ts     # Типы темы
│   └── index.ts
│
├── utils/
│   ├── common.types.ts    # Общие утилитарные типы
│   └── index.ts
│
└── index.ts              # Экспорт всех типов
```

## Дополнительные папки

### 📁 `public/` — Статические файлы

```
public/
├── icons/               # Иконки
├── images/             # Изображения
├── fonts/              # Шрифты
├── favicon.ico
├── manifest.json
└── robots.txt
```

### 📁 `docs/` — Документация

```
docs/
├── ARCHITECTURE.md     # Архитектура
├── FOLDER_STRUCTURE.md # Структура папок
├── DEVELOPMENT.md      # Руководство разработчика
├── COMPONENTS.md       # Стандарты компонентов
├── API.md             # Документация API
└── DEPLOYMENT.md      # Развертывание
```

### 📁 `tests/` — Тесты

```
tests/
├── __mocks__/         # Моки для тестов
├── fixtures/          # Тестовые данные
├── helpers/           # Вспомогательные функции для тестов
├── integration/       # Интеграционные тесты
├── e2e/              # End-to-end тесты
└── setup.ts          # Настройка тестов
```

### 📁 `config/` — Конфигурация

```
config/
├── vite.config.ts     # Конфигурация Vite
├── tailwind.config.js # Конфигурация Tailwind
├── tsconfig.json      # Конфигурация TypeScript
├── eslint.config.js   # Конфигурация ESLint
├── prettier.config.js # Конфигурация Prettier
└── env/
    ├── .env.development
    ├── .env.staging
    └── .env.production
```

## Соглашения об именовании

### Файлы и папки:
- **Компоненты**: PascalCase (`Button.tsx`, `CarCard.tsx`)
- **Хуки**: camelCase с префиксом `use` (`useAuth.ts`, `useCars.ts`)
- **Утилиты**: camelCase (`dateFormatter.ts`, `apiUtils.ts`)
- **Типы**: PascalCase с суффиксом `.types.ts` (`Car.types.ts`)
- **Константы**: UPPER_SNAKE_CASE (`API_ENDPOINTS`, `DEFAULT_CONFIG`)
- **Папки**: PascalCase для компонентов, camelCase для остальных

### Импорты и экспорты:
```typescript
// Именованный экспорт для компонентов
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

// Экспорт по умолчанию для страниц
const HomePage: React.FC = () => {
  return <div>Home Page</div>;
};

export default HomePage;

// Реэкспорт в index.ts
export { Button } from './Button';
export { default as HomePage } from './HomePage';
```

## Принципы организации

1. **Модульность** — каждый модуль имеет четко определенную ответственность
2. **Переиспользуемость** — компоненты и утилиты легко переиспользовать
3. **Тестируемость** — структура способствует написанию тестов
4. **Масштабируемость** — легко добавлять новые функции
5. **Читаемость** — понятная структура и именование

Эта структура обеспечивает четкую организацию кода, легкость навигации и поддержки проекта.
