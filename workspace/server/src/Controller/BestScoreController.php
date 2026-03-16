<?php

namespace App\Controller;

use App\Entity\Auth\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use OpenSSLAsymmetricKey;
use OpenSSLKey;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class BestScoreController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager, Security $security): JsonResponse
    {
        // 1️⃣ Get the logged-in user
        /** @var User $user */
        $user = $security->getUser();
        if (!$user) {
            throw new AccessDeniedException("Unauthorized");
        }

        // 2️⃣ Get encrypted bestScore from request
        $data = json_decode($request->getContent(), true);
        if (!isset($data['bestScore'])) {
            return new JsonResponse(['message' => 'Missing encrypted bestScore'], 400);
        }


        $newBestScore = (int) $data['bestScore'];

        $user->setBestScore($newBestScore);
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Best score updated successfully'], 200);
    }

}