<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");
    include("create.php");
    $conn = new create();
    $db = $conn->connect();
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case 'POST':
            $user = json_decode(file_get_contents('php://input'));
            $sql = "SELECT * FROM customer where Email= :Email and password = :password ";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':Email', $user->Email);
            $stmt->bindParam(':password', $user->password);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);        
            echo json_encode($users);
            break;
}
?>