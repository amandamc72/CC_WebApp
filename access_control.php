<?php
if(!isset($_SESSION['id'])){
	
	header("Location: /Website/login/");
	die();
}
