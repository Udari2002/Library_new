# frontend/Dockerfile (PROD)
FROM node:20 AS build
WORKDIR /app

# Accept build argument for API URL
ARG VITE_API_BASE=http://localhost:5001/api
ENV VITE_API_BASE=$VITE_API_BASE

COPY package*.json ./
RUN npm install --silent
COPY . .

# Debug: Show what environment variables are set during build
RUN echo "🔧 Build-time environment variables:"
RUN echo "VITE_API_BASE=$VITE_API_BASE"

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
