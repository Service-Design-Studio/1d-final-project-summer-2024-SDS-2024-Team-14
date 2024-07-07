# -*- encoding: utf-8 -*-
# stub: appengine 0.7.0 ruby lib

Gem::Specification.new do |s|
  s.name = "appengine".freeze
  s.version = "0.7.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Daniel Azuma".freeze]
  s.date = "2022-04-23"
  s.description = "The appengine gem is a set of classes, plugins, and tools for integration with Google App Engine. It provides access to the App Engine runtime environment, including logging to the Google Cloud Console and interrogation of hosting properties. It also provides Rake tasks for managing your App Engine application, for example to run production maintenance commands such as database migrations. This gem is NOT required to deploy your Ruby application to App Engine.".freeze
  s.email = ["dazuma@gmail.com".freeze]
  s.homepage = "https://github.com/GoogleCloudPlatform/appengine-ruby".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.5.0".freeze)
  s.rubygems_version = "3.5.9".freeze
  s.summary = "Google App Engine integration tools".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<google-cloud-env>.freeze, ["~> 1.4".freeze])
  s.add_runtime_dependency(%q<google-serverless-exec>.freeze, [">= 0.1".freeze, "< 2.a".freeze])
  s.add_runtime_dependency(%q<stackdriver>.freeze, ["~> 0.21".freeze])
  s.add_development_dependency(%q<bundler>.freeze, ["~> 2.0".freeze])
  s.add_development_dependency(%q<google-style>.freeze, ["~> 1.25.1".freeze])
  s.add_development_dependency(%q<minitest>.freeze, ["~> 5.14".freeze])
  s.add_development_dependency(%q<minitest-focus>.freeze, ["~> 1.1".freeze])
  s.add_development_dependency(%q<minitest-rg>.freeze, ["~> 5.2".freeze])
  s.add_development_dependency(%q<rake>.freeze, ["~> 13.0".freeze])
  s.add_development_dependency(%q<rdoc>.freeze, ["~> 6.0".freeze])
  s.add_development_dependency(%q<redcarpet>.freeze, ["~> 3.4".freeze])
  s.add_development_dependency(%q<yard>.freeze, ["~> 0.9".freeze])
end
