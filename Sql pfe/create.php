<?php
    /**
    * Database Connection
    */
    class create {
        private $server = 'localhost';
        private $dbname = 'Fza';
        private $user = 'root';
        private $pass = '';
        public function connect() {
            try {
                $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
            } catch (\Exception $e) {
                echo "Database Error: " . $e->getMessage();
            }
        }

    }
?>


<?php
// try {
//   $mysqlClient = new PDO('mysql:host=localhost;dbname=Fza;port=3306;charset=utf8', 'root', '');
//   echo 'bien connecter';
// } catch (PDOException $e) {
//   exit("Failed to connect to database: " . $e->getMessage()); 
// }
?> 