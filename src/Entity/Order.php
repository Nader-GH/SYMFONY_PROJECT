<?php

namespace App\Entity;

use App\Entity\User;
use App\Entity\Product;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $user;

    #[ORM\Column(type: 'json')]
    private $items = [];

    #[ORM\Column(type: 'float')]
    private $totalPrice;

    #[ORM\Column(type: 'string')]
    private $status;

    #[ORM\Column(type: 'datetime')]
    private $createdAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function getItems(): array
    {
        return $this->items;
    }

    public function getTotalPrice(): ?float
    {
        return $this->totalPrice;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setUser($user): self
    {
        $this->user = $user;
        return $this;
    }

    public function setItems($items): self
    {
        $this->items = $items;
        return $this;
    }

    public function setTotalPrice($totalPrice): self
    {
        $this->totalPrice = $totalPrice;
        return $this;
    }

    public function setStatus($status): self
    {
        $this->status = $status;
        return $this;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }
}
