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

    $query = "INSERT INTO product_cost_history"
        .       "(product_id, cost_price, sgst_rate, cgst_rate, quantity)"
        .   " VALUES"
        .       " (:product_id, :cost_price, :sgst_rate, :cgst_rate, :quantity)"
        .   " ON DUPLICATE KEY UPDATE"
        .       " quantity = quantity + :quantity,"
        .       " posted_on = CURRENT_TIMESTAMP;";


    $output['q1'] = $query;

    $stmt = $connection->prepare($query);
    $output['i1'] = array();

    foreach( $request as $key=>$value){
        $item = array(
            ':product_id'    => $value->product_id,
            ':cost_price'    => $value->rate,
            ':sgst_rate'     => $value->sgst_rate,
            ':cgst_rate'     => $value->cgst_rate,
            ':quantity'      => $value->quantity,
        );
        $stmt->execute( $item );
        
        $output['i1'][$key] = $item;
    }

    
    $output['q2'] = array(); 
    $output['i2'] = array();

    foreach($request as $key=>$value){
        $query2 = "UPDATE product SET available_quantity=available_quantity + " . $value->quantity . " WHERE id=" . $value->product_id;
        $output['q2'][$key] = $query2;
        $stmt = $connection->prepare($query2);
        $stmt->execute();
        $output['i2'][$key] = $item;
    }

    echo json_encode($output);


