# -*- encoding: utf-8 -*-
# stub: google-cloud-translate 3.4.1 ruby lib

Gem::Specification.new do |s|
  s.name = "google-cloud-translate".freeze
  s.version = "3.4.1".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Google LLC".freeze]
  s.date = "2023-06-16"
  s.description = "Cloud Translation can dynamically translate text between thousands of language pairs. Translation lets websites and programs programmatically integrate with the translation service.".freeze
  s.email = "googleapis-packages@google.com".freeze
  s.homepage = "https://github.com/googleapis/google-cloud-ruby".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.6".freeze)
  s.rubygems_version = "3.5.9".freeze
  s.summary = "API Client library for the Cloud Translation API".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<google-cloud-core>.freeze, ["~> 1.6".freeze])
  s.add_runtime_dependency(%q<google-cloud-translate-v2>.freeze, [">= 0.0".freeze, "< 2.a".freeze])
  s.add_runtime_dependency(%q<google-cloud-translate-v3>.freeze, [">= 0.6".freeze, "< 2.a".freeze])
  s.add_development_dependency(%q<google-style>.freeze, ["~> 1.26.1".freeze])
  s.add_development_dependency(%q<minitest>.freeze, ["~> 5.16".freeze])
  s.add_development_dependency(%q<minitest-focus>.freeze, ["~> 1.1".freeze])
  s.add_development_dependency(%q<minitest-rg>.freeze, ["~> 5.2".freeze])
  s.add_development_dependency(%q<rake>.freeze, [">= 13.0".freeze])
  s.add_development_dependency(%q<redcarpet>.freeze, ["~> 3.0".freeze])
  s.add_development_dependency(%q<simplecov>.freeze, ["~> 0.9".freeze])
  s.add_development_dependency(%q<yard>.freeze, ["~> 0.9".freeze])
end
