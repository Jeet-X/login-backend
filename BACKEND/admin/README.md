# 📚 Admin Quiz Categories Module

This module provides REST APIs for managing quiz categories in the admin panel.

## Features

- ✅ Create category
- ✅ Bulk import categories
- ✅ Reorder categories
- ✅ List categories with stats
- ✅ Get category details
- ✅ Update category
- ✅ Toggle status (Active/Inactive)
- ✅ Delete category (with validation)

---

## 🛠 Base Route

```
/admin/api/v1/quiz/categories
```

---

## 🔍 Test Endpoint

### Check if routes are working

**Endpoint:** `GET /admin/api/v1/quiz/categories/test`

**Response:**
```json
{
  "success": true,
  "message": "Admin category routes are working",
  "timestamp": "ISO timestamp"
}
```

---

## 📌 API Endpoints

### 🟢 POST Endpoints

#### 1️⃣ Create Category

**Endpoint:** `POST /admin/api/v1/quiz/categories`

**Request Body:**
```json
{
  "name": "string (required)",
  "description": "string (optional)",
  "icon_url": "string (optional)",
  "display_order": "integer (optional)"
}
```

---

#### 2️⃣ Bulk Import Categories

**Endpoint:** `POST /admin/api/v1/quiz/categories/bulk`

**Request Body:**
```json
{
  "categories": [
    {
      "name": "string",
      "description": "string",
      "icon_url": "string",
      "display_order": 1
    }
  ]
}
```


---

### 🔵 GET Endpoints

#### 1️⃣ List Categories (With Stats)

**Endpoint:** `GET /admin/api/v1/quiz/categories`

**Query Parameters:**

| Parameter | Type | Required | Default |
|-----------|------|----------|---------|
| `status` | `ACTIVE` \| `INACTIVE` | ❌ | All |
| `limit` | integer | ❌ | 50 |
| `offset` | integer | ❌ | 0 |

**Example:**
```
GET /admin/api/v1/quiz/categories?status=ACTIVE&limit=10&offset=0
```

---

#### 2️⃣ Get Category By ID

**Endpoint:** `GET /admin/api/v1/quiz/categories/:id`

**Parameters:**
- `id` → UUID (required)

---

#### 3️⃣ Get Category Statistics

**Endpoint:** `GET /admin/api/v1/quiz/categories/stats`

Returns overall category statistics.

---

### 🟡 PUT Endpoints

#### 1️⃣ Update Category

**Endpoint:** `PUT /admin/api/v1/quiz/categories/:id`

**Parameters:**
- `id` → UUID (required)

**Request Body:**
```json
{
  "name": "string (required)",
  "description": "string (optional)",
  "icon_url": "string (optional)",
  "display_order": "integer (optional)"
}
```

---

#### 2️⃣ Toggle Category Status

**Endpoint:** `PUT /admin/api/v1/quiz/categories/:id/status`

**Parameters:**
- `id` → UUID (required)

**Request Body:**
```json
{
  "status": "ACTIVE | INACTIVE"
}
```

---

### 🔴 DELETE Endpoint

#### Delete Category

**Endpoint:** `DELETE /admin/api/v1/quiz/categories/:id`

**Parameters:**
- `id` → UUID (required)

**⚠️ Validation:**
Category can only be deleted if:
- No questions are associated with it

---

## 🧠 Business Rules

1. `name` is required when creating or updating
2. `display_order` determines UI ordering
3. Categories with associated questions cannot be deleted
4. Status can be toggled between `ACTIVE` and `INACTIVE`

---

## 📦 Status Values

- `ACTIVE`
- `INACTIVE`

---

## 📈 Pagination

Pagination is supported via query parameters:

- `limit` - Number of records to return
- `offset` - Number of records to skip

**Example:**
```
GET /admin/api/v1/quiz/categories?status=ACTIVE&limit=10&offset=0
```

---

## 📝 Response Format

