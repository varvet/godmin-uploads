module Godmin
  module Uploads
    module Helper
      def uploader(attachment, preview: false)
        render partial: "godmin/uploads/uploader", locals: {
          f: self, attachment: attachment, preview: preview
        }
      end
    end
  end
end

Godmin::FormBuilder.send(:include, Godmin::Uploads::Helper)
