<?php
class ProductosController extends core\MVC\Action
{
    public function ProductosAction()
    {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $this->get();
                break;
            default:
                header('HTTP/1.0 405 Method Not Allowed', true, 405);
                // sigue la estructura de mensajes de error de Model
                echo json_encode([
                    'error' => false,
                    'error_message' => 'Método no admitido.',
                    'error_code' => '',
                ]);
                break;
        }
    }
    private function get()
    {
        $modelo = $this->getModel('productos', 'Productos');

        header('Content-Type: application/json');
        $json = '{"Contenido": "';

        $datos = $modelo->select('*');
        if ($datos["error"]) {
            $json .= $datos["error_code"];
        } else {
            foreach ($datos["data"] as $linea) {
                if ($linea["destacado"] == "1") {
                    $json .= "<div class='producto producto--destacado'>";
                } else {
                    $json .= "<div class='producto'>";
                }
                $json .= "<img class='producto__imagen' src='/imagenes/productos/" . $linea["foto"] . "'>";
                $json .= "<p class='producto__titulo'>" . $linea["nombre"] . "</p>";
                $json .= "</div>";
            }
        }

        $json .= '"}';
        echo json_encode($json);
    }
}