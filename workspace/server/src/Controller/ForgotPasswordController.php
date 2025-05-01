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
        $emailEncoded = urlencode($user->getEmail()); // Always URL-encode query params
        
        $resetLink = "localhost:8010/reset-pass?token=$resetToken&email=$emailEncoded";
        
        $htmlContent = "
            <div style='font-family: Arial, sans-serif; line-height: 1.6; font-size: 16px; color: #333;'>
                <p>Hi there,</p>
                <p>We received a request to reset your password. You can reset it by clicking the link below:</p>
                <p>
                    <a href='$resetLink' style='background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;'>Reset My Password</a>
                </p>
                <p>If you didn’t request this, you can safely ignore this email.</p>
                <p>Thanks,<br>The FlagQuiz Team</p>
            </div>
        ";

        $this->emailService->sendVerificationEmail($user->getEmail(), $subject, $htmlContent);

        return new JsonResponse(['message' => 'Password reset email sent']);
    }
}
