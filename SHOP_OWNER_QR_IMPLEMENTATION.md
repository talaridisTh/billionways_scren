# 🎯 Shop Owner QR Scanning Implementation Guide

## ✅ Τι Έχει Υλοποιηθεί

### 📁 Files Created

#### **Models**
- ✅ `lib/features/shop_owner/data/models/scanned_user.dart` - User data από QR scan
- ✅ `lib/features/shop_owner/data/models/transaction_approval.dart` - Approval response

#### **API Endpoints**
- ✅ `lib/features/shop_owner/data/shop_owner_api.dart` - **Centralized API endpoints** (όχι hardcoded!)

#### **Repositories**
- ✅ `lib/features/shop_owner/data/repositories/shop_owner_scan_repository.dart` - Interface
- ✅ `lib/features/shop_owner/data/repositories/shop_owner_scan_repository_fake.dart` - Mock με 3 test users
- ✅ `lib/features/shop_owner/data/repositories/shop_owner_scan_repository_remote.dart` - API placeholder (UnimplementedError)
- ✅ `lib/features/shop_owner/data/repositories/shop_owner_scan_repository_provider.dart` - Provider

#### **Controllers**
- ✅ `lib/features/shop_owner/presentation/controllers/shop_owner_qr_scan_controller.dart` - Business logic

#### **Views**
- ✅ `lib/features/shop_owner/presentation/views/shop_owner_qr_scanner_screen.dart` - QR Scanner με DEBUG mode
- ✅ `lib/features/shop_owner/presentation/views/user_approval_screen.dart` - User approval UI

#### **Configuration**
- ✅ Updated `lib/app/router.dart` - Added routes
- ✅ Updated `lib/core/services/config_service.dart` - Added fake repository flag
- ✅ Updated `lib/app/l10n/app_en.arb` - Added localization strings
- ✅ Updated `lib/features/shop_owner/presentation/views/owner_tabs_scaffold.dart` - QR button routing

---

## 🧪 Testing - Debug Mode

### **Built-in Test Users**

Το QR scanner screen έχει **DEBUG MODE** με 3 προκαθορισμένους users:

```dart
'USER_QR_TOKEN_001' → John Doe (Premium, 15% discount)
'USER_QR_TOKEN_002' → Jane Smith (Basic, 10% discount)
'USER_QR_TOKEN_003' → Maria Papadopoulos (Premium Plus, 20% discount)
'EXPIRED_TOKEN' → Invalid user
```

### **Πώς να κάνεις testing:**

1. **Ανοιγμα shop owner QR scanner:**
   - Από το bottom navigation bar → QR icon
   - Ή: `Navigator.pushNamed(RouteNames.shopOwnerQrScanner)`

2. **Debug Panel (top της οθόνης - κίτρινο background):**
   - Button "User #1" → Scans USER_QR_TOKEN_001
   - Button "User #2" → Scans USER_QR_TOKEN_002  
   - Button "User #3" → Scans USER_QR_TOKEN_003
   - Manual input field → Πληκτρολόγησε οποιοδήποτε QR token

3. **Flow:**
   ```
   QR Scanner → Validate → User Approval Screen → Approve/Reject
   ```

4. **Disable Debug Mode:**
   ```dart
   ShopOwnerQrScannerScreen(debugMode: false)  // Απενεργοποίηση debug panel
   ```

---

## 🔌 Backend Integration - Laravel

### **API Endpoints (Defined in `shop_owner_api.dart`):**

```dart
// lib/features/shop_owner/data/shop_owner_api.dart
class ShopOwnerApi {
  static const String scanValidate = '/api/shop-owner/scan/validate';
  static const String scanApprove = '/api/shop-owner/scan/approve';
  static const String scanReject = '/api/shop-owner/scan/reject';
  // ... όλα τα endpoints σε ένα μέρος!
}
```

### **Laravel Endpoints που χρειάζεσαι:**

#### **1. Validate QR Code**
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
    "user_id": "user_001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+30 123 456 7890",
    "subscription": "Premium",
    "is_valid": true,
    "avatar_url": "https://...",
    "store_id": "store_123",
    "offer_id": "offer_456",
    "discount_percentage": 15.0,
    "session_id": "session_abc123"
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

#### **2. Approve Transaction**
```
POST /api/shop-owner/scan/approve
```

**Request:**
```json
{
  "session_id": "session_abc123",
  "user_id": "user_001",
  "store_id": "store_123",
  "offer_id": "offer_456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction_id": "tx_xyz789",
    "approved": true,
    "timestamp": "2025-10-05T20:00:00Z",
    "session_id": "session_abc123",
    "message": "Transaction approved successfully"
  }
}
```

---

