<?php
    define('LOCALHOST', 'localhost');
    define('DBNAME', 'sb');
    define('USER', 'root');
    define('PASSWORD', 'Toor*7391');
    
    $connection = null;
    
    $request = json_decode( file_get_contents("php://input") );
    
    try{
        $connection = new PDO('mysql:host=localhost;dbname=' . DBNAME, USER, PASSWORD);
        // $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    } catch( PDOException $ex ){
        die( json_encode(
            array(
                'result'=>false,
                'exception'=>$ex->getMessage()
            )
        ) );
    }  

    require_once 'ds.php'; 

    //Inserting Transactions one By One
    for($i = 0; $i < count($request->transactions); $i++){
        $adapter = new DataAdapter($con, 'transactions');
        
    }
    
?>