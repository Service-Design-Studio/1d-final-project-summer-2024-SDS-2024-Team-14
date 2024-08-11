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

* Tesseract - Please install tesseract on your os for this to work, including the Burmese, Arabic and Malaysia language pack

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

4. Change to your own credentials
Command + Shift + F to search for "Rails.application.credentials" and replace all of them with your own credentials"  
You can also use: 
```
EDITOR="code --wait" rails credentials:edit
```
Set your own credentials inside before closing it to be encrypted by a master key that is written under config/master.key  
For more details, please read the guide to rails credentials here: https://webcrunch.com/posts/the-complete-guide-to-ruby-on-rails-encrypted-credentials

5. Run the rails server:
```
rails server
```
or if you would like to run both frontend and backend together:
```
rails server -p 3001
```

## Testing

Run the following command:
```
rspec
```