#### **3. Reject Transaction**
```
POST /api/shop-owner/scan/reject
```

**Request:**
```json
{
  "session_id": "session_abc123",
  "user_id": "user_001",
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

---

## 🔄 Real-Time Communication (User Notification)

### **Option 1: Laravel Pusher/Soketi (Recommended)**

Όταν ο shop owner κάνει approve, πρέπει να ενημερωθεί ο χρήστης **real-time**.

#### **Laravel Event:**
```php
// app/Events/TransactionApproved.php
class TransactionApproved implements ShouldBroadcast
{
    public $session;

    public function __construct(ScanSession $session)
    {
        $this->session = $session;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('user.' . $this->session->user_id);
    }

    public function broadcastAs()
    {
        return 'transaction.approved';
    }

    public function broadcastWith()
    {
        return [
            'session_id' => $this->session->session_id,
            'store_id' => $this->session->store_id,
            'offer_id' => $this->session->offer_id,
            'discount' => $this->session->offer->discount_percentage,
        ];
    }
}
```

#### **Trigger στο Controller:**
```php
public function approveTransaction(Request $request)
{
    // ... validation & session update ...
    
    event(new TransactionApproved($session));
    
    return response()->json([...]);
}
```

---

### **Option 2: Simple Polling (Easier to implement)**

Αν δεν έχεις Pusher/WebSocket setup, χρησιμοποίησε polling:

#### **Laravel - Status Check Endpoint:**
```php
// GET /api/user/scan-session/{sessionId}/status
public function checkSessionStatus($sessionId)
{
    $session = ScanSession::where('session_id', $sessionId)->first();
    
    return response()->json([
        'status' => $session->status,  // 'pending', 'approved', 'rejected'
        'approved_at' => $session->approved_at,
    ]);
}
```

#### **Flutter - User App Polling:**
```dart
Timer.periodic(Duration(seconds: 2), (timer) async {
  final response = await dio.get('/api/user/scan-session/$sessionId/status');
  
  if (response.data['status'] == 'approved') {
    timer.cancel();
    Navigator.pushNamed(context, RouteNames.receiptInput, arguments: sessionId);
  }
});
```

---

## 📊 Database Schema (Laravel)

### **1. user_qr_codes Table**
```sql
CREATE TABLE user_qr_codes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    qr_token VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_qr_token (qr_token),
    INDEX idx_user_id (user_id)
);
```

### **2. scan_sessions Table**
```sql
CREATE TABLE scan_sessions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    shop_owner_id BIGINT UNSIGNED NOT NULL,
    store_id BIGINT UNSIGNED NOT NULL,
    offer_id BIGINT UNSIGNED NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (shop_owner_id) REFERENCES shop_owners(id),
    FOREIGN KEY (store_id) REFERENCES stores(id),
    FOREIGN KEY (offer_id) REFERENCES offers(id),
    INDEX idx_session_id (session_id),
    INDEX idx_status (status)
);
```

---

## 🎨 User App - QR Code Display

Για να βλέπει ο χρήστης το QR code του:

### **1. Add Package:**
```yaml
dependencies:
  qr_flutter: ^4.1.0
```

### **2. Display QR in Profile:**
```dart
import 'package:qr_flutter/qr_flutter.dart';

QrImageView(
  data: 'USER_QR_TOKEN_${userId}',
  version: QrVersions.auto,
  size: 250.0,
  backgroundColor: Colors.white,
)
```

---

## 🚀 How to Switch to Production

### **1. Disable Fake Repository:**
```dart
// lib/core/services/config_service.dart
static const bool useFakeShopOwnerScanRepository = false;  // ⬅️ Change to false
```

### **2. Configure API Base URL:**
```dart
// lib/core/http/dio_client.dart
// Ensure baseUrl points to production Laravel API
```

### **3. Update Store/Offer IDs:**
```dart
// In shop_owner_qr_scanner_screen.dart, replace hardcoded values:
await _qrController.validateQrCode(
  qrCode,
  'ACTUAL_STORE_ID',     // ⬅️ Get from authenticated shop owner
  'ACTUAL_OFFER_ID',     // ⬅️ Get from selected offer
);
```

---

## 🔒 Security Considerations

1. **QR Token Generation:**
   - Use UUID v4 για unique tokens
   - Expiration time (24 hours recommended)
   - Rotate after successful scan

2. **API Authentication:**
   - Shop owner πρέπει να είναι authenticated
   - Validate session ownership
   - Rate limiting (max 10 scans/minute)

3. **Authorization:**
   - Verify shop owner owns the store
   - Verify offer belongs to store
   - Validate user subscription status

---

## 📝 Next Steps (User App Side)

### **Να προσθέσεις στο user app:**

1. **User QR Code Screen:**
   ```dart
   // lib/features/profile/presentation/views/user_qr_code_screen.dart
   - Display user's QR code using qr_flutter
   - Show subscription status
   - Refresh button
   ```

2. **Listen for Approval:**
   ```dart
   // Option A: Pusher WebSocket
   PusherChannels.subscribe('private-user.$userId')
   
   // Option B: Polling after showing QR
   checkApprovalStatus(sessionId)
   ```

3. **Auto-Navigate to Manual Price Entry:**
   ```dart
   // When approved event received:
   Navigator.pushNamed(
     context,
     RouteNames.receiptInput,
     arguments: {'sessionId': sessionId},
   );
   ```

---

## 🧪 Testing Checklist

- [ ] Shop owner opens QR scanner
- [ ] Debug buttons work (User #1, #2, #3)
- [ ] Manual QR input works
- [ ] Valid QR → Shows user approval screen
- [ ] Invalid QR → Shows error message
- [ ] Approve button → Success message
- [ ] Reject button → Rejection message
- [ ] Navigation back to scanner works
- [ ] Loading states display correctly
- [ ] Error handling works

---

## 📞 Integration Summary

### **Flutter → Laravel Flow:**
```
1. Shop owner scans QR
   ↓
