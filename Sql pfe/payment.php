<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include("create.php");

$conn = new create();
$db = $conn->connect();
$method = $_SERVER['REQUEST_METHOD'];

$createTableSql = "CREATE TABLE IF NOT EXISTS Payment (
    Payment_ID INT PRIMARY KEY AUTO_INCREMENT,
    Order_ID int,
    FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID),
    PaymentMethod varchar(50),
    PaymentDate date,
    Quantity int
)";

$createTableStmt = $db->prepare($createTableSql);
$createTableStmt->execute();

switch ($method) {
    case "GET":
        $sql = "SELECT Payment_ID, Order_ID, PaymentMethod, PaymentDate, Quantity FROM Payment";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $paymentItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!$paymentItems) {
            $paymentItems = [];
        }
        
        echo json_encode($paymentItems);
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        $orderID = $data['Order_ID'];
        $paymentMethod = $data['PaymentMethod'];
        $paymentDate = $data['PaymentDate'];
        $quantity = $data['Quantity'];
        
        $insertSql = "INSERT INTO Payment (Order_ID, PaymentMethod, PaymentDate, Quantity) VALUES (:Order_ID, :PaymentMethod, :PaymentDate, :Quantity)";
        $insertStmt = $db->prepare($insertSql);
        $insertStmt->bindParam(':Order_ID', $orderID);
        $insertStmt->bindParam(':PaymentMethod', $paymentMethod);
        $insertStmt->bindParam(':PaymentDate', $paymentDate);
        $insertStmt->bindParam(':Quantity', $quantity);
        $insertStmt->execute();
        
        echo json_encode(["message" => "Payment added successfully"]);
        break;
}
?>
