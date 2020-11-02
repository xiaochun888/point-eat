<?php
/**XMLHttpRequest.send({}); */
$_POST = json_decode(file_get_contents("php://input"), true) ?: [];
if (isset($_POST['Subject']) && isset($_POST['Body'])) {
  // $name = "Point Eat";
  $to = "point-eat@witvue.com";
  $subject = $_POST["Subject"];
  $body = $_POST["Body"];

  /**avoid spam
   * Date: / From:
  */
  $date  = date("D, j M Y H:i:s -0600");
  $headers = "From: Point Eat <point-eat@witvue.com>\r\n";
  // $headers .="Reply-To: ".$name." <".$to.">\r\n";
  // $headers .= "Return-Path: ".$name." <".$to.">\r\n";
  // $headers .= "X-Priority: 3\r\n";
  // $headers .="X-Mailer: PHP/" . phpversion();
  // $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
  $headers .= "Date: ".$date."\r\n";

  if(mail($to, $subject, $body, $headers)) {
    echo("OK");
  } else {
    echo("Failed");
  }
}
?>
