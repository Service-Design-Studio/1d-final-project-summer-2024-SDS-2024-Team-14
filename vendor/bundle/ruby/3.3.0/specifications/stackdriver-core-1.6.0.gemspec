# -*- encoding: utf-8 -*-
# stub: stackdriver-core 1.6.0 ruby lib

Gem::Specification.new do |s|
  s.name = "stackdriver-core".freeze
  s.version = "1.6.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Daniel Azuma".freeze]
  s.date = "2024-03-07"
  s.description = "stackdriver-core is an internal shared library for the Ruby Stackdriver integration libraries.".freeze
  s.email = ["dazuma@google.com".freeze]
  s.homepage = "https://github.com/googleapis/google-cloud-ruby/tree/master/stackdriver-core".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7".freeze)
  s.rubygems_version = "3.5.9".freeze
  s.summary = "Internal shared library for Ruby Stackdriver integration".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<google-cloud-core>.freeze, ["~> 1.2".freeze])
end
