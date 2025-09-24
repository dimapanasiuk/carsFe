# Руководство по разработке Cars Frontend

## Настройка окружения разработки

### Предварительные требования

- **Node.js** версии 18.0.0 или выше
- **npm** версии 9.0.0 или выше (или **yarn** 3.0.0+)
- **Git** для контроля версий
- **VS Code** (рекомендуемый редактор)

### Установка и запуск

```bash
# Клонирование репозитория
git clone [repository-url]
cd carsFE

# Установка зависимостей
npm install

# Копирование файла окружения
cp .env.example .env.local

# Запуск в режиме разработки
npm run dev

# Приложение будет доступно по адресу http://localhost:5173
```

### Переменные окружения

Создайте файл `.env.local` со следующими переменными:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000

# Authentication
VITE_JWT_SECRET=your-jwt-secret-key

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANALYTICS=false

# Development
VITE_LOG_LEVEL=debug
VITE_MOCK_API=false
```

## Команды разработки

### Основные команды

```bash
# Запуск сервера разработки
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview

# Проверка типов TypeScript
npm run type-check

# Линтинг кода
npm run lint

# Исправление ошибок линтера
npm run lint:fix

# Форматирование кода
npm run format

# Запуск тестов
npm run test

# Запуск тестов в watch режиме
npm run test:watch

# Покрытие тестами
npm run test:coverage

# E2E тесты
npm run test:e2e
```

### Дополнительные команды

```bash
# Анализ размера bundle
npm run analyze

# Проверка безопасности зависимостей
npm audit

# Обновление зависимостей
npm run deps:update

# Генерация компонента
npm run generate:component ComponentName

# Генерация хука
npm run generate:hook useHookName

# Генерация страницы
npm run generate:page PageName
```

## Настройка редактора (VS Code)

### Рекомендуемые расширения

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "usernamehw.errorlens",
    "gruntfuggly.todo-tree",
    "bradlc.vscode-tailwindcss"
  ]
}
```

### Настройки VS Code

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### Сниппеты для компонентов

```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "interface ${1:Component}Props {",
      "  ${2:// props}",
      "}",
      "",
      "export const ${1:Component}: React.FC<${1:Component}Props> = ({",
      "  ${3:// destructured props}",
      "}) => {",
      "  return (",
      "    <div>",
      "      ${4:// component content}",
      "    </div>",
      "  );",
      "};"
    ],
    "description": "Create a React functional component with TypeScript"
  }
}
```

## Процесс разработки

### Git Workflow

#### Ветки
- `main` — основная ветка (продакшен)
- `develop` — ветка разработки
- `feature/feature-name` — ветки для новых функций
- `bugfix/bug-description` — ветки для исправления багов
- `hotfix/critical-fix` — критические исправления

#### Процесс работы с ветками

```bash
# Создание новой feature ветки
git checkout develop
git pull origin develop
git checkout -b feature/add-car-search

# Работа над функцией
git add .
git commit -m "feat: add car search functionality"

# Пуш ветки
git push origin feature/add-car-search

# Создание Pull Request через GitHub/GitLab
```

#### Соглашения о коммитах (Conventional Commits)

```bash
# Новая функция
git commit -m "feat: add car filtering by brand"

# Исправление бага
git commit -m "fix: resolve car list loading issue"

# Документация
git commit -m "docs: update API documentation"

# Стили (форматирование, отступы)
git commit -m "style: fix indentation in CarCard component"

# Рефакторинг
git commit -m "refactor: extract car validation logic"

# Тесты
git commit -m "test: add tests for car service"

# Сборка/CI
git commit -m "build: update webpack configuration"

# Производительность
git commit -m "perf: optimize car list rendering"

# Прочие изменения
git commit -m "chore: update dependencies"
```

### Code Review

#### Чеклист для автора PR

- [ ] Код соответствует стандартам проекта
- [ ] Добавлены/обновлены тесты
- [ ] Документация обновлена при необходимости
- [ ] Нет console.log в коде
- [ ] Проверены типы TypeScript
- [ ] Линтер не показывает ошибок
- [ ] Тесты проходят успешно
- [ ] Проверена производительность
- [ ] Проверена доступность (a11y)

#### Чеклист для ревьюера

- [ ] Логика понятна и корректна
- [ ] Код читаем и поддерживаем
- [ ] Соблюдены принципы SOLID
- [ ] Нет дублирования кода
- [ ] Правильно обработаны ошибки
- [ ] Безопасность учтена
- [ ] Производительность оптимальна

### Тестирование

#### Типы тестов

1. **Unit тесты** — тестирование отдельных функций и компонентов
2. **Integration тесты** — тестирование взаимодействия компонентов
3. **E2E тесты** — тестирование пользовательских сценариев

#### Примеры тестов

```typescript
// Unit тест для утилиты
describe('formatPrice', () => {
  it('should format price with currency', () => {
    expect(formatPrice(1000)).toBe('$1,000.00');
  });

  it('should handle zero price', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});

// Тест компонента
describe('CarCard', () => {
  it('should render car information', () => {
    const car = { id: '1', name: 'Toyota Camry', price: 25000 };
    
    render(<CarCard car={car} />);
    
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('$25,000.00')).toBeInTheDocument();
  });

  it('should call onSelect when clicked', () => {
    const onSelect = jest.fn();
    const car = { id: '1', name: 'Toyota Camry', price: 25000 };
    
    render(<CarCard car={car} onSelect={onSelect} />);
    
    fireEvent.click(screen.getByTestId('car-card'));
    
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
```

