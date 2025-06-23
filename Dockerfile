# Gunakan image Node.js
FROM node:18-alpine

# Set direktori kerja
WORKDIR /app

# Salin package.json dan install dependencies
COPY package*.json ./
RUN npm install

# Salin seluruh isi proyek
COPY . .

# Build project Next.js
RUN npm run build

# Ekspos port
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
