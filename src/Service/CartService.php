<?php

namespace App\Service;

use App\Entity\Cart;
use App\Entity\User;
use App\Repository\CartRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class CartService
{
    private $requestStack;
    private $entityManager;
    private $cartRepository;
    private const CART_KEY = 'cart';

    public function __construct(RequestStack $requestStack, EntityManagerInterface $entityManager, CartRepository $cartRepository)
    {
        $this->requestStack = $requestStack;
        $this->entityManager = $entityManager;
        $this->cartRepository = $cartRepository;
    }

    private function getSession()
    {
        return $this->requestStack->getSession();
    }

    public function add(int $productId, int $quantity = 1): void
    {
        $session = $this->getSession();
        $cart = $session->get(self::CART_KEY, []);
        if (isset($cart[$productId])) {
            $cart[$productId] += $quantity;
        } else {
            $cart[$productId] = $quantity;
        }
        $session->set(self::CART_KEY, $cart);
    }

    public function remove(int $productId): void
    {
        $session = $this->getSession();
        $cart = $session->get(self::CART_KEY, []);
        unset($cart[$productId]);
        $session->set(self::CART_KEY, $cart);
    }

    public function update(int $productId, int $quantity): void
    {
        $session = $this->getSession();
        $cart = $session->get(self::CART_KEY, []);
        if ($quantity > 0) {
            $cart[$productId] = $quantity;
        } else {
            unset($cart[$productId]);
        }
        $session->set(self::CART_KEY, $cart);
    }

    public function getCart(): array
    {
        $session = $this->getSession();
        return $session->get(self::CART_KEY, []);
    }

    public function clear(): void
    {
        $session = $this->getSession();
        $session->remove(self::CART_KEY);
    }

    public function getTotalPrice(array $products): float
    {
        $cart = $this->getCart();
        $total = 0;
        foreach ($products as $product) {
            $productId = $product->getId();
            if (isset($cart[$productId])) {
                $total += $product->getPrice() * $cart[$productId];
            }
        }
        return $total;
    }

    public function saveCartForUser(User $user): void
    {
        $sessionCart = $this->getCart();
        $cart = $this->cartRepository->findOneBy(['user' => $user]);
        if (!$cart) {
            $cart = new Cart();
            $cart->setUser($user);
        }
        $cart->setItems($sessionCart);
        $this->entityManager->persist($cart);
        $this->entityManager->flush();
    }

    public function loadCartForUser(User $user): void
    {
        $cart = $this->cartRepository->findOneBy(['user' => $user]);
        if ($cart) {
            $session = $this->getSession();
            $session->set(self::CART_KEY, $cart->getItems());
        }
    }
}
