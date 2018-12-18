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
        //header('Content-Type: application/json');
        //$json = '{"Contenido":"';
        $json = "<div class='c-carrusel'></div>";
        $json .= "<div class='c-portada__texto'>
                <h1>¡Bienvenido a <span class='WeekFood--negro'>Week</span><span class='WeekFood--rojo'>Food</span>!</h1>
                Somos una empresa ficticia, ofrecemos gran variedad de platos preparados para entrega en el hogar, el trabajo, o la escuela-
                <br>Con <span class='WeekFood--negro'>Week</span><span class='WeekFood--rojo'>Food</span> nunca mas tendrás que preocuparte de que vas a comer hoy.
                </div>";
                //<div class='c-portada__productosAleatorios'>";
                //todo cuando mergeemos
       // $json .= '</div>"}';
        echo json_encode($json);
    }
}