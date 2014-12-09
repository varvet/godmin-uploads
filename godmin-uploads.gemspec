$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "godmin/uploads/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |gem|
  gem.name          = "godmin-uploads"
  gem.version       = Godmin::Uploads::VERSION
  gem.authors       = ["Jens Ljungblad", "Varvet"]
  gem.email         = ["info@varvet.se"]
  gem.homepage      = "https://github.com/varvet/godmin-uploads"
  gem.summary       = "File uploads for the Godmin admin engine for Rails 4+"
  gem.description   = "File uploads for the Godmin admin engine for Rails 4+"
  gem.license       = "MIT"

  gem.files         = `git ls-files -z`.split("\x0")
  gem.executables   = gem.files.grep(%r{^bin/}) { |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]

  gem.add_dependency "godmin", "~> 0.9.1"
  gem.add_dependency "refile", "~> 0.2.3"
  gem.add_dependency "mini_magick", "~> 4.0.1"

  gem.add_development_dependency "bundler", "~> 1.7"
  gem.add_development_dependency "rake", "~> 10.0"
end
