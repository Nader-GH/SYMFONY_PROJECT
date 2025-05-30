<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationForm;
use App\Security\AppcustomAuthenticator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\Uid\Uuid;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, Security $security, EntityManagerInterface $entityManager, MailerInterface $mailer, UrlGeneratorInterface $urlGenerator): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationForm::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var string $plainPassword */
            $plainPassword = $form->get('plainPassword')->getData();

            if (null === $user->getLocale() || $user->getLocale() === '') {
                $user->setLocale('en');
            }
            if ($user->isVerifier() === null) {
                $user->setIsVerifier(false);
            }

            // Generate and set verification token
            $token = Uuid::v4()->toRfc4122();
            $user->setVerificationToken($token);

            $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));

            $entityManager->persist($user);
            $entityManager->flush();

            // Generate verification link
            $verificationUrl = $urlGenerator->generate('app_verify_email', ['token' => $token], \Symfony\Component\Routing\Generator\UrlGeneratorInterface::ABSOLUTE_URL);

            // Send verification email to Maildev
            $email = (new Email())
                ->from('no-reply@example.com')
                ->to($user->getEmail())
                ->subject('Please verify your email')
                ->text('Thank you for registering! Please verify your email address by clicking the following link: ' . $verificationUrl)
                ->html('<p>Thank you for registering! Please verify your email address by clicking the following link:</p><p><a href="' . $verificationUrl . '">' . $verificationUrl . '</a></p>');
            $mailer->send($email);

            $this->addFlash('success', 'A verification email has been sent. Please check your inbox.');
            return $this->redirectToRoute('app_login');
        }

        return $this->render('registration/register.html.twig', [
            'registrationForm' => $form,
        ]);
    }

    #[Route('/verify/{token}', name: 'app_verify_email')]
    public function verifyEmail(string $token, EntityManagerInterface $entityManager, Security $security): Response
    {
        $user = $entityManager->getRepository(User::class)->findOneBy(['verificationToken' => $token]);
        if (!$user) {
            $this->addFlash('danger', 'Invalid or expired verification link.');
            return $this->redirectToRoute('app_register');
        }
        $user->setVerificationToken(null);
        $user->setIsVerifier(true);
        $entityManager->flush();
        // Log the user in after verification
        return $security->login($user, AppcustomAuthenticator::class, 'main');
    }
}
