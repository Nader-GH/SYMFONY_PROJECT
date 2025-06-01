<?php

namespace App\Entity;

use App\Entity\User;
use App\Entity\Product;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "orders")]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $user;

    #[ORM\OneToMany(mappedBy: 'order', targetEntity: OrderItem::class, cascade: ['persist', 'remove'])]
    private $items;

    #[ORM\Column(type: 'float')]
    private $totalPrice;

    #[ORM\Column(type: 'string')]
    private $status;

    #[ORM\Column(type: 'datetime')]
    private $createdAt;

    public function __construct()
    {
        $this->items = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function getItems()
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

    public function addItem(OrderItem $item): self
    {
        if (!$this->items->contains($item)) {
            $this->items[] = $item;
            $item->setOrder($this);
        }
        return $this;
    }

    public function removeItem(OrderItem $item): self
    {
        if ($this->items->removeElement($item)) {
            if ($item->getOrder() === $this) {
                $item->setOrder(null);
            }
        }
        return $this;
    }

    /**
     * Set the items for this order (replaces all existing items).
     * @param iterable $items Array or Collection of OrderItem
     * @return self
     */
    public function setItems(iterable $items): self
    {
        // Remove existing items
        foreach ($this->items as $item) {
            $this->removeItem($item);
        }
        // Add new items
        foreach ($items as $item) {
            $this->addItem($item);
        }
        return $this;
    }
}
