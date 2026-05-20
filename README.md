# Мой Тамагочи

Виртуальный питомец с ежедневными заданиями, уровнями, наградами. Прогресс в браузере и в облаке Firebase.

## Стек

- React 19 + TypeScript + Vite
- Tailwind CSS v4, Framer Motion, Heroicons
- React Context
- **Firebase Auth** (email/пароль, Google)
- **Cloud Firestore** (синхронизация прогресса)
- localStorage (офлайн и гости)

## Быстрый старт

```bash
npm install
cp .env.example .env
# Заполните .env ключами из Firebase Console
npm run dev
```

http://localhost:5173

## Настройка Firebase

1. [Firebase Console](https://console.firebase.google.com/) → создайте проект
2. **Authentication** → включите **Email/Password** и **Google**
3. **Firestore Database** → создайте базу (режим test, затем задеплойте правила)
4. **Project settings** → Web app → скопируйте конфиг в `.env`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

5. Задеплойте правила Firestore (нужен [Firebase CLI](https://firebase.google.com/docs/cli)):

```bash
firebase login
firebase use --add   # выберите project id
firebase deploy --only firestore:rules
```

Данные хранятся в `users/{uid}/saves/default`.

## Git

```bash
git init   # уже выполнено при настройке проекта
git remote add origin https://github.com/ioann1997/tamagochi.git
git push -u origin main
```

Файл `.env` в git не попадает — только `.env.example`.

## Сборка и деплой

```bash
npm run build
```

**Vercel / Netlify:** команда `npm run build`, папка `dist`. Добавьте переменные `VITE_FIREBASE_*` в настройках хостинга.

## Структура

| Путь | Назначение |
|------|------------|
| `src/context/AuthContext.tsx` | Вход, регистрация, Google |
| `src/context/GameContext.tsx` | Игра + синхронизация |
| `src/services/gameStateService.ts` | Firestore read/write |
| `src/lib/firebase.ts` | Инициализация Firebase |
| `firestore.rules` | Правила доступа |

## Игровая механика

- Без входа: прогресс только в `localStorage`
- С входом: загрузка из Firestore, автосохранение при изменениях
- Первый вход: локальный прогресс переносится в облако
