Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  resources :users
  resources :verify
  resources :missing
  resources :match
  resources :chatbot
  post 'document', to: 'document#create'
  post 'document/retrieve', to: 'document#retrieve'
  post 'document/status', to: 'document#status'
  post 'login', to: 'login#create'
  get 'notifications/:id', to: 'notifications#show'
  post 'notifications/read', to: 'notifications#mark_all_as_read'
  post 'missing/upload', to: 'missing#upload'
  post 'authentication/upload', to: 'authentication#upload'
  post 'authentication/verify', to: 'authentication#verify'
  get 'match/associated/:id', to: 'match#associated'
end
