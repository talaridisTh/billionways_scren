# 🚀 Backend QR Implementation - Laravel with Reverb

### **Quick Start Commands**

```bash
php artisan migrate
php artisan db:seed --class=QrCodeTestSeeder
php artisan db:seed --class=UserWithQrCodesSeeder
```

Now you have:
- ✅ 4 test users with static tokens (for Flutter debug mode)
- ✅ 20 realistic Greek users with random QR codes
- ✅ All ready to scan and test!

### **Files Created**

#### **Models**
- ✅ `app/Models/UserQrCode.php` - User QR codes management
- ✅ `app/Models/ScanSession.php` - Scan sessions tracking

#### **Events**
- ✅ `app/Events/TransactionApproved.php` - Real-time broadcast on approval
- ✅ `app/Events/TransactionRejected.php` - Real-time broadcast on rejection

#### **Controllers**
- ✅ `app/Http/Controllers/Api/ShopOwnerScanController.php` - QR scan endpoints

#### **Migrations**
- ✅ `2025_10_05_172319_create_user_qr_codes_table.php`
- ✅ `2025_10_05_172320_create_scan_sessions_table.php`

#### **Seeders**
- ✅ `database/seeders/QrCodeTestSeeder.php` - Test data with matching Flutter tokens
- ✅ `database/seeders/UserWithQrCodesSeeder.php` - 20 realistic Greek users with QR codes

#### **Configuration**
- ✅ Updated `routes/api.php` - Added shop owner scan routes
- ✅ Updated `routes/channels.php` - Added private channel authorization
- ✅ Laravel Reverb installed and configured

---

## 🎯 API Endpoints

### **1. Validate QR Code**
```
POST /api/shop-owner/scan/validate
```

**Request:**
```json
{
  "qr_token": "USER_QR_TOKEN_001",
  "store_id": "store_123",
  "offer_id": "offer_456"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": null,
    "subscription": "Premium",
    "is_valid": true,
    "avatar_url": null,
    "store_id": "store_123",
    "offer_id": "offer_456",
    "discount_percentage": 15.0,
    "session_id": "session_abc-123-def"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid or expired QR code"
}
```

---

### **2. Approve Transaction**
```
POST /api/shop-owner/scan/approve
```

**Request:**
```json
{
  "session_id": "session_abc-123-def",
  "user_id": 1,
  "store_id": "store_123",
  "offer_id": "offer_456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction_id": "tx_xyz-789",
    "approved": true,
    "timestamp": "2025-10-05T17:30:00+00:00",
    "session_id": "session_abc-123-def",
    "message": "Transaction approved successfully"
  }
}
```

**Real-time Event Broadcast:**
- Channel: `private-user.{user_id}`
- Event: `transaction.approved`
- Data:
  ```json
  {
    "session_id": "session_abc-123-def",
    "store_id": "store_123",
    "offer_id": "offer_456",
    "approved_at": "2025-10-05T17:30:00+00:00",
    "status": "approved"
  }
  ```

---

### **3. Reject Transaction**
```
POST /api/shop-owner/scan/reject
```

**Request:**
```json
{
  "session_id": "session_abc-123-def",
  "user_id": 1,
  "offer_id": "offer_456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Transaction rejected"
}
```

**Real-time Event Broadcast:**
- Channel: `private-user.{user_id}`
- Event: `transaction.rejected`
- Data:
  ```json
  {
    "session_id": "session_abc-123-def",
    "status": "rejected"
  }
  ```

---

### **4. Check Session Status (Polling Alternative)**
```
GET /api/user/scan-session/{sessionId}/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "approved",
    "approved_at": "2025-10-05T17:30:00+00:00",
    "session_id": "session_abc-123-def"
  }
}
```

---

## 🧪 Testing

### **Test Data Available**

#### **1. Flutter Test Tokens Seeder**

The `QrCodeTestSeeder` created 4 test users matching the Flutter app test tokens:

| QR Token | Name | Email | Status |
|----------|------|-------|--------|
| `USER_QR_TOKEN_001` | John Doe | john@example.com | ✅ Valid |
| `USER_QR_TOKEN_002` | Jane Smith | jane@example.com | ✅ Valid |
| `USER_QR_TOKEN_003` | Maria Papadopoulos | maria@example.com | ✅ Valid |
| `EXPIRED_TOKEN` | Expired User | expired@example.com | ❌ Invalid |

