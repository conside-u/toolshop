# ToolShop — піддомени та сутності

## Піддомени (bounded contexts)

| Контекст | Відповідає за | Сутності | Код |
|----------|---------------|----------|-----|
| **Користувачі** (Identity) | реєстрація, вхід, ролі | `User` | `domain/identity/` |
| **Каталог** (Catalog) | товари, категорії, ціни, залишки | `Category`, `Product` | `domain/catalog/` |
| **Замовлення** (Ordering) | кошик, оформлення й статуси замовлень | `Order`, `OrderItem` | `domain/ordering/` |
| **Оплата** (Payment) | оплата замовлення | `Payment` | `domain/payment/` |
| **Доставка** (Delivery) | відправлення замовлення покупцю | `Shipment` | `domain/delivery/` |

Головний (core) піддомен — **Замовлення**: саме тут магазин заробляє гроші. Каталог — підтримувальний,
Користувачі, Оплата й Доставка — загальні (generic), їх можна було б замінити готовими сервісами.

## Сутності та атрибути

### User — користувач (Користувачі)

| Атрибут | Тип | Опис |
|---------|-----|------|
| id | string | ідентифікатор |
| email | string | логін, унікальний |
| name | string | ім'я |
| role | `customer` \| `manager` | роль у системі |

Методи: `isManager()`.

### Category — категорія (Каталог)

| Атрибут | Тип | Опис |
|---------|-----|------|
| id | string | ідентифікатор |
| name | string | назва, напр. «Фрезери» |
| parentId | string \| null | батьківська категорія |

### Product — товар (Каталог)

| Атрибут | Тип | Опис |
|---------|-----|------|
| id | string | ідентифікатор |
| name | string | назва |
| categoryId | string | категорія |
| price | number | ціна, грн |
| stock | number | кількість на складі |
| attributes | object | характеристики (потужність, вага…) |

Методи: `isAvailable(qty)`, `reserve(qty)` — зменшує залишок, `changePrice(price)`.

### Order — замовлення (Замовлення)

| Атрибут | Тип | Опис |
|---------|-----|------|
| id | string | ідентифікатор |
| customerId | string | покупець (`User.id` з контексту Користувачі) |
| items | OrderItem[] | позиції |
| status | `new` \| `confirmed` \| `shipped` \| `cancelled` | статус |
| createdAt | Date | дата створення |

Методи: `addItem(product, qty)`, `removeItem(productId)`, `total`, `confirm()`, `ship()`, `cancel()`.
Правило: позиції можна змінювати лише в замовленні зі статусом `new`.

### OrderItem — позиція замовлення (Замовлення)

| Атрибут | Тип | Опис |
|---------|-----|------|
| productId | string | товар з каталогу |
| productName | string | назва на момент замовлення |
| unitPrice | number | ціна на момент замовлення |
| quantity | number | кількість |

Методи: `total` (= unitPrice × quantity).

### Payment — платіж (Оплата)

| Атрибут | Тип | Опис |
|---------|-----|------|
| id | string | ідентифікатор |
| orderId | string | замовлення |
| amount | number | сума, грн |
| status | `pending` \| `paid` \| `failed` | статус |

Методи: `markPaid()`, `markFailed(reason)`.

### Shipment — відправлення (Доставка)

| Атрибут | Тип | Опис |
|---------|-----|------|
| id | string | ідентифікатор |
| orderId | string | замовлення |
| address | string | адреса / відділення |
| carrier | string | служба доставки |
| trackingNumber | string \| null | номер накладної |
| status | `preparing` \| `shipped` \| `delivered` | статус |

Методи: `ship(trackingNumber)`, `deliver()`.
