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
        $sql = "SELECT * FROM Orders";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE Order_ID = :Order_ID";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':Order_ID', $path[3]);
            $stmt->execute();
            $orders = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $db->prepare($sql);
            $stmt->execute();
            $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($orders);
        break;

    case "POST":
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (
            isset($input['ID_Customer']) && 
            isset($input['OrderDate']) && 
            isset($input['Total']) && 
            isset($input['Status'])&&
            isset($input['Quantity'])
        ) {
            $sql = "INSERT INTO Orders (ID_Customer, OrderDate, Total, Status,Quantity) VALUES (:ID_Customer, :OrderDate, :Total, :Status,:Quantity)";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':ID_Customer', $input['ID_Customer']);
            $stmt->bindParam(':OrderDate', $input['OrderDate']);
            $stmt->bindParam(':Total', $input['Total']);
            $stmt->bindParam(':Status', $input['Status']);
            $stmt->bindParam(':Quantity', $input['Quantity']);
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Order added successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to add order'];
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
