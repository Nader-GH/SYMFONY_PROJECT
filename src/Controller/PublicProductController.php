<?php
namespace App\Controller;

use App\Form\ProductSearchFilterForm;
use App\Repository\ProductRepository;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PublicProductController extends AbstractController
{
    #[Route('/', name: 'public_product_index')]
    public function index(Request $request, ProductRepository $productRepository, CategoryRepository $categoryRepository): Response
    {
        $categories = $categoryRepository->findAll();
        $form = $this->createForm(ProductSearchFilterForm::class, null, [
            'categories' => $categories
        ]);
        $form->handleRequest($request);

        $criteria = [];
        $searchTerm = null;
        $category = null;
        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $searchTerm = $data['q'] ?? null;
            $category = $data['category'] ?? null;
        }

        $qb = $productRepository->createQueryBuilder('p');
        if ($searchTerm) {
            $qb->andWhere('p.name LIKE :q OR p.description LIKE :q')
                ->setParameter('q', '%' . $searchTerm . '%');
        }
        if ($category) {
            $qb->andWhere('p.category_0 = :cat')
                ->setParameter('cat', $category);
        }
        $products = $qb->getQuery()->getResult();

        return $this->render('product/index.html.twig', [
            'products' => $products,
            'filterForm' => $form->createView(),
        ]);
    }
}
