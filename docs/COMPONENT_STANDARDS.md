# Стандарты компонентов и код-стайл

## Общие принципы

### 1. Принцип единой ответственности
Каждый компонент должен иметь одну четко определенную ответственность.

```typescript
// ✅ Хорошо: компонент отвечает только за отображение карточки автомобиля
const CarCard: React.FC<CarCardProps> = ({ car, onSelect }) => {
  return (
    <div className="car-card">
      <h3>{car.name}</h3>
      <p>{car.price}</p>
      <Button onClick={() => onSelect(car.id)}>Select</Button>
    </div>
  );
};

// ❌ Плохо: компонент делает слишком много
const CarCardWithEverything: React.FC = () => {
  // Загружает данные
  // Управляет состоянием
  // Отправляет аналитику
  // Обрабатывает формы
  // Рендерит UI
};
```

### 2. Композиция над наследованием
Используйте композицию компонентов вместо наследования.

```typescript
// ✅ Хорошо: композиция
const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const CarDetailsModal: React.FC = ({ car, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CarDetails car={car} />
    </Modal>
  );
};
```

### 3. Предсказуемость
Компоненты должны быть предсказуемыми в своем поведении.

```typescript
// ✅ Хорошо: предсказуемое поведение
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary'
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};
```

## Структура компонентов

### Стандартная структура файлов

```
ComponentName/
├── ComponentName.tsx           # Основной компонент
├── ComponentName.types.ts      # Типы компонента
├── ComponentName.styles.ts     # Стили (если не Tailwind)
├── ComponentName.test.tsx      # Тесты
├── ComponentName.stories.tsx   # Storybook истории
├── hooks/                      # Кастомные хуки компонента
│   └── useComponentName.ts
├── utils/                      # Утилиты компонента
│   └── componentUtils.ts
└── index.ts                   # Экспорт
```

### Структура TypeScript файла компонента

```typescript
// 1. Импорты внешних библиотек
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { clsx } from 'clsx';

// 2. Импорты внутренних модулей
import { Car } from '@/types';
import { Button } from '@/components/ui';
import { useCars } from '@/hooks';

// 3. Импорты типов
import type { CarCardProps } from './CarCard.types';

// 4. Импорты стилей
import styles from './CarCard.module.css';

// 5. Типы (если не в отдельном файле)
interface CarCardProps {
  car: Car;
  onSelect?: (id: string) => void;
  className?: string;
}

// 6. Константы компонента
const DEFAULT_IMAGE = '/images/car-placeholder.jpg';

// 7. Основной компонент
export const CarCard: React.FC<CarCardProps> = ({
  car,
  onSelect,
  className
}) => {
  // 8. Хуки состояния
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 9. Кастомные хуки
  const { formatPrice } = useCars();

  // 10. Мемоизированные значения
  const formattedPrice = useMemo(() => 
    formatPrice(car.price), 
    [car.price, formatPrice]
  );

  // 11. Эффекты
  useEffect(() => {
    // Логика эффекта
  }, []);

  // 12. Обработчики событий
  const handleSelect = useCallback(() => {
    if (onSelect && !isLoading) {
      onSelect(car.id);
    }
  }, [car.id, onSelect, isLoading]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // 13. Условный рендеринг
  if (!car) {
    return null;
  }

  // 14. Основной JSX
  return (
    <div 
      className={clsx(
        styles.card,
        { [styles.loading]: isLoading },
        className
      )}
      onClick={handleSelect}
    >
      <div className={styles.imageContainer}>
        <img 
          src={imageError ? DEFAULT_IMAGE : car.imageUrl}
          alt={car.name}
          onError={handleImageError}
          className={styles.image}
        />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{car.name}</h3>
        <p className={styles.brand}>{car.brand}</p>
        <p className={styles.price}>{formattedPrice}</p>
      </div>

      <div className={styles.actions}>
        <Button 
          variant="primary" 
          size="sm"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Select'}
        </Button>
      </div>
    </div>
  );
};

// 15. Экспорт по умолчанию (если нужен)
export default CarCard;
```

## Типизация компонентов

### Базовые типы пропсов

```typescript
// Базовый интерфейс для всех компонентов
interface BaseComponentProps {
  className?: string;
  testId?: string;
  children?: React.ReactNode;
}

// Расширение базового интерфейса
interface CarCardProps extends BaseComponentProps {
  car: Car;
  onSelect?: (id: string) => void;
  variant?: 'default' | 'compact' | 'detailed';
}

// Использование generic типов
interface ListProps<T> extends BaseComponentProps {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  loading?: boolean;
  emptyMessage?: string;
}

const List = <T,>({ 
  items, 
  renderItem, 
  keyExtractor,
  loading = false,
  emptyMessage = 'No items found',
  className 
}: ListProps<T>) => {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (items.length === 0) {
    return <div className="empty">{emptyMessage}</div>;
  }

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={keyExtractor(item)}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};
```

