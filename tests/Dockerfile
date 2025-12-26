FROM mcr.microsoft.com/playwright:v1.48.2-jammy

# Set working directory
WORKDIR /app

# Copy package.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project (including tests/)
COPY . .

# Run Playwright browsers installation
RUN npx playwright install --with-deps

# Default command → run all tests
CMD ["npx", "playwright", "test"]