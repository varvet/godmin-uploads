# Godmin Uploads

Godmin Uploads is a file upload component for [Godmin](https://github.com/varvet/godmin) that uses [refile](https://github.com/elabs/refile) for uploads.

## Installation

Add the gem to the application's `Gemfile`:
```ruby
gem "godmin-uploads"
```

Or to the admin engine's `gemspec`:
```ruby
s.add_dependency "godmin-uploads", "~> x.x.x"
```

## Usage

See the [refile](https://github.com/elabs/refile) documentation for info on how to configure storage location, set up your model etc. Once that is done, simply use the `uploader` view helper in your form like so:

```erb
<%= form_for(@resource) do |f| %>
  <%= f.input_field :title %>
  <%= f.text_field :body %>

  <%= uploader f, :attachment, preview: true %>
<% end %>
```

The `preview` option is only available for image attachments.

## Contributors

https://github.com/varvet/godmin-uploads/graphs/contributors

## License

Licensed under the MIT license. See the separate MIT-LICENSE file.