### Типы для событий

```typescript
// Типизация обработчиков событий
interface FormProps {
  onSubmit: (data: FormData) => void | Promise<void>;
  onChange?: (field: string, value: any) => void;
  onError?: (error: Error) => void;
}

// Типизация ref
interface InputProps {
  ref?: React.Ref<HTMLInputElement>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

### Условные типы

```typescript
// Условные пропсы на основе variant
type ButtonProps = BaseComponentProps & {
  variant: 'primary' | 'secondary' | 'link';
} & (
  | { variant: 'link'; href: string; onClick?: never }
  | { variant: 'primary' | 'secondary'; href?: never; onClick: () => void }
);

const Button: React.FC<ButtonProps> = ({ variant, ...props }) => {
  if (variant === 'link') {
    return <a href={props.href} className="btn-link">{props.children}</a>;
  }

  return (
    <button 
      onClick={props.onClick}
      className={`btn btn-${variant}`}
    >
      {props.children}
    </button>
  );
};
```

## Паттерны компонентов

### 1. Compound Components (Составные компоненты)

```typescript
// Основной компонент
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const Tabs: React.FC<{ children: React.ReactNode; defaultTab?: string }> & {
  List: typeof TabsList;
  Tab: typeof TabsTab;
  Panel: typeof TabsPanel;
} = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || '');

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Компоненты-части
const TabsList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="tabs-list">{children}</div>;
};

const TabsTab: React.FC<{ value: string; children: React.ReactNode }> = ({ 
  value, 
  children 
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTab must be used within Tabs');

  return (
    <button
      className={`tab ${context.activeTab === value ? 'active' : ''}`}
      onClick={() => context.setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabsPanel: React.FC<{ value: string; children: React.ReactNode }> = ({ 
  value, 
  children 
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsPanel must be used within Tabs');

  if (context.activeTab !== value) return null;

  return <div className="tab-panel">{children}</div>;
};

// Присвоение подкомпонентов
Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;

// Использование
<Tabs defaultTab="cars">
  <Tabs.List>
    <Tabs.Tab value="cars">Cars</Tabs.Tab>
    <Tabs.Tab value="trucks">Trucks</Tabs.Tab>
  </Tabs.List>
  
  <Tabs.Panel value="cars">
    <CarsList />
  </Tabs.Panel>
  
  <Tabs.Panel value="trucks">
    <TrucksList />
  </Tabs.Panel>
</Tabs>
```

### 2. Render Props

```typescript
interface DataFetcherProps<T> {
  url: string;
  children: (data: {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
}

const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <>{children({ data, loading, error, refetch: fetchData })}</>;
};

// Использование
<DataFetcher<Car[]> url="/api/cars">
  {({ data, loading, error, refetch }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    return (
      <div>
        {data.map(car => <CarCard key={car.id} car={car} />)}
        <Button onClick={refetch}>Refresh</Button>
      </div>
    );
  }}
</DataFetcher>
```

### 3. Higher-Order Components (HOC)

```typescript
// HOC для добавления loading состояния
interface WithLoadingProps {
  loading?: boolean;
}

const withLoading = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WithLoadingComponent: React.FC<P & WithLoadingProps> = ({
    loading = false,
    ...props
  }) => {
    if (loading) {
      return <div className="loading-spinner">Loading...</div>;
    }

    return <Component {...(props as P)} />;
  };

  WithLoadingComponent.displayName = `withLoading(${Component.displayName || Component.name})`;

  return WithLoadingComponent;
};

// Использование
const CarListWithLoading = withLoading(CarList);

<CarListWithLoading cars={cars} loading={isLoading} />
```

### 4. Custom Hooks для логики компонентов

```typescript
// Кастомный хук для управления модальным окном
const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, open, close, toggle };
};

// Кастомный хук для форм
interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void | Promise<void>;
}

const useForm = <T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback(<K extends keyof T>(
    field: K,
    value: T[K]
  ) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Очистка ошибки при изменении поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    setValue,
    handleSubmit,
    reset
  };
};

// Использование в компоненте
const CarForm: React.FC<CarFormProps> = ({ onSubmit, initialCar }) => {
  const {
    values,
    errors,
    isSubmitting,
    setValue,
    handleSubmit
  } = useForm({
    initialValues: initialCar || { name: '', brand: '', price: 0 },
    validate: (values) => {
      const errors: any = {};
      if (!values.name) errors.name = 'Name is required';
      if (!values.brand) errors.brand = 'Brand is required';
      if (values.price <= 0) errors.price = 'Price must be greater than 0';
      return errors;
    },
    onSubmit
  });

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={values.name}
        onChange={(e) => setValue('name', e.target.value)}
        error={errors.name}
        placeholder="Car name"
      />
      
      <Input
        value={values.brand}
        onChange={(e) => setValue('brand', e.target.value)}
        error={errors.brand}
        placeholder="Brand"
      />
      
      <Input
        type="number"
        value={values.price}
        onChange={(e) => setValue('price', Number(e.target.value))}
        error={errors.price}
        placeholder="Price"
      />
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Car'}
      </Button>
    </form>
  );
};
```

## Стили и CSS

### Tailwind CSS классы

```typescript
// Используйте семантичные группировки классов
const Card: React.FC<CardProps> = ({ children, variant = 'default' }) => {
  const baseClasses = "rounded-lg border shadow-sm transition-shadow";
  const paddingClasses = "p-6";
  const backgroundClasses = "bg-white dark:bg-gray-800";
  const borderClasses = "border-gray-200 dark:border-gray-700";
  const hoverClasses = "hover:shadow-md";

  const variantClasses = {
    default: "",
    highlighted: "ring-2 ring-blue-500 ring-opacity-50",
    danger: "border-red-300 bg-red-50 dark:bg-red-900/20"
  };

  return (
    <div 
      className={clsx(
        baseClasses,
        paddingClasses,
        backgroundClasses,
        borderClasses,
        hoverClasses,
        variantClasses[variant]
      )}
    >
      {children}
    </div>
  );
};
```

### CSS Modules (если используются)

```css
/* CarCard.module.css */
.card {
  @apply rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow;
}

.card:hover {
  @apply shadow-md;
}

.card.loading {
  @apply opacity-50 pointer-events-none;
}

.imageContainer {
  @apply relative aspect-video overflow-hidden rounded-t-lg;
}

.image {
  @apply h-full w-full object-cover transition-transform duration-300;
}

.image:hover {
  @apply scale-105;
}

.content {
  @apply p-4;
}

.title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.brand {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

.price {
  @apply text-xl font-bold text-blue-600 dark:text-blue-400;
}

.actions {
  @apply flex justify-end p-4 pt-0;
}
```

### Styled Components с вариантами (cva)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Базовые стили
  "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
```

## Тестирование компонентов

### Unit тесты

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { CarCard } from './CarCard';

const mockCar = {
  id: '1',
  name: 'Toyota Camry',
  brand: 'Toyota',
  price: 25000,
  imageUrl: '/images/camry.jpg'
};

describe('CarCard', () => {
  it('renders car information correctly', () => {
    render(<CarCard car={mockCar} />);
    
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
    expect(screen.getByText('Toyota')).toBeInTheDocument();
    expect(screen.getByText('$25,000')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<CarCard car={mockCar} onSelect={onSelect} />);
    
    fireEvent.click(screen.getByRole('button', { name: /select/i }));
    
    expect(onSelect).toHaveBeenCalledWith('1');
  });

  it('shows loading state', () => {
    render(<CarCard car={mockCar} loading />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('handles image error gracefully', async () => {
    render(<CarCard car={mockCar} />);
    
    const image = screen.getByAltText('Toyota Camry');
    fireEvent.error(image);
    
    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/images/car-placeholder.jpg');
    });
  });
});
```

### Integration тесты

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CarsList } from './CarsList';
import { server } from '../../../test/server';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('CarsList Integration', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('loads and displays cars from API', async () => {
    render(<CarsList />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
      expect(screen.getByText('Honda Accord')).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    server.use(
      rest.get('/api/cars', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<CarsList />, { wrapper: createWrapper() });
    
    await waitFor(() => {
      expect(screen.getByText(/error loading cars/i)).toBeInTheDocument();
    });
  });
});
```

## Accessibility (a11y)

### Семантичная разметка

```typescript
const CarCard: React.FC<CarCardProps> = ({ car, onSelect }) => {
  return (
    <article 
      className="car-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(car.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(car.id);
        }
      }}
      aria-label={`Select ${car.name} - ${car.brand}, $${car.price}`}
    >
      <img 
        src={car.imageUrl} 
        alt={`${car.name} - ${car.brand}`}
        loading="lazy"
      />
      
      <div className="car-info">
        <h3 id={`car-name-${car.id}`}>{car.name}</h3>
        <p aria-describedby={`car-name-${car.id}`}>{car.brand}</p>
        <p 
          className="price" 
          aria-label={`Price: ${formatPrice(car.price)}`}
        >
          {formatPrice(car.price)}
        </p>
      </div>
    </article>
  );
};
```

### ARIA атрибуты

```typescript
const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  const titleId = `modal-title-${useId()}`;
  const descriptionId = `modal-description-${useId()}`;

  useEffect(() => {
    if (isOpen) {
      // Фокус на модальном окне при открытии
      const modal = document.getElementById('modal');
      modal?.focus();
      
      // Блокировка скролла
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div 
        id="modal"
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <header className="modal-header">
          <h2 id={titleId}>{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="close-button"
          >
            ×
          </button>
        </header>
        
        <div id={descriptionId} className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};
```

## Производительность

### Мемоизация

```typescript
// Мемоизация компонента
const CarCard = React.memo<CarCardProps>(({ car, onSelect }) => {
  return (
    <div onClick={() => onSelect?.(car.id)}>
      <h3>{car.name}</h3>
      <p>{car.price}</p>
    </div>
  );
}, (prevProps, nextProps) => {
  // Кастомная функция сравнения
  return (
    prevProps.car.id === nextProps.car.id &&
    prevProps.car.name === nextProps.car.name &&
    prevProps.car.price === nextProps.car.price &&
    prevProps.onSelect === nextProps.onSelect
  );
});

// Мемоизация дорогих вычислений
const ExpensiveComponent: React.FC<Props> = ({ data }) => {
  const processedData = useMemo(() => {
    return data
      .filter(item => item.active)
      .sort((a, b) => a.price - b.price)
      .map(item => ({
        ...item,
        formattedPrice: formatPrice(item.price)
      }));
  }, [data]);

  return <div>{/* рендер */}</div>;
};
```

### Виртуализация для больших списков

```typescript
import { FixedSizeList as List } from 'react-window';

interface VirtualizedCarListProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
}

const VirtualizedCarList: React.FC<VirtualizedCarListProps> = ({
  cars,
  onSelectCar
}) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <CarCard 
        car={cars[index]} 
        onSelect={() => onSelectCar(cars[index])}
      />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={cars.length}
      itemSize={200}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

## Документация компонентов

### JSDoc комментарии

```typescript
/**
 * Карточка автомобиля для отображения основной информации
 * 
 * @example
 * ```tsx
 * <CarCard 
 *   car={car} 
 *   onSelect={(id) => navigate(`/cars/${id}`)}
 *   variant="compact"
 * />
 * ```
 */
interface CarCardProps {
  /** Данные автомобиля для отображения */
  car: Car;
  
  /** 
   * Callback, вызываемый при выборе автомобиля
   * @param id - ID выбранного автомобиля
   */
  onSelect?: (id: string) => void;
  
  /** 
   * Вариант отображения карточки
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'detailed';
  
  /** Дополнительные CSS классы */
  className?: string;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  onSelect,
  variant = 'default',
  className
}) => {
  // реализация
};
```

### Storybook истории

```typescript
// CarCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { CarCard } from './CarCard';

const meta: Meta<typeof CarCard> = {
  title: 'Components/CarCard',
  component: CarCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент для отображения карточки автомобиля'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed']
    },
    onSelect: { action: 'selected' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    car: {
      id: '1',
      name: 'Toyota Camry',
      brand: 'Toyota',
      price: 25000,
      imageUrl: '/images/camry.jpg'
    }
  }
};