**Run this seeder:**
```bash
php artisan db:seed --class=QrCodeTestSeeder
```

#### **2. Realistic Users Seeder**

The `UserWithQrCodesSeeder` created 20 realistic Greek users with random QR tokens:

- ✅ 20 users με ελληνικά ονόματα
- ✅ Realistic email addresses (gmail.com, outlook.com, yahoo.gr, hotmail.com)
- ✅ Greek phone numbers (+30 6XX XXX XXXX)
- ✅ Random QR tokens (format: `QR_XXXXXXXXXXXX_###`)
- ✅ Random expiration dates (7-90 days)
- ✅ 90% active QR codes

**Run this seeder:**
```bash
php artisan db:seed --class=UserWithQrCodesSeeder
```

**Sample users created:**
- Γιώργος Παπαδόπουλος (giorgos.papadopoulos@gmail.com)
- Μαρία Κωνσταντίνου (maria.konstantinou@outlook.com)
- Νίκος Αθανασίου (nikos.athanasiou@yahoo.gr)
- And 17 more...

**All users have password:** `password`

### **Testing Steps**

#### **1. Start Laravel Reverb Server**
```bash
php artisan reverb:start
```

This will start the WebSocket server on `localhost:8080` (as configured in `.env`).

#### **2. Test with cURL**

**Validate QR Code:**
```bash
curl -X POST http://billionways.test/api/shop-owner/scan/validate \
  -H "Content-Type: application/json" \
  -d '{
    "qr_token": "USER_QR_TOKEN_001",
    "store_id": "store_123",
    "offer_id": "offer_456"
  }'
```

**Approve Transaction:**
```bash
curl -X POST http://billionways.test/api/shop-owner/scan/approve \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "SESSION_ID_FROM_VALIDATE",
    "user_id": 1,
    "store_id": "store_123",
    "offer_id": "offer_456"
  }'
```

**Reject Transaction:**
```bash
curl -X POST http://billionways.test/api/shop-owner/scan/reject \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "SESSION_ID_FROM_VALIDATE",
    "user_id": 1,
    "offer_id": "offer_456"
  }'
```

**Check Session Status:**
```bash
curl http://billionways.test/api/user/scan-session/SESSION_ID/status
```

---

## 🔄 Real-Time Broadcasting with Reverb

### **How It Works**

1. **Shop owner scans QR** → Creates `ScanSession` with status `pending`
2. **Shop owner approves** → `TransactionApproved` event is broadcast via Reverb
3. **User's Flutter app** → Receives real-time notification on private channel `user.{id}`
4. **User navigates** → To receipt input screen

### **Flutter Integration**

The Flutter app needs to:

1. **Install Laravel Echo & Pusher packages** (compatible with Reverb):
   ```yaml
   dependencies:
     laravel_echo: ^0.4.0
     pusher_channels_flutter: ^2.2.0
   ```

2. **Configure Echo client:**
   ```dart
   import 'package:laravel_echo/laravel_echo.dart';
   import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';

   final echo = Echo({
     'broadcaster': 'pusher',
     'client': PusherChannelsFlutter.getInstance(),
     'auth': {
       'headers': {
         'Authorization': 'Bearer ${user.token}',
       },
     },
   });

   await echo.connector.connect(
     appKey: 'laravel-herd', // REVERB_APP_KEY from .env
     cluster: '',
     wsHost: 'reverb.herd.test',
     wsPort: 443,
     scheme: 'https',
     enableLogging: true,
     authEndpoint: 'https://billionways.test/api/broadcasting/auth',
   );
   ```

3. **Listen to private channel:**
   ```dart
   echo.private('user.${userId}')
     .listen('transaction.approved', (event) {
       print('Transaction approved: ${event['session_id']}');
       Navigator.pushNamed(context, '/receipt-input', 
         arguments: event['session_id']);
     });

   echo.private('user.${userId}')
     .listen('transaction.rejected', (event) {
       print('Transaction rejected');
       showErrorDialog('Shop owner rejected the transaction');
     });
   ```

### **Broadcasting Authentication**

The `routes/channels.php` already has authorization:

```php
Broadcast::channel('user.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});
```

This ensures only the authenticated user can subscribe to their own channel.

---

## 📊 Database Schema

