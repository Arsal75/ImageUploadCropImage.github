$(document).ready(function() {
  // Function to handle image preview and crop
  $("#imageInput").change(function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      $("#previewContainer").html("<img id='previewImage' src='" + e.target.result + "'>");
      // Initialize cropper
      $("#previewImage").cropper({
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
        crop: function(event) {
          // Store cropped image data in a hidden input field
          $("#croppedImageData").val($("#previewImage").cropper("getCroppedCanvas").toDataURL());
        }
      });
    };
    reader.readAsDataURL(file);
  });

  // Function to handle image upload
  $("#cropButton").click(function() {
    var croppedImageData = $("#croppedImageData").val();
    $.ajax({
      url: "upload.php",
      method: "POST",
      data: { image: croppedImageData },
      success: function(response) {
        alert(response);
      }
    });
  });
});
