<?php

namespace App\Controller;

use App\Service\CartService;
use App\Repository\ProductRepository;
use App\Entity\Order;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

class CheckoutController extends AbstractController
{
    #[Route('/checkout', name: 'checkout')]
    #[IsGranted('ROLE_USER')]
    public function checkout(CartService $cartService, ProductRepository $productRepository): Response
    {
        $cart = $cartService->getCart();
        $products = $productRepository->findBy(['id' => array_keys($cart)]);
        return $this->render('cart/checkout.html.twig', [
            'cart' => $cart,
            'products' => $products,
        ]);
    }

    #[Route('/checkout/confirm', name: 'checkout_confirm', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function confirm(CartService $cartService, ProductRepository $productRepository, EntityManagerInterface $em): Response
    {
        $cart = $cartService->getCart();
        $products = $productRepository->findBy(['id' => array_keys($cart)]);
        $total = $cartService->getTotalPrice($products);
        $order = new Order();
        $order->setUser($this->getUser());
        $order->setItems($cart);
        $order->setTotalPrice($total);
        $order->setStatus('Pending');
        $order->setCreatedAt(new \DateTime());
        $em->persist($order);
        $em->flush();
        $cartService->clear();
        $this->addFlash('success', 'Commande confirmée !');
        return $this->redirectToRoute('order_history');
    }
}
