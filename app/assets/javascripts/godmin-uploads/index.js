// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require refile
//= require_tree .

(function() {
  var initialize = function() {
    $(document).on("upload:start", ".godmin-uploads", function(e) {
      var $el = $(e.currentTarget);
      $el.addClass('godmin-uploads--uploading');
    });

    $(document).on("upload:progress", ".godmin-uploads", function(e) {
      var $el = $(e.currentTarget);
      $el.find(".progress-bar").css("width", 50 + "%");
    });

    $(document).on("upload:complete", ".godmin-uploads", function(e) {
      var $el = $(e.currentTarget);
      $el.find(".progress-bar").css("width", 100 + "%");
    });

    $(document).on("upload:success", ".godmin-uploads", function(e) {
      var $el = $(e.currentTarget);
      $el.find(".progress-bar").addClass("progress-bar-" + "success");
    });

    $(document).on("upload:failure", ".godmin-uploads", function(e) {
      var $el = $(e.currentTarget);
      $el.find(".progress-bar").addClass("progress-bar-" + "danger");
    });

    $(document).on("click", ".godmin-uploads__remove-btn", function(e) {
      e.preventDefault();

      var $el = $(e.currentTarget);

      $el.toggleClass("btn-danger").next().val(
        $el.next().val() == "true" ? "" : "true"
      );
    });
  };
  
  $(function() {
    initialize();
  });
})();
