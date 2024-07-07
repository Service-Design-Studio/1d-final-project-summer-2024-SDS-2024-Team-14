# -*- encoding: utf-8 -*-
# stub: google-cloud-error_reporting 0.43.0 ruby lib

Gem::Specification.new do |s|
  s.name = "google-cloud-error_reporting".freeze
  s.version = "0.43.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Google Inc".freeze]
  s.date = "2024-03-07"
  s.description = "google-cloud-error_reporting is the official library for Error Reporting.".freeze
  s.email = ["googleapis-packages@google.com".freeze]
  s.homepage = "https://github.com/googleapis/google-cloud-ruby/tree/master/google-cloud-error_reporting".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7".freeze)
  s.rubygems_version = "3.5.9".freeze
  s.summary = "API Client library for Error Reporting".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<google-cloud-core>.freeze, ["~> 1.5".freeze])
  s.add_runtime_dependency(%q<stackdriver-core>.freeze, ["~> 1.3".freeze])
  s.add_runtime_dependency(%q<google-cloud-error_reporting-v1beta1>.freeze, ["~> 0.0".freeze])
  s.add_runtime_dependency(%q<concurrent-ruby>.freeze, ["~> 1.1".freeze])
end
