module Godmin
  module Uploads
    module Helper
      def refile_app_path
        main_app.refile_app_path
      end

      def uploader(form_builder, attachment, preview: false)
        render partial: "godmin/uploads/uploader", locals: {
          f: form_builder, attachment: attachment, preview: preview
        }
      end
    end
  end
end
