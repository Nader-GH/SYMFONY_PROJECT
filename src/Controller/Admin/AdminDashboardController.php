<?php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Entity\Order;
use App\Repository\UserRepository;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/admin")
 * @IsGranted("ROLE_ADMIN")
 */
class AdminDashboardController extends AbstractController
{
    /**
     * @Route("/dashboard", name="admin_dashboard")
     */
    public function dashboard(UserRepository $userRepository, OrderRepository $orderRepository): Response
    {
        $users = $userRepository->findAll();
        $orders = $orderRepository->findAll();
        $userStats = [];
        foreach ($users as $user) {
            $userOrders = $orderRepository->findBy(['user' => $user]);
            $totalPaid = array_sum(array_map(fn($o) => $o->getTotalPrice(), $userOrders));
            $userStats[] = [
                'user' => $user,
                'orders' => count($userOrders),
                'totalPaid' => $totalPaid,
            ];
        }
        return $this->render('admin/dashboard.html.twig', [
            'userStats' => $userStats,
            'orders' => $orders,
        ]);
    }

    /**
     * @Route("/users/manage", name="admin_manage_users")
     */
    public function manageUsers(UserRepository $userRepository): Response
    {
        $users = $userRepository->findAll();
        return $this->render('admin/manage_users.html.twig', [
            'users' => $users,
        ]);
    }

    /**
     * @Route("/user/promote", name="admin_user_promote", methods={"POST"})
     */
    public function promoteUser(Request $request, UserRepository $userRepository, EntityManagerInterface $em): RedirectResponse
    {
        $userId = $request->request->get('user_id');
        $user = $userRepository->find($userId);
        if ($user && !in_array('ROLE_ADMIN', $user->getRoles())) {
            $roles = $user->getRoles();
            $roles[] = 'ROLE_ADMIN';
            $user->setRoles($roles);
            $em->flush();
            $this->addFlash('success', $user->getUsername() . ' has been promoted to ADMIN.');
        }
        return $this->redirectToRoute('admin_manage_users');
    }

    /**
     * @Route("/user/demote", name="admin_user_demote", methods={"POST"})
     */
    public function demoteUser(Request $request, UserRepository $userRepository, EntityManagerInterface $em): RedirectResponse
    {
        $userId = $request->request->get('user_id');
        $user = $userRepository->find($userId);
        if ($user && in_array('ROLE_ADMIN', $user->getRoles())) {
            $roles = array_filter($user->getRoles(), fn($r) => $r !== 'ROLE_ADMIN');
            $user->setRoles($roles);
            $em->flush();
            $this->addFlash('success', $user->getUsername() . ' has been demoted to USER.');
        }
        return $this->redirectToRoute('admin_manage_users');
    }

    /**
     * @Route("/user/delete", name="admin_user_delete", methods={"POST"})
     */
    public function deleteUser(Request $request, UserRepository $userRepository, EntityManagerInterface $em): RedirectResponse
    {
        $userId = $request->request->get('user_id');
        $user = $userRepository->find($userId);
        if ($user) {
            $em->remove($user);
            $em->flush();
            $this->addFlash('success', $user->getUsername() . ' has been deleted.');
        }
        return $this->redirectToRoute('admin_manage_users');
    }
}
