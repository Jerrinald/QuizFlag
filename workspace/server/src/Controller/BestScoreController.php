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
        if (!isset($data['encryptedBestScore'])) {
            return new JsonResponse(['message' => 'Missing encrypted bestScore'], 400);
        }

        // 3️⃣ Load private key
        $privateKeyPath = $this->getParameter('kernel.project_dir') . '/config/keys/private.pem';
        $privateKey = openssl_pkey_get_private(file_get_contents($privateKeyPath));

        if (!$privateKey) {
            return new JsonResponse(['message' => 'Private key not found'], 500);
        }

        // 4️⃣ Decrypt the bestScore
        $decodedBestScore = base64_decode($data['encryptedBestScore']);
        $decryptedBestScore = "";
        openssl_private_decrypt($decodedBestScore, $decryptedBestScore, $privateKey);

        if (!$decryptedBestScore || !is_numeric($decryptedBestScore)) {
            return new JsonResponse(['message' => 'Decryption failed'], 400);
        }

        $newBestScore = (int) $decryptedBestScore;

        $user->setBestScore($newBestScore);
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Best score updated successfully'], 200);
    }

}