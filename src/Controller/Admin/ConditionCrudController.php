<?php

namespace App\Controller\Admin;

use App\Entity\Condition;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ConditionCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Condition::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('label'),
        ];
    }
}
