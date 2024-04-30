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
