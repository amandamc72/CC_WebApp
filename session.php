<?php
session_start();
$_SESSION['data']=$_POST['data'];
echo $_SESSION['data'];