2. Flutter calls: POST /api/shop-owner/scan/validate
   ↓
3. Laravel validates user & creates scan_session
   ↓
4. Laravel returns user data + session_id
   ↓
5. Shop owner clicks "Approve"
   ↓
6. Flutter calls: POST /api/shop-owner/scan/approve
   ↓
7. Laravel updates session & broadcasts event
   ↓
8. User receives notification (Pusher/Polling)
   ↓
9. User app navigates to manual price entry
```

---

## 🎯 Configuration Quick Reference

### **Enable/Disable Debug Mode:**
```dart
// In router.dart or when pushing:
ShopOwnerQrScannerScreen(debugMode: true)   // Debug ON
ShopOwnerQrScannerScreen(debugMode: false)  // Debug OFF (production)
```

### **Mock Repository Toggle:**
```dart
// lib/core/services/config_service.dart
static const bool useFakeShopOwnerScanRepository = true;  // Development
static const bool useFakeShopOwnerScanRepository = false; // Production
```

---

## 📚 Localization Strings Added

```json
{
  "shopOwnerScanUserQr": "Scan User QR Code",
  "shopOwnerScanInstructions": "Point camera at customer's QR code to validate and approve offer",
  "shopOwnerApproveCustomer": "Approve Customer",
  "shopOwnerCustomerDetails": "Customer Details",
  "shopOwnerOfferDetails": "Offer Details",
  "shopOwnerDiscount": "Discount",
  "shopOwnerApprovalInfo": "After approval, customer will receive notification to enter transaction amount",
  "shopOwnerApprove": "Approve Offer",
  "shopOwnerReject": "Reject"
}
```

Για Greek translations: Add στο `app_el.arb`

---

## 📝 Adding New API Endpoints

**ΠΑΝΤΑ προσθέτεις νέα endpoints στο `shop_owner_api.dart`:**

```dart
// lib/features/shop_owner/data/shop_owner_api.dart
class ShopOwnerApi {
  // Existing endpoints...
  static const String scanValidate = '/api/shop-owner/scan/validate';
  
  // ✅ Add new endpoint here:
  static const String newEndpoint = '/api/shop-owner/new-feature';
}
```

**Χρήση στο repository:**

```dart
// ❌ WRONG - Hardcoded
final response = await _client.post('/api/shop-owner/new-feature');

// ✅ CORRECT - Using constant
final response = await _client.post(ShopOwnerApi.newEndpoint);
```

**Πλεονεκτήματα:**
- ✅ Centralized management
- ✅ Easy refactoring
- ✅ Type-safe
- ✅ No typos
- ✅ Easy to find all endpoints

---

## 🐛 Troubleshooting

### **Issue: "Invalid or expired QR code"**
- Verify mock user tokens match (`USER_QR_TOKEN_001`, etc.)
- Check repository is using fake mode
- Ensure QR token is not empty

### **Issue: Navigation not working**
- Verify routes are registered in `router.dart`
- Check `RouteNames.shopOwnerUserApproval` exists
- Ensure `ScannedUser` is passed as argument

### **Issue: Localization missing**
- Run `flutter gen-l10n`
- Restart app
- Check `app_en.arb` has all keys

---

## ✅ Implementation Complete!

Όλα τα files έχουν δημιουργηθεί και configured. 

**Ready for testing με debug mode!** 🚀

Για production: Υλοποίησε το Laravel backend με βάση το παραπάνω documentation.
