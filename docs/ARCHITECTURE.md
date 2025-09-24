# Архитектура приложения Cars Frontend

## Обзор архитектуры

Приложение построено на основе современных принципов разработки React-приложений с использованием функциональных компонентов, хуков и композиции.

## Архитектурные слои

### 1. Презентационный слой (Presentation Layer)
**Расположение:** `src/components/`, `src/pages/`

Отвечает за отображение пользовательского интерфейса и взаимодействие с пользователем.

#### Компоненты:
- **UI Components** (`src/components/ui/`) — базовые переиспользуемые элементы
- **Form Components** (`src/components/forms/`) — компоненты форм
- **Layout Components** (`src/components/layout/`) — компоненты макета
- **Page Components** (`src/pages/`) — компоненты страниц

#### Принципы:
- Компоненты должны быть максимально чистыми (pure)
- Бизнес-логика выносится в кастомные хуки
- Пропсы типизированы с помощью TypeScript
- Используется композиция вместо наследования

### 2. Слой состояния (State Management Layer)
**Расположение:** `src/store/`

Управляет глобальным состоянием приложения с помощью Zustand.

#### Структура:
```typescript
// Пример slice состояния
interface CarState {
  cars: Car[];
  selectedCar: Car | null;
  loading: boolean;
  error: string | null;
}

interface CarActions {
  fetchCars: () => Promise<void>;
  selectCar: (id: string) => void;
  addCar: (car: Omit<Car, 'id'>) => Promise<void>;
  updateCar: (id: string, data: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  clearError: () => void;
}

type CarStore = CarState & CarActions;
```

#### Принципы:
- Состояние разделено на логические слайсы
- Действия (actions) инкапсулируют бизнес-логику
- Используется иммутабельность
- Состояние нормализовано для оптимизации

### 3. Слой сервисов (Service Layer)
**Расположение:** `src/services/`

Содержит бизнес-логику и взаимодействие с внешними API.

#### Структура:
- **API клиенты** (`src/services/api/`) — HTTP запросы
- **Бизнес-логика** (`src/services/business/`) — доменная логика
- **Утилиты** (`src/services/utils/`) — вспомогательные функции

#### Пример API сервиса:
```typescript
export class CarService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getCars(filters?: CarFilters): Promise<Car[]> {
    return this.apiClient.get('/cars', { params: filters });
  }

  async getCarById(id: string): Promise<Car> {
    return this.apiClient.get(`/cars/${id}`);
  }

  async createCar(car: CreateCarDto): Promise<Car> {
    return this.apiClient.post('/cars', car);
  }

  async updateCar(id: string, car: UpdateCarDto): Promise<Car> {
    return this.apiClient.put(`/cars/${id}`, car);
  }

  async deleteCar(id: string): Promise<void> {
    return this.apiClient.delete(`/cars/${id}`);
  }
}
```

### 4. Слой утилит (Utility Layer)
**Расположение:** `src/utils/`, `src/hooks/`

Содержит переиспользуемые функции и кастомные хуки.

#### Кастомные хуки:
```typescript
// Пример кастомного хука для работы с API
export const useCars = () => {
  const {
    cars,
    loading,
    error,
    fetchCars,
    addCar,
    updateCar,
    deleteCar
  } = useCarStore();

  const refetch = useCallback(() => {
    fetchCars();
  }, [fetchCars]);

  return {
    cars,
    loading,
    error,
    actions: {
      fetch: fetchCars,
      add: addCar,
      update: updateCar,
      delete: deleteCar,
      refetch
    }
  };
};
```

## Поток данных (Data Flow)

### 1. Загрузка данных
```
Component → Custom Hook → Store Action → Service → API → Store State → Component
```

### 2. Пользовательские действия
```
User Interaction → Event Handler → Custom Hook → Store Action → Service → API → Store Update → Re-render
```

### 3. Навигация
```
User Action → React Router → Page Component → Data Fetching → State Update → UI Update
```

## Управление состоянием

### Локальное состояние
Используется для:
- Состояние форм
- UI состояние (открытие/закрытие модалов)
- Временные данные

