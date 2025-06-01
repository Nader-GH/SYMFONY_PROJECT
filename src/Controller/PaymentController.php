<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class PaymentController extends AbstractController
{
    private $params;

    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
    }

    #[Route('/payment', name: 'payment_form')]
    public function paymentForm(): Response
    {
        $stripePublicKey = $_ENV['STRIPE_PUBLIC_KEY'] ?? $this->params->get('stripe_public_key');
        return $this->render('payment/payment.html.twig', [
            'stripe_public_key' => $stripePublicKey,
        ]);
    }

    #[Route('/payment/create-intent', name: 'payment_create_intent', methods: ['POST'])]
    public function createPaymentIntent(Request $request): Response
    {
        $stripeSecretKey = $_ENV['STRIPE_SECRET_KEY'] ?? $this->params->get('stripe_secret_key');
        \Stripe\Stripe::setApiKey($stripeSecretKey);

        // For demo, use a fixed amount (e.g., 10 EUR). Adjust as needed.
        $amount = 1000; // Amount in cents
        $currency = 'eur';

        try {
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $amount,
                'currency' => $currency,
                'automatic_payment_methods' => ['enabled' => true],
            ]);
            return $this->json(['clientSecret' => $paymentIntent->client_secret]);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}
