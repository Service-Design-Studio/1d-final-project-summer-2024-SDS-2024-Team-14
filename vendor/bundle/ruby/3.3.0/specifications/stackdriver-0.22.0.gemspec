# -*- encoding: utf-8 -*-
# stub: stackdriver 0.22.0 ruby lib

Gem::Specification.new do |s|
  s.name = "stackdriver".freeze
  s.version = "0.22.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Heng Xiong".freeze]
  s.date = "2024-03-07"
  s.description = "stackdriver is the official library for Google Stackdriver APIs.".freeze
  s.email = ["hxiong388@gmail.com".freeze]
  s.homepage = "https://github.com/googleapis/google-cloud-ruby/tree/master/stackdriver".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7".freeze)
  s.rubygems_version = "3.5.9".freeze
  s.summary = "API Client library for Google Stackdriver".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<google-cloud-error_reporting>.freeze, ["~> 0.41".freeze])
  s.add_runtime_dependency(%q<google-cloud-logging>.freeze, ["~> 2.1".freeze])
  s.add_runtime_dependency(%q<google-cloud-trace>.freeze, ["~> 0.40".freeze])
end
