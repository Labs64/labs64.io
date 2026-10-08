# List available commands
default:
    @just --list

# Start the Jekyll development server
serve *ARGS:
    @echo "🚀 Starting Jekyll development server..."
    docker compose up --build {{ARGS}}

# Stop the Docker Compose services
down:
    docker compose down

# Follow the Docker Compose logs
logs:
    docker compose logs -f

# Remove containers and volumes, then rebuild and start the server
clean:
    docker compose down -v
    docker compose up --build

# Check the Jekyll site for configuration problems
doctor:
    docker compose exec labs64io bundle exec jekyll doctor

# Check links and HTML in the built site with html-proofer
proofer:
    docker compose exec labs64io bundle exec htmlproofer ./_site

# Create a new draft post with the given title
new-post title:
    ./_new_post.sh "{{title}}"

# Build the static site once
build:
    docker compose run --rm labs64io bundle exec jekyll build --config _config.yml

# Install Ruby dependencies
install:
    docker compose run --rm labs64io bundle install

# Move a draft into _posts with today's date as the file name prefix
publish draft_filename:
    #!/usr/bin/env bash
    set -e
    DRAFT_PATH="_drafts/{{draft_filename}}"
    if [ ! -f "$DRAFT_PATH" ]; then
        echo "Error: Draft not found at $DRAFT_PATH"
        exit 1
    fi
    DATE_PREFIX=$(date +"%Y-%m-%d")
    BASE_NAME=$(basename "{{draft_filename}}" | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//')
    NEW_PATH="_posts/${DATE_PREFIX}-${BASE_NAME}"
    mv "$DRAFT_PATH" "$NEW_PATH"
    echo "✅ Published $DRAFT_PATH to $NEW_PATH"

# Fail if a banned marketing claim shows up in the site
claim-check:
    ./scripts/claim-check.sh

# Build the site, then fail if any existing permalink no longer resolves
permalink-check: build
    ./scripts/permalink-check.sh
