<?php
    define('LOCALHOST', 'localhost');
    define('DBNAME', 'sb');
    define('USER', 'root');
    define('PASSWORD', 'Toor*7391');

    define('PURCHASE_INVOICE', 0);
    define('SALES_INVOICE', 1);
    
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

    $response = array();

    array_push($response, $request);

    //Create New Invoice
    $query = "INSERT INTO INVOICES(person_id, type) VALUES(:person_id, :type)";
    $stmt = $connection->prepare($query);
    $data = array(
        ":person_id"    =>  $request->person_id,  
        ":type"         =>  $request->invoice_type
    );

    array_push($response, $query);

    $stmt->execute( $data );
    $invoice_id = $connection->lastInsertId();
    array_push($response, $invoice_id);

    //Insert data into transaction Table
    $query1 = "INSERT INTO `transaction`(`product_id`, `quantity`, `rate`, `amountExTax`, `sgst_rate`, `sgst_amount`, `cgst_rate`, `cgst_amount`, `invoice_id`) VALUES (:product_id, :quantity, :rate, :amountExTax, :sgst_rate, :sgst_amount, :cgst_rate, :cgst_amount, :invoice_id)";

    $query2 = "INSERT INTO product_cost_history"
        .       "(product_id, cost_price, sgst_rate, cgst_rate, quantity)"
        .   " VALUES"
        .       " (:product_id, :cost_price, :sgst_rate, :cgst_rate, :quantity)"
        .   " ON DUPLICATE KEY UPDATE"
        .       " quantity = quantity + :quantity,"
        .       " posted_on = CURRENT_TIMESTAMP;";

    
    array_push($response, $query1);
    array_push($response, $query2);

    $stmt = $connection->prepare($query1);

    foreach ($request->transactions as $key => $value) {
        # code...
        $data = array(
            ":product_id"   => $value->product_id,
            ":quantity"     => $value->quantity,
            ":rate"         => $value->rate,
            ":amountExTax"  => $value->amountExTax,
            ":sgst_rate"    => $value->sgst_rate,
            ":cgst_rate"    => $value->cgst_rate,
            ":sgst_amount"  => $value->sgst_amount,
            ":cgst_amount"  => $value->cgst_amount,
            ":invoice_id"   => $invoice_id
        );

        array_push($response, $data);
        $stmt->execute($data);

        if( $request->invoice_type == PURCHASE_INVOICE ){
            //Increase Quantity
            $query3 = "UPDATE product SET available_quantity=available_quantity + " . $value->quantity . " WHERE id=" . $value->product_id;

            array_push($response, $query3);

            $stmt2 = $connection->prepare( $query3 );
            $stmt2->execute();

            $stmt3 = $connection->prepare( $query2 );
            $data2 = array(
                ":product_id"   => $value->product_id,
                ":quantity"     => $value->quantity,
                ":cost_price"   => $value->rate,
                ":sgst_rate"    => $value->sgst_rate,
                ":cgst_rate"    => $value->cgst_rate,
            );
            $stmt3->execute( $data2 );
        } else if( $request->invoice_type == SALES_INVOICE ){
            $query2 = "UPDATE product SET available_quantity=available_quantity - " . $value->quantity . " WHERE id=" . $value->product_id;

            array_push($response, $query2);

            $stmt3 = $connection->prepare( $query2 );

            $stmt3->execute( $data );
        }
    }


    $response['invoice_id'] = $invoice_id;
    echo json_encode($response);