```typescript
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState<FormData>(initialData);
```

### Глобальное состояние (Zustand)
Используется для:
- Данные пользователя
- Кешированные данные с сервера
- Глобальные UI настройки (тема, язык)
- Состояние аутентификации

```typescript
const useAppStore = create<AppState>((set, get) => ({
  user: null,
  theme: 'light',
  cars: [],
  
  setUser: (user) => set({ user }),
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
  setCars: (cars) => set({ cars })
}));
```

## Обработка ошибок

### Стратегии обработки:
1. **Error Boundaries** — для отлова ошибок рендеринга
2. **Try-catch** — для асинхронных операций
3. **Глобальный error handler** — для необработанных ошибок
4. **Пользовательские уведомления** — для отображения ошибок

```typescript
// Error Boundary компонент
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Отправка ошибки в систему мониторинга
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

## Маршрутизация

### Структура роутов:
```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'cars',
        children: [
          {
            index: true,
            element: <CarsListPage />
          },
          {
            path: ':id',
            element: <CarDetailsPage />
          },
          {
            path: 'create',
            element: <CreateCarPage />
          },
          {
            path: ':id/edit',
            element: <EditCarPage />
          }
        ]
      },
      {
        path: 'profile',
        element: <ProfilePage />
      }
    ]
  }
]);
```

### Защищенные роуты:
```typescript
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
```

## Производительность

### Оптимизации:
1. **React.memo** — мемоизация компонентов
2. **useMemo/useCallback** — мемоизация вычислений и функций
3. **Code splitting** — разделение кода по роутам
4. **Lazy loading** — отложенная загрузка компонентов
5. **Virtual scrolling** — для больших списков

```typescript
// Пример оптимизированного компонента
const CarCard = React.memo<CarCardProps>(({ car, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(car.id);
  }, [car.id, onSelect]);

  return (
    <div onClick={handleClick}>
      <h3>{car.name}</h3>
      <p>{car.description}</p>
    </div>
  );
});
```

## Тестирование

### Стратегия тестирования:
1. **Unit тесты** — для утилит и чистых функций
2. **Component тесты** — для React компонентов
3. **Integration тесты** — для взаимодействия компонентов
4. **E2E тесты** — для пользовательских сценариев

### Инструменты:
- **Vitest** — тестовый раннер
- **React Testing Library** — тестирование компонентов
- **MSW** — мокирование API
- **Playwright** — E2E тестирование

## Безопасность

### Меры безопасности:
1. **Валидация входных данных** — на клиенте и сервере
2. **Санитизация** — очистка пользовательских данных
3. **HTTPS** — шифрование трафика
4. **CSP** — Content Security Policy
5. **Аутентификация и авторизация** — JWT токены

```typescript
// Пример валидации
const validateCarData = (data: unknown): data is CreateCarDto => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as any).name === 'string' &&
    typeof (data as any).price === 'number' &&
    (data as any).price > 0
  );
};
```

## Мониторинг и логирование

### Инструменты:
- **React DevTools** — отладка компонентов
- **Zustand DevTools** — отладка состояния
- **Console logging** — логирование в разработке
- **Error tracking** — отслеживание ошибок в продакшене

```typescript
// Централизованное логирование
class Logger {
  static info(message: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, data);
    }
  }

  static error(message: string, error?: Error) {
    console.error(`[ERROR] ${message}`, error);
    // Отправка в систему мониторинга в продакшене
  }

  static warn(message: string, data?: any) {
    console.warn(`[WARN] ${message}`, data);
  }
}
```

## Развертывание

### CI/CD пайплайн:
1. **Lint** — проверка кода
2. **Type check** — проверка типов
3. **Tests** — запуск тестов
4. **Build** — сборка приложения
5. **Deploy** — развертывание

### Окружения:
- **Development** — локальная разработка
- **Staging** — тестовое окружение
- **Production** — продакшен

Эта архитектура обеспечивает масштабируемость, поддерживаемость и производительность приложения.
