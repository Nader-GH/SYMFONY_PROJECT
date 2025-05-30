<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Session\SessionInterface;

class CartService
{
    private $session;
    private const CART_KEY = 'cart';

    public function __construct(SessionInterface $session)
    {
        $this->session = $session;
    }

    public function add(int $productId, int $quantity = 1): void
    {
        $cart = $this->session->get(self::CART_KEY, []);
        if (isset($cart[$productId])) {
            $cart[$productId] += $quantity;
        } else {
            $cart[$productId] = $quantity;
        }
        $this->session->set(self::CART_KEY, $cart);
    }

    public function remove(int $productId): void
    {
        $cart = $this->session->get(self::CART_KEY, []);
        unset($cart[$productId]);
        $this->session->set(self::CART_KEY, $cart);
    }

    public function update(int $productId, int $quantity): void
    {
        $cart = $this->session->get(self::CART_KEY, []);
        if ($quantity > 0) {
            $cart[$productId] = $quantity;
        } else {
            unset($cart[$productId]);
        }
        $this->session->set(self::CART_KEY, $cart);
    }

    public function getCart(): array
    {
        return $this->session->get(self::CART_KEY, []);
    }

    public function clear(): void
    {
        $this->session->remove(self::CART_KEY);
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
}
