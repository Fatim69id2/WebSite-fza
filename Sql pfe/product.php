<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Content-Type: application/json');
include("create.php");
$conn = new create();
$db = $conn->connect();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $sql = "SELECT * FROM Product";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE Product_ID = :Product_ID";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':Product_ID', $path[3]);
            $stmt->execute();
            $products = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($products);
        break;

        case "POST":
            $target_dir = "uploads/"; 
            $target_file = $target_dir . basename($_FILES["Image"]["name"]);
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        
            if(isset($_POST["submit"])) {
                $check = getimagesize($_FILES["Image"]["tmp_name"]);
                if($check !== false) {
                    echo "File is an image - " . $check["mime"] . ".";
                    $uploadOk = 1;
                } else {
                    echo "File is not an image.";
                    $uploadOk = 0;
                }
            }
        
            if ($_FILES["Image"]["size"] > 500000) { 
                echo "Sorry, your file is too large.";
                $uploadOk = 0;
            }
        
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" ) {
                echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                $uploadOk = 0;
            }
        
            if ($uploadOk == 0) {
                echo "Sorry, your file was not uploaded.";
            } else {
                if (move_uploaded_file($_FILES["Image"]["tmp_name"], $target_file)) {
                    echo "The file ". htmlspecialchars( basename( $_FILES["Image"]["name"])). " has been uploaded.";
                } else {
                    echo "Sorry, there was an error uploading your file.";
                }
            }

            if ($uploadOk == 1) {
                $data = json_decode(file_get_contents("php://input"));
                $name = $_POST['Name'];
                $description = $_POST['Descriptione'];
                $price = $_POST['Price'];
        
                $sql = "INSERT INTO Product (Name, Descriptione, Price, Image) VALUES (:Name, :Description, :Price, :Image)";
                $stmt = $db->prepare($sql);
                $stmt->bindParam(':Name', $name);
                $stmt->bindParam(':Description', $description);
                $stmt->bindParam(':Price', $price);
                $stmt->bindParam(':Image', $_FILES["Image"]["name"]); 
                $stmt->execute();
        
                echo "Product added successfully";
            }
            break;
        

    // case "PUT":
    //     parse_str(file_get_contents("php://input"), $put_vars);
    //     print_r($put_vars);
        
    //     // Ensure the correct keys are present in the input data
    //     if (isset($put_vars['productId'], $put_vars['Name'], $put_vars['Description'], $put_vars['Price'])) {
    //         $product_id = $put_vars['productId'];
    //         $name = $put_vars['Name'];
    //         $description = $put_vars['Description'];
    //         $price = $put_vars['Price'];

    //         // Assuming $db is your PDO instance
    //         try {
    //             $sql = "UPDATE Product SET Name = :Name, Description = :Description, Price = :Price WHERE Product_ID = :Product_ID";
    //             $stmt = $db->prepare($sql);
    //             $stmt->bindParam(':Name', $name);
    //             $stmt->bindParam(':Description', $description);
    //             $stmt->bindParam(':Price', $price);
    //             $stmt->bindParam(':Product_ID', $product_id);
    //             $stmt->execute();
                
    //             echo "Product updated successfully";
    //         } catch (PDOException $e) {
    //             echo "Error: " . $e->getMessage();
    //         }
    //     } else {
    //         echo "Required fields are missing.";
    //     }
    //     break;

        case "DELETE":
            parse_str($_SERVER['QUERY_STRING'], $delete_vars);
            if (isset($delete_vars['productId'])) {
                $product_id = $delete_vars['productId'];
    
                $sql = "DELETE FROM Product WHERE Product_ID = :Product_ID";
                $stmt = $db->prepare($sql);
                $stmt->bindParam(':Product_ID', $product_id);
                $stmt->execute();
    
                echo "Product deleted successfully";
            } else {
                echo "Product ID not provided";
            }
            break;
    }
?>
