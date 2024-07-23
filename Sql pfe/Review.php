<?php
header("Content-Type: application/json");           
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
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

            if ($products) {
                $reviewSql = "SELECT * FROM Review WHERE Product_ID = :Product_ID";
                $reviewStmt = $db->prepare($reviewSql);
                $reviewStmt->bindParam(':Product_ID', $path[3]);
                $reviewStmt->execute();
                $products['reviews'] = $reviewStmt->fetchAll(PDO::FETCH_ASSOC);
            }
        } else {
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($products as &$product) {
                $reviewSql = "SELECT * FROM Review WHERE Product_ID = :Product_ID";
                $reviewStmt = $db->prepare($reviewSql);
                $reviewStmt->bindParam(':Product_ID', $product['Product_ID']);
                $reviewStmt->execute();
                $product['reviews'] = $reviewStmt->fetchAll(PDO::FETCH_ASSOC);
            }
        }
        echo json_encode($products);
        break;

    case "POST":
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (isset($input['Product_ID']) && isset($input['ID_Customer']) && isset($input['Rating']) && isset($input['Comment'])) {
            $sql = "INSERT INTO Review (Product_ID, ID_Customer, ReviewDate, Rating, Comment) VALUES (:Product_ID, :ID_Customer, NOW(), :Rating, :Comment)";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':Product_ID', $input['Product_ID']);
            $stmt->bindParam(':ID_Customer', $input['ID_Customer']);
            $stmt->bindParam(':Rating', $input['Rating']);
            $stmt->bindParam(':Comment', $input['Comment']);
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Review added successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to add review'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Invalid input'];
        }
        echo json_encode($response);
        break;

    default:
        echo json_encode(['status' => 0, 'message' => 'Method not supported']);
        break;
}
?>
