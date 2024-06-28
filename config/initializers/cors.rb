Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins "http://localhost:3000",
              "http://127.0.0.1:3000",
              "https://gebirah-frontend-2r6b52gguq-as.a.run.app/",
              "https://gebirah-aid-2r6b52gguq-as.a.run.app/"
  
      resource "*",
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true,
        max_age: 86400
    end
  end
  