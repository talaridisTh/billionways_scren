# 🧪 Reverb Testing Guide

## ✅ Τρόποι να Τσεκάρεις ότι Λειτουργεί το Reverb

### **1️⃣ Artisan Command (Πιο Εύκολο)** ⭐

Δημιούργησα ένα custom command που στέλνει test events:

```bash
php artisan reverb:test
```

**Αποτέλεσμα:**
```
Creating test scan session for user: John Doe (ID: 1)
✅ Session created: test_60f18f19-4336-4d3a-a48c-4ad3252161f5
📡 Broadcasting TransactionApproved event...

🎉 Event broadcasted successfully!

+------------+-------------------------------------------+
| Property   | Value                                     |
+------------+-------------------------------------------+
| Channel    | private-user.1                            |
| Event      | transaction.approved                      |
| Session ID | test_60f18f19-4336-4d3a-a48c-4ad3252161f5 |
| User ID    | 1                                         |
| User Name  | John Doe                                  |
| Status     | approved                                  |
+------------+-------------------------------------------+
```

**Test με διαφορετικό user:**
```bash
php artisan reverb:test --user-id=5
```

---

### **2️⃣ Browser Test Page (Visual)** 🌐

Άνοιξε στον browser:

```
https://billionways.test/reverb-test.html
```

**Τι κάνει:**
- ✅ Δείχνει το Reverb configuration
- ✅ Συνδέεται στο WebSocket server
- ✅ Ακούει για events σε real-time
- ✅ Εμφανίζει όλα τα events που λαμβάνει

**Πώς να το δοκιμάσεις:**

1. **Άνοιξε το page** στον browser
2. **Κάνε click "Connect to Reverb"**
   - Θα δεις: 🟢 Connected to Reverb!
3. **Σε άλλο terminal τρέξε:**
   ```bash
   php artisan reverb:test
   ```
4. **Στο browser θα δεις το event να εμφανίζεται live!**

---

### **3️⃣ Tinker (Advanced)** 💻

```bash
php artisan tinker
```

Μέσα στο tinker:

```php
$user = App\Models\User::first();

$session = App\Models\ScanSession::create([
    'session_id' => 'test_' . Str::uuid(),
    'user_id' => $user->id,
    'shop_owner_id' => 'test',
    'store_id' => 'test',
    'offer_id' => 'test',
    'status' => 'pending',
]);

$session->approve();

event(new App\Events\TransactionApproved($session));
```

---

### **4️⃣ Check Reverb Logs** 📋

Αν θέλεις να δεις τα logs από το Reverb:

```bash
tail -f storage/logs/laravel.log | grep -i reverb
```

---

### **5️⃣ cURL Test (API Endpoints)** 🔧

**Test validate endpoint:**
```bash
curl -X POST https://billionways.test/api/shop-owner/scan/validate \
  -H "Content-Type: application/json" \
  -d '{
    "qr_token": "USER_QR_TOKEN_001",
    "store_id": "store_123",
    "offer_id": "offer_456"
  }'
```

**Αποτέλεσμα:** Θα πάρεις ένα `session_id`

**Test approve endpoint (στέλνει Reverb event):**
```bash
curl -X POST https://billionways.test/api/shop-owner/scan/approve \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "SESSION_ID_FROM_ABOVE",
    "user_id": 1,
    "store_id": "store_123",
    "offer_id": "offer_456"
  }'
```

**Αν έχεις ανοιχτό το browser test page, θα δεις το event live!** 🎉

---

## 🔍 Troubleshooting

### ❌ "Connection failed"

**Check 1: Reverb configuration**
```bash
php artisan config:clear
php artisan cache:clear
```

**Check 2: Verify .env**
```bash
cat .env | grep REVERB
```

Πρέπει να δεις:
```
REVERB_APP_ID=1001
REVERB_APP_KEY=laravel-herd
REVERB_APP_SECRET=secret
REVERB_HOST="reverb.herd.test"
REVERB_PORT=443
REVERB_SCHEME=https
```

**Check 3: Test DNS**
```bash
ping reverb.herd.test
```

Πρέπει να επιστρέφει `127.0.0.1`

---

### ❌ "Events not received"

**Check 1: Broadcast driver**
```bash
php artisan config:show broadcasting
```

Πρέπει να δεις:
```
default => "reverb"
```

**Check 2: Queue running**

Αν χρησιμοποιείς queue για τα events:
```bash
php artisan queue:work
```

---

### ❌ "Private channel subscription error"

Αυτό είναι **φυσιολογικό** στο browser test page γιατί τα private channels χρειάζονται authentication.

**Για να φτιάξεις:**

1. Κάνε login ως user
2. Χρησιμοποίησε το Laravel Echo με authentication headers

Το Flutter app θα χρειαστεί να περάσει το Bearer token:

```dart
'auth': {
  'headers': {
    'Authorization': 'Bearer ${user.token}',
  },
}
```

---

## 📊 Quick Test Workflow

**Full end-to-end test σε 3 βήματα:**

1. **Άνοιξε το browser test page:**
   ```
   https://billionways.test/reverb-test.html
   ```

2. **Connect to Reverb** (click το κουμπί)

3. **Στο terminal τρέξε:**
   ```bash
   php artisan reverb:test
   ```

4. **Στο browser θα δεις το event!** ✅

---

## 🎯 What to Expect

### ✅ Successful Connection
- Browser shows: **🟢 Connected to Reverb!**
- Events appear in real-time
- Command completes without errors

### ✅ Successful Event Broadcast
```json
{
  "session_id": "test_abc-123",
  "store_id": "test_store",
  "offer_id": "test_offer",
  "approved_at": "2025-10-05T17:38:16+00:00",
  "status": "approved"
}
```

---

## 🚀 Ready for Production

Όταν δεις:
- ✅ `php artisan reverb:test` τρέχει χωρίς errors
- ✅ Browser test page συνδέεται επιτυχώς
- ✅ Events εμφανίζονται live στο browser
- ✅ API endpoints επιστρέφουν σωστά responses

**Τότε το Reverb λειτουργεί σωστά και είσαι έτοιμος να συνδέσεις το Flutter app!** 🎉

---

## 📝 Command Reference

| Command | Description |
|---------|-------------|
| `php artisan reverb:test` | Send test event to user 1 |
| `php artisan reverb:test --user-id=5` | Send test event to specific user |
| `php artisan config:clear` | Clear config cache |
| `php artisan queue:work` | Start queue worker |
| `php artisan tinker` | Open Laravel shell |

---

## 🔗 Useful Links

- **Browser Test:** https://billionways.test/reverb-test.html
- **API Base:** https://billionways.test/api
- **Reverb WebSocket:** wss://reverb.herd.test:443

**Happy Testing!** 🚀
