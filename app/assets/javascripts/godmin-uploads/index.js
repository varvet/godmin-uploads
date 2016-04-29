// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require refile
//= require_tree .

(function() {

  var initialize = function() {

    $('[data-toggle="tooltip"]').tooltip()

    $(document).on("upload:start", ".godmin-uploads", function(e) {
      var $el = $(this);
      $el.removeClass("godmin-uploads-success");
      $el.addClass("godmin-uploads-start");
      showProgressBar($el);
    });

    $(document).on("upload:progress", ".godmin-uploads", function(e) {
      setProgressBarPercentage($(this), 50);
    });

    $(document).on("upload:complete", ".godmin-uploads", function(e) {
      var $el = $(this);
      setProgressBarPercentage($el, 100);
      $el.removeClass("godmin-uploads-start");
      $el.addClass("godmin-uploads-complete");
    });

    $(document).on("upload:success", ".godmin-uploads", function(e) {
      var $el = $(this);
      var fileObject = getFileObject($el);
      setUploadPreview($el, fileObject);
      setDownloadUrl($el, fileObject);
      hideProgressBar($el);
      $el.removeClass("godmin-uploads-complete");
      $el.addClass("godmin-uploads-success");
    });

    $(document).on("upload:failure", ".godmin-uploads", function(e) {
      setProgressBarContext($(this), "danger");
    });

    $(document).on("click", ".godmin-uploads__remove-link", function(e) {
      e.preventDefault();
      var $el = $(this).parents(".godmin-uploads");
      $el.removeClass("godmin-uploads-success");
      $el.addClass("godmin-uploads-remove");
      setDestroy($el);
    });

    $(document).on("click", ".remove__actions__undo", function(e) {
      var $el = $(this).parents(".godmin-uploads");
      $el.removeClass("godmin-uploads-remove");
      $el.addClass("godmin-uploads-success");
      unsetDestroy($el);
    });
  };

  var setDestroy = function($el) {
    $el.find(".godmin-uploads__remove-field").val("true");
  }

  var unsetDestroy = function($el) {
    $el.find(".godmin-uploads__remove-field").val("");
  }
  var setProgressBarPercentage = function($el, percentage) {
    $el.find(".progress").find(".progress-bar").css("width", percentage + "%");
    };

  var setProgressBarContext = function($el, context) {
    $el.find(".progress-bar").addClass("progress-bar-" + context);
  };

  var showProgressBar = function($el) {
    $el.find(".progress").show();
  };

  var hideProgressBar = function($el) {
    setTimeout(function() {
      $el.find(".progress").slideUp();
      setTimeout(function() {
        setProgressBarPercentage($el, 0);
      }, 1000);
    }, 2000);
  };

  var setUploadPreview = function($el, fileObject) {
    $el.find(".godmin-uploads__preview__image").attr(
      "src", fileObject.url + "/fill/0/400/" + fileObject.id + "/" + fileObject.filename);
  };

  var setDownloadUrl = function($el, fileObject) {
    ext = fileObject.filename.split(".").pop().toLowerCase();
    $el.find(".godmin-uploads__preview__download__link").attr(
      "href", fileObject.url + "/" + fileObject.id + "/" + fileObject.filename);
  };

  var getFileObject = function($el) {
    var $file = $el.find(".godmin-uploads__file-field")
    var fileObject = JSON.parse($file.prev().val());
    fileObject.url = $file.data("url")
    return fileObject;
  };

  $(function() {
    initialize();
  });

})();
