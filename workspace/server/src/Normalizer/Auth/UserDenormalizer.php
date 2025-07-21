<?php

declare(strict_types=1);

namespace App\Normalizer\Auth;

use App\Entity\User;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class UserDenormalizer implements DenormalizerInterface
{
    public function __construct(
        protected Security $security,
        protected PasswordHasherFactoryInterface $hasher,
        protected ObjectNormalizer $normalizer,
    ) {}

    public function denormalize(mixed $data, string $type, string $format = null, array $context = []): mixed
    {
        $user = $this->normalizer->denormalize($data, $type, $format, $context);

        assert($user instanceof User);

        $operationName = $context['operation_name'] ?? null;
        $operation = $context['operation'] ?? null;
        $httpMethod = $operation?->getMethod(); 

        $uri = $context['request_uri'] ?? null; // This may not always be available

        if ($httpMethod === 'POST' && $uri === '/api/users') {
            $user->setRoles(['ROLE_USER']);
        }

        $plainPassword = $user->getPlainPassword();

        if (empty($plainPassword)) {
            return $user;
        }

        $hasher = $this->hasher->getPasswordHasher($user);
        $hashedPassword = $hasher->hash($plainPassword);

        $user->setPassword($hashedPassword);
        $user->eraseCredentials();

        return $user;
    }

    public function supportsDenormalization(mixed $data, string $type, string $format = null): bool
    {
        return $type === User::class;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            User::class => true,
        ];
    }
}
