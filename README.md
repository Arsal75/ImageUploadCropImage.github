### Example Usage:

#### HTML Structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Image Upload and Crop</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<input type="file" id="imageInput">
<div id="previewContainer"></div>
<button id="cropButton">Crop and Upload</button>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="script.js"></script>
</body>
</html>
```

#### CSS (styles.css):
```css
#previewContainer {
  width: 300px;
  height: 300px;
  overflow: hidden;
  margin-bottom: 20px;
}

#previewImage {
  max-width: 100%;
  max-height: 100%;
}
```

#### JavaScript (script.js):
```javascript
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
```

#### PHP (upload.php):
```php
<?php
if(isset($_POST['image'])) {
  $data = $_POST['image'];
  $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data));
  $imageName = uniqid() . '.png';
  $filePath = 'uploads/' . $imageName;
  file_put_contents($filePath, $imageData);

  // Store image path in database (replace with your database connection code)
  $conn = new PDO("mysql:host=localhost;dbname=your_database", "username", "password");
  $sql = "INSERT INTO images (image_path) VALUES (:imagePath)";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam(':imagePath', $filePath);
  $stmt->execute();

  echo "Image uploaded successfully!";
} else {
  echo "Error: No image data received.";
}
?>
```

These examples demonstrate how to implement image upload and cropping functionality on a web page using HTML, CSS, JavaScript, and PHP. Users can select an image, preview it, crop it to a square aspect ratio, and upload the cropped image to the server.