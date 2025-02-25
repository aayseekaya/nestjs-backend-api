# Proje Yönetim API

Bu proje, NestJS, MongoDB ve Docker kullanılarak geliştirilmiş bir proje yönetim API'sidir. Projeler, görevler ve alt görevler oluşturabilir, bunların ilerlemelerini takip edebilir ve dosya yükleyebilirsiniz.

## Özellikler

- 📁 Proje-Görev-Alt Görev hiyerarşisi
- 📊 Otomatik ilerleme hesaplaması
- 📈 Ağırlıklı görev ve alt görev yönetimi
- 📎 Dosya yükleme desteği
- 📑 Swagger API dokümantasyonu
- 🔒 Rate limiting koruması
- 🐳 Docker desteği

## Başlangıç

### Ön Gereksinimler

- Docker ve Docker Compose
- Node.js (geliştirme için)
- Git

### Kurulum

1. Projeyi klonlayın:
    ```bash
    git clone https://github.com/aayseekaya/nestjs-backend-api.git
    cd nestjs-backend-api
    ```

2. Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

3. Geliştirme modunda çalıştırın:
    ```bash
    npm run dev
    ```

4. Docker Compose dosyasını oluşturun:

    ```bash
      docker-compose up -d  
    ```

### API'ye Erişim

- API: `http://localhost:4000`
- Swagger Dokümantasyonu: `http://localhost:4000/docs`

## API Kullanımı

### 1. Proje Yönetimi

**Proje oluşturma**  
`POST /projects`  
Örnek istek:
```json
{
  "name": "Yeni Proje"
}
```

**Proje listesi**  
`GET /projects`

**Proje detayı**  
`GET /projects/:id`

**Proje güncelleme**  
`PATCH /projects/:id`  
Örnek istek:
```json
{
  "name": "Güncellenmiş Proje Adı",
  "progress": 50
}
```

**Dosya yükleme**  
`POST /projects/:id/upload`  
Content-Type: multipart/form-data  
Form verisi:
```json
{
  "file": "dosya"
}
```

### 2. Görev Yönetimi

**Görev oluşturma**  
`POST /tasks`  
Örnek istek:
```json
{
  "name": "Yeni Görev",
  "weight": 40,
  "projectId": "proje-id"
}
```

**Görev güncelleme**  
`PATCH /tasks/:id`  
Örnek istek:
```json
{
  "progress": 75
}
```

### 3. Alt Görev Yönetimi

**Alt görev oluşturma**  
`POST /subtasks`  
Örnek istek:
```json
{
  "name": "Yeni Alt Görev",
  "weight": 30,
  "taskId": "görev-id"
}
```

**Alt görev ilerleme güncellemesi**  
`PATCH /subtasks/:id`  
Örnek istek:
```json
{
  "progress": 60
}
```

### 4. İstatistikler

**Tüm projelerin istatistikleri**  
`GET /projects/stats/progress`

**Belirli projelerin istatistikleri**  
`GET /projects/stats/progress?ids=proje-id-1,proje-id-2`

## Proje Yapısı

```plaintext
src/
├── projects/ # Proje modülü
├── tasks/ # Görev modülü
├── subtasks/ # Alt görev modülü
├── app.module.ts # Ana modül
└── main.ts # Uygulama girişi
uploads/ # Yüklenen dosyalar
```

