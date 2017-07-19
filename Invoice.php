<?php 
    if( isset($_GET['id'] ) ){
        $invoice_id = $_GET['id'];
    } else {
        die('Invalid Page Request');
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Invoice <?php echo $invoice_id; ?></title>
    </head>

    <body>
    </body>
</html>
