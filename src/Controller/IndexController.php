<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class IndexController extends Controller
{
    /**
     * @Route("/index", name="index")
     */
    public function index()
    {
        // replace this line with your own code!

        $domains  = $this->getDoctrine()->getRepository('App:DomainDns')->findAll();
        $attributes = $this->getDoctrine()->getRepository('App:DomainName')->findAll();
        return $this->render('front.html.twig',
            [
                'domains'   =>  $domains,
                'attributes'    => $attributes
            ]);
    }
}
