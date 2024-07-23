<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
    include("create.php");
    $conn = new create();
    $db = $conn->connect();
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case 'GET':
            // Get the customer ID from query parameters
            $ID_Customer = $_GET['ID_Customer'];
    
            // Ensure ID_Customer is not null
            if ($ID_Customer) {
                $sql = "SELECT Orders.*, Product.* FROM Orders INNER JOIN ProductOrder ON Orders.Order_ID = ProductOrder.Order_ID INNER JOIN Product ON ProductOrder.Product_ID = Product.Product_ID WHERE Orders.ID_Customer = :ID_Customer;";
                $stmt = $db->prepare($sql);
                $stmt->bindParam(':ID_Customer', $ID_Customer);
                $stmt->execute();
                $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($orders);
            } else {
                // Handle the case where ID_Customer is not provided
                echo json_encode(["error" => "ID_Customer parameter missing"]);
            }
            break;  
    }
?>