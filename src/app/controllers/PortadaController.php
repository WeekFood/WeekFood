<?php
class PortadaController extends core\MVC\Action
{
    public function PortadaAction()
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
        $json = '{"Contenido":"<img src=\'imagenes/productos/lomo-asado.jpg\'><br><h1>Bienvenido a WeekFood</h1>"}';
        echo json_encode($json);
    }
}