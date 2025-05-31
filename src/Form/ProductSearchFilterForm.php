<?php
namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use App\Entity\Category;

class ProductSearchFilterForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('q', TextType::class, [
                'label' => 'Search',
                'required' => false,
                'attr' => ['placeholder' => 'Name, description...']
            ])
            ->add('category', ChoiceType::class, [
                'label' => 'Category',
                'required' => false,
                'choices' => $options['categories'],
                'choice_label' => function ($category) {
                    return $category instanceof Category ? $category->getName() : $category;
                },
                'choice_value' => function ($category) {
                    return $category instanceof Category ? $category->getId() : $category;
                },
                'placeholder' => 'All categories',
            ])
            ->add('search', SubmitType::class, [
                'label' => 'Filter',
                'attr' => ['class' => 'btn btn-dark']
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'categories' => [],
        ]);
    }
}
