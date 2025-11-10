FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --silent

# Copy source
COPY . .

# Expose port and start
EXPOSE 5001
ENV PORT=5001
CMD ["npm", "run", "start"]
