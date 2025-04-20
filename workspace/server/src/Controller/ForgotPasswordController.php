<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\EmailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\AsController;

class ForgotPasswordController extends AbstractController
{
    private EmailService $emailService;
    private EntityManagerInterface $entityManager;

    public function __construct(EmailService $emailService, EntityManagerInterface $entityManager)
    {
        $this->emailService = $emailService;
        $this->entityManager = $entityManager;
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;

        if (!$email) {
            return new JsonResponse(['error' => 'Email is required'], 400);
        }

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        $resetToken = bin2hex(random_bytes(32));
        $expiresAt = new \DateTime('+1 hour'); // Token expires in 1 hour

        $user->setResetToken($resetToken);
        $user->setResetTokenExpiresAt($expiresAt);
        $this->entityManager->flush();

        $subject = "Password Reset Request";
        $htmlContent = "<p>Click <a href='https://yourwebsite.com/reset-pass/$resetToken'>here</a> to reset your password.</p>";

        $this->emailService->sendVerificationEmail($user->getEmail(), $subject, $htmlContent);

        return new JsonResponse(['message' => 'Password reset email sent']);
    }
}