#### Покрытие тестами

Минимальные требования к покрытию:
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

```bash
# Проверка покрытия
npm run test:coverage

# Генерация отчета
npm run test:coverage:report
```

## Стандарты кодирования

### TypeScript

#### Типизация

```typescript
// Хорошо: строгая типизация
interface Car {
  id: string;
  name: string;
  brand: string;
  price: number;
  year: number;
  createdAt: Date;
}

// Плохо: использование any
const car: any = { /* ... */ };

// Хорошо: использование generic
function createApiClient<T>(baseUrl: string): ApiClient<T> {
  return new ApiClient<T>(baseUrl);
}

// Хорошо: union types
type Theme = 'light' | 'dark';
type Status = 'loading' | 'success' | 'error';
```

#### Именование

```typescript
// Интерфейсы и типы - PascalCase
interface UserProfile {
  name: string;
  email: string;
}

type ApiResponse<T> = {
  data: T;
  status: number;
};

// Переменные и функции - camelCase
const userName = 'John Doe';
const getUserProfile = async (id: string) => { /* ... */ };

// Константы - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// Компоненты - PascalCase
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return <div>{user.name}</div>;
};
```

### React компоненты

#### Структура компонента

```typescript
// 1. Импорты
import React, { useState, useEffect, useCallback } from 'react';
import { Car } from '@/types';
import { Button } from '@/components/ui';
import styles from './CarCard.module.css';

// 2. Типы
interface CarCardProps {
  car: Car;
  onSelect?: (id: string) => void;
  className?: string;
}

// 3. Компонент
export const CarCard: React.FC<CarCardProps> = ({
  car,
  onSelect,
  className = ''
}) => {
  // 4. Состояние
  const [isLoading, setIsLoading] = useState(false);

  // 5. Эффекты
  useEffect(() => {
    // логика эффекта
  }, []);

  // 6. Обработчики
  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect(car.id);
    }
  }, [car.id, onSelect]);

  // 7. Условный рендеринг
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 8. Основной рендер
  return (
    <div className={`${styles.card} ${className}`}>
      <h3>{car.name}</h3>
      <p>{car.brand}</p>
      <Button onClick={handleSelect}>Select</Button>
    </div>
  );
};
```

### Стили

#### Tailwind CSS

```typescript
// Хорошо: используйте семантичные классы
<div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">
    Car Details
  </h2>
</div>

// Для сложных стилей используйте cva (class-variance-authority)
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 bg-white hover:bg-gray-50",
        ghost: "hover:bg-gray-100"
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
```

### Обработка ошибок

```typescript
// Хорошо: обработка ошибок в async функциях
const fetchCars = async (): Promise<Car[]> => {
  try {
    const response = await api.get('/cars');
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(`Failed to fetch cars: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching cars');
  }
};

// Хорошо: Error Boundary для React компонентов
class CarListErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CarList error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

## Производительность

### Оптимизация React

```typescript
// Мемоизация компонентов
const CarCard = React.memo<CarCardProps>(({ car, onSelect }) => {
  return <div>{/* компонент */}</div>;
});

// Мемоизация вычислений
const ExpensiveComponent: React.FC = () => {
  const expensiveValue = useMemo(() => {
    return calculateExpensiveValue();
  }, [dependency]);

  const handleClick = useCallback(() => {
    // обработчик
  }, [dependency]);

  return <div>{expensiveValue}</div>;
};

// Lazy loading компонентов
const LazyCarDetails = React.lazy(() => import('./CarDetails'));

// Использование с Suspense
<Suspense fallback={<Loading />}>
  <LazyCarDetails />
</Suspense>
```

### Оптимизация bundle

```typescript
// Динамические импорты
const loadCarModule = async () => {
  const module = await import('./CarModule');
  return module.default;
};

// Tree shaking - импортируйте только нужные функции
import { debounce } from 'lodash-es';
// Вместо
import _ from 'lodash';
```

## Отладка

### React DevTools

- Установите расширение React DevTools
- Используйте Profiler для анализа производительности
- Отслеживайте изменения состояния

### Zustand DevTools

```typescript
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      // состояние
    }),
    {
      name: 'car-store',
    }
  )
);
```

### Логирование

```typescript
// Используйте централизованное логирование
import { logger } from '@/utils/logger';

const CarService = {
  async fetchCars() {
    logger.info('Fetching cars...');
    
    try {
      const cars = await api.getCars();
      logger.info('Cars fetched successfully', { count: cars.length });
      return cars;
    } catch (error) {
      logger.error('Failed to fetch cars', error);
      throw error;
    }
  }
};
```

## Развертывание

### Сборка для продакшена

```bash
# Сборка
npm run build

# Проверка сборки
npm run preview

# Анализ размера bundle
npm run analyze
```

### Переменные окружения для продакшена

```env
VITE_API_BASE_URL=https://api.production.com
VITE_LOG_LEVEL=error
VITE_ENABLE_ANALYTICS=true
VITE_MOCK_API=false
```

### Чеклист перед релизом

- [ ] Все тесты проходят
- [ ] Нет console.log в коде
- [ ] Переменные окружения настроены
- [ ] Bundle оптимизирован
- [ ] Производительность проверена
- [ ] Доступность протестирована
- [ ] Кроссбраузерность проверена
- [ ] Мобильная версия работает
- [ ] SEO оптимизировано

Следуя этому руководству, вы сможете эффективно разрабатывать и поддерживать высококачественное React приложение.
