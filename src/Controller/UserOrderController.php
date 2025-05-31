<?php
namespace App\Controller;

use App\Repository\OrderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

class UserOrderController extends AbstractController
{
    #[Route('/my-orders', name: 'user_orders')]
    #[IsGranted('ROLE_USER')]
    public function myOrders(OrderRepository $orderRepository): Response
    {
        $orders = $orderRepository->findBy(['user' => $this->getUser()]);
        return $this->render('order/user_orders.html.twig', [
            'orders' => $orders,
        ]);
    }
}
