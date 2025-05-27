#!/bin/bash

set -e

PROFILE=$1

if [[ -z "$PROFILE" ]]; then
  echo "❌ Please specify the database profile: h2 | postgresql | docker"
  exit 1
fi

echo "🔧 Starting Note Full Stack App..."

FRONTEND_PORT=5173
BACKEND_PORT=3000
SPRING_CONFIG_PATH="backend/src/main/resources/application.properties"

if [[ "$PROFILE" == "postgresql" ]]; then
  echo "🔐 Enter PostgreSQL credentials for your local installation:"
  read -p "🧑 Username: " DB_USER
  read -s -p "🔑 Password: " DB_PASS
  echo ""
  cat > "$SPRING_CONFIG_PATH" <<EOF
spring.datasource.url=jdbc:postgresql://localhost:5432/notes_db
spring.datasource.username=$DB_USER
spring.datasource.password=$DB_PASS
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
server.port=$BACKEND_PORT
EOF
  echo "✅ PostgreSQL config generated at $SPRING_CONFIG_PATH"

elif [[ "$PROFILE" == "docker" ]]; then
  echo "🐘 Starting PostgreSQL with Docker..."
  docker run -d \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=1234 \
    -e POSTGRES_DB=notes_db \
    -p 5432:5432 \
    --name notes_pg postgres:15

  cat > "$SPRING_CONFIG_PATH" <<EOF
spring.datasource.url=jdbc:postgresql://localhost:5432/notes_db
spring.datasource.username=postgres
spring.datasource.password=1234
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
server.port=$BACKEND_PORT
EOF
  echo "✅ Docker-based PostgreSQL config generated at $SPRING_CONFIG_PATH"

elif [[ "$PROFILE" == "h2" ]]; then
  echo "🗃️ Using H2 (file-based persistence)..."
  mkdir -p backend/data
  H2_PATH="file:./backend/data/notes"
  cat > "$SPRING_CONFIG_PATH" <<EOF
spring.datasource.url=jdbc:h2:$H2_PATH
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
server.port=$BACKEND_PORT
EOF
  echo "✅ H2 config generated at $SPRING_CONFIG_PATH"

else
  echo "❌ PROFILE '$PROFILE' not supported. Use 'postgresql', 'docker' or 'h2'."
  exit 1
fi

echo "🚀 Starting Spring Boot backend..."
cd backend
./mvnw spring-boot:run &
BACK_PID=$!
cd ..

# Wait for backend to be available
echo "⏳ Waiting for backend to start..."
until curl -s "http://localhost:$BACKEND_PORT/api/notes" >/dev/null; do
  sleep 1
done
echo "✅ Backend is up."

echo "📦 Installing frontend dependencies..."
cd frontend
npm install

echo "🌐 Starting Vite frontend..."
npm run dev -- --port $FRONTEND_PORT &
FRONT_PID=$!
cd ..

sleep 2

# Open in browser
URL="http://localhost:$FRONTEND_PORT"
if command -v xdg-open > /dev/null; then
  xdg-open "$URL"
elif command -v open > /dev/null; then
  open "$URL"
elif command -v start > /dev/null; then
  start "$URL"
else
  echo "🌍 Open manually: $URL"
fi

# Cleanup processes on exit
trap "kill $BACK_PID $FRONT_PID; docker stop notes_pg >/dev/null 2>&1 || true" EXIT

# Keep processes alive
wait