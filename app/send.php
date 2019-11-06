<?

$to='monsignor@mail.ru';

if (isset($_POST['act'])) {

	$hdr="From: noreply@armatura.ru\nMIME-Version: 1.0\nContent-Type:text/plain;charset=\"utf-8\"";

	if ($_POST['act']=='callback') {
		$name = isset($_POST['name']) ? strip_tags($_POST['name']) : '';
		$phone = isset($_POST['phone']) ? strip_tags($_POST['phone']) : '';
		$time = isset($_POST['time']) ? strip_tags($_POST['time']) : '';
		$message .= "Имя: $name\n";
		$message .= "Телефон: $phone\n";
		$message .= "Звоните в $time\n\n";
		$subject = "Обратный звонок";

	}

	if (mail($to, "=?utf-8?B?".base64_encode($subject)."?=", $message, $hdr)) {
		print_r('<h2>Спасибо за обращение!</h2><p>Перезвоним Вам в указанное время</p>');
	}
	else {
		print_r('<h2>Ошибка, ваше сообщение не отправлено.</h2><p>Попробуйте отправить данные еще раз.</p>');
	}

}

?>
