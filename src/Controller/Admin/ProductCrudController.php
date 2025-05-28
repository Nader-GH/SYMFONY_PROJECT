<?php

namespace App\Controller\Admin;

use App\Entity\Product;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField; // Added missing import
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use Vich\UploaderBundle\Form\Type\VichImageType;


class ProductCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Product::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->onlyOnIndex(),
            TextField::new('name'),
            TextEditorField::new('description'),
            NumberField::new('price')->setRequired(true),
            NumberField::new('quantity')->setRequired(true),
            AssociationField::new('condition_0')->setLabel('Condition'),
            AssociationField::new('category_0')->setLabel('Category'),
            TextField::new('imageFile', 'Image')
            ->setFormType(VichImageType::class)
            ->onlyOnForms(),
                        ImageField::new('imageName')
            ->setBasePath('/images/products/')
            ->onlyOnIndex(),        ];
    }
}