export const Compact: Story = {
  args: {
    ...Default.args,
    variant: 'compact'
  }
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true
  }
};

export const WithoutImage: Story = {
  args: {
    car: {
      ...Default.args.car,
      imageUrl: ''
    }
  }
};
```

## Компонент Sidebar

### Описание
Компонент `Sidebar` представляет боковую панель навигации, основанную на дизайне из Figma. Содержит логотип, основные навигационные элементы и нижнюю секцию с настройками и выходом.

### Структура
```typescript
interface SidebarProps {
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}
```

### Особенности реализации

1. **Навигация**: Использует `NavLink` из React Router для активных состояний
2. **Иконки**: SVG иконки встроены напрямую для лучшей производительности
3. **Стили**: Tailwind CSS с условными классами через `clsx`
4. **Активное состояние**: Автоматическое выделение текущей страницы

### Навигационные элементы

**Основная навигация:**
- Dashboard (`/`) - главная панель
- Assets (`/assets`) - управление активами
- Booking (`/booking`) - бронирования
- Sell Cars (`/sell-cars`) - продажа автомобилей
- Buy Cars (`/buy-cars`) - покупка автомобилей
- Services (`/services`) - услуги
- Calendar (`/calendar`) - календарь
- Messages (`/messages`) - сообщения

**Нижняя секция:**
- Settings (`/settings`) - настройки
- Log out - выход из системы

### Пример использования
```tsx
import { Layout } from '@/components';

const MyPage: React.FC = () => {
  return (
    <Layout>
      <div className="p-8">
        <h1>My Page Content</h1>
      </div>
    </Layout>
  );
};
```

### Интеграция с роутингом
Сайдбар интегрирован с React Router и автоматически выделяет активные пункты меню. Все страницы приложения (кроме аутентификации) используют Layout компонент с сайдбаром.

Следуя этим стандартам, вы создадите качественные, поддерживаемые и масштабируемые React компоненты.
