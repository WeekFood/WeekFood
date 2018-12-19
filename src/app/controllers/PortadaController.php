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
        $this->setView("portada");
        $this->renderView();
    }
}