<?php
require 'conexion.php';

if ($_POST) {

    if ($_POST['action'] == 'searchContact') {
        $arrContact = array();
        if (!empty($_POST['id'])) {
            $id = intval($_POST['id']);

            $query = mysqli_query($mysqli, "SELECT * FROM contacto");
            $num_rows = mysqli_num_rows($query);

            if ($num_rows > 0) {
                $arrContact = mysqli_fetch_assoc($query);
                echo json_encode($arrContact, JSON_UNESCAPED_UNICODE);
            } else {
                echo "notData";
            }
        }
    }

    if ($_POST['action'] == 'searchContactKey') {
        $dataSearch = $_POST['dataSearch'];

        $query = mysqli_query($mysqli, "SELECT * FROM contacto WHERE 
                                                        id LIKE '%$dataSearch%' OR
                                                        nombre LIKE '%$dataSearch%' OR
                                                        apellido LIKE '%$dataSearch%' OR
                                                        telefono LIKE '%$dataSearch%' OR
                                                        email LIKE '%$dataSearch%'");
        $num_rows = mysqli_num_rows($query);
        if ($num_rows > 0) {
            $htmlTable = '';
            while ($row = mysqli_fetch_assoc($query)) {
                $htmlTable .= '<tr>
                                    <th scope="row">' . $row['id'] . '</th>
                                    <th>' . $row['nombre'] . '</th>
                                    <th>' . $row['apellido'] . '</th>
                                    <th>' . $row['telefono'] . '</th>
                                    <th>' . $row['email'] . '</th>
                                  </tr>';
            }
            echo json_encode($htmlTable, JSON_UNESCAPED_UNICODE);
        } else {
            echo "notData";
        }
    }
}
