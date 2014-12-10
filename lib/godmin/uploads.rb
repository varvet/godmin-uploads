require "refile"
require "refile/rails"
require "refile/image_processing"
require "godmin/uploads/engine"
require "godmin/uploads/helper"
require "godmin/uploads/version"

module Godmin
  module Uploads
    extend ActiveSupport::Concern

    included do
      helper AttachmentHelper
      helper Godmin::Uploads::Helper
    end
  end
end
