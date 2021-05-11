<?php
ini_set( 'display_errors', 1 );
require __DIR__ . '/vendor/autoload.php';
 // $to='trifectahealthnyc@gmail.com';    
$mail = new PHPMailer(true);
$mail->IsMail();
$mail->IsHTML(true);
$mail->Priority = '1';
$mail->Encoding = 'base64';
$mail->CharSet = 'utf-8';

///от кого письмо  
$mail->setFrom('info@info.com','info info');

//  $mail->addAddress('wol1414@gmail.com');
 $mail->addAddress('flaming3012@gmail.com');
 // $mail->addAddress('horenkova369@gmail.com');
// $mail->addAddress('stab@inbox.support');



//Субъект
$mail->Subject = 'Заявка с сайта Евразия';

$time = date('d.m.Y в H:i');
$html = '

<table style="width: 100%;">';
    if (!empty($_POST['order'])) {
        $html .= ' <tr style="background-color: #f8f8f8;">  <td style="padding: 10px; border: #e9e9e9 1px solid;">Вид формы:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['order'] . '</b></td></tr>';
    }

    if (!empty($_POST['name'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;">Name:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['name'] . '</b></td></tr>';
    }
    
    	if (!empty($_POST['tel'])) {
                $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Телефон:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['tel'] . '</b></td></tr>';
        }
        
        if (!empty($_POST['email'])) {
                $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Email:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['email'] . '</b></td></tr>';
        }
        
        if (!empty($_POST['mail'])) {
                $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Email:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['mail'] . '</b></td></tr>';
        }
        
        if (!empty($_POST['whatsapp'])) {
                $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Whatsapp:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['whatsapp'] . '</b></td></tr>';
        }
        
        if (!empty($_POST['viber'])) {
                $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Viber:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['viber'] . '</b></td></tr>';
        }
        
        if (!empty($_POST['telegram'])) {
                $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> telegram:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['telegram'] . '</b></td></tr>';
        }

 
        if (!empty($_POST['datetime'])) {
                $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Время для звонка:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['datetime'] . '</b></td></tr>';
        }

        if (!empty($_POST['time'])) {
            $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Время для звонка:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['time'] . '</b></td></tr>';
     }

    if (!empty($_POST['text'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Вопрос:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['text'] . '</b></td>';
    }

    if (!empty($_POST['comment'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Отзыв:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['comment'] . '</b></td>';
    }

    // Какой тип работ вам необходим?
    if (!empty($_POST['step1text'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Какой тип работ вам необходим?:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['step1text'] . '</b></td>';
    }

    else if (!empty($_POST['step1'])) {
        $html .= ' <tr style="background-color: #f8f8f8;">  <td style="padding: 10px; border: #e9e9e9 1px solid;"> Какой тип работ вам необходим?:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['step1'] . '</b></td></tr>';
    }
    
    //Какой у вас тип помещения?
    if (!empty($_POST['step2text'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;">Какой у вас тип помещения? (cсылка на сайт):</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['step2text'] . '</b></td>';
    }

    else if (!empty($_POST['step2'])) {
        $html .= ' <tr style="background-color: #f8f8f8;">  <td style="padding: 10px; border: #e9e9e9 1px solid;">Какой у вас тип помещения?:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['step2'] . '</b></td></tr>';
    }
    
    
    // Какая общая площадь помещения?
    if (!empty($_POST['area'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Какая общая площадь помещения?:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['area'] . '</b></td>';
    }


    // Когда планируется открытие?
    if (!empty($_POST['WhenOpening'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> Когда планируется открытие?:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">через ' . $_POST['WhenOpening'] . ' месяцев</b></td>';
    }


    
    //  У вас уже имеется проект?
     if (!empty($_POST['step4'])) {
        $html .= ' <tr style="background-color: #f8f8f8;">  <td style="padding: 10px; border: #e9e9e9 1px solid;"> У вас уже имеется проект?:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['step4'] . '</b></td></tr>';
    }
    

    if (!empty($_POST['utm_source'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> utm_source:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['utm_source'] . '</b></td>';
    }
    
    if (!empty($_POST['utm_term'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> utm_term:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['utm_term'] . '</b></td>';
    }    
    if (!empty($_POST['utm_medium'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> utm_medium:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['utm_medium'] . '</b></td>';
    }  
      
    if (!empty($_POST['utm_campaign'])) {
        $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> utm_campaign:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['utm_campaign'] . '</b></td>';
    }
     $html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;">  Время отправки:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $time . '</b></td>
      <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> IP:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_SERVER['REMOTE_ADDR'] . '</b></td> 
</table>
';
$mail->Body = $html;

$uploaddir = __DIR__ . '/upload/';

if ($_FILES['file']['tmp_name']) {    
    $mail->addAttachment($_FILES['file']['tmp_name'],$_FILES['file']['name']);
}

// if ($_FILES['file2']['tmp_name']) {    
//  $mail->addAttachment($_FILES['file2']['tmp_name'],$_FILES['file2']['name']);
// }

if (empty($_POST['example-input-field'])) {

    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message sent!";
    }
    if (isset($uploadfile))unlink($uploadfile);
    if (isset($uploadfile2))unlink($uploadfile2);
}

?>


<?php 
?>




