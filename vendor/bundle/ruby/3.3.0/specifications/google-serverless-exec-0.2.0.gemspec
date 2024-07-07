# -*- encoding: utf-8 -*-
# stub: google-serverless-exec 0.2.0 ruby lib

Gem::Specification.new do |s|
  s.name = "google-serverless-exec".freeze
  s.version = "0.2.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/GoogleCloudPlatform/serverless-exec-ruby/issues", "changelog_uri" => "https://www.rubydoc.info/gems/google-serverless-exec/0.2.0/file/CHANGELOG.md", "documentation_uri" => "https://www.rubydoc.info/gems/google-serverless-exec/0.2.0", "source_code_uri" => "https://github.com/GoogleCloudPlatform/serverless-exec-ruby" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Daniel Azuma".freeze, "Tram Bui".freeze]
  s.date = "2021-09-13"
  s.description = "The google-serverless-exec gem provides a way to safely run production maintenance tasks, such as database migrations, for your serverless applications deployed to Google App Engine or Google Cloud Run.".freeze
  s.email = ["dazuma@gmail.com".freeze, "trambui09098@gmail.com".freeze]
  s.homepage = "https://github.com/GoogleCloudPlatform/serverless-exec-ruby".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.5.0".freeze)
  s.rubygems_version = "3.5.9".freeze
  s.summary = "Execute production tasks for Google Serverless apps".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_development_dependency(%q<google-style>.freeze, ["~> 1.25.1".freeze])
  s.add_development_dependency(%q<minitest>.freeze, ["~> 5.11".freeze])
  s.add_development_dependency(%q<minitest-focus>.freeze, ["~> 1.1".freeze])
  s.add_development_dependency(%q<minitest-rg>.freeze, ["~> 5.2".freeze])
  s.add_development_dependency(%q<rake>.freeze, ["~> 13.0".freeze])
  s.add_development_dependency(%q<rdoc>.freeze, ["~> 6.0".freeze])
  s.add_development_dependency(%q<redcarpet>.freeze, ["~> 3.4".freeze])
  s.add_development_dependency(%q<yard>.freeze, ["~> 0.9".freeze])
end
