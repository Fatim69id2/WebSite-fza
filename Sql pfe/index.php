<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include("create.php");

try {
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("HTTP/1.1 200 OK");
        exit;
    }

    $conn = new create();
    $db = $conn->connect();
    $method = $_SERVER['REQUEST_METHOD'];

    error_log("Request method: " . $method);

    if ($method == 'POST') {
        $postData = file_get_contents('php://input');
        $user = json_decode($postData);
        if (
            isset($_POST['Product_ID']) && 
            isset($_POST['Name']) && 
            isset($_POST['Descriptione']) && 
            isset($_POST['Price'])
        ) {
            error_log("POST data: " . print_r($_POST, true));
            error_log("FILES data: " . print_r($_FILES, true));

            $sql = "UPDATE Product SET Name=:Name, Descriptione=:Descriptione, Price=:Price";
            if (!empty($_FILES['Image']['name'])) {
                $sql .= ", Image=:Image";
            }

            $sql .= " WHERE Product_ID=:Product_ID";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':Name', $_POST['Name']);
            $stmt->bindParam(':Descriptione', $_POST['Descriptione']);
            $stmt->bindParam(':Price', $_POST['Price']);
            $stmt->bindParam(':Product_ID', $_POST['Product_ID']);

            if (!empty($_FILES['Image']['name'])) {
                $target_dir = "uploads/";
                $target_file = $target_dir . basename($_FILES["Image"]["name"]);
                if (move_uploaded_file($_FILES["Image"]["tmp_name"], $target_file)) {
                    $stmt->bindParam(':Image', $_FILES["Image"]["name"]);
                } else {
                    error_log("Failed to upload image.");
                    echo json_encode(['status' => 0, 'message' => 'Failed to upload image.']);
                    exit;
                }
            }

            if ($stmt->execute()) {
                echo json_encode(['status' => 1, 'message' => "Record successfully updated"]);
            } else {
                echo json_encode(['status' => 0, 'message' => "Failed to update record."]);
            }
        } 
        else if (isset($user->FirstName) && isset($user->LastName) && isset($user->Email) && isset($user->password)) {
            $sql = "INSERT INTO Customer (FirstName, LastName, Email, password) VALUES (:FirstName, :LastName, :Email, :password)";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':FirstName', $user->FirstName);
            $stmt->bindParam(':LastName', $user->LastName);
            $stmt->bindParam(':Email', $user->Email);
            $stmt->bindParam(':password', $user->password);

            if ($stmt->execute()) {
                $data = ['status' => 1, 'message' => "Record successfully created"];
            } else {
                $data = ['status' => 0, 'message' => "Failed to create record."];
            }
            echo json_encode($data);
        } else {
            echo json_encode(['status' => 0, 'message' => "Invalid input data"]);
        }
    } else {
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 0, 'message' => 'Database connection error: ' . $e->getMessage()]);
}
?>
