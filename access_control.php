<?php
if(!isset($_SESSION['data'])) {
	
	header("Location: login");
	die();
}