# Cars Frontend Application

## Описание проекта

Современное веб-приложение для работы с автомобилями, построенное на базе React и TypeScript с использованием современных инструментов разработки.

## Технический стек

### Основные технологии
- **Vite** — быстрая сборка и разработка
- **React 18** — пользовательский интерфейс
- **TypeScript** — типизированный JavaScript
- **React Router** — маршрутизация и навигация
- **Zustand** — легковесный стейт-менеджмент

### Стили и UI
- **Tailwind CSS** — utility-first CSS фреймворк
- **MUI (Material-UI)** — готовые компоненты (опционально)
- **Темизация** — поддержка светлой и тёмной темы

### Инструменты разработки
- **ESLint** — линтинг кода
- **Prettier** — форматирование кода
- **TypeScript** — статическая типизация

## Структура проекта

```
src/
│
├─ components/     # Переиспользуемые UI-компоненты
│  ├─ ui/          # Базовые UI элементы
│  ├─ forms/       # Компоненты форм
│  └─ layout/      # Компоненты макета
│
├─ pages/          # Страницы приложения (роуты)
│  ├─ Home/        # Главная страница
│  ├─ Cars/        # Страницы автомобилей
│  └─ Profile/     # Профиль пользователя
│
├─ store/          # Глобальный стейт (Zustand)
│  ├─ slices/      # Отдельные части состояния
│  └─ types/       # Типы для состояния
│
├─ services/       # API и бизнес-логика
│  ├─ api/         # HTTP клиенты
│  └─ utils/       # Утилиты для сервисов
│
├─ theme/          # Темизация
│  ├─ colors.ts    # Цветовая палитра
│  ├─ typography.ts # Типографика
│  └─ components.ts # Стили компонентов
│
├─ utils/          # Вспомогательные функции
│  ├─ formatters.ts # Форматирование данных
│  ├─ validators.ts # Валидация
│  └─ constants.ts  # Константы
│
├─ hooks/          # Кастомные React хуки
├─ types/          # Глобальные типы TypeScript
└─ index.tsx       # Точка входа приложения
```

## Особенности

### Архитектурные принципы
- **Component-driven development** — разработка через компоненты
- **Type-safe** — полная типизация с TypeScript
- **Responsive design** — адаптивный дизайн
- **Accessibility** — доступность для всех пользователей
- **Performance-first** — оптимизация производительности

### Паттерны разработки
- **Composition over inheritance** — композиция вместо наследования
- **Custom hooks** — переиспользуемая логика через хуки
- **Controlled components** — контролируемые компоненты форм
- **Error boundaries** — обработка ошибок

## Быстрый старт

### Предварительные требования
- Node.js (версия 18+)
- npm или yarn
- Git

### Установка
```bash
# Клонирование репозитория
git clone [repository-url]
cd carsFE

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

### Доступные команды
```bash
npm run dev          # Запуск сервера разработки
npm run build        # Сборка для продакшена
npm run preview      # Предпросмотр сборки
npm run lint         # Проверка кода линтером
npm run lint:fix     # Исправление ошибок линтера
npm run type-check   # Проверка типов TypeScript
```

## Разработка

### Стандарты кода
- Используйте TypeScript для всех файлов
- Следуйте принципам функционального программирования
- Пишите тесты для критической логики
- Используйте семантичные имена переменных и функций

### Структура компонентов
```typescript
// Пример структуры компонента
interface ComponentProps {
  // Типизированные пропсы
}

export const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // Хуки
  // Локальное состояние
  // Эффекты
  // Обработчики событий
  // Рендер
  return <div>...</div>;
};
```

### Git workflow
- Используйте feature branches
- Пишите описательные commit messages
- Делайте code review перед merge
- Следуйте conventional commits

## Дополнительные ресурсы

- [Документация React](https://react.dev/)
- [Документация TypeScript](https://www.typescriptlang.org/docs/)
- [Документация Vite](https://vitejs.dev/)
- [Документация Tailwind CSS](https://tailwindcss.com/docs)
- [Документация Zustand](https://zustand-demo.pmnd.rs/)

## Лицензия

MIT License

## Контакты

- Разработчик: [Ваше имя]
- Email: [ваш email]
- GitHub: [ваш GitHub]
