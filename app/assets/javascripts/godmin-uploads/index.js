// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require refile
//= require_tree .

(function() {

  var initialize = function() {
    setFileName($(".godmin-uploads"));

    $(document).on("upload:start", ".godmin-uploads", function(e) {
      showProgressBar($(this));
      removeFileName($(this));
    });

    $(document).on("upload:progress", ".godmin-uploads", function(e) {
      setProgressBarPercentage($(this), 50);
    });

    $(document).on("upload:complete", ".godmin-uploads", function(e) {
      setProgressBarPercentage($(this), 100);
    });

    $(document).on("upload:success", ".godmin-uploads", function(e) {
      var $el = $(this);
      setUploadPreview($el);
      showPreview($el);
      setDownloadUrl($el);
      hideProgressBar($el);
      showRemoveButton($el);
      //setFileName($el);
      unsetDestroy($el);
    });

    $(document).on("upload:failure", ".godmin-uploads", function(e) {
      setProgressBarContext($(this), "danger");
    });

    $(document).on("click", ".godmin-uploads__remove", function(e) {
      var $el = $(this).parents(".godmin-uploads");
      hidePreview($el);
      hideRemoveButton($el);
      //removeFileName($el);
      setDestroy($el);
    });
  };

  var setFileName = function($el) {
    var filenameArea =  $el.find(".godmin-uploads__info__filename");
    filenameArea.removeClass("hidden");
  }

  var removeFileName = function($el) {
    var filenameArea =  $el.find(".godmin-uploads__info__filename");
    filenameArea.empty();
    filenameArea.addClass("hidden");
  }

  var setDestroy = function($el) {
    $el.find(".godmin-uploads__remove-field").val("true");
  }

  var unsetDestroy = function($el) {
    $el.find(".godmin-uploads__remove-field").val("");
  }

  var showPreview = function($el) {
    $el.find(".godmin-uploads__preview").removeClass("hidden");
    $el.find(".godmin-uploads__placeholder").addClass("hidden");
  };

  var hidePreview = function($el) {
    $el.find(".godmin-uploads__placeholder").removeClass("hidden");
    $el.find(".godmin-uploads__preview").addClass("hidden");
  };

  var showProgressBar = function($el) {
    $el.find(".progress").removeClass("hidden");
  };

  var hideProgressBar = function($el) {
    setTimeout(function() {
      $el.find(".progress").slideUp();

      setTimeout(function() {
        setProgressBarPercentage($el, 0);
      }, 1000);
    }, 2000);
  };

  var showRemoveButton = function($el) {
    $el.find(".godmin-uploads__remove").removeClass("hidden");
  };

  var hideRemoveButton = function($el) {
    $el.find(".godmin-uploads__remove").addClass("hidden");
  }

  var setProgressBarPercentage = function($el, percentage) {
    $el.find(".progress").find(".progress-bar").css("width", percentage + "%");
  };

  var setProgressBarContext = function($el, context) {
    $el.find(".progress-bar").addClass("progress-bar-" + context);
  };

  var setUploadPreview = function($el) {
    var $urlParts = getFileUrlParts($el);
    var url = $urlParts[0] + "/fill/120/120/" + $urlParts[1].id + "/foobar"
    $el.find(".godmin-uploads__preview img").attr(
      "src", $urlParts[0] + "/fill/150/150/" + $urlParts[1].id + "/foobar"
    );
  };

  var setDownloadUrl = function($el) {
    var $urlParts = getFileUrlParts($el);

    $el.find(".godmin-uploads__download-link").attr(
      "href", $urlParts[0] + "/" + $urlParts[1].id + "/foobar"
    );
  };

  var getFileUrlParts = function($el) {
    var $file = $el.find(".godmin-uploads__file-field");

    return [
      $file.data("url"), JSON.parse($file.prev().val())
    ];
  };

  $(function() {
    initialize();
  });

})();
