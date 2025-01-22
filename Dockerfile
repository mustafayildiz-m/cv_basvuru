# Resmi Node.js imajını kullan
FROM node:20

# Çalışma dizini oluştur ve ayarla
WORKDIR /dockerapps/ikportal.tfo.k12.tr/cv-front
#WORKDIR /Users/keremozkir/WebstormProjects/cv-front

# Paketleri yüklemek için package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Paketleri yükle
RUN npm install

# 4. Tailwind ve diğer dosyaları kopyala
COPY . .

# Sertifika dosyalarını kopyala
COPY certs /app/certs

RUN npm run build

# 5. Tailwind ve diğer geliştirme araçlarını çalıştır
EXPOSE 1587
CMD ["npm", "run", "start"]