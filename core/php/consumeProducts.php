<?php
    define('LOCALHOST', 'localhost');
    define('DBNAME', 'sb');
    define('USER', 'root');
    define('PASSWORD', 'Toor*7391');
    
    $connection = null;
    
    $request = json_decode( file_get_contents("php://input") );
    $output = array();
    
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


    foreach($request as $key=>$value){
        $query2 = "UPDATE product SET available_quantity=available_quantity - " . $value->quantity . " WHERE id=" . $value->product_id;
        $output['q2'][$key] = $query2;
        $stmt = $connection->prepare($query2);
        $stmt->execute();
    }

    echo json_encode($output);


