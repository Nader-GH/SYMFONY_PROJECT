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
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

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
    public function confirm(CartService $cartService, ProductRepository $productRepository, EntityManagerInterface $em, MailerInterface $mailer): Response
    {
        $cart = $cartService->getCart();
        $products = $productRepository->findBy(['id' => array_keys($cart)]);
        $total = $cartService->getTotalPrice($products);
        $order = new Order();
        $order->setUser($this->getUser());
        // Build OrderItems from cart and add to Order
        $orderItems = [];
        foreach ($products as $product) {
            $productId = $product->getId();
            if (isset($cart[$productId])) {
                $orderedQty = $cart[$productId]['quantity'] ?? 1;
                $orderItem = new \App\Entity\OrderItem();
                $orderItem->setProduct($product);
                $orderItem->setQuantity($orderedQty);
                $orderItem->setPrice($product->getPrice());
                $orderItems[] = $orderItem;
                $order->addItem($orderItem);
                // Decrement stock for each product in the order
                $newQty = max(0, $product->getQuantity() - $orderedQty);
                $product->setQuantity($newQty);
                $em->persist($product);
            }
        }
        $order->setTotalPrice($total);
        $order->setStatus('Pending');
        $order->setCreatedAt(new \DateTime());
        $em->persist($order);
        $em->flush();
        // Send order confirmation email
        $user = $this->getUser();
        if ($user && method_exists($user, 'getEmail')) {
            $email = (new Email())
                ->from('no-reply@example.com')
                ->to($user->getEmail())
                ->subject('Order Confirmation')
                ->text('Thank you for your order! Your order has been confirmed.')
                ->html('<p>Thank you for your order! Your order has been confirmed.</p>');
            $mailer->send($email);
        }
        $cartService->clear();
        $this->addFlash('success', 'Commande confirmée !');
        return $this->redirectToRoute('order_history');
    }
}
