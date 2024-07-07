# -*- encoding: utf-8 -*-
# stub: google-cloud-logging 2.4.0 ruby lib

Gem::Specification.new do |s|
  s.name = "google-cloud-logging".freeze
  s.version = "2.4.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Mike Moore".freeze, "Chris Smith".freeze]
  s.date = "2024-03-07"
  s.description = "google-cloud-logging is the official library for Stackdriver Logging.".freeze
  s.email = ["mike@blowmage.com".freeze, "quartzmo@gmail.com".freeze]
  s.homepage = "https://github.com/googleapis/google-cloud-ruby/tree/master/google-cloud-logging".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7".freeze)
  s.rubygems_version = "3.5.9".freeze
  s.summary = "API Client library for Stackdriver Logging".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<google-cloud-core>.freeze, ["~> 1.5".freeze])
  s.add_runtime_dependency(%q<google-cloud-logging-v2>.freeze, ["~> 0.0".freeze])
  s.add_runtime_dependency(%q<stackdriver-core>.freeze, ["~> 1.3".freeze])
  s.add_runtime_dependency(%q<concurrent-ruby>.freeze, ["~> 1.1".freeze])
end
