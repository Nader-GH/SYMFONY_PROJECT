<?php

namespace App\Controller;

use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

class OrderController extends AbstractController
{
    #[Route('/orders', name: 'order_history')]
    #[IsGranted('ROLE_USER')]
    public function history(EntityManagerInterface $em): Response
    {
        $orders = $em->getRepository(Order::class)->findBy(['user' => $this->getUser()], ['createdAt' => 'DESC']);
        return $this->render('order/history.html.twig', [
            'orders' => $orders,
        ]);
    }
}