All endpoints return JSON responses following this general structure:

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "details": { ... }
}
```

---

## 🔐 Authentication

All endpoints require admin authentication. Include authentication token in request headers:

```
Authorization: Bearer <token>
```

---

## 🚀 Quick Start

### Example: Create a Category

```bash
curl -X POST /admin/api/v1/quiz/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Science",
    "description": "Science and Technology Questions",
    "icon_url": "https://example.com/icons/science.png",
    "display_order": 1
  }'
```

### Example: List Categories

```bash
curl -X GET "/admin/api/v1/quiz/categories?status=ACTIVE&limit=10" \
  -H "Authorization: Bearer <token>"
```

### Example: Update Category

```bash
curl -X PUT /admin/api/v1/quiz/categories/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Advanced Science",
    "description": "Advanced Science Topics"
  }'
```

# ⚙️ Admin Practice Configuration Module

This module provides REST APIs for managing practice quiz configurations in the admin panel.

## Features

- ✅ Create practice configuration
- ✅ List practice configurations (with filtering)
- ✅ Update practice configuration
- ✅ Toggle configuration status (Active/Inactive)
- ✅ Configure entry coins
- ✅ Timer settings (per question or total)
- ✅ Refund rules management
- ✅ Terms and conditions versioning

---

## 🛠 Base Route

```
/admin/api/v1/quiz/practice-config
```

---

## 🔐 Authentication

All endpoints require:
- Valid authentication token
- Admin privileges

Include authentication token in request headers:
```
Authorization: Bearer <token>
```

---

## 📌 API Endpoints

### 🟢 POST Endpoints

#### 1️⃣ Create Practice Configuration

**Endpoint:** `POST /admin/api/v1/quiz/practice-config`

**Request Body:**
```json
{
  "sub_category_id": "UUID (required)",
  "entry_coins": "integer (required, min: 0)",
  "timer_enabled": "boolean (required)",
  "timer_duration": "integer (optional, min: 10)",
  "timer_type": "PER_QUESTION | TOTAL (optional)",
  "refund_rules": {
    "full_refund_threshold": 0.5,
    "partial_refund_percentage": 50,
    "no_refund_after_questions": 5
  },
  "terms_content": "string (required)",
  "terms_version": "string (required)"
}
```

**Validation Rules:**
- `sub_category_id` - Must be a valid UUID
- `entry_coins` - Must be integer >= 0
- `timer_enabled` - Must be boolean
- `timer_duration` - If provided, must be integer >= 10 (in seconds)
- `timer_type` - Must be either `PER_QUESTION` or `TOTAL`
- `refund_rules` - Must be a valid object
- `terms_content` - Cannot be empty
- `terms_version` - Cannot be empty

**Example Request:**
```json
{
  "sub_category_id": "123e4567-e89b-12d3-a456-426614174000",
  "entry_coins": 100,
  "timer_enabled": true,
  "timer_duration": 30,
  "timer_type": "PER_QUESTION",
  "refund_rules": {
    "full_refund_threshold": 0.5,
    "partial_refund_percentage": 50,
    "no_refund_after_questions": 5
  },
  "terms_content": "Practice quiz terms and conditions...",
  "terms_version": "1.0.0"
}
```

---

### 🔵 GET Endpoints

#### 1️⃣ Get Practice Configurations

**Endpoint:** `GET /admin/api/v1/quiz/practice-config`

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sub_category_id` | UUID | ❌ | Filter by sub-category |

