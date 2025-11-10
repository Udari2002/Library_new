FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy source
COPY . .

# Expose Vite default port and run dev server binding to 0.0.0.0
EXPOSE 5173
ENV HOST=0.0.0.0
ENV PORT=5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