### **user_qr_codes Table**
```sql
id                BIGINT (PK)
user_id           BIGINT (FK → users.id)
qr_token          VARCHAR(255) UNIQUE
is_active         BOOLEAN
expires_at        TIMESTAMP
created_at        TIMESTAMP
updated_at        TIMESTAMP

Indexes: qr_token, user_id
```

### **scan_sessions Table**
```sql
id                BIGINT (PK)
session_id        VARCHAR(255) UNIQUE
user_id           BIGINT (FK → users.id)
shop_owner_id     VARCHAR(255)
store_id          VARCHAR(255)
offer_id          VARCHAR(255)
status            ENUM('pending', 'approved', 'rejected', 'completed')
scanned_at        TIMESTAMP
approved_at       TIMESTAMP
completed_at      TIMESTAMP
created_at        TIMESTAMP
updated_at        TIMESTAMP

Indexes: session_id, status
```

---

## 🔒 Security Features

### **QR Code Validation**
- ✅ Token must exist in database
- ✅ `is_active` must be `true`
- ✅ `expires_at` must be in the future (if set)

### **Session Management**
- ✅ Each scan creates a unique session ID
- ✅ Sessions can only be approved/rejected if status is `pending`
- ✅ Prevents duplicate approvals

### **Broadcasting Security**
- ✅ Private channels require authentication
- ✅ Users can only subscribe to their own channel (`user.{userId}`)

---

## 🚀 Running the Application

### **Using Laravel Herd (Recommended)**

**Everything is already running!** 🎉

- ✅ Laravel app: `https://billionways.test`
- ✅ Reverb server: `wss://reverb.herd.test:443`
- ✅ No need to start any servers manually

### **Manual Setup (Alternative)**

If not using Herd:

1. **Start Reverb Server:**
   ```bash
   php artisan reverb:start
   ```

2. **Start Laravel Server:**
   ```bash
   php artisan serve
   ```

3. **Monitor Logs:**
   ```bash
   tail -f storage/logs/laravel.log
   ```

---

## 📝 Environment Configuration

Your `.env` is already configured correctly with Herd Reverb:

```env
BROADCAST_CONNECTION=reverb

REVERB_APP_ID=1001
REVERB_APP_KEY=laravel-herd
REVERB_APP_SECRET=secret
REVERB_HOST="reverb.herd.test"
REVERB_PORT=443
REVERB_SCHEME=https

VITE_REVERB_APP_KEY="${REVERB_APP_KEY}"
VITE_REVERB_HOST="${REVERB_HOST}"
VITE_REVERB_PORT="${REVERB_PORT}"
VITE_REVERB_SCHEME="${REVERB_SCHEME}"
```

**Note:** Herd provides a built-in Reverb server at `reverb.herd.test` - no need to run `php artisan reverb:start`!

---

## 🧩 Integration Flow

```
┌─────────────────┐
│  Flutter App    │
│  (Shop Owner)   │
└────────┬────────┘
         │
         │ 1. Scan QR Code
         │
         ▼
┌─────────────────────────────┐
│ POST /api/shop-owner/scan/  │
│      validate               │
└────────┬────────────────────┘
         │
         │ 2. Create ScanSession
         │
         ▼
┌─────────────────────────────┐
│  Return user data +         │
│  session_id                 │
└────────┬────────────────────┘
         │
         │ 3. Shop owner clicks "Approve"
         │
         ▼
┌─────────────────────────────┐
│ POST /api/shop-owner/scan/  │
│      approve                │
└────────┬────────────────────┘
         │
         │ 4. Update session & Broadcast event
         │
         ▼
┌─────────────────────────────┐
│  Laravel Reverb             │
│  Broadcasts to private      │
│  channel: user.{userId}     │
└────────┬────────────────────┘
         │
         │ 5. Real-time push
         │
         ▼
┌─────────────────┐
│  Flutter App    │
│  (Customer)     │
│  → Receipt Form │
└─────────────────┘
```

---

## 🎉 Implementation Complete!

All backend functionality for the QR scanning feature has been implemented:

✅ Database migrations
✅ Models with relationships and helper methods
✅ API endpoints for validate/approve/reject
✅ Real-time broadcasting with Reverb
✅ Test data seeded
✅ Private channel authorization
✅ Session status polling endpoint (fallback)

**Ready to test with Flutter app!** 🚀
