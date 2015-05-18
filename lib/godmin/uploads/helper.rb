module Godmin
  module Uploads
    module Helper
      def uploader(attachment, preview: false, remove: true)
        @template.render partial: "godmin/uploads/uploader", locals: {
          f: self, attachment: attachment, preview: preview, remove: remove
        }
      end
    end
  end

  FormBuilders::FormBuilder.send(:include, Uploads::Helper)
end
