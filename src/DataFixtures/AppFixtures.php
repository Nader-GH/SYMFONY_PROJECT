<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Factory\CategoryFactory; 
use App\Factory\ConditionFactory; 
use App\Factory\ProductFactory; 
use App\Factory\UserFactory; 

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        CategoryFactory::createMany(10);
        ProductFactory::createMany(10);
        ConditionFactory::createMany(10);
        UserFactory::createMany(1);


        $manager->flush();
    }
}
