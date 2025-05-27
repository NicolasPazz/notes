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
SPRING_CONFIG_FILE="backend/src/main/resources/application-local.properties"
TEMP_CONFIG=true

create_config() {
  case "$PROFILE" in
    postgresql)
      echo "🔐 Enter PostgreSQL credentials for your local installation:"
      read -p "🧑 Username: " DB_USER
      read -s -p "🔑 Password: " DB_PASS
      echo ""
      cat > "$SPRING_CONFIG_FILE" <<EOF
spring.datasource.url=jdbc:postgresql://localhost:5432/notes_db
spring.datasource.username=$DB_USER
spring.datasource.password=$DB_PASS
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
server.port=$BACKEND_PORT
FRONTEND_URL=http://localhost:5173
EOF
      ;;
    docker)
      echo "🐘 Starting PostgreSQL with Docker..."
      docker run -d \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=1234 \
        -e POSTGRES_DB=notes_db \
        -p 5432:5432 \
        --name notes_pg postgres:15
      cat > "$SPRING_CONFIG_FILE" <<EOF
spring.datasource.url=jdbc:postgresql://localhost:5432/notes_db
spring.datasource.username=postgres
spring.datasource.password=1234
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
server.port=$BACKEND_PORT
FRONTEND_URL=http://localhost:5173
EOF
      ;;
    h2)
      echo "🗃️ Using H2 (file-based persistence)..."
      mkdir -p backend/data
      H2_PATH="file:./backend/data/notes"
      cat > "$SPRING_CONFIG_FILE" <<EOF
spring.datasource.url=jdbc:h2:$H2_PATH
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
server.port=$BACKEND_PORT
FRONTEND_URL=http://localhost:5173
EOF
      ;;
    *)
      echo "❌ PROFILE '$PROFILE' not supported. Use 'postgresql', 'docker' or 'h2'."
      exit 1
      ;;
  esac
  echo "✅ Temporary config generated at $SPRING_CONFIG_FILE"
}

cleanup() {
  echo "🧹 Cleaning up..."
  if [[ -f "$SPRING_CONFIG_FILE" && "$TEMP_CONFIG" = true ]]; then
    rm "$SPRING_CONFIG_FILE"
    echo "🗑️ Removed $SPRING_CONFIG_FILE"
  fi
  docker stop notes_pg >/dev/null 2>&1 || true
  docker rm notes_pg >/dev/null 2>&1 || true
  kill $BACK_PID $FRONT_PID >/dev/null 2>&1 || true
}
trap cleanup EXIT

create_config

echo "🚀 Starting Spring Boot backend..."
cd backend
./mvnw spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=local" &
BACK_PID=$!
cd ..

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

wait