**Example:**
```
GET /admin/api/v1/quiz/practice-config?sub_category_id=123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": "abc123...",
      "sub_category_id": "123e4567...",
      "entry_coins": 100,
      "timer_enabled": true,
      "timer_duration": 30,
      "timer_type": "PER_QUESTION",
      "refund_rules": { ... },
      "terms_content": "...",
      "terms_version": "1.0.0",
      "status": "ACTIVE",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### 🟡 PUT Endpoints

#### 1️⃣ Update Practice Configuration

**Endpoint:** `PUT /admin/api/v1/quiz/practice-config/:id`

**Parameters:**
- `id` → UUID (required)

**Request Body:**
```json
{
  "entry_coins": "integer (required, min: 0)",
  "timer_enabled": "boolean (required)",
  "timer_duration": "integer (optional, min: 10)",
  "timer_type": "PER_QUESTION | TOTAL (optional)",
  "refund_rules": "object (required)",
  "terms_content": "string (required)",
  "terms_version": "string (required)"
}
```

**Example:**
```json
{
  "entry_coins": 150,
  "timer_enabled": false,
  "refund_rules": {
    "full_refund_threshold": 0.3,
    "partial_refund_percentage": 60,
    "no_refund_after_questions": 3
  },
  "terms_content": "Updated terms...",
  "terms_version": "1.1.0"
}
```

---

#### 2️⃣ Toggle Configuration Status

**Endpoint:** `PUT /admin/api/v1/quiz/practice-config/:id/status`

**Parameters:**
- `id` → UUID (required)

**Request Body:**
```json
{
  "status": "ACTIVE | INACTIVE"
}
```

**Status Values:**
- `ACTIVE` - Configuration is active and can be used
- `INACTIVE` - Configuration is disabled

---

## 🧠 Business Rules

### Entry Coins
- Must be a non-negative integer
- Represents the cost to enter a practice quiz

### Timer Configuration
- `timer_enabled` - Determines if timer is active
- `timer_duration` - Duration in seconds (minimum 10)
- `timer_type`:
  - `PER_QUESTION` - Timer applies to each question individually
  - `TOTAL` - Timer applies to the entire quiz

### Refund Rules
The `refund_rules` object defines when and how coins are refunded:

```json
{
    "0": 0,       //no refund on getting none of the questions right
    "60": 50,     //50% refund on getting 50% of the questions right
    "80": 100     //100% refund on getting 80% of the questions right
}
```

### Terms and Conditions
- `terms_content` - Full text of terms and conditions

---


## 🚀 Quick Start

### Example: Create Configuration

```bash
curl -X POST /admin/api/v1/quiz/practice-config \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "sub_category_id": "123e4567-e89b-12d3-a456-426614174000",
    "entry_coins": 100,
    "timer_enabled": true,
    "timer_duration": 30,
    "timer_type": "PER_QUESTION",
    "refund_rules": 
    {
        "0": 0,       
        "60": 50,     
        "80": 100
    },
    "terms_content": "Practice quiz terms...",
    "terms_version": "1.0.0"
  }'
```

### Example: List Configurations

```bash
curl -X GET "/admin/api/v1/quiz/practice-config?sub_category_id=123e4567-e89b-12d3-a456-426614174000" \
  -H "Authorization: Bearer <token>"
```

### Example: Update Configuration

```bash
curl -X PUT /admin/api/v1/quiz/practice-config/abc123... \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "entry_coins": 150,
    "timer_enabled": false,
    "refund_rules": {
      "full_refund_threshold": 0.3,
      "partial_refund_percentage": 60,
      "no_refund_after_questions": 3
    },
    "terms_content": "Updated terms...",
    "terms_version": "1.1.0"
  }'
```

### Example: Toggle Status

```bash
curl -X PUT /admin/api/v1/quiz/practice-config/abc123.../status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "status": "INACTIVE"
  }'
```

---

## ⚠️ Error Responses

### Validation Error
```json
{
  "success": false,
  "errors": [
    {
      "field": "entry_coins",
      "message": "Must be an integer greater than or equal to 0"
    }
  ]
}
```

### Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized access"
}
```

### Not Found
```json
{
  "success": false,
  "error": "Configuration not found"
}
```

---

## 📝 Notes

- Each sub-category can have one active practice configuration
- Timer duration is in seconds
- Refund rules are stored as JSON object
- Terms versioning helps track changes over time
- Status can be toggled without deleting the configuration

---

## 🔄 Status Values

- `ACTIVE` - Configuration is currently in use
- `INACTIVE` - Configuration is disabled but preserved

---



