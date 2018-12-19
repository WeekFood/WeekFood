<?php
class ApiController extends core\MVC\Action
{
    public function ApiAction()
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
        header('HTTP/1.0 400 Petición incorrecta', true, 400);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode('{"Error: 400"}');
    }
}