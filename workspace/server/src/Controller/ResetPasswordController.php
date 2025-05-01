<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\ResetPass;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;

class ResetPasswordController extends AbstractController
{
    
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher,
        private Security $security,
    ) {}

    public function resetPass(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['token']) || empty($data['plainPassword']) || empty($data['email'])) {
            return new JsonResponse(['error' => 'Missing data'], 400);
        }

        $user =  $this->entityManager->getRepository(User::class)->findOneBy(['resetToken' => $data['token'], 'email' => $data['email']]);

        if (!$user) {
            return new JsonResponse(['error' => 'Invalid toke or emailn'], 404);
        }

        // Check if the token is expired
        if ($user->getResetTokenExpiresAt() < new \DateTime()) {
            return new JsonResponse(['error' => 'Token expired'], 400);
        }

        // Hash and set new password
        $hashedPassword = $this->passwordHasher->hashPassword($user, $data['plainPassword']);
        $user->setPassword($hashedPassword);
        $user->setResetToken(null);
        $user->setResetTokenExpiresAt(null);

        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Password successfully reset'], 200);
    }
}
