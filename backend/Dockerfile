# Use Python 3.13 slim image as base
FROM python:3.13-slim

# Install system dependencies (curl and bash needed for uv installation)
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ADD https://astral.sh/uv/install.sh /install.sh
RUN chmod -R 755 /install.sh && /install.sh && rm /install.sh

# Set up the UV environment path
ENV PATH="/root/.local/bin:${PATH}"

# Set working directory
WORKDIR /app

# Verify uv is installed and accessible
RUN uv --version

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install Python dependencies
RUN uv sync

# Copy application code
COPY . .

# Expose port 8000
EXPOSE 8000

# Set PATH to use virtual environment Python
ENV PATH="/app/.venv/bin:${PATH}"

# Set PYTHONPATH so Python can find the backend module
ENV PYTHONPATH="/app:${PYTHONPATH}"

# Run the application using uv run to ensure it uses the virtual environment
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

