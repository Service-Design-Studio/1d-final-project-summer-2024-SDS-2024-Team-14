# -*- encoding: utf-8 -*-
# stub: google-cloud-translate-v2 0.5.1 ruby lib

Gem::Specification.new do |s|
  s.name = "google-cloud-translate-v2".freeze
  s.version = "0.5.1".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Google LLC".freeze]
  s.date = "2024-05-23"
  s.description = "Cloud Translation can dynamically translate text between thousands of language pairs. Translation lets websites and programs programmatically integrate with the translation service.".freeze
  s.email = "googleapis-packages@google.com".freeze
  s.homepage = "https://github.com/googleapis/google-cloud-ruby".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7".freeze)
  s.rubygems_version = "3.5.9".freeze
  s.summary = "API Client library for Cloud Translation V2 API".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<faraday>.freeze, [">= 1.0".freeze, "< 3.a".freeze])
  s.add_runtime_dependency(%q<googleapis-common-protos>.freeze, [">= 1.3.10".freeze, "< 2.a".freeze])
  s.add_runtime_dependency(%q<googleapis-common-protos-types>.freeze, [">= 1.0.5".freeze, "< 2.a".freeze])
  s.add_runtime_dependency(%q<googleauth>.freeze, [">= 0.16.2".freeze, "< 2.a".freeze])
  s.add_runtime_dependency(%q<google-cloud-core>.freeze, ["~> 1.6".freeze])
end
