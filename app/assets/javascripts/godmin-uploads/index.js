// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require refile
//= require_tree .

(function() {

  var initialize = function() {
    $(document).on("upload:start", ".godmin-upload", function(e) {
      showProgressBar($(this));
    });

    $(document).on("upload:progress", ".godmin-upload", function(e) {
      setProgressBarPercentage($(this), 50);
    });

    $(document).on("upload:complete", ".godmin-upload", function(e) {
      setProgressBarPercentage($(this), 100);
    });

    $(document).on("upload:success", ".godmin-upload", function(e) {
      setUploadPreview($(this));
      setDownloadUrl($(this));
      hideProgressBar($(this));
      showButtons($(this));
    });

    $(document).on("upload:failure", ".godmin-upload", function(e) {
      setProgressBarContext($(this), "danger");
    });

    $(document).on("click", ".godmin-upload-destroy-link", function(e) {
      var $destroyField = $(this).parents(".godmin-upload").find(".godmin-upload-destroy-field");

      if ($destroyField.val() === "") {
        $(this).find(".godmin-upload-destroy-label").hide();
        $(this).find(".godmin-upload-undo-destroy-label").show();
        $destroyField.val("true");
      } else {
        $(this).find(".godmin-upload-destroy-label").show();
        $(this).find(".godmin-upload-undo-destroy-label").hide();
        $destroyField.val("");
      }
    });
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

  var showButtons = function($el) {
    $el.find(".godmin-upload-buttons").removeClass("hidden");
  };

  var setProgressBarPercentage = function($el, percentage) {
    $el.find(".progress").find(".progress-bar").css("width", percentage + "%");
  };

  var setProgressBarContext = function($el, context) {
    $el.find(".progress-bar").addClass("progress-bar-" + context);
  };

  var setUploadPreview = function($el) {
    var $urlParts = getFileUrlParts($el);

    $el.find(".godmin-upload-preview").attr(
      "src", $urlParts[0] + "/fill/150/150/" + $urlParts[1].id + "/foobar"
    );
  };

  var setDownloadUrl = function($el) {
    var $urlParts = getFileUrlParts($el);

    $el.find(".godmin-upload-download-link").attr(
      "href", $urlParts[0] + "/" + $urlParts[1].id + "/foobar"
    );
  };

  var getFileUrlParts = function($el) {
    var $file = $el.find(".godmin-upload-file-field");

    return [
      $file.data("url"), JSON.parse($file.prev().val())
    ];
  };

  $(function() {
    initialize();
  });

})();
