# EnableID for Gebirah Backend

## Prerequesites

* Ruby version: 3.3.1

* Rails version: 7.1.3.4

## System dependencies

* PostgreSQL

* Docker

* Rspec for testing

* Turbo and Stimulus for modern Rails development

For a complete list of dependencies, please refer to the Gemfile in the project repository.

## Some notable API usages

* Google Cloud Translate v2

* Google Vertex AI Agent Builder

* Google Gemini 1.5 Flash 

* AWS Rekognition Client 

* Tesseract

## Deployment instructions

1. Change directory to 'backend':
```
cd 1d-final-project-summer-2024-sds-2024-team-14/backend
```

2. Install dependencies for rails:
```
bundle install
```

3. Setup database:
```
rails db:create
rails db:migrate
rails db:prepare
```

4. Run the rails server:
```
rails server
```

## Testing

Run the following command:
```
rspec